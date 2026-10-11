import type { Case, Investigation, CaseHint, ReviewQuestion } from "../types/case";
import { diseases } from "./diseases";
import { gastroenterologyQuestionBank } from "./gastroenterologyQuestionBank";
import { gastroHistoryAnswers, gastroPhysicalAnswers, gastroInvestigationAnswers } from "./gastroenterologyRevisedAnswers";
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

function history(seed: GastroSeed): CaseHint[] {
  const answers = gastroHistoryAnswers[seed.id];
  if (!answers) throw new Error(`Missing revised gastroenterology history answers for ${seed.id}`);
  return gastroenterologyQuestionBank.map((q) => {
    const content = answers[q.id];
    if (typeof content !== "string" || !content.trim()) {
      throw new Error(`Missing revised gastroenterology answer: ${seed.id}/${q.id}`);
    }
    return {
      id: `${seed.id}-${q.id}`,
      type: "history",
      title: q.text,
      sourceId: q.id,
      content,
    };
  });
}

function physical(seed: GastroSeed): CaseHint[] {
  const answers = gastroPhysicalAnswers[seed.id];
  if (!answers) throw new Error(`Missing revised gastroenterology physical exam answers for ${seed.id}`);
  return gastroenterologyPhysicalExamBank.map((item) => {
    const content = answers[item.id];
    if (typeof content !== "string" || !content.trim()) {
      throw new Error(`Missing revised gastroenterology physical exam answer: ${seed.id}/${item.id}`);
    }
    return {
      id: `${seed.id}-${item.id}`,
      type: "physical-exam",
      title: item.title,
      label: item.title,
      sourceId: item.id,
      content,
    };
  });
}

function investigations(seed: GastroSeed): Investigation[] {
  const answers = gastroInvestigationAnswers[seed.id];
  if (!answers) throw new Error(`Missing revised gastroenterology investigation answers for ${seed.id}`);
  return gastroenterologyInvestigationBank.map((item) => {
    const findings = answers[item.id];
    if (!Array.isArray(findings) || findings.length === 0 || findings.some((finding) => !finding.label?.trim() || !finding.value?.trim())) {
      throw new Error(`Missing revised gastroenterology investigation findings: ${seed.id}/${item.id}`);
    }
    return {
      id: `${seed.id}-${item.id}`,
      sourceId: item.id,
      name: item.title,
      category: item.section,
      findings,
      relevance: findings.some((finding) => /ثبت نشده|مستند نشده|انجام نشده|در دسترس نیست/.test(finding.value)) ? "low" : "high",
    };
  });
}

function review(seed: GastroSeed): ReviewQuestion[] { const opts=candidates(seed); return [{ id:`${seed.id}-review-1`, category:"diagnosis", question:"کدام تشخیص با مجموع شرح حال، معاینه و بررسی‌های این کیس بیشترین تطابق را دارد؟", options:opts.map((id,i)=>({id:`opt-${i+1}`,text:diagnosis(id).name})), correctOptionId:"opt-1", explanation:`الگوی بالینی و یافته‌های بررسی‌ها با ${diagnosis(seed.id).name} بیشترین تطابق را دارد.` }]; }

export const gastroenterologyCases: Case[] = seeds.map((seed) => ({ id:`gastro-${seed.id}`, title:seed.title, course:"gastroenterology", tags:seed.tags, difficulty:seed.difficulty, patient:{age:seed.age,sex:seed.sex}, presentation:seed.presentation, stages:[ {id:`${seed.id}-history`,type:"history",title:"شرح حال",hints:history(seed)}, {id:`${seed.id}-physical`,type:"physical-exam",title:"معاینه فیزیکی",hints:physical(seed)}, {id:`${seed.id}-investigation`,type:"investigation",title:"بررسی‌های تشخیصی",investigations:investigations(seed)} ], diagnosis:diagnosis(seed.id), candidateDiagnosisIds:candidates(seed), reviewQuestions: [] }));
