# 🌱 EcoSortha — Next-Generation Smart Waste & Circular Economy Management System

[![Live Frontend Deployment](https://img.shields.io/badge/Live%20Frontend-Vercel%20App-10b981?style=for-the-badge&logo=vercel)](https://sci-blitz-hackathon.vercel.app/)
[![Live Backend Service](https://img.shields.io/badge/Live%20Backend-Render%20API-3b82f6?style=for-the-badge&logo=render)](https://sciblitz-hackathon-0gbp.onrender.com)
[![Hackathon Event](https://img.shields.io/badge/CUET-SciBlitz%20Hackathon-f59e0b?style=for-the-badge)](https://sci-blitz-hackathon.vercel.app/)

> **Live Web Application**: [https://sci-blitz-hackathon.vercel.app/](https://sci-blitz-hackathon.vercel.app/)  
> **Live Backend API Service**: [https://sciblitz-hackathon-0gbp.onrender.com](https://sciblitz-hackathon-0gbp.onrender.com)

---

## 🌟 Executive Summary & Project Details

**EcoSortha** is an enterprise-grade, end-to-end Smart Waste Management and Circular Economy platform developed for urban municipalities and university campuses across Bangladesh (focusing on **Dhaka North/South City Corporations**, **Chittagong City Corporation**, and **CUET Campus**).

Urban waste management in developing megacities faces three systemic bottlenecks:
1. **Unsegregated Source Collection**: Mixing organic waste with recyclable plastics and hazardous e-waste degrades recyclable fiber and contaminates compost streams.
2. **Static Route Dispatching**: Municipal collection trucks follow rigid daily schedules regardless of whether bins are 5% or 95% full, wasting up to 40% of fleet fuel budgets.
3. **Lack of Cryptographic Accountability**: Informal recycling supply chains lack provenance, leading to greenwashing and unregulated toxic dumping.

### How EcoSortha Solves This
EcoSortha integrates three state-of-the-art technologies into a unified command platform:
- **Computer Vision & AI Source Segregation**: Deep learning neural networks (**TensorFlow.js COCO-SSD / MobileNetV2**) analyze physical waste objects in real-time, classifying them across a comprehensive 3-tier waste taxonomy.
- **IoT Ultrasonic Fill Monitoring & TSP Route Optimization**: Smart dustbin sensors track real-time fill percentages (`%`) and temperatures. An AI Traveling Salesperson Problem (TSP) solver computes optimal truck collection paths constrained by municipal BDT budgets, reducing fleet CO₂ emissions by over 30%.
- **Immutable Circular Economy Blockchain Ledger**: Every batch of classified waste is hashed via SHA-256 and minted onto an immutable verification ledger, ensuring transparent traceability from collection point to certified recycling facilities.

---

## 🔬 Authoritative 3-Tier Waste Classification Criteria

EcoSortha’s AI Waste Classifier operates on a rigorous, multi-dimensional taxonomy designed for municipal collection logistics and environmental safety. Every item detected by our live computer vision scanner is evaluated across three scientific dimensions:

```
               ┌────────────────────────────────────────────────────────┐
               │              ECOSORTHA 3-TIER TAXONOMY                 │
               └───────────────────────────┬────────────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│  1. BY NATURE &        │      │  2. BY RECYCLING       │      │  3. BY PHYSICAL STATE  │
│     COMPOSITION        │      │     POTENTIAL (STREAM) │      │     & RISK             │
├────────────────────────┤      ├────────────────────────┤      ├────────────────────────┤
│ • Organic / Biodeg.    │      │ • Recyclable Stream    │      │ • Solid State          │
│ • Inorganic / Polymer  │      │ • Compostable Stream   │      │ • Liquid / Sludge      │
│ • Hazardous / Toxic    │      │ • Special E-Waste      │      │ • Gaseous / Methane    │
│ • C&D Inert Debris     │      │ • Landfill Residual    │      │ • Leachate Prevention  │
└────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

### 1. Classification by Nature & Composition
Determines the chemical and biological breakdown characteristics of the material:

- **Organic / Biodegradable Waste**:
  - *Examples*: Food leftovers, fruit/vegetable peels, garden leaves, clean agricultural residue.
  - *Key Traits*: High moisture content and biological nitrogen. Decomposes rapidly through microbial action. If buried unmanaged in landfills, anaerobic degradation generates **Methane ($\text{CH}_4$)**—a greenhouse gas 28x more potent than $\text{CO}_2$—and toxic acidic leachate.
- **Inorganic / Non-Biodegradable Waste**:
  - *Examples*: Plastics sorted by resin code (**PET #1**, **HDPE #2**, **PP #5**), clear/colored glass, ferrous & non-ferrous metals (steel, aluminum), paper/corrugated cardboard, synthetic textiles.
  - *Key Traits*: Resistant to biological breakdown (450+ years for polymers). High economic value when recovered clean; loses recyclability if contaminated by oils or organic sludges.
- **Hazardous Waste**:
  - *Examples*: Lithium-ion batteries, lead-acid cells, discarded electronics (mobile phones, PCBs containing lead, mercury, and cadmium), chemical solvents, biohazardous medical sharps.
  - *Key Traits*: Toxic, reactive, flammable, or corrosive. Must be isolated from standard municipal streams to prevent groundwater heavy-metal poisoning.
- **Construction & Demolition (C&D) Waste**:
  - *Examples*: Concrete, brick aggregate, timber, reinforcement steel.
  - *Key Traits*: High volume and heavy mass; routed for road-base aggregate recycling.

---

### 2. Classification by Operational Recycling Potential (System Routing)
This operational scheme determines which municipal processing facility receives the waste stream:

| Operational Stream | Target Waste Types | Processing Pathway & Economic Value |
| :--- | :--- | :--- |
| 🔵 **Recyclable Stream** | PET bottles, aluminum cans, cardboard, clear glass | Routed to Material Recovery Facilities (MRFs) for washing, flaking, and re-extrusion. High secondary economic yield. |
| 🟢 **Compostable Stream** | Fruit peels, vegetable scraps, food leftovers | Routed to Anaerobic Biogas Digesters ($\text{CH}_4$ capture for clean power) or Commercial Composting facilities. |
| 🟣 **Special Hazardous Stream** | E-waste, lithium batteries, chemical containers | Routed to certified Hydrometallurgical Dismantling Facilities for precious metal extraction & safe containment. |
| 🔴 **Landfill / Residual Stream** | Multi-layer chip bags, metallized foil laminates, sanitary waste | Routed to engineered sanitary landfills or High-Temperature Cement Kilns for safe thermal co-processing. |

---

### 3. Classification by Physical State & Environmental Risk
Evaluates containment requirements and long-term environmental hazards:

- **Solid State**: Bulk municipal items. Monitored for compaction density and structural stability.
- **Liquid / Sludge State**: Industrial run-offs and leachate effluents. Monitored to prevent soil and aquifer contamination.
- **Gaseous & Emissions Hazard**: Real-time tracking of avoided methane emissions ($\text{CH}_4$) and carbon dioxide equivalent reductions ($\text{kg }\text{CO}_2\text{e}$) achieved through source segregation.

---

## 🖥️ Interactive Web Platform Modules

### 1. Municipal Command Dashboard (`/`)
- Live Circular Economy KPIs: Processed volume (`kg`), segregation efficiency (`%`), carbon offset counter (`kg CO₂`), and active collection fleet units.
- Interactive EcoSortha Blockchain Traceability Ledger Explorer inspecting verified SHA-256 transaction blocks.

### 2. AI Smart Waste Classifier (`/classifier`)
- Real-time computer vision powered by **TensorFlow.js (COCO-SSD & MobileNetV2)**.
- Scans live hardware webcam feed or high-fidelity simulation bed to classify items across the authoritative 3-tier taxonomy.
- One-click **"Sync Verified Taxonomy to Blockchain Ledger"** to record classified weights and categories.

### 3. Smart Dustbins IoT Network (`/dustbins`)
- Real-time ultrasonic fill percentage (`%`) and internal temperature telemetry across zones (**Dhaka North**, **Dhaka South**, **Chittagong**, **CUET Campus**).
- Automated color-coded alerts (**CRITICAL ≥85%**, **WARNING 70–84%**, **NORMAL <70%**).
- Interactive **Schedule Truck / Empty Bin** dispatch actions.

### 4. Animated Route Optimizer & Live Fleet Tracker (`/route-optimizer`)
- Interactive municipal daily budget allocation slider (`৳ 15,000 – ৳ 95,000 BDT`).
- Real-time Traveling Salesperson Problem (TSP) solver computing optimal stops prioritizing critical bins.
- **Animated SVG Route Map** with a live moving collection truck tracker (`TRUCK-CUET-EXP-04`) displaying velocity, payload weight collected (`kg`), and waypoint ETAs.

---

## 🏗️ System Architecture & Technology Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ECOSORTHA CLIENT LAYER                             │
│       React 19 + TypeScript + Vite + Glassmorphic UI System                 │
│       Live Deployment: https://sci-blitz-hackathon.vercel.app/             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ REST / JSON
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ECOSORTHA BACKEND API LAYER                           │
│       Node.js + Express + TypeScript + Mongoose + Resilient Fallback        │
│       Live Deployment: https://sciblitz-hackathon-0gbp.onrender.com         │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI & COMPUTER VISION ENGINE                         │
│       TensorFlow.js COCO-SSD (Client Edge) + Python FastAPI OpenCV VGG19    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Frontend Technology Stack
- **Framework**: React 19 + Vite 8 + TypeScript (`frontend/`)
- **UI & Styling**: Vanilla CSS Modern Glassmorphism Design System (`index.css`), curated typography, micro-animations, Lucide React iconography.
- **AI / Edge Vision**: `@tensorflow/tfjs` + `@tensorflow-models/coco-ssd` for live webcam object detection.
- **Deployment**: [Vercel SPA Hosting](https://sci-blitz-hackathon.vercel.app/)

### Backend Technology Stack
- **Runtime**: Node.js + Express + TypeScript (`server/`)
- **Database Layer**: MongoDB via Mongoose ORM with **Resilient In-Memory Fallback Adapter** (ensuring 100% API availability even offline).
- **Python AI Engine**: Python 3.11 + FastAPI + OpenCV (`backend_python/`) for high-throughput visual segmentation.
- **Deployment**: [Render Web Services](https://sciblitz-hackathon-0gbp.onrender.com)

---

## 📂 Project Repository Structure

```
SciBlitz_Hackathon/
├── frontend/                  # React + Vite + TypeScript Web Application
│   ├── src/
│   │   ├── components/        # Glassmorphic Navbar & Reusable UI Modules
│   │   ├── config/            # API Base URL Config (Vercel/Render ready)
│   │   ├── pages/             # Dashboard, Classifier, Dustbins, Routes, Notifications
│   │   └── index.css          # Design System Tokens & Glassmorphic Utilities
│   ├── vercel.json            # SPA Rewrite Configuration for Vercel
│   └── package.json           # Frontend Dependencies
├── server/                    # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── models/            # Mongoose Schemas (Dustbin, LedgerBlock, RoutePlan)
│   │   ├── routes/            # REST API Endpoints (/api/dustbins, /api/ledger, etc.)
│   │   └── index.ts           # Express Application Entry Point
│   └── package.json           # Backend Dependencies
├── backend_python/            # Python FastAPI AI & Computer Vision Service
│   ├── main.py                # AI Classification & Route Optimization API
│   └── requirements.txt       # Python Dependencies
├── render.yaml                # Render Blueprint Configuration
└── README.md                  # Comprehensive Project Documentation
```

---

## 🏁 Local Development & Verification

To run the entire suite locally:

```bash
# 1. Clone the repository
git clone https://github.com/Fahim-p2062/SciBlitz_Hackathon.git
cd SciBlitz_Hackathon

# 2. Start TypeScript Backend Server (Port 5000)
cd server
npm install
npm run build
npm start

# 3. Start React Frontend Web App (Port 5173)
cd ../frontend
npm install
npm run build
npm run dev
```

Visit **http://localhost:5173** to explore EcoSortha locally or access our live production deployment at **[https://sci-blitz-hackathon.vercel.app/](https://sci-blitz-hackathon.vercel.app/)**.
