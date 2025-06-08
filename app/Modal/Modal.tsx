import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type modalProps = {
    rendered: boolean;
    onCancel?: () => void;
    onSubmit?: (data: { valor: string; descricao: string; data: string }) => void;
};

export default function Modal(props: modalProps) {
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');

    const handleDataChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        let formatted = '';

        let day = cleaned.slice(0, 2);
        let month = cleaned.slice(2, 4);
        let year = cleaned.slice(4, 8);

        if (day.length === 2) {
            const dayNum = Math.min(parseInt(day), 31);
            day = dayNum.toString().padStart(2, '0');
        }

        if (month.length === 2) {
            const monthNum = Math.min(parseInt(month), 12);
            month = monthNum.toString().padStart(2, '0');
        }

        if (year.length === 4) {
            const yearNum = Math.min(parseInt(year), 2025);
            year = yearNum.toString();
        }

        if (cleaned.length <= 2) {
            formatted = day;
        } else if (cleaned.length <= 4) {
            formatted = `${day}/${month}`;
        } else {
            formatted = `${day}/${month}/${year}`;
        }

        setData(formatted);
    };

    const handleSubmit = () => {
        let errors = [];

        if (!valor || isNaN(Number(valor))) {
            errors.push('Valor deve ser numérico e não vazio.');
        }
        if (!descricao.trim()) {
            errors.push('Descrição não pode estar vazia.');
        }
        if (!data.trim()) {
            errors.push('Data não pode estar vazia.');
        } else {
            const partes = data.split('/');
            if (partes.length !== 3) {
                errors.push('Data inválida.');
            } else {
                const [dia, mes, ano] = partes.map(Number);
                if (
                    !dia || !mes || !ano ||
                    dia < 1 || dia > 31 ||
                    mes < 1 || mes > 12 ||
                    ano.toString().length !== 4
                ) {
                    errors.push('Data inválida.');
                } else {
                    const dataInput = new Date(ano, mes - 1, dia);
                    const hoje = new Date();
                    hoje.setHours(0, 0, 0, 0);
                    dataInput.setHours(0, 0, 0, 0);
                    if (dataInput.getTime() !== hoje.getTime()) {
                        errors.push('Só é permitido cadastrar com a data de hoje.');
                    }
                }
            }
        }

        if (errors.length > 0) {
            Alert.alert('Erros no formulário:', errors.join('\n'));
            return;
        }

        props.onSubmit && props.onSubmit({ valor, descricao, data });
    };

    if (!props.rendered) return null;

    return (
        <View style={styles.overlay}>
            <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.modal}>
                <Text style={styles.title}>Adicionar Transação</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data"
                    keyboardType="numeric"
                    value={data}
                    onChangeText={handleDataChange}
                    maxLength={10}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={(text) => {
                        const cleaned = text.replace(/[^0-9.]/g, '');
                        setValor(cleaned);
                    }}
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cadastrarBtn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelarBtn} onPress={props.onCancel}>
                        <Text style={styles.btnText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
        backgroundColor: 'rgba(24,26,32,0.7)',
    },
    modal: {
        width: '85%',
        backgroundColor: '#23242A',
        padding: 24,
        borderRadius: 16,
        alignItems: 'stretch',
        elevation: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        backgroundColor: '#181A20',
        color: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cadastrarBtn: {
        flex: 1,
        backgroundColor: '#1F8EFA',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
    },
    cancelarBtn: {
        flex: 1,
        backgroundColor: '#E2445C',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 8,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
