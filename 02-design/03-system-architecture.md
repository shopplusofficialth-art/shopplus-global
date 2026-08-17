# ShopPlus Global System Architecture

Version: 1.0
Document Type: System Architecture Design
Project: ShopPlus Global Community Commerce Platform

---

# 1. Architecture Overview (ภาพรวม Architecture)

ShopPlus Global คือ Community Commerce Platform ที่เชื่อมโยง merchant
ท้องถิ่นและลูกค้าเข้าด้วยกันผ่านการทำ transaction ดิจิทัล ระบบ reward
และ business intelligence ที่ขับเคลื่อนด้วย AI

ระบบถูกออกแบบด้วย Cloud-Native Architecture โดยแยกส่วนกันระหว่าง:

- Presentation Layer
- Application Layer
- Backend Business Logic Layer
- Data Layer
- AI Intelligence Layer

## High Level Architecture (Architecture ระดับสูง)

```text
Customer / Merchant / Admin
        ↓
Web Application + Mobile Application
        ↓
Firebase Authentication
        ↓
Cloud Functions Backend
        ↓
Firestore Database
        ↓
AI Intelligence Layer
```

## Architecture Principles (หลักการด้าน Architecture)

- Client application จัดการเฉพาะการนำเสนอ (presentation) และการโต้ตอบกับผู้ใช้ (user interaction) เท่านั้น
- Backend ควบคุม business rule ทั้งหมด
- Transaction ด้านการเงินและ reward ต้องได้รับการตรวจสอบที่ฝั่ง server
- ทุกการกระทำที่สำคัญต้องมี audit trail

---

# 2. Application Layer (ชั้น Application)

## 2.1 Web Application

**Technology:**

- Next.js
- React
- Firebase SDK

**Responsibilities (หน้าที่ความรับผิดชอบ):**

- อินเทอร์เฟซสำหรับ customer
- Dashboard ของ merchant
- การบริหารจัดการของ admin
- การเฝ้าติดตาม transaction
- การแสดง reward

**Restrictions (ข้อจำกัด):**

Web Application ต้องไม่อัปเดตข้อมูลต่อไปนี้โดยตรง:

- สถานะ transaction
- SP balance
- Marketing Fund
- บันทึกทางการเงิน

---

## 2.2 Mobile Application

**Responsibilities (หน้าที่ความรับผิดชอบ):**

- การสแกน QR
- การตรวจสอบ reward ของ customer
- การอนุมัติ transaction ของ merchant
- Push notification

Mobile Application สื่อสารกับ backend service ผ่านการยืนยันตัวตนที่
ปลอดภัย

---

# 3. Backend Layer (ชั้น Backend)

Backend คือ core business processing layer

**Technology:**

- Firebase Cloud Functions

## 3.1 Transaction Service

**Responsibilities (หน้าที่ความรับผิดชอบ):**

- สร้าง transaction
- ตรวจสอบความถูกต้องของ merchant
- ตรวจสอบความถูกต้องของ customer
- บริหารจัดการ transaction lifecycle

**Transaction Flow:**

```text
PENDING_APPROVAL
        ↓
MERCHANT_APPROVED
        ↓
COMPLETED
```

---

## 3.2 Marketing Fee Engine

รับผิดชอบการคำนวณและแบ่งสรร marketing fee

**ตัวอย่าง:**

Marketing Fee = 30 SP

**การแบ่งสรร:**

- Customer Reward — 10 SP
- Marketing Fund — 10 SP
- ShopPlus Global — 10 SP

---

## 3.3 Reward Service

**Responsibilities (หน้าที่ความรับผิดชอบ):**

- สร้างบันทึก reward
- อัปเดต SP balance ของ customer
- รักษาประวัติ reward

---

## 3.4 Audit Log Service

ทุกการกระทำที่สำคัญของระบบต้องสร้าง audit record

**ตัวอย่าง:**

- Transaction ถูกสร้างขึ้น
- Merchant อนุมัติ transaction
- Reward ถูกแบ่งสรร
- Balance ถูกอัปเดต
- การกระทำของ admin

---

# 4. Data Layer (ชั้นข้อมูล)

**Database:**

Firebase Firestore

**Main Collections (Collection หลัก):**

**users**

จัดเก็บ:

- Profile ของผู้ใช้
- Role
- ข้อมูลการยืนยันตัวตน

