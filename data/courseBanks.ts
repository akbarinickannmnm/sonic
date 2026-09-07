import type { Case, Course } from "../types/case";
import { cases as masterCaseBank } from "./cases";
import { validateCase } from "../lib/caseValidator";
import {
  pulmonologyQuestionBank,
  pulmonologyQuestionCategories,
} from "./pulmonologyQuestionBank";
import {
  pulmonologyPhysicalExamBank,
  physicalExamCategories as pulmonologyPhysicalExamCategories,
} from "./pulmonologyPhysicalExamBank";
import {
  pulmonologyInvestigationBank,
  investigationCategories as pulmonologyInvestigationCategories,
} from "./pulmonologyInvestigationBank";
import {
  cardiologyQuestionBank,
  cardiologyQuestionCategories,
} from "./cardiologyQuestionBank";
import {
  cardiologyPhysicalExamBank,
  cardiologyPhysicalExamCategories,
} from "./cardiologyPhysicalExamBank";
import {
  cardiologyInvestigationBank,
  cardiologyInvestigationCategories,
} from "./cardiologyInvestigationBank";

export type BankCategory = { id: string; label: string };

export type HistoryBankItem = {
  id: string;
  category: string;
  level: string;
  text: string;
  answersByCase: Record<string, string>;
};

export type PhysicalExamBankItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  answersByCase: Record<string, string>;
};

export type InvestigationBankItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  genericAnswer?: string;
  answersByCase: Record<string, string>;
};

export type CourseBank = {
  course: Course;
  history: HistoryBankItem[];
  physicalExam: PhysicalExamBankItem[];
  investigations: InvestigationBankItem[];
  historyCategories: BankCategory[];
  physicalExamCategories: BankCategory[];
  investigationCategories: BankCategory[];
};

export type MasterCaseBank = Case[];

export function getMasterCaseBank(extraCases: Case[] = []): MasterCaseBank {
  const merged = new Map<string, Case>();

  for (const caseData of masterCaseBank) {
    merged.set(caseData.id, caseData);
  }

  for (const caseData of extraCases) {
    merged.set(caseData.id, caseData);
  }

  if (typeof window === "undefined") {
    return [...merged.values()];
  }

  try {
    const raw = window.localStorage.getItem("sonic-cases");
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const value of parsed) {
          if (value && typeof value === "object" && typeof (value as { id?: unknown }).id === "string") {
            const candidate = value as Case;
            if (validateCase(candidate).length === 0) {
              merged.set(candidate.id, candidate);
            }
          }
        }
      }
    }
  } catch {
    // Keep the built-in master bank usable when local storage is unavailable/corrupt.
  }

  return [...merged.values()];
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[–—−]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function nonEmptyCategories(
  categories: readonly BankCategory[],
  items: Array<{ category: string }>,
) {
  const used = new Set(items.map((item) => item.category));
  return categories.filter((category) => used.has(category.id));
}

function addAnswer(
  map: Record<string, string>,
  caseId: string,
  value: string | undefined,
) {
  if (value?.trim()) map[caseId] = value.trim();
}

