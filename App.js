import React from "react";

import { StatusBar } from 'react-native'

import { NavigationContainer } from "@react-navigation/native"

import Routes from "./src/routes";

export default function App() {

  const MyTheme = {
    colors: {
      background: '#fff',
    },
  };
  return (




    <NavigationContainer theme={MyTheme}>

      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" translucent={false} />
      <Routes />

    </NavigationContainer>

  )
}