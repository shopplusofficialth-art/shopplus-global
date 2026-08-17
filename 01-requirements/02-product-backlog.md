# MVP Product Backlog

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Product Backlog
**Phase:** 01-requirements
**Version:** 1.1
**Status:** Revised after Product Backlog Review
**Date:** 2026-08-04
**Prepared by:** Product Owner Agent (AI Native Development Workflow)
**Source:** `01-requirements/01-business-requirement.md` (v1.1, Revised Draft after Requirement Review)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | Backlog เริ่มต้นของ MVP ที่มาจาก BRD v1.1 |
| 1.1 | Revised after Product Backlog Review | เพิ่ม user story ที่ขาดไป: QR Code Generation (US-023), Redemption Fulfillment (US-024), และมาตรการความปลอดภัย manual-cancel ของ Admin (US-025) แยก Sprint 2/3 เป็น transaction foundation กับ reward distribution เพิ่มหมายเหตุ "Backlog Priority Deviation from BRD" การอธิบาย NFR ด้าน Performance ข้อสมมติฐานเรื่อง Sprint capacity และจำกัดขอบเขต US-016 ให้เป็น view-only สำหรับ MVP |

---

## 1. Purpose (วัตถุประสงค์)

Backlog นี้แปลง Business Requirement Document ที่ได้รับการอนุมัติแล้ว (BRD
v1.1) ให้อยู่ในรูปแบบ Agile product backlog ที่กำหนดขอบเขตเฉพาะ **MVP
เท่านั้น** โดยให้ความสำคัญกับ core value loop — transaction QR ของลูกค้า,
การอนุมัติของ merchant, การแบ่งสรร SP Point, รูปแบบ Marketing Fee, การ
กำกับดูแลของ admin, และการปฏิบัติตาม PDPA — มากกว่า feature รอง (แคมเปญ,
behavior insight, การค้นหาร้านค้า) ที่เพิ่มมูลค่าแต่ไม่จำเป็นต่อการพิสูจน์
reward ecosystem หลัก

แต่ละ backlog item จะเชื่อมโยงกลับไปยัง BRD Functional Requirement
(FR-xxx) หรือ Open Question ที่เกี่ยวข้อง เพื่อให้ gap และ blocker ยังคง
มองเห็นได้ ไม่ถูกแก้ไปโดยไม่รู้ตัว

---

## 2. Backlog Conventions (แนวทางการเขียน Backlog)

| Field | Meaning |
|---|---|
| **Priority** | P0 = MVP-blocking (core loop หรือ compliance), P1 = จำเป็นก่อน launch, P2 = มีมูลค่าแต่เลื่อนได้, P3 = backlog หลัง MVP |
| **Sprint Recommendation** | Sprint ที่แนะนำ โดยสมมติ sprint ละ ~2 สัปดาห์ และ MVP ใช้ 4 sprint การจัดลำดับสะท้อน dependency (auth → transaction creation → approval → distribution → audit/reporting) |
| **Story ID** | `US-0xx` ถูกอ้างอิงใน sprint plan และเชื่อมโยงย้อนกลับได้กับ BRD `FR-0xx` |

### Definition of Ready (เกณฑ์ที่ถือว่า story พร้อมทำ)
Story จะพร้อมได้เมื่อ acceptance criteria ไม่มีความกำกวม, ระบุ BRD source
FR ได้ชัดเจน และ Open Question ที่เป็น blocker ได้ถูกแก้ไขแล้วหรือถูกระบุ
ไว้ชัดเจนว่าเป็นความเสี่ยงของ sprint นั้น

### Definition of Done (เกณฑ์ที่ถือว่า story เสร็จ)
Server-side logic ถูก implement ตาม BRD §6 (client เป็น UI-only เท่านั้น),
unit/integration test ผ่าน, audit logging ได้รับการตรวจสอบในส่วนที่
เกี่ยวข้อง (EPIC-08), และการตรวจสอบการจัดการข้อมูลตาม PDPA ผ่าน (EPIC-09)

### Sprint Planning Assumptions (ข้อสมมติฐานในการวางแผน Sprint)
คำแนะนำเรื่อง sprint ใน backlog นี้สมมติว่า: **sprint ละ 2 สัปดาห์**,
**ทีม Agile ขนาดเล็ก** (ครอบคลุมงาน full-stack ในระดับหนึ่ง client surface
กับ Cloud Functions ต่อ sprint ไม่ใช่สาม surface พร้อมกัน) และแผนนี้เป็น
**ลำดับเริ่มต้น ไม่ใช่ข้อผูกมัด** — ต้อง re-validate กับ velocity จริงหลัง
Sprint 1 และปรับสำหรับ Sprint 2 เป็นต้นไป

---

## 3. Epics Overview (ภาพรวม Epic)

