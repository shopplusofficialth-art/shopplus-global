# Detailed Design Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ agent `detailed-design-writer` ใน
การสร้าง/ปรับปรุงเอกสาร **`02-design/07-detailed-design.md`** ให้เป็น
**Detailed Design ระดับ conceptual** ที่:

1. อธิบายแต่ละ Feature/Scenario เป็น**ลำดับขั้นตอน (sequence) ที่เป็น
   รูปธรรม** ระหว่าง actor และ layer จริงตาม
   `02-design/03-system-architecture.md` §3 — ไม่ใช่ layer/component
   ระดับภาพรวมแบบที่ `architecture-design-standard` กำหนด
2. อ้างอิง **operation จริง** จาก `02-design/06-api-spec.md` และ
   **entity จริง** จาก `02-design/05-database-schema.md` เท่านั้น — ไม่
   คิด operation/entity ใหม่ขึ้นเอง
3. มี **Sequence Diagram (Mermaid `sequenceDiagram`) เป็นข้อบังคับขั้นต่ำ**
   ทุก scenario — ต่างจาก Interaction Diagram ใน
   `data-api-design-standard` Section B ข้อ 4 ที่เป็นเพียง "แนะนำ ไม่
   บังคับ" สำหรับ operation ที่ซับซ้อนเท่านั้น
4. ยังคง reference กลับไปยัง `FT-xxx`, journey step, ชื่อ Operation, และ
   ชื่อ Entity เพื่อรักษา traceability แม้จะไม่มี ID scheme ใหม่ของตัวเอง
5. แยกความชัดเจนระหว่าง **"sequence ระดับแนวคิด" (ยืนยาว ไม่ผูกกับ
   เทคโนโลยี)** กับ **"ทิศทางเทคนิคปัจจุบัน" (เปลี่ยนได้ ไม่ผูกมัด)** โดย
   เก็บสองส่วนนี้แยกกันชัดเจนในเอกสารเดียว เช่นเดียวกับเอกสารอื่นในสาย
   02-design

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

เช่นเดียวกับทุก skill อื่นในโปรเจกต์ — ถ้าขอบเขตของ scenario, การแตก
branch ของ error flow, หรือการจัดกลุ่ม sub-flow ที่ใช้ร่วมกันหลาย
scenario ยังตีความได้มากกว่าหนึ่งแบบ **ห้ามสมมติเองโดยไม่ถาม**:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนเขียนเอกสารจริง

ตัวอย่างจุดที่มักต้อง trigger ข้อนี้: journey step หนึ่งควรแยกเป็นหลาย
scenario ย่อยหรือรวมเป็น scenario เดียว, error condition หนึ่งควรมี
alternate flow แยกหรือรวมกับ flow หลัก, scenario ที่ใช้ sub-flow ร่วมกัน
ควรอธิบายซ้ำในแต่ละ scenario หรือแยกเป็น "Cross-Scenario Notes"

---

## Section A: Dependency Check (ตรวจสอบก่อนเริ่มงานเสมอ)

ก่อนเริ่มงาน ต้องตรวจสอบว่ามีอยู่จริงและครอบคลุม scope ที่จะทำ (ครบสาย
ทั้ง 5 เอกสาร):

1. `01-requirements/03-feature-list.md` (`FT-xxx`)
2. `02-design/04-user-journey.md` (journey step ต่อ actor)
3. `02-design/03-system-architecture.md` — โดยเฉพาะ §3 "Conceptual
   Architecture Layers" (ชื่อ layer ที่ sequence diagram ต้องใช้) และ §5
   "Data Flow per User Journey"
4. `02-design/05-database-schema.md` — entity ที่ scenario ในรอบนี้จะ
   อ้างอิง
5. `02-design/06-api-spec.md` — operation ที่ scenario ในรอบนี้จะอ้างอิง
   (Operation Name, Request/Response fields, Error/Exception Conditions)

