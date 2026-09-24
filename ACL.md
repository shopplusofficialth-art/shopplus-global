# ACL.md — ตารางสิทธิ์ของระบบ ShopPlus Global (Transaction Approval)

**Scope:** Module 2 Homework (RAISE2) — ดู [SCOPE.md](SCOPE.md) และ
[CLAUDE.md](CLAUDE.md) Section 14 สำหรับ collection/status ที่เกี่ยวข้อง

**Feature ที่ครอบคลุม:** FT-005 (Merchant Transaction Approval Workflow),
FR-019/FR-021, US-004/US-005

---

## บทบาท (Roles)

ระบบมี **3 บทบาท** ตาม Persona เดิมของโปรเจกต์
(`01-requirements/01-business-requirement.md`) แต่ขอบเขตการบ้านนี้
**บังคับใช้จริง (enforced)** แค่ 2 บทบาทแรก — Admin มีไว้เพื่อความสมบูรณ์
ของเอกสารเท่านั้น ยังไม่มีหน้าจอ/สิทธิ์ implement จริงในรอบนี้ (ดู
"หมายเหตุ" ท้ายไฟล์)

| บทบาท | ใครคือคนนี้ | บังคับใช้จริงรอบนี้? |
|---|---|---|
| **Customer** (ลูกค้า) | คนสแกน QR แล้วสร้างรายการทำธุรกรรม | ✅ ใช่ |
| **Merchant** (ร้านค้า) | คนอนุมัติ/ปฏิเสธรายการที่ลูกค้าส่งมา | ✅ ใช่ |
| **Admin** (ผู้ดูแลระบบ) | ทีมปฏิบัติการของแพลตฟอร์ม | ❌ ยังไม่ (ดูหมายเหตุ) |

Role ของบัญชีเก็บที่ `users/{uid}.role` — บัญชีใหม่ทุกบัญชีเริ่มต้นเป็น
`CUSTOMER` เสมอ (ดู `public/login.html`) การจะเปลี่ยนเป็น `MERCHANT` ต้อง
แก้ field นี้เองใน Firebase Console → Firestore (ยังไม่มีหน้า Admin
จัดการ role ในรอบนี้)

---

## ตารางสิทธิ์ (Permission Matrix)

| บทบาท | ทำได้ | ทำไม่ได้ |
|---|---|---|
| **Customer** | • สร้างรายการทำธุรกรรมใหม่ (`transactions`, สถานะเริ่มต้น `PENDING_APPROVAL`, `customerId` = uid ของตัวเอง)<br>• ดูรายการทำธุรกรรม**ของตัวเองเท่านั้น** (กรองด้วย `customerId == uid`)<br>• ลบรายการของตัวเองที่**ยังเป็น `PENDING_APPROVAL`** เท่านั้น (ต้องยืนยันก่อนลบทุกครั้ง) | • ดูรายการทำธุรกรรมของ**ลูกค้าคนอื่น** (ไม่ว่าสถานะใด)<br>• อนุมัติ (`APPROVED`) หรือปฏิเสธ (`REJECTED`) รายการใด ๆ แม้แต่ของตัวเอง<br>• แก้ไขรายการที่ `APPROVED`/`REJECTED` แล้ว (ลบไม่ได้, แก้ไม่ได้)<br>• แก้ field อื่นของ transaction นอกจากตอนสร้าง (เช่น แก้ `purchaseAmount` ย้อนหลัง)<br>• เข้าถึงข้อมูลระบบโดยไม่ล็อกอิน |
| **Merchant** | • ดูคิวรายการที่รอดำเนินการ (`status == PENDING_APPROVAL`) **ของทุกลูกค้า**<br>• อนุมัติรายการ → เปลี่ยนเฉพาะ field `status` เป็น `APPROVED`<br>• ปฏิเสธรายการ → เปลี่ยน `status` เป็น `REJECTED` **พร้อมระบุ `rejectionReason` เสมอ** (บังคับกรอก) | • สร้างรายการทำธุรกรรมใหม่แทนลูกค้า<br>• ลบรายการทำธุรกรรมใด ๆ (แม้จะเป็น `PENDING_APPROVAL`)<br>• อนุมัติ/ปฏิเสธรายการที่ตัวเองเป็นคนสร้าง (ไม่เกิดขึ้นในระบบนี้อยู่แล้ว เพราะ Merchant ไม่ใช่คนสร้างรายการ)<br>• แก้ field อื่นของ transaction นอกจาก `status`/`rejectionReason`<br>• เข้าถึงข้อมูลระบบโดยไม่ล็อกอิน |
| **Admin** *(ยังไม่ implement)* | *(ตามแผนระยะถัดไป)* ดู audit log ของทุก transaction, บริหารจัดการบัญชี/role ผู้ใช้, ดูสุขภาพระบบ | *(ยังไม่ implement)* ทุกอย่างที่ยังไม่มีหน้าจอรองรับในรอบนี้ — **ทำไม่ได้เลยในทางปฏิบัติ** เพราะไม่มี UI ให้ทำ |

