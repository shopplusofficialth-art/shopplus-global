// ShopPlus Global — Module 2 Homework 4 — Tester agent
// ② ปุ่มเปลี่ยนสถานะ — ร้านค้ากดอนุมัติ/ปฏิเสธแล้วสถานะเปลี่ยน (spec.md §3, §5)
//
// สร้างข้อมูลของตัวเอง (ไม่พึ่งพา state จากเทสต์ ①) — สร้าง 2 รายการ:
// รายการ A สำหรับกด "อนุมัติ", รายการ B สำหรับกด "ปฏิเสธ" พร้อมเหตุผล

import { test, expect } from "@playwright/test";
import {
  accounts,
  login,
  logout,
  createTransaction,
  findCardByAmount,
  readTransactionAsPage,
} from "./helpers.js";

test.describe("② ปุ่มเปลี่ยนสถานะ — merchant อนุมัติ/ปฏิเสธแล้วสถานะเปลี่ยนจริงใน Firestore", () => {
  test("กด อนุมัติ → การ์ดหาย + status == APPROVED ใน Firestore จริง", async ({ page }) => {
    await login(page, accounts.customerA);
    const { amount, txId } = await createTransaction(page);
    expect(txId, "ต้องอ่าน txId จากข้อความ 'รหัส: ' บนการ์ดได้").not.toBeNull();
    await logout(page);

    await login(page, accounts.merchant);
    const card = findCardByAmount(page, amount);
    await expect(card).toBeVisible({ timeout: 15000 });

    await card.locator('button[data-action="approve"]').click();
    await expect(card).toBeHidden({ timeout: 15000 });

    // ตรวจผ่าน Firestore SDK ตรง ๆ (ไม่ใช่แค่ดูว่าการ์ดหายจากหน้าเว็บ)
    const result = await readTransactionAsPage(page, txId);
    expect(result.ok, "อ่าน transaction ไม่สำเร็จ: " + JSON.stringify(result)).toBe(true);
    expect(result.exists).toBe(true);
    expect(result.data.status).toBe("APPROVED");
  });

  test("กด ปฏิเสธ + กรอกเหตุผล → การ์ดหาย + status == REJECTED + rejectionReason ตรงกัน", async ({ page }) => {
    await login(page, accounts.customerA);
    const { amount, txId } = await createTransaction(page);
    expect(txId).not.toBeNull();
    await logout(page);

    await login(page, accounts.merchant);
    const card = findCardByAmount(page, amount);
    await expect(card).toBeVisible({ timeout: 15000 });

    await card.locator('button[data-action="reject"]').click();
    const reasonText = "e2e-test: เหตุผลปฏิเสธสมมติจาก tester agent " + amount;
    await card.locator(".reject-reason-input").fill(reasonText);
    await card.locator('button[data-action="confirm-reject"]').click();
    await expect(card).toBeHidden({ timeout: 15000 });

    const result = await readTransactionAsPage(page, txId);
    expect(result.ok, "อ่าน transaction ไม่สำเร็จ: " + JSON.stringify(result)).toBe(true);
    expect(result.exists).toBe(true);
    expect(result.data.status).toBe("REJECTED");
    expect(result.data.rejectionReason).toBe(reasonText);
  });
});
