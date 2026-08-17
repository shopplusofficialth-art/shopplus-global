# Test Spec

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Test Spec
**Phase:** 04-testing
**Version:** 1.0
**Status:** Draft — pending stakeholder review
**Date:** 2026-08-17
**Prepared by:** Test Spec Analyst Agent (ผ่าน Shopplus Orchestrator, AI Native Development Workflow)
**Source:** `01-requirements/03-feature-list.md` (v1.0, FT-005) + `02-design/04-user-journey.md` (v1.0, Merchant Journey §3)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | สร้าง Test Suite แรกสำหรับ FT-005 (Merchant Transaction Approval Workflow) เลือกเป็นขอบเขตแรกผ่าน Ambiguity Protocol ของ `Shopplus` เพราะเป็น decision point สำคัญที่สุดของ core loop และมีหน้าจอที่เหมาะทำ Prototype ต่อใน Day 2 |

---

## 1. Purpose (วัตถุประสงค์)

เอกสารนี้กำหนด test case สำหรับ Feature ที่ถูกเลือกเป็นขอบเขต โดยครอบคลุม
happy path, ทุก decision branch ใน User Journey diagram, negative/edge
case จาก Acceptance Criteria เดิม, และ Non-Functional Requirement ที่
เกี่ยวข้องโดยตรง ทุก test case มี traceability กลับไปยัง `FR-xxx`/
`US-xxx`/`FT-xxx`/Journey step เสมอ (ดูมาตรฐานเต็มใน
`.claude/skills/test-spec-standard.md`)

เอกสารนี้เป็นเอกสารสะสม — เมื่อเลือก Feature เพิ่มในอนาคต ให้เพิ่ม Test
Suite ใหม่ต่อท้าย ไม่สร้างไฟล์แยก

---

## 2. Test Suite: FT-005 — Merchant Transaction Approval Workflow

### 2.1 Scope (ขอบเขตและเหตุผลที่เลือก)

เลือก **FT-005** เป็น Test Suite แรก เพราะ:

- เป็น **decision point สำคัญที่สุด** ของ core value loop ทั้งหมด — เป็น
  เงื่อนไข gate ว่า SP Point (FT-006) จะถูกแบ่งสรรหรือไม่
- มี Acceptance Criteria ที่ชัดเจนและละเอียดที่สุดในกลุ่ม Must-have
  (US-004, US-005, FR-019, FR-021) ครอบคลุมทั้ง approve, reject, และ
  invalid status transition