---

## กฎขั้นต่ำ (Baseline Rule) — ใช้ร่วมกันทุกบทบาท

> **ต้องล็อกอินก่อนเสมอ จึงจะอ่านหรือเขียนข้อมูลใดใน Firestore ได้**
> (ไม่มีข้อยกเว้น แม้แต่การอ่านอย่างเดียว)

บังคับใช้ 2 ชั้น:
1. **Client-side (UX):** `public/auth-guard.js` เด้งไปหน้า `login.html`
   ทันทีถ้ายังไม่ล็อกอิน
2. **Server-side (ของจริง):** Firestore Security Rules — ดู
   `firestore.rules` ที่ repo root — เป็นชั้นที่บังคับจริง แม้ client จะข้าม
   auth-guard.js หรือยิง Firestore SDK/REST ตรง ๆ ก็ทำเกินสิทธิ์ไม่ได้

## Security Rules ระดับ role/ownership (Module 2 Homework 4)

ตารางสิทธิ์ด้านบนบังคับใช้จริงใน `firestore.rules` แล้ว (role อ่านจาก
`users/{uid}.role` ฝั่ง server เสมอ):

| Collection | อ่าน | สร้าง | แก้ไข | ลบ |
|---|---|---|---|---|
| `users/{uid}` | เจ้าของเท่านั้น | เจ้าของ, `role` ต้องเป็น `CUSTOMER` | เจ้าของ, ห้ามแตะ `role` | ❌ |
| `merchants` | ล็อกอินแล้ว | ❌ (Console เท่านั้น) | ❌ | ❌ |
| `transactions` | Merchant ทุกใบ · Customer เฉพาะ `customerId == uid` | Customer, `customerId == uid`, `status == PENDING_APPROVAL`, ช่องบังคับครบ, `purchaseAmount > 0`, ร้านต้องมีอยู่จริง | Merchant เท่านั้น เฉพาะใบที่ `PENDING_APPROVAL`: → `APPROVED` (แก้ได้แค่ `status`) / → `REJECTED` (ต้องมี `rejectionReason` ไม่ว่าง) / เขียน `aiSuggestion`·`aiReason` | Customer เจ้าของ เฉพาะ `PENDING_APPROVAL` |
| `transactions/{id}/events` | คนที่อ่าน transaction นั้นได้ | `actorId == uid` · `CREATED` = Customer · `APPROVED`/`REJECTED` = Merchant | ❌ (append-only) | ❌ |
| `transactions/{id}/aiLogs` | Merchant | Merchant, `actorId == uid` | ❌ | ❌ |
| อื่น ๆ ทั้งหมด | ❌ | ❌ | ❌ | ❌ |

ตรวจด้วย Firestore Emulator ก่อน deploy ทุกครั้ง: `npm run test:rules`
(`tests/firestore-rules.test.js` — 42 เคส)

**ข้อจำกัดที่รู้อยู่แล้ว (Known Limitation):** Merchant ยังเห็น/อนุมัติ
คิว `PENDING_APPROVAL` ของ**ทุกร้าน** ตามตารางสิทธิ์เดิม เพราะยังไม่มี field
ผูกบัญชี merchant (`users/{uid}`) กับ `merchants/{id}` — ย้ายไป `BACKLOG.md`

---

## ตรวจสอบตามเกณฑ์ 3 ข้อของใบงาน

| # | เกณฑ์ | ผ่านไหม |
|---|---|---|
| ① | ช่อง "ทำไม่ได้" ครบทุกแถว ไม่มีว่าง | ✅ ครบทั้ง 3 แถว |
| ② | คนสร้างรายการ (Customer) อนุมัติของตัวเองไม่ได้ | ✅ Customer ไม่มีสิทธิ์อนุมัติ/ปฏิเสธเลย (ไม่ว่าของใคร) |
| ③ | คนสร้างรายการ (Customer) ดูของคนอื่นไม่ได้ | ✅ บังคับจริงที่ Security Rules (`customerId == uid`) |

---

## Revision History

| วันที่ | การเปลี่ยนแปลง |
|---|---|
| 2026-09-06 | สร้างไฟล์ครั้งแรก — Module 2 Homework Part C |
| 2026-09-23 | Homework 4: บังคับตารางสิทธิ์จริงใน `firestore.rules` (role/ownership) + ตารางกฎต่อ collection + ทดสอบด้วย emulator |
