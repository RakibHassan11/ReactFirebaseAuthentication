// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Do not share config in public
const firebaseConfig = {
  apiKey: "AIzaSyDB7M28lE7xG60XlX26Ipp7Abv3-3Ay5Zo",
  authDomain: "reactauth-7f819.firebaseapp.com",
  projectId: "reactauth-7f819",
  storageBucket: "reactauth-7f819.firebasestorage.app",
  messagingSenderId: "844220571156",
  appId: "1:844220571156:web:01fa51ce2b318d98901101"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);