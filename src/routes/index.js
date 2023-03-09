import React, { useContext } from "react";
import { View } from 'react-native'

import Loading from "../components/Loading";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { AuthContext } from '../contexts/authContext';

function Routes() {

    const { isAuthenticator, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />
    }

    return (

        isAuthenticator ? <AppRoutes /> : <AuthRoutes />

    )
}

export default Routes