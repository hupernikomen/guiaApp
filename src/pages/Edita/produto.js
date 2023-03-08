import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { useRoute, useIsFocused, useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../contexts/authContext"

import Feather from 'react-native-vector-icons/Feather'

import api from '../../services/api';

export default function EditProduct() {
  const { usuario } = useContext(AuthContext)
  const route = useRoute()
  const focus = useIsFocused()
  const navigation = useNavigation()

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [oferta, setOferta] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [cor, setCor] = useState('')
  const [id, setID] = useState('')
  const [arrImagens, setArrImagens] = useState([])

  const [categoriaID, setCategoriaID] = useState('')

  useEffect(() => {


    const { nome, descricao, preco, oferta, tamanho, cor, categoriaID, id, imagens } = route.params

    setNome(nome)
    setDescricao(descricao)
    setPreco(preco)
    setOferta(oferta)
    setTamanho(tamanho)
    setCor(cor)
    setCategoriaID(categoriaID)
    setID(id)
    setArrImagens(imagens)

  }, [focus])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={Delete}>
            <Feather name='trash' size={24} color={'#F9A825'} />
          </TouchableOpacity>
        )
      }
    })
  }, [])

  async function Update() {

    const produto = {
      nome,
      descricao,
      preco,
      oferta,
      tamanho,
      cor,
      categoriaID,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }

    await api.put(`/produto?produtoID=${route.params?.id}`, produto, { headers })
      .then((response) => {
        console.log(response.status);
        navigation.goBack()

      })
      .catch((err) => {
        console.error(err.response);
      })
  }


  async function Delete() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }

    console.log(id);

    await api.delete(`/produto?produtoID=${route.params?.id}`, { headers })
      .then((response) => {
        console.log(response.status);
        navigation.goBack()
      })
      .catch((err) => {
        console.log(err.response);
      })

  }

  return (
    <View style={styles.tela}>

      <View style={styles.containerExcluir}>

        <ScrollView style={styles.scrollimagens} horizontal >
          {arrImagens.map((item, index) => {
            return <Image
              key={index}
              style={styles.fotoReferencia}
              source={{ uri: `http://192.168.0.104:3333/files/produtos/${item.filename}` }} />
          })}

        </ScrollView>

        <Text style={styles.info}>Imagens não podem ser editadas</Text>

      </View>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput multiline={true} numberOfLines={0} textAlignVertical={'top'} style={styles.inputdescricao} value={descricao} onChangeText={setDescricao} />
      <TextInput style={styles.input} value={preco} onChangeText={setPreco} />
      <TextInput style={styles.input} value={oferta} onChangeText={setOferta} placeholder="Oferta" />

      <TouchableOpacity
      style={styles.btnatualizar}
        onPress={Update}>
        <Text style={styles.txtbtnatualizar}>Atualizar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  tela: {
    flex: 1,
    padding: 14
  },
  fotoReferencia: {
    width: 60,
    height: 60,
    margin: 2,
    borderRadius: 6
  },
  containerExcluir: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  input: {
    borderWidth: 0,
    paddingHorizontal: 15,
    marginVertical: 5,
    height: 55,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "#fff"
  },
  inputdescricao: {
    
    borderWidth: 0,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "#fff",

  },
  info:{
    fontSize:15,
    marginTop:10,
    color:'#aaa'
  },
  btnatualizar: {
    backgroundColor:'#F9A825',
    height:55,
    borderRadius: 55/2,
    alignItems:'center',
    justifyContent:'center',
    marginVertical: 5,
  },
  txtbtnatualizar: {
    color:'#fff',
    fontSize:16
  }


})