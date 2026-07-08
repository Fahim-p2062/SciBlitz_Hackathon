# EcoSortha: AI & Blockchain for a Circular Bangladesh
**Created for CUET Hackathon by SciBlitz**

EcoSortha digitizes the informal waste sector and optimizes municipal collection across Bangladesh (Dhaka North/South City Corporation, Chittagong City Corporation, CUET Campus Zone) using **Deep Learning Computer Vision** and an **Immutable Blockchain Ledger**.

---

## 🏛️ System Architecture

```
EcoSortha/
├── backend_python/        # Python FastAPI AI & Optimization Service (OpenCV / ML Engine)
├── server/                # TypeScript + Node.js + Express + Mongoose Backend Server
├── frontend/              # State-of-the-Art React + Vite + TypeScript Web Application
└── original_echosortha/   # Original Reference Prototype HTML & Python script
```

### 1. Python AI Backend (`backend_python/`)
- **Technology Stack**: Python 3, FastAPI, OpenCV, NumPy, Pydantic
- **Features**:
  - `POST /ai/classify`: Computer vision waste classifier detecting **Compost**, **Trash**, and **Recycle** items with bounding boxes and confidence scores.
  - `POST /ai/optimize_route`: Heuristic TSP (Traveling Salesperson Problem) route optimizer prioritizing high-fill dustbins based on municipal BDT budget.
- **Run Locally**:
  ```bash
  cd backend_python
  pip install -r requirements.txt
  python main.py
  # Service runs on http://localhost:8000
  ```

### 2. TypeScript & Mongoose Backend Server (`server/`)
- **Technology Stack**: Node.js, Express, TypeScript, Mongoose (MongoDB)
- **Features**:
  - Mongoose data models: `Dustbin`, `LedgerBlock`, `RoutePlan`, `NotificationItem`.
  - Resilient in-memory fallback seeding so the server works seamlessly even if a local MongoDB instance is offline.
- **Run Locally**:
  ```bash
  cd server
  npm install
  npm run dev
  # Server runs on http://localhost:5000
  ```

### 3. TypeScript Web Application (`frontend/`)
- **Technology Stack**: React 18, Vite, TypeScript, Vanilla CSS Glassmorphism Design System
- **Modules**:
  1. **Dashboard**: Circular Bangladesh KPIs, carbon offset tracking, and live EcoSortha Blockchain Traceability Ledger Explorer.
  2. **AI Waste Classifier**: Real-time visual bounding box camera scanner / image simulation for Compost, Trash, and Recycle items.
  3. **Smart Dustbin Monitor**: Real-time IoT fill meters, temperature, battery sensors across municipal zones with collection scheduling.
  4. **Route Optimizer & Budget Simulator**: Interactive daily fleet BDT budget slider with fuel savings and CO2 offset calculations.
  5. **Notifications & Compliance Alerts**: Real-time environmental compliance alerts center.
- **Run Locally**:
  ```bash
  cd frontend
  npm install
  npm run dev
  # App runs on http://localhost:5173
  ```

---

## 🔒 Original Reference Files
All original reference HTML files (`dashboard.html`, `Dustbin.html`, `routeopt.html`, `notification.html`) and python script (`smart_waste_classifier.py`) are preserved in `original_echosortha/`.
