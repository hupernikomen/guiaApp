import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get("window")

import api from '../../services/api';

import { AuthContext } from '../../contexts/authContext';

import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

export default function Mapa() {

  const { usuario } = useContext(AuthContext)

  const [marker, setMarker] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {

    CarregaTitulo()
  }, [marker])

  function CarregaTitulo() {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: "Roboto-Regular",
        fontSize: 18
      },
      title: marker ? String(parseFloat(marker.latitude).toFixed(7) + " "
        + parseFloat(marker.longitude).toFixed(7)) : "Informe sua localização..."
    })
  }

  const delta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
  const [region, setRegion] = useState({
    latitude: -5.1036423,
    longitude: -42.7516067,
    ...delta
  })


  async function CarregaLocUsuario() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${usuario.token}`
    }
    await api.get(`/usuario?usuarioID=${usuario.id}`, { headers })
      .then((response) => {
        if (response.data?.latlng == null) {
          return
        }
        const { latitude, longitude } = JSON.parse(response.data?.latlng)

        setMarker({ latitude: latitude, longitude: longitude });
        setRegion({ latitude: latitude, longitude: longitude, ...delta });

      })

  }

  async function CapturaLatLng(e) {
    const { latitude, longitude } = e.nativeEvent.coordinate
    // Perguntar se quer salvar novo marker

    Alert.alert("Mudar Localização", "Você deseja mesmo alterar sua localização?", [
      {
        text: "Sim",
        onPress: () => {
          setMarker({
            latitude,
            longitude
          })

          SalvarLatlng(latitude, longitude)
        },
      },
      { text: "Não" },
    ])
  }


  async function SalvarLatlng(latitude, longitude) {



    const formData = new FormData()


    formData.append('latlng', JSON.stringify({ latitude, longitude }))

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${usuario.token}`
    }

    await api.put(`/usuario?usuarioID=${usuario.id}`, formData, { headers })
      .then((response) => {
        console.log(response.status);
      })
      .catch((err) => {
        console.error(err.response, "catch Error");
      })
  }




  return (
    <View>

      <MapView
        onMapReady={CarregaLocUsuario} // função chamada quando todo omapa esta carregado

        onPress={CapturaLatLng}
        style={{ width, height }}
        region={region}
      >
        {marker &&

          <Marker

            coordinate={marker}
            pinColor="#D84315"
            loadingEnabled
          />
        }


      </MapView>



    </View>
  );
}