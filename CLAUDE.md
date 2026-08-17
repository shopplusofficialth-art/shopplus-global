# ShopPlus Global AI Project Context (บริบทโครงการ AI ของ ShopPlus Global)

## 1. Project Overview (ภาพรวมโครงการ)

ShopPlus Global คือ Community Commerce Platform
ที่ออกแบบมาเพื่อเชื่อมโยงร้านค้าท้องถิ่นแบบออฟไลน์ ธุรกิจออนไลน์
และลูกค้า เข้าด้วยกันผ่านระบบสมาชิกดิจิทัล คะแนนสะสม (reward points)
และโซลูชันการตลาดที่ขับเคลื่อนด้วย AI

โครงการนี้ดำเนินตาม AI Native Development Workflow
โดยใช้ Agile methodology, GitHub Version Control,
Claude Code AI Agent, และเอกสารที่มีโครงสร้างชัดเจน

---

# 2. Business Vision (วิสัยทัศน์ทางธุรกิจ)

Mission ของ ShopPlus Global คือ:

"Helping local community businesses compete in the digital economy
by connecting merchants and customers through a shared reward ecosystem."

(ช่วยให้ธุรกิจชุมชนท้องถิ่นสามารถแข่งขันในเศรษฐกิจดิจิทัลได้
โดยเชื่อมโยง merchant และลูกค้าผ่าน reward ecosystem ที่ใช้ร่วมกัน)

แพลตฟอร์มเริ่มต้นจากร้านค้าชุมชนแบบออฟไลน์
และขยายไปสู่การค้าออนไลน์ การจัดส่ง โลจิสติกส์
และบริการมาร์เกตเพลส

---

# 3. Core Business Model (โมเดลธุรกิจหลัก)

## Customer (ลูกค้า)

Customer ใช้ ShopPlus Global เพื่อ:

- ค้นหาร้านค้าท้องถิ่น
- รับ SP Point reward
- แลก reward
- เข้าถึงโปรโมชัน

## Merchant (ร้านค้า)

Merchant ได้รับ:

- การหาลูกค้าใหม่ (customer acquisition)
- ระบบสมาชิกดิจิทัล
- เครื่องมือด้านการตลาด
- Insight พฤติกรรมลูกค้า

## Platform (แพลตฟอร์ม)

ShopPlus Global บริหารจัดการ:

- Reward ecosystem
- การแบ่งสรร marketing fee
- การพัฒนาแพลตฟอร์ม
- Data analytics

---

# 4. SP Point Rules (กฎของ SP Point)

SP Point คือระบบ reward ภายใน

**Conversion (อัตราแปลง):**

10 SP = 1 Baht

**Minimum marketing fee (marketing fee ขั้นต่ำ):**

3 Baht / transaction

**Equivalent (เทียบเท่า):**

มูลค่า reward ขั้นต่ำ 30 SP

การคำนวณ reward ทั้งหมดต้องเป็นไปตามกฎนี้

---

# 5. Product Scope (ขอบเขตผลิตภัณฑ์)

## Applications (แอปพลิเคชัน)

### Customer Application (แอปพลิเคชันสำหรับลูกค้า)

**Features (ฟีเจอร์):**

- Register/Login
- Scan QR
- Earn SP Point
- View Rewards
- Explore Shops

### Merchant Application (แอปพลิเคชันสำหรับร้านค้า)

**Features (ฟีเจอร์):**

- Shop Management
- Customer Campaign
- Marketing Fee Tracking
- Transaction Management

### Admin System (ระบบสำหรับผู้ดูแลระบบ)

**Features (ฟีเจอร์):**

- User Management
- Merchant Management
- Reward Management
- System Monitoring

---

# 6. Technical Direction (ทิศทางเทคนิค)

## Frontend

**Target (เป้าหมาย):**

- Web Application
- Mobile Application

## Backend

**Technology direction (ทิศทางเทคโนโลยี):**

