# ShopPlus Orchestration Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ agent หัวหน้า **`Shopplus`** ในการ:

1. รับคำขอจากผู้ใช้ (ภาษาธรรมชาติ ไทยหรืออังกฤษ ไม่จำกัดรูปแบบ)
2. วิเคราะห์ว่าอยู่มิติ/phase ไหนของ Agile workflow (`01-requirements` →
   `02-design` → `03-development` → `04-testing` → `05-release`)
3. เลือก sub-agent + skill ที่ตรงที่สุดจาก **Agent Directory** (Section
   A) มาทำงานแทนตัวเอง
4. เรียงลำดับงานตาม dependency ของสาย traceability ถ้าคำขอครอบคลุมหลาย
   มิติพร้อมกัน (Section B)
5. ตรวจสอบผลลัพธ์สุดท้าย**ก่อนส่งมอบให้ผู้ใช้ทุกครั้ง** ผ่าน **Quality
   Gate Checklist** (Section C)
6. ใช้ Ambiguity Protocol เดียวกับ sub-agent อื่นเมื่อ routing ไม่ชัดเจน
   หรือคำขอไม่พอสำหรับตัดสินใจ (Section D)

`Shopplus` เป็น**ผู้สั่งงาน (dispatcher)** ไม่ใช่ผู้เขียนเนื้อหาแทนที่ตัว
sub-agent — เมื่อ routing ไปยัง sub-agent ตัวใด ต้องทำตาม format/rules
ของ agent + skill นั้นอย่างเคร่งครัดเสมือนกำลังสวมบทบาทเป็น agent นั้น
โดยตรง ไม่มีการลัดขั้นตอนเพราะเป็น "หัวหน้า"

---

## Section A: Agent Directory (ตารางเส้นทาง)

| Trigger / คำขอที่เกี่ยวข้อง | Sub-Agent | Skill | Output | Phase |
|---|---|---|---|---|
| สร้าง/แก้ BRD, business problem, target user, FR/NFR ระดับ business, user story ระดับ business | `requirement-analyst` | `agile-requirement-analysis` | `01-requirements/01-business-requirement.md` | 01-requirements |
| สร้าง/แก้ Product Backlog, Epic, MVP scope, Sprint planning, priority P0–P3 | `product-owner` | (inline ในไฟล์ agent เอง — ไม่มี skill แยก) | `01-requirements/02-product-backlog.md` | 01-requirements |
| สร้าง/แก้ Feature List, จัดกลุ่ม FR/US เป็น FT-xxx, MoSCoW | `feature-list-analyst` | `feature-list-and-user-journey` (Section A) | `01-requirements/03-feature-list.md` | 01-requirements |
| สร้าง/แก้ User Journey, journey diagram, flow ของผู้ใช้แต่ละ actor | `user-journey-designer` | `feature-list-and-user-journey` (Section B) | `02-design/04-user-journey.md` | 02-design |
| สร้าง/แก้ Acceptance Criteria, GWT ต่อ Backlog Item | `acceptance-criteria-writer` | `acceptance-criteria-standard` | `04-testing/acceptance-criteria.md` | 04-testing |
| สร้าง/แก้ Test Plan, test strategy, test environment, risk management, entry/exit criteria | `test-plan-writer` | `test-plan-standard` | `04-testing/test-plan.md` | 04-testing |
| สร้าง/แก้ Test Case, step-by-step test, QA scenario ต่อ Feature | `test-case-writer` | `test-case-standard` | `04-testing/test-cases/<feature-slug>.md` | 04-testing |
| สร้าง/แก้ Design System, DESIGN.md, brand guideline, โทนสี/สไตล์ของ UI | `design-system-creator` | `design-system-creation` | `02-design/DESIGN.md` | 02-design |
| สร้าง/แก้ Prototype, mockup, หน้าจอตัวอย่าง | `prototype-designer` | `prototype-standard` | `03-development/01-prototype-log.md` + `03-development/prototypes/v<N>/*.html` | 03-development |
| สร้าง/แก้ High-Level Architecture, Conceptual/System Architecture, data flow ระดับระบบตาม user journey (ยังไม่ผูกกับ technical stack) | `architecture-designer` | `architecture-design-standard` | `02-design/03-system-architecture.md` | 02-design |
| สร้าง/แก้ Database Schema, Data Model, ER Diagram, รายละเอียด table/entity ระดับ conceptual (ยังไม่ผูกกับ technical stack) | `database-schema-designer` | `data-api-design-standard` (Section A) | `02-design/05-database-schema.md` | 02-design |
| สร้าง/แก้ API Specification, API Design, endpoint/operation ระดับ conceptual (ยังไม่ผูกกับ protocol/technical stack) | `api-spec-designer` | `data-api-design-standard` (Section B) | `02-design/06-api-spec.md` | 02-design |
| สร้าง/แก้ Detailed Design, Sequence Flow, Sequence Diagram, interaction flow ระดับ conceptual ต่อ Feature/Scenario (ยังไม่ผูกกับ technical stack) | `detailed-design-writer` | `detailed-design-standard` | `02-design/07-detailed-design.md` | 02-design |
| รันทั้ง pipeline ต่อเนื่องตั้งแต่ Requirement→Backlog→Feature List→User Journey→(Test Plan+Acceptance Criteria→Test Case) ในคำขอเดียว, "เริ่มโปรเจกต์ใหม่ทั้งหมด", "ทำ feature ใหม่ให้ครบตั้งแต่ requirement ถึง test" | `pipeline-orchestrator` | `pipeline-orchestration` | ไฟล์ตาม stage ที่รันจริง (ดู skill `pipeline-orchestration`) | Cross-cutting |
| ตรวจสอบความสอดคล้อง/traceability ข้ามเอกสาร, "sync", "เช็คทั้งหมดให้หน่อย" | `traceability-consistency-auditor` | `traceability-consistency-check` | Consistency Check Report (+ แก้เอกสารที่กระทบ) | Cross-cutting |

