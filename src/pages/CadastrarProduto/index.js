import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'

import api from '../../services/api'
import { AuthContext } from "../../contexts/authContext"

import { useNavigation } from "@react-navigation/native";

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from "@react-native-picker/picker";

export default function CadastrarProduto() {

    useEffect(() => {
        CarregaCategorias()
    }, [])

    const navigation = useNavigation()

    const { usuario } = useContext(AuthContext)

    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [preco, setPreco] = useState("")
    const [tamanho, setTamanho] = useState("")
    const [imagens, setImagens] = useState([])

    const [listaCategorias, setListaCategorias] = useState([])
    const [categoria, setCategoria] = useState("")

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 5,
            mediaType: 'photo',
            includeBase64: false,
        },
    }

    async function BuscaFoto() {
        await launchImageLibrary(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }
            setImagens(imagemArray => [...imagemArray, response.assets[0]])

        })

    }

    async function TirarFoto() {
        await launchCamera(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }
            setImagens(imagemArray => [...imagemArray, response.assets[0]])
        })
    }
    const formData = new FormData()

    async function CadastrarItem() {
        if (nome == "" || descricao == "" || preco == "" || categoria == "" || imagens.length == 0) {
            return
        }

        formData.append('nome', nome)
        formData.append('descricao', descricao)
        formData.append('preco', preco)
        formData.append('tamanho', tamanho)
        for (let i = 0; i < imagens.length; i++) {
            // console.log(imagens[i], "imagens selecionadas prontas para envio");
            formData.append('files', imagens[i]);
        }
        formData.append('categoriaID', categoria)
        formData.append('usuarioID', usuario.id)


        await api.post('/produto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${usuario.token}`
            }
        })
            .then(function (response) {
                console.log("response :", response);
                navigation.goBack()
            })
            .catch(function (error) {
                console.log("error from image :", error);
            })

            // console.log(formData, "formData após o envio")
    }

    async function CarregaCategorias() {
        await api.get('/categorias')
            .then((res) => {
                setListaCategorias(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <View style={styles.tela}>

            {console.log(imagens)}

            <ScrollView horizontal >
                {imagens.map((item, index) => {
                    return <Image
                        key={index}
                        style={styles.fotoReferencia}
                        source={{ uri: item.uri }} />
                })}
            </ScrollView>


            <TouchableOpacity style={{}}
                onPress={BuscaFoto}>
                <Text style={{}}>
                    Galeria
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{}}
                onPress={TirarFoto}>
                <Text style={{}}>
                    Tirar Foto
                </Text>
            </TouchableOpacity>

            <TextInput onChangeText={setNome} placeholder="Nome do Produto" value={nome} />
            <TextInput onChangeText={setDescricao} placeholder="Detalhes do Produto" value={descricao} />
            <TextInput keyboardType="numeric" onChangeText={setPreco} placeholder="Preço do Produto" value={preco} />
            <TextInput onChangeText={setTamanho} placeholder="Tamanhos do Produto" value={tamanho} />

            <Picker
                style={styles.picker}
                mode="dropdown"
                selectedValue={categoria}
                onValueChange={(itemValue, itemIndex) => {
                    setCategoria(itemValue);
                }}
            >
                <Picker.Item
                    value="0"
                    label="Categoria"
                    enabled={false}
                    style={{ color: "#999" }}
                />


                {listaCategorias.map((item) => {
                    return (
                        <Picker.Item
                            key={item.id}
                            value={item.id}
                            label={item.nome}
                            style={{ fontSize: 15, padding: 0 }}
                        />
                    );
                })}
            </Picker>

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
    picker: {
        borderWidth: 1,
        borderColor: "#333"
    },
    fotoReferencia: {
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
        justifyContent: "center",
        height: 80,
    },
    txt_cadastrar: {
        fontSize: 16
    }
})

