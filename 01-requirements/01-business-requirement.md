# Business Requirement Document

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Business Requirement Document (BRD)
**Phase:** 01-requirements
**Version:** 1.1
**Status:** Revised Draft after Requirement Review
**Date:** 2026-08-04
**Prepared by:** Requirement Analyst Agent (AI Native Development Workflow)

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | ร่างเอกสาร Business Requirement ฉบับแรก |
| 1.1 | Revised Draft after Requirement Review | เพิ่มรูปแบบการแบ่งสรร Marketing Fee ที่ได้รับการอนุมัติ (30 SP แบ่ง 10/10/10), Merchant Approval Workflow และ transaction status lifecycle, และข้อกำหนดด้าน Transaction Audit ปรับปรุง Functional Requirements และ Acceptance Criteria ที่เกี่ยวข้อง |

---

## 1. Project Background (ความเป็นมาของโครงการ)

ShopPlus Global คือ Community Commerce Platform ที่ออกแบบมาเพื่อเชื่อมโยง
ร้านค้าท้องถิ่นแบบออฟไลน์ ธุรกิจออนไลน์ และลูกค้า เข้าด้วยกันผ่านระบบสมาชิก
ดิจิทัล ระบบสะสมคะแนนสะสม (Reward Point) และโซลูชันการตลาดที่ขับเคลื่อนด้วย AI

แพลตฟอร์มเริ่มต้นจากร้านค้าชุมชนแบบออฟไลน์ และมีเป้าหมายที่จะขยายไปสู่
การค้าออนไลน์ การจัดส่ง โลจิสติกส์ และบริการมาร์เกตเพลส เมื่อ ecosystem
มีความพร้อมมากขึ้น

โครงการนี้ดำเนินตาม AI Native Development Workflow โดยใช้ Agile
methodology, GitHub version control, Claude Code AI Agent และเอกสารที่มี
โครงสร้างชัดเจนครอบคลุม 5 phase ได้แก่ Requirements, Design, Development,
Testing และ Release

เอกสารนี้เป็น artifact ฉบับแรกใน phase `01-requirements` และมีวัตถุประสงค์
เพื่อสร้างความเข้าใจร่วมกันเกี่ยวกับปัญหาทางธุรกิจ ผู้ใช้งาน และ requirement
ต่าง ๆ ก่อนเริ่มงาน design หรือ development ใด ๆ

---

## 2. Business Problem (ปัญหาทางธุรกิจ)

ธุรกิจชุมชนท้องถิ่น — ร้านค้าอิสระ ร้านค้าปลีกขนาดเล็ก และผู้ให้บริการใน
ละแวกใกล้เคียง — ประสบปัญหาในการแข่งขันกับเชนร้านค้าขนาดใหญ่และ
มาร์เกตเพลสออนไลน์ เนื่องจากขาด:

- วิธีการทางดิจิทัลในการสร้างและรักษาฐานลูกค้าที่ภักดี
- เครื่องมือสำหรับดำเนินแคมเปญการตลาดที่เป็นระบบและติดตามผลได้
- การมองเห็นพฤติกรรมและรูปแบบการซื้อของลูกค้า
- ระบบ reward ร่วมข้ามร้านค้า (cross-merchant) ที่ทำให้ลูกค้ามีเหตุผล
  กลับมาซื้อที่ร้านค้าชุมชนซ้ำ ๆ แทนที่จะเปลี่ยนไปใช้บริการคู่แข่งรายใหญ่

ในขณะเดียวกัน ลูกค้าก็ไม่มีวิธีที่เป็นหนึ่งเดียวในการค้นหาร้านค้าท้องถิ่น
สะสม reward ได้อย่างสม่ำเสมอในหลายร้านค้า หรือติดตาม/แลกมูลค่าสำหรับ
การซื้อของในชีวิตประจำวันที่ร้านค้าขนาดเล็ก โปรแกรม reward ที่มีอยู่ในปัจจุบัน
(ถ้ามี) มักกระจัดกระจายแยกตามร้านค้า เป็นแบบกระดาษ หรือทำด้วยมือ ซึ่งจำกัด
มูลค่าของโปรแกรมและทำให้เลิกใช้ได้ง่าย

