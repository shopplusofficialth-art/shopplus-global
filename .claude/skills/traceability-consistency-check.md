# Traceability & Consistency Check Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับตรวจสอบและรักษาความสอดคล้อง
(consistency) ระหว่างเอกสารหลักทั้ง **12 ฉบับ** ของ ShopPlus Global ที่
ประกอบกันเป็นสาย traceability เดียว ตั้งแต่ requirement ไปจนถึง test
case/prototype:

1. **Business Requirement Document (BRD)** —
   `01-requirements/01-business-requirement.md` (FR-xxx, NFR)
2. **Product Backlog** — `01-requirements/02-product-backlog.md`
   (EPIC-xxx, US-xxx)
3. **Feature List** — `01-requirements/03-feature-list.md` (FT-xxx)
4. **User Journey** — `02-design/04-user-journey.md` (journey step ต่อ
   actor)
5. **Acceptance Criteria** — `04-testing/acceptance-criteria.md`
   (AC-xxx) — ถ้ามีอยู่แล้ว
6. **Test Plan** — `04-testing/test-plan.md` (ไม่มี ID เฉพาะ, ระดับ
   โปรเจกต์) — ถ้ามีอยู่แล้ว
7. **Test Cases** — `04-testing/test-cases/<feature-slug>.md` (TC-xxx) —
   ถ้ามีอยู่แล้ว
8. **Prototype Log** — `03-development/01-prototype-log.md` (PT-xxx) —
   ถ้ามีอยู่แล้ว
9. **Design System** — `02-design/DESIGN.md` (Design Token) — ถ้ามีอยู่
   แล้ว ไม่ได้อยู่ในสาย FR/US/FT traceability โดยตรง แต่ Prototype (เอกสาร
   8) ทุกหน้าต้องอ้างอิง token จากเอกสารนี้ (ดู Section B "เมื่อ
   Prototype เปลี่ยน")
10. **Architecture (Conceptual)** — `02-design/03-system-architecture.md`
    — ถ้ามีอยู่แล้ว ไม่มี ID scheme ของตัวเอง แต่ทุก data flow/component
    ต้องอ้างอิง `FT-xxx` และ journey step ที่มีอยู่จริงใน User Journey
    (เอกสาร 4) โดยตรงในเนื้อหา และต้องไม่ผูกกับ technology/vendor
    เฉพาะเจาะจงนอกเหนือ section "Current Technical Direction (Non-Binding
    Reference)" ของเอกสารนั้น
11. **Database Schema (Conceptual)** — `02-design/05-database-schema.md`
    — ถ้ามีอยู่แล้ว ไม่มี ID scheme ของตัวเอง แต่ทุก entity ต้องอ้างอิง
    entity เดียวกันใน Architecture §6 (เอกสาร 10) และ `FT-xxx`/journey
    step ที่เกี่ยวข้องโดยตรงในเนื้อหา ต้องไม่ผูกกับ database
    engine/ORM เฉพาะเจาะจงนอกเหนือ section "Current Technical Direction
    (Non-Binding Reference)" และ**เป็นเอกสารแยกอิสระ**จาก
    `02-design/02-firestore-data-model.md` เดิม (ไม่ merge เนื้อหากัน)
12. **API Spec (Conceptual)** — `02-design/06-api-spec.md` — ถ้ามีอยู่
    แล้ว ไม่มี ID scheme ของตัวเอง แต่ทุก operation ต้องอ้างอิง
    entity/attribute ที่มีอยู่จริงใน Database Schema (เอกสาร 11) และ
    `FT-xxx`/journey step ที่เกี่ยวข้องโดยตรงในเนื้อหา ต้องไม่ผูกกับ
    protocol/HTTP method/URL scheme เฉพาะเจาะจงนอกเหนือ section
    "Current Technical Direction (Non-Binding Reference)" —
    **มี dependency บล็อกเด็ดขาดกับ Database Schema**: operation ที่อ้าง
    entity/attribute ที่ไม่มีอยู่จริงในเอกสาร 11 ถือเป็น ❓ ทันที

เอกสาร 1–4 เป็นแกนหลักที่ต้องมีครบเสมอ ส่วนเอกสาร 5–12 เป็น "เลือกบางข้อ
มาส่ง" ตามขอบเขตที่ทีมเลือกทำ (ไม่จำเป็นต้องครอบคลุมทุก Feature) แต่ถ้ามี
อยู่แล้วต้อง sync ให้ตรงกับเอกสารอื่นเสมอเช่นกัน

เมื่อมีการแก้ไข/ปรับปรุงเอกสารใดเอกสารหนึ่งใน 9 ฉบับนี้ skill นี้กำหนดว่า
เอกสารที่เหลือควรถูกตรวจสอบและอัปเดตอย่างไร เพื่อให้ทุกฉบับสอดคล้องกัน
และเป็นเวอร์ชันล่าสุดตรงกันเสมอ (single source of truth ต่อ layer,
ไม่มี drift ระหว่างเอกสาร)

