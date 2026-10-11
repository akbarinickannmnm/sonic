export type CardiologyQuestionCategory =
  | "presenting_complaint" | "history_of_present_illness" | "past_medical_history"
  | "cardiovascular_procedures" | "medications" | "family_history" | "risk_factors";

export type CardiologyQuestion = { id: string; category: CardiologyQuestionCategory; level: "primary"; text: string; };

export const cardiologyQuestionCategories: { id: CardiologyQuestionCategory; label: string }[] = [
  { id: "presenting_complaint", label: "شکایت اصلی" },
  { id: "history_of_present_illness", label: "شرح حال بیماری فعلی" },
  { id: "past_medical_history", label: "سابقه پزشکی" },
  { id: "cardiovascular_procedures", label: "اقدامات و پروسیجرهای قلبی" },
  { id: "medications", label: "داروها" },
  { id: "family_history", label: "سابقه خانوادگی" },
  { id: "risk_factors", label: "عوامل خطر قلبی‌عروقی" },
];

export const cardiologyQuestionBank: CardiologyQuestion[] = [
  { id: "cardio-hist-001", category: "presenting_complaint", level: "primary", text: "چه چیزی باعث شد امروز مراجعه کنید؟" },
  { id: "cardio-hist-002", category: "presenting_complaint", level: "primary", text: "آیا درد یا ناراحتی قفسه سینه داشته‌اید؟" },
  { id: "cardio-hist-003", category: "presenting_complaint", level: "primary", text: "آیا تنگی نفس داشته‌اید؟" },
  { id: "cardio-hist-004", category: "presenting_complaint", level: "primary", text: "آیا احساس تپش قلب یا جا افتادن ضربان داشته‌اید؟" },
  { id: "cardio-hist-005", category: "presenting_complaint", level: "primary", text: "آیا غش کرده‌اید یا احساس کرده‌اید در آستانه غش هستید؟" },
  { id: "cardio-hist-006", category: "presenting_complaint", level: "primary", text: "آیا پاها یا مچ پاهایتان ورم کرده‌اند؟" },
  { id: "cardio-hist-007", category: "presenting_complaint", level: "primary", text: "آیا تحمل فعالیتتان کم شده یا زودتر از قبل خسته می‌شوید؟" },
  { id: "cardio-hist-008", category: "history_of_present_illness", level: "primary", text: "علائم از چه زمانی شروع شدند؟" },
  { id: "cardio-hist-009", category: "history_of_present_illness", level: "primary", text: "شروع علائم ناگهانی بود یا تدریجی؟" },
  { id: "cardio-hist-010", category: "history_of_present_illness", level: "primary", text: "از زمان شروع، علائم بهتر شده‌اند، بدتر شده‌اند یا ثابت مانده‌اند؟" },
  { id: "cardio-hist-011", category: "history_of_present_illness", level: "primary", text: "آیا درد قفسه سینه با فعالیت بدنی ایجاد یا تشدید می‌شود؟" },
  { id: "cardio-hist-012", category: "history_of_present_illness", level: "primary", text: "آیا درد قفسه سینه در حالت استراحت هم رخ می‌دهد؟" },
  { id: "cardio-hist-013", category: "history_of_present_illness", level: "primary", text: "درد قفسه سینه چه حسی دارد و شدت آن چقدر است؟" },
  { id: "cardio-hist-014", category: "history_of_present_illness", level: "primary", text: "درد یا ناراحتی دقیقاً کجاست؟" },
  { id: "cardio-hist-015", category: "history_of_present_illness", level: "primary", text: "آیا درد به دست، شانه، فک، گردن یا پشت انتشار دارد؟" },
  { id: "cardio-hist-016", category: "history_of_present_illness", level: "primary", text: "هر حمله درد چقدر طول می‌کشد و چند وقت یک‌بار رخ می‌دهد؟" },
  { id: "cardio-hist-017", category: "history_of_present_illness", level: "primary", text: "چه چیزی درد را بهتر یا بدتر می‌کند؟ آیا با استراحت یا داروی تجویزشده بهتر می‌شود؟" },
  { id: "cardio-hist-018", category: "history_of_present_illness", level: "primary", text: "آیا درد با نفس عمیق یا سرفه بدتر می‌شود؟" },
  { id: "cardio-hist-019", category: "history_of_present_illness", level: "primary", text: "آیا درد با تغییر وضعیت بدن تغییر می‌کند؟" },
  { id: "cardio-hist-020", category: "history_of_present_illness", level: "primary", text: "آیا همراه علائم، تهوع، استفراغ یا تعریق داشته‌اید؟" },
  { id: "cardio-hist-021", category: "history_of_present_illness", level: "primary", text: "آیا اخیراً تب، لرز یا عفونت داشته‌اید؟" },
  { id: "cardio-hist-022", category: "history_of_present_illness", level: "primary", text: "آیا تنگی نفس هنگام فعالیت ایجاد می‌شود؟" },
  { id: "cardio-hist-023", category: "history_of_present_illness", level: "primary", text: "آیا هنگام دراز کشیدن دچار تنگی نفس می‌شوید؟" },
  { id: "cardio-hist-024", category: "history_of_present_illness", level: "primary", text: "برای خواب راحت چند بالش زیر سرتان می‌گذارید؟" },
  { id: "cardio-hist-025", category: "history_of_present_illness", level: "primary", text: "آیا شب‌ها با احساس خفگی یا تنگی نفس از خواب بیدار می‌شوید؟" },
  { id: "cardio-hist-026", category: "history_of_present_illness", level: "primary", text: "آیا اخیراً افزایش وزن سریع یا کاهش ادرار داشته‌اید؟" },
  { id: "cardio-hist-027", category: "history_of_present_illness", level: "primary", text: "تپش قلب را چگونه احساس می‌کنید؛ تند، نامنظم، کوبنده یا جاافتاده؟" },
  { id: "cardio-hist-028", category: "history_of_present_illness", level: "primary", text: "تپش قلب ناگهانی شروع و ناگهانی قطع می‌شود؟" },
  { id: "cardio-hist-029", category: "history_of_present_illness", level: "primary", text: "ضربان هنگام حمله منظم است یا نامنظم؟" },
  { id: "cardio-hist-030", category: "history_of_present_illness", level: "primary", text: "حمله تپش قلب معمولاً چقدر طول می‌کشد و چند وقت یک‌بار رخ می‌دهد؟" },
  { id: "cardio-hist-031", category: "history_of_present_illness", level: "primary", text: "چه چیزی حمله تپش قلب را شروع یا تشدید می‌کند؟" },
  { id: "cardio-hist-032", category: "history_of_present_illness", level: "primary", text: "آیا تپش قلب با سرگیجه، درد قفسه سینه یا تنگی نفس همراه است؟" },
  { id: "cardio-hist-033", category: "history_of_present_illness", level: "primary", text: "اگر غش یا نزدیک‌غش داشته‌اید، در چه شرایطی رخ داده است؛ مثلاً هنگام فعالیت، ایستادن یا همراه تپش قلب؟" },
  { id: "cardio-hist-034", category: "history_of_present_illness", level: "primary", text: "پیش از غش چه احساسی داشتید و پس از آن چقدر سریع به حالت عادی برگشتید؟" },
  { id: "cardio-hist-035", category: "past_medical_history", level: "primary", text: "آیا قبلاً بیماری قلبی، سکته قلبی، نارسایی قلبی، آریتمی، بیماری دریچه‌ای، بیماری روماتیسمی قلب یا بیماری مادرزادی قلب داشته‌اید؟ آیا فشارخون، دیابت، چربی خون، بیماری کلیه یا تیروئید دارید؟" },
  { id: "cardio-hist-036", category: "cardiovascular_procedures", level: "primary", text: "آیا برای قلبتان آنژیوگرافی، استنت‌گذاری، جراحی، ابلیشن یا کاشت دستگاه انجام شده است؟" },
  { id: "cardio-hist-037", category: "medications", level: "primary", text: "چه داروهایی مصرف می‌کنید؟ آیا اخیراً دارویی تغییر کرده یا دوزی را جا انداخته‌اید؟" },
  { id: "cardio-hist-038", category: "medications", level: "primary", text: "آیا به دارو یا ماده‌ای حساسیت دارید؟ اگر بله، چه واکنشی داشته‌اید؟" },
  { id: "cardio-hist-039", category: "family_history", level: "primary", text: "آیا در خانواده سابقه بیماری کرونر زودرس، مرگ ناگهانی، کاردیومیوپاتی، آریتمی ارثی یا بیماری آئورت وجود دارد؟" },
  { id: "cardio-hist-040", category: "risk_factors", level: "primary", text: "آیا سیگار یا ویپ مصرف می‌کنید یا قبلاً مصرف می‌کردید؟ آیا الکل یا مواد محرک مصرف می‌کنید و سطح فعالیت بدنی معمولتان چقدر است؟" },
];
