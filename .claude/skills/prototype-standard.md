# Prototype Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการสร้าง
**Prototype** ระดับแนวคิด (concept-level) อย่างน้อย 1 หน้าจอ จาก Feature
(`FT-xxx`) หรือ User Journey ที่ถูกเลือกไว้เป็นขอบเขต เพื่อให้เห็นภาพหน้าจอ
จริงของขั้นตอนสำคัญใน journey โดยไม่ผูกกับ framework หรือ tech stack ใด
เจาะจง (เนื่องจากยังไม่มีการตัดสินใจ frontend framework ใน
`02-design/03-system-architecture.md`)

ใช้งานโดย agent `prototype-designer`

โจทย์ของโปรเจกต์อนุญาตให้ **"เลือกบางข้อมาส่ง"** — ไม่จำเป็นต้องทำ
Prototype ครบทุก Feature แต่ Prototype ที่ทำต้อง **สอดคล้องกับ Feature/
User Journey เดียวกันกับที่เลือกไว้ใน Test Spec** ตามที่โจทย์ระบุไว้

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้ายังไม่รู้ว่าควรเลือก Feature/หน้าจอไหนเป็นขอบเขต หรือ Journey มีหลาย
หน้าจอที่เป็นไปได้เท่า ๆ กัน **ห้ามสมมติเองโดยไม่ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการสร้าง/แก้ไข prototype

---

## Section A: Scope Selection (การเลือกขอบเขต)

1. **ตรวจสอบขอบเขตที่มีอยู่แล้วก่อนเสมอ** — เปิด `04-testing/01-test-spec.md`
   (ถ้ามี) ดูว่ามี Feature/Journey ใดถูกเลือกไว้แล้วสำหรับ Test Spec
   **ให้ใช้ Feature/Journey เดียวกัน** เป็นค่าเริ่มต้นสำหรับ Prototype
   เพื่อให้ Day 1/Day 2 สอดคล้องกันตามที่โจทย์ระบุ
2. ถ้ายังไม่มีขอบเขตที่เลือกไว้ที่ใดเลย ห้ามเลือกเอง — ใช้ Ambiguity
   Protocol เสนอ Feature/หน้าจอที่เหมาะสม
3. เลือก **หนึ่งหน้าจอ (node เดียว)** จาก User Journey diagram ของ
   Feature นั้นที่เป็นจุดที่ผู้ใช้ตัดสินใจ/มีปฏิสัมพันธ์มากที่สุด (เช่น
   "Merchant Pending Queue — Approve/Reject" สำหรับ FT-005, "QR Scan
   Confirmation" สำหรับ FT-003)
4. อ่านให้ครบก่อนเริ่มออกแบบ: Feature List (FT + Description), User
   Journey (node/step ที่เลือก และ label FR/US ที่ผูกไว้), BRD §7 NFR
   (โดยเฉพาะ Usability — UX ต้องเรียบง่าย มี friction น้อย)

---

## Section B: Prototype Constraints (ข้อจำกัดของ Prototype)

ตาม CLAUDE.md หมวด 6 "Development Principle": **Client side ทำหน้าที่
เฉพาะ UI และ user interaction เท่านั้น** ดังนั้น prototype ในระดับนี้ต้อง:

- เป็น **static mockup** เท่านั้น (plain HTML/CSS + JavaScript เพียง
  เท่าที่จำเป็นสำหรับจำลอง interaction เช่น การกดปุ่มเปลี่ยนหน้าจอ)
- ใช้ **mock data ที่ hardcode ไว้ในไฟล์** เท่านั้น ห้ามเชื่อมต่อ Firebase /
  Firestore / Cloud Functions หรือ API จริงใด ๆ
- ห้ามคำนวณหรือ validate business logic จริง (เช่น การคำนวณ SP Point,
  การตรวจสอบ QR) — ถ้าต้องแสดงผลลัพธ์ของ logic นั้น ให้แสดงเป็นค่า mock
  ที่ระบุไว้ชัดเจนว่าเป็นตัวอย่าง
- ต้องออกแบบให้เรียบง่าย ใช้งานง่าย สอดคล้องกับ NFR Usability ใน BRD §7
- ถ้าหน้าจอมีการเก็บข้อมูลส่วนบุคคล (เช่น ฟอร์มลงทะเบียน) ต้องแสดง PDPA
  consent element ไว้ด้วย แม้จะเป็น mock (สอดคล้องกับ FT-016)
- ไม่จำเป็นต้อง pixel-perfect หรือ responsive สมบูรณ์ — เน้นสื่อสาร flow
  และองค์ประกอบหลักของหน้าจอให้ตรงกับ journey step ที่เลือก

---

## Section C: Required Output Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

ไฟล์ปลายทาง:

1. `03-development/01-prototype-log.md` (เอกสารสะสม — index +
   traceability ของ prototype ทั้งหมด ไม่สร้างไฟล์ index ใหม่ทับ)
   ต้องมี:
   - Revision History
   - ตาราง: Prototype ID | Page Name | Related FT | Related FR | Related
     US | Related Journey Step | File Path | Status | หมายเหตุ
   - คำอธิบายสั้น ๆ ต่อ prototype แต่ละอัน: แสดงอะไร, ตัดสินใจอะไรได้บ้าง
     ในหน้าจอนี้, mock data ที่ใช้
2. `03-development/prototypes/<slug>.html` (ไฟล์ mockup จริง ต่อ 1 หน้าจอ
   1 ไฟล์) — ต้องมี HTML comment ที่หัวไฟล์ระบุ traceability: Related
   FT-xxx / FR-xxx / US-xxx / Journey Step และข้อความ "Conceptual UI
   prototype — non-functional, no backend integration"

ID รูปแบบ: `PT-<เลข FT>-<ลำดับ>` เช่น FT-005 → `PT-005-01`

---

## Rules (กฎทั่วไป)

- ห้ามใส่ business logic หรือ backend integration จริง
- ห้ามออกแบบหน้าจอที่ไม่มีที่มาจาก User Journey/Feature List จริง
- พิจารณาเสมอ: Agile methodology, PDPA compliance, usability, business
  value (สอดคล้องกับ CLAUDE.md)
- ทุกครั้งที่เพิ่ม/แก้ไข prototype ต้องเพิ่ม entry ใน Revision History ของ
  `01-prototype-log.md`
- หลังจากสร้าง/แก้ไข Prototype เสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` (ตาม skill
  `traceability-consistency-check`) เพื่อตรวจสอบว่า traceability กลับไป
  ยัง BRD/Backlog/Feature List/User Journey/Test Spec ยังถูกต้องอยู่