ใช้งานหลักโดย agent `traceability-consistency-auditor` และถูกอ้างอิงโดย
agent อีก 12 ตัว (`requirement-analyst`, `product-owner`,
`feature-list-analyst`, `user-journey-designer`,
`acceptance-criteria-writer`, `test-plan-writer`, `test-case-writer`,
`design-system-creator`, `prototype-designer`, `architecture-designer`,
`database-schema-designer`, `api-spec-designer`) เมื่อแก้ไขเอกสารของตน
เสร็จ
เพื่อ trigger การตรวจสอบผลกระทบข้ามเอกสาร รวมถึงถูกเรียกใช้โดย agent
หัวหน้า `Shopplus` (ตาม skill `shopplus-orchestration`) หลังประสานงาน
หลาย sub-agent ในคำขอเดียวกัน และถูกเรียกใช้ซ้ำ ๆ ระหว่างการรันแบบ
ต่อเนื่องโดย `pipeline-orchestrator` (ตาม skill
`pipeline-orchestration`) หลังทุก stage

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
| 5. Acceptance Criteria (ถ้ามี) | `acceptance-criteria.md` | `AC-<เลข US>-<ลำดับ>` เช่น `AC-004-01` | `US-xxx` / `FT-xxx` / `FR-xxx` (Source อาจอ้าง `PT-xxx` เพิ่มเติมถ้า AC นั้น "confirmed via Prototype") |
| 6. Test Plan (ถ้ามี) | `test-plan.md` | ไม่มี ID เฉพาะ (เอกสารระดับโปรเจกต์) | BRD §7/§8, Feature List (Scope table), Product Backlog (sprint context) |
| 7. Test Case (ถ้ามี) | `test-cases/<feature-slug>.md` | `TC-<เลข FT>-<ลำดับ>` เช่น `TC-005-01` | `AC-xxx` (แหล่งหลัก) / `FR-xxx` / `US-xxx` / `FT-xxx` / Journey step |
| 8. Prototype (ถ้ามี) | Prototype Log | `PT-<เลข FT>-<ลำดับ>` เช่น `PT-005-01` | `FT-xxx` / `FR-xxx` / `US-xxx` / Journey step |
| 9. Architecture (Conceptual, ถ้ามี) | `02-design/03-system-architecture.md` | ไม่มี ID เฉพาะ (อ้างอิง `FT-xxx` / Journey step โดยตรงในเนื้อหาของแต่ละ data flow) | `FT-xxx` / Journey step ที่เกี่ยวข้อง |
| 10. Database Schema (Conceptual, ถ้ามี) | `02-design/05-database-schema.md` | ไม่มี ID เฉพาะ (อ้างอิงชื่อ entity ตรง ๆ) | Entity เดียวกันใน Architecture §6 / `FT-xxx` / Journey step |
| 11. API Spec (Conceptual, ถ้ามี) | `02-design/06-api-spec.md` | ไม่มี ID เฉพาะ (อ้างอิงชื่อ operation ตรง ๆ) | Entity/attribute ใน Database Schema (เอกสาร 10, บล็อกเด็ดขาด) / `FT-xxx` / Journey step |

Cross-cutting: **Open Question** (อ้างอิงตามลำดับข้อใน BRD §Open
Questions) ใช้ร่วมกันใน Backlog (รายการ Blocked), Feature List (หมายเหตุ
Blocked), User Journey (§Open Items Affecting These Journeys),
Acceptance Criteria/Test Case (item ที่ mark Blocked), และ Prototype Log
(ถ้าหน้าจอนั้นขึ้นอยู่กับคำตอบที่ยังไม่มี) — สถานะ (ยังไม่ตอบ / ตอบแล้ว)
ต้องตรงกันทุกที่ที่ถูกอ้างอิง

Cross-cutting อีกเส้นหนึ่ง: **Feature/Journey ที่ถูกเลือกเป็นขอบเขต**
สำหรับ Test Case และ Prototype ต้องเป็น **Feature/Journey เดียวกัน**
เสมอ (ดู Section A ของ skill `test-case-standard` และ
`prototype-standard`) — ถ้าพบว่า Test Case กับ Prototype ที่มีอยู่อ้างอิง
Feature คนละตัวกัน ให้ถือเป็น ❓ ตาม Ambiguity Protocol

Cross-cutting เส้นที่ 3 (บล็อกเด็ดขาด): **Test Case ต้องอ้าง Acceptance
Criteria ที่มีอยู่จริงเสมอ** — ถ้าพบ Test Case ที่อ้าง AC-xxx ที่ไม่มีอยู่
ใน `04-testing/acceptance-criteria.md` จริง ให้ถือเป็น ❓ ทันที (ไม่ใช่
🔧) เพราะเป็นการละเมิด dependency ที่กำหนดไว้ใน skill `test-case-standard`
Section B

---

## Section B: Change Propagation Matrix (ตารางผลกระทบเมื่อมีการเปลี่ยนแปลง)

### เมื่อ **BRD** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม FR ใหม่ | Backlog: มี/เพิ่ม US ที่ map กับ FR นี้หรือยัง · Feature List: มี/เพิ่ม FT ที่ครอบคลุม · User Journey: เพิ่ม step ถ้าเป็น user-facing |
| เปลี่ยน priority (P0–P3) ของ FR | Feature List: คำนวณ MoSCoW ใหม่ตามตาราง mapping ใน skill `feature-list-and-user-journey.md` |
| Open Question ได้รับคำตอบแล้ว | Backlog: ปลด Blocked ของ US ที่เกี่ยวข้อง · Feature List: ปลด Blocked ของ FT ที่เกี่ยวข้อง, ปรับ MoSCoW ถ้าจำเป็น · User Journey: อัปเดต diagram/§Open Items ให้ตรงกับคำตอบจริง · Acceptance Criteria/Test Case/Prototype (ถ้ามีและอ้างอิง Feature นี้): ปลด Blocked ของรายการที่เกี่ยวข้อง |
| เพิ่ม/ลด Out of Scope | Backlog/Feature List/User Journey/Acceptance Criteria/Test Plan (Scope table)/Test Case/Prototype (ถ้ามี): ลบหรือเพิ่ม entry ที่เกี่ยวข้องให้ตรงกัน |
| เปลี่ยน NFR (§7) หรือ Risk (§8) | Test Plan: อัปเดต §Test Types หรือ §Risk Management ให้ตรงกับ NFR/Risk ล่าสุด |
| §6.6 Acceptance Criteria (representative examples) ถูกแก้ไข | `04-testing/acceptance-criteria.md`: ตรวจว่า AC ที่ครอบคลุม scenario เดียวกัน (เช่น approve/reject/distribution ของ FT-005) ยังตรงกับตัวอย่างใน BRD §6.6 หรือไม่ — ถ้าขัดแย้งกันถือเป็น ❓ (BRD §6.6 เป็นตัวแทนระดับ business, `acceptance-criteria.md` เป็นรายละเอียดระดับ Backlog Item ทั้งสองต้องสื่อกฎเดียวกัน) |