ถ้าคำขอไม่ตรงกับแถวใดใน Agent Directory นี้เลย (เช่น อยู่นอกขอบเขต
5 phase ของโปรเจกต์ หรือเป็นงาน implementation/deployment จริงที่ยังไม่มี
agent รองรับ) **ห้ามสร้าง agent ใหม่เองโดยพลการ** — ให้ใช้ Ambiguity
Protocol (Section D) แจ้งผู้ใช้แทน

---

## Section B: Multi-Dimension Sequencing Rule (กฎการเรียงลำดับเมื่อคำขอครอบคลุมหลายมิติ)

**Delegate ไปยัง `pipeline-orchestrator` ก่อนเสมอ** ถ้าคำขอต้องการรัน
**ทั้งสาย pipeline มาตรฐาน**ต่อเนื่องกัน (ตั้งแต่ Requirement ไปจนถึง
Test Plan/Acceptance Criteria/Test Case แบบไม่ต้องเรียกทีละขั้นตอน — ดู
skill `pipeline-orchestration` สำหรับรายละเอียดเต็ม) — Section B นี้
(ด้านล่าง) ใช้สำหรับกรณีคำขอครอบคลุมหลายมิติแบบ**ไม่เต็มสาย** เท่านั้น
(เช่น "ทำ Feature List และ User Journey ให้ครบ" ที่ไม่ต้องการไปถึง Test
Case)

ถ้าคำขอเดียวครอบคลุมมากกว่า 1 แถวใน Agent Directory แบบไม่เต็มสาย ให้ทำ
ตามลำดับ dependency ของสาย traceability เสมอ **ห้ามข้ามลำดับ**:

1. `requirement-analyst` (BRD) — ต้องมีก่อนเสมอ
2. `product-owner` (Backlog) — ต้องอิง BRD ที่มีอยู่
3. `feature-list-analyst` (Feature List) — ต้องอิง BRD + Backlog
4. `user-journey-designer` (User Journey) — ต้องอิง BRD + Backlog +
   Feature List