**Expected outcome (ผลลัพธ์ที่คาดหวัง):** ระบบสมาชิกดิจิทัลและ reward
ecosystem ร่วมกัน (SP Point) ที่มอบเครื่องมือด้านการตลาดและ
customer-insight ให้แก่ merchant ให้ลูกค้ามีวิธีที่สม่ำเสมอในการค้นหาร้านค้า
และสะสม/แลก reward และให้แพลตฟอร์มมีรูปแบบรายได้ที่ยั่งยืนผ่าน marketing
fee — ในขณะที่ยังคงให้ประสบการณ์การใช้งานเรียบง่ายพอสำหรับ merchant
ชุมชนที่เน้นออฟไลน์และไม่มีความเชี่ยวชาญด้านเทคนิคให้สามารถใช้งานได้

---

## 3. Vision and Objectives (วิสัยทัศน์และเป้าหมาย)

### Vision (วิสัยทัศน์)

"Helping local community businesses compete in the digital economy by
connecting merchants and customers through a shared reward ecosystem."

(ช่วยให้ธุรกิจชุมชนท้องถิ่นสามารถแข่งขันในเศรษฐกิจดิจิทัลได้ โดยเชื่อมโยง
merchant และลูกค้าผ่าน reward ecosystem ที่ใช้ร่วมกัน)

### Objectives (เป้าหมาย)

1. ให้ลูกค้าสามารถค้นหา มีส่วนร่วม และสะสม reward จากร้านค้าชุมชนท้องถิ่น
   ผ่านระบบสมาชิกดิจิทัลเดียว
2. มอบเครื่องมือดิจิทัลที่ใช้งานง่ายให้แก่ merchant สำหรับการหาลูกค้าใหม่
   การจัดการแคมเปญ และ insight ด้านพฤติกรรม โดยไม่ต้องมีความเชี่ยวชาญ
   ด้านเทคนิคเชิงลึก
3. สร้าง SP Point reward ecosystem ที่ยั่งยืน โดยได้รับเงินทุนจาก marketing
   fee 30 SP (3 THB) ต่อ transaction ที่ merchant อนุมัติ โดยแบ่งสรรระหว่าง
   customer reward, กองทุนการตลาดร่วม (marketing fund), และแพลตฟอร์ม
4. มอบเครื่องมือให้ผู้ดูแลระบบแพลตฟอร์ม (platform administrators) สำหรับ
   บริหารจัดการผู้ใช้ merchant reward และสุขภาพของระบบในระดับ scale
5. สร้างแพลตฟอร์มแบบ cloud-first (Firebase / Firestore / Cloud Functions)
   เพื่อให้สามารถ scale จากร้านค้าชุมชนออฟไลน์ไปสู่การค้าออนไลน์ การจัดส่ง
   และมาร์เกตเพลสได้ในอนาคต
6. ให้แน่ใจว่าการออกแบบทั้งหมดเป็นไปตาม PDPA และปฏิบัติตามหลักการด้าน
   ข้อมูลที่ปลอดภัยและ minimal ตั้งแต่วันแรก

---

## 4. Target Users (ผู้ใช้เป้าหมาย)

| User Type | Description | Primary Goals |
|---|---|---|
| **Customer** | บุคคลที่ซื้อสินค้า/บริการที่ร้านค้าท้องถิ่น/ชุมชนที่เข้าร่วมโครงการ | ค้นหาร้านค้า, สะสม SP Point, แลก reward, เข้าถึงโปรโมชัน |
| **Merchant** | เจ้าของร้านค้าหรือพนักงานร้านค้าท้องถิ่น/ชุมชนที่เข้าร่วมแพลตฟอร์ม | หาลูกค้าใหม่และรักษาลูกค้าเดิม, ดำเนินแคมเปญ, ติดตาม marketing fee และ transaction |
| **Admin** | ทีมปฏิบัติการของแพลตฟอร์มที่บริหารจัดการ ecosystem ของ ShopPlus Global | บริหารจัดการผู้ใช้และ merchant, ดูแล reward economy, ตรวจสอบสุขภาพของระบบ |

