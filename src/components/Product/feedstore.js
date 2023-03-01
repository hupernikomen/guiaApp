import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Product({ item }) {

  const navigation = useNavigation();
  return (

    <TouchableOpacity
      onPress={() => { navigation.navigate("EditProduct", item) }}
      activeOpacity={0.8}
      style={styles.containerproduct}>

      <Image
        style={styles.imageproduct}
        source={{ uri: `http://192.168.0.104:3333/files/produtos/${item.imagens[0]?.filename}` }} />

      <View style={styles.containerInfo}>

        <Text numberOfLines={1} style={styles.name}>{item.nome}</Text>

        <View >
          {!!item.oferta ?
            <Oferta oferta={item.oferta} preco={item.preco} /> :
            <Preco preco={item.preco} />
          }

        </View>

      </View>
    </TouchableOpacity>
  );
}

function Preco({ preco }) {
  if (!preco) { return }
  let arrPrice = parseFloat(preco).toFixed(2).split('.')

  return (
    <View style={styles.containerprice}>
      <Text style={styles.cifrao}>R$</Text>
      <Text style={styles.real}>{arrPrice[0]}</Text>
      <Text style={styles.cents}>{arrPrice[1]}</Text>
    </View>
  )
}

function Oferta({ oferta, preco }) {
  let arrOff = parseFloat(oferta).toFixed(2).split('.')

  return (

    <View style={styles.containerprice}>
      <Text style={styles.cifrao}>R$</Text>
      <Text style={styles.real}>{arrOff[0]}</Text>
      <Text style={styles.cents}>{arrOff[1]}</Text>

      <Text style={styles.priceoff}>
        De: {parseFloat(preco).toFixed(2).replace('.', ',')}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  containerproduct: {
    flex: 1,
    maxWidth: "50%",
    padding: 10,
    paddingBottom: 15,
    backgroundColor:"#fff",
    margin:1
  },
  imageproduct: {
    resizeMode: 'contain',
    aspectRatio: 1,
    borderRadius: 4,
  },
  containerprice: {
    flexDirection: 'row',
  },
  cifrao: {
    fontSize: 12,
    color: '#000',
  },
  real: {
    color: '#000',
    fontSize: 20,
    fontWeight:"500",
    marginTop: -5
  },
  cents: {
    color: '#000',
    fontSize: 12,
    marginLeft: 2,
  },
  priceoff: {
    marginLeft: 15,
    textDecorationLine: 'line-through'
  },
  name: {
    fontSize: 15,
    color: '#000'
  },

});