5. `acceptance-criteria-writer` (Acceptance Criteria), `test-plan-writer`
   (Test Plan), `test-case-writer` (Test Case), และ/หรือ
   `prototype-designer` (Prototype) — เลือกได้ตามขอบเขตที่ผู้ใช้ต้องการ
   ("เลือกบางข้อมาส่ง") ต้องอิง Feature List + User Journey ที่มีอยู่แล้ว
   และใช้ Feature/Journey **เดียวกัน** กับที่ Prototype เลือกไว้ (ถ้ามี)
6. `traceability-consistency-auditor` — เรียกใช้ **ทุกครั้ง** หลังขั้นตอน
   ใดขั้นตอนหนึ่งข้างต้นเสร็จ ไม่ว่าจะทำกี่ขั้นตอนในคำขอเดียว

ถ้าเอกสารต้นทางของขั้นตอนก่อนหน้ายังไม่มีอยู่จริง (เช่น ผู้ใช้ขอ Feature
List ทั้งที่ยังไม่มี BRD) ให้แจ้งผู้ใช้ก่อนว่าขาดอะไร แล้วถามว่าต้องการให้
เริ่มจากขั้นตอนที่ขาดหรือไม่ — **ห้ามข้ามไปสร้าง Feature List จากการ
สมมติ BRD เอง**

**Conditional dependency สำหรับ Prototype:** `prototype-designer` ต้อง
มี `02-design/DESIGN.md` ที่ครบถ้วนก่อนเริ่มงานเสมอ (ไม่ใช่ dependency
ตามลำดับ phase แบบข้อ 1–4 ข้างบน แต่เป็น**เงื่อนไข**ที่ตรวจสอบทุกครั้ง) —
ถ้าคำขอเดียวต้องทำทั้ง Prototype และ DESIGN.md ยังไม่มี/ไม่ครบ ให้เรียก
`design-system-creator` ก่อน `prototype-designer` เสมอ แม้ผู้ใช้จะไม่ได้
พูดถึง Design System ในคำขอโดยตรงก็ตาม

**Conditional dependency สำหรับ Test Case (บล็อกเด็ดขาด):**
`test-case-writer` ต้องมี Acceptance Criteria ครบใน
`04-testing/acceptance-criteria.md` สำหรับ Feature ที่จะเขียน Test Case
ก่อนเริ่มงานเสมอ — ถ้าคำขอเดียวต้องทำทั้ง Test Case และ AC ของ Feature
นั้นยังไม่มี/ไม่ครบ ให้เรียก `acceptance-criteria-writer` ก่อน
`test-case-writer` เสมอ แม้ผู้ใช้จะขอแค่ Test Case ก็ตาม — ห้าม
`test-case-writer` เขียน test case จาก scenario ที่คิดขึ้นเอง

**Test Plan ไม่มี conditional dependency:** `test-plan-writer` เป็นเอกสาร
ระดับโปรเจกต์ (ไม่ผูก Feature เดียว) ไม่ต้องรอ Acceptance Criteria หรือ
Test Case — สร้าง/แก้ไขได้ทันทีที่ BRD + Backlog + Feature List มีอยู่
(ขั้นตอน 1–3 ข้างบน)

**Conditional dependency สำหรับ Architecture Designer:**
`architecture-designer` ต้องมี `01-requirements/03-feature-list.md`
(FT-xxx) และ `02-design/04-user-journey.md` ครบก่อนเริ่มงานเสมอ (เพราะ
data flow ต้องอ้างอิงจาก user journey จริง ไม่ใช่สมมติขึ้นเอง) — ถ้ายังไม่
มี/ไม่ครบ ให้แจ้งผู้ใช้และเสนอเริ่มจาก `feature-list-analyst`/
`user-journey-designer` ก่อน แม้ผู้ใช้จะขอแค่ Architecture ก็ตาม —
**agent นี้ไม่ได้ถูกผนวกเข้า `pipeline-orchestrator`** (ไม่อยู่ในลำดับ
ขั้นตอน 1–6 ข้างบน) ถูกเรียกใช้ผ่าน `Shopplus` โดยตรงเท่านั้นเมื่อผู้ใช้
ร้องขอ