### เมื่อ **Product Backlog** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม US/Epic ใหม่ที่ไม่มี FR ต้นทางใน BRD | BRD: ตั้งข้อสังเกต "New — แนะนำให้เพิ่มเข้า BRD" (ตาม convention เดิม) · Feature List: เพิ่ม/ตรวจสอบ FT · User Journey: เพิ่ม step ถ้าเป็น user-facing |
| เปลี่ยน priority/Sprint ของ US | Feature List: ตรวจสอบคอลัมน์ MoSCoW และ Sprint/Status |
| เพิ่ม/แก้ "Backlog Priority Deviation from BRD" | Feature List: MoSCoW ต้องตาม priority ที่ **backlog กำหนด** ไม่ใช่ BRD เดิม (ตาม convention ที่ใช้กับ FT-020/021/022) · BRD: ไม่แก้ priority เดิม (deviation ถูกบันทึกแยกไว้) |
| Story ถูกเลื่อนไป Post-MVP | Feature List: ย้าย FT ไป Could/Won't have · User Journey: ระบุ step นั้นเป็น Post-MVP หรือย้ายออก · Test Plan: ย้าย FT นั้นจาก In Scope ไป Out of Scope |
| Given/When/Then ของ US ถูกแก้ไข | Acceptance Criteria (ถ้า US นั้นมี AC อยู่แล้ว): ต้องอัปเดตให้ตรงกับ Backlog ล่าสุด (Backlog เป็นแหล่งหลัก) · Test Case (ถ้าอ้าง AC ของ US นั้น): ตรวจว่า test case ยังตรงกับ AC ที่อัปเดตหรือไม่ |

### เมื่อ **Feature List** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| สร้าง FT ใหม่ / จัดกลุ่ม FT ใหม่ (รวม/แยก) | User Journey: อัปเดต node label และตาราง Requirement Mapping ให้ตรงกับ FT-xxx ปัจจุบัน · Backlog/BRD: ตรวจว่า FT นั้นยัง trace กลับไปหา US/FR ที่มีอยู่จริง ถ้าไม่มีให้ใช้ Ambiguity Protocol · Acceptance Criteria/Test Case/Prototype (ถ้าอ้างอิง FT นี้): แก้ ID/label ให้ตรงกับ FT ที่จัดกลุ่มใหม่ · Test Plan: อัปเดตตาราง Scope ให้ตรงกับ FT ปัจจุบัน · Architecture (ถ้ามี): ตรวจว่า data flow ที่อ้าง FT นี้ยังตรงกับชื่อ/ขอบเขตปัจจุบันหรือไม่ · Database Schema/API Spec (ถ้ามี): ตรวจว่า entity/operation ที่อ้าง FT นี้ยังตรงกับชื่อ/ขอบเขตปัจจุบันหรือไม่ |
| เปลี่ยน MoSCoW ของ FT | Backlog: ตรวจว่าไม่ขัดกับ priority เดิมโดยไม่มีคำอธิบาย (ถ้าขัดแย้งให้ใช้ Ambiguity Protocol) · Test Plan: ย้าย FT ระหว่างตาราง In Scope/Out of Scope ตาม MoSCoW ใหม่ |
| FT ถูก mark Blocked/ปลด Blocked | User Journey §Open Items: ต้องตรงกัน · Acceptance Criteria/Test Case: ปลด/ตั้ง Blocked ของรายการที่เกี่ยวข้องให้ตรงกัน |

### เมื่อ **User Journey** เปลี่ยน

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม step ใหม่โดยไม่มี Feature อ้างอิง | Feature List: ตรวจว่ามี FT รองรับหรือยัง ถ้าไม่มีให้ flag เป็น capability ใหม่ · Backlog/BRD: ตรวจแบบเดียวกัน |
| Diagram มีจุดตัดสินใจ/business rule ใหม่ | BRD: ตรวจว่ามี FR/NFR/Acceptance Criteria รองรับกฎนั้นแล้วหรือยัง ถ้าไม่มีให้ตั้งข้อสังเกต "New — แนะนำให้เพิ่มเข้า BRD" |
| §Open Items ถูกแก้ (เพราะ Open Question ตอบแล้ว) | BRD: Open Question ต้องถูก mark ว่าตอบแล้วในเอกสารต้นทางด้วย · Backlog: ปลด Blocked ของ US ที่เกี่ยวข้อง |
| Decision branch (node) ของ Feature ที่มี Acceptance Criteria/Test Case อยู่แล้วถูกแก้ไข/ลบ/เพิ่ม | Acceptance Criteria: ตรวจว่า AC ที่อ้าง journey step นั้นยังตรงกับ diagram ล่าสุดหรือไม่ · Test Case (ถ้ามีไฟล์ของ Feature นั้นแล้ว): ตรวจ Traceability Summary ว่า Journey Step ที่อ้างอิงยังตรงกัน — ถ้า diagram เปลี่ยนจนทำให้ AC/Test Case เดิมไม่ตรงกับ flow จริง ให้ถือเป็น ❓ ทันที ห้ามปล่อยผ่านว่าเป็นแค่รายละเอียด diagram |
| Journey step/diagram เปลี่ยนจนกระทบ data flow ที่ Architecture เคยอธิบายไว้ | Architecture (ถ้ามี): ตรวจว่า section "Data Flow per User Journey" ยังตรงกับ diagram ล่าสุดหรือไม่ — ถ้าไม่ตรงให้ถือเป็น ❓ ทันที (ห้ามปล่อยให้ Architecture อธิบาย flow ที่ journey จริงไม่ได้ทำแบบนั้นแล้ว) |
| Journey step เปลี่ยนจนกระทบ operation ที่ API Spec เคยอ้างเป็น Trigger | API Spec (ถ้ามี): ตรวจว่า operation ที่อ้าง journey step นี้เป็น Trigger ยังตรงกับ diagram ล่าสุดหรือไม่ — ถือเป็น ❓ ทันทีถ้าไม่ตรง |

