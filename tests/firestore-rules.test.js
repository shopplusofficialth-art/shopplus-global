// ตรวจ firestore.rules กับ Firestore Emulator (ไม่แตะฐานข้อมูลจริง)
// รัน: npm run test:rules
//
// ครอบคลุมตารางสิทธิ์ใน ACL.md + query จริงที่หน้าเว็บใช้ (public/*.html)
// ต้องผ่านหมดก่อน deploy กฎขึ้น Firebase
//
// Windows: ถ้า emulator ล้มด้วย "Unable to establish loopback connection"
// (JDK ใช้ temp path แบบ 8.3 เช่น GODISL~1 ไม่ได้) ให้ตั้งก่อนรัน:
//   export JAVA_TOOL_OPTIONS="-Djdk.net.unixdomain.tmpdir=C:/tmp/uds"

import { readFileSync } from "node:fs";
import { before, after, beforeEach, describe, test } from "node:test";
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from "@firebase/rules-unit-testing";
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, getDocs,
  collection, query, where, serverTimestamp,
} from "firebase/firestore";

let env;

const CUST_A = "customerA";
const CUST_B = "customerB";
const MERCH = "merchantUser";

before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-shopplus-rules",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});

after(async () => {
  await env.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, "users", CUST_A), { displayName: "a", email: "a@test.dev", role: "CUSTOMER" });
    await setDoc(doc(db, "users", CUST_B), { displayName: "b", email: "b@test.dev", role: "CUSTOMER" });
    await setDoc(doc(db, "users", MERCH), { displayName: "m", email: "m@test.dev", role: "MERCHANT" });
    await setDoc(doc(db, "merchants", "merchant001"), { shopName: "ร้านทดสอบ", minimumPurchaseAmount: 100 });
    await setDoc(doc(db, "transactions", "txA"), {
      customerId: CUST_A, customerName: "a", merchantId: "merchant001", merchantName: "ร้านทดสอบ",
      minimumPurchaseAmount: 100, purchaseAmount: 250, status: "PENDING_APPROVAL",
    });
    await setDoc(doc(db, "transactions", "txDone"), {
      customerId: CUST_A, merchantId: "merchant001", purchaseAmount: 250, status: "APPROVED",
    });
  });
});

const as = (uid) => env.authenticatedContext(uid).firestore();
const anon = () => env.unauthenticatedContext().firestore();

// payload เดียวกับที่ public/new-transaction.html ส่ง
const newTx = (customerId, extra = {}) => ({
  customerId,
  customerName: "a",
  merchantId: "merchant001",
  merchantName: "ร้านทดสอบ",
  minimumPurchaseAmount: 100,
  purchaseAmount: 150,
  status: "PENDING_APPROVAL",
  createdAt: serverTimestamp(),
  ...extra,
});

describe("ไม่ล็อกอิน", () => {
  test("อ่าน transaction ไม่ได้", async () => {
    await assertFails(getDoc(doc(anon(), "transactions", "txA")));
  });
  test("list transactions ไม่ได้", async () => {
    await assertFails(getDocs(collection(anon(), "transactions")));
  });
  test("อ่าน merchants ไม่ได้", async () => {
    await assertFails(getDocs(collection(anon(), "merchants")));
  });
  test("สร้าง transaction ไม่ได้", async () => {
    await assertFails(addDoc(collection(anon(), "transactions"), newTx("anyone")));
  });
});

