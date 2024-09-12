// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "interactive-reporting-platform.firebaseapp.com",
  projectId: "interactive-reporting-platform",
  storageBucket: "interactive-reporting-platform.appspot.com",
  messagingSenderId: "285476826141",
  appId: "1:285476826141:web:7c17038b6bed3753f26af4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