- Firebase
- Firestore
- Cloud Functions

## Design Direction (แนวทางการออกแบบ)

**Direction (ทิศทาง):**

- Earth Tone + Minimalist + Muji-inspired

รายละเอียดเต็ม (Brand Identity & CI, Design Tokens, UI Components &
Patterns, UX Guidelines & Rules) อยู่ที่ `02-design/DESIGN.md` — เป็น
**single source of truth** ของ design system ห้ามกำหนดสี/font/spacing/
component pattern ใหม่ที่ขัดหรือซ้ำซ้อนกับเอกสารนี้ ถ้ายังไม่มีหรือไม่ครบ
ให้เรียก agent `design-system-creator` สร้าง/เติมให้ครบก่อนเริ่มงาน UI ใด ๆ

## Development Principle (หลักการพัฒนา)

**Client side (ฝั่ง client):**
- UI และ user interaction เท่านั้น

**Backend:**
- Business logic
- การตรวจสอบความปลอดภัย (security validation)
- การคำนวณ reward

---

# 7. AI Native Development Rules (กฎการพัฒนาแบบ AI Native)

AI Agent ต้อง:

1. เข้าใจ business context ก่อนสร้างโซลูชัน
2. สร้างเอกสารก่อนการ implementation
3. ปฏิบัติตาม Agile workflow
4. รักษาโครงสร้างโปรเจกต์ให้ชัดเจน
5. หลีกเลี่ยงการสร้างความซับซ้อนที่ไม่จำเป็น
6. ขอความชัดเจนเมื่อ requirement ไม่ชัดเจน โดยใช้ **Ambiguity Protocol**
   เสมอเมื่อประเด็นนั้นกระทบ business decision หรือกำกวมจริง:
   1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
   2. เสนออย่างน้อย **3 แนวทาง** ที่เป็นไปได้
   3. ระบุเหตุผล ข้อดี ข้อเสียของแต่ละแนวทาง
   4. แนะนำแนวทางที่ดีที่สุด 1 แนวทางพร้อมเหตุผลที่ชัดเจน
   5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายเสมอ — ห้ามสมมติแทนผู้ใช้
7. อนุญาตให้ **"เลือกบางข้อมาส่ง" (partial scope)** ได้เสมอ — ไม่จำเป็น
   ต้องสร้าง Feature List, User Journey, Acceptance Criteria, Test Plan,
   Test Case, หรือ Prototype ให้ครบทุก Feature ในคราวเดียว แต่ทุกส่วนที่
   เลือกทำต้องมี traceability ครบและสอดคล้องกับเอกสารอื่นที่มีอยู่แล้ว
   เสมอ (ดู Section 9 และ `.claude/skills/traceability-consistency-check.md`)

---

# 8. Agile Workflow Rules (กฎ Agile Workflow)

**Project phases (ขั้นตอนของโครงการ):**

**01-requirements**
- Business requirements
- User stories
- Product backlog

**02-design**
- User flow
- Architecture
- UI/UX
- Design System (Brand Identity, Design Tokens — ดู `02-design/DESIGN.md`)

**03-development**
- Prototype (concept-level mockup, non-functional) — deliverable หลัก
  ของระยะนี้ในปัจจุบัน
- Source code (เมื่อโครงการเข้าสู่ขั้นตอนพัฒนาจริง)

**04-testing**
- Acceptance Criteria
- Test Plan
- Test Cases
- QA

**05-release**
- Deployment
- Release notes

---

# 9. AI Agent System (ระบบ Sub-Agent และ Skill)

โครงการนี้ดำเนินงานผ่านระบบ AI Agent ที่มี **orchestrator กลางชื่อ
"Shopplus"** (`.claude/agents/shopplus.md`) เป็นจุดรับคำขอเดียว
(single entry point) จากผู้ใช้ แล้ว route งานต่อไปยัง sub-agent
เฉพาะทางตาม phase ของ Agile workflow (Section 8) แต่ละตัวมี skill
(`.claude/skills/`) กำกับ process และ format ของตัวเองไว้อย่างเคร่งครัด

