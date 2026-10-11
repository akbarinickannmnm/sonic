export type CardiologyInvestigationCategory = "ecg" | "laboratory" | "cxr" | "echo" | "ct-mri" | "invasive" | "functional-monitoring";
export type CardiologyInvestigation = { id: string; category: CardiologyInvestigationCategory; title: string; description: string; answer: string; };
export const cardiologyInvestigationCategories = [
  { id: "ecg", label: "ECG دوازده‌لیدی" },
  { id: "laboratory", label: "آزمایش‌های خون" },
  { id: "cxr", label: "رادیوگرافی قفسه سینه (CXR)" },
  { id: "echo", label: "اکوکاردیوگرافی و داپلر" },
  { id: "ct-mri", label: "تصویربرداری CT و MRI قلب و عروق" },
  { id: "invasive", label: "آنژیوگرافی و بررسی‌های تهاجمی قلب" },
  { id: "functional-monitoring", label: "بررسی‌های عملکردی و پایش قلب" },
] as const;

export const cardiologyInvestigationBank: CardiologyInvestigation[] = [
  { id: "CINV001", category: "ecg", title: "ECG دوازده‌لیدی", description: "بررسی ریتم، هدایت، محور، فواصل، تغییرات ST-T و الگوهای اختصاصی.", answer: "نتیجه این بررسی برای کیس انتخاب‌شده مستقیم نمایش داده می‌شود؛ در صورت انجام‌نشدن، پاسخ «انجام نشده است» است." },
  { id: "CINV002", category: "laboratory", title: "آزمایش‌های خون", description: "برحسب کیس: تروپونین، BNP/NT-proBNP، CBC، الکترولیت‌ها، عملکرد کلیه، تیروئید، شاخص‌های التهاب یا کشت خون.", answer: "نتیجه این بررسی برای کیس انتخاب‌شده مستقیم نمایش داده می‌شود؛ در صورت انجام‌نشدن، پاسخ «انجام نشده است» است." },
  { id: "CINV003", category: "cxr", title: "رادیوگرافی قفسه سینه (CXR)", description: "اندازه قلب، عروق ریوی، ادم ریه، افیوژن پلور یا یافته‌های آئورت.", answer: "نتیجه این بررسی برای کیس انتخاب‌شده مستقیم نمایش داده می‌شود؛ در صورت انجام‌نشدن، پاسخ «انجام نشده است» است." },
  { id: "CINV004", category: "echo", title: "اکوکاردیوگرافی و داپلر", description: "ساختار قلب، عملکرد بطنی، EF، دریچه‌ها، پریکارد و برآورد همودینامیک.", answer: "نتیجه این بررسی برای کیس انتخاب‌شده مستقیم نمایش داده می‌شود؛ در صورت انجام‌نشدن، پاسخ «انجام نشده است» است." },
  { id: "CINV005", category: "ct-mri", title: "تصویربرداری CT و MRI قلب و عروق", description: "برحسب اندیکاسیون: CT آنژیوگرافی کرونر/آئورت یا MRI قلب.", answer: "نتیجه این بررسی برای کیس انتخاب‌شده مستقیم نمایش داده می‌شود؛ در صورت انجام‌نشدن، پاسخ «انجام نشده است» است." },
  { id: "CINV006", category: "invasive", title: "آنژیوگرافی و بررسی‌های تهاجمی قلب", description: "برحسب اندیکاسیون: آنژیوگرافی کرونر، کاتتریزاسیون، مطالعه الکتروفیزیولوژی یا درناژ پریکارد.", answer: "نتیجه این بررسی برای کیس انتخاب‌شده مستقیم نمایش داده می‌شود؛ در صورت انجام‌نشدن، پاسخ «انجام نشده است» است." },
  { id: "CINV007", category: "functional-monitoring", title: "بررسی‌های عملکردی و پایش قلب", description: "برحسب اندیکاسیون: هولتر، تله‌متری، تست استرس یا تست ورزش.", answer: "نتیجه این بررسی برای کیس انتخاب‌شده مستقیم نمایش داده می‌شود؛ در صورت انجام‌نشدن، پاسخ «انجام نشده است» است." },
];
