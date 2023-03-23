//import { async } from "@firebase/util";
//import { FirebaseAuth } from "../../firebase/config";
//import { signOut } from "firebase/auth";

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";
import { clearNotesLogout } from "../journal/journalSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
} //testing

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
        if (!ok) return dispatch(logout({ ok, uid, photoURL, errorMessage }))
        dispatch(login({ uid, displayName, email, photoURL }))
    }
} //testing ok y error

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        console.log('voy a entrar por google')
        dispatch(checkingCredentials());
        const result = await singInWithGoogle()
        //if(!result.ok) return dispatch(logout(result.errorMessage))
        if (!result.ok) return dispatch(logout(result))
        dispatch(login(result))
    }
} //testing ok y error

export const startLoginWithEmailPassword = ({ email: correo, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, email, displayName, photoURL, errorMessage }
            = await loginWithEmailPassword({ correo, password })

        //if(!ok) return dispatch(logout({errorMessage})) // funciona la app pero no pasa el test
        if (!ok) return dispatch(logout({ uid, email, displayName, photoURL, ok, errorMessage }))

        dispatch(login({ uid, email, displayName, photoURL }))
    }
} //testing ok y error

export const startLogout = () => {
    console.log('startLogout')
    return async (dispatch) => {
        await logoutFirebase() // No funcionó
        //await FirebaseAuth.signOut() //No me funcionó este proceso en el provider, por eso lo hago aquí
        dispatch(clearNotesLogout())
        dispatch(logout())
    }
} //testing
