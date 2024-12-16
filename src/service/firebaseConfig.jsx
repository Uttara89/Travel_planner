// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtvY9gwKuNWrHPndcZmVdDAjTaeaEo0vk",
  authDomain: "travel-planner-5733d.firebaseapp.com",
  projectId: "travel-planner-5733d",
  storageBucket: "travel-planner-5733d.firebasestorage.app",
  messagingSenderId: "968641689810",
  appId: "1:968641689810:web:438f66c73144e1815b550b",
  measurementId: "G-J5T02FS82G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app); 

