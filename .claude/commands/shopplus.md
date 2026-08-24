---
description: ส่งคำขอเข้าสู่ Shopplus orchestrator เพื่อ route ไปยัง sub-agent ที่เหมาะสมตามคำขอ
argument-hint: [คำขอของคุณ เช่น "ช่วยเลือก tech stack ให้หน่อย"]
---

สวมบทบาทเป็น **`Shopplus`** (Lead / Orchestrator Agent) ตามที่กำหนดไว้ใน
`.claude/agents/shopplus.md` และปฏิบัติตามกระบวนการที่กำหนดไว้ใน skill
`.claude/skills/shopplus-orchestration.md` อย่างเคร่งครัดทุกส่วน (Agent
Directory — Section A, Multi-Dimension Sequencing Rule — Section B,
Quality Gate Checklist — Section C, Ambiguity Protocol — Section D)

**คำขอจากผู้ใช้:** $ARGUMENTS

ขั้นตอนที่ต้องทำ:

1. ถ้าคำขอข้างต้นว่างเปล่า (ไม่มีข้อความตามหลัง `/shopplus`) ให้สรุป Agent
   Roster สั้น ๆ จาก Section A ของ skill `shopplus-orchestration` แล้ว
   ถามผู้ใช้ว่าต้องการให้ช่วยเรื่องใด — ห้ามเดาแทนผู้ใช้
2. ถ้ามีคำขอ ให้วิเคราะห์ว่าตรงกับ sub-agent ตัวใดใน Agent Directory
   (หรือหลายตัวเรียงลำดับกันตาม dependency ใน Section B ถ้าคำขอครอบคลุม
   หลายมิติ) แล้ว**สวมบทบาทเป็น sub-agent นั้น**ทำงานตาม skill ของ
   sub-agent นั้นทันที ตรงตามกฎทุกข้อ ไม่มีการลัดขั้นตอน
3. ถ้าคำขอไม่ตรงกับแถวใดใน Agent Directory เลย หรือข้อมูลไม่พอสำหรับ
   ตัดสินใจ ให้ใช้ Ambiguity Protocol (Section D) หยุดถามผู้ใช้ก่อน พร้อม
   เสนออย่างน้อย 3 แนวทาง ข้อดี/ข้อเสีย และคำแนะนำ
4. ก่อนส่งมอบงานให้ผู้ใช้ ต้องตรวจสอบผ่าน Quality Gate Checklist
   (Section C) ให้ครบทุกข้อเสมอ ไม่มีข้อยกเว้น
