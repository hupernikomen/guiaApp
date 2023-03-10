import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native';

export default function HeaderHome({ data }) {

  const { logo } = data

  const navigation = useNavigation()

  return (
    <View style={styles.container_header}>

      <View style={styles.me}>

        {logo &&
          <Image
            style={[styles.logo, { width: 60, height: 60 }]}
            source={{ uri: `http://192.168.0.104:3333/files/logo/${logo[0].filename}` }} />
        }


        <View style={{ flex: 1 }}>

          <Text style={styles.namestore}>{data.nome}</Text>
          <Text style={styles.bio} numberOfLines={1} ellipsizeMode='tail'>{data.bio}</Text>
          <Text style={styles.contagem}>{data.produtos?.length} produtos</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btndados}
        onPress={() => navigation.navigate("CadastrarDados")}
      >
        <Feather name='more-vertical' size={22} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_header: {
    flexDirection: "row",
    backgroundColor: '#b82539',
    justifyContent: 'space-between',
    padding: 14,
    elevation: 5,
    height: 100
  },
  logo: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#ffffff80',
    marginRight: 15,
    borderRadius: 60 / 2,
  },
  me: {
    flex: 1,
    flexDirection: "row",
    paddingRight: 15
  },
  namestore: {
    fontSize: 22,
    color: '#fff',
    fontFamily: "Roboto-Bold"
  },
  bio: {
    color: '#fff',
    fontFamily: 'Roboto-Light'
  },
  contagem: {
    color: '#fff',
    fontFamily: "Roboto-Light"
  }

});

