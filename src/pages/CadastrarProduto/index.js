import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'

import api from '../../services/api'
import { AuthContext } from "../../contexts/authContext"

import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'
import Ico from 'react-native-vector-icons/MaterialCommunityIcons'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from "@react-native-picker/picker";

export default function CadastrarProduto() {

    useEffect(() => {
        CarregaCategorias()
    }, [])

    const navigation = useNavigation()

    const { usuario } = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false);


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
            maxWidth: 300,
            maxHeight: 400,
            height: 400,
            width: 300,
            mediaType: 'photo',

        },
    }

    async function BuscaFoto() {
        await launchImageLibrary(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }
            setImagens(imagemArray => [...imagemArray, response.assets[0]])

        })
            .then(() => {
                setModalVisible(false)
            })

    }

    async function TirarFoto() {
        await launchCamera(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }
            setImagens(imagemArray => [...imagemArray, response.assets[0]])
        })
            .then(() => {
                setModalVisible(false)
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
            formData.append('files', {
                uri: imagens[i].uri,
                type: 'image/jpeg', // ou 'image/png', dependendo do tipo de imagem
                name: imagens[i].fileName
            });
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
                console.log("response :", response.status);
                navigation.goBack()
            })
            .catch(function (error) {
                console.log("error from image :", error);
            })

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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.areaModal}>
                    <View style={styles.modal}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
                            onPress={BuscaFoto}>
                            <Text style={{ fontSize: 16 }}>
                                Galeria
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
                            onPress={TirarFoto}>
                            <Text style={{fontSize: 16 }}>
                                Tirar Foto
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center' ,
                            position:'absolute',
                            right:10,
                            top:10
                        }}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Ico name="close-thick" size={28}/>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
            <ScrollView style={{ flex: 1 }}>

                <ScrollView horizontal contentContainerStyle={{ alignItems: "center" }}>

                    <TouchableOpacity
                        disabled={imagens.length == 5 && true}
                        style={{ margin: 14 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Feather name="image" size={50} color={"#222"} />
                    </TouchableOpacity>
                    {imagens.map((item, index) => {
                        return <Image
                            key={index}
                            style={styles.fotoReferencia}
                            source={{ uri: item.uri }} />
                    })}

                </ScrollView>

                <TextInput style={styles.input} onChangeText={setNome} placeholder="Nome do Produto" value={nome} />
                <TextInput style={styles.input} onChangeText={setDescricao} placeholder="Detalhes do Produto" value={descricao} />
                <TextInput style={styles.input} keyboardType="numeric" onChangeText={setPreco} placeholder="Preço do Produto" value={preco} />
                <TextInput style={styles.input} onChangeText={setTamanho} placeholder="Tamanhos do Produto" value={tamanho} />

                <Picker
                    style={styles.input}
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

            </ScrollView>

            <TouchableOpacity style={styles.btncadastrar}
                onPress={CadastrarItem}>
                <Text style={styles.txtbtncadastrar}>
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
        width: 45,
        height: 45,
        margin: 2,
        borderRadius: 6
    },
    input: {
        borderWidth: 0,
        paddingHorizontal: 15,
        marginVertical: 5,
        height: 55,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "#fff"
    },
    inputdescricao: {
        borderWidth: 0,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "#fff",

    },
    btncadastrar: {
        backgroundColor: '#F9A825',
        height: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    txtbtncadastrar: {
        color: '#fff',
        fontSize: 16
    },
    areaModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 50,
        paddingHorizontal: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