describe("users", () => {
  test("อ่านโปรไฟล์ตัวเองได้ (auth-guard.js)", async () => {
    await assertSucceeds(getDoc(doc(as(CUST_A), "users", CUST_A)));
  });
  test("อ่านโปรไฟล์คนอื่นไม่ได้", async () => {
    await assertFails(getDoc(doc(as(CUST_B), "users", CUST_A)));
  });
  test("สมัครใหม่เป็น CUSTOMER ได้ (login.html)", async () => {
    await assertSucceeds(setDoc(doc(as("newbie"), "users", "newbie"), {
      displayName: "n", email: "n@test.dev", role: "CUSTOMER", createdAt: serverTimestamp(),
    }));
  });
  test("สมัครใหม่แล้วตั้งตัวเองเป็น MERCHANT ไม่ได้", async () => {
    await assertFails(setDoc(doc(as("newbie"), "users", "newbie"), {
      displayName: "n", email: "n@test.dev", role: "MERCHANT", createdAt: serverTimestamp(),
    }));
  });
  test("เลื่อน role ตัวเองเป็น MERCHANT ไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(CUST_A), "users", CUST_A), { role: "MERCHANT" }));
  });
  test("แก้ displayName ของตัวเองได้", async () => {
    await assertSucceeds(updateDoc(doc(as(CUST_A), "users", CUST_A), { displayName: "a2" }));
  });
  test("เพิ่มช่องนอก spec §4 ในโปรไฟล์ตัวเองไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(CUST_A), "users", CUST_A), { isAdmin: true }));
  });
});

describe("Customer — สร้างรายการ", () => {
  test("สร้างรายการของตัวเองได้", async () => {
    await assertSucceeds(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A)));
  });
  test("สร้างรายการในชื่อคนอื่นไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_B)));
  });
  test("สร้างแล้วตั้งสถานะ APPROVED เองไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { status: "APPROVED" })));
  });
  test("ไม่ใส่ยอดซื้อ บันทึกไม่ได้", async () => {
    const data = newTx(CUST_A);
    delete data.purchaseAmount;
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), data));
  });
  test("ยอดซื้อ 0 บันทึกไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { purchaseAmount: 0 })));
  });
  test("ไม่เลือกร้าน บันทึกไม่ได้", async () => {
    const data = newTx(CUST_A);
    delete data.merchantId;
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), data));
  });
  test("ยอดซื้อต่ำกว่าขั้นต่ำของร้าน บันทึกไม่ได้ (spec §3)", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { purchaseAmount: 99 })));
  });
  test("ยอดซื้อเท่ากับขั้นต่ำพอดี บันทึกได้", async () => {
    await assertSucceeds(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { purchaseAmount: 100 })));
  });
  test("ร้านที่ไม่มีอยู่จริง บันทึกไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { merchantId: "ghost" })));
  });
  test("Merchant สร้างรายการแทนลูกค้าไม่ได้", async () => {
    await assertFails(addDoc(collection(as(MERCH), "transactions"), newTx(MERCH)));
  });
  test("ปลอม merchantName ไม่ตรงกับ shopName ของร้านไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { merchantName: "ร้านปลอม" })));
  });
  test("ปลอม minimumPurchaseAmount ไม่ตรงกับของร้านไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { minimumPurchaseAmount: 0 })));
  });
  test("ส่ง minimumPurchaseAmount = null ทั้งที่ร้านมีขั้นต่ำไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, { minimumPurchaseAmount: null })));
  });
  test("ร้านที่ไม่มี minimumPurchaseAmount ส่ง null ได้ (merchant.minimumPurchaseAmount ?? null)", async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), "merchants", "merchant002"), { shopName: "ร้านไม่มีขั้นต่ำ" });
    });
    await assertSucceeds(addDoc(collection(as(CUST_A), "transactions"), newTx(CUST_A, {
      merchantId: "merchant002", merchantName: "ร้านไม่มีขั้นต่ำ", minimumPurchaseAmount: null, purchaseAmount: 1,
    })));
  });
});

