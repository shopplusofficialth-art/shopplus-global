# Business Requirement Document

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Business Requirement Document (BRD)
**Phase:** 01-requirements
**Version:** 1.1
**Status:** Revised Draft after Requirement Review
**Date:** 2026-08-04
**Prepared by:** Requirement Analyst Agent (AI Native Development Workflow)

---

## Revision History

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | Initial business requirement draft. |
| 1.1 | Revised Draft after Requirement Review | Added the approved Marketing Fee Distribution Model (30 SP split 10/10/10), the Merchant Approval Workflow and transaction status lifecycle, and the Transaction Audit requirement. Updated affected functional requirements and acceptance criteria. |

---

## 1. Project Background

ShopPlus Global is a Community Commerce Platform designed to connect
offline local stores, online businesses, and customers through digital
membership, reward points, and AI-powered marketing solutions.

The platform starts from offline community stores and is intended to
expand toward online commerce, delivery, logistics, and marketplace
services as the ecosystem matures.

The project follows an AI Native Development Workflow using Agile
methodology, GitHub version control, the Claude Code AI Agent, and
structured documentation across five phases: Requirements, Design,
Development, Testing, and Release.

This document is the first artifact in the `01-requirements` phase and
establishes the shared understanding of the business problem, users,
and requirements before any design or development work begins.

---

## 2. Business Problem

Local community businesses — independent shops, small retailers, and
neighborhood service providers — struggle to compete with large chains
and online marketplaces because they lack:

- A digital way to build and retain a loyal customer base
- Tools to run structured, trackable marketing campaigns
- Visibility into customer behavior and purchase patterns
- A shared, cross-merchant reward system that gives customers a
  reason to keep returning to community stores rather than switching
  to larger competitors

Customers, meanwhile, have no unified way to discover local stores,
earn consistent rewards across multiple merchants, or track and redeem
value for everyday purchases at small businesses. Reward programs, when
they exist, are typically fragmented per-merchant, paper-based, or
manual, which limits their value and makes them easy to abandon.

**Expected outcome:** A shared digital membership and reward ecosystem
(SP Point) that gives merchants marketing and customer-insight tools,
gives customers a consistent way to discover shops and earn/redeem
rewards, and gives the platform a sustainable revenue model through
marketing fees — while keeping the experience simple enough for
offline-first, non-technical community merchants to adopt.

---

## 3. Vision and Objectives

### Vision

"Helping local community businesses compete in the digital economy by
connecting merchants and customers through a shared reward ecosystem."

### Objectives

1. Enable customers to discover, engage with, and earn rewards from
   local community stores through a single digital membership.
2. Give merchants low-friction digital tools for customer acquisition,
   campaign management, and behavior insights without requiring deep
   technical expertise.
3. Establish a sustainable SP Point reward ecosystem funded by a
   marketing fee of 30 SP (3 THB) per merchant-approved transaction,
   distributed across the customer reward, a shared marketing fund,
   and the platform.
4. Provide the platform administrators with the tools to manage users,
   merchants, rewards, and system health at scale.
5. Build the platform cloud-first (Firebase / Firestore / Cloud
   Functions) so it can scale from offline community stores toward
   online commerce, delivery, and marketplace services over time.
6. Ensure all designs comply with PDPA and follow secure, minimal-data
   practices from day one.

---

## 4. Target Users

| User Type | Description | Primary Goals |
|---|---|---|
| **Customer** | Individuals who shop at participating local/community stores | Discover shops, earn SP Points, redeem rewards, access promotions |
| **Merchant** | Local/community store owners or staff who join the platform | Acquire and retain customers, run campaigns, track marketing fees and transactions |
| **Admin** | Platform operations team managing the ShopPlus Global ecosystem | Manage users and merchants, oversee reward economy, monitor system health |

### User Goals, Behavior, and Expectations

- **Customer:** Wants a fast, low-friction way (e.g., QR scan) to earn
  and check rewards at the point of purchase. Expects rewards to feel
  fair and transparent (clear SP-to-Baht conversion) and expects to
  discover new shops nearby easily.
