import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { AuthContext } from "../../contexts/authContext"

import api from '../../services/api';

import IcoMc from 'react-native-vector-icons/MaterialCommunityIcons'
import IcoFeather from 'react-native-vector-icons/Feather'
import { launchImageLibrary } from 'react-native-image-picker';

import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function CadastrarDados() {
    const navigation = useNavigation()
    const focus = useIsFocused()
    const { UpdateUsuario, usuario } = useContext(AuthContext)

    const [logo, setLogo] = useState([])

    const [nome, setNome] = useState("")
    const [endereco, setEndereco] = useState("")
    const [bairro, setBairro] = useState("")
    const [bio, setBio] = useState("")
    const [telefone, setTelefone] = useState("")
    const [entrega, setEntrega] = useState(false)

    const toggleSwitch = () => setEntrega(previousState => !previousState);


    useEffect(() => {

        PegarUsuario()

    }, [focus])

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            maxWidth: 70,
            maxHeight: 70,
            height: 70,
            width: 70,
            mediaType: 'photo',

        },
    }


    async function Logo() {

        await launchImageLibrary(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }else{

                setLogo(response.assets[0])
                CadastrarLogo(response.assets[0])
            }
        })
    }


    async function CadastrarLogo(assets) {
        const formData = new FormData()

        formData.append('logo', {
            uri: assets.uri,
            type: 'image/jpeg', // ou 'image/png', dependendo do tipo de imagem
            name: assets.fileName
        });


        await api.put(`/usuario?usuarioID=${usuario.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${usuario.token}`
            }
        })
            .then(function (response) {
                console.log(response.status);
            })
            .catch(function (error) {
                console.log("error from image :", error);
            })

    }


    async function PegarUsuario() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
        }
        await api.get(`/usuario?usuarioID=${usuario.id}`, { headers })
            .then((response) => {
                setNome(response.data?.nome)
                setEndereco(response.data?.endereco)
                setBairro(response.data?.bairro)
                setTelefone(response.data?.telefone)
                setBio(response.data?.bio)
                setEntrega(response.data?.entrega)
            })
    }

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.tela}>


                <TouchableOpacity
                    onPress={Logo}
                    style={styles.links}>

                    <Text
                        style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>
                        Logo
                    </Text>

                    <IcoMc name='account-box' size={30} color={'#b82539'} />

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Mapa")}
                    style={styles.links}>

                    <Text
                        style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>
                        Localização
                    </Text>
                    <IcoMc
                        name='map-marker'
                        size={30}
                        color={'#b82539'} />

                </TouchableOpacity>

                <View style={[styles.links, { marginBottom: 30 }]}>

                    <Text
                        style={{ color: '#222', fontFamily: "Roboto-Regular", fontSize: 16 }}>
                        Entregas
                    </Text>

                    <Switch
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={entrega ? '#b82539' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={entrega}
                    />
                </View>

                <View
                    style={styles.containerinput}>
                    <Text>
                        Nome da Loja
                    </Text>

                    <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome} placeholder=" ... "
                    maxLength={35} />
                </View>

                <View
                    style={styles.containerinput}>
                    <Text>
                        Endereço
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={setEndereco}
                        value={endereco}
                        placeholder="..."
                        maxLength={35} />
                </View>

                <View
                    style={styles.containerinput}>
                    <Text>
                        Bairro
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={setBairro}
                        value={bairro}
                        placeholder="..."
                        maxLength={35} />
                </View>

                <View
                    style={styles.containerinput}>
                    <Text>
                        Whatsapp
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={setTelefone}
                        value={telefone}
                        placeholder=" ... " />
                </View>

                <View
                    style={styles.containerinput}>
                    <Text>
                        Sobre seu negócio
                    </Text>

                    <TextInput
                        style={styles.input}
                        multiline numberOfLines={0}
                        verticalAlign={'top'}
                        maxLength={300}
                        onChangeText={setBio}
                        value={bio}
                        placeholder="Bio" />
                    <Text
                        style={{ alignSelf: "flex-end" }}>
                        {bio.length}/300
                    </Text>

                </View>


            </ScrollView>
            <TouchableOpacity

                style={styles.btnatualizar}
                onPress={() => {
                    UpdateUsuario(entrega, nome, endereco, bairro, telefone, bio)
                    navigation.navigate("Home")
                }
                }>
                <IcoFeather
                    name='save'
                    size={28}
                    color={'#fff'} />


            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        padding: 14,
    },
    links: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
        marginLeft: 20,
        paddingVertical: 5,
        borderBottomWidth: .5,
        borderBottomColor: "#777"
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
    btnatualizar: {
        width: 60,
        height: 60,
        elevation: 5,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b82539',
        bottom: 30,
        right: 20,
        position: "absolute",
        
    }

})