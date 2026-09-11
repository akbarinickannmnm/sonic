export type GastroenterologyInvestigationItem = { id: string; section: string; title: string; description: string };

export const gastroenterologyInvestigationSections = [
  { id: "cbc-general" , label: "CBC و آزمایش‌های عمومی خون" },
  { id: "liver-synthetic" , label: "Liver Function و عملکرد سنتزی" },
  { id: "pancreatic-biochem" , label: "آنزیم‌ها و بیوشیمی پانکراس" },
  { id: "gi-autoimmune-celiac" , label: "Serology و Immunology گوارشی" },
  { id: "viral-metabolic-liver" , label: "بررسی ویروسی و متابولیک کبد" },
  { id: "stool" , label: "آزمایش‌های مدفوع" },
  { id: "fecal-inflammatory-malabsorption" , label: "التهاب و سوءجذب در مدفوع" },
  { id: "abdominal-ultrasound" , label: "سونوگرافی شکم" },
  { id: "ct-abdomen" , label: "CT شکم و لگن" },
  { id: "endoscopy-biopsy" , label: "Endoscopy و Histopathology" }
] as const;

export const gastroenterologyInvestigationBank: GastroenterologyInvestigationItem[] = [
  { id: "gastro-inv-001", section: "cbc-general", title: "CBC و آزمایش‌های عمومی خون", description: "Hb، WBC با differential، Platelet، MCV، ESR/CRP، Glucose، BUN/Creatinine و Electrolytes." },
  { id: "gastro-inv-002", section: "liver-synthetic", title: "Liver Function و عملکرد سنتزی", description: "AST، ALT، ALP، GGT، bilirubin، albumin، total protein، PT/INR." },
  { id: "gastro-inv-003", section: "pancreatic-biochem", title: "آنزیم‌ها و بیوشیمی پانکراس", description: "Lipase، Amylase، Calcium، Triglyceride و Glucose." },
  { id: "gastro-inv-004", section: "gi-autoimmune-celiac", title: "Serology و Immunology گوارشی", description: "tTG-IgA، total IgA، ANA، ASMA، AMA، Anti-LKM و IgG." },
  { id: "gastro-inv-005", section: "viral-metabolic-liver", title: "بررسی ویروسی و متابولیک کبد", description: "مارکرهای HAV/HBV/HCV/HDV/HEV، ceruloplasmin، copper، ferritin/transferrin saturation و A1AT." },
  { id: "gastro-inv-006", section: "stool", title: "آزمایش‌های مدفوع", description: "Stool culture، O&P، C. difficile testing، occult blood و سایر بررسی‌های میکروبی." },
  { id: "gastro-inv-007", section: "fecal-inflammatory-malabsorption", title: "التهاب و سوءجذب در مدفوع", description: "Fecal calprotectin، fecal fat، fecal elastase و سایر یافته‌های مربوط." },
  { id: "gastro-inv-008", section: "abdominal-ultrasound", title: "سونوگرافی شکم", description: "گزارش یکپارچه کبد، کیسه صفرا، مجاری صفراوی، پانکراس، طحال، portal vein، سنگ و ascites." },
  { id: "gastro-inv-009", section: "ct-abdomen", title: "CT شکم و لگن", description: "یافته‌های معده، روده، کبد، صفرا، پانکراس، مزانتر، توده، التهاب، obstruction، perforation و ischemia." },
  { id: "gastro-inv-010", section: "endoscopy-biopsy", title: "Endoscopy و Histopathology", description: "EGD، colonoscopy و biopsy با یافته‌های اندوسکوپیک و پاتولوژی مرتبط." }
];
