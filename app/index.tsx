import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "./Modal/Modal";

export default function Index() {
  const [saldo, setSaldo] = useState<number>(1000);
  const [modal, setModal] = useState<boolean>(false);

  const getSaldoFormatado = (saldo: number): string => {
    return saldo.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    );
  };

  const exibirModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Seu Saldo</Text>
      <Text style={{ fontSize: 18 }}>{getSaldoFormatado(saldo)}</Text>

      <Modal rendered={modal} />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={exibirModal} style={styles.addBtn}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={exibirModal} style={styles.removeBtn}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>-</Text>
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
    paddingTop: 10,
  },
  addBtn: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  removeBtn: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#F44336',
    borderRadius: 5,
    alignItems: 'center',
  }
})