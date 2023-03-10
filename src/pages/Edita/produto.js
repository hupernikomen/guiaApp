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
  const [tamanho, setTamanho] = useState([])
  const [cor, setCor] = useState('')
  const [id, setID] = useState('')

  const [categoriaID, setCategoriaID] = useState('')

  useEffect(() => {


    const { nome, descricao, preco, oferta, tamanho, cor, categoriaID, id } = route.params

    setNome(nome)
    setDescricao(descricao)
    setPreco(preco)
    setOferta(oferta)

    setTamanho(tamanho)
    setCor(cor)
    setCategoriaID(categoriaID)
    setID(id)

    navigation.setOptions({
      title: nome && nome,
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={Delete}>
            <Feather name='trash' size={24} color={'#fff'} />
          </TouchableOpacity>
        )
      }
    })
  }, [focus])


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
    <View
      style={styles.tela}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>


        <Text
          style={styles.tituloinput}>
          Produto
        </Text>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome} />

        <Text
          style={styles.tituloinput}>
          Descrição
        </Text>

        <TextInput
          multiline={true}
          numberOfLines={0}
          verticalAlign={'top'}
          style={styles.inputdescricao}
          value={descricao}
          onChangeText={setDescricao} />

        <Text
          style={styles.tituloinput}>
          Tamanho
        </Text>

        <TextInput
          style={styles.input}
          value={String(tamanho)}
          onChangeText={setTamanho} />

        <Text
          style={styles.tituloinput}>
          Preço não editável
        </Text>

        <TextInput
          editable={false}
          style={styles.input}
          value={preco}
          onChangeText={setPreco} />

        <Text
          style={styles.tituloinput}>
          Preço Oferta
        </Text>

        <TextInput
          style={styles.input}
          value={oferta}
          onChangeText={setOferta}
          placeholder="0,00" />

        <TouchableOpacity
          style={styles.btnatualizar}
          onPress={Update}>

          <Feather
            name='save'
            size={22}
            color={'#b82539'} />

          <Text
            style={styles.txtbtnatualizar}>
            Atualizar
          </Text>

        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  tela: {
    flex: 1,
    padding: 14
  },
  fotoReferencia: {
    width: 50,
    height: 50,
    margin: 2,
    borderRadius: 6
  },
  containerExcluir: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  tituloinput: {
    marginLeft: 20,
    backgroundColor: '#fff',
    marginBottom: -25,
    zIndex: 99,
    color: '#777',
    fontFamily: 'Roboto-LightItalic'
  },
  input: {
    borderWidth: 0,
    paddingHorizontal: 20,
    height: 70,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15
  },
  inputdescricao: {
    paddingVertical: 25,
    minHeight: 70,
    borderWidth: 0,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",

  },
  info: {
    fontSize: 15,
    marginTop: 10,
    color: '#aaa',
    fontFamily: 'Roboto-LightItalic'
  },
  btnatualizar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginVertical: 30
  },
  txtbtnatualizar: {
    color: '#222',
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'Roboto-Medium'
  }


})