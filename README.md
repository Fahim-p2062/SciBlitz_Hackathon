# ♻️ EcoSortha: AI & Blockchain for a Circular Bangladesh
**Created for CUET Hackathon by SciBlitz**

---

## 🌟 Executive Summary & Project Details

**EcoSortha** is an end-to-end smart waste management and circular economy platform tailored for Bangladesh’s municipal landscape—including **Dhaka North City Corporation (DNCC)**, **Dhaka South City Corporation (DSCC)**, **Chittagong City Corporation (CCC)**, and educational campuses like **CUET**.

In rapidly growing urban areas across Bangladesh, traditional solid waste management relies on informal collection networks, unmonitored open dumps, and fixed collection routes that result in overflowing dustbins, unnecessary fuel expenditure, and unverified recycling data. **EcoSortha** solves these challenges by combining **Deep Learning Computer Vision** for automated waste segregation at the source with an **Immutable Blockchain Ledger** that guarantees transparent, tamper-proof audit trails for every kilogram of recycled material.

---

## 🎯 Mission & Vision

- **Our Mission**: To digitize informal and municipal waste sector operations across Bangladesh, replacing manual guesswork with real-time IoT sensors and AI vision classification to achieve maximum resource recovery.
- **Our Vision**: To build a transparent, circular economy ecosystem where waste generators, collection fleets, and recycling plants operate on a verifiable, blockchain-secured data pipeline.

---

## 💡 Comprehensive Module Explanations

### 1. 🤖 AI Smart Waste Classifier (Deep Learning & Computer Vision)
Traditional waste sorting suffers from cross-contamination and human error. EcoSortha deploys automated camera scanning checkpoints powered by OpenCV and convolutional neural networks (VGG19 architecture) that:
- **Analyze Live Video Feeds or Uploaded Sample Frames**: Detect individual objects passing under inspection cameras in sub-second timeframes.
- **Multi-Class Waste Segmentation**: Classifies waste into three core categories:
  - **Compostable / Organic**: Food scraps, biodegradable leaf and plant waste.
  - **Recyclables**: Plastics (PET/HDPE), glass bottles, aluminum cans, cardboard.
  - **General Trash**: Residual non-recyclable solid waste.
- **Visual Bounding Boxes & Confidence Scoring**: Annotates each detected object with high-contrast bounding boxes, label tags, and real-time confidence metrics (%), feeding verified collection tallies directly into the EcoSortha ledger.

### 2. 🔗 Blockchain Traceability Ledger
To establish trust among municipal corporations, private collectors, and recycling auditors, EcoSortha records all major collection milestones on a decentralized cryptographic ledger:
- **Immutable Block Minting**: Every time waste is collected, classified, and weighed, a block containing the transaction ID, source municipal zone, collector truck ID, waste type, and weight (in kilograms) is minted.
- **Cryptographic Hashing**: Blocks are linked via SHA-256 style cryptographic hashes (`previousHash` -> `hash`) to prevent retrospective tampering or false sustainability reporting.
- **Automated Auditability**: Municipal authorities can inspect block hashes, validator node IDs, and historical segregation efficiencies instantly.

### 3. 🗑️ IoT Smart Dustbin Telemetry & Ultrasonic Monitoring
Instead of waiting for citizens to report overflowing bins, EcoSortha tracks smart municipal dustbins equipped with simulated IoT ultrasonic sensors across urban zones:
- **Live Fill Percentage Gauges**: Monitors fill levels from `0%` to `100%`, dynamically color-coding bins as `NORMAL`, `WARNING` (70–84%), or `CRITICAL` (≥85%).
- **Environmental & Hardware Diagnostics**: Continuously records internal bin temperature (°C) to prevent combustion hazards and tracks sensor battery levels.
- **Automated Dispatch**: Enables one-click truck collection scheduling that resets bin telemetry upon collection.

