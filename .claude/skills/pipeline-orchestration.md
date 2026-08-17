# Pipeline Orchestration Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ agent `pipeline-orchestrator` ในการ
รันสาย **Requirement → Backlog → Feature List → User Journey → (Test
Plan + Acceptance Criteria → Test Case) → [Prototype — optional]** ให้
**ต่อเนื่องกันภายในคำขอเดียว** — ผู้ใช้ไม่ต้องเรียก `Shopplus` ทีละ stage
ทีละครั้ง (Prototype เป็น Stage 6 แบบ optional ที่ถูกเสนอให้เลือกในแผนรวม
เสมอ ไม่ใช่ default และไม่ใช่ตัดออกไปเลย — ดู Section B)

Skill นี้**ไม่ได้แทนที่** skill ของแต่ละ sub-agent ในสาย — แต่เป็นชั้น
ควบคุมการ**เรียงลำดับและไล่เดินหน้าอัตโนมัติ**ทับ skill เหล่านั้น ทุก
sub-agent ยังทำงานตาม Responsibilities/Rules ของตัวเองทุกข้อเหมือนถูก
เรียกทีละตัวโดย `Shopplus`

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

เช่นเดียวกับทุก skill อื่นในโปรเจกต์ — ถ้าจุดเริ่มต้นของ pipeline ไม่ชัดเจน
(เช่น ยังไม่รู้ว่าจะ build เรื่องอะไร, มี BRD อยู่แล้วแต่ไม่รู้ว่าจะขยาย
scope เดิมหรือเริ่ม feature ใหม่) **ห้ามสมมติเองโดยไม่ถาม**:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนเริ่มรัน pipeline จริง

ข้อนี้ต่างจาก Ambiguity Protocol ภายในของแต่ละ sub-agent (เช่น scope
selection ของ `test-case-writer`) ซึ่งยังคงใช้งานตามปกติระหว่างรัน
pipeline — ข้อนี้ใช้เฉพาะจุดตัดสินใจ**ระดับ pipeline โดยรวม**เท่านั้น

---

## Section A: Resume Detection (การตรวจว่าจะเริ่มจาก stage ไหน)

ก่อนเสนอแผน ให้ตรวจสอบทุก stage ตามลำดับว่ามีเอกสารอยู่แล้วและครอบคลุม
ขอบเขตที่ผู้ใช้ต้องการหรือไม่:

| Stage | ตรวจไฟล์ | เกณฑ์ข้าม stage |
|---|---|---|
| 1. Requirement | `01-requirements/01-business-requirement.md` | มีอยู่แล้ว และ business problem/FR ที่ผู้ใช้ต้องการมีอยู่แล้ว |
| 2. Backlog | `01-requirements/02-product-backlog.md` | มีอยู่แล้ว และ US ที่ map กับ FR ที่ต้องการมีอยู่แล้ว |
| 3. Feature List | `01-requirements/03-feature-list.md` | มีอยู่แล้ว และ FT ที่ครอบคลุม US ที่ต้องการมีอยู่แล้ว |
| 4. User Journey | `02-design/04-user-journey.md` | มีอยู่แล้ว และ node ของ FT ที่ต้องการมีอยู่แล้ว |
| 5a. Test Plan | `04-testing/test-plan.md` | มีอยู่แล้ว และ FT ที่ต้องการอยู่ใน Scope table แล้ว |
| 5b. Acceptance Criteria | `04-testing/acceptance-criteria.md` | มี AC ของ US ที่เกี่ยวข้องกับ FT ที่ต้องการครบแล้ว |
| 5c. Test Case | `04-testing/test-cases/<feature-slug>.md` | มีไฟล์ของ FT ที่ต้องการอยู่แล้วและครอบคลุม decision branch หลักครบ |
| 6. Prototype (optional) | `03-development/01-prototype-log.md` | มี version folder ล่าสุดของ FT ที่ต้องการอยู่แล้ว **และ**ผู้ใช้ไม่ได้ขอให้ทำ version ใหม่ — ไม่ใช่เกณฑ์ข้าม stage แบบเดียวกับ stage อื่น เพราะ stage นี้ optional อยู่แล้ว (ดู Section B) |

ถ้า stage ใด **ไม่มีอยู่เลย** ให้รัน ถ้า **มีอยู่แล้วแต่ไม่ครอบคลุม
ขอบเขตใหม่ที่ผู้ใช้ต้องการ** (เช่น มี BRD แล้วแต่ไม่มี FR ของ feature ใหม่
ที่ขอ) ให้รันแบบ**ขยาย** (แก้ไขเอกสารเดิม ไม่สร้างทับ) ถ้า **ครอบคลุม
แล้วครบ** ให้ข้าม stage นั้นและระบุเหตุผลไว้ในแผน (Section B)

