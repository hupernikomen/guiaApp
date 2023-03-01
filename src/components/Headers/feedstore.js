import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';


export default function CabecalhoUsuario({ data }) {

  const [me, setMe] = useState([])

  useEffect(() => {

    setMe(data)
  }, [])

  return (
    <View style={styles.container_header}>
      <View style={styles.avatar}></View>
      <View>

        <Text style={styles.namestore}>{me.dados?.nome}</Text>
        <Text>{me.dados?.bio}</Text>
        <Text>{me.dados?.telefone}</Text>
        <Text>{me.formato?.entrega ? "Faço Entregas" : null}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius:30,
    marginRight:15,
    backgroundColor: '#ddd'
  },
  container_header: {
    flexDirection:"row",
    backgroundColor:'#fff',
    padding:10
  },
  namestore: {
    fontSize: 20,
    color: '#000'
  }

});