### เมื่อ **Acceptance Criteria** เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม AC ใหม่ที่ flag "New — recommend adding to Backlog/BRD" | Backlog/BRD: ตั้งข้อสังเกตเดียวกันไว้เพื่อรอ stakeholder ตัดสินใจ |
| AC ถูกแก้ไข/ลบ | Test Case (ถ้ามีไฟล์ที่อ้าง AC นั้นอยู่แล้ว): **ต้องตรวจสอบทันที** ว่า test case ที่อ้าง AC-xxx นั้นยังสอดคล้องอยู่หรือไม่ — ถือเป็น ❓ ถ้า Test Case ยังอ้าง AC เดิมที่ถูกลบ/เปลี่ยนความหมายไปแล้ว |
| AC ถูก mark/ปลด Blocked | Test Case ที่อ้างอิง AC นั้น: สถานะ Blocked ต้องตรงกัน |

### เมื่อ **Test Plan** เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เปลี่ยน Scope (In/Out) | ตรวจว่าตรงกับ MoSCoW ล่าสุดใน Feature List — ถ้าไม่ตรงถือเป็น ❓ |
| เพิ่ม Test Type ใหม่ที่ไม่มี NFR รองรับใน BRD §7 | BRD: ตั้งข้อสังเกต "New — recommend adding to NFR" |
| เพิ่ม Risk ใหม่ใน §Risk Management ที่ไม่มีที่มาจาก BRD §8 | BRD: ตั้งข้อสังเกต "New — recommend adding to BRD Risks" (ตาม convention เดียวกับ FR/AC ที่ยังไม่มีในเอกสารต้นทาง) — ห้ามปล่อยให้ Test Plan มี risk ที่ BRD ไม่รู้จักอยู่เงียบ ๆ |

### เมื่อ **Test Case** เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม test case ใหม่ที่ครอบคลุม edge case ที่ไม่มีใน Acceptance Criteria เดิม | Acceptance Criteria: **ต้องเพิ่ม AC ที่เกี่ยวข้องก่อนหรือพร้อมกัน** (ตาม dependency ของ skill `test-case-standard` Section B) ห้ามมี test case ที่ไม่มี AC รองรับหลงเหลืออยู่ — ถ้าพบให้ถือเป็น ❓ ทันที ไม่ใช่ 🔧 · Feature List/User Journey: ตรวจว่า edge case นั้นควรถูกสะท้อนใน description/diagram ด้วยหรือไม่ |
| เลือก Feature ใหม่เป็นขอบเขต (เปลี่ยนจากเดิม) | Prototype Log: ตรวจว่า Feature ที่เลือกยังตรงกับ Prototype หรือไม่ ถ้าไม่ตรงให้ใช้ Ambiguity Protocol ก่อนตัดสินใจว่าจะย้าย Prototype ตามหรือคงไว้ |
| Test case ถูก mark/ปลด Blocked | Feature List/Backlog: สถานะ Blocked ของ FT/US ที่เกี่ยวข้องต้องตรงกัน |

### เมื่อ **Prototype** เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่มหน้าจอใหม่ / เปลี่ยนหน้าจอที่เลือก | Test Case: ตรวจว่า Feature ที่เลือกยังตรงกับ Prototype หรือไม่ ถ้าไม่ตรงให้ใช้ Ambiguity Protocol |
| หน้าจอแสดง field หรือ flow ที่ User Journey/Feature List ไม่ได้ระบุไว้ | User Journey/Feature List: ตรวจว่าเป็น capability ใหม่ที่ต้อง flag "New — แนะนำให้เพิ่มเข้า BRD" หรือเป็นแค่รายละเอียด UI ที่ไม่กระทบ requirement |
| หน้าจอเก็บข้อมูลส่วนบุคคลแต่ไม่มี PDPA consent element | BRD/Feature List (FT-016): ต้อง flag เป็น ❓ ทันที ห้ามปล่อยผ่าน — เป็นข้อกำหนดด้าน compliance ไม่ใช่แค่ UI |
| หน้าจอ mockup ใช้สี/font/spacing ที่ไม่มีอยู่ใน `02-design/DESIGN.md` (hardcode เอง) | ถือเป็น ❓ ทันที — ต้องแจ้งให้แก้ไขให้อ้างอิง token จาก DESIGN.md จริง หรือถ้า token ที่ต้องการยังไม่มีใน DESIGN.md ให้แนะนำเรียก `design-system-creator` เพิ่ม token นั้นก่อน ห้ามปล่อยผ่านว่าเป็นแค่รายละเอียด UI |
| Behavior ของหน้าจอที่ Acceptance Criteria เคยอ้างเป็น Source เปลี่ยนไป (เช่น AC ที่ mark "confirmed via Prototype PT-xxx") | Acceptance Criteria: ตรวจว่า AC นั้นยังตรงกับ behavior ใหม่ของ prototype หรือไม่ — ถ้า prototype เปลี่ยนจนขัดกับ AC เดิมที่อ้างมันเป็น source ให้ถือเป็น ❓ ทันที (ห้ามปล่อยให้ AC อ้าง prototype ที่ไม่ตรงกันแล้วเงียบ ๆ) |
| หน้าจอแสดงผลลัพธ์/ปุ่ม/flow ที่ไม่ตรงกับ Given/When/Then ของ US-xxx ที่เกี่ยวข้องใน Backlog | Backlog: ตรวจว่า US ที่เกี่ยวข้องยังอธิบาย flow นี้ตรงกันหรือไม่ — ถ้า prototype ตีความ Backlog ผิด ต้องแก้ prototype (ไม่ใช่แก้ Backlog ตาม prototype) ถ้า Backlog เองไม่ครอบคลุม flow ที่แสดง ให้ flag "New — แนะนำให้เพิ่มเข้า Backlog/BRD" |
| Feature ที่ prototype แทน ไม่อยู่ใน In Scope table ของ Test Plan (เช่น อยู่ใน Out of Scope/Post-MVP) | Test Plan: ถือเป็น ❓ ทันที — ต้องถามผู้ใช้ว่าจะขยับ Feature นั้นเข้า In Scope ของ Test Plan หรือ prototype ทำ Feature ผิดขอบเขต ห้ามปล่อยให้ prototype มีอยู่โดยไม่มี test strategy รองรับ |

