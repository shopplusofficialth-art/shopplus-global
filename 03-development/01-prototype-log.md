# Prototype Log

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Prototype Log (Index + Traceability)
**Phase:** 03-development
**Version:** 1.2
**Status:** Draft — pending stakeholder review
**Date:** 2026-08-17
**Prepared by:** Prototype Designer Agent (ผ่าน Shopplus Orchestrator, AI Native Development Workflow)
**Source:** `01-requirements/03-feature-list.md` (v1.0, FT-005) + `02-design/04-user-journey.md` (v1.0, Merchant Journey §3) + `04-testing/test-cases/ft-005-merchant-transaction-approval-workflow.md` (v1.3, FT-005 — ใช้ขอบเขตเดียวกัน) + `02-design/DESIGN.md` (v1.0, Design Token)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | สร้าง Prototype แรก (PT-005-01) สำหรับ FT-005 ใช้ขอบเขตเดียวกันกับ Test Spec (`04-testing/01-test-spec.md`) ตามกฎ Scope Selection ของ skill `prototype-standard` |
| 1.1 | Draft — pending stakeholder review | อัปเดตตาม skill `prototype-standard` เวอร์ชันใหม่ (Folder Versioning Protocol): ย้าย `merchant-pending-queue.html` จาก path เดิม (`prototypes/merchant-pending-queue.html`) เข้า `prototypes/v1/merchant-pending-queue.html` เพื่อเริ่มใช้โครงสร้าง version folder (v1, v2, ...) และเพิ่มคอลัมน์ Version Folder + Design Token อ้างอิงในตาราง Index — ยังไม่มีการเปลี่ยนเนื้อหาหน้าจอ |
| 1.2 | Draft — pending stakeholder review | **Sync citation only** (housekeeping, ไม่มีการเปลี่ยนเนื้อหา) — แก้ Source citation ของ `test-cases/ft-005-merchant-transaction-approval-workflow.md` จาก v1.1 เป็น v1.3 ให้ตรงกับเวอร์ชันจริงปัจจุบันของไฟล์นั้น (อัปเดตไปแล้วตอนแก้ mock data ให้ตรงกับ prototype นี้ + sync citation ของตัวเองอีกชั้น) พบจากการรัน Consistency Check ทั่วโปรเจกต์ตามคำขอผู้ใช้ |

---

## 1. Purpose (วัตถุประสงค์)

เอกสารนี้เป็น index + traceability ของ Prototype ทุกหน้าที่ถูกสร้างในโปรเจกต์
เพื่อให้ทราบว่าแต่ละหน้าจอ mockup ผูกกับ Feature/Requirement/Journey step
ใด, อยู่ใน version folder ไหน, ใช้ Design Token อะไรจาก
`02-design/DESIGN.md`, และไฟล์ mockup จริงอยู่ที่ไหน (ดูมาตรฐานเต็มใน
`.claude/skills/prototype-standard.md`)

Prototype ทุกหน้าเป็น **static mockup ระดับแนวคิด (concept-level)**
เท่านั้น — ใช้ mock data hardcode ในไฟล์ ไม่เชื่อมต่อ Firebase/Firestore/
Cloud Functions หรือ API จริงใด ๆ และไม่มีการคำนวณ business logic จริง
ตามหลัก "Client side ทำหน้าที่เฉพาะ UI/user interaction เท่านั้น" ใน
CLAUDE.md หมวด 6

Prototype ทุกไฟล์เก็บอยู่ภายใต้ `03-development/prototypes/v<N>/` ตาม
Folder Versioning Protocol ของ skill `prototype-standard` (Section D) —
เมื่อมีการสร้าง version ใหม่ ให้เพิ่มแถวใหม่ในตาราง Index ด้านล่างโดยคง
Prototype ID เดิมไว้ (ถ้าเป็นหน้าจอเดิมที่ถูกปรับ) แล้วอัปเดตคอลัมน์
Version Folder/File Path ให้ตรงกับ version ล่าสุดที่ใช้งานจริง

---

## 2. Prototype Index (ตาราง Traceability)

| Prototype ID | Page Name | Version Folder | Related FT | Related FR | Related US | Related Journey Step | File Path | Design Token อ้างอิง | Status | หมายเหตุ |
|---|---|---|---|---|---|---|---|---|---|---|
| PT-005-01 | Merchant Pending Queue — Approve/Reject | v1 | FT-005 | FR-019, FR-021 | US-004, US-005 | Merchant Journey §3 node F (เปิด Pending Queue), node G (อนุมัติหรือปฏิเสธ?) | [`prototypes/v1/merchant-pending-queue.html`](prototypes/v1/merchant-pending-queue.html) | ยังไม่ได้ใช้ token จาก `DESIGN.md` (สร้างก่อนมี Design System — ควรปรับปรุงใน version ถัดไปให้อ้างอิง token จริง) | Draft | Conceptual only — ไม่เชื่อมต่อ backend จริง, ใช้ scope เดียวกับ [`04-testing/test-cases/ft-005-merchant-transaction-approval-workflow.md`](../04-testing/test-cases/ft-005-merchant-transaction-approval-workflow.md) (FT-005); ย้ายเข้า `v1/` ในการปรับปรุงเอกสารนี้ v1.1 |

