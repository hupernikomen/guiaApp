import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from "../../contexts/authContext"

import api from '../../services/api';

import Feather from 'react-native-vector-icons/Feather'

import { useNavigation, useIsFocused } from '@react-navigation/native';

import { launchImageLibrary } from 'react-native-image-picker';


export default function CadastrarDados() {
    const navigation = useNavigation()
    const focus = useIsFocused()
    const { UpdateUsuario, usuario } = useContext(AuthContext)

    const [nome, setNome] = useState("")
    const [bio, setBio] = useState("")
    const [telefone, setTelefone] = useState("")



    useEffect(() => {

        PegarUsuario()

        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Mapa")}
                        activeOpacity={.7}>
                        <Text style={{ fontSize: 16, alignSelf: 'flex-end', marginBottom: 14, color: "#F9A825" }}>Minha Localização</Text>
                    </TouchableOpacity>
                )
            }
        })
    }, [focus])



    async function PegarUsuario() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
        }
        await api.get(`/usuario?usuarioID=${usuario.id}`, { headers })
            .then((response) => {
                setNome(response.data?.nome)
                setBio(response.data?.bio)
                setTelefone(response.data?.telefone)
            })
    }

    return (
        <View style={styles.tela}>

            <ScrollView style={{ flex: 1 }}>

                <Text style={styles.tituloinput}>Nome da Loja</Text>
                <TextInput style={styles.input} onChangeText={setNome} value={nome} placeholder="Nome da Loja" maxLength={35}/>
                <Text style={styles.tituloinput}>Whatsapp</Text>
                <TextInput style={styles.input} onChangeText={setTelefone} value={telefone} placeholder="Telefone" />
                <Text style={styles.tituloinput}>Sobre seu negócio</Text>
                <TextInput multiline numberOfLines={0} verticalAlign={'top'} maxLength={300} style={styles.inputdescricao} onChangeText={setBio} value={bio} placeholder="Bio" />
                <Text style={{ alignSelf: "flex-end" }}>{bio.length}/300</Text>
            </ScrollView>
            <TouchableOpacity
                style={styles.btnatualizar}
                onPress={() => {
                    UpdateUsuario(nome, telefone, bio)
                    navigation.navigate("Home")
                }
                }>
                <Text style={styles.txtbtnatualizar}>Atualizar Informações</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        padding: 14
    },
    tituloinput:{
        marginLeft:15,
        zIndex:99,
        fontSize:16,
        color:'#aaa'
    },
    input: {
        borderWidth: 0,
        paddingHorizontal: 15,
        marginVertical: 5,
        height: 55,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom:15
    },
    inputdescricao: {

        borderWidth: 0,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "#fff",

    },
    btnatualizar: {
        backgroundColor: '#F9A825',
        height: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    txtbtnatualizar: {
        color: '#fff',
        fontSize: 16
    }

})