ถ้าไฟล์ใดไฟล์หนึ่งไม่มี หรือมีแต่ไม่ครอบคลุม scope ที่ต้องการ ให้แจ้ง
ผู้ใช้ว่าขาดอะไร แล้วเสนอให้เรียก agent ที่เกี่ยวข้องก่อนตามลำดับที่ขาด
(`feature-list-analyst` → `user-journey-designer` →
`architecture-designer` → `database-schema-designer` →
`api-spec-designer`) — **ห้ามข้ามไปสมมติ Feature/Journey/Layer/Entity/
Operation เอง** (agent นี้ไม่ได้ถูกผนวกเข้า `pipeline-orchestrator` จึง
ต้องทำ dependency check นี้เองทุกครั้งที่ถูกเรียกโดยตรงผ่าน `Shopplus`)

**ความสัมพันธ์กับ `02-design/01-transaction-flow.md` (ถ้ามีอยู่):**
เอกสารนั้นเป็นเอกสารเดิม (pre-agent) ที่ผูกกับ technical stack เฉพาะเจาะจง
อยู่แล้ว (Firebase Authentication, Cloud Functions, Firestore) และ**เป็น
เอกสารแยกอิสระ** จาก `02-design/07-detailed-design.md` — agent นี้**ไม่
แก้ไข** `01-transaction-flow.md` และไม่ต้อง migrate เนื้อหาใด ๆ จากไฟล์
นั้นมา เพียงอ้างอิง (cross-reference) กลับไปในหมวด "Current Technical
Direction (Non-Binding Reference)" ของเอกสารใหม่เท่านั้น

---

## Section B: Plan-then-Confirm Gate (ต้องเสนอแผนก่อนเขียนไฟล์จริงเสมอ)

ก่อนสร้าง/แก้ไข `02-design/07-detailed-design.md` จริง ต้องเสนอแผนให้
ผู้ใช้ยืนยันก่อนเสมอ ประกอบด้วย:

1. **สร้างใหม่ หรือ ปรับปรุงของเดิม**
2. **Feature/Scenario ที่จะครอบคลุมในรอบนี้** — ระบุ `FT-xxx` และ journey
   step ที่จะแตกเป็น scenario (ถ้าผู้ใช้ไม่ระบุ ให้เสนอ "ทุก Feature ที่มี
   operation รองรับใน `02-design/06-api-spec.md` ปัจจุบัน" เป็นค่า
   เริ่มต้น)
3. **รายชื่อ Scenario ที่เสนอต่อ Feature** (เช่น 1 journey step อาจแตกเป็น
   "Happy Path" + "Alternate/Error scenario" กี่แบบ) ให้ผู้ใช้เห็นก่อนลง
   รายละเอียด sequence diagram เต็มรูปแบบ
4. รอการยืนยันจริงจากผู้ใช้ก่อนจึงเขียนไฟล์ — ห้ามข้าม gate นี้แม้ผู้ใช้
   จะขอแบบเร่งด่วน

---

## Section C: Required Output Format (โครงสร้างเอกสารที่ต้องมี)

เอกสาร `02-design/07-detailed-design.md` ต้องมี header block (Version,
Last Updated, Document Owner, Source) และ Revision History table รูปแบบ
เดียวกับเอกสารอื่นในโปรเจกต์ ตามด้วยหัวข้อครบทุกข้อนี้:

### 1. Purpose & Scope (วัตถุประสงค์และขอบเขต)

อธิบายว่าเอกสารนี้เป็น conceptual detailed design ที่ร้อยเรียง
architecture layer, entity, และ operation ที่มีอยู่แล้วให้เห็นเป็น
sequence ต่อ scenario — ไม่ใช่เอกสารที่กำหนด layer/entity/operation ขึ้น
ใหม่ (ชี้ไปยังเอกสารต้นทางแต่ละฉบับ)

### 2. Traceability Map (ตารางเชื่อมโยงต้นทาง)

