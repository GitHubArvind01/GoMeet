# 🛡️ JWT-GoMeet — Secure Interview Scheduler Web App

A secure full-stack interview scheduling app with JWT authentication, meeting rooms, and anti-cheating protection. Built with Spring Boot + React + MySQL.

## 🚀 Features

- ✅ Secure Login/Signup/Reset with JWT
- ✅ Create Scheduled Interview with Email Invite
- ✅ Join Interview Room via ID + Passkey
- ✅ Anti-Cheat (Tab switch + Copy/Paste Block)
- ✅ Modern UI with TailwindCSS + Vite
- ✅ JavaMail integration
- ⏳ Coming Soon: Face Detection + Logs

## 📸 Screenshots

<img width="1920" height="1200" alt="Main Page" src="https://github.com/user-attachments/assets/1af0b0fd-7d1f-4720-aca1-b980579b5ba1" />
<img width="1920" height="1200" alt="Login" src="https://github.com/user-attachments/assets/594b6a50-a567-4a2c-a583-12b4af3140c9" />
<img width="1920" height="1200" alt="Signup" src="https://github.com/user-attachments/assets/4efecfd9-068a-4028-b6b3-3aae080e8367" />
<img width="1920" height="1200" alt="Join Meet" src="https://github.com/user-attachments/assets/5444f27b-3d20-40f0-a0ae-ecfccd85e4d9" />

---

## 🧰 Tech Stack

**Frontend**: React + Vite + TailwindCSS  
**Backend**: Java + Spring Boot + JWT  
**Database**: MySQL  
**Others**: JavaMail, Maven

---

## 🛠️ Local Setup

### ✅ Prerequisites

Make sure these are installed and added to your PATH:

- Node.js
- Maven
- JDK 17+
- MySQL

### 📦 Setup Steps 1

#### 🔧 Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run

```

### 📦 Setup Steps 2

#### 🔧 Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
