import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/authContext';

export default function CabecalhoFeed() {

  const { PegaMe, me } = useContext(AuthContext)

  const navigation = useNavigation()

  useEffect(() => {
    PegaMe()

  }, [me])

  function Avatar() {
    console.log("alerta");
  }

  return (
    <View style={styles.container_header}>
      <View style={styles.me}>

        <TouchableOpacity
          onPress={Avatar}
          style={styles.avatar}>
          <View ></View>

        </TouchableOpacity>
        <View>

          <Text style={styles.namestore}>{me.nome}</Text>
          <Text>{me.bio}</Text>
          <Text>{me.telefone}</Text>
          <Text>{me.entrega ? "Faço Entregas" : null}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btndados}
        onPress={() => navigation.navigate("CadastrarDados")}
      >
        <Feather name='more-vertical' size={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#ddd'
  },
  btndados: {
    padding: 5
  },
  container_header: {
    flexDirection: "row",
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 5
  },
  me: {
    flexDirection: "row",
    alignItems: 'center'
  },
  namestore: {
    fontSize: 20,
    color: '#000',
    fontWeight: "600"
  }

});