function cardiologyHistoryAnswer(caseData: Case, questionId: string): string {
  const title = caseData.title.toLowerCase();
  const presentation = caseData.presentation.toLowerCase();
  const text = `${title} ${presentation}`;
  const has = (...terms: string[]) => terms.some((term) => text.includes(term));
  const female = caseData.patient.sex === "female";
  const pronoun = female ? "بیمار" : "بیمار";

  const ischemic = has("acute coronary", "acs", "stable angina", "unstable angina", "nstemi", "stemi", "coronary vasospasm", "microvascular", "spontaneous coronary");
  const heartFailure = has("heart failure", "cardiomyopathy", "cor pulmonale", "pulmonary hypertension", "amyloidosis");
  const arrhythmia = has("atrial fibrillation", "atrial flutter", "supraventricular", "avnrt", "avrt", "ventricular tachycardia", "ventricular fibrillation", "sinus node", "av block", "arrhythmogenic");
  const valve = has("aortic stenosis", "aortic regurgitation", "mitral regurgitation", "mitral stenosis", "mitral valve prolapse", "tricuspid regurgitation", "tricuspid stenosis", "pulmonary valve stenosis", "rheumatic heart disease");
  const pericardial = has("pericarditis", "pericardial effusion", "cardiac tamponade", "constrictive pericarditis");
  const congenital = has("atrial septal", "ventricular septal", "patent ductus", "coarctation", "tetralogy", "transposition", "ebstein");
  const aortic = has("aortic dissection", "thoracic aortic aneurysm");
  const infectious = has("infective endocarditis", "myocarditis", "acute rheumatic fever");
  const hcm = has("hypertrophic cardiomyopathy");
  const hypertensive = has("hypertensive heart disease");

  switch (questionId) {
    case "cardio-hist-001": return `به دلیل علائم اصلی همین کیس مراجعه کرده‌ام؛ شکایت غالب من ${ischemic ? "ناراحتی قفسه سینه" : heartFailure ? "تنگی نفس و کاهش تحمل فعالیت" : arrhythmia ? "تپش قلب یا اختلال ریتم" : valve ? "تنگی نفس، خستگی یا علائم مرتبط با بیماری دریچه‌ای" : aortic ? "درد قفسه سینه یا پشت" : pericardial ? "درد قفسه سینه و ناراحتی هنگام تنفس یا وضعیت بدن" : "علائم قلبی ذکرشده در شرح حال اولیه"} است.`;
    case "cardio-hist-002": return ischemic || pericardial || aortic ? "بله؛ ناراحتی قفسه سینه از علائم اصلی این کیس است." : "خیر؛ در شرح حال این کیس درد قفسه سینه شکایت اصلی نیست.";
    case "cardio-hist-003": return heartFailure || valve || has("myocarditis", "pulmonary hypertension", "takotsubo", "myxoma") ? "بله؛ تنگی نفس، به‌ویژه با فعالیت، وجود دارد." : "خیر؛ تنگی نفس علامت غالب این کیس نیست.";
    case "cardio-hist-004": return arrhythmia || has("myxoma") ? "بله؛ بیمار احساس تپش قلب یا ضربان غیرطبیعی را گزارش می‌کند." : "خیر؛ تپش قلب شکایت غالب این کیس نیست.";
    case "cardio-hist-005": return hcm || has("ventricular tachycardia", "ventricular fibrillation", "complete heart block", "aortic stenosis", "arrhythmogenic") ? "ممکن است؛ در این کیس سنکوپ یا نزدیک‌سنکوپ به‌عنوان علامت مهم مطرح است." : "خیر؛ سابقه سنکوپ در شرح حال این کیس مطرح نشده است.";
    case "cardio-hist-006": return heartFailure || valve || has("tricuspid regurgitation", "tricuspid stenosis") ? "بله؛ تورم اندام تحتانی با احتباس مایع و نارسایی قلبی در این کیس سازگار است." : "خیر؛ ادم اندام تحتانی علامت غالب این کیس نیست.";
    case "cardio-hist-007": return "بله؛ کاهش تحمل فعالیت یا خستگی متناسب با بیماری زمینه‌ای این کیس وجود دارد.";
    case "cardio-hist-008": return congenital || has("tetralogy", "pulmonary hypertension", "cor pulmonale") ? "ممکن است؛ سیانوز در این بیماری می‌تواند وجود داشته باشد و باید درباره آن سؤال شود." : "خیر؛ سیانوز در این کیس گزارش نشده است.";
    case "cardio-hist-009": return infectious || has("acute rheumatic fever") ? "بله؛ تب و علائم سیستمیک با زمینه عفونی یا التهابی این کیس مطرح است." : "خیر؛ تب و لرز جزء علائم اصلی این کیس نیست.";
    case "cardio-hist-010": return "شروع علائم مطابق سیر بالینی بیماری این کیس بوده و در شرح حال اولیه ذکر شده است.";
    case "cardio-hist-011": return aortic || has("stemi", "ventricular fibrillation", "ventricular tachycardia", "tamponade") ? "شروع علائم ناگهانی بوده است." : "شروع علائم تدریجی یا در طول زمان ایجاد شده است.";
    case "cardio-hist-012": return "علائم با سیر بیماری زمینه‌ای در حال تغییر بوده‌اند؛ الگوی آن با تشخیص این کیس سازگار است.";
    case "cardio-hist-013": return ischemic || hcm || has("aortic stenosis") ? "بله؛ علائم با فعالیت تشدید می‌شوند یا ارتباط مشخصی با فعالیت دارند." : "خیر؛ درد این کیس الگوی تیپیک وابسته به فعالیت ندارد.";
    case "cardio-hist-014": return has("acute coronary", "unstable angina", "nstemi", "stemi", "aortic dissection", "pericarditis") ? "بله؛ علائم می‌توانند در استراحت نیز ایجاد شوند." : "خیر؛ در این کیس درد عمدتاً با فعالیت یا شرایط مشخص دیگری ارتباط دارد.";
    case "cardio-hist-015": return aortic ? "درد ناگهانی، شدید و پارگی‌مانند توصیف می‌شود." : ischemic ? "درد به‌صورت فشار یا سنگینی رتروسترنال توصیف می‌شود." : pericardial ? "درد بیشتر خنجری و پلوریتیک است و با تنفس یا وضعیت بدن تغییر می‌کند." : "درد قفسه سینه در این کیس تیپیک ایسکمیک نیست یا شکایت اصلی محسوب نمی‌شود.";
    case "cardio-hist-016": return aortic ? "درد در قفسه سینه با امکان انتشار به پشت توصیف می‌شود." : ischemic ? "درد عمدتاً رتروسترنال یا در مرکز قفسه سینه است." : pericardial ? "درد در ناحیه پیش‌قلبی یا رتروسترنال احساس می‌شود." : "محل مشخصی از درد قفسه سینه در شرح حال اولیه ذکر نشده است.";
    case "cardio-hist-017": return ischemic ? "ممکن است درد به بازو، شانه، گردن یا فک انتشار پیدا کند؛ در این کیس انتشار به نواحی تیپیک مطرح است." : aortic ? "انتشار درد به پشت، به‌ویژه بین کتف‌ها، مطرح است." : "انتشار تیپیک درد به دست یا فک در این کیس مطرح نیست.";
    case "cardio-hist-018": return has("stable angina") ? "هر حمله معمولاً چند دقیقه طول می‌کشد و با استراحت برطرف می‌شود." : has("unstable angina", "nstemi", "stemi", "acute coronary") ? "حمله طولانی‌تر از چند دقیقه است و در سندرم حاد کرونری باید از نظر مدت و تداوم دقیق بررسی شود." : arrhythmia ? "مدت حملات بسته به آریتمی متفاوت است؛ در این کیس حملات به‌صورت دوره‌ای رخ می‌دهند." : "مدت درد مشخص و تیپیک در شرح حال اولیه ذکر نشده است.";
    case "cardio-hist-019": return ischemic ? "فعالیت علائم را تشدید می‌کند و استراحت آن را کاهش می‌دهد؛ در سندرم حاد کرونری ممکن است با استراحت کامل برطرف نشود." : pericardial ? "تنفس عمیق و برخی وضعیت‌های بدن می‌توانند درد را تشدید کنند." : aortic ? "درد با استراحت به‌طور قابل اعتماد برطرف نمی‌شود." : "عامل تشدیدکننده یا تسکین‌دهنده اختصاصی دیگری در شرح حال مطرح نیست.";
    case "cardio-hist-020": return pericardial ? "بله؛ درد با دم عمیق یا سرفه تشدید می‌شود." : "خیر؛ درد این کیس الگوی پلوریتیک ندارد.";
    case "cardio-hist-021": return pericardial ? "بله؛ درد با وضعیت بدن تغییر می‌کند و معمولاً با نشستن و خم شدن به جلو بهتر می‌شود." : "خیر؛ وابستگی واضح درد به وضعیت بدن مطرح نیست.";
    case "cardio-hist-022": return has("stable angina") ? "بله؛ استراحت معمولاً درد را طی چند دقیقه برطرف می‌کند." : has("unstable angina", "acute coronary", "nstemi", "stemi") ? "خیر؛ استراحت لزوماً درد را برطرف نمی‌کند." : "خیر؛ الگوی درد این کیس وابسته به تسکین با استراحت نیست.";
    case "cardio-hist-023": return ischemic || has("takotsubo") ? "بله؛ تهوع و تعریق می‌توانند همراه علائم ایسکمیک این کیس باشند و در شرح حال مطرح‌اند." : "خیر؛ تهوع، استفراغ یا تعریق جزء علائم غالب این کیس نیست.";
    case "cardio-hist-024": return ischemic || heartFailure || has("myocarditis", "pulmonary hypertension", "tamponade") ? "بله؛ تنگی نفس می‌تواند همراه علامت اصلی این کیس باشد." : "خیر؛ تنگی نفس همراه درد در این کیس مطرح نیست.";
    case "cardio-hist-025": return heartFailure || valve || has("pulmonary hypertension", "myocarditis", "dilated cardiomyopathy", "restrictive cardiomyopathy", "amyloidosis", "cor pulmonale") ? "بله؛ تنگی نفس با فعالیت تشدید می‌شود." : "خیر؛ تنگی نفس وابسته به فعالیت علامت اصلی این کیس نیست.";
    case "cardio-hist-026": return heartFailure || valve || arrhythmia || hcm || has("myocarditis", "pulmonary hypertension", "takotsubo", "myxoma") ? "بله؛ تحمل فعالیت نسبت به قبل کاهش یافته است." : "خیر؛ کاهش تحمل فعالیت در شرح حال غالب نیست.";
    case "cardio-hist-027": return heartFailure || has("mitral stenosis", "pulmonary hypertension", "cor pulmonale", "amyloidosis") ? "بله؛ تنگی نفس هنگام دراز کشیدن یا ارتوپنه وجود دارد." : "خیر؛ ارتوپنه در این کیس گزارش نشده است.";
    case "cardio-hist-028": return heartFailure ? "برای خواب راحت ممکن است به چند بالش نیاز داشته باشم؛ ارتوپنه با نارسایی قلبی سازگار است." : "نیازی به بالش اضافه برای رفع تنگی نفس ندارم.";
    case "cardio-hist-029": return heartFailure || has("mitral stenosis", "pulmonary hypertension", "cor pulmonale") ? "بله؛ بیدار شدن شبانه با تنگی نفس یا حملات تنگی نفس شبانه مطرح است." : "خیر؛ حمله تنگی نفس شبانه گزارش نشده است.";
    case "cardio-hist-030": return heartFailure || has("right-sided heart failure", "acute decompensated") ? "بله؛ افزایش وزن سریع یا تشدید ادم می‌تواند نشان‌دهنده احتباس مایع باشد." : "خیر؛ افزایش سریع وزن یا تشدید ادم علامت اصلی این کیس نیست.";
    case "cardio-hist-031": return arrhythmia ? (has("atrial fibrillation", "atrial flutter") ? "احساس تپش قلب بیشتر به‌صورت ضربان نامنظم و گاهی کوبنده توصیف می‌شود." : "تپش قلب به‌صورت ضربان سریع و غیرطبیعی توصیف می‌شود.") : "تپش قلب علامت اصلی این کیس نیست.";
    case "cardio-hist-032": return has("supraventricular", "avnrt", "avrt", "atrial flutter") ? "بله؛ حملات تپش قلب به‌صورت ناگهانی شروع و ناگهانی قطع می‌شوند." : has("atrial fibrillation") ? "خیر؛ شروع و پایان حملات AF می‌تواند تدریجی‌تر باشد و الگوی کاملاً ناگهانی تیپیک تاکی‌کاردی فوق‌بطنی نیست." : "خیر؛ الگوی شروع و قطع ناگهانی تپش قلب مطرح نیست.";
    case "cardio-hist-033": return has("atrial fibrillation", "multifocal atrial tachycardia") ? "ضربان در طول حملات نامنظم است." : has("atrial flutter", "supraventricular", "avnrt", "avrt", "ventricular tachycardia") ? "ضربان در طول حملات معمولاً منظم است." : "اختلال ریتم مشخصی در شرح حال این کیس مطرح نشده است.";
    case "cardio-hist-034": return has("atrial fibrillation") ? "حملات چند ساعت طول می‌کشند و نسبت به گذشته بیشتر شده‌اند." : has("supraventricular", "avnrt", "avrt") ? "حملات معمولاً از چند دقیقه تا چند ساعت طول می‌کشند و شروع و پایان مشخص دارند." : has("ventricular tachycardia", "ventricular fibrillation") ? "حملات معمولاً کوتاه و بالقوه ناپایدار هستند و نیاز به ارزیابی فوری دارند." : "مدت حملات اختصاصی در این کیس مطرح نیست.";
    case "cardio-hist-035": return has("supraventricular", "avnrt", "avrt") ? "کافئین، استرس و فعالیت می‌توانند حملات را تحریک کنند." : has("atrial fibrillation") ? "استرس، الکل و محرک‌ها می‌توانند حملات را تشدید کنند." : "محرک مشخصی برای تپش قلب در شرح حال این کیس ذکر نشده است.";
    case "cardio-hist-036": return arrhythmia ? "بله؛ تپش قلب می‌تواند با سرگیجه، تنگی نفس یا درد قفسه سینه همراه شود و در این کیس از نظر بالینی اهمیت دارد." : "خیر؛ تپش قلب علامت غالب این کیس نیست.";
    case "cardio-hist-037": return has("ventricular tachycardia", "ventricular fibrillation", "complete heart block", "aortic stenosis", "hcm", "arrhythmogenic") ? "بله؛ وجود تپش قلب پیش از سنکوپ در این بیماری‌ها از نظر بالینی مهم است." : "خیر؛ تپش قلب بلافاصله پیش از سنکوپ گزارش نشده است.";
    case "cardio-hist-038": return hcm || has("aortic stenosis", "ventricular tachycardia", "arrhythmogenic", "coarctation") ? "ممکن است؛ سنکوپ حین فعالیت در این بیماری‌ها یک علامت هشدار مهم است." : "خیر؛ سنکوپ حین فعالیت در این کیس گزارش نشده است.";
    case "cardio-hist-039": return "پیش از سنکوپ، وجود علائم وازوواگال یا آریتمیک باید بررسی شود؛ در این کیس علامت هشدار اختصاصی دیگری گزارش نشده است.";
    case "cardio-hist-040": return has("ventricular fibrillation", "ventricular tachycardia", "complete heart block") ? "بازگشت به وضعیت پایه پس از حمله می‌تواند سریع یا پس از احیای قلبی‌ریوی باشد؛ این یافته به شدت آریتمی بستگی دارد." : "بازگشت به وضعیت پایه پس از حمله سریع بوده است.";
    case "cardio-hist-041": return ischemic ? "بله؛ سابقه بیماری ایسکمیک قلب در این کیس وجود دارد یا از نظر تشخیصی اهمیت مستقیم دارد." : "خیر؛ سابقه قبلی سکته قلبی یا سندرم حاد کرونری در این کیس ذکر نشده است.";
    case "cardio-hist-042": return ischemic ? "بله؛ بیماری عروق کرونر در این کیس مطرح یا تشخیص داده شده است." : "خیر؛ بیماری شناخته‌شده عروق کرونر در شرح حال ذکر نشده است.";
    case "cardio-hist-043": return heartFailure ? "بله؛ نارسایی قلبی با تشخیص این کیس همخوان است." : "خیر؛ سابقه شناخته‌شده نارسایی قلبی گزارش نشده است.";
    case "cardio-hist-044": return arrhythmia ? "بله؛ سابقه آریتمی با تشخیص این کیس ارتباط مستقیم دارد." : "خیر؛ سابقه آریتمی شناخته‌شده گزارش نشده است.";
    case "cardio-hist-045": return valve || infectious || congenital ? "بله؛ سابقه سوفل یا بیماری دریچه‌ای/ساختاری قلب در این کیس اهمیت دارد." : "خیر؛ سابقه شناخته‌شده سوفل یا بیماری دریچه‌ای ذکر نشده است.";
    case "cardio-hist-046": return hypertensive || ischemic || heartFailure ? "بله؛ پرفشاری خون به‌عنوان عامل خطر یا بیماری همراه این کیس مطرح است." : "خیر؛ سابقه پرفشاری خون در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-047": return ischemic ? "دیابت به‌عنوان عامل خطر مهم بیماری عروق کرونر باید بررسی شود؛ در اطلاعات فعلی کیس دیابت مشخص نشده است." : "دیابت در اطلاعات فعلی کیس گزارش نشده است.";
    case "cardio-hist-048": return ischemic ? "اختلال چربی خون به‌عنوان عامل خطر بیماری عروق کرونر باید بررسی شود؛ در اطلاعات فعلی کیس مشخص نشده است." : "سابقه شناخته‌شده اختلال چربی خون در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-049": return heartFailure || ischemic || has("hypertensive") ? "بیماری کلیوی به‌عنوان بیماری همراه یا عامل خطر باید بررسی شود؛ در اطلاعات فعلی کیس مشخص نشده است." : "سابقه بیماری کلیوی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-050": return has("atrial fibrillation", "atrial flutter", "cardiomyopathy") ? "بیماری تیروئید، به‌ویژه پرکاری تیروئید، باید از نظر ایجاد یا تشدید آریتمی بررسی شود؛ در اطلاعات فعلی کیس مشخص نشده است." : "سابقه بیماری تیروئید در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-051": return ischemic || congenital ? "بله؛ کاتتریزاسیون یا آنژیوگرافی در ارزیابی این بیماری می‌تواند مطرح باشد و در این کیس سابقه/نیاز آن باید بررسی شود." : "خیر؛ سابقه آنژیوگرافی یا کاتتریزاسیون در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-052": return ischemic ? "ممکن است؛ سابقه مداخله عروق کرونر از راه پوست یا استنت در بیماری کرونری باید مشخص شود، اما در اطلاعات فعلی کیس ذکر نشده است." : "خیر؛ سابقه استنت یا آنژیوپلاستی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-053": return ischemic ? "سابقه جراحی بای‌پس عروق کرونر در بیماری کرونری باید بررسی شود؛ در اطلاعات فعلی این کیس سابقه جراحی بای‌پس عروق کرونر ذکر نشده است." : "خیر؛ سابقه جراحی بای‌پس در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-054": return arrhythmia ? "سابقه ابلیشن باید بررسی شود؛ در این کیس سابقه ابلیشن قبلی ذکر نشده است." : "خیر؛ سابقه ابلیشن برای آریتمی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-055": return has("sinus node", "av block", "ventricular tachycardia", "ventricular fibrillation", "arrhythmogenic") ? "وجود دستگاه ضربان‌ساز یا دفیبریلاتور کاشتنی از نظر این بیماری مهم است؛ در اطلاعات فعلی کیس دستگاه قبلی ذکر نشده است." : "خیر؛ سابقه پیس‌میکر یا دفیبریلاتور کاشتنی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-056": return arrhythmia ? "داروهای کنترل ریتم یا ضربان و در برخی موارد داروهای ضدانعقاد باید بررسی شوند؛ فهرست دقیق داروها در اطلاعات کیس مشخص نشده است." : heartFailure ? "داروهای نارسایی قلبی مانند دیورتیک، بتابلوکر، مهارکننده سیستم رنین-آنژیوتانسین و آنتاگونیست مینرالوکورتیکوئید باید بررسی شوند؛ فهرست دقیق در کیس ذکر نشده است." : "فهرست دقیق داروهای مصرفی در اطلاعات کیس ذکر نشده است و باید از بیمار پرسیده شود.";
    case "cardio-hist-057": return has("atrial fibrillation", "atrial flutter") ? "مصرف ضدانعقاد برای پیشگیری از آمبولی باید مشخص شود؛ در اطلاعات فعلی کیس مصرف داروی ضدانعقاد ذکر نشده است." : ischemic ? "مصرف آسپیرین یا داروی ضدپلاکت در بیماری کرونری باید مشخص شود؛ در اطلاعات فعلی کیس ذکر نشده است." : "مصرف آسپیرین، ضدپلاکت یا ضدانعقاد در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-058": return arrhythmia || hypertensive || heartFailure ? "بتابلوکر یا داروی کنترل ضربان/فشار خون ممکن است مصرف شود؛ داروی مشخص در اطلاعات فعلی کیس ذکر نشده است." : "داروی کنترل ضربان یا فشار خون در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-059": return heartFailure ? "بله؛ دیورتیک و سایر داروهای درمان نارسایی قلبی می‌توانند در این کیس مصرف شوند؛ فهرست دقیق داروها در شرح حال موجود نیست." : "خیر؛ داروی دیورتیک یا درمان اختصاصی نارسایی قلبی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-060": return "تغییر اخیر داروها در اطلاعات فعلی کیس ذکر نشده است.";
    case "cardio-hist-061": return "جا انداختن دوز دارو در اطلاعات فعلی کیس ذکر نشده است.";
    case "cardio-hist-062": return ischemic || has("coronary") || hypertensive ? "سابقه مصرف سیگار از عوامل خطر مهم قلبی است و باید بررسی شود؛ در اطلاعات فعلی کیس وضعیت مصرف سیگار مشخص نشده است." : "وضعیت مصرف سیگار در اطلاعات فعلی کیس مشخص نشده است.";
    case "cardio-hist-063": return "مقدار و مدت مصرف سیگار در اطلاعات فعلی کیس مشخص نشده است و باید به‌صورت پاکت-سال ثبت شود.";
    case "cardio-hist-064": return has("atrial fibrillation", "cardiomyopathy", "dilated cardiomyopathy") ? "مصرف الکل باید به‌طور مشخص بررسی شود؛ در اطلاعات فعلی کیس میزان مصرف مشخص نشده است." : "مصرف الکل در اطلاعات فعلی کیس مشخص نشده است.";
    case "cardio-hist-065": return "مقدار و الگوی مصرف الکل در اطلاعات فعلی کیس مشخص نشده است.";
    case "cardio-hist-066": return has("coronary", "ventricular", "supraventricular") ? "مصرف محرک‌هایی مانند کوکائین و آمفتامین باید رد شود؛ در اطلاعات فعلی کیس مصرف آن‌ها گزارش نشده است." : "مصرف مواد محرک در اطلاعات فعلی کیس گزارش نشده است.";
    case "cardio-hist-067": return "سطح فعالیت بدنی بیمار باید بر اساس ظرفیت عملکردی ثبت شود؛ در اطلاعات فعلی میزان دقیق فعالیت هفتگی ذکر نشده است.";
    case "cardio-hist-068": return "بله؛ در بسیاری از بیماری‌های قلبی این کیس کاهش ظرفیت عملکردی رخ داده و در شرح حال به آن توجه شده است.";
    case "cardio-hist-069": return has("atrial fibrillation", "heart failure", "hypertension") ? "آپنه انسدادی خواب باید بررسی شود؛ در اطلاعات فعلی تشخیص قطعی آپنه خواب ذکر نشده است." : "سابقه خرخر شدید یا آپنه خواب در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-070": return heartFailure ? "تغییر وزن، به‌خصوص افزایش سریع وزن ناشی از احتباس مایع، باید بررسی شود؛ در اطلاعات فعلی تغییر رژیم دقیق مشخص نشده است." : "تغییر قابل‌توجه رژیم غذایی یا وزن در اطلاعات فعلی کیس مشخص نشده است.";
    case "cardio-hist-071": return ischemic ? "سابقه بیماری کرونر زودرس در خانواده از نظر خطر زمینه‌ای مهم است؛ در اطلاعات فعلی کیس مشخص نشده است." : "سابقه خانوادگی بیماری کرونر زودرس در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-072": return hcm || arrhythmia || congenital ? "مرگ ناگهانی زودرس در خانواده از نظر بیماری‌های ارثی قلبی اهمیت دارد؛ در اطلاعات فعلی سابقه خانوادگی مشخص نشده است." : "مرگ ناگهانی زودرس در خانواده در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-073": return hcm || has("dilated cardiomyopathy", "restrictive cardiomyopathy", "arrhythmogenic", "amyloidosis") ? "سابقه کاردیومیوپاتی خانوادگی باید بررسی شود؛ در اطلاعات فعلی کیس سابقه خانوادگی مشخص نشده است." : "سابقه خانوادگی کاردیومیوپاتی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-074": return arrhythmia ? "سابقه آریتمی ارثی در خانواده از نظر تشخیصی مهم است؛ در اطلاعات فعلی مشخص نشده است." : "سابقه آریتمی ارثی در خانواده در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-075": return congenital ? "بله؛ وجود بیماری مادرزادی قلب در خانواده باید در این کیس به‌طور مشخص بررسی شود؛ سابقه خانوادگی دقیق در اطلاعات فعلی ذکر نشده است." : "سابقه بیماری مادرزادی قلب در خانواده در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-076": return aortic ? "سابقه آنوریسم یا دایسکشن آئورت در خانواده از نظر خطر بیماری آئورت اهمیت دارد؛ سابقه خانوادگی دقیق در اطلاعات فعلی مشخص نشده است." : "سابقه خانوادگی آنوریسم یا دایسکشن آئورت در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-077": return ischemic ? "سابقه کلسترول بسیار بالا یا هیپرکلسترولمی خانوادگی باید بررسی شود؛ در اطلاعات فعلی مشخص نشده است." : "سابقه اختلال چربی ارثی در خانواده در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-078": return infectious || has("myocarditis", "pericarditis") ? "بله؛ بیماری ویروسی اخیر می‌تواند با زمینه التهابی این کیس ارتباط داشته باشد." : "خیر؛ بیماری ویروسی اخیر در شرح حال این کیس گزارش نشده است.";
    case "cardio-hist-079": return has("infective endocarditis", "rheumatic") ? "اقدام دندان‌پزشکی یا عفونت دندانی اخیر از نظر اندوکاردیت مهم است؛ در اطلاعات فعلی سابقه مشخصی ذکر نشده است." : "اقدام دندان‌پزشکی یا عفونت دندانی اخیر در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-080": return infectious || aortic || has("stent", "surgery") ? "سابقه اقدام تهاجمی اخیر باید مشخص شود؛ در اطلاعات فعلی اقدام اخیر مشخصی ذکر نشده است." : "جراحی یا اقدام تهاجمی اخیر در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-081": return has("infective endocarditis") ? "بله؛ اندوکاردیت عفونی تشخیص اصلی این کیس است." : "خیر؛ سابقه قبلی اندوکاردیت عفونی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-082": return has("rheumatic heart disease", "acute rheumatic fever", "mitral stenosis") ? "بله؛ سابقه تب روماتیسمی با بیماری دریچه‌ای روماتیسمی این کیس سازگار است." : "خیر؛ سابقه تب روماتیسمی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-083": return has("myocarditis", "pericarditis", "sarcoidosis", "aortic", "connective") ? "بیماری خودایمنی یا بافت همبند باید بررسی شود؛ در اطلاعات فعلی سابقه قطعی آن مشخص نشده است." : "سابقه بیماری خودایمنی یا بافت همبند در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-084": return has("amyloidosis", "sarcoidosis", "myocarditis", "pericarditis", "restrictive") ? "بله؛ بیماری سیستمیک التهابی یا نفوذی می‌تواند با تشخیص این کیس مرتبط باشد و باید مشخص شود." : "سابقه بیماری سیستمیک التهابی یا نفوذی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-085": return congenital || valve ? "بله؛ وجود سوفل یا بیماری قلبی در کودکی در این کیس از نظر تشخیصی مهم است؛ جزئیات سابقه کودکی باید مشخص شود." : "خیر؛ سابقه مشکل قلبی یا سوفل در کودکی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-086": return congenital ? "بله؛ بیماری مادرزادی قلب با تشخیص این کیس ارتباط مستقیم دارد." : "خیر؛ بیماری مادرزادی قلب شناخته‌شده در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-087": return has("tetralogy", "transposition", "pulmonary hypertension", "cor pulmonale") ? "بله؛ سابقه سیانوز در کودکی با بیماری مادرزادی سیانوتیک یا فشار خون ریوی می‌تواند سازگار باشد." : "خیر؛ دوره‌های سیانوز در کودکی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-088": return congenital ? "بله؛ جراحی قلب یا مداخله کاتتری در دوران کودکی می‌تواند بخشی از سابقه این بیماری مادرزادی باشد." : "خیر؛ جراحی قلب یا درمان کاتتری در کودکی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-089": return congenital || hcm || valve ? "بله؛ کاهش تحمل فعالیت از کودکی می‌تواند در بیماری‌های ساختاری یا مادرزادی قلب وجود داشته باشد؛ سابقه دقیق باید مشخص شود." : "خیر؛ ناتوانی در فعالیت هم‌سطح همسالان در کودکی در اطلاعات کیس ذکر نشده است.";
    case "cardio-hist-130": return has("stable angina") ? "خیر؛ در آنژین پایدار ارتباط با فعالیت معمولاً واضح است، اما همیشه به‌صورت مطلق نیست." : ischemic ? "خیر؛ درد ایسکمیک می‌تواند با فعالیت ارتباط داشته باشد، ولی در سندرم حاد کرونری ممکن است در استراحت هم رخ دهد." : "خیر؛ درد این کیس الگوی ثابت و همیشگی وابسته به فعالیت ندارد.";
    case "cardio-hist-131": return aortic || has("stemi", "ventricular fibrillation", "tamponade") ? "بله؛ شروع ناگهانی و شدید از ویژگی‌های مهم این کیس است." : has("acute coronary", "nstemi", "unstable angina") ? "شروع می‌تواند نسبتاً ناگهانی باشد، اما درد الزاماً به شکل ناگهانی و شدید شروع نمی‌شود." : "خیر؛ شروع ناگهانی و شدید ویژگی اصلی این کیس نیست.";
    default: return `${pronoun} در مورد این سؤال، اطلاعات اختصاصی متناسب با این کیس را دارد؛ شرح حال باید بر اساس تشخیص و سیر بالینی بیمار تفسیر شود.`;
  }
}

