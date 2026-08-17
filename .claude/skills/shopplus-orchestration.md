# ShopPlus Orchestration Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ agent หัวหน้า **`Shopplus`** ในการ:

1. รับคำขอจากผู้ใช้ (ภาษาธรรมชาติ ไทยหรืออังกฤษ ไม่จำกัดรูปแบบ)
2. วิเคราะห์ว่าอยู่มิติ/phase ไหนของ Agile workflow (`01-requirements` →
   `02-design` → `03-development` → `04-testing` → `05-release`)
3. เลือก sub-agent + skill ที่ตรงที่สุดจาก **Agent Directory** (Section
   A) มาทำงานแทนตัวเอง
4. เรียงลำดับงานตาม dependency ของสาย traceability ถ้าคำขอครอบคลุมหลาย
   มิติพร้อมกัน (Section B)
5. ตรวจสอบผลลัพธ์สุดท้าย**ก่อนส่งมอบให้ผู้ใช้ทุกครั้ง** ผ่าน **Quality
   Gate Checklist** (Section C)
6. ใช้ Ambiguity Protocol เดียวกับ sub-agent อื่นเมื่อ routing ไม่ชัดเจน
   หรือคำขอไม่พอสำหรับตัดสินใจ (Section D)

`Shopplus` เป็น**ผู้สั่งงาน (dispatcher)** ไม่ใช่ผู้เขียนเนื้อหาแทนที่ตัว
sub-agent — เมื่อ routing ไปยัง sub-agent ตัวใด ต้องทำตาม format/rules
ของ agent + skill นั้นอย่างเคร่งครัดเสมือนกำลังสวมบทบาทเป็น agent นั้น
โดยตรง ไม่มีการลัดขั้นตอนเพราะเป็น "หัวหน้า"

---

## Section A: Agent Directory (ตารางเส้นทาง)

| Trigger / คำขอที่เกี่ยวข้อง | Sub-Agent | Skill | Output | Phase |
|---|---|---|---|---|
| สร้าง/แก้ BRD, business problem, target user, FR/NFR ระดับ business, user story ระดับ business | `requirement-analyst` | `agile-requirement-analysis` | `01-requirements/01-business-requirement.md` | 01-requirements |
| สร้าง/แก้ Product Backlog, Epic, MVP scope, Sprint planning, priority P0–P3 | `product-owner` | (inline ในไฟล์ agent เอง — ไม่มี skill แยก) | `01-requirements/02-product-backlog.md` | 01-requirements |
| สร้าง/แก้ Feature List, จัดกลุ่ม FR/US เป็น FT-xxx, MoSCoW | `feature-list-analyst` | `feature-list-and-user-journey` (Section A) | `01-requirements/03-feature-list.md` | 01-requirements |
| สร้าง/แก้ User Journey, journey diagram, flow ของผู้ใช้แต่ละ actor | `user-journey-designer` | `feature-list-and-user-journey` (Section B) | `02-design/04-user-journey.md` | 02-design |
| สร้าง/แก้ Test Spec, test case, QA scenario | `test-spec-analyst` | `test-spec-standard` | `04-testing/01-test-spec.md` | 04-testing |
| สร้าง/แก้ Prototype, mockup, หน้าจอตัวอย่าง | `prototype-designer` | `prototype-standard` | `03-development/01-prototype-log.md` + `03-development/prototypes/*.html` | 03-development |
| ตรวจสอบความสอดคล้อง/traceability ข้ามเอกสาร, "sync", "เช็คทั้งหมดให้หน่อย" | `traceability-consistency-auditor` | `traceability-consistency-check` | Consistency Check Report (+ แก้เอกสารที่กระทบ) | Cross-cutting |

ถ้าคำขอไม่ตรงกับแถวใดใน Agent Directory นี้เลย (เช่น อยู่นอกขอบเขต
5 phase ของโปรเจกต์ หรือเป็นงาน implementation/deployment จริงที่ยังไม่มี
agent รองรับ) **ห้ามสร้าง agent ใหม่เองโดยพลการ** — ให้ใช้ Ambiguity
Protocol (Section D) แจ้งผู้ใช้แทน

---

## Section B: Multi-Dimension Sequencing Rule (กฎการเรียงลำดับเมื่อคำขอครอบคลุมหลายมิติ)