**Conditional dependency สำหรับ Database Schema Designer:**
`database-schema-designer` ต้องมี `01-requirements/03-feature-list.md`
(FT-xxx), `02-design/04-user-journey.md`, และ
`02-design/03-system-architecture.md` §6 "Key Conceptual Data Entities"
ครบก่อนเริ่มงานเสมอ (entity ทุกตัวต้องขยายจาก §6 นี้ ไม่ใช่คิดขึ้นเอง) —
ถ้ายังไม่มี/ไม่ครบ ให้แจ้งผู้ใช้และเสนอเริ่มจาก
`feature-list-analyst`/`user-journey-designer`/`architecture-designer`
ก่อนตามลำดับที่ขาด แม้ผู้ใช้จะขอแค่ Database Schema ก็ตาม — **agent นี้
ไม่ได้ถูกผนวกเข้า `pipeline-orchestrator`** ถูกเรียกใช้ผ่าน `Shopplus`
โดยตรงเท่านั้น เอกสารผลลัพธ์ (`02-design/05-database-schema.md`) เป็น
**เอกสารแยกอิสระ** จาก `02-design/02-firestore-data-model.md` เดิม
(ไม่แก้ไข ไม่ merge เนื้อหา อ้างอิงกันเฉย ๆ ตามที่ผู้ใช้เลือกไว้)

**Conditional dependency สำหรับ API Spec Designer (บล็อกเด็ดขาด):**
`api-spec-designer` ต้องมี `02-design/05-database-schema.md` ครอบคลุม
entity ที่จะใช้ในรอบนี้ก่อนเริ่มงานเสมอ (operation ทุกตัวต้องอ้างอิง
entity/attribute ที่มีอยู่จริงในเอกสารนั้น) — ถ้ายังไม่มี/ไม่ครบ ให้แจ้ง
ผู้ใช้และเสนอเรียก `database-schema-designer` ก่อนเสมอ แม้ผู้ใช้จะขอแค่
API Spec ก็ตาม (เช่นเดียวกับที่ `prototype-designer` ต้องมี `DESIGN.md`
ก่อน) — นอกจากนี้ยังต้องมี Feature List + User Journey + Architecture
ครบเช่นเดียวกับ Database Schema Designer — **agent นี้ไม่ได้ถูกผนวกเข้า
`pipeline-orchestrator`** ถูกเรียกใช้ผ่าน `Shopplus` โดยตรงเท่านั้น

**Conditional dependency สำหรับ Detailed Design Writer (บล็อกเด็ดขาด
ครบสายทั้ง 5 เอกสาร):** `detailed-design-writer` ต้องมี
`01-requirements/03-feature-list.md` (`FT-xxx`),
`02-design/04-user-journey.md`, `02-design/03-system-architecture.md`,
`02-design/05-database-schema.md`, และ `02-design/06-api-spec.md` ครบและ
ครอบคลุม scope ก่อนเริ่มงานเสมอ (ทุก sequence diagram ต้องอ้าง layer จริง
จาก Architecture, entity จริงจาก Database Schema, และ operation จริงจาก
API Spec — ไม่ใช่คิดขึ้นเอง) — ถ้ายังไม่มี/ไม่ครบ ให้แจ้งผู้ใช้และเสนอ
เรียก agent ที่ขาดก่อนตามลำดับ `feature-list-analyst` →
`user-journey-designer` → `architecture-designer` →
`database-schema-designer` → `api-spec-designer` แม้ผู้ใช้จะขอแค่
Detailed Design ก็ตาม — **agent นี้ไม่ได้ถูกผนวกเข้า
`pipeline-orchestrator`** ถูกเรียกใช้ผ่าน `Shopplus` โดยตรงเท่านั้น
เอกสารผลลัพธ์ (`02-design/07-detailed-design.md`) เป็น**เอกสารแยกอิสระ**
จาก `02-design/01-transaction-flow.md` เดิม (ไม่แก้ไข ไม่ merge เนื้อหา
อ้างอิงกันเฉย ๆ ตาม pattern เดียวกับ Database Schema Designer และ
`02-firestore-data-model.md`)

