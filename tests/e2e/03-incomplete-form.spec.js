// ShopPlus Global — Module 2 Homework 4 — Tester agent
// ③ กรอกไม่ครบแล้วต้องไม่บันทึก (spec.md §3 ตารางตรวจความครบของฟอร์ม
// new-transaction.html + confirmReject ใน index.html)
//
// หมายเหตุสำคัญ: #merchant-select และ #amount-input มี attribute `required`
// ทำให้บาง case (ไม่เลือกร้าน / ยอดว่าง) อาจถูก browser native validation
// กันไว้ตั้งแต่ก่อน JS ทำงาน (ฟอร์มไม่ยิง submit event เลย) — เทสต์นี้จึง
// ตรวจ "ไม่มีอะไรถูกบันทึก" เป็นหลัก (ยังอยู่หน้าเดิม + pending count ของ
// customer A ไม่เปลี่ยน) และบันทึกไว้ว่า message จริงที่เห็นคืออะไร
// (ข้อความของแอป หรือ native validation message ของ browser)

import { test, expect } from "@playwright/test";
import {
  accounts,
  login,
  logout,
  selectFirstMerchant,
  createTransaction,
  findCardByAmount,
  readTransactionAsPage,
} from "./helpers.js";

async function readPendingCount(page) {
  await page.goto("/index.html");
  await expect(page.locator("#pending-count")).not.toHaveText("กำลังโหลด...", { timeout: 15000 });
  return page.locator("#pending-count").textContent();
}

test.describe("③ กรอกไม่ครบแล้วต้องไม่บันทึก", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, accounts.customerA);
  });

  test("(a) ไม่เลือกร้านค้า → ไม่บันทึก", async ({ page }) => {
    const before = await readPendingCount(page);

    await page.goto("/new-transaction.html");
    // จงใจไม่แตะ #merchant-select (ยังเป็น placeholder value="")
    await page.locator("#amount-input").fill("100");
    await page.locator("#submit-btn").click();
    await page.waitForTimeout(500);

    const appMsg = (await page.locator("#form-msg").textContent()) || "";
    const nativeMsg = await page.locator("#merchant-select").evaluate((el) => el.validationMessage || "");
    // eslint-disable-next-line no-console
    console.log("[③a] app message =", JSON.stringify(appMsg), "| native validation message =", JSON.stringify(nativeMsg));

    expect(page.url(), "ต้องยังอยู่หน้า new-transaction.html เพราะไม่ถูกบันทึก").toContain("new-transaction.html");
    expect(
      appMsg.includes("กรุณาเลือกร้านค้า") || nativeMsg.length > 0,
      "ต้องมีข้อความเตือนอย่างใดอย่างหนึ่ง (ของแอป หรือ native validation ของ browser)"
    ).toBe(true);

    const after = await readPendingCount(page);
    expect(after, "pending count ของ customer A ต้องไม่เปลี่ยน").toBe(before);
  });

  test("(b) ยอดซื้อว่าง → ไม่บันทึก", async ({ page }) => {
    const before = await readPendingCount(page);

    await page.goto("/new-transaction.html");
    await selectFirstMerchant(page);
    // จงใจปล่อย #amount-input ว่าง
    await page.locator("#submit-btn").click();
    await page.waitForTimeout(500);

    const appMsg = (await page.locator("#form-msg").textContent()) || "";
    const nativeMsg = await page.locator("#amount-input").evaluate((el) => el.validationMessage || "");
    console.log("[③b] app message =", JSON.stringify(appMsg), "| native validation message =", JSON.stringify(nativeMsg));

    expect(page.url()).toContain("new-transaction.html");
    expect(
      appMsg.includes("กรุณากรอกยอดซื้อให้ถูกต้อง") || nativeMsg.length > 0
    ).toBe(true);

    const after = await readPendingCount(page);
    expect(after).toBe(before);
  });

  test("(c) ยอดซื้อต่ำกว่าขั้นต่ำของร้าน → ไม่บันทึก พร้อมข้อความจากแอป", async ({ page }) => {
    const before = await readPendingCount(page);

    await page.goto("/new-transaction.html");
    const { minimumPurchaseAmount } = await selectFirstMerchant(page);
    test.skip(
      !minimumPurchaseAmount || minimumPurchaseAmount <= 1,
      "ร้านค้าตัวแรกไม่มียอดขั้นต่ำ (>1) ให้ทดสอบกรณีนี้ได้ — ข้ามเคสนี้"
    );

    const belowMin = Math.max(1, minimumPurchaseAmount - 1);
    await page.locator("#amount-input").fill(String(belowMin));
    await page.locator("#submit-btn").click();
    await page.waitForTimeout(500);

    const appMsg = (await page.locator("#form-msg").textContent()) || "";
    console.log("[③c] app message =", JSON.stringify(appMsg));

    expect(page.url()).toContain("new-transaction.html");
    expect(appMsg).toContain("ยอดซื้อต้องถึงขั้นต่ำ");
    expect(appMsg).toContain(String(minimumPurchaseAmount));

    const after = await readPendingCount(page);
    expect(after).toBe(before);
  });
});

test.describe("③(d) merchant ปฏิเสธโดยไม่กรอกเหตุผล → ไม่บันทึก ยังเป็น PENDING_APPROVAL", () => {
  test("กด ยืนยันปฏิเสธ โดยไม่พิมพ์เหตุผล → alert เตือน + status ไม่เปลี่ยน", async ({ page }) => {
    await login(page, accounts.customerA);
    const { amount, txId } = await createTransaction(page);
    expect(txId).not.toBeNull();
    await logout(page);

    await login(page, accounts.merchant);
    const card = findCardByAmount(page, amount);
    await expect(card).toBeVisible({ timeout: 15000 });

    await card.locator('button[data-action="reject"]').click();
    // จงใจไม่พิมพ์อะไรใน .reject-reason-input เลย

    let alertMessage = null;
    page.once("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    await card.locator('button[data-action="confirm-reject"]').click();
    await page.waitForTimeout(500);

    expect(alertMessage).toBe("ต้องระบุเหตุผลก่อนปฏิเสธรายการ");
    // การ์ดต้องยังอยู่ (ไม่ได้ถูกบันทึกเป็น REJECTED)
    await expect(card).toBeVisible();

    const result = await readTransactionAsPage(page, txId);
    expect(result.ok).toBe(true);
    expect(result.data.status).toBe("PENDING_APPROVAL");
    expect(result.data.rejectionReason).toBeUndefined();
  });
});