function buildHistoryBank(course: Course, bankCases: Case[]): HistoryBankItem[] {
  const definitions = course === "cardiology" ? cardiologyQuestionBank : pulmonologyQuestionBank;

  return definitions.map((question) => {
    const answersByCase: Record<string, string> = {};

    for (const caseData of bankCases) {
      if (caseData.course !== course) continue;

      if (course === "cardiology") {
        // The Cardiology History Bank is shared by the whole course: every case
        // receives an answer for every bank question. Existing case hints are
        // intentionally not used as a completeness filter.
        answersByCase[caseData.id] = cardiologyHistoryAnswer(caseData, question.id);
      } else {
        for (const stage of caseData.stages) {
          if (stage.type !== "history") continue;
          const answer = stage.hints.find((hint) => hint.sourceId === question.id);
          addAnswer(answersByCase, caseData.id, answer?.content);
        }
      }
    }

    return {
      id: question.id,
      category: question.category,
      level: question.level,
      text: question.text,
      answersByCase,
    };
  });
}

function buildPhysicalExamBank(course: Course, bankCases: Case[]): PhysicalExamBankItem[] {
  const definitions = course === "cardiology" ? cardiologyPhysicalExamBank : pulmonologyPhysicalExamBank;
  const items = definitions.map((item) => ({
    id: item.id,
    category: item.category,
    title: item.title,
    description: item.description,
    answersByCase: {} as Record<string, string>,
  }));
  const byId = new Map(items.map((item) => [item.id, item]));

  for (const caseData of bankCases) {
    if (caseData.course !== course) continue;
    for (const stage of caseData.stages) {
      if (stage.type !== "physical-exam") continue;
      for (const hint of stage.hints) {
        const normalizedLabel = normalize(hint.label ?? "");
        const direct = hint.sourceId ? byId.get(hint.sourceId) : undefined;
        const byTitle = items.find((item) => normalize(item.title) === normalizedLabel);
        const target = direct ?? byTitle;

        if (target) {
          addAnswer(target.answersByCase, caseData.id, hint.content);
          continue;
        }

        // Legacy cases used a generic "Physical Examination" label instead of a
        // reusable bank item ID. Preserve those answers in one reusable custom item.
        const legacyId = `legacy-physical:${normalizedLabel || "findings"}`;
        let legacy = byId.get(legacyId);
        if (!legacy) {
          legacy = {
            id: legacyId,
            category: "general",
            title: hint.label?.trim() || "یافته‌های معاینه فیزیکی",
            description: "آیتم معاینه فیزیکی استخراج‌شده از کیس‌های قدیمی.",
            answersByCase: {},
          };
          items.push(legacy);
          byId.set(legacyId, legacy);
        }
        addAnswer(legacy.answersByCase, caseData.id, hint.content);
      }
    }
  }

  return items;
}

