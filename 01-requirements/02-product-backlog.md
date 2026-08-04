# MVP Product Backlog

**Project:** ShopPlus Global — Community Commerce Platform
**Document Type:** Product Backlog
**Phase:** 01-requirements
**Version:** 1.1
**Status:** Revised after Product Backlog Review
**Date:** 2026-08-04
**Prepared by:** Product Owner Agent (AI Native Development Workflow)
**Source:** `01-requirements/01-business-requirement.md` (v1.1, Revised Draft after Requirement Review)

---

## Revision History

| Version | Status | Change Summary |
|---|---|---|
| 1.0 | Draft — pending stakeholder review | Initial MVP backlog derived from BRD v1.1. |
| 1.1 | Revised after Product Backlog Review | Added missing QR Code Generation story (US-023), Redemption Fulfillment story (US-024), and Admin manual-cancel safety control (US-025). Split Sprint 2/3 into transaction foundation vs. reward distribution. Added a "Backlog Priority Deviation from BRD" note, a Performance NFR clarification, a Sprint capacity assumption, and narrowed US-016 to view-only for MVP. |

---

## 1. Purpose

This backlog translates the approved Business Requirement Document
(BRD v1.1) into an Agile product backlog scoped to the **MVP only**.
It prioritizes the core value loop — customer QR transaction, merchant
approval, SP Point distribution, the Marketing Fee model, admin
oversight, and PDPA compliance — over secondary features (campaigns,
behavior insights, shop discovery) that add value but are not required
to prove the core reward ecosystem.

Each backlog item traces back to a BRD Functional Requirement (FR-xxx)
or Open Question where applicable, so gaps and blockers remain visible
rather than silently resolved.

---

## 2. Backlog Conventions

| Field | Meaning |
|---|---|
| **Priority** | P0 = MVP-blocking (core loop or compliance), P1 = required before launch, P2 = valuable but deferrable past MVP, P3 = post-MVP backlog |
| **Sprint Recommendation** | Suggested sprint assuming ~2-week sprints and a 4-sprint MVP; sequencing reflects dependencies (auth → transaction creation → approval → distribution → audit/reporting) |
| **Story ID** | `US-0xx`, referenced in the sprint plan and traceable to BRD `FR-0xx` |

### Definition of Ready
A story is ready when its acceptance criteria are unambiguous, its
BRD source FR is identified, and any blocking Open Question is either
resolved or explicitly flagged as a sprint risk.

### Definition of Done
Server-side logic implemented per BRD §6 (client is UI-only), unit/
integration tests passing, audit logging verified where applicable
(EPIC-08), and PDPA data-handling checks passed (EPIC-09).

### Sprint Planning Assumptions
This backlog's sprint recommendations assume: a **2-week sprint
duration**, a **small Agile team** (roughly full-stack coverage across
one client surface and Cloud Functions per sprint, not three parallel
surfaces), and that the plan is a **starting sequence, not a
commitment** — it must be re-validated against actual velocity after
Sprint 1 and adjusted for Sprint 2 onward.

---

## 3. Epics Overview

| Epic ID | Epic Name | Goal | BRD Reference |
|---|---|---|---|
| EPIC-01 | Customer Registration & Authentication | Let customers create an account and log in securely | §5 Customer, FR-001 |
| EPIC-02 | Customer QR Transaction Flow | Let a merchant generate a valid QR code and a customer create a transaction by scanning it, then track its status | §6.1, §6.5, FR-002, FR-003; QR generation is a new capability identified in Product Backlog Review — recommend adding to BRD in a future revision |
| EPIC-03 | Merchant Approval Workflow | Let a merchant review, approve, or reject pending transactions | §6.2, §6.5, FR-019, FR-021 |
| EPIC-04 | SP Point Distribution & Marketing Fee Model | Distribute 30 SP (10/10/10) server-side, only after approval | §6.4, FR-016, FR-017, FR-018 |
| EPIC-05 | Reward Redemption | Let customers redeem SP Points for rewards and merchants verify/fulfill the redemption | §6.1, FR-004; fulfillment is a new capability identified in Product Backlog Review — recommend adding to BRD in a future revision |
| EPIC-06 | Merchant Shop & Transaction Management | Let merchants manage their profile and reconcile fees/transactions | §6.2, FR-007, FR-009, FR-010 |
| EPIC-07 | Admin Management & Oversight | Let admins manage accounts, view reward rules, monitor system health, and manually cancel stuck transactions | §6.3, FR-012–FR-015; manual-cancel is a new capability identified in Product Backlog Review — recommend adding to BRD in a future revision |
| EPIC-08 | Transaction Audit & Traceability | Immutable audit log for every SP distribution event | §6.6, FR-020, FR-022 |
| EPIC-09 | PDPA Compliance & Data Security | Consent, data minimization, secure access, retention | §7, §9 (CLAUDE.md), Open Question 4 |