- **Merchant:** Wants customer acquisition and retention tools without
  needing technical or marketing expertise. Expects clear visibility
  into marketing fees charged and the value received in return
  (customer insights, repeat visits), and expects to retain control
  over each transaction by reviewing and approving it before any fee
  is deducted.
- **Admin:** Needs oversight and control over the reward economy to
  prevent abuse (e.g., point fraud), and needs system monitoring to
  ensure platform reliability as merchant/customer counts grow.

---

## 5. Business Requirements

Expressed as user stories per the Agile Requirement Analysis process.

### Customer

- As a **customer**, I want to register and log in easily, so that I
  can start using ShopPlus Global with minimal friction.
- As a **customer**, I want to scan a QR code at a participating store,
  so that I can earn SP Points automatically for my purchase.
- As a **customer**, I want to view my SP Point balance and history, so
  that I can track the rewards I have earned.
- As a **customer**, I want to redeem SP Points for rewards, so that I
  receive tangible value from being a loyal customer.
- As a **customer**, I want to explore nearby participating shops, so
  that I can discover new local businesses to support.

### Merchant

- As a **merchant**, I want to manage my shop profile and details, so
  that customers can find accurate information about my store.
- As a **merchant**, I want to create customer campaigns/promotions, so
  that I can attract and retain customers.
- As a **merchant**, I want to review and approve or reject each
  pending transaction, so that I control when the marketing fee is
  deducted and the reward is issued.
- As a **merchant**, I want to track marketing fees per transaction, so
  that I understand the cost of participating in the reward ecosystem.
- As a **merchant**, I want to view transaction history, so that I can
  reconcile sales and rewards issued.
- As a **merchant**, I want basic customer behavior insights, so that I
  can make informed marketing decisions.

### Admin

- As an **admin**, I want to manage customer and merchant accounts, so
  that I can maintain a trustworthy platform.
- As an **admin**, I want to manage and configure reward rules, so that
  the SP Point ecosystem stays consistent and fair.
- As an **admin**, I want to monitor system health and activity, so
  that I can detect and resolve issues before they impact users.
- As an **admin**, I want to view the audit log for every SP
  transaction distribution, so that I can verify accuracy and
  investigate disputes.

---

## 6. Functional Scope

### 6.1 Customer Application

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | Customer can register and log in | P0 |
| FR-002 | Customer can scan a QR code to earn SP Points at checkout | P0 |
| FR-003 | Customer can view current SP Point balance and transaction/reward history, including each transaction's status (Pending Approval, Approved, Completed, Rejected, Cancelled) | P0 |
| FR-004 | Customer can browse and redeem available rewards using SP Points | P1 |
| FR-005 | Customer can explore/search participating shops | P1 |
| FR-006 | Customer can view and access active promotions | P2 |

### 6.2 Merchant Application

| ID | Requirement | Priority |
|---|---|---|
| FR-007 | Merchant can manage shop profile and store information | P0 |
| FR-008 | Merchant can create and manage customer campaigns | P1 |
| FR-009 | Merchant can view marketing fee tracking per transaction | P0 |
| FR-010 | Merchant can view and manage transaction records | P0 |
| FR-011 | Merchant can view basic customer behavior insights/reports | P2 |
| FR-019 | Merchant can review and approve or reject a transaction while it is in `PENDING_APPROVAL` status, before any marketing fee is deducted or reward is issued | P0 |

### 6.3 Admin System

| ID | Requirement | Priority |
|---|---|---|
| FR-012 | Admin can manage (create/update/suspend) customer user accounts | P0 |
| FR-013 | Admin can manage (onboard/update/suspend) merchant accounts | P0 |
| FR-014 | Admin can configure and manage SP Point reward rules | P0 |
| FR-015 | Admin can monitor system usage, health, and transaction activity | P1 |
| FR-020 | Admin can view SP transaction audit logs and the distribution breakdown (Customer Reward / Marketing Fund / Platform) for reconciliation and dispute investigation | P0 |