---

## 3. Prototype Detail

### PT-005-01 — Merchant Pending Queue — Approve/Reject

**แสดงอะไร:** หน้าจอ merchant เปิดดูรายการ transaction ที่รอการอนุมัติ
(`PENDING_APPROVAL`) 3 รายการ (mock data) แต่ละรายการแสดงรหัสลูกค้าแบบ
masked, จำนวนเงิน, เวลาที่สแกน QR, และปุ่ม "อนุมัติ" / "ปฏิเสธ"

**ตัดสินใจอะไรได้บ้างในหน้าจอนี้:**

- กด **อนุมัติ** → จำลองการเปลี่ยนสถานะเป็น `APPROVED`/`COMPLETED` และ
  แสดงข้อความว่าจะมีการแบ่งสรร 30 SP (10/10/10) — เป็นข้อความคงที่ตามกฎ
  ไม่ใช่การคำนวณจริง
- กด **ปฏิเสธ** → จำลองการเปลี่ยนสถานะเป็น `REJECTED` ไม่มี SP ถูกแบ่งสรร
- ปุ่มทั้งสองถูกปิดใช้งาน (กดซ้ำไม่ได้) หลังตัดสินใจแล้ว 1 ครั้งต่อรายการ
  เพื่อสื่อสารกฎ "ปิดกั้นการอนุมัติ/ปฏิเสธซ้ำ" (FR-021, TC-005-04/05/06
  ใน `04-testing/test-cases/ft-005-merchant-transaction-approval-workflow.md`)
  แม้จะเป็นแค่ UI mockup

**Mock data ที่ใช้:** TX-10231 / TX-10232 / TX-10233 (รหัสลูกค้า, จำนวนเงิน,
timestamp — เป็นข้อมูลสมมติทั้งหมด ไม่ใช่ข้อมูลจริง)

**Data Minimization:** แสดงเฉพาะรหัสอ้างอิงลูกค้า (`CUS-xxxx`) ไม่แสดงชื่อ
หรือข้อมูลติดต่อจริง สอดคล้องกับ FT-017 (Data Minimization & Secure
Access Control)

**ไม่ครอบคลุมในหน้าจอนี้ (out of scope ของ prototype นี้):** การแบ่งสรร
SP จริง, audit log entry จริง, การเชื่อมต่อ Firestore, และหน้าจอของ FT-006
(SP Distribution Engine) — เป็นความรับผิดชอบของ backend/Cloud Functions
ไม่ใช่ prototype ระดับ UI

---

## 4. Notes (หมายเหตุ)

- Prototype นี้เลือก Feature เดียวกับ Test Case (FT-005) ตามกฎ Scope
  Selection ของ skill `prototype-standard`
- **Folder Versioning:** ไฟล์ mockup ทั้งหมดอยู่ภายใต้
  `prototypes/v<N>/` (ปัจจุบัน `v1/`) ตาม Folder Versioning Protocol
  (skill `prototype-standard` Section D) — การเรียกใช้งานครั้งต่อไป
  (เช่น มี Requirement ใหม่ หรือขอปรับหน้าจอเดิม) ต้องถามผู้ใช้ทุกครั้งว่า
  จะสร้าง `v2/` ใหม่ หรือแก้ไข `v1/` เดิม ก่อนสร้าง/แก้ไขไฟล์ใด ๆ
- **Design System:** Prototype ใหม่ทุกอันตั้งแต่นี้ต้องอ้างอิง Design
  Token จาก `02-design/DESIGN.md` (สร้างไว้แล้ว — Earth Tone +
  Minimalist + Muji) และระบุ token ที่ใช้ไว้ในคอลัมน์ "Design Token
  อ้างอิง" ของตาราง Index — PT-005-01 ยังไม่ได้อัปเดตให้ใช้ token จริง
  (สร้างก่อนมี DESIGN.md) แนะนำให้ปรับใน version ถัดไป
- ไฟล์ mockup ทุกไฟล์ต้องมี HTML comment หัวไฟล์ระบุ traceability
  (Related FT/FR/US/Journey Step) ตามที่กำหนดใน skill

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ UX/business stakeholder และปรับปรุง
เมื่อ Feature List, User Journey, หรือ Test Case มี revision ใหม่ที่กระทบ
FT-005*
