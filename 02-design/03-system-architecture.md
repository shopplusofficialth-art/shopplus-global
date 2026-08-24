# ShopPlus Global — High-Level Architecture (Conceptual)

**Version:** 2.2

**Last Updated:** 2026-08-24

**Document Owner:** Architecture Designer Agent (AI Native Development Workflow)

**Source:** `01-requirements/03-feature-list.md` (v1.0), `02-design/04-user-journey.md` (v1.0)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Date | Author/Agent | Description of Change |
|---|---|---|---|
| 1.0 | 2026-08-04 (ประมาณการจาก merge history) | Solution Architect (มนุษย์/ไม่ผ่าน agent) | เอกสารเริ่มต้น อธิบาย architecture โดยผูกกับ technology stack เฉพาะเจาะจง (Firebase, Firestore, Cloud Functions, Next.js, React) ตลอดทั้งเอกสาร |
| 2.0 | 2026-08-23 | Architecture Designer Agent | ปรับทั้งฉบับให้เป็น **conceptual/technology-agnostic** ตามคำขอ: (1) แยก layer/component ออกจากชื่อ technology เฉพาะเจาะจง (2) ย้ายรายละเอียด Firebase/Next.js/Firestore เดิมไปไว้ใน §8 "Current Technical Direction (Non-Binding Reference)" (3) เพิ่ม §5 Data Flow per User Journey โดยอ้างอิง `FT-xxx`/journey step จริงจาก `02-design/04-user-journey.md` แทนการอธิบาย flow แบบลอย ๆ (4) เพิ่ม §9 Open Questions/Assumptions รวม gap ที่พบระหว่างจัดทำ |
| 2.1 | 2026-08-23 | Traceability & Consistency Auditor (trigger: Database Schema Designer สร้าง `02-design/05-database-schema.md` v1.0) | เพิ่ม entity **"QR Transaction Token"** เข้า §6 Key Conceptual Data Entities — Database Schema Designer พบว่า FT-002 (Merchant QR Code Generation & Management) มี lifecycle ของโค้ดที่เกิดขึ้นก่อน Transaction Record จะถูกสร้าง (ออกโค้ด → รอสแกน → อาจหมดอายุ/ถูกยกเลิกโดยยังไม่มี transaction เกิดขึ้นเลย) ซึ่ง §6 เดิมไม่ได้ระบุไว้ — ผู้ใช้ยืนยันแนวทางนี้แล้วในขั้นตอน Plan Proposal ของ Database Schema Designer จึงถือเป็นการแก้ไข 🔧 (มีที่มาชัดเจนจาก FT-002 ที่มีอยู่แล้ว ไม่ใช่ capability ใหม่) |
| 2.2 | 2026-08-24 | Architecture Designer Agent | ปรับ §8 "Current Technical Direction" ให้ครบ 3 หัวข้อย่อยตาม skill `architecture-design-standard` Section C ข้อ 8 ที่ปรับปรุงใหม่: จัดตาราง layer→technology เดิมเข้า §8.1, เพิ่ม §8.2 "Known Platform Constraints" (ข้อจำกัดของ Firestore/Cloud Functions ที่ทราบ), และย้าย cross-reference ไปยัง `02-firestore-data-model.md` เข้า §8.3 — ไม่มีการเปลี่ยนแปลง layer/data flow/entity ระดับ conceptual ใน §1–§7 |

---

## 1. Purpose & Scope (วัตถุประสงค์และขอบเขต)

เอกสารนี้ให้มุมมอง **High-Level Architecture ระดับแนวคิด (conceptual)**
ของ ShopPlus Global — อธิบายว่าระบบประกอบด้วย layer/component อะไรบ้าง
ตามความรับผิดชอบ (responsibility) และข้อมูลไหลผ่านระบบอย่างไรตาม
**user journey จริง** ที่มีอยู่ใน `02-design/04-user-journey.md`

