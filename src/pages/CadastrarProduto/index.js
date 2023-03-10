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
        <View
            style={styles.tela}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View
                    style={styles.areaModal}>
                    <View
                        style={styles.modal}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
                            onPress={BuscaFoto}>
                            <Text
                                style={{ fontSize: 16 }}>
                                Galeria
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
                            onPress={TirarFoto}>
                            <Text
                                style={{ fontSize: 16 }}>
                                Tirar Foto
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'absolute',
                                right: 10,
                                top: 10
                            }}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Ico
                                name="close-thick"
                                size={28} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ alignItems: "center" }}>

                    <TouchableOpacity
                        disabled={imagens.length == 5 && true}
                        style={{ margin: 14 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Feather
                            name="image"
                            size={50}
                            color={"#e58003"} />
                    </TouchableOpacity>
                    {imagens.map((item, index) => {
                        return <Image
                            key={index}
                            style={styles.fotoReferencia}
                            source={{ uri: item.uri }} />
                    })}

                </ScrollView>

                {imagens.length == 0 ?
                    <Text
                        style={styles.contagemimagens}>
                        Escolha a imagem capa do seu produto...
                    </Text>
                    :
                    <Text
                        style={styles.contagemimagens}>
                        Você carregou {imagens.length}/5 imagens
                    </Text>

                }

                <Text
                    style={styles.tituloinput}>
                    Produto
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    placeholder="..."
                    value={nome} />

                <Text
                    style={styles.tituloinput}>
                    Preço
                </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={setPreco}
                    placeholder="..."
                    value={preco} />

                <Text
                    style={styles.tituloinput}>
                    Detalhes do produto
                </Text>
                <TextInput style={styles.input} onChangeText={setDescricao} placeholder="..." value={descricao} />

                <Text
                    style={styles.tituloinput}>
                    Tamanhos
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTamanho}
                    placeholder="..."
                    value={tamanho} />
                <Text
                    style={styles.info}>
                    Separado por virgula. Ex.: P , M , GG
                </Text>


                <Text
                    style={styles.tituloinput}>
                    Categoria do produto
                </Text>
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
                        label="..."
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

                <TouchableOpacity
                    style={styles.btncadastrar}
                    onPress={CadastrarItem}>
                    <Feather
                        name='save'
                        size={22}
                        color={'#b82539'} />
                    <Text
                        style={styles.txtbtncadastrar}>
                        Salvar
                    </Text>
                </TouchableOpacity>
            </ScrollView>


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
    contagemimagens: {
        marginBottom: 15,
        fontSize: 16,
        marginLeft: 15,
        fontFamily: "Roboto-Light"
    },
    fotoReferencia: {
        width: 45,
        height: 45,
        margin: 2,
        borderRadius: 6
    },
    tituloinput: {
        backgroundColor: '#fff',
        marginLeft: 20,
        marginBottom: -25,
        zIndex: 99,
        color: '#777',
        fontFamily: 'Roboto-LightItalic'
    },
    input: {
        borderWidth: 0,
        paddingHorizontal: 20,
        height: 70,
        borderRadius: 20,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 15
    },
    inputdescricao: {
        paddingVertical: 25,
        minHeight: 100,
        borderWidth: 0,
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    info: {
        alignSelf: 'flex-end',
        marginTop: -15,
        marginBottom: 15,
        fontFamily: 'Roboto-LightItalic'
    },

    btncadastrar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginVertical: 30
    },
    txtbtncadastrar: {
        color: '#222',
        fontSize: 16,
        marginLeft: 15,
        fontFamily: 'Roboto-Medium'
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