### User Goals, Behavior, and Expectations (เป้าหมาย พฤติกรรม และความคาดหวังของผู้ใช้)

- **Customer:** ต้องการวิธีที่รวดเร็วและมี friction น้อย (เช่น สแกน QR) ในการ
  สะสมและตรวจสอบ reward ณ จุดขาย คาดหวังให้ reward รู้สึกเป็นธรรมและ
  โปร่งใส (มีอัตราแปลง SP-to-Baht ที่ชัดเจน) และคาดหวังว่าจะค้นพบร้านค้าใหม่
  ใกล้เคียงได้ง่าย
- **Merchant:** ต้องการเครื่องมือหาลูกค้าใหม่และรักษาลูกค้าเดิม โดยไม่ต้องมี
  ความเชี่ยวชาญด้านเทคนิคหรือการตลาด คาดหวังให้เห็น marketing fee ที่ถูก
  เรียกเก็บและมูลค่าที่ได้รับกลับมาอย่างชัดเจน (customer insight, การกลับมา
  ซื้อซ้ำ) และคาดหวังว่าจะยังคงมีสิทธิควบคุมในแต่ละ transaction โดยการ
  ตรวจสอบและอนุมัติก่อนที่ fee จะถูกหักออก
- **Admin:** ต้องการการกำกับดูแลและควบคุม reward economy เพื่อป้องกันการ
  ใช้งานในทางที่ผิด (เช่น การปลอมแปลง point) และต้องการระบบเฝ้าติดตาม
  (monitoring) เพื่อให้แพลตฟอร์มมีความน่าเชื่อถือเมื่อจำนวน merchant/customer
  เพิ่มขึ้น

---

## 5. Business Requirements (ความต้องการทางธุรกิจ)

นำเสนอในรูปแบบ user story ตามกระบวนการ Agile Requirement Analysis

### Customer

- ในฐานะ **customer** ฉันต้องการลงทะเบียนและเข้าสู่ระบบได้อย่างง่ายดาย
  เพื่อที่ฉันจะสามารถเริ่มใช้ ShopPlus Global ได้โดยมี friction น้อยที่สุด
- ในฐานะ **customer** ฉันต้องการสแกน QR code ที่ร้านค้าที่เข้าร่วมโครงการ
  เพื่อที่ฉันจะได้สะสม SP Point โดยอัตโนมัติจากการซื้อของ
- ในฐานะ **customer** ฉันต้องการดู SP Point balance และประวัติของฉัน
  เพื่อที่ฉันจะสามารถติดตาม reward ที่ได้สะสมไว้
- ในฐานะ **customer** ฉันต้องการแลก SP Point เป็น reward เพื่อที่ฉันจะได้
  รับมูลค่าที่จับต้องได้จากการเป็นลูกค้าที่ภักดี
- ในฐานะ **customer** ฉันต้องการสำรวจร้านค้าที่เข้าร่วมโครงการใกล้เคียง
  เพื่อที่ฉันจะได้ค้นพบธุรกิจท้องถิ่นใหม่ ๆ ที่จะสนับสนุน

### Merchant

- ในฐานะ **merchant** ฉันต้องการจัดการโปรไฟล์และรายละเอียดร้านค้าของฉัน
  เพื่อที่ลูกค้าจะสามารถค้นหาข้อมูลร้านค้าของฉันได้อย่างถูกต้อง
- ในฐานะ **merchant** ฉันต้องการสร้างแคมเปญ/โปรโมชันสำหรับลูกค้า
  เพื่อที่ฉันจะสามารถดึงดูดและรักษาลูกค้าไว้ได้
- ในฐานะ **merchant** ฉันต้องการตรวจสอบและอนุมัติหรือปฏิเสธ transaction
  ที่รอดำเนินการแต่ละรายการ เพื่อที่ฉันจะควบคุมได้ว่าเมื่อไหร่ marketing fee
  จะถูกหักและ reward จะถูกออกให้
