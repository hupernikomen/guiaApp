import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import Loading from '../../components/Loading';
import HeaderStore from '../../components/Headers/feedstore';
import ProductFeedStore from '../../components/Product/feedstore';

export default function Home() {
  const navigation = useNavigation();
  const focus = useIsFocused()
  const [me, setMe] = useState([]);


  useEffect(() => {

    async function Me() {
      const response = await api.get('/me');

      setMe(response.data);

    }
    Me()
  }, [focus])


  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      {!me.produtos ? <Loading /> :
        <FlatList
          data={me.produtos}
          renderItem={({ item }) => <ProductFeedStore item={item} />}
          numColumns={2}
          ListHeaderComponent={<HeaderStore data={me} />}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      }

      <View style={styles.containerbtns}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CadastrarProduto")}
          style={styles.btnedit}>
          <Text>*</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CadastrarProduto")}
          style={styles.btnadd}>
          <Text>+</Text>
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
    backgroundColor: '#fff'
  }

});