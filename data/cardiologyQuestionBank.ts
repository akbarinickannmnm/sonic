export type CardiologyQuestionCategory =
  | "presenting_complaint"
  | "history_of_present_illness"
  | "past_medical_history"
  | "cardiovascular_procedures"
  | "medications"
  | "smoking_and_substance_use"
  | "lifestyle"
  | "family_history"
  | "infectious_and_systemic_history"
  | "congenital_and_childhood_history";

export type CardiologyQuestion = {
  id: string;
  category: CardiologyQuestionCategory;
  level: "primary";
  text: string;
};

export const cardiologyQuestionCategories: {
  id: CardiologyQuestionCategory;
  label: string;
}[] = [
  { id: "presenting_complaint", label: "شکایت اصلی" },
  { id: "history_of_present_illness", label: "شرح حال بیماری فعلی" },
  { id: "past_medical_history", label: "سابقه پزشکی" },
  { id: "cardiovascular_procedures", label: "اقدامات و پروسیجرهای قلبی" },
  { id: "medications", label: "داروها" },
  { id: "smoking_and_substance_use", label: "سیگار و مواد" },
  { id: "lifestyle", label: "سبک زندگی" },
  { id: "family_history", label: "سابقه خانوادگی" },
  { id: "infectious_and_systemic_history", label: "سابقه عفونی و سیستمیک" },
  { id: "congenital_and_childhood_history", label: "سابقه مادرزادی و دوران کودکی" },
];

