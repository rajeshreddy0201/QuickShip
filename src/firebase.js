
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTgjtRKcUwqN5RIFztyLgUCWD6uobmZXc",
  authDomain: "reactproject-dab71.firebaseapp.com",
  projectId: "reactproject-dab71",
  storageBucket: "reactproject-dab71.appspot.com",
  messagingSenderId: "35194018551",
  appId: "1:35194018551:web:355dd398c155ec911f51f2",
  measurementId: "G-SL48Y3BD10"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };