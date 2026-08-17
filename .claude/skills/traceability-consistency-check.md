# Traceability & Consistency Check Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับตรวจสอบและรักษาความสอดคล้อง
(consistency) ระหว่างเอกสารหลักทั้ง **6 ฉบับ** ของ ShopPlus Global ที่
ประกอบกันเป็นสาย traceability เดียว ตั้งแต่ requirement ไปจนถึง prototype:

1. **Business Requirement Document (BRD)** —
   `01-requirements/01-business-requirement.md` (FR-xxx, NFR)
2. **Product Backlog** — `01-requirements/02-product-backlog.md`
   (EPIC-xxx, US-xxx)
3. **Feature List** — `01-requirements/03-feature-list.md` (FT-xxx)
4. **User Journey** — `02-design/04-user-journey.md` (journey step ต่อ
   actor)
5. **Test Spec** — `04-testing/01-test-spec.md` (TC-xxx) — ถ้ามีอยู่แล้ว
6. **Prototype Log** — `03-development/01-prototype-log.md` (PT-xxx) —
   ถ้ามีอยู่แล้ว

เอกสาร 1–4 เป็นแกนหลักที่ต้องมีครบเสมอ ส่วนเอกสาร 5–6 เป็น "เลือกบางข้อ
มาส่ง" ตามขอบเขตที่ทีมเลือกทำ (ไม่จำเป็นต้องครอบคลุมทุก Feature) แต่ถ้ามี
อยู่แล้วต้อง sync ให้ตรงกับอีก 5 ฉบับเสมอเช่นกัน

เมื่อมีการแก้ไข/ปรับปรุงเอกสารใดเอกสารหนึ่งใน 6 ฉบับนี้ skill นี้กำหนดว่า
เอกสารที่เหลือควรถูกตรวจสอบและอัปเดตอย่างไร เพื่อให้ทุกฉบับสอดคล้องกัน
และเป็นเวอร์ชันล่าสุดตรงกันเสมอ (single source of truth ต่อ layer,
ไม่มี drift ระหว่างเอกสาร)

ใช้งานหลักโดย agent `traceability-consistency-auditor` และถูกอ้างอิงโดย
agent อีก 6 ตัว (`requirement-analyst`, `product-owner`,
`feature-list-analyst`, `user-journey-designer`, `test-spec-analyst`,
`prototype-designer`) เมื่อแก้ไขเอกสารของตนเสร็จ เพื่อ trigger การตรวจสอบ
ผลกระทบข้ามเอกสาร รวมถึงถูกเรียกใช้โดย agent หัวหน้า `Shopplus` (ตาม
skill `shopplus-orchestration`) หลังประสานงานหลาย sub-agent ในคำขอ
เดียวกัน

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

ถ้าพบความไม่สอดคล้องที่ **กระทบ business decision** (เช่น priority/MoSCoW
ที่ขัดแย้งกันโดยไม่มีคำอธิบาย, capability ใหม่ที่ยังไม่รู้ว่าควรอยู่ในขอบเขต
MVP หรือไม่, การตีความ Open Question ได้มากกว่าหนึ่งแบบ) **ห้ามสมมติเอง
โดยไม่ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนแก้ไขเอกสารใด ๆ

ความไม่สอดคล้องที่ **ไม่กระทบ business decision** (เช่น version header
ไม่ตรง, ID พิมพ์ผิด, ตาราง mapping ไม่ตรงตามกฎที่กำหนดตายตัวอยู่แล้ว)
สามารถแก้ไขได้ทันทีโดยไม่ต้องถาม (ดู Section C ข้อ 5)

---

## Section A: Traceability Chain & ID Scheme (สาย traceability และรูปแบบ ID)

| Layer | เอกสาร | ID หลัก | อ้างอิงกลับไปยัง |
|---|---|---|---|
| 1. Requirement | BRD | `FR-xxx` (functional), NFR (ตามหมวดหมู่ใน §7) | Business Problem / Objective |
| 2. Backlog | Product Backlog | `EPIC-xxx`, `US-xxx` | `FR-xxx` หรือ "New — แนะนำให้เพิ่มเข้า BRD" |
| 3. Feature | Feature List | `FT-xxx` | `FR-xxx` + `US-xxx` |
| 4. Journey | User Journey | Journey step (ไม่มี ID เฉพาะ อ้างอิงผ่าน node label) | `FT-xxx` / `FR-xxx` / `US-xxx` |
| 5. Test Spec (ถ้ามี) | Test Spec | `TC-<เลข FT>-<ลำดับ>` เช่น `TC-003-01` | `FT-xxx` / `FR-xxx` / `US-xxx` / Journey step |
| 6. Prototype (ถ้ามี) | Prototype Log | `PT-<เลข FT>-<ลำดับ>` เช่น `PT-005-01` | `FT-xxx` / `FR-xxx` / `US-xxx` / Journey step |