- ในฐานะ **merchant** ฉันต้องการติดตาม marketing fee ต่อ transaction
  เพื่อที่ฉันจะเข้าใจต้นทุนของการเข้าร่วม reward ecosystem
- ในฐานะ **merchant** ฉันต้องการดูประวัติ transaction เพื่อที่ฉันจะสามารถ
  ตรวจสอบยอดขายและ reward ที่ออกให้แล้ว
- ในฐานะ **merchant** ฉันต้องการ insight พฤติกรรมลูกค้าขั้นพื้นฐาน เพื่อที่ฉัน
  จะสามารถตัดสินใจด้านการตลาดได้อย่างมีข้อมูล

### Admin

- ในฐานะ **admin** ฉันต้องการบริหารจัดการบัญชี customer และ merchant
  เพื่อที่ฉันจะสามารถรักษาความน่าเชื่อถือของแพลตฟอร์มไว้ได้
- ในฐานะ **admin** ฉันต้องการบริหารจัดการและกำหนดค่ากฎ reward เพื่อที่
  SP Point ecosystem จะยังคงมีความสม่ำเสมอและเป็นธรรม
- ในฐานะ **admin** ฉันต้องการเฝ้าติดตามสุขภาพของระบบและกิจกรรมการใช้งาน
  เพื่อที่ฉันจะสามารถตรวจพบและแก้ไขปัญหาก่อนที่จะส่งผลกระทบต่อผู้ใช้
- ในฐานะ **admin** ฉันต้องการดู audit log ของทุก SP transaction
  distribution เพื่อที่ฉันจะสามารถตรวจสอบความถูกต้องและสอบสวนกรณีพิพาทได้

---

## 6. Functional Scope (ขอบเขตด้านฟังก์ชัน)

### 6.1 Customer Application (แอปพลิเคชันสำหรับลูกค้า)

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | Customer สามารถลงทะเบียนและเข้าสู่ระบบได้ | P0 |
| FR-002 | Customer สามารถสแกน QR code เพื่อสะสม SP Point ที่จุดชำระเงินได้ | P0 |
| FR-003 | Customer สามารถดู SP Point balance ปัจจุบัน และประวัติ transaction/reward รวมถึงสถานะของแต่ละ transaction (Pending Approval, Approved, Completed, Rejected, Cancelled) | P0 |
| FR-004 | Customer สามารถเลือกดูและแลก reward ที่มีอยู่ด้วย SP Point | P1 |
| FR-005 | Customer สามารถสำรวจ/ค้นหาร้านค้าที่เข้าร่วมโครงการ | P1 |
| FR-006 | Customer สามารถดูและเข้าถึงโปรโมชันที่กำลังดำเนินการอยู่ | P2 |

### 6.2 Merchant Application (แอปพลิเคชันสำหรับร้านค้า)

| ID | Requirement | Priority |
|---|---|---|
| FR-007 | Merchant สามารถจัดการโปรไฟล์ร้านค้าและข้อมูลร้านค้าได้ | P0 |
| FR-008 | Merchant สามารถสร้างและจัดการแคมเปญลูกค้าได้ | P1 |
| FR-009 | Merchant สามารถดูการติดตาม marketing fee ต่อ transaction ได้ | P0 |
| FR-010 | Merchant สามารถดูและจัดการบันทึก transaction ได้ | P0 |
| FR-011 | Merchant สามารถดู insight/รายงานพฤติกรรมลูกค้าขั้นพื้นฐาน | P2 |
| FR-019 | Merchant สามารถตรวจสอบและอนุมัติหรือปฏิเสธ transaction ในขณะที่สถานะเป็น `PENDING_APPROVAL` ก่อนที่ marketing fee จะถูกหักหรือ reward จะถูกออกให้ | P0 |

### 6.3 Admin System (ระบบสำหรับผู้ดูแลระบบ)

