// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-clone-6e532.firebaseapp.com",
  projectId: "loop-clone-6e532",
  storageBucket: "loop-clone-6e532.appspot.com",
  messagingSenderId: "531101658678",
  appId: "1:531101658678:web:5d6ebbbcb4ef0e2a957297"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