ตาราง: Feature (`FT-xxx`) | Journey Step | Related Operation(s) (จาก
`06-api-spec.md`) | Related Entity(ies) (จาก `05-database-schema.md`) —
ครอบคลุมทุก Feature ในขอบเขตของรอบนี้ ใช้เป็นจุดเริ่มก่อนลงรายละเอียด
scenario

### 3. Scenario Catalog (รายละเอียดแต่ละ Scenario) — บังคับ

ต่อ 1 scenario ต้องมี:

- **Scenario Name** — เชิงแนวคิด (เช่น "Customer Scans QR — Happy Path",
  "Merchant Rejects Transaction — Alternate Flow")
- **Actors** — ต้องตรงกับ actor ที่มีอยู่จริงใน
  `02-design/04-user-journey.md`/`03-system-architecture.md` §2
- **Preconditions** — เงื่อนไขก่อนเริ่ม scenario
- **Trigger** — journey step/`FT-xxx` ต้นทาง
- **Main Sequence Flow (บังคับ ต้องมีอย่างน้อย 1 diagram)** — Mermaid
  `sequenceDiagram` แสดงการไหลระหว่าง Actor → Experience Layer →
  Orchestration/API Layer → Business Logic Layer → Data Layer ตาม layer
  จริงใน `02-design/03-system-architecture.md` §3 — ทุก message/call ใน
  diagram ต้องอ้างชื่อ **Operation** จริงจาก `06-api-spec.md` และชื่อ
  **Entity** จริงจาก `05-database-schema.md` เท่านั้น ห้ามคิดชื่อใหม่
- **Alternate/Error Flows** — สำหรับแต่ละ Error/Exception Condition ที่
  เกี่ยวข้องซึ่งมีอยู่จริงใน Operation Catalog ของ `06-api-spec.md` ให้
  อธิบาย branch สั้น ๆ (ใช้ Mermaid `sequenceDiagram` เพิ่มเติมได้ถ้า flow
  ซับซ้อนพอ ไม่บังคับสำหรับทุก branch)
- **Postconditions / Outcome** — สถานะของระบบ/ข้อมูลหลัง scenario จบ
- **Business Rules Invoked** — อ้างอิงกฎจาก CLAUDE.md (เช่น SP Point
  conversion, minimum marketing fee) หรือ Business Logic Layer ใน
  Architecture §3 ถ้าเกี่ยวข้อง
- **References** — `FT-xxx`, journey step, ชื่อ Operation, ชื่อ Entity ที่
  ใช้ใน scenario นี้ทั้งหมด

### 4. Cross-Scenario Notes (บันทึกที่ใช้ร่วมกันหลาย Scenario)

สำหรับ sub-flow ที่ปรากฏซ้ำในหลาย scenario (เช่น "Authentication Check"
ที่ทุก scenario เรียกใช้เหมือนกัน) ให้สรุปไว้ที่นี่ครั้งเดียวแทนการอธิบาย
ซ้ำเต็มรูปแบบทุก scenario (แต่ยังต้องระบุใน Main Sequence Flow ว่ามีจุดนี้
เกิดขึ้น)

### 5. Current Technical Direction (Non-Binding Reference) — ทิศทางเทคนิคปัจจุบัน (ไม่ผูกมัด)

Section เดียวที่อนุญาตให้กล่าวถึงชื่อ technology/vendor ได้ — ต้องขึ้นต้น
ด้วยข้อความชัดเจนว่า **"ส่วนนี้สะท้อนทิศทางเทคนิคปัจจุบันตาม CLAUDE.md
หมวด 6 เท่านั้น ไม่ใช่ constraint ของ sequence ระดับแนวคิดข้างต้น และ
เปลี่ยนแปลงได้โดยไม่กระทบลำดับขั้นตอนที่อธิบายไว้"** ตามด้วย
cross-reference ไปยัง `02-design/01-transaction-flow.md` (ถ้ามีอยู่) พร้อม
สรุปสั้น ๆ ว่า scenario แนวคิดใดใน §3 สอดคล้องกับส่วนใดของเอกสารนั้น

