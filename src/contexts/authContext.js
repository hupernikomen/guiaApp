import React, { createContext, useState, useEffect } from "react";
import api from '../services/api'

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState({
    id: '',
    email: '',
    token: ''
  })


  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const isAuthenticator = !!usuario.email

  useEffect(() => {


    async function getUser() {
      const dadosUsuario = await AsyncStorage.getItem('@authGuiaComercial')

      let hasUser = JSON.parse(dadosUsuario || '{}')

      // verifica se tem um user no asyncStorage
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

        setUsuario({
          id: hasUser.id,
          email: hasUser.email,
          token: hasUser.token
        })
      } else {
        AsyncStorage.clear()
      }


      setLoading(false)

    }
    getUser()


  }, [])



  async function signIn({ email,senha }) {

    setLoadingAuth(true)
    if (email == '' || senha == '') {
      return
    }
    
    const response = await api.post('/login', { email, senha })


    const { id, token } = response.data
    const data = { ...response.data }


    await AsyncStorage.setItem('@authGuiaComercial', JSON.stringify(data))

    //Passar para todas as requisições o token do lojista logado
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUsuario({
      id,
      email,
      token
    })

    setLoadingAuth(false)

  }

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUsuario({
          id: '',
          email: '',
          token: ''
        })
      })
  }




  return (
    <AuthContext.Provider value={{
      usuario,
      isAuthenticator,
      loadingAuth,
      loading,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}