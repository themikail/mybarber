import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUf9tKQ4MwzY61HNQrp-QRSVITRxxwZU4",
  authDomain: "mybarber-f56c8.firebaseapp.com",
  databaseURL:
    "https://mybarber-f56c8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mybarber-f56c8",
  storageBucket: "mybarber-f56c8.appspot.com",
  messagingSenderId: "912049792380",
  appId: "1:912049792380:web:fd1b23372a4c530e4ef0f9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Realtime Database instance
export const db = firebase.database();

// Export the authentication instance
export const auth = firebase.auth();
