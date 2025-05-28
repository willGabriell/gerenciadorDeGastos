import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal/Modal";

enum tipoTransacao {
  receita,
  despesa,
  semTipo,
}

type transacao = {
  descricao: string;
  valor: number
}

export default function Index() {
  const [saldo, setSaldo] = useState<number>(1000);
  const [modal, setModal] = useState<boolean>(false);
  const [tipo, setTipo] = useState<tipoTransacao>(tipoTransacao.semTipo);
  const [transacoes, setTransacoes] = useState<transacao[]>()

  const iniciarTransacaoReceita = () => {
    setTipo(tipoTransacao.receita);
    exibirModal();
  }
  
  const iniciarTransacaoDespesa = () => {
    setTipo(tipoTransacao.despesa);
    exibirModal();
  }

  useEffect(() => {}, [tipo]);
  
  const fecharModal = () => {
    setModal(false)
    setTipo(tipoTransacao.semTipo);
  }
  
  const exibirModal = () => {
    setModal((prev) => !prev);
  };

  const getSaldoFormatado = (saldo: number): string => {
    return saldo.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    );
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: '#181A20' }}>
      <View style={styles.BalanceContainer}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Seu Saldo</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{getSaldoFormatado(saldo)}</Text>
      </View>

      <Modal
        rendered={modal}
        onCancel={fecharModal}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={iniciarTransacaoReceita} style={styles.addBtn}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={iniciarTransacaoDespesa} style={styles.removeBtn}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10
  },
  addBtn: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#1F8EFA',
    borderRadius: 5,
    alignItems: 'center',
  },
  removeBtn: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#E2445C',
    borderRadius: 5,
    alignItems: 'center',
  },
  BalanceContainer: {
    paddingTop: 100,
    paddingLeft: 20
  }
})