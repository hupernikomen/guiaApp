import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { AuthContext } from "../../contexts/authContext"

import api from '../../services/api';

import Feather from 'react-native-vector-icons/Feather'

import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function CadastrarDados() {
    const navigation = useNavigation()
    const focus = useIsFocused()
    const { UpdateUsuario, usuario } = useContext(AuthContext)

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


    async function PegarUsuario() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
        }
        await api.get(`/usuario?usuarioID=${usuario.id}`, { headers })
            .then((response) => {
                console.log(typeof (response.data?.entrega), "entrega");
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
                    onPress={() => navigation.navigate("Mapa")}
                    style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 15, paddingVertical: 15, borderBottomWidth: .5, borderBottomColor: "#777" }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>Atualizar Minha Localização</Text>
                    <Feather name='map' size={22} color={'#e58003'} />
                </TouchableOpacity>

                <View style={{ marginBottom: 25, flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                    <Text style={{ color:'#222', fontFamily: "Roboto-Regular", fontSize: 16, marginLeft: 15 }}>Faço Entregas</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={entrega ? '#b82539' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={entrega}
                    />
                </View>

                <Text style={styles.tituloinput}>Nome da Loja</Text>
                <TextInput style={styles.input} onChangeText={setNome} value={nome} placeholder=" ... " maxLength={35} />

                <Text style={styles.tituloinput}>Endereço</Text>
                <TextInput style={styles.input} onChangeText={setEndereco} value={endereco} placeholder="..." maxLength={35} />

                <Text style={styles.tituloinput}>Bairro</Text>
                <TextInput style={styles.input} onChangeText={setBairro} value={bairro} placeholder="..." maxLength={35} />

                <Text style={styles.tituloinput}>Whatsapp</Text>
                <TextInput style={styles.input} onChangeText={setTelefone} value={telefone} placeholder=" ... " />

                <Text style={styles.tituloinput}>Sobre seu negócio</Text>
                <TextInput multiline numberOfLines={0} verticalAlign={'top'} maxLength={300} style={styles.inputdescricao} onChangeText={setBio} value={bio} placeholder="Bio" />
                <Text style={{ alignSelf: "flex-end" }}>{bio.length}/300</Text>


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
        marginLeft: 15,
        zIndex: 99,
        fontSize: 16,
        color: '#aaa'
    },
    input: {
        borderWidth: 0,
        paddingHorizontal: 15,
        height: 55,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 15
    },
    inputdescricao: {
        minHeight: 55,
        borderWidth: 0,
        paddingHorizontal: 15,
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
        marginBottom:30
    },
    txtbtnatualizar: {
        color: '#222',
        fontSize: 16,
        marginLeft: 15,
        fontFamily: 'Roboto-Medium'
    }

})