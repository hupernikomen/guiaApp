import React from "react";

import { StatusBar } from 'react-native'

import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from './src/contexts/authContext';

import Routes from "./src/routes";

export default function App() {

  const MyTheme = {
    colors: {
    },
  };
  return (

    <NavigationContainer theme={MyTheme}>

      <AuthProvider>

        <StatusBar backgroundColor={"#fff"} barStyle="dark-content" translucent={false} />
        <Routes />
      </AuthProvider>

    </NavigationContainer>

  )
}