| Epic ID | Epic Name | Goal | BRD Reference |
|---|---|---|---|
| EPIC-01 | Customer Registration & Authentication | ให้ลูกค้าสร้างบัญชีและเข้าสู่ระบบได้ | §5 Customer, FR-001 |
| EPIC-02 | Customer QR Transaction Flow | ให้ merchant สร้าง QR code ที่ใช้งานได้ และให้ลูกค้าสร้าง transaction โดยการสแกน จากนั้นติดตามสถานะ | §6.1, §6.5, FR-002, FR-003; การสร้าง QR เป็น capability ใหม่ที่ระบุใน Product Backlog Review — แนะนำให้เพิ่มเข้า BRD ใน revision ถัดไป |
| EPIC-03 | Merchant Approval Workflow | ให้ merchant ตรวจสอบ อนุมัติ หรือปฏิเสธ transaction ที่รอดำเนินการ | §6.2, §6.5, FR-019, FR-021 |
| EPIC-04 | SP Point Distribution & Marketing Fee Model | แบ่งสรร 30 SP (10/10/10) ที่ฝั่ง server เท่านั้น หลังจากได้รับการอนุมัติแล้ว | §6.4, FR-016, FR-017, FR-018 |
| EPIC-05 | Reward Redemption | ให้ลูกค้าแลก SP Point เป็น reward และให้ merchant ตรวจสอบ/ดำเนินการแลกให้เสร็จสิ้น | §6.1, FR-004; fulfillment เป็น capability ใหม่ที่ระบุใน Product Backlog Review — แนะนำให้เพิ่มเข้า BRD ใน revision ถัดไป |
| EPIC-06 | Merchant Shop & Transaction Management | ให้ merchant จัดการโปรไฟล์ของตนและตรวจสอบยอด fee/transaction | §6.2, FR-007, FR-009, FR-010 |
| EPIC-07 | Admin Management & Oversight | ให้ admin จัดการบัญชี ดูกฎ reward เฝ้าติดตามสุขภาพระบบ และยกเลิก transaction ที่ค้างอยู่ด้วยมือ | §6.3, FR-012–FR-015; manual-cancel เป็น capability ใหม่ที่ระบุใน Product Backlog Review — แนะนำให้เพิ่มเข้า BRD ใน revision ถัดไป |
| EPIC-08 | Transaction Audit & Traceability | Audit log ที่ไม่สามารถเปลี่ยนแปลงได้สำหรับทุก SP distribution event | §6.6, FR-020, FR-022 |
| EPIC-09 | PDPA Compliance & Data Security | Consent, การเก็บข้อมูลแบบ minimum, การเข้าถึงที่ปลอดภัย, การเก็บรักษาข้อมูล | §7, §9 (CLAUDE.md), Open Question 4 |

Epic รองที่ถูกเลื่อนไว้ (แคมเปญ, behavior insight, การค้นหาร้านค้า/
โปรโมชัน — FR-005, FR-006, FR-008, FR-011) แสดงอยู่ท้าย §4.6 เป็น
backlog P2/P3 ไม่ใช่ส่วนของ core MVP loop

---

## Backlog Priority Deviation from BRD (ความเบี่ยงเบนของ priority ใน backlog เทียบกับ BRD)

Backlog นี้จงใจปรับลด priority ของ BRD requirement 3 รายการต่อไปนี้ ให้
ต่ำกว่า priority ที่ BRD กำหนดไว้ เพื่อวัตถุประสงค์ในการจำกัดขอบเขต MVP
เรื่องนี้ถูกระบุไว้อย่างชัดแจ้งในที่นี้ ไม่ปล่อยให้เป็นความคลาดเคลื่อนที่ซ่อนอยู่
และควรได้รับการยืนยันกับ stakeholder ก่อน sign-off Sprint 1:

| BRD FR | BRD Priority | Backlog Priority | Reason |
|---|---|---|---|
| FR-005 (การค้นหา/สำรวจร้านค้า) | P1 | P2, เลื่อนไป Post-MVP backlog | ไม่จำเป็นต่อการพิสูจน์ core loop ของ QR → approval → SP distribution การค้นหาจะเพิ่มมูลค่าด้านการหาลูกค้าเมื่อ merchant/customer เข้ามาอยู่ในแพลตฟอร์มแล้ว |
| FR-008 (แคมเปญของ merchant) | P1 | P2, เลื่อนไป Post-MVP backlog | เครื่องมือแคมเปญเป็น feature ด้าน retention/marketing ที่ต่อยอดจาก reward ecosystem ที่ใช้งานได้แล้ว MVP ต้อง validate ecosystem เองก่อน |
| FR-011 (insight พฤติกรรมลูกค้า) | P2 | P3, เลื่อนไป Post-MVP backlog | Insight ต้องการปริมาณ transaction ที่เสร็จสมบูรณ์มากพอจึงจะมีประโยชน์ ยังเร็วเกินไปก่อนที่ core loop จะมีข้อมูลการใช้งานจริง |

**Rationale (เหตุผล):** ขอบเขตของ MVP ถูกจำกัดให้เล็กที่สุดโดยตั้งใจ เพื่อ
พิสูจน์ว่า reward ecosystem ทำงานได้ตลอด end-to-end (การสร้าง
transaction, การอนุมัติของ merchant, การแบ่งสรร SP, audit, การกำกับดูแล
ของ admin, การปฏิบัติตาม PDPA) Feature ที่เพิ่มมูลค่าด้านการหาลูกค้าหรือ
analytics บน ecosystem ที่ใช้งานได้แล้ว จะถูกจัดลำดับไว้หลังจากนั้น ไม่ใช่
แทนที่ ถ้า stakeholder ต้องการ FR-005/008/011 ตัวใดตัวหนึ่งใน launch
เริ่มต้น (เช่น เพื่อหา merchant นำร่อง) ควรแจ้งตอนนี้เพื่อให้ sprint plan
สามารถปรับขอบเขตใหม่ได้

---

## 4. Product Backlog Items (รายการใน Product Backlog)

### 4.1 EPIC-01: Customer Registration & Authentication

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-001 | การลงทะเบียนและเข้าสู่ระบบของ customer | P0 | Sprint 1 |

**US-001 (FR-001)** — ในฐานะ **customer** ฉันต้องการลงทะเบียนและเข้าสู่
ระบบได้อย่างง่ายดาย เพื่อที่ฉันจะสามารถเริ่มใช้ ShopPlus Global ได้โดยมี
friction น้อยที่สุด

