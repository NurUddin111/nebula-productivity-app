# 🌌 Nebula — Real-Time Chat & Productivity App

A full-stack real-time chat application built with React, Node.js, and Socket.io. Nebula enables instant messaging with live online presence, JWT-based authentication, and a clean modern UI.

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| **Frontend** | [nebula-productivity-app.vercel.app](https://nebula-productivity-app.vercel.app) |
| **Backend** | [nebula-productivity-app-production.up.railway.app](https://nebula-productivity-app-production.up.railway.app) |

---

## ✨ Features

- 🔐 JWT-based authentication (register, login, logout)
- 💬 Real-time messaging powered by Socket.io
- 🟢 Live online user presence
- 🖼️ Image uploads via Cloudinary
- 📱 Fully responsive UI
- 🔒 Secure cross-domain auth using Bearer tokens

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework & build tool |
| TypeScript | Type safety |
| Zustand | State management |
| Socket.io Client | Real-time communication |
| Axios | HTTP requests |
| TailwindCSS | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| TypeScript | Type safety |
| Socket.io | WebSocket server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Cloudinary | Media storage |

---

## 📁 Project Structure

```
nebula/
├── frontend/               # React + Vite app (deployed on Vercel)
│   ├── src/
│   │   ├── app/            # App entry, routing
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── store/          # Zustand stores
│   │   └── lib/            # Axios instance, helpers
│   └── .env
│
├── backend/                # Express + Socket.io server (deployed on Railway)
│   ├── src/
│   │   ├── app/
│   │   │   ├── config/     # Env vars, DB connection
│   │   │   ├── modules/    # Feature modules (auth, chat, user)
│   │   │   └── routes/     # API routes
│   │   ├── socket.ts       # Socket.io server logic
│   │   └── index.ts        # Server entry point
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
git clone https://github.com/your-username/nebula.git
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
PORT=1126
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES=7d

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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
VITE_API_URL=https://your-backend.up.railway.app
```

**Railway (Backend):**
```
NODE_ENV=production
CLIENT_URL=https://your-app.vercel.app
MONGO_URI=...
JWT_ACCESS_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

> Vercel serves the SPA with a `vercel.json` rewrite rule to support client-side routing.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and receive JWT |
| `POST` | `/api/v1/auth/logout` | Logout |
| `GET` | `/api/v1/auth/check` | Verify auth token |

### Messages
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/messages/:userId` | Get conversation with a user |
| `POST` | `/api/v1/messages/send/:userId` | Send a message |

### Users
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/users` | Get all users for sidebar |

---

## 🔐 Authentication Flow

Nebula uses **Bearer token authentication** for cross-domain compatibility:

1. User logs in → backend returns a JWT in the response body
2. Frontend stores the token in `localStorage`
3. Every Axios request automatically attaches `Authorization: Bearer <token>` via an interceptor
4. Socket.io connection also passes the token via `auth: { token }` on handshake

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.

---

## 🙌 Acknowledgements

Built with ❤️ using the MERN stack and Socket.io.