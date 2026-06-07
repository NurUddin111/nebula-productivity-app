# 🌌 Nebula - Real-Time Communication Platform

![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

A full-stack real-time chat application built with React, Node.js, and Socket.io. Nebula enables instant messaging with live online presence, JWT-based authentication, and a clean modern UI.

---

## 📸 Application Preview

<table>
  <tr>
    <td align="center">
      <strong>Sign Up</strong><br/><br/>
      <img width="1916" height="992" alt="Screenshot 2026-03-29 120147" src="https://github.com/user-attachments/assets/81a1f204-776e-473f-91e8-eaffd82fa26c" />
    </td>
    <td align="center">
      <strong>Chat</strong><br/><br/>
      <img width="1565" height="921" alt="Screenshot 2026-04-22 022840" src="https://github.com/user-attachments/assets/1e5a7eec-1f68-4c14-951e-606dfe8a89e9" />
    </td>
  </tr>
</table>

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| **Frontend** | [nebula-productivity-app.vercel.app](https://nebula-productivity-app.vercel.app/) |
| **Backend** | [nebula-productivity-app-production.up.railway.app](https://nebula-productivity-app-production.up.railway.app) |

---

## 📖 Overview

Nebula is a full-stack real-time communication platform designed to deliver seamless messaging experiences through WebSocket-powered communication.

The platform supports instant messaging, live online presence tracking, secure authentication, media sharing, and responsive user experiences while maintaining scalable backend architecture.

---

## 🎯 Problem Statement

Modern communication platforms require real-time interactions, reliable message delivery, secure authentication, and scalable architecture.

Building such systems introduces challenges around socket connections, user presence tracking, state management, and media handling.

Nebula was built to address these challenges through a modern full-stack architecture.

---

## 💡 Solution

Nebula provides a centralized real-time communication platform where users can:

- Exchange instant messages
- Track online user presence
- Share media securely
- Maintain persistent conversations

The platform leverages Socket.io for real-time communication and JWT authentication for secure access control.

---

## ✨ Key Features

- Real-Time Messaging with Socket.io
- Live Online User Presence
- Secure JWT Authentication
- Media Sharing via Cloudinary
- Persistent Conversation History
- Cross-Domain Authentication
- Responsive User Interface
- Protected Routes
- Real-Time Socket Authentication
- Modern State Management

---

## 🏗 Architecture Highlights

- Monorepo Architecture
- Real-Time Communication Layer
- Socket Authentication Middleware
- JWT-Based Security
- Zustand State Management
- Modular Backend Structure
- Cloud Media Integration
- Responsive Frontend Architecture

---

## 📁 Project Structure

```
nebula/
├── frontend/               
│   ├── src/
│   │   ├── components/           
│   │   ├── hooks/     
│   │   ├── lib/         
│   │   ├── pages/         
│   │   ├── store/         
│   │   └── App.tsx            
│   └── .env
│
├── backend/                
│   ├── src/
│   │   ├── app/
│   │   │   ├── config/    
│   │   │   ├── modules/    
│   │   │   └── routes/     
│   │   ├── lib/       
│   │   ├── middleware/       
│   │   ├── app.ts       
│   │   └── server.ts        
│   └── .env
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm
- MongoDB URI
- Cloudinary account

---

### 1. Clone the repository

```bash
git clone https://github.com/NurUddin111/nebula-productivity-app.git
cd nebula
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
cp .env.example .env
# (Add your environment variables)
```

Start the backend:

```bash
npm run dev
```

---

### 3. Setup the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://localhost:1126
```

Start the frontend:

```bash
npm run dev
```

App will be running at `http://localhost:5173`

---

## 🌐 Deployment

The app is deployed across two platforms:

| Layer | Platform | Config |
|---|---|---|
| Frontend | **Vercel** | Root dir: `frontend/`, Output: `dist/` |
| Backend | **Railway** | Root dir: `backend/`, Start: `npm start` |

### Environment Variables

**Vercel (Frontend):**
```
VITE_API_URL=https://nebula-productivity-app-production.up.railway.app
```

**Railway (Backend):**
```
PORT=1126
NODE_ENV=production
MONGO_URI=...
JWT_ACCESS_SECRET=...
JWT_ACCESS_EXPIRES=...
RESEND_API_KEY=...
EMAIL_FROM=...
EMAIL_FROM_NAME=...
CLIENT_URL=https://nebula-productivity-app.vercel.app
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ARCJET_KEY=...
ARCJET_ENV=...
```

> Vercel serves the SPA with a `vercel.json` rewrite rule to support client-side routing.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/signup` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and receive JWT |
| `POST` | `/api/v1/auth/logout` | Logout |
| `POST` | `/api/v1/auth/update-profile` | Update user profile |
| `GET` | `/api/v1/auth/check` | Verify auth token |

### Messages
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/messages/contacts` | Get all users for sidebar |
| `GET` | `/api/v1/messages/chats` | Get all chat partners |
| `GET` | `/api/v1/messages/:id` | Get conversation with a user |
| `POST` | `/api/v1/messages/send/:id` | Send a message |

---

## 🔐 Authentication Flow

Nebula uses **Bearer token authentication** for cross-domain compatibility:

1. User logs in → backend returns a JWT in the response body
2. Frontend stores the token in `localStorage`
3. Every Axios request automatically attaches `Authorization: Bearer <token>` via an interceptor
4. Socket.io connection also passes the token via `auth: { token }` on handshake

---

## 👨‍💻 Author

**Muhammad Nur Uddin**

Backend-Focused Full-Stack Developer

📧 Email: muhammadnur.codes@gmail.com

🌐 [Portfolio](https://muhammad-nur-uddin.vercel.app)

💼 [LinkedIn](https://www.linkedin.com/in/muhammad-nur-uddin)

🐙 [GitHub](https://github.com/NurUddin111)

> "Don't be shy, know the why!"