- มีหน้าจอที่จับต้องได้ชัดเจน ("Merchant Pending Queue — Approve/
  Reject") ซึ่งจะใช้เป็นขอบเขตเดียวกันสำหรับ Prototype ใน Day 2 ตาม
  กฎ "Scope Selection" ของ skill `prototype-standard`

### 2.2 Traceability Summary (ตารางสรุปการอ้างอิง)

| Test Case ID | Test Type | Related FT | Related FR | Related US | Related Journey Step |
|---|---|---|---|---|---|
| TC-005-01 | Positive | FT-005 | FR-019 | US-004 | Merchant Journey §3 node F — เปิด Pending Queue |
| TC-005-02 | Positive | FT-005, FT-006 | FR-019, FR-016 | US-004, US-006 | Merchant Journey §3 node G→H — Approve |
| TC-005-03 | Positive | FT-005 | FR-019, FR-021 | US-004 | Merchant Journey §3 node G→I — Reject |
| TC-005-04 | Negative | FT-005 | FR-019, FR-021 | US-004 | Merchant Journey §3 node F (guard) |
| TC-005-05 | Negative | FT-005 | FR-021 | US-005 | Merchant Journey §3 node G (guard) |
| TC-005-06 | Edge (New) | FT-005 | — (New) | US-004 | Merchant Journey §3 node G |
| TC-005-07 | NFR — Security | FT-005, FT-006 | FR-018, FR-021 | US-004, US-007 | Merchant Journey §3 node G→H |
| TC-005-08 | NFR — Auditability | FT-005, FT-015 | FR-020, FR-022 | US-004, US-018 | Merchant Journey §3 node G→H/I |
| TC-005-09 | NFR — Performance | FT-005, FT-006 | FR-016 | US-006 | Merchant Journey §3 node G→H |

### 2.3 Test Case Detail (รายละเอียด Test Case)

---

**TC-005-01 — Merchant เปิด Pending Queue เห็นรายละเอียด transaction**

- **Preconditions:** มี transaction อย่างน้อย 1 รายการอยู่ในสถานะ `PENDING_APPROVAL` ของร้านนี้
- **Given** transaction อยู่ในสถานะ `PENDING_APPROVAL`
- **When** merchant เปิด pending queue ของตน
- **Then** รายละเอียด transaction (จำนวนเงิน, ข้อมูลอ้างอิงลูกค้า, timestamp) ปรากฏให้เห็นครบ
- **Priority:** Must have (ตาม MoSCoW ของ FT-005)

---

**TC-005-02 — Merchant อนุมัติ transaction สำเร็จ → SP ถูกแบ่งสรร**

- **Preconditions:** transaction อยู่ในสถานะ `PENDING_APPROVAL`
- **Given** merchant เปิดดูรายละเอียด transaction ที่ `PENDING_APPROVAL`
- **When** merchant กดอนุมัติ (approve)
- **Then** transaction เปลี่ยนเป็น `APPROVED`, ระบบแบ่งสรร 30 SP (10 Customer Reward / 10 Marketing Fund / 10 Platform) ที่ฝั่ง server แล้วเปลี่ยนเป็น `COMPLETED`
- **Priority:** Must have

---

**TC-005-03 — Merchant ปฏิเสธ transaction → ไม่มี SP ถูกแบ่งสรร**

- **Preconditions:** transaction อยู่ในสถานะ `PENDING_APPROVAL`
- **Given** merchant เปิดดูรายละเอียด transaction ที่ `PENDING_APPROVAL`
- **When** merchant กดปฏิเสธ (reject)
- **Then** transaction เปลี่ยนเป็น `REJECTED` ทันที ไม่มีการแบ่งสรร SP ใด ๆ
- **Priority:** Must have

---

**TC-005-04 — ปิดกั้นการอนุมัติ/ปฏิเสธ transaction ที่ไม่ได้อยู่ในสถานะ PENDING_APPROVAL**

- **Preconditions:** transaction อยู่ในสถานะ `APPROVED`, `COMPLETED`, `REJECTED`, หรือ `CANCELLED` ไปแล้ว
- **Given** transaction ไม่ได้อยู่ในสถานะ `PENDING_APPROVAL`
- **When** merchant พยายามอนุมัติหรือปฏิเสธ transaction นั้น
- **Then** ระบบปิดกั้นการกระทำนั้นทันที และสถานะ transaction ไม่เปลี่ยนแปลง
- **Priority:** Must have

---

**TC-005-05 — บังคับใช้เฉพาะ status transition ที่กำหนดไว้เท่านั้น**

- **Preconditions:** ระบบมี transaction ในสถานะต่าง ๆ ให้ทดสอบ transition ที่ไม่ถูกต้อง (เช่น `APPROVED` → `PENDING_APPROVAL`, `REJECTED` → `APPROVED`, `COMPLETED` → `CANCELLED`)
- **Given** transaction ใด ๆ อยู่ในสถานะหนึ่ง
- **When** มีการพยายามเปลี่ยนสถานะไปยังสถานะที่ไม่ได้อยู่ใน transition ที่กำหนดไว้ (`PENDING_APPROVAL`→`APPROVED`→`COMPLETED`, `PENDING_APPROVAL`→`REJECTED`, `PENDING_APPROVAL`→`CANCELLED`)
- **Then** ระบบปฏิเสธการเปลี่ยนสถานะนั้น และไม่มีการเปลี่ยนแปลงสถานะเกิดขึ้น
- **Priority:** Must have

---

**TC-005-06 — ป้องกันการอนุมัติซ้ำซ้อนจากการกดซ้ำ/แข่งกันของ 2 คำขอ (double-submit)** *(New — recommend adding to Acceptance Criteria)*

- **Preconditions:** transaction อยู่ในสถานะ `PENDING_APPROVAL`
- **Given** merchant กดอนุมัติ transaction เดียวกัน 2 ครั้งพร้อมกัน (เช่น กดปุ่มซ้ำ หรือเปิด 2 อุปกรณ์)
- **When** ทั้ง 2 คำขอมาถึง server เกือบพร้อมกัน
- **Then** มีการแบ่งสรร SP เพียงครั้งเดียวเท่านั้น (idempotent) และคำขอที่สองถูกปฏิเสธเพราะ transaction ไม่ได้อยู่ใน `PENDING_APPROVAL` แล้ว
- **หมายเหตุ:** กรณีนี้ไม่มีระบุไว้ตรง ๆ ใน BRD/Backlog แต่เป็นผลสืบเนื่องจากกฎ status transition (FR-021) — แนะนำให้เพิ่มเป็น Acceptance Criteria อย่างเป็นทางการใน BRD revision ถัดไป
- **Priority:** Should have

---

**TC-005-07 — การแบ่งสรร SP ต้องคำนวณที่ server เท่านั้น ไม่เชื่อค่าจาก client**

- **Preconditions:** transaction อยู่ในสถานะ `PENDING_APPROVAL`
- **Given** client ส่งคำขออนุมัติพร้อมค่า SP หรือสัดส่วนการแบ่งสรรที่ไม่ตรงกับกฎ (เช่น พยายามส่งค่า 100 SP หรือสัดส่วนอื่น)
- **When** server ประมวลผลคำขออนุมัติ
- **Then** server เพิกเฉยค่าที่มาจาก client ทั้งหมด และคำนวณแบ่งสรรใหม่จากกฎ 30 SP (10/10/10) ที่กำหนดตายตัวเสมอ
- **Priority:** Must have

---

**TC-005-08 — บันทึก audit log ที่ไม่สามารถเปลี่ยนแปลงได้ทุกครั้งที่อนุมัติ/ปฏิเสธ**

- **Preconditions:** transaction อยู่ในสถานะ `PENDING_APPROVAL`
- **Given** merchant อนุมัติหรือปฏิเสธ transaction
- **When** การเปลี่ยนสถานะเสร็จสมบูรณ์
- **Then** ระบบสร้าง audit log entry ที่ไม่สามารถเปลี่ยนแปลงได้ บันทึก transaction ID, merchant ID, customer ID, status transition, จำนวน SP ต่อ distribution target (ถ้ามี), และ timestamp
- **Priority:** Must have

---

**TC-005-09 — เวลาแบ่งสรร SP หลังอนุมัติต้องอยู่ในหลักไม่กี่วินาที**

- **Preconditions:** transaction อยู่ในสถานะ `PENDING_APPROVAL`
- **Given** merchant กดอนุมัติ transaction
- **When** เวลาเริ่มนับจากช่วงเวลาที่ merchant อนุมัติ (ไม่ใช่จากเวลาที่ลูกค้าสแกน QR ตาม Performance Requirement Note ของ Backlog EPIC-04)
- **Then** การแบ่งสรร SP และการเปลี่ยนสถานะเป็น `COMPLETED` เสร็จสิ้นภายในไม่กี่วินาที
- **Priority:** Should have

---

## 3. Notes (หมายเหตุ)

- TC-005-06 เป็น edge case ใหม่ที่ไม่มีระบุตรง ๆ ใน BRD/Backlog — ทำ
  เครื่องหมาย "New" ตาม convention เดียวกับ Feature List (เช่น FT-002,
  FT-008, FT-014)
- Test Suite นี้ยังไม่ครอบคลุมกรณี Admin Manual Cancellation (FT-014)
  ที่กระทบสถานะ `PENDING_APPROVAL` เดียวกัน — ควรพิจารณาเพิ่มเป็น Test
  Suite แยกถ้าเลือก FT-014 เป็นขอบเขตเพิ่มในอนาคต
- เมื่อเลือก Feature อื่นเพิ่มเติม ให้เพิ่ม Test Suite ใหม่ต่อท้ายเอกสารนี้
  ตามรูปแบบเดียวกัน (ดู skill `test-spec-standard`)

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ QA/business stakeholder และปรับปรุง
เมื่อ BRD, Product Backlog, Feature List, หรือ User Journey มี revision
ใหม่ที่กระทบ FT-005*