Cross-cutting: **Open Question** (อ้างอิงตามลำดับข้อใน BRD §Open
Questions) ใช้ร่วมกันใน Backlog (รายการ Blocked), Feature List (หมายเหตุ
Blocked), User Journey (§Open Items Affecting These Journeys), Test Spec
(test case ที่ mark Blocked), และ Prototype Log (ถ้าหน้าจอนั้นขึ้นอยู่กับ
คำตอบที่ยังไม่มี) — สถานะ (ยังไม่ตอบ / ตอบแล้ว) ต้องตรงกันทุกที่ที่ถูก
อ้างอิง

Cross-cutting อีกเส้นหนึ่ง: **Feature/Journey ที่ถูกเลือกเป็นขอบเขต**
สำหรับ Test Spec และ Prototype ต้องเป็น **Feature/Journey เดียวกัน**
เสมอ (ดู Section A ของ skill `test-spec-standard` และ
`prototype-standard`) — ถ้าพบว่า Test Spec กับ Prototype ที่มีอยู่อ้างอิง
Feature คนละตัวกัน ให้ถือเป็น ❓ ตาม Ambiguity Protocol

---

## Section B: Change Propagation Matrix (ตารางผลกระทบเมื่อมีการเปลี่ยนแปลง)

### เมื่อ **BRD** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม FR ใหม่ | Backlog: มี/เพิ่ม US ที่ map กับ FR นี้หรือยัง · Feature List: มี/เพิ่ม FT ที่ครอบคลุม · User Journey: เพิ่ม step ถ้าเป็น user-facing |
| เปลี่ยน priority (P0–P3) ของ FR | Feature List: คำนวณ MoSCoW ใหม่ตามตาราง mapping ใน skill `feature-list-and-user-journey.md` |
| Open Question ได้รับคำตอบแล้ว | Backlog: ปลด Blocked ของ US ที่เกี่ยวข้อง · Feature List: ปลด Blocked ของ FT ที่เกี่ยวข้อง, ปรับ MoSCoW ถ้าจำเป็น · User Journey: อัปเดต diagram/§Open Items ให้ตรงกับคำตอบจริง · Test Spec/Prototype (ถ้ามีและอ้างอิง Feature นี้): ปลด Blocked ของ test case ที่เกี่ยวข้อง |
| เพิ่ม/ลด Out of Scope | Backlog/Feature List/User Journey/Test Spec/Prototype (ถ้ามี): ลบหรือเพิ่ม entry ที่เกี่ยวข้องให้ตรงกัน |

### เมื่อ **Product Backlog** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม US/Epic ใหม่ที่ไม่มี FR ต้นทางใน BRD | BRD: ตั้งข้อสังเกต "New — แนะนำให้เพิ่มเข้า BRD" (ตาม convention เดิม) · Feature List: เพิ่ม/ตรวจสอบ FT · User Journey: เพิ่ม step ถ้าเป็น user-facing |
| เปลี่ยน priority/Sprint ของ US | Feature List: ตรวจสอบคอลัมน์ MoSCoW และ Sprint/Status |
| เพิ่ม/แก้ "Backlog Priority Deviation from BRD" | Feature List: MoSCoW ต้องตาม priority ที่ **backlog กำหนด** ไม่ใช่ BRD เดิม (ตาม convention ที่ใช้กับ FT-020/021/022) · BRD: ไม่แก้ priority เดิม (deviation ถูกบันทึกแยกไว้) |
| Story ถูกเลื่อนไป Post-MVP | Feature List: ย้าย FT ไป Could/Won't have · User Journey: ระบุ step นั้นเป็น Post-MVP หรือย้ายออก |