function buildInvestigationBank(course: Course, bankCases: Case[]): InvestigationBankItem[] {
  const definitions = course === "cardiology" ? cardiologyInvestigationBank : pulmonologyInvestigationBank;
  const items: InvestigationBankItem[] = definitions.map((item) => ({
    id: item.id,
    category: item.category,
    title: item.title,
    description: item.description,
    genericAnswer: "answer" in item && typeof item.answer === "string" ? item.answer : undefined,
    answersByCase: {},
  }));
  const byId = new Map(items.map((item) => [item.id, item]));

  for (const caseData of bankCases) {
    if (caseData.course !== course) continue;
    for (const stage of caseData.stages) {
      if (stage.type !== "investigation") continue;
      for (const investigation of stage.investigations) {
        const normalizedName = normalize(investigation.name);
        const direct = investigation.sourceId ? byId.get(investigation.sourceId) : undefined;
        const byTitle = items.find((item) => {
          const title = normalize(item.title);
          return title === normalizedName || normalizedName.includes(title) || title.includes(normalizedName);
        });
        const target = direct ?? byTitle;

        const answer = investigation.findings?.map(
          (finding) => `${finding.label}: ${finding.value}`
        ).join("\n");

        if (target) {
          addAnswer(target.answersByCase, caseData.id, answer);
          continue;
        }

        const legacyId = `legacy-investigation:${normalizedName || "unnamed"}`;
        let legacy = byId.get(legacyId);
        if (!legacy) {
          legacy = {
            id: legacyId,
            category: "procedures",
            title: investigation.name.trim() || "بررسی اختصاصی",
            description: "آیتم بررسی استخراج‌شده از کیس‌های قدیمی.",
            answersByCase: {},
          };
          items.push(legacy);
          byId.set(legacyId, legacy);
        }
        addAnswer(legacy.answersByCase, caseData.id, answer);
      }
    }
  }

  return items;
}

