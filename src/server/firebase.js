import firebase from "firebase/app";
import "firebase/database"; // Import the Realtime Database module

const firebaseConfig = {
  apiKey: "AIzaSyAkrwmGGFBG-I6LvKKK5T3Zzpx7vcqw4LI",
  authDomain: "mybarber-bc451.firebaseapp.com",
  projectId: "mybarber-bc451",
  storageBucket: "mybarber-bc451.appspot.com",
  messagingSenderId: "634144489873",
  appId: "1:634144489873:web:a1870901d8a5028d1c1a30",
  measurementId: "G-QK0V7VZNHM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Realtime Database instance
export const db = firebase.database();