| ID | Requirement | Priority |
|---|---|---|
| FR-012 | Admin สามารถบริหารจัดการ (สร้าง/อัปเดต/ระงับ) บัญชีผู้ใช้ customer ได้ | P0 |
| FR-013 | Admin สามารถบริหารจัดการ (onboard/อัปเดต/ระงับ) บัญชี merchant ได้ | P0 |
| FR-014 | Admin สามารถกำหนดค่าและบริหารจัดการกฎ SP Point reward ได้ | P0 |
| FR-015 | Admin สามารถเฝ้าติดตามการใช้งานระบบ สุขภาพระบบ และกิจกรรม transaction | P1 |
| FR-020 | Admin สามารถดู audit log ของ SP transaction และรายละเอียดการแบ่งสรร (Customer Reward / Marketing Fund / Platform) เพื่อการตรวจสอบยอดและสอบสวนกรณีพิพาท | P0 |

### 6.4 Core Reward Logic (ตรรกะ reward หลัก, Cross-cutting)

| ID | Requirement | Priority |
|---|---|---|
| FR-016 | ระบบต้องแบ่งสรร Marketing Fee คงที่ 30 SP (อัตราแปลง 10 SP = 1 Baht) ต่อ transaction ที่ merchant อนุมัติแล้ว โดยแบ่งเป็น: 10 SP Customer Reward, 10 SP Marketing Fund, 10 SP ShopPlus Global Platform | P0 |
| FR-017 | ระบบต้องหักและแบ่งสรร Marketing Fee เฉพาะหลังจาก merchant อนุมัติ transaction แล้วเท่านั้น จะไม่มีการแบ่งสรร SP ใด ๆ ในขณะที่ transaction อยู่ในสถานะ `PENDING_APPROVAL`, `REJECTED`, หรือ `CANCELLED` | P0 |
| FR-018 | การคำนวณและแบ่งสรร reward ทั้งหมดต้องดำเนินการที่ฝั่ง server (Cloud Functions) เท่านั้น ห้ามเชื่อถือค่าจากฝั่ง client โดยเด็ดขาด | P0 |
| FR-021 | ระบบต้องบริหารจัดการทุก transaction ผ่าน status lifecycle ที่กำหนดไว้ (`PENDING_APPROVAL` → `APPROVED` → `COMPLETED`, หรือ `PENDING_APPROVAL` → `REJECTED` / `CANCELLED`) และต้องบังคับใช้เฉพาะ transition ที่ถูกต้องเท่านั้น | P0 |
| FR-022 | ระบบต้องเขียน audit log entry ที่ไม่สามารถเปลี่ยนแปลงได้ (immutable) สำหรับทุก SP distribution event โดยบันทึก transaction ID, status transition, จำนวน SP ที่ส่งไปยังแต่ละ distribution target ทั้งสาม และ timestamp | P0 |

### 6.5 Transaction Status Workflow (ขั้นตอนสถานะของ transaction)

ทุก transaction ที่ถูกสร้างขึ้นจากการสแกน QR ของลูกค้าจะเคลื่อนผ่านสถานะ
ดังต่อไปนี้ การแบ่งสรร SP (FR-016) และ audit log entry ที่เกี่ยวข้อง (FR-022)
จะเกิดขึ้นเฉพาะในช่วง transition `PENDING_APPROVAL` → `APPROVED` เท่านั้น

| Status | Meaning |
|---|---|
| `PENDING_APPROVAL` | ถูกสร้างขึ้นเมื่อลูกค้าสแกน QR code ของ merchant กำลังรอการตรวจสอบจาก merchant ยังไม่มีการแบ่งสรร SP |
| `APPROVED` | Merchant ได้อนุมัติ transaction แล้ว ทำให้เกิดการแบ่งสรร 30 SP (สัดส่วน 10/10/10) และ audit log entry ที่เกี่ยวข้อง |
| `COMPLETED` | การแบ่งสรร SP ได้ดำเนินการและบันทึกสำเร็จแล้ว เป็น terminal success state |
| `REJECTED` | Merchant ปฏิเสธ transaction ไม่มีการแบ่งสรร SP เป็น terminal state |
| `CANCELLED` | Transaction ถูกยกเลิกก่อนที่ merchant จะดำเนินการเสร็จสิ้น (เช่น ริเริ่มโดย customer/system หรือ approval timeout) ไม่มีการแบ่งสรร SP เป็น terminal state |