Deferred secondary epics (campaigns, behavior insights, shop
discovery/promotions — FR-005, FR-006, FR-008, FR-011) are listed at
the end of §4.6 as P2/P3 backlog, not part of the core MVP loop.

---

## Backlog Priority Deviation from BRD

This backlog intentionally deprioritizes three BRD requirements below
their BRD-assigned priority, for MVP scoping reasons. This is flagged
explicitly here rather than left as a silent mismatch, and should be
confirmed with stakeholders before Sprint 1 sign-off:

| BRD FR | BRD Priority | Backlog Priority | Reason |
|---|---|---|---|
| FR-005 (shop discovery/search) | P1 | P2, deferred to Post-MVP backlog | Not required to prove the core QR → approval → SP distribution loop; discovery adds acquisition value once merchants/customers are already on the platform |
| FR-008 (merchant campaigns) | P1 | P2, deferred to Post-MVP backlog | Campaign tooling is a retention/marketing feature layered on top of a working reward ecosystem; MVP validates the ecosystem itself first |
| FR-011 (customer behavior insights) | P2 | P3, deferred to Post-MVP backlog | Insights need a meaningful volume of completed transactions to be useful; premature before the core loop has real usage data |

**Rationale:** MVP scope is intentionally narrowed to the smallest set
of features that proves the reward ecosystem works end to end
(transaction creation, merchant approval, SP distribution, audit,
admin oversight, PDPA compliance). Features that add acquisition or
analytics value on top of a working ecosystem are sequenced after it,
not instead of it. If stakeholders need any of FR-005/008/011 in the
initial launch (e.g., for pilot merchant acquisition), that should be
raised now so the sprint plan can be re-scoped accordingly.

---

## 4. Product Backlog Items

### 4.1 EPIC-01: Customer Registration & Authentication

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-001 | Customer registration and login | P0 | Sprint 1 |

**US-001 (FR-001)** — As a **customer**, I want to register and log in
easily, so that I can start using ShopPlus Global with minimal
friction.

- **Given** a new user opens the app, **when** they complete
  registration with valid required fields and PDPA consent, **then**
  an account is created and they are logged in.
- **Given** an existing user, **when** they enter valid credentials,
  **then** they are authenticated and directed to their dashboard.
- **Given** a user submits invalid credentials, **when** they attempt
  login, **then** access is rejected with a generic error that does
  not reveal which field was incorrect.

---

### 4.2 EPIC-02: Customer QR Transaction Flow

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-023 | Merchant generates and manages transaction QR codes | P0 | Sprint 2 |
| US-002 | Scan QR to create a pending transaction | P0 | Sprint 2 |
| US-003 | View SP balance and transaction status history | P0 | Sprint 4 |

**US-023 (New — recommend adding to BRD as a future FR)** — As a
**merchant**, I want to generate and manage transaction QR codes, so
that customers have a valid, secure code to scan and the system can
reliably tell genuine scans from fraudulent or reused ones.

- **Given** a merchant starts a new transaction, **when** they
  request a QR code, **then** the system generates a QR code encoding
  a unique transaction identifier tied to that merchant.
- **Given** a QR code has been generated, **when** it is issued,
  **then** it is single-use and time-limited (expires after a defined
  window if unscanned), per the fraud risk noted in BRD §8 Risks.
- **Given** a QR code has already been successfully scanned once,
  **when** a second scan of the same code is attempted, **then** the
  system rejects it and does not create a second transaction.
- **Given** a QR code has expired, **when** a customer attempts to
  scan it, **then** the system rejects the scan with a clear
  "expired, please request a new code" message.
- **Given** a merchant wants to see their open codes, **when** they
  open QR management, **then** they can view and manually invalidate
  any outstanding unscanned QR code.

**US-002 (FR-002)** — As a **customer**, I want to scan a merchant's
QR code at checkout, so that a transaction is created and I can earn
SP Points once it is approved.

