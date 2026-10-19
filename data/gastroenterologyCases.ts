import type { Case, Investigation, CaseHint, ReviewQuestion } from "../types/case";
import { diseases } from "./diseases";
import { gastroenterologyQuestionBank } from "./gastroenterologyQuestionBank";
import { gastroHistoryAnswers, gastroPhysicalAnswers, gastroInvestigationAnswers } from "./gastroenterologyRevisedAnswers";
import { gastroenterologyPhysicalExamBank } from "./gastroenterologyPhysicalExamBank";
import { gastroenterologyInvestigationBank } from "./gastroenterologyInvestigationBank";

export type GastroSeed = { id: string; caseCode: string; title: string; presentation: string; age: number; sex: "male" | "female"; tags: string[]; difficulty: "easy" | "medium" | "hard" };

const seeds: GastroSeed[] = [
  { id: "gerd" , caseCode: "GI-001", title: "GERD", presentation: "سوزش سردل و برگشت ترش‌مزه غذا", age: 34, sex: "male", tags: ["مری"], difficulty: "easy" },
  { id: "peptic-ulcer-disease" , caseCode: "GI-002", title: "بیماری زخم پپتیک", presentation: "درد سوزشی اپی‌گاستر", age: 49, sex: "female", tags: ["زخم-پپتیک"], difficulty: "easy" },
  { id: "h-pylori-gastritis" , caseCode: "GI-003", title: "گاستریت مرتبط با H. pylori", presentation: "ناراحتی اپی‌گاستر و نفخ", age: 41, sex: "male", tags: ["معده"], difficulty: "medium" },
  { id: "achalasia" , caseCode: "GI-004", title: "آشالازی", presentation: "اختلال بلع", age: 38, sex: "female", tags: ["مری"], difficulty: "easy" },
  { id: "eosinophilic-esophagitis" , caseCode: "GI-005", title: "ازوفاژیت ائوزینوفیلیک", presentation: "گیر کردن غذا هنگام بلع", age: 23, sex: "male", tags: ["مری"], difficulty: "easy" },
  { id: "esophageal-cancer" , caseCode: "GI-006", title: "سرطان مری", presentation: "اختلال بلع پیشرونده", age: 67, sex: "male", tags: ["مری-بدخیمی"], difficulty: "easy" },
  { id: "celiac-disease" , caseCode: "GI-007", title: "بیماری سلیاک", presentation: "اسهال مزمن و کاهش وزن", age: 29, sex: "female", tags: ["سوءجذب"], difficulty: "easy" },
  { id: "crohn-disease" , caseCode: "GI-008", title: "بیماری کرون", presentation: "اسهال مزمن و درد ربع تحتانی راست شکم", age: 27, sex: "male", tags: ["IBD"], difficulty: "easy" },
  { id: "ulcerative-colitis" , caseCode: "GI-009", title: "کولیت اولسرو", presentation: "اسهال خونی و موکوسی", age: 32, sex: "female", tags: ["IBD"], difficulty: "easy" },
  { id: "irritable-bowel-syndrome" , caseCode: "GI-010", title: "سندرم روده تحریک‌پذیر", presentation: "درد شکمی عودکننده و تغییر عادت دفع", age: 26, sex: "female", tags: ["functional"], difficulty: "easy" },
  { id: "acute-pancreatitis" , caseCode: "GI-011", title: "پانکراتیت حاد", presentation: "درد شدید اپی‌گاستر منتشرشونده به پشت", age: 46, sex: "male", tags: ["پانکراس"], difficulty: "easy" },
  { id: "acute-appendicitis" , caseCode: "GI-012", title: "آپاندیسیت حاد", presentation: "درد ربع تحتانی راست شکم", age: 21, sex: "male", tags: ["حاد-شکم"], difficulty: "easy" },
  { id: "cholelithiasis" , caseCode: "GI-013", title: "سنگ کیسه صفرا", presentation: "درد دوره‌ای ربع فوقانی راست شکم", age: 44, sex: "female", tags: ["صفرا"], difficulty: "easy" },
  { id: "acute-cholecystitis" , caseCode: "GI-014", title: "کوله‌سیستیت حاد", presentation: "درد مداوم ربع فوقانی راست شکم", age: 51, sex: "female", tags: ["صفرا"], difficulty: "medium" },
  { id: "choledocholithiasis" , caseCode: "GI-015", title: "کلدوکولیتیازیس", presentation: "زردی و درد ربع فوقانی راست شکم", age: 58, sex: "male", tags: ["صفرا-انسدادی"], difficulty: "medium" },
  { id: "acute-cholangitis" , caseCode: "GI-016", title: "کلانژیت حاد", presentation: "تب، لرز و زردی", age: 63, sex: "female", tags: ["صفرا-عفونی"], difficulty: "easy" },
  { id: "hepatitis-b" , caseCode: "GI-017", title: "هپاتیت B", presentation: "خستگی و زردی", age: 35, sex: "male", tags: ["کبد-ویروسی"], difficulty: "easy" },
  { id: "hepatitis-c" , caseCode: "GI-018", title: "هپاتیت C", presentation: "خستگی مزمن", age: 52, sex: "female", tags: ["کبد-ویروسی"], difficulty: "easy" },
  { id: "cirrhosis" , caseCode: "GI-019", title: "سیروز کبدی", presentation: "تورم شکم و ورم پاها", age: 61, sex: "male", tags: ["کبد-مزمن"], difficulty: "easy" },
  { id: "masld-mash" , caseCode: "GI-020", title: "MASLD/MASH", presentation: "افزایش آنزیم‌های کبدی", age: 55, sex: "female", tags: ["کبد-متابولیک"], difficulty: "easy" },
  { id: "barrett-esophagus" , caseCode: "GI-021", title: "مری بارت", presentation: "پیگیری اندوسکوپی", age: 59, sex: "male", tags: ["مری-مزمن"], difficulty: "easy" },
  { id: "esophageal-stricture" , caseCode: "GI-022", title: "تنگی مری", presentation: "اختلال بلع جامدات", age: 57, sex: "female", tags: ["مری-تنگی"], difficulty: "medium" },
  { id: "gastric-cancer" , caseCode: "GI-023", title: "سرطان معده", presentation: "کاهش وزن و سیری زودرس", age: 70, sex: "male", tags: ["معده-بدخیمی"], difficulty: "medium" },
  { id: "zollinger-ellison" , caseCode: "GI-024", title: "سندرم زولینگر–الیسون", presentation: "زخم‌های مکرر پپتیک و اسهال مزمن", age: 42, sex: "male", tags: ["اسید-پپتیک"], difficulty: "medium" },
  { id: "small-intestinal-bacterial-overgrowth" , caseCode: "GI-025", title: "SIBO", presentation: "نفخ و اسهال متناوب", age: 48, sex: "female", tags: ["روده-باریک"], difficulty: "medium" },
  { id: "whipple-disease" , caseCode: "GI-026", title: "بیماری ویپل", presentation: "اسهال مزمن و کاهش وزن", age: 54, sex: "male", tags: ["سوءجذب-سیستمیک"], difficulty: "medium" },
  { id: "diverticular-disease" , caseCode: "GI-027", title: "بیماری دیورتیکولی", presentation: "درد پایین شکم و یبوست", age: 64, sex: "female", tags: ["کولون"], difficulty: "medium" },
  { id: "diverticulitis" , caseCode: "GI-028", title: "دیورتیکولیت", presentation: "درد مداوم ربع تحتانی چپ شکم", age: 68, sex: "male", tags: ["کولون-حاد"], difficulty: "medium" },
  { id: "colorectal-cancer" , caseCode: "GI-029", title: "سرطان کولورکتال", presentation: "تغییر عادت دفع", age: 66, sex: "female", tags: ["کولون-بدخیمی"], difficulty: "medium" },
  { id: "microscopic-colitis" , caseCode: "GI-030", title: "کولیت میکروسکوپیک", presentation: "اسهال آبکی مزمن", age: 58, sex: "female", tags: ["کولیت"], difficulty: "hard" },
  { id: "acute-infectious-gastroenteritis" , caseCode: "GI-031", title: "گاستروانتریت عفونی حاد", presentation: "اسهال حاد و دل‌پیچه", age: 30, sex: "male", tags: ["عفونی"], difficulty: "medium" },
  { id: "autoimmune-hepatitis" , caseCode: "GI-032", title: "هپاتیت خودایمنی", presentation: "خستگی و درد مفاصل", age: 39, sex: "female", tags: ["کبد-خودایمنی"], difficulty: "medium" },
  { id: "primary-biliary-cholangitis" , caseCode: "GI-033", title: "PBC", presentation: "خارش مزمن", age: 57, sex: "female", tags: ["کبد-کلستاتیک"], difficulty: "medium" },
  { id: "primary-sclerosing-cholangitis" , caseCode: "GI-034", title: "PSC", presentation: "خارش و زردی", age: 36, sex: "male", tags: ["کبد-کلستاتیک"], difficulty: "medium" },
  { id: "alcohol-associated-liver-disease" , caseCode: "GI-035", title: "بیماری کبدی مرتبط با الکل", presentation: "زردی و درد ربع فوقانی راست شکم", age: 52, sex: "male", tags: ["کبد-الکل"], difficulty: "medium" },
  { id: "drug-induced-liver-injury" , caseCode: "GI-036", title: "آسیب کبدی ناشی از دارو", presentation: "خستگی و زردی پس از شروع دارو", age: 45, sex: "female", tags: ["کبد-دارویی"], difficulty: "medium" },
  { id: "hepatitis-a" , caseCode: "GI-037", title: "هپاتیت A", presentation: "تب، تهوع و زردی", age: 24, sex: "male", tags: ["کبد-ویروسی"], difficulty: "medium" },
  { id: "hepatitis-e" , caseCode: "GI-038", title: "هپاتیت E", presentation: "زردی و ادرار تیره", age: 31, sex: "female", tags: ["کبد-ویروسی"], difficulty: "medium" },
  { id: "wilson-disease" , caseCode: "GI-039", title: "بیماری ویلسون", presentation: "لرزش و تغییرات رفتاری", age: 19, sex: "male", tags: ["کبد-ارثی"], difficulty: "medium" },
  { id: "hereditary-hemochromatosis" , caseCode: "GI-040", title: "هموکروماتوز ارثی", presentation: "خستگی و درد مفاصل", age: 50, sex: "male", tags: ["کبد-ارثی"], difficulty: "medium" },
  { id: "alpha-1-antitrypsin-deficiency" , caseCode: "GI-041", title: "کمبود آلفا-1 آنتی‌تریپسین", presentation: "بیماری مزمن کبدی", age: 43, sex: "female", tags: ["کبد-ارثی"], difficulty: "hard" },
  { id: "chronic-pancreatitis" , caseCode: "GI-042", title: "پانکراتیت مزمن", presentation: "درد عودکننده اپی‌گاستر و مدفوع چرب", age: 49, sex: "male", tags: ["پانکراس-مزمن"], difficulty: "medium" },
  { id: "autoimmune-pancreatitis" , caseCode: "GI-043", title: "پانکراتیت خودایمنی", presentation: "زردی", age: 60, sex: "male", tags: ["پانکراس-خودایمنی"], difficulty: "hard" },
  { id: "pancreatic-cancer" , caseCode: "GI-044", title: "سرطان پانکراس", presentation: "زردی بدون درد و کاهش وزن", age: 72, sex: "male", tags: ["پانکراس-بدخیمی"], difficulty: "medium" },
  { id: "cholangiocarcinoma" , caseCode: "GI-045", title: "کلانژیوکارسینوما", presentation: "زردی پیشرونده و خارش", age: 63, sex: "female", tags: ["صفرا-بدخیمی"], difficulty: "hard" },
  { id: "mesenteric-ischemia" , caseCode: "GI-046", title: "ایسکمی مزانتریک", presentation: "درد شدید شکم", age: 75, sex: "male", tags: ["عروقی-گوارشی"], difficulty: "hard" },
  { id: "mesenteric-venous-thrombosis" , caseCode: "GI-047", title: "ترومبوز ورید مزانتریک", presentation: "درد مداوم شکم", age: 47, sex: "female", tags: ["عروقی-گوارشی"], difficulty: "hard" },
  { id: "tropical-sprue" , caseCode: "GI-048", title: "اسپروی گرمسیری", presentation: "اسهال مزمن و کاهش وزن", age: 40, sex: "male", tags: ["سوءجذب"], difficulty: "hard" },
  { id: "short-bowel-syndrome" , caseCode: "GI-049", title: "سندرم روده کوتاه", presentation: "اسهال مزمن و مدفوع چرب", age: 46, sex: "female", tags: ["سوءجذب"], difficulty: "hard" },
  { id: "hereditary-gi-polyposis" , caseCode: "GI-050", title: "سندرم پولیپوز ارثی دستگاه گوارش", presentation: "پیگیری پولیپ‌های متعدد دستگاه گوارش", age: 28, sex: "male", tags: ["ارثی-کولون"], difficulty: "hard" },
  { id: "anal-fissure" , caseCode: "GI-051", title: "فیشر آنال", presentation: "درد هنگام دفع و خون روشن", age: 33, sex: "female", tags: ["آنورکتال"], difficulty: "hard" },
  { id: "hemorrhoidal-disease" , caseCode: "GI-052", title: "بیماری هموروئیدی", presentation: "خون‌ریزی روشن بدون درد هنگام دفع", age: 45, sex: "male", tags: ["آنورکتال"], difficulty: "hard" },
  { id: "hepatitis-d" , caseCode: "GI-053", title: "هپاتیت D", presentation: "هپاتیت حاد شدید", age: 37, sex: "male", tags: ["کبد-ویروسی"], difficulty: "hard" },
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

export const gastroenterologyCases: Case[] = seeds.map((seed) => ({ id:`gastro-${seed.id}`, caseCode:seed.caseCode, title:seed.title, course:"gastroenterology", tags:seed.tags, difficulty:seed.difficulty, patient:{age:seed.age,sex:seed.sex}, presentation:seed.presentation, stages:[ {id:`${seed.id}-history`,type:"history",title:"شرح حال",hints:history(seed)}, {id:`${seed.id}-physical`,type:"physical-exam",title:"معاینه فیزیکی",hints:physical(seed)}, {id:`${seed.id}-investigation`,type:"investigation",title:"بررسی‌های تشخیصی",investigations:investigations(seed)} ], diagnosis:diagnosis(seed.id), candidateDiagnosisIds:candidates(seed), reviewQuestions: [] }));
