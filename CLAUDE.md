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
6. ขอความชัดเจนเมื่อ requirement ไม่ชัดเจน

---

# 8. Agile Workflow Rules (กฎ Agile Workflow)

**Project phases (ขั้นตอนของโครงการ):**

**01-requirements**
- Business requirements
- User stories
- Product backlog
- Feature list (MoSCoW)

**02-design**
- User flow / User journey
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

# 9. Security and PDPA Rules (กฎด้านความปลอดภัยและ PDPA)

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

# 10. Documentation Rules (กฎการจัดทำเอกสาร)

การตัดสินใจที่สำคัญทั้งหมดต้องได้รับการจัดทำเป็นเอกสาร

เอกสารควรมี:

- Purpose (วัตถุประสงค์)
- Requirement
- Decision (การตัดสินใจ)
- Impact (ผลกระทบ)

ใช้รูปแบบ Markdown

---

# 11. Development Principles (หลักการพัฒนา)

ให้ความสำคัญกับ:

- Clean Architecture
- Maintainability
- Security
- Scalability
- User Experience

ทุก feature ต้องสร้างมูลค่าทางธุรกิจที่แท้จริง

---

# 12. Project Identity (ข้อมูลประจำตัวโครงการ)

**Project (โครงการ):**

ShopPlus Global

**Type (ประเภท):**

Community Commerce Platform

**Development Approach (แนวทางการพัฒนา):**

AI Native + Agile + Cloud First

**Repository (ที่เก็บ source code):**

GitHub Version Control