- **Given** a customer scans a valid merchant QR code, **when** the
  scan is processed, **then** a transaction is created with status
  `PENDING_APPROVAL` and zero SP distributed.
- **Given** a customer scans an invalid, expired, or already-used QR
  code, **when** the scan is processed, **then** the system rejects
  it and shows a clear error.
- **Given** the scan succeeds, **when** the transaction is created,
  **then** the customer sees confirmation that it is awaiting
  merchant approval.

**US-003 (FR-003)** — As a **customer**, I want to view my SP Point
balance and transaction history including status, so that I can track
what I've earned and what's still pending.

- **Given** a customer has one or more transactions, **when** they
  open their history, **then** each shows its current status
  (Pending Approval, Approved, Completed, Rejected, Cancelled).
- **Given** a transaction reaches `COMPLETED`, **when** the customer
  views their balance, **then** the credited 10 SP customer reward is
  reflected within a few seconds.

---

### 4.3 EPIC-03: Merchant Approval Workflow

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-004 | Merchant approves/rejects a pending transaction | P0 | Sprint 2 |
| US-005 | System enforces valid transaction status transitions | P0 | Sprint 2 |

**US-004 (FR-019)** — As a **merchant**, I want to review and approve
or reject a pending transaction, so that I control when the marketing
fee is deducted and the reward is issued.

- **Given** a transaction is `PENDING_APPROVAL`, **when** the merchant
  opens their pending queue, **then** transaction details (amount,
  customer reference, timestamp) are visible.
- **Given** a merchant approves a `PENDING_APPROVAL` transaction,
  **when** the approval is submitted, **then** it transitions to
  `APPROVED` and SP distribution (EPIC-04) is triggered.
- **Given** a merchant rejects a `PENDING_APPROVAL` transaction,
  **when** the rejection is submitted, **then** it transitions to
  `REJECTED` and no SP is distributed.
- **Given** a transaction is not `PENDING_APPROVAL`, **when** a
  merchant attempts to approve or reject it, **then** the system
  blocks the action.

**US-005 (FR-021)** — As the **platform**, I want every transaction to
move through a defined status lifecycle, so that SP is never
distributed outside of an approved transaction.

- **Given** a transaction, **when** any status change is attempted,
  **then** only defined transitions are allowed: `PENDING_APPROVAL` →
  `APPROVED` → `COMPLETED`, `PENDING_APPROVAL` → `REJECTED`, or
  `PENDING_APPROVAL` → `CANCELLED`.
- **Given** an invalid transition is attempted, **when** the system
  evaluates it, **then** it is rejected and no state change occurs.

---

### 4.4 EPIC-04: SP Point Distribution & Marketing Fee Model

> **Performance Requirement Note:** BRD §7 states reward crediting
> should complete "within a few seconds" of the QR scan. Under the
> v1.1 approval-gated model this no longer applies at scan time — SP
> is not distributed until the merchant approves the transaction, which
> may happen minutes or hours later. **The "few seconds" performance
> target starts from the moment of merchant approval, not from QR scan
> time.** This should be reflected in BRD NFRs in a future revision;
> until then, treat this note as the authoritative clarification for
> implementation and testing.

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-006 | Distribute 30 SP (10/10/10) on approval | P0 | Sprint 3 |
| US-007 | Server-side-only, approval-gated calculation | P0 | Sprint 3 |

**US-006 (FR-016)** — As the **platform**, I want to distribute 30 SP
per approved transaction, split 10 SP Customer Reward / 10 SP
Marketing Fund / 10 SP ShopPlus Global Platform, so that the reward
ecosystem is funded consistently.

- **Given** a transaction transitions to `APPROVED`, **when**
  distribution runs, **then** exactly 10 SP is credited to the
  customer, 10 SP to the Marketing Fund, and 10 SP to the Platform.
- **Given** distribution completes successfully, **when** all three
  allocations are recorded, **then** the transaction transitions to
  `COMPLETED`.
- **Given** a distribution fails partway, **when** the system detects
  the failure, **then** the transaction does not move to `COMPLETED`
  and the failure is surfaced for admin follow-up.

**US-007 (FR-017, FR-018)** — As the **platform**, I want all SP
distribution and fee calculation to run server-side and only after
merchant approval, so that no client can forge or bypass the
reward/fee logic.

