/**
 * seed-firestore.js
 *
 * Module 2 homework — seeds sample data into Firestore for the "Transaction
 * Approval Workflow" scope (see SCOPE.md at the repo root).
 *
 * Data seeded:
 *   - merchants     (3 docs)
 *   - users         (5 docs)
 *   - transactions  (5 docs) + transactions/{id}/events (subcollection)
 *
 * All names are FICTIONAL — no real personal data (per CLAUDE.md PDPA rule
 * and the homework's "ห้ามใช้ข้อมูลจริงของคนอื่น" requirement).
 *
 * firebaseConfig below is the PUBLIC web app config (apiKey etc. are meant
 * to be embedded client-side — this is not a secret credential; real
 * access control comes from Firestore Security Rules).
 *
 * Usage:
 *   npm install
 *   npm run seed
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgESaDmkujsYGu4KxakuMT7AG1PPYlcJo",
  authDomain: "shopplus-global.firebaseapp.com",
  projectId: "shopplus-global",
  storageBucket: "shopplus-global.firebasestorage.app",
  messagingSenderId: "974209651946",
  appId: "1:974209651946:web:8a49acd6b819346238b393",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------------------------------------------------------
// 1. Merchants (3 docs) — "โฟลเดอร์ประเภท" ที่ลูกค้าเลือกตอนสร้าง transaction
// ---------------------------------------------------------------------------
const merchants = [
  {
    id: "merchant001",
    shopName: "ร้านกาแฟบ้านสวน",
    minimumPurchaseAmount: 50,
    ownerId: "user002",
    status: "ACTIVE",
  },
  {
    id: "merchant002",
    shopName: "ร้านของชำป้าแดง",
    minimumPurchaseAmount: 20,
    ownerId: "user003",
    status: "ACTIVE",
  },
  {
    id: "merchant003",
    shopName: "ร้านขนมคุณยาย",
    minimumPurchaseAmount: 30,
    ownerId: "user004",
    status: "ACTIVE",
  },
];

// ---------------------------------------------------------------------------
// 2. Users (5 docs) — customers + merchant staff
// ---------------------------------------------------------------------------
const users = [
  { id: "user001", displayName: "สมชาย ใจดี", role: "CUSTOMER" },
  { id: "user002", displayName: "เจ้าของร้านกาแฟบ้านสวน", role: "MERCHANT" },
  { id: "user003", displayName: "ป้าแดง", role: "MERCHANT" },
  { id: "user004", displayName: "คุณยายมาลี", role: "MERCHANT" },
  { id: "user005", displayName: "สมหญิง รักดี", role: "CUSTOMER" },
];

// ---------------------------------------------------------------------------
// 3. Transactions (5 docs) — "โฟลเดอร์หลัก" + events subcollection ต่อรายการ
// ---------------------------------------------------------------------------
const transactions = [
  {
    id: "TX001",
    customerId: "user001",
    customerName: "สมชาย ใจดี",
    merchantId: "merchant001",
    merchantName: "ร้านกาแฟบ้านสวน",
    minimumPurchaseAmount: 50,
    purchaseAmount: 80,
    status: "PENDING_APPROVAL",
    events: [{ eventType: "CREATED", actorId: "user001", actorRole: "CUSTOMER" }],
  },
  {
    id: "TX002",
    customerId: "user005",
    customerName: "สมหญิง รักดี",
    merchantId: "merchant001",
    merchantName: "ร้านกาแฟบ้านสวน",
    minimumPurchaseAmount: 50,
    purchaseAmount: 120,
    status: "APPROVED",
    marketingFeeSP: 30,
    events: [
      { eventType: "CREATED", actorId: "user005", actorRole: "CUSTOMER" },
      { eventType: "APPROVED", actorId: "user002", actorRole: "MERCHANT" },
    ],
  },
  {
    id: "TX003",
    customerId: "user001",
    customerName: "สมชาย ใจดี",
    merchantId: "merchant002",
    merchantName: "ร้านของชำป้าแดง",
    minimumPurchaseAmount: 20,
    purchaseAmount: 25,
    status: "REJECTED",
    rejectionReason: "ลูกค้ากรอกยอดผิด ไม่ตรงกับใบเสร็จ",
    events: [
      { eventType: "CREATED", actorId: "user001", actorRole: "CUSTOMER" },
      { eventType: "REJECTED", actorId: "user003", actorRole: "MERCHANT" },
    ],
  },
  {
    id: "TX004",
    customerId: "user005",
    customerName: "สมหญิง รักดี",
    merchantId: "merchant003",
    merchantName: "ร้านขนมคุณยาย",
    minimumPurchaseAmount: 30,
    purchaseAmount: 45,
    status: "PENDING_APPROVAL",
    events: [{ eventType: "CREATED", actorId: "user005", actorRole: "CUSTOMER" }],
  },
  {
    id: "TX005",
    customerId: "user001",
    customerName: "สมชาย ใจดี",
    merchantId: "merchant003",
    merchantName: "ร้านขนมคุณยาย",
    minimumPurchaseAmount: 30,
    purchaseAmount: 60,
    status: "REJECTED",
    rejectionReason: "สงสัยว่าสแกนซ้ำ ต้องตรวจสอบเพิ่มเติม",
    events: [
      { eventType: "CREATED", actorId: "user001", actorRole: "CUSTOMER" },
      { eventType: "REJECTED", actorId: "user004", actorRole: "MERCHANT" },
    ],
  },
];

async function seed() {
  console.log("Seeding merchants...");
  for (const { id, ...data } of merchants) {
    await setDoc(doc(db, "merchants", id), { ...data, createdAt: serverTimestamp() });
    console.log(`  merchants/${id} ✓`);
  }

  console.log("Seeding users...");
  for (const { id, ...data } of users) {
    await setDoc(doc(db, "users", id), { ...data, createdAt: serverTimestamp() });
    console.log(`  users/${id} ✓`);
  }

  console.log("Seeding transactions + events...");
  for (const { id, events, ...data } of transactions) {
    await setDoc(doc(db, "transactions", id), { ...data, createdAt: serverTimestamp() });
    console.log(`  transactions/${id} ✓`);

    for (const event of events) {
      const eventRef = doc(collection(db, "transactions", id, "events"));
      await setDoc(eventRef, { ...event, timestamp: serverTimestamp() });
      console.log(`    └─ event ${event.eventType} ✓`);
    }
  }

  console.log("\nDone. 3 merchants, 5 users, 5 transactions seeded.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
