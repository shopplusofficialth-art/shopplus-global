# Data & API Design Standard Skill

## Purpose (วัตถุประสงค์)

Skill นี้กำหนดกระบวนการมาตรฐานสำหรับ agent สองตัว —
**`database-schema-designer`** และ **`api-spec-designer`** — ในการ
สร้าง/ปรับปรุงเอกสารเชิงเทคนิคระดับ **conceptual** สองฉบับที่เกี่ยวข้อง
กันโดยตรง แต่แยกไฟล์กันเพื่อให้แก้ไขและอ้างอิงอิสระจากกันได้:

1. **`02-design/05-database-schema.md`** — ขยาย "Key Conceptual Data
   Entities" ที่มีอยู่ใน `02-design/03-system-architecture.md` §6 ให้
   เป็นรายละเอียดระดับ table/entity จริง (attribute, ความสัมพันธ์,
   PDPA classification) พร้อม **ER Diagram**
2. **`02-design/06-api-spec.md`** — กำหนด operation/resource ระดับ
   conceptual ที่ระบบต้องมี ตาม User Journey และ entity ที่กำหนดไว้ใน
   เอกสารข้อ 1

ทั้งสองฉบับ**ยังไม่ผูกมัดกับ technical stack เฉพาะเจาะจง** (เช่น ชื่อ
database engine, ORM, protocol อย่าง REST/GraphQL/gRPC, HTTP method,
storage type) เพื่อให้ตัดสินใจเทคโนโลยีจริงในภายหลังได้อย่างอิสระ
เช่นเดียวกับหลักการที่ `architecture-designer` ใช้กับ
`02-design/03-system-architecture.md`

ใช้ร่วมกันโดย agent สองตัวข้างต้น เพื่อให้ format, ระดับความเป็น
conceptual, และกฎ traceability ตรงกันเสมอระหว่างสองเอกสาร

---

## Shared Rule: Ambiguity / Missing Information Protocol (กฎเมื่อข้อมูลไม่ชัดเจน)

เช่นเดียวกับทุก skill อื่นในโปรเจกต์ — ถ้าการแบ่ง entity/attribute, ระดับ
PDPA sensitivity, ขอบเขตของ operation, หรือความสัมพันธ์ระหว่าง entity ใด
ยังตีความได้มากกว่าหนึ่งแบบ **ห้ามสมมติเองโดยไม่ถาม**:

1. หยุดและถามผู้ใช้งานก่อนดำเนินการต่อ
2. เสนอ **อย่างน้อย 3 แนวทาง** ที่เป็นไปได้
3. สำหรับแต่ละแนวทาง ให้ระบุ: เหตุผล, ข้อดี, ข้อเสีย
4. แนะนำแนวทางที่ดีที่สุด 1 แนวทาง พร้อมเหตุผลที่แนะนำอย่างชัดเจน
5. ให้ผู้ใช้งานเป็นผู้ตัดสินใจสุดท้ายก่อนเขียนเอกสารจริง

ตัวอย่างจุดที่มักต้อง trigger ข้อนี้: entity หนึ่งควรแยกเป็นสอง table
หรือรวมเป็นตารางเดียว, field ใดควรจัดเป็น "Sensitive Personal Data" ตาม
PDPA หรือไม่, operation หนึ่งควรแยกเป็นหลาย operation ย่อยหรือรวมเป็น
operation เดียว, ความสัมพันธ์ระหว่าง entity เป็นแบบ 1:N หรือ N:M

---

## Section A: Database Schema Standard (มาตรฐานเอกสาร Database Schema)

ใช้โดย agent `database-schema-designer` สำหรับดูแล
`02-design/05-database-schema.md`

### Dependency Check (ตรวจสอบก่อนเริ่มงานเสมอ)

ต้องมีและครอบคลุม scope ที่จะทำก่อนเริ่มงานเสมอ:

1. `01-requirements/03-feature-list.md` (`FT-xxx`)
2. `02-design/04-user-journey.md` (journey step ต่อ actor)
3. `02-design/03-system-architecture.md` §6 "Key Conceptual Data
   Entities" — entity ตั้งต้นที่ต้องขยายรายละเอียด ไม่ใช่คิด entity ใหม่
   ที่ไม่มีที่มาจาก §6 นี้ (ถ้าพบว่าจำเป็นต้องมี entity ใหม่ที่ §6 ไม่มี
   ให้ flag "New — แนะนำให้เพิ่มเข้า Architecture §6" แทนการเพิ่มเงียบ ๆ)

