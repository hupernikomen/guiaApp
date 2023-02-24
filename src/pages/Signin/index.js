import React from "react";

import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function Signin() {
    return (
        <View style={styles.tela}>

            <View style={styles.container_inputs}>
                <TextInput style={styles.input} placeholder="email@email.com" />
                <TextInput style={styles.input} placeholder="*****" />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    container_inputs:{
        width:"80%"
    },
    input: {
        height: 50,
        fontSize: 16,
        textAlign:"center",
        borderWidth: .5,
        borderColor: "#333",
        marginBottom:10,
        paddingHorizontal: 15,
    }
})