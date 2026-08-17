# Test Case Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการสร้างหรือ
อัปเดต **Test Case แบบ step-by-step** ต่อ Feature เก็บที่
**`04-testing/test-cases/<feature-slug>.md`** (1 ไฟล์ต่อ Feature) โดยดึง
ข้อมูลจาก **Acceptance Criteria, Product Backlog, และ User Journey**
พร้อมรักษา traceability กลับไปยัง Requirement/AC เสมอ

ใช้งานโดย agent `test-case-writer`

โจทย์ของโปรเจกต์อนุญาตให้ **"เลือกบางข้อมาส่ง"** — ไม่จำเป็นต้องทำ Test
Case ครบทุก Feature ในคราวเดียว แต่ทุกครั้งที่สร้างต้องมี Acceptance
Criteria ของ Feature นั้นอยู่แล้วก่อนเสมอ (ดู Section B)

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้ายังไม่รู้ว่าควรเลือก Feature ไหนเป็นขอบเขต หรือ AC/Journey มีจุดที่
ตีความได้มากกว่าหนึ่งแบบ **ห้ามสมมติเองโดยไม่ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการสร้าง/แก้ไข test case

---

## Section A: Scope Selection (การเลือกขอบเขต)

1. **ถ้าผู้ใช้ระบุ Feature เจาะจงมาแล้ว** ให้ใช้ขอบเขตนั้น
2. **ถ้ายังไม่ระบุเจาะจง** ให้ตรวจ
   `03-development/01-prototype-log.md` (ถ้ามี) ก่อนว่ามี Feature/
   Journey ที่ถูกเลือกไว้แล้วสำหรับ Prototype หรือไม่ ถ้ามีให้ใช้ Feature
   เดียวกันเป็นค่าเริ่มต้น ถ้าไม่มีเลย ใช้ Ambiguity Protocol เสนอ ≥3
   Feature (แนะนำ Must have ที่มี decision point ชัดเจนใน User Journey)
3. อ่านให้ครบก่อนเริ่มเขียน: `04-testing/acceptance-criteria.md` (AC ของ
   Feature นั้น), Product Backlog (US + context), User Journey diagram
   (decision branch ของ Feature นั้น)

---

## Section B: Acceptance Criteria Dependency (การพึ่งพา Acceptance Criteria — บล็อกเด็ดขาด)

Test Case ทุกไฟล์**ต้องอ้างอิง AC จาก `04-testing/acceptance-criteria.md`
เท่านั้น** — ห้ามคิด business scenario ขึ้นใหม่เอง (เทียบเท่ากับที่
Prototype ต้องมี `DESIGN.md` ก่อนเสมอ)

1. **ตรวจสอบก่อนเริ่มเขียน Test Case ทุกครั้ง** ว่า Backlog Item
   (US-xxx) ทุกตัวของ Feature ที่เลือกมี AC ครบใน
   `04-testing/acceptance-criteria.md` หรือไม่
2. **ถ้าไม่มี หรือมีไม่ครบ** — **ห้ามสร้าง Test Case ต่อ** ให้เรียกใช้
   agent `acceptance-criteria-writer` (ตาม skill
   `acceptance-criteria-standard`) ก่อนเสมอ เพื่อสร้าง/เติม AC ให้ครบ
   ก่อน จึงกลับมาทำ Section A/C/D ต่อ
3. **ถ้ามีครบแล้ว** — ดึง AC-xxx ที่เกี่ยวข้องมาใช้เป็น "แหล่งเดียว" ของ
   scenario ที่จะเขียนเป็น test case (1 AC อาจแปลงเป็น 1 หรือหลาย test
   case ก็ได้ ขึ้นกับความละเอียดของ step)

---

## Section C: Plan Proposal & Confirmation Gate (การเสนอแผนและขอยืนยันก่อนสร้างจริง)

**ทุกครั้ง** ที่จะสร้างหรือแก้ไข Test Case ต้องเสนอแผนให้ผู้ใช้ review และ
รอการยืนยันก่อน**เขียนไฟล์จริง** — ห้ามข้ามขั้นตอนนี้แม้ขอบเขตจะชัดเจนแล้ว
ก็ตาม

แผนที่เสนอต้องระบุ:

1. Feature ที่จะสร้าง/แก้ไข Test Case + AC-xxx ที่จะอ้างอิง
2. จำนวน test case คร่าว ๆ ที่จะเขียนและประเภท (Positive/Negative/Edge/
   NFR)
