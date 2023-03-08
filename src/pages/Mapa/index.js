import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window")

import MapView, { Marker } from 'react-native-maps';

//-5.1035591,-42.744928

export default function Mapa({ lat, lng }) {

  const [region, setRegion] = useState({
    latitude: -5.1036423,
    longitude: -42.7516067,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  //Buscar no banco a localizacao atual do usuario 
  const [marker, setMarker] = useState({
    latitude: -5.1036423,
    longitude: -42.7516067
  })

  function PegaLocalização(e) {
    const { latitude, longitude } = e.nativeEvent.coordinate
    setMarker({
      latitude: latitude,
      longitude: longitude
    })

  }

  return (
    <View>
      {console.log(marker)}
      <MapView
        // onMapReady={()=>{}} // função chamada quando todo omapa esta carregado

        onPress={PegaLocalização}
        style={{ width: width, height: height }}
        region={region}

      >

        <Marker 
        coordinate={marker} 
        // pinColor="#F9A825"
        />


      </MapView>
    </View>
  );
}