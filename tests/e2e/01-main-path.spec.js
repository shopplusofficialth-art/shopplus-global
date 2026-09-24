// ShopPlus Global — Module 2 Homework 4 — Tester agent
// ① เส้นทางหลัก — ลูกค้าสร้างรายการแล้วเห็นใน Pending Queue (spec.md §3, §5)

import { test, expect } from "@playwright/test";
import { accounts, login, selectFirstMerchant, uniqueTestAmount, findCardByAmount } from "./helpers.js";

test.describe("① เส้นทางหลัก — customer สร้างรายการแล้วเห็นใน Pending Queue", () => {
  test("ลูกค้าสร้างรายการผ่าน new-transaction.html แล้วเห็นการ์ดใน index.html", async ({ page }) => {
    await login(page, accounts.customerA);

    // ไปหน้าสร้างรายการผ่านลิงก์จริงในหน้าเว็บ (ไม่ goto ตรง ๆ)
    await page.locator("#new-tx-link").click();
    await page.waitForURL(/new-transaction\.html/, { timeout: 15000 });

    const { minimumPurchaseAmount } = await selectFirstMerchant(page);
    // ยอดซื้อทดสอบ = ยอดขั้นต่ำของร้าน + offset สุ่ม 1..899 (ดู uniqueTestAmount
    // ใน helpers.js) — เป็นข้อมูลสมมติของเทสต์นี้เท่านั้น
    const amount = uniqueTestAmount(minimumPurchaseAmount);

    await page.locator("#amount-input").fill(String(amount));
    await page.locator("#submit-btn").click();

    await page.waitForURL(/index\.html/, { timeout: 15000 });

    const card = findCardByAmount(page, amount);
    await expect(card).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#page-title")).toHaveText("รายการของฉัน");
  });
});
