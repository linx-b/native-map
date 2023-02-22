import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBQU5BElaFGlY5B2I1pYrtCNO27iX4ISzc",
    authDomain: "cmumap-15b2e.firebaseapp.com",
    databaseURL: "https://cmumap-15b2e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cmumap-15b2e",
    storageBucket: "cmumap-15b2e.appspot.com",
    messagingSenderId: "855108962995",
    appId: "1:855108962995:web:38ee2363218eb42546fec6",
    measurementId: "G-FRLJXHNVQH"
};

const app = initializeApp(firebaseConfig)

const database = getFirestore(app)

export default database
