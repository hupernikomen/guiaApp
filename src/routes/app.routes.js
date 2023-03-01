import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CadastrarProduto from '../pages/CadastrarProduto'
import Home from '../pages/Home'
import EditProduct from '../pages/Edit/product'

const Stack = createNativeStackNavigator()

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{
                headerShown: false
            }} />
            <Stack.Screen name='CadastrarProduto' component={CadastrarProduto} options={{
                title: 'Cadastre seu Produto',
                headerShadowVisible: false
            }} />
            <Stack.Screen name='EditProduct' component={EditProduct} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}

export default AppRoutes