---

## Section B: Consolidated Pipeline Plan (แผนเดียวสำหรับทั้ง pipeline)

ก่อนเริ่มรัน stage แรกที่ต้องทำจริง ให้เสนอแผนเดียวที่ครอบคลุมทุก stage
ให้ผู้ใช้ยืนยัน**ครั้งเดียว** — ระบุ:

1. **Stage ที่จะรันจริง** vs **stage ที่ข้าม** (พร้อมเหตุผลจาก Section A)
2. **ขอบเขต/topic ของแต่ละ stage ที่จะรัน** (เช่น business problem ที่จะ
   เขียนใน BRD, Feature ที่จะพาไปถึง Test Case)
3. **Feature ที่จะเลือกสำหรับ Testing Artifacts (5a/5b/5c)** — ถ้าผู้ใช้
   ไม่ได้ระบุ ให้ใช้ Ambiguity Protocol เสนอ ≥3 ตัวเลือกก่อนใส่ในแผน
4. **ไฟล์ที่คาดว่าจะถูกสร้าง/แก้ไข** ทั้งหมด (list ตรงตาม path ของแต่ละ
   sub-agent)
5. **ถามว่าต้องการรวม Stage 6 (Prototype) เข้าไปในรอบนี้ด้วยหรือไม่** —
   ถามทุกครั้งไม่ว่าคำขอเดิมจะพูดถึง Prototype หรือไม่ก็ตาม (เพราะเป็น
   ส่วนต่อธรรมชาติของ Feature เดียวกันที่กำลังทำ Test Case อยู่แล้ว) ถ้า
   ผู้ใช้ตอบว่าต้องการ ให้เพิ่ม Stage 6 เข้าไปในแผนและรันต่อในรอบเดียวกัน
   เลย ไม่ต้องรอคำขอใหม่ ถ้าไม่ต้องการ ให้ข้าม Stage 6 ไปตามปกติ — คำตอบ
   นี้ไม่ใช่การข้าม Folder Versioning gate หรือ Design System dependency
   check ของ `prototype-standard` (ยังคงถูกถามตามปกติ**ถ้า**เลือกรวม
   Stage 6 เข้ามา — ดู Section C)

ผู้ใช้ต้องยืนยันแผนนี้ก่อนจึงเริ่ม stage แรกจริง — **นี่คือจุดยืนยันเดียว
ของระดับ pipeline** (ไม่ใช่การยกเลิก Plan-then-Confirm gate ภายในของ
sub-agent แต่ละตัวที่ยังทำงานตามปกติระหว่างทาง — ดู Section C)

---

## Section C: Sequential Execution Rule (กฎการรันต่อเนื่อง)

หลังแผนได้รับการยืนยันแล้ว ให้รันตามลำดับนี้ **โดยไม่ต้องรอผู้ใช้พิมพ์
คำขอใหม่ระหว่าง stage**:

1. เรียก sub-agent ของ stage นั้น สวมบทบาททำงานตาม Responsibilities/
   Output format/Rules ของไฟล์ agent+skill นั้นอย่างเคร่งครัด (เหมือนที่
   `Shopplus` ทำเมื่อ route คำขอเดี่ยว)
2. **ถ้า sub-agent นั้นมี Plan-then-Confirm gate ของตัวเอง** (เช่น
   `test-plan-writer`, `acceptance-criteria-writer`, `test-case-writer`
   ทุกตัวมี gate นี้ตาม skill ของตัวเอง) ให้เสนอแผนย่อยของ stage นั้นและ
   **รอการยืนยันจริง** ก่อนเขียนไฟล์ของ stage นั้น — ห้ามข้าม gate นี้
   แม้จะอยู่ใน pipeline mode ก็ตาม
3. **ถ้า sub-agent นั้นเจอ Ambiguity ภายใน** (เช่น Backlog priority ขัดแย้ง
   กับ BRD) ให้หยุดถามตาม Ambiguity Protocol ของ sub-agent นั้นจริง —
   ห้ามข้ามหรือเดาแทนผู้ใช้
