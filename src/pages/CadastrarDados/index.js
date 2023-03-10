import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { AuthContext } from "../../contexts/authContext"

import api from '../../services/api';

import Feather from 'react-native-vector-icons/Feather'
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
            }
        })
            .then((response) => {

                setLogo(response.assets[0])
                CadastrarLogo(response.assets[0])

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

        <ScrollView showsVerticalScrollIndicator={false} style={styles.tela}>


            <TouchableOpacity
                onPress={Logo}
                style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 15, paddingVertical: 15, borderBottomWidth: .5, borderBottomColor: "#777" }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>Foto Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Mapa")}
                style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 15, paddingVertical: 15, borderBottomWidth: .5, borderBottomColor: "#777" }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>Minha Localização</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 25, flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                <Text style={{ color: '#222', fontFamily: "Roboto-Regular", fontSize: 16, marginLeft: 15 }}>Faço Entregas</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#ddd' }}
                    thumbColor={entrega ? '#b82539' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={entrega}
                />
            </View>

            <View style={styles.containerinput}>
                <Text style={styles.tituloinput}>Nome da Loja</Text>
                <TextInput style={styles.input} onChangeText={setNome} value={nome} placeholder=" ... " maxLength={35} />
            </View>

            <View style={styles.containerinput}>
                <Text style={styles.tituloinput}>Endereço</Text>
                <TextInput style={styles.input} onChangeText={setEndereco} value={endereco} placeholder="..." maxLength={35} />
            </View>

            <View style={styles.containerinput}>
                <Text style={styles.tituloinput}>Bairro</Text>
                <TextInput style={styles.input} onChangeText={setBairro} value={bairro} placeholder="..." maxLength={35} />
            </View>

            <View style={styles.containerinput}>
                <Text style={styles.tituloinput}>Whatsapp</Text>
                <TextInput style={styles.input} onChangeText={setTelefone} value={telefone} placeholder=" ... " />
            </View>

            <View style={styles.containerinput}>
                <Text style={styles.tituloinput}>Sobre seu negócio</Text>
                <TextInput multiline numberOfLines={0} verticalAlign={'top'} maxLength={300} style={styles.inputdescricao} onChangeText={setBio} value={bio} placeholder="Bio" />
                <Text style={{ alignSelf: "flex-end" }}>{bio.length}/300</Text>
            </View>


            <TouchableOpacity
                style={styles.btnatualizar}
                onPress={() => {
                    UpdateUsuario(entrega, nome, endereco, bairro, telefone, bio)
                    navigation.navigate("Home")
                }
                }>
                <Feather name='save' size={22} color={'#b82539'} />
                <Text style={styles.txtbtnatualizar}>Atualizar Informações</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        padding: 14,
    },
    tituloinput: {
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
        minHeight: 100,
        borderWidth: 0,
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "#fff",

    },
    btnatualizar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginBottom: 30
    },
    txtbtnatualizar: {
        color: '#222',
        fontSize: 16,
        marginLeft: 15,
        fontFamily: 'Roboto-Medium'
    }

})