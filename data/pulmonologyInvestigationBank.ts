export type InvestigationCategory =
  | "laboratory"
  | "imaging"
  | "microbiology"
  | "pulmonary_function"
  | "cardiac"
  | "procedures";

export interface Investigation {
  id: string;
  category: InvestigationCategory;
  title: string;
  description: string;
}

export const investigationCategories = [
  {
    id: "laboratory",
    label: "Laboratory",
  },
  {
    id: "imaging",
    label: "Imaging",
  },
  {
    id: "microbiology",
    label: "Microbiology",
  },
  {
    id: "pulmonary_function",
    label: "Pulmonary Function Tests",
  },
  {
    id: "cardiac",
    label: "Cardiac",
  },
  {
    id: "procedures",
    label: "Procedures",
  },
] as const;

export const pulmonologyInvestigationBank: Investigation[] = [
  // Laboratory
  {
    id: "INV001",
    category: "laboratory",
    title: "CBC",
    description: "Complete blood count",
  },
  {
    id: "INV002",
    category: "laboratory",
    title: "CMP",
    description: "Comprehensive metabolic panel",
  },
  {
    id: "INV003",
    category: "laboratory",
    title: "CRP",
    description: "C-reactive protein",
  },
  {
    id: "INV004",
    category: "laboratory",
    title: "ESR",
    description: "Erythrocyte sedimentation rate",
  },
  {
    id: "INV005",
    category: "laboratory",
    title: "Procalcitonin",
    description: "Bacterial infection marker",
  },
  {
    id: "INV006",
    category: "laboratory",
    title: "ABG",
    description: "Arterial blood gas",
  },
  {
    id: "INV007",
    category: "laboratory",
    title: "D-Dimer",
    description: "Venous thromboembolism screening",
  },

  // Imaging
  {
    id: "INV008",
    category: "imaging",
    title: "Chest X-Ray",
    description: "Standard chest radiography",
  },
  {
    id: "INV009",
    category: "imaging",
    title: "Chest CT",
    description: "Computed tomography of the chest",
  },
  {
    id: "INV010",
    category: "imaging",
    title: "CT Pulmonary Angiography (CTPA)",
    description: "Pulmonary embolism evaluation",
  },

  // Microbiology
  {
    id: "INV011",
    category: "microbiology",
    title: "Sputum Gram Stain",
    description: "Initial sputum microscopy",
  },
  {
    id: "INV012",
    category: "microbiology",
    title: "Sputum Culture",
    description: "Bacterial culture",
  },
  {
    id: "INV013",
    category: "microbiology",
    title: "Blood Culture",
    description: "Bloodstream infection evaluation",
  },
  {
    id: "INV014",
    category: "microbiology",
    title: "Respiratory Viral PCR",
    description: "Respiratory viral panel",
  },

  // Pulmonary Function
  {
    id: "INV015",
    category: "pulmonary_function",
    title: "Spirometry",
    description: "Basic pulmonary function testing",
  },
  {
    id: "INV016",
    category: "pulmonary_function",
    title: "Full PFT",
    description: "Complete pulmonary function test",
  },

  // Cardiac
  {
    id: "INV017",
    category: "cardiac",
    title: "ECG",
    description: "Electrocardiogram",
  },
  {
    id: "INV018",
    category: "cardiac",
    title: "Troponin",
    description: "Cardiac injury marker",
  },
  {
    id: "INV019",
    category: "cardiac",
    title: "BNP",
    description: "Heart failure biomarker",
  },
  {
    id: "INV020",
    category: "cardiac",
    title: "Echocardiography",
    description: "Cardiac ultrasound",
  },

  // Procedures
  {
    id: "INV021",
    category: "procedures",
    title: "Bronchoscopy",
    description: "Endoscopic airway evaluation",
  },
  {
    id: "INV022",
    category: "procedures",
    title: "Thoracentesis",
    description: "Pleural fluid aspiration",
  },
  {
    id: "INV023",
    category: "procedures",
    title: "Pleural Fluid Analysis",
    description: "Laboratory analysis of pleural fluid",
  },
];