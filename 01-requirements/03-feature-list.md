# Feature List

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Feature List (MoSCoW)
**Phase:** 01-requirements
**Version:** 1.0
**Status:** Draft — pending stakeholder review
**Date:** 2026-08-17
**Prepared by:** Feature List Analyst Agent (AI Native Development Workflow)
**Source:** `01-business-requirement.md` (v1.1) + `02-product-backlog.md` (v1.1)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | รวบรวม Feature ทั้งหมดจาก BRD v1.1 และ Product Backlog v1.1 เป็น Feature List เดียว จัดลำดับความสำคัญด้วย MoSCoW |

---

## 1. Purpose (วัตถุประสงค์)

เอกสารนี้รวบรวม Functional Requirement (FR-xxx) จาก BRD และ Epic/User
Story (US-xxx) จาก Product Backlog ให้กลายเป็น **Feature** ระดับที่
stakeholder มองเห็นเป็น "ความสามารถ" เดียวกัน (ไม่ใช่การ list FR/US ซ้ำ
ทีละรายการ) และจัดลำดับความสำคัญใหม่ด้วยหลักการ **MoSCoW** (Must /
Should / Could / Won't have) โดยแปลงจาก priority P0–P3 เดิมของ Backlog
อย่างสอดคล้องกัน (ดูตาราง mapping ใน
`.claude/skills/feature-list-and-user-journey.md`)

ทุก Feature มี ID ใหม่ `FT-0xx` และอ้างอิงกลับไปยัง FR-xxx/US-xxx ที่มา
เสมอ เพื่อรักษา traceability ตลอดสาย BRD → Backlog → Feature List →
User Journey

---

## 2. MoSCoW Priority Legend (คำอธิบายระดับ MoSCoW)

| MoSCoW | ความหมาย | เทียบเท่า Backlog Priority |
|---|---|---|
| **Must have** | MVP-blocking ขาดไม่ได้ | P0 |
| **Should have** | จำเป็นก่อน launch แต่ไม่ block MVP core loop | P1 |
| **Could have** | มีมูลค่าแต่เลื่อนได้ | P2 |
| **Won't have (this release)** | อยู่นอกขอบเขตของ release ปัจจุบัน | P3 / Deferred |

---

## 3. Feature Summary Table (ตารางสรุป Feature)

| Feature ID | Feature Name | Module | MoSCoW | Related FR | Related US | Sprint / Status |
|---|---|---|---|---|---|---|
| FT-001 | Customer Account & Authentication | Customer Application | Must have | FR-001 | US-001 | Sprint 1 |
| FT-002 | Merchant QR Code Generation & Management | Merchant Application | Must have | — (new) | US-023 | Sprint 2 |
| FT-003 | Customer QR Scan & Transaction Creation | Customer Application | Must have | FR-002 | US-002 | Sprint 2 |
| FT-004 | Customer SP Balance & Transaction History | Customer Application | Must have | FR-003 | US-003 | Sprint 4 |
| FT-005 | Merchant Transaction Approval Workflow | Merchant Application | Must have | FR-019, FR-021 | US-004, US-005 | Sprint 2 |
| FT-006 | SP Point Distribution & Marketing Fee Engine | Core Reward Logic | Must have | FR-016, FR-017, FR-018 | US-006, US-007 | Sprint 3 |
| FT-007 | Reward Redemption (Customer) | Customer Application | Should have | FR-004 | US-008 | Sprint 4 |
| FT-008 | Redemption Fulfillment (Merchant) | Merchant Application | Should have | — (new) | US-024 | Sprint 4 |
| FT-009 | Merchant Shop Profile Management | Merchant Application | Must have | FR-007 | US-009 | Sprint 1 |
| FT-010 | Merchant Fee & Transaction Reconciliation | Merchant Application | Must have | FR-009, FR-010 | US-010 | Sprint 4 |
| FT-011 | Admin User & Merchant Account Management | Admin System | Must have | FR-012, FR-013 | US-015 | Sprint 1 |
| FT-012 | SP Reward Rule Visibility (read-only) | Admin System | Must have | FR-014 | US-016 | Sprint 4 |
| FT-013 | System Monitoring Dashboard | Admin System | Should have | FR-015 | US-017 | Sprint 4 |
| FT-014 | Admin Manual Transaction Cancellation | Admin System | Should have | — (new) | US-025 | Sprint 2 |
| FT-015 | Immutable Transaction Audit Log | Transaction Audit & Traceability | Must have | FR-020, FR-022 | US-018 | Sprint 3 |
| FT-016 | PDPA Consent Management | PDPA Compliance & Data Security | Must have | — | US-019 | Sprint 1 |
| FT-017 | Data Minimization & Secure Access Control | PDPA Compliance & Data Security | Must have | — | US-020 | Sprint 1 |
| FT-018 | Data Retention Policy | PDPA Compliance & Data Security | Should have | — | US-021 | Post-MVP (Blocked) |
| FT-019 | Merchant Approval SLA / Auto-Cancel | Core Reward Logic (Cross-cutting) | Could have | — | US-022 | Post-MVP (Blocked) |
| FT-020 | Merchant Campaigns & Promotions | Merchant Application (Post-MVP) | Could have | FR-008 | US-011 | Post-MVP |
| FT-021 | Customer Behavior Insights | Merchant Application (Post-MVP) | Won't have (this release) | FR-011 | US-012 | Post-MVP |
| FT-022 | Shop Discovery & Search | Customer Application (Post-MVP) | Could have | FR-005 | US-013 | Post-MVP |
| FT-023 | Active Promotions View | Customer Application (Post-MVP) | Could have | FR-006 | US-014 | Post-MVP |

---

## 4. Feature Descriptions (คำอธิบายรายละเอียดต่อ Feature)

### FT-001 — Customer Account & Authentication

**Description:** ให้ customer ลงทะเบียนและเข้าสู่ระบบได้ พร้อมขั้นตอน
ขอความยินยอมตาม PDPA ก่อนสร้างบัญชี เป็นจุดเริ่มต้นของทุก journey
ของ customer

**MoSCoW:** Must have — ไม่มี feature อื่นใช้งานได้เลยถ้า customer ยังเข้า
ระบบไม่ได้

**Related FR/US:** FR-001 / US-001

---

### FT-002 — Merchant QR Code Generation & Management

**Description:** ให้ merchant สร้าง QR code ที่ผูกกับ transaction identifier
เฉพาะ ใช้ได้ครั้งเดียว มีเวลาจำกัด และสามารถยกเลิกโค้ดที่ยังไม่ถูกสแกนได้
ด้วยมือ

**MoSCoW:** Must have — ถ้าไม่มี feature นี้ customer จะไม่มีโค้ดให้สแกน
เลย ทำให้ core loop ทั้งหมดเริ่มต้นไม่ได้

**Related FR/US:** ไม่มีใน BRD โดยตรง (New — แนะนำให้เพิ่มเข้า BRD เป็น
FR ในอนาคต) / US-023

---

### FT-003 — Customer QR Scan & Transaction Creation

**Description:** ให้ customer สแกน QR code ของ merchant เพื่อสร้าง
transaction สถานะ `PENDING_APPROVAL` รวมถึงปฏิเสธการสแกนที่ไม่ถูกต้อง/
หมดอายุ/ใช้ซ้ำ

**MoSCoW:** Must have — เป็นจุดเริ่มต้นของ core value loop ทั้งหมด

**Related FR/US:** FR-002 / US-002

---

### FT-004 — Customer SP Balance & Transaction History

**Description:** ให้ customer ดู SP Point balance ปัจจุบันและประวัติ
transaction พร้อมสถานะ (Pending Approval, Approved, Completed,
Rejected, Cancelled)

**MoSCoW:** Must have — customer ต้องเห็นผลของการสแกนและการอนุมัติ
ของตนเองได้ ไม่เช่นนั้น reward ecosystem จะไม่โปร่งใส

**Related FR/US:** FR-003 / US-003

---

### FT-005 — Merchant Transaction Approval Workflow

**Description:** ให้ merchant ตรวจสอบ อนุมัติ หรือปฏิเสธ transaction ที่
`PENDING_APPROVAL` และบังคับใช้เฉพาะ status transition ที่ถูกต้องเท่านั้น

**MoSCoW:** Must have — เป็นเงื่อนไขที่ต้องมีก่อนที่จะเกิดการแบ่งสรร SP
ใด ๆ ได้เลย

**Related FR/US:** FR-019, FR-021 / US-004, US-005

---

### FT-006 — SP Point Distribution & Marketing Fee Engine

**Description:** แบ่งสรร 30 SP (10 Customer Reward / 10 Marketing Fund /
10 Platform) ที่ฝั่ง server เท่านั้น และเกิดขึ้นหลังจาก merchant อนุมัติแล้ว
เท่านั้น ห้ามเชื่อค่าจาก client

**MoSCoW:** Must have — คือ core business value ของทั้งแพลตฟอร์ม
(reward ecosystem)

**Related FR/US:** FR-016, FR-017, FR-018 / US-006, US-007

---

### FT-007 — Reward Redemption (Customer)

**Description:** ให้ customer เลือกดูและแลก reward ด้วย SP Point ที่มี
พร้อมการป้องกันกรณี balance ไม่พอ

**MoSCoW:** Should have — เพิ่มมูลค่าให้ customer เห็นผลตอบแทนที่จับ
ต้องได้ แต่ core loop (scan → approve → distribute) พิสูจน์ ecosystem
ได้โดยไม่ต้องมี redemption ในรอบแรก

**Related FR/US:** FR-004 / US-008

---

### FT-008 — Redemption Fulfillment (Merchant)

**Description:** ให้ merchant ตรวจสอบและดำเนินการแลก reward ของ
customer ให้เสร็จสิ้นที่ร้าน ป้องกันการใช้ redemption reference ซ้ำ

**MoSCoW:** Should have — เป็นคู่กันกับ FT-007 จำเป็นเมื่อเปิดใช้ redemption
แต่ไม่ block MVP core loop

**Related FR/US:** ไม่มีใน BRD โดยตรง (New — แนะนำให้เพิ่มเข้า BRD เป็น
FR ในอนาคต) / US-024

---

### FT-009 — Merchant Shop Profile Management

**Description:** ให้ merchant จัดการโปรไฟล์และข้อมูลร้านค้า (ชื่อ, ที่อยู่,
ประเภท, เวลาเปิด-ปิด)

**MoSCoW:** Must have — merchant ต้อง onboard และมีข้อมูลร้านที่ถูกต้อง
ก่อนที่จะรับ transaction ใด ๆ ได้

**Related FR/US:** FR-007 / US-009

---

### FT-010 — Merchant Fee & Transaction Reconciliation

**Description:** ให้ merchant ดูการติดตาม marketing fee และบันทึก
transaction พร้อมกรองตามช่วงวันที่

**MoSCoW:** Must have — merchant ต้องเห็นต้นทุนที่เกิดขึ้นจริงเพื่อสร้าง
ความไว้ใจในโมเดล marketing fee

**Related FR/US:** FR-009, FR-010 / US-010

---

### FT-011 — Admin User & Merchant Account Management

**Description:** ให้ admin สร้าง/อัปเดต/ระงับบัญชี customer และ merchant

**MoSCoW:** Must have — เป็นเครื่องมือพื้นฐานที่ต้องมีเพื่อรักษาความน่า
เชื่อถือของแพลตฟอร์มตั้งแต่วันแรก

**Related FR/US:** FR-012, FR-013 / US-015

---

### FT-012 — SP Reward Rule Visibility (read-only)

**Description:** ให้ admin ดูกฎ SP Point reward ที่คงที่ (30 SP, 10/10/10)
เป็น read-only ใน MVP (การเปลี่ยนค่าทำได้เฉพาะผ่านการ deploy ใหม่)

**MoSCoW:** Must have — admin ต้องยืนยันได้ว่า ecosystem ใช้ค่าที่ถูกต้อง
อยู่ แม้จะยังแก้ไขผ่านแอปไม่ได้ใน MVP

**Related FR/US:** FR-014 / US-016

---

### FT-013 — System Monitoring Dashboard

**Description:** ให้ admin เฝ้าติดตามจำนวน transaction แยกตามสถานะ
เพื่อตรวจจับปัญหาก่อนกระทบผู้ใช้

**MoSCoW:** Should have — มีประโยชน์มากขึ้นเมื่อมี transaction volume จริง
ไม่ block การพิสูจน์ core loop ในรอบแรก

**Related FR/US:** FR-015 / US-017

---

### FT-014 — Admin Manual Transaction Cancellation

**Description:** ให้ admin ยกเลิก transaction ที่ค้างอยู่ใน
`PENDING_APPROVAL` ด้วยมือ เป็นมาตรการชั่วคราวก่อนมี SLA อัตโนมัติ
(FT-019)

**MoSCoW:** Should have — เป็น safety net ที่สำคัญ แต่ยังไม่ถึงระดับ
MVP-blocking เพราะเป็นกรณี exception ไม่ใช่ core flow

**Related FR/US:** ไม่มีใน BRD โดยตรง (New — แนะนำให้เพิ่มเข้า BRD เป็น
FR ในอนาคต) / US-025

---

### FT-015 — Immutable Transaction Audit Log

**Description:** สร้าง audit log entry ที่ไม่สามารถเปลี่ยนแปลงได้สำหรับ
ทุก SP distribution event และให้ admin ค้นหา/ตรวจสอบได้

**MoSCoW:** Must have — จำเป็นสำหรับการตรวจสอบยอดและสอบสวนกรณี
พิพาท เป็นเงื่อนไข compliance ที่ขาดไม่ได้ตั้งแต่วันแรก

**Related FR/US:** FR-020, FR-022 / US-018

---

### FT-016 — PDPA Consent Management

**Description:** ให้ user ต้องยอมรับเงื่อนไขการเก็บข้อมูลอย่างชัดแจ้งก่อน
สร้างบัญชี และปิดกั้นการใช้ feature ที่เก็บข้อมูลถ้ายังไม่ได้ consent

**MoSCoW:** Must have — เป็นข้อกำหนดทางกฎหมายภายใต้ PDPA ที่ต้องมี
ตั้งแต่วันแรก ไม่สามารถแก้ย้อนหลังได้

**Related FR/US:** ไม่มี FR เฉพาะใน BRD (อยู่ใน §7/§9 ระดับ NFR) / US-019

---

### FT-017 — Data Minimization & Secure Access Control

**Description:** Authentication/authorization ที่ปลอดภัยสำหรับทุก role
และเปิดเผยเฉพาะฟิลด์ข้อมูลที่จำเป็นต่อ feature นั้น ๆ เท่านั้น

**MoSCoW:** Must have — เป็นพื้นฐานความปลอดภัยที่ทุก feature อื่นต้อง
พึ่งพา

**Related FR/US:** ไม่มี FR เฉพาะใน BRD (อยู่ใน §7 NFR ด้าน Security) /
US-020

---

### FT-018 — Data Retention Policy

**Description:** นโยบายการเก็บรักษาและ archive/ลบข้อมูลส่วนบุคคลและ
audit log ตามที่ PDPA กำหนด

**MoSCoW:** Should have — สำคัญด้าน compliance ระยะยาว แต่ **ยัง
Blocked** เพราะรอคำตอบจาก BRD Open Question 4 (consent flow และ
retention period) ยังประมาณการ implementation ไม่ได้จนกว่าจะได้คำตอบ

**Related FR/US:** ไม่มี FR เฉพาะ (Open Question 4) / US-021

---

### FT-019 — Merchant Approval SLA / Auto-Cancel

**Description:** SLA/timeout อัตโนมัติสำหรับการอนุมัติของ merchant เพื่อ
ไม่ให้ transaction ค้างอยู่ใน `PENDING_APPROVAL` โดยไม่มีกำหนด

**MoSCoW:** Could have — มี FT-014 (manual cancel) เป็นมาตรการชั่วคราว
รองรับอยู่แล้ว ไม่ block MVP แต่ **ยัง Blocked** เพราะรอคำตอบจาก BRD
Open Question 6 (ระยะเวลา SLA)

**Related FR/US:** ไม่มี FR เฉพาะ (Open Question 6) / US-022

---

### FT-020 — Merchant Campaigns & Promotions

**Description:** ให้ merchant สร้างและจัดการแคมเปญ/โปรโมชันสำหรับ
ลูกค้า

**MoSCoW:** Could have — เพิ่มมูลค่าด้าน retention/marketing แต่ MVP
ต้อง validate reward ecosystem หลักก่อน (ดู "Backlog Priority Deviation
from BRD" ใน Product Backlog — deprioritize จาก BRD P1 เป็น Backlog P2)

**Related FR/US:** FR-008 / US-011

---

### FT-021 — Customer Behavior Insights

**Description:** ให้ merchant ดู insight/รายงานพฤติกรรมลูกค้าขั้นพื้นฐาน

**MoSCoW:** Won't have (this release) — ต้องการปริมาณ transaction ที่
เสร็จสมบูรณ์มากพอจึงจะมีประโยชน์ ยังเร็วเกินไปก่อนที่ core loop จะมีข้อมูล
การใช้งานจริง

**Related FR/US:** FR-011 / US-012

---

### FT-022 — Shop Discovery & Search

**Description:** ให้ customer สำรวจ/ค้นหาร้านค้าที่เข้าร่วมโครงการใกล้เคียง

**MoSCoW:** Could have — มีประโยชน์ด้านการค้นพบร้านค้า แต่ไม่ block
core loop ของ QR → approval → SP distribution (deprioritize จาก BRD P1
เป็น Backlog P2)

**Related FR/US:** FR-005 / US-013

---

### FT-023 — Active Promotions View

**Description:** ให้ customer ดูและเข้าถึงโปรโมชันที่กำลังดำเนินการอยู่

**MoSCoW:** Could have — ขึ้นอยู่กับว่า FT-020 (Merchant Campaigns) มีอยู่
ก่อน จึงจะมีโปรโมชันให้แสดง

**Related FR/US:** FR-006 / US-014

---

## 5. Notes (หมายเหตุ)

- Feature ที่มี Related FR เป็น "— (new)" หรือ "ไม่มีใน BRD โดยตรง" คือ
  capability ที่ Product Backlog Review ระบุว่าควรเพิ่มเข้า BRD ใน
  revision ถัดไป (FT-002, FT-008, FT-014) — สอดคล้องกับหมายเหตุเดิมใน
  `02-product-backlog.md`
- FT-018 และ FT-019 ยัง **Blocked** จาก BRD Open Question 4 และ 6
  ตามลำดับ — MoSCoW ระดับ Should/Could ที่ให้ไว้ในเอกสารนี้ยังไม่
  เปลี่ยนจนกว่าจะมีคำตอบจาก stakeholder ตาราง summary ควรถูก
  re-validate ทุกครั้งที่ BRD/Backlog มี revision ใหม่ (ดู "Keeping in
  Sync" ใน skill `feature-list-and-user-journey.md`)

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ business stakeholder และปรับปรุง
เมื่อ BRD หรือ Product Backlog มี revision ใหม่*
