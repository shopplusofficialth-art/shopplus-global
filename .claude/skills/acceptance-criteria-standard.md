# Acceptance Criteria Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการสร้างและ
อัปเดต **`04-testing/acceptance-criteria.md`** — เอกสารรวม Acceptance
Criteria แบบ **Given-When-Then ต่อแต่ละ Backlog Item (US-xxx)** โดยดึง
ข้อมูลจาก **Product Backlog, Feature List, และ spec ที่เกี่ยวข้อง** (เช่น
Prototype ถ้ามี หรือ Test Case ที่เขียนไว้แล้ว) ให้ agent อื่น
(โดยเฉพาะ `test-case-writer`) นำไปอ้างอิงสร้าง Test Case ต่อได้

ใช้งานโดย agent `acceptance-criteria-writer` — ถูกเรียกได้ 2 ทาง:

1. ผู้ใช้ขอสร้าง/แก้ไข Acceptance Criteria โดยตรง
2. **ถูกเรียกเป็น prerequisite step** โดย `test-case-writer` เมื่อ
   Feature/Backlog Item ที่จะเขียน Test Case ยังไม่มี AC อยู่ในเอกสารนี้
   (ดู skill `test-case-standard` Section B)

โจทย์ของโปรเจกต์อนุญาตให้ **"เลือกบางข้อมาส่ง"** — ไม่จำเป็นต้องครอบคลุม
ทุก Backlog Item ในคราวเดียว แต่ทุกครั้งที่สร้างต้องระบุขอบเขตที่เลือกไว้
ชัดเจนและมี traceability ครบ

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้ายังไม่รู้ว่าควรเลือก Backlog Item ไหนเป็นขอบเขต, Backlog ไม่มี
Given/When/Then ระบุไว้เลยสำหรับ US ที่เลือก, หรือพบ edge case ที่ไม่มี
ที่มาชัดเจน **ห้ามสมมติเองโดยไม่ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการสร้าง/แก้ไขเอกสาร

---

## Section A: Scope Selection (การเลือกขอบเขต)

1. **ถ้าถูกเรียกโดย `test-case-writer`** ขอบเขตจะถูกกำหนดมาแล้ว (Feature/
   Backlog Item ที่ต้องการ Test Case) — ใช้ขอบเขตนั้นได้ทันที ไม่ต้องถาม
   ซ้ำ แต่ยังต้องผ่าน Plan Proposal (Section C) ก่อนเขียนไฟล์
2. **ถ้าผู้ใช้ระบุ Backlog Item/Feature เจาะจงมาแล้ว** ให้ใช้ขอบเขตนั้น
3. **ถ้ายังไม่ระบุเจาะจง** ให้ใช้ Ambiguity Protocol เสนอ ≥3 ตัวเลือกจาก
   Backlog Item ที่ยังไม่มี AC ในเอกสารนี้ (แนะนำเริ่มจาก priority **Must
   have/P0** ที่มี Given/When/Then ชัดเจนที่สุดใน Backlog ก่อน)

---

## Section B: Source Consolidation Rule (กฎการรวบรวมจากต้นทาง)

Acceptance Criteria ในเอกสารนี้ **ต้องมีที่มาจริง** — ห้ามแต่งขึ้นใหม่:

1. **แหล่งหลัก:** Given/When/Then ที่มีอยู่แล้วต่อ US-xxx ใน
   `01-requirements/02-product-backlog.md` — ดึงมาใช้ตรง ๆ (ปรับคำให้
   กระชับได้ แต่ห้ามเปลี่ยนความหมาย)
2. **แหล่งเสริม:** `01-requirements/03-feature-list.md` — ใช้ระบุว่า
   Backlog Item นั้นอยู่ใน FT-xxx ใด และ MoSCoW ระดับใด (ใส่ใน
   traceability ของแต่ละ AC)