**Source of truth ของระบบ agent:** `.claude/skills/shopplus-orchestration.md`
(Agent Directory, ลำดับ dependency ระหว่าง sub-agent, Quality Gate
Checklist) — เอกสารนี้เป็นที่เดียวที่สรุป routing ทั้งหมด ไม่ duplicate
รายชื่อ agent ไว้ที่นี่เพื่อป้องกัน drift

**กฎสำคัญ:**

- ทุกคำขอที่เกี่ยวกับ requirement, backlog, feature list, user journey,
  acceptance criteria, test plan, test case, design system, หรือ
  prototype ควร route ผ่าน `Shopplus` ก่อนเสมอ ไม่ใช่เขียนเอกสารเองโดย
  ไม่สวมบทบาทเป็น sub-agent ที่เกี่ยวข้อง
- ห้ามสร้าง agent หรือ skill ใหม่นอกเหนือ Agent Directory ที่มีอยู่โดยไม่
  ถามผู้ใช้ก่อน (ตาม Ambiguity Protocol ใน Section 7)
- ทุกงานต้องผ่าน **Quality Gate Checklist** ของ `Shopplus` ก่อนส่งมอบ
  ให้ผู้ใช้เสมอ ไม่มีข้อยกเว้น
- ทุกครั้งที่แก้ไขเอกสารใดในสาย traceability ต้องเรียก agent
  `traceability-consistency-auditor` ต่อเสมอ เพื่อรักษาความสอดคล้องข้าม
  เอกสารทั้งหมด

---

# 10. Security and PDPA Rules (กฎด้านความปลอดภัยและ PDPA)

การออกแบบทั้งหมดต้องพิจารณา:

- Personal Data Protection Act (PDPA)
- ความยินยอมของผู้ใช้ (user consent)
- การเก็บข้อมูลแบบ minimum (data minimization)
- Secure authentication
- การควบคุมการเข้าถึง (access control)

ห้ามเปิดเผย:

- ข้อมูลส่วนบุคคล (personal information)
- ข้อมูลผู้ใช้ที่ sensitive
- Internal credentials

---

# 11. Documentation Rules (กฎการจัดทำเอกสาร)

การตัดสินใจที่สำคัญทั้งหมดต้องได้รับการจัดทำเป็นเอกสาร

เอกสารควรมี:

- Purpose (วัตถุประสงค์)
- Requirement
- Decision (การตัดสินใจ)
- Impact (ผลกระทบ)

ใช้รูปแบบ Markdown

**Traceability ID Scheme:**

ทุกเอกสารต้องรักษา ID scheme ให้ตรงกันตลอดทั้งสาย traceability
(`FR-xxx`, `US-xxx`, `FT-xxx`, `AC-xxx`, `TC-xxx`, `PT-xxx`) —
รายละเอียดเต็มของแต่ละ ID และการอ้างอิงข้ามเอกสารอยู่ที่
`.claude/skills/traceability-consistency-check.md` Section A เป็น
source of truth เดียว ห้ามสร้าง ID scheme ใหม่ที่ขัดหรือซ้ำซ้อนกับที่
กำหนดไว้แล้ว

---

# 12. Development Principles (หลักการพัฒนา)

ให้ความสำคัญกับ:

- Clean Architecture
- Maintainability
- Security
- Scalability
- User Experience

ทุก feature ต้องสร้างมูลค่าทางธุรกิจที่แท้จริง

---

# 13. Project Identity (ข้อมูลประจำตัวโครงการ)

**Project (โครงการ):**

ShopPlus Global

**Type (ประเภท):**

Community Commerce Platform

**Development Approach (แนวทางการพัฒนา):**

AI Native + Agile + Cloud First

**Repository (ที่เก็บ source code):**

GitHub Version Control
