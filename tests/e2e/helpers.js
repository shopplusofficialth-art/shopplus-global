// ShopPlus Global — Module 2 Homework 4 — Tester agent
// Shared helpers for tests/e2e/*.spec.js
//
// Credentials come ONLY from process.env (see .env.test.example at repo
// root). Never hardcode, never console.log/print any password.

import { expect } from "@playwright/test";

/**
 * อ่านตัวแปรแวดล้อม — ถ้าไม่มีค่า ให้เทสต์ fail ด้วยข้อความชัดเจนแทนที่จะ
 * fail แบบงงว่า element หาไม่เจอเพราะ login ไม่ผ่าน
 */
export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `ตัวแปรแวดล้อม ${name} ไม่ถูกตั้งค่า — คัดลอก .env.test.example เป็น ` +
        `.env.test แล้วกรอกบัญชีทดสอบก่อนรัน npm run test:e2e (ห้าม commit .env.test)`
    );
  }
  return value;
}

// getter แบบ lazy — ไม่เรียก requireEnv ตอน import ไฟล์ (กัน error ก่อนถึงเวลาจริง)
export const accounts = {
  customerA: {
    get email() {
      return requireEnv("CUSTOMER_A_EMAIL");
    },
    get password() {
      return requireEnv("CUSTOMER_A_PASSWORD");
    },
  },
  customerB: {
    get email() {
      return requireEnv("CUSTOMER_B_EMAIL");
    },
    get password() {
      return requireEnv("CUSTOMER_B_PASSWORD");
    },
  },
  merchant: {
    get email() {
      return requireEnv("MERCHANT_EMAIL");
    },
    get password() {
      return requireEnv("MERCHANT_PASSWORD");
    },
  },
};

/** ล็อกอินด้วยบัญชีที่ระบุ แล้วรอจนเด้งไป index.html */
export async function login(page, account) {
  await page.goto("/login.html");
  await page.locator("#email-input").fill(account.email);
  await page.locator("#password-input").fill(account.password);
  await page.locator("#login-btn").click();
  await page.waitForURL(/index\.html/, { timeout: 15000 });
  // ให้ requireLogin() โหลด profile role เสร็จก่อน (สังเกตจาก pending-count
  // เปลี่ยนจาก "กำลังโหลด...") กัน race condition กับสเต็ปถัดไป
  await expect(page.locator("#pending-count")).not.toHaveText("กำลังโหลด...", {
    timeout: 15000,
  });
}

/** ออกจากระบบผ่านลิงก์ #logout-link แล้วรอจนกลับไป login.html */
export async function logout(page) {
  await page.locator("#logout-link").click();
  await page.waitForURL(/login\.html/, { timeout: 15000 });
}

/**
 * เลือกร้านค้าจริงตัวแรกใน dropdown ของ new-transaction.html แล้วคืนค่า
 * merchantId + ยอดซื้อขั้นต่ำ (บาท, 0 ถ้าร้านไม่ได้กำหนดขั้นต่ำ)
 */
export async function selectFirstMerchant(page) {
  const select = page.locator("#merchant-select");
  const firstRealOption = select.locator("option[value]:not([value=''])").first();
  await expect(firstRealOption).toHaveCount(1, { timeout: 15000 });
  const merchantId = await firstRealOption.getAttribute("value");
  await select.selectOption(merchantId);

  const hintText = (await page.locator("#min-amount-hint").textContent()) || "";
  const match = hintText.match(/([\d.]+)\s*$/);
  const minimumPurchaseAmount = match ? Number(match[1]) : 0;
  return { merchantId, minimumPurchaseAmount };
}

/**
 * สร้างยอดซื้อทดสอบที่ไม่ชนกับรายการอื่น — ยอดขั้นต่ำ + offset สุ่ม
 * (จำนวนเต็มเสมอ เพราะ #amount-input มี step="1" — ใส่ทศนิยมอาจโดน
 * native browser validation กันไม่ให้ submit ได้เลยตั้งแต่ต้น)
 * เป็น "test data marker" ของชุดเทสต์นี้ — ทุกยอดที่ทดสอบสร้างจะอยู่ใน
 * ช่วงยอดขั้นต่ำของร้าน + 1..899 เท่านั้น ระบุได้ว่าไม่ใช่ข้อมูลจริง
 */
export function uniqueTestAmount(minimumPurchaseAmount) {
  const offset = 1 + Math.floor(Math.random() * 899);
  return Math.ceil(minimumPurchaseAmount || 0) + offset;
}

