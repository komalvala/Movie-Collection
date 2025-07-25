import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj3ZmgOBLPjmfyRG06s-hWDMZCXxxBgps",
  authDomain: "fir-bookmyshow.firebaseapp.com",
  projectId: "fir-bookmyshow",
  storageBucket: "fir-bookmyshow.firebasestorage.app",
  messagingSenderId: "509662337342",
  appId: "1:509662337342:web:26793ca437cd40d3ef746f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);