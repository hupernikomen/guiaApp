import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import api from '../../services/api';

import { AuthContext } from '../../contexts/authContext';

import Loading from '../../components/Loading';
import ProdutoFeed from '../../components/Produto/ProdutoFeed';
import CabecalhoFeed from '../../components/Cabecalho/CabecalhoFeed';

import { launchImageLibrary } from 'react-native-image-picker';

import Feather from 'react-native-vector-icons/Feather'

export default function Home() {

  const { usuario } = useContext(AuthContext)

  const navigation = useNavigation();
  const focus = useIsFocused()
  const [dadosUsuario, setDadosUsuario] = useState([]);

  const [logo, setLogo] = useState([])

  useEffect(() => {
    
    PegarUsuario()
    
    const { nome, telefone } = dadosUsuario
    if (!nome || !telefone) {
      navigation.navigate("CadastrarDados")
    }
    
  }, [focus])

  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      mediaType: 'photo',
      includeBase64: false,
    },
  }

  async function Logo() {

    await launchImageLibrary(options, (response) => {
      if (response.error || response.didCancel) {
        return;
      }
    })
      .then((response) => {
        
        setLogo(response.assets[0])
        CadastrarLogo()

      })
  }


  async function CadastrarLogo() {
    const formData = new FormData()
    if (logo.length == 0) {
      return
    }

    formData.append('logo', {
      uri: logo.uri,
      type: 'image/jpeg', // ou 'image/png', dependendo do tipo de imagem
      name: logo.fileName
    });


    await api.put(`/usuario?usuarioID=${usuario.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${usuario.token}`
      }
    })
      .then(function (response) {
        console.log("response :", response.status);
      })
      .catch(function (error) {
        console.log("error from image :", error);
      })

  }

  function Header({data}) {

    return (
      <View style={styles.container_header}>
        <View style={styles.me}>
  
  
          <TouchableOpacity
            style={styles.logo}
            onPress={Logo}>
            <Image style={{ width: 60, height: 60 }} source={{ uri: `http://192.168.0.104:3333/files/logo/${data.logo[0]?.filename}` }} />
  
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
  
            <Text style={styles.namestore}>{data.nome}</Text>
            <Text numberOfLines={2} ellipsizeMode='tail'>{data.bio}</Text>
          </View>
        </View>
  
        <TouchableOpacity
          style={styles.btndados}
          onPress={() => navigation.navigate("CadastrarDados")}
        >
          <Feather name='more-vertical' size={22} />
        </TouchableOpacity>
      </View>
    );
  }
  
  
  async function PegarUsuario() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
    await api.get(`/usuario?usuarioID=${usuario.id}`, {headers})
      .then((response) => {

        setDadosUsuario(response.data);
      })
  }


  return (

    <View style={styles.container}>

      <StatusBar backgroundColor={'#fff'} />
      {!dadosUsuario.produtos ? <Loading /> :
        <FlatList
          columnWrapperStyle={{ margin:2}}
          data={dadosUsuario.produtos}
          renderItem={({ item }) => <ProdutoFeed item={item} />}
          numColumns={3}
          ListHeaderComponent={<Header data={dadosUsuario}/>}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}

        />
      }

      <View style={styles.containerbtns}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CadastrarProduto")}
          style={styles.btnadd}>
          <Feather name='plus' size={25} color={"#fff"}/>
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
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 14,
    elevation: 2,
    height: 100
  },
  logo: {
    width: 60,
    height: 60,
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
    color: '#000',
    fontWeight: "700"
  }
,
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
    backgroundColor: '#F9A825'
  },

});