### เมื่อ **Design System** (`DESIGN.md`) เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| **แก้ไข** token เดิม (เปลี่ยนค่าสี/font/spacing ของ token ที่มีชื่ออยู่แล้ว ไม่ใช่แค่เพิ่มใหม่) | Prototype (ทุก version folder ที่มีอยู่): ตรวจว่าไฟล์ mockup ที่อ้าง token นั้นยังแสดงค่าที่ตรงกับ `DESIGN.md` เวอร์ชันล่าสุดหรือไม่ — ถ้า mockup hardcode ค่าเดิมไว้ (ไม่ได้ผูกกับชื่อ token แบบ dynamic) ให้ถือเป็น ❓ และแนะนำให้ปรับ mockup ให้ตรงกับค่าใหม่ |
| **ลบ** token ที่มี Prototype อ้างอิงอยู่ | ถือเป็น ❓ ทันที ห้ามลบ token ที่ยังมี Prototype ใช้งานอยู่โดยไม่แจ้งเตือน — ต้องถามผู้ใช้ก่อนว่าจะอัปเดต Prototype ให้ใช้ token อื่นแทน หรือคง token เดิมไว้ |
| เปลี่ยนแนวทางออกแบบทั้งหมด (เช่น เปลี่ยนจาก Earth Tone เป็นทิศทางอื่น) | Prototype ทุกไฟล์: ต้อง flag เป็น ❓ ว่าต้อง regenerate ใหม่ทั้งหมดหรือไม่ — เป็นการเปลี่ยนแปลงระดับ brand decision ห้ามตัดสินใจแทนผู้ใช้ |

### เมื่อ **Architecture** (`02-design/03-system-architecture.md`) เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| Data flow ใหม่/แก้ไขที่อ้าง `FT-xxx` หรือ journey step ที่ **ไม่มีอยู่จริง** ใน Feature List/User Journey ปัจจุบัน | ถือเป็น ❓ ทันที (ละเมิด dependency ของ skill `architecture-design-standard`) — แนะนำให้แก้ data flow ให้ตรงกับ Feature/Journey ที่มีอยู่จริง หรือ flag "New — แนะนำให้เพิ่มเข้า User Journey/BRD" ถ้าเป็น capability ใหม่ที่ยังไม่มีที่มา |
| เพิ่ม component/capability ใหม่ในเอกสารที่ Feature List ไม่ได้ระบุไว้ | Feature List/BRD: ตั้งข้อสังเกต "New — แนะนำให้เพิ่มเข้า BRD/Feature List" ตาม convention เดิม |
| Section หลัก (layer/component/data flow) ถูกแก้ไขให้ระบุชื่อ technology/vendor เฉพาะเจาะจง นอกเหนือ section "Current Technical Direction (Non-Binding Reference)" | ถือเป็น ❓ ทันที — ละเมิดหลักการ conceptual/technology-agnostic ของเอกสารนี้ ต้องย้ายรายละเอียดนั้นไปไว้ใน section ที่ถูกต้อง |
| "Current Technical Direction" ขัดกับทิศทางเทคนิคที่ระบุใน `CLAUDE.md` หมวด 6 | ถือเป็น ❓ ทันที — เป็นการเปลี่ยนแปลงระดับ technical direction ห้ามตัดสินใจแทนผู้ใช้ |
| §6 "Key Conceptual Data Entities" เพิ่ม/แก้/ลบ entity | Database Schema (ถ้ามี): ตรวจว่า Entity Catalog ยังตรงกับ §6 ปัจจุบัน — entity ที่ถูกลบต้องตรวจว่า API Spec (ถ้ามี) ยังมี operation อ้างอิงอยู่หรือไม่ ถ้ามีให้ถือเป็น ❓ ทันที (ห้ามลบ entity ที่ยังมี operation ใช้งานอยู่โดยไม่แจ้งเตือน) |
| §7 "Security & Access Control" เปลี่ยน role/สิทธิ์ | Database Schema (ถ้ามี): ตรวจว่า Access Control Matrix ยังตรงกัน — ถือเป็น ❓ ถ้าขัดแย้งกัน |

