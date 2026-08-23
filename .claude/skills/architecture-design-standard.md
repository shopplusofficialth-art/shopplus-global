# Architecture Design Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ agent `architecture-designer` ในการ
สร้าง/ปรับปรุงเอกสาร **`02-design/03-system-architecture.md`** ให้เป็น
**High-Level Architecture ระดับ conceptual** ที่:

1. อธิบายระบบเป็น layer/component ตามความรับผิดชอบ (responsibility) ไม่ใช่
   ตามชื่อ technology/product เฉพาะเจาะจง
2. อธิบาย **data flow ตาม user journey จริง** ที่มีอยู่ใน
   `02-design/04-user-journey.md` — ไม่ใช่ flow ที่คิดขึ้นเองแยกจาก
   journey ที่ทีมออกแบบไว้แล้ว
3. ยังคง reference กลับไปยัง `FT-xxx` (Feature List) และ journey step
   เพื่อรักษา traceability แม้จะไม่มี ID scheme ใหม่ของตัวเอง
4. แยกความชัดเจนระหว่าง **"แนวคิดสถาปัตยกรรม" (ยืนยาว ไม่ผูกกับ
   เทคโนโลยี)** กับ **"ทิศทางเทคนิคปัจจุบัน" (เปลี่ยนได้ ไม่ผูกมัด)** โดย
   เก็บสองส่วนนี้แยกกันชัดเจนในเอกสารเดียว

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

เช่นเดียวกับทุก skill อื่นในโปรเจกต์ — ถ้าการแบ่ง layer/component,
ขอบเขตความรับผิดชอบ, หรือ data flow ใดยังตีความได้มากกว่าหนึ่งแบบ
**ห้ามสมมติเองโดยไม่ถาม**:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนเขียนเอกสารจริง

ตัวอย่างจุดที่มักต้อง trigger ข้อนี้: การแบ่งว่า AI/Intelligence ควรเป็น
layer แยกหรือรวมกับ Business Logic, การจัดกลุ่ม component ที่คลุมเครือ,
หรือ data flow ที่ journey ปัจจุบันบรรยายไม่ครบทุกจุดตัดสินใจ

---

## Section A: Dependency Check (ตรวจสอบก่อนเริ่มงานเสมอ)

ก่อนเริ่มงาน ต้องตรวจสอบว่ามีอยู่จริงและครอบคลุม scope ที่จะทำ:

1. `01-requirements/03-feature-list.md` — มี FT-xxx ของ feature ที่จะรวม
   ไว้ใน architecture ครั้งนี้
2. `02-design/04-user-journey.md` — มี journey step/diagram ของ actor ที่
   เกี่ยวข้องกับ feature นั้น

ถ้าไฟล์ใดไฟล์หนึ่งไม่มี หรือมีแต่ไม่ครอบคลุม scope ที่ต้องการ ให้แจ้งผู้ใช้
ว่าขาดอะไร แล้วเสนอให้เรียก `feature-list-analyst`/`user-journey-designer`
ก่อน — **ห้ามข้ามไปสมมติ Feature/Journey เอง** (agent นี้ไม่ได้ถูกผนวกเข้า
`pipeline-orchestrator` จึงต้องทำ dependency check นี้เองทุกครั้งที่ถูก
เรียกโดยตรงผ่าน `Shopplus`)

ถ้า `02-design/03-system-architecture.md` มีอยู่แล้ว ให้ตรวจสอบเพิ่มเติมว่า
เนื้อหาปัจจุบันผูกกับ technology/vendor เฉพาะเจาะจงหรือไม่ (เช่น ระบุชื่อ
cloud provider, framework, database engine ใน section หลัก) — ถ้าใช่ ให้
วางแผนย้ายรายละเอียดเหล่านั้นไปยัง section "Current Technical Direction
(Non-Binding Reference)" ตาม Section C ด้านล่าง แทนที่จะลบทิ้งเงียบ ๆ

---

## Section B: Plan-then-Confirm Gate (ต้องเสนอแผนก่อนเขียนไฟล์จริงเสมอ)

ก่อนสร้าง/แก้ไข `02-design/03-system-architecture.md` จริง ต้องเสนอแผนให้
ผู้ใช้ยืนยันก่อนเสมอ ประกอบด้วย:

1. **สร้างใหม่ หรือ ปรับปรุงของเดิม** — ถ้าปรับปรุงของเดิม ให้สรุปว่า
   ส่วนไหนจะคงไว้, ส่วนไหนจะปรับเป็น conceptual, และรายละเอียด
   technology เดิม (ถ้ามี) จะถูกย้ายไปไว้ที่ section ใด
2. **Feature/Journey ที่จะครอบคลุม** — ระบุ FT-xxx และ journey ที่จะใช้เป็น
   ที่มาของ data flow ในรอบนี้ (ถ้าผู้ใช้ไม่ได้ระบุ ให้ถามหรือเสนอ ครอบคลุม
   "ทุก Feature ที่มีอยู่ใน Feature List ปัจจุบัน" เป็นค่าเริ่มต้น)
