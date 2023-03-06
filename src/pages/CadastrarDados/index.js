import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from "../../contexts/authContext"

import api from '../../services/api';

import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function CadastrarDados() {
    const navigation = useNavigation()
    const focus = useIsFocused()
    const { UpdateUsuario, me, PegaMe } = useContext(AuthContext)

    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")


    useEffect(() => {
        PegaMe()

        setNome(me.nome)
        setTelefone(me.telefone)

    }, [focus])

    return (
        <View style={styles.tela}>
            <TextInput style={styles.input} onChangeText={setNome} value={nome} placeholder="Nome da Loja" />
            <TextInput style={styles.input} onChangeText={setTelefone} value={telefone} placeholder="Telefone" />
            <TouchableOpacity
                style={styles.btnatualizar}
                onPress={() => {
                    UpdateUsuario(nome, telefone)
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
    btnatualizar: {
        backgroundColor: '#rgb(226,135,67)',
        height: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        elevation:5
    },
    txtbtnatualizar: {
        color: '#fff',
        fontSize: 16
    }

})