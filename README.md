# 🎬 **Movie-Verse**

A full-stack MERN project using **React (frontend)** and **Node.js + TypeScript (backend)** with **Clean Architecture**.
Allows users to search movies via the **OMDB API** and manage a shared favorites list (**no authentication required**).

---

## ✅ **Features**

* 🎯 React-based UI with **debounced movie search**
* 🔍 Movie search powered by **OMDB API**
* ❤️ Add / ❌ remove movies from favorites
* 💾 File-based favorites storage (no login needed)
* 🧱 Clean and maintainable backend architecture

---

## 🚀 **Setup Instructions**

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
OMDB_API_KEY=your_api_key
FRONTEND_URL=your_frontend_url
PORT=3000
```

Run the backend:

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Create a `.env` file:

```
VITE_API_BASE_URL=your_backend_base_url
```
---

## 📡 **API Endpoints**

| Method | Endpoint                      | Description          |
| ------ | ----------------------------- | -------------------- |
| GET    | `/api/movies/search?q=query`  | Search movies        |
| GET    | `/api/movies/details/:imdbID` | Get movie details    |
| GET    | `/api/favorites`              | Get favorites list   |
| POST   | `/api/favorites/:imdbID`      | Add a favorite movie |
| DELETE | `/api/favorites/:imdbID`      | Remove a favorite    |

---

## 📁 **Project Architecture**

```
backend/
  src/
    domain/
    application/
    infrastructure/
    presentation/

frontend/
  src/
```

