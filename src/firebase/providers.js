
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try{
        const resp=await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL}=resp.user;
        console.log('resp providers ',resp);
        
        //Actualizar el displayName en nuestro proveedor
        await updateProfile(FirebaseAuth.currentUser,{displayName})
        
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    }catch(error){
        return {ok: false, errorMessage: error.message}
    }
}


export const singInWithGoogle = async() => {
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const {displayName, email, photoURL, uid}=user
        
        return{
            ok: true,
            displayName, email, photoURL, uid
        }
        
    } catch(err){
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok: false,
            errorMessage,
        }
    }
}


export const loginWithEmailPassword = async ({correo, password}) => {

    try{
        const {user} = await signInWithEmailAndPassword(FirebaseAuth, correo, password)
        console.log('resp login providers ', user)
        const {uid,email,displayName,photoURL}=user;
        console.log('variables  uid', uid);
        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL
        }
    }catch(error){
        console.log('error .... ',error)
        return {ok: false, errorMessage: error.message}
    }   
}

export const logoutFirebase = () => {   
    try{//await FirebaseAuth.signOut() // No funcionó, hago el proceso en el thunks
    }catch(error){ console.log(error)}
}