### 6.4 Core Reward Logic (Cross-cutting)

| ID | Requirement | Priority |
|---|---|---|
| FR-016 | System must distribute a fixed Marketing Fee of 30 SP (10 SP = 1 Baht conversion) per merchant-approved transaction, split as: 10 SP Customer Reward, 10 SP Marketing Fund, 10 SP ShopPlus Global Platform | P0 |
| FR-017 | System must deduct and distribute the Marketing Fee only after the merchant approves the transaction; no SP distribution occurs while a transaction is `PENDING_APPROVAL`, `REJECTED`, or `CANCELLED` | P0 |
| FR-018 | All reward calculations and distributions must be performed server-side (Cloud Functions), never trusted from the client | P0 |
| FR-021 | System must manage every transaction through a defined status lifecycle (`PENDING_APPROVAL` → `APPROVED` → `COMPLETED`, or `PENDING_APPROVAL` → `REJECTED` / `CANCELLED`) and must enforce valid transitions only | P0 |
| FR-022 | System must write an immutable audit log entry for every SP distribution event, recording transaction ID, status transition, the SP amount sent to each of the three distribution targets, and a timestamp | P0 |

### 6.5 Transaction Status Workflow

Every transaction created from a customer QR scan moves through the
following statuses. SP distribution (FR-016) and its audit log entry
(FR-022) occur only on the `PENDING_APPROVAL` → `APPROVED` transition.

| Status | Meaning |
|---|---|
| `PENDING_APPROVAL` | Created when the customer scans the merchant's QR code. Awaiting merchant review. No SP distributed. |
| `APPROVED` | Merchant has approved the transaction. Triggers the 30 SP distribution (10/10/10 split) and the associated audit log entry. |
| `COMPLETED` | SP distribution has been successfully processed and recorded. Terminal success state. |
| `REJECTED` | Merchant declined the transaction. No SP distributed. Terminal state. |
| `CANCELLED` | Transaction cancelled before merchant action completes (e.g., customer- or system-initiated, or an approval timeout). No SP distributed. Terminal state. |

Valid transitions:

- `PENDING_APPROVAL` → `APPROVED` → `COMPLETED`
- `PENDING_APPROVAL` → `REJECTED`
- `PENDING_APPROVAL` → `CANCELLED`

### 6.6 Transaction Audit Requirement

Every SP distribution (Customer Reward, Marketing Fund, and Platform
share) must generate an immutable audit log entry capturing, at
minimum: transaction ID, merchant ID, customer ID, status transition,
the SP amount allocated to each of the three distribution targets, and
a timestamp. Audit logs must be retained per the PDPA data retention
policy (see Open Questions) and must be viewable by Admins for
reconciliation and dispute investigation (FR-020, FR-022).

### Acceptance Criteria (representative examples)

- **Given** a customer scans a participating merchant's QR code,
  **when** the scan is recorded, **then** the transaction is created
  with status `PENDING_APPROVAL` and no SP is distributed.
- **Given** a transaction is `PENDING_APPROVAL`, **when** the merchant
  approves it, **then** the transaction moves to `APPROVED`, the
  system distributes 30 SP as 10 SP to the customer, 10 SP to the
  Marketing Fund, and 10 SP to the ShopPlus Global Platform, and the
  transaction then moves to `COMPLETED`.
- **Given** a transaction is `PENDING_APPROVAL`, **when** the merchant
  rejects it, **then** the transaction moves to `REJECTED` and no SP
  is distributed.
- **Given** any SP distribution is processed, **when** the
  distribution completes, **then** an immutable audit log entry is
  created recording the transaction ID, status transition, the
  distribution breakdown, and a timestamp.
- **Given** a customer attempts to redeem a reward, **when** their SP
  Point balance is insufficient, **then** the system prevents
  redemption and displays a clear message.

### Out of Scope for this Initial Phase

- Delivery and logistics management
- Full online marketplace / e-commerce checkout
- Third-party payment gateway integration
- Multi-language/localization support beyond Thai/English baseline

