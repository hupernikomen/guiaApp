import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CadastrarProduto from '../pages/CadastrarProduto'
import Home from '../pages/Home'
import EditaProduto from '../pages/Edita/produto'
import CadastrarDados from '../pages/CadastrarDados'
import Mapa from '../pages/Mapa'

const Stack = createNativeStackNavigator()

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{
                headerShown: false
            }} />
            <Stack.Screen name='CadastrarProduto' component={CadastrarProduto} options={{
                title: "",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor:'#b82539',
                },
                headerTintColor:'#fff'
            }} />
            <Stack.Screen name='Mapa' component={Mapa} options={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor:'#b82539',
                },
                headerTintColor:'#fff'
            }} />
            <Stack.Screen name='CadastrarDados' component={CadastrarDados} options={{
                title: "Meus Dados",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor:'#b82539',
                },
                headerTintColor:'#fff'
            }} />
            <Stack.Screen name='EditaProduto' component={EditaProduto} options={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor:'#b82539',
                },
                headerTintColor:'#fff'
            }} />
        </Stack.Navigator>
    )
}

export default AppRoutes