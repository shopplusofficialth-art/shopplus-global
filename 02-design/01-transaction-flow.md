# ShopPlus Global - Transaction Flow

**Version:** 1.0

**Last Updated:** 2026-08-04

**Document Owner:** Solution Architect

---

# 1. Overview (ภาพรวม)

## Purpose (วัตถุประสงค์)

เอกสารนี้อธิบาย transaction flow แบบ end-to-end ของ ShopPlus Global
ตั้งแต่ช่วงเวลาที่ customer สแกน QR Code ของ merchant จนถึงเมื่อ
transaction เสร็จสมบูรณ์และการแบ่งสรร SP ทั้งหมดถูกบันทึกไว้

วัตถุประสงค์คือเพื่อให้มี single source of truth สำหรับ business logic,
system behavior, และ backend processing เพื่อให้ developer, tester,
product owner, และ stakeholder มีความเข้าใจร่วมกัน

Transaction flow นี้ถูกออกแบบมาเพื่อให้แน่ใจว่า:

- การประมวลผล transaction มีความถูกต้อง
- การแบ่งสรร marketing fee มีความปลอดภัย
- มี audit trail ที่สมบูรณ์
- ปฏิบัติตามกฎระเบียบของไทยและ PDPA
- สามารถ scale ได้สำหรับการขยายแพลตฟอร์มในอนาคต

## Scope (ขอบเขต)

เอกสารนี้ครอบคลุม transaction lifecycle แบบสมบูรณ์ภายในแพลตฟอร์ม
ShopPlus Global รวมถึงการสร้าง transaction, กระบวนการอนุมัติ, การ
เปลี่ยนสถานะ, การแบ่งสรร SP, การประมวลผลที่ backend, และ audit
logging

เอกสารนี้ไม่ครอบคลุมการออกแบบ UI/UX, Firestore database schema,
ข้อกำหนด API, รายละเอียดการ implement Cloud Functions, หรือ
infrastructure architecture หัวข้อเหล่านี้ถูกจัดทำเป็นเอกสารแยกไว้ภายใต้
โฟลเดอร์ Design

---

# 2. Actors (ผู้มีส่วนเกี่ยวข้องในระบบ)

| Actor | Responsibility |
|--------|----------------|
| Customer | สแกน QR Code ของ merchant และเริ่มต้น transaction |
| Merchant | ตรวจสอบและอนุมัติหรือปฏิเสธ transaction ที่รอดำเนินการ |
| Web / Mobile Application | ส่งคำขอ transaction และแสดงสถานะ transaction |
| Firebase Authentication | ยืนยันตัวตนผู้ใช้และสิทธิ์การเข้าถึง |
| Cloud Functions | ตรวจสอบความถูกต้องของ transaction, คำนวณการแบ่งสรร SP, และดำเนินการตาม business rule |
| Firestore | จัดเก็บข้อมูล transaction และ audit log |
| Admin | เฝ้าติดตาม transaction, สอบสวนปัญหา, และดำเนินการด้านการบริหารระบบ |

---

# 3. Transaction Lifecycle (วงจรชีวิตของ transaction)

Lifecycle ต่อไปนี้อธิบายเส้นทางแบบสมบูรณ์ของ transaction ภายใน
แพลตฟอร์ม ShopPlus Global

```text
Customer
    │
    ▼
Scan Merchant QR Code
    │
    ▼
Create Transaction
(Status = PENDING_APPROVAL)
    │
    ▼
Merchant Reviews Transaction
    │
 ┌──┴───────────────┐
 │                  │
 ▼                  ▼
Approve          Reject
 │                  │
 ▼                  ▼
PROCESSING     REJECTED
 │                  │
 ▼                  ▼
Cloud Functions   Write Audit Log
Validate
 │
 ▼
Deduct Marketing Fee (30 SP)
 │
 ▼
Distribute SP
 ├── Customer Reward (+10 SP)
 ├── Marketing Fund (+10 SP)
 └── ShopPlus Global (+10 SP)
 │
 ▼
Write Audit Log
 │
 ▼
COMPLETED
```

## Lifecycle Description (คำอธิบายวงจรชีวิต)

| Step | Description |
|------|-------------|
| 1 | Customer สแกน QR Code ของ merchant |
| 2 | แอปพลิเคชันสร้าง transaction ใหม่ด้วยสถานะ **PENDING_APPROVAL** |
| 3 | Merchant ตรวจสอบ transaction ที่รอดำเนินการ |
| 4 | Merchant อนุมัติหรือปฏิเสธ transaction |
| 5 | ถ้าได้รับการอนุมัติ Firebase Cloud Functions จะตรวจสอบความถูกต้องของ transaction และดำเนินการตาม business rule |
| 6 | ระบบหัก Marketing Fee จำนวน **30 SP** |
| 7 | ระบบแบ่งสรร SP ให้ Customer Reward, Marketing Fund, และ ShopPlus Global |
| 8 | ทุกเหตุการณ์ที่สำคัญจะถูกบันทึกใน Audit Log |
| 9 | สถานะ transaction จะถูกอัปเดตเป็น **COMPLETED** |

# 4. Transaction Status (สถานะของ transaction)

## Status Definitions (คำอธิบายสถานะ)

| Status | Description | Next Status |
|--------|-------------|-------------|
| PENDING_APPROVAL | Transaction ถูกสร้างขึ้นและกำลังรอการตรวจสอบจาก merchant | APPROVED, REJECTED |
| APPROVED | Merchant อนุมัติ transaction แล้ว และการประมวลผลที่ backend พร้อมที่จะเริ่มต้น | PROCESSING |
| PROCESSING | Firebase Cloud Functions กำลังตรวจสอบและประมวลผล transaction | COMPLETED, FAILED |
| REJECTED | Merchant ปฏิเสธ transaction ไม่มีการแบ่งสรร SP เกิดขึ้น | Final |
| COMPLETED | Transaction เสร็จสมบูรณ์และการแบ่งสรร SP ทั้งหมดถูกบันทึกแล้ว | Final |
| FAILED | การประมวลผลที่ backend ล้มเหลว ต้องมีการสอบสวนหรือ retry | PROCESSING (Retry) |

## State Transition (การเปลี่ยนสถานะ)

```text
PENDING_APPROVAL
        │
        ▼
    APPROVED
        │
        ▼
   PROCESSING
     │      │
     │      ▼
     │   FAILED
     │      │
     └──────┘ Retry
        │
        ▼
   COMPLETED

PENDING_APPROVAL
        │
        ▼
    REJECTED
```

# 5. Main Flow (Flow หลัก)

*(ยังไม่มีเนื้อหาในต้นฉบับ — รอการเพิ่มเติมในการปรับปรุงครั้งต่อไป)*

---

# 6. Exception Flow (Flow กรณีข้อยกเว้น)

*(ยังไม่มีเนื้อหาในต้นฉบับ — รอการเพิ่มเติมในการปรับปรุงครั้งต่อไป)*

---

# 7. SP Distribution (การแบ่งสรร SP)

*(ยังไม่มีเนื้อหาในต้นฉบับ — รอการเพิ่มเติมในการปรับปรุงครั้งต่อไป)*

---

# 8. Audit Log

*(ยังไม่มีเนื้อหาในต้นฉบับ — รอการเพิ่มเติมในการปรับปรุงครั้งต่อไป)*

---

# 9. Design Decision (การตัดสินใจด้านการออกแบบ)

*(ยังไม่มีเนื้อหาในต้นฉบับ — รอการเพิ่มเติมในการปรับปรุงครั้งต่อไป)*
