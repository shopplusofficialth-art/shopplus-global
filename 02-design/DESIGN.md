# ShopPlus Global — Design System (DESIGN.md)

Version: 1.0
Document Type: Design System / UI Foundation
Project: ShopPlus Global Community Commerce Platform
Last Updated: 2026-08-17
Document Owner: Design System (AI Native Development Workflow)
Source: `CLAUDE.md`, `02-design/03-system-architecture.md`, `02-design/04-user-journey.md`, `02-design/01-transaction-flow.md`

Design Direction (แนวทางการออกแบบ): **Earth Tone + Minimalist + Muji-inspired**

---

## Revision History (ประวัติการปรับปรุงเอกสาร)

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | สร้าง Design System เริ่มต้น (Brand Identity, Design Tokens, Component, UX Guideline) ตามแนวทาง Earth Tone + Minimalist + Muji |

---

## 1. Purpose & Scope (วัตถุประสงค์และขอบเขต)

เอกสารนี้เป็น **Design System** กลางของ ShopPlus Global สำหรับใช้อ้างอิง
ในการออกแบบและพัฒนา UI ทั้ง 3 แอปพลิเคชัน — Customer Application,
Merchant Application, และ Admin System — ให้มีภาษาการออกแบบเดียวกัน
(consistent design language) ตาม Product Scope ใน `CLAUDE.md` (§5) และ
Architecture ใน [`03-system-architecture.md`](03-system-architecture.md)

เอกสารนี้ครอบคลุม:

1. Brand Identity & CI
2. Design Principles (Earth Tone / Minimalist / Muji)
3. Design Tokens — Color, Typography, Spacing, Radius/Elevation, Iconography
4. UI Components & Patterns
5. UX Guidelines & Rules

เอกสารนี้ **ไม่ครอบคลุม** business logic, data model (ดู
[`02-firestore-data-model.md`](02-firestore-data-model.md)) หรือ state
machine ของ transaction (ดู [`01-transaction-flow.md`](01-transaction-flow.md))
— เอกสารนี้กำหนดเฉพาะ "หน้าตาและความรู้สึก" (look & feel) และกฎการใช้งาน UI

---

## 2. Brand Identity & CI (เอกลักษณ์ของแบรนด์)

### 2.1 Brand Essence

**Mission (จาก `CLAUDE.md` §2):**

> "Helping local community businesses compete in the digital economy by
> connecting merchants and customers through a shared reward ecosystem."

**Brand Character (บุคลิกของแบรนด์):** ShopPlus Global ควรให้ความรู้สึก
เหมือน "ร้านชุมชนที่ไว้ใจได้" ไม่ใช่ platform เทคโนโลยีที่เย็นชาหรือ
เน้นขาย — งานออกแบบจึงยึดแนวทาง **Earth Tone + Minimalist + Muji**
เพื่อสื่อถึงความเรียบง่าย จริงใจ อบอุ่น และยั่งยืน

| Brand Attribute | ความหมาย | สิ่งที่แปลเป็น UI |
|---|---|---|
| **Grounded (หนักแน่น/เป็นธรรมชาติ)** | เชื่อมโยงกับชุมชนและร้านค้าจริง | สีโทนดิน กระดาษ ไม้ ไม่ใช้สีสดจัด |
| **Honest (จริงใจ/ตรงไปตรงมา)** | ไม่หลอกลวง ไม่ปกปิดข้อมูล reward/fee | ตัวเลข SP และเงื่อนไขต้องชัดเจน อ่านง่าย |
| **Calm (สงบ/ไม่รบกวน)** | ไม่ยัดโปรโมชันหรือ notification จนล้น | Whitespace มาก, motion น้อย, CTA เดียวต่อหน้าจอ |
| **Quietly Confident (มั่นใจแบบเงียบ)** | ธุรกิจชุมชนที่มีคุณภาพ ไม่ต้องตะโกน | ไม่ใช้ gradient ฉูดฉาด, ไม่ใช้ shadow หนา |

### 2.2 Design Direction Statement

> "Design like a well-made everyday object — muted, honest materials, no
> decoration that doesn't serve a purpose."

หลักอ้างอิง 3 คำ:

