import React from "react";

import {} from 'react-native'

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {

    const isAuthenticator= true
    const loading = false

    return(

        isAuthenticator ? <AppRoutes/> : <AuthRoutes/>

    )
}

export default Routes