export function getCourseBank(course: Course, extraCases: Case[] = []): CourseBank {
  const bankCases = getMasterCaseBank(extraCases);
  const history = buildHistoryBank(course, bankCases);
  const physicalExam = buildPhysicalExamBank(course, bankCases);
  const investigations = buildInvestigationBank(course, bankCases);

  const historyCategories: BankCategory[] = [...(course === "cardiology" ? cardiologyQuestionCategories : pulmonologyQuestionCategories)];
  const physicalExamCategories: BankCategory[] = [...(course === "cardiology" ? cardiologyPhysicalExamCategories : pulmonologyPhysicalExamCategories)];
  const investigationCategories: BankCategory[] = [...(course === "cardiology" ? cardiologyInvestigationCategories : pulmonologyInvestigationCategories)];
  const allInvestigationCategories = [
    ...investigationCategories,
    { id: "procedures", label: "پروسیجرها / اختصاصی" },
  ];

  return {
    course,
    history,
    physicalExam,
    investigations,
    historyCategories,
    physicalExamCategories: nonEmptyCategories(physicalExamCategories, physicalExam),
    investigationCategories: nonEmptyCategories(allInvestigationCategories, investigations),
  };
}

export function findHistoryAnswer(caseData: Case, questionId: string) {
  const item = getCourseBank(caseData.course, [caseData]).history.find((question) => question.id === questionId);
  return item?.answersByCase[caseData.id] ?? null;
}

