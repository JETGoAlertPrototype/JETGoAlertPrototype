import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_0CodzHFyERYxy2Apy8Zp4QbHsbr4rfk",
    authDomain: "jet-go-alert.firebaseapp.com",
    projectId: "jet-go-alert",
    storageBucket: "jet-go-alert.appspot.com",
    messagingSenderId: "605131486515",
    appId: "1:605131486515:web:ae9661d467e1f63725ba46",
    measurementId: "G-LF30TWJ3YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore database
export { db, collection, addDoc };
