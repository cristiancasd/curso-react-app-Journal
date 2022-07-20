import { async } from "@firebase/util";
import { FirebaseAuth } from "../../firebase/config";
import { signOut} from "firebase/auth";

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email,password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) =>{
        dispatch(checkingCredentials());
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})
        if(!ok) return dispatch(logout({errorMessage}))
        dispatch(login({uid, displayName, email, photoURL}))
    }   
}


export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result= await singInWithGoogle()
        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}



export const startLoginWithEmailPassword = ({email:correo, password}) => {
    return async(dispatch) =>{
        dispatch(checkingCredentials());
        
        const {ok, uid, email, displayName, photoURL, errorMessage} 
                = await loginWithEmailPassword({correo, password})
        
                if(!ok) return dispatch(logout({errorMessage}))
        dispatch(login({uid, email, displayName, photoURL}))
    }       
}

export const startLogout = () => {
    console.log('startLogout')
    return async(dispatch)=>{
        console.log('startLogout')
        //await logoutFirebase() // No funcionó
        await FirebaseAuth.signOut() //No me funcionó este proceso en el provider, por eso lo hago aquí
        dispatch(logout())
    }
}