- **Given** ผู้ใช้ใหม่เปิดแอป, **when** พวกเขากรอกข้อมูลการลงทะเบียนครบ
  ตามฟิลด์ที่จำเป็นและให้ความยินยอมตาม PDPA แล้ว, **then** บัญชีจะถูก
  สร้างขึ้นและพวกเขาจะถูก log in
- **Given** ผู้ใช้ที่มีบัญชีอยู่แล้ว, **when** กรอก credential ที่ถูกต้อง,
  **then** พวกเขาจะได้รับการยืนยันตัวตนและถูกนำไปยัง dashboard
- **Given** ผู้ใช้กรอก credential ไม่ถูกต้อง, **when** พยายาม login,
  **then** การเข้าถึงจะถูกปฏิเสธด้วย error ทั่วไปที่ไม่เปิดเผยว่าฟิลด์ใดผิด

---

### 4.2 EPIC-02: Customer QR Transaction Flow

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-023 | Merchant สร้างและจัดการ QR code ของ transaction | P0 | Sprint 2 |
| US-002 | สแกน QR เพื่อสร้าง transaction ที่รอดำเนินการ | P0 | Sprint 2 |
| US-003 | ดู SP balance และประวัติสถานะ transaction | P0 | Sprint 4 |

**US-023 (New — แนะนำให้เพิ่มเข้า BRD เป็น FR ในอนาคต)** — ในฐานะ
**merchant** ฉันต้องการสร้างและจัดการ QR code ของ transaction เพื่อที่
ลูกค้าจะมีโค้ดที่ถูกต้องและปลอดภัยให้สแกน และเพื่อให้ระบบสามารถแยกแยะ
การสแกนที่ถูกต้องออกจากการสแกนที่ทุจริตหรือใช้ซ้ำได้อย่างน่าเชื่อถือ

- **Given** merchant เริ่ม transaction ใหม่, **when** พวกเขาขอ QR code,
  **then** ระบบจะสร้าง QR code ที่เก็บ transaction identifier ที่ไม่ซ้ำกัน
  และผูกกับ merchant นั้น
- **Given** QR code ถูกสร้างขึ้นแล้ว, **when** มีการออกใช้งาน, **then**
  QR code นั้นใช้ได้ครั้งเดียว (single-use) และมีเวลาจำกัด (จะหมดอายุถ้า
  ไม่มีการสแกนภายในเวลาที่กำหนด) ตามความเสี่ยงเรื่อง fraud ที่ระบุใน
  BRD §8 Risks
- **Given** QR code ถูกสแกนสำเร็จไปแล้วครั้งหนึ่ง, **when** มีการพยายาม
  สแกนซ้ำครั้งที่สองด้วยโค้ดเดียวกัน, **then** ระบบจะปฏิเสธและไม่สร้าง
  transaction ที่สอง
- **Given** QR code หมดอายุแล้ว, **when** ลูกค้าพยายามสแกน, **then**
  ระบบจะปฏิเสธการสแกนพร้อมข้อความที่ชัดเจนว่า "หมดอายุ กรุณาขอโค้ดใหม่"
- **Given** merchant ต้องการดูโค้ดที่เปิดอยู่ของตนเอง, **when** พวกเขาเปิด
  QR management, **then** พวกเขาสามารถดูและยกเลิก QR code ที่ยังไม่ถูก
  สแกนด้วยมือได้

**US-002 (FR-002)** — ในฐานะ **customer** ฉันต้องการสแกน QR code ของ
merchant ที่จุดชำระเงิน เพื่อที่ transaction จะถูกสร้างขึ้นและฉันจะสามารถ
สะสม SP Point ได้เมื่อได้รับการอนุมัติ

- **Given** ลูกค้าสแกน QR code ที่ถูกต้องของ merchant, **when** การสแกน
  ได้รับการประมวลผล, **then** transaction จะถูกสร้างขึ้นด้วยสถานะ
  `PENDING_APPROVAL` และยังไม่มีการแบ่งสรร SP
- **Given** ลูกค้าสแกน QR code ที่ไม่ถูกต้อง หมดอายุ หรือถูกใช้ไปแล้ว,
  **when** การสแกนได้รับการประมวลผล, **then** ระบบจะปฏิเสธและแสดง
  error ที่ชัดเจน
- **Given** การสแกนสำเร็จ, **when** transaction ถูกสร้างขึ้น, **then**
  ลูกค้าจะเห็นการยืนยันว่ากำลังรอการอนุมัติจาก merchant

**US-003 (FR-003)** — ในฐานะ **customer** ฉันต้องการดู SP Point balance
และประวัติ transaction รวมสถานะ เพื่อที่ฉันจะสามารถติดตามสิ่งที่ได้สะสมและ
สิ่งที่ยังรอดำเนินการอยู่

- **Given** ลูกค้ามี transaction อย่างน้อยหนึ่งรายการ, **when** พวกเขาเปิด
  ประวัติ, **then** แต่ละรายการจะแสดงสถานะปัจจุบัน (Pending Approval,
  Approved, Completed, Rejected, Cancelled)
- **Given** transaction ถึงสถานะ `COMPLETED`, **when** ลูกค้าดู balance
  ของตน, **then** 10 SP customer reward ที่ได้รับจะถูกสะท้อนภายในไม่กี่
  วินาที

---

