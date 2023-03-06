import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Pressable, Modal } from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
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
  const [me, setMe] = useState([]);

  useEffect(() => {
    Me()


    const { nome, telefone } = me
    if (!nome || !telefone) {
      navigation.navigate("CadastrarDados")
    }

  }, [focus])



  async function Me() {
    await api.get(`/usuario?usuarioID=${usuario.id}`)
      .then((response) => {

        setMe(response.data);
      })
  }


  return (

    <View style={styles.container}>


      <StatusBar backgroundColor={'#fff'} />
      {!me.produtos ? <Loading /> :
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', margin: 5 }}
          data={me.produtos}
          renderItem={({ item }) => <ProdutoFeed item={item} />}
          numColumns={2}
          ListHeaderComponent={<CabecalhoFeed data={me} />}
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
    bottom: 20,
    right: 14,
  },

  btnedit: {
    width: 60,
    height: 60,
    elevation: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',

    marginBottom: 10
  },
  btnadd: {
    width: 60,
    height: 60,
    elevation: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#rgb(226,135,67)'
  },

});

