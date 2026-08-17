# ShopPlus Global AI Project Context

**Language Note:** เอกสารนี้เป็นฉบับแปลภาษาไทยของ [`CLAUDE.md`](CLAUDE.md) (ต้นฉบับภาษาอังกฤษ) จัดทำไว้เพื่อการอ้างอิงของทีมเท่านั้น **Claude Code จะอ่านและปฏิบัติตามเฉพาะไฟล์ `CLAUDE.md` ต้นฉบับเท่านั้น** ไฟล์นี้ไม่มีผลต่อพฤติกรรมของ AI Agent หากมีข้อขัดแย้งระหว่างสองฉบับ ให้ถือฉบับภาษาอังกฤษ (`CLAUDE.md`) เป็นหลัก

## 1. Project Overview

ShopPlus Global คือ Community Commerce Platform
ที่ออกแบบมาเพื่อเชื่อมโยงร้านค้าท้องถิ่นแบบออฟไลน์ ธุรกิจออนไลน์
และลูกค้า เข้าด้วยกันผ่านระบบสมาชิกดิจิทัล คะแนนสะสม (reward points)
และโซลูชันการตลาดที่ขับเคลื่อนด้วย AI

โครงการนี้ดำเนินตาม AI Native Development Workflow
โดยใช้ Agile methodology, GitHub Version Control,
Claude Code AI Agent, และเอกสารที่มีโครงสร้างชัดเจน

---

# 2. Business Vision

Mission ของ ShopPlus Global คือ:

"Helping local community businesses compete in the digital economy
by connecting merchants and customers through a shared reward ecosystem."

(ช่วยให้ธุรกิจชุมชนท้องถิ่นสามารถแข่งขันในเศรษฐกิจดิจิทัลได้
โดยเชื่อมโยง merchant และลูกค้าผ่าน reward ecosystem ที่ใช้ร่วมกัน)

แพลตฟอร์มเริ่มต้นจากร้านค้าชุมชนแบบออฟไลน์
และขยายไปสู่การค้าออนไลน์ การจัดส่ง โลจิสติกส์
และบริการมาร์เกตเพลส

---

# 3. Core Business Model

## Customer

Customer ใช้ ShopPlus Global เพื่อ:

- ค้นหาร้านค้าท้องถิ่น
- รับ SP Point reward
- แลก reward
- เข้าถึงโปรโมชัน

## Merchant

Merchant ได้รับ:

- การหาลูกค้าใหม่ (customer acquisition)
- ระบบสมาชิกดิจิทัล
- เครื่องมือด้านการตลาด
- Insight พฤติกรรมลูกค้า

## Platform

ShopPlus Global บริหารจัดการ:

- Reward ecosystem
- การแบ่งสรร marketing fee
- การพัฒนาแพลตฟอร์ม
- Data analytics

---

# 4. SP Point Rules

SP Point คือระบบ reward ภายใน

**Conversion (อัตราแปลง):**

10 SP = 1 Baht

**Minimum marketing fee (marketing fee ขั้นต่ำ):**

3 Baht / transaction

**Equivalent (เทียบเท่า):**

มูลค่า reward ขั้นต่ำ 30 SP

การคำนวณ reward ทั้งหมดต้องเป็นไปตามกฎนี้

---

# 5. Product Scope

## Applications

### Customer Application

**Features:**

- Register/Login
- Scan QR
- Earn SP Point
- View Rewards
- Explore Shops

### Merchant Application

**Features:**

- Shop Management
- Customer Campaign
- Marketing Fee Tracking
- Transaction Management

### Admin System

**Features:**

- User Management
- Merchant Management
- Reward Management
- System Monitoring

---

# 6. Technical Direction

## Frontend

**Target:**

- Web Application
- Mobile Application

## Backend

**Technology direction:**

- Firebase
- Firestore
- Cloud Functions

## Development Principle

**Client side:**
- UI และ user interaction เท่านั้น

**Backend:**
- Business logic
- การตรวจสอบความปลอดภัย (security validation)
- การคำนวณ reward

---

# 7. AI Native Development Rules

AI Agent ต้อง:

1. เข้าใจ business context ก่อนสร้างโซลูชัน
2. สร้างเอกสารก่อนการ implementation
3. ปฏิบัติตาม Agile workflow
4. รักษาโครงสร้างโปรเจกต์ให้ชัดเจน
5. หลีกเลี่ยงการสร้างความซับซ้อนที่ไม่จำเป็น
6. ขอความชัดเจนเมื่อ requirement ไม่ชัดเจน

---

# 8. Agile Workflow Rules

**Project phases:**

**01-requirements**
- Business requirements
- User stories
- Product backlog

**02-design**
- User flow
- Architecture
- UI/UX

**03-development**
- Source code

**04-testing**
- Test cases
- QA

**05-release**
- Deployment
- Release notes

---

# 9. Security and PDPA Rules

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

# 10. Documentation Rules

การตัดสินใจที่สำคัญทั้งหมดต้องได้รับการจัดทำเป็นเอกสาร

เอกสารควรมี:

- Purpose (วัตถุประสงค์)
- Requirement
- Decision (การตัดสินใจ)
- Impact (ผลกระทบ)

ใช้รูปแบบ Markdown

---

# 11. Development Principles

ให้ความสำคัญกับ:

- Clean Architecture
- Maintainability
- Security
- Scalability
- User Experience

ทุก feature ต้องสร้างมูลค่าทางธุรกิจที่แท้จริง

---

# 12. Project Identity

**Project:**

ShopPlus Global

**Type:**

Community Commerce Platform

**Development Approach:**

AI Native + Agile + Cloud First

**Repository:**

GitHub Version Control
