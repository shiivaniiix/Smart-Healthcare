// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBjr2JcKXafWOrdJLLGxRnh6-ceuixkizs",
  authDomain: "smarthealthcare-f54c6.firebaseapp.com",
  databaseURL: "https://smarthealthcare-f54c6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarthealthcare-f54c6",
  storageBucket: "smarthealthcare-f54c6.appspot.com",
  messagingSenderId: "218898444097",
  appId: "1:218898444097:web:7cd8f4f9ef2f80bda6bbc0",
  measurementId: "G-1JBV89299G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app,auth};