- **Given** any client request, **when** it includes a client-supplied
  SP amount or fee value, **then** the server ignores it and
  recalculates from the fixed 30 SP (10/10/10) rule.
- **Given** a transaction is not `APPROVED`, **when** any client
  attempts to trigger distribution, **then** the server rejects the
  request.

---

### 4.5 EPIC-05: Reward Redemption

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-008 | Browse and redeem rewards with SP Points | P1 | Sprint 4 |
| US-024 | Merchant verifies and completes reward redemption | P1 | Sprint 4 |

**US-008 (FR-004)** — As a **customer**, I want to browse and redeem
available rewards using my SP Points, so that I get tangible value
from my balance.

- **Given** a customer has sufficient SP balance, **when** they redeem
  a reward, **then** the SP cost is deducted and the redemption is
  created with a status of pending fulfillment (see US-024).
- **Given** a customer has insufficient SP balance, **when** they
  attempt redemption, **then** the system prevents it and shows a
  clear message.

**US-024 (New — recommend adding to BRD as a future FR)** — As a
**merchant**, I want to verify and complete a customer's reward
redemption in-store, so that the reward is only fulfilled once and the
platform has a record it actually happened.

- **Given** a customer has redeemed a reward and received a
  redemption reference (e.g., a code shown in-app), **when** the
  customer presents it in-store, **then** the merchant can validate
  that reference against the system.
- **Given** a redemption reference is validated by the merchant,
  **when** the merchant marks it fulfilled, **then** the system
  records the fulfillment and the redemption cannot be validated or
  fulfilled a second time.
- **Given** a redemption reference has already been fulfilled or does
  not exist, **when** a merchant attempts to validate it again,
  **then** the system rejects the attempt and shows a clear error.
- **Given** any redemption fulfillment event, **when** it is
  processed, **then** an audit log entry is created recording the
  redemption ID, customer ID, merchant ID, reward, and timestamp,
  consistent with the audit approach in EPIC-08.

---

### 4.6 EPIC-06: Merchant Shop & Transaction Management

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-009 | Manage shop profile | P0 | Sprint 1 |
| US-010 | View marketing fee tracking and transaction records | P0 | Sprint 4 |

**US-009 (FR-007)** — As a **merchant**, I want to manage my shop
profile and store information, so that customers can find accurate
information about my store.

- **Given** a merchant is onboarded, **when** they edit profile fields
  (name, address, category, hours), **then** changes are saved and
  visible to customers.

**US-010 (FR-009, FR-010)** — As a **merchant**, I want to view
marketing fee tracking and transaction records, so that I understand
costs and can reconcile sales.

- **Given** approved/completed transactions exist, **when** a merchant
  opens transaction records, **then** each shows amount, status, and
  the 10 SP marketing fee deducted.
- **Given** a merchant filters by date range, **when** applied,
  **then** the fee total for that range is displayed accurately.

