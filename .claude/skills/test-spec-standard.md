# Test Spec Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการสร้างหรือ
อัปเดต **Test Spec** จาก Feature (`FT-xxx`) หรือ User Journey ที่ถูกเลือก
ไว้เป็นขอบเขต ให้ได้ test case ที่ครอบคลุมทุก decision point ของ journey
และทุก Acceptance Criteria ของ requirement ต้นทาง พร้อมรักษา
traceability กลับไปยัง `FR-xxx` / `US-xxx` / `FT-xxx` เสมอ

ใช้งานโดย agent `test-spec-analyst`

โจทย์ของโปรเจกต์อนุญาตให้ **"เลือกบางข้อมาส่ง"** — Test Spec ไม่จำเป็น
ต้องครอบคลุมทุก Feature ในคราวเดียว แต่ทุกครั้งที่สร้างต้องระบุขอบเขตที่
เลือกไว้อย่างชัดเจนและมี traceability ครบ

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้าข้อมูลใน BRD/Backlog/Feature List/User Journey ไม่ชัดเจน ขัดแย้งกัน
หรือไม่พอสำหรับการเขียน test case (เช่น Acceptance Criteria ไม่ครอบคลุม
edge case ที่ diagram แสดงไว้, ยังไม่รู้ว่าควรเลือก Feature ไหนเป็นขอบเขต)
**ห้ามสมมติเองโดยไม่ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้ (เช่น 3 Feature ที่เหมาะเป็น
   ขอบเขตแรก)
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการสร้าง/แก้ไขเอกสาร

---

## Section A: Scope Selection (การเลือกขอบเขต)

1. **ตรวจสอบขอบเขตที่มีอยู่แล้วก่อนเสมอ** — เปิด
   `03-development/01-prototype-log.md` (ถ้ามี) ดูว่ามี Feature/Journey
   ใดถูกเลือกไว้แล้วสำหรับ Prototype หรือไม่ ถ้ามี **ให้ใช้ Feature/Journey
   เดียวกัน** เป็นค่าเริ่มต้นสำหรับ Test Spec เพื่อให้ Day 1/Day 2
   สอดคล้องกันตามที่โจทย์ระบุ ("Test Spec ... ที่สอดคล้องกันกับ User
   Journey หรือ Feature ที่เลือก")
2. ถ้ายังไม่มีขอบเขตที่เลือกไว้ที่ใดเลย ห้ามเลือกเอง — ใช้ Ambiguity
   Protocol เสนอ Feature ที่เหมาะสม (แนะนำ Feature ระดับ **Must have**
   ที่มี decision point ชัดเจนใน User Journey เช่น FT-003, FT-005, FT-006)
3. อ่านให้ครบก่อนเริ่มเขียน: BRD (FR + Acceptance Criteria ที่เกี่ยวข้อง),
   Product Backlog (US + Given/When/Then), Feature List (FT + MoSCoW +
   หมายเหตุ Blocked), User Journey (diagram + node ของ actor ที่เกี่ยวข้อง
   กับ Feature นี้)

---

## Section B: Test Case ID & Coverage Rule (รูปแบบ ID และกฎความครอบคลุม)

- ใช้ ID รูปแบบ `TC-<เลข FT>-<ลำดับ>` เช่น FT-003 → `TC-003-01`,
  `TC-003-02`, ...
- Test Spec หนึ่งฉบับต้องครอบคลุมอย่างน้อย:
  1. **Happy path** (positive case) ตรงตาม Given/When/Then หลักใน BRD/
     Backlog ของ Feature นั้น
  2. **ทุก decision branch** ที่ปรากฏใน User Journey diagram ของ Feature
     นั้น (เช่น approve/reject, valid/invalid QR, balance
     เพียงพอ/ไม่เพียงพอ)
  3. **Negative / edge case** จาก Acceptance Criteria เดิม (เช่น QR
     หมดอายุ, ใช้ซ้ำ, status transition ที่ไม่ถูกต้อง)
  4. **NFR ที่เกี่ยวข้องโดยตรงกับ Feature นั้น** (เช่น server-side
     calculation only สำหรับ FT-006, PDPA consent gate สำหรับ FT-016,
     immutable audit log สำหรับ FT-015)
- ห้าม fabricate test case ที่ไม่มีที่มาจาก BRD/Backlog/User Journey จริง
  — ถ้าจำเป็นต้องเพิ่ม edge case ใหม่ที่ requirement เดิมไม่ได้ระบุไว้ ให้
  ทำเครื่องหมาย **"New — recommend adding to Acceptance Criteria"** ตาม
  convention เดิมของโปรเจกต์ (เทียบเท่ากับ "New — แนะนำให้เพิ่มเข้า BRD"
  ที่ใช้ใน Feature List)
- Test case ที่พึ่งพา Open Question ที่ยังไม่มีคำตอบ ต้อง mark เป็น
  **Blocked** ไม่ใช่เดาค่าเอง

---

## Section C: Required Output Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

ไฟล์ปลายทาง: `04-testing/01-test-spec.md` (เอกสารสะสม — เพิ่ม Test Suite
ใหม่ต่อท้ายทุกครั้งที่เลือก Feature เพิ่ม ไม่สร้างไฟล์แยกต่อ Feature)

1. Header: Project, Document Type (Test Spec), Phase (`04-testing`),
   Version, Status, Date, Prepared by, Source (FT-xxx / FR-xxx / US-xxx /
   Journey ref ที่ใช้อ้างอิงล่าสุด)
2. Revision History table
3. ต่อ 1 Feature/Journey ที่เลือก ให้มี **Test Suite** ของตัวเอง ประกอบด้วย:
   - Scope — Feature/Journey ที่เลือกและเหตุผลที่เลือก
   - Traceability Summary table: Test Case ID | Test Type
     (Positive/Negative/Edge/NFR) | Related FT | Related FR | Related US |
     Related Journey Step
   - Test Case Detail ต่อรายการ: ID, Title, Preconditions, Given/When/
     Then, Expected Result, Priority (อ้างอิง MoSCoW ของ Feature นั้น),
     หมายเหตุ (ถ้า Blocked)

---

## Rules (กฎทั่วไป)

- ห้าม fabricate test case ที่ไม่มีที่มาจริงจาก BRD/Backlog/User Journey
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  security (โดยเฉพาะ NFR ด้าน Security/Auditability ใน BRD §7)
- Test Spec เป็นเอกสารระดับ **ข้อกำหนดการทดสอบ** เท่านั้น ห้ามเขียน test
  code จริง (unit test / integration test script) — งานนั้นเป็นของ
  implementation phase
- ทุกครั้งที่แก้ไข/เพิ่ม Test Suite ต้องเพิ่ม entry ใน Revision History
- หลังจากสร้าง/แก้ไข Test Spec เสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` (ตาม skill
  `traceability-consistency-check`) เพื่อตรวจสอบว่า traceability กลับไป
  ยัง BRD/Backlog/Feature List/User Journey ยังถูกต้องอยู่
