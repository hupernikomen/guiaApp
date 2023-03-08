import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Produto({ item }) {

  const navigation = useNavigation();

  return (

    <TouchableOpacity
      onPress={() => { navigation.navigate("EditaProduto", item) }}
      activeOpacity={0.8}
      style={styles.containerproduct}>

      <Image
        style={styles.imageproduct}
        source={{ uri: `http://192.168.0.104:3333/files/produtos/${item.imagens[0]?.filename}` }} />

      <View style={styles.containerInfo}>

        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.name}>{item.nome}</Text>

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
      <Text style={styles.cents}>,{arrPrice[1]}</Text>
    </View>
  )
}

function Oferta({ oferta, preco }) {
  let arrOff = parseFloat(oferta).toFixed(2).split('.')

  CalculoOferta(preco, oferta)

  return (
    <View style={styles.containerprice}>
      <Text style={styles.cifrao}>R$</Text>
      <Text style={styles.real}>{arrOff[0]}</Text>
      <Text style={styles.cents}>,{arrOff[1]}</Text>

      <Text style={styles.priceoff}>
        {CalculoOferta(preco, oferta)}

      </Text>
    </View>
  )
}

function CalculoOferta(preco, oferta) {
  const valor = ((oferta * 100) / preco)

  return (
    <Text>{valor.toFixed(0)}% Off</Text>
  )

}

const styles = StyleSheet.create({
  containerproduct: {
    flex: 1 / 2,
    maxWidth: "48.5%",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 6
  },
  containerInfo: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  imageproduct: {
    resizeMode: 'cover',
    aspectRatio: .95,
  },
  containerprice: {
    flexDirection: 'row',
  },
  cifrao: {
    fontSize: 10,
    color: '#777',
    marginTop: 2
  },
  real: {
    color: '#222',
    fontSize: 20,
    marginTop: -2,
    marginLeft: 3
  },
  cents: {
    color: '#222',
  },
  priceoff: {
    marginLeft: 10,
    backgroundColor: "#F9A825",
    paddingVertical:2,
    paddingHorizontal:5,
    color:'#fff',

  },
  name: {
    color: '#000',
    marginVertical: 2
  },

});