describe("Customer — อ่าน/ลบ (บัญชีที่สองเปิดของบัญชีแรกไม่ได้)", () => {
  test("อ่านรายการของตัวเองได้", async () => {
    await assertSucceeds(getDoc(doc(as(CUST_A), "transactions", "txA")));
  });
  test("บัญชีที่สองอ่านรายการของบัญชีแรกไม่ได้", async () => {
    await assertFails(getDoc(doc(as(CUST_B), "transactions", "txA")));
  });
  test("query แบบหน้า index.html (status + customerId ตัวเอง) ได้", async () => {
    const q = query(collection(as(CUST_A), "transactions"),
      where("status", "==", "PENDING_APPROVAL"), where("customerId", "==", CUST_A));
    await assertSucceeds(getDocs(q));
  });
  test("บัญชีที่สอง query ด้วย customerId ของบัญชีแรกไม่ได้", async () => {
    const q = query(collection(as(CUST_B), "transactions"), where("customerId", "==", CUST_A));
    await assertFails(getDocs(q));
  });
  test("Customer list ทั้ง collection ไม่ได้", async () => {
    await assertFails(getDocs(collection(as(CUST_B), "transactions")));
  });
  test("บัญชีที่สองอ่าน events ของบัญชีแรกไม่ได้", async () => {
    await assertFails(getDocs(collection(as(CUST_B), "transactions", "txA", "events")));
  });
  test("ลบรายการ PENDING ของตัวเองได้", async () => {
    await assertSucceeds(deleteDoc(doc(as(CUST_A), "transactions", "txA")));
  });
  test("บัญชีที่สองลบรายการของบัญชีแรกไม่ได้", async () => {
    await assertFails(deleteDoc(doc(as(CUST_B), "transactions", "txA")));
  });
  test("ลบรายการที่ APPROVED แล้วไม่ได้", async () => {
    await assertFails(deleteDoc(doc(as(CUST_A), "transactions", "txDone")));
  });
  test("Customer อนุมัติรายการของตัวเองไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(CUST_A), "transactions", "txA"), { status: "APPROVED" }));
  });
});