4. เมื่อ stage นั้นเสร็จและได้รับการยืนยัน/ตอบคำถามที่จำเป็นแล้ว ให้
   **เดินหน้าไป stage ถัดไปทันที** โดยไม่ต้องให้ผู้ใช้พิมพ์คำขอใหม่ —
   รายงานความคืบหน้าสั้น ๆ ก่อนไปต่อ (เช่น "✅ Stage 2 (Backlog) เสร็จแล้ว
   → เริ่ม Stage 3 (Feature List)")
5. เรียก `traceability-consistency-auditor` ตามกฎที่ระบุไว้ในไฟล์
   agent+skill ของ stage นั้นเอง **หลัง stage นั้นเสร็จทันที** (ไม่รวบไป
   ตรวจทีเดียวตอนจบ pipeline) เพื่อจับ drift ก่อนสะสมไปหลาย stage
6. ถ้า stage ใดพบ ❓ ที่ต้องรอ stakeholder ตัดสินใจ ให้บันทึกไว้ใน running
   list เพื่อรวมแสดงใน Final Report (Section D) — ไม่ปิดบังหรือละเลย

**Testing Artifacts group (5a/5b/5c):** รันภายในกลุ่มนี้ตามลำดับ Test
Plan → Acceptance Criteria → Test Case เสมอ เพราะ Test Case มี hard
dependency กับ Acceptance Criteria (ดู skill `test-case-standard`
Section B) — ห้ามสลับลำดับ

**Stage 6 (Prototype, ถ้าเลือกรวมไว้ในแผน):** รันต่อจาก Stage 5c ทันที
ในรอบเดียวกัน โดยสวมบทบาทเป็น `prototype-designer` ทำงานตาม
Responsibilities/Rules ของ `prototype-standard` **ครบทุกข้อ** รวมถึง:

- **Design System Dependency Check** — ถ้า `02-design/DESIGN.md` ยังไม่
  มี/ไม่ครบ ให้เรียก `design-system-creator` ก่อนเสมอ (เหมือนที่
  `prototype-designer` ทำเมื่อถูกเรียกเดี่ยว ๆ)
- **Folder Versioning Decision** — ถ้ามี version folder ของ Feature นี้
  อยู่แล้ว ต้องถามผู้ใช้จริงว่าจะสร้าง version ใหม่หรือแก้ล่าสุด พร้อม
  คำแนะนำ (ตาม `prototype-standard` Section D) — ห้ามข้าม แม้อยู่ใน
  pipeline mode
- Feature ที่ใช้ทำ Prototype ต้องเป็น**ตัวเดียวกัน**กับที่เลือกไว้ใน Stage
  5b/5c เสมอ (ไม่ต้องเลือกใหม่)

---

## Section D: Final Report Format (รูปแบบรายงานสรุปท้าย pipeline)

เมื่อครบทุก stage ที่วางแผนไว้ ให้สรุป:

1. **Stage Summary** — ตาราง: Stage | รันจริง/ข้าม | เหตุผล | Agent ที่ใช้
2. **Files Changed** — รายการไฟล์ทั้งหมดที่สร้าง/แก้ไข พร้อม Revision
   History entry ที่เพิ่มในแต่ละไฟล์
3. **Open Items Needing Stakeholder Decision** — รวม ❓ ทั้งหมดจากทุก
   stage (ไม่ใช่แค่ stage สุดท้าย) พร้อมตัวเลือกที่เสนอไว้ ณ ตอนนั้น
4. **Quality Gate Result** — ผลจากการรัน Quality Gate Checklist ของ
   `Shopplus` (skill `shopplus-orchestration` Section C) กับผลลัพธ์รวม
   ทั้ง pipeline

---

## Rules (กฎทั่วไป)

- ห้ามข้ามลำดับ dependency ของ stage (BRD → Backlog → Feature List →
  User Journey → Test Plan/Acceptance Criteria → Test Case)
- ห้ามตัด Plan-then-Confirm gate หรือ Ambiguity Protocol ของ sub-agent
  แต่ละตัวออก — "ต่อเนื่องกัน" คือไม่ต้องรอผู้ใช้พิมพ์คำขอใหม่ระหว่าง
  stage เท่านั้น ไม่ใช่ข้ามการตรวจสอบความถูกต้อง/ความปลอดภัยของแต่ละ
  stage
- ห้ามรวบการเรียก `traceability-consistency-auditor` ไปตรวจทีเดียวตอนจบ
  — ต้องเรียกหลังทุก stage ตามที่ skill ของ stage นั้นกำหนดไว้ เพื่อจับ
  drift ก่อนสะสม
- ห้ามสร้าง Prototype หรือ Design System ในสาย pipeline นี้ นอกจากผู้ใช้
  ระบุเพิ่มเข้ามาชัดเจนในแผน (Section B)
- ทุกไฟล์ที่แก้ไขต้องมี Revision History entry ใหม่เสมอ
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  maintainability (สอดคล้องกับ CLAUDE.md)