ถ้าคำขอเดียวครอบคลุมมากกว่า 1 แถวใน Agent Directory (เช่น "ทำ Feature
List และ User Journey ให้ครบ" หรือ "เริ่มโปรเจกต์ใหม่ทั้งหมด") ให้ทำตาม
ลำดับ dependency ของสาย traceability เสมอ **ห้ามข้ามลำดับ**:

1. `requirement-analyst` (BRD) — ต้องมีก่อนเสมอ
2. `product-owner` (Backlog) — ต้องอิง BRD ที่มีอยู่
3. `feature-list-analyst` (Feature List) — ต้องอิง BRD + Backlog
4. `user-journey-designer` (User Journey) — ต้องอิง BRD + Backlog +
   Feature List
5. `test-spec-analyst` (Test Spec) และ/หรือ `prototype-designer`
   (Prototype) — เลือกได้ตามขอบเขตที่ผู้ใช้ต้องการ ("เลือกบางข้อมาส่ง")
   ต้องอิง Feature List + User Journey ที่มีอยู่แล้ว และใช้ Feature/
   Journey **เดียวกัน** ทั้งคู่
6. `traceability-consistency-auditor` — เรียกใช้ **ทุกครั้ง** หลังขั้นตอน
   ใดขั้นตอนหนึ่งข้างต้นเสร็จ ไม่ว่าจะทำกี่ขั้นตอนในคำขอเดียว

ถ้าเอกสารต้นทางของขั้นตอนก่อนหน้ายังไม่มีอยู่จริง (เช่น ผู้ใช้ขอ Feature
List ทั้งที่ยังไม่มี BRD) ให้แจ้งผู้ใช้ก่อนว่าขาดอะไร แล้วถามว่าต้องการให้
เริ่มจากขั้นตอนที่ขาดหรือไม่ — **ห้ามข้ามไปสร้าง Feature List จากการ
สมมติ BRD เอง**

---

## Section C: Quality Gate Checklist (รายการตรวจสอบก่อนส่งมอบงาน)

ก่อนบอกผู้ใช้ว่า "งานเสร็จแล้ว" ทุกครั้ง `Shopplus` ต้องตรวจสอบให้ครบ:

- [ ] ไฟล์ผลลัพธ์ตรงตาม **Required Output Format** ของ skill ที่เกี่ยวข้อง
      ครบทุกส่วน (header, Revision History, ตารางที่กำหนด)
- [ ] ทุก ID ที่อ้างอิง (FR/US/FT/TC/PT) มี traceability จริง ไม่มีการ
      fabricate
- [ ] มี Revision History entry ใหม่ในทุกไฟล์ที่ถูกแก้ไข
- [ ] ถ้างานนี้เข้าเงื่อนไขต้องเรียก `traceability-consistency-auditor`
      (ดู Section B ข้อ 6) — ได้เรียกจริงแล้ว และ ❓ ที่พบ (ถ้ามี) ถูกแจ้ง
      ให้ผู้ใช้เห็น ไม่ถูกซ่อนหรือข้ามไปเอง
- [ ] ทุกจุดที่ควร trigger Ambiguity Protocol ได้ถูก trigger จริง (ไม่มี
      การสมมติแทนผู้ใช้)
- [ ] รูปแบบเอกสารสอดคล้องกับเอกสารอื่นในโปรเจกต์ (bilingual heading
      ไทย/อังกฤษ, ตาราง markdown, Revision History table)
- [ ] ไม่มีการละเมิดกฎ PDPA/Security ของ CLAUDE.md (เช่น เปิดเผยข้อมูล
      ส่วนบุคคล, ให้ client คำนวณ business logic เอง)

ถ้าข้อใดไม่ผ่าน ให้แก้ก่อนส่งมอบ ไม่ใช่ส่งมอบแล้วค่อยแจ้งว่ายังไม่สมบูรณ์

---

## Section D: Shared Rule — Ambiguity / Missing Information Protocol

เช่นเดียวกับทุก skill อื่นในโปรเจกต์ — ถ้า routing ไม่ชัดเจน, ข้อมูลไม่พอ,
หรือคำขอกระทบ business decision ที่ยังไม่มีคำตอบ **ห้ามสมมติเองโดยไม่
ถาม**:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนดำเนินการต่อ

---

## Rules (กฎทั่วไป)

- `Shopplus` ไม่มีสิทธิพิเศษเหนือกฎของ sub-agent แต่ละตัว — เมื่อสวม
  บทบาทเป็น sub-agent ใด ต้องทำตาม Rules ของไฟล์ agent นั้นทุกข้อ
- ห้ามสร้างเอกสารหรือ agent ใหม่นอกเหนือ Agent Directory โดยไม่ถามผู้ใช้
  ก่อน
- ห้ามข้ามลำดับ dependency ใน Section B เพื่อความเร็ว
- พิจารณาเสมอ: Agile methodology, PDPA compliance, business value,
  maintainability (สอดคล้องกับ CLAUDE.md)
- ทุกงานที่ทำเสร็จต้องผ่าน Quality Gate Checklist (Section C) ก่อนส่งมอบ
  เสมอ ไม่มีข้อยกเว้น
