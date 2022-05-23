// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMz5jJ7DGjrZq6d1NQuFuzbgOzXM4Y0KQ",
  authDomain: "music-hub-a47fc.firebaseapp.com",
  projectId: "music-hub-a47fc",
  storageBucket: "music-hub-a47fc.appspot.com",
  messagingSenderId: "662640818904",
  appId: "1:662640818904:web:ef23b1156e68023c1b35ad",
  measurementId: "G-GGKDYHNMX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };