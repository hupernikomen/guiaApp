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
      <View style={{flexDirection:"row"}}>

      <Text style={styles.cifrao}>R$</Text>
      <Text style={styles.real}>{arrPrice[0]}</Text>
      <Text style={styles.cents}>,{arrPrice[1]}</Text>
      </View>
    </View>
  )
}

function Oferta({ oferta, preco }) {
  let arrOff = parseFloat(oferta).toFixed(2).split('.')

  CalculoOferta(preco, oferta)

  return (
    <View style={styles.containerprice}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.cifrao}>R$</Text>
        <Text style={styles.real}>{arrOff[0]}</Text>
        <Text style={styles.cents}>,{arrOff[1]}</Text>
      </View>

      <Text style={styles.priceoff}>
        {CalculoOferta(preco, oferta)}

      </Text>
    </View>
  )
}

function CalculoOferta(preco, oferta) {
  const valor = ((oferta * 100) / preco)

  return (
    <Text>-{valor.toFixed(0)}%</Text>
  )

}

const styles = StyleSheet.create({
  containerproduct: {
    flex: 1,
    maxWidth: "32%",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 6,
    margin:4
  },
  containerInfo: {
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  imageproduct: {
    resizeMode: 'cover',
    aspectRatio: .95,
  },
  containerprice: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cifrao: {
    fontSize: 10,
    color: '#777',
    marginTop: 2,
    fontFamily:"Roboto-Regular",
  },
  real: {
    color: '#222',
    fontSize: 16,
    marginTop: -2,
    marginLeft: 3,
    fontFamily:"Roboto-Bold",
  },
  cents: {
    color: '#222',
    fontSize: 12
  },
  priceoff: {
    backgroundColor: "#e58003",
    padding:2,
    color: '#fff',
    fontSize: 12

  },
  name: {
    color: '#000',
    fontFamily:"Roboto-Regular",
    marginVertical: 2,
    fontSize:13
  },

});