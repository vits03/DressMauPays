// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInAnonymously } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// Your config
const firebaseConfig = {
  apiKey: "AIzaSyBYNpTxwSRcXvDkAFHbGQH3Rrt0oH1v-jM",
  authDomain: "dressmaupays.firebaseapp.com",
  projectId: "dressmaupays",
  storageBucket: "dressmaupays.firebasestorage.app",
  messagingSenderId: "877692907048",
  appId: "1:877692907048:web:3be3b43117af81945e8f1d",
  measurementId: "G-ZXDJBJML2V",
};

// Initialize app (only once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export initialized services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const loginAnonymously = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log("Anonymous user:", result.user.uid);
    return result.user;
  } catch (error) {
    console.error("Anonymous sign-in failed:", error);
  }
};