# SCOPE.md — ขอบเขตการบ้าน Module 2 (RAISE2)

**Project:** ShopPlus Global — Community Commerce Platform
**ใช้สำหรับ:** การบ้านที่ 1 · 2 · 3 · 4 ของ Module 2 (ตัดสินใจสัปดาห์แรก
ใช้คำตอบเดิมทั้ง 4 สัปดาห์ ตามกฎของการบ้าน)
**ตัดสินใจเมื่อ:** 2026-08-30
**อ้างอิง Feature เดิมของโปรเจกต์:** `FT-003` (Customer QR Scan &
Transaction Creation), `FT-005` (Merchant Transaction Approval Workflow)
— ดู `01-requirements/03-feature-list.md`
**Prototype ตั้งต้น (จาก Module 1):**
[`03-development/prototypes/v1/merchant-pending-queue.html`](03-development/prototypes/v1/merchant-pending-queue.html)

---

## ประโยคเดียวสรุปขอบเขต

> ระบบของฉันเก็บ **รายการทำธุรกรรม (transaction)** ที่ **ลูกค้า** สร้างขึ้น
> (จากการสแกน QR แล้วกรอกยอดซื้อ) แต่ละรายการเลือก **ร้านค้าปลายทาง** ได้
> และมีสถานะ **รอการอนุมัติ (PENDING_APPROVAL)** →
> **อนุมัติ/ปฏิเสธ (APPROVED/REJECTED)** โดย **ร้านค้า** เป็นคนกดเปลี่ยน

---

## ตารางขอบเขต 9 บรรทัด

|  | 🔧 LeaveEasy | 👤 ของ ShopPlus Global |
|---|---|---|
| 📁 โฟลเดอร์หลัก | `leaveRequests` | `transactions` |
| 📁 โฟลเดอร์ประเภท | `leaveTypes` | `merchants` (ลูกค้าเลือกร้านจากลิสต์ — denormalize `shopName` และ `minimumPurchaseAmount` ของร้านนั้นลงใน transaction ตอนสร้าง) |
| 📁 โฟลเดอร์ย่อย | `approvals` | `events` (ประวัติ/audit log ของแต่ละ transaction) |
| ✏️ ช่องบอกว่าเป็นของใคร | `requesterId` · `requesterName` | `customerId` (+ ชื่อ/รหัสลูกค้าแบบ masked เพื่อ data minimization) |
| 🔀 สถานะทั้งหมด | รอพิจารณา · อนุมัติ · ไม่อนุมัติ | `PENDING_APPROVAL` · `APPROVED` · `REJECTED` |
| 👤 คนที่สร้างรายการ | พนักงาน | ลูกค้า (Customer) — กรอกยอดซื้อ ระบบเช็คว่าถึง `minimumPurchaseAmount` ของร้านก่อนถึงจะส่งคำขอได้ |
| 👤 คนที่เปลี่ยนสถานะ | หัวหน้า | ร้านค้า (Merchant) — กด **อนุมัติ** = หักค่าการตลาดทันที (30 SP ตามกฎ SP Point เดิม), กด **ปฏิเสธ** = ต้องพิมพ์เหตุผล |
| 📝 ช่องข้อความยาวที่ AI จะอ่าน | `reason` (เหตุผลการลา) | `rejectionReason` — เหตุผลที่ร้านค้าพิมพ์ตอนกด **ปฏิเสธ** (เช่น ลูกค้ากรอกยอดผิด, ต้องสงสัยว่าโกง) |
| 🤖 งานที่ AI ช่วย (สัปดาห์ที่ 8) | จัดประเภทการลาให้อัตโนมัติ | จัดหมวดเหตุผลการปฏิเสธให้อัตโนมัติ (เช่น "กรอกผิด" / "ต้องสงสัยว่าโกง" / "อื่น ๆ") |

---

## เช็กครบ 6 อย่างของ Module 2

| # | รายการ | มีไหม |
|---|---|---|
| 1 | โฟลเดอร์หลักที่เพิ่มเรื่อย ๆ | ✅ `transactions` |
| 2 | ช่องบอกว่าเป็นของใคร | ✅ `customerId` |
| 3 | สถานะที่เปลี่ยนได้ | ✅ `PENDING_APPROVAL → APPROVED / REJECTED` |
| 4 | โฟลเดอร์ประเภทที่เลือกจากลิสต์ (denormalize) | ✅ `merchants` |
| 5 | โฟลเดอร์ย่อยผูกกับรายการนั้น | ✅ `events` |
| 6 | ช่องข้อความยาวให้ AI อ่าน | ✅ `rejectionReason` |

**ผลตรวจ:** ครบ 6/6 ข้อ — ลงมือทำได้เลย

---

## หมายเหตุ / การตัดสินใจสำคัญที่เกี่ยวข้อง

1. **`minimumPurchaseAmount` เป็นฟิลด์ใหม่** ที่ยังไม่มีอยู่ในเอกสารทางการ
   (`01-requirements/01-business-requirement.md`,
   `02-design/05-database-schema.md`,
   `02-design/02-firestore-data-model.md`) — เป็นเงื่อนไข **"ยอดซื้อขั้นต่ำ
   ก่อนขอแต้ม"** ที่ร้านค้ากำหนดเอง **คนละเรื่องกับ** "marketing fee ขั้นต่ำ
   3 บาท/30 SP" ที่เป็นค่าคงที่ทุกร้านตาม CLAUDE.md หมวด 4 (ไม่ได้แก้ไข
   หรือขัดแย้งกับกฎ SP Point เดิม) — ใช้เฉพาะขอบเขตการบ้านนี้เท่านั้น
   ยังไม่ได้แก้ไขเอกสารทางการของโปรเจกต์
2. **`rejectionReason` เป็นฟิลด์ใหม่** เช่นกัน ยังไม่มีในเอกสารทางการ —
   เพิ่มเฉพาะในขอบเขตการบ้านนี้
3. Prototype `merchant-pending-queue.html` (v1) เป็น mockup แบบ mock data
   เท่านั้น — งานของการบ้านที่ 1 คือเชื่อมหน้านี้ (หรือหน้ารายการใหม่ที่
   ปรับจากหน้านี้) เข้ากับ Firestore จริง
4. เนื้อหานี้เป็นเอกสารประกอบการบ้าน **แยกจากสาย traceability ทางการ**
   ของโปรเจกต์ (`FR-xxx` / `US-xxx` / `FT-xxx` / `AC-xxx` / `TC-xxx`) —
   ไม่ได้แก้ไขเอกสารใน `01-requirements/`, `02-design/`, หรือ `04-testing/`

---

## สิ่งที่ไม่ทำในรอบนี้ (เก็บไว้ใน Backlog Sprint 2)

- การแบ่งสรร SP จริงแบบ atomic (FT-006) — ทำแค่ status transition และ
  ข้อความจำลองว่าจะแบ่งสรร ไม่คำนวณจริง
- Redemption Fulfillment (FT-007/FT-008)
- Merchant Campaigns & Promotions (FT-020)
- การผูก `minimumPurchaseAmount`/`rejectionReason` เข้าเอกสารทางการ
  (BRD/Database Schema) แบบเป็นทางการ — ถ้าต้องการให้เป็นทางการจริง
  ต้องเรียก `requirement-analyst` ผ่าน Shopplus อีกครั้ง
