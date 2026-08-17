# Prototype Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการสร้าง
**Prototype** ระดับแนวคิด (concept-level) อย่างน้อย 1 หน้าจอ โดยใช้
**Business Requirement, Product Backlog, Feature List, และ User
Journey ทั้ง 4 เอกสารเป็นฐานข้อมูลหลัก** (แต่ผู้ใช้/agent สามารถระบุ
เจาะจง Feature หรือหน้าจอที่ต้องการได้เสมอ ไม่จำเป็นต้องครอบคลุมทุก
Feature) เพื่อให้เห็นภาพหน้าจอจริงของขั้นตอนสำคัญใน journey โดยไม่ผูก
กับ framework หรือ tech stack ใดเจาะจง (เนื่องจากยังไม่มีการตัดสินใจ
frontend framework ใน `02-design/03-system-architecture.md`)

ใช้งานโดย agent `prototype-designer`

โจทย์ของโปรเจกต์อนุญาตให้ **"เลือกบางข้อมาส่ง"** — ไม่จำเป็นต้องทำ
Prototype ครบทุก Feature แต่ Prototype ที่ทำต้อง **สอดคล้องกับ Feature/
User Journey เดียวกันกับที่เลือกไว้ใน Test Case** ถ้ามี Test Case
(`04-testing/test-cases/*.md`) อยู่แล้ว (ดู Section A)

Prototype ทุกหน้าต้อง **อ้างอิง Design Token จาก `02-design/DESIGN.md`
เสมอ** (ดู Section B) และการสร้าง/แก้ไขทุกครั้งต้อง**เสนอแผนให้ผู้ใช้
ยืนยันก่อน** (ดู Section C) รวมถึงต้องตัดสินใจเรื่อง **Folder Version**
ทุกครั้งที่เรียกซ้ำ (ดู Section D)

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้ายังไม่รู้ว่าควรเลือก Feature/หน้าจอไหนเป็นขอบเขต, Journey มีหลาย
หน้าจอที่เป็นไปได้เท่า ๆ กัน, หรือมีจุดตัดสินใจอื่นที่ไม่ชัดเจน (เช่น
Folder Version ใหม่ vs แก้ไขล่าสุด) **ห้ามสมมติเองโดยไม่ถาม** ให้ทำตามนี้
เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการสร้าง/แก้ไข prototype

---

## Section A: Scope Selection (การเลือกขอบเขต)

1. **อ่านฐานข้อมูลหลักทั้ง 4 ฉบับให้ครบก่อนเสมอ**:
   `01-requirements/01-business-requirement.md` (BRD),
   `01-requirements/02-product-backlog.md` (Backlog),
   `01-requirements/03-feature-list.md` (Feature List — FT + Description),
   `02-design/04-user-journey.md` (User Journey diagram และ label
   FR/US ที่ผูกไว้) และ NFR ด้าน Usability ใน BRD §7
