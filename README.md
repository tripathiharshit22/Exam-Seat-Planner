# Exam Seat Planner

A full-stack web application for managing classroom allocation during exams.

## Tech Stack

**Frontend** — React.js, Vite, Tailwind CSS  
**Backend** — Node.js, Express.js  
**Database** — MongoDB (Mongoose)

---

## Project Structure

```
├── client/                 # Frontend (React + Vite)
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── AddClassroom.jsx
│       │   ├── ClassroomList.jsx
│       │   └── AllocateExam.jsx
│       ├── services/
│       │   ├── api.js
│       │   └── classroomService.js
│       └── components/
│
└── server/                 # Backend (Node + Express)
    ├── config/
    │   └── db.js
    ├── models/
    │   └── Classroom.js
    ├── routes/
    │   ├── classroomRoutes.js
    │   └── allocateRoutes.js
    ├── controllers/
    │   ├── classroomController.js
    │   └── allocateController.js
    └── server.js
```

---

## Features

- Add classrooms with room ID, capacity, floor number, and washroom proximity
- View and delete existing classrooms
- Allocate exam rooms for a given number of students using greedy algorithm (minimum rooms, lower floors first)
- Returns students assigned per room

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the repo

```bash
git clone https://github.com/your-username/exam-seat-planner.git
cd exam-seat-planner
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/myapp
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:5000`

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/classrooms` | Get all classrooms |
| `POST` | `/api/classrooms` | Create a classroom |
| `DELETE` | `/api/classrooms/:id` | Delete a classroom |
| `POST` | `/api/allocate` | Allocate rooms for students |

### POST `/api/classrooms`

```json
{
  "roomId": "A101",
  "capacity": 40,
  "floorNo": 1,
  "nearWashroom": true
}
```

### POST `/api/allocate`

```json
{ "totalStudents": 80 }
```

**Response:**

```json
{
  "totalRequested": 80,
  "totalAllocated": 80,
  "allocatedRooms": [
    { "roomId": "A101", "floorNo": 0, "capacity": 40, "studentsAssigned": 40 },
    { "roomId": "B201", "floorNo": 1, "capacity": 40, "studentsAssigned": 40 }
  ]
}
```

---

## Deployment (Render)

See [Render Deployment Guide](#) for full instructions.

**Backend (Web Service):**
- Root: `server/`
- Build: `npm install`
- Start: `npm start`
- Env vars: `MONGO_URI`, `CLIENT_URL`, `NODE_ENV=production`

**Frontend (Static Site):**
- Root: `client/`
- Build: `npm install && npm run build`
- Publish: `dist/`
- Env vars: `VITE_API_URL=https://your-backend.onrender.com/api`

---

## License

MIT