3. **โครง Layer/Component ที่จะใช้** — เสนอโครงสร้าง layer เบื้องต้น (ดู
   Section C) ให้ผู้ใช้เห็นก่อนลงรายละเอียด
4. รอการยืนยันจริงจากผู้ใช้ก่อนจึงเขียนไฟล์ — ห้ามข้าม gate นี้แม้ผู้ใช้จะ
   ขอแบบเร่งด่วน

---

## Section C: Required Output Format (โครงสร้างเอกสารที่ต้องมี)

เอกสาร `02-design/03-system-architecture.md` ต้องมี header block
(Version, Last Updated, Document Owner) และ Revision History table
รูปแบบเดียวกับเอกสารอื่นในโปรเจกต์ ตามด้วยหัวข้อครบทุกข้อนี้:

### 1. Purpose & Scope (วัตถุประสงค์และขอบเขต)

อธิบายว่าเอกสารนี้ให้มุมมอง conceptual/technology-agnostic ของระบบ และ
ไม่ครอบคลุมรายละเอียด schema/API/infrastructure จริง (ระบุว่าเอกสารแยก
ใดครอบคลุมส่วนนั้นถ้ามี เช่น `02-design/02-firestore-data-model.md`)

### 2. Actors & External Roles (ผู้มีส่วนเกี่ยวข้อง)

รายชื่อ actor/role ระดับแนวคิด (เช่น Customer, Merchant, Admin,
Notification Channel, External Verification Service) — ต้องตรงกับ actor
ที่ปรากฏใน `02-design/04-user-journey.md` ห้ามเพิ่ม actor ใหม่ที่ journey
ไม่มี

### 3. Conceptual Architecture Layers (Layer ระดับแนวคิด)

แบ่งระบบเป็น layer ตามความรับผิดชอบ (ตัวอย่างชุด layer ที่ใช้ได้ทั่วไป —
ปรับตามบริบทจริงได้ ไม่ใช่ตายตัว):

- **Experience Layer** — จุดที่ผู้ใช้โต้ตอบกับระบบ (เว็บ/มือถือ) — เฉพาะ
  presentation + user interaction ตาม CLAUDE.md หมวด 6
- **Orchestration / API Layer** — จุดรับคำขอและส่งต่อไปยัง business logic
- **Business Logic Layer** — กฎทางธุรกิจ (transaction, reward, marketing
  fee) — ต้องระบุว่า business logic ทำงานฝั่ง backend เท่านั้น (ตาม
  CLAUDE.md หมวด 6)
- **Data & Ledger Layer** — การจัดเก็บข้อมูลเชิงแนวคิด (ไม่ใช่ schema จริง)
- **Intelligence / Analytics Layer** — ความสามารถด้าน AI/insight (ถ้ามี)
- **Cross-Cutting: Security, Audit & Compliance** — authentication,
  authorization, audit trail, PDPA

ห้ามระบุชื่อ technology/vendor ในหัวข้อนี้ — อธิบายด้วยความรับผิดชอบ
(responsibility) เท่านั้น

### 4. High-Level Component Diagram (แผนภาพระดับสูง)

แผนภาพ text-based (ASCII) แสดงกล่อง layer/component ตามข้อ 3 และทิศทาง
การไหลของคำขอในภาพรวม — ใช้ชื่อ layer แบบ conceptual เท่านั้น

### 5. Data Flow per User Journey (การไหลของข้อมูลตาม User Journey)

สำหรับแต่ละ journey/feature ที่อยู่ใน scope (ตาม Plan ที่ยืนยันไว้) ให้ไล่
ตามลำดับ: จุดเริ่มต้น (trigger) → ข้อมูลที่ถูกเก็บ/ส่ง → การตรวจสอบ →
การประมวลผลที่ business logic layer → การบันทึกที่ data layer →
ผลลัพธ์/การแจ้งเตือนกลับ → ผลกระทบต่อ reward/analytics (ถ้ามี)

