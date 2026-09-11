import type { Case, Investigation, CaseHint, ReviewQuestion } from "../types/case";
import { diseases } from "./diseases";
import { gastroenterologyQuestionBank, answerGastroHistory } from "./gastroenterologyQuestionBank";
import { gastroenterologyPhysicalExamBank } from "./gastroenterologyPhysicalExamBank";
import { gastroenterologyInvestigationBank } from "./gastroenterologyInvestigationBank";

export type GastroSeed = { id: string; title: string; presentation: string; age: number; sex: "male" | "female"; tags: string[]; difficulty: "easy" | "medium" | "hard" };

const seeds: GastroSeed[] = [
  { id: "gerd" , title: "GERD", presentation: "مرد 34 ساله با سوزش پشت جناغ و برگشت ترش‌مزه غذا که بعد از وعده‌های حجیم و هنگام دراز کشیدن تشدید می‌شود.", age: 34, sex: "male", tags: ["مری"], difficulty: "easy" },
  { id: "peptic-ulcer-disease" , title: "بیماری زخم پپتیک", presentation: "زن 49 ساله با درد سوزشی اپی‌گاستر که بین وعده‌های غذایی و شب‌ها بیشتر می‌شود.", age: 49, sex: "female", tags: ["زخم-پپتیک"], difficulty: "easy" },
  { id: "h-pylori-gastritis" , title: "گاستریت مرتبط با H. pylori", presentation: "مرد 41 ساله با ناراحتی مزمن اپی‌گاستر، نفخ و سیری زودرس.", age: 41, sex: "male", tags: ["معده"], difficulty: "easy" },
  { id: "achalasia" , title: "آشالازی", presentation: "زن 38 ساله با اختلال بلع تدریجی برای جامدات و سپس مایعات، regurgitation شبانه و کاهش وزن.", age: 38, sex: "female", tags: ["مری"], difficulty: "easy" },
  { id: "eosinophilic-esophagitis" , title: "ازوفاژیت ائوزینوفیلیک", presentation: "مرد 23 ساله با گیر کردن غذاهای جامد و فشار پشت جناغ و سابقه آتوپی.", age: 23, sex: "male", tags: ["مری"], difficulty: "easy" },
  { id: "esophageal-cancer" , title: "سرطان مری", presentation: "مرد 67 ساله با dysphagia پیشرونده از جامدات به مایعات و کاهش وزن.", age: 67, sex: "male", tags: ["مری-بدخیمی"], difficulty: "easy" },
  { id: "celiac-disease" , title: "بیماری سلیاک", presentation: "زن 29 ساله با اسهال مزمن، مدفوع حجیم و چرب، نفخ و کاهش وزن.", age: 29, sex: "female", tags: ["سوءجذب"], difficulty: "easy" },
  { id: "crohn-disease" , title: "بیماری کرون", presentation: "مرد 27 ساله با اسهال مزمن، درد RLQ، کاهش وزن و درد مفصل متناوب.", age: 27, sex: "male", tags: ["IBD"], difficulty: "easy" },
  { id: "ulcerative-colitis" , title: "کولیت اولسرو", presentation: "زن 32 ساله با دفع‌های مکرر خونی و موکوسی، urgency و tenesmus.", age: 32, sex: "female", tags: ["IBD"], difficulty: "easy" },
  { id: "irritable-bowel-syndrome" , title: "سندرم روده تحریک‌پذیر", presentation: "زن 26 ساله با درد شکمی عودکننده که با دفع بهتر می‌شود و بین اسهال و یبوست جابه‌جا می‌شود.", age: 26, sex: "female", tags: ["functional"], difficulty: "easy" },
  { id: "acute-pancreatitis" , title: "پانکراتیت حاد", presentation: "مرد 46 ساله با درد شدید اپی‌گاستر منتشرشونده به پشت و تهوع و استفراغ.", age: 46, sex: "male", tags: ["پانکراس"], difficulty: "easy" },
  { id: "acute-appendicitis" , title: "آپاندیسیت حاد", presentation: "مرد 21 ساله با درد منتشر که به RLQ منتقل شده و با تب و بی‌اشتهایی همراه است.", age: 21, sex: "male", tags: ["حاد-شکم"], difficulty: "easy" },
  { id: "cholelithiasis" , title: "سنگ کیسه صفرا", presentation: "زن 44 ساله با حملات درد RUQ بعد از غذای چرب که هر بار چند ساعت طول می‌کشد.", age: 44, sex: "female", tags: ["صفرا"], difficulty: "easy" },
  { id: "acute-cholecystitis" , title: "کوله‌سیستیت حاد", presentation: "زن 51 ساله با درد مداوم RUQ، تب و تهوع از دیروز.", age: 51, sex: "female", tags: ["صفرا"], difficulty: "easy" },
  { id: "choledocholithiasis" , title: "کلدوکولیتیازیس", presentation: "مرد 58 ساله با درد RUQ و زردی و ادرار تیره.", age: 58, sex: "male", tags: ["صفرا-انسدادی"], difficulty: "easy" },
  { id: "acute-cholangitis" , title: "کلانژیت حاد", presentation: "زن 63 ساله با تب و لرز، درد RUQ و زردی.", age: 63, sex: "female", tags: ["صفرا-عفونی"], difficulty: "easy" },
  { id: "hepatitis-b" , title: "هپاتیت B", presentation: "مرد 35 ساله با خستگی، تهوع و زردی جدید و سابقه تماس جنسی پرخطر.", age: 35, sex: "male", tags: ["کبد-ویروسی"], difficulty: "easy" },
  { id: "hepatitis-c" , title: "هپاتیت C", presentation: "زن 52 ساله با خستگی مزمن و افزایش آنزیم‌های کبدی و سابقه تزریق خون قدیمی.", age: 52, sex: "female", tags: ["کبد-ویروسی"], difficulty: "easy" },
  { id: "cirrhosis" , title: "سیروز کبدی", presentation: "مرد 61 ساله با ضعف، کاهش توده عضلانی، ورم پا و شکم متورم.", age: 61, sex: "male", tags: ["کبد-مزمن"], difficulty: "easy" },
  { id: "masld-mash" , title: "MASLD/MASH", presentation: "زن 55 ساله با افزایش خفیف و مزمن ALT/AST، چاقی و دیابت نوع 2.", age: 55, sex: "female", tags: ["کبد-متابولیک"], difficulty: "easy" },
  { id: "barrett-esophagus" , title: "مری بارت", presentation: "مرد 59 ساله با سابقه طولانی GERD و مراجعه برای پیگیری اندوسکوپی.", age: 59, sex: "male", tags: ["مری-مزمن"], difficulty: "medium" },
  { id: "esophageal-stricture" , title: "تنگی مری", presentation: "زن 57 ساله با dysphagia پیشرونده برای جامدات پس از سال‌ها reflux.", age: 57, sex: "female", tags: ["مری-تنگی"], difficulty: "medium" },
  { id: "gastric-cancer" , title: "سرطان معده", presentation: "مرد 70 ساله با کاهش وزن، سیری زودرس، بی‌اشتهایی و درد مبهم اپی‌گاستر.", age: 70, sex: "male", tags: ["معده-بدخیمی"], difficulty: "medium" },
  { id: "zollinger-ellison" , title: "سندرم زولینگر–الیسون", presentation: "مرد 42 ساله با زخم‌های مکرر پپتیک و اسهال مزمن علی‌رغم درمان معمول.", age: 42, sex: "male", tags: ["اسید-پپتیک"], difficulty: "medium" },
  { id: "small-intestinal-bacterial-overgrowth" , title: "SIBO", presentation: "زن 48 ساله با نفخ، گاز زیاد، اسهال متناوب و شروع علائم پس از جراحی شکم.", age: 48, sex: "female", tags: ["روده-باریک"], difficulty: "medium" },
  { id: "whipple-disease" , title: "بیماری ویپل", presentation: "مرد 54 ساله با کاهش وزن، اسهال مزمن، درد مفاصل و ضعف.", age: 54, sex: "male", tags: ["سوءجذب-سیستمیک"], difficulty: "medium" },
  { id: "diverticular-disease" , title: "بیماری دیورتیکولی", presentation: "زن 64 ساله با دردهای خفیف دوره‌ای پایین شکم و یبوست.", age: 64, sex: "female", tags: ["کولون"], difficulty: "medium" },
  { id: "diverticulitis" , title: "دیورتیکولیت", presentation: "مرد 68 ساله با درد مداوم LLQ، تب و تغییر اجابت مزاج.", age: 68, sex: "male", tags: ["کولون-حاد"], difficulty: "medium" },
  { id: "colorectal-cancer" , title: "سرطان کولورکتال", presentation: "زن 66 ساله با تغییر عادت دفع، کم‌خونی و کاهش وزن.", age: 66, sex: "female", tags: ["کولون-بدخیمی"], difficulty: "medium" },
  { id: "microscopic-colitis" , title: "کولیت میکروسکوپیک", presentation: "زن 58 ساله با اسهال آبکی مزمن بدون خون که شب‌ها هم رخ می‌دهد.", age: 58, sex: "female", tags: ["کولیت"], difficulty: "medium" },
  { id: "acute-infectious-gastroenteritis" , title: "گاستروانتریت عفونی حاد", presentation: "مرد 30 ساله یک روز پس از غذای مشکوک با اسهال، دل‌پیچه، تهوع و تب.", age: 30, sex: "male", tags: ["عفونی"], difficulty: "medium" },
  { id: "autoimmune-hepatitis" , title: "هپاتیت خودایمنی", presentation: "زن 39 ساله با خستگی، آرترالژی و افزایش مداوم AST/ALT و گاهی زردی.", age: 39, sex: "female", tags: ["کبد-خودایمنی"], difficulty: "medium" },
  { id: "primary-biliary-cholangitis" , title: "PBC", presentation: "زن 57 ساله با خارش مزمن، خستگی و زردی تدریجی.", age: 57, sex: "female", tags: ["کبد-کلستاتیک"], difficulty: "medium" },
  { id: "primary-sclerosing-cholangitis" , title: "PSC", presentation: "مرد 36 ساله با خارش و زردی دوره‌ای و سابقه IBD.", age: 36, sex: "male", tags: ["کبد-کلستاتیک"], difficulty: "medium" },
  { id: "alcohol-associated-liver-disease" , title: "بیماری کبدی مرتبط با الکل", presentation: "مرد 52 ساله با مصرف طولانی الکل، کاهش وزن، زردی و درد RUQ.", age: 52, sex: "male", tags: ["کبد-الکل"], difficulty: "medium" },
  { id: "drug-induced-liver-injury" , title: "آسیب کبدی ناشی از دارو", presentation: "زن 45 ساله چند هفته پس از شروع داروی جدید دچار خستگی، تهوع و زردی شده است.", age: 45, sex: "female", tags: ["کبد-دارویی"], difficulty: "medium" },
  { id: "hepatitis-a" , title: "هپاتیت A", presentation: "مرد 24 ساله با تب، بی‌اشتهایی، تهوع و زردی پس از سفر و غذای خیابانی.", age: 24, sex: "male", tags: ["کبد-ویروسی"], difficulty: "medium" },
  { id: "hepatitis-e" , title: "هپاتیت E", presentation: "زن 31 ساله با تهوع، ادرار تیره و زردی پس از مصرف آب غیربهداشتی در سفر.", age: 31, sex: "female", tags: ["کبد-ویروسی"], difficulty: "medium" },
  { id: "wilson-disease" , title: "بیماری ویلسون", presentation: "مرد 19 ساله با بیماری کبدی نامشخص، تغییرات رفتاری و لرزش.", age: 19, sex: "male", tags: ["کبد-ارثی"], difficulty: "medium" },
  { id: "hereditary-hemochromatosis" , title: "هموکروماتوز ارثی", presentation: "مرد 50 ساله با خستگی، دیابت، درد مفاصل و تیرگی پوست.", age: 50, sex: "male", tags: ["کبد-ارثی"], difficulty: "medium" },
  { id: "alpha-1-antitrypsin-deficiency" , title: "کمبود آلفا-1 آنتی‌تریپسین", presentation: "زن 43 ساله با بیماری مزمن کبدی و سابقه خانوادگی مشابه.", age: 43, sex: "female", tags: ["کبد-ارثی"], difficulty: "medium" },
  { id: "chronic-pancreatitis" , title: "پانکراتیت مزمن", presentation: "مرد 49 ساله با حملات مکرر درد اپی‌گاستر، کاهش وزن و مدفوع چرب.", age: 49, sex: "male", tags: ["پانکراس-مزمن"], difficulty: "medium" },
  { id: "autoimmune-pancreatitis" , title: "پانکراتیت خودایمنی", presentation: "مرد 60 ساله با زردی و کاهش وزن و بزرگ شدن منتشر پانکراس در تصویربرداری.", age: 60, sex: "male", tags: ["پانکراس-خودایمنی"], difficulty: "medium" },
  { id: "pancreatic-cancer" , title: "سرطان پانکراس", presentation: "مرد 72 ساله با کاهش وزن سریع، زردی بدون درد، خارش و درد مبهم پشت.", age: 72, sex: "male", tags: ["پانکراس-بدخیمی"], difficulty: "hard" },
  { id: "cholangiocarcinoma" , title: "کلانژیوکارسینوما", presentation: "زن 63 ساله با زردی پیشرونده، خارش و کاهش وزن بدون درد واضح.", age: 63, sex: "female", tags: ["صفرا-بدخیمی"], difficulty: "hard" },
  { id: "mesenteric-ischemia" , title: "ایسکمی مزانتریک", presentation: "مرد 75 ساله با درد شدید شکمی که نسبت به معاینه خیلی بیشتر است و بیماری عروقی دارد.", age: 75, sex: "male", tags: ["عروقی-گوارشی"], difficulty: "hard" },
  { id: "mesenteric-venous-thrombosis" , title: "ترومبوز ورید مزانتریک", presentation: "زن 47 ساله با درد شکمی مداوم و نفخ و سابقه وضعیت افزایش‌دهنده انعقاد.", age: 47, sex: "female", tags: ["عروقی-گوارشی"], difficulty: "hard" },
  { id: "tropical-sprue" , title: "اسپروی گرمسیری", presentation: "مرد 40 ساله پس از اقامت طولانی در منطقه گرمسیری با اسهال مزمن و کاهش وزن.", age: 40, sex: "male", tags: ["سوءجذب"], difficulty: "hard" },
  { id: "short-bowel-syndrome" , title: "سندرم روده کوتاه", presentation: "زن 46 ساله با چند عمل روده و اسهال مزمن و مدفوع چرب.", age: 46, sex: "female", tags: ["سوءجذب"], difficulty: "hard" },
  { id: "hereditary-gi-polyposis" , title: "سندرم پولیپوز ارثی دستگاه گوارش", presentation: "مرد 28 ساله با سابقه خانوادگی سرطان کولورکتال و پولیپ‌های متعدد.", age: 28, sex: "male", tags: ["ارثی-کولون"], difficulty: "hard" },
  { id: "anal-fissure" , title: "فیشر آنال", presentation: "زن 33 ساله با درد تیز شدید هنگام دفع و خون روشن پس از یبوست.", age: 33, sex: "female", tags: ["آنورکتال"], difficulty: "hard" },
  { id: "hemorrhoidal-disease" , title: "بیماری هموروئیدی", presentation: "مرد 45 ساله با خون‌ریزی روشن بدون درد پس از دفع و بیرون‌زدگی هنگام اجابت مزاج.", age: 45, sex: "male", tags: ["آنورکتال"], difficulty: "hard" },
  { id: "hepatitis-d" , title: "هپاتیت D", presentation: "مرد 37 ساله با هپاتیت حاد شدید و سابقه HBV.", age: 37, sex: "male", tags: ["کبد-ویروسی"], difficulty: "hard" },
];

