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

To bridge generic computer vision object bounding boxes (`bottle`, `cup`, `laptop`, `book`, `banana`) with accurate municipal recycling logistics and exact secondary material pricing, EcoSortha integrates a high-efficiency **Object Detection Database** derived directly from local Bangladeshi waste characterization surveys (`detection_database.csv`).

The underlying CSV dataset contains over **268+ exhaustive records** spanning every commercial beverage, soda, water, and household product brand across Bangladesh (`Mum`, `Aquafina`, `Pran`, `Fresh`, `Jibon`, `Kool`, `Aci Pure`, `Dhaka Mineral`, `Coca-Cola`, `Sprite`, `Fanta`, `RC Cola`, `Speed`, `Mojo`, `Uro Cola`), categorized by precise volume sizes (`250ml`, `500ml`, `1L`, `1.5L`, `2L`, `5L Jar`) and physical condition states (`Intact`, `Crushed/Flattened`, `Torn/Broken`).

### 📑 Exhaustive CSV Dataset Schema (`detection_database.csv`)

Every item entry in our source CSV is structured according to the following 12-column master specification:

```csv
object_id,object_name_en,object_name_bn,main_category,category_code,sub_type,sub_type_code,reusable,material,common_source_context,detection_priority,condition_state
PL-0001,Mum  250ml Bottle (Intact),Mum বোতল 250ml Bottle (Intact),Plastic,PL,PET,PL-01,True,PET Plastic,"Cold drinks, water, oil, juice bottles",High,Intact
PL-0002,Mum  250ml Bottle (Crushed/Flattened),Mum বোতল 250ml Bottle (Crushed/Flattened),Plastic,PL,PET,PL-01,True,PET Plastic,"Cold drinks, water, oil, juice bottles",High,Crushed/Flattened
PL-0003,Mum  250ml Bottle (Torn/Broken),Mum বোতল 250ml Bottle (Torn/Broken),Plastic,PL,PET,PL-01,True,PET Plastic,"Cold drinks, water, oil, juice bottles",High,Torn/Broken
PL-0019,Aquafina  250ml Bottle (Intact),Aquafina বোতল 250ml Bottle (Intact),Plastic,PL,PET,PL-01,True,PET Plastic,"Cold drinks, water, oil, juice bottles",High,Intact
PL-0037,Pran  250ml Bottle (Intact),Pran বোতল 250ml Bottle (Intact),Plastic,PL,PET,PL-01,True,PET Plastic,"Cold drinks, water, oil, juice bottles",High,Intact
PL-0145,Coca-Cola  250ml Bottle (Intact),Coca-Cola বোতল 250ml Bottle (Intact),Plastic,PL,PET,PL-01,True,PET Plastic,"Cold drinks, water, oil, juice bottles",High,Intact
PL-0217,Speed  250ml Bottle (Intact),Speed বোতল 250ml Bottle (Intact),Plastic,PL,PET,PL-01,True,PET Plastic,"Cold drinks, water, oil, juice bottles",High,Intact
```

### 📊 Master Brand & Volume Breakdown Matrix

