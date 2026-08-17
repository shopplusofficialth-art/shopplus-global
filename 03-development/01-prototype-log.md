# Prototype Log

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Prototype Log (Index + Traceability)
**Phase:** 03-development
**Version:** 1.0
**Status:** Draft — pending stakeholder review
**Date:** 2026-08-17
**Prepared by:** Prototype Designer Agent (ผ่าน Shopplus Orchestrator, AI Native Development Workflow)
**Source:** `01-requirements/03-feature-list.md` (v1.0, FT-005) + `02-design/04-user-journey.md` (v1.0, Merchant Journey §3) + `04-testing/01-test-spec.md` (v1.0, FT-005 — ใช้ขอบเขตเดียวกัน)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | สร้าง Prototype แรก (PT-005-01) สำหรับ FT-005 ใช้ขอบเขตเดียวกันกับ Test Spec (`04-testing/01-test-spec.md`) ตามกฎ Scope Selection ของ skill `prototype-standard` |

---

## 1. Purpose (วัตถุประสงค์)

เอกสารนี้เป็น index + traceability ของ Prototype ทุกหน้าที่ถูกสร้างในโปรเจกต์
เพื่อให้ทราบว่าแต่ละหน้าจอ mockup ผูกกับ Feature/Requirement/Journey step
ใด และไฟล์ mockup จริงอยู่ที่ไหน (ดูมาตรฐานเต็มใน
`.claude/skills/prototype-standard.md`)

Prototype ทุกหน้าเป็น **static mockup ระดับแนวคิด (concept-level)**
เท่านั้น — ใช้ mock data hardcode ในไฟล์ ไม่เชื่อมต่อ Firebase/Firestore/
Cloud Functions หรือ API จริงใด ๆ และไม่มีการคำนวณ business logic จริง
ตามหลัก "Client side ทำหน้าที่เฉพาะ UI/user interaction เท่านั้น" ใน
CLAUDE.md หมวด 6

---

## 2. Prototype Index (ตาราง Traceability)

| Prototype ID | Page Name | Related FT | Related FR | Related US | Related Journey Step | File Path | Status | หมายเหตุ |
|---|---|---|---|---|---|---|---|---|
| PT-005-01 | Merchant Pending Queue — Approve/Reject | FT-005 | FR-019, FR-021 | US-004, US-005 | Merchant Journey §3 node F (เปิด Pending Queue), node G (อนุมัติหรือปฏิเสธ?) | [`prototypes/merchant-pending-queue.html`](prototypes/merchant-pending-queue.html) | Draft | Conceptual only — ไม่เชื่อมต่อ backend จริง, ใช้ scope เดียวกับ `04-testing/01-test-spec.md` (FT-005) |

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
  เพื่อสื่อสารกฎ "ปิดกั้นการอนุมัติ/ปฏิเสธซ้ำ" (FR-021, TC-005-04/05 ใน
  Test Spec) แม้จะเป็นแค่ UI mockup

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

- Prototype นี้เลือก Feature เดียวกับ Test Spec (FT-005) ตามกฎ Scope
  Selection ของ skill `prototype-standard` — ถ้าเลือก Feature เพิ่มเติมใน
  อนาคต ให้เพิ่มแถวใน Prototype Index และไฟล์ mockup ใหม่ในโฟลเดอร์
  `prototypes/` ตามรูปแบบเดียวกัน
- ไฟล์ mockup ทุกไฟล์ต้องมี HTML comment หัวไฟล์ระบุ traceability
  (Related FT/FR/US/Journey Step) ตามที่กำหนดใน skill

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ UX/business stakeholder และปรับปรุง
เมื่อ Feature List, User Journey, หรือ Test Spec มี revision ใหม่ที่กระทบ
FT-005*