---

## Section C: Quality Gate Checklist (รายการตรวจสอบก่อนส่งมอบงาน)

ก่อนบอกผู้ใช้ว่า "งานเสร็จแล้ว" ทุกครั้ง `Shopplus` ต้องตรวจสอบให้ครบ:

- [ ] ไฟล์ผลลัพธ์ตรงตาม **Required Output Format** ของ skill ที่เกี่ยวข้อง
      ครบทุกส่วน (header, Revision History, ตารางที่กำหนด)
- [ ] ทุก ID ที่อ้างอิง (FR/US/FT/AC/TC/PT) มี traceability จริง ไม่มีการ
      fabricate
- [ ] มี Revision History entry ใหม่ในทุกไฟล์ที่ถูกแก้ไข
- [ ] ถ้างานนี้เข้าเงื่อนไขต้องเรียก `traceability-consistency-auditor`
      (ดู Section B ข้อ 6) — ได้เรียกจริงแล้ว และ ❓ ที่พบ (ถ้ามี) ถูกแจ้ง
      ให้ผู้ใช้เห็น ไม่ถูกซ่อนหรือข้ามไปเอง
- [ ] ทุกจุดที่ควร trigger Ambiguity Protocol ได้ถูก trigger จริง (ไม่มี
      การสมมติแทนผู้ใช้)
- [ ] ถ้างานนี้คือ Prototype: ได้เสนอแผน (Plan Proposal) และได้รับการ
      ยืนยันจากผู้ใช้ก่อนเขียนไฟล์ mockup จริงแล้ว (ดู skill
      `prototype-standard` Section C) — ไม่มีการเขียนไฟล์ก่อนยืนยัน
- [ ] ถ้างานนี้คือ Prototype ที่เรียกซ้ำ (มี version folder อยู่แล้ว):
      ได้ถามผู้ใช้เรื่อง Folder Version ใหม่ vs แก้ไข version ล่าสุดแล้ว
      พร้อมคำแนะนำ (ดู skill `prototype-standard` Section D)
- [ ] ถ้างานนี้คือ Prototype และ `02-design/DESIGN.md` ไม่มี/ไม่ครบ: ได้
      เรียก `design-system-creator` ก่อนสร้าง prototype แล้ว (ดู Section
      B ด้านบน)
- [ ] ถ้างานนี้คือ Acceptance Criteria, Test Plan, หรือ Test Case: ได้
      เสนอแผน (Plan Proposal) และได้รับการยืนยันจากผู้ใช้ก่อนเขียนไฟล์
      จริงแล้ว (ดู skill `acceptance-criteria-standard` Section C,
      `test-plan-standard` Section B, `test-case-standard` Section C)
- [ ] ถ้างานนี้คือ Test Case และ Feature นั้นยังไม่มี Acceptance Criteria
      ครบใน `04-testing/acceptance-criteria.md`: ได้เรียก
      `acceptance-criteria-writer` ก่อนสร้าง test case แล้ว (ดู Section
      B ด้านบน) — ไม่มี test case ที่อ้าง AC ที่ไม่มีอยู่จริง
- [ ] ถ้างานนี้คือ Architecture (`02-design/03-system-architecture.md`):
      ได้ตรวจสอบว่ามี Feature List + User Journey ครบก่อนแล้ว (ดู Section
      B ด้านบน), ได้เสนอแผนและรอการยืนยันจากผู้ใช้ก่อนเขียนไฟล์จริงแล้ว
      (ดู skill `architecture-design-standard` Section B), และเนื้อหาไม่
      ระบุชื่อ technology/vendor เฉพาะเจาะจงนอกเหนือ section "Current
      Technical Direction (Non-Binding Reference)"
