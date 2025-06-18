import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal/Modal";
import TransacoesList from "./TransacoesList/TransacoesList";

enum tipoTransacao {
  receita,
  despesa,
  semTipo,
}

type transacao = {
  descricao: string;
  valor: number
  data: string
  tipo: tipoTransacao
}

export default function Index() {
  const [saldo, setSaldo] = useState<number>(1000);
  const [modal, setModal] = useState<boolean>(false);
  const [tipo, setTipo] = useState<tipoTransacao>(tipoTransacao.semTipo);
  const [transacoes, setTransacoes] = useState<Array<transacao>>(new Array<transacao>());

  const iniciarTransacaoReceita = () => {
    setTipo(tipoTransacao.receita);
    exibirModal();
  }

  const iniciarTransacaoDespesa = () => {
    setTipo(tipoTransacao.despesa);
    exibirModal();
  }

  const fecharModal = () => {
    setModal(false)
    setTipo(tipoTransacao.semTipo);
  }

  const exibirModal = () => {
    setModal((prev) => !prev);
  };

  const cadastrarTransacao = (data: { valor: string; descricao: string; data: string }) => {
    validarCampos(data);

    let novaTransacao: transacao;
    if (tipo === tipoTransacao.receita) {
      novaTransacao = {
        descricao: data.descricao,
        valor: parseFloat(data.valor),
        data: data.data,
        tipo: tipoTransacao.receita
      };
      setSaldo((prev) => prev + novaTransacao.valor);
    } else if (tipo === tipoTransacao.despesa) {
      novaTransacao = {
        descricao: data.descricao,
        valor: parseFloat(data.valor),
        data: data.data,
        tipo: tipoTransacao.despesa
      };
      setSaldo((prev) => prev - novaTransacao.valor);
    } else {
      return;
    }
    setTransacoes((prev) => [...prev, novaTransacao]);
    fecharModal();
  }

  const excluirTransacao = (index: number) => {
    // Obtém a transação a ser excluída
    const transacaoExcluida = transacoes[index];
    
    // Atualiza o saldo (adiciona se for despesa, subtrai se for receita)
    if (transacaoExcluida.tipo === tipoTransacao.receita) {
      setSaldo((prev) => prev - transacaoExcluida.valor);
    } else if (transacaoExcluida.tipo === tipoTransacao.despesa) {
      setSaldo((prev) => prev + transacaoExcluida.valor);
    }

    // Remove a transação da lista
    setTransacoes((prev) => {
      const novasTransacoes = [...prev];
      novasTransacoes.splice(index, 1);
      return novasTransacoes;
    });
  };

  const validarCampos = (data: { valor: string; descricao: string; data: string }) => {
    if (!data.valor || !data.descricao || !data.data) {
      alert("Preencha todos os campos!");
      return;
    }

    const valor = parseFloat(data.valor);
    if (isNaN(valor) || valor <= 0) {
      alert("Valor inválido!");
      return;
    }
  }

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
    <View style={{ flex: 1, backgroundColor: '#181A20'}}>
      <View style={styles.BalanceContainer}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Seu Saldo</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{getSaldoFormatado(saldo)}</Text>
      </View>

      <Modal
        rendered={modal}
        onCancel={fecharModal}
        onSubmit={cadastrarTransacao}
      />

      <TransacoesList 
        transacoes={transacoes} 
        onDelete={excluirTransacao} 
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={iniciarTransacaoReceita} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={iniciarTransacaoDespesa} style={styles.removeBtn}>
          <Text style={styles.addBtnText}>-</Text>
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
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})