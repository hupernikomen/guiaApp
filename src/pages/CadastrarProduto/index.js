import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'


import api from '../../services/api'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function CadastrarProduto() {


    const [name, setName] = useState("")
    const [description, setDescripton] = useState("")
    const [price, setPrice] = useState("")
    const [size, setSize] = useState("")
    const [images, setImages] = useState([])

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 5,
            mediaType: 'photo',
            includeBase64: false,
        },
    }
    const [formData,setFormData] = useState(new FormData())



    async function UploadImage() {
        const image = await launchImageLibrary(options)
        console.log(image);
        formData.append('files', {
            uri: image.assets[0].uri,
            type: image.assets[0].type,
            name: image.assets[0].fileName
        })
        setImages(imagesArr => [...imagesArr, image.assets[0].uri])
    }
    async function CaptureImage() {
        const image = await launchCamera(options)
        formData.append('files', {
            uri: image.assets[0].uri,
            type: image.assets[0].type,
            name: image.assets[0].fileName
        })
        setImages(imagesArr => [...imagesArr, image.assets[0].uri])
    }

    async function CadastrarItem() {

        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('size', size)
        formData.append('categoryID', "3a920409-f91a-4d5b-b30e-05f36a5c66a8")
        formData.append('userID', "9f07fb6a-c479-4e59-a498-3c40953da228")

        await api.post('/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1cGNvbnRhdG9AZ21haWwuY29tIiwiaWF0IjoxNjc2NzMwMzg1LCJzdWIiOiI5ZjA3ZmI2YS1jNDc5LTRlNTktYTQ5OC0zYzQwOTUzZGEyMjgifQ.uUH-MkOQtzS7sFUFEJfN8sLvljym0oSSZ59_T-nfk4o'
            }
        })
            .then(function (response) {
                console.log("response :", response);
            })
            .catch(function (error) {
                console.log("error from image :", error);
            })

    }

    return (
        <View style={styles.tela}>
            <Text style={styles.titulo}>Cadastre seu Produto</Text>


            <ScrollView horizontal >
                {images.map((item, index) => {
                    return <Image key={index} style={styles.imgreference} source={{ uri: item }} />
                })}


            </ScrollView>


            <TouchableOpacity style={styles.btn_cadastrar}
                onPress={UploadImage}>
                <Text style={styles.txt_cadastrar}>
                    Galeria
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn_cadastrar}
                onPress={CaptureImage}>
                <Text style={styles.txt_cadastrar}>
                    Tirar Foto
                </Text>
            </TouchableOpacity>

            <TextInput onChangeText={setName} placeholder="Nome do Produto" value={name} />
            <TextInput onChangeText={setDescripton} placeholder="Detalhes do Produto" value={description} />
            <TextInput onChangeText={setPrice} placeholder="Preço do Produto" value={price} />
            <TextInput onChangeText={setSize} placeholder="Tamanhos do Produto" value={size} />

            <TouchableOpacity style={styles.btn_cadastrar}
                onPress={CadastrarItem}>
                <Text style={styles.txt_cadastrar}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        margin: 14
    },
    scrollreferences: {
    },
    imgreference: {
        width: 80,
        height: 80,
        margin: 2,
        borderRadius: 6
    },
    titulo: {
        fontSize: 25,
        fontWeight: "800",
        color: "#222",
        marginBottom: 14
    },
    container_form: {
    },
    input: {
        fontSize: 16
    },
    btn_cadastrar: {
        alignItems: 'center',
        justifyContent: "center"
    },
    txt_cadastrar: {
        fontSize: 16
    }
})