### เมื่อ **Database Schema** (`02-design/05-database-schema.md`) เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| เพิ่ม entity ที่ไม่มีที่มาจาก Architecture §6 | Architecture: ตั้งข้อสังเกต "New — แนะนำให้เพิ่มเข้า Architecture §6" ตาม convention เดิม (ห้ามปล่อยให้ Database Schema มี entity ที่ Architecture ไม่รู้จักอยู่เงียบ ๆ) |
| แก้ไข/ลบ attribute ที่ API Spec เคยอ้างอิงใน Request/Response ของ operation ใด | API Spec (ถ้ามี): **ต้องตรวจสอบทันที** ว่า operation ที่อ้าง attribute นั้นยังสอดคล้องอยู่หรือไม่ — ถือเป็น ❓ ถ้า API Spec ยังอ้าง attribute เดิมที่ถูกลบ/เปลี่ยนความหมายไปแล้ว (บล็อกเด็ดขาดตาม skill `data-api-design-standard` Section B) |
| เปลี่ยน PDPA Classification ของ attribute (เช่นจาก Public เป็น Personal Data) | API Spec (ถ้ามี): ตรวจว่า operation ที่คืนค่า attribute นั้นมี PDPA & Security Notes รองรับแล้วหรือยัง ถ้ายังไม่มีถือเป็น ❓ ทันที |
| ลบ entity ที่ API Spec ยังมี operation อ้างอิงอยู่ | ถือเป็น ❓ ทันที ห้ามลบโดยไม่แจ้งเตือน — ต้องถามผู้ใช้ก่อนว่าจะอัปเดต/ลบ operation ที่เกี่ยวข้องใน API Spec ด้วยหรือไม่ |
| Relationship ระหว่าง entity เปลี่ยน (1:1/1:N/N:M) | ตรวจว่า ER Diagram (Mermaid) ยังตรงกับตาราง Relationships ที่แก้ไข — 🔧 แก้ diagram ให้ตรงได้ทันทีถ้าไม่กำกวม |

### เมื่อ **API Spec** (`02-design/06-api-spec.md`) เปลี่ยน (ถ้ามี)

| การเปลี่ยนแปลง | ต้องตรวจสอบ/อัปเดต |
|---|---|
| operation ใหม่/แก้ไขที่อ้าง entity/attribute ที่ **ไม่มีอยู่จริง** ใน Database Schema ปัจจุบัน | ถือเป็น ❓ ทันที (ละเมิด dependency ของ skill `data-api-design-standard` Section B) — แนะนำให้เรียก `database-schema-designer` เพิ่ม entity/attribute ที่ขาด ไม่ใช่ปล่อยให้ operation อ้าง field ที่ไม่มีจริง |
| operation ใหม่ที่อ้าง `FT-xxx`/journey step ที่ไม่มีอยู่จริง | ถือเป็น ❓ ทันที เช่นเดียวกับกรณีของ Architecture |
| Section หลัก (Operation Catalog, Resource Mapping) ถูกแก้ไขให้ระบุ protocol/HTTP method/URL scheme เฉพาะเจาะจง นอกเหนือ section "Current Technical Direction (Non-Binding Reference)" | ถือเป็น ❓ ทันที — ละเมิดหลักการ conceptual/technology-agnostic |
| operation ที่คืนค่า personal data ไม่มี PDPA & Security Notes | ถือเป็น ❓ ทันที — ละเมิด CLAUDE.md หมวด 10 |

**หมายเหตุ:** สำหรับ Prototype โดยเฉพาะ ให้ใช้ **Prototype Consistency
Checklist** ด้านล่างประกอบการตรวจทุกครั้ง เพื่อให้ครอบคลุมครบทั้ง 7
เอกสารอย่างเป็นระบบ ไม่ใช่รอให้ตรงกับ trigger ในตารางข้างบนเท่านั้น

### Prototype Consistency Checklist (ใช้ตรวจทุกครั้งที่ Prototype ถูกสร้าง/แก้ไข)

ต่อ Prototype ที่ถูกสร้าง/แก้ไข **1 ไฟล์** ให้ไล่ตรวจครบทั้ง 7 จุดนี้เสมอ
(นอกเหนือจาก Design Token ที่ตรวจแยกอยู่แล้วในตารางข้างบน):

1. **Requirement (BRD)** — Feature ที่ prototype นี้แสดง มี FR/NFR รองรับ
   จริงใน BRD หรือไม่ ถ้าแสดง field/flow ที่ BRD ไม่ได้ระบุ ให้ flag
   "New — แนะนำให้เพิ่มเข้า BRD"
2. **Backlog** — Given/When/Then ของ US-xxx ที่เกี่ยวข้องตรงกับสิ่งที่
   prototype จำลองหรือไม่ (ปุ่ม, ผลลัพธ์, ข้อความ error ที่แสดง)
3. **Feature List** — FT-xxx ที่ prototype เลือกยังมีอยู่จริง และ
   MoSCoW/หมายเหตุ Blocked ตรงกับสถานะปัจจุบันหรือไม่
4. **User Journey** — Node/step ที่ prototype แทน ยังตรงกับ diagram
   ปัจจุบันหรือไม่ (label, decision branch, actor)
5. **Acceptance Criteria** — behavior ที่ prototype จำลอง (เช่น
   approve/reject, ข้อความ error, การปิดปุ่มหลังตัดสินใจ) ตรงกับ AC-xxx
   ของ Backlog Item ที่เกี่ยวข้องทุกตัวหรือไม่ — ถ้า prototype จำลอง
   behavior ที่ AC ไม่ครอบคลุมเลย ให้พิจารณาว่าเป็น capability ใหม่ (flag
   "New") หรือ prototype ตีความผิด (ถ้าผิดต้องแก้ prototype)
6. **Test Case** — ถ้ามี Test Case ของ Feature นี้อยู่แล้ว ผลลัพธ์ที่
   prototype แสดง (ข้อความ, สถานะ, mock data) ตรงกับ Expected
   Result/Test Data ของ test case ที่เกี่ยวข้องหรือไม่
