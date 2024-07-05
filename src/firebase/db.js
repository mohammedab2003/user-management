
import { initializeApp } from "firebase/app";

import { getFirestore , collection } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBOjMIAz5m7LLebX4XSlHstd1aOL0NiLAk",
  authDomain: "employees-24f14.firebaseapp.com",
  projectId: "employees-24f14",
  storageBucket: "employees-24f14.appspot.com",
  messagingSenderId: "724687962814",
  appId: "1:724687962814:web:0900a19ab71028b235d4ef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export{ 
  db,auth
}