ถ้าไฟล์ใดไม่มีหรือไม่ครอบคลุม scope ที่ต้องการ ให้แจ้งผู้ใช้ว่าขาดอะไร
แล้วเสนอให้เรียก `feature-list-analyst`/`user-journey-designer`/
`architecture-designer` ก่อนตามลำดับที่ขาด — **ห้ามข้ามไปสมมติ
Feature/Journey/Entity เอง**

**ความสัมพันธ์กับ `02-design/02-firestore-data-model.md` (ถ้ามีอยู่):**
เอกสารนั้นเป็นเอกสารเทคนิคที่ผูกกับ Firestore อยู่แล้ว และ**เป็นเอกสาร
แยกอิสระ** จาก `02-design/05-database-schema.md` — agent นี้**ไม่แก้ไข**
`02-firestore-data-model.md` และไม่ต้อง migrate เนื้อหาใด ๆ จากไฟล์นั้น
มา เพียงอ้างอิง (cross-reference) กลับไปในหมวด "Current Technical
Direction (Non-Binding Reference)" ของเอกสารใหม่เท่านั้น (ดู Required
Output Format ข้อ 9)

### Plan-then-Confirm Gate (ต้องเสนอแผนก่อนเขียนไฟล์จริงเสมอ)

ก่อนสร้าง/แก้ไข `02-design/05-database-schema.md` จริง ต้องเสนอแผนให้
ผู้ใช้ยืนยันก่อนเสมอ ประกอบด้วย:

1. **สร้างใหม่ หรือ ปรับปรุงของเดิม**
2. **Entity ที่จะครอบคลุมในรอบนี้** — อ้างอิงจาก §6 ของ Architecture
   (ถ้าผู้ใช้ไม่ระบุ ให้เสนอ "ทุก entity ที่มีอยู่ใน §6 ปัจจุบัน" เป็นค่า
   เริ่มต้น)
3. รอการยืนยันจริงจากผู้ใช้ก่อนจึงเขียนไฟล์ — ห้ามข้าม gate นี้แม้ผู้ใช้
   จะขอแบบเร่งด่วน

### Required Output Format (โครงสร้างเอกสารที่ต้องมี)

เอกสารต้องมี header block (Version, Last Updated, Document Owner,
Source) และ Revision History table รูปแบบเดียวกับเอกสารอื่นในโปรเจกต์
ตามด้วยหัวข้อครบทุกข้อนี้:

**1. Purpose & Scope** — ระบุว่าเอกสารนี้เป็น conceptual/
technology-agnostic data model (ไม่ผูกกับ database engine เฉพาะเจาะจง
เช่น relational/NoSQL/document store) และไม่ครอบคลุม API specification
(ดู `02-design/06-api-spec.md`)

**2. Entity Catalog (รายละเอียดแต่ละ Entity/Table)** — ต่อ 1 entity ต้อง
มี:
   - Entity Name (ตรงกับชื่อใน Architecture §6)
   - Description
   - Attribute table: คอลัมน์ **Attribute | Conceptual Type | Required? |
     PDPA Classification | Description** — ใช้ conceptual type เท่านั้น
     (`Identifier`, `Text`, `Number`, `Decimal`, `Boolean`, `Date/Time`,
     `Enum` (ระบุค่าที่เป็นไปได้), `Reference` (อ้างอิง entity อื่น),
     `Structured/JSON`) — **ห้ามใช้ชื่อ type เฉพาะเจาะจงของ database
     engine** (เช่น `VARCHAR(255)`, `TIMESTAMP`, `firestore.Timestamp`)
   - PDPA Classification ต่อ attribute ต้องเป็นหนึ่งใน: `Public /
     Non-Personal`, `Personal Data`, `Sensitive Personal Data` (ตาม
     นิยาม PDPA) — attribute ที่เป็น Personal/Sensitive ต้องมีหมายเหตุ
     สั้น ๆ ว่าทำไมต้องเก็บ (data minimization ตาม CLAUDE.md หมวด 10)
   - Business Rule Notes (ถ้ามี) — เช่น ข้อจำกัดค่า (SP Wallet balance
     ต้อง >= 0), อ้างอิงกฎ SP Point จาก CLAUDE.md หมวด 4 ถ้าเกี่ยวข้อง

