// ShopPlus Global — Module 2 Homework (Part C)
// Shared Firebase initialization — imported by every page under public/
// so the config lives in exactly one place.
//
// firebaseConfig below is the PUBLIC web app config (apiKey etc. are meant
// to be embedded client-side — this is NOT a secret credential; real
// access control comes from Firebase Auth + Firestore Security Rules).
// See CLAUDE.md Section 14.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgESaDmkujsYGu4KxakuMT7AG1PPYlcJo",
  authDomain: "shopplus-global.firebaseapp.com",
  projectId: "shopplus-global",
  storageBucket: "shopplus-global.firebasestorage.app",
  messagingSenderId: "974209651946",
  appId: "1:974209651946:web:8a49acd6b819346238b393",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
