export type GastroenterologyPhysicalExamItem = { id: string; section: string; title: string; description: string };

export const gastroenterologyPhysicalExamSections = [
  { id: "general" , label: "ارزیابی عمومی" },
  { id: "vitals" , label: "علائم حیاتی" },
  { id: "hydration" , label: "وضعیت آب و حجم مایعات" },
  { id: "skin-eyes-mucosa" , label: "پوست، چشم و مخاط" },
  { id: "chronic-liver" , label: "علائم بیماری مزمن کبد" },
  { id: "abdominal-general" , label: "معاینه عمومی شکم" },
  { id: "focal-abdomen" , label: "معاینه موضعی شکم" },
  { id: "hepatobiliary" , label: "معاینه کبد و صفرا" },
  { id: "pancreatic" , label: "معاینه پانکراتیک" },
  { id: "intestinal" , label: "معاینه روده" },
  { id: "anorectal" , label: "معاینه آنورکتال" },
  { id: "extraintestinal" , label: "تظاهرات خارج‌گوارشی و عصبی" }
] as const;

export const gastroenterologyPhysicalExamBank: GastroenterologyPhysicalExamItem[] = [
  { id: "gastro-pe-001", section: "general", title: "ارزیابی عمومی", description: "ظاهر کلی، سطح هوشیاری، ill-looking بودن، وضعیت تغذیه‌ای و کاهش توده عضلانی." },
  { id: "gastro-pe-002", section: "vitals", title: "علائم حیاتی", description: "فشار خون، ضربان قلب، تعداد تنفس و دما و شواهد ناپایداری همودینامیک." },
  { id: "gastro-pe-003", section: "hydration", title: "وضعیت آب و حجم مایعات", description: "شواهد کم‌آبی، مخاط، پرفیوژن و ادم محیطی." },
  { id: "gastro-pe-004", section: "skin-eyes-mucosa", title: "پوست، چشم و مخاط", description: "زردی، pallor، کبودی، petechiae، ضایعات پوستی و زخم‌های دهانی." },
  { id: "gastro-pe-005", section: "chronic-liver", title: "علائم بیماری مزمن کبد", description: "Spider angioma، palmar erythema، caput medusae، gynecomastia و سایر stigmata." },
  { id: "gastro-pe-006", section: "abdominal-general", title: "معاینه عمومی شکم", description: "Distension، bowel sounds، guarding، rigidity، rebound و توده‌های قابل لمس." },
  { id: "gastro-pe-007", section: "focal-abdomen", title: "معاینه موضعی شکم", description: "Tenderness و mass در epigastrium و quadrantهای شکم." },
  { id: "gastro-pe-008", section: "hepatobiliary", title: "معاینه کبد و صفرا", description: "Hepatomegaly، splenomegaly، RUQ tenderness و Murphy sign." },
  { id: "gastro-pe-009", section: "pancreatic", title: "معاینه پانکراتیک", description: "Epigastric tenderness و یافته‌های پوستی مرتبط با پانکراتیت شدید مانند Cullen/Grey Turner." },
  { id: "gastro-pe-010", section: "intestinal", title: "معاینه روده", description: "Distension، tympany، tenderness منتشر و یافته‌های مطرح‌کننده IBD یا obstruction." },
  { id: "gastro-pe-011", section: "anorectal", title: "معاینه آنورکتال", description: "Fissure، hemorrhoid، fistula، abscess، خون یا توده در معاینه رکتال." },
  { id: "gastro-pe-012", section: "extraintestinal", title: "تظاهرات خارج‌گوارشی و عصبی", description: "Arthritis، clubbing، skin lesions، ocular inflammation، mental status و asterixis." }
];