เอกสารนี้**ยังไม่ผูกมัดกับ technology stack เฉพาะเจาะจง** — ชื่อ cloud
provider, framework, หรือ database engine จะปรากฏเฉพาะใน §8 "Current
Technical Direction (Non-Binding Reference)" เท่านั้น เพื่อให้ทีมตัดสินใจ
หรือเปลี่ยนแปลงเทคโนโลยีในอนาคตได้โดยไม่ต้องออกแบบ architecture ระดับ
แนวคิดใหม่ทั้งหมด

**เอกสารนี้ไม่ครอบคลุม:**

- Entity/table-level conceptual detail, attribute, PDPA classification,
  และ ER Diagram (ดู `02-design/05-database-schema.md`)
- Field-level database schema เชิงเทคนิค (ดู
  `02-design/02-firestore-data-model.md` ถ้ามีอยู่)
- API specification/endpoint design
- Transaction status lifecycle แบบละเอียด (ดู
  `02-design/01-transaction-flow.md` สำหรับมุมมอง state machine)
- UI/UX design (ดู `02-design/DESIGN.md`)

**ขอบเขต Feature ที่ครอบคลุมในรอบนี้:** ทุก Feature ที่มีอยู่ใน Feature
List ปัจจุบัน (`FT-001`–`FT-023`) — Feature ที่ยัง Post-MVP/Blocked/
ไม่มี journey step ที่ชัดเจน จะถูกระบุไว้ใน §9 แทนการสมมติ data flow ขึ้นเอง

---

## 2. Actors & External Roles (ผู้มีส่วนเกี่ยวข้อง)

Actor ต่อไปนี้ตรงกับ actor ที่ปรากฏใน `02-design/04-user-journey.md`
โดยตรง (ไม่มี actor ใหม่ที่ journey ไม่มี):

| Actor | บทบาทระดับแนวคิด |
|---|---|
| **Customer** | ผู้บริโภคปลายทาง สแกน QR เพื่อสร้าง transaction, ดู SP balance, แลก reward |
| **Merchant** | ร้านค้าที่เข้าร่วมโครงการ ออก QR, อนุมัติ/ปฏิเสธ transaction, ดำเนินการ redemption fulfillment |
| **Admin** | ผู้ดูแลแพลตฟอร์ม จัดการบัญชี, เฝ้าติดตามระบบ, ตรวจสอบ audit log |
| **Platform (System)** | การประมวลผลอัตโนมัติที่ไม่มีผู้ใช้โต้ตอบโดยตรง เช่น การแบ่งสรร SP หลัง merchant อนุมัติ (ปรากฏเป็น Actor "Platform" ในตาราง Requirement Mapping ของ User Journey) |

---

## 3. Conceptual Architecture Layers (Layer ระดับแนวคิด)

ระบบถูกแบ่งเป็น layer ตามความรับผิดชอบ ไม่ใช่ตามชื่อ technology:

### 3.1 Experience Layer

จุดที่ผู้ใช้ (Customer/Merchant/Admin) โต้ตอบกับระบบ ครอบคลุมเฉพาะ
**presentation และ user interaction เท่านั้น** ตาม CLAUDE.md หมวด 6 —
ไม่มี business logic หรือการคำนวณ reward ใด ๆ อยู่ในชั้นนี้

### 3.2 Orchestration / API Layer

รับคำขอจาก Experience Layer, ตรวจสอบสิทธิ์เบื้องต้น (ร่วมกับ
Cross-Cutting Security), และส่งต่อไปยัง Business Logic Layer แล้วนำ
ผลลัพธ์กลับไปแสดงผล

### 3.3 Business Logic Layer

Layer หลักที่ควบคุม business rule ทั้งหมดของแพลตฟอร์ม — ทำงานฝั่ง
backend เท่านั้น (Client ต้องไม่คำนวณหรือกำหนดผลลัพธ์เอง ตาม CLAUDE.md
หมวด 6) ประกอบด้วยความรับผิดชอบย่อย:

