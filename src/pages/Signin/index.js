import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";

import { AuthContext } from "../../contexts/authContext"

export default function Login() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")



  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    email && senha ? setIsFilled(true) : setIsFilled(false)
  }, [email, senha]);

  async function logar() {
    await signIn({ email, senha });

  }

  return (
    <View style={styles.tela}>

      <StatusBar hidden />
      <View style={styles.form_login}>

        <TextInput
        placeholderTextColor={"#aaa"}
        keyboardType='email-address'
        inlineImagePadding={40}
        inlineImageLeft='email'
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        placeholder='seuemail@email.com'
        
        />

        <TextInput
          inlineImagePadding={40}
          inlineImageLeft='key'
          placeholderTextColor={"#aaa"}
          onChangeText={setSenha}
          value={senha}
          style={styles.input}
          secureTextEntry
          placeholder='*****'
        />


        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn_sign}
          onPress={logar}
          disabled={!email && !senha ? true : false}
        >
          <Text style={styles.txtbtn_sign}>Entrar</Text>

        </TouchableOpacity>



      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://api.whatsapp.com/send?phone=5586994773403`)
        }
        style={styles.btn_contact}
      >
        <Text style={styles.txtbtn_contact}>Fale com o Guia</Text>

      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form_login: {
    width: '85%',
    zIndex: 999,
  },
  input: {
    height: 55,
    textAlign: "left",
    marginBottom: 6,
    paddingHorizontal: 25,
    borderRadius: 55 / 2,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  btn_sign: {
    backgroundColor:"#b82539",
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  txtbtn_sign: {
    fontWeight: '600',
    fontSize: 16,
    color:"#fff"
  },
  btn_contact: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    position: 'absolute',
    bottom: 20
  },
  txtbtn_contact: {
    fontSize: 16,
  },
});