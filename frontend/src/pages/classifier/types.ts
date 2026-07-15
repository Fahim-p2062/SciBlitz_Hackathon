export type OperationalStream = 'RECYCLABLE' | 'COMPOSTABLE' | 'HAZARDOUS_SPECIAL' | 'LANDFILL_RESIDUAL';

export interface DetectionDatabaseEntry {
  object_id: string; // e.g. "PL-0001"
  object_name_en: string; // e.g. "Mum 250ml Bottle (Intact)"
  object_name_bn: string; // e.g. "Mum বোতল 250ml Bottle (Intact)"
  main_category: string; // e.g. "Plastic"
  category_code: string; // e.g. "PL"
  sub_type: string; // e.g. "PET"
  sub_type_code: string; // e.g. "PL-01"
  reusable: boolean;
  material: string; // e.g. "PET Plastic"
  common_source_context: string; // e.g. "Cold drinks, water, oil, juice bottles"
  detection_priority: string; // e.g. "High"
  condition_state: string; // e.g. "Intact" | "Crushed/Flattened" | "Torn/Broken"
}

export interface ComprehensiveWasteTaxonomy {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  itemName: string;
  confidence: number;
  // Detection Database Taxonomy (Waste Taxonomy Standard)
  categoryCode: string; // e.g. 'PL-01', 'EW-02', 'NR-01'
  categoryName: string; // e.g. 'CATEGORY 1: PLASTIC (Recyclable)'
  subType: string; // e.g. 'PET', 'Circuit/PCB', 'Composite Packaging'
  bengaliExample: string; // e.g. 'পানির বোতল, কোল্ড ড্রিংক বোতল'
  // Exact Object Detection Database Match (e.g. Mum, Aquafina, Pran, Fresh, Jibon, Kool)
  objectId?: string; // e.g. 'PL-0001'
  objectNameEn?: string; // e.g. 'Mum 250ml Bottle (Intact)'
  objectNameBn?: string; // e.g. 'Mum বোতল 250ml Bottle (Intact)'
  reusable?: boolean;
  material?: string; // e.g. 'PET Plastic'
  commonSourceContext?: string; // e.g. 'Cold drinks, water, oil, juice bottles'
  detectionPriority?: string; // e.g. 'High'
  conditionState?: string; // e.g. 'Intact' | 'Crushed/Flattened' | 'Torn/Broken'
  // 1. Classification by Nature/Composition
  natureCategory: 'Organic / Biodegradable' | 'Inorganic / Non-biodegradable' | 'Hazardous / Toxic' | 'Construction & Demolition (C&D)';
  compositionDetail: string;
  // 2. Classification by Recycling Potential (Operational Stream)
  operationalStream: OperationalStream;
  processingPathway: string;
  // 3. Classification by Physical State & Risk
  physicalState: 'Solid' | 'Liquid / Sludge' | 'Gaseous / Emission Hazard';
  environmentalRisk: string;
  // UI Display attributes
  color: string;
  badgeLabel: string;
  weightGrams: number;
}
