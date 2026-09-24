# BACKLOG.md — งานที่ยังไม่เสร็จ ส่งต่อ Module 3

**Project:** ShopPlus Global — Transaction Approval (Module 2 MVP)
**อ้างอิง:** [spec.md](spec.md) §7 · [test-results.md](test-results.md) ·
Feature List ทางการ: `01-requirements/03-feature-list.md`

ลำดับความสำคัญ: 🔴 ต้องทำก่อน · 🟠 ควรทำ · 🟢 ทำเมื่อพร้อม

---

## 1. 🔴 ย้ายคีย์ AI ไปไว้ฝั่งที่ผู้ใช้แตะไม่ได้

| หัวข้อ | รายละเอียด |
|---|---|
| ปัญหา | คีย์ OpenRouter อยู่ใน `public/ai-config.js` — **ไม่ได้อยู่ใน GitHub** (อยู่ใน `.gitignore` และไม่เคยถูก commit) แต่ถูก deploy ขึ้น Firebase Hosting ด้วย ใครก็เปิด `https://shopplus-global.web.app/ai-config.js` อ่านคีย์ได้ และหน้าเว็บเรียก OpenRouter จาก browser ตรง ๆ |
| แนวทาง | สร้าง Cloud Function (callable) 2 ตัว: `classifyRejectReason`, `summarizeCustomerHistory` — เก็บคีย์ใน Secret Manager (`defineSecret`) · ตรวจ `context.auth` + role `MERCHANT` ฝั่ง server · หน้าเว็บเรียก function แทน OpenRouter · ลบ `ai-config.js` ออกจาก `public/` แล้ว deploy Hosting ใหม่ |
| ต้องทำทันทีหลังย้าย | **หมุนคีย์ (rotate) ที่ OpenRouter** เพราะคีย์เดิมเคยเปิดเผยบนเว็บแล้ว |
| ข้อจำกัด | Cloud Functions ต้องใช้ Blaze plan (ตอนนี้เป็น Spark) |

## 2. 🟠 สิ่งที่เทสต์จับได้แต่ยังไม่ได้แก้

| # | ที่มา | ปัญหา | แนวทาง |
|---|---|---|---|
| 2.1 | E2E ③-a, ③-b | ข้อความ `กรุณาเลือกร้านค้า` / `กรุณากรอกยอดซื้อให้ถูกต้อง` ใน spec §3 ไม่เคยแสดง — HTML `required` ของ browser บล็อกก่อน (ขึ้นข้อความภาษาอังกฤษของ Chromium แทน) ผลคือ "ไม่บันทึก" ถูกต้อง แต่ข้อความไม่ตรง spec | ตัดสินใจว่าจะใช้ข้อความ browser (แก้ spec) หรือใส่ `novalidate` ให้ฟอร์มแสดงข้อความภาษาไทยของแอป |
| 2.2 | E2E ①, ③-d, ⑤ | เทสต์สร้างรายการ `PENDING_APPROVAL` ทิ้งไว้ในคิวร้านค้าบนระบบจริงทุกครั้งที่รัน | เพิ่ม `afterAll` ให้ลูกค้า A ลบรายการที่เทสต์สร้าง (ลูกค้าลบรายการ PENDING ของตัวเองได้อยู่แล้ว) หรือแยก Firebase project สำหรับทดสอบ |
| 2.3 | Rules review (`data-guard`) | ร้านค้าบันทึก event `APPROVED`/`REJECTED` **ซ้ำ** ได้ให้รายการที่จบแล้ว (ประเภทต้องตรงสถานะจริง แต่ไม่กันซ้ำ) | ย้ายการเขียน event ไปทำใน Cloud Function / transaction เดียวกับการเปลี่ยน status หรือใช้ doc id คงที่ต่อ eventType |
| 2.4 | Rules review | Merchant เห็นและอนุมัติคิว `PENDING_APPROVAL` ของ**ทุกร้าน** — ยังไม่มีช่องผูกบัญชี merchant กับ `merchants/{id}` | เพิ่ม `users/{uid}.merchantId` (ตั้งผ่าน Admin) → กฎเช็ค `resource.data.merchantId == merchantId ของผู้ใช้` → หน้า `index.html` query เพิ่ม `where("merchantId", "==", ...)` |
| 2.5 | Rules review | `scripts/seed-firestore.js` เขียนแบบไม่ล็อกอิน จึงใช้ไม่ได้ตั้งแต่มี Security Rules | เปลี่ยนเป็น Admin SDK ที่รันในเครื่อง (service-account key ต้องอยู่นอก repo) หรือ seed ผ่าน emulator |