- **Account & Profile Management** — บัญชีและโปรไฟล์ของ Customer/
  Merchant/Admin (FT-001, FT-009, FT-011)
- **Transaction Lifecycle Management** — การสร้าง ตรวจสอบ และเปลี่ยน
  สถานะ transaction (FT-003, FT-005, FT-014)
- **SP Point & Marketing Fee Distribution Engine** — การแบ่งสรร SP และ
  marketing fee หลัง merchant อนุมัติเท่านั้น (FT-006)
- **Reward Redemption & Fulfillment** — การแลกและยืนยันการรับ reward
  (FT-007, FT-008)
- **Fee & Transaction Reconciliation** — สรุปยอดสำหรับ merchant
  (FT-010)

### 3.4 Data & Ledger Layer

การจัดเก็บข้อมูลเชิงแนวคิด (ไม่ใช่ schema จริง — ดู §6) รองรับทุก
ความรับผิดชอบใน Business Logic Layer

### 3.5 Intelligence / Analytics Layer (Forward-Looking — Post-MVP)

Layer สำหรับความสามารถด้าน AI/insight ตามวิสัยทัศน์ธุรกิจของ ShopPlus
Global (CLAUDE.md หมวด 2: "โซลูชันการตลาดที่ขับเคลื่อนด้วย AI") — **ยัง
ไม่มี Feature ระดับ Must/Should have ใดใน Feature List ปัจจุบันที่ต้องใช้
layer นี้** (FT-021 Customer Behavior Insights เป็น "Won't have this
release") จึงยังไม่มี data flow ที่อ้างอิง layer นี้ใน §5 — คงไว้เป็น
placeholder ระดับแนวคิดเพื่อความต่อเนื่องของ roadmap เท่านั้น (ดู
หมายเหตุใน §9)

### 3.6 Cross-Cutting: Security, Audit & Compliance

ครอบคลุมทุก layer ข้างต้น:

- **Authentication & Authorization** — ยืนยันตัวตนและสิทธิ์ตาม role
  (Customer/Merchant/Admin)
- **Audit Trail** — บันทึกทุก action สำคัญแบบ immutable (FT-015)
- **PDPA Compliance** — consent management และ data minimization
  (FT-016, FT-017)

---

## 4. High-Level Component Diagram (แผนภาพระดับสูง)

```text
        Customer / Merchant / Admin
                    |
                    v
      Experience Layer (Web + Mobile Client Apps)
      — presentation & user interaction only —
                    |
                    v
        Orchestration / API Layer
   (รับคำขอ, ตรวจสอบสิทธิ์เบื้องต้น, ส่งต่อ)
                    |
                    v
          Business Logic Layer
  - Account & Profile Management
  - Transaction Lifecycle Management
  - SP Point & Marketing Fee Distribution Engine
  - Reward Redemption & Fulfillment
  - Fee & Transaction Reconciliation
                    |
                    v
          Data & Ledger Layer
  (User/Merchant Records, Transaction Records,
   Reward Ledger, Marketing Fund Ledger, Audit Log)
                    |
                    v  (read/aggregate path — ยังไม่มี Feature ใช้งานจริง)
     Intelligence / Analytics Layer (Forward-looking, Post-MVP)

  Cross-Cutting: Security, Audit & Compliance
  (ครอบคลุมทุก layer ตั้งแต่ Orchestration ถึง Data & Ledger)
```

---

## 5. Data Flow per User Journey (การไหลของข้อมูลตาม User Journey)

ทุก flow ด้านล่างอ้างอิง journey จริงใน `02-design/04-user-journey.md`
และ `FT-xxx` ที่เกี่ยวข้องกำกับท้ายแต่ละ flow

### Flow 1 — Customer Onboarding & PDPA Consent

Customer เปิดแอปครั้งแรก (Experience Layer) → กรอกข้อมูลลงทะเบียน/
login และให้ความยินยอม PDPA → Orchestration/API ส่งต่อไปยัง Business
Logic (Account & Profile Management) → บันทึก User Identity + สถานะ
consent ที่ Data & Ledger Layer → ถ้าไม่ยินยอม ระบบปิดกั้นการใช้ feature
ที่เก็บข้อมูลตั้งแต่ Orchestration/API Layer

*อ้างอิง: FT-001, FT-016 — Customer Journey ขั้นตอน 1–2*

### Flow 2 — Shop Discovery (Post-MVP)

Customer ค้นหาร้านค้าใกล้เคียง (Experience Layer) → Business Logic
(Account & Profile Management ส่วนของ Merchant Profile) อ่าน Merchant
Record จาก Data & Ledger Layer แบบ read-only → แสดงผลกลับ

*อ้างอิง: FT-022 — Customer Journey ขั้นตอน 3 (หมายเหตุ: Post-MVP)*

### Flow 3 — Merchant Shop & QR Setup

Merchant onboard และจัดการโปรไฟล์ร้านค้า (Business Logic: Account &
Profile Management) → บันทึก Merchant Profile ที่ Data & Ledger Layer →
Merchant ขอสร้าง QR สำหรับ transaction ใหม่ (Business Logic:
Transaction Lifecycle Management) → สร้าง identifier ที่ผูกกับ
transaction เฉพาะ ใช้ได้ครั้งเดียวและมีเวลาจำกัด → ส่งกลับให้ Experience
Layer แสดงผล

*อ้างอิง: FT-009, FT-002 — Merchant Journey ขั้นตอน 1–3*

### Flow 4 — Transaction Creation via QR Scan

Customer สแกน QR (Experience Layer) → Orchestration/API ส่งคำขอไปยัง
Business Logic (Transaction Lifecycle Management) → ตรวจสอบความถูกต้อง
ของ QR (ไม่หมดอายุ/ไม่ถูกใช้ซ้ำ/ถูกต้อง) → ถ้าผ่าน สร้าง Transaction
Record สถานะ `PENDING_APPROVAL` ที่ Data & Ledger Layer แล้วแจ้งกลับ
Customer ว่า "รอการอนุมัติ" → ถ้าไม่ผ่าน ปฏิเสธพร้อม error ที่ชัดเจน โดย
ไม่สร้าง record

*อ้างอิง: FT-003 — Customer Journey ขั้นตอน 4–6, Merchant Journey
ขั้นตอน 4–5*

### Flow 5 — Merchant Approval & SP/Marketing Fee Distribution

Merchant เปิด Pending Queue (Business Logic อ่าน Transaction Record จาก
Data & Ledger Layer) → ตัดสินใจอนุมัติหรือปฏิเสธผ่าน Orchestration/API →
Business Logic บังคับใช้เฉพาะ status transition ที่ถูกต้อง:

- **อนุมัติ** → SP Point & Marketing Fee Distribution Engine คำนวณและ
  แบ่งสรร 30 SP (10 Customer Reward / 10 Marketing Fund / 10 Platform)
  แบบ atomic → บันทึก Reward Ledger Entry + Marketing Fund Ledger Entry
  → เปลี่ยนสถานะ Transaction เป็น `COMPLETED` → สร้าง Audit Entry
- **ปฏิเสธ** → เปลี่ยนสถานะเป็น `REJECTED` ไม่มี SP ถูกแบ่งสรร → สร้าง
  Audit Entry

ผลลัพธ์ถูกส่งกลับไปยัง Customer และ Merchant ผ่าน Experience Layer

*อ้างอิง: FT-005, FT-006, FT-015 — Customer Journey ขั้นตอน 7–8,
Merchant Journey ขั้นตอน 6–7*

### Flow 6 — Customer Views SP Balance & Transaction History

Customer ร้องขอผ่าน Experience Layer (read-only) → Business Logic อ่าน
Reward Ledger Entry + Transaction Record จาก Data & Ledger Layer ที่
scope เฉพาะ Customer นั้น → แสดงผลกลับ

*อ้างอิง: FT-004 — Customer Journey ขั้นตอน 9*

### Flow 7 — Reward Redemption & Fulfillment

Customer ตัดสินใจแลก reward → Business Logic (Reward Redemption &
Fulfillment) ตรวจสอบ SP balance เพียงพอหรือไม่จาก Data & Ledger Layer →
ถ้าพอ สร้าง Redemption Reference และลด balance ที่เกี่ยวข้อง → Customer
นำ reference ไปแสดงที่ร้าน → Merchant ส่ง reference ผ่าน Experience
Layer → Business Logic ตรวจสอบว่า reference ถูกต้องและยังไม่ถูก
fulfilled → ทำเครื่องหมาย fulfilled และสร้าง Audit Entry

*อ้างอิง: FT-007, FT-008 — Customer Journey ขั้นตอน 10–11, Merchant
Journey ขั้นตอน 9–10*

### Flow 8 — Merchant Fee & Transaction Reconciliation

Merchant ร้องขอผ่าน Experience Layer (read-only) → Business Logic
(Fee & Transaction Reconciliation) รวมยอด Transaction Record +
Marketing Fund Ledger Entry ที่ scope เฉพาะ Merchant นั้น กรองตามช่วง
วันที่ → แสดงผลกลับ

*อ้างอิง: FT-010 — Merchant Journey ขั้นตอน 8*

### Flow 9 — Admin Account & Platform Operations

Admin จัดการบัญชี Customer/Merchant (Business Logic: Account & Profile
Management อัปเดต Data & Ledger Layer) → ดู SP Reward Rule แบบ
read-only (ค่าคงที่ที่กำหนดไว้ใน Business Logic configuration ไม่ใช่
per-transaction record) → เปิด System Monitoring Dashboard (Business
Logic รวมยอด Transaction Record ตามสถานะ) → ถ้าพบ transaction ค้างอยู่
ใน `PENDING_APPROVAL` นานเกินไป Admin อาจยกเลิกด้วยมือ (Business Logic
บังคับ transition เป็น `CANCELLED` ไม่มี SP ถูกแบ่งสรร) → สร้าง Audit
Entry ทุกครั้งที่มีการเปลี่ยนแปลง

*อ้างอิง: FT-011, FT-012, FT-013, FT-014 — Admin Journey ขั้นตอน 1–5*

### Flow 10 — Immutable Audit Trail & Investigation

ทุก action สำคัญของ Business Logic (transaction ถูกสร้าง, อนุมัติ/
ปฏิเสธ, SP ถูกแบ่งสรร, redemption ถูก fulfilled, admin ยกเลิก/แก้ไข
บัญชี) จะสร้าง Audit Entry แบบ immutable ที่ Data & Ledger Layer เสมอ →
Admin เปิด Audit Log และค้นหาด้วย transaction ID ผ่าน Experience Layer
→ Business Logic ดึงข้อมูลแบบ read-only เท่านั้น (ไม่มีช่องทางแก้ไข/ลบ)
เพื่อตรวจสอบความถูกต้องหรือสอบสวนกรณีพิพาท

*อ้างอิง: FT-015 — Admin Journey ขั้นตอน 6–7*

**หมายเหตุ:** FT-020 (Merchant Campaigns & Promotions), FT-021
(Customer Behavior Insights), และ FT-023 (Active Promotions View) มีอยู่
ใน Feature List แต่**ยังไม่มี journey step ที่ชัดเจน**ใน
`02-design/04-user-journey.md` จึงยังไม่ถูกอธิบายเป็น data flow ในเอกสาร
นี้ เพื่อไม่ให้เป็นการสมมติ flow ที่ไม่มีที่มา (ดู §9)

---

## 6. Key Conceptual Data Entities (ข้อมูลหลักระดับแนวคิด)

**ไม่ระบุ field-level schema** — ดูรายละเอียด schema จริงที่
`02-design/02-firestore-data-model.md` ถ้ามีอยู่

| Entity | คำอธิบาย | ความสัมพันธ์ |
|---|---|---|
| **User Identity** | บัญชีและ role ของ Customer/Merchant/Admin พร้อมสถานะ PDPA consent | เป็นเจ้าของ Merchant Profile (ถ้า role = Merchant), Reward Ledger Entry (ถ้า role = Customer) |
| **Merchant Profile** | ข้อมูลร้านค้า (ชื่อ, ที่อยู่, ประเภท, เวลาเปิด-ปิด) | เชื่อมกับ User Identity (Merchant), เป็นเป้าหมายของ Transaction Record |
| **QR Transaction Token** | โค้ดที่ merchant ออกให้ customer สแกน ผูกกับ transaction identifier เฉพาะ ใช้ได้ครั้งเดียว มีเวลาจำกัด (FT-002) — มี lifecycle ของตัวเองก่อนที่ Transaction Record จะถูกสร้าง (อาจหมดอายุ/ถูกยกเลิกโดยยังไม่มี transaction เกิดขึ้นเลย) | ออกโดย Merchant Profile, เมื่อถูกสแกนสำเร็จจะก่อให้เกิด Transaction Record 1 รายการ |
| **Transaction Record** | หนึ่งรอบ QR-scan-ถึง-completion พร้อม status lifecycle (`PENDING_APPROVAL` → `APPROVED`/`REJECTED`/`CANCELLED` → `COMPLETED`) | เกิดจากการสแกน QR Transaction Token, เชื่อม Customer + Merchant, เมื่อ `COMPLETED` จะสร้าง Reward Ledger Entry + Marketing Fund Ledger Entry |
| **Reward Ledger Entry** | บันทึก SP Point ที่ Customer ได้รับจาก Transaction ที่ completed | อ้างอิง Transaction Record ต้นทาง, เป็นที่มาของ SP Balance |
| **Marketing Fund Ledger Entry** | บันทึกส่วนแบ่งของ marketing fund/platform จาก Transaction ที่ completed | อ้างอิง Transaction Record ต้นทาง |
| **Redemption Reference** | คำขอแลก reward ของ Customer ที่รอการ fulfill ที่ร้าน | อ้างอิง Reward Ledger (ลด balance), ถูก fulfill โดย Merchant |
| **Audit Entry** | บันทึก immutable ของทุก action สำคัญที่เปลี่ยนแปลง state | อ้างอิงกลับไปยัง entity ต้นทางของ action นั้น (Transaction/Reward/Redemption/Admin action) |

---

## 7. Cross-Cutting Concerns (ประเด็นที่เกี่ยวข้องทุก layer)

### Security & Access Control

Role Based Access Control (RBAC) ระดับแนวคิด (ไม่ระบุกลไก
implementation):

- **Customer** — เข้าถึงเฉพาะ profile, reward, และ transaction ของ
  ตนเอง
- **Merchant** — เข้าถึงเฉพาะข้อมูลร้านของตนเอง, อนุมัติ/ปฏิเสธเฉพาะ
  transaction ที่รอตนเอง
- **Admin** — ดำเนินการระดับแพลตฟอร์ม (จัดการบัญชี, เฝ้าติดตาม)

### PDPA & Data Minimization

สอดคล้องกับ CLAUDE.md หมวด 10 — ต้องมี consent management (FT-016) ก่อน
สร้างบัญชี, เปิดเผยเฉพาะข้อมูลที่จำเป็นต่อ feature นั้น ๆ (FT-017), และมี
retention policy (FT-018 — ยัง **Blocked** จาก BRD Open Question 4)

### Auditability

ทุก action สำคัญที่เปลี่ยนแปลง state ต้องสร้าง Audit Entry แบบ append-
only (FT-015) — ไม่มีช่องทางแก้ไขหรือลบ Audit Entry ที่มีอยู่แล้ว

### Scalability Principles

- Business Logic Layer ควรออกแบบให้ไม่ผูกกับ session/state ภายในตัวเอง
  เพื่อรองรับการขยายตัวอิสระจาก Data & Ledger Layer
- Experience Layer แยกออกจาก Business Logic ผ่าน Orchestration/API
  Layer เพื่อรองรับ client หลายประเภท (web/mobile) โดยไม่ต้องซ้ำ
  business rule

---

## 8. Current Technical Direction (Non-Binding Reference) — ทิศทางเทคนิคปัจจุบัน (ไม่ผูกมัด)

> ส่วนนี้สะท้อนทิศทางเทคนิคปัจจุบันตาม `CLAUDE.md` หมวด 6 เท่านั้น
> **ไม่ใช่ constraint ของ architecture ระดับแนวคิดใน §1–§7 ข้างต้น** และ
> เปลี่ยนแปลงได้โดยไม่กระทบโครงสร้าง layer/data flow ที่อธิบายไว้

### 8.1 Layer → Technology Mapping (การ map Layer แนวคิดกับเทคโนโลยีปัจจุบัน)

| Conceptual Layer (§3) | Firebase/GCP Service ที่ใช้จริงตอนนี้ | หมายเหตุ |
|---|---|---|
| Experience Layer | Web Application (Firebase Hosting) + Mobile Application | เดิมระบุ Next.js/React + Firebase SDK สำหรับ web (ตาม CLAUDE.md หมวด 6 "Target: Web + Mobile") |
| Orchestration / API Layer | Firebase Cloud Functions (HTTPS Callable / HTTP Trigger) | รับคำขอจาก Experience Layer แล้วส่งต่อ Business Logic Layer |
| Business Logic Layer | Firebase Cloud Functions | ต้องอยู่ฝั่ง backend เท่านั้น ตาม CLAUDE.md หมวด 6 "Development Principle" — Client ไม่คำนวณ/กำหนดผลลัพธ์เอง |
| Data & Ledger Layer | Firebase Firestore — collection ระดับสูงที่เคยระบุไว้: `users`, `merchants`, `transactions`, `rewards`, `marketingFunds`, `auditLogs` (ดูรายละเอียด schema จริงที่ `02-design/02-firestore-data-model.md` ถ้ามีอยู่) | ดู §8.3 สำหรับ gap ที่พบระหว่าง entity แนวคิดกับ collection จริง |
| Intelligence / Analytics Layer | ยังไม่กำหนด — รอ Tech Stack Selection | ยังไม่มี Feature ระดับ Must/Should have ที่ต้องใช้ layer นี้ (ดู §3.5) จึงยังไม่ระบุบริการเทคนิคจริง |
| Cross-Cutting: Security, Audit & Compliance | Firebase Authentication | ยืนยันตัวตนและสิทธิ์ตาม role — กลไก authorization/security rule ระดับละเอียดยังไม่ระบุ |
| Deployment | Firebase Hosting, Cloud Functions, Firestore, Cloud Storage — deploy ผ่าน GitHub Repository → CI/CD Process → Production Environment | |

### 8.2 Known Platform Constraints (ข้อจำกัดที่ทราบของทิศทางเทคนิคปัจจุบัน)

ข้อจำกัดเชิงเทคนิคของ Firebase/Firestore/Cloud Functions ที่อาจกระทบการ
ออกแบบเชิงเทคนิคในเอกสารถัดไปของสาย 02-design (ไม่ใช่ constraint ของ
conceptual layer/data flow ข้างต้น — เป็นข้อมูลอ้างอิงให้
`database-schema-designer`/`api-spec-designer`/`detailed-design-writer`
ใช้ประกอบการตัดสินใจ):

- **ไม่มี join ข้าม collection โดยตรง** — Firestore เป็น document database
  การอ่านข้อมูลที่ต้องรวมจากหลาย entity (เช่น Flow 8 "Merchant Fee &
  Transaction Reconciliation" ที่รวม Transaction Record + Marketing Fund
  Ledger Entry) มักต้อง denormalize field บางส่วนซ้ำข้าม collection หรือ
  query แยกแล้วรวมผลที่ Business Logic Layer
- **Cloud Functions มี cold start latency** — operation ที่ต้อง
  response เร็ว (เช่น Flow 4 "Transaction Creation via QR Scan" ที่
  customer รอผลทันทีหลังสแกน) ควรพิจารณาผลกระทบนี้เมื่อออกแบบ API Spec
- **ขีดจำกัดเรื่อง composite query/index ของ Firestore** — query ที่กรอง
  มากกว่า 1 field พร้อมกัน (เช่น Flow 5 "View Pending Transaction Queue"
  ที่กรองด้วย merchantId + status) ต้องสร้าง composite index ล่วงหน้า —
  ดูรายละเอียดที่ `02-design/05-database-schema.md` §8.3 "Indexing
  Direction"
- **Transaction/Batch write มีขีดจำกัดจำนวนเอกสารต่อครั้ง** — เกี่ยวข้อง
  กับ Flow 5 ที่ต้องบันทึก Reward Ledger Entry + Marketing Fund Ledger
  Entry + เปลี่ยนสถานะ Transaction แบบ atomic (CLAUDE.md หมวด 4
  "Approval-Gated Calculation")

### 8.3 Cross-Reference เอกสารเทคนิคเดิม

รายละเอียด field-level schema จริงของทิศทาง Firestore ปัจจุบันอยู่ที่
`02-design/02-firestore-data-model.md` (เอกสารแยกอิสระ ไม่ได้ถูกแก้ไขโดย
agent นี้) — ดู `02-design/05-database-schema.md` §8.1 "Entity →
Firestore Collection Mapping" สำหรับ mapping ระดับ entity ที่ละเอียดกว่า
ตารางใน §8.1 ข้างต้น

---

## 9. Open Questions / Assumptions (ประเด็นที่ยังไม่ชัดเจน)

- **Notification ระหว่างรออนุมัติ** — ยังไม่มีคำตอบว่า Customer จะได้รับ
  การแจ้งเตือนระหว่าง `PENDING_APPROVAL` หรือไม่ (BRD Open Question 7,
  อ้างอิงใน User Journey §5) — กระทบว่า Experience Layer/Orchestration
  ต้องมี notification channel เพิ่มหรือไม่
- **FT-019 SLA/Auto-Cancel** — ยัง Blocked จาก BRD Open Question 6 —
  Business Logic ปัจจุบันมีเฉพาะ manual cancellation โดย Admin
  (FT-014) ยังไม่มี automated timeout ใน Transaction Lifecycle
  Management
- **FT-018 Data Retention Policy** — ยัง Blocked จาก BRD Open Question
  4 — Data & Ledger Layer ยังไม่มีนโยบาย retention/archival ที่ชัดเจน
- **SP redemption expiry และขอบเขตการแลก** (platform-wide หรือเฉพาะ
  merchant) — BRD Open Question 5 และ 2 — อาจกระทบการออกแบบ Redemption
  Reference ในอนาคต
- **FT-020, FT-021, FT-023** — มีอยู่ใน Feature List แต่ยังไม่มี journey
  step ที่ชัดเจนใน User Journey จึงยังไม่ถูกอธิบายเป็น data flow ใน §5 —
  ควรเพิ่มเมื่อ User Journey ถูกขยายให้ครอบคลุม Feature เหล่านี้
- **Intelligence / Analytics Layer (§3.5)** — คงไว้เป็น placeholder ตาม
  วิสัยทัศน์ธุรกิจของ ShopPlus Global (CLAUDE.md หมวด 2) แต่ปัจจุบันไม่มี
  Feature ระดับ Must/Should have ที่ต้องใช้ layer นี้ — แนะนำให้ทบทวน
  ขอบเขตของ layer นี้อีกครั้งเมื่อ Feature ด้าน AI/insight ถูกจัดลำดับ
  ความสำคัญขึ้นมาใน Feature List ในอนาคต

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ business stakeholder และปรับปรุง
เมื่อ Feature List หรือ User Journey มี revision ใหม่*
