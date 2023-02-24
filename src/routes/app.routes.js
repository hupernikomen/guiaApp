import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CadastrarProduto from '../pages/CadastrarProduto'

const Stack = createNativeStackNavigator()

function AppRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='CadastrarProduto' component={CadastrarProduto} options={{
                headerShown:false
            }}/>
        </Stack.Navigator>
    )
}

export default AppRoutes