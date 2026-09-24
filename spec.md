# spec.md — ShopPlus Global: Transaction Approval (Module 2 MVP)

**ใช้สำหรับ:** Module 2 Homework 4 — ใบสั่งงานเดียวของระบบ รวม
[SCOPE.md](SCOPE.md) + สิ่งที่ทำจริงในการบ้าน 1–3 (โค้ดใน `public/`)
**ระบบออนไลน์:** https://shopplus-global.web.app
**อ้างอิง Feature:** `FT-003` (Customer QR Scan & Transaction Creation),
`FT-005` (Merchant Transaction Approval Workflow) — ดู
`01-requirements/03-feature-list.md`
**เอกสารสิทธิ์:** [ACL.md](ACL.md) · **กฎความปลอดภัย:** [firestore.rules](firestore.rules)

> เอกสารนี้อธิบาย**ระบบที่มีอยู่จริง** ผู้ช่วยทุกตัวต้องทำงานภายในสเปคนี้
> เท่านั้น — ของที่ไม่ได้เขียนไว้ที่นี่ = ไม่ทำ

---

## 1. ประโยคเดียวสรุประบบ

ลูกค้าสร้าง **รายการทำธุรกรรม (transaction)** โดยเลือกร้านและกรอกยอดซื้อ →
รายการเริ่มที่ `PENDING_APPROVAL` → **ร้านค้า** กด **อนุมัติ** (`APPROVED`)
หรือ **ปฏิเสธพร้อมเหตุผล** (`REJECTED`) โดยมีผู้ช่วย AI ช่วยจัดหมวดเหตุผล
และสรุปประวัติลูกค้า

---

## 2. บทบาทผู้ใช้ (Roles)

เก็บที่ `users/{uid}.role` — บัญชีใหม่เป็น `CUSTOMER` เสมอ, `MERCHANT`
ต้องแก้ใน Firebase Console เท่านั้น

| บทบาท | ทำได้ | ทำไม่ได้ |
|---|---|---|
| `CUSTOMER` | สร้างรายการของตัวเอง · ดูรายการรออนุมัติของตัวเอง · ลบรายการของตัวเองที่ยัง `PENDING_APPROVAL` | ดูรายการของคนอื่น · อนุมัติ/ปฏิเสธ · แก้รายการหลังสร้าง · เปลี่ยน role ตัวเอง |
| `MERCHANT` | ดูคิว `PENDING_APPROVAL` ทุกใบ · อนุมัติ · ปฏิเสธ (ต้องมีเหตุผล) · ใช้ปุ่ม AI 2 ปุ่ม | สร้างรายการ · ลบรายการ · แก้ช่องอื่นนอกจาก `status`/`rejectionReason`/`aiSuggestion`/`aiReason` |
| ไม่ล็อกอิน | เปิดหน้า `login.html` เท่านั้น | อ่าน/เขียน Firestore ใด ๆ |
| `ADMIN` | *(ยังไม่ implement — ดูหัวข้อ 7)* | — |

---

## 3. หน้าจอ (Screens) — `public/`

| ไฟล์ | ใครใช้ | สิ่งที่มีในหน้า |
|---|---|---|
| `login.html` | ทุกคน | ช่อง `อีเมล` (`#email-input`), `รหัสผ่าน` (`#password-input`, ≥6 ตัว) · ปุ่ม `เข้าสู่ระบบ` (`#login-btn`), `สมัครสมาชิก` (`#signup-btn`) → สมัครแล้วสร้าง `users/{uid}` role `CUSTOMER` → ไป `index.html` |
| `index.html` | Customer + Merchant | หัวข้อ `Pending Queue` · แสดงเฉพาะรายการ `PENDING_APPROVAL` (Customer = ของตัวเอง, Merchant = ทุกใบ) · Merchant: ปุ่ม `อนุมัติ`, `ปฏิเสธ` → ช่อง `เหตุผลที่ปฏิเสธ (จำเป็น)` + `ยืนยันปฏิเสธ`/`ยกเลิก` · ปุ่ม AI `🤖 ให้ AI ช่วยจัดประเภท` และ `🤖 ให้ AI ช่วยสรุปประวัติ` · Customer: ลิงก์ `+ สร้างรายการ` (`#new-tx-link`), ปุ่ม `ลบ` (ต้องยืนยัน) · ลิงก์ `ออกจากระบบ` (`#logout-link`) |
| `new-transaction.html` | Customer เท่านั้น (Merchant ถูกเด้งกลับ) | dropdown `เลือกร้านค้า` (`#merchant-select`, จาก `merchants`) · ช่อง `ยอดซื้อ (บาท)` (`#amount-input`) · ปุ่ม `บันทึกรายการ` (`#submit-btn`) · ข้อความ error ใน `.form-msg` |
| `auth-guard.js` | ทุกหน้ายกเว้น login | ไม่ล็อกอิน → เด้งไป `login.html` · โหลด `users/{uid}` เป็น profile |
| `firebase-init.js` | ทุกหน้า | Firebase Web config (ค่าสาธารณะ ไม่ใช่ secret) |
| `ai-config.js` | `index.html` | คีย์ AI (OpenRouter) — **อยู่ใน `.gitignore` ห้าม commit** |