Valid transitions:

- `PENDING_APPROVAL` → `APPROVED` → `COMPLETED`
- `PENDING_APPROVAL` → `REJECTED`
- `PENDING_APPROVAL` → `CANCELLED`

### 6.6 Transaction Audit Requirement (ข้อกำหนดด้าน audit ของ transaction)

ทุกการแบ่งสรร SP (ส่วนของ Customer Reward, Marketing Fund และ Platform)
ต้องสร้าง audit log entry ที่ไม่สามารถเปลี่ยนแปลงได้ (immutable) โดยบันทึก
อย่างน้อย: transaction ID, merchant ID, customer ID, status transition,
จำนวน SP ที่แบ่งสรรให้แต่ละ distribution target ทั้งสาม และ timestamp
Audit log ต้องถูกเก็บรักษาตามนโยบายการเก็บรักษาข้อมูลของ PDPA (ดู Open
Questions) และต้องให้ Admin สามารถดูได้เพื่อการตรวจสอบยอดและสอบสวนกรณี
พิพาท (FR-020, FR-022)

### Acceptance Criteria (เกณฑ์การตอบรับ, ตัวอย่างที่เป็นตัวแทน)

- **Given** ลูกค้าสแกน QR code ของ merchant ที่เข้าร่วมโครงการ, **when** การ
  สแกนถูกบันทึก, **then** transaction จะถูกสร้างขึ้นด้วยสถานะ
  `PENDING_APPROVAL` และไม่มีการแบ่งสรร SP
- **Given** transaction อยู่ในสถานะ `PENDING_APPROVAL`, **when** merchant
  อนุมัติ, **then** transaction จะเปลี่ยนไปเป็น `APPROVED` ระบบจะแบ่งสรร
  30 SP เป็น 10 SP ให้ลูกค้า, 10 SP ให้ Marketing Fund, และ 10 SP ให้
  ShopPlus Global Platform จากนั้น transaction จะเปลี่ยนไปเป็น `COMPLETED`
- **Given** transaction อยู่ในสถานะ `PENDING_APPROVAL`, **when** merchant
  ปฏิเสธ, **then** transaction จะเปลี่ยนไปเป็น `REJECTED` และไม่มีการแบ่งสรร
  SP
- **Given** มีการดำเนินการแบ่งสรร SP ใด ๆ, **when** การแบ่งสรรเสร็จสมบูรณ์,
  **then** จะมีการสร้าง audit log entry ที่ไม่สามารถเปลี่ยนแปลงได้ โดยบันทึก
  transaction ID, status transition, รายละเอียดการแบ่งสรร และ timestamp
- **Given** ลูกค้าพยายามแลก reward, **when** SP Point balance ของลูกค้าไม่
  เพียงพอ, **then** ระบบจะป้องกันการแลกและแสดงข้อความที่ชัดเจน

### Out of Scope for this Initial Phase (สิ่งที่อยู่นอกขอบเขตของ phase เริ่มต้นนี้)

- การบริหารจัดการการจัดส่งและโลจิสติกส์
- ระบบ online marketplace / e-commerce checkout แบบสมบูรณ์
- การผสานระบบ third-party payment gateway
- การสนับสนุนหลายภาษา/การแปลนอกเหนือจากพื้นฐานไทย/อังกฤษ

รายการเหล่านี้สอดคล้องกับแนวทางการขยายในระยะยาวของแพลตฟอร์ม แต่ยัง
ไม่อยู่ในขอบเขตของ business requirement ฉบับเริ่มต้นนี้

---

## 7. Non-Functional Requirements (ความต้องการที่ไม่ใช่ฟังก์ชัน)

