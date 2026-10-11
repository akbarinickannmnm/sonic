export type CardiologyPhysicalExamCategory = "general" | "vitals" | "peripheral" | "neck" | "precordial" | "auscultation" | "congestion";
export type CardiologyPhysicalExamAction = { id: string; category: CardiologyPhysicalExamCategory; title: string; description: string; answer: string; };
export const cardiologyPhysicalExamCategories = [
  { id: "general", label: "معاینه عمومی و پرفیوژن" },
  { id: "vitals", label: "علائم حیاتی" },
  { id: "peripheral", label: "نبض‌های محیطی و اندام‌ها" },
  { id: "neck", label: "معاینه گردن و JVP" },
  { id: "precordial", label: "معاینه پره‌کوردیال" },
  { id: "auscultation", label: "سمع قلب" },
  { id: "congestion", label: "معاینه ریه و احتقان سیستمیک" },
] as const;

export const cardiologyPhysicalExamBank: CardiologyPhysicalExamAction[] = [
  { id: "CPE001", category: "general", title: "معاینه عمومی و پرفیوژن", description: "سطح هوشیاری، ظاهر بیمار، دیسترس، رنگ پوست، دمای اندام‌ها و پرفیوژن محیطی.", answer: "یافته‌های این معاینه به‌صورت مستقیم و اختصاصی برای کیس انتخاب‌شده نمایش داده می‌شوند." },
  { id: "CPE002", category: "vitals", title: "علائم حیاتی", description: "فشارخون، ضربان و ریتم قلب، تعداد تنفس، SpO₂ و در صورت لزوم فشار نبض یا اختلاف فشار دو دست.", answer: "یافته‌های این معاینه به‌صورت مستقیم و اختصاصی برای کیس انتخاب‌شده نمایش داده می‌شوند." },
  { id: "CPE003", category: "peripheral", title: "نبض‌های محیطی و اندام‌ها", description: "نبض‌های محیطی و تأخیر رادیوفمورال، ادم، کلابینگ و نشانه‌های محیطی مرتبط.", answer: "یافته‌های این معاینه به‌صورت مستقیم و اختصاصی برای کیس انتخاب‌شده نمایش داده می‌شوند." },
  { id: "CPE004", category: "neck", title: "معاینه گردن و JVP", description: "فشار ورید ژوگولار، رفلاکس هپاتوژوگولار و در صورت نیاز شکل موج وریدی.", answer: "یافته‌های این معاینه به‌صورت مستقیم و اختصاصی برای کیس انتخاب‌شده نمایش داده می‌شوند." },
  { id: "CPE005", category: "precordial", title: "معاینه پره‌کوردیال", description: "محل و ویژگی ضربان اپکس، هیو پاراسترنال و تریل قابل لمس.", answer: "یافته‌های این معاینه به‌صورت مستقیم و اختصاصی برای کیس انتخاب‌شده نمایش داده می‌شوند." },
  { id: "CPE006", category: "auscultation", title: "سمع قلب", description: "S1/S2، صداهای اضافی، سوفل، محل انتشار و تغییر شدت با مانورهای مناسب.", answer: "یافته‌های این معاینه به‌صورت مستقیم و اختصاصی برای کیس انتخاب‌شده نمایش داده می‌شوند." },
  { id: "CPE007", category: "congestion", title: "معاینه ریه و احتقان سیستمیک", description: "کراکل، افیوژن پلور، هپاتومگالی، آسیت و سایر شواهد احتقان.", answer: "یافته‌های این معاینه به‌صورت مستقیم و اختصاصی برای کیس انتخاب‌شده نمایش داده می‌شوند." },
];
