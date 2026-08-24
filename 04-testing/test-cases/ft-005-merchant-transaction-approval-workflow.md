# Test Cases — FT-005: Merchant Transaction Approval Workflow

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Test Cases
**Phase:** 04-testing
**Feature:** FT-005 — Merchant Transaction Approval Workflow
**Version:** 1.4
**Status:** Draft — pending stakeholder review
**Date:** 2026-08-24
**Prepared by:** Test Case Writer Agent (ผ่าน Shopplus Orchestrator, AI Native Development Workflow)
**Source:** `04-testing/acceptance-criteria.md` (v1.1, AC-004-xx / AC-005-xx) + `01-requirements/02-product-backlog.md` (v1.1, US-004, US-005) + `02-design/04-user-journey.md` (v1.0, Merchant Journey §3) + `04-testing/test-plan.md` (v1.1, §Test Types สำหรับ NFR case) + `03-development/01-prototype-log.md` (v1.2, PT-005-01)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | สร้าง Test Suite แรกสำหรับ FT-005 ในเอกสารเดิม `04-testing/01-test-spec.md` (TC-005-01..09) |
| 1.1 | Draft — pending stakeholder review | Migrate เข้าโครงสร้างใหม่ตาม skill `test-case-standard`: ย้ายจาก `04-testing/01-test-spec.md` มาเป็น `04-testing/test-cases/ft-005-merchant-transaction-approval-workflow.md`, แปลง Given/When/Then narrative เป็น step-by-step (Test Step ลำดับขั้น), เพิ่มคอลัมน์ **Test Data** และ **Reference** (อ้าง AC-xxx จาก `acceptance-criteria.md`) ต่อรายการ — เนื้อหาการทดสอบไม่เปลี่ยนแปลงจากเดิม เอกสารเดิม `01-test-spec.md` ถูก retire |
| 1.2 | Draft — pending stakeholder review | **แก้ drift ที่พบจาก Prototype Consistency Checklist** (skill `traceability-consistency-check`, จุดที่ 6 — Test Case): Test Data ของ TC-005-01/02/03 (จำนวนเงิน, รหัสลูกค้า, timestamp ของ `TX-10231`/`TX-10232`/`TX-10233`) ไม่ตรงกับ mock data จริงใน prototype `03-development/prototypes/v1/merchant-pending-queue.html` (PT-005-01) — แก้ให้ตรงกับ prototype ทุกค่า (฿180.00/`CUS-8823`, ฿65.00/`CUS-4410`, ฿320.00/`CUS-1027`) เพื่อให้ QA ที่ใช้ prototype คู่กับ test case เห็นข้อมูลตรงกัน |
| 1.3 | Draft — pending stakeholder review | **Sync citation only** (housekeeping, ไม่มีการเปลี่ยน test case เนื้อหา) — แก้ Source citation ของ `acceptance-criteria.md` (v1.0→v1.1) และ `01-prototype-log.md` (v1.1→v1.2) ให้ตรงกับเวอร์ชันจริงปัจจุบัน พบจากการรัน Consistency Check ทั่วโปรเจกต์ตามคำขอผู้ใช้ |
| 1.4 | Draft — pending stakeholder review | **Sync จาก BRD v1.2 (NFR Deep-Dive Review)**: อัปเดต TC-005-09 Expected Result ให้อ้างเกณฑ์ที่เป็นรูปธรรม (≤ 5 วินาที, p95) แทนข้อความ "หลักไม่กี่วินาที" เดิม ตาม BRD §7 Performance NFR ที่ปรับปรุงใหม่ |

---

## 1. Scope (ขอบเขตและเหตุผลที่เลือก)

เลือก **FT-005** เพราะ:

- เป็น **decision point สำคัญที่สุด** ของ core value loop ทั้งหมด — เป็น
  เงื่อนไข gate ว่า SP Point (FT-006) จะถูกแบ่งสรรหรือไม่
- มี Acceptance Criteria ครบใน `04-testing/acceptance-criteria.md`
  (AC-004-01..04, AC-005-01..03) ครอบคลุมทั้ง approve, reject, invalid
  status transition, และ double-submit guard