2. **ถ้าผู้ใช้ระบุ Feature/หน้าจอเจาะจงมาแล้ว** (เช่น "ทำ prototype ของ
   FT-003" หรือ "หน้าจอสแกน QR") ให้ใช้ขอบเขตนั้นได้ทันที โดยยังต้องอ่าน
   เอกสารข้อ 1 ให้ครบเพื่อยืนยันว่า FT/journey step ที่ระบุมีอยู่จริง
3. **ถ้าผู้ใช้ยังไม่ระบุเจาะจง** ให้ตรวจสอบขอบเขตที่มีอยู่แล้วตามลำดับนี้
   ก่อนใช้ Ambiguity Protocol:
   - เปิด `04-testing/test-cases/` (ถ้ามีไฟล์อยู่แล้ว) — ถ้ามี Feature
     ที่ถูกเลือกไว้แล้วสำหรับ Test Case ให้ใช้ Feature **เดียวกัน** เป็น
     ค่าเริ่มต้น เพื่อให้ Test Case และ Prototype สอดคล้องกัน
   - ถ้าไม่มี Test Case หรือยังไม่ได้เลือกขอบเขตไว้ ห้ามเลือกเอง — ใช้
     Ambiguity Protocol เสนอ Feature/หน้าจอที่เหมาะสมอย่างน้อย 3
     ตัวเลือกจาก Feature List + User Journey โดยตรง (ไม่ต้องรอ Test Case)
4. เลือก **หนึ่งหน้าจอ (node เดียว)** จาก User Journey diagram ของ
   Feature นั้นที่เป็นจุดที่ผู้ใช้ตัดสินใจ/มีปฏิสัมพันธ์มากที่สุด (เช่น
   "Merchant Pending Queue — Approve/Reject" สำหรับ FT-005, "QR Scan
   Confirmation" สำหรับ FT-003)

---

## Section B: Design System Dependency (การอ้างอิง Design System)

Prototype ทุกหน้า**ต้องอ้างอิง Design Token จาก `02-design/DESIGN.md`**
— ห้าม hardcode สี/font/spacing ใหม่ที่ไม่มีอยู่ใน DESIGN.md

1. **ตรวจสอบก่อนเริ่มออกแบบทุกครั้ง** ว่า `02-design/DESIGN.md` มีอยู่
   และครบทั้ง 4 หมวด (Brand Identity & CI / Design Tokens / UI
   Components & Patterns / UX Guidelines & Rules) หรือไม่
2. **ถ้าไม่มี หรือมีแต่ไม่ครบ** — ห้ามสร้าง prototype ต่อไปโดยไม่มี
   design system ห้ามสมมติสี/สไตล์เอง ให้เรียกใช้ agent
   `design-system-creator` (ตาม skill `design-system-creation`) ก่อน
   เสมอ เพื่อให้ผู้ใช้เลือกโทนสี/สไตล์/ส่งตัวอย่างโลโก้ และสร้าง/เติม
   `DESIGN.md` ให้ครบก่อน จึงกลับมาทำ Section A/C/D ต่อ
3. **ถ้ามีอยู่แล้วและครบ** — ดึง token ที่เกี่ยวข้อง (สี, font, spacing,
   component pattern) มาใช้ในหน้าจอที่จะสร้าง และระบุไว้ใน Plan (Section
   C) ว่าจะใช้ token ชุดใดบ้าง
4. ไฟล์ mockup ทุกไฟล์ต้องใช้ค่าจาก `DESIGN.md` จริง (เช่นใส่เป็น CSS
   custom property ที่ตรงกับชื่อ token ใน DESIGN.md หรือ comment อ้างอิง
   ชื่อ token ไว้ข้าง ๆ ค่า) เพื่อ traceability กลับไปยัง design system

---

## Section C: Plan Proposal & Confirmation Gate (การเสนอแผนและขอยืนยันก่อนสร้างจริง)

**ทุกครั้ง** ที่จะสร้างหรือแก้ไข Prototype (ไม่ว่าขอบเขตจะชัดเจนหรือไม่ก็
ตาม) ต้องเสนอแผนให้ผู้ใช้ review และรอการยืนยันอย่างชัดเจนก่อน**เขียนไฟล์
จริง** — ห้ามข้ามขั้นตอนนี้แม้ทุกอย่างดูชัดเจนแล้วก็ตาม

แผนที่เสนอต้องระบุครบ:

1. **หน้าจอที่จะสร้าง/แก้ไข** — ชื่อหน้าจอ + node ใน User Journey ที่เลือก
2. **Traceability** — FT-xxx / FR-xxx / US-xxx / Journey step ที่เกี่ยวข้อง
3. **Design Token ที่จะใช้** — สรุปสั้น ๆ จาก `DESIGN.md` (สีหลัก, font,
   pattern ของ component ที่จะใช้)
4. **Folder ปลายทาง** — ผลจากการตัดสินใจใน Section D (version ใหม่ หรือ
   แก้ไข version ล่าสุด พร้อมเหตุผล)
5. **สิ่งที่จะไม่ครอบคลุม (out of scope)** ของ prototype นี้ ถ้ามี

ผู้ใช้ต้องตอบยืนยัน (เช่น "ตกลง"/"ยืนยัน"/"ทำต่อได้") ก่อนจึงเขียนไฟล์
mockup และอัปเดต log จริง ถ้าผู้ใช้ขอแก้แผน ให้ปรับแผนใหม่แล้วเสนอซ้ำ
จนกว่าจะได้รับการยืนยัน

---

## Section D: Folder Versioning Protocol (การจัดการ Folder Version)

Prototype ทุกหน้าเก็บอยู่ใน **folder version** ภายใต้
`03-development/prototypes/` โดยตั้งชื่อ folder แบบ **`v1/`, `v2/`,
`v3/`, ...** ตามลำดับการสร้าง (sequential versioning)

### D.1 เมื่อเรียกใช้งานครั้งแรก (ยังไม่มี version folder ใดเลย)

สร้าง `03-development/prototypes/v1/` และเก็บไฟล์ mockup แรกไว้ที่นั่น
ไม่ต้องถามเรื่อง versioning (เพราะยังไม่มี version ให้เลือก)

### D.2 เมื่อเรียกใช้งานซ้ำ (มี version folder อยู่แล้วอย่างน้อย 1 folder)

**ต้องถามผู้ใช้ทุกครั้ง** ว่าต้องการ:

- **(A) สร้าง Folder Version ใหม่** (`v<N+1>/`) — คัดลอกไฟล์ที่ไม่ได้แก้
  จาก version ล่าสุดมาไว้ด้วย (เพื่อให้ v ใหม่สมบูรณ์) แล้วเพิ่ม/แก้ไฟล์
  ที่ต้องการใน version ใหม่นี้เท่านั้น (version เก่ายังคงอยู่ไม่เปลี่ยนแปลง)
- **(B) แก้ไข Folder Version ล่าสุด** (`v<N>/`) ตรง ๆ — ไม่สร้าง version
  ใหม่ แก้ไฟล์ในที่เดิม

ให้คำแนะนำเสมอ (ไม่ตัดสินใจแทนผู้ใช้) ตามเกณฑ์นี้:

| สถานการณ์ | คำแนะนำ | เหตุผล |
|---|---|---|
| แก้ไขเล็กน้อย/bug ของหน้าจอเดิม, ปรับ copy/สไตล์ที่ไม่กระทบ flow | **(B) แก้ไขล่าสุด** | ยังเป็นงานชิ้นเดียวกัน ไม่จำเป็นต้องแยกประวัติ ลด clutter ของ folder |
| มี Requirement ใหม่ (BRD/Backlog/Feature List เปลี่ยน), เปลี่ยนแนวทาง UX อย่างมาก, หรือต้องการเทียบ/ย้อนดูของเก่าได้ | **(A) สร้าง version ใหม่** | รักษาประวัติของแนวทางก่อนหน้าไว้ rollback/เทียบเคียงได้ สอดคล้องกับหลัก traceability ของโปรเจกต์ |
| เพิ่มหน้าจอใหม่ที่ไม่กระทบหน้าจอเดิมใน version ปัจจุบัน | **(B) แก้ไขล่าสุด** (เพิ่มไฟล์ใหม่ใน folder เดิม) | ไม่มีการเปลี่ยนแปลงของเดิม การแยก version ไม่จำเป็น |
| ไม่แน่ใจ/สถานการณ์ผสมกัน | ใช้ Ambiguity Protocol เสนอทั้ง (A) และ (B) พร้อมข้อดี/ข้อเสียตามตารางนี้ แล้วให้ผู้ใช้ตัดสินใจ | ป้องกันการตัดสินใจแทนผู้ใช้ในกรณีกำกวม |

ไม่ว่าผู้ใช้เลือกแบบใด ต้องนำผลลัพธ์ไประบุใน Plan Proposal (Section C
ข้อ 4) ก่อนเขียนไฟล์จริงเสมอ

---

## Section E: Prototype Constraints (ข้อจำกัดของ Prototype)

ตาม CLAUDE.md หมวด 6 "Development Principle": **Client side ทำหน้าที่
เฉพาะ UI และ user interaction เท่านั้น** ดังนั้น prototype ในระดับนี้ต้อง:

- เป็น **static mockup** เท่านั้น (plain HTML/CSS + JavaScript เพียง
  เท่าที่จำเป็นสำหรับจำลอง interaction เช่น การกดปุ่มเปลี่ยนหน้าจอ)
- ใช้ **mock data ที่ hardcode ไว้ในไฟล์** เท่านั้น ห้ามเชื่อมต่อ Firebase /
  Firestore / Cloud Functions หรือ API จริงใด ๆ
- ห้ามคำนวณหรือ validate business logic จริง (เช่น การคำนวณ SP Point,
  การตรวจสอบ QR) — ถ้าต้องแสดงผลลัพธ์ของ logic นั้น ให้แสดงเป็นค่า mock
  ที่ระบุไว้ชัดเจนว่าเป็นตัวอย่าง
- ต้องใช้ Design Token จาก `02-design/DESIGN.md` เท่านั้น (ดู Section B)
  — ห้าม hardcode สี/font/spacing ใหม่
- ต้องออกแบบให้เรียบง่าย ใช้งานง่าย สอดคล้องกับ NFR Usability ใน BRD §7
- ถ้าหน้าจอมีการเก็บข้อมูลส่วนบุคคล (เช่น ฟอร์มลงทะเบียน) ต้องแสดง PDPA
  consent element ไว้ด้วย แม้จะเป็น mock (สอดคล้องกับ FT-016)
- ไม่จำเป็นต้อง pixel-perfect หรือ responsive สมบูรณ์ — เน้นสื่อสาร flow
  และองค์ประกอบหลักของหน้าจอให้ตรงกับ journey step ที่เลือก

---

## Section F: Required Output Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

ไฟล์ปลายทาง:

1. `03-development/01-prototype-log.md` (เอกสารสะสม — index +
   traceability ของ prototype ทั้งหมดทุก version ไม่สร้างไฟล์ index ใหม่
   ทับ) ต้องมี:
   - Revision History
   - ตาราง: Prototype ID | Page Name | **Version Folder** | Related FT |
     Related FR | Related US | Related Journey Step | File Path |
     **Design Token อ้างอิง** | Status | หมายเหตุ
   - คำอธิบายสั้น ๆ ต่อ prototype แต่ละอัน: แสดงอะไร, ตัดสินใจอะไรได้บ้าง
     ในหน้าจอนี้, mock data ที่ใช้, design token หลักที่ใช้จาก DESIGN.md
2. `03-development/prototypes/v<N>/<slug>.html` (ไฟล์ mockup จริง ต่อ 1
   หน้าจอ 1 ไฟล์ อยู่ภายใต้ folder version ที่ตัดสินใจไว้ใน Section D)
   — ต้องมี HTML comment ที่หัวไฟล์ระบุ traceability: Related FT-xxx /
   FR-xxx / US-xxx / Journey Step, Design Token ที่ใช้ (อ้างชื่อ token
   จาก DESIGN.md), และข้อความ "Conceptual UI prototype — non-functional,
   no backend integration"

ID รูปแบบ: `PT-<เลข FT>-<ลำดับ>` เช่น FT-005 → `PT-005-01` (ID นี้คงเดิม
ไม่เปลี่ยนตาม version folder — ถ้า prototype เดิมถูกปรับใน version ใหม่
ให้ใช้ ID เดิม แล้วอัปเดตคอลัมน์ Version Folder/File Path ในตาราง index)

---

## Rules (กฎทั่วไป)

- ห้ามใส่ business logic หรือ backend integration จริง
- ห้ามออกแบบหน้าจอที่ไม่มีที่มาจาก User Journey/Feature List จริง
- ห้าม hardcode สี/font/spacing ที่ไม่มีอยู่ใน `02-design/DESIGN.md` —
  ถ้า DESIGN.md ยังไม่มี/ไม่ครบ ต้องเรียก `design-system-creator` ก่อน
  เสมอ (Section B)
- ห้ามเขียนไฟล์ mockup จริงก่อนได้รับการยืนยันแผนจากผู้ใช้ (Section C)
- ห้ามข้ามการถามเรื่อง Folder Version เมื่อมี version folder อยู่แล้ว
  (Section D) — ต้องถามทุกครั้งที่เรียกซ้ำ พร้อมให้คำแนะนำ ไม่ตัดสินใจแทน
- พิจารณาเสมอ: Agile methodology, PDPA compliance, usability, business
  value (สอดคล้องกับ CLAUDE.md)
- ทุกครั้งที่เพิ่ม/แก้ไข prototype ต้องเพิ่ม entry ใน Revision History ของ
  `01-prototype-log.md`
- หลังจากสร้าง/แก้ไข Prototype เสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` (ตาม skill
  `traceability-consistency-check`) เพื่อตรวจสอบว่า traceability กลับไป
  ยัง BRD/Backlog/Feature List/User Journey/Acceptance Criteria/Test
  Case/Test Plan ยังถูกต้องอยู่ครบทุกฉบับ (ตาม Prototype Consistency
  Checklist ท้าย Section B ของ skill `traceability-consistency-check`)
