import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOu6qoZBefMfAHN2e4nz3Ts5ffjnzblEc",
  authDomain: "store-1187c.firebaseapp.com",
  projectId: "store-1187c",
  storageBucket: "store-1187c.firebasestorage.app",
  messagingSenderId: "267303136212",
  appId: "1:267303136212:web:ed469c5758481434a54441",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
