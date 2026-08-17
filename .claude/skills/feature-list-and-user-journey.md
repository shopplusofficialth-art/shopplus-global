# Feature List & User Journey Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการ:

1. รวบรวม Functional Requirement (FR-xxx) จาก Business Requirement
   Document (BRD) และ Epic/User Story (US-xxx) จาก Product Backlog
   ให้กลายเป็น **Feature List** เดียวที่สรุปภาพรวม feature ทั้งหมดของ
   แพลตฟอร์ม จัดลำดับความสำคัญด้วยหลักการ **MoSCoW**
2. สร้างหรืออัปเดต **User Journey** ที่เกี่ยวข้อง โดยใช้ Mermaid Diagram
   และ mapping กลับไปหา Requirement แต่ละข้อ

ใช้ร่วมกันโดย agent สองตัว: `feature-list-analyst` และ
`user-journey-designer` เพื่อให้ format และกฎการ traceability ตรงกัน
เสมอระหว่างสองเอกสาร

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้าข้อมูลใน BRD/Backlog ไม่ชัดเจน ขัดแย้งกัน หรือไม่พอสำหรับการตัดสินใจ
(เช่น priority ไม่ตรงกันระหว่าง BRD กับ Backlog, feature ใหม่ที่ยังไม่มี
FR อ้างอิง, หรือมีวิธีจัดกลุ่ม/ออกแบบได้มากกว่าหนึ่งแบบ) **ห้ามสมมติเอง
โดยไม่ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการสร้าง/แก้ไขเอกสาร

---

## Section A: Feature List Standard (มาตรฐานเอกสาร Feature List)

### Source Inputs (ข้อมูลต้นทางที่ต้องอ่านก่อน)

- `01-requirements/01-business-requirement.md` (Functional Requirements, FR-xxx)
- `01-requirements/02-product-backlog.md` (Epics, User Stories US-xxx, Priority, Sprint)

### Grouping Rule (กฎการจัดกลุ่ม)

Feature หนึ่งรายการคือกลุ่มของ FR/US ที่เกี่ยวข้องกัน ซึ่งผู้ใช้จริง
(customer/merchant/admin) จะมองว่าเป็น "ความสามารถ" เดียวกัน
(เช่น "Merchant Transaction Approval Workflow" รวม FR-019, FR-021,
US-004, US-005 เข้าด้วยกัน) — ไม่ใช่การ list FR/US ทีละรายการซ้ำ

ใช้ ID ใหม่ `FT-0xx` สำหรับ Feature และต้องอ้างอิงกลับไปยัง FR-xxx และ
US-xxx ที่เกี่ยวข้องทุกครั้ง (traceability)

### MoSCoW Mapping (การแปลง Priority เดิมเป็น MoSCoW)

แปลงจาก priority P0–P3 ที่มีอยู่ใน BRD/Backlog อย่างสอดคล้องกัน โดย
default mapping คือ:

| Backlog Priority | MoSCoW | ความหมาย |
|---|---|---|
| P0 | **Must have** | MVP-blocking, ขาดไม่ได้ |
| P1 | **Should have** | จำเป็นก่อน launch แต่ไม่ block MVP core loop |
| P2 | **Could have** | มีมูลค่าแต่เลื่อนได้ |
| P3 / Deferred / Post-MVP | **Won't have (this release)** | อยู่นอกขอบเขตของ release ปัจจุบัน |

Feature ที่ยังถูก **Blocked** จาก Open Question ใน BRD ต้องระบุสถานะ
blocked ไว้ในคำอธิบาย ไม่ปรับ MoSCoW ให้สูงกว่าที่ backlog กำหนดเพียง
เพราะยังไม่มีคำตอบ

### Required Output Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

1. **ตารางสรุปด้านบน (Summary Table)** — คอลัมน์: Feature ID, Feature
   Name, Module (Customer/Merchant/Admin/Core/PDPA/Post-MVP), MoSCoW,
   Related FR, Related US
2. **คำอธิบายสำหรับแต่ละ Feature ด้านล่างตาราง** — ต่อ 1 feature มี:
   - Feature ID + Feature Name (heading)
   - Description: อธิบายว่า feature นี้ทำอะไร เพื่อใคร
   - MoSCoW + เหตุผลสั้น ๆ ว่าทำไมถึงอยู่ระดับนี้
   - Related FR / US (traceability)
   - หมายเหตุ (ถ้ามี เช่น Blocked, New capability ที่ยังไม่มีใน BRD)
