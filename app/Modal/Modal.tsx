import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type modalProps = {
    rendered: boolean;
    onCancel?: () => void;
    onSubmit?: (data: { valor: string; descricao: string; data: string }) => void;
}

export default function Modal(props: modalProps) {
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [tipo, setTipo] = useState('');

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
                    textContentType='dateTime'
                    value={data}
                    onChangeText={setData}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                    value={valor}
                    onChangeText={setValor}
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cadastrarBtn} onPress={() => props.onSubmit && props.onSubmit({ valor, descricao, data })}>
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