### 4.3 EPIC-03: Merchant Approval Workflow

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-004 | Merchant อนุมัติ/ปฏิเสธ transaction ที่รอดำเนินการ | P0 | Sprint 2 |
| US-005 | ระบบบังคับใช้เฉพาะ transition สถานะ transaction ที่ถูกต้อง | P0 | Sprint 2 |

**US-004 (FR-019)** — ในฐานะ **merchant** ฉันต้องการตรวจสอบและอนุมัติ
หรือปฏิเสธ transaction ที่รอดำเนินการ เพื่อที่ฉันจะควบคุมได้ว่าเมื่อไหร่
marketing fee จะถูกหักและ reward จะถูกออกให้

- **Given** transaction อยู่ในสถานะ `PENDING_APPROVAL`, **when** merchant
  เปิด pending queue ของตน, **then** รายละเอียด transaction (จำนวนเงิน,
  ข้อมูลอ้างอิงลูกค้า, timestamp) จะปรากฏให้เห็น
- **Given** merchant อนุมัติ transaction ที่เป็น `PENDING_APPROVAL`,
  **when** การอนุมัติถูกส่ง, **then** transaction จะเปลี่ยนไปเป็น
  `APPROVED` และการแบ่งสรร SP (EPIC-04) จะถูก trigger
- **Given** merchant ปฏิเสธ transaction ที่เป็น `PENDING_APPROVAL`,
  **when** การปฏิเสธถูกส่ง, **then** transaction จะเปลี่ยนไปเป็น
  `REJECTED` และไม่มีการแบ่งสรร SP
- **Given** transaction ไม่ได้อยู่ในสถานะ `PENDING_APPROVAL`, **when**
  merchant พยายามอนุมัติหรือปฏิเสธ, **then** ระบบจะปิดกั้นการกระทำนั้น

**US-005 (FR-021)** — ในฐานะ **platform** ฉันต้องการให้ทุก transaction
เคลื่อนผ่าน status lifecycle ที่กำหนดไว้ เพื่อที่ SP จะไม่ถูกแบ่งสรรออกจาก
transaction ที่ได้รับการอนุมัติแล้ว

- **Given** transaction ใด ๆ, **when** มีการพยายามเปลี่ยนสถานะ, **then**
  จะอนุญาตเฉพาะ transition ที่กำหนดไว้เท่านั้น: `PENDING_APPROVAL` →
  `APPROVED` → `COMPLETED`, `PENDING_APPROVAL` → `REJECTED`, หรือ
  `PENDING_APPROVAL` → `CANCELLED`
- **Given** มีการพยายาม transition ที่ไม่ถูกต้อง, **when** ระบบประเมินผล,
  **then** จะถูกปฏิเสธและไม่มีการเปลี่ยนสถานะเกิดขึ้น

---

### 4.4 EPIC-04: SP Point Distribution & Marketing Fee Model

> **Performance Requirement Note (หมายเหตุด้าน Performance):** BRD §7
> ระบุว่าการให้ reward ควรเสร็จภายใน "ไม่กี่วินาที" หลังการสแกน QR ภายใต้
> approval-gated model ของ v1.1 ข้อนี้ไม่ถูกนำมาใช้ ณ เวลาสแกนอีกต่อไป —
> SP จะไม่ถูกแบ่งสรรจนกว่า merchant จะอนุมัติ transaction ซึ่งอาจเกิดขึ้นใน
> อีกไม่กี่นาทีหรือหลายชั่วโมงต่อมา **เป้าหมายด้าน performance "ไม่กี่
> วินาที" จะเริ่มนับจากช่วงเวลาที่ merchant อนุมัติ ไม่ใช่จากช่วงเวลาที่สแกน
> QR** เรื่องนี้ควรถูกสะท้อนใน BRD NFR ใน revision ถัดไป จนกว่าจะถึงเวลา
> นั้น ให้ถือหมายเหตุนี้เป็นคำอธิบายที่ใช้อ้างอิงสำหรับ implementation และ
> การทดสอบ

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-006 | แบ่งสรร 30 SP (10/10/10) เมื่อได้รับการอนุมัติ | P0 | Sprint 3 |
| US-007 | การคำนวณที่ฝั่ง server เท่านั้น และเกิดขึ้นหลังจากได้รับการอนุมัติ | P0 | Sprint 3 |

**US-006 (FR-016)** — ในฐานะ **platform** ฉันต้องการแบ่งสรร 30 SP ต่อ
transaction ที่ได้รับการอนุมัติ โดยแบ่งเป็น 10 SP Customer Reward /
10 SP Marketing Fund / 10 SP ShopPlus Global Platform เพื่อที่ reward
ecosystem จะมีเงินทุนอย่างสม่ำเสมอ

- **Given** transaction เปลี่ยนไปเป็น `APPROVED`, **when** การแบ่งสรร
  ดำเนินการ, **then** 10 SP จะถูกให้กับลูกค้า, 10 SP ให้กับ Marketing
  Fund, และ 10 SP ให้กับ Platform อย่างครบถ้วน
- **Given** การแบ่งสรรสำเร็จ, **when** การจัดสรรทั้งสามรายการถูกบันทึก
  ครบ, **then** transaction จะเปลี่ยนไปเป็น `COMPLETED`
- **Given** การแบ่งสรรล้มเหลวกลางทาง, **when** ระบบตรวจพบความล้มเหลว,
  **then** transaction จะไม่เปลี่ยนไปเป็น `COMPLETED` และความล้มเหลวจะ
  ถูกแจ้งให้ admin ติดตามต่อไป