### 6. Open Questions / Assumptions (ประเด็นที่ยังไม่ชัดเจน)

รายการสมมติฐานหรือคำถามที่ยังไม่มีคำตอบ พร้อมอ้างอิง Open Question เดิม
จากเอกสารต้นทางถ้าเกี่ยวข้อง

### 7. Revision History

ตาราง Version | Date | Author/Agent | Description of Change — เพิ่ม
entry ใหม่ทุกครั้งที่แก้ไข พร้อมเหตุผล

---

## Section D: Consistency Hook (การเรียก Traceability Auditor)

หลังจากสร้าง/แก้ไข `02-design/07-detailed-design.md` เสร็จแล้ว ต้อง
เรียกใช้ agent `traceability-consistency-auditor` เสมอ (ตาม skill
`traceability-consistency-check`) เพื่อตรวจสอบว่า scenario ที่อธิบายไว้
ยังตรงกับ Feature List, User Journey, Architecture, Database Schema, และ
API Spec เวอร์ชันล่าสุด — โดยเฉพาะถ้า `database-schema-designer` หรือ
`api-spec-designer` แก้ไขหลังจากเอกสารนี้เคยอ้างอิง entity/operation เดิม
ไปแล้ว

---

## Rules (กฎ)

- ห้ามระบุชื่อ technology/vendor/protocol เฉพาะเจาะจงนอกเหนือ Section 5
  (Current Technical Direction) ของเอกสาร
- ห้ามสร้าง Traceability ID scheme ใหม่ (เช่น SEQ-xxx, SC-xxx) — อ้างอิง
  `FT-xxx`, journey step, ชื่อ Operation, และชื่อ Entity ที่มีอยู่จริง
  โดยตรงในเนื้อหา
- ห้ามคิด actor, layer, entity, หรือ operation ใหม่ที่ไม่มีที่มาจาก
  เอกสารต้นทาง (User Journey, Architecture, Database Schema, API Spec) —
  ถ้าจำเป็นต้องมีสิ่งใหม่ ให้ flag "New — แนะนำให้เพิ่มเข้าเอกสารต้นทางที่
  เกี่ยวข้อง" แทนการเพิ่มเงียบ ๆ
- ห้ามแก้ไข `02-design/01-transaction-flow.md`,
  `02-design/02-firestore-data-model.md`,
  `02-design/03-system-architecture.md`,
  `02-design/05-database-schema.md`, หรือ `02-design/06-api-spec.md` —
  agent นี้อ้างอิงได้อย่างเดียว
- ทุก scenario ต้องมี Sequence Diagram (Mermaid `sequenceDiagram`) อย่าง
  น้อย 1 diagram — ห้ามส่งมอบ scenario ที่ไม่มี diagram
- ต้องเสนอแผน (Plan Proposal) และรอการยืนยันจากผู้ใช้ก่อนเขียน/แก้ไขไฟล์
  จริงเสมอ (Section B) — ห้ามข้ามแม้เป็นการแก้ไขเล็กน้อย
- ทุกครั้งที่แก้ไขต้องมี Revision History entry ใหม่ ห้ามแก้แบบเงียบ
- หลังจากสร้าง/แก้ไขเสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` เสมอ ห้ามข้าม (ดู Section D)
- Agent นี้ไม่ได้ถูกผนวกเข้า `pipeline-orchestrator` — ถูกเรียกผ่าน
  `Shopplus` โดยตรงเท่านั้นเมื่อผู้ใช้ร้องขอ
- พิจารณาเสมอ: Agile methodology, PDPA compliance, security-by-design,
  scalability, business value, maintainability (สอดคล้องกับ CLAUDE.md)
