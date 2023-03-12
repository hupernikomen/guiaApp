import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Linking, Pressable, Modal, Dimensions } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'

import { AuthContext } from '../../contexts/authContext';

import { useNavigation, useIsFocused } from '@react-navigation/native';

const { height } = Dimensions.get("window")

export default function HeaderHome({ data }) {

  const { signOut } = useContext(AuthContext)

  const [modalVisible, setModalVisible] = useState(false);
  const { logo } = data

  const navigation = useNavigation()
  const focus = useIsFocused()


  useEffect(() => {

    if (modalVisible) setModalVisible(!modalVisible)
  }, [focus])

  return (
    <View style={styles.container_header}>


      <View style={styles.me}>

        {logo &&
          <Image
            style={[styles.logo, { width: 60, height: 60 }]}
            source={{ uri: `http://192.168.0.104:3333/files/logo/${logo[0].filename}` }} />
        }


        <View style={{ flex: 1 }}>

          <Text style={styles.namestore}>
            {data.nome}
          </Text>

          <Text style={styles.bio} numberOfLines={1} ellipsizeMode='tail'>
            {data.bio}
          </Text>

          <Text style={styles.contagem}>
            {data.produtos?.length} produto{data.produtos?.length > 1 ? "s" : ""}
          </Text>

        </View>
      </View>

      <TouchableOpacity
        style={styles.btndados}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Feather name='more-vertical' size={22} color={'#fff'} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.centeredView}>

          <View style={styles.modalView}>

            <TouchableOpacity
              style={styles.btnmenuitem}
              onPress={() => navigation.navigate("CadastrarDados")}>
              <Text style={styles.menuitem}>Meus Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnmenuitem}
              onPress={() => navigation.navigate("Mapa")}>
              <Text style={styles.menuitem}>Minha Localização</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.btnmenuitem}
              onPress={() =>
                Linking.openURL(`https://api.whatsapp.com/send?phone=5586994773403`)
              }
            >
              <Text style={styles.txtbtn_contact}>Fale com o Guia</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnmenuitem}
              onPress={signOut}>
              <Text style={styles.menuitem}>Sair</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_header: {
    flexDirection: "row",
    backgroundColor: '#b82539',
    justifyContent: 'space-between',
    padding: 14,
    elevation: 5,
    position: "relative",
    minHeight: 100
  },
  logo: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#ffffff30',
    marginRight: 15,
    borderRadius: 60 / 2,
  },
  me: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    paddingRight: 15
  },
  namestore: {
    fontSize: 22,
    color: '#fff',
    fontFamily: "Roboto-Bold"
  },
  bio: {
    color: '#fff',
    fontFamily: 'Roboto-Light'
  },
  contagem: {
    color: '#fff',
    fontFamily: "Roboto-Light"
  },
  btndados: {
    paddingTop: 3
  },
  centeredView: {
    height: height,
    backgroundColor: '#00000020',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalView: {
    paddingVertical: 5,
    marginRight: 5,
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 10,
    top: 100
  },
  btnmenuitem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  menuitem: {
    fontSize: 16,
    fontFamily: 'Roboto-Light'
  }

});

