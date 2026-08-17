# Test Plan Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการสร้างและ
อัปเดต **`04-testing/test-plan.md`** — เอกสารกลยุทธ์การทดสอบ **1 ไฟล์ต่อ
โปรเจกต์** (ไม่ผูกกับ Feature เดียว ต่างจาก Test Case/Acceptance
Criteria) ครอบคลุม scope, ประเภทการทดสอบ, test environment, risk
management, และ entry/exit criteria โดยดึงข้อมูลจาก Product Backlog,
Non-Functional Requirement (BRD §7), และเอกสารที่เกี่ยวข้อง

ใช้งานโดย agent `test-plan-writer`

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้า BRD ไม่มี NFR ครอบคลุมหมวดที่จำเป็นสำหรับ Test Plan, หรือ risk/
environment ที่ต้องระบุไม่มีที่มาชัดเจนจาก BRD §8 **ห้ามสมมติเองโดยไม่
ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการสร้าง/แก้ไขเอกสาร

---

## Section A: Source Reading (การอ่านต้นทาง)

อ่านให้ครบก่อนเริ่มเขียนเสมอ:

1. **BRD §7 (Non-Functional Requirements)** — ทุกหมวด (Security,
   Privacy/PDPA, Performance, Scalability, Availability,
   Maintainability, Usability, Auditability) เป็นฐานหลักของ "ประเภทการ
   ทดสอบ" และ "Risk Management"
2. **BRD §8 (Risks and Constraints)** — เป็นฐานหลักของ Risk Management
   section (ห้ามแต่ง risk ใหม่ที่ไม่มีที่มาจากตรงนี้)
3. **Feature List** (`01-requirements/03-feature-list.md`) — ใช้กำหนด
   Scope (In/Out) ตาม MoSCoW: Must/Should have = in scope หลัก, Could/
   Won't have = out of scope หรือ Post-MVP
4. **Product Backlog** — ใช้อ้าง sprint/epic context สำหรับ entry/exit
   criteria ต่อ sprint (ถ้าเกี่ยวข้อง)
5. **`02-design/03-system-architecture.md`** — ใช้กำหนด Test
   Environment ให้ตรงกับ tech stack จริง (Firebase/Firestore/Cloud
   Functions, Web/Mobile)

---

## Section B: Plan Proposal & Confirmation Gate (การเสนอแผนและขอยืนยันก่อนสร้างจริง)

**ทุกครั้ง** ที่จะสร้างหรือแก้ไข Test Plan ต้องเสนอโครงร่างให้ผู้ใช้ review
และรอการยืนยันก่อน**เขียนไฟล์จริง** — ห้ามข้ามขั้นตอนนี้แม้เป็นการแก้ไข
เล็กน้อยก็ตาม

แผนที่เสนอต้องระบุ:

1. หัวข้อ/section ที่จะครอบคลุมหรือแก้ไข
2. ที่มาของเนื้อหาแต่ละหมวด (BRD §7 / §8 / Feature List / Architecture)
3. ถ้าเป็นการแก้ไขเอกสารที่มีอยู่แล้ว — สรุปว่าอะไรเปลี่ยนจากเดิม

---

## Section C: Required Content Structure (โครงสร้างเนื้อหาที่ต้องมี)

Test Plan ต้องมีครบทุกหมวดต่อไปนี้ (ห้ามข้ามหมวดใดหมวดหนึ่ง):

1. **Scope (ขอบเขตการทดสอบ)**
   - In Scope — Feature ที่ทดสอบ (อ้าง FT-xxx ตาม MoSCoW Must/Should
     have เป็นหลัก)
   - Out of Scope — Feature ที่ยังไม่ทดสอบรอบนี้ (Could/Won't
     have/Post-MVP/Blocked) พร้อมเหตุผล
