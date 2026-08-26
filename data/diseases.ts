export type DiseasePriority = 1 | 2 | 3;

export type Diagnosis = {
  id: string;
  name: string;
  synonyms: string[];
};

export type Disease = Diagnosis & {
  priority: DiseasePriority;
};

export const diseases: Disease[] = [
  // Priority 1 — Must have
  {
    id: "community-acquired-pneumonia",
    name: "Community-Acquired Pneumonia (CAP)",
    synonyms: [],
    priority: 1,
  },
  {
    id: "asthma",
    name: "Asthma",
    synonyms: [],
    priority: 1,
  },
  {
    id: "copd",
    name: "COPD",
    synonyms: [],
    priority: 1,
  },
  {
    id: "pulmonary-embolism",
    name: "Pulmonary Embolism (PE)",
    synonyms: [],
    priority: 1,
  },
  {
    id: "pulmonary-tuberculosis",
    name: "Tuberculosis (Pulmonary TB)",
    synonyms: [],
    priority: 1,
  },
  {
    id: "covid-19-pneumonia",
    name: "COVID-19 Pneumonia",
    synonyms: [],
    priority: 1,
  },
  {
    id: "pleural-effusion",
    name: "Pleural Effusion",
    synonyms: [],
    priority: 1,
  },
  {
    id: "pneumothorax",
    name: "Pneumothorax",
    synonyms: [],
    priority: 1,
  },
  {
    id: "lung-cancer",
    name: "Lung Cancer",
    synonyms: [],
    priority: 1,
  },
  {
    id: "ards",
    name: "Acute Respiratory Distress Syndrome (ARDS)",
    synonyms: [],
    priority: 1,
  },
  {
    id: "acute-bronchitis",
    name: "Acute Bronchitis",
    synonyms: [],
    priority: 1,
  },
  {
    id: "obstructive-sleep-apnea",
    name: "Obstructive Sleep Apnea (OSA)",
    synonyms: [],
    priority: 1,
  },
  {
    id: "interstitial-lung-disease",
    name: "Interstitial Lung Disease (ILD)",
    synonyms: [],
    priority: 1,
  },
  {
    id: "bronchiectasis",
    name: "Bronchiectasis",
    synonyms: [],
    priority: 1,
  },
  {
    id: "aspiration-pneumonia",
    name: "Aspiration Pneumonia",
    synonyms: [],
    priority: 1,
  },

  // Priority 2 — Very important
  {
    id: "sarcoidosis",
    name: "Sarcoidosis",
    synonyms: [],
    priority: 2,
  },
  {
    id: "pulmonary-hypertension",
    name: "Pulmonary Hypertension",
    synonyms: [],
    priority: 2,
  },
  {
    id: "occupational-lung-disease",
    name: "Occupational Lung Disease",
    synonyms: [],
    priority: 2,
  },
  {
    id: "hypersensitivity-pneumonitis",
    name: "Hypersensitivity Pneumonitis",
    synonyms: [],
    priority: 2,
  },
  {
    id: "idiopathic-pulmonary-fibrosis",
    name: "Idiopathic Pulmonary Fibrosis (IPF)",
    synonyms: [],
    priority: 2,
  },
  {
    id: "lung-abscess",
    name: "Lung Abscess",
    synonyms: [],
    priority: 2,
  },
  {
    id: "empyema",
    name: "Empyema",
    synonyms: [],
    priority: 2,
  },
  {
    id: "cystic-fibrosis",
    name: "Cystic Fibrosis",
    synonyms: [],
    priority: 2,
  },
  {
    id: "allergic-bronchopulmonary-aspergillosis",
    name: "Allergic Bronchopulmonary Aspergillosis (ABPA)",
    synonyms: [],
    priority: 2,
  },
  {
    id: "non-tuberculous-mycobacterial-infection",
    name: "Non-Tuberculous Mycobacterial Infection",
    synonyms: [],
    priority: 2,
  },
  {
    id: "massive-hemoptysis",
    name: "Massive Hemoptysis",
    synonyms: [],
    priority: 2,
  },
  {
    id: "acute-severe-asthma",
    name: "Acute Severe Asthma",
    synonyms: [],
    priority: 2,
  },
  {
    id: "copd-exacerbation",
    name: "COPD Exacerbation",
    synonyms: [],
    priority: 2,
  },
  {
    id: "cor-pulmonale",
    name: "Cor Pulmonale",
    synonyms: [],
    priority: 2,
  },
  {
    id: "mediastinal-mass-syndrome",
    name: "Mediastinal Mass Syndrome",
    synonyms: [],
    priority: 2,
  },

  // Priority 3 — Important for broad coverage
  {
    id: "silicosis",
    name: "Silicosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "asbestosis",
    name: "Asbestosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "coal-workers-pneumoconiosis",
    name: "Coal Workers' Pneumoconiosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "eosinophilic-pneumonia",
    name: "Eosinophilic Pneumonia",
    synonyms: [],
    priority: 3,
  },
  {
    id: "cryptogenic-organizing-pneumonia",
    name: "Cryptogenic Organizing Pneumonia",
    synonyms: [],
    priority: 3,
  },
  {
    id: "alpha-1-antitrypsin-deficiency",
    name: "Alpha-1 Antitrypsin Deficiency",
    synonyms: [],
    priority: 3,
  },
  {
    id: "pulmonary-alveolar-proteinosis",
    name: "Pulmonary Alveolar Proteinosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "diffuse-alveolar-hemorrhage",
    name: "Diffuse Alveolar Hemorrhage",
    synonyms: [],
    priority: 3,
  },
  {
    id: "pulmonary-langerhans-cell-histiocytosis",
    name: "Pulmonary Langerhans Cell Histiocytosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "lymphangioleiomyomatosis",
    name: "Lymphangioleiomyomatosis (LAM)",
    synonyms: [],
    priority: 3,
  },

  // Priority 3 — Important / educational
  {
    id: "histoplasmosis",
    name: "Histoplasmosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "coccidioidomycosis",
    name: "Coccidioidomycosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "blastomycosis",
    name: "Blastomycosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "aspergillosis",
    name: "Aspergillosis",
    synonyms: [],
    priority: 3,
  },
  {
    id: "pulmonary-mucormycosis",
    name: "Mucormycosis Pulmonary Infection",
    synonyms: [],
    priority: 3,
  },
  {
    id: "granulomatosis-with-polyangiitis",
    name: "Granulomatosis with Polyangiitis (Wegener)",
    synonyms: [],
    priority: 3,
  },
  {
    id: "eosinophilic-granulomatosis-with-polyangiitis",
    name: "Eosinophilic Granulomatosis with Polyangiitis (Churg-Strauss)",
    synonyms: [],
    priority: 3,
  },
  {
    id: "goodpasture-syndrome",
    name: "Goodpasture Syndrome",
    synonyms: [],
    priority: 3,
  },
  {
    id: "pulmonary-manifestations-of-sle",
    name: "Pulmonary Manifestations of SLE",
    synonyms: [],
    priority: 3,
  },
  {
    id: "pulmonary-manifestations-of-rheumatoid-arthritis",
    name: "Pulmonary Manifestations of Rheumatoid Arthritis",
    synonyms: [],
    priority: 3,
  },
];