function diagnosis(id: string) {
  const value = diseases.find((item) => item.id === id);
  if (!value) throw new Error(`Unknown gastroenterology diagnosis: ${id}`);
  return value;
}

const groupMap: Record<string, string[]> = {"esophagus": ["gerd", "barrett-esophagus", "esophageal-stricture", "achalasia", "eosinophilic-esophagitis", "esophageal-cancer"], "peptic": ["peptic-ulcer-disease", "h-pylori-gastritis", "zollinger-ellison", "gastric-cancer"], "malabsorption": ["celiac-disease", "small-intestinal-bacterial-overgrowth", "whipple-disease", "tropical-sprue", "short-bowel-syndrome"], "ibd": ["crohn-disease", "ulcerative-colitis", "microscopic-colitis", "irritable-bowel-syndrome", "colorectal-cancer", "diverticular-disease"], "biliary": ["cholelithiasis", "acute-cholecystitis", "choledocholithiasis", "acute-cholangitis", "cholangiocarcinoma"], "viral": ["hepatitis-a", "hepatitis-b", "hepatitis-c", "hepatitis-d", "hepatitis-e"], "liver": ["cirrhosis", "primary-biliary-cholangitis", "primary-sclerosing-cholangitis", "autoimmune-hepatitis", "alcohol-associated-liver-disease", "masld-mash", "drug-induced-liver-injury", "wilson-disease", "hereditary-hemochromatosis", "alpha-1-antitrypsin-deficiency"], "pancreas": ["acute-pancreatitis", "chronic-pancreatitis", "autoimmune-pancreatitis", "pancreatic-cancer"], "abdomen": ["acute-appendicitis", "diverticulitis", "mesenteric-ischemia", "mesenteric-venous-thrombosis", "acute-infectious-gastroenteritis"], "anorectal": ["anal-fissure", "hemorrhoidal-disease", "hereditary-gi-polyposis"]};