3. **แหล่งเสริมที่ 2 (ถ้ามี):** `03-development/01-prototype-log.md` และ
   ไฟล์ prototype จริง — ถ้า prototype จำลอง behavior ที่ Backlog ไม่ได้
   ระบุ AC ตรง ๆ ไว้ (ตัวอย่างที่เกิดขึ้นจริง: double-submit guard ของ
   FT-005 ซึ่งเดิม flag ไว้เป็น "New" ในเอกสาร Test Spec รุ่นก่อน ก่อน
   ที่โปรเจกต์จะย้ายมาใช้โครงสร้าง `acceptance-criteria.md` — ดูผลลัพธ์
   จริงที่ AC-005-03) ให้เพิ่มเป็น AC ใหม่พร้อมทำเครื่องหมาย **"New —
   confirmed via Prototype PT-xxx"**
4. ถ้า Backlog Item ที่เลือกไม่มี Given/When/Then ระบุไว้เลย และไม่มี
   prototype ยืนยันเพิ่มเติม ให้ใช้ Ambiguity Protocol ถามผู้ใช้ก่อน
   เขียน AC ใด ๆ สำหรับ item นั้น — ห้ามเดา

---

## Section C: Plan Proposal & Confirmation Gate (การเสนอแผนและขอยืนยันก่อนสร้างจริง)

**ทุกครั้ง** ที่จะสร้างหรือแก้ไข Acceptance Criteria (ไม่ว่าขอบเขตจะถูก
กำหนดมาจาก agent อื่นหรือผู้ใช้ระบุเองก็ตาม) ต้องเสนอแผนให้ผู้ใช้ review
และรอการยืนยันก่อน**เขียนไฟล์จริง** — ห้ามข้ามขั้นตอนนี้

แผนที่เสนอต้องระบุ:

1. Backlog Item (US-xxx) ที่จะครอบคลุม + FT-xxx ที่เกี่ยวข้อง
2. จำนวน AC ที่จะเพิ่ม/แก้ไข และแหล่งอ้างอิงของแต่ละ AC (Backlog /
   Feature List / Prototype)
3. รายการที่ต้อง flag "New" (ถ้ามี) พร้อมเหตุผล

---

## Section D: AC ID & Format (รูปแบบ ID และโครงสร้าง)

- ID รูปแบบ: `AC-<เลข US>-<ลำดับ>` เช่น US-004 → `AC-004-01`, `AC-004-02`
- ต่อ 1 AC ต้องมี: **Given / When / Then**, **Related US**, **Related
  FT**, **Related FR** (ถ้ามี), **Source** (Backlog / Feature List /
  Prototype PT-xxx), หมายเหตุ (ถ้าเป็น "New")

---

## Section E: Required Output Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

ไฟล์ปลายทาง: `04-testing/acceptance-criteria.md` (เอกสารเดียว สะสม — เพิ่ม
Backlog Item ใหม่ต่อท้ายทุกครั้งที่เลือกเพิ่ม ไม่สร้างไฟล์แยก)

1. Header: Project, Document Type, Phase (`04-testing`), Version,
   Status, Date, Prepared by, Source
2. Revision History table
3. ต่อ 1 Backlog Item (US-xxx) ที่เลือก ให้มี **section ของตัวเอง**
   ประกอบด้วย:
   - หัวข้อ: `US-xxx — <ชื่อ User Story>` + FT-xxx ที่เกี่ยวข้อง
   - ตาราง AC: AC ID | Given | When | Then | Source | หมายเหตุ

---

## Rules (กฎทั่วไป)

- ห้ามแต่ง Acceptance Criteria ใหม่ที่ไม่มีที่มาจริงจาก Backlog/Feature
  List/Prototype — ถ้าจำเป็นต้องเพิ่ม ให้ทำเครื่องหมาย "New — recommend
  adding to Backlog/BRD" เสมอ
- ห้ามเขียนไฟล์จริงก่อนได้รับการยืนยันแผนจากผู้ใช้ (Section C)
- ทุกครั้งที่เพิ่ม/แก้ไขต้องเพิ่ม entry ใน Revision History
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value
  (สอดคล้องกับ CLAUDE.md)
- หลังจากสร้าง/แก้ไขเสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` (ตาม skill
  `traceability-consistency-check`) เพื่อตรวจสอบว่า traceability กลับไป
  ยัง Backlog/Feature List ยังถูกต้องอยู่