These items align with the platform's longer-term expansion direction
but are not part of the initial business requirement scope.

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Security** | Secure authentication and authorization for all user roles; no client-side trust for reward or fee calculations; sensitive operations validated server-side (Cloud Functions) |
| **Privacy / PDPA** | Compliance with Thailand's Personal Data Protection Act (PDPA); explicit user consent for data collection; data minimization; no exposure of personal information, sensitive user data, or internal credentials |
| **Performance** | QR scan and reward crediting should complete within a few seconds to support smooth point-of-sale interactions |
| **Scalability** | Cloud-first architecture (Firebase / Firestore / Cloud Functions) to scale from offline community stores toward broader online commerce use cases |
| **Availability** | Core reward-earning and redemption flows should remain available during merchant business hours; system monitoring in place to detect outages |
| **Maintainability** | Clean separation of concerns — client handles UI/interaction only; backend owns business logic, security validation, and reward calculation |
| **Usability** | Simple, low-friction UX suitable for non-technical community merchants and a broad customer demographic |
| **Auditability** | Transaction and reward records must be traceable for merchant fee reconciliation and admin oversight; every SP distribution (Customer Reward, Marketing Fund, Platform share) must generate an immutable audit log entry linked to the transaction ID (see §6.6) |

---

## 8. Risks and Constraints

### Risks

| Risk | Impact | Notes |
|---|---|---|
| Merchant adoption resistance due to unfamiliarity with digital tools | High | Offline-first, community merchants may need onboarding support and a simple UX |
| Reward/point abuse or fraud (e.g., fake QR scans, duplicate redemption) | High | Requires server-side validation and admin monitoring tools (FR-018, FR-015) |
| PDPA non-compliance in data handling | High | Legal/regulatory exposure; must be addressed at design stage, not retrofitted |
| Low initial customer density limiting network effects | Medium | Reward ecosystem value depends on both merchant and customer participation reaching critical mass |
| Marketing fee model (3 Baht minimum) may be a barrier for very low-value transactions | Medium | Needs validation with pilot merchants before full rollout |
| Merchant delay or non-response when approving `PENDING_APPROVAL` transactions | Medium | Delays reward crediting and fee/fund distribution; requires a defined approval SLA/timeout policy (see Open Questions) |

### Constraints

- SP Point conversion rule (10 SP = 1 Baht) and the marketing fee
  (3 Baht / 30 SP per approved transaction) are fixed business rules
  from CLAUDE.md and must be respected in all reward calculations.
- The 30 SP marketing fee is split 10/10/10 across the Customer
  Reward, the Marketing Fund, and the ShopPlus Global Platform, and is
  distributed only after merchant approval (`PENDING_APPROVAL` →
  `APPROVED`); no distribution occurs on `REJECTED` or `CANCELLED`
  transactions.
- Technical direction is constrained to Firebase, Firestore, and Cloud
  Functions for the backend, and Web + Mobile for frontend targets.
- All business logic, security validation, and reward calculation must
  reside on the backend; the client is UI/interaction only.
- Development must follow the Agile phase structure
  (01-requirements → 02-design → 03-development → 04-testing →
  05-release) with documentation before implementation.

---

## Open Questions

The following require stakeholder clarification before design begins:

1. What is the expected initial pilot scope — number of merchants,
   geographic region, and timeline?
2. Are reward redemption options (e.g., discounts, free items, cash
   equivalent) merchant-specific or platform-wide?
3. Is there a defined process for merchant onboarding/verification
   (e.g., business registration checks)?
4. What specific PDPA consent flows and data retention periods are
   required by legal/compliance stakeholders?
5. Will SP Points expire, and if so, under what policy?
6. What is the SLA/timeout for merchant approval of a
   `PENDING_APPROVAL` transaction before it is automatically moved to
   `CANCELLED`?
7. Does the customer receive visibility or notification while a
   transaction is awaiting merchant approval (`PENDING_APPROVAL`)?

---

*This document should be reviewed with business stakeholders and
updated before proceeding to `02-design`.*
