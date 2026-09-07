// ShopPlus Global — Module 2 Homework (Part C)
// Shared auth guard — "กฎขั้นต่ำ: ต้องล็อกอินก่อน"
//
// requireLogin(onReady): if nobody is logged in, redirects to login.html.
// If someone is logged in, fetches their role profile from
// `users/{uid}` (written at signup, editable manually in Firebase
// Console for ACL testing — see ACL.md) and calls onReady(user, profile).
//
// This is a CLIENT-SIDE convenience only (fast redirect, nicer UX). The
// real security boundary is Firestore Security Rules (see firestore.rules
// at repo root) — a client that skips this file entirely still cannot
// read/write Firestore while logged out.

import { auth, db } from "./firebase-init.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

export function requireLogin(onReady) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    let profile = null;
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      profile = snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error("Failed to load user profile:", err);
    }

    onReady(user, profile);
  });
}

export async function logout() {
  await signOut(auth);
  window.location.href = "login.html";
}
