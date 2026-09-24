// ShopPlus Global — Module 2 Homework 4 — Tester agent
// 🔒 ⑤ บัญชีที่สองเปิดข้อมูลของบัญชีแรกไม่ได้ (spec.md §2 ตารางสิทธิ์
// CUSTOMER "ดูรายการของคนอื่น: ทำไม่ได้" + firestore.rules match /transactions/{txId} allow read)
//
// ทดสอบ 2 ชั้น:
//  1) UI: customer B ไม่เห็นรายการของ customer A ใน Pending Queue ของตัวเอง
//  2) ของจริง: ลองอ่านผ่าน Firestore SDK ตรง ๆ ในหน้าเว็บของ B (ไม่ใช่แค่
//     ดูหน้าเว็บ) ทั้ง getDoc ด้วย txId ที่รู้ และ query ด้วย customerId
//     ของ A — ทั้งคู่ต้องถูกปฏิเสธด้วย permission-denied

import { test, expect } from "@playwright/test";
import {
  accounts,
  login,
  logout,
  createTransaction,
  findCardByAmount,
  getCurrentUidFromPage,
  attemptCrossAccountRead,
} from "./helpers.js";

test.describe("🔒 ⑤ บัญชีที่สองเปิดข้อมูลของบัญชีแรกไม่ได้", () => {
  test("customer B อ่าน transaction ของ customer A ไม่ได้ ทั้งทาง UI และ Firestore SDK ตรง ๆ", async ({ page }) => {
    // ---- เตรียมข้อมูล: customer A สร้างรายการของตัวเอง ----
    await login(page, accounts.customerA);
    const { amount, txId: aTxId } = await createTransaction(page);
    expect(aTxId, "ต้องอ่าน txId ของ customer A ได้").not.toBeNull();
    const aUid = await getCurrentUidFromPage(page);
    expect(aUid, "ต้องอ่าน uid ของ customer A ได้").not.toBeNull();
    await logout(page);

    // ---- customer B ล็อกอิน ----
    await login(page, accounts.customerB);

    // ชั้นที่ 1: หน้า Pending Queue ของ B ต้องไม่มีรายการของ A (B query
    // ด้วย customerId == ตัวเอง จึงไม่ควรเห็นตั้งแต่ระดับ UI/query)
    const cardOnB = findCardByAmount(page, amount);
    await expect(cardOnB).toHaveCount(0);

    // ชั้นที่ 2: ใช้ Firebase Firestore SDK ตรง ๆ ในหน้าเว็บของ B (ไม่ใช่
    // การเช็คจากหน้าเว็บ) ลองอ่าน doc ของ A ด้วย id ที่รู้ + query ด้วย
    // customerId ของ A ตรง ๆ
    const result = await attemptCrossAccountRead(page, { otherTxId: aTxId, otherUid: aUid });

    console.log("[⑤] cross-account read attempt result =", JSON.stringify(result));

    expect(
      result.getDoc.ok === false && result.getDoc.code === "permission-denied",
      "getDoc(transactions/" + aTxId + ") โดย customer B ต้องถูกปฏิเสธด้วย permission-denied แต่ได้: " +
        JSON.stringify(result.getDoc)
    ).toBe(true);

    expect(
      result.listQuery.ok === false && result.listQuery.code === "permission-denied",
      "query where customerId == uid ของ customer A โดย customer B ต้องถูกปฏิเสธด้วย permission-denied แต่ได้: " +
        JSON.stringify(result.listQuery)
    ).toBe(true);
  });
});
