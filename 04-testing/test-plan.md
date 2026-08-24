# Test Plan

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Test Plan
**Phase:** 04-testing
**Version:** 1.0
**Status:** Draft — pending stakeholder review
**Date:** 2026-08-17
**Prepared by:** Test Plan Writer Agent (ผ่าน Shopplus Orchestrator, AI Native Development Workflow)
**Source:** `01-requirements/01-business-requirement.md` (v1.1, §7 NFR + §8 Risks) + `01-requirements/03-feature-list.md` (v1.0, MoSCoW) + `01-requirements/02-product-backlog.md` (v1.1) + `02-design/03-system-architecture.md` (v1.0)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | สร้าง Test Plan ฉบับแรกของโปรเจกต์ ครอบคลุม Scope, Test Types, Test Environment, Risk Management, และ Entry/Exit Criteria ตาม skill `test-plan-standard` โดยอ้างอิง NFR ใน BRD §7, Risk ใน BRD §8, MoSCoW ใน Feature List, และ tech stack ใน System Architecture |
| 1.1 | Draft — pending stakeholder review | **Sync จาก BRD v1.2 (NFR Deep-Dive Review)** ตาม `traceability-consistency-check`: อัปเดตแถว Performance/Availability ใน §3 ให้อ้างตัวเลขเกณฑ์ที่เป็นรูปธรรม (แทนข้อความ "หลักไม่กี่วินาที"/"ตลอดเวลาทำการ" เดิม), เพิ่ม Test Type ใหม่ 3 แถว (Observability/Monitoring, Compatibility, Disaster Recovery/Backup) ให้ครบตาม NFR category ใหม่ใน BRD §7, และอัปเดตเหตุผล Out of Scope ของ FT-018/FT-019 ให้สะท้อนว่า Open Question ที่เคยบล็อกได้รับคำตอบบางส่วน/ทั้งหมดแล้ว |

---

## 1. Purpose (วัตถุประสงค์)

เอกสารนี้เป็นกลยุทธ์การทดสอบระดับโปรเจกต์ **1 ไฟล์ต่อโปรเจกต์** (ไม่ผูก
กับ Feature เดียว) กำหนดภาพรวม scope, ประเภทการทดสอบ, test environment,
การบริหารความเสี่ยง, และเกณฑ์เริ่ม/จบการทดสอบ — รายละเอียดระดับ Feature
ดูที่ `04-testing/acceptance-criteria.md` (Acceptance Criteria ต่อ
Backlog Item) และ `04-testing/test-cases/*.md` (Test Case แบบ
step-by-step ต่อ Feature)

---

## 2. Scope (ขอบเขตการทดสอบ)

### In Scope (อยู่ในขอบเขต — MoSCoW: Must have / Should have)

| FT | Feature | MoSCoW | Application |
|---|---|---|---|
| FT-001 | Customer Account & Authentication | Must have | Customer |
| FT-002 | Merchant QR Code Generation & Management | Must have | Merchant |
| FT-003 | Customer QR Scan & Transaction Creation | Must have | Customer |
| FT-004 | Customer SP Balance & Transaction History | Must have | Customer |
| FT-005 | Merchant Transaction Approval Workflow | Must have | Merchant |
| FT-006 | SP Point Distribution & Marketing Fee Engine | Must have | Core Reward Logic |
| FT-007 | Reward Redemption (Customer) | Should have | Customer |
| FT-008 | Redemption Fulfillment (Merchant) | Should have | Merchant |
| FT-009 | Merchant Shop Profile Management | Must have | Merchant |
| FT-010 | Merchant Fee & Transaction Reconciliation | Must have | Merchant |
| FT-011 | Admin User & Merchant Account Management | Must have | Admin |
| FT-012 | SP Reward Rule Visibility (read-only) | Must have | Admin |
| FT-013 | System Monitoring Dashboard | Should have | Admin |
| FT-014 | Admin Manual Transaction Cancellation | Should have | Admin |
| FT-015 | Immutable Transaction Audit Log | Must have | Transaction Audit |
| FT-016 | PDPA Consent Management | Must have | PDPA Compliance |
| FT-017 | Data Minimization & Secure Access Control | Must have | PDPA Compliance |