- **Earth Tone** — จานสีอิงธรรมชาติ (ดิน ทราย ไม้ ใบไม้แห้ง) saturation ต่ำ
- **Minimalist** — ลดสิ่งที่ไม่จำเป็น เน้น content และ function มากกว่า decoration
- **Muji-inspired** — "no-brand" aesthetic: กระดาษ/เนื้อผ้าดิบ, typography เรียบ,
  ไอคอนเส้นเดียว, ไม่มี gloss/gradient/เงาหนัก

### 2.3 Logo & Clear Space (แนวทางโลโก้)

> หมายเหตุ: ยังไม่มีไฟล์โลโก้จริงในโครงการนี้ ข้อกำหนดด้านล่างเป็น
> **แนวทางสำหรับทีมออกแบบกราฟิก** เมื่อสร้างโลโก้จริง

- โลโก้ต้องใช้งานได้บนพื้นหลัง **Paper** (`--color-bg-base`) และพื้นหลัง
  **Ink** (`--color-ink-900`) เป็นอย่างน้อย 2 เวอร์ชัน (Positive / Negative)
- ห้ามใส่เงา (drop shadow), gradient, หรือ outline หนาเกิน 1px บนโลโก้
- Clear space รอบโลโก้ ≥ ความสูงของตัวอักษร "S" ในโลโก้ (1x unit)
- ขนาดต่ำสุดสำหรับ digital: สูง 24px (mobile nav bar) / 32px (web header)

### 2.4 Voice & Tone (น้ำเสียงของแบรนด์)

| Context | Tone | ตัวอย่าง |
|---|---|---|
| Customer app | เป็นกันเอง อบอุ่น กระชับ | "ได้รับ 10 SP แล้ว ลองดูของแลกรางวัลได้เลย" |
| Merchant app | มืออาชีพ ตรงประเด็น | "มีรายการรอการอนุมัติ 3 รายการ" |
| Admin system | เป็นกลาง ชัดเจน ไม่ใช้ emoji | "Transaction #1042 ถูก flag เนื่องจาก QR ซ้ำ" |
| Error / PDPA consent | สุภาพ ไม่กล่าวโทษผู้ใช้ | "ยังไม่สามารถบันทึกได้ กรุณาลองใหม่อีกครั้ง" |