export const cardiologyQuestionBank: CardiologyQuestion[] = [
  // Presenting Complaint
  { id: "cardio-hist-001", category: "presenting_complaint", level: "primary", text: "چه چیزی باعث شد امروز به بیمارستان یا درمانگاه مراجعه کنید؟" },
  { id: "cardio-hist-002", category: "presenting_complaint", level: "primary", text: "آیا در حال حاضر درد یا ناراحتی قفسه سینه دارید؟" },
  { id: "cardio-hist-003", category: "presenting_complaint", level: "primary", text: "آیا تنگی نفس دارید؟" },
  { id: "cardio-hist-004", category: "presenting_complaint", level: "primary", text: "آیا احساس تپش قلب، ضربان شدید یا جا افتادن ضربان داشته‌اید؟" },
  { id: "cardio-hist-005", category: "presenting_complaint", level: "primary", text: "آیا تاکنون غش کرده‌اید یا نزدیک بوده غش کنید؟" },
  { id: "cardio-hist-006", category: "presenting_complaint", level: "primary", text: "آیا متوجه تورم پاها یا مچ پا شده‌اید؟" },
  { id: "cardio-hist-007", category: "presenting_complaint", level: "primary", text: "آیا کاهش تحمل فعالیت یا خستگی غیرعادی داشته‌اید؟" },
  { id: "cardio-hist-008", category: "presenting_complaint", level: "primary", text: "آیا متوجه کبودی لب‌ها یا انگشتان خود شده‌اید؟" },
  { id: "cardio-hist-009", category: "presenting_complaint", level: "primary", text: "آیا تب، لرز یا علائم سیستمیک دیگری داشته‌اید؟" },

  // History of Present Illness
  { id: "cardio-hist-010", category: "history_of_present_illness", level: "primary", text: "علائم شما از چه زمانی شروع شد؟" },
  { id: "cardio-hist-011", category: "history_of_present_illness", level: "primary", text: "علائم ناگهانی شروع شدند یا تدریجی؟" },
  { id: "cardio-hist-012", category: "history_of_present_illness", level: "primary", text: "علائم در حال بدتر شدن، بهبود یا بدون تغییر بوده‌اند؟" },
  { id: "cardio-hist-013", category: "history_of_present_illness", level: "primary", text: "آیا ناراحتی قفسه سینه با فعالیت بدنی ایجاد می‌شود؟" },
  { id: "cardio-hist-014", category: "history_of_present_illness", level: "primary", text: "آیا ناراحتی قفسه سینه در حالت استراحت هم ایجاد می‌شود؟" },
  { id: "cardio-hist-015", category: "history_of_present_illness", level: "primary", text: "ناراحتی قفسه سینه چه حسی دارد؛ فشار، فشردگی، سوزش، درد خنجری یا پارگی؟" },
  { id: "cardio-hist-016", category: "history_of_present_illness", level: "primary", text: "درد یا ناراحتی قفسه سینه دقیقاً کجا قرار دارد؟" },
  { id: "cardio-hist-017", category: "history_of_present_illness", level: "primary", text: "آیا درد به دست، فک، گردن، شانه یا پشت انتشار پیدا می‌کند؟" },
  { id: "cardio-hist-018", category: "history_of_present_illness", level: "primary", text: "هر حمله ناراحتی قفسه سینه چقدر طول می‌کشد؟" },
  { id: "cardio-hist-019", category: "history_of_present_illness", level: "primary", text: "آیا چیزی ناراحتی قفسه سینه را بهتر یا بدتر می‌کند؟" },
  { id: "cardio-hist-020", category: "history_of_present_illness", level: "primary", text: "آیا درد قفسه سینه با نفس عمیق یا سرفه بدتر می‌شود؟" },
  { id: "cardio-hist-021", category: "history_of_present_illness", level: "primary", text: "آیا درد قفسه سینه با وضعیت بدن، مثل دراز کشیدن یا خم شدن به جلو، تغییر می‌کند؟" },
  { id: "cardio-hist-022", category: "history_of_present_illness", level: "primary", text: "آیا استراحت ناراحتی قفسه سینه را برطرف می‌کند؟" },
  { id: "cardio-hist-023", category: "history_of_present_illness", level: "primary", text: "آیا همراه ناراحتی قفسه سینه تهوع، استفراغ یا تعریق داشته‌اید؟" },
  { id: "cardio-hist-024", category: "history_of_present_illness", level: "primary", text: "آیا همراه ناراحتی قفسه سینه تنگی نفس هم داشته‌اید؟" },
  { id: "cardio-hist-025", category: "history_of_present_illness", level: "primary", text: "آیا تنگی نفس هنگام فعالیت ایجاد می‌شود؟" },
  { id: "cardio-hist-026", category: "history_of_present_illness", level: "primary", text: "آیا تحمل فعالیت شما اخیراً کاهش یافته است؟" },
  { id: "cardio-hist-027", category: "history_of_present_illness", level: "primary", text: "آیا هنگام دراز کشیدن دچار تنگی نفس می‌شوید؟" },
  { id: "cardio-hist-028", category: "history_of_present_illness", level: "primary", text: "برای خواب راحت به چند بالش نیاز دارید؟" },
  { id: "cardio-hist-029", category: "history_of_present_illness", level: "primary", text: "آیا تاکنون شب‌ها ناگهان با احساس خفگی و نفس‌تنگی از خواب بیدار شده‌اید؟" },
  { id: "cardio-hist-030", category: "history_of_present_illness", level: "primary", text: "آیا افزایش سریع وزن یا بیشتر شدن تورم پاها داشته‌اید؟" },
  { id: "cardio-hist-031", category: "history_of_present_illness", level: "primary", text: "در هنگام تپش قلب چه احساسی دارید؛ تند زدن، کوبیدن، لرزش یا جا افتادن ضربان؟" },
  { id: "cardio-hist-032", category: "history_of_present_illness", level: "primary", text: "آیا تپش قلب ناگهانی شروع و ناگهانی قطع می‌شود؟" },
  { id: "cardio-hist-033", category: "history_of_present_illness", level: "primary", text: "در طول حملات ضربان قلب منظم است یا نامنظم؟" },
  { id: "cardio-hist-034", category: "history_of_present_illness", level: "primary", text: "حملات تپش قلب معمولاً چقدر طول می‌کشند؟" },
  { id: "cardio-hist-035", category: "history_of_present_illness", level: "primary", text: "آیا تپش قلب با ورزش، کافئین، الکل یا استرس تحریک می‌شود؟" },
  { id: "cardio-hist-036", category: "history_of_present_illness", level: "primary", text: "آیا هنگام تپش قلب دچار سرگیجه، تنگی نفس یا درد قفسه سینه می‌شوید؟" },
  { id: "cardio-hist-037", category: "history_of_present_illness", level: "primary", text: "آیا درست قبل از غش یا نزدیک غش کردن تپش قلب داشتید؟" },
  { id: "cardio-hist-038", category: "history_of_present_illness", level: "primary", text: "آیا غش کردن هنگام فعالیت بدنی رخ داد؟" },
  { id: "cardio-hist-039", category: "history_of_present_illness", level: "primary", text: "آیا پیش از غش علائم هشداردهنده‌ای مثل تهوع، تعریق یا تغییرات بینایی داشتید؟" },
  { id: "cardio-hist-040", category: "history_of_present_illness", level: "primary", text: "پس از حمله چقدر سریع به حالت عادی برگشتید؟" },

  // Past Medical History
  { id: "cardio-hist-041", category: "past_medical_history", level: "primary", text: "آیا تاکنون سکته قلبی یا سندرم حاد کرونری داشته‌اید؟" },
  { id: "cardio-hist-042", category: "past_medical_history", level: "primary", text: "آیا تاکنون بیماری عروق کرونر برای شما تشخیص داده شده است؟" },
  { id: "cardio-hist-043", category: "past_medical_history", level: "primary", text: "آیا تاکنون نارسایی قلبی برای شما تشخیص داده شده است؟" },
  { id: "cardio-hist-044", category: "past_medical_history", level: "primary", text: "آیا تاکنون آریتمی برای شما تشخیص داده شده است؟" },
  { id: "cardio-hist-045", category: "past_medical_history", level: "primary", text: "آیا تاکنون به شما گفته‌اند سوفل قلبی یا بیماری دریچه‌ای دارید؟" },
  { id: "cardio-hist-046", category: "past_medical_history", level: "primary", text: "آیا سابقه پرفشاری خون دارید؟" },
  { id: "cardio-hist-047", category: "past_medical_history", level: "primary", text: "آیا دیابت دارید؟" },
  { id: "cardio-hist-048", category: "past_medical_history", level: "primary", text: "آیا کلسترول بالا یا اختلال چربی خون دارید؟" },
  { id: "cardio-hist-049", category: "past_medical_history", level: "primary", text: "آیا بیماری کلیوی دارید؟" },
  { id: "cardio-hist-050", category: "past_medical_history", level: "primary", text: "آیا بیماری تیروئید دارید؟" },

  // Cardiovascular Procedures
  { id: "cardio-hist-051", category: "cardiovascular_procedures", level: "primary", text: "آیا تاکنون آنژیوگرافی کرونر یا کاتتریزاسیون قلبی داشته‌اید؟" },
  { id: "cardio-hist-052", category: "cardiovascular_procedures", level: "primary", text: "آیا تاکنون استنت کرونر یا آنژیوپلاستی داشته‌اید؟" },
  { id: "cardio-hist-053", category: "cardiovascular_procedures", level: "primary", text: "آیا تاکنون جراحی بای‌پس عروق کرونر داشته‌اید؟" },
  { id: "cardio-hist-054", category: "cardiovascular_procedures", level: "primary", text: "آیا تاکنون برای آریتمی ابلیشن انجام داده‌اید؟" },
  { id: "cardio-hist-055", category: "cardiovascular_procedures", level: "primary", text: "آیا پیس‌میکر یا دفیبریلاتور قابل کاشت دارید؟" },

  // Medications
  { id: "cardio-hist-056", category: "medications", level: "primary", text: "در حال حاضر چه داروهایی مصرف می‌کنید؟" },
  { id: "cardio-hist-057", category: "medications", level: "primary", text: "آیا آسپیرین، داروی ضدپلاکت دیگری یا داروی ضدانعقاد مصرف می‌کنید؟" },
  { id: "cardio-hist-058", category: "medications", level: "primary", text: "آیا بتابلوکر یا داروی دیگری برای کنترل ضربان قلب یا فشار خون مصرف می‌کنید؟" },
  { id: "cardio-hist-059", category: "medications", level: "primary", text: "آیا دیورتیک یا داروی نارسایی قلبی مصرف می‌کنید؟" },
  { id: "cardio-hist-060", category: "medications", level: "primary", text: "آیا اخیراً تغییری در داروهای قلبی شما ایجاد شده است؟" },
  { id: "cardio-hist-061", category: "medications", level: "primary", text: "آیا اخیراً دوزی از داروهای معمول خود را جا انداخته‌اید؟" },

  // Smoking & Substance Use
  { id: "cardio-hist-062", category: "smoking_and_substance_use", level: "primary", text: "آیا در حال حاضر سیگار می‌کشید یا قبلاً سیگار می‌کشیدید؟" },
  { id: "cardio-hist-063", category: "smoking_and_substance_use", level: "primary", text: "چه مقدار سیگار می‌کشید و چند سال است؟" },
  { id: "cardio-hist-064", category: "smoking_and_substance_use", level: "primary", text: "آیا الکل مصرف می‌کنید؟" },
  { id: "cardio-hist-065", category: "smoking_and_substance_use", level: "primary", text: "معمولاً چه مقدار الکل مصرف می‌کنید؟" },
  { id: "cardio-hist-066", category: "smoking_and_substance_use", level: "primary", text: "آیا کوکائین، آمفتامین یا مواد محرک دیگری مصرف می‌کنید؟" },

  // Lifestyle
  { id: "cardio-hist-067", category: "lifestyle", level: "primary", text: "در یک هفته معمولی چقدر فعالیت بدنی دارید؟" },
  { id: "cardio-hist-068", category: "lifestyle", level: "primary", text: "آیا اخیراً در انجام فعالیت‌هایی که قبلاً به‌راحتی انجام می‌دادید ناتوان شده‌اید؟" },
  { id: "cardio-hist-069", category: "lifestyle", level: "primary", text: "آیا خرخر شدید دارید یا تاکنون آپنه خواب برای شما تشخیص داده شده است؟" },
  { id: "cardio-hist-070", category: "lifestyle", level: "primary", text: "آیا اخیراً تغییر قابل‌توجهی در رژیم غذایی یا وزن شما ایجاد شده است؟" },

  // Family History
  { id: "cardio-hist-071", category: "family_history", level: "primary", text: "آیا در خانواده شما کسی در سن پایین سکته قلبی یا بیماری کرونر داشته است؟" },
  { id: "cardio-hist-072", category: "family_history", level: "primary", text: "آیا در خانواده شما کسی در سن پایین به‌طور ناگهانی یا غیرمنتظره فوت کرده است؟" },
  { id: "cardio-hist-073", category: "family_history", level: "primary", text: "آیا کسی در خانواده شما کاردیومیوپاتی دارد؟" },
  { id: "cardio-hist-074", category: "family_history", level: "primary", text: "آیا کسی در خانواده شما آریتمی ارثی یا اختلال ریتم دارد؟" },
  { id: "cardio-hist-075", category: "family_history", level: "primary", text: "آیا کسی در خانواده شما بیماری مادرزادی قلب دارد؟" },
  { id: "cardio-hist-076", category: "family_history", level: "primary", text: "آیا کسی در خانواده شما آنوریسم آئورت یا دایسکشن آئورت داشته است؟" },
  { id: "cardio-hist-077", category: "family_history", level: "primary", text: "آیا کسی در خانواده شما کلسترول بسیار بالا یا اختلال چربی ارثی شناخته‌شده دارد؟" },

  // Infectious & Systemic History
  { id: "cardio-hist-078", category: "infectious_and_systemic_history", level: "primary", text: "آیا اخیراً بیماری ویروسی یا علائمی شبیه آنفلوانزا داشته‌اید؟" },
  { id: "cardio-hist-079", category: "infectious_and_systemic_history", level: "primary", text: "آیا اخیراً اقدام دندان‌پزشکی یا عفونت دندانی داشته‌اید؟" },
  { id: "cardio-hist-080", category: "infectious_and_systemic_history", level: "primary", text: "آیا اخیراً جراحی یا اقدام پزشکی تهاجمی دیگری داشته‌اید؟" },
  { id: "cardio-hist-081", category: "infectious_and_systemic_history", level: "primary", text: "آیا سابقه اندوکاردیت عفونی دارید؟" },
  { id: "cardio-hist-082", category: "infectious_and_systemic_history", level: "primary", text: "آیا تاکنون تب روماتیسمی داشته‌اید؟" },
  { id: "cardio-hist-083", category: "infectious_and_systemic_history", level: "primary", text: "آیا بیماری خودایمنی یا بیماری بافت همبند دارید؟" },
  { id: "cardio-hist-084", category: "infectious_and_systemic_history", level: "primary", text: "آیا تاکنون بیماری سیستمیک التهابی یا نفوذی برای شما تشخیص داده شده است؟" },

  // Congenital & Childhood History
  { id: "cardio-hist-085", category: "congenital_and_childhood_history", level: "primary", text: "آیا در کودکی به شما گفته‌اند مشکل قلبی یا سوفل قلبی دارید؟" },
  { id: "cardio-hist-086", category: "congenital_and_childhood_history", level: "primary", text: "آیا تاکنون بیماری مادرزادی قلب برای شما تشخیص داده شده است؟" },
  { id: "cardio-hist-087", category: "congenital_and_childhood_history", level: "primary", text: "آیا در دوران کودکی دوره‌هایی از سیانوز داشتید؟" },
  { id: "cardio-hist-088", category: "congenital_and_childhood_history", level: "primary", text: "آیا در دوران کودکی جراحی قلب یا درمان با کاتتر داشته‌اید؟" },
  { id: "cardio-hist-089", category: "congenital_and_childhood_history", level: "primary", text: "آیا در دوران کودکی هنگام فعالیت بدنی نمی‌توانستید هم‌پای سایر کودکان باشید؟" },
  { id: "cardio-hist-130", category: "history_of_present_illness", level: "primary", text: "آیا درد قفسه سینه شما همیشه با فعالیت ارتباط دارد؟" },
];
