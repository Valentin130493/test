import {initializeApp} from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import {firebaseData} from "../config";

interface FirebaseConfig {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string
}

const firebaseConfig: FirebaseConfig = firebaseData;
initializeApp(firebaseConfig)

const auth = getAuth();

export const firebaseAuth = (email: string, password: string,) => signInWithEmailAndPassword(auth, email, password);
export const firebaseCreateUser = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
export const firebaseSignOut = () => signOut(auth);