describe("Merchant — เปลี่ยนสถานะ", () => {
  test("อ่านคิว PENDING_APPROVAL ได้ (index.html)", async () => {
    const q = query(collection(as(MERCH), "transactions"), where("status", "==", "PENDING_APPROVAL"));
    await assertSucceeds(getDocs(q));
  });
  test("อ่านประวัติลูกค้าได้ (AI customer insight)", async () => {
    const q = query(collection(as(MERCH), "transactions"), where("customerId", "==", CUST_A));
    await assertSucceeds(getDocs(q));
  });
  test("อนุมัติได้ + บันทึก event ได้", async () => {
    const db = as(MERCH);
    await assertSucceeds(updateDoc(doc(db, "transactions", "txA"), { status: "APPROVED" }));
    await assertSucceeds(addDoc(collection(db, "transactions", "txA", "events"), {
      eventType: "APPROVED", actorId: MERCH, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("อนุมัติพร้อมแก้ยอดซื้อไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(MERCH), "transactions", "txA"), { status: "APPROVED", purchaseAmount: 1 }));
  });
  test("ปฏิเสธพร้อมเหตุผล + คำแนะนำ AI ได้", async () => {
    await assertSucceeds(updateDoc(doc(as(MERCH), "transactions", "txA"), {
      status: "REJECTED", rejectionReason: "กรอกยอดผิด", aiSuggestion: "กรอกผิด", aiReason: "x",
    }));
  });
  test("ปฏิเสธโดยไม่มีเหตุผลไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(MERCH), "transactions", "txA"), { status: "REJECTED" }));
  });
  test("ปฏิเสธด้วยเหตุผลช่องว่างไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(MERCH), "transactions", "txA"), { status: "REJECTED", rejectionReason: "   " }));
  });
  test("เปลี่ยนรายการที่ APPROVED แล้วไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(MERCH), "transactions", "txDone"), { status: "REJECTED", rejectionReason: "x" }));
  });
  test("AI เขียนคำแนะนำกลับได้ + aiLogs ได้", async () => {
    const db = as(MERCH);
    await assertSucceeds(updateDoc(doc(db, "transactions", "txA"), { aiSuggestion: "APPROVE", aiReason: "ok" }));
    await assertSucceeds(addDoc(collection(db, "transactions", "txA", "aiLogs"), {
      type: "CUSTOMER_HISTORY_SUMMARY", actorId: MERCH, timestamp: serverTimestamp(),
    }));
  });
  test("Merchant ลบรายการไม่ได้", async () => {
    await assertFails(deleteDoc(doc(as(MERCH), "transactions", "txA")));
  });
  test("Merchant แก้ merchants ไม่ได้", async () => {
    await assertFails(updateDoc(doc(as(MERCH), "merchants", "merchant001"), { minimumPurchaseAmount: 0 }));
  });
});

describe("events — audit log", () => {
  test("Customer บันทึก CREATED ของรายการตัวเองได้ (new-transaction.html)", async () => {
    await assertSucceeds(addDoc(collection(as(CUST_A), "transactions", "txA", "events"), {
      eventType: "CREATED", actorId: CUST_A, actorRole: "CUSTOMER", timestamp: serverTimestamp(),
    }));
  });
  test("Customer ปลอม event APPROVED ไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions", "txA", "events"), {
      eventType: "APPROVED", actorId: CUST_A, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("บันทึก event ในชื่อคนอื่นไม่ได้", async () => {
    await assertFails(addDoc(collection(as(MERCH), "transactions", "txA", "events"), {
      eventType: "APPROVED", actorId: CUST_A, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("flow จริง new-transaction.html: สร้างรายการแล้วบันทึก CREATED ได้", async () => {
    const db = as(CUST_A);
    const txRef = await assertSucceeds(addDoc(collection(db, "transactions"), newTx(CUST_A)));
    await assertSucceeds(addDoc(collection(db, "transactions", txRef.id, "events"), {
      eventType: "CREATED", actorId: CUST_A, actorRole: "CUSTOMER", timestamp: serverTimestamp(),
    }));
  });
  test("Customer บันทึก CREATED ให้รายการที่ APPROVED แล้วไม่ได้", async () => {
    await assertFails(addDoc(collection(as(CUST_A), "transactions", "txDone", "events"), {
      eventType: "CREATED", actorId: CUST_A, actorRole: "CUSTOMER", timestamp: serverTimestamp(),
    }));
  });
  test("Merchant บันทึก APPROVED ทั้งที่รายการยัง PENDING ไม่ได้", async () => {
    await assertFails(addDoc(collection(as(MERCH), "transactions", "txA", "events"), {
      eventType: "APPROVED", actorId: MERCH, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("Merchant บันทึก REJECTED ทั้งที่รายการยัง PENDING ไม่ได้", async () => {
    await assertFails(addDoc(collection(as(MERCH), "transactions", "txA", "events"), {
      eventType: "REJECTED", actorId: MERCH, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("Merchant บันทึก REJECTED ให้รายการที่ APPROVED ไม่ได้", async () => {
    await assertFails(addDoc(collection(as(MERCH), "transactions", "txDone", "events"), {
      eventType: "REJECTED", actorId: MERCH, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("Merchant บันทึก CREATED ไม่ได้", async () => {
    await assertFails(addDoc(collection(as(MERCH), "transactions", "txA", "events"), {
      eventType: "CREATED", actorId: MERCH, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("flow จริง index.html: ปฏิเสธแล้วบันทึก REJECTED ได้", async () => {
    const db = as(MERCH);
    await assertSucceeds(updateDoc(doc(db, "transactions", "txA"), { status: "REJECTED", rejectionReason: "กรอกยอดผิด" }));
    await assertSucceeds(addDoc(collection(db, "transactions", "txA", "events"), {
      eventType: "REJECTED", actorId: MERCH, actorRole: "MERCHANT", timestamp: serverTimestamp(),
    }));
  });
  test("แก้/ลบ event ไม่ได้", async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), "transactions", "txA", "events", "e1"), { eventType: "CREATED", actorId: CUST_A });
    });
    await assertFails(updateDoc(doc(as(MERCH), "transactions", "txA", "events", "e1"), { eventType: "APPROVED" }));
    await assertFails(deleteDoc(doc(as(MERCH), "transactions", "txA", "events", "e1")));
  });
});
