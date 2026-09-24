// ShopPlus Global — Module 2 Homework 4 — Tester agent
// 🔒 ④ ไม่ล็อกอินแล้วอ่านข้อมูลไม่ได้ (spec.md §2 "ไม่ล็อกอิน" row,
// firestore.rules — ทุก match ต้องผ่าน signedIn()/isMerchant()/isCustomer())
//
// ใช้ browser context ใหม่ทุกครั้ง (ไม่มี session ใด ๆ ค้างจากเทสต์อื่น)

import { test, expect } from "@playwright/test";

test.describe("🔒 ④ ไม่ล็อกอินแล้วอ่านข้อมูลไม่ได้", () => {
  test("เปิด index.html โดยไม่ล็อกอิน → เด้งไป login.html", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/index.html");
    await page.waitForURL(/login\.html/, { timeout: 15000 });
    expect(page.url()).toContain("login.html");
    await context.close();
  });

  test("เปิด new-transaction.html โดยไม่ล็อกอิน → เด้งไป login.html", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/new-transaction.html");
    await page.waitForURL(/login\.html/, { timeout: 15000 });
    expect(page.url()).toContain("login.html");
    await context.close();
  });

  test("อ่าน transactions ผ่าน Firestore REST API ตรง ๆ โดยไม่มี auth token → ต้องถูกปฏิเสธ (403)", async ({
    request,
  }) => {
    // Firestore REST endpoint จริง — ไม่แนบ Authorization header ใด ๆ
    // (จำลองคนที่ไม่ได้ล็อกอินพยายามอ่านตรง ๆ ข้าม UI/SDK ทั้งหมด)
    const res = await request.get(
      "https://firestore.googleapis.com/v1/projects/shopplus-global/databases/(default)/documents/transactions"
    );
    expect(res.status(), "ต้องถูก Firestore Security Rules ปฏิเสธ (403) เพราะไม่มีการล็อกอิน").toBe(403);
  });
});
