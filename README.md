#  Banking System Web Application

A full-stack banking system designed for bank employees, offering core functionalities such as account creation, loan management, fixed deposit tracking, and transactions. Built using **React**, **Spring Boot**, and **MongoDB** as part of the **SasiyaNet Internship Program**.

---

##  Abstract

This web-based banking system provides multiple features typically found in traditional banking software. The system includes:

- User authentication
- Account creation (Fixed Deposit, Savings, Loan)
- Transaction operations (deposit & withdraw)
- Loan application & repayment
- Fixed deposit inquiry

---

##  Introduction

### 1. Background

This project was developed as part of the **SasiyaNet Internship Program** to demonstrate essential software engineering principles using modern web technologies.

### 2. Objectives

As a trainee software engineer, the main objective was to design and implement a simple finance management system with support for:

- **Loans**: Lending money with repayment and interest tracking.
- **Fixed Deposits**: Locked deposit accounts with maturity date and interest.
- **Savings Accounts**: Standard accounts for deposits and withdrawals.

### 3. System Features

#### 3.1. User Registration
New users can sign up with a username, password, and email address.

#### 3.2. Login
Registered users can log in to access features securely.

#### 3.3. Account Creation
Users can create:
- Loan accounts
- Fixed deposit accounts
- Savings accounts

#### 3.4. Transactions
Support for:
- Depositing funds
- Withdrawing funds

#### 3.5. Balance Inquiry
Real-time view of account balance.

#### 3.6. Loan Repayment
Repay outstanding loan amounts through the interface.

#### 3.7. Fixed Deposit Details
View fixed deposit data including:
- Maturity date
- Interest rate
- Full maturity value

---

##  System Design & Architecture

### 1. Overview

- **Frontend**: React (with a dark theme)
- **Backend**: Spring Boot (RESTful APIs)
- **Database**: MongoDB (NoSQL)

### 2. Technology Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React, CSS          |
| Backend   | Spring Boot, REST API |
| Database  | MongoDB             |

### 3. Architecture & Class Diagram

 [View Class Diagram](https://drive.google.com/file/d/1EczIp3ngCZ7DObVNq7_y8ICUfQsSHRrS/view?usp=sharing)  
 [View ER Diagram](https://drive.google.com/file/d/1KndkpIlyd4dlPmW-emnWSh2ThGF0DQTb/view?usp=sharing)

### 4. Key Functional Design

- Auto-generated IDs:
  - Account ID
  - User Information ID
  - Transaction ID
  - Loan ID
  - Fixed Deposit ID
- Dropdown-driven transaction types: `withdraw`, `deposit`
- Username recorded with each created entry (for audit logging)

---

##  Implementation Highlights

- Dark-themed React UI
- Secure user management
- Full CRUD features for accounts, loans, and transactions
- Role-based bank receptionist interaction
- Loan and Fixed Deposit management modules

---

##  Future Improvements

- JWT-based secure login system
- Real-time balance display
- Enhanced UI/UX for better usability
- Audit logs and user session tracking
- Mobile responsiveness and PWA support

---

##  Author

**Trainee Software Engineer**  
Developed as part of the SasiyaNet Internship Program

---

##  License

This project is licensed for academic and educational use. Contact the author for other licensing options.

