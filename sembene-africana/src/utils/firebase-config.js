
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyADCYF4nJCTIQYlGvJ87m3sO3NyBYcKBL0",
    authDomain: "sembene-africana.firebaseapp.com",
    projectId: "sembene-africana",
    storageBucket: "sembene-africana.appspot.com",
    messagingSenderId: "20313020000",
    appId: "1:20313020000:web:9377abf60d54836d7e5505",
    measurementId: "G-NHFD8T2ND1"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);