3. ไฟล์ปลายทาง (`test-cases/<feature-slug>.md`)

---

## Section D: Test Case ID & Coverage Rule (รูปแบบ ID และกฎความครอบคลุม)

- ใช้ ID รูปแบบ `TC-<เลข FT>-<ลำดับ>` เช่น FT-005 → `TC-005-01`,
  `TC-005-02`, ...
- Test Case ทุกรายการต้องมีอย่างน้อยฟิลด์เหล่านี้ (ตามโจทย์):
  1. **Test ID**
  2. **Test Case Name**
  3. **Pre-condition**
  4. **Test Step** — เขียนเป็นลำดับขั้นตอนที่ทำได้จริงแบบ manual QA
     (Step 1, Step 2, ...) ไม่ใช่ narrative แบบ Given/When/Then เพียว ๆ
  5. **Expected Result**
  6. **Test Data** — ค่าตัวอย่างที่ใช้จริงในการทดสอบ (mock/sample data)
  7. **Reference** — AC-xxx ที่แปลงมา + FR-xxx/US-xxx/FT-xxx/Journey
     step ที่เกี่ยวข้อง
- ไฟล์ต่อ Feature ต้องครอบคลุมอย่างน้อย:
  1. **Happy path** ตาม AC หลักของ Feature นั้น
  2. **ทุก decision branch** ที่ปรากฏใน User Journey diagram ของ Feature
     นั้น
  3. **Negative/edge case** จาก AC ที่มีอยู่ (รวมที่ถูก flag "New" ใน
     `acceptance-criteria.md`)
  4. **NFR ที่เกี่ยวข้องโดยตรงกับ Feature นั้น** (อ้างจาก
     `04-testing/test-plan.md` §Test Types ว่าประเภทใดเกี่ยวข้อง)
- ห้าม fabricate test case ที่ไม่มี AC รองรับ — ถ้าจำเป็นต้องเพิ่ม
  scenario ใหม่ที่ AC เดิมไม่ครอบคลุม ให้กลับไปเพิ่ม AC ก่อน (เรียก
  `acceptance-criteria-writer`) ไม่ใช่เขียน test case ลอย ๆ

---

## Section E: Required Output Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

ไฟล์ปลายทาง: `04-testing/test-cases/<feature-slug>.md` — 1 ไฟล์ต่อ
Feature เดียว (ไม่รวมหลาย Feature ในไฟล์เดียว)

**ชื่อไฟล์ (feature-slug):** `ft-<เลข FT 3 หลัก>-<kebab-case-ของชื่อ
Feature>` เช่น FT-005 "Merchant Transaction Approval Workflow" →
`ft-005-merchant-transaction-approval-workflow.md`

เนื้อหาไฟล์ต้องมี:

1. Header: Project, Document Type (Test Cases), Phase (`04-testing`),
   Feature (FT-xxx), Version, Status, Date, Prepared by, Source
   (รวม `acceptance-criteria.md` เสมอ)
2. Revision History table
3. Scope — เหตุผลที่เลือก Feature นี้
4. Traceability Summary table: Test Case ID | Test Type
   (Positive/Negative/Edge/NFR) | Related AC | Related FR | Related US |
   Related Journey Step
5. Test Case Detail ต่อรายการ ตามฟิลด์ใน Section D (Test ID, Test Case
   Name, Pre-condition, Test Step 1..n, Expected Result, Test Data,
   Reference)

---

## Rules (กฎทั่วไป)

- ห้าม fabricate test case ที่ไม่มี Acceptance Criteria รองรับจริง
- **ห้ามข้าม Acceptance Criteria Dependency Check (Section B)** — ถ้า AC
  ไม่ครบ ต้องเรียก `acceptance-criteria-writer` ก่อนเสมอ ไม่มีข้อยกเว้น
- ห้ามเขียนไฟล์จริงก่อนได้รับการยืนยันแผนจากผู้ใช้ (Section C)
- Test Case เป็นเอกสารระดับ **step-by-step manual test** เท่านั้น ห้าม
  เขียน test code จริง (unit/integration test script)
- ทุกครั้งที่แก้ไข/เพิ่ม Test Case ต้องเพิ่ม entry ใน Revision History
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  security (โดยเฉพาะ NFR ด้าน Security/Auditability ใน BRD §7)
- หลังจากสร้าง/แก้ไขเสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` (ตาม skill
  `traceability-consistency-check`)
