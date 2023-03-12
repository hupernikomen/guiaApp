import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

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
            onPress={ConfirmaExclusao}>
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

  async function ConfirmaExclusao(e) {

    Alert.alert("Excluir Produto", `Deseja excluir o item: \n${route.params?.nome} \nR$ ${route.params?.preco}`, [
      {
        text: "Sim",
        onPress: () => {
          Delete()

        },
      },
      { text: "Não" },
    ])
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
    <>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.tela}>

        <View style={styles.containerinput}>

          <Text>
            Produto
          </Text>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome} />
        </View>

        <View style={styles.containerinput}>

          <Text>
            Descrição
          </Text>

          <TextInput
            multiline={true}
            numberOfLines={0}
            verticalAlign={'top'}
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao} />
        </View>

        <View style={styles.containerinput}>
          <Text>
            Tamanho
          </Text>

          <TextInput
            style={styles.input}
            value={String(tamanho)}
            onChangeText={setTamanho} />
        </View>
        <Text style={styles.infoinputs}>Separe os tamanhos com virgula. Ex: P , M , GG</Text>

        <View style={styles.containerinput}>

          <Text>
            Preço
          </Text>

          <TextInput
            editable={false}
            style={styles.input}
            value={preco}
            onChangeText={setPreco} />
        </View>
        <Text style={styles.infoinputs}>Se deseja mudar o preço, sugerimos utilizar o campo 'Preço Oferta' a seguir</Text>

        <View style={styles.containerinput}>

          <Text>
            Preço Oferta
          </Text>

          <TextInput
            style={styles.input}
            value={oferta}
            onChangeText={setOferta}
            placeholder="0,00" />
        </View>

      </ScrollView>
      <TouchableOpacity
        style={styles.btnatualizar}
        onPress={Update}>

        <Feather
          name='save'
          size={28}
          color={'#fff'} />


      </TouchableOpacity>

    </>
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
  containerinput: {
    backgroundColor: '#fff',
    width: "100%",
    minHeight: 80,
    marginBottom: 6,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    padding: 0
  },
  infoinputs:{
    color:'#aaa',
    fontFamily:'Roboto-Italic',
    marginLeft: 20, 
    marginBottom: 20 
  },
  btnatualizar: {
    width: 60,
    height: 60,
    elevation: 5,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b82539',
    bottom: 30,
    right: 15,
    position: "absolute"
  }


})