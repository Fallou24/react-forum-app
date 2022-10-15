import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-firebase-redux-455d7.firebaseapp.com",
  projectId: "react-firebase-redux-455d7",
  storageBucket: "react-firebase-redux-455d7.appspot.com",
  messagingSenderId: "364097044102",
  appId: "1:364097044102:web:a957a6b7bf98667ef49b07"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
export const db = getFirestore(app)