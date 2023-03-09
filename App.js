import React from "react";

import { StatusBar } from 'react-native'

import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from './src/contexts/authContext';

import Routes from "./src/routes";

export default function App() {

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#f1f1f110',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };
  
  
  return (

    <NavigationContainer theme={MyTheme}>

      <AuthProvider>

        <StatusBar backgroundColor={"#b82539"} barStyle="light-content" translucent={false} />
        <Routes />
      </AuthProvider>

    </NavigationContainer>

  )
}