| Category | Requirement |
|---|---|
| **Security** | ต้องมี secure authentication และ authorization สำหรับทุก user role, ห้ามเชื่อถือค่าจากฝั่ง client สำหรับการคำนวณ reward หรือ fee, การดำเนินการที่ sensitive ต้องผ่านการตรวจสอบที่ฝั่ง server (Cloud Functions) |
| **Privacy / PDPA** | ต้องปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคลของประเทศไทย (PDPA), ต้องมีความยินยอมของผู้ใช้อย่างชัดแจ้งสำหรับการเก็บข้อมูล, การเก็บข้อมูลแบบ minimum ที่จำเป็น, ห้ามเปิดเผยข้อมูลส่วนบุคคล ข้อมูลผู้ใช้ที่ sensitive หรือ internal credentials |
| **Performance** | การสแกน QR และการให้ reward ควรเสร็จสิ้นภายในไม่กี่วินาที เพื่อสนับสนุนการทำงาน point-of-sale ที่ราบรื่น |
| **Scalability** | ต้องเป็น cloud-first architecture (Firebase / Firestore / Cloud Functions) เพื่อให้สามารถ scale จากร้านค้าชุมชนออฟไลน์ไปสู่การใช้งานด้านการค้าออนไลน์ในวงกว้างมากขึ้น |
| **Availability** | flow หลักในการสะสมและแลก reward ควรพร้อมใช้งานตลอดเวลาทำการของ merchant, ต้องมีระบบเฝ้าติดตามเพื่อตรวจจับการหยุดทำงาน |
| **Maintainability** | ต้องแยกส่วนความรับผิดชอบอย่างชัดเจน — client จัดการเฉพาะ UI/interaction, backend เป็นผู้ดูแล business logic, การตรวจสอบความปลอดภัย และการคำนวณ reward |
| **Usability** | UX ต้องเรียบง่ายและมี friction น้อย เหมาะสำหรับ merchant ชุมชนที่ไม่มีความเชี่ยวชาญด้านเทคนิค และลูกค้าในกลุ่มประชากรที่หลากหลาย |
| **Auditability** | บันทึก transaction และ reward ต้องสามารถตรวจสอบย้อนกลับได้สำหรับการตรวจสอบยอด marketing fee ของ merchant และการกำกับดูแลของ admin, ทุกการแบ่งสรร SP (ส่วนของ Customer Reward, Marketing Fund, Platform) ต้องสร้าง audit log entry ที่ไม่สามารถเปลี่ยนแปลงได้ ผูกกับ transaction ID (ดู §6.6) |

---

## 8. Risks and Constraints (ความเสี่ยงและข้อจำกัด)

### Risks (ความเสี่ยง)

| Risk | Impact | Notes |
|---|---|---|
| Merchant ต่อต้านการนำมาใช้ เนื่องจากไม่คุ้นเคยกับเครื่องมือดิจิทัล | High | Merchant ชุมชนที่เน้นออฟไลน์อาจต้องการการสนับสนุนด้าน onboarding และ UX ที่เรียบง่าย |
| การใช้งาน reward/point ในทางที่ผิดหรือทุจริต (เช่น QR ปลอม, การแลก reward ซ้ำซ้อน) | High | ต้องมีการตรวจสอบที่ฝั่ง server และเครื่องมือเฝ้าติดตามของ admin (FR-018, FR-015) |
| การไม่ปฏิบัติตาม PDPA ในการจัดการข้อมูล | High | มีความเสี่ยงด้านกฎหมาย/regulatory ต้องได้รับการจัดการตั้งแต่ขั้น design ไม่ใช่มาแก้ย้อนหลัง |
| ความหนาแน่นของลูกค้าเริ่มต้นต่ำ จำกัด network effect | Medium | มูลค่าของ reward ecosystem ขึ้นอยู่กับทั้ง merchant และ customer ที่เข้าร่วมจนถึง critical mass |
| Marketing fee model (ขั้นต่ำ 3 Baht) อาจเป็นอุปสรรคสำหรับ transaction ที่มีมูลค่าต่ำมาก | Medium | ต้องมีการตรวจสอบความเหมาะสมกับ merchant นำร่องก่อนเปิดใช้งานเต็มรูปแบบ |
| Merchant ล่าช้าหรือไม่ตอบสนองในการอนุมัติ transaction ที่อยู่ในสถานะ `PENDING_APPROVAL` | Medium | ทำให้การให้ reward และการแบ่งสรร fee/fund ล่าช้า ต้องมีนโยบาย SLA/timeout ในการอนุมัติที่ชัดเจน (ดู Open Questions) |