/**
 * สร้างรายการทดสอบใหม่แบบเต็มขั้นตอนผ่านหน้าเว็บจริง (ต้อง login เป็น
 * customer ที่ index.html/หน้าใดก็ได้มาก่อนแล้ว) คืนค่า merchantId,
 * minimumPurchaseAmount, amount ที่ใช้จริง และ txId (อ่านจากข้อความ
 * "รหัส: <id>" ที่การ์ดแสดงใน index.html หลัง redirect กลับ)
 */
export async function createTransaction(page, { amountOverride } = {}) {
  await page.goto("/new-transaction.html");
  const { merchantId, minimumPurchaseAmount } = await selectFirstMerchant(page);
  const amount = amountOverride ?? uniqueTestAmount(minimumPurchaseAmount);
  await page.locator("#amount-input").fill(String(amount));
  await page.locator("#submit-btn").click();
  await page.waitForURL(/index\.html/, { timeout: 15000 });

  const card = findCardByAmount(page, amount);
  await expect(card).toBeVisible({ timeout: 15000 });
  const metaText = (await card.locator(".tx-meta").textContent()) || "";
  const idMatch = metaText.match(/รหัส:\s*(\S+)/);
  const txId = idMatch ? idMatch[1] : null;

  return { merchantId, minimumPurchaseAmount, amount, txId };
}

/** locator ของการ์ด tx ที่มีจำนวนเงินตรงกับ amount (แสดงแบบ ฿ x.xx) */
export function findCardByAmount(page, amount) {
  const formatted = "฿ " + Number(amount).toFixed(2);
  return page.locator("li.tx-card", { hasText: formatted });
}

/**
 * ใช้ Firebase SDK ตรง ๆ ภายในหน้าเว็บ (ผ่าน page.evaluate) — reuse
 * default Firebase App ที่ firebase-init.js ของหน้านั้นสร้างไว้แล้ว
 * (ทุกหน้าใน public/ import firebase-init.js เป็น module เดียวกัน) เพื่อ
 * ทดสอบสิทธิ์ Firestore จริง ไม่ใช่แค่ดูว่าหน้าเว็บไม่แสดงผล
 */
export async function readTransactionAsPage(page, txId) {
  return page.evaluate(async (id) => {
    const appMod = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js");
    const fsMod = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js");
    const app = appMod.getApp();
    const db = fsMod.getFirestore(app);
    try {
      const snap = await fsMod.getDoc(fsMod.doc(db, "transactions", id));
      return { ok: true, exists: snap.exists(), data: snap.exists() ? snap.data() : null };
    } catch (err) {
      return { ok: false, code: err.code || null, message: err.message || String(err) };
    }
  }, txId);
}

/**
 * ลองอ่านข้อมูลของบัญชีอื่น (a) getDoc ตรง ๆ ด้วย txId ที่รู้ (b) query
 * ด้วย customerId == uid ของบัญชีอื่น — ทั้งคู่ต้องถูก Firestore Security
 * Rules ปฏิเสธ (permission-denied) ถ้าระบบปลอดภัยจริง
 */
export async function attemptCrossAccountRead(page, { otherTxId, otherUid }) {
  return page.evaluate(
    async ({ id, uid }) => {
      const appMod = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js");
      const fsMod = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js");
      const app = appMod.getApp();
      const db = fsMod.getFirestore(app);

      const result = { getDoc: null, listQuery: null };

      try {
        const snap = await fsMod.getDoc(fsMod.doc(db, "transactions", id));
        result.getDoc = { ok: true, exists: snap.exists() };
      } catch (err) {
        result.getDoc = { ok: false, code: err.code || null, message: err.message || String(err) };
      }

      try {
        const q = fsMod.query(fsMod.collection(db, "transactions"), fsMod.where("customerId", "==", uid));
        const snap = await fsMod.getDocs(q);
        result.listQuery = { ok: true, size: snap.size };
      } catch (err) {
        result.listQuery = { ok: false, code: err.code || null, message: err.message || String(err) };
      }

      return result;
    },
    { id: otherTxId, uid: otherUid }
  );
}

/** อ่าน uid ของผู้ใช้ที่ล็อกอินอยู่ในหน้านี้ ผ่าน Firebase Auth SDK ตรง ๆ */
export async function getCurrentUidFromPage(page) {
  return page.evaluate(async () => {
    const appMod = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js");
    const authMod = await import("https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js");
    const app = appMod.getApp();
    const auth = authMod.getAuth(app);
    return auth.currentUser ? auth.currentUser.uid : null;
  });
}
