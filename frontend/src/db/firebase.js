// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQN8T0E8LQtTvBJtQOGZqB7DW-mlsG0Ws",
    authDomain: "blendon-barber-shop.firebaseapp.com",
    projectId: "blendon-barber-shop",
    storageBucket: "blendon-barber-shop.appspot.com",
    messagingSenderId: "178810929925",
    appId: "1:178810929925:web:0151f0618686a3baa0ad6c",
    measurementId: "G-G1J2R43RM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
