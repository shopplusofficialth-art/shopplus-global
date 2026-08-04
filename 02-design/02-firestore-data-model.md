# ShopPlus Global - Firestore Data Model

**Version:** 1.2

**Last Updated:** 2026-08-04

**Document Owner:** Solution Architect

---

# 1. Overview

This document defines the Firestore database structure for ShopPlus Global.

The purpose of this design is to define how business data is stored, accessed, secured, and processed by Firebase Cloud Functions.

The design supports:

- Transaction processing
- SP Point management
- Merchant management
- Customer reward system
- Audit trail
- Multi-branch merchant support
- Future AI analytics

---

# 2. Database Design Principles

## Backend Controlled Processing

Sensitive business operations must not be executed directly from client applications.

The following operations must be controlled by Firebase Cloud Functions:

- Transaction approval processing
- SP distribution
- Wallet balance updates
- Ledger creation
- Marketing fund allocation

Client applications can only request operations and display results.

---

## Transaction Consistency

SP distribution must be processed atomically.

Example:

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

All operations must succeed together.

Audit First Design

Every important business event must create an audit record.

Examples:

Transaction Created
Merchant Approved
SP Distribution Started
SP Distribution Completed
Transaction Completed
3. Firestore Collection Overview
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
4. Users Collection
Path
users/{userId}
Purpose

Store customer, merchant staff, and admin information.

Example
{
  "uid": "user123",
  "displayName": "Customer Name",
  "email": "customer@email.com",
  "role": "CUSTOMER",
  "status": "ACTIVE",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
Role
CUSTOMER

MERCHANT

ADMIN
5. Merchants Collection
Path
merchants/{merchantId}
Purpose

Store merchant business information.

Example
{
  "merchantId": "merchant001",
  "shopName": "Coffee Shop",
  "ownerId": "user123",
  "status": "ACTIVE",
  "createdAt": "timestamp"
}
6. Merchant Branches Collection
Path
merchants/{merchantId}/branches/{branchId}
Purpose

Support multi-branch merchants.

Example
{
  "branchId": "branch001",
  "merchantId": "merchant001",
  "branchName": "Main Branch",
  "address": "Chiang Mai",
  "status": "ACTIVE",
  "createdAt": "timestamp"
}
7. Transactions Collection
Path
transactions/{transactionId}
Purpose

Main transaction record.

Example
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
Status
PENDING_APPROVAL

APPROVED

PROCESSING

COMPLETED

FAILED

REJECTED

EXPIRED
8. Transaction Events Collection
Path
transactions/{transactionId}/events/{eventId}
Purpose

Store transaction audit history.

Example
{
  "eventType": "MERCHANT_APPROVED",
  "actorId": "merchantUser001",
  "actorRole": "MERCHANT",
  "timestamp": "timestamp",
  "metadata": {}
}
Event Examples
TRANSACTION_CREATED

MERCHANT_APPROVED

MERCHANT_REJECTED

SP_DISTRIBUTION_STARTED

SP_DISTRIBUTION_COMPLETED

TRANSACTION_COMPLETED

TRANSACTION_FAILED
9. SP Wallets Collection
Path
spWallets/{userId}
Purpose

Store current SP balance.

Example
{
  "userId": "user123",
  "balance": 1000,
  "updatedAt": "timestamp"
}

Important:

SP balance can only be updated by Firebase Cloud Functions.

10. SP Ledger Collection
Path
spLedger/{ledgerId}
Purpose

Store immutable history of all SP movements.

Example
{
  "transactionId": "TX001",
  "source": "MARKETING_POOL",
  "destination": "CUSTOMER",
  "amount": 10,
  "type": "CUSTOMER_REWARD",
  "createdAt": "timestamp"
}
Ledger Types
CUSTOMER_REWARD

MARKETING_FUND

SHOPPLUS_REVENUE
11. Marketing Funds Collection
Path
marketingFunds/{fundId}
Purpose

Track marketing budget allocation.

Example
{
  "transactionId": "TX001",
  "amount": 10,
  "campaignId": null,
  "createdAt": "timestamp"
}
12. Security Considerations
Customer

Can:

View own transactions
View own SP balance

Cannot:

Modify SP balance
Modify transaction status
Create ledger records
Merchant

Can:

View own shop transactions
Approve pending transactions

Cannot:

Modify SP Ledger
Modify wallet balance
Admin

Can:

Monitor transactions
Investigate problems
Access audit records
13. Idempotency Design

Every transaction processing flow must have a unique processing key.

Cloud Functions must verify this key before executing SP distribution.

Purpose:

Prevent duplicate SP allocation
Support retry mechanism
Maintain transaction consistency

Example:

Transaction Retry

|

Check processingKey

|

Already Processed?

|

YES = Stop

|

NO = Continue
14. Future AI Analytics Support

This data model supports future AI capabilities.

Customer Analytics

Analyze:

Purchase behavior
Reward usage
Customer retention
Merchant Analytics

Analyze:

Sales performance
Customer frequency
Campaign effectiveness
AI Recommendation

Support:

Personalized promotions
Smart rewards
Customer segmentation