**Deferred secondary items (Post-MVP backlog — see "Backlog Priority
Deviation from BRD" above for FR-005/FR-008/FR-011):**

| Story ID | User Story (summary) | Priority | Sprint | Notes |
|---|---|---|---|---|
| US-011 | Merchant creates campaigns/promotions (FR-008) | P2 | Post-MVP backlog | Adds acquisition value but not required to prove the reward loop |
| US-012 | Merchant views customer behavior insights (FR-011) | P3 | Post-MVP backlog | Needs a data volume baseline first |
| US-013 | Customer explores/searches nearby shops (FR-005) | P2 | Post-MVP backlog | Useful for discovery, not blocking core loop |
| US-014 | Customer views active promotions (FR-006) | P2 | Post-MVP backlog | Depends on US-011 existing first |

---

### 4.7 EPIC-07: Admin Management & Oversight

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-015 | Manage customer and merchant accounts | P0 | Sprint 1 |
| US-016 | View fixed SP Point reward rules (read-only in MVP) | P0 | Sprint 4 |
| US-017 | Monitor system usage, health, and transaction activity | P1 | Sprint 4 |
| US-025 | Admin manually cancels a stuck `PENDING_APPROVAL` transaction | P1 | Sprint 2 |

**US-015 (FR-012, FR-013)** — As an **admin**, I want to manage
customer and merchant accounts (create/update/suspend/onboard), so
that I can maintain a trustworthy platform.

- **Given** an admin suspends a merchant, **when** suspension is
  applied, **then** that merchant can no longer approve QR
  transactions.
- **Given** an admin suspends a customer, **when** suspension is
  applied, **then** that customer can no longer create new
  transactions via QR scan.

**US-016 (FR-014) — MVP scope clarified:** As an **admin**, I want to
**view** the fixed SP Point reward rule (30 SP, split 10/10/10), so
that I can confirm the ecosystem's active configuration.

> **Scope note:** In MVP, the 10/10/10 split and the 30 SP amount are
> fixed values, not admin-editable at runtime. FR-014 ("configure and
> manage") is satisfied at the MVP level by making the fixed rule
> visible and change-controlled only through a new deployment — not
> through an in-app editor. **Runtime rule configuration (letting an
> admin change the split or amount without a deploy) is out of scope
> for MVP and is deferred to Post-MVP backlog**, pending a decision on
> what guardrails such an editor would need (e.g., minimum/maximum
> splits, approval workflow for rule changes).

- **Given** the fixed 30 SP (10/10/10) model, **when** an admin opens
  the reward rule screen, **then** the current active values are
  displayed as read-only.
- **Given** the rule values are only changed via a new deployment,
  **when** a deployment changes them, **then** the change is captured
  in deployment/release records (not an in-app admin edit action).

**US-017 (FR-015)** — As an **admin**, I want to monitor system usage,
health, and transaction activity, so that I can detect and resolve
issues before they impact users.

- **Given** transactions are flowing through the system, **when** an
  admin opens the monitoring dashboard, **then** counts of
  `PENDING_APPROVAL` / `APPROVED` / `COMPLETED` / `REJECTED` /
  `CANCELLED` transactions are visible.

**US-025 (New — Admin Safety Control, recommend adding to BRD as a
future FR)** — As an **admin**, I want to manually cancel a
transaction that is stuck in `PENDING_APPROVAL`, so that the platform
has a way to unblock a transaction even before an automated approval
SLA/timeout (US-022) is defined.

- **Given** a transaction is `PENDING_APPROVAL`, **when** an admin
  selects it and chooses to cancel, **then** it transitions to
  `CANCELLED` and no SP is distributed, consistent with the lifecycle
  rules in US-005.
- **Given** a transaction is not `PENDING_APPROVAL` (e.g., already
  `APPROVED`, `COMPLETED`, `REJECTED`, or `CANCELLED`), **when** an
  admin attempts to cancel it, **then** the system blocks the action.
- **Given** an admin cancels a transaction, **when** the cancellation
  is processed, **then** an audit log entry records the transaction
  ID, the admin who acted, the prior status, and a timestamp,
  consistent with the audit approach in EPIC-08.
- **Note:** This is an interim manual control. Once US-022 (approval
  SLA/timeout) is resolved and built, automatic cancellation should
  handle the common case, with this manual control remaining for
  exceptions.

---

### 4.8 EPIC-08: Transaction Audit & Traceability

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-018 | Immutable audit log for every SP distribution | P0 | Sprint 3 |

**US-018 (FR-020, FR-022)** — As an **admin**, I want to view an
immutable audit log for every SP distribution, so that I can verify
accuracy and investigate disputes.

- **Given** a transaction is approved and distributed, **when**
  distribution occurs, **then** an audit log entry records transaction
  ID, merchant ID, customer ID, status transition, the SP amount per
  distribution target, and a timestamp.
- **Given** an admin searches by transaction ID, **when** they open
  audit logs, **then** the full distribution and status history for
  that transaction is visible.
- **Given** an audit log entry exists, **when** any user attempts to
  modify or delete it, **then** the system prevents the change.

---

### 4.9 EPIC-09: PDPA Compliance & Data Security

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-019 | Explicit consent before data collection | P0 | Sprint 1 |
| US-020 | Secure auth/authorization and data minimization | P0 | Sprint 1 |
| US-021 | Defined data retention policy | P1 | Post-MVP backlog (blocked) |

**US-019** — As a **customer/merchant**, I want to give explicit
consent before my personal data is collected, so that my data rights
under PDPA are respected.

- **Given** a new user registers, **when** they reach the consent
  step, **then** they must explicitly accept data collection terms
  before an account is created.
- **Given** a user has not given consent, **when** they attempt to use
  data-collecting features, **then** access is blocked.

**US-020** — As the **platform**, I want secure authentication/
authorization for all roles and data minimization by default, so that
personal and sensitive data is protected.

- **Given** any API request, **when** it is not authenticated/
  authorized for the requesting role, **then** it is rejected.
- **Given** personal data is stored, **when** it is accessed by a
  feature, **then** only the fields required for that specific feature
  are exposed.

**US-021 (Open Question 4)** — As an **admin**, I want a defined data
retention policy for personal data and audit logs, so that the
platform meets PDPA retention requirements.

- **Given** a retention policy is defined by legal/compliance
  stakeholders, **when** data reaches its retention limit, **then** it
  is archived or deleted per policy.
- **Blocked:** requires resolution of BRD Open Question 4 (PDPA
  consent flows and retention periods) before implementation can be
  estimated with confidence.

---

## 5. Cross-Cutting Backlog Item: Approval SLA

| Story ID | User Story (summary) | Priority | Sprint |
|---|---|---|---|
| US-022 | Auto-cancel transactions stuck in Pending Approval | P2 | Post-MVP backlog (blocked) |

**US-022 (Open Question 6)** — As the **platform**, I want a defined
SLA/timeout for merchant approval, so that transactions don't remain
`PENDING_APPROVAL` indefinitely.

- **Given** a transaction remains `PENDING_APPROVAL` beyond the
  defined SLA, **when** the timeout elapses, **then** it automatically
  transitions to `CANCELLED`.
- **Blocked:** requires stakeholder decision on the SLA duration (BRD
  Open Question 6) before implementation.
- **Interim mitigation:** US-025 (Admin manual cancel, Sprint 2)
  provides a manual path to unblock a stuck transaction until this
  automated SLA is defined and built.

---

## 6. Sprint Recommendation Summary

Per the Sprint Planning Assumptions (§2), this table assumes 2-week
sprints and a small team; it is a starting sequence to be re-validated
after Sprint 1 velocity is known. Sprint 2/3 are now explicitly split
between **transaction foundation** (creating and approving a
transaction) and **reward distribution** (paying it out), so a slip in
distribution logic no longer blocks the approval workflow shipping on
schedule, and vice versa.

| Sprint | Focus | Stories |
|---|---|---|
| **Sprint 1** | Foundation: auth, shop profile, admin account management, PDPA consent & security baseline | US-001, US-009, US-015, US-019, US-020 |
| **Sprint 2** | Transaction foundation: QR generation, QR scanning, pending approval, merchant approval workflow, admin manual-cancel safety control | US-023, US-002, US-004, US-005, US-025 |
| **Sprint 3** | Reward distribution: SP distribution, 10/10/10 Marketing Fee split, audit log | US-006, US-007, US-018 |
| **Sprint 4** | Customer/merchant/admin value loop: balance & status history, redemption + fulfillment, fee reconciliation, reward-rule visibility (read-only), monitoring | US-003, US-008, US-024, US-010, US-016, US-017 |

### Post-MVP Backlog (Sprint 5+)

Secondary features (deprioritized per "Backlog Priority Deviation
from BRD" above) and items blocked on unresolved BRD Open Questions:

| Item | Priority | Status |
|---|---|---|
| US-011 (merchant campaigns) | P2 | Deferred |
| US-012 (behavior insights) | P3 | Deferred |
| US-013 (shop discovery) | P2 | Deferred |
| US-014 (promotions) | P2 | Deferred |
| US-021 (data retention policy) | P1 | Blocked on BRD Open Question 4 |
| US-022 (approval SLA/auto-cancel) | P2 | Blocked on BRD Open Question 6 |

**Note:** US-021 and US-022 are blocked on stakeholder answers to BRD
Open Questions 4 and 6, respectively. These should be resolved during
Sprint 1–2 so Post-MVP planning isn't delayed further, and so US-022
can be scheduled promptly once unblocked (US-025 in Sprint 2 is the
interim manual mitigation in the meantime).

---

## 7. Out of Scope (carried from BRD)

Per BRD §6 Out of Scope, the following remain excluded from this
backlog entirely (not deferred, not scheduled):

- Delivery and logistics management
- Full online marketplace / e-commerce checkout
- Third-party payment gateway integration
- Multi-language/localization support beyond Thai/English baseline

---

*This backlog should be reviewed and re-prioritized with stakeholders
each sprint planning session, and updated as Open Questions in the BRD
are resolved.*
