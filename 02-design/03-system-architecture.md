# ShopPlus Global System Architecture

Version: 1.0  
Document Type: System Architecture Design  
Project: ShopPlus Global Community Commerce Platform


# 1. Architecture Overview

ShopPlus Global is a Community Commerce Platform that connects local merchants and customers through digital transactions, reward systems, and AI-powered business intelligence.

The system is designed using Cloud-Native Architecture with separation between:

- Presentation Layer
- Application Layer
- Backend Business Logic Layer
- Data Layer
- AI Intelligence Layer


## High Level Architecture


Customer / Merchant / Admin

↓

Web Application + Mobile Application

↓

Firebase Authentication

↓

Cloud Functions Backend

↓

Firestore Database

↓

AI Intelligence Layer


## Architecture Principles

- Client applications handle only presentation and user interaction.
- Backend controls all business rules.
- Financial and reward transactions must be validated server-side.
- Every important action must have an audit trail.


---

# 2. Application Layer


## 2.1 Web Application

Technology:

- Next.js
- React
- Firebase SDK


Responsibilities:

- Customer interface
- Merchant dashboard
- Admin management
- Transaction monitoring
- Reward display


Restrictions:

The Web Application must not directly update:

- Transaction status
- SP balance
- Marketing Fund
- Financial records


---

## 2.2 Mobile Application


Responsibilities:

- QR scanning
- Customer reward checking
- Merchant transaction approval
- Push notifications


Mobile Application communicates with backend services through secure authentication.


---

# 3. Backend Layer


Backend is the core business processing layer.

Technology:

- Firebase Cloud Functions


## 3.1 Transaction Service


Responsibilities:

- Create transaction
- Validate merchant
- Validate customer
- Manage transaction lifecycle


Transaction Flow:

PENDING_APPROVAL

↓

MERCHANT_APPROVED

↓

COMPLETED


---

## 3.2 Marketing Fee Engine


Responsible for calculating and distributing marketing fees.


Example:

Marketing Fee = 30 SP


Distribution:


Customer Reward

10 SP


Marketing Fund

10 SP


ShopPlus Global

10 SP


---

## 3.3 Reward Service


Responsibilities:

- Create reward records
- Update customer SP balance
- Maintain reward history


---

## 3.4 Audit Log Service


All important system actions must create audit records.


Examples:

- Transaction created
- Merchant approved transaction
- Reward distributed
- Balance updated
- Admin actions


---

# 4. Data Layer


Database:

Firebase Firestore


Main Collections:


## users

Stores:

- User profile
- Role
- Authentication information


## merchants

Stores:

- Merchant information
- Merchant status
- Business information


## transactions

Stores:

- Customer transaction
- Merchant approval status
- Marketing fee calculation


## rewards

Stores:

- Customer reward history
- SP earning records


## marketingFunds

Stores:

- Marketing fund transactions


## auditLogs

Stores:

- System activity history
- Security tracking


Firestore design follows:

- Scalability
- Security Rules
- Data consistency
- Auditability


---

# 5. Security Architecture


## Authentication


Firebase Authentication manages:

- Identity verification
- User login
- Session management


---

## Authorization


Role Based Access Control (RBAC)


Customer:

- View own profile
- View own rewards
- View own transactions


Merchant:

- Approve customer transactions
- View merchant data


Admin:

- Manage system operations
- Review transactions
- Monitor platform


---

## Backend Security


Critical operations must run only on Cloud Functions.


Client cannot directly:

- Change transaction status
- Modify SP balance
- Modify reward distribution
- Modify marketing fund


---

## PDPA Compliance


System supports:

- User consent management
- Access control
- Personal data protection
- Audit logging
- Data minimization


---

# 6. AI Layer


AI works as an intelligence layer to support business decisions.


## Customer Intelligence


Capabilities:

- Personalized rewards
- Customer behavior analysis
- Promotion recommendation


---

## Merchant Intelligence


Capabilities:

- Customer retention analysis
- Sales insight
- Marketing recommendation


---

## Business Intelligence


Capabilities:

- Business trend analysis
- Platform performance insight
- Decision support


AI limitation:

AI cannot directly modify financial transactions.

All critical business operations must pass backend validation.


---

# 7. Deployment Architecture


Cloud Platform:

Firebase


Services:

- Firebase Hosting
- Firebase Authentication
- Cloud Functions
- Firestore
- Cloud Storage


Development Workflow:


Developer

↓

GitHub Repository

↓

CI/CD Process

↓

Production Environment


---

# 8. Future Scalability


The architecture supports future expansion:

- More merchants
- More customers
- Mobile applications
- Advanced AI analytics
- Recommendation engine
- Business intelligence dashboard


---

# Document Status

Version: 1.0

Status:
Draft for Architecture Review