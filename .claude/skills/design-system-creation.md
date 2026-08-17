# Design System Creation Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ ShopPlus Global ในการสร้างและ
อัปเดต **`02-design/DESIGN.md`** — เอกสาร Design System กลางที่ agent
อื่น (โดยเฉพาะ `prototype-designer`) ต้องอ้างอิงก่อนสร้าง UI ใด ๆ เพื่อให้
ทุกหน้าจอ/แอปพลิเคชันมีภาษาการออกแบบเดียวกัน (consistent design
language)

ใช้งานโดย agent `design-system-creator` — ถูกเรียกได้ 2 ทาง:

1. ผู้ใช้ขอสร้าง/แก้ไข Design System โดยตรง
2. **ถูกเรียกเป็น prerequisite step** โดย agent อื่น (เช่น
   `prototype-designer`) เมื่อพบว่า `02-design/DESIGN.md` ยังไม่มีหรือไม่
   สมบูรณ์ — ดู Section A

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

เช่นเดียวกับ skill อื่นในโปรเจกต์ — ถ้าผู้ใช้ยังไม่ระบุโทนสี/สไตล์/ตัวอย่าง
โลโก้ชัดเจนพอ **ห้ามสมมติเองโดยไม่ถาม** ให้ทำตามนี้เสมอ:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้ (เช่น 3 ทิศทางโทนสี หรือ 3
   ทิศทางสไตล์)
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนเริ่มเขียน `DESIGN.md` จริง

---

## Section A: Dependency Check (การตรวจสอบก่อนเริ่มงาน)

ก่อนทำอะไรทั้งสิ้น ให้ตรวจสอบ `02-design/DESIGN.md`:

| สถานะที่พบ | การกระทำ |
|---|---|
| ไม่มีไฟล์นี้อยู่เลย | เข้าสู่ Section B (Brand Input Collection) ทันที |
| มีไฟล์อยู่ แต่ขาดหมวดหลักหมวดใดหมวดหนึ่ง (Brand Identity & CI / Design Tokens / UI Components & Patterns / UX Guidelines & Rules) | แจ้งผู้ใช้ว่าขาดหมวดใด แล้วเข้าสู่ Section B เฉพาะส่วนที่ขาด (ไม่ต้องถามซ้ำเรื่องที่มีอยู่แล้วและผู้ใช้ไม่ได้ขอเปลี่ยน) |
| มีไฟล์อยู่และครบทุกหมวดแล้ว | รายงานว่าใช้งานได้ ไม่ต้องสร้างใหม่ — ถ้าถูกเรียกจาก agent อื่น ให้ส่งสรุป token หลัก (สี/font/spacing) กลับไปแล้วจบงาน |
| ผู้ใช้ขอ "แก้ไข"/"เปลี่ยนโทนสีใหม่" ทั้งที่มีไฟล์สมบูรณ์อยู่แล้ว | ยืนยันกับผู้ใช้ก่อนว่าต้องการเขียนทับ token เดิมทั้งหมดหรือเฉพาะบางส่วน แล้วเข้าสู่ Section B ตามขอบเขตที่ยืนยัน |

---

## Section B: Brand Input Collection (การเก็บข้อมูลแบรนด์จากผู้ใช้)

ถามผู้ใช้ 3 เรื่องหลัก (ถามพร้อมกันได้ในคำถามเดียว ไม่ต้องแยกทีละข้อถ้า
ผู้ใช้ตอบได้ครบ):

1. **โทนสี (Color tone)** — ผู้ใช้มีค่าที่ต้องการอยู่แล้วหรือไม่ (เช่น hex
   เจาะจง, หรือคำอธิบายเชิงความรู้สึกเช่น "earth tone", "pastel",
   "corporate blue") ถ้าไม่มี ให้เสนอ ≥3 ทิศทางสีตาม Ambiguity Protocol
   พร้อมตัวอย่าง hex คร่าว ๆ ต่อทิศทาง
2. **สไตล์/บุคลิกของแบรนด์ (Style)** — เช่น minimalist, muji-inspired,
   playful, corporate, luxury ฯลฯ ถ้าไม่มี ให้เสนอ ≥3 ทิศทางสไตล์พร้อม
   ข้อดี/ข้อเสียตาม Ambiguity Protocol
3. **ตัวอย่างภาพโลโก้ (ถ้ามี)** — ถ้าผู้ใช้ส่งภาพมา:
   - บรรยายสิ่งที่สังเกตได้จากภาพ (สีหลัก, รูปทรง, ความรู้สึกที่สื่อ)
   - **ยืนยันกับผู้ใช้ก่อน** ว่าตีความถูกต้องหรือไม่ ก่อนแปลงเป็น token
     จริง ห้ามเดาความหมายของโลโก้แล้วนำไปตั้ง token ทันทีโดยไม่ยืนยัน
   - ถ้าผู้ใช้ไม่มีภาพโลโก้ ให้ข้ามข้อนี้ได้ (ไม่บังคับ) — ใช้เฉพาะโทนสี
     และสไตล์ที่ตอบไว้ในข้อ 1–2

