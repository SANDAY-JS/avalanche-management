import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: "avalanche-management.firebaseapp.com",
  projectId: "avalanche-management",
  storageBucket: "avalanche-management.appspot.com",
  messagingSenderId: process.env.REACT_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};