function candidates(seed: GastroSeed): string[] {
  const group = Object.values(groupMap).find((items) => items.includes(seed.id)) ?? [];
  const result = [seed.id, ...group.filter((id) => id !== seed.id)];
  const fallback = ["gerd","peptic-ulcer-disease","acute-pancreatitis","crohn-disease","irritable-bowel-syndrome"];
  for (const id of fallback) if (result.length < 5 && id !== seed.id && !result.includes(id)) result.push(id);
  return result.slice(0,4);
}

function physicalAnswer(seed: GastroSeed, section: string): string {
  const id=seed.id;
  if(section==="general") return ["gastric-cancer","esophageal-cancer","colorectal-cancer","pancreatic-cancer","cholangiocarcinoma","cirrhosis"].includes(id)?"بیمار هوشیار است ولی ظاهر بیمار مزمن دارد و کاهش وزن و کاهش توده عضلانی خفیف تا متوسط دیده می‌شود.":["acute-pancreatitis","acute-cholecystitis","acute-cholangitis","acute-appendicitis","acute-infectious-gastroenteritis","mesenteric-ischemia"].includes(id)?"بیمار بی‌قرار و ill-appearing است و با توجه به شروع حاد، درد و علائم سیستمیک دارد.":"بیمار هوشیار و نسبتاً stable است و ظاهر کلی با شدت بیماری سازگار است.";
  if(section==="vitals") return ["acute-cholangitis","mesenteric-ischemia","acute-pancreatitis"].includes(id)?"تب و tachycardia وجود دارد و فشار خون فعلاً حفظ شده است.":id==="acute-infectious-gastroenteritis"?"تب و tachycardia خفیف وجود دارد و فشار خون کمی پایین‌تر از معمول است.":"علائم حیاتی در محدوده قابل‌قبول هستند و ناپایداری همودینامیک دیده نمی‌شود.";
  if(section==="hydration") return ["acute-infectious-gastroenteritis","acute-cholangitis","acute-pancreatitis"].includes(id)?"خشکی مخاط و شواهد dehydration خفیف وجود دارد.":id==="cirrhosis"?"ادم محیطی و شواهد احتباس مایع وجود دارد؛ مخاط خشک نیست.":"شواهد واضحی از dehydration یا fluid overload وجود ندارد.";
  if(section==="skin-eyes-mucosa") return ["hepatitis-a","hepatitis-b","hepatitis-d","hepatitis-e","choledocholithiasis","acute-cholangitis","cirrhosis","primary-biliary-cholangitis","primary-sclerosing-cholangitis","autoimmune-hepatitis","alcohol-associated-liver-disease","drug-induced-liver-injury","pancreatic-cancer","cholangiocarcinoma","autoimmune-pancreatitis"].includes(id)?"Scleral icterus وجود دارد؛ ضایعه پوستی قابل‌توجه دیگری دیده نمی‌شود.":id==="hereditary-hemochromatosis"?"Hyperpigmentation خفیف پوست دیده می‌شود و sclera بدون زردی واضح است.":"رنگ پوست و مخاط طبیعی است و زردی یا ضایعه قابل‌توجهی دیده نمی‌شود.";
  if(section==="chronic-liver") return id==="cirrhosis"?"Spider angioma، palmar erythema و مقدار کمی gynecomastia دیده می‌شود؛ caput medusae واضح نیست.":["primary-biliary-cholangitis","primary-sclerosing-cholangitis","autoimmune-hepatitis","alcohol-associated-liver-disease","hepatitis-b","hepatitis-c"].includes(id)?"برخی stigmata خفیف بیماری مزمن کبد وجود دارد، ولی portal hypertension واضح دیده نمی‌شود.":"Stigmata مشخص بیماری مزمن کبدی مشاهده نشد.";
  if(section==="abdominal-general") return ["acute-appendicitis","acute-cholecystitis","acute-cholangitis","diverticulitis","mesenteric-ischemia","acute-pancreatitis"].includes(id)?"شکم در بخش درگیر tenderness دارد و bowel sounds وجود دارند؛ guarding یا rigidity شدید مشاهده نشد.":["cirrhosis","pancreatic-cancer","cholangiocarcinoma"].includes(id)?"شکم کمی متسع است و mass واضحی لمس نمی‌شود؛ bowel sounds حضور دارند.":"شکم غیرمتسع است، bowel sounds حاضر هستند و guarding یا rigidity وجود ندارد.";
  if(section==="focal-abdomen") return ["acute-pancreatitis","chronic-pancreatitis","autoimmune-pancreatitis","zollinger-ellison","peptic-ulcer-disease","h-pylori-gastritis","gastric-cancer","pancreatic-cancer"].includes(id)?"Epigastric tenderness وجود دارد؛ توده مشخصی لمس نمی‌شود.":["cholelithiasis","acute-cholecystitis","choledocholithiasis","acute-cholangitis","cholangiocarcinoma"].includes(id)?"Tenderness در RUQ وجود دارد و در سایر ربع‌های شکم یافته بارزی دیده نمی‌شود.":id==="acute-appendicitis"?"تندرنس واضح در right lower quadrant وجود دارد.":["diverticulitis","diverticular-disease","colorectal-cancer"].includes(id)?"Tenderness بیشتر در lower abdomen، به‌خصوص LLQ، وجود دارد؛ توده بزرگ واضح لمس نمی‌شود.":"Tenderness موضعی قابل‌توجه یا mass قابل لمس دیده نشد.";
  if(section==="hepatobiliary") return id==="acute-cholecystitis"?"RUQ tenderness واضح و Murphy sign مثبت است؛ hepatomegaly و splenomegaly وجود ندارد.":["cholelithiasis","choledocholithiasis"].includes(id)?"RUQ tenderness خفیف وجود دارد؛ Murphy sign منفی است.":id==="acute-cholangitis"?"RUQ tenderness وجود دارد و معاینه دردناک است؛ Murphy sign می‌تواند مثبت باشد.":["cirrhosis","hepatitis-b","hepatitis-c","autoimmune-hepatitis","primary-biliary-cholangitis","primary-sclerosing-cholangitis","alcohol-associated-liver-disease"].includes(id)?"کبد کمی سفت یا بزرگ است و در موارد پیشرفته splenomegaly خفیف وجود دارد؛ Murphy sign منفی است.":["pancreatic-cancer","cholangiocarcinoma"].includes(id)?"زردی وجود دارد، اما Murphy sign منفی است و hepatomegaly واضح نیست.":"Hepatomegaly یا splenomegaly واضح وجود ندارد و Murphy sign منفی است.";
  if(section==="pancreatic") return id==="acute-pancreatitis"?"Epigastric tenderness شدید وجود دارد؛ Cullen یا Grey Turner sign مشاهده نشد.":id==="chronic-pancreatitis"?"تندرنس خفیف اپی‌گاستر وجود دارد؛ Cullen یا Grey Turner sign وجود ندارد.":id==="pancreatic-cancer"?"تندرنس خفیف اپی‌گاستر وجود دارد و mass واضح لمس نمی‌شود.":"در معاینه پانکراتیک یافته اختصاصی یا ecchymosis غیرطبیعی مشاهده نشد.";
  if(section==="intestinal") return ["crohn-disease","ulcerative-colitis","microscopic-colitis"].includes(id)?"Tenderness خفیف شکمی وجود دارد؛ distension شدید یا guarding دیده نمی‌شود.":["celiac-disease","small-intestinal-bacterial-overgrowth","whipple-disease","tropical-sprue","short-bowel-syndrome"].includes(id)?"شکم نرم است و distension خفیف ممکن است وجود داشته باشد؛ mass یا peritoneal signs وجود ندارد.":id==="irritable-bowel-syndrome"?"معاینه شکم عمدتاً طبیعی است و tenderness موضعی یا mass وجود ندارد.":["mesenteric-ischemia","mesenteric-venous-thrombosis"].includes(id)?"Tenderness شکمی وجود دارد و با شدت درد متناسب نیست؛ rigidity شدید فعلاً دیده نمی‌شود.":"Distension قابل‌توجه یا یافته غیرطبیعی واضح روده‌ای مشاهده نشد.";
  if(section==="anorectal") return id==="anal-fissure"?"یک fissure دردناک در ناحیه آنال دیده می‌شود و خون روشن مختصر وجود دارد.":id==="hemorrhoidal-disease"?"Hemorrhoid قابل مشاهده یا لمس وجود دارد و توده غیرطبیعی دیگری دیده نمی‌شود.":id==="crohn-disease"?"یافته پری‌آنال خفیف وجود دارد؛ fistula یا abscess واضح دیده نمی‌شود.":"یافته غیرطبیعی در معاینه آنورکتال مشاهده نشد.";
  if(section==="extraintestinal") return id==="crohn-disease"||id==="ulcerative-colitis"?"آرترالژی خفیف و یک تظاهر خارج‌روده‌ای ملایم وجود دارد؛ درگیری چشمی واضح دیده نشد.":id==="celiac-disease"?"پالور و کاهش توده عضلانی خفیف وجود دارد؛ یافته مفصلی یا چشمی واضح دیده نشد.":id==="wilson-disease"?"لرزش ظریف دست و یافته عصبی خفیف دیده می‌شود؛ سطح هوشیاری حفظ شده است.":id==="cirrhosis"?"ادم محیطی وجود دارد و asterixis خفیف دیده می‌شود.":"تظاهر خارج‌روده‌ای یا عصبی قابل‌توجهی مشاهده نشد.";
  return "یافته غیرطبیعی قابل‌توجهی مشاهده نشد.";
}

