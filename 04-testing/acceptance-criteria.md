# Acceptance Criteria

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Acceptance Criteria
**Phase:** 04-testing
**Version:** 1.1
**Status:** Draft — pending stakeholder review
**Date:** 2026-08-17
**Prepared by:** Acceptance Criteria Writer Agent (ผ่าน Shopplus Orchestrator, AI Native Development Workflow)
**Source:** `01-requirements/02-product-backlog.md` (v1.1, EPIC-03: US-004, US-005) + `01-requirements/03-feature-list.md` (v1.0, FT-005) + `03-development/01-prototype-log.md` (v1.2, PT-005-01)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | สร้างเอกสารแรก — migrate Acceptance Criteria ของ US-004/US-005 (EPIC-03, ผูกกับ FT-005) จาก `01-requirements/02-product-backlog.md` เข้าโครงสร้าง `acceptance-criteria.md` ตาม skill `acceptance-criteria-standard` (แทนที่การเก็บ AC แบบฝังในเนื้อ Backlog อย่างเดียว) พร้อมเพิ่ม AC-005-03 ที่เคย flag เป็น "New" ไว้ใน `04-testing/01-test-spec.md` เดิม (TC-005-06, ยืนยันด้วย Prototype PT-005-01) |
| 1.1 | Draft — pending stakeholder review | **Sync citation only** (housekeeping, ไม่มีการเปลี่ยน AC เนื้อหา) — แก้ Source citation ของ `03-development/01-prototype-log.md` จาก v1.1 เป็น v1.2 ให้ตรงกับเวอร์ชันจริงปัจจุบัน พบจากการรัน Consistency Check ทั่วโปรเจกต์ตามคำขอผู้ใช้ |

---

## 1. Purpose (วัตถุประสงค์)

เอกสารนี้รวม Acceptance Criteria แบบ **Given-When-Then ต่อแต่ละ Backlog
Item (US-xxx)** ให้เป็นจุดอ้างอิงเดียว — ดึงข้อมูลจาก Product Backlog
(แหล่งหลัก), Feature List (traceability), และ Prototype/spec ที่เกี่ยวข้อง
(แหล่งเสริม) ห้ามแต่ง AC ใหม่ที่ไม่มีที่มา (ดูมาตรฐานเต็มใน
`.claude/skills/acceptance-criteria-standard.md`)

Agent `test-case-writer` ต้องใช้เอกสารนี้เป็น**แหล่งเดียว**ในการเขียน Test
Case — ห้ามคิด scenario ขึ้นใหม่เองที่ไม่มี AC รองรับตรงนี้

เอกสารนี้เป็นเอกสารสะสม — เมื่อเลือก Backlog Item เพิ่มในอนาคต ให้เพิ่ม
section ใหม่ต่อท้าย ไม่สร้างไฟล์แยก

---

## 2. US-004 — Merchant อนุมัติ/ปฏิเสธ transaction ที่รอดำเนินการ

**Related FT:** FT-005 (Merchant Transaction Approval Workflow)
**Related FR:** FR-019

| AC ID | Given | When | Then | Source | หมายเหตุ |
|---|---|---|---|---|---|
| AC-004-01 | transaction อยู่ในสถานะ `PENDING_APPROVAL` | merchant เปิด pending queue ของตน | รายละเอียด transaction (จำนวนเงิน, ข้อมูลอ้างอิงลูกค้า, timestamp) จะปรากฏให้เห็น | Backlog US-004 | — |
| AC-004-02 | merchant อนุมัติ transaction ที่เป็น `PENDING_APPROVAL` | การอนุมัติถูกส่ง | transaction จะเปลี่ยนไปเป็น `APPROVED` และการแบ่งสรร SP (EPIC-04) จะถูก trigger | Backlog US-004 | — |
| AC-004-03 | merchant ปฏิเสธ transaction ที่เป็น `PENDING_APPROVAL` | การปฏิเสธถูกส่ง | transaction จะเปลี่ยนไปเป็น `REJECTED` และไม่มีการแบ่งสรร SP | Backlog US-004 | — |
| AC-004-04 | transaction ไม่ได้อยู่ในสถานะ `PENDING_APPROVAL` | merchant พยายามอนุมัติหรือปฏิเสธ | ระบบจะปิดกั้นการกระทำนั้น | Backlog US-004 | — |

---

## 3. US-005 — ระบบบังคับใช้เฉพาะ transition สถานะ transaction ที่ถูกต้อง

**Related FT:** FT-005 (Merchant Transaction Approval Workflow)
**Related FR:** FR-021

| AC ID | Given | When | Then | Source | หมายเหตุ |
|---|---|---|---|---|---|
| AC-005-01 | transaction ใด ๆ | มีการพยายามเปลี่ยนสถานะ | จะอนุญาตเฉพาะ transition ที่กำหนดไว้เท่านั้น: `PENDING_APPROVAL` → `APPROVED` → `COMPLETED`, `PENDING_APPROVAL` → `REJECTED`, หรือ `PENDING_APPROVAL` → `CANCELLED` | Backlog US-005 | — |
| AC-005-02 | มีการพยายาม transition ที่ไม่ถูกต้อง | ระบบประเมินผล | จะถูกปฏิเสธและไม่มีการเปลี่ยนสถานะเกิดขึ้น | Backlog US-005 | — |
| AC-005-03 | merchant กดอนุมัติ transaction เดียวกัน 2 ครั้งพร้อมกัน (เช่น กดปุ่มซ้ำ หรือเปิด 2 อุปกรณ์) | ทั้ง 2 คำขอมาถึง server เกือบพร้อมกัน | มีการแบ่งสรร SP เพียงครั้งเดียวเท่านั้น (idempotent) และคำขอที่สองถูกปฏิเสธเพราะ transaction ไม่ได้อยู่ใน `PENDING_APPROVAL` แล้ว | **New — confirmed via Prototype PT-005-01** | ไม่มีระบุตรง ๆ ใน Backlog แต่เป็นผลสืบเนื่องจากกฎ status transition (FR-021, AC-005-01) และ Prototype `merchant-pending-queue.html` จำลอง UI ปิดปุ่มหลังตัดสินใจ 1 ครั้งไว้แล้ว — แนะนำให้เพิ่มเป็น Acceptance Criteria อย่างเป็นทางการใน Backlog/BRD revision ถัดไป |

---

## 4. Notes (หมายเหตุ)

- Backlog Item อื่น ๆ (เช่น US-001, US-002, US-006 ...) มี Given/When/Then
  อยู่แล้วใน `01-requirements/02-product-backlog.md` เช่นกัน แต่ยังไม่ถูก
  ดึงเข้าเอกสารนี้ — ให้เรียก `acceptance-criteria-writer` เพิ่มเติมเมื่อ
  ต้องการเขียน Test Case ของ Feature อื่น (ตามกฎ "เลือกบางข้อมาส่ง")
- AC-005-03 ควรถูกนำเสนอต่อ stakeholder เพื่อเพิ่มเป็น Acceptance
  Criteria อย่างเป็นทางการใน BRD/Backlog — ตอนนี้ยังคงสถานะ "New" ไว้ก่อน

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ QA/business stakeholder และปรับปรุง
เมื่อ Product Backlog หรือ Feature List มี revision ใหม่ที่กระทบ US-004/
US-005*