### เมื่อ **Feature List** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| สร้าง FT ใหม่ / จัดกลุ่ม FT ใหม่ (รวม/แยก) | User Journey: อัปเดต node label และตาราง Requirement Mapping ให้ตรงกับ FT-xxx ปัจจุบัน · Backlog/BRD: ตรวจว่า FT นั้นยัง trace กลับไปหา US/FR ที่มีอยู่จริง ถ้าไม่มีให้ใช้ Ambiguity Protocol · Test Spec/Prototype (ถ้าอ้างอิง FT นี้): แก้ ID/label ให้ตรงกับ FT ที่จัดกลุ่มใหม่ |
| เปลี่ยน MoSCoW ของ FT | Backlog: ตรวจว่าไม่ขัดกับ priority เดิมโดยไม่มีคำอธิบาย (ถ้าขัดแย้งให้ใช้ Ambiguity Protocol) |
| FT ถูก mark Blocked/ปลด Blocked | User Journey §Open Items: ต้องตรงกัน · Test Spec: ปลด/ตั้ง Blocked ของ test case ที่เกี่ยวข้องให้ตรงกัน |

### เมื่อ **User Journey** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม step ใหม่โดยไม่มี Feature อ้างอิง | Feature List: ตรวจว่ามี FT รองรับหรือยัง ถ้าไม่มีให้ flag เป็น capability ใหม่ · Backlog/BRD: ตรวจแบบเดียวกัน |
| Diagram มีจุดตัดสินใจ/business rule ใหม่ | BRD: ตรวจว่ามี FR/NFR/Acceptance Criteria รองรับกฎนั้นแล้วหรือยัง ถ้าไม่มีให้ตั้งข้อสังเกต "New — แนะนำให้เพิ่มเข้า BRD" |
| §Open Items ถูกแก้ (เพราะ Open Question ตอบแล้ว) | BRD: Open Question ต้องถูก mark ว่าตอบแล้วในเอกสารต้นทางด้วย · Backlog: ปลด Blocked ของ US ที่เกี่ยวข้อง |

### เมื่อ **Test Spec** เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม test case ใหม่ที่ครอบคลุม edge case ที่ไม่มีใน Acceptance Criteria เดิม | BRD/Backlog: ตั้งข้อสังเกต "New — recommend adding to Acceptance Criteria" · Feature List/User Journey: ตรวจว่า edge case นั้นควรถูกสะท้อนใน description/diagram ด้วยหรือไม่ |
| เลือก Feature/Journey ใหม่เป็นขอบเขต (เปลี่ยนจากเดิม) | Prototype Log: ตรวจว่า Feature/Journey ที่เลือกยังตรงกับ Test Spec หรือไม่ ถ้าไม่ตรงให้ใช้ Ambiguity Protocol ก่อนตัดสินใจว่าจะย้าย Prototype ตามหรือคงไว้ |
| Test case ถูก mark/ปลด Blocked | Feature List/Backlog: สถานะ Blocked ของ FT/US ที่เกี่ยวข้องต้องตรงกัน |

### เมื่อ **Prototype** เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่มหน้าจอใหม่ / เปลี่ยนหน้าจอที่เลือก | Test Spec: ตรวจว่า Feature/Journey ที่เลือกยังตรงกับ Prototype หรือไม่ ถ้าไม่ตรงให้ใช้ Ambiguity Protocol |
| หน้าจอแสดง field หรือ flow ที่ User Journey/Feature List ไม่ได้ระบุไว้ | User Journey/Feature List: ตรวจว่าเป็น capability ใหม่ที่ต้อง flag "New — แนะนำให้เพิ่มเข้า BRD" หรือเป็นแค่รายละเอียด UI ที่ไม่กระทบ requirement |
| หน้าจอเก็บข้อมูลส่วนบุคคลแต่ไม่มี PDPA consent element | BRD/Feature List (FT-016): ต้อง flag เป็น ❓ ทันที ห้ามปล่อยผ่าน — เป็นข้อกำหนดด้าน compliance ไม่ใช่แค่ UI |

---

## Section C: Consistency Check Procedure (ขั้นตอนที่ต้องทำตามลำดับเสมอ)

1. **ระบุ trigger** — เอกสารใดถูกแก้ไขล่าสุด (ดูจาก Revision History หรือ
   ตามที่ผู้ใช้ระบุ)
2. **อ่านเอกสารหลักทั้ง 4 ฉบับให้ครบ** ก่อนสรุปผลกระทบ ห้ามสรุปจาก
   เอกสารเดียว และ **อ่าน Test Spec/Prototype Log ด้วยถ้ามีอยู่แล้ว**
   (และอ่าน `02-design/01-transaction-flow.md` ประกอบถ้าผลกระทบเกี่ยวข้อง
   กับ status lifecycle)
3. **สร้าง/อัปเดต traceability matrix ภายใน** (FR ↔ US ↔ FT ↔ Journey
   step ↔ Open Question) ใช้เป็น working reference ระหว่างตรวจสอบ ไม่
   จำเป็นต้องส่งมอบเป็นไฟล์แยกต่างหาก เว้นแต่ผู้ใช้ร้องขอ
