import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Pressable, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import api from '../../services/api';

import { AuthContext } from '../../contexts/authContext';

import Loading from '../../components/Loading';
import ProdutoFeed from '../../components/Produto/ProdutoFeed';
import CabecalhoFeed from '../../components/Cabecalho/CabecalhoFeed';

import Feather from 'react-native-vector-icons/Feather'

export default function Home() {

  const { usuario } = useContext(AuthContext)

  const navigation = useNavigation();
  const focus = useIsFocused()
  const [dadosUsuario, setDadosUsuario] = useState([]);

  useEffect(() => {
    PegarUsuario()


    const { nome, telefone } = dadosUsuario
    if (!nome || !telefone) {
      navigation.navigate("CadastrarDados")
    }

  }, [focus])



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
          columnWrapperStyle={{ justifyContent: 'space-between', margin:5,padding:5 }}
          data={dadosUsuario.produtos}
          renderItem={({ item }) => <ProdutoFeed item={item} />}
          numColumns={2}
          ListHeaderComponent={<CabecalhoFeed data={dadosUsuario}/>}
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

