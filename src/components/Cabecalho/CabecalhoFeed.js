import React, { useContext, useEffect, useState, useTransition } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../../services/api';

import Feather from 'react-native-vector-icons/Feather'

import { useNavigation,useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../contexts/authContext';

import { launchImageLibrary } from 'react-native-image-picker';

export default function CabecalhoFeed({data}) {

  const { usuario } = useContext(AuthContext)
  const [logo, setLogo] = useState([])
  const [novalogo, setNovaLogo] = useState("")
  const navigation = useNavigation()


  useEffect(() => {
    setNovaLogo(data.logo[0]?.filename)
  },[])

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
      setLogo(response.assets[0])
    })
      .then(() => {
        CadastrarLogo()

      })
  }

  const formData = new FormData()

  async function CadastrarLogo() {
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

  return (
    <View style={styles.container_header}>
      <View style={styles.me}>


        <TouchableOpacity
        style={styles.logo}
          onPress={Logo}>

        </TouchableOpacity>
        <View style={{flex:1}}>

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

const styles = StyleSheet.create({
  container_header: {
    flexDirection: "row",
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 14,
    elevation: 2,
    height:100
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius:60/2,
    backgroundColor: '#f2f2f2',
    overflow:'hidden',
    alignItems:'center',
    justifyContent:'center'
  },
  imglogo:{
    width: 60,
    height: 60,
  },
  me: {
    flex:1,
    flexDirection: "row",
    paddingRight:15
  },
  namestore: {
    fontSize: 22,
    color: '#000',
    fontWeight: "700"
  }

});