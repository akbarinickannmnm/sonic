export type NephrologyPhysicalExamCategory = "general" | "vitals" | "volume_status" | "skin_mucosal" | "cardiopulmonary" | "abdominal_flank" | "genitourinary" | "extremities" | "neurologic" | "fundoscopy";
export type NephrologyPhysicalExamItem = { id: string; category: NephrologyPhysicalExamCategory; title: string; description: string; };

export const nephrologyPhysicalExamCategories = [
  { id: "general", label: "ارزیابی عمومی" },
  { id: "vitals", label: "علائم حیاتی" },
  { id: "volume_status", label: "وضعیت مایعات" },
  { id: "skin_mucosal", label: "معاینه پوست و مخاط" },
  { id: "cardiopulmonary", label: "معاینه قلب و ریه" },
  { id: "abdominal_flank", label: "معاینه شکم و پهلو" },
  { id: "genitourinary", label: "معاینه دستگاه ادراری" },
  { id: "extremities", label: "معاینه اندام‌ها" },
  { id: "neurologic", label: "معاینه عصبی" },
  { id: "fundoscopy", label: "معاینه فوندوس" },
] as const;

export const nephrologyPhysicalExamBank: NephrologyPhysicalExamItem[] = [
  { id: "NPE-001", category: "general", title: "ارزیابی عمومی", description: "ظاهر بیمار، شدت بیماری، سطح هوشیاری، رنگ‌پریدگی، بی‌حالی و نشانه‌های بیماری مزمن." },
  { id: "NPE-002", category: "vitals", title: "علائم حیاتی", description: "فشار خون، ضربان قلب، تعداد تنفس، دما، اشباع اکسیژن و در صورت نیاز فشار ارتواستاتیک." },
  { id: "NPE-003", category: "volume_status", title: "وضعیت مایعات", description: "JVP، ادم محیطی، ادم پری‌اوربیتال، مخاط، پرفیوژن، رال‌های ریوی و وزن." },
  { id: "NPE-004", category: "skin_mucosal", title: "معاینه پوست و مخاط", description: "راش، پورپورا، زخم دهان، خشکی پوست، خارش، رنگ‌پریدگی و یافته‌های بیماری سیستمیک." },
  { id: "NPE-005", category: "cardiopulmonary", title: "معاینه قلب و ریه", description: "JVP، صداهای قلب، سوفل، گالوپ، رال‌های ریوی و یافته‌های احتقان یا اورمی." },
  { id: "NPE-006", category: "abdominal_flank", title: "معاینه شکم و پهلو", description: "حساسیت، تندرنس پهلو، CVA tenderness، توده یا بزرگی کلیه و آسیت." },
  { id: "NPE-007", category: "genitourinary", title: "معاینه دستگاه ادراری", description: "مثانه قابل لمس، معاینه ناحیه سوپراپوبیک، علائم احتباس و در صورت نیاز معاینه اختصاصی دستگاه تناسلی." },
  { id: "NPE-008", category: "extremities", title: "معاینه اندام‌ها", description: "ادم، نبض‌های محیطی، نشانه‌های DVT، تغییرات پوستی و شواهد بیماری عروقی یا سیستمیک." },
  { id: "NPE-009", category: "neurologic", title: "معاینه عصبی", description: "سطح هوشیاری، asterixis، قدرت و حس، رفلکس‌ها و علائم نوروپاتی یا اورمی." },
  { id: "NPE-010", category: "fundoscopy", title: "معاینه فوندوس", description: "رتینوپاتی ناشی از فشار خون یا دیابت، خونریزی شبکیه و سایر نشانه‌های بیماری عروقی." },
];
