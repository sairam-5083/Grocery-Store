import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy3Z1CcLWGw4jQ7vjUkjIydMT_CMSrtVU",
  authDomain: "grocerygo-c9852.firebaseapp.com",
  projectId: "grocerygo-c9852",
  storageBucket: "grocerygo-c9852.firebasestorage.app",
  messagingSenderId: "951732338344",
  appId: "1:951732338344:web:931844d17d873003abcc9d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);