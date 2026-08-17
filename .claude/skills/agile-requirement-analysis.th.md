# Agile Requirement Analysis Skill

**Language Note:** เอกสารนี้เป็นฉบับแปลภาษาไทยของ [`agile-requirement-analysis.md`](agile-requirement-analysis.md) (ต้นฉบับภาษาอังกฤษ) จัดทำไว้เพื่อการอ้างอิงของทีมเท่านั้น **Claude Code จะโหลดและปฏิบัติตามเฉพาะไฟล์ต้นฉบับ `agile-requirement-analysis.md` เท่านั้น** ไฟล์นี้ไม่มีผลต่อพฤติกรรมของ Skill จริง หากมีข้อขัดแย้งระหว่างสองฉบับ ให้ถือฉบับภาษาอังกฤษเป็นหลัก

## Purpose

Skill นี้กำหนดกระบวนการมาตรฐาน
สำหรับการวิเคราะห์ requirement โดยใช้ Agile methodology
สำหรับ ShopPlus Global

---

# Analysis Process

ปฏิบัติตามขั้นตอนเหล่านี้เสมอ:

## Step 1: Understand Problem

ระบุ:

- สถานการณ์ปัจจุบัน
- Pain point ของผู้ใช้
- ผลกระทบทางธุรกิจ
- ผลลัพธ์ที่คาดหวัง

ห้ามกระโดดไปที่ solution ทันที

---

## Step 2: Identify Users

กำหนด:

**Primary users (ผู้ใช้หลัก):**

- Customer
- Merchant
- Admin

เข้าใจ:

- User goals (เป้าหมายของผู้ใช้)
- User behavior (พฤติกรรมของผู้ใช้)
- User expectations (ความคาดหวังของผู้ใช้)

---

## Step 3: Define User Stories

ใช้รูปแบบ:

As a [user]

I want [goal]

So that [benefit]

---

## Step 4: Define Requirements

สร้าง:

## Functional Requirements

สิ่งที่ระบบต้องทำ

ตัวอย่าง:

FR-001:

Customer สามารถดู SP Point balance ได้

---

## Non Functional Requirements

คุณภาพของระบบ:

- Security
- Performance
- Scalability
- Privacy

---

## Step 5: Acceptance Criteria

ใช้:

Given

When

Then

ตัวอย่าง:

Given customer ชำระเงินเสร็จสมบูรณ์

When transaction ได้รับการยืนยัน

Then SP Point จะถูกให้ reward

---

## Step 6: Priority

ใช้ Agile priority:

P0 Critical

P1 High

P2 Medium

P3 Low

---

# ShopPlus Global Business Rules

พิจารณาเสมอ:

- SP Point ecosystem
- Marketing fee ของ merchant
- Reward ของ customer
- Community commerce
- กลยุทธ์ offline-first

---

# Compliance Rules

Requirement ทั้งหมดต้องพิจารณา:

- PDPA
- Data privacy
- Authentication
- Authorization
- Security

---

# Output Standard

การวิเคราะห์ทุกครั้งควรมี:

1. Problem Statement (คำอธิบายปัญหา)

2. Target Users (ผู้ใช้เป้าหมาย)

3. User Stories

4. Functional Requirements

5. Non Functional Requirements

6. Acceptance Criteria

7. Priority

8. Risks (ความเสี่ยง)

9. Open Questions (คำถามที่ยังไม่มีคำตอบ)