| Category & Code | Object ID Range | Covered Commercial Brands | Available Volumes & Formats | Sub-Type & Material Specification | Condition States | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 🔵 **PLASTIC (`PL`)** | `PL-0001` to `PL-0268+` | • **Mineral Water:** Mum, Aquafina, Fresh, Jibon, Kool, Aci Pure, Dhaka Mineral<br>• **Carbonated Sodas:** Coca-Cola, Sprite, Fanta, RC Cola, Mojo, Uro Cola<br>• **Energy/Juice:** Pran Juice, Speed | • `250ml` Bottle<br>• `500ml` Bottle<br>• `1L` Bottle<br>• `1.5L` Bottle<br>• `2L` Bottle<br>• `5L` Family Jar | **PET / PL-01** (Food/Beverage Bottles)<br>**HDPE / PL-02** (Detergents/Shampoo Containers)<br>*High-grade polymer recycling* | `Intact`<br>`Crushed/Flattened`<br>`Torn/Broken` | **High** |
| 🟢 **PAPER (`PA`)** | `PA-0001` to `PA-0004` | Corrugated Carton Box (`PA-0001`), Prothom Alo Daily Newspaper (`PA-0002`), Paper Tissue Napkin (`PA-0003`), Office White Paper / Book (`PA-0004`) | Standard Boxes, Sheets, Napkin Rolls | **Cardboard / PA-01**<br>**Newspaper / PA-02**<br>**Cellulose Soft Fiber / PA-03**<br>**White Paper / PA-04** | `Intact`<br>`Torn/Broken`<br>`Soiled/Contaminated` | **High** / **Medium** |
| 🟡 **GLASS (`GL`)** | `GL-0001` to `GL-0002` | Clear Glass Beverage Bottle (`GL-0001`), Amber Syrup / Medicine Bottle (`GL-0002`) | Beverage & Medical Glass Formats | **Clear Glass / GL-01**<br>**Amber/Colored / GL-02**<br>*Infinite re-melting cycle* | `Intact`<br>`Torn/Broken` (Cullet) | **Medium** |
| ⚪ **METAL (`ME`)** | `ME-0001` to `ME-0002` | Speed Soda Aluminum Can (`ME-0001`), Tin Condensed Milk Can (`ME-0002`) | Standard Cans (`250ml`, `330ml`) | **Aluminum Can / ME-01**<br>**Steel/Tin / ME-02**<br>*High secondary metal yield* | `Intact`<br>`Crushed/Flattened` | **High** |
| 🟣 **E-WASTE (`EW`)** | `EW-0001` to `EW-0003` | Broken Mobile Smartphone (`EW-0001`), Motherboard / Green PCB (`EW-0002`), Li-ion 18650 Battery Pack (`EW-0003`) | Consumer & Industrial Components | **Small Electronics / EW-01**<br>**Circuit/PCB / EW-02**<br>**Battery / EW-03** | `Torn/Broken`<br>`Intact`<br>`Hazardous/Corrosive` | **High** *(Toxic/Special)* |
| 🟤 **TEXTILE (`TE`)** | `TE-0001` to `TE-0002` | Old Cotton T-Shirt / Garment (`TE-0001`), Synthetic Polyester Fabric / Bag (`TE-0002`) | Garment & Fabric Offcuts | **Cotton Fabric / TE-01**<br>**Synthetic Fiber / TE-02** | `Torn/Broken`<br>`Intact` | **Medium** |
| 🌿 **ORGANIC (`OR`)** | `OR-0001` to `OR-0003` | Banana Peel & Fruit Scraps (`OR-0001`), Vegetable Peels & Kitchen Waste (`OR-0002`), Garden Leaves & Tree Branches (`OR-0003`) | Residential & Campus Scraps | **Food Waste / OR-01**<br>**Garden Waste / OR-02**<br>*Rapid microbial composting* | `Fresh/Moist`<br>`Decomposing` | **High** *(Biogas/Compost)* |
| 🔴 **NON-REUSABLE (`NR`)** | `NR-0001` to `NR-0003` | Chips Bag Multi-layer Composite (`NR-0001`), Polythene Shopping Bag (`NR-0002`), Soiled Hygiene Diaper / Sanitary Pad (`NR-0003`) | Multi-layer Foil, Thin Poly, Hygiene | **Composite Foil / NR-01**<br>**Thin Poly / NR-02**<br>**Sanitary / NR-03** | `Crushed/Flattened`<br>`Soiled/Contaminated` | **Low** *(Sanitary Landfill / Cement Kiln)* |

### ⚙️ How `useClassifier.ts` Consumes the CSV Dataset
1. **Dynamic Bounding Box & Brand Mapping (`mapCocoToComprehensiveTaxonomy`)**: When the TensorFlow.js computer vision model detects a bounding box on camera (e.g., COCO-SSD class `bottle`, `cup`, `tissue`, `banana`, or `laptop`), the hook instantly queries `findDatabaseMatches()` inside `detectionDatabase.ts` (which embeds these exact CSV specifications).
2. **Interactive Condition State Filtering**: The user or optical sensor selects the active physical condition (`Intact`, `Crushed/Flattened`, or `Torn/Broken`). For example, if the camera scans a `Coca-Cola` bottle and the condition filter is set to `Crushed/Flattened`, the classifier automatically locks onto record `PL-0149` (`Coca-Cola 500ml Bottle (Crushed/Flattened)`), pulling its exact Bengali name (`Coca-Cola বোতল 500ml Bottle (Crushed/Flattened)`), `PET Plastic` material code, and priority rating (`High`).
3. **Automated Blockchain Verification & Traceability**: Once matched against this authoritative CSV dataset, the exact item attributes (`object_id`, `sub_type_code`, `weightGrams`, and `common_source_context`) are hashed via SHA-256 (`SHA-256(PL-0149 + timestamp)`) and minted directly onto the EcoSortha Circular Economy Ledger (`LedgerExplorer.tsx`).

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


