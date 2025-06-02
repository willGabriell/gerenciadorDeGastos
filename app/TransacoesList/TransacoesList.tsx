import { FlatList, Text, View } from "react-native";

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
};

export default function TransacoesList({ transacoes }: TransacoesListProps) {
    return (
        <FlatList
            data={transacoes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#333' }}>
                    <Text style={{ fontSize: 18, color: '#fff' }}>{item.descricao}</Text>
                    <Text style={{ fontSize: 16, color: '#B0B3B8' }}>{item.data}</Text>
                    <Text style={{ fontSize: 16, color: item.tipo === tipoTransacao.receita ? '#1F8EFA' : '#E2445C' }}>
                        {item.tipo === tipoTransacao.receita ? '+' : '-'} R$ {item.valor.toFixed(2)}
                    </Text>
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