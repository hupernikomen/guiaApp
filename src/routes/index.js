import React,{useContext} from "react";

import {ActivityIndicator} from 'react-native'

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { AuthContext } from '../contexts/authContext';

function Routes() {

    const { isAuthenticator, loadingAuth } = useContext(AuthContext);

    const loading = loadingAuth

    return(

        // isAuthenticator ? <AppRoutes/> : <AuthRoutes/>
        <AppRoutes/> 

    )
}

export default Routes