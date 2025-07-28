# 🏥 Health Desk - Hospital Management System

A full-stack **Hospital Management System** developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) integrated with **Generative AI-based chatbot** built using **Python (FastAPI) and Gemini API**. This platform provides seamless workflows for **patients and admins**, offering real-time features, authentication, appointment management, and instant AI-driven health support.

## 🚀 Tech Stack

- **Frontend:** React.js (Hooks, Context API)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, Role-based Access Control
- **Chatbot Integration:** Python, FastAPI, Gemini API

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure **JWT-based login system**
- **Role-based access control** for Patients and Admins

### 🩺 Patient Module
- Register & login securely
- Book appointments
- Get instant responses from AI chatbot on health queries

### 🛠️ Admin Module
- Manage doctors and patient appointments
- Access real-time statistics and dashboards
- View registered patients and system activity

### 🧠 AI Chatbot Support
- Built using **FastAPI** and **Gemini API**
- Provides **instant health support** and query resolution

### 🧩 UI/UX
- 8+ dynamic **React.js components** for dashboard, login, appointments, doctor lists, etc.
- Real-time updates using React hooks and RESTful API calls

---

## 🧱 Project Architecture

```

/client      → React frontend
/server      → Node.js/Express backend
/chatbot     → Python FastAPI-based chatbot service

````

---

## 📦 Installation & Setup

### Prerequisites
- Node.js & npm
- MongoDB
- Python 3.10+
- Gemini API Key

### Backend (Node.js + Express)
```bash
cd server
npm install
npm start
````

### Frontend (React.js)

```bash
cd client
npm install
npm start
```

### Chatbot (Python + FastAPI)

```bash
cd chatbot
pip install -r requirements.txt
uvicorn main:app --reload
```