**US-007 (FR-017, FR-018)** — ในฐานะ **platform** ฉันต้องการให้การแบ่งสรร
SP และการคำนวณ fee ทั้งหมดทำงานที่ฝั่ง server และเกิดขึ้นหลังจาก merchant
อนุมัติเท่านั้น เพื่อไม่ให้ client ใด ๆ ปลอมแปลงหรือข้าม reward/fee logic ได้

- **Given** คำขอจาก client ใด ๆ, **when** มีการส่งค่า SP หรือ fee ที่มา
  จาก client, **then** server จะไม่สนใจค่านั้นและคำนวณใหม่จากกฎ 30 SP
  (10/10/10) ที่กำหนดไว้แน่นอน
- **Given** transaction ยังไม่ `APPROVED`, **when** client พยายาม trigger
  การแบ่งสรร, **then** server จะปฏิเสธคำขอนั้น

---

### 4.5 EPIC-05: Reward Redemption

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-008 | เลือกดูและแลก reward ด้วย SP Point | P1 | Sprint 4 |
| US-024 | Merchant ตรวจสอบและดำเนินการแลก reward ให้เสร็จสิ้น | P1 | Sprint 4 |

**US-008 (FR-004)** — ในฐานะ **customer** ฉันต้องการเลือกดูและแลก reward
ที่มีอยู่ด้วย SP Point ของฉัน เพื่อที่ฉันจะได้รับมูลค่าที่จับต้องได้จาก
balance ของฉัน

- **Given** ลูกค้ามี SP balance เพียงพอ, **when** พวกเขาแลก reward,
  **then** ค่าใช้จ่าย SP จะถูกหักและการแลกจะถูกสร้างขึ้นด้วยสถานะรอ
  fulfillment (ดู US-024)
- **Given** ลูกค้ามี SP balance ไม่เพียงพอ, **when** พวกเขาพยายามแลก,
  **then** ระบบจะป้องกันการแลกและแสดงข้อความที่ชัดเจน

**US-024 (New — แนะนำให้เพิ่มเข้า BRD เป็น FR ในอนาคต)** — ในฐานะ
**merchant** ฉันต้องการตรวจสอบและดำเนินการแลก reward ของลูกค้าให้เสร็จ
สิ้นที่ร้าน เพื่อให้ reward ถูกใช้จริงเพียงครั้งเดียวเท่านั้น และแพลตฟอร์มมี
บันทึกว่ามันเกิดขึ้นจริง

- **Given** ลูกค้าแลก reward แล้วและได้รับ redemption reference (เช่น
  โค้ดที่แสดงในแอป), **when** ลูกค้านำมาแสดงที่ร้าน, **then** merchant
  สามารถตรวจสอบ reference นั้นกับระบบได้
- **Given** redemption reference ได้รับการตรวจสอบจาก merchant แล้ว,
  **when** merchant ทำเครื่องหมายว่า fulfilled, **then** ระบบจะบันทึกการ
  fulfillment นั้น และ redemption นั้นจะไม่สามารถตรวจสอบหรือ fulfilled
  ได้เป็นครั้งที่สอง
- **Given** redemption reference ถูก fulfilled ไปแล้วหรือไม่มีอยู่จริง,
  **when** merchant พยายามตรวจสอบอีกครั้ง, **then** ระบบจะปฏิเสธและแสดง
  error ที่ชัดเจน
- **Given** เกิด redemption fulfillment event ใด ๆ, **when** ถูกประมวลผล,
  **then** จะมีการสร้าง audit log entry ที่บันทึก redemption ID, customer
  ID, merchant ID, reward, และ timestamp สอดคล้องกับแนวทาง audit ใน
  EPIC-08

---

### 4.6 EPIC-06: Merchant Shop & Transaction Management

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-009 | จัดการโปรไฟล์ร้านค้า | P0 | Sprint 1 |
| US-010 | ดูการติดตาม marketing fee และบันทึก transaction | P0 | Sprint 4 |

**US-009 (FR-007)** — ในฐานะ **merchant** ฉันต้องการจัดการโปรไฟล์และ
ข้อมูลร้านค้าของฉัน เพื่อที่ลูกค้าจะสามารถค้นหาข้อมูลร้านค้าของฉันได้อย่าง
ถูกต้อง

- **Given** merchant ได้รับการ onboard แล้ว, **when** พวกเขาแก้ไขฟิลด์
  โปรไฟล์ (ชื่อ, ที่อยู่, ประเภท, เวลาเปิด-ปิด), **then** การเปลี่ยนแปลงจะ
  ถูกบันทึกและแสดงให้ลูกค้าเห็น

**US-010 (FR-009, FR-010)** — ในฐานะ **merchant** ฉันต้องการดูการติดตาม
marketing fee และบันทึก transaction เพื่อที่ฉันจะเข้าใจต้นทุนและสามารถ
ตรวจสอบยอดขายได้

- **Given** มี transaction ที่ approved/completed อยู่, **when** merchant
  เปิดบันทึก transaction, **then** แต่ละรายการจะแสดงจำนวนเงิน สถานะ
  และ marketing fee 10 SP ที่ถูกหัก
- **Given** merchant กรองตามช่วงวันที่, **when** นำไปใช้, **then** ยอด
  fee รวมของช่วงนั้นจะแสดงอย่างถูกต้อง