- มีหน้าจอที่จับต้องได้ชัดเจน ("Merchant Pending Queue — Approve/
  Reject", PT-005-01) ซึ่งใช้เป็นขอบเขตเดียวกันกับ Prototype

---

## 2. Traceability Summary (ตารางสรุปการอ้างอิง)

| Test Case ID | Test Type | Related AC | Related FR | Related US | Related Journey Step |
|---|---|---|---|---|---|
| TC-005-01 | Positive | AC-004-01 | FR-019 | US-004 | Merchant Journey §3 node F — เปิด Pending Queue |
| TC-005-02 | Positive | AC-004-02 | FR-019, FR-016 | US-004, US-006 | Merchant Journey §3 node G→H — Approve |
| TC-005-03 | Positive | AC-004-03 | FR-019, FR-021 | US-004 | Merchant Journey §3 node G→I — Reject |
| TC-005-04 | Negative | AC-004-04 | FR-019, FR-021 | US-004 | Merchant Journey §3 node F (guard) |
| TC-005-05 | Negative | AC-005-01, AC-005-02 | FR-021 | US-005 | Merchant Journey §3 node G (guard) |
| TC-005-06 | Edge | AC-005-03 | — (New, ดู `acceptance-criteria.md`) | US-004 | Merchant Journey §3 node G |
| TC-005-07 | NFR — Security | AC-004-02 (derived) | FR-018, FR-021 | US-004, US-007 | Merchant Journey §3 node G→H |
| TC-005-08 | NFR — Auditability | AC-004-02, AC-004-03 (derived) | FR-020, FR-022 | US-004, US-018 | Merchant Journey §3 node G→H/I |
| TC-005-09 | NFR — Performance | AC-004-02 (derived) | FR-016 | US-006 | Merchant Journey §3 node G→H |

---

## 3. Test Case Detail (รายละเอียด Test Case)

---

### TC-005-01 — Merchant เปิด Pending Queue เห็นรายละเอียด transaction

- **Pre-condition:** มี transaction อย่างน้อย 1 รายการอยู่ในสถานะ `PENDING_APPROVAL` ของร้านนี้
- **Test Step:**
  1. Login เข้าแอป Merchant ด้วยบัญชี merchant ที่มี transaction รอดำเนินการ
  2. เปิดหน้า "Pending Queue"
- **Expected Result:** รายการ transaction ที่สถานะ `PENDING_APPROVAL` ปรากฏครบ พร้อมจำนวนเงิน, ข้อมูลอ้างอิงลูกค้าแบบ masked, และ timestamp
- **Test Data:** `TX-10231` (฿180.00, `CUS-8823`, สแกนเมื่อ 17 ส.ค. 2569 14:32 น.), `TX-10232` (฿65.00, `CUS-4410`, สแกนเมื่อ 17 ส.ค. 2569 14:41 น.), `TX-10233` (฿320.00, `CUS-1027`, สแกนเมื่อ 17 ส.ค. 2569 14:55 น.) — ค่าเดียวกับ mock data ใน prototype `03-development/prototypes/v1/merchant-pending-queue.html` (PT-005-01)
- **Priority:** Must have (ตาม MoSCoW ของ FT-005)
- **Reference:** AC-004-01 · FR-019 · US-004 · Merchant Journey §3 node F

---

### TC-005-02 — Merchant อนุมัติ transaction สำเร็จ → SP ถูกแบ่งสรร

- **Pre-condition:** transaction `TX-10231` อยู่ในสถานะ `PENDING_APPROVAL`
- **Test Step:**
  1. เปิดรายละเอียด transaction `TX-10231` จาก Pending Queue
  2. กดปุ่ม "อนุมัติ" (Approve)
  3. ยืนยันการอนุมัติ (ถ้ามี confirmation dialog)
- **Expected Result:** transaction เปลี่ยนเป็น `APPROVED` ทันที ระบบแบ่งสรร 30 SP (10 Customer Reward / 10 Marketing Fund / 10 Platform) ที่ฝั่ง server แล้วเปลี่ยนเป็น `COMPLETED`
- **Test Data:** `TX-10231` (฿180.00, `CUS-8823` — ตรงกับ prototype PT-005-01) → marketing fee 30 SP (เท่ากับ 3 บาท ตามกฎ 10 SP = 1 บาท, เป็นค่าคงที่ต่อ transaction ที่อนุมัติแล้วตามกฎ CLAUDE.md §4 ไม่ผันตามจำนวนเงิน)
- **Priority:** Must have
- **Reference:** AC-004-02 · FR-019, FR-016 · US-004, US-006 · Merchant Journey §3 node G→H

---

### TC-005-03 — Merchant ปฏิเสธ transaction → ไม่มี SP ถูกแบ่งสรร

- **Pre-condition:** transaction `TX-10232` อยู่ในสถานะ `PENDING_APPROVAL`
- **Test Step:**
  1. เปิดรายละเอียด transaction `TX-10232` จาก Pending Queue
  2. กดปุ่ม "ปฏิเสธ" (Reject)
  3. ยืนยันการปฏิเสธ (ถ้ามี confirmation dialog)
- **Expected Result:** transaction เปลี่ยนเป็น `REJECTED` ทันที ไม่มีการแบ่งสรร SP ใด ๆ
- **Test Data:** `TX-10232` (฿65.00, `CUS-4410` — ตรงกับ prototype PT-005-01)
- **Priority:** Must have
- **Reference:** AC-004-03 · FR-019, FR-021 · US-004 · Merchant Journey §3 node G→I

---

### TC-005-04 — ปิดกั้นการอนุมัติ/ปฏิเสธ transaction ที่ไม่ได้อยู่ในสถานะ PENDING_APPROVAL

- **Pre-condition:** transaction `TX-10231` อยู่ในสถานะ `COMPLETED` (จากผลของ TC-005-02)
- **Test Step:**
  1. เปิดรายละเอียด transaction `TX-10231` (ถ้า UI ยังเข้าถึงได้ผ่าน history)
  2. พยายามกดปุ่ม "อนุมัติ" หรือ "ปฏิเสธ" ซ้ำ (ผ่าน UI หรือเรียก endpoint ตรง)
- **Expected Result:** ระบบปิดกั้นการกระทำนั้นทันที และสถานะ transaction ไม่เปลี่ยนแปลงจาก `COMPLETED`
- **Test Data:** `TX-10231` (สถานะ `COMPLETED`), ทดสอบซ้ำกับ `TX-10233` (สถานะ `REJECTED`) และ `TX-10234` (สถานะ `CANCELLED`)
- **Priority:** Must have
- **Reference:** AC-004-04 · FR-019, FR-021 · US-004 · Merchant Journey §3 node F (guard)

---

### TC-005-05 — บังคับใช้เฉพาะ status transition ที่กำหนดไว้เท่านั้น

- **Pre-condition:** ระบบมี transaction ในสถานะต่าง ๆ ให้ทดสอบ transition ที่ไม่ถูกต้อง
- **Test Step:**
  1. เตรียม transaction ทดสอบในสถานะ `APPROVED`
  2. พยายามเปลี่ยนสถานะกลับเป็น `PENDING_APPROVAL` (ผ่าน API ตรง ไม่ผ่าน UI ปกติ)
  3. เตรียม transaction ทดสอบในสถานะ `REJECTED` แล้วพยายามเปลี่ยนเป็น `APPROVED`
  4. เตรียม transaction ทดสอบในสถานะ `COMPLETED` แล้วพยายามเปลี่ยนเป็น `CANCELLED`
- **Expected Result:** ทุกความพยายามใน step 2–4 ถูกปฏิเสธ และไม่มีการเปลี่ยนแปลงสถานะเกิดขึ้นจริง
- **Test Data:** `TX-10235` (`APPROVED`→`PENDING_APPROVAL`), `TX-10236` (`REJECTED`→`APPROVED`), `TX-10237` (`COMPLETED`→`CANCELLED`)
- **Priority:** Must have
- **Reference:** AC-005-01, AC-005-02 · FR-021 · US-005 · Merchant Journey §3 node G (guard)

---

### TC-005-06 — ป้องกันการอนุมัติซ้ำซ้อนจากการกดซ้ำ/แข่งกันของ 2 คำขอ (double-submit)

- **Pre-condition:** transaction `TX-10238` อยู่ในสถานะ `PENDING_APPROVAL`
- **Test Step:**
  1. ส่งคำขออนุมัติ transaction `TX-10238` จาก client A
  2. ส่งคำขออนุมัติ transaction `TX-10238` เดียวกันจาก client B พร้อมกัน (ภายในหลัก ms)
- **Expected Result:** มีการแบ่งสรร SP เพียงครั้งเดียวเท่านั้น (idempotent) และคำขอที่สองถูกปฏิเสธเพราะ transaction ไม่ได้อยู่ใน `PENDING_APPROVAL` แล้ว
- **Test Data:** `TX-10238`, จำนวนเงิน 200 บาท, ส่งคำขอจาก 2 session พร้อมกัน
- **Priority:** Should have
- **Reference:** AC-005-03 (New — confirmed via Prototype PT-005-01) · FR-021 · US-004

---

### TC-005-07 — การแบ่งสรร SP ต้องคำนวณที่ server เท่านั้น ไม่เชื่อค่าจาก client

- **Pre-condition:** transaction `TX-10239` อยู่ในสถานะ `PENDING_APPROVAL`
- **Test Step:**
  1. ส่งคำขออนุมัติ transaction `TX-10239` พร้อมแนบค่า SP/สัดส่วนการแบ่งสรรที่ไม่ตรงกับกฎ (เช่น 100 SP หรือสัดส่วน 50/30/20) ผ่าน request body
  2. สังเกตผลการคำนวณจริงที่ server บันทึก
- **Expected Result:** server เพิกเฉยค่าที่มาจาก client ทั้งหมด และคำนวณแบ่งสรรใหม่จากกฎ 30 SP (10/10/10) ที่กำหนดตายตัวเสมอ
- **Test Data:** `TX-10239` (payload แนบ `sp_override: 100`)
- **Priority:** Must have
- **Reference:** AC-004-02 (derived — NFR Security) · FR-018, FR-021 · US-004, US-007

---

### TC-005-08 — บันทึก audit log ที่ไม่สามารถเปลี่ยนแปลงได้ทุกครั้งที่อนุมัติ/ปฏิเสธ

- **Pre-condition:** transaction `TX-10240` อยู่ในสถานะ `PENDING_APPROVAL`
- **Test Step:**
  1. Merchant อนุมัติ transaction `TX-10240`
  2. ตรวจสอบ audit log collection ที่เกี่ยวข้อง
- **Expected Result:** มี audit log entry ใหม่ที่ไม่สามารถเปลี่ยนแปลงได้ บันทึก transaction ID, merchant ID, customer ID, status transition, จำนวน SP ต่อ distribution target, และ timestamp ครบ
- **Test Data:** `TX-10240`, merchant ID `MER-0091`, customer ID `CUS-3312`
- **Priority:** Must have
- **Reference:** AC-004-02, AC-004-03 (derived — NFR Auditability) · FR-020, FR-022 · US-004, US-018

---

### TC-005-09 — เวลาแบ่งสรร SP หลังอนุมัติต้องอยู่ในหลักไม่กี่วินาที

- **Pre-condition:** transaction `TX-10241` อยู่ในสถานะ `PENDING_APPROVAL`
- **Test Step:**
  1. บันทึกเวลาเริ่มต้นทันทีที่ merchant กดอนุมัติ transaction `TX-10241`
  2. บันทึกเวลาที่สถานะเปลี่ยนเป็น `COMPLETED` และ SP balance ของลูกค้าอัปเดตจริง
- **Expected Result:** ระยะเวลาจาก step 1 ถึง step 2 อยู่ภายใน ≤ 5 วินาที (p95) ตาม BRD §7 Performance NFR (v1.2) — นับจากเวลาที่ merchant อนุมัติ ไม่ใช่นับจากเวลาที่ลูกค้าสแกน QR ตาม Performance Requirement Note ของ Backlog EPIC-04
- **Test Data:** `TX-10241`, จำนวนเงิน 300 บาท
- **Priority:** Should have
- **Reference:** AC-004-02 (derived — NFR Performance) · FR-016 · US-006

---

## 4. Notes (หมายเหตุ)

- TC-005-06 อ้าง AC-005-03 ซึ่งยังมีสถานะ "New" ใน
  `04-testing/acceptance-criteria.md` — ควรผ่านการยืนยันจาก stakeholder
  ก่อนถือเป็น requirement ทางการ
- TC-005-07/08/09 เป็น NFR-derived test case (ไม่มี AC ตรง ๆ รองรับ
  เพราะ NFR ไม่ได้เขียนเป็น Given/When/Then ต่อ Backlog Item) — อ้างอิง
  `04-testing/test-plan.md` §Test Types แทนสำหรับที่มาของประเภทการทดสอบ
  เหล่านี้
- Test Suite นี้ยังไม่ครอบคลุมกรณี Admin Manual Cancellation (FT-014) ที่
  กระทบสถานะ `PENDING_APPROVAL` เดียวกัน — ควรพิจารณาเพิ่มเป็นไฟล์
  `test-cases/ft-014-admin-manual-transaction-cancellation.md` แยกถ้า
  เลือก FT-014 เป็นขอบเขตเพิ่มในอนาคต (ต้องมี AC ของ US-025 ใน
  `acceptance-criteria.md` ก่อนเสมอ)

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ QA/business stakeholder และปรับปรุง
เมื่อ Acceptance Criteria, Product Backlog, หรือ User Journey มี revision
ใหม่ที่กระทบ FT-005*
