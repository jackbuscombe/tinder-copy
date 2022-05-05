import { FIREBASE_API_KEY, FIREBASE_APP_ID } from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: "tinder-copy-5dc95.firebaseapp.com",
	projectId: "tinder-copy-5dc95",
	storageBucket: "tinder-copy-5dc95.appspot.com",
	messagingSenderId: "413123393608",
	appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