4. **ตรวจสอบตาม Change Propagation Matrix** (Section B) ตามทิศทางของ
   trigger ที่ระบุในข้อ 1
5. **แยกประเภทสิ่งที่พบ:**
   - ✅ สอดคล้องแล้ว — ไม่ต้องทำอะไร
   - 🔧 Drift ที่แก้ไขได้ทันทีโดยไม่กำกวม (เช่น version header ไม่ตรงกัน,
     ID อ้างอิงผิด/ตกหล่น, MoSCoW ไม่ตรงตามตาราง mapping ที่กำหนดตายตัว
     อยู่แล้ว) → แก้ไขได้เลย
   - ❓ Drift ที่กำกวมหรือกระทบ business decision → **ห้ามแก้เอง** ให้ใช้
     Ambiguity Protocol ด้านบน
6. สำหรับรายการ 🔧: อัปเดตเอกสารปลายทาง (แก้ไข ไม่ใช่สร้างทับ) และเพิ่ม
   entry ใหม่ใน Revision History ของเอกสารนั้น ระบุว่าแก้เพราะอะไรและ
   trigger จากการเปลี่ยนแปลงในเอกสารใด
7. สรุปผลทั้งหมดเป็น **Consistency Check Report** (ดู Section D)

---

## Section D: Consistency Check Report Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

1. **Scope** — เอกสารที่เป็น trigger ของการตรวจสอบครั้งนี้ + รายชื่อ
   เอกสารหลักทั้ง 4 ฉบับ (และ Test Spec/Prototype Log ถ้ามี) พร้อม
   version ที่อ่าน ณ ขณะตรวจสอบ
2. **Findings Summary** — ตาราง: ลำดับ | เอกสารที่พบปัญหา | รายละเอียด |
   ประเภท (🔧 แก้แล้ว / ❓ รอ stakeholder) | FR/US/FT/Journey step ที่
   เกี่ยวข้อง
3. **Actions Taken** — รายการเอกสารที่ถูกแก้ไขจริง พร้อม Revision History
   entry ที่เพิ่มในแต่ละไฟล์
4. **Open Items Needing Stakeholder Decision** — รายการ ❓ ที่ใช้ Ambiguity
   Protocol พร้อมตัวเลือกที่เสนอไว้
5. **Traceability Coverage** — สรุปเชิงปริมาณ เช่น "FR ครบ 22/22 ข้อ มี
   Feature อ้างอิงครบ", "US ครบ 25/25 ข้อ" — ถ้าไม่ครบให้ระบุ ID ที่ขาด
   และถ้ามี Test Spec/Prototype ให้ระบุด้วยว่า Feature/Journey ที่ทั้งคู่
   เลือกไว้เป็นตัวเดียวกันหรือไม่

---

## Rules (กฎทั่วไป)

- ห้ามแก้ไขเนื้อหาทางธุรกิจ (business decision) เอง — เช่น priority,
  MoSCoW, scope, กฎ SP Point — โดยไม่มีที่มาจากเอกสารที่เกี่ยวข้องจริง
  หรือคำตอบจากผู้ใช้ ต้องใช้ Ambiguity Protocol เสมอในกรณีเหล่านี้
- ทุกเอกสารที่ถูกแก้ไขต้องมี Revision History entry ใหม่เสมอ ห้ามแก้แบบ
  เงียบ (silent edit)
- ห้าม fabricate traceability ที่ไม่มีจริง — ถ้าหา FR/US ต้นทางไม่เจอ ให้
  ระบุว่า "New — แนะนำให้เพิ่มเข้า BRD/Backlog" ตาม convention เดิมของ
  โปรเจกต์ ไม่ใช่สร้าง ID ปลอมขึ้นมาเชื่อม
- เมื่อพบว่า Feature List หรือ User Journey อ้างอิง FR/US ที่ **ไม่มีอยู่
  จริง** ใน BRD/Backlog ฉบับปัจจุบัน ให้ถือเป็น ❓ เสมอ ห้ามลบ FT/step นั้น
  ทิ้งเอง
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  maintainability (สอดคล้องกับ CLAUDE.md)
- รันการตรวจสอบนี้ทุกครั้งที่มีการแก้ไข BRD, Backlog, Feature List, หรือ
  User Journey ไม่ว่าจะแก้ไขเพียงเล็กน้อยเพียงใด