หลังผู้ใช้ตอบครบ (หรือเลือกจากตัวเลือกที่เสนอ) ให้สรุปกลับให้ผู้ใช้เห็น
ก่อนเริ่มเขียนเอกสารจริง เพื่อยืนยันความเข้าใจตรงกันอีกครั้ง

---

## Section C: Required Output Format (รูปแบบผลลัพธ์ที่ต้องส่งมอบ)

ไฟล์ปลายทาง: `02-design/DESIGN.md` (เอกสารเดียว สะสม)

Header block (สอดคล้องกับเอกสารอื่นในโปรเจกต์): Version, Document Type,
Project, Last Updated, Document Owner, Source, Design Direction +
Revision History table

เนื้อหาต้องมีครบ **4 หมวดหลัก** เสมอ (ห้ามส่งมอบถ้าขาดหมวดใดหมวดหนึ่ง):

1. **Brand Identity & CI** — Mission/Brand Essence, Brand Attribute
   table (ความหมาย → สิ่งที่แปลเป็น UI), แนวทางโลโก้/clear space (ถ้ายัง
   ไม่มีไฟล์โลโก้จริงให้ระบุว่าเป็นแนวทางสำหรับทีมกราฟิก), Voice & Tone
   ตาม context (customer/merchant/admin/error)
2. **Design Tokens** — ต้องมีอย่างน้อย:
   - **Color** — Neutral/base palette, Brand/accent palette, Semantic/
     status palette (map กับสถานะจริงใน
     `02-design/01-transaction-flow.md` §4 ถ้าเกี่ยวข้อง) พร้อม hex และ
     คำอธิบายการใช้งาน + caveat เรื่อง contrast (ดู Rules)
   - **Typography** — font family (รองรับภาษาไทย), type scale table
   - **Spacing** — base unit + spacing scale, layout grid/breakpoint
   - (แนะนำเพิ่ม) Radius/Elevation, Iconography/Imagery guideline
3. **UI Components & Patterns** — component หลักที่ใช้ซ้ำได้ (button,
   input, card, badge/tag, navigation, modal/toast, empty/error state
   เป็นอย่างน้อย) อ้างอิง token จากหมวด 2 เท่านั้น ห้าม hardcode ค่าใหม่
4. **UX Guidelines & Rules** — minimalism/design principle rules,
   accessibility (contrast, touch target, ห้ามใช้สีอย่างเดียวสื่อความหมาย),
   content/localization, motion, **PDPA consent pattern** (สอดคล้องกับ
   `CLAUDE.md` §9), Do/Don't summary table

ปิดท้ายด้วย Governance section (วิธี sync token ไปเป็น implementation
จริง) และ Document Status footer แบบเดียวกับเอกสารอื่นในโปรเจกต์

---

## Rules (กฎทั่วไป)

- ห้ามสมมติโทนสี/สไตล์แบรนด์เองโดยไม่ผ่าน Section B ก่อน เว้นแต่ผู้ใช้
  ระบุมาชัดเจนแล้วในคำขอเดิม
- ทุกคู่สีข้อความ-พื้นหลังที่กำหนดต้อง**ระบุ caveat** ว่าเป็นการประมาณตาม
  หลัก WCAG AA และควรตรวจสอบซ้ำด้วยเครื่องมือจริงก่อนใช้งาน production
  ห้ามระบุว่า "ผ่านแน่นอน" โดยไม่ได้ตรวจจริง
- ห้ามข้ามหมวดใดหมวดหนึ่งใน Section C — ถ้าข้อมูลจากผู้ใช้ไม่พอสำหรับ
  บางหมวด ให้ใช้ Ambiguity Protocol แทนการเว้นว่างหรือสมมติ
- ทุกครั้งที่สร้าง/แก้ไขต้องมี Revision History entry ใหม่ ห้ามแก้แบบเงียบ
- Status color mapping ในหมวด Design Tokens ต้องตรงกับสถานะจริงใน
  `02-design/01-transaction-flow.md` §4 (ถ้ามีอยู่แล้ว) — ห้ามสร้างสถานะ
  ใหม่ในระดับ design token ที่ไม่มีอยู่ใน backend state machine
- พิจารณาเสมอ: Agile methodology, PDPA compliance, usability,
  accessibility, brand consistency (สอดคล้องกับ CLAUDE.md)
- ไม่ผลิตไฟล์ภาพ/โลโก้/asset กราฟิกจริง — ผลลัพธ์คือเอกสาร Markdown
  เท่านั้น
