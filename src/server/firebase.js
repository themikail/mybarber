import firebase from "firebase/compat/app";
import "firebase/compat/database"; // Import the Realtime Database module

const firebaseConfig = {
  apiKey: "AIzaSyAkrwmGGFBG-I6LvKKK5T3Zzpx7vcqw4LI",
  authDomain: "mybarber-bc451.firebaseapp.com",
  projectId: "mybarber-bc451",
  databaseURL:
    "https://mybarber-bc451-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "mybarber-bc451.appspot.com",
  messagingSenderId: "634144489873",
  appId: "1:634144489873:web:a1870901d8a5028d1c1a30",
  measurementId: "G-QK0V7VZNHM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Realtime Database instance
export const db = firebase.database();