### Out of Scope (นอกขอบเขตรอบนี้ — MoSCoW: Could have / Won't have / Blocked)

| FT | Feature | MoSCoW | เหตุผล |
|---|---|---|---|
| FT-018 | Data Retention Policy | Should have (Post-MVP, ยัง Blocked บางส่วน) | BRD v1.2: retention period กำหนดแล้ว (3 ปี) แต่ consent flow รายละเอียดยังไม่ยืนยัน (Open Question 4 ส่วนที่เหลือ) |
| FT-019 | Merchant Approval SLA / Auto-Cancel | Could have (Post-MVP, ปลด Blocked) | BRD v1.2: SLA กำหนดแล้ว (48 ชั่วโมง, working decision) — Open Question 6 ตอบแล้ว, รอ product owner จัดเข้า sprint |
| FT-020 | Merchant Campaigns & Promotions | Could have (Post-MVP) | นอกขอบเขต MVP |
| FT-021 | Customer Behavior Insights | Won't have (this release) | นอกขอบเขต MVP โดยชัดเจน |
| FT-022 | Shop Discovery & Search | Could have (Post-MVP) | นอกขอบเขต MVP |
| FT-023 | Active Promotions View | Could have (Post-MVP) | นอกขอบเขต MVP |

Feature ที่ยังไม่มี Test Case จริง (ดูรายการที่มีอยู่แล้วใน
`04-testing/test-cases/`) จะถูกทดสอบตามลำดับที่เลือกทำ ("เลือกบางข้อมา
ส่ง") — In Scope ในตารางนี้หมายถึง "ควรมี Acceptance Criteria + Test
Case ก่อนถือว่าผ่าน exit criteria ของ MVP" ไม่ใช่ "มีครบแล้ว ณ วันนี้"

---

## 3. Test Types (ประเภทการทดสอบ)

| ประเภท | อ้าง NFR (BRD §7) | แนวทาง |
|---|---|---|
| **Functional Testing** | (ฐานจาก Acceptance Criteria) | ทดสอบตาม Test Case ใน `test-cases/*.md` ที่ผ่านมาจาก `acceptance-criteria.md` — ครอบคลุม happy path + decision branch ทุกจุดใน User Journey |
| **Security Testing** | Security | ตรวจว่า client ไม่สามารถกำหนดค่า SP/fee/สถานะได้เอง (server-side validation only), ตรวจ authentication/authorization ต่อ role (Customer/Merchant/Admin) |
| **Privacy / PDPA Compliance Testing** | Privacy / PDPA | ตรวจว่าทุกหน้าจอที่เก็บข้อมูลส่วนบุคคลมี PDPA consent gate (FT-016), ตรวจ data minimization (FT-017) ว่าไม่เปิดเผยข้อมูลเกินจำเป็น |
| **Performance Testing** | Performance | ตรวจ read path (สแกน QR/อ่าน balance) ให้เสร็จภายใน ≤ 1 วินาที (p95) และ write/distribution path (นับจาก merchant กดอนุมัติจนถึง SP แบ่งสรรครบและ balance อัปเดต) ให้เสร็จภายใน ≤ 5 วินาที (p95) ตาม BRD §7 v1.2 — ยังไม่เคย run load test จริง ตัวเลขเป็น working target |
| **Usability Testing** | Usability | ตรวจ friction ของ flow หลัก (สแกน QR, อนุมัติ transaction) โดยเฉพาะกับ merchant ที่ไม่มีความเชี่ยวชาญด้านเทคนิค รวมถึงเกณฑ์ accessibility ขั้นต่ำ WCAG AA (contrast, touch target ≥ 44×44px) — ควบคู่กับการตรวจ Design Token ใน `02-design/DESIGN.md` ถ้ามี Prototype |
| **Regression Testing** | Maintainability | รันซ้ำ Test Case ของ Feature ที่เกี่ยวข้องทุกครั้งที่ Backlog/Feature List มีการเปลี่ยนแปลงที่กระทบ Feature นั้น (ดู Change Propagation Matrix ใน skill `traceability-consistency-check`) |
| **Auditability / Traceability Testing** | Auditability | ตรวจว่าทุกการแบ่งสรร SP สร้าง audit log entry ที่ไม่สามารถเปลี่ยนแปลงได้ และ Admin ดูย้อนหลังได้จริง |
| **Availability Testing** | Availability & Reliability | ตรวจ flow หลักของการสะสม/แลก reward ว่าพร้อมใช้งาน ≥ 99.5% ในเวลาทำการของ merchant (ค่าเริ่มต้น 24 ชม./วันจนกว่าจะมี feature ตั้งเวลาทำการเอง) และตรวจ atomicity/idempotency ของการแบ่งสรร SP เมื่อมี retry/concurrent approve (เมื่อมี environment จริงให้ทดสอบ) |
| **Observability / Monitoring Testing** | Observability / Monitoring | ตรวจว่า logging/monitoring (Firebase/Cloud Logging & Monitoring) จับความล้มเหลวของ SP distribution และ error ของ Cloud Functions ได้จริง และ alert ไปถึง admin เมื่อเกิดความล้มเหลว (ต่อยอด FT-013) |
| **Compatibility Testing** | Compatibility | ตรวจ Web app ตาม breakpoint ใน `02-design/DESIGN.md` §4.3 บนเบราว์เซอร์หลักที่อัปเดตภายใน 2 ปี และตรวจ Mobile app บน iOS/Android เวอร์ชันหลักที่ยังได้รับการสนับสนุน |
| **Disaster Recovery / Backup Testing** | Disaster Recovery / Backup | ตรวจว่า scheduled Firestore export ทำงานจริงตามรอบที่กำหนด (RPO ≤ 24 ชม.) และซ้อมกู้คืนข้อมูลได้จริงภายใน RTO 4 ชั่วโมง |

---

## 4. Test Environment (สภาพแวดล้อมการทดสอบ)

> **หมายเหตุ:** ยังไม่มีการตั้งค่า environment จริงในโปรเจกต์นี้ ณ วันที่
> จัดทำเอกสาร — หมวดนี้คือ**แผนที่ตั้งใจไว้**ตาม tech stack ที่กำหนดใน
> `02-design/03-system-architecture.md` ไม่ใช่ environment ที่พร้อมใช้
> งานแล้ว

| Layer | Technology | หมายเหตุ |
|---|---|---|
| Frontend | Next.js + React (Web), Mobile Application | ทดสอบผ่าน browser/emulator ตาม breakpoint ที่กำหนดใน `02-design/DESIGN.md` §4.3 (ถ้ามี) |
| Authentication | Firebase Authentication | ต้องมี test account ต่อ role (Customer/Merchant/Admin) แยกจาก production |
| Backend Logic | Firebase Cloud Functions | ทดสอบ business logic (SP distribution, status transition) ที่ฝั่ง server เท่านั้น ตาม NFR Security |
| Database | Firestore | ใช้ Firestore emulator หรือ project แยกสำหรับ test/staging ไม่ปนกับ production data |
| Hosting | Firebase Hosting | สำหรับทดสอบ Web Application แบบ deploy จริงก่อนขึ้น production |

**ข้อเสนอสำหรับ stage:** Development (local + emulator) → Staging
(Firebase project แยก, ข้อมูล mock/anonymized) → Production (ไม่ทดสอบ
โดยตรง ใช้ monitoring ตาม FT-013 แทน)

---

## 5. Risk Management (การบริหารความเสี่ยง)

อ้างจาก BRD §8 Risks — คอลัมน์ "Testing Mitigation" คือแนวทางที่การ
ทดสอบจะช่วยลดความเสี่ยงนั้น:

| Risk (จาก BRD §8) | Impact | Testing Mitigation |
|---|---|---|
| Merchant ต่อต้านการนำมาใช้ เนื่องจากไม่คุ้นเคยกับเครื่องมือดิจิทัล | High | Usability Testing กับ flow ของ merchant โดยเฉพาะ (approve/reject, shop profile) ก่อน launch จริง |
| การใช้งาน reward/point ในทางที่ผิดหรือทุจริต (QR ปลอม, แลก reward ซ้ำซ้อน) | High | Security Testing ครอบคลุม QR validation (FT-003), double-submit guard (AC-005-03), และ audit log (FT-015) |
| การไม่ปฏิบัติตาม PDPA ในการจัดการข้อมูล | High | PDPA Compliance Testing ทุกหน้าจอที่เก็บข้อมูลส่วนบุคคล (FT-016, FT-017) ก่อนขึ้น production |
| ความหนาแน่นของลูกค้าเริ่มต้นต่ำ จำกัด network effect | Medium | นอกขอบเขตของ Test Plan นี้ (เป็น business/go-to-market risk ไม่ใช่ risk ด้านคุณภาพซอฟต์แวร์) |
| Marketing fee model (ขั้นต่ำ 3 บาท) อาจเป็นอุปสรรคสำหรับ transaction มูลค่าต่ำ | Medium | Functional Testing ของ FT-006 ให้ครอบคลุม transaction ที่มูลค่าใกล้ขั้นต่ำ (edge case ด้าน fee calculation) |
| Merchant ล่าช้าหรือไม่ตอบสนองในการอนุมัติ transaction ที่ `PENDING_APPROVAL` | Medium | Functional Testing ของ FT-005 (ครอบคลุมแล้วใน `test-cases/ft-005-*.md`) — ส่วน SLA/auto-cancel รอ FT-019 (Blocked, Post-MVP) |

---

## 6. Entry Criteria (เกณฑ์เริ่มทดสอบ)

ต่อ Feature ที่จะเริ่มทดสอบ ต้องมีครบก่อนเสมอ:

1. Feature นั้นมี Acceptance Criteria ครบใน `04-testing/acceptance-criteria.md` (ตาม skill `acceptance-criteria-standard`)
2. Test Environment (§4) พร้อมใช้งานอย่างน้อยระดับ Development/emulator
3. ถ้า Feature นั้นมี UI ที่ทดสอบ — มี Prototype หรือ implementation จริง
   ให้ทดสอบ (อ้างอิง `03-development/01-prototype-log.md` ถ้ามี)

---

## 7. Exit Criteria (เกณฑ์จบการทดสอบ)

ต่อรอบการทดสอบ (เช่น ก่อนขึ้น production หรือก่อนปิด sprint):

1. Test Case ระดับ **Must have** ทั้งหมดของ Feature ใน Scope (§2) ผ่าน
2. ไม่มี defect ระดับ critical/security ที่ยังเปิดอยู่ (โดยเฉพาะที่กระทบ
   การคำนวณ SP/fee หรือการรั่วไหลของข้อมูลส่วนบุคคล)
3. Audit log ของทุก transaction ที่ทดสอบตรวจสอบย้อนกลับได้ครบตาม NFR
   Auditability
4. PDPA consent gate ผ่านการทดสอบครบสำหรับทุกหน้าจอที่เก็บข้อมูลส่วนบุคคล

---

## 8. References (การอ้างอิงเพิ่มเติม)

- Acceptance Criteria ระดับ Backlog Item: `04-testing/acceptance-criteria.md`
- Test Case ระดับ step-by-step ต่อ Feature: `04-testing/test-cases/*.md`
- Design System ที่ใช้ตรวจ Usability ของ Prototype: `02-design/DESIGN.md`

---

## 9. Notes (หมายเหตุ)

- ตาราง Scope (§2) จะต้องปรับตามเมื่อ MoSCoW ของ Feature List เปลี่ยน —
  ให้เรียก `test-plan-writer` อัปเดตหมวดนี้เมื่อ Feature List revision
  ใหม่กระทบ scope การทดสอบ
- Test Environment (§4) เป็นแผนเท่านั้น ควรอัปเดตให้ตรงกับความเป็นจริงทันที
  ที่มีการตั้งค่า environment จริงเกิดขึ้น

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ QA/business stakeholder และปรับปรุง
เมื่อ BRD §7/§8, Feature List, หรือ System Architecture มี revision ใหม่
ที่กระทบกลยุทธ์การทดสอบ*
