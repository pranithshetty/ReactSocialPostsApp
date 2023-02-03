// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATnI-n4wB1kWJQNCugsXOCIX8Yo2_TeNc",
  authDomain: "react-social-media-a9199.firebaseapp.com",
  projectId: "react-social-media-a9199",
  storageBucket: "react-social-media-a9199.appspot.com",
  messagingSenderId: "165124252937",
  appId: "1:165124252937:web:53510ca6374fc6a2b01fd8",
  measurementId: "G-14WC0LFYPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)