**การตรวจความครบของฟอร์ม `new-transaction.html`** (ตรวจฝั่งหน้าเว็บ + ฝั่ง
Security Rules ซ้ำ):

| กรณี | ข้อความ | บันทึก? |
|---|---|---|
| ไม่เลือกร้าน | `กรุณาเลือกร้านค้า` | ❌ |
| ยอดซื้อว่าง / ≤ 0 | `กรุณากรอกยอดซื้อให้ถูกต้อง` | ❌ |
| ยอดซื้อต่ำกว่า `minimumPurchaseAmount` | `ยอดซื้อต้องถึงขั้นต่ำ ฿ <n> ของร้านนี้` | ❌ |

---

## 4. โครงสร้างข้อมูล (Firestore)

### `users/{uid}`
| ช่อง | ชนิด | หมายเหตุ |
|---|---|---|
| `displayName` | string | ส่วนหน้าของอีเมล |
| `email` | string | |
| `role` | `"CUSTOMER"` \| `"MERCHANT"` | ผู้ใช้แก้เองไม่ได้ |
| `createdAt` | timestamp | server time |

### `merchants/{merchantId}` (อ่านอย่างเดียว)
| ช่อง | ชนิด |
|---|---|
| `shopName` | string |
| `minimumPurchaseAmount` | number (บาท) |

### `transactions/{txId}` — เอกสารหลัก
| ช่อง | ชนิด | ใครเขียน |
|---|---|---|
| `customerId` | string (= uid ผู้สร้าง) | Customer ตอนสร้าง |
| `customerName` | string | Customer ตอนสร้าง |
| `merchantId` | string (ต้องมีใน `merchants`) | Customer ตอนสร้าง |
| `merchantName` | string (denormalize `shopName`) | Customer ตอนสร้าง |
| `minimumPurchaseAmount` | number \| null (denormalize) | Customer ตอนสร้าง |
| `purchaseAmount` | number > 0 | Customer ตอนสร้าง |
| `status` | ดูหัวข้อ 5 | สร้าง = `PENDING_APPROVAL`, เปลี่ยน = Merchant |
| `createdAt` | timestamp | server time |
| `rejectionReason` | string (ไม่ว่าง) | Merchant ตอนปฏิเสธ |
| `aiSuggestion` | string | Merchant (ผลจาก AI) |
| `aiReason` | string | Merchant (ผลจาก AI) |

### `transactions/{txId}/events/{eventId}` — audit log (เพิ่มได้ แก้/ลบไม่ได้)
`eventType` (`CREATED` \| `APPROVED` \| `REJECTED`) · `actorId` (= uid) ·
`actorRole` · `timestamp`

### `transactions/{txId}/aiLogs/{logId}` — log ของผู้ช่วย AI (Merchant เท่านั้น)
`type` (`CUSTOMER_HISTORY_SUMMARY`) · `actorId` · `actorRole` ·
`historyReadCount` · `approvedCount` · `rejectedCount` · `recommendation` ·
`reason` · `timestamp`

---

## 5. สถานะ (`transactions.status`)