3. ต้องมี Revision History table เหมือนเอกสารอื่นในโปรเจกต์

---

## Section B: User Journey Standard (มาตรฐานเอกสาร User Journey)

### Source Inputs (ข้อมูลต้นทางที่ต้องอ่านก่อน)

- BRD, Product Backlog, Feature List (ถ้ามีอยู่แล้ว)
- `02-design/01-transaction-flow.md` (เพื่อไม่ให้ซ้ำซ้อนกับมุมมอง system/
  state machine — User Journey ต้องโฟกัสมุมมองผู้ใช้/หน้าจอ ไม่ใช่มุมมอง
  backend state)

### Diagram Requirement (ข้อกำหนดของ diagram)

- ใช้ **Mermaid diagram** เท่านั้น (`flowchart` แนะนำสำหรับ journey ที่มี
  จุดตัดสินใจ/แยกทาง เช่น approve/reject)
- อย่างน้อย 1 diagram ต่อ actor หลัก (Customer, Merchant, Admin)
- Node ที่สำคัญควรอ้างอิง FR-xxx/US-xxx ที่เกี่ยวข้องในป้าย node เมื่อ
  ทำได้ เพื่อให้อ่าน diagram แล้วเห็น traceability ได้ทันที

### Narrative & Mapping Requirement (ข้อกำหนดคำอธิบายและการ mapping)

ใต้ทุก diagram ต้องมี:

1. คำอธิบายเป็นลำดับขั้นตอน (numbered steps) ตรงกับลำดับใน diagram
2. ตาราง **Requirement Mapping** ต่อ journey: คอลัมน์ Step, Actor,
   Related FR, Related US, Related Feature (FT-xxx ถ้ามี Feature List
   อยู่แล้ว)

### Keeping in Sync (การรักษาความสอดคล้อง)

เมื่อ BRD หรือ Backlog มีการ revision ใหม่ (เพิ่ม FR/US, เปลี่ยน priority,
เปลี่ยน flow) ต้อง:

1. ตรวจสอบว่า Feature List และ User Journey ยังตรงกับ BRD/Backlog
   ฉบับล่าสุดหรือไม่
2. ถ้าไม่ตรง ให้ **อัปเดต** (ไม่ใช่สร้างใหม่ทับ) และเพิ่ม entry ใน
   Revision History ของเอกสารนั้น ๆ
3. ถ้าไม่แน่ใจว่าการเปลี่ยนแปลงกระทบ Feature/Journey ใดบ้าง ให้ใช้
   Ambiguity Protocol ด้านบน

**หมายเหตุ:** ข้อกำหนดข้างต้นครอบคลุมทิศทาง BRD/Backlog → Feature
List/User Journey เท่านั้น สำหรับการตรวจสอบความสอดคล้องแบบครบทุกทิศทาง
ระหว่างเอกสารทั้ง 4 ฉบับ (รวมถึงกรณี Feature List/User Journey พบ
capability ใหม่ที่ต้องย้อนกลับไปเพิ่มใน BRD/Backlog) ให้ใช้ skill
`traceability-consistency-check` ร่วมกับ agent
`traceability-consistency-auditor` เป็นหลัก — agent
`feature-list-analyst` และ `user-journey-designer` ควรเรียกใช้ agent
นั้นทุกครั้งหลังจากแก้ไขเอกสารของตนเสร็จ (ดู "Rules" ในไฟล์ agent
ของแต่ละตัว)

---

## Rules (กฎทั่วไป)

- ห้ามสร้าง feature หรือ journey step ที่ไม่มีที่มาจาก BRD/Backlog จริง
  (ห้าม fabricate) — ถ้าจำเป็นต้องเพิ่ม capability ใหม่ ให้ระบุว่าเป็น
  "New — recommend adding to BRD" เหมือน convention เดิมของโปรเจกต์
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  maintainability (สอดคล้องกับ CLAUDE.md)
- ทุกเอกสารที่สร้าง/อัปเดตต้องมี traceability กลับไปยัง FR-xxx/US-xxx
  เสมอ ไม่มีข้อยกเว้น
