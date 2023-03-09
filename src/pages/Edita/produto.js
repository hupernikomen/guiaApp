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

      <ScrollView style={{ flex: 1 }}>


        <Text style={styles.tituloinput}>Produto</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.tituloinput}>Descrição</Text>
        <TextInput multiline={true} numberOfLines={0} textAlignVertical={'top'} style={styles.inputdescricao} value={descricao} onChangeText={setDescricao} />

        <Text style={styles.tituloinput}>Tamanho</Text>
        <TextInput style={styles.input} value={String(tamanho)} onChangeText={setTamanho} />

        <Text style={styles.tituloinput}>Preço</Text>
        <TextInput editable={false} style={styles.input} value={preco} onChangeText={setPreco} />

        <Text style={styles.tituloinput}>Preço Oferta</Text>
        <TextInput style={styles.input} value={oferta} onChangeText={setOferta} placeholder="0,00" />

      </ScrollView>
      <TouchableOpacity
        style={styles.btnatualizar}
        onPress={Update}>
        <Feather name='save' size={22} color={'#b82539'} />
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
    marginLeft: 15,
    zIndex: 99,
    fontSize: 16,
    color: '#aaa'
  },
  input: {
    borderWidth: 0,
    paddingHorizontal: 15,
    height: 55,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15

  },
  inputdescricao: {
    minHeight: 55,
    borderWidth: 0,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15

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
    marginVertical: 5,
    elevation: 3
  },
  txtbtnatualizar: {
    color: '#222',
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'Roboto-Medium'
  }


})