```
PENDING_APPROVAL ──(Merchant อนุมัติ)──▶ APPROVED
        │
        └──────(Merchant ปฏิเสธ + rejectionReason)──▶ REJECTED
```

- `APPROVED` / `REJECTED` เป็นสถานะสุดท้าย — เปลี่ยนต่อไม่ได้
- กฎ SP Point (CLAUDE.md §4): การแบ่งสรร 30 SP เกิด**หลัง APPROVED
  เท่านั้น** — รอบนี้**ยังไม่คำนวณจริง** (ดูหัวข้อ 7)

---

## 6. ผู้ช่วย AI (จากการบ้าน 3)

| ปุ่ม | ระดับ | อ่านอะไร | เขียนอะไร |
|---|---|---|---|
| `🤖 ให้ AI ช่วยจัดประเภท` | Level 1 | ข้อความ `rejectionReason` ที่พิมพ์ | เสนอหมวด `กรอกผิด` / `ต้องสงสัยว่าโกง` / `อื่น ๆ` → บันทึกเป็น `aiSuggestion`/`aiReason` ตอนยืนยันปฏิเสธ |
| `🤖 ให้ AI ช่วยสรุปประวัติ` | Level 2 (agentic) | ประวัติ `transactions` ของลูกค้าคนนั้น | `aiSuggestion`/`aiReason` (advisory, ไม่แตะ `status`) + 1 doc ใน `aiLogs` |

AI **ไม่มีสิทธิ์เปลี่ยน `status`** — ร้านค้าต้องกดเองเสมอ ·
เรียก AI ไม่สำเร็จต้องไม่ค้าง ยังอนุมัติ/ปฏิเสธแบบไม่มี AI ได้

---

## 7. สิ่งที่ไม่ทำใน Module นี้ (→ `BACKLOG.md`)

- แบ่งสรร SP / marketing fee จริงแบบ atomic (`FT-006`) — ทำแค่เปลี่ยนสถานะ
- สถานะ `CANCELLED` และ Admin ยกเลิกรายการ (`FT-014`), Auto-cancel SLA (`FT-019`)
- QR Code จริง (`FT-002`) — ลูกค้าเลือกร้านจาก dropdown แทนการสแกน
- ประวัติ/ยอด SP ของลูกค้า (`FT-004`) — `index.html` แสดงเฉพาะ `PENDING_APPROVAL`
- แลก reward (`FT-007`, `FT-008`), โปรไฟล์ร้าน (`FT-009`), reconciliation (`FT-010`)
- ระบบ Admin ทั้งหมด (`FT-011`–`FT-013`)
- PDPA consent / retention (`FT-016`, `FT-018`)
- แคมเปญ, ค้นหาร้าน, โปรโมชัน, insight (`FT-020`–`FT-023`)
- ผูกบัญชี Merchant กับร้านของตัวเอง — ตอนนี้ Merchant เห็นคิวทุกร้าน
- ย้ายคีย์ AI ไปฝั่ง server (Cloud Functions) — ตอนนี้ `ai-config.js` ถูก
  deploy ขึ้น Hosting และเปิดอ่านได้จากเว็บ

---

## 8. ข้อกำกับสำหรับผู้ช่วยทุกตัว

1. ห้ามเพิ่มหน้าจอ ช่องข้อมูล สถานะ หรือ collection ที่ไม่มีในสเปคนี้
2. ห้ามคำนวณ SP / marketing fee ฝั่ง client (CLAUDE.md §6, §14)
3. ห้ามแก้ `firestore.rules` โดยไม่รัน `npm run test:rules` ให้ผ่านก่อน
4. ห้าม commit `public/ai-config.js`, `.env*`, service-account key
5. ใช้ข้อมูลสมมติเท่านั้น (ห้ามชื่อ/เบอร์จริง)
6. เจอสิ่งที่สเปคไม่ได้บอก → หยุดถามผู้ใช้ ห้ามเดา

---

## Revision History

| วันที่ | การเปลี่ยนแปลง |
|---|---|
| 2026-09-24 | สร้างไฟล์ — รวม SCOPE.md + ระบบจริงหลังการบ้าน 1–3 + Security Rules HW4 |
