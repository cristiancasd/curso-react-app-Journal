
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2j8-THrH7O13-6Avob75_1Th-FSC0-oU",
  authDomain: "journalapp-auth.firebaseapp.com",
  projectId: "journalapp-auth",
  storageBucket: "journalapp-auth.appspot.com",
  messagingSenderId: "616083603621",
  appId: "1:616083603621:web:8c38d7f6ad4e2a189a4d4c"
};

//Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Todas las funcionalidades de autenticación
export const FirebaseAuth = getAuth(FirebaseApp);

//configuración de la base de datos
export const FirebaseDB   = getFirestore(FirebaseApp);