import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export enum tipoTransacao {
    receita,
    despesa,
    semTipo,
}

export type transacao = {
    descricao: string;
    valor: number;
    data: string;
    tipo: tipoTransacao;
};

type TransacoesListProps = {
    transacoes: transacao[];
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
};

export default function TransacoesList({ transacoes, onDelete, onEdit }: TransacoesListProps) {
    return (
        <FlatList
            data={transacoes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View style={styles.itemContainer}>
                    <TouchableOpacity 
                        style={styles.infoContainer}
                        onPress={() => onEdit(index)}
                    >
                        <Text style={styles.descricao}>{item.descricao}</Text>
                        <Text style={styles.data}>{item.data}</Text>
                        <Text style={[
                            styles.valor, 
                            { color: item.tipo === tipoTransacao.receita ? '#1F8EFA' : '#E2445C' }
                        ]}>
                            {item.tipo === tipoTransacao.receita ? '+' : '-'} R$ {item.valor.toFixed(2)}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.editButton}
                            onPress={() => onEdit(index)}
                        >
                            <Text style={styles.buttonText}>✎</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => onDelete(index)}
                        >
                            <Text style={styles.buttonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            style={{ marginTop: 20, paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#B0B3B8' }}>Nenhuma transação registrada.</Text>
                </View>
            )}
            ListHeaderComponent={() => (
                <View style={{ padding: 10, paddingTop: 40, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Histórico de Transações</Text>
                </View>
            )}
            ListFooterComponent={() => (
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#fff' }}>Total de transações: {transacoes.length}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1
    },
    descricao: {
        fontSize: 18,
        color: '#fff'
    },
    data: {
        fontSize: 16,
        color: '#B0B3B8'
    },
    valor: {
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    editButton: {
        backgroundColor: '#1F8EFA',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    deleteButton: {
        backgroundColor: '#E2445C',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    }
});