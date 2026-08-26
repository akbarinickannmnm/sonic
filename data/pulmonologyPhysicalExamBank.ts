export type PhysicalExamCategory =
  | "general"
  | "vitals"
  | "inspection"
  | "palpation"
  | "percussion"
  | "auscultation"
  | "cardiovascular"
  | "peripheral"
  | "neck"
  | "upper_airway"
  | "skin"
  | "functional";

export interface PhysicalExamAction {
  id: string;
  category: PhysicalExamCategory;
  title: string;
  description: string;
}

export const physicalExamCategories = [
  {
    id: "general",
    label: "General Assessment",
  },
  {
    id: "vitals",
    label: "Vital Signs",
  },
  {
    id: "inspection",
    label: "Respiratory Inspection",
  },
  {
    id: "palpation",
    label: "Chest Palpation",
  },
  {
    id: "percussion",
    label: "Chest Percussion",
  },
  {
    id: "auscultation",
    label: "Chest Auscultation",
  },
  {
    id: "cardiovascular",
    label: "Cardiovascular Examination",
  },
  {
    id: "peripheral",
    label: "Peripheral Examination",
  },
  {
    id: "neck",
    label: "Neck & Lymph Node Examination",
  },
  {
    id: "upper_airway",
    label: "Upper Airway Examination",
  },
  {
    id: "skin",
    label: "Skin Examination",
  },
  {
    id: "functional",
    label: "Functional Assessment",
  },
] as const;

export const pulmonologyPhysicalExamBank: PhysicalExamAction[] = [
  {
    id: "PE001",
    category: "general",
    title: "General Assessment",
    description:
      "General appearance, disease severity, mental status, respiratory distress, ability to speak, and cyanosis.",
  },

  {
    id: "PE002",
    category: "vitals",
    title: "Vital Signs",
    description:
      "Temperature, heart rate, blood pressure, respiratory rate, oxygen saturation, and oxygen requirement.",
  },

  {
    id: "PE003",
    category: "inspection",
    title: "Respiratory Inspection",
    description:
      "الگوی تنفس، تلاش تنفسی، استفاده از عضلات فرعی، تقارن قفسه سینه و ناهنجاری‌های قابل مشاهده.",
  },

  {
    id: "PE004",
    category: "palpation",
    title: "Chest Palpation",
    description:
      "حرکات قفسه سینه، tactile fremitus، موقعیت تراشه و حساسیت دیواره قفسه سینه.",
  },

  {
    id: "PE005",
    category: "percussion",
    title: "Chest Percussion",
    description:
      "صدای پرکاشن، dullness، hyperresonance و حرکت دیافراگم.",
  },

  {
    id: "PE006",
    category: "auscultation",
    title: "Chest Auscultation",
    description:
      "Breath sounds, crackles, wheezing, rhonchi, stridor, pleural rub and vocal transmission.",
  },

  {
    id: "PE007",
    category: "cardiovascular",
    title: "Cardiovascular Examination",
    description:
      "صداهای قلب، ریتم، سوفل، JVP و ادم محیطی.",
  },

  {
    id: "PE008",
    category: "peripheral",
    title: "Peripheral Examination",
    description:
      "کلابینگ، سیانوز، ادم، نبض‌های محیطی و یافته‌های DVT.",
  },

  {
    id: "PE009",
    category: "neck",
    title: "Neck & Lymph Node Examination",
    description:
      "غدد لنفاوی گردنی، غدد سوپراکلاویکولار، تراشه و JVP.",
  },

  {
    id: "PE010",
    category: "upper_airway",
    title: "Upper Airway Examination",
    description:
      "مخاط بینی، ترشحات بینی، اوروفارنکس، لوزه‌ها و یافته‌های راه هوایی فوقانی.",
  },

  {
    id: "PE011",
    category: "skin",
    title: "Skin Examination",
    description:
      "رنگ پوست، سیانوز، راش، پرفیوژن محیطی و سایر یافته‌های پوستی.",
  },

  {
    id: "PE012",
    category: "functional",
    title: "Functional Assessment",
    description:
      "تحمل فعالیت، تنگی نفس حین فعالیت و تغییرات اشباع اکسیژن.",
  },
];