7. **Test Plan** — Feature นี้อยู่ใน In Scope table ของ Test Plan
   หรือไม่ (ดูแถวใหม่ในตารางข้างบน)

แยกผลแต่ละจุดเป็น ✅/🔧/❓ ตามเกณฑ์ปกติ (Section C ข้อ 5) แล้วอัปเดต
เอกสารที่กระทบจริงทุกฉบับ — ไม่ใช่แค่รายงานว่าพบอะไร แต่ต้องแก้ไขจริง
สำหรับกรณี 🔧 และถามผู้ใช้ผ่าน Ambiguity Protocol สำหรับกรณี ❓

---

## Section C: Consistency Check Procedure (ขั้นตอนที่ต้องทำตามลำดับเสมอ)

1. **ระบุ trigger** — เอกสารใดถูกแก้ไขล่าสุด (ดูจาก Revision History หรือ
   ตามที่ผู้ใช้ระบุ)
2. **อ่านเอกสารหลักทั้ง 4 ฉบับให้ครบ** ก่อนสรุปผลกระทบ ห้ามสรุปจาก
   เอกสารเดียว และ **อ่าน Acceptance Criteria/Test Plan/Test Case/
   Prototype Log/`02-design/DESIGN.md`/`02-design/03-system-architecture.md`/
   `02-design/05-database-schema.md`/`02-design/06-api-spec.md` ด้วยถ้ามี
   อยู่แล้ว** (และอ่าน `02-design/01-transaction-flow.md` ประกอบถ้าผล
   กระทบเกี่ยวข้องกับ status lifecycle)
3. **สร้าง/อัปเดต traceability matrix ภายใน** (FR ↔ US ↔ FT ↔ Journey
   step ↔ AC ↔ TC ↔ Open Question) ใช้เป็น working reference ระหว่าง
   ตรวจสอบ ไม่จำเป็นต้องส่งมอบเป็นไฟล์แยกต่างหาก เว้นแต่ผู้ใช้ร้องขอ
4. **ตรวจสอบตาม Change Propagation Matrix** (Section B) ตามทิศทางของ
   trigger ที่ระบุในข้อ 1
5. **แยกประเภทสิ่งที่พบ:**
   - ✅ สอดคล้องแล้ว — ไม่ต้องทำอะไร
   - 🔧 Drift ที่แก้ไขได้ทันทีโดยไม่กำกวม (เช่น version header ไม่ตรงกัน,
     ID อ้างอิงผิด/ตกหล่น, MoSCoW ไม่ตรงตามตาราง mapping ที่กำหนดตายตัว
     อยู่แล้ว) → แก้ไขได้เลย
   - ❓ Drift ที่กำกวมหรือกระทบ business decision (รวมถึง Test Case ที่
     อ้าง AC ที่ไม่มีอยู่จริง) → **ห้ามแก้เอง** ให้ใช้ Ambiguity Protocol
     ด้านบน
6. สำหรับรายการ 🔧: อัปเดตเอกสารปลายทาง (แก้ไข ไม่ใช่สร้างทับ) และเพิ่ม
   entry ใหม่ใน Revision History ของเอกสารนั้น ระบุว่าแก้เพราะอะไรและ
   trigger จากการเปลี่ยนแปลงในเอกสารใด
7. สรุปผลทั้งหมดเป็น **Consistency Check Report** (ดู Section D)

---

## Section D: Consistency Check Report Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

1. **Scope** — เอกสารที่เป็น trigger ของการตรวจสอบครั้งนี้ + รายชื่อ
   เอกสารหลักทั้ง 4 ฉบับ (และ Acceptance Criteria/Test Plan/Test Case/
   Prototype Log/Design System/Architecture/Database Schema/API Spec
   ถ้ามี) พร้อม version ที่อ่าน ณ ขณะตรวจสอบ
2. **Findings Summary** — ตาราง: ลำดับ | เอกสารที่พบปัญหา | รายละเอียด |
   ประเภท (🔧 แก้แล้ว / ❓ รอ stakeholder) | FR/US/FT/AC/TC/Journey step
   ที่เกี่ยวข้อง
3. **Actions Taken** — รายการเอกสารที่ถูกแก้ไขจริง พร้อม Revision History
   entry ที่เพิ่มในแต่ละไฟล์
4. **Open Items Needing Stakeholder Decision** — รายการ ❓ ที่ใช้ Ambiguity
   Protocol พร้อมตัวเลือกที่เสนอไว้
5. **Traceability Coverage** — สรุปเชิงปริมาณ เช่น "FR ครบ 22/22 ข้อ มี
   Feature อ้างอิงครบ", "US ครบ 25/25 ข้อ" — ถ้าไม่ครบให้ระบุ ID ที่ขาด
   และถ้ามี Test Case/Prototype ให้ระบุด้วยว่า Feature ที่ทั้งคู่เลือกไว้
   เป็นตัวเดียวกันหรือไม่ และ Test Case ทุกตัวมี AC รองรับจริงหรือไม่

---

## Rules (กฎทั่วไป)

- ห้ามแก้ไขเนื้อหาทางธุรกิจ (business decision) เอง — เช่น priority,
  MoSCoW, scope, กฎ SP Point — โดยไม่มีที่มาจากเอกสารที่เกี่ยวข้องจริง
  หรือคำตอบจากผู้ใช้ ต้องใช้ Ambiguity Protocol เสมอในกรณีเหล่านี้
- ทุกเอกสารที่ถูกแก้ไขต้องมี Revision History entry ใหม่เสมอ ห้ามแก้แบบ
  เงียบ (silent edit)