ทุก flow ต้องอ้างอิง **FT-xxx** และ **journey step/actor** ที่มีอยู่จริงใน
`02-design/04-user-journey.md` กำกับไว้ท้ายแต่ละ flow (เช่น "อ้างอิง:
FT-005, Journey — Merchant Approves Transaction") — ถ้าพบว่าต้องมี flow
ที่ journey ปัจจุบันไม่ครอบคลุม ให้ flag "New — แนะนำให้เพิ่มเข้า User
Journey/BRD" แทนการเพิ่มเอง

### 6. Key Conceptual Data Entities (ข้อมูลหลักระดับแนวคิด)

รายการ entity เชิงแนวคิด (เช่น User Identity, Transaction Record, Reward
Ledger Entry, Marketing Fee Allocation, Audit Entry) พร้อมคำอธิบายสั้น ๆ
ว่าคืออะไรและสัมพันธ์กับ entity อื่นอย่างไร — **ไม่ระบุ field-level
schema** (schema จริงอยู่ในเอกสารแยกถ้ามี)

### 7. Cross-Cutting Concerns (ประเด็นที่เกี่ยวข้องทุก layer)

- Security & Access Control — บทบาท conceptual (Customer/Merchant/Admin)
  และหลักการ RBAC โดยไม่ระบุกลไก implementation เฉพาะเจาะจง
- PDPA & Data Minimization — สอดคล้องกับ CLAUDE.md หมวด 10
- Auditability — หลักการว่าทุก action สำคัญต้องมี audit trail
- Scalability Principles — หลักการรองรับการขยายตัว (ไม่ระบุ
  infrastructure จริง)

### 8. Current Technical Direction (Non-Binding Reference) — ทิศทางเทคนิคปัจจุบัน (ไม่ผูกมัด)

Section เดียวที่อนุญาตให้กล่าวถึงชื่อ technology/vendor ได้ — ต้องขึ้นต้น
ด้วยข้อความชัดเจนว่า **"ส่วนนี้สะท้อนทิศทางเทคนิคปัจจุบันตาม CLAUDE.md
หมวด 6 เท่านั้น ไม่ใช่ constraint ของ architecture ระดับแนวคิดข้างต้น
และเปลี่ยนแปลงได้โดยไม่กระทบโครงสร้าง layer/data flow ที่อธิบายไว้"**
ตามด้วยรายการ technology ปัจจุบัน (ถ้ามีรายละเอียดเดิมจากเอกสารก่อนหน้าที่
มีคุณค่า เช่น รายชื่อ Firestore collection ระดับสูง ให้สรุปไว้ที่นี่และ
ชี้ไปยังเอกสารเทคนิคแยกถ้ามี เช่น `02-design/02-firestore-data-model.md`)

### 9. Open Questions / Assumptions (ประเด็นที่ยังไม่ชัดเจน)

รายการสมมติฐานหรือคำถามที่ยังไม่มีคำตอบ พร้อมอ้างอิง Open Question เดิม
จาก BRD ถ้าเกี่ยวข้อง (ตาม convention การอ้างอิง cross-cutting Open
Question ของโปรเจกต์)

### 10. Revision History

ตาราง Version | Date | Author/Agent | Description of Change — เพิ่ม entry
ใหม่ทุกครั้งที่แก้ไข พร้อมเหตุผล

---

## Section D: Consistency Hook (การเรียก Traceability Auditor)

หลังจากสร้าง/แก้ไข `02-design/03-system-architecture.md` เสร็จแล้ว ต้อง
เรียกใช้ agent `traceability-consistency-auditor` เสมอ (ตาม skill
`traceability-consistency-check`) เพื่อตรวจสอบว่า data flow/component ที่
อธิบายไว้ยังตรงกับ Feature List และ User Journey เวอร์ชันล่าสุด — โดยเฉพาะ
ถ้าเป็นการแก้ไขที่กระทบ FT-xxx หรือ journey step ที่มีอยู่เดิม

---

## Rules (กฎ)

- ห้ามระบุชื่อ technology/vendor เฉพาะเจาะจงนอกเหนือ Section 8 (Current
  Technical Direction) ของเอกสาร
- ห้ามสร้าง Traceability ID scheme ใหม่ (เช่น ARCH-xxx, COMP-xxx, DF-xxx)
  — อ้างอิง FT-xxx และ journey step ที่มีอยู่จริงโดยตรงในเนื้อหา
- ห้ามสมมติ data flow, component, หรือ actor ที่ไม่มีที่มาจาก Feature
  List/User Journey ที่มีอยู่จริง — ถ้าจำเป็นต้องมีสิ่งใหม่ ให้ flag "New —
  แนะนำให้เพิ่มเข้า User Journey/BRD" ตาม convention เดิมของโปรเจกต์
- ห้ามระบุ field-level database schema ในเอกสารนี้ — ถ้าต้องการรายละเอียด
  schema จริง ให้ชี้ไปยังเอกสารเทคนิคแยก (สร้างแยกถ้ายังไม่มี ไม่ใช่ปนไว้
  ในเอกสารนี้)
- ต้องเสนอแผน (Plan Proposal) และรอการยืนยันจากผู้ใช้ก่อนเขียน/แก้ไขไฟล์
  จริงเสมอ (Section B) — ห้ามข้ามแม้เป็นการแก้ไขเล็กน้อย
- ทุกครั้งที่แก้ไขต้องมี Revision History entry ใหม่ ห้ามแก้แบบเงียบ
- หลังจากสร้าง/แก้ไขเสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` เสมอ ห้ามข้าม
- พิจารณาเสมอ: Agile methodology, PDPA compliance, security-by-design,
  scalability, business value, maintainability (สอดคล้องกับ CLAUDE.md)