### 4. 🗺️ AI Route Optimizer & Municipal Budget Simulator
Collection trucks driving fixed routes waste fuel and emit avoidable greenhouse gases. EcoSortha incorporates a Traveling Salesperson Problem (TSP) routing heuristic:
- **Dynamic Fleet Allocation via Budget Slider**: Authorities set their daily operational BDT budget (`৳ 15,000` to `৳ 95,000`). The engine automatically calculates how many collection trucks can be deployed within budget constraints.
- **Priority-Weighted Routing**: Prioritizes `CRITICAL` (>85% full) dustbins first, computing optimized ordered stops with precise arrival ETAs.
- **Eco-Impact Metrics**: Quantifies real-time distance traveled (km), estimated fuel consumed (liters), and total **CO₂ emissions saved (kg)** compared to unoptimized collection runs.

### 5. 🔔 Environmental Compliance & Overflow Alert Center
- Delivers real-time alerts categorized by severity (`CRITICAL`, `WARNING`, `INFO`).
- Highlights urgent municipal overflow events, blockchain verification milestones, and regional recycling efficiency benchmarks.

---

## 🏛️ Project Structure

```
SciBlitz_Hackathon/
├── backend_python/            # Python FastAPI AI & Computer Vision Microservice
│   ├── main.py                # AI classification vision logic & TSP route optimization API
│   └── requirements.txt       # Python dependencies (FastAPI, OpenCV, NumPy, Pydantic)
├── server/                    # TypeScript + Express + Mongoose Backend Server
│   ├── src/
│   │   ├── models/            # Mongoose Schemas (Dustbin, LedgerBlock, RoutePlan, NotificationItem)
│   │   ├── routes/api.ts      # REST endpoints + resilient in-memory database fallback
│   │   └── index.ts           # Express server initialization & MongoDB connection
│   ├── package.json
│   └── tsconfig.json
├── frontend/                  # React + Vite + TypeScript Glassmorphic Web Application
│   ├── src/
│   │   ├── pages/             # DashboardPage, ClassifierPage, DustbinsPage, RouteOptimizerPage, NotificationsPage
│   │   ├── App.tsx            # Main application shell, header, and theme manager
│   │   └── index.css          # Rich circular economy styling & custom CSS tokens
│   └── package.json
└── original_echosortha/       # Original reference prototype HTML & Python files
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Key Role |
| :--- | :--- | :--- |
| **Frontend Web App** | React 18, Vite, TypeScript, Vanilla CSS | Interactive glassmorphic UI, live webcam classification, charts, real-time telemetry |
| **Backend API Server** | Node.js, Express, TypeScript, Mongoose | Data modeling, REST APIs, ledger management, resilient database connection |
| **Database** | MongoDB / Mongoose ODM | Persistent storage for dustbin telemetry, ledger blocks, route plans, and alerts |
| **AI & Optimization Service** | Python 3, FastAPI, OpenCV, NumPy | Deep Learning vision classification simulation, bounding box rendering, TSP routing |

---

## 🚀 Getting Started & Local Execution

Follow these steps to run all three services simultaneously locally:

### Step 1: Start the Python AI & Route Optimization Service
```bash
cd backend_python
pip install -r requirements.txt
python main.py
# Service runs at http://localhost:8000
```

### Step 2: Start the TypeScript + Mongoose Backend API Server
```bash
cd server
npm install
npm run dev
# Server runs at http://localhost:5000
# Note: Automatically connects to local MongoDB or switches to resilient in-memory seed mode if offline.
```

### Step 3: Start the React + TypeScript Frontend Application
```bash
cd frontend
npm install
npm run dev
# Web application launches at http://localhost:5173
```

---

## 👥 Contributors
- **Team**: SciBlitz
- **Event**: CUET Hackathon
- **Repository**: [https://github.com/Fahim-p2062/SciBlitz_Hackathon](https://github.com/Fahim-p2062/SciBlitz_Hackathon)