**merchants**

จัดเก็บ:

- ข้อมูล merchant
- สถานะ merchant
- ข้อมูลธุรกิจ

**transactions**

จัดเก็บ:

- Transaction ของ customer
- สถานะการอนุมัติของ merchant
- การคำนวณ marketing fee

**rewards**

จัดเก็บ:

- ประวัติ reward ของ customer
- บันทึกการได้รับ SP

**marketingFunds**

จัดเก็บ:

- Transaction ของ marketing fund

**auditLogs**

จัดเก็บ:

- ประวัติกิจกรรมของระบบ
- การติดตามด้านความปลอดภัย

การออกแบบ Firestore เป็นไปตามหลักการ:

- Scalability
- Security Rules
- Data consistency
- Auditability

---

# 5. Security Architecture (Architecture ด้านความปลอดภัย)

## Authentication (การยืนยันตัวตน)

Firebase Authentication บริหารจัดการ:

- การยืนยันตัวตน
- การ login ของผู้ใช้
- การจัดการ session

---

## Authorization (การควบคุมสิทธิ์)

Role Based Access Control (RBAC)

**Customer:**

- ดู profile ของตนเอง
- ดู reward ของตนเอง
- ดู transaction ของตนเอง

**Merchant:**

- อนุมัติ transaction ของลูกค้า
- ดูข้อมูลของ merchant ตนเอง

**Admin:**

- บริหารจัดการการดำเนินงานของระบบ
- ตรวจสอบ transaction
- เฝ้าติดตามแพลตฟอร์ม

---

## Backend Security (ความปลอดภัยของ Backend)

การดำเนินการที่สำคัญต้องทำงานบน Cloud Functions เท่านั้น

Client ไม่สามารถดำเนินการต่อไปนี้ได้โดยตรง:

- เปลี่ยนสถานะ transaction
- แก้ไข SP balance
- แก้ไขการแบ่งสรร reward
- แก้ไข marketing fund

---

## PDPA Compliance (การปฏิบัติตาม PDPA)

ระบบสนับสนุน:

- การบริหารจัดการความยินยอมของผู้ใช้ (user consent management)
- การควบคุมการเข้าถึง (access control)
- การปกป้องข้อมูลส่วนบุคคล (personal data protection)
- การบันทึก audit log
- การเก็บข้อมูลแบบ minimum (data minimization)

---

# 6. AI Layer (ชั้น AI)

AI ทำงานเป็น intelligence layer เพื่อสนับสนุนการตัดสินใจทางธุรกิจ

## Customer Intelligence

**Capabilities (ความสามารถ):**

- Reward เฉพาะบุคคล
- การวิเคราะห์พฤติกรรมลูกค้า
- คำแนะนำโปรโมชัน

---

## Merchant Intelligence

**Capabilities (ความสามารถ):**

- การวิเคราะห์การรักษาลูกค้า (retention)
- Insight ด้านการขาย
- คำแนะนำด้านการตลาด

---

## Business Intelligence

**Capabilities (ความสามารถ):**

- การวิเคราะห์แนวโน้มทางธุรกิจ
- Insight ด้านประสิทธิภาพของแพลตฟอร์ม
- การสนับสนุนการตัดสินใจ

**ข้อจำกัดของ AI:**

AI ไม่สามารถแก้ไข transaction ทางการเงินได้โดยตรง

การดำเนินการทางธุรกิจที่สำคัญทั้งหมดต้องผ่านการตรวจสอบที่ backend

---

# 7. Deployment Architecture (Architecture การ Deploy)

**Cloud Platform:**

Firebase

**Services:**

- Firebase Hosting
- Firebase Authentication
- Cloud Functions
- Firestore
- Cloud Storage

**Development Workflow (ขั้นตอนการพัฒนา):**

```text
Developer
    ↓
GitHub Repository
    ↓
CI/CD Process
    ↓
Production Environment
```

---

# 8. Future Scalability (การขยายตัวในอนาคต)

Architecture นี้สนับสนุนการขยายตัวในอนาคต:

- Merchant ที่มากขึ้น
- Customer ที่มากขึ้น
- Mobile application
- AI analytics ขั้นสูง
- Recommendation engine
- Business intelligence dashboard

---

# Document Status (สถานะเอกสาร)

Version: 1.0

Status:
Draft for Architecture Review