**3. Relationships (ความสัมพันธ์ระหว่าง Entity)** — ตาราง: Entity A |
Relationship (1:1 / 1:N / N:M) | Entity B | คำอธิบาย

**4. ER Diagram (บังคับ ต้องมีอย่างน้อย 1 diagram)** — ใช้ Mermaid
`erDiagram` แสดงทุก entity ในขอบเขตของรอบนี้พร้อมความสัมพันธ์ตามข้อ 3 —
ใช้ชื่อ entity/attribute แบบ conceptual เท่านั้น ไม่ใช้ชื่อ
collection/table จริงจากเอกสารเทคนิค

**5. Data Lifecycle & Retention (วงจรชีวิตข้อมูลและการเก็บรักษา)** — ต่อ
entity ที่มี Personal/Sensitive Data: ระบุแนวทาง retention/minimization
เชิงแนวคิด (เช่น "เก็บระหว่างที่บัญชียัง active + ตามระยะเวลาที่กฎหมาย
กำหนด", "ลบ/anonymize เมื่อผู้ใช้ขอใช้สิทธิ์ตาม PDPA") — ไม่ต้องระบุ
กลไก implementation จริง

**6. Access Control Matrix (ตารางสิทธิ์การเข้าถึง)** — ต่อ entity:
Role (Customer/Merchant/Admin) × Can Read/Write เชิงแนวคิด ต้องสอดคล้อง
กับ `02-design/03-system-architecture.md` §7 "Security & Access
Control" ห้ามขัดแย้งกัน

**7. Traceability** — ทุก entity ต้องอ้างอิงกลับไปยัง entity เดียวกันใน
Architecture §6 และ `FT-xxx`/journey step ที่เกี่ยวข้อง (ผ่าน Architecture
§5 Data Flow) — ไม่สร้าง ID scheme ใหม่ของตัวเอง (ดู Rules)

**8. Current Technical Direction (Non-Binding Reference)** — Section
เดียวที่อนุญาตให้กล่าวถึงชื่อ technology ได้ ต้องขึ้นต้นด้วยข้อความ
ชัดเจนแบบเดียวกับที่ `architecture-design-standard` กำหนด (**"ส่วนนี้
สะท้อนทิศทางเทคนิคปัจจุบันตาม CLAUDE.md หมวด 6 เท่านั้น ไม่ใช่ constraint
ของ data model ระดับแนวคิดข้างต้น"**) ตามด้วยหัวข้อย่อยครบทั้ง 4 ข้อนี้
เสมอ (ไม่ใช่แค่ลิงก์ + สรุปสั้น ๆ แบบเดิม):

  - **8.1 Entity → Firestore Collection Mapping** — ตาราง: Entity Name
    (ตรงกับข้อ 2) | Firestore Collection Path (root collection หรือ
    subcollection พร้อมเหตุผลถ้าเลือก subcollection) | Document ID
    Strategy (auto-generated ID / custom ID เช่น ใช้ transaction code) |
    หมายเหตุการ denormalize (ถ้ามี ระบุว่า field ใดถูกทำซ้ำข้าม
    collection เพื่อลด join ตาม Known Platform Constraints ใน
    `02-design/03-system-architecture.md` §8.2)
  - **8.2 Attribute → Firestore Data Type Mapping** — ตาราง: Conceptual
    Type (จากข้อ 2) | Firestore Data Type ที่สอดคล้อง (`Text`→`string`,
    `Number`→`number`, `Decimal`→`number`, `Boolean`→`boolean`,
    `Date/Time`→`Timestamp`, `Enum`→`string` พร้อม comment ค่าที่เป็นไปได้,
    `Reference`→`DocumentReference` หรือ ID string ระบุแนวทางที่เลือก,
    `Structured/JSON`→`Map`) | หมายเหตุ
  - **8.3 Indexing Direction (แนวทาง Index เบื้องต้น)** — รายการ
    composite index ที่คาดว่าจำเป็น โดยอ้างอิงจาก query pattern ที่ระบุไว้
    ใน Operation Catalog ของ `02-design/06-api-spec.md` (ถ้ายังไม่มี API
    Spec ในรอบนี้ ให้ระบุ "รอ API Spec เพื่อยืนยัน query pattern" แทนการ
    สมมติ)
  - **8.4 Cross-Reference เอกสารเทคนิคเดิม** — ลิงก์ไปยัง
    `02-design/02-firestore-data-model.md` ถ้ามีอยู่ พร้อมสรุปสั้น ๆ ว่า
    entity แนวคิดใดใน §2 ถูก map ไปเป็น collection ใดบ้างในเอกสารนั้น
    (ถ้าขัดกับ 8.1 ที่เพิ่งกำหนดใหม่ ให้ flag ความขัดแย้งไว้ใน Open
    Questions ข้อ 9 แทนการเลือกฝั่งใดฝั่งหนึ่งเงียบ ๆ)

**9. Open Questions / Assumptions**

**10. Revision History**

---

## Section B: API Specification Standard (มาตรฐานเอกสาร API Spec)

ใช้โดย agent `api-spec-designer` สำหรับดูแล `02-design/06-api-spec.md`

### Dependency Check (ตรวจสอบก่อนเริ่มงานเสมอ)

ต้องมีและครอบคลุม scope ที่จะทำก่อนเริ่มงานเสมอ:

1. `01-requirements/03-feature-list.md` (`FT-xxx`)
2. `02-design/04-user-journey.md` (journey step ต่อ actor)
3. `02-design/03-system-architecture.md` (โดยเฉพาะ §3 "Orchestration /
   API Layer" และ §7 Security)
4. **`02-design/05-database-schema.md`** — ทุก operation ที่ออกแบบต้อง
   อ้างอิง entity/attribute ที่มีอยู่จริงในเอกสารนี้เท่านั้น **ห้าม
   ออกแบบ operation ที่อ้างอิง entity ที่ยังไม่มีอยู่จริง** — ถ้าเอกสารนี้
   ยังไม่มีหรือยังไม่ครอบคลุม entity ที่ scope ต้องการ ให้แจ้งผู้ใช้และ
   เสนอเรียก `database-schema-designer` ก่อนเสมอ แม้ผู้ใช้จะขอแค่ API
   Spec ก็ตาม (conditional dependency แบบเดียวกับที่ `prototype-designer`
   ต้องมี `DESIGN.md` ก่อน)

ถ้าไฟล์อื่นที่เหลือไม่มีหรือไม่ครอบคลุม scope ให้แจ้งผู้ใช้และเสนอเรียก
`feature-list-analyst`/`user-journey-designer`/`architecture-designer`
ตามลำดับที่ขาดก่อน — **ห้ามข้ามไปสมมติเอง**

### Plan-then-Confirm Gate (ต้องเสนอแผนก่อนเขียนไฟล์จริงเสมอ)

ก่อนสร้าง/แก้ไข `02-design/06-api-spec.md` จริง ต้องเสนอแผนให้ผู้ใช้
ยืนยันก่อนเสมอ ประกอบด้วย:

1. **สร้างใหม่ หรือ ปรับปรุงของเดิม**
2. **Feature/Journey/Entity ที่จะครอบคลุมในรอบนี้** (ถ้าผู้ใช้ไม่ระบุ
   ให้เสนอ "ทุก Feature ที่มี entity รองรับใน
   `02-design/05-database-schema.md` ปัจจุบัน" เป็นค่าเริ่มต้น)
3. รอการยืนยันจริงจากผู้ใช้ก่อนจึงเขียนไฟล์ — ห้ามข้าม gate นี้แม้ผู้ใช้
   จะขอแบบเร่งด่วน

### Required Output Format (โครงสร้างเอกสารที่ต้องมี)

เอกสารต้องมี header block และ Revision History table รูปแบบเดียวกับ
เอกสารอื่นในโปรเจกต์ ตามด้วยหัวข้อครบทุกข้อนี้:

**1. Purpose & Scope** — ระบุว่าเอกสารนี้เป็น conceptual API spec:
อธิบายเป็น **"Operation"** ระดับความสามารถ (capability) ไม่ผูกกับ
protocol (REST/GraphQL/gRPC), HTTP method, หรือ URL scheme ใด ๆ —
รายละเอียด protocol จริงอยู่ใน §7 "Current Technical Direction" เท่านั้น

**2. Resource ↔ Entity Mapping** — ตาราง: Resource (กลุ่ม operation ที่
เกี่ยวกับ entity เดียวกัน/ใกล้เคียงกัน) | Entity ที่เกี่ยวข้อง (อ้างจาก
`02-design/05-database-schema.md`) | คำอธิบายสั้น ๆ

**3. Operation Catalog (รายละเอียดแต่ละ Operation)** — ต่อ 1 operation
ต้องมี:
   - Operation Name (เชิงแนวคิด เช่น "Approve Transaction" ไม่ใช่
     `POST /transactions/:id/approve`)
   - Actor(s) ที่มีสิทธิ์เรียกใช้ (Customer/Merchant/Admin/System)
   - Trigger — journey step/FT-xxx ต้นทางจาก `02-design/04-user-journey.md`
   - Request (conceptual fields) — อ้างอิง attribute จาก
     `02-design/05-database-schema.md` เท่านั้น ห้ามคิด field ใหม่ที่ไม่มี
     ที่มา
   - Response (conceptual fields) — เช่นเดียวกัน
   - Business Rules Invoked — อ้างอิงกฎจาก CLAUDE.md (เช่น SP Point
     conversion, minimum marketing fee) หรือ Architecture §3 Business
     Logic Layer ถ้าเกี่ยวข้อง
   - Error/Exception Conditions (เชิงแนวคิด — เช่น `Validation Error`,
     `Authorization Error`, `Business Rule Violation`, `Not Found`,
     `Conflict/Idempotency Violation`) — ไม่ใช้ HTTP status code
     เฉพาะเจาะจง (ใส่ได้เฉพาะใน §7)
   - PDPA & Security Notes — ระบุว่า operation นี้ส่งคืน personal data
     หรือไม่ และมีการจำกัดเฉพาะข้อมูลที่จำเป็น (data minimization) หรือไม่

**4. Interaction Diagram (แนะนำ ไม่บังคับ)** — สำหรับ operation ที่มี
หลายขั้นตอน/หลาย layer เกี่ยวข้อง (เช่น Transaction Approval) แนะนำให้ใช้
Mermaid `sequenceDiagram` แสดงการไหลระหว่าง Actor → API/Orchestration
Layer → Business Logic Layer → Data Layer ตาม layer ใน
`02-design/03-system-architecture.md` §3

**5. Error Handling Convention (ภาพรวม)** — สรุปหมวดหมู่ error เชิง
แนวคิดที่ใช้ร่วมกันทุก operation (อ้างอิงจากข้อ 3)

**6. Security & PDPA Considerations (ภาพรวมทั้งเอกสาร)** — หลักการ
authN/authZ ระดับแนวคิด (ต้องสอดคล้องกับ Access Control Matrix ใน
`02-design/05-database-schema.md` §6), จุดที่ต้องตรวจสอบ PDPA consent
ก่อนดำเนินการ (ถ้ามี)

**7. Current Technical Direction (Non-Binding Reference)** — Section
เดียวที่อนุญาตให้ระบุ protocol/HTTP method/URL scheme จริงได้ ต้องขึ้นต้น
ด้วยข้อความชัดเจนแบบเดียวกับ Section A ข้อ 8 ตามด้วยหัวข้อย่อยครบทั้ง 4
ข้อนี้เสมอ (ไม่ใช่แค่ประกาศ protocol ลอย ๆ แบบเดิม):

  - **7.1 Operation → Cloud Function Mapping** — ตาราง: Operation Name
    (ตรงกับข้อ 3) | Trigger Type (`HTTPS Callable` / `onRequest HTTP
    Trigger` / `Firestore Trigger` (onCreate/onUpdate/onDelete) /
    `Scheduled Function`) | ชื่อ Cloud Function ที่แนะนำ (convention:
    verbNoun เช่น `approveTransaction`) | หมายเหตุ
  - **7.2 Auth & Transport Notes** — อธิบายว่า operation ส่วนใหญ่เรียก
    ผ่าน Firebase Client SDK (Callable Function ส่ง Firebase Auth ID
    token อัตโนมัติ) หรือกรณีใดที่ต้องใช้ `onRequest` HTTP endpoint จริง
    (ระบุ HTTP method ณ ที่นี้เท่านั้น) พร้อมระบุว่า operation ใดต้อง
    ตรวจสอบ Firebase Auth token/custom claims ก่อนประมวลผล (สอดคล้องกับ
    §6 Security & PDPA Considerations ข้างต้น)
  - **7.3 Error Mapping (แนวทาง map ไปยัง `functions.https.HttpsError`)**
    — ตาราง: Error/Exception Condition เชิงแนวคิด (จากข้อ 3) | Suggested
    `HttpsError` code (เช่น `invalid-argument`, `permission-denied`,
    `failed-precondition`, `not-found`, `already-exists`) | หมายเหตุ —
    ระบุชัดว่าเป็นแนวทางเริ่มต้น ไม่ใช่ contract บังคับตายตัว
  - **7.4 Cross-Reference เอกสารเทคนิคเดิม** — ถ้ามีรายละเอียด
    protocol/endpoint เดิมจากเอกสารก่อนหน้าที่มีคุณค่า ให้สรุปไว้ที่นี่
    และชี้ไปยังเอกสารเทคนิคแยกถ้ามี

**8. Open Questions / Assumptions**

**9. Revision History**

---

## Section C: Consistency Hook (การเรียก Traceability Auditor)

หลังจากสร้าง/แก้ไข `02-design/05-database-schema.md` หรือ
`02-design/06-api-spec.md` เสร็จแล้ว ต้องเรียกใช้ agent
`traceability-consistency-auditor` เสมอ (ตาม skill
`traceability-consistency-check`) เพื่อตรวจสอบว่า entity/operation ที่
อธิบายไว้ยังตรงกับ Feature List, User Journey, และ Architecture เวอร์ชัน
ล่าสุดหรือไม่ — โดยเฉพาะถ้า `api-spec-designer` แก้ไขหลังจาก
`database-schema-designer` เปลี่ยน entity/attribute ที่ operation เดิม
เคยอ้างอิงอยู่

---

## Rules (กฎ)

- ห้ามระบุชื่อ technology/vendor/protocol เฉพาะเจาะจง (database engine,
  ORM, REST/GraphQL/gRPC, HTTP method, URL scheme) นอกเหนือ section
  "Current Technical Direction (Non-Binding Reference)" ของแต่ละเอกสาร
- ห้ามสร้าง Traceability ID scheme ใหม่ (เช่น ENT-xxx, OP-xxx) — อ้างอิง
  ชื่อ entity/operation ตรง ๆ พร้อม `FT-xxx` และ journey step ที่มีอยู่
  จริงในเนื้อหา (แบบเดียวกับที่ `architecture-designer` ทำกับ
  `03-system-architecture.md`)
- ห้าม `database-schema-designer` สมมติ entity ที่ไม่มีที่มาจาก
  Architecture §6 — ถ้าจำเป็นต้องมี entity ใหม่ ให้ flag "New — แนะนำให้
  เพิ่มเข้า Architecture §6" แทนการเพิ่มเงียบ ๆ
- ห้าม `api-spec-designer` ออกแบบ operation ที่อ้างอิง entity/attribute
  ที่ไม่มีอยู่จริงใน `02-design/05-database-schema.md` — ถือเป็นการ
  ละเมิด dependency ที่กำหนดไว้ใน Section B ข้างต้น
- ห้ามแก้ไข `02-design/02-firestore-data-model.md` จาก agent ทั้งสองตัวนี้
  — เอกสารนั้นเป็นเอกสารเทคนิคแยกอิสระ อ้างอิงได้อย่างเดียว
- ทุก attribute ที่เป็น Personal Data/Sensitive Personal Data ต้องมี
  หมายเหตุ data minimization ตาม CLAUDE.md หมวด 10 — ห้ามปล่อยผ่านโดยไม่
  จัดประเภท
- ต้องเสนอแผน (Plan Proposal) และรอการยืนยันจากผู้ใช้ก่อนเขียน/แก้ไขไฟล์
  จริงเสมอ — ห้ามข้ามแม้เป็นการแก้ไขเล็กน้อย
- ทุกครั้งที่แก้ไขต้องมี Revision History entry ใหม่ ห้ามแก้แบบเงียบ
- หลังจากสร้าง/แก้ไขเสร็จแล้ว ต้องเรียกใช้ agent
  `traceability-consistency-auditor` เสมอ ห้ามข้าม (ดู Section C)
- Agent ทั้งสองตัวนี้ไม่ได้ถูกผนวกเข้า `pipeline-orchestrator` — ถูก
  เรียกผ่าน `Shopplus` โดยตรงเท่านั้นเมื่อผู้ใช้ร้องขอ (เหมือน
  `architecture-designer`)
- พิจารณาเสมอ: Agile methodology, PDPA compliance, security-by-design,
  scalability, business value, maintainability (สอดคล้องกับ CLAUDE.md)
