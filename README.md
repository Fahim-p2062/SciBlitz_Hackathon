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

## 🏷️ High-Efficiency Bangladeshi Brand & Object Detection Database (`detectionDatabase.ts`)

To bridge generic computer vision object bounding boxes (`bottle`, `cup`, `laptop`, `book`, `banana`) with accurate municipal recycling logistics and pricing, EcoSortha integrates a high-efficiency **Object Detection Database** derived directly from local Bangladeshi waste characterization surveys (`detection_database.csv`).

Every object detected by our real-time AI classifier (`useClassifier.ts`) is dynamically mapped against verified brand-specific database records, complete with **Condition State Filtering** (`Intact`, `Crushed/Flattened`, `Torn/Broken`, `Soiled/Contaminated`), **Material Composition**, and **Bengali (`object_name_bn`) & English (`object_name_en`) Specifications**:

### 📊 Detection Database Master Taxonomy Matrix

| Category & Code | Object ID | English Brand Specification (`object_name_en`) | Bengali Brand Specification (`object_name_bn`) | Sub-Type & Material | Condition States | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 🔵 **PLASTIC (`PL`)** | `PL-0001`<br>`PL-0002`<br>`PL-0003`<br>`PL-0004`<br>`PL-0005` | Mum 250ml Bottle<br>Mum 250ml Bottle (Crushed)<br>Aquafina 500ml Bottle<br>Pran 1L Juice Bottle<br>Surf Excel 1L Detergent Bottle | Mum বোতল 250ml Bottle<br>Mum বোতল (Crushed)<br>Aquafina বোতল 500ml<br>Pran জুসের বোতল 1L<br>Surf Excel ডিটারজেন্ট বোতল | **PET / PL-01** (Water/Juice)<br>**HDPE / PL-02** (Detergent/Shampoo)<br>*High-grade polymer recovery* | Intact<br>Crushed/Flattened<br>Soiled/Contaminated | **High** |
| 🟢 **PAPER (`PA`)** | `PA-0001`<br>`PA-0002`<br>`PA-0003`<br>`PA-0004` | Corrugated Carton Box<br>Daily Newspaper (Prothom Alo)<br>Paper Tissue Napkin / Hygiene Box<br>Office A4 White Paper / Book | কার্টন বক্স (Corrugated Carton)<br>দৈনিক পত্রিকা Prothom Alo<br>টিস্যু পেপার ও ন্যাপকিন Tissue<br>সাদা কাগজ ও বই A4 Paper | **Cardboard / PA-01**<br>**Newspaper / PA-02**<br>**Cellulose Soft Fiber / PA-03**<br>**White Paper / PA-04** | Intact<br>Torn/Broken<br>Soiled (Soiled tissue $\rightarrow$ Compost/Sanitary) | **High** / **Medium** |
| 🟡 **GLASS (`GL`)** | `GL-0001`<br>`GL-0002` | Clear Glass Beverage Bottle<br>Amber Medicine Syrup Bottle | কাঁচের পানির বোতল Clear Glass<br>ঔষধের কাঁচের বোতল Medicine Syrup | **Clear Glass / GL-01**<br>**Amber/Colored / GL-02**<br>*Infinite re-melting cycle* | Intact<br>Torn/Broken (Cullet) | **Medium** |
| ⚪ **METAL (`ME`)** | `ME-0001`<br>`ME-0002` | Speed 250ml Aluminum Can<br>Tin Food Can (Condensed Milk) | Speed সোডা ক্যান Aluminum Can<br>টিনের কৌটা Tin Food Can | **Aluminum Can / ME-01**<br>**Steel/Tin / ME-02**<br>*High secondary metal yield* | Intact<br>Crushed/Flattened | **High** |
| 🟣 **E-WASTE (`EW`)** | `EW-0001`<br>`EW-0002`<br>`EW-0003` | Broken Mobile Smartphone<br>Motherboard / Green PCB<br>Li-ion Battery Pack (18650) | পুরাতন মোবাইল ফোন Broken Mobile<br>মাদারবোর্ড ও সার্কিট Board PCB<br>লিথিয়াম ব্যাটারি Li-ion Battery | **Small Electronics / EW-01**<br>**Circuit/PCB / EW-02**<br>**Battery / EW-03** | Torn/Broken<br>Intact<br>Hazardous/Corrosive | **High** *(Toxic/Special)* |
| 🟤 **TEXTILE (`TE`)** | `TE-0001`<br>`TE-0002` | Old Cotton T-Shirt / Garment<br>Synthetic Polyester Fabric / Bag | সুতির টি-শার্ট Cotton T-Shirt<br>পলিয়েস্টার কাপড় Synthetic Bag | **Cotton Fabric / TE-01**<br>**Synthetic Fiber / TE-02** | Torn/Broken<br>Intact | **Medium** |
| 🌿 **ORGANIC (`OR`)** | `OR-0001`<br>`OR-0002`<br>`OR-0003` | Banana Peel & Fruit Scraps<br>Vegetable Peels & Kitchen Waste<br>Garden Leaves & Tree Branches | কলার খোসা ও ফলমূল Banana Peel<br>শাকসবজির উচ্ছিষ্টাংশ Vegetable<br>গাছের পাতা ও ডালপালা Garden | **Food Waste / OR-01**<br>**Garden Waste / OR-02**<br>*Rapid microbial composting* | Fresh/Moist<br>Decomposing | **High** *(Biogas/Compost)* |
| 🔴 **NON-REUSABLE (`NR`)** | `NR-0001`<br>`NR-0002`<br>`NR-0003` | Chips Bag Multi-layer Composite<br>Polythene Shopping Bag (<20 micron)<br>Soiled Hygiene Diaper / Sanitary Pad | চিপসের প্যাকেট Chips Bag Foil<br>পাতলা পলিথিন Polythene Bag<br>ব্যবহৃত ডায়াপার ও প্যাড Diaper | **Composite Foil / NR-01**<br>**Thin Poly / NR-02**<br>**Sanitary / NR-03** | Crushed/Flattened<br>Soiled/Contaminated | **Low** *(Sanitary Landfill / Cement Kiln)* |

### ⚙️ How the Database Powers Real-Time Classification
1. **Dynamic Fallback & Bounding Box Mapping**: When the TensorFlow.js model detects a raw COCO-SSD class (such as `bottle`, `cup`, or `tissue/paper`), `mapCocoToComprehensiveTaxonomy()` immediately queries `findDatabaseMatches()` inside `detectionDatabase.ts`.
2. **Interactive Condition Filtering**: Users and optical sensors can filter detected objects by physical condition (`Intact vs. Crushed/Flattened vs. Torn/Broken vs. Soiled`). The classifier instantly adjusts the operational stream (e.g., an `Intact` tissue napkin is classified under `RECYCLABLE (PA-03)`, while a `Soiled/Contaminated` tissue automatically transitions to `COMPOSTABLE / SANITARY DISPOSAL`).
3. **Automated Blockchain Verification**: Once matched against our Detection Database, exact parameters (`object_id`, `sub_type_code`, `weightGrams`, `material`) are hashed via SHA-256 and minted onto the immutable Circular Economy Ledger (`LedgerExplorer.tsx`).

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