**รายการรองที่ถูกเลื่อนไว้ (Post-MVP backlog — ดู "Backlog Priority
Deviation from BRD" ด้านบนสำหรับ FR-005/FR-008/FR-011):**

| Story ID | User Story (summary) | Priority | Sprint | Notes |
|---|---|---|---|---|
| US-011 | Merchant สร้างแคมเปญ/โปรโมชัน (FR-008) | P2 | Post-MVP backlog | เพิ่มมูลค่าด้านการหาลูกค้า แต่ไม่จำเป็นต่อการพิสูจน์ reward loop |
| US-012 | Merchant ดู insight พฤติกรรมลูกค้า (FR-011) | P3 | Post-MVP backlog | ต้องการปริมาณข้อมูล baseline ก่อน |
| US-013 | Customer สำรวจ/ค้นหาร้านค้าใกล้เคียง (FR-005) | P2 | Post-MVP backlog | มีประโยชน์ด้านการค้นพบ แต่ไม่ block core loop |
| US-014 | Customer ดูโปรโมชันที่กำลังดำเนินการอยู่ (FR-006) | P2 | Post-MVP backlog | ขึ้นอยู่กับว่า US-011 มีอยู่ก่อน |

---

### 4.7 EPIC-07: Admin Management & Oversight

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-015 | จัดการบัญชี customer และ merchant | P0 | Sprint 1 |
| US-016 | ดูกฎ SP Point reward ที่คงที่ (read-only ใน MVP) | P0 | Sprint 4 |
| US-017 | เฝ้าติดตามการใช้งาน สุขภาพระบบ และกิจกรรม transaction | P1 | Sprint 4 |
| US-025 | Admin ยกเลิก transaction ที่ค้างอยู่ใน `PENDING_APPROVAL` ด้วยมือ | P1 | Sprint 2 |

**US-015 (FR-012, FR-013)** — ในฐานะ **admin** ฉันต้องการจัดการบัญชี
customer และ merchant (สร้าง/อัปเดต/ระงับ/onboard) เพื่อที่ฉันจะสามารถ
รักษาความน่าเชื่อถือของแพลตฟอร์มไว้ได้

- **Given** admin ระงับ merchant, **when** การระงับถูกใช้งาน, **then**
  merchant นั้นจะไม่สามารถอนุมัติ QR transaction ได้อีก
- **Given** admin ระงับ customer, **when** การระงับถูกใช้งาน, **then**
  customer นั้นจะไม่สามารถสร้าง transaction ใหม่ผ่านการสแกน QR ได้อีก

**US-016 (FR-014) — ขอบเขต MVP ที่ชัดเจนขึ้น:** ในฐานะ **admin** ฉัน
ต้องการ **ดู** กฎ SP Point reward ที่คงที่ (30 SP, แบ่ง 10/10/10) เพื่อที่ฉัน
จะยืนยันการตั้งค่าที่ใช้งานอยู่ของ ecosystem ได้

> **Scope note (หมายเหตุเรื่องขอบเขต):** ใน MVP สัดส่วน 10/10/10 และ
> จำนวน 30 SP เป็นค่าคงที่ ไม่สามารถแก้ไขได้ที่ runtime โดย admin FR-014
> ("configure and manage") จะได้รับการตอบสนองในระดับ MVP โดยการทำให้
> กฎที่คงที่นั้นแสดงผลได้และมีการควบคุมการเปลี่ยนแปลงเฉพาะผ่านการ
> deploy ใหม่เท่านั้น — ไม่ใช่ผ่าน in-app editor **การกำหนดค่ากฎแบบ
> runtime (ให้ admin เปลี่ยนสัดส่วนหรือจำนวนได้โดยไม่ต้อง deploy) อยู่
> นอกขอบเขตของ MVP และถูกเลื่อนไป Post-MVP backlog** จนกว่าจะมีการ
> ตัดสินใจเรื่อง guardrail ที่ editor แบบนี้ต้องมี (เช่น สัดส่วนขั้นต่ำ/สูงสุด,
> ขั้นตอนอนุมัติสำหรับการเปลี่ยนกฎ)

- **Given** กฎ 30 SP (10/10/10) ที่คงที่, **when** admin เปิดหน้ากฎ
  reward, **then** ค่าที่ใช้งานอยู่ปัจจุบันจะแสดงเป็น read-only
- **Given** ค่าของกฎจะเปลี่ยนได้เฉพาะผ่านการ deploy ใหม่, **when** การ
  deploy เปลี่ยนค่าเหล่านั้น, **then** การเปลี่ยนแปลงจะถูกบันทึกใน
  deployment/release record (ไม่ใช่การแก้ไขโดย admin ในแอป)

**US-017 (FR-015)** — ในฐานะ **admin** ฉันต้องการเฝ้าติดตามการใช้งาน
ระบบ สุขภาพระบบ และกิจกรรม transaction เพื่อที่ฉันจะสามารถตรวจพบและ
แก้ไขปัญหาก่อนที่จะส่งผลกระทบต่อผู้ใช้

- **Given** transaction กำลังไหลผ่านระบบ, **when** admin เปิด monitoring
  dashboard, **then** จำนวน transaction ในสถานะ `PENDING_APPROVAL` /
  `APPROVED` / `COMPLETED` / `REJECTED` / `CANCELLED` จะแสดงให้เห็น

**US-025 (New — Admin Safety Control, แนะนำให้เพิ่มเข้า BRD เป็น FR ใน
อนาคต)** — ในฐานะ **admin** ฉันต้องการยกเลิก transaction ที่ค้างอยู่ใน
`PENDING_APPROVAL` ด้วยมือ เพื่อให้แพลตฟอร์มมีวิธีปลดบล็อก transaction
ได้ แม้ก่อนที่จะมีการกำหนด SLA/timeout การอนุมัติแบบอัตโนมัติ (US-022)

- **Given** transaction อยู่ในสถานะ `PENDING_APPROVAL`, **when** admin
  เลือก transaction นั้นและเลือกยกเลิก, **then** จะเปลี่ยนไปเป็น
  `CANCELLED` และไม่มีการแบ่งสรร SP สอดคล้องกับกฎ lifecycle ใน US-005
- **Given** transaction ไม่ได้อยู่ในสถานะ `PENDING_APPROVAL` (เช่น เป็น
  `APPROVED`, `COMPLETED`, `REJECTED`, หรือ `CANCELLED` ไปแล้ว),
  **when** admin พยายามยกเลิก, **then** ระบบจะปิดกั้นการกระทำนั้น
- **Given** admin ยกเลิก transaction, **when** การยกเลิกถูกประมวลผล,
  **then** audit log entry จะบันทึก transaction ID, admin ที่ดำเนินการ,
  สถานะก่อนหน้า, และ timestamp สอดคล้องกับแนวทาง audit ใน EPIC-08
- **Note (หมายเหตุ):** นี่เป็นมาตรการควบคุมด้วยมือแบบชั่วคราว เมื่อ
  US-022 (approval SLA/timeout) ได้รับการแก้ไขและสร้างเสร็จแล้ว การ
  ยกเลิกอัตโนมัติควรจัดการกรณีทั่วไป โดยการควบคุมด้วยมือนี้ยังคงอยู่
  สำหรับกรณีข้อยกเว้น

---

### 4.8 EPIC-08: Transaction Audit & Traceability

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-018 | Audit log ที่ไม่สามารถเปลี่ยนแปลงได้สำหรับทุก SP distribution | P0 | Sprint 3 |

**US-018 (FR-020, FR-022)** — ในฐานะ **admin** ฉันต้องการดู audit log ที่
ไม่สามารถเปลี่ยนแปลงได้สำหรับทุก SP distribution เพื่อที่ฉันจะสามารถ
ตรวจสอบความถูกต้องและสอบสวนกรณีพิพาทได้

- **Given** transaction ได้รับการอนุมัติและแบ่งสรรแล้ว, **when** การแบ่งสรร
  เกิดขึ้น, **then** audit log entry จะบันทึก transaction ID, merchant ID,
  customer ID, status transition, จำนวน SP ต่อ distribution target, และ
  timestamp
- **Given** admin ค้นหาโดย transaction ID, **when** พวกเขาเปิด audit log,
  **then** ประวัติการแบ่งสรรและสถานะทั้งหมดของ transaction นั้นจะแสดง
  ให้เห็น
- **Given** มี audit log entry อยู่, **when** ผู้ใช้ใดพยายามแก้ไขหรือลบ,
  **then** ระบบจะป้องกันการเปลี่ยนแปลงนั้น

---

### 4.9 EPIC-09: PDPA Compliance & Data Security

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-019 | ความยินยอมที่ชัดแจ้งก่อนการเก็บข้อมูล | P0 | Sprint 1 |
| US-020 | Auth/authorization ที่ปลอดภัยและการเก็บข้อมูลแบบ minimum | P0 | Sprint 1 |
| US-021 | นโยบายการเก็บรักษาข้อมูลที่ชัดเจน | P1 | Post-MVP backlog (blocked) |

**US-019** — ในฐานะ **customer/merchant** ฉันต้องการให้ความยินยอมที่
ชัดแจ้งก่อนที่ข้อมูลส่วนบุคคลของฉันจะถูกเก็บ เพื่อที่สิทธิด้านข้อมูลของฉัน
ภายใต้ PDPA จะได้รับการเคารพ

- **Given** ผู้ใช้ใหม่ลงทะเบียน, **when** พวกเขาไปถึงขั้นตอน consent,
  **then** พวกเขาต้องยอมรับเงื่อนไขการเก็บข้อมูลอย่างชัดแจ้งก่อนที่บัญชี
  จะถูกสร้างขึ้น
- **Given** ผู้ใช้ยังไม่ได้ให้ความยินยอม, **when** พวกเขาพยายามใช้ feature
  ที่เก็บข้อมูล, **then** การเข้าถึงจะถูกปิดกั้น

**US-020** — ในฐานะ **platform** ฉันต้องการ authentication/authorization
ที่ปลอดภัยสำหรับทุก role และการเก็บข้อมูลแบบ minimum โดย default เพื่อที่
ข้อมูลส่วนบุคคลและข้อมูลที่ sensitive จะได้รับการปกป้อง

- **Given** คำขอ API ใด ๆ, **when** ไม่ได้ authenticated/authorized สำหรับ
  role ที่ขอ, **then** คำขอนั้นจะถูกปฏิเสธ
- **Given** ข้อมูลส่วนบุคคลถูกจัดเก็บอยู่, **when** feature ใดเข้าถึงข้อมูล
  นั้น, **then** จะเปิดเผยเฉพาะฟิลด์ที่จำเป็นสำหรับ feature นั้นเท่านั้น

**US-021 (Open Question 4)** — ในฐานะ **admin** ฉันต้องการนโยบายการเก็บ
รักษาข้อมูล (retention policy) ที่ชัดเจนสำหรับข้อมูลส่วนบุคคลและ audit log
เพื่อที่แพลตฟอร์มจะปฏิบัติตามข้อกำหนดด้าน retention ของ PDPA

- **Given** retention policy ถูกกำหนดโดย stakeholder ฝ่ายกฎหมาย/
  compliance แล้ว, **when** ข้อมูลถึงขีดจำกัดการเก็บรักษา, **then** ข้อมูล
  จะถูก archive หรือลบตามนโยบาย
- **Blocked (ติดบล็อก):** ต้องรอการแก้ไข BRD Open Question 4 (consent
  flow และระยะเวลาการเก็บรักษาข้อมูลตาม PDPA) ก่อนที่จะสามารถประมาณ
  การ implementation ได้อย่างมั่นใจ

---

## 5. Cross-Cutting Backlog Item: Approval SLA (รายการ backlog ข้ามหมวด: Approval SLA)

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-022 | ยกเลิก transaction ที่ค้างอยู่ใน Pending Approval โดยอัตโนมัติ | P2 | Post-MVP backlog (blocked) |

**US-022 (Open Question 6)** — ในฐานะ **platform** ฉันต้องการ SLA/timeout
สำหรับการอนุมัติของ merchant ที่ชัดเจน เพื่อไม่ให้ transaction ค้างอยู่ใน
สถานะ `PENDING_APPROVAL` โดยไม่มีกำหนด

- **Given** transaction ยังอยู่ใน `PENDING_APPROVAL` เกินกว่า SLA ที่
  กำหนดไว้, **when** timeout หมดเวลา, **then** จะเปลี่ยนไปเป็น
  `CANCELLED` โดยอัตโนมัติ
- **Blocked (ติดบล็อก):** ต้องรอการตัดสินใจจาก stakeholder เรื่องระยะเวลา
  SLA (BRD Open Question 6) ก่อนที่จะ implement
- **Interim mitigation (มาตรการชั่วคราว):** US-025 (Admin manual cancel,
  Sprint 2) เป็นทางออกให้ปลดบล็อก transaction ที่ค้างด้วยมือ จนกว่า SLA
  อัตโนมัตินี้จะถูกกำหนดและสร้างขึ้น

---

## 6. Sprint Recommendation Summary (สรุปคำแนะนำ Sprint)

ตาม Sprint Planning Assumptions (§2) ตารางนี้สมมติ sprint ละ 2 สัปดาห์
และทีมขนาดเล็ก เป็นลำดับเริ่มต้นที่ต้อง re-validate หลังจากรู้ velocity ของ
Sprint 1 แล้ว Sprint 2/3 ถูกแยกอย่างชัดเจนระหว่าง **transaction
foundation** (สร้างและอนุมัติ transaction) กับ **reward distribution**
(จ่ายออกไป) เพื่อที่ความล่าช้าใน distribution logic จะไม่ block ให้
approval workflow ต้อง delay ตามไปด้วย และในทางกลับกัน

| Sprint | Focus | Stories |
|---|---|---|
| **Sprint 1** | Foundation: auth, shop profile, admin account management, PDPA consent & security baseline | US-001, US-009, US-015, US-019, US-020 |
| **Sprint 2** | Transaction foundation: QR generation, QR scanning, pending approval, merchant approval workflow, admin manual-cancel safety control | US-023, US-002, US-004, US-005, US-025 |
| **Sprint 3** | Reward distribution: SP distribution, 10/10/10 Marketing Fee split, audit log | US-006, US-007, US-018 |
| **Sprint 4** | Customer/merchant/admin value loop: balance & status history, redemption + fulfillment, fee reconciliation, reward-rule visibility (read-only), monitoring | US-003, US-008, US-024, US-010, US-016, US-017 |

### Post-MVP Backlog (Sprint 5+) (Backlog หลัง MVP)

Feature รอง (ปรับลด priority ตาม "Backlog Priority Deviation from BRD"
ด้านบน) และรายการที่ถูก block จาก BRD Open Question ที่ยังไม่ได้แก้ไข:

| Item | Priority | Status |
|---|---|---|
| US-011 (แคมเปญของ merchant) | P2 | Deferred |
| US-012 (behavior insight) | P3 | Deferred |
| US-013 (การค้นหาร้านค้า) | P2 | Deferred |
| US-014 (โปรโมชัน) | P2 | Deferred |
| US-021 (นโยบายการเก็บรักษาข้อมูล) | P1 | Blocked on BRD Open Question 4 |
| US-022 (approval SLA/auto-cancel) | P2 | Blocked on BRD Open Question 6 |

**Note (หมายเหตุ):** US-021 และ US-022 ถูก block เพื่อรอคำตอบจาก
stakeholder สำหรับ BRD Open Question 4 และ 6 ตามลำดับ ควรได้รับการ
แก้ไขระหว่าง Sprint 1–2 เพื่อไม่ให้การวางแผน Post-MVP ล่าช้าไปมากกว่านี้
และเพื่อให้ US-022 สามารถจัดเข้า sprint ได้ทันทีเมื่อปลดบล็อกแล้ว (US-025
ใน Sprint 2 คือมาตรการชั่วคราวในระหว่างนี้)

---

## 7. Out of Scope (carried from BRD) (สิ่งที่อยู่นอกขอบเขต, สืบทอดจาก BRD)

ตาม BRD §6 Out of Scope รายการต่อไปนี้ยังคงถูกกันออกจาก backlog นี้
โดยสิ้นเชิง (ไม่ใช่แค่เลื่อน ไม่ใช่แค่ยังไม่จัดตาราง):

- การบริหารจัดการการจัดส่งและโลจิสติกส์
- ระบบ online marketplace / e-commerce checkout แบบสมบูรณ์
- การผสานระบบ third-party payment gateway
- การสนับสนุนหลายภาษา/การแปลนอกเหนือจากพื้นฐานไทย/อังกฤษ

---

*Backlog นี้ควรได้รับการ review และจัดลำดับ priority ใหม่ร่วมกับ
stakeholder ในทุก sprint planning session และปรับปรุงเมื่อ Open Question
ใน BRD ได้รับการแก้ไข*