2. **Test Types (ประเภทการทดสอบ)** — อย่างน้อยต้องระบุแนวทางของแต่ละ
   ประเภท พร้อม map กับ NFR ที่เกี่ยวข้อง:
   - Functional Testing (อ้าง Acceptance Criteria/Test Case)
   - Security Testing (อ้าง NFR Security — server-side validation,
     ห้ามเชื่อ client)
   - Privacy/PDPA Compliance Testing (อ้าง NFR Privacy/PDPA)
   - Performance Testing (อ้าง NFR Performance — QR scan/reward ภายใน
     ไม่กี่วินาที)
   - Usability Testing (อ้าง NFR Usability)
   - Regression Testing (เมื่อมี Feature ใหม่กระทบ flow เดิม)
   - Auditability/Traceability Testing (อ้าง NFR Auditability — audit
     log immutable)
3. **Test Environment (สภาพแวดล้อมการทดสอบ)** — ตาม tech stack จริงจาก
   System Architecture (Firebase Authentication, Firestore, Cloud
   Functions, Web/Mobile) แยกตาม stage ที่เกี่ยวข้อง (เช่น
   Development/Staging) และระบุข้อจำกัดถ้ายังไม่มี environment จริง
   (ให้ระบุตรง ๆ ว่าเป็นแผนที่ตั้งใจไว้ ไม่ใช่ environment ที่ตั้งค่าไว้แล้ว)
4. **Risk Management (การบริหารความเสี่ยง)** — ตาราง Risk (จาก BRD §8) |
   Impact | Testing Mitigation (สิ่งที่การทดสอบจะช่วยลดความเสี่ยงนั้น
   อย่างไร)
5. **Entry Criteria (เกณฑ์เริ่มทดสอบ)** — เช่น ต้องมี Acceptance Criteria
   ของ Feature นั้นใน `acceptance-criteria.md` ก่อนเริ่มเขียน/รัน Test
   Case, ต้องมี environment พร้อมใช้งาน
6. **Exit Criteria (เกณฑ์จบการทดสอบ)** — เช่น Test Case ระดับ Must
   have ทั้งหมดผ่าน, ไม่มี defect ระดับ critical ที่ยังเปิดอยู่, audit
   log ตรวจสอบได้ครบ

ปิดท้ายด้วย: อ้างอิงไปยัง `04-testing/acceptance-criteria.md` และ
`04-testing/test-cases/*.md` ว่าเป็นแหล่ง detail ระดับล่างของกลยุทธ์นี้

---

## Section D: Output Format & Update Procedure (รูปแบบผลลัพธ์และวิธีอัปเดต)

ไฟล์ปลายทาง: `04-testing/test-plan.md` (เอกสารเดียวต่อโปรเจกต์ ไม่มี ID
scheme ต่อรายการ และไม่มี version folder เหมือน Prototype — เป็นเอกสาร
เดียวที่แก้ไขต่อเนื่อง)

Header: Project, Document Type (Test Plan), Phase (`04-testing`),
Version, Status, Date, Prepared by, Source + Revision History table

เมื่อ NFR (BRD §7/§8) หรือ Feature List scope เปลี่ยนแปลงจนกระทบกลยุทธ์
ให้แก้ไขหมวดที่กระทบโดยตรง (ไม่ใช่เขียนทับทั้งไฟล์) และเพิ่ม Revision
History entry ระบุว่าแก้เพราะอะไร

---

## Rules (กฎทั่วไป)

- ห้ามแต่ง risk/environment/NFR ใหม่ที่ไม่มีที่มาจาก BRD/Architecture
  จริง — ถ้าจำเป็นต้องเพิ่ม ให้ทำเครื่องหมาย "New — recommend adding to
  BRD" และใช้ Ambiguity Protocol ถ้าไม่แน่ใจ
- ห้ามเขียนไฟล์จริงก่อนได้รับการยืนยันแผนจากผู้ใช้ (Section B)
- ห้ามข้ามหมวดใดหมวดหนึ่งใน Section C
- ห้ามเขียน test case รายละเอียดในเอกสารนี้ — อ้างอิงไปยัง
  `test-cases/*.md` แทน
- ทุกครั้งที่แก้ไขต้องมี Revision History entry ใหม่
- พิจารณาเสมอ: Agile methodology, PDPA compliance, security,
  scalability (สอดคล้องกับ CLAUDE.md)
- หลังจากสร้าง/แก้ไขเสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` (ตาม skill
  `traceability-consistency-check`)