### Constraints (ข้อจำกัด)

- กฎการแปลง SP Point (10 SP = 1 Baht) และ marketing fee (3 Baht / 30 SP
  ต่อ transaction ที่อนุมัติแล้ว) เป็นกฎทางธุรกิจที่กำหนดไว้แน่นอนจาก
  CLAUDE.md และต้องได้รับการปฏิบัติตามในการคำนวณ reward ทั้งหมด
- marketing fee 30 SP ถูกแบ่งสรร 10/10/10 ระหว่าง Customer Reward,
  Marketing Fund, และ ShopPlus Global Platform และจะแบ่งสรรก็เมื่อ
  merchant อนุมัติแล้วเท่านั้น (`PENDING_APPROVAL` → `APPROVED`); จะไม่มี
  การแบ่งสรรใน transaction ที่ `REJECTED` หรือ `CANCELLED`
- ทิศทางเทคนิคถูกจำกัดไว้ที่ Firebase, Firestore, และ Cloud Functions
  สำหรับ backend, และ Web + Mobile สำหรับ frontend
- business logic, การตรวจสอบความปลอดภัย, และการคำนวณ reward ทั้งหมด
  ต้องอยู่ที่ backend; client ทำหน้าที่เฉพาะ UI/interaction
- การพัฒนาต้องดำเนินตามโครงสร้าง Agile phase
  (01-requirements → 02-design → 03-development → 04-testing →
  05-release) โดยต้องมีเอกสารก่อนการ implementation

---

## Open Questions (คำถามที่ยังไม่มีคำตอบ)

รายการต่อไปนี้ต้องการความชัดเจนจาก stakeholder ก่อนเริ่ม design:

1. ขอบเขตของ pilot เริ่มต้นที่คาดหวังคืออะไร — จำนวน merchant, พื้นที่
   ทางภูมิศาสตร์, และ timeline?
2. ตัวเลือกการแลก reward (เช่น ส่วนลด, ของฟรี, มูลค่าเทียบเท่าเงินสด) เป็น
   แบบเฉพาะ merchant หรือใช้ได้ทั่วทั้งแพลตฟอร์ม?
3. มีกระบวนการที่ชัดเจนสำหรับการ onboarding/ตรวจสอบ merchant หรือไม่
   (เช่น การตรวจสอบการจดทะเบียนธุรกิจ)?
4. Consent flow และระยะเวลาการเก็บรักษาข้อมูล (data retention) ตาม PDPA
   แบบใดที่ฝ่ายกฎหมาย/compliance ต้องการโดยเฉพาะเจาะจง?
5. SP Point จะมีวันหมดอายุหรือไม่ และถ้ามี จะใช้นโยบายแบบใด?
6. SLA/timeout สำหรับการอนุมัติ transaction ที่อยู่ในสถานะ
   `PENDING_APPROVAL` ของ merchant ก่อนที่จะเปลี่ยนไปเป็น `CANCELLED`
   โดยอัตโนมัติ คือเท่าใด?
7. ลูกค้าจะได้เห็นหรือได้รับการแจ้งเตือนหรือไม่ ในระหว่างที่ transaction
   กำลังรอการอนุมัติจาก merchant (`PENDING_APPROVAL`)?

---

*เอกสารนี้ควรได้รับการ review ร่วมกับ business stakeholder และปรับปรุงให้
เรียบร้อยก่อนดำเนินการต่อไปยัง `02-design`.*
