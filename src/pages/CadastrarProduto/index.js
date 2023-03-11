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
        <>

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
                style={styles.tela}>
                <View
                    style={styles.containerfotos}>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={styles.scrollfotos}>

                        {imagens.map((item, index) => {
                            return <Image
                                key={index}
                                style={styles.fotoReferencia}
                                source={{ uri: item.uri }} />
                        })}

                    </ScrollView>

                    <TouchableOpacity
                        disabled={imagens.length == 5 && true}
                        style={{ marginHorizontal: 20 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >

                        <Text
                            style={[styles.linkfotos, { color: imagens.length === 5 ? "#aaa" : "#b82539" }]}>
                            Selecionar Fotos
                        </Text>

                        {imagens.length == 0 ?
                            <Text>
                                Escolha a imagem capa do seu produto...
                            </Text>
                            :
                            <Text>
                                Você carregou {imagens.length}/5 imagens
                            </Text>

                        }
                    </TouchableOpacity>
                </View>



                <View style={styles.containerinput}>
                    <Text>
                        Produto
                    </Text>
                    <TextInput
                    style={styles.input}
                    multiline
                    maxLength={35}
                    onChangeText={setNome}
                    placeholder="..."
                    value={nome} />
                </View>

                <View style={styles.containerinput}>
                    <Text>
                        Preço
                    </Text>
                    <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={setPreco}
                    placeholder="..."
                    value={preco} />
                </View>

                <View style={styles.containerinput}>
                    <Text>
                        Detalhes do produto
                    </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setDescricao}
                    multiline
                    placeholder="..."
                    value={descricao} />

                </View>

                <View style={styles.containerinput}>
                    <Text>
                        Tamanhos
                    </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={setTamanho}
                    placeholder="..."
                    value={tamanho} />
                </View>
                <Text
                    style={styles.info}>
                    Separado por virgula. Ex.: P , M , GG
                </Text>


                <View style={styles.containerinput}>
                <Text>
                    Categoria do produto
                </Text>
                <Picker
                    mode="dialog"
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
                            />
                        );
                    })}
                </Picker>
                </View>

            </ScrollView>
            <TouchableOpacity
                style={styles.btncadastrar}
                onPress={CadastrarItem}>
                <Feather
                    name='save'
                    size={28}
                    color={'#fff'} />
            </TouchableOpacity>


        </>
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
    containerfotos: {
        marginBottom: 25
    },
    linkfotos: {
        fontSize: 16,
        fontFamily: "Roboto-Regular"

    },
    scrollfotos: {
        marginBottom: 14,
        marginLeft: 18,
    },
    fotoReferencia: {
        width: 60,
        height: 60,
        margin: 2,
        borderRadius: 6
    },
    containerinput: {
        backgroundColor: '#fff',
        width: "100%",
        minHeight: 80,
        marginBottom: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    input: {
        fontSize:16,
        fontFamily:'Roboto-Regular'
    },
    info: {
        alignSelf: 'flex-end',
        marginTop: -15,
        marginBottom: 15,
        fontFamily: 'Roboto-LightItalic'
    },

    btncadastrar: {
        width: 60,
        height: 60,
        elevation: 5,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b82539',
        bottom: 30,
        right: 20,
        position: "absolute"
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

