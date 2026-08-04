# ShopPlus Global - Transaction Flow

**Version:** 1.0

**Last Updated:** 2026-08-04

**Document Owner:** Solution Architect

---

# 1. Overview

## Purpose

This document describes the end-to-end transaction flow of ShopPlus Global, from the moment a customer scans a merchant QR Code until the transaction is completed and all SP distributions are recorded.

The objective is to provide a single source of truth for business logic, system behavior, and backend processing so that developers, testers, product owners, and stakeholders share the same understanding.

This transaction flow is designed to ensure:

- Accurate transaction processing
- Secure marketing fee distribution
- Complete audit trail
- Compliance with Thai regulations and PDPA
- Scalability for future platform expansion

## Scope

This document covers the complete transaction lifecycle within the ShopPlus Global platform, including transaction creation, approval process, status transitions, SP distribution, backend processing, and audit logging.

This document does not cover UI/UX design, Firestore database schema, API specifications, Cloud Functions implementation details, or infrastructure architecture. These topics are documented separately under the Design folder.

---

# 2. Actors

| Actor | Responsibility |
|--------|----------------|
| Customer | Scan merchant QR Code and initiate a transaction |
| Merchant | Review and approve or reject pending transactions |
| Web / Mobile Application | Submit transaction requests and display transaction status |
| Firebase Authentication | Verify user identity and access permissions |
| Cloud Functions | Validate transactions, calculate SP distribution, and execute business rules |
| Firestore | Store transaction data and audit logs |
| Admin | Monitor transactions, investigate issues, and perform administrative operations |

---

# 3. Transaction Lifecycle

The following lifecycle describes the complete journey of a transaction within the ShopPlus Global platform.

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

## Lifecycle Description

| Step | Description |
|------|-------------|
| 1 | Customer scans the merchant QR Code. |
| 2 | The application creates a new transaction with the status **PENDING_APPROVAL**. |
| 3 | The merchant reviews the pending transaction. |
| 4 | The merchant either approves or rejects the transaction. |
| 5 | If approved, Firebase Cloud Functions validate the transaction and execute the business rules. |
| 6 | The system deducts the Marketing Fee of **30 SP**. |
| 7 | The system distributes SP to Customer Reward, Marketing Fund, and ShopPlus Global. |
| 8 | Every important event is recorded in the Audit Log. |
| 9 | The transaction status is updated to **COMPLETED**. |

# 4. Transaction Status

## Status Definitions

| Status | Description | Next Status |
|--------|-------------|-------------|
| PENDING_APPROVAL | Transaction has been created and is waiting for merchant review. | APPROVED, REJECTED |
| APPROVED | Merchant has approved the transaction and backend processing is ready to start. | PROCESSING |
| PROCESSING | Firebase Cloud Functions are validating and processing the transaction. | COMPLETED, FAILED |
| REJECTED | Merchant rejected the transaction. No SP distribution will occur. | Final |
| COMPLETED | Transaction completed successfully and all SP distributions have been recorded. | Final |
| FAILED | Backend processing failed and requires investigation or retry. | PROCESSING (Retry) |

## State Transition

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

# 5. Main Flow

---

# 6. Exception Flow

---

# 7. SP Distribution

---

# 8. Audit Log

---

# 9. Design Decision