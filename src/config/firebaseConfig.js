import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj3ZmgOBLPjmfyRG06s-hWDMZCXxxBgps",
  authDomain: "fir-bookmyshow.firebaseapp.com",
  projectId: "fir-bookmyshow",
  storageBucket: "fir-bookmyshow.appspot.com",
  messagingSenderId: "509662337342",
  appId: "1:509662337342:web:26793ca437cd40d3ef746f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

console.log('Firebase initialized with config:', JSON.stringify(firebaseConfig));
console.log('Auth initialized:', auth ? 'Yes' : 'No');