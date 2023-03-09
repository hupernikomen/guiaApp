import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import api from '../../services/api';

import { AuthContext } from '../../contexts/authContext';

import ProdutoFeed from '../../components/Produto/ProdutoFeed';

import { launchImageLibrary } from 'react-native-image-picker';

import Feather from 'react-native-vector-icons/Feather'

export default function Home() {

  const { usuario } = useContext(AuthContext)

  const navigation = useNavigation();
  const focus = useIsFocused()
  const [dadosHeader, setDadosHeader] = useState([]);

  useEffect(() => {

    PegarUsuario()

  }, [focus])


  function Header() {

    return (
      <View style={styles.container_header}>
        <View style={styles.me}>


          <Image style={[styles.logo, { width: 60, height: 60 }]} source={{ uri: `http://192.168.0.104:3333/files/logo/${dadosHeader.logo[0].filename}` }} />

          <View style={{ flex: 1 }}>

            <Text style={styles.namestore}>{dadosHeader.nome}</Text>
            <Text style={styles.bio} numberOfLines={1} ellipsizeMode='tail'>{dadosHeader.bio}</Text>
            <Text style={styles.contagem}>{dadosHeader.produtos?.length} produtos</Text>
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


  async function PegarUsuario() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
    await api.get(`/usuario?usuarioID=${usuario.id}`, { headers })
      .then((response) => {

        setDadosHeader(response.data);

        const { nome, endereco, bairro, telefone, bio } = response.data
        if (!nome || !endereco || !bairro || !telefone || !bio) {
          navigation.navigate("CadastrarDados")
        }

      })
  }


  return (

    <View style={styles.container}>

      <FlatList
        columnWrapperStyle={{ margin: 2 }}
        data={dadosHeader?.produtos}
        renderItem={({ item }) => <ProdutoFeed item={item} />}
        numColumns={3}
        ListHeaderComponent={<Header data={dadosHeader} />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

      />

      <View style={styles.containerbtns}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CadastrarProduto")}
          style={styles.btnadd}>
          <Feather name='plus' size={25} color={"#fff"} />
        </TouchableOpacity>
      </View>
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
    borderWidth:1.5,
    borderColor:'#ffffff50',
    marginRight: 15,
    borderRadius: 60 / 2,
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imglogo: {
    width: 60,
    height: 60,
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
  },
  containerbtns: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },

  btnadd: {
    width: 55,
    height: 55,
    elevation: 3,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b82539'
  },

});