function investigationResult(seed: GastroSeed, section: string): { label:string; value:string }[] {
  const id=seed.id;
  switch(section){
    case "cbc-general":
      if(["peptic-ulcer-disease","esophageal-cancer","gastric-cancer","colorectal-cancer","hereditary-gi-polyposis"].includes(id)) return [{label:"Hb",value:"کاهش‌یافته"},{label:"MCV",value:"الگوی میکروسیتیک"},{label:"WBC/Platelet",value:"بدون افزایش واضح"}];
      if(["crohn-disease","ulcerative-colitis","acute-pancreatitis","acute-appendicitis","acute-cholecystitis","acute-cholangitis","diverticulitis","acute-infectious-gastroenteritis","mesenteric-ischemia","mesenteric-venous-thrombosis","cholangiocarcinoma","pancreatic-cancer"].includes(id)) return [{label:"WBC",value:"افزایش‌یافته با neutrophilia"},{label:"Hb",value:"طبیعی تا کمی کاهش‌یافته"},{label:"CRP",value:"افزایش‌یافته"}];
      if(["cirrhosis","alcohol-associated-liver-disease"].includes(id)) return [{label:"Hb",value:"11–12 g/dL"},{label:"Platelet",value:"کاهش‌یافته"},{label:"MCV",value:"طبیعی تا بالا"}];
      return [{label:"CBC",value:"در محدوده طبیعی"},{label:"CRP",value:"طبیعی"}];
    case "liver-synthetic":
      if(["hepatitis-a","hepatitis-b","hepatitis-c","hepatitis-d","hepatitis-e","autoimmune-hepatitis","drug-induced-liver-injury"].includes(id)) return [{label:"AST/ALT",value:"به‌طور واضح بالا، الگوی hepatocellular"},{label:"Bilirubin",value:"بالا"},{label:"Albumin/INR",value:"طبیعی تا مختصراً مختل"}];
      if(["primary-biliary-cholangitis","primary-sclerosing-cholangitis","choledocholithiasis","acute-cholangitis","pancreatic-cancer","cholangiocarcinoma"].includes(id)) return [{label:"ALP/GGT",value:"به‌طور واضح بالا، الگوی cholestatic"},{label:"Direct bilirubin",value:"افزایش‌یافته"},{label:"AST/ALT",value:"خفیف تا متوسط بالا"}];
      if(["cirrhosis","alcohol-associated-liver-disease"].includes(id)) return [{label:"AST/ALT",value:"افزایش خفیف تا متوسط"},{label:"Albumin",value:"کاهش‌یافته"},{label:"INR",value:"افزایش‌یافته"}];
      if(id==="masld-mash") return [{label:"ALT/AST",value:"افزایش خفیف، ALT غالب"},{label:"Bilirubin/Albumin/INR",value:"طبیعی"}];
      return [{label:"AST/ALT",value:"طبیعی"},{label:"ALP/Bilirubin",value:"طبیعی"},{label:"Albumin/INR",value:"طبیعی"}];
    case "pancreatic-biochem":
      if(id==="acute-pancreatitis") return [{label:"Lipase",value:">3× ULN"},{label:"Amylase",value:"افزایش‌یافته"},{label:"Calcium",value:"طبیعی تا کمی پایین"}];
      if(id==="chronic-pancreatitis") return [{label:"Lipase/Amylase",value:"طبیعی یا کمی بالا"},{label:"Glucose",value:"افزایش‌یافته"}];
      if(id==="pancreatic-cancer") return [{label:"Lipase/Amylase",value:"طبیعی یا مختصراً بالا"},{label:"Glucose",value:"افزایش‌یافته جدید"}];
      if(id==="autoimmune-pancreatitis") return [{label:"Lipase",value:"مختصراً افزایش‌یافته"},{label:"Glucose",value:"طبیعی تا کمی بالا"}];
      return [{label:"Lipase/Amylase",value:"طبیعی"},{label:"Calcium/Glucose",value:"بدون اختلال اختصاصی"}];
    case "gi-autoimmune-celiac":
      if(id==="celiac-disease") return [{label:"tTG-IgA",value:"مثبت با تیتر بالا"},{label:"Total IgA",value:"طبیعی"},{label:"ANA/ASMA/AMA",value:"منفی"}];
      if(id==="autoimmune-hepatitis") return [{label:"ANA/ASMA",value:"مثبت"},{label:"IgG",value:"افزایش‌یافته"},{label:"AMA",value:"منفی"}];
      if(id==="primary-biliary-cholangitis") return [{label:"AMA",value:"مثبت"},{label:"IgG",value:"طبیعی تا کمی بالا"}];
      return [{label:"Autoimmune panel",value:"یافته اختصاصی به نفع بیماری خودایمنی دیده نشد"},{label:"Celiac serology",value:"منفی"}];
    case "viral-metabolic-liver":
      if(["hepatitis-a","hepatitis-b","hepatitis-c","hepatitis-d","hepatitis-e"].includes(id)) return [{label:"Viral serology",value:"الگوی مارکری سازگار با عفونت فعال"},{label:"تست‌های تکمیلی",value:"بر اساس نوع ویروس پیگیری می‌شود"}];
      if(id==="wilson-disease") return [{label:"Ceruloplasmin",value:"پایین"},{label:"24-h urine copper",value:"افزایش‌یافته"},{label:"Serum copper",value:"کاهش‌یافته"}];
      if(id==="hereditary-hemochromatosis") return [{label:"Ferritin",value:"افزایش‌یافته"},{label:"Transferrin saturation",value:">45%"}];
      if(id==="alpha-1-antitrypsin-deficiency") return [{label:"A1AT",value:"پایین"},{label:"Phenotype",value:"الگوی کمبود مرتبط"}];
      return [{label:"Viral hepatitis screen",value:"منفی"},{label:"Metabolic screen",value:"یافته اختصاصی ندارد"}];
    case "stool":
      if(id==="acute-infectious-gastroenteritis") return [{label:"Stool culture/PCR",value:"عامل عفونی محتمل شناسایی شد"},{label:"C. difficile",value:"منفی"}];
      if(["crohn-disease","ulcerative-colitis"].includes(id)) return [{label:"Occult blood",value:"مثبت"},{label:"Stool culture/C. difficile",value:"منفی"}];
      return [{label:"Stool studies",value:"یافته عفونی اختصاصی ندارد"},{label:"Occult blood",value:"منفی یا بدون یافته اختصاصی"}];
    case "fecal-inflammatory-malabsorption":
      if(["crohn-disease","ulcerative-colitis","microscopic-colitis"].includes(id)) return [{label:"Fecal calprotectin",value:"افزایش‌یافته"},{label:"Fecal fat",value:"طبیعی"},{label:"Fecal elastase",value:"طبیعی"}];
      if(["celiac-disease","whipple-disease","tropical-sprue","short-bowel-syndrome","small-intestinal-bacterial-overgrowth"].includes(id)) return [{label:"Fecal fat",value:"افزایش‌یافته"},{label:"Fecal calprotectin",value:"طبیعی تا مختصراً بالا"},{label:"Fecal elastase",value:"در محدوده طبیعی"}];
      if(id==="chronic-pancreatitis") return [{label:"Fecal elastase",value:"کاهش‌یافته"},{label:"Fecal fat",value:"افزایش‌یافته"}];
      return [{label:"Fecal calprotectin",value:"طبیعی"},{label:"Fecal fat",value:"طبیعی"},{label:"Fecal elastase",value:"طبیعی"}];
    case "abdominal-ultrasound":
      if(id==="cholelithiasis") return [{label:"Gallbladder",value:"سنگ‌های متحرک بدون wall thickening؛ CBD طبیعی"}];
      if(id==="acute-cholecystitis") return [{label:"Gallbladder",value:"سنگ، wall thickening و pericholecystic fluid"},{label:"Sonographic Murphy",value:"مثبت"}];
      if(["choledocholithiasis","acute-cholangitis"].includes(id)) return [{label:"Bile ducts",value:"اتساع مجاری صفراوی و احتمال سنگ CBD"}];
      if(["cirrhosis","primary-biliary-cholangitis","primary-sclerosing-cholangitis","alcohol-associated-liver-disease"].includes(id)) return [{label:"Liver",value:"اکوی ناهمگون و علائم بیماری مزمن کبد"},{label:"Portal/Spleen",value:"در موارد پیشرفته splenomegaly یا portal hypertension"}];
      if(id==="pancreatic-cancer") return [{label:"Pancreas",value:"توده پانکراس با dilated biliary tree"}];
      if(id==="cholangiocarcinoma") return [{label:"Bile ducts",value:"اتساع بالادست ضایعه انسدادی"}];
      return [{label:"Ultrasound",value:"یافته ساختاری مهم یا انسداد واضح مشاهده نشد."}];
    case "ct-abdomen":
      if(id==="acute-appendicitis") return [{label:"Appendix",value:"قطور و ملتهب با periappendiceal inflammation"}];
      if(id==="diverticulitis") return [{label:"Colon",value:"Diverticula همراه wall thickening و pericolic fat stranding"}];
      if(id==="mesenteric-ischemia") return [{label:"Mesenteric vessels",value:"کاهش پرفیوژن مزانتریک و شواهد ایسکمی"},{label:"Bowel",value:"تغییرات ایسکمیک متناسب با شدت"}];
      if(id==="mesenteric-venous-thrombosis") return [{label:"Mesenteric veins",value:"ترومبوز ورید مزانتریک همراه edema روده"}];
      if(id==="pancreatic-cancer") return [{label:"Pancreas",value:"توده سر پانکراس و انسداد مجرای صفراوی"}];
      if(id==="colorectal-cancer") return [{label:"Colon",value:"ضخیم‌شدگی فوکال دیواره و ضایعه مشکوک به تومور"}];
      if(id==="crohn-disease") return [{label:"Bowel",value:"segmental wall thickening و skip involvement"}];
      return [{label:"CT abdomen/pelvis",value:"یافته اختصاصی دیگری مشاهده نشد."}];
    case "endoscopy-biopsy":
      if(id==="gerd") return [{label:"EGD",value:"erosive esophagitis خفیف تا متوسط"}];
      if(id==="barrett-esophagus") return [{label:"EGD",value:"columnar mucosa در GE junction"},{label:"Histopathology",value:"intestinal metaplasia سازگار با Barrett"}];
      if(id==="achalasia") return [{label:"EGD/Manometry",value:"مری گشاد با مقاومت در LES؛ اختلال حرکتی محتمل"}];
      if(id==="eosinophilic-esophagitis") return [{label:"EGD",value:"rings/furrows و narrowing"},{label:"Biopsy",value:"افزایش eosinophils"}];
      if(id==="peptic-ulcer-disease") return [{label:"EGD",value:"ulcer گوارشی"}];
      if(id==="h-pylori-gastritis") return [{label:"EGD/biopsy",value:"گاستریت"},{label:"Histopathology",value:"H. pylori مثبت"}];
      if(id==="gastric-cancer") return [{label:"EGD",value:"توده یا زخم نامنظم مشکوک به بدخیمی"},{label:"Biopsy",value:"بدخیمی تأییدشده"}];
      if(id==="celiac-disease") return [{label:"Duodenal biopsy",value:"villous atrophy و افزایش intraepithelial lymphocytes"}];
      if(["crohn-disease","ulcerative-colitis","microscopic-colitis","colorectal-cancer","diverticular-disease","diverticulitis","hereditary-gi-polyposis"].includes(id)) return [{label:"Colonoscopy",value:"یافته آندوسکوپیک متناسب با تشخیص"},{label:"Biopsy/Pathology",value:"الگوی پاتولوژیک سازگار"}];
      if(["pancreatic-cancer","cholangiocarcinoma","autoimmune-pancreatitis","chronic-pancreatitis"].includes(id)) return [{label:"EUS/biopsy",value:"یافته ساختاری پانکراس یا صفراوی متناسب با تشخیص"}];
      return [{label:"Endoscopy/Histopathology",value:"یافته اختصاصی قابل‌توجهی مشاهده نشد."}];
    default: return [{label:"نتیجه",value:"یافته اختصاصی قابل‌توجهی مشاهده نشد."}];
  }
}

