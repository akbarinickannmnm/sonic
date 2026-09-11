export type EndocrinologyQuestion = { id:string; category:string; level:string; text:string };

export const endocrinologyQuestionCategories = [
  { id:"آدرنال", label:"آدرنال" },
  { id:"استخوان و کلسیم", label:"استخوان و کلسیم" },
  { id:"تشنگی و ادرار", label:"تشنگی و ادرار" },
  { id:"تیروئید", label:"تیروئید" },
  { id:"دیابت", label:"دیابت" },
  { id:"شرح حال عمومی", label:"شرح حال عمومی" },
  { id:"هیپوفیز", label:"هیپوفیز" },
  { id:"هیپوگلیسمی", label:"هیپوگلیسمی" },
  { id:"وزن و متابولیسم", label:"وزن و متابولیسم" },
  { id:"چشم", label:"چشم" },
] as const;

export const endocrinologyQuestionBank: EndocrinologyQuestion[] = [
  { id:"endo-h-001", category:"شرح حال عمومی", level:"core", text:"علائم اصلی شما از چه زمانی شروع شده و شروع آن‌ها ناگهانی بوده یا تدریجی؟" },
  { id:"endo-h-002", category:"شرح حال عمومی", level:"core", text:"علائم شما مداوم هستند یا به‌صورت دوره‌ای ایجاد می‌شوند؟" },
  { id:"endo-h-003", category:"شرح حال عمومی", level:"core", text:"آیا علائم شما در ماه‌های اخیر بیشتر یا شدیدتر شده‌اند؟" },
  { id:"endo-h-004", category:"شرح حال عمومی", level:"core", text:"آیا شروع علائم با تغییر وزن، بیماری، استرس شدید، بارداری، مصرف داروی جدید یا تغییر سبک زندگی همزمان بوده است؟" },
  { id:"endo-h-005", category:"وزن و متابولیسم", level:"core", text:"آیا اخیراً بدون اینکه قصد داشته باشید وزن کم یا زیاد کرده‌اید؟ تقریباً چقدر؟" },
  { id:"endo-h-006", category:"وزن و متابولیسم", level:"core", text:"آیا اشتهای شما نسبت به قبل بیشتر یا کمتر شده است؟" },
  { id:"endo-h-007", category:"وزن و متابولیسم", level:"core", text:"آیا با وجود اشتهای خوب یا زیاد، وزن کم کرده‌اید؟" },
  { id:"endo-h-008", category:"وزن و متابولیسم", level:"core", text:"آیا احساس می‌کنید تحمل شما نسبت به گرما و سرما تغییر کرده است؟" },
  { id:"endo-h-009", category:"وزن و متابولیسم", level:"core", text:"آیا اخیراً دچار ضعف یا کاهش توده عضلانی شده‌اید؟" },
  { id:"endo-h-010", category:"تشنگی و ادرار", level:"core", text:"آیا تشنگی شما به‌طور غیرعادی زیاد شده است؟" },
  { id:"endo-h-011", category:"تشنگی و ادرار", level:"core", text:"آیا مقدار ادرار شما بیشتر از قبل شده است؟" },
  { id:"endo-h-012", category:"تشنگی و ادرار", level:"core", text:"آیا برای ادرار کردن شب‌ها چند بار از خواب بیدار می‌شوید؟" },
  { id:"endo-h-013", category:"تشنگی و ادرار", level:"core", text:"آیا خشکی شدید دهان یا نیاز مداوم به نوشیدن آب دارید؟" },
  { id:"endo-h-014", category:"تیروئید", level:"core", text:"آیا اخیراً بیشتر از قبل احساس گرما می‌کنید یا تحمل گرما برایتان سخت شده است؟" },
  { id:"endo-h-015", category:"تیروئید", level:"core", text:"آیا بیشتر از قبل احساس سرما می‌کنید یا نسبت به سرما حساس شده‌اید؟" },
  { id:"endo-h-016", category:"تیروئید", level:"core", text:"آیا دچار تپش قلب، افزایش ضربان قلب یا لرزش دست‌ها شده‌اید؟" },
  { id:"endo-h-017", category:"تیروئید", level:"core", text:"آیا دچار تعریق بیش از حد شده‌اید؟" },
  { id:"endo-h-018", category:"تیروئید", level:"core", text:"آیا دچار یبوست یا برعکس، افزایش دفعات اجابت مزاج شده‌اید؟" },
  { id:"endo-h-019", category:"تیروئید", level:"core", text:"آیا اخیراً بی‌قراری، اضطراب، تحریک‌پذیری یا مشکل خواب پیدا کرده‌اید؟" },
  { id:"endo-h-020", category:"تیروئید", level:"core", text:"آیا احساس خستگی، خواب‌آلودگی یا کند شدن فعالیت‌های ذهنی و جسمی داشته‌اید؟" },
  { id:"endo-h-021", category:"تیروئید", level:"core", text:"آیا متوجه ریزش مو، خشکی پوست یا تغییر بافت مو و پوست خود شده‌اید؟" },
  { id:"endo-h-022", category:"تیروئید", level:"core", text:"آیا متوجه بزرگ شدن یا وجود توده در جلوی گردن شده‌اید؟" },
  { id:"endo-h-023", category:"تیروئید", level:"core", text:"آیا هنگام بلع یا تنفس احساس فشار یا گیر کردن در ناحیه گردن دارید؟" },
  { id:"endo-h-024", category:"تیروئید", level:"core", text:"آیا درد یا حساسیت در ناحیه جلوی گردن داشته‌اید؟" },
  { id:"endo-h-025", category:"چشم", level:"core", text:"آیا چشمان شما اخیراً برجسته‌تر شده‌اند یا احساس می‌کنید ظاهر چشم‌ها تغییر کرده است؟" },
  { id:"endo-h-026", category:"چشم", level:"core", text:"آیا خشکی، سوزش، قرمزی، درد یا دوبینی داشته‌اید؟" },
  { id:"endo-h-027", category:"چشم", level:"core", text:"آیا در اثر علائم چشمی، بینایی شما تغییر کرده است؟" },
  { id:"endo-h-028", category:"هیپوفیز", level:"core", text:"آیا سردردهای جدید یا مداوم داشته‌اید؟" },
  { id:"endo-h-029", category:"هیپوفیز", level:"core", text:"آیا تغییر در میدان دید، تاری دید یا برخورد با اشیا در اطراف خود داشته‌اید؟" },
  { id:"endo-h-030", category:"هیپوفیز", level:"core", text:"آیا تغییر در میل جنسی، عملکرد جنسی یا باروری پیدا کرده‌اید؟" },
  { id:"endo-h-031", category:"هیپوفیز", level:"core", text:"آیا ترشح شیر از پستان بدون ارتباط با شیردهی داشته‌اید؟" },
  { id:"endo-h-032", category:"هیپوفیز", level:"core", text:"آیا در خانم‌ها تغییر یا قطع قاعدگی، و در آقایان کاهش نعوظ یا کاهش موهای بدن ایجاد شده است؟" },
  { id:"endo-h-033", category:"هیپوفیز", level:"core", text:"آیا قد، اندازه کفش یا انگشتر شما در بزرگسالی افزایش پیدا کرده یا دست‌ها، پاها یا اجزای صورت بزرگ‌تر شده‌اند؟" },
  { id:"endo-h-034", category:"آدرنال", level:"core", text:"آیا تجمع چربی بیشتر در شکم و صورت پیدا کرده‌اید درحالی‌که دست‌ها و پاهایتان نسبتاً لاغر مانده‌اند؟" },
  { id:"endo-h-035", category:"آدرنال", level:"core", text:"آیا روی شکم، ران‌ها یا سایر قسمت‌های بدن ترک‌های پوستی پهن و ارغوانی ایجاد شده است؟" },
  { id:"endo-h-036", category:"آدرنال", level:"core", text:"آیا پوستتان نازک‌تر شده و به‌راحتی کبود می‌شود؟" },
  { id:"endo-h-037", category:"آدرنال", level:"core", text:"آیا قدرت عضلات، به‌خصوص عضلات ران و شانه، کاهش پیدا کرده است؟" },
  { id:"endo-h-038", category:"آدرنال", level:"core", text:"آیا فشار خون شما اخیراً بالا رفته یا کنترل آن دشوار شده است؟" },
  { id:"endo-h-039", category:"آدرنال", level:"core", text:"آیا دوره‌هایی از سردرد شدید همراه با تپش قلب، تعریق و احساس ترس یا اضطراب ناگهانی دارید؟" },
  { id:"endo-h-040", category:"آدرنال", level:"core", text:"آیا دچار سرگیجه هنگام ایستادن، ضعف شدید، تهوع، استفراغ یا تمایل غیرعادی به مصرف نمک شده‌اید؟" },
  { id:"endo-h-041", category:"آدرنال", level:"core", text:"آیا پوست شما نسبت به گذشته تیره‌تر شده است، به‌خصوص در چین‌های پوستی یا مخاط دهان؟" },
  { id:"endo-h-042", category:"دیابت", level:"core", text:"آیا تاکنون به شما گفته شده که قند خونتان بالا است یا مبتلا به Diabetes Mellitus هستید؟" },
  { id:"endo-h-043", category:"دیابت", level:"core", text:"آیا سابقه حمله‌های افت قند خون، لرزش، تعریق، گرسنگی شدید، گیجی یا ضعف ناگهانی داشته‌اید؟" },
  { id:"endo-h-044", category:"دیابت", level:"core", text:"آیا اخیراً تاری دید، گزگز یا بی‌حسی دست و پا، زخم دیرخوب‌شونده یا عفونت‌های مکرر داشته‌اید؟" },
  { id:"endo-h-045", category:"دیابت", level:"core", text:"آیا در خانواده شما دیابت، به‌خصوص در سنین پایین، وجود دارد؟" },
  { id:"endo-h-046", category:"هیپوگلیسمی", level:"core", text:"آیا حملات ضعف یا گیجی شما معمولاً بعد از چند ساعت غذا نخوردن اتفاق می‌افتند یا بیشتر بعد از غذا ایجاد می‌شوند؟" },
  { id:"endo-h-047", category:"هیپوگلیسمی", level:"core", text:"آیا این حملات با خوردن یا نوشیدن مواد قندی به‌سرعت بهتر می‌شوند؟" },
  { id:"endo-h-048", category:"استخوان و کلسیم", level:"core", text:"آیا سابقه شکستگی استخوان با ضربه خفیف یا بدون ضربه قابل توجه داشته‌اید؟" },
  { id:"endo-h-049", category:"استخوان و کلسیم", level:"core", text:"آیا درد استخوان، ضعف عضلانی، گرفتگی عضلات یا گزگز اطراف دهان و دست‌ها داشته‌اید؟" },
  { id:"endo-h-050", category:"استخوان و کلسیم", level:"core", text:"آیا سابقه سنگ کلیه، شکستگی‌های مکرر یا تشخیص کلسیم خون غیرطبیعی داشته‌اید؟" },
];

