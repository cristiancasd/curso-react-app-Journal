
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
//import { getEnvVariables } from "../helpers/getEnvVariables";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 /*
const {VITE_FIREBASE_APIKEY,
  VITE_FIREBASE_AUTHDOMAIN,
  VITE_FIREBASE_PROJECTID,
  VITE_FIREBASE_STORAGEBUCKET,
  VITE_FIREBASE_MESSAGINGSENDERID,
  VITE_FIREBASE_APPID}=getEnvVariables();*/
// Your web app's Firebase configuration
/*const firebaseConfig = {
 // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain:   import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId:   import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket:   import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};*/
let firebaseConfig={};
//import.meta.env.MODE: {string} the mode the app is running in.


/*try{
  firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_APIKEY,
    authDomain:   process.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId:   process.env.VITE_FIREBASE_PROJECTID,
    storageBucket:   process.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId:  process.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.VITE_FIREBASE_APPID,
  };
  
}catch(error){
  firebaseConfig = {
    // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
     apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
     authDomain:   import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
     projectId:   import.meta.env.VITE_FIREBASE_PROJECTID,
     storageBucket:   import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
     messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
     appId: import.meta.env.VITE_FIREBASE_APPID,
   };
}*/
/*
firebaseConfig = {
   //apiKey: process.env.VITE_FIREBASE_APIKEY,
   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
   authDomain:   import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
   projectId:   import.meta.env.VITE_FIREBASE_PROJECTID,
   storageBucket:   import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
   messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
   appId: import.meta.env.VITE_FIREBASE_APPID,
 };
 */

firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_APIKEY,
  authDomain:   process.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId:   process.env.VITE_FIREBASE_PROJECTID,
  storageBucket:   process.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId:  process.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VITE_FIREBASE_APPID,
};
/*
firebaseConfig = {
  apiKey: "AIzaSyD2j8-THrH7O13-6Avob75_1Th-FSC0-oU",
  authDomain: "journalapp-auth.firebaseapp.com",
  projectId: "journalapp-auth",
  storageBucket: "journalapp-auth.appspot.com",
  messagingSenderId: "616083603621",
  appId: "1:616083603621:web:8c38d7f6ad4e2a189a4d4c"
};*/

//Initialize Firebase
export const FirebaseAppTest = initializeApp(firebaseConfig);

//Todas las funcionalidades de autenticación
export const FirebaseAuthTest = getAuth(FirebaseAppTest);

//configuración de la base de datos
export const FirebaseDBTest   = getFirestore(FirebaseAppTest);