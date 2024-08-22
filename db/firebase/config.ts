// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_AKEY,
  authDomain: process.env.NEXT_PUBLIC_AD,
  databaseURL: process.env.NEXT_PUBLIC_DURL,
  projectId: process.env.NEXT_PUBLIC_PID,
  storageBucket: process.env.NEXT_PUBLIC_SB,
  messagingSenderId: process.env.NEXT_PUBLIC_MSID,
  appId: process.env.NEXT_PUBLIC_AID,
  measurementId: process.env.NEXT_PUBLIC_MID,
};

export const FIREBASE = initializeApp(firebaseConfig);
export const STORAGE = getStorage(FIREBASE);
