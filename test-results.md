# test-results.md — ผลการทดสอบ ShopPlus Global (Module 2 Homework 4)

**ระบบที่ทดสอบ:** https://shopplus-global.web.app (Firebase Hosting + Firestore จริง)
**สรุปโดย:** ผู้ช่วย `tester` (sonnet) — [.claude/agents/tester.md](.claude/agents/tester.md)
**โค้ดที่ทดสอบ:** commit `fe16f63`
**สเปคที่ใช้เทียบ:** [spec.md](spec.md) · สิทธิ์: [ACL.md](ACL.md)

## สรุปผล

| ชุดทดสอบ | รันเมื่อ | ผล |
|---|---|---|
| E2E บนเว็บจริง (Playwright, Chromium) — `npm run test:e2e` | 2026-09-24 08:46 (UTC+7) · ใช้เวลา 1.1 นาที | ✅ **ผ่าน 11/11** (ไม่ผ่าน 0 · ข้าม 0 · flaky 0) |
| Security Rules บน Firestore Emulator — `npm run test:rules` | 2026-09-24 08:47 (UTC+7) | ✅ **ผ่าน 57/57** (ไม่ผ่าน 0) |

**ไม่มีเทสต์ที่ไม่ผ่านในรอบนี้** — ข้อสังเกตที่เทสต์จับได้แต่ไม่ถือว่าไม่ผ่าน
อยู่ในหัวข้อ "ข้อสังเกต" ด้านล่าง และจดลง [BACKLOG.md](BACKLOG.md) แล้ว

บัญชีที่ใช้: ลูกค้า A, ลูกค้า B, ร้านค้า 1 บัญชี (อีเมลสมมติ `@example.com`,
รหัสผ่านอ่านจาก `.env.test` ที่อยู่ใน `.gitignore`)

---

## E2E — 5 เทสต์ตามใบงาน (`tests/e2e/`)

| # | เทสต์ | ทดสอบอะไร | ผล | เวลา |
|---|---|---|---|---|
| ① | เส้นทางหลัก (`01-main-path.spec.js`) | ลูกค้า A ล็อกอิน → `+ สร้างรายการ` → เลือกร้าน + กรอกยอด (ยอดสุ่มไม่ซ้ำ ≥ ขั้นต่ำร้าน) → `บันทึกรายการ` → กลับ `index.html` แล้วเห็นการ์ดยอดนั้นใน Pending Queue | ✅ ผ่าน | 9.0s |
| ②-1 | ปุ่มอนุมัติ (`02-status-change.spec.js`) | ร้านค้ากด `อนุมัติ` → การ์ดหายจากคิว + อ่าน doc จาก Firestore จริงได้ `status == APPROVED` | ✅ ผ่าน | 9.2s |
| ②-2 | ปุ่มปฏิเสธ | ร้านค้ากด `ปฏิเสธ` → พิมพ์เหตุผล → `ยืนยันปฏิเสธ` → การ์ดหาย + `status == REJECTED` + `rejectionReason` ตรงกับที่พิมพ์ | ✅ ผ่าน | 8.8s |
| ③-a | กรอกไม่ครบ: ไม่เลือกร้าน (`03-incomplete-form.spec.js`) | กดบันทึกโดยไม่เลือกร้าน → ยังอยู่หน้าเดิม และจำนวนรายการรออนุมัติของลูกค้าเท่าเดิม | ✅ ผ่าน | 6.7s |
| ③-b | กรอกไม่ครบ: ยอดซื้อว่าง | กดบันทึกโดยไม่กรอกยอด → ไม่บันทึก จำนวนรายการเท่าเดิม | ✅ ผ่าน | 7.4s |
| ③-c | ยอดต่ำกว่าขั้นต่ำร้าน | กรอกยอดต่ำกว่า `minimumPurchaseAmount` → ข้อความ `ยอดซื้อต้องถึงขั้นต่ำ ฿ 50 ของร้านนี้` + ไม่บันทึก | ✅ ผ่าน | 7.4s |
| ③-d | ปฏิเสธโดยไม่ใส่เหตุผล | ร้านค้ากด `ยืนยันปฏิเสธ` โดยช่องเหตุผลว่าง → alert `ต้องระบุเหตุผลก่อนปฏิเสธรายการ` + doc ยังเป็น `PENDING_APPROVAL` | ✅ ผ่าน | 8.9s |
| ④-1 | 🔒 ไม่ล็อกอิน: เปิด `index.html` (`04-not-logged-in.spec.js`) | เปิดตรง ๆ ใน browser ใหม่ที่ไม่มี session → ถูกเด้งไป `login.html` | ✅ ผ่าน | 0.5s |
| ④-2 | 🔒 ไม่ล็อกอิน: เปิด `new-transaction.html` | เหมือนข้างบน → ถูกเด้งไป `login.html` | ✅ ผ่าน | 0.5s |
| ④-3 | 🔒 ไม่ล็อกอิน: ยิง Firestore REST ตรง | `GET .../documents/transactions` โดยไม่มี token → **403** (ข้าม UI ทั้งหมดก็อ่านไม่ได้) | ✅ ผ่าน | 0.2s |
| ⑤ | 🔒 บัญชีที่สองเปิดของบัญชีแรกไม่ได้ (`05-second-account.spec.js`) | ลูกค้า A สร้างรายการ → ลูกค้า B ล็อกอิน: (1) หน้าเว็บไม่แสดงการ์ดของ A (2) ใช้ **Firestore SDK ในหน้าเว็บตรง ๆ** `getDoc` รายการของ A → `permission-denied` (3) query `customerId == uid ของ A` → `permission-denied` | ✅ ผ่าน | 8.6s |