## 3. 🟠 ฟีเจอร์จาก Feature List (Module 1) ที่ยังไม่ได้ทำ

| Feature | ชื่อ | Priority เดิม | สถานะใน Module 2 |
|---|---|---|---|
| `FT-001` | Customer Account & Authentication | Must | ⚠️ บางส่วน — มีสมัคร/ล็อกอินด้วยอีเมล ยังไม่มียืนยันอีเมล/ลืมรหัสผ่าน |
| `FT-002` | Merchant QR Code Generation & Management | Must | ❌ — ใช้ dropdown เลือกร้านแทน QR |
| `FT-003` | Customer QR Scan & Transaction Creation | Must | ⚠️ บางส่วน — สร้างรายการได้ แต่ไม่มีการสแกน QR |
| `FT-004` | Customer SP Balance & Transaction History | Must | ❌ — `index.html` แสดงเฉพาะ `PENDING_APPROVAL` |
| `FT-005` | Merchant Transaction Approval Workflow | Must | ✅ ทำแล้ว (ขอบเขตหลักของ Module 2) — เหลือข้อ 2.4 |
| `FT-006` | SP Point Distribution & Marketing Fee Engine | Must | ❌ — ต้องทำฝั่ง server (Cloud Function) แบ่ง 30 SP = 10/10/10 หลัง `APPROVED` เท่านั้น ตาม CLAUDE.md §4 |
| `FT-007` / `FT-008` | Reward Redemption / Fulfillment | Should | ❌ |
| `FT-009` | Merchant Shop Profile Management | Must | ❌ — แก้ `merchants` ได้ผ่าน Console เท่านั้น |
| `FT-010` | Merchant Fee & Transaction Reconciliation | Must | ❌ |
| `FT-011` – `FT-013` | Admin: User/Merchant Management, Reward Rule, Monitoring | Must/Should | ❌ — เปลี่ยน role ได้ผ่าน Console เท่านั้น |
| `FT-014` | Admin Manual Transaction Cancellation (`CANCELLED`) | Should | ❌ |
| `FT-015` | Immutable Transaction Audit Log | Must | ⚠️ บางส่วน — `events` append-only แล้ว เหลือข้อ 2.3 |
| `FT-016` | PDPA Consent Management | Must | ❌ |
| `FT-017` | Data Minimization & Secure Access Control | Must | ⚠️ บางส่วน — Security Rules role/ownership ทำแล้ว, ไม่ส่ง PII ให้ AI · เหลือ masked customer id ตาม SCOPE.md |
| `FT-018` | Data Retention Policy | Should | ❌ |
| `FT-019` | Merchant Approval SLA / Auto-Cancel | Could | ❌ |
| `FT-020` – `FT-023` | Campaigns, Behavior Insights, Shop Discovery, Promotions | Could/Won't | ❌ (Post-MVP) |

## 4. 🟢 อื่น ๆ

- ผูก `minimumPurchaseAmount` / `rejectionReason` เข้าเอกสารทางการ (BRD, Database
  Schema) ผ่าน `requirement-analyst` — ตามที่ SCOPE.md ระบุไว้
- เพิ่ม CI (GitHub Actions) รัน `npm run test:rules` ทุก PR

---

## Revision History

| วันที่ | การเปลี่ยนแปลง |
|---|---|
| 2026-09-24 | สร้างไฟล์ — ส่งต่อ Module 3 หลังการบ้าน 4 |
