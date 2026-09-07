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
  { id: "cardio-hist-001", category: "presenting_complaint", level: "primary", text: "چه چیزی باعث شد امروز به بیمارستان یا درمانگاه مراجعه کنید؟" },
  { id: "cardio-hist-002", category: "presenting_complaint", level: "primary", text: "آیا در حال حاضر درد یا ناراحتی قفسه سینه دارید؟" },
  { id: "cardio-hist-003", category: "presenting_complaint", level: "primary", text: "آیا تنگی نفس دارید؟" },
  { id: "cardio-hist-004", category: "presenting_complaint", level: "primary", text: "آیا احساس تپش قلب، ضربان شدید یا جا افتادن ضربان داشته‌اید؟" },
  { id: "cardio-hist-005", category: "presenting_complaint", level: "primary", text: "آیا تاکنون غش کرده‌اید یا نزدیک بوده غش کنید؟" },
  { id: "cardio-hist-006", category: "presenting_complaint", level: "primary", text: "آیا متوجه تورم پاها یا مچ پا شده‌اید؟" },
  { id: "cardio-hist-007", category: "presenting_complaint", level: "primary", text: "آیا کاهش تحمل فعالیت یا خستگی غیرعادی داشته‌اید؟" },
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
  { id: "cardio-hist-023", category: "history_of_present_illness", level: "primary", text: "آیا همراه ناراحتی قفسه سینه تهوع، استفراغ یا تعریق داشته‌اید؟" },
  { id: "cardio-hist-024", category: "history_of_present_illness", level: "primary", text: "آیا همراه ناراحتی قفسه سینه تنگی نفس هم داشته‌اید؟" },
  { id: "cardio-hist-025", category: "history_of_present_illness", level: "primary", text: "آیا تنگی نفس هنگام فعالیت ایجاد می‌شود؟" },
  { id: "cardio-hist-027", category: "history_of_present_illness", level: "primary", text: "آیا هنگام دراز کشیدن دچار تنگی نفس می‌شوید؟" },
  { id: "cardio-hist-028", category: "history_of_present_illness", level: "primary", text: "برای خواب راحت به چند بالش نیاز دارید؟" },
  { id: "cardio-hist-029", category: "history_of_present_illness", level: "primary", text: "آیا تاکنون شب‌ها ناگهان با احساس خفگی و نفس‌تنگی از خواب بیدار شده‌اید؟" },
  { id: "cardio-hist-030", category: "history_of_present_illness", level: "primary", text: "آیا افزایش سریع وزن یا بیشتر شدن تورم پاها داشته‌اید؟" },
  { id: "cardio-hist-031", category: "history_of_present_illness", level: "primary", text: "در هنگام تپش قلب چه احساسی دارید؛ تند زدن، کوبیدن، لرزش یا جا افتادن ضربان؟" },
  { id: "cardio-hist-032", category: "history_of_present_illness", level: "primary", text: "آیا تپش قلب ناگهانی شروع و ناگهانی قطع می‌شود؟" },
  { id: "cardio-hist-033", category: "history_of_present_illness", level: "primary", text: "در طول حملات ضربان قلب منظم است یا نامنظم؟" },
  { id: "cardio-hist-034", category: "history_of_present_illness", level: "primary", text: "حملات تپش قلب معمولاً چقدر طول می‌کشند؟" },
  { id: "cardio-hist-036", category: "history_of_present_illness", level: "primary", text: "آیا هنگام تپش قلب دچار سرگیجه، تنگی نفس یا درد قفسه سینه می‌شوید؟" },
  { id: "cardio-hist-038", category: "history_of_present_illness", level: "primary", text: "آیا غش کردن هنگام فعالیت بدنی رخ داد؟" },
  { id: "cardio-hist-039", category: "history_of_present_illness", level: "primary", text: "آیا پیش از غش علائم هشداردهنده‌ای مثل تهوع، تعریق یا تغییرات بینایی داشتید؟" },
  { id: "cardio-hist-040", category: "history_of_present_illness", level: "primary", text: "پس از حمله چقدر سریع به حالت عادی برگشتید؟" },
  { id: "cardio-hist-046", category: "past_medical_history", level: "primary", text: "آیا سابقه پرفشاری خون دارید؟" },
  { id: "cardio-hist-047", category: "past_medical_history", level: "primary", text: "آیا دیابت دارید؟" },
  { id: "cardio-hist-048", category: "past_medical_history", level: "primary", text: "آیا کلسترول بالا یا اختلال چربی خون دارید؟" },
  { id: "cardio-hist-056", category: "medications", level: "primary", text: "در حال حاضر چه داروهایی مصرف می‌کنید؟" },
  { id: "cardio-hist-057", category: "medications", level: "primary", text: "آیا آسپیرین، داروی ضدپلاکت دیگری یا داروی ضدانعقاد مصرف می‌کنید؟" },
  { id: "cardio-hist-062", category: "smoking_and_substance_use", level: "primary", text: "آیا در حال حاضر سیگار می‌کشید یا قبلاً سیگار می‌کشیدید؟" },
];