ผลจริงของเทสต์ ⑤ ที่บันทึกระหว่างรัน:
```
getDoc    → ok:false, code:"permission-denied", "Missing or insufficient permissions."
listQuery → ok:false, code:"permission-denied", "Missing or insufficient permissions."
```

---

## Security Rules — 57 เคส (`tests/firestore-rules.test.js`)

รันกับ Firestore Emulator (ไม่แตะข้อมูลจริง) โดยใช้ `firestore.rules` ตัวเดียวกับที่
deploy ขึ้นระบบจริง

| กลุ่ม | ตรวจอะไร (ตัวอย่าง) | ผล |
|---|---|---|
| ไม่ล็อกอิน | อ่าน/list/สร้างอะไรไม่ได้เลย | ✅ |
| `users` | อ่านได้แค่ของตัวเอง · สมัครเป็น `MERCHANT` เองไม่ได้ · เลื่อน role ไม่ได้ · เพิ่มช่องนอก spec ไม่ได้ | ✅ |
| Customer สร้างรายการ | สร้างในชื่อคนอื่นไม่ได้ · ตั้ง `APPROVED` เองไม่ได้ · ไม่มียอด/ยอด 0/ต่ำกว่าขั้นต่ำ/ไม่มีร้าน/ร้านปลอม/ชื่อร้านปลอม บันทึกไม่ได้ | ✅ |
| Customer อ่าน/ลบ | บัญชีที่สองอ่าน/query/ลบของบัญชีแรกไม่ได้ · อนุมัติของตัวเองไม่ได้ | ✅ |
| Merchant | อนุมัติได้แต่แก้ยอดพร้อมกันไม่ได้ · ปฏิเสธต้องมีเหตุผลไม่ว่าง · แก้รายการที่จบแล้วไม่ได้ · ลบไม่ได้ | ✅ |
| `events` / `aiLogs` | ประเภท event ต้องตรงกับสถานะจริง · ปลอม actor ไม่ได้ · แก้/ลบ log ไม่ได้ | ✅ |

---

## ข้อสังเกต (ผ่าน แต่ควรรู้)

1. **③-a / ③-b ถูกบล็อกโดย HTML `required` ของ browser ไม่ใช่ข้อความของแอป** —
   Chromium แสดง `Please select an item in the list.` / `Please fill out this field.`
   ก่อนที่ JavaScript จะได้ทำงาน ข้อความภาษาไทย `กรุณาเลือกร้านค้า` /
   `กรุณากรอกยอดซื้อให้ถูกต้อง` ใน spec §3 จึงไม่เคยแสดงใน Chromium —
   ผลลัพธ์ "ไม่บันทึก" ถูกต้อง และ Security Rules บล็อกซ้ำอีกชั้น → จดลง BACKLOG
2. **เทสต์ทิ้งข้อมูลทดสอบไว้บนระบบจริง** — รายการของลูกค้า A ที่ยัง
   `PENDING_APPROVAL` (จาก ①, ③-d, ⑤) ยังอยู่ในคิวร้านค้า ยังไม่มีขั้นตอนลบ
   อัตโนมัติ → จดลง BACKLOG
3. **การรันเทสต์กฎบน Windows** ต้องตั้ง
   `JAVA_TOOL_OPTIONS="-Djdk.net.unixdomain.tmpdir=C:/tmp/uds"` ก่อน (JDK
   ใช้ temp path แบบ 8.3 ไม่ได้) — ไม่ใช่ปัญหาของระบบ

---

## วิธีรันซ้ำ

```bash
cp .env.test.example .env.test   # แล้วกรอกบัญชีทดสอบ 3 บัญชี
npm run test:e2e                 # E2E บนเว็บจริง
npm run test:rules               # Security Rules บน emulator
```

## Revision History

| วันที่ | การเปลี่ยนแปลง |
|---|---|
| 2026-09-24 | สร้างไฟล์ — ผลรันรอบส่งการบ้าน 4 (E2E 11/11, Rules 57/57) |
