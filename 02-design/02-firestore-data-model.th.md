# ShopPlus Global - Firestore Data Model

**Version:** 1.2

**Last Updated:** 2026-08-04

**Document Owner:** Solution Architect

**Language Note:** เอกสารนี้เป็นฉบับแปลภาษาไทยของ [`02-firestore-data-model.md`](02-firestore-data-model.md) (ต้นฉบับภาษาอังกฤษ) หัวข้อหลัก, ชื่อ collection/field, และ JSON example คงไว้เป็นภาษาอังกฤษตามต้นฉบับ (เพราะเป็นชื่อจริงที่ใช้ใน Firestore) หากมีข้อขัดแย้งระหว่างสองฉบับ ให้ถือฉบับภาษาอังกฤษเป็นหลัก

---

# 1. Overview

เอกสารนี้กำหนดโครงสร้างฐานข้อมูล Firestore สำหรับ ShopPlus Global

วัตถุประสงค์ของการออกแบบนี้คือเพื่อกำหนดว่าข้อมูลทางธุรกิจจะถูกจัดเก็บ
เข้าถึง รักษาความปลอดภัย และประมวลผลโดย Firebase Cloud Functions
อย่างไร

การออกแบบนี้สนับสนุน:

- การประมวลผล transaction
- การบริหารจัดการ SP Point
- การบริหารจัดการ merchant
- ระบบ reward ของ customer
- Audit trail
- การสนับสนุน merchant ที่มีหลายสาขา
- AI analytics ในอนาคต

---

# 2. Database Design Principles

## Backend Controlled Processing

การดำเนินการทางธุรกิจที่ sensitive ต้องไม่ถูก execute โดยตรงจาก client
application

การดำเนินการต่อไปนี้ต้องถูกควบคุมโดย Firebase Cloud Functions:

- การประมวลผลการอนุมัติ transaction
- การแบ่งสรร SP
- การอัปเดต wallet balance
- การสร้าง ledger
- การจัดสรร marketing fund

Client application สามารถขอให้ดำเนินการเท่านั้น และแสดงผลลัพธ์เท่านั้น

---

## Transaction Consistency

การแบ่งสรร SP ต้องถูกประมวลผลแบบ atomic

ตัวอย่าง:

```text
Merchant Approve

|

Validate Transaction

|

Create SP Ledger Records

|

Update SP Wallet

|

Create Audit Event

|

Complete Transaction
```

การดำเนินการทั้งหมดต้องสำเร็จไปด้วยกันทั้งหมด

## Audit First Design

ทุกเหตุการณ์ทางธุรกิจที่สำคัญต้องสร้าง audit record

ตัวอย่าง:

- Transaction Created
- Merchant Approved
- SP Distribution Started
- SP Distribution Completed
- Transaction Completed

---

# 3. Firestore Collection Overview

```text
Firestore
|
|-- users
|-- merchants
|-- merchantBranches
|-- transactions
|-- transactionEvents
|-- spWallets
|-- spLedger
|-- marketingFunds
```

---

# 4. Users Collection

**Path**

`users/{userId}`

**Purpose**

จัดเก็บข้อมูล customer, merchant staff, และ admin

**Example**