function history(seed: GastroSeed): CaseHint[] {
  const patientCase = {
    id: `gastro-${seed.id}`,
    title: seed.title,
    course: "gastroenterology" as const,
    tags: seed.tags,
    difficulty: seed.difficulty,
    patient: { age: seed.age, sex: seed.sex },
    presentation: seed.presentation,
    stages: [],
    diagnosis: diagnosis(seed.id),
    candidateDiagnosisIds: [],
    reviewQuestions: [],
  } satisfies Case;
  return gastroenterologyQuestionBank.map((q) => ({
    id: `${seed.id}-${q.id}`,
    type: "history",
    title: q.text,
    sourceId: q.id,
    content: answerGastroHistory(patientCase, q.id),
  }));
}
function physical(seed: GastroSeed): CaseHint[] { return gastroenterologyPhysicalExamBank.map((item) => ({ id: `${seed.id}-${item.id}`, type: "physical-exam", title: item.title, label: item.title, sourceId: item.id, content: physicalAnswer(seed,item.section) })); }
function investigations(seed: GastroSeed): Investigation[] { return gastroenterologyInvestigationBank.map((item) => ({ id: `${seed.id}-${item.id}`, sourceId: item.id, name: item.title, category: item.section, findings: investigationResult(seed,item.section), relevance: "high" })); }
function review(seed: GastroSeed): ReviewQuestion[] { const opts=candidates(seed); return [{ id:`${seed.id}-review-1`, category:"diagnosis", question:"کدام تشخیص با مجموع شرح حال، معاینه و بررسی‌های این کیس بیشترین تطابق را دارد؟", options:opts.map((id,i)=>({id:`opt-${i+1}`,text:diagnosis(id).name})), correctOptionId:"opt-1", explanation:`الگوی بالینی و یافته‌های بررسی‌ها با ${diagnosis(seed.id).name} بیشترین تطابق را دارد.` }]; }

export const gastroenterologyCases: Case[] = seeds.map((seed) => ({ id:`gastro-${seed.id}`, title:seed.title, course:"gastroenterology", tags:seed.tags, difficulty:seed.difficulty, patient:{age:seed.age,sex:seed.sex}, presentation:seed.presentation, stages:[ {id:`${seed.id}-history`,type:"history",title:"شرح حال",hints:history(seed)}, {id:`${seed.id}-physical`,type:"physical-exam",title:"معاینه فیزیکی",hints:physical(seed)}, {id:`${seed.id}-investigation`,type:"investigation",title:"بررسی‌های تشخیصی",investigations:investigations(seed)} ], diagnosis:diagnosis(seed.id), candidateDiagnosisIds:candidates(seed), reviewQuestions:review(seed) }));
