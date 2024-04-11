// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-fksOhjoL0qvsUM4ysLFEWqlGh0xrvkA",

  authDomain: "the-quoter.firebaseapp.com",

  projectId: "the-quoter",

  storageBucket: "the-quoter.appspot.com",

  messagingSenderId: "559417637708",

  appId: "1:559417637708:web:078c75c6f13f34aca6ade9",

  measurementId: "G-Z5B55W9VZK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