```json
{
  "uid": "user123",
  "displayName": "Customer Name",
  "email": "customer@email.com",
  "role": "CUSTOMER",
  "status": "ACTIVE",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Role**

- CUSTOMER
- MERCHANT
- ADMIN

---

# 5. Merchants Collection

**Path**

`merchants/{merchantId}`

**Purpose**

จัดเก็บข้อมูลธุรกิจของ merchant

**Example**

```json
{
  "merchantId": "merchant001",
  "shopName": "Coffee Shop",
  "ownerId": "user123",
  "status": "ACTIVE",
  "createdAt": "timestamp"
}
```

---

# 6. Merchant Branches Collection

**Path**

`merchants/{merchantId}/branches/{branchId}`

**Purpose**

สนับสนุน merchant ที่มีหลายสาขา

**Example**

```json
{
  "branchId": "branch001",
  "merchantId": "merchant001",
  "branchName": "Main Branch",
  "address": "Chiang Mai",
  "status": "ACTIVE",
  "createdAt": "timestamp"
}
```

---

# 7. Transactions Collection

**Path**

`transactions/{transactionId}`

**Purpose**

บันทึก transaction หลัก

**Example**

```json
{
  "transactionId": "TX001",
  "customerId": "user123",
  "merchantId": "merchant001",
  "branchId": "branch001",
  "qrCodeId": "qr001",
  "status": "PENDING_APPROVAL",
  "marketingFee": 30,
  "processingKey": "unique-key",
  "approvedBy": null,
  "createdAt": "timestamp",
  "completedAt": null
}
```

**Status**

- PENDING_APPROVAL
- APPROVED
- PROCESSING
- COMPLETED
- FAILED
- REJECTED
- EXPIRED

---

# 8. Transaction Events Collection

**Path**

`transactions/{transactionId}/events/{eventId}`

**Purpose**

จัดเก็บประวัติ audit ของ transaction

**Example**

```json
{
  "eventType": "MERCHANT_APPROVED",
  "actorId": "merchantUser001",
  "actorRole": "MERCHANT",
  "timestamp": "timestamp",
  "metadata": {}
}
```

**Event Examples**

- TRANSACTION_CREATED
- MERCHANT_APPROVED
- MERCHANT_REJECTED
- SP_DISTRIBUTION_STARTED
- SP_DISTRIBUTION_COMPLETED
- TRANSACTION_COMPLETED
- TRANSACTION_FAILED

---

# 9. SP Wallets Collection

**Path**

`spWallets/{userId}`

**Purpose**

จัดเก็บ SP balance ปัจจุบัน

**Example**

```json
{
  "userId": "user123",
  "balance": 1000,
  "updatedAt": "timestamp"
}
```

**สำคัญ:**

SP balance สามารถถูกอัปเดตได้เฉพาะโดย Firebase Cloud Functions เท่านั้น

---

# 10. SP Ledger Collection

**Path**

`spLedger/{ledgerId}`

**Purpose**

จัดเก็บประวัติการเคลื่อนไหวของ SP ทั้งหมดที่ไม่สามารถเปลี่ยนแปลงได้
(immutable)

**Example**

```json
{
  "transactionId": "TX001",
  "source": "MARKETING_POOL",
  "destination": "CUSTOMER",
  "amount": 10,
  "type": "CUSTOMER_REWARD",
  "createdAt": "timestamp"
}
```

**Ledger Types**

- CUSTOMER_REWARD
- MARKETING_FUND
- SHOPPLUS_REVENUE

---

# 11. Marketing Funds Collection

**Path**

`marketingFunds/{fundId}`

**Purpose**

ติดตามการจัดสรรงบประมาณด้านการตลาด

**Example**

```json
{
  "transactionId": "TX001",
  "amount": 10,
  "campaignId": null,
  "createdAt": "timestamp"
}
```

---

# 12. Security Considerations

**Customer**

Can (ทำได้):

- ดู transaction ของตนเอง
- ดู SP balance ของตนเอง

Cannot (ทำไม่ได้):

- แก้ไข SP balance
- แก้ไขสถานะ transaction
- สร้าง ledger record

**Merchant**

Can (ทำได้):

- ดู transaction ของร้านค้าตนเอง
- อนุมัติ transaction ที่รอดำเนินการ

Cannot (ทำไม่ได้):

- แก้ไข SP Ledger
- แก้ไข wallet balance

**Admin**

Can (ทำได้):

- เฝ้าติดตาม transaction
- สอบสวนปัญหา
- เข้าถึง audit record

---

# 13. Idempotency Design

ทุก transaction processing flow ต้องมี unique processing key

Cloud Functions ต้องตรวจสอบ key นี้ก่อนที่จะ execute การแบ่งสรร SP

**Purpose (วัตถุประสงค์):**

- ป้องกันการจัดสรร SP ซ้ำซ้อน
- สนับสนุน retry mechanism
- รักษาความสอดคล้อง (consistency) ของ transaction

**Example (ตัวอย่าง):**

```text
Transaction Retry
|
Check processingKey
|
Already Processed?
|
YES = Stop
|
NO = Continue
```

---

# 14. Future AI Analytics Support

Data model นี้สนับสนุนความสามารถด้าน AI ในอนาคต

**Customer Analytics**

วิเคราะห์:

- พฤติกรรมการซื้อ
- การใช้ reward
- การรักษาลูกค้า (retention)

**Merchant Analytics**

วิเคราะห์:

- ผลการขาย
- ความถี่ของลูกค้า
- ประสิทธิภาพของแคมเปญ

**AI Recommendation**

สนับสนุน:

- โปรโมชันเฉพาะบุคคล
- Reward ที่ฉลาดขึ้น (smart rewards)
- การแบ่งกลุ่มลูกค้า (customer segmentation)
