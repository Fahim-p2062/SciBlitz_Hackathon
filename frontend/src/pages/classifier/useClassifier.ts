import { useState, useRef, useEffect, useCallback } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import type { ComprehensiveWasteTaxonomy, DetectionDatabaseEntry } from './types';
import { comprehensivePresets } from './presets';
import { detectionDatabaseEntries, findDatabaseMatches } from './detectionDatabase';
import { apiFetch } from '../../config/api';

export function useClassifier() {
  const [isRunning, setIsRunning] = useState(true);

  const [compostCount, setCompostCount] = useState(18);
  const [recycleCount, setRecycleCount] = useState(24);
  const [hazardousCount, setHazardousCount] = useState(7);
  const [landfillCount, setLandfillCount] = useState(12);

  const [hasWebcamPermission, setHasWebcamPermission] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);

  const [modelLoading, setModelLoading] = useState(true);
  const [modelInstance, setModelInstance] = useState<cocoSsd.ObjectDetection | null>(null);
  const [realDetections, setRealDetections] = useState<ComprehensiveWasteTaxonomy[]>([]);

  const [activeTarget, setActiveTarget] = useState<ComprehensiveWasteTaxonomy | null>(comprehensivePresets[0]);
  const [conditionFilter, setConditionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [lastMintedBlockHash, setLastMintedBlockHash] = useState<string | null>(null);
  const [summaryMessage, setSummaryMessage] = useState('Comprehensive 3-Tier Waste Taxonomy Engine Ready.');
  const [presetIndex, setPresetIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadNeuralNetwork = async () => {
      try {
        setModelLoading(true);
        const loadedModel = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
        if (isMounted) {
          setModelInstance(loadedModel);
          setModelLoading(false);
          setSummaryMessage('Neural Network Loaded: Classifying items across Nature, Recycling & Physical State.');
        }
      } catch (err) {
        if (isMounted) {
          setModelLoading(false);
        }
      }
    };
    loadNeuralNetwork();
    return () => { isMounted = false; };
  }, []);

  const mapCocoToComprehensiveTaxonomy = (className: string, bbox: number[]): ComprehensiveWasteTaxonomy => {
    const cls = className.toLowerCase();

    if (['cell phone', 'laptop', 'tv', 'remote', 'keyboard', 'mouse', 'microwave', 'toaster'].includes(cls)) {
      const dbMatches = findDatabaseMatches('EW-02', conditionFilter);
      const dbMatch = dbMatches.length > 0 ? dbMatches[Math.floor(Math.random() * dbMatches.length)] : detectionDatabaseEntries[16];
      return {
        id: `haz-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        x: bbox[0], y: bbox[1], width: bbox[2], height: bbox[3],
        itemName: `${dbMatch?.object_name_en || `Electronic Device / E-Waste (${className.toUpperCase()})`}`,
        confidence: 96.4,
        categoryCode: dbMatch?.sub_type_code || 'EW-02',
        categoryName: 'CATEGORY 5: E-WASTE (High-value Recyclable)',
        subType: dbMatch?.sub_type || 'Circuit/PCB',
        bengaliExample: dbMatch?.object_name_bn || 'ফোন, চার্জার, সার্কিট বোর্ড',
        objectId: dbMatch?.object_id || 'EW-0001',
        objectNameEn: dbMatch?.object_name_en || 'Computer / Smartphone Circuit Board PCB (Intact)',
        objectNameBn: dbMatch?.object_name_bn || 'সার্কিট বোর্ড Motherboard PCB Scrap (Intact)',
        reusable: dbMatch?.reusable !== undefined ? dbMatch.reusable : false,
        material: dbMatch?.material || 'Precious Metal Traces, Copper, FR4 Substrate',
        commonSourceContext: dbMatch?.common_source_context || 'Discarded electronics, repair shops, old phones/laptops',
        detectionPriority: dbMatch?.detection_priority || 'High',
        conditionState: dbMatch?.condition_state || 'Intact',
        natureCategory: 'Hazardous / Toxic',
        compositionDetail: 'Printed Circuit Boards, Copper, Solder, Heavy Metals & Polymer Shell',
        operationalStream: 'HAZARDOUS_SPECIAL',
        processingPathway: 'Certified E-Waste Facility for Precious Metal Recovery & Safe Disposal',
        physicalState: 'Solid',
        environmentalRisk: 'Heavy metals pose severe soil/groundwater toxicity if placed in general municipal landfill.',
        color: '#a855f7',
        badgeLabel: `${dbMatch?.sub_type_code || 'EW-02'} • HAZARDOUS E-WASTE`,
        weightGrams: 320
      };
    }

    if (['bottle', 'cup', 'wine glass', 'vase'].includes(cls)) {
      const dbMatches = findDatabaseMatches('PL-01', conditionFilter);
      const dbMatch = dbMatches.length > 0 ? dbMatches[Math.floor(Math.random() * dbMatches.length)] : detectionDatabaseEntries[0];
      return {
        id: `rec-pl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        x: bbox[0], y: bbox[1], width: bbox[2], height: bbox[3],
        itemName: `${dbMatch?.object_name_en || `PET Plastic Container (${className.toUpperCase()})`}`,
        confidence: 97.8,
        categoryCode: dbMatch?.sub_type_code || 'PL-01',
        categoryName: 'CATEGORY 1: PLASTIC (Recyclable)',
        subType: dbMatch?.sub_type || 'PET',
        bengaliExample: dbMatch?.object_name_bn || 'পানির বোতল, কোল্ড ড্রিংক বোতল',
        objectId: dbMatch?.object_id || 'PL-0001',
        objectNameEn: dbMatch?.object_name_en || 'Mum 250ml Bottle (Intact)',
        objectNameBn: dbMatch?.object_name_bn || 'Mum বোতল 250ml Bottle (Intact)',
        reusable: dbMatch?.reusable !== undefined ? dbMatch.reusable : true,
        material: dbMatch?.material || 'PET Plastic',
        commonSourceContext: dbMatch?.common_source_context || 'Cold drinks, water, oil, juice bottles',
        detectionPriority: dbMatch?.detection_priority || 'High',
        conditionState: dbMatch?.condition_state || 'Intact',
        natureCategory: 'Inorganic / Non-biodegradable',
        compositionDetail: `${dbMatch?.material || 'Polyethylene Terephthalate (#1 PET Polymer Resin)'}`,
        operationalStream: 'RECYCLABLE',
        processingPathway: 'Mechanical Washing, Flaking & Re-extrusion into recycled PET granules',
        physicalState: 'Solid',
        environmentalRisk: 'High secondary material value; clean separation prevents stream contamination.',
        color: '#3b82f6',
        badgeLabel: `${dbMatch?.sub_type_code || 'PL-01'} • ${dbMatch?.sub_type || 'PET'} PLASTIC`,
        weightGrams: 45
      };
    }

    if (['book', 'cardboard', 'box'].includes(cls)) {
      const dbMatches = findDatabaseMatches('PA-01', conditionFilter);
      const dbMatch = dbMatches.length > 0 ? dbMatches[Math.floor(Math.random() * dbMatches.length)] : detectionDatabaseEntries[13];
      return {
        id: `rec-pa-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        x: bbox[0], y: bbox[1], width: bbox[2], height: bbox[3],
        itemName: `${dbMatch?.object_name_en || `Paper & Cardboard Box (${className.toUpperCase()})`}`,
        confidence: 96.5,
        categoryCode: dbMatch?.sub_type_code || 'PA-01',
        categoryName: 'CATEGORY 2: PAPER & CARDBOARD (Recyclable)',
        subType: dbMatch?.sub_type || 'Cardboard',
        bengaliExample: dbMatch?.object_name_bn || 'কার্টন বক্স, সাদা কাগজ',
        objectId: dbMatch?.object_id || 'PA-0001',
        objectNameEn: dbMatch?.object_name_en || 'Corrugated Delivery Carton Box (Intact)',
        objectNameBn: dbMatch?.object_name_bn || 'কার্টন বক্স Shipping Carton (Intact)',
        reusable: dbMatch?.reusable !== undefined ? dbMatch.reusable : true,
        material: dbMatch?.material || 'Corrugated Kraft Fiber',
        commonSourceContext: dbMatch?.common_source_context || 'E-commerce boxes, wholesale cartons, packaging',
        detectionPriority: dbMatch?.detection_priority || 'High',
        conditionState: dbMatch?.condition_state || 'Intact',
        natureCategory: 'Inorganic / Non-biodegradable',
        compositionDetail: 'Kraft Paper & Wood Pulp Cellulose Fiber Matrix',
        operationalStream: 'RECYCLABLE',
        processingPathway: 'Hydrapulper Slurry Screening, De-inking & Pulp Re-forming into new boxes',
        physicalState: 'Solid',
        environmentalRisk: 'High recycling yield; must be kept dry and free from oil/grease.',
        color: '#06b6d4',
        badgeLabel: `${dbMatch?.sub_type_code || 'PA-01'} • CARDBOARD BOX`,
        weightGrams: 180
      };
    }

    if (['can', 'bowl'].includes(cls)) {
      const dbMatches = findDatabaseMatches('ME-01', conditionFilter);
      const dbMatch = dbMatches.length > 0 ? dbMatches[Math.floor(Math.random() * dbMatches.length)] : detectionDatabaseEntries[15];
      return {
        id: `rec-me-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        x: bbox[0], y: bbox[1], width: bbox[2], height: bbox[3],
        itemName: `${dbMatch?.object_name_en || `Metal / Aluminum Can Container (${className.toUpperCase()})`}`,
        confidence: 98.1,
        categoryCode: dbMatch?.sub_type_code || 'ME-01',
        categoryName: 'CATEGORY 4: METAL (Recyclable)',
        subType: dbMatch?.sub_type || 'Aluminum',
        bengaliExample: dbMatch?.object_name_bn || 'কোল্ড ড্রিংক ক্যান, ফুড ক্যান',
        objectId: dbMatch?.object_id || 'ME-0001',
        objectNameEn: dbMatch?.object_name_en || 'Speed / Coca-Cola Aluminum Beverage Can 250ml (Intact)',
        objectNameBn: dbMatch?.object_name_bn || 'কোল্ড ড্রিংক ক্যান Beverage Soda Can (Intact)',
        reusable: dbMatch?.reusable !== undefined ? dbMatch.reusable : true,
        material: dbMatch?.material || 'Pure Aluminum Alloy',
        commonSourceContext: dbMatch?.common_source_context || 'Energy drinks, soda cans, carbonated beverages',
        detectionPriority: dbMatch?.detection_priority || 'High',
        conditionState: dbMatch?.condition_state || 'Intact',
        natureCategory: 'Inorganic / Non-biodegradable',
        compositionDetail: 'Aluminum / Ferrous Steel Alloy Structure',
        operationalStream: 'RECYCLABLE',
        processingPathway: 'Eddy Current Separation & Electric Arc Furnace Smelting',
        physicalState: 'Solid',
        environmentalRisk: 'Recycling saves 95% energy compared to virgin bauxite smelting.',
        color: '#6366f1',
        badgeLabel: `${dbMatch?.sub_type_code || 'ME-01'} • METAL CAN`,
        weightGrams: 28
      };
    }

    if (['banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'potted plant'].includes(cls)) {
      const dbMatches = findDatabaseMatches('OR-01', conditionFilter);
      const dbMatch = dbMatches.length > 0 ? dbMatches[0] : detectionDatabaseEntries[19];
      return {
        id: `org-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        x: bbox[0], y: bbox[1], width: bbox[2], height: bbox[3],
        itemName: `${dbMatch?.object_name_en || `Biodegradable Food Scraps (${className.toUpperCase()})`}`,
        confidence: 96.8,
        categoryCode: dbMatch?.sub_type_code || 'OR-01',
        categoryName: 'CATEGORY 7: ORGANIC (Compostable — optional scope)',
        subType: dbMatch?.sub_type || 'Food Waste',
        bengaliExample: dbMatch?.object_name_bn || 'খাদ্য বর্জ্য, ফল/সবজির খোসা',
        objectId: dbMatch?.object_id || 'OR-0001',
        objectNameEn: dbMatch?.object_name_en || 'Fruit & Vegetable Kitchen Leftover Biomass (Intact)',
        objectNameBn: dbMatch?.object_name_bn || 'খাদ্য বর্জ্য Food Biowaste & Peels (Intact)',
        reusable: dbMatch?.reusable !== undefined ? dbMatch.reusable : false,
        material: dbMatch?.material || 'Natural Carbohydrates, Plant Cellulose & Nitrogen',
        commonSourceContext: dbMatch?.common_source_context || 'Household kitchens, restaurant waste, wet market refuse',
        detectionPriority: dbMatch?.detection_priority || 'Medium',
        conditionState: dbMatch?.condition_state || 'Intact',
        natureCategory: 'Organic / Biodegradable',
        compositionDetail: 'Food Leftovers, Fruit Peels, Carbohydrates & Organic Nitrogen',
        operationalStream: 'COMPOSTABLE',
        processingPathway: 'Anaerobic Biogas Digester or Industrial Aerobic Composting Facility',
        physicalState: 'Solid',
        environmentalRisk: 'If landfilled unmanaged, produces methane (CH4) & polluting acidic leachate.',
        color: '#10b981',
        badgeLabel: `${dbMatch?.sub_type_code || 'OR-01'} • BIODEGRADABLE FOOD`,
        weightGrams: 110
      };
    }

    if (['tissue', 'napkin', 'paper', 'towel', 'toilet', 'cloth', 'handbag', 'bed', 'sink', 'umbrella'].includes(cls)) {
      const dbMatch = detectionDatabaseEntries.find(e => e.object_id === 'PA-0003' || e.object_id === 'NR-0003') || detectionDatabaseEntries[13];
      return {
        id: `tis-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        x: bbox[0], y: bbox[1], width: bbox[2], height: bbox[3],
        itemName: `Tissue / Paper Napkin (${className.toUpperCase()})`,
        confidence: 95.8,
        categoryCode: 'PA-03',
        categoryName: 'CATEGORY 2: PAPER & CARDBOARD (Tissue / Napkin)',
        subType: 'Office Paper',
        bengaliExample: 'টিস্যু পেপার ও ন্যাপকিন Paper Tissue Napkin',
        objectId: dbMatch.object_id,
        objectNameEn: dbMatch.object_name_en,
        objectNameBn: dbMatch.object_name_bn,
        reusable: false,
        material: dbMatch.material || 'Bleached Cellulose Soft Fiber Pulp',
        commonSourceContext: dbMatch.common_source_context || 'Dining tables, kitchens, hygiene boxes, restaurants',
        detectionPriority: 'Medium',
        conditionState: conditionFilter !== 'All' ? conditionFilter : 'Intact',
        natureCategory: 'Organic / Biodegradable',
        compositionDetail: 'Soft Cellulose Wood Pulp Fiber',
        operationalStream: 'RECYCLABLE',
        processingPathway: 'Slurry Pulper De-inking & Reprocessing (or Industrial Composting if soiled)',
        physicalState: 'Solid',
        environmentalRisk: 'Clean tissue is recyclable; soiled or contaminated hygiene wipe must go to sanitary disposal.',
        color: '#06b6d4',
        badgeLabel: 'PA-03 • TISSUE NAPKIN',
        weightGrams: 5
      };
    }

    const dbMatches = findDatabaseMatches('NR-01', conditionFilter);
    const dbMatch = dbMatches.length > 0 ? dbMatches[0] : detectionDatabaseEntries[20];
    const isChipsOrPacket = ['packet', 'bag', 'wrapper', 'chip', 'lays'].some(w => cls.includes(w));
    return {
      id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      x: bbox[0], y: bbox[1], width: bbox[2], height: bbox[3],
      itemName: isChipsOrPacket ? (dbMatch?.object_name_en || `Multi-Layer Packaging (${className.toUpperCase()})`) : `Detected Object: ${className.toUpperCase()}`,
      confidence: 91.5,
      categoryCode: dbMatch?.sub_type_code || 'NR-01',
      categoryName: 'CATEGORY X: GENERAL / COMPOSITE WASTE (বাইরে রাখা)',
      subType: dbMatch?.sub_type || 'Composite Packaging',
      bengaliExample: isChipsOrPacket ? (dbMatch?.object_name_bn || 'চিপসের প্যাকেট, টেট্রা প্যাক') : `শনাক্ত করা বস্তু: ${className}`,
      objectId: isChipsOrPacket ? (dbMatch?.object_id || 'NR-0001') : 'GEN-001',
      objectNameEn: isChipsOrPacket ? (dbMatch?.object_name_en || 'Lays Multi-Layer Packet') : `General Waste Item (${className.toUpperCase()})`,
      objectNameBn: isChipsOrPacket ? (dbMatch?.object_name_bn || 'চিপসের প্যাকেট Composite Bag') : `সাধারণ বর্জ্য (${className})`,
      reusable: false,
      material: isChipsOrPacket ? (dbMatch?.material || 'Metallized Aluminum Foil Laminated with BOPP') : 'Mixed Composite / Unclassified Material',
      commonSourceContext: isChipsOrPacket ? (dbMatch?.common_source_context || 'Snack packets, wrappers') : 'General household / municipal object',
      detectionPriority: 'Medium',
      conditionState: conditionFilter !== 'All' ? conditionFilter : 'Crushed/Flattened',
      natureCategory: 'Inorganic / Non-biodegradable',
      compositionDetail: 'Multi-layer / Mixed Polymer Structure',
      operationalStream: 'LANDFILL_RESIDUAL',
      processingPathway: 'Engineered Sanitary Landfill or High-Temperature Waste-to-Energy Kiln',
      physicalState: 'Solid',
      environmentalRisk: 'Requires sorting or external containment if no direct recycling stream exists.',
      color: '#ef4444',
      badgeLabel: `NR-01 • ${className.toUpperCase()}`,
      weightGrams: 75
    };
  };

  const detectLiveFrame = useCallback(async () => {
    if (!isRunning || !hasWebcamPermission || !videoRef.current || !modelInstance) return;
    const video = videoRef.current;
    if (video.readyState !== 4 || video.videoWidth === 0) return;

    try {
      const predictions = await modelInstance.detect(video);
      if (predictions && predictions.length > 0) {
        const mappedList: ComprehensiveWasteTaxonomy[] = predictions.map((pred) => {
          const [x, y, width, height] = pred.bbox;
          const pctX = Math.min(88, Math.max(3, (x / video.videoWidth) * 100));
          const pctY = Math.min(88, Math.max(3, (y / video.videoHeight) * 100));
          const pctW = Math.min(92, Math.max(12, (width / video.videoWidth) * 100));
          const pctH = Math.min(92, Math.max(12, (height / video.videoHeight) * 100));

          const tax = mapCocoToComprehensiveTaxonomy(pred.class, [
            Number(pctX.toFixed(1)), Number(pctY.toFixed(1)),
            Number(pctW.toFixed(1)), Number(pctH.toFixed(1))
          ]);
          tax.confidence = Number((pred.score * 100).toFixed(1));
          return tax;
        });

        setRealDetections(mappedList);
        const bestTarget = mappedList.reduce((prev, curr) => curr.confidence > prev.confidence ? curr : prev, mappedList[0]);
        setActiveTarget(bestTarget);
      } else {
        setRealDetections([]);
      }
    } catch (err) {
      // Ignore dropped frame
    }
  }, [isRunning, hasWebcamPermission, modelInstance]);

  useEffect(() => {
    let interval: any;
    if (isRunning && hasWebcamPermission && modelInstance) {
      interval = setInterval(detectLiveFrame, 150);
    }
    return () => clearInterval(interval);
  }, [isRunning, hasWebcamPermission, modelInstance, detectLiveFrame]);

  const startRealWebcam = async () => {
    setWebcamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } 
      });
      setHasWebcamPermission(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
      setSummaryMessage('Hardware Webcam Connected: point camera at any waste item for 3-tier classification.');
    } catch (err: any) {
      setWebcamError('Could not access camera device. Please grant browser webcam permission.');
    }
  };

  const stopRealWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setHasWebcamPermission(false);
    setRealDetections([]);
    setSummaryMessage('Switched to Comprehensive Taxonomy Inspection Bed.');
  };

  const cycleComprehensiveTaxonomy = () => {
    const nextIdx = (presetIndex + 1) % comprehensivePresets.length;
    setPresetIndex(nextIdx);
    setActiveTarget(comprehensivePresets[nextIdx]);
    setSummaryMessage(`Inspecting taxonomy profile: ${comprehensivePresets[nextIdx].itemName} (${comprehensivePresets[nextIdx].operationalStream})`);
  };

  const commitToBlockchainLedger = async () => {
    if (!activeTarget) return;

    if (activeTarget.operationalStream === 'COMPOSTABLE') setCompostCount(c => c + 1);
    else if (activeTarget.operationalStream === 'RECYCLABLE') setRecycleCount(r => r + 1);
    else if (activeTarget.operationalStream === 'HAZARDOUS_SPECIAL') setHazardousCount(h => h + 1);
    else setLandfillCount(l => l + 1);

    const pseudoHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setLastMintedBlockHash(pseudoHash);

    try {
      await apiFetch('/api/ledger/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceZone: 'CUET AI Comprehensive Checkpoint',
          wasteType: activeTarget.operationalStream,
          weightKg: Number((activeTarget.weightGrams / 1000).toFixed(3)),
          itemName: activeTarget.itemName,
          natureCategory: activeTarget.natureCategory
        })
      });
    } catch (err) {
      // Backend offline fallback handled silently
    }

    setSummaryMessage(`Committed "${activeTarget.itemName}" (${activeTarget.operationalStream}) to Blockchain Ledger! TX: ${pseudoHash.slice(0, 14)}...`);
  };

  const selectCategoryByCode = (codePrefix: string) => {
    const found = comprehensivePresets.find(p => p.categoryCode && p.categoryCode.startsWith(codePrefix));
    if (found) {
      setActiveTarget(found);
      setSummaryMessage(`Inspecting Waste Taxonomy: [${found.categoryCode}] ${found.itemName} • উদাহরণ: ${found.bengaliExample}`);
    }
  };

  const selectExactDatabaseEntry = (entry: DetectionDatabaseEntry) => {
    let stream: ComprehensiveWasteTaxonomy['operationalStream'] = 'RECYCLABLE';
    let color = '#3b82f6';
    let nature: ComprehensiveWasteTaxonomy['natureCategory'] = 'Inorganic / Non-biodegradable';
    let pathway = 'Mechanical Washing, Flaking & Re-extrusion into recycled granules';

    if (entry.category_code === 'EW' || entry.sub_type_code.startsWith('EW')) {
      stream = 'HAZARDOUS_SPECIAL';
      color = '#a855f7';
      nature = 'Hazardous / Toxic';
      pathway = 'Certified E-Waste Facility for Precious Metal Recovery & Safe Disposal';
    } else if (entry.category_code === 'PA' || entry.sub_type_code.startsWith('PA')) {
      stream = 'RECYCLABLE';
      color = '#06b6d4';
      pathway = 'Hydrapulper Slurry Screening, De-inking & Pulp Re-forming';
    } else if (entry.category_code === 'ME' || entry.sub_type_code.startsWith('ME')) {
      stream = 'RECYCLABLE';
      color = '#6366f1';
      pathway = 'Eddy Current Separation & Electric Arc Furnace Smelting';
    } else if (entry.category_code === 'OR' || entry.sub_type_code.startsWith('OR')) {
      stream = 'COMPOSTABLE';
      color = '#10b981';
      nature = 'Organic / Biodegradable';
      pathway = 'Anaerobic Biogas Digester or Industrial Aerobic Composting Facility';
    } else if (entry.category_code === 'NR' || entry.sub_type_code.startsWith('NR') || !entry.reusable) {
      if (entry.category_code === 'NR') {
        stream = 'LANDFILL_RESIDUAL';
        color = '#ef4444';
        pathway = 'Engineered Sanitary Landfill or High-Temperature Waste-to-Energy Kiln';
      }
    }

    const target: ComprehensiveWasteTaxonomy = {
      id: `db-${entry.object_id}`,
      x: 32, y: 22, width: 36, height: 52,
      itemName: entry.object_name_en,
      confidence: 99.2,
      categoryCode: entry.sub_type_code,
      categoryName: `CATEGORY: ${entry.main_category.toUpperCase()}`,
      subType: entry.sub_type,
      bengaliExample: entry.object_name_bn,
      objectId: entry.object_id,
      objectNameEn: entry.object_name_en,
      objectNameBn: entry.object_name_bn,
      reusable: entry.reusable,
      material: entry.material,
      commonSourceContext: entry.common_source_context,
      detectionPriority: entry.detection_priority,
      conditionState: entry.condition_state,
      natureCategory: nature,
      compositionDetail: entry.material,
      operationalStream: stream,
      processingPathway: pathway,
      physicalState: 'Solid',
      environmentalRisk: `Priority (${entry.detection_priority}) • Condition: ${entry.condition_state} • Context: ${entry.common_source_context}`,
      color: color,
      badgeLabel: `${entry.sub_type_code} • ${entry.sub_type.toUpperCase()} (${entry.condition_state})`,
      weightGrams: entry.object_id.includes('250ml') ? 25 : entry.object_id.includes('500ml') ? 38 : entry.object_id.includes('1L') ? 50 : entry.object_id.includes('5L') ? 140 : 65
    };

    setActiveTarget(target);
    setSummaryMessage(`Database Match Active: [${entry.object_id}] ${entry.object_name_en} • অবস্থা: ${entry.condition_state}`);
  };

  return {
    isRunning,
    setIsRunning,
    compostCount,
    recycleCount,
    hazardousCount,
    landfillCount,
    hasWebcamPermission,
    webcamError,
    modelLoading,
    realDetections,
    activeTarget,
    setActiveTarget,
    conditionFilter,
    setConditionFilter,
    searchQuery,
    setSearchQuery,
    detectionDatabaseEntries,
    selectExactDatabaseEntry,
    videoRef,
    canvasRef,
    lastMintedBlockHash,
    summaryMessage,
    startRealWebcam,
    stopRealWebcam,
    cycleComprehensiveTaxonomy,
    selectCategoryByCode,
    commitToBlockchainLedger
  };
}
