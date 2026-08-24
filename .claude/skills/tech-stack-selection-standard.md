# Tech Stack Selection Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ agent `tech-stack-selector` ในการ
สร้าง/ปรับปรุงเอกสาร **`02-design/08-tech-stack.md`** ให้เป็นเอกสาร**เดียว
ในสาย 02-design ที่ระบุชื่อ technology/vendor/library เฉพาะเจาะจงได้
โดยตรง** โดย:

1. **สัมภาษณ์ผู้ใช้แบบเข้มข้น (Intensive Interview)** ก่อนเสนอคำแนะนำ
   ใด ๆ — ครอบคลุมขนาดธุรกิจ, ทีม, งบประมาณ, timeline, แพลตฟอร์ม,
   non-functional requirement, compliance, และ third-party integration
   (Section B)
2. ปฏิบัติต่อ Firebase/Firestore/Cloud Functions/Web+Mobile target ตาม
   CLAUDE.md หมวด 6 เป็น **fixed constraint** ไม่ใช่ตัวเลือกที่ต้องถามซ้ำ
3. สำหรับทุก decision point ที่เหลือ (ยังไม่ถูกกำหนดโดย CLAUDE.md) ต้อง
   เสนอ **อย่างน้อย 3 ตัวเลือก** พร้อมเหตุผล/ข้อดี/ข้อเสีย และคำแนะนำ 1
   ตัวเลือก ให้ผู้ใช้เป็นผู้ตัดสินใจสุดท้ายเสมอ (Section D "Decision
   Matrix") — นี่คือ **วิธีทำงานหลัก** ของ skill นี้ ไม่ใช่ edge case ที่
   ทำเฉพาะตอนกำกวม
4. เก็บผลการสัมภาษณ์และ Decision Matrix ไว้ในเอกสารเดียวที่ตรวจสอบย้อนได้
   (traceable) กลับไปยัง `FT-xxx`, layer, entity, และ operation ที่มีอยู่
   จริงในเอกสารต้นทาง

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

เช่นเดียวกับทุก skill อื่นในโปรเจกต์ — ถ้า decision point ใดยังตีความได้
มากกว่าหนึ่งแบบ **ห้ามสมมติเองโดยไม่ถาม**:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนเขียนเอกสารจริง

ต่างจาก skill อื่นตรงที่ **skill นี้ trigger กฎนี้กับทุก decision point
ของ tech stack โดยปริยาย** (ไม่ใช่รอจนกำกวม) ยกเว้นรายการที่ CLAUDE.md
หมวด 6 กำหนดไว้แล้วเป็น fixed constraint (ดู Section A)

---

## Section A: Dependency Check & Fixed Constraints (ตรวจสอบก่อนเริ่มงานเสมอ)

### A.1 Dependency Check (บล็อกเด็ดขาด)

ก่อนเริ่มงาน ต้องตรวจสอบว่ามีอยู่จริงและครอบคลุม scope ที่จะทำ:

1. `01-requirements/03-feature-list.md` (`FT-xxx`)
2. `02-design/04-user-journey.md`
3. `02-design/03-system-architecture.md`
4. `02-design/05-database-schema.md`
5. `02-design/06-api-spec.md`

ถ้าไฟล์ใดไฟล์หนึ่งไม่มี หรือมีแต่ไม่ครอบคลุม scope ที่ต้องการ ให้แจ้ง
ผู้ใช้ว่าขาดอะไร แล้วเสนอให้เรียก agent ที่เกี่ยวข้องก่อนตามลำดับที่ขาด
(`feature-list-analyst` → `user-journey-designer` →
`architecture-designer` → `database-schema-designer` →
`api-spec-designer`) — **ห้ามข้ามไปแนะนำ stack จากการสมมติรูปทรงระบบเอง**
(agent นี้ไม่ได้ถูกผนวกเข้า `pipeline-orchestrator` จึงต้องทำ dependency
check นี้เองทุกครั้งที่ถูกเรียกโดยตรงผ่าน `Shopplus`)

เหตุผลของ dependency นี้: ปริมาณ entity, ความซับซ้อนของ operation, และ
data flow จริงใน 5 เอกสารนี้เป็นข้อมูลจำเป็นสำหรับให้เหตุผล Decision
Matrix ที่แม่นยำ (เช่น จำนวน operation ที่ต้องเป็น real-time มีผลต่อการ
เลือก state management/caching strategy)

### A.2 Fixed Technical Constraints (ข้อจำกัดที่ตัดสินใจแล้ว — ห้ามถามซ้ำ)

CLAUDE.md หมวด 6 กำหนดไว้แล้วว่า:

- **Backend:** Firebase, Firestore, Cloud Functions
- **Frontend target:** Web Application + Mobile Application

รายการนี้เป็น **fixed/non-negotiable** — ห้ามนำมาเป็นคำถามใน Interview
(Section B) และห้ามใส่เป็นตัวเลือกใน Decision Matrix (Section D) ยกเว้น
ผู้ใช้ร้องขอให้ทบทวนสิ่งเหล่านี้เองอย่างชัดเจน (ดู agent
`tech-stack-selector` Rules เรื่อง "Deviation from CLAUDE.md")

**ความสัมพันธ์กับเอกสารเดิม (pre-agent) ที่ผูกกับ Firebase อยู่แล้ว:**
`02-design/01-transaction-flow.md` และ
`02-design/02-firestore-data-model.md` เป็นเอกสารแยกอิสระจาก
`02-design/08-tech-stack.md` — agent นี้ไม่แก้ไขเอกสารเหล่านั้น เพียง
cross-reference กลับไปในหมวด "Fixed Technical Constraints" ของเอกสารใหม่
เท่านั้น

---

## Section B: Intensive Interview Protocol (หมวดคำถามที่ต้องถามให้ครบ)

ก่อนเสนอ Decision Matrix ใด ๆ ต้องถามผู้ใช้ให้ครบทุกหมวดที่เกี่ยวข้องกับ
ขอบเขตที่เลือกทำ (อนุญาต "เลือกบางข้อมาส่ง" ตาม CLAUDE.md ข้อ 7.7 — แต่
หมวดที่ยังไม่ตอบต้องถูกบันทึกเป็น Open Question ไม่ใช่สมมติแทน) ถามเป็น
ชุดคำถามที่เป็นรูปธรรม ไม่ใช่คำถามเปิดกว้างลอย ๆ:

### B1. Business Scale & Growth (ขนาดธุรกิจและการเติบโต)
- จำนวน merchant และ customer ที่คาดหวังใน 6–12 เดือนแรก และปีที่ 2–3
- ปริมาณ transaction/reward ต่อวัน (average และ peak)
- ขอบเขตพื้นที่ให้บริการ (เฉพาะไทย / ภูมิภาค / นานาชาติ) — กระทบ data
  residency ตาม PDPA
- งบประมาณโครงสร้างพื้นฐาน (infra/SaaS budget) ต่อเดือน

### B2. Team & Delivery Constraints (ทีมและข้อจำกัดการพัฒนา)
- ขนาดทีม dev และความเชี่ยวชาญที่มีอยู่แล้ว (framework/language ที่ทีม
  คุ้นเคย)
- Timeline ที่ต้องการ (วันเปิดตัว MVP)
- แผนดูแลรักษาระยะยาว (ทีม in-house ต่อเนื่อง vs ส่งมอบให้ทีมอื่น/จบ
  โครงการ)

### B3. Platform & Device Targets (เป้าหมายแพลตฟอร์มและอุปกรณ์)
- Web: ต้องรองรับ browser ใดบ้าง, ต้องการ PWA หรือไม่
- Mobile: iOS/Android/ทั้งสอง, native แยกแพลตฟอร์มหรือ cross-platform,
  หรือ PWA เพียงพอหรือไม่
- Admin: ใช้ web app ร่วมกับ merchant app หรือแยก dashboard ต่างหาก

### B4. Non-Functional Requirements (ข้อกำหนดที่ไม่ใช่ functional)
- ความจำเป็นของ offline support (พื้นที่ร้านค้าที่สัญญาณเน็ตไม่แรง)
- Real-time requirement (เช่น คะแนนต้องอัปเดตทันทีหลังสแกน QR หรือรอได้)
- Performance/scale target (concurrent users, response time ที่ยอมรับได้)
- Accessibility requirement

### B5. Compliance & Security Tooling (PDPA และความปลอดภัย)
- Data residency requirement นอกเหนือจาก Firebase region default
- ความจำเป็นของ audit logging/monitoring เฉพาะสำหรับข้อมูลส่วนบุคคล
- ระดับ authentication ที่ต้องการ (OTP/MFA)

### B6. Third-Party Integrations (บริการภายนอกที่ต้องเชื่อมต่อ)
- Payment gateway (ถ้ามีในสโคป)
- SMS/OTP provider
- Push notification service
- Analytics / crash reporting
- Map/Location (ถ้าต้องมีค้นหาร้านค้าใกล้ฉัน)

### B7. DevOps & Delivery Tooling (เครื่องมือ dev/deploy)
- CI/CD ที่ต้องการหรือมีอยู่แล้ว
- Testing tools ที่ทีมต้องการ (unit/integration/e2e)
- Monitoring/observability, error tracking
- Repo strategy (monorepo/polyrepo)

ถ้าคำตอบของผู้ใช้ในหมวดใดยังไม่พอสำหรับให้เหตุผล Decision Matrix ได้แม่นยำ
ให้ถามคำถามติดตาม (follow-up) ต่อในหมวดนั้นก่อนไปหมวดต่อไป — ห้ามข้าม
ไปสรุป Decision Matrix ทั้งที่ข้อมูลยังไม่พอ

---

## Section C: Plan-then-Confirm Gate (ต้องเสนอแผนก่อนเขียนไฟล์จริงเสมอ)

หลัง Interview (Section B) เสร็จ ก่อนเขียน/แก้ไข
`02-design/08-tech-stack.md` จริง ต้องเสนอแผนให้ผู้ใช้ยืนยันก่อนเสมอ
ประกอบด้วย:

1. **สร้างใหม่ หรือ ปรับปรุงของเดิม**
2. **สรุปคำตอบ Interview ที่ได้รับ** ต่อแต่ละหมวด (B1–B7) รวมหมวดที่ยัง
   ไม่ตอบ (ถ้ามี)
3. **รายชื่อ Decision Point ทั้งหมด** ที่จะอยู่ใน Decision Matrix พร้อม
   ตัวเลือกที่เสนอ (≥3 ต่อจุด) และคำแนะนำเบื้องต้น — ให้ผู้ใช้เห็นก่อนลง
   รายละเอียดเต็มรูปแบบ
4. รอการยืนยันจริงจากผู้ใช้ต่อแต่ละ Decision Point ก่อนจึงบันทึกเป็น
   Final Decision และเขียนไฟล์ — ห้ามข้าม gate นี้แม้ผู้ใช้จะขอแบบเร่งด่วน

---

## Section D: Required Output Format (โครงสร้างเอกสารที่ต้องมี)

เอกสาร `02-design/08-tech-stack.md` ต้องมี header block (Version, Last
Updated, Document Owner, Source) และ Revision History table รูปแบบเดียว
กับเอกสารอื่นในโปรเจกต์ ตามด้วยหัวข้อครบทุกข้อนี้:

### 1. Purpose & Scope (วัตถุประสงค์และขอบเขต)

อธิบายว่าเอกสารนี้เป็นเอกสารเดียวในสาย `02-design` ที่ระบุชื่อ technology
เฉพาะเจาะจงได้ พร้อมขอบเขต (Feature/decision point ใดที่ครอบคลุมในรอบนี้)

### 2. Fixed Technical Constraints (ข้อจำกัดที่ตัดสินใจแล้ว — Non-Negotiable)

รายการ Firebase/Firestore/Cloud Functions/Web+Mobile target ตาม CLAUDE.md
หมวด 6 พร้อม cross-reference ไปยัง
`02-design/01-transaction-flow.md`/`02-design/02-firestore-data-model.md`
(ถ้ามี) — ระบุชัดว่ารายการนี้**ไม่ใช่**ผลจาก Decision Matrix ของเอกสารนี้

### 3. Requirements Gathered from Interview (สรุปผลการสัมภาษณ์)

ตารางสรุปคำตอบต่อหมวด B1–B7 (Category | คำตอบที่ได้ | หมายเหตุ/สมมติฐาน)
— หมวดที่ผู้ใช้เลือกไม่ตอบ (partial scope) ให้ระบุว่า "ยังไม่ตอบ — ดู Open
Questions" แทนการเว้นว่างเงียบ ๆ

### 4. Decision Matrix (ตารางการตัดสินใจ) — บังคับ

ต่อ 1 decision point ต้องมี:

- **Decision Point** — เช่น "Frontend Web Framework", "Mobile App
  Approach", "CI/CD Pipeline"
- **Category** — อ้างอิงหมวด B1–B7 ที่เกี่ยวข้อง
- **Options Considered (≥3)** — แต่ละตัวเลือกระบุ เหตุผล/ข้อดี/ข้อเสีย
- **Recommended Option** — 1 ตัวเลือกพร้อมเหตุผลที่ชัดเจน อ้างอิงคำตอบจาก
  Section 3 เป็นเกณฑ์
- **Final Decision** — ตัวเลือกที่ผู้ใช้ยืนยันแล้ว (ถ้ายังไม่ยืนยัน ให้ระบุ
  "รอการยืนยัน" — ห้ามถือว่า Recommended Option เป็น Final Decision
  โดยอัตโนมัติ)
- **Rationale** — สรุปเหตุผลสุดท้ายสั้น ๆ

### 5. Full Stack Summary (สรุป Stack ทั้งหมด)

ตารางสรุปเรียงตาม Layer: Frontend Web / Mobile / Backend (Fixed) /
Database (Fixed) / Admin Dashboard / DevOps & CI/CD / Third-Party
Integrations / Monitoring & Observability / Security Tooling — แต่ละแถว
อ้างอิงกลับไปยัง Decision Point ใน Section 4 (หรือ "Fixed" ถ้ามาจาก
Section 2)

### 6. Traceability & References (การอ้างอิงย้อนกลับ)

สำหรับ Decision Point ที่มีที่มาจาก NFR/scale เฉพาะของ Feature ใด ให้อ้าง
`FT-xxx`, layer ใน Architecture, entity ใน Database Schema, หรือ
operation ใน API Spec ที่เกี่ยวข้องโดยตรง — ไม่มี ID scheme ใหม่ของ
เอกสารนี้เอง

### 7. Open Questions / Assumptions (ประเด็นที่ยังไม่ชัดเจน)

รายการหมวด Interview ที่ยังไม่ตอบ, Decision Point ที่ยัง "รอการยืนยัน",
และสมมติฐานที่ใช้ชั่วคราว (ถ้ามี)

### 8. Revision History

ตาราง Version | Date | Author/Agent | Description of Change — เพิ่ม
entry ใหม่ทุกครั้งที่แก้ไข พร้อมเหตุผล

---

## Section E: Consistency Hook (การเรียก Traceability Auditor)

หลังจากสร้าง/แก้ไข `02-design/08-tech-stack.md` เสร็จแล้ว ต้องเรียกใช้
agent `traceability-consistency-auditor` เสมอ (ตาม skill
`traceability-consistency-check`) เพื่อตรวจสอบว่าเกณฑ์ที่ใช้ให้เหตุผลใน
Decision Matrix (scale/NFR ที่อ้างจาก Feature List, User Journey,
Architecture, Database Schema, API Spec) ยังตรงกับเวอร์ชันล่าสุดของ
เอกสารเหล่านั้นหรือไม่

---

## Rules (กฎ)

- **ห้ามเปลี่ยน/เสนอให้เปลี่ยน** Firebase, Firestore, Cloud Functions, หรือ
  Web+Mobile target ที่ CLAUDE.md หมวด 6 กำหนดไว้แล้ว เว้นแต่ผู้ใช้ร้องขอ
  ให้ทบทวนเองอย่างชัดเจน (ต้องบันทึกเป็น "Deviation from CLAUDE.md" พร้อม
  การยืนยันแยกจากผู้ใช้)
- **ห้ามเลือก tech stack แทนผู้ใช้โดยไม่ถาม** — ทุก decision point ที่ยัง
  ไม่ถูกกำหนดโดย CLAUDE.md ต้องผ่าน Ambiguity Protocol (≥3 ตัวเลือก พร้อม
  เหตุผล/ข้อดี/ข้อเสีย/คำแนะนำ) เสมอ ก่อนบันทึกเป็น Final Decision
- ห้ามข้าม Dependency Check (Section A.1) — ต้องมี Feature List + User
  Journey + Architecture + Database Schema + API Spec ครบก่อนเริ่มงาน
- ห้ามแก้ไข `02-design/01-transaction-flow.md`,
  `02-design/02-firestore-data-model.md`,
  `02-design/03-system-architecture.md`,
  `02-design/05-database-schema.md`, `02-design/06-api-spec.md`, หรือ
  `02-design/07-detailed-design.md` — agent นี้อ้างอิงได้อย่างเดียว
- ห้ามสร้าง Traceability ID scheme ใหม่ (เช่น TS-xxx) — อ้างอิง `FT-xxx`,
  ชื่อ layer/entity/operation ที่มีอยู่จริงโดยตรงในเนื้อหา
- ต้องเสนอแผน (Plan Proposal) และรอการยืนยันจากผู้ใช้ก่อนเขียน/แก้ไขไฟล์
  จริงเสมอ (Section C) — ห้ามข้ามแม้เป็นการแก้ไขเล็กน้อย
- ทุกครั้งที่แก้ไขต้องมี Revision History entry ใหม่ ห้ามแก้แบบเงียบ
- หลังจากสร้าง/แก้ไขเสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` เสมอ ห้ามข้าม (ดู Section E)
- Agent นี้ไม่ได้ถูกผนวกเข้า `pipeline-orchestrator` — ถูกเรียกผ่าน
  `Shopplus` โดยตรงเท่านั้นเมื่อผู้ใช้ร้องขอ
- พิจารณาเสมอ: Agile methodology, PDPA compliance, security-by-design,
  scalability ตามขนาดที่ผู้ใช้ระบุจริง, business value, maintainability
  ระยะยาวของทีม (สอดคล้องกับ CLAUDE.md)
