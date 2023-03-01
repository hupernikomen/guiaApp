import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { AuthContext } from "../../contexts/authContext"

import api from '../../services/api';

export default function EditProduct() {
  const { user } = useContext(AuthContext)
  const route = useRoute()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [off, setOff] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')

  const [categoryID, setCategoryID] = useState('')
  const [productID, setProductID] = useState('')

  useEffect(() => {

    const { name, description, price, off, size, color, categoryID, id } = route.params

    setName(name)
    setDescription(description)
    setPrice(price)
    setOff(off)
    setSize(size)
    setColor(color)
    setCategoryID(categoryID)
    setProductID(id)


  }, [])

  async function Update() {

    console.log(name);
    await api.put('/product',{
      data:{
        name:name,
        description:description,
        price:price,
        off:off,
        size:size,
        color:color,
        categoryID:categoryID,
        id: productID
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(() =>{
      console.log("ok");
    })
    .catch((err) => {
      console.error(err.response);
    })
  }

  return (
    <View style={styles.tela}>

      <TextInput value={name} onChangeText={setName} />
      <TextInput value={description} onChangeText={setDescription} />
      <TextInput value={price} onChangeText={setPrice} />
      <TextInput value={off ? off : "0,00"} onChangeText={setOff} />

      <TouchableOpacity 
      onPress={Update}>
        <Text>Atualizar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  tela: {
    flex: 1,
    padding: 10
  }

})