- ห้าม fabricate traceability ที่ไม่มีจริง — ถ้าหา FR/US/AC ต้นทางไม่เจอ
  ให้ระบุว่า "New — แนะนำให้เพิ่มเข้า BRD/Backlog/Acceptance Criteria"
  ตาม convention เดิมของโปรเจกต์ ไม่ใช่สร้าง ID ปลอมขึ้นมาเชื่อม
- เมื่อพบว่า Feature List หรือ User Journey อ้างอิง FR/US ที่ **ไม่มีอยู่
  จริง** ใน BRD/Backlog ฉบับปัจจุบัน ให้ถือเป็น ❓ เสมอ ห้ามลบ FT/step นั้น
  ทิ้งเอง
- เมื่อพบว่า Test Case อ้าง AC-xxx ที่ **ไม่มีอยู่จริง** ใน
  `04-testing/acceptance-criteria.md` ให้ถือเป็น ❓ เสมอ (ละเมิด
  dependency ของ skill `test-case-standard`) — แนะนำให้เรียก
  `acceptance-criteria-writer` เพิ่ม AC ที่ขาด ไม่ใช่ลบ Test Case ทิ้งเอง
- เมื่อพบว่า Prototype ใช้สี/font/spacing ที่ไม่มีอยู่ใน
  `02-design/DESIGN.md` ให้ถือเป็น ❓ เสมอ (ละเมิด dependency ของ skill
  `prototype-standard`) — แนะนำให้เรียก `design-system-creator` เพิ่ม
  token ที่ขาด ไม่ใช่ปล่อยผ่านว่าเป็นรายละเอียด UI
- เมื่อพบว่า Architecture (`02-design/03-system-architecture.md`) อ้าง
  `FT-xxx` หรือ journey step ที่ **ไม่มีอยู่จริง** ใน Feature List/User
  Journey ปัจจุบัน ให้ถือเป็น ❓ เสมอ (ละเมิด dependency ของ skill
  `architecture-design-standard`) — แนะนำให้เรียก
  `feature-list-analyst`/`user-journey-designer` เพิ่มส่วนที่ขาด ไม่ใช่
  ลบ data flow นั้นทิ้งเอง
- เมื่อพบว่า Architecture ระบุชื่อ technology/vendor เฉพาะเจาะจงนอกเหนือ
  section "Current Technical Direction (Non-Binding Reference)" ให้ถือ
  เป็น ❓ เสมอ (ละเมิดหลักการ conceptual/technology-agnostic ของ skill
  `architecture-design-standard`)
- เมื่อพบว่า Database Schema (`02-design/05-database-schema.md`) มี
  entity ที่ไม่มีที่มาจาก `02-design/03-system-architecture.md` §6 ให้
  ถือเป็น 🔧 ได้ทันที (ตั้งข้อสังเกต "New — แนะนำให้เพิ่มเข้า
  Architecture §6" แล้วบันทึกไว้ ไม่ต้องหยุดถามเพราะเป็นการเพิ่มข้อ
  สังเกตใหม่ ไม่ใช่การลบ/เปลี่ยน business decision เดิม)
- เมื่อพบว่า Database Schema มี attribute ที่ไม่มีการจัดประเภท PDPA
  Classification ให้ถือเป็น ❓ เสมอ (ละเมิด CLAUDE.md หมวด 10 และ skill
  `data-api-design-standard` Section A)
- เมื่อพบว่า API Spec (`02-design/06-api-spec.md`) มี operation ที่อ้าง
  entity/attribute ที่ **ไม่มีอยู่จริง** ใน `02-design/05-database-schema.md`
  ให้ถือเป็น ❓ เสมอ (ละเมิด dependency บล็อกเด็ดขาดของ skill
  `data-api-design-standard` Section B) — แนะนำให้เรียก
  `database-schema-designer` เพิ่มส่วนที่ขาด ไม่ใช่ลบ operation นั้นทิ้งเอง
- เมื่อพบว่า Database Schema หรือ API Spec ระบุชื่อ technology/vendor/
  protocol เฉพาะเจาะจงนอกเหนือ section "Current Technical Direction
  (Non-Binding Reference)" ให้ถือเป็น ❓ เสมอ (ละเมิดหลักการ conceptual/
  technology-agnostic ของ skill `data-api-design-standard`)
- เมื่อพบว่า Test Plan มี Risk หรือ Test Type ใหม่ที่ไม่มีที่มาจาก BRD §7/
  §8 ให้ถือเป็น 🔧 ได้ทันที (ตั้งข้อสังเกต "New — recommend adding to
  BRD" แล้วบันทึกไว้ ไม่ต้องหยุดถามเพราะไม่ใช่การลบ/เปลี่ยน business
  decision เดิม เป็นการเพิ่มข้อสังเกตใหม่)
- ทุกครั้งที่ trigger คือ Prototype (สร้างใหม่หรือแก้ไข) ต้องรัน
  **Prototype Consistency Checklist** (ท้าย Section B) ให้ครบทั้ง 7 จุด
  เสมอ ไม่ใช่ตรวจแค่จุดที่คิดว่าเกี่ยวข้อง — ถ้าพบว่าเอกสารใดในสาย
  Requirement→Backlog→Feature List→User Journey→Acceptance
  Criteria→Test Case→Test Plan ไม่สอดคล้องกับ prototype ต้องแก้ไขจริง
  (กรณี 🔧) หรือถามผู้ใช้ (กรณี ❓) ไม่ใช่แค่รายงานว่าพบ drift แล้วปล่อยไว้
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  maintainability (สอดคล้องกับ CLAUDE.md)
- รันการตรวจสอบนี้ทุกครั้งที่มีการแก้ไข BRD, Backlog, Feature List, หรือ
  User Journey ไม่ว่าจะแก้ไขเพียงเล็กน้อยเพียงใด