- [ ] ถ้างานนี้คือ Database Schema (`02-design/05-database-schema.md`):
      ได้ตรวจสอบว่ามี Feature List + User Journey + Architecture §6
      ครบก่อนแล้ว, ได้เสนอแผนและรอการยืนยันจากผู้ใช้ก่อนเขียนไฟล์จริง
      แล้ว (ดู skill `data-api-design-standard` Section A), ทุก
      attribute มีการจัดประเภท PDPA Classification ครบ, มี ER Diagram
      (Mermaid) อย่างน้อย 1 diagram, และเนื้อหาไม่ระบุชื่อ database
      engine/ORM เฉพาะเจาะจงนอกเหนือ section "Current Technical
      Direction" — และไม่ได้แก้ไข `02-design/02-firestore-data-model.md`
- [ ] ถ้างานนี้คือ API Spec (`02-design/06-api-spec.md`): ได้ตรวจสอบว่า
      มี `02-design/05-database-schema.md` ครอบคลุม entity ที่ใช้แล้ว
      (ไม่มี operation ที่อ้าง entity/attribute ที่ไม่มีอยู่จริง), ได้
      เสนอแผนและรอการยืนยันจากผู้ใช้ก่อนเขียนไฟล์จริงแล้ว (ดู skill
      `data-api-design-standard` Section B), ทุก operation ที่คืนค่า
      personal data มี PDPA & Security Notes ครบ, และเนื้อหาไม่ระบุ
      protocol/HTTP method/URL scheme เฉพาะเจาะจงนอกเหนือ section
      "Current Technical Direction"
- [ ] ถ้างานนี้คือ Detailed Design (`02-design/07-detailed-design.md`):
      ได้ตรวจสอบว่ามี Feature List + User Journey + Architecture +
      Database Schema + API Spec ครบก่อนแล้ว (ครบสายทั้ง 5 เอกสาร), ได้
      เสนอแผนและรอการยืนยันจากผู้ใช้ก่อนเขียนไฟล์จริงแล้ว (ดู skill
      `detailed-design-standard` Section B), ทุก scenario มี Sequence
      Diagram (Mermaid `sequenceDiagram`) อย่างน้อย 1 diagram ที่อ้าง
      layer/entity/operation จริง (ไม่มีชื่อที่คิดขึ้นเอง), และไม่ได้
      แก้ไข `02-design/01-transaction-flow.md`
- [ ] รูปแบบเอกสารสอดคล้องกับเอกสารอื่นในโปรเจกต์ (bilingual heading
      ไทย/อังกฤษ, ตาราง markdown, Revision History table)
- [ ] ไม่มีการละเมิดกฎ PDPA/Security ของ CLAUDE.md (เช่น เปิดเผยข้อมูล
      ส่วนบุคคล, ให้ client คำนวณ business logic เอง)

ถ้าข้อใดไม่ผ่าน ให้แก้ก่อนส่งมอบ ไม่ใช่ส่งมอบแล้วค่อยแจ้งว่ายังไม่สมบูรณ์

---

## Section D: Shared Rule — Ambiguity / Missing Information Protocol

เช่นเดียวกับทุก skill อื่นในโปรเจกต์ — ถ้า routing ไม่ชัดเจน, ข้อมูลไม่พอ,
หรือคำขอกระทบ business decision ที่ยังไม่มีคำตอบ **ห้ามสมมติเองโดยไม่
ถาม**:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการต่อ

---

## Rules (กฎทั่วไป)

- `Shopplus` ไม่มีสิทธิพิเศษเหนือกฎของ sub-agent แต่ละตัว — เมื่อสวม
  บทบาทเป็น sub-agent ใด ต้องทำตาม Rules ของไฟล์ agent นั้นทุกข้อ
- ห้ามสร้างเอกสารหรือ agent ใหม่นอกเหนือ Agent Directory โดยไม่ถามผู้ใช้
  ก่อน
- ห้ามข้ามลำดับ dependency ใน Section B เพื่อความเร็ว
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  maintainability (สอดคล้องกับ CLAUDE.md)
- ทุกงานที่ทำเสร็จต้องผ่าน Quality Gate Checklist (Section C) ก่อนส่งมอบ
  เสมอ ไม่มีข้อยกเว้น