กฎร่วม: ภาษาไทยเป็นภาษาหลัก, ใช้คำง่าย หลีกเลี่ยง jargon ฝั่ง customer,
ห้ามใช้ dark pattern เร่งให้ตัดสินใจ (เช่น countdown ปลอม, "เหลือ 1 ที่
สุดท้าย!" ที่ไม่จริง) — สอดคล้องกับหลัก PDPA และความจริงใจของแบรนด์

---

## 3. Design Principles (หลักการออกแบบ)

1. **Content over decoration** — ทุก element ต้องมีหน้าที่ ถ้าตัดออกแล้ว
   ผู้ใช้ยังทำงานสำเร็จได้ ให้ตัดออก
2. **One primary action per screen** — แต่ละหน้าจอมี CTA หลักได้เพียง 1
   ปุ่ม (primary button) ที่เหลือเป็น secondary/tertiary
3. **Muted before bold** — ใช้สี earth tone ที่ saturation ต่ำเป็นค่าเริ่มต้น
   สีเข้ม/สดใช้เฉพาะจุดที่ต้องการความสนใจจริง ๆ (SP point, error, primary CTA)
4. **Flat, not flashy** — หลีกเลี่ยง shadow หนา, gradient, glassmorphism;
   ใช้ hairline border และ whitespace แทนการแบ่งพื้นที่ด้วยเงา
5. **Consistency over novelty** — ใช้ component และ token ที่กำหนดไว้ในเอกสารนี้
   ก่อนออกแบบ pattern ใหม่เสมอ
6. **Accessible by default** — contrast, touch target, และ labeling
   ต้องผ่านเกณฑ์ WCAG AA ตั้งแต่ต้น ไม่ใช่แก้ทีหลัง

---

## 4. Design Tokens (Design Tokens / Design System)

Token ทั้งหมดในเอกสารนี้เขียนในรูปแบบ CSS custom property (`--token-name`)
เพื่อให้ map ไปใช้กับ Next.js/React (Tailwind config, CSS variables, หรือ
design token JSON) ได้ตรงไปตรงมา

### 4.1 Color Tokens (สีของระบบ)

#### 4.1.1 Neutral / Base Palette — "Paper & Clay"

โทนหลักอิง Muji: กระดาษ, ดิน, ไม้ ไม่ใช้ขาวสนิท (#FFFFFF) หรือดำสนิท
(#000000) เพื่อลดความ "แข็ง" แบบ digital

| Token | Hex | การใช้งาน |
|---|---|---|
| `--color-bg-base` | `#F7F3EC` | พื้นหลังหลักของแอป (สีกระดาษ/ครีม) |
| `--color-bg-subtle` | `#F0EAE0` | พื้นหลัง section รอง, striped table row |
| `--color-surface` | `#FFFDF9` | พื้นหลัง card / surface ที่ยกขึ้นมาจาก base |
| `--color-border-subtle` | `#E4DCCC` | เส้นแบ่งเบา ๆ, hairline border |
| `--color-border` | `#D3C6AE` | เส้นขอบ input / card ปกติ |
| `--color-ink-900` | `#2E2A22` | ข้อความหลัก (heading, body สำคัญ) |
| `--color-ink-700` | `#4A4338` | ข้อความ body ทั่วไป |
| `--color-ink-500` | `#756B5C` | ข้อความรอง (secondary/caption) |
| `--color-ink-300` | `#A79C8C` | ข้อความ disabled / placeholder |

#### 4.1.2 Brand / Earth Accent Palette

| Token | Hex | การใช้งาน |
|---|---|---|
| `--color-brand-terracotta` | `#B4674A` | Primary brand color — primary button, active tab, link |
| `--color-brand-terracotta-hover` | `#9A5539` | Hover/active state ของ primary |
| `--color-brand-terracotta-subtle` | `#EFDDD3` | พื้นหลังอ่อนของ badge/แถบไฮไลต์ terracotta |
| `--color-brand-moss` | `#6E7A55` | Secondary brand color — success, SP Point / reward accent |
| `--color-brand-moss-subtle` | `#E4E8D8` | พื้นหลัง badge ของ moss |
| `--color-brand-ochre` | `#C99A4B` | Highlight / promotion / warning accent |
| `--color-brand-ochre-subtle` | `#F3E7CC` | พื้นหลัง badge ของ ochre |
| `--color-brand-clayblue` | `#5C7A82` | Info accent (ใช้น้อยที่สุด เฉพาะ informational tag) |

#### 4.1.3 Semantic / Status Tokens

Map ตรงกับสถานะ transaction ใน
[`01-transaction-flow.md`](01-transaction-flow.md) §4 — **ห้ามใช้สีเพียง
อย่างเดียวในการสื่อสถานะ** ต้องมี label ข้อความ/ไอคอนควบคู่เสมอ (ดู §6.4)

| Token | Hex | Semantic | Transaction Status ที่เกี่ยวข้อง |
|---|---|---|---|
| `--color-success` | `#5C7A4A` | สำเร็จ | `COMPLETED` |
| `--color-success-subtle` | `#E1E8D6` | พื้นหลัง success badge | — |
| `--color-warning` | `#B8843C` | รอดำเนินการ/ต้องระวัง | `PENDING_APPROVAL`, `PROCESSING` |
| `--color-warning-subtle` | `#F1E3C6` | พื้นหลัง warning badge | — |
| `--color-danger` | `#9C4A34` | ผิดพลาด/ปฏิเสธ | `REJECTED`, `FAILED`, `CANCELLED` |
| `--color-danger-subtle` | `#EFDAD2` | พื้นหลัง danger badge | — |
| `--color-info` | `#5C7A82` | ข้อมูลทั่วไป | — |
| `--color-info-subtle` | `#DEE7E8` | พื้นหลัง info badge | — |

#### 4.1.4 Contrast & Accessibility Notes

- คู่สีข้อความ-พื้นหลังทั้งหมดถูกออกแบบให้ผ่านเกณฑ์ **WCAG AA (≥4.5:1
  สำหรับ body text, ≥3:1 สำหรับ large text/heading)** โดยประมาณ —
  **ต้องตรวจสอบซ้ำด้วยเครื่องมือ contrast checker จริง** (เช่น WebAIM
  Contrast Checker) ก่อนนำไป production
- ห้ามวางข้อความ `--color-ink-*` บนพื้นหลัง `*-subtle` ที่มี saturation
  สูง — ให้ใช้ `--color-brand-*`/`--color-*` (เข้ม) บนพื้นหลัง `*-subtle`
  (อ่อน) เท่านั้น เช่น ข้อความ `--color-success` บนพื้นหลัง
  `--color-success-subtle`
- Dark mode: **ไม่อยู่ใน scope ของ MVP** (แนว Muji ยึด light/warm-paper
  theme เป็นหลัก) หากต้องทำ dark mode ในอนาคต ให้เปิด task ออกแบบ token
  เพิ่มเติมแยก ไม่ควร invert สีอัตโนมัติ

---

### 4.2 Typography Tokens

#### 4.2.1 Font Family

รองรับสองภาษา (ไทย + อังกฤษ/ตัวเลข) ด้วย font pairing แนว humanist sans
เรียบ อ่านง่าย ไม่มี stroke ประดับ (สอดคล้องกับความเรียบแบบ Muji):

| Token | Font Stack | การใช้งาน |
|---|---|---|
| `--font-thai` | `"Noto Sans Thai", "IBM Plex Sans Thai", sans-serif` | ข้อความภาษาไทยทั้งหมด |
| `--font-latin` | `"Inter", "IBM Plex Sans", sans-serif` | ตัวอักษรละติน, ตัวเลข, SP amount |
| `--font-mono` | `"IBM Plex Mono", monospace` | Reference code, transaction ID, QR payload (debug/admin) |

> หมายเหตุ: เลือก Noto Sans Thai / Inter เพราะเป็น open-source, น้ำหนัก
> ครบ (Regular–Bold), รองรับ Thai vowel/tone mark ได้ดี และให้ความรู้สึก
> เรียบง่ายตรงกับแนว Muji

#### 4.2.2 Type Scale

| Token | Size / Line-height | Weight | การใช้งาน |
|---|---|---|---|
| `--text-display` | 32px / 40px | 600 | Hero/onboarding heading เท่านั้น |
| `--text-h1` | 24px / 32px | 600 | หัวข้อหลักของหน้าจอ |
| `--text-h2` | 20px / 28px | 600 | หัวข้อ section |
| `--text-h3` | 16px / 24px | 600 | หัวข้อ card / group label |
| `--text-body` | 15px / 24px | 400 | ข้อความ body ทั่วไป |
| `--text-body-strong` | 15px / 24px | 600 | ข้อความ body ที่เน้น (เช่น จำนวน SP) |
| `--text-caption` | 13px / 20px | 400 | ข้อความรอง, timestamp, helper text |
| `--text-micro` | 11px / 16px | 500 | Badge label, overline, uppercase tag |

กฎการใช้: ไม่สร้างขนาดตัวอักษรใหม่นอกตารางนี้ ถ้าจำเป็นต้องมีขนาดใหม่
ให้เพิ่ม token ใหม่ในเอกสารนี้ก่อน แล้วจึงใช้ในโค้ด

---

### 4.3 Spacing & Layout Tokens

Base unit = **4px** (สอดคล้องกับ grid แบบ minimalist ที่คำนวณง่าย)

| Token | Value | การใช้งานทั่วไป |
|---|---|---|
| `--space-1` | 4px | ระยะห่างระหว่าง icon กับ label |
| `--space-2` | 8px | ระยะห่างภายใน component ขนาดเล็ก |
| `--space-3` | 12px | Padding ภายใน input/button |
| `--space-4` | 16px | Padding มาตรฐานของ card, gutter หลัก |
| `--space-6` | 24px | ระยะห่างระหว่าง section ย่อย |
| `--space-8` | 32px | ระยะห่างระหว่าง section หลัก |
| `--space-12` | 48px | ระยะห่างระดับหน้าจอ (เช่น เหนือ CTA ล่างสุด) |
| `--space-16` | 64px | Margin บน/ล่างของหน้าจอ desktop |

**Layout grid (Web — Next.js):**

| Breakpoint | Token | Width | Columns | Gutter |
|---|---|---|---|---|
| Mobile | `--bp-sm` | < 640px | 4 | 16px |
| Tablet | `--bp-md` | 640–1024px | 8 | 24px |
| Desktop | `--bp-lg` | > 1024px | 12 | 32px |

**Touch target ขั้นต่ำ:** 44×44px ทุก interactive element บน mobile
(ตาม §6.3 Accessibility)

---

### 4.4 Radius, Border & Elevation Tokens

แนว Muji ใช้ **hairline border แทนเงา** เป็นหลัก เงาใช้เท่าที่จำเป็น
(เฉพาะ element ที่ลอยเหนือ content จริง เช่น modal, bottom sheet)

| Token | Value | การใช้งาน |
|---|---|---|
| `--radius-sm` | 6px | Input, tag/badge ขนาดเล็ก |
| `--radius-md` | 10px | Button, card มาตรฐาน |
| `--radius-lg` | 16px | Modal, bottom sheet, image thumbnail |
| `--radius-pill` | 999px | SP Point balance chip, filter pill |
| `--border-width-hairline` | 1px | เส้นแบ่งเบา (`--color-border-subtle`) |
| `--border-width-default` | 1px | เส้นขอบ input/card (`--color-border`) |
| `--shadow-none` | none | ค่าเริ่มต้นของ card ทั่วไป (ใช้ border แทน) |
| `--shadow-sm` | `0 1px 2px rgba(46,42,34,0.06)` | Card ที่ต้อง hover/interactive เล็กน้อย |
| `--shadow-modal` | `0 8px 24px rgba(46,42,34,0.16)` | Modal, bottom sheet, dropdown ลอย |

กฎ: ห้ามใช้ `--shadow-modal` กับ card ปกติในหน้า list — ให้เก็บความรู้สึก
"แบน" (flat) ของ Muji ไว้กับ content หลัก เงาสงวนไว้กับ overlay เท่านั้น

---

### 4.5 Iconography & Imagery Tokens

| Rule | รายละเอียด |
|---|---|
| Icon style | Line icon เส้นเดียว (stroke-based), stroke width 1.5px, ไม่ fill |
| Icon color | ใช้ `--color-ink-700` เป็นค่าเริ่มต้น, `--color-brand-*` เฉพาะ active/selected state |
| Icon size | 16 / 20 / 24px เท่านั้น (ตาม context: inline text / button / nav) |
| Illustration | ถ้าใช้ illustration (เช่น empty state) ให้ใช้จานสี earth tone 1–2 สีเท่านั้น (flat, ไม่มี gradient/3D) |
| Photography | โทนแสงธรรมชาติ, วัสดุจริง (ร้านค้า/สินค้าจริง) ห้ามใช้ stock photo ที่ดูมันวาว/ตกแต่งเกินจริง |
| Motion/Lottie | ใช้เท่าที่จำเป็น (เช่น scan success), duration สั้น, ไม่มี bounce/overshoot |

---

## 5. UI Components & Patterns (คอมโพเนนต์และแพทเทิร์น UI)

> Component ด้านล่างอ้างอิง token จาก §4 ทั้งหมด ห้าม hardcode สี/ระยะห่าง
> ใหม่ในระดับ component

### 5.1 Buttons

| Variant | ใช้เมื่อ | Background | Text | Border |
|---|---|---|---|---|
| Primary | 1 ปุ่มต่อหน้าจอ, action หลัก (เช่น "สแกน QR", "อนุมัติ") | `--color-brand-terracotta` | `--color-surface` | none |
| Secondary | Action รอง (เช่น "ยกเลิก") | `--color-surface` | `--color-ink-900` | `--border-width-default` `--color-border` |
| Tertiary/Text | Action ที่ไม่เด่น (เช่น "ดูรายละเอียด") | transparent | `--color-brand-terracotta` | none |
| Danger | Action ที่ทำลาย/ปฏิเสธ (เช่น "ปฏิเสธ transaction") | `--color-danger` | `--color-surface` | none |
| Disabled | ทุก variant เมื่อ disabled | `--color-bg-subtle` | `--color-ink-300` | none |

ขนาด: height 44px (mobile) / 40px (web desktop), radius `--radius-md`,
padding แนวนอน `--space-4`

### 5.2 Form Inputs

- Height 44px, radius `--radius-sm`, border `--color-border`, background
  `--color-surface`
- Focus state: border เปลี่ยนเป็น `--color-brand-terracotta` + outline 2px
  โทนอ่อน (`--color-brand-terracotta-subtle`) เพื่อ accessibility (ไม่ลบ
  outline ของ browser โดยไม่แทนที่)
- Error state: border `--color-danger` + helper text สีเดียวกันใต้ field
  พร้อมข้อความอธิบายวิธีแก้ (ไม่ใช่แค่ "ผิดพลาด")
- Label อยู่เหนือ field เสมอ (ไม่ใช้ placeholder แทน label)

### 5.3 Cards

| Card Type | ใช้ที่ | โครงสร้าง |
|---|---|---|
| Shop Card | Customer — Explore Shops | รูปร้าน + ชื่อ + ระยะทาง/หมวดหมู่ |
| Reward Card | Customer — View Rewards | ชื่อ reward + SP ที่ต้องใช้ + ปุ่มแลก |
| Transaction Card | Customer/Merchant — ประวัติ/รายการรออนุมัติ | Merchant/Customer name + จำนวนเงิน + status badge (§5.4) + timestamp |
| Stat Card | Merchant/Admin dashboard | Label + ตัวเลขใหญ่ (`--text-display` หรือ `--text-h1`) + trend indicator |

ทุก card: background `--color-surface`, border `--color-border-subtle`,
radius `--radius-md`, padding `--space-4`, `--shadow-none` เป็นค่าเริ่มต้น

### 5.4 Status Badge / Tag

Badge ต้องมี **ไอคอน + label ข้อความ** เสมอ ห้ามใช้สีอย่างเดียว

| Status | Token พื้นหลัง | Token ข้อความ | Label ตัวอย่าง |
|---|---|---|---|
| `PENDING_APPROVAL` / `PROCESSING` | `--color-warning-subtle` | `--color-warning` | "รอการอนุมัติ" |
| `COMPLETED` | `--color-success-subtle` | `--color-success` | "สำเร็จ" |
| `REJECTED` / `FAILED` / `CANCELLED` | `--color-danger-subtle` | `--color-danger` | "ถูกปฏิเสธ" / "ยกเลิก" |

รูปแบบ: radius `--radius-pill`, padding แนวนอน `--space-2`, font
`--text-micro` หรือ `--text-caption`

### 5.5 SP Point Balance Chip

Component เฉพาะสำหรับแสดง SP Point — ต้องเด่นกว่า badge สถานะทั่วไป
เนื่องจากเป็น core value ของแบรนด์:

- Background `--color-brand-moss-subtle`, ข้อความ `--color-brand-moss`,
  ตัวเลขใช้ `--font-latin` + `--text-body-strong`
- แสดงหน่วยเสมอ ("120 SP") ห้ามแสดงตัวเลขลอย ๆ โดยไม่มีหน่วย
- ถ้าต้องแสดงมูลค่าเทียบเงินบาท ให้ใช้กฎ §4 ของ `CLAUDE.md`
  (10 SP = 1 บาท) และแสดงเป็นข้อความรอง เช่น "120 SP (~12 บาท)"

### 5.6 Navigation

| App | Pattern | รายละเอียด |
|---|---|---|
| Customer (mobile-first) | Bottom tab bar, 4–5 items สูงสุด | Home / Explore / Scan (ปุ่มเด่นกลาง) / Rewards / Profile |
| Merchant | Top nav (web) + side nav แนวตั้งบน desktop | Dashboard / Transactions / Campaigns / Settings |
| Admin | Side nav แบบ collapsible | Users / Merchants / Rewards / Monitoring |

Nav ทุกแบบ: active state ใช้ `--color-brand-terracotta` (ข้อความ/ไอคอน),
background ของ nav ใช้ `--color-surface` + hairline border แยกจาก content

### 5.7 Modal, Toast, Empty & Error States

- **Modal / Bottom sheet:** ใช้ `--shadow-modal`, radius `--radius-lg`,
  มี action สูงสุด 2 ปุ่ม (primary + secondary/tertiary)
- **Toast/Snackbar:** แสดงสั้น ๆ (3–4 วินาที), 1 บรรทัด, ไม่บัง CTA หลัก,
  ใช้ semantic token ตามชนิดข้อความ (success/warning/danger/info)
- **Empty state:** illustration แบบ flat earth-tone (§4.5) + ข้อความอธิบาย
  สั้น + CTA ถ้ามี action ที่ทำได้ (เช่น "ยังไม่มี reward — ไปสำรวจร้านค้า")
- **Error state:** อธิบายสิ่งที่เกิดขึ้นด้วยภาษาที่ไม่กล่าวโทษผู้ใช้ +
  ทางแก้ที่ทำได้จริง (เช่น "QR นี้หมดอายุแล้ว — ขอ QR ใหม่จากร้านค้า")

### 5.8 Data Table (Admin/Merchant Web)

- Row height ≥ 48px, zebra stripe ใช้ `--color-bg-subtle` (ไม่ใช้สีเข้ม)
- Header row: `--text-caption` + uppercase, ข้อความ `--color-ink-500`
- Sticky header เมื่อ scroll, column สำหรับ status ใช้ badge จาก §5.4
  เสมอ (ไม่ใช้สีพื้นแถวทั้งแถวแทน status)

---

## 6. UX Guidelines & Rules (แนวทางและกฎด้าน UX)

### 6.1 Minimalism Rules

1. หน้าจอที่มี form ต้องไม่เกิน 7±2 field ต่อหน้า ถ้าเกินให้แบ่งเป็นหลายขั้นตอน
   (multi-step) พร้อม progress indicator
2. ห้ามใช้ modal/pop-up โปรโมชันที่ผู้ใช้ไม่ได้ขอ (unsolicited promo popup)
   บนหน้าแรกที่เปิดแอป — ขัดกับ brand attribute "Calm"
3. Whitespace ต้องเพียงพอให้ content หลักของหน้าจอ "หายใจได้" — ค่าเริ่มต้น
   margin รอบหน้าจอ mobile ≥ `--space-4`, desktop ≥ `--space-8`
4. จำกัดจำนวนสี accent ที่ปรากฏพร้อมกันในหน้าจอเดียว ≤ 2 สี (ไม่รวม
   neutral/semantic status)

### 6.2 Content & Localization

- ภาษาไทยเป็นภาษาหลักของทุก UI ที่ผู้ใช้เห็น (customer/merchant-facing)
  ส่วนภาษาอังกฤษใช้เสริมเฉพาะคำศัพท์เทคนิคที่ไม่มีคำแปลที่เข้าใจง่ายกว่า
  (เช่น "SP Point", "QR Code")
- ตัวเลขเงินแสดงหน่วย "บาท" เสมอ, ตัวเลข SP แสดงหน่วย "SP" เสมอ (ตาม §5.5)
- ห้ามใช้ dark pattern: ไม่มี hidden fee, ไม่มีปุ่ม "ปฏิเสธ" ที่จงใจทำให้
  หายากกว่าปุ่ม "ยอมรับ" (สำคัญมากสำหรับ PDPA consent — ดู §6.5)

### 6.3 Accessibility

- Contrast ratio ≥ 4.5:1 สำหรับข้อความ body, ≥ 3:1 สำหรับ heading ขนาดใหญ่
  (ตรวจสอบด้วยเครื่องมือจริงตาม §4.1.4)
- Touch target ขั้นต่ำ 44×44px บน mobile ทุก interactive element
- ห้ามสื่อความหมาย status ด้วยสีเพียงอย่างเดียว (ต้องมี label/icon ควบคู่
  ตาม §5.4) — สำคัญสำหรับผู้ใช้ที่มีภาวะตาบอดสี
- รองรับ font scaling ของระบบ (dynamic type / OS text size) โดยไม่ทำให้
  layout พัง
- ทุก interactive element ต้องมี accessible label (สำหรับ screen reader)
  โดยเฉพาะปุ่มไอคอนที่ไม่มีข้อความ (เช่นปุ่ม scan QR)

### 6.4 Status Communication Rule

ทุกจุดที่แสดงสถานะ (transaction, campaign, approval) ต้องปฏิบัติตาม
mapping ใน §5.4 อย่างเคร่งครัด เพื่อ traceability กับ
[`01-transaction-flow.md`](01-transaction-flow.md) — ห้ามสร้างสถานะ/สีใหม่
ในระดับ UI ที่ไม่มีอยู่ใน backend state machine

### 6.5 PDPA Consent Pattern

สอดคล้องกับ `CLAUDE.md` §9 และ user journey
[`04-user-journey.md`](04-user-journey.md) §2:

- Consent screen ต้องมีปุ่ม "ยินยอม" และ "ไม่ยินยอม" ที่มีน้ำหนักภาพ
  (visual weight) เท่ากัน — ห้ามทำปุ่มยินยอมเป็น primary ที่เด่นกว่าปุ่ม
  ปฏิเสธอย่างชัดเจนจนดูเหมือนบีบให้กด
- ต้องระบุชัดว่าเก็บข้อมูลอะไร ใช้ทำอะไร ก่อนขอความยินยอม (ไม่ฝังไว้ใน
  ลิงก์นโยบายอย่างเดียว)
- ถ้าผู้ใช้ไม่ยินยอม ระบบต้องแจ้งผลกระทบอย่างตรงไปตรงมา (เช่น
  "ฟีเจอร์ที่ต้องเก็บข้อมูลจะถูกปิดใช้งาน") โดยไม่บล็อกการใช้แอปทั้งหมด
  ถ้าฟีเจอร์นั้นไม่จำเป็นต้องใช้ข้อมูลนั้นจริง

### 6.6 Motion Guidelines

- Duration มาตรฐาน 150–250ms, easing `ease-out` สำหรับเข้า, `ease-in`
  สำหรับออก — ไม่ใช้ spring/bounce ที่ overshoot (ขัดกับความ "สงบ" ของแบรนด์)
- ใช้ motion เพื่อสื่อความหมาย (เช่น scan สำเร็จ, SP เพิ่มขึ้น) ไม่ใช่เพื่อ
  ความสวยงามเพียงอย่างเดียว
- Loading state: ใช้ skeleton screen โทน `--color-bg-subtle` แทน spinner
  เมื่อโครงหน้าจอคาดเดาได้ล่วงหน้า (list, card) — ให้ความรู้สึก "เรียบ"
  มากกว่า spinner หมุน

### 6.7 Responsive Rules

- Merchant/Admin เป็น web-first — ต้อง design ที่ desktop (`--bp-lg`) ก่อน
  แล้วไล่ลงมา แต่ยังต้องใช้งานได้บน tablet ตาม product scope
- Customer เป็น mobile-first — ต้อง design ที่ `--bp-sm` ก่อนเสมอ
- Layout ต้องไม่ horizontal scroll โดยไม่ตั้งใจในทุก breakpoint

### 6.8 Do / Don't Summary

| Do | Don't |
|---|---|
| ใช้ token จาก §4 เท่านั้น | Hardcode สี/ระยะห่างใหม่ใน component |
| แสดง badge สถานะพร้อม label+icon | ใช้สีพื้นหลังแถว/ปุ่มสื่อสถานะเพียงอย่างเดียว |
| ใช้ border/whitespace แบ่ง section | ใช้เงาหนักหรือ gradient แบ่ง section |
| จำกัด 1 primary CTA ต่อหน้าจอ | ใส่ primary button มากกว่า 1 ปุ่มในหน้าเดียว |
| อธิบายผลกระทบก่อนขอ PDPA consent | ซ่อนรายละเอียดการเก็บข้อมูลไว้ใน fine print |
| ใช้ motion สั้นและมีจุดหมาย | ใช้ animation bounce/flashy โดยไม่มีเหตุผล |

---

## 7. Governance & Next Steps (การกำกับดูแลและขั้นตอนต่อไป)

- Design token ในเอกสารนี้ถือเป็น **single source of truth** — การเปลี่ยน
  สี/ตัวอักษร/spacing ระดับ token ต้องแก้ที่เอกสารนี้ก่อน แล้วจึงไป sync
  กับ implementation (เช่น Tailwind config, CSS variables)
- แนะนำให้สร้างไฟล์ token แบบ machine-readable (เช่น
  `design-tokens.json` หรือ Tailwind theme extension) จาก §4 ในขั้นตอน
  `03-development` เพื่อไม่ให้ dev พิมพ์ hex code ซ้ำในหลายที่
- ก่อนนำไป production ต้อง:
  1. ตรวจสอบ contrast ratio จริงของทุกคู่สีใน §4.1 ด้วยเครื่องมือ
  2. ทดสอบ typography กับข้อความไทยจริง (สระบน/ล่าง, วรรณยุกต์) บนอุปกรณ์จริง
  3. Review component ใน §5 กับทีม product/QA เทียบกับ
     [`04-user-journey.md`](04-user-journey.md) ทุก flow หลัก
- เอกสารนี้ควรถูกอัปเดตเมื่อมี feature ใหม่ที่ต้องการ component/pattern ที่
  ไม่มีอยู่ใน §5 — ห้ามสร้าง pattern ใหม่ในโค้ดโดยไม่บันทึกกลับมาที่นี่

---

# Document Status (สถานะเอกสาร)

Version: 1.0

Status:
Draft for Design Review