type EndoCaseLike = { id:string; title:string; age:number; sex:"male"|"female"; presentation:string; tags:string[] };

const no="نه، چنین موردی نداشته‌ام.";
function has(id:string,...xs:string[]){ return xs.includes(id); }

export function answerEndocrinologyHistory(seed:EndoCaseLike, qid:string): string {
  const id=seed.id;
  const pituitary=["prolactinoma","acromegaly","nonfunctioning-pituitary-adenoma","hypopituitarism","cushing-disease","pituitary-apoplexy","lymphocytic-hypophysitis","craniopharyngioma"].includes(id);
  const hyper=["graves-disease","toxic-multinodular-goiter","toxic-adenoma","subacute-thyroiditis","amiodarone-thyroid-dysfunction"].includes(id);
  const hypo=["hashimoto-thyroiditis","primary-hypothyroidism","central-hypothyroidism"].includes(id);
  const diabetes=["type-1-diabetes-mellitus","type-2-diabetes-mellitus","diabetic-ketoacidosis","hyperosmolar-hyperglycemic-state","gestational-diabetes-mellitus","mody","secondary-diabetes-mellitus","metabolic-syndrome"].includes(id);
  switch(qid){
    case "endo-h-001": return `علائم ${seed.title} حدود چند ماه پیش شروع شد و بیشتر تدریجی بوده است؛ خودم متوجه تغییرات شدم.`;
    case "endo-h-002": return `علائم بیشتر ادامه‌دار هستند و شدتشان در طول زمان کمی نوسان دارد.`;
    case "endo-h-003": return `بله، در هفته‌ها و ماه‌های اخیر بیشتر متوجه علائم شده‌ام.`;
    case "endo-h-004": return `${has(id,"amiodarone-thyroid-dysfunction")?"شروع علائم بعد از مصرف آمیودارون بود.":has(id,"gestational-diabetes-mellitus")?"شروع مشکل با بارداری همزمان شد.":"محرک ناگهانی مشخصی به یاد ندارم."}`;
    case "endo-h-005": return `${has(id,"obesity","metabolic-syndrome")?"وزنم طی چند سال اخیر به‌تدریج بالا رفته است.":has(id,"cushing-syndrome","cushing-disease")?"چند کیلو به وزنم اضافه شده ولی بیشتر در شکم و صورتم بوده است.":has(id,"primary-adrenal-insufficiency","type-1-diabetes-mellitus","diabetic-ketoacidosis","hyperosmolar-hyperglycemic-state")?"بدون اینکه بخواهم وزن کم کرده‌ام.":"تغییر وزن واضحی نداشته‌ام."}`;
    case "endo-h-006": return `${hyper?"اشتهایم خوب یا بیشتر شده است.":has(id,"primary-adrenal-insufficiency","secondary-adrenal-insufficiency","diabetic-ketoacidosis")?"اشتهایم کم شده است.":"اشتهایم خیلی تغییر نکرده است."}`;
    case "endo-h-007": return `${hyper||id==="type-1-diabetes-mellitus"?"بله، با وجود اشتهای خوب وزنم کم شده است.":no}`;
    case "endo-h-008": return `${hyper?"گرما را سخت‌تر تحمل می‌کنم.":hypo?"بیشتر از قبل احساس سرما می‌کنم.":"تغییر مشخصی حس نکرده‌ام."}`;
    case "endo-h-009": return `${has(id,"acromegaly","cushing-syndrome","cushing-disease","primary-adrenal-insufficiency","secondary-adrenal-insufficiency","osteomalacia")?"بله، ضعف یا کاهش قدرت عضلات دارم.":"نه، کاهش واضح قدرت عضلات نداشته‌ام."}`;
    case "endo-h-010": return `${has(id,"diabetes-insipidus","type-1-diabetes-mellitus","type-2-diabetes-mellitus","diabetic-ketoacidosis","hyperosmolar-hyperglycemic-state")?"بله، تشنگی‌ام خیلی بیشتر شده است.":no}`;
    case "endo-h-011": return `${has(id,"diabetes-insipidus","type-1-diabetes-mellitus","type-2-diabetes-mellitus","diabetic-ketoacidosis","hyperosmolar-hyperglycemic-state")?"بله، مقدار ادرارم به‌طور واضح بیشتر شده است.":no}`;
    case "endo-h-012": return `${has(id,"diabetes-insipidus","type-1-diabetes-mellitus","type-2-diabetes-mellitus","diabetic-ketoacidosis","hyperosmolar-hyperglycemic-state")?"بله، چند بار در شب برای ادرار بیدار می‌شوم.":no}`;
    case "endo-h-013": return `${has(id,"diabetes-insipidus","diabetic-ketoacidosis","hyperosmolar-hyperglycemic-state")?"بله، دهانم زیاد خشک می‌شود و مرتب آب می‌خورم.":no}`;
    case "endo-h-014": return `${hyper?"بله، گرما اذیتم می‌کند.":"نه، تحمل گرما برایم تفاوتی نکرده است."}`;
    case "endo-h-015": return `${hypo?"بله، بیشتر از قبل سردم می‌شود.":"نه، حساسیت خاصی به سرما ندارم."}`;
    case "endo-h-016": return `${hyper||has(id,"pheochromocytoma","paraganglioma")?"بله، تپش قلب دارم و گاهی دست‌هایم می‌لرزد.":"تپش قلب قابل‌توجهی ندارم."}`;
    case "endo-h-017": return `${hyper||has(id,"pheochromocytoma","paraganglioma")?"بله، بیشتر از قبل عرق می‌کنم.":"تعریق غیرعادی ندارم."}`;
    case "endo-h-018": return `${hyper?"دفعات اجابت مزاجم بیشتر شده است.":hypo?"بیشتر دچار یبوست شده‌ام.":"تغییر واضحی در دفع ندارم."}`;
    case "endo-h-019": return `${hyper||has(id,"pheochromocytoma","paraganglioma")?"بی‌قرارتر شده‌ام و خوابم کم شده است.":hypo?"بیشتر خواب‌آلود و کند شده‌ام.":"اختلال خواب یا بی‌قراری خاصی ندارم."}`;
    case "endo-h-020": return `${hypo||has(id,"primary-adrenal-insufficiency","secondary-adrenal-insufficiency","type-2-diabetes-mellitus")?"بله، خستگی و کندی واضح دارم.":"خستگی دائمی و شدید ندارم."}`;
    case "endo-h-021": return `${hypo?"پوستم خشک‌تر شده و ریزش مو هم بیشتر شده است.":hyper?"ریزش مو دارم ولی پوستم گرم و مرطوب‌تر شده است.":"تغییر مشخصی در پوست و مو نداشته‌ام."}`;
    case "endo-h-022": return `${has(id,"graves-disease","hashimoto-thyroiditis","subacute-thyroiditis","toxic-multinodular-goiter","toxic-adenoma","thyroid-nodule","papillary-thyroid-carcinoma","follicular-thyroid-carcinoma","medullary-thyroid-carcinoma","anaplastic-thyroid-carcinoma")?"بله، جلوی گردنم بزرگ‌تر شده یا توده‌ای حس می‌کنم.":no}`;
    case "endo-h-023": return `${has(id,"anaplastic-thyroid-carcinoma","thyroid-nodule","papillary-thyroid-carcinoma","follicular-thyroid-carcinoma","medullary-thyroid-carcinoma")?"بله، گاهی موقع بلع یا تنفس احساس فشار می‌کنم.":"نه، فشار واضحی در گردنم ندارم."}`;
    case "endo-h-024": return `${id==="subacute-thyroiditis"?"بله، جلوی گردنم دردناک و حساس است.":"نه، درد واضح جلوی گردن ندارم."}`;
    case "endo-h-025": return `${id==="graves-disease"?"بله، حس می‌کنم چشم‌هایم برجسته‌تر شده‌اند.":no}`;
    case "endo-h-026": return `${id==="graves-disease"?"بله، خشکی و سوزش چشم و گاهی دوبینی دارم.":no}`;
    case "endo-h-027": return `${id==="graves-disease"||has(id,"pituitary-apoplexy","craniopharyngioma","nonfunctioning-pituitary-adenoma")?"بله، تاری دید یا تغییر میدان دید پیدا کرده‌ام.":"نه، تغییر مشخصی در بینایی ندارم."}`;
    case "endo-h-028": return `${pituitary||has(id,"pheochromocytoma","paraganglioma")?"بله، سردردهای جدید یا دوره‌ای داشته‌ام.":"سردرد جدید و مداومی ندارم."}`;
    case "endo-h-029": return `${has(id,"pituitary-apoplexy","craniopharyngioma","nonfunctioning-pituitary-adenoma")?"بله، تغییر در میدان دید دارم.":"نه، میدان دیدم مشکلی ندارد."}`;
    case "endo-h-030": return `${pituitary||diabetes?"بله، میل یا عملکرد جنسی‌ام کم شده است.":"تغییر مشخصی در این زمینه ندارم."}`;
    case "endo-h-031": return `${id==="prolactinoma"?"بله، بدون شیردهی ترشح شیر داشته‌ام.":"نه، چنین ترشحی نداشته‌ام."}`;
    case "endo-h-032": return `${seed.sex==="female"? (has(id,"prolactinoma","hypopituitarism","lymphocytic-hypophysitis","cushing-disease")?"قاعدگی‌ام نامنظم یا قطع شده است.":"قاعدگی‌ام تغییر واضحی نکرده است.") : (pituitary?"کاهش نعوظ یا میل جنسی داشته‌ام.":"تغییر واضحی در عملکرد جنسی ندارم.")}`;
    case "endo-h-033": return `${id==="acromegaly"?"بله، سایز کفش و انگشترم در بزرگسالی بزرگ‌تر شده است.":"نه، چنین تغییری نداشته‌ام."}`;
    case "endo-h-034": return `${has(id,"cushing-syndrome","cushing-disease")?"بله، چربی بیشتر در شکم و صورتم جمع شده و دست و پاهایم لاغرتر مانده‌اند.":"نه، چنین توزیعی ندارم."}`;
    case "endo-h-035": return `${has(id,"cushing-syndrome","cushing-disease")?"بله، ترک‌های پوستی پهن و ارغوانی روی شکم و ران‌ها دارم.":"نه، striae پهن و ارغوانی ندارم."}`;
    case "endo-h-036": return `${has(id,"cushing-syndrome","cushing-disease")?"بله، پوستم نازک‌تر شده و راحت‌تر کبود می‌شوم.":"نه، کبودی غیرعادی ندارم."}`;
    case "endo-h-037": return `${has(id,"cushing-syndrome","cushing-disease","primary-adrenal-insufficiency","secondary-adrenal-insufficiency")?"بله، برای بالا رفتن از پله یا بلند شدن از صندلی ضعف دارم.":"قدرت عضلاتم عمدتاً طبیعی است."}`;
    case "endo-h-038": return `${has(id,"primary-hyperaldosteronism","pheochromocytoma","cushing-syndrome","cushing-disease","adrenocortical-carcinoma","paraganglioma")?"بله، فشار خونم بالا رفته یا کنترلش سخت شده است.":"فشار خونم معمولاً طبیعی یا تحت کنترل است."}`;
    case "endo-h-039": return `${has(id,"pheochromocytoma","paraganglioma")?"بله، حمله‌های سردرد شدید همراه تپش قلب و تعریق دارم.":"نه، چنین حمله‌هایی ندارم."}`;
    case "endo-h-040": return `${id==="primary-adrenal-insufficiency"?"بله، هنگام ایستادن سرگیجه دارم و بیشتر هوس نمک می‌کنم.":"نه، این مجموعه علائم را ندارم."}`;
    case "endo-h-041": return `${id==="primary-adrenal-insufficiency"?"بله، پوست و بعضی مخاط‌هایم تیره‌تر شده‌اند.":"نه، تیرگی غیرعادی پوست ندارم."}`;
    case "endo-h-042": return `${diabetes?"بله، قند خونم بالا بوده یا به من گفته‌اند دیابت دارم.":"نه، تشخیص دیابت نداشته‌ام."}`;
    case "endo-h-043": return `${has(id,"diabetic-ketoacidosis","insulinoma")?"بله، حمله‌های لرزش، تعریق و ضعف ناگهانی داشته‌ام.":"نه، افت قند واضح نداشته‌ام."}`;
    case "endo-h-044": return `${diabetes?"بله، گاهی تاری دید یا گزگز و بی‌حسی پاها دارم.":"نه، این عوارض را نداشته‌ام."}`;
    case "endo-h-045": return `${has(id,"type-2-diabetes-mellitus","mody","gestational-diabetes-mellitus","metabolic-syndrome")?"بله، چند نفر از اعضای خانواده‌ام دیابت دارند.":"سابقه خانوادگی پررنگی از دیابت ندارم."}`;
    case "endo-h-046": return `${id==="mody"?"بیشتر در شرایط معمول و از سن جوانی ثابت است و با گرسنگی حمله مشخصی ندارم.":"اگر ضعفی ایجاد شود، بیشتر در زمان گرسنگی طولانی متوجه آن می‌شوم."}`;
    case "endo-h-047": return `${has(id,"diabetic-ketoacidosis")?"درمان و مایعات علائمم را بهتر می‌کند، اما حمله‌های افت قند واضح ندارم.":"اگر افت قند داشته باشم، با خوردن چیز شیرین سریع بهتر می‌شوم."}`;
    case "endo-h-048": return `${has(id,"osteoporosis")?"بله، شکستگی با ضربه خفیف داشته‌ام.":"نه، شکستگی با ضربه خفیف نداشته‌ام."}`;
    case "endo-h-049": return `${id==="osteomalacia"?"بله، درد استخوان و ضعف عضلات دارم.":has(id,"hypoparathyroidism","pseudohypoparathyroidism")?"گاهی گرفتگی عضلات و گزگز اطراف دهان و دست‌ها دارم.":"درد استخوان یا گزگز مداوم ندارم."}`;
    case "endo-h-050": return `${has(id,"primary-hyperparathyroidism","familial-hypocalciuric-hypercalcemia")?"سابقه کلسیم بالا داشته‌ام؛ در هایپرپاراتیروئیدی سنگ کلیه هم داشته‌ام.":"سابقه سنگ کلیه یا اختلال شناخته‌شده کلسیم ندارم."}`;
    default: return `درباره ${seed.title}، ${seed.presentation}؛ اطلاعات این پاسخ با وضعیت همین بیمار سازگار است.`;
  }
}
