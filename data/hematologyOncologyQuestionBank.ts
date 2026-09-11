import type { Case } from "../types/case";

export type HematologyOncologyQuestion = { id: string; category: string; level: "primary"; text: string };

export const hematologyOncologyQuestionCategories = [
  { id: "presentation", label: "شروع و سیر" },
  { id: "constitutional", label: "علائم عمومی" },
  { id: "anemia", label: "علائم کم‌خونی" },
  { id: "bleeding", label: "خونریزی" },
  { id: "thrombosis", label: "ترومبوز" },
  { id: "infection", label: "عفونت و نقص ایمنی" },
  { id: "nodes", label: "لنف‌گره و توده‌ها" },
  { id: "bone", label: "استخوان و درد" },
  { id: "neuro", label: "علائم عصبی و هایپرویسکوزیتی" },
  { id: "solid", label: "علائم مربوط به تومور" },
  { id: "malignancy", label: "لوسمی و بیماری‌های پلاسماسل" },
  { id: "history", label: "سابقه شخصی و خانوادگی" },
] as const;

export const hematologyOncologyQuestionBank: HematologyOncologyQuestion[] = [
  { id: "heme-h001", category: "presentation", level: "primary", text: "مشکل اصلی شما از چه زمانی شروع شده و شروع آن ناگهانی بوده یا تدریجی؟" },
  { id: "heme-h002", category: "presentation", level: "primary", text: "علائم شما مداوم هستند یا به‌صورت دوره‌ای ایجاد می‌شوند؟" },
  { id: "heme-h003", category: "presentation", level: "primary", text: "آیا علائم شما در هفته‌ها یا ماه‌های اخیر شدیدتر یا بیشتر شده‌اند؟" },
  { id: "heme-h004", category: "presentation", level: "primary", text: "آیا اخیراً دچار بیماری، عفونت، بستری شدن، جراحی یا تغییر مهمی در وضعیت سلامت خود شده‌اید؟" },
  { id: "heme-h005", category: "constitutional", level: "primary", text: "آیا اخیراً بدون اینکه قصد داشته باشید وزن کم کرده‌اید؟ تقریباً چقدر؟" },
  { id: "heme-h006", category: "constitutional", level: "primary", text: "آیا اشتهای شما تغییر کرده است؟" },
  { id: "heme-h007", category: "constitutional", level: "primary", text: "آیا دچار تب‌های مکرر یا طولانی‌مدت شده‌اید؟" },
  { id: "heme-h008", category: "constitutional", level: "primary", text: "آیا شب‌ها آن‌قدر عرق می‌کنید که لباس یا ملحفه‌تان خیس شود؟" },
  { id: "heme-h009", category: "constitutional", level: "primary", text: "آیا اخیراً ضعف و خستگی غیرعادی داشته‌اید؟" },
  { id: "heme-h010", category: "constitutional", level: "primary", text: "آیا کاهش توانایی انجام فعالیت‌های روزمره یا ورزش نسبت به قبل پیدا کرده‌اید؟" },
  { id: "heme-h011", category: "anemia", level: "primary", text: "آیا دچار تنگی نفس، به‌خصوص هنگام فعالیت، شده‌اید؟" },
  { id: "heme-h012", category: "anemia", level: "primary", text: "آیا تپش قلب یا احساس ضربان شدید قلب دارید؟" },
  { id: "heme-h013", category: "anemia", level: "primary", text: "آیا سرگیجه، سبکی سر یا احساس غش داشته‌اید؟" },
  { id: "heme-h014", category: "anemia", level: "primary", text: "آیا احساس می‌کنید پوست، لب یا داخل پلک‌هایتان نسبت به قبل رنگ‌پریده‌تر شده است؟" },
  { id: "heme-h015", category: "anemia", level: "primary", text: "آیا تمایل غیرعادی به خوردن یخ، خاک یا مواد غیرخوراکی پیدا کرده‌اید؟" },
  { id: "heme-h016", category: "bleeding", level: "primary", text: "آیا اخیراً دچار خونریزی غیرعادی شده‌اید؟" },
  { id: "heme-h017", category: "bleeding", level: "primary", text: "آیا خونریزی بینی یا خونریزی لثه بیشتر از معمول داشته‌اید؟" },
  { id: "heme-h018", category: "bleeding", level: "primary", text: "آیا به‌راحتی کبود می‌شوید یا لکه‌های کوچک قرمز یا بنفش روی پوستتان ایجاد می‌شود؟" },
  { id: "heme-h019", category: "bleeding", level: "primary", text: "آیا خونریزی قاعدگی شما نسبت به قبل شدیدتر یا طولانی‌تر شده است؟" },
  { id: "heme-h020", category: "bleeding", level: "primary", text: "آیا خونریزی شما بعد از بریدگی، کشیدن دندان، جراحی یا آسیب کوچک بیشتر از حد معمول طول می‌کشد؟" },
  { id: "heme-h021", category: "bleeding", level: "primary", text: "آیا سابقه خونریزی شدید یا غیرعادی در دوران کودکی داشته‌اید؟" },
  { id: "heme-h022", category: "thrombosis", level: "primary", text: "آیا تاکنون لخته خون در پا، ریه یا سایر قسمت‌های بدن داشته‌اید؟" },
  { id: "heme-h023", category: "thrombosis", level: "primary", text: "آیا اخیراً دچار درد، تورم، گرمی یا قرمزی یک‌طرفه پا شده‌اید؟" },
  { id: "heme-h024", category: "thrombosis", level: "primary", text: "آیا اخیراً دچار درد ناگهانی قفسه سینه یا تنگی نفس ناگهانی شده‌اید؟" },
  { id: "heme-h025", category: "thrombosis", level: "primary", text: "آیا در خانواده شما سابقه لخته خون یا ترومبوز در سنین پایین وجود دارد؟" },
  { id: "heme-h026", category: "thrombosis", level: "primary", text: "آیا تاکنون بعد از مصرف هپارین یا داروی مشابه، افت پلاکت یا لخته خون پیدا کرده‌اید؟" },
  { id: "heme-h027", category: "infection", level: "primary", text: "آیا در ماه‌های اخیر عفونت‌های مکرر یا غیرمعمول داشته‌اید؟" },
  { id: "heme-h028", category: "infection", level: "primary", text: "آیا اخیراً عفونت‌هایی داشته‌اید که طولانی شوند یا دیر خوب شوند؟" },
  { id: "heme-h029", category: "infection", level: "primary", text: "آیا زخم‌ها یا عفونت‌های پوستی مکرر داشته‌اید؟" },
  { id: "heme-h030", category: "infection", level: "primary", text: "آیا اخیراً آنتی‌بیوتیک‌های متعدد مصرف کرده‌اید یا چند بار بستری شده‌اید؟" },
  { id: "heme-h031", category: "nodes", level: "primary", text: "آیا متوجه بزرگ شدن یا ایجاد توده در گردن، زیر بغل یا کشاله ران شده‌اید؟" },
  { id: "heme-h032", category: "nodes", level: "primary", text: "این توده‌ها دردناک هستند یا بدون درد؟" },
  { id: "heme-h033", category: "nodes", level: "primary", text: "آیا این توده‌ها به‌تدریج بزرگ‌تر شده‌اند؟" },
  { id: "heme-h034", category: "nodes", level: "primary", text: "آیا احساس فشار، پری یا درد در قسمت بالای سمت چپ شکم داشته‌اید؟" },
  { id: "heme-h035", category: "bone", level: "primary", text: "آیا دچار درد مداوم یا غیرقابل توضیح در استخوان‌ها، به‌خصوص کمر یا دنده‌ها، شده‌اید؟" },
  { id: "heme-h036", category: "bone", level: "primary", text: "آیا سابقه شکستگی استخوان با ضربه خفیف یا بدون ضربه قابل توجه داشته‌اید؟" },
  { id: "heme-h037", category: "bone", level: "primary", text: "آیا درد استخوان یا مفصل شما شب‌ها بیشتر می‌شود؟" },
  { id: "heme-h038", category: "neuro", level: "primary", text: "آیا دچار سردردهای جدید، تاری دید، گیجی یا کاهش تمرکز شده‌اید؟" },
  { id: "heme-h039", category: "neuro", level: "primary", text: "آیا بی‌حسی، ضعف، گزگز یا تغییر حس در دست‌ها و پاها داشته‌اید؟" },
  { id: "heme-h040", category: "neuro", level: "primary", text: "آیا دوره‌هایی از سرگیجه شدید یا اختلال گذرای بینایی داشته‌اید؟" },
  { id: "heme-h041", category: "solid", level: "primary", text: "آیا اخیراً توده، درد مداوم یا تغییر واضحی در یک قسمت خاص از بدن احساس کرده‌اید؟" },
  { id: "heme-h042", category: "solid", level: "primary", text: "آیا سرفه، گرفتگی صدا یا تنگی نفس طولانی‌مدت داشته‌اید؟" },
  { id: "heme-h043", category: "solid", level: "primary", text: "آیا تغییر جدید و پایدار در عادت دفع مدفوع یا وجود خون در مدفوع داشته‌اید؟" },
  { id: "heme-h044", category: "solid", level: "primary", text: "آیا مشکل بلع، احساس گیر کردن غذا یا درد هنگام بلع داشته‌اید؟" },
  { id: "heme-h045", category: "solid", level: "primary", text: "آیا تغییرات جدیدی در ادرار، مانند خون در ادرار یا تغییر واضح در الگوی ادرار، داشته‌اید؟" },
  { id: "heme-h046", category: "malignancy", level: "primary", text: "آیا احساس درد یا پری شکم همراه با ضعف شدید و عرق شبانه داشته‌اید؟" },
  { id: "heme-h047", category: "malignancy", level: "primary", text: "آیا دچار عفونت‌های مکرر، خونریزی یا کبودی همزمان با ضعف شدید شده‌اید؟" },
  { id: "heme-h048", category: "malignancy", level: "primary", text: "آیا اخیراً تشنگی شدید، یبوست، تهوع یا افزایش دفعات ادرار پیدا کرده‌اید؟" },
  { id: "heme-h049", category: "history", level: "primary", text: "آیا قبلاً به کم‌خونی، بیماری خونی، اختلال انعقادی یا سرطان مبتلا شده‌اید؟" },
  { id: "heme-h050", category: "history", level: "primary", text: "آیا در خانواده شما سابقه کم‌خونی ارثی، اختلالات خونریزی، لخته خون یا سرطان وجود دارد؟" },
];

const NO = "نه، چنین موردی نداشته‌ام.";
const yes = (text: string) => `بله، ${text}`;

const ids = (c: Case) => c.diagnosis.id;

export function answerHematologyOncologyHistory(caseData: Case, questionId: string): string {
  const id = ids(caseData);
  const age = caseData.patient.age;
  const female = caseData.patient.sex === "female";
  const anemia = new Set(["iron-deficiency-anemia","anemia-of-chronic-disease","megaloblastic-anemia","vitamin-b12-deficiency","sickle-cell-disease","thalassemia","autoimmune-hemolytic-anemia","g6pd-deficiency","hereditary-spherocytosis","aplastic-anemia","paroxysmal-nocturnal-hemoglobinuria","cold-agglutinin-disease"]);
  const bleeding = new Set(["immune-thrombocytopenia","von-willebrand-disease","hemophilia-a","thrombotic-thrombocytopenic-purpura","acute-myeloid-leukemia","acute-lymphoblastic-leukemia","myelodysplastic-syndrome"]);
  const thrombosis = new Set(["heparin-induced-thrombocytopenia","antiphospholipid-syndrome","factor-v-leiden-thrombophilia","polycythemia-vera","essential-thrombocythemia","primary-myelofibrosis"]);
  const leukemia = new Set(["acute-myeloid-leukemia","acute-lymphoblastic-leukemia","chronic-myeloid-leukemia","chronic-lymphocytic-leukemia","myelodysplastic-syndrome","hairy-cell-leukemia"]);
  const lymphoma = new Set(["hodgkin-lymphoma","diffuse-large-b-cell-lymphoma","follicular-lymphoma","mantle-cell-lymphoma","burkitt-lymphoma","marginal-zone-lymphoma","peripheral-t-cell-lymphoma"]);
  const plasma = new Set(["multiple-myeloma","waldenstrom-macroglobulinemia"]);
  const solid = new Set(["lung-cancer","breast-cancer","colorectal-cancer","gastric-cancer","prostate-cancer","renal-cell-carcinoma","pancreatic-cancer","hepatocellular-carcinoma","esophageal-cancer","melanoma"]);
  const is = (set: Set<string>) => set.has(id);
  const clinical = (phrase: string) => `این روزها بیشتر ${phrase} را احساس می‌کنم و از وقتی شروع شده، روی فعالیت‌های روزمره‌ام اثر گذاشته است.`;
  switch (questionId) {
    case "heme-h001": return ["acute-myeloid-leukemia","acute-lymphoblastic-leukemia","hemolytic-uremic-syndrome","thrombotic-thrombocytopenic-purpura"].includes(id) ? "شروع علائمم نسبتاً سریع بود و طی چند روز تا چند هفته متوجه بدتر شدن حال عمومی شدم." : solid.has(id) ? `علائمم در حدود ${age} سالگی به‌تدریج شروع شد و طی چند ماه بیشتر شد.` : `علائمم نسبتاً تدریجی شروع شد و طی چند هفته تا چند ماه متوجه‌شان شدم.`;
    case "heme-h002": return ["immune-thrombocytopenia","von-willebrand-disease","hemophilia-a","sickle-cell-disease","g6pd-deficiency"].includes(id) ? "بیشتر دوره‌ای است و بعضی وقت‌ها حمله یا خونریزی پیدا می‌کنم و بعد بهتر می‌شوم." : solid.has(id) ? "بیشتر مداوم و رو به پیشرفت است." : "بیشتر مداوم است، هرچند شدت علائمم نوسان دارد.";
    case "heme-h003": return ["chronic-myeloid-leukemia","chronic-lymphocytic-leukemia","multiple-myeloma","hodgkin-lymphoma","diffuse-large-b-cell-lymphoma","follicular-lymphoma","gastric-cancer","colorectal-cancer","lung-cancer","breast-cancer","pancreatic-cancer","renal-cell-carcinoma","prostate-cancer"].includes(id) ? "بله، نسبت به قبل واضحاً بیشتر شده و اخیراً فعالیت روزانه‌ام را محدود کرده است." : "نه به‌صورت ناگهانی؛ روند علائمم بیشتر تدریجی بوده است.";
    case "heme-h004": return id === "heparin-induced-thrombocytopenia" ? "بله، علائمم بعد از شروع هپارین در زمان بستری ایجاد شد." : ["g6pd-deficiency","cold-agglutinin-disease"].includes(id) ? "بله، بعد از یک عفونت یا مواجهه با عامل محرک متوجه تشدید علائم شدم." : NO;
    case "heme-h005": return solid.has(id) || leukemia.has(id) || lymphoma.has(id) || plasma.has(id) || ["myelodysplastic-syndrome","aplastic-anemia"].includes(id) ? "بله، بدون اینکه قصدش را داشته باشم چند کیلو وزن کم کرده‌ام." : NO;
    case "heme-h006": return ["multiple-myeloma","hodgkin-lymphoma","diffuse-large-b-cell-lymphoma","gastric-cancer","pancreatic-cancer","hepatocellular-carcinoma"].includes(id) ? "اشتهایم کمتر شده و زودتر احساس سیری می‌کنم." : is(anemia) ? "اشتهایم تقریباً خوب است، فقط به‌خاطر خستگی کمتر از قبل غذا می‌خورم." : "تغییر واضحی در اشتها نداشته‌ام.";
    case "heme-h007": return leukemia.has(id) || lymphoma.has(id) || ["multiple-myeloma","aplastic-anemia","myelodysplastic-syndrome","hodgkin-lymphoma"].includes(id) ? clinical("تب یا احساس تب‌های مکرر") : id === "sickle-cell-disease" ? "گاهی همراه حملات درد تب هم پیدا می‌کنم، مخصوصاً وقتی عفونت می‌گیرم." : NO;
    case "heme-h008": return lymphoma.has(id) || ["chronic-lymphocytic-leukemia","acute-myeloid-leukemia","acute-lymphoblastic-leukemia","multiple-myeloma"].includes(id) ? "بله، بعضی شب‌ها عرق زیادی می‌کنم و مجبور می‌شوم لباس یا ملحفه‌ام را عوض کنم." : NO;
    case "heme-h009": return is(anemia) || leukemia.has(id) || lymphoma.has(id) || plasma.has(id) || solid.has(id) ? clinical("خستگی و بی‌حالی") : NO;
    case "heme-h010": return is(anemia) || leukemia.has(id) || lymphoma.has(id) || plasma.has(id) || solid.has(id) ? "بله، مثل قبل توان فعالیت ندارم و زودتر خسته می‌شوم." : NO;
    case "heme-h011": return is(anemia) ? "بله، با فعالیت زود نفس‌تنگ می‌شوم، مخصوصاً هنگام بالا رفتن از پله." : solid.has(id) && ["lung-cancer","gastric-cancer"].includes(id) ? "گاهی با فعالیت نفس‌تنگ می‌شوم." : NO;
    case "heme-h012": return is(anemia) || id === "polycythemia-vera" ? "بله، گاهی ضربان قلبم را بیشتر حس می‌کنم." : NO;
    case "heme-h013": return is(anemia) || ["multiple-myeloma","polycythemia-vera","waldenstrom-macroglobulinemia","acute-myeloid-leukemia"].includes(id) ? "بله، گاهی سبکی سر یا سرگیجه دارم." : NO;
    case "heme-h014": return is(anemia) ? "بله، احساس می‌کنم داخل پلک‌ها و صورتم رنگ‌پریده‌تر شده است." : NO;
    case "heme-h015": return id === "iron-deficiency-anemia" ? "بله، مدتی است بیشتر یخ می‌جوم." : NO;
    case "heme-h016": return is(bleeding) || id === "hepatocellular-carcinoma" ? "بله، اخیراً کبودی و خونریزی غیرعادی بیشتر از قبل داشته‌ام." : NO;
    case "heme-h017": return ["immune-thrombocytopenia","von-willebrand-disease","acute-myeloid-leukemia","acute-lymphoblastic-leukemia","myelodysplastic-syndrome","hepatocellular-carcinoma"].includes(id) ? "بله، چند بار خون‌دماغ یا خونریزی لثه داشته‌ام." : NO;
    case "heme-h018": return is(bleeding) || ["immune-thrombocytopenia","acute-myeloid-leukemia","acute-lymphoblastic-leukemia"].includes(id) ? "بله، روی پاها و دست‌ها لکه‌های ریز قرمز و کبودی می‌بینم." : NO;
    case "heme-h019": return female && ["iron-deficiency-anemia","von-willebrand-disease","immune-thrombocytopenia"].includes(id) ? "بله، قاعدگی‌هایم خیلی شدیدتر و طولانی‌تر شده‌اند." : NO;
    case "heme-h020": return ["von-willebrand-disease","hemophilia-a","immune-thrombocytopenia"].includes(id) ? "بله، بعد از آسیب یا کشیدن دندان خونریزی‌ام بیشتر از حد معمول طول می‌کشد." : NO;
    case "heme-h021": return ["hemophilia-a","von-willebrand-disease","sickle-cell-disease","thalassemia","hereditary-spherocytosis"].includes(id) ? "بله، از بچگی سابقه خونریزی یا کم‌خونی در خانواده داشته‌ایم." : NO;
    case "heme-h022": return is(thrombosis) || id === "hodgkin-lymphoma" ? "بله، سابقه لخته خون داشته‌ام." : NO;
    case "heme-h023": return is(thrombosis) ? "بله، اخیراً یکی از پاهایم ورم کرده و دردناک شده است." : NO;
    case "heme-h024": return is(thrombosis) ? "بله، یک بار درد ناگهانی قفسه سینه یا تنگی نفس داشته‌ام." : NO;
    case "heme-h025": return ["factor-v-leiden-thrombophilia","antiphospholipid-syndrome"].includes(id) ? "بله، در خانواده‌ام لخته خون در سن پایین داشته‌اند." : id === "heparin-induced-thrombocytopenia" ? "بله، بعد از هپارین هم پلاکتم افت کرد و هم لخته ایجاد شد." : NO;
    case "heme-h026": return ["heparin-induced-thrombocytopenia","antiphospholipid-syndrome","factor-v-leiden-thrombophilia"].includes(id) ? "بله، بعد از درمان با هپارین یا در زمینه بیماری زمینه‌ای، درباره افت پلاکت یا لخته به من گفته‌اند." : NO;
    case "heme-h027": return leukemia.has(id) || lymphoma.has(id) || id === "multiple-myeloma" || id === "myelodysplastic-syndrome" ? "بله، چند بار در ماه‌های اخیر عفونت گرفته‌ام و دیر خوب شده‌ام." : NO;
    case "heme-h028": return leukemia.has(id) || lymphoma.has(id) || id === "aplastic-anemia" || plasma.has(id) ? "بله، عفونت‌هایم نسبت به گذشته طولانی‌تر شده‌اند." : NO;
    case "heme-h029": return leukemia.has(id) || lymphoma.has(id) ? "بله، چند بار عفونت پوستی یا زخم‌هایی داشته‌ام که دیر خوب شده‌اند." : NO;
    case "heme-h030": return leukemia.has(id) || lymphoma.has(id) ? "بله، چند بار آنتی‌بیوتیک مصرف کرده‌ام و حتی بستری هم شده‌ام." : NO;
    case "heme-h031": return lymphoma.has(id) || ["chronic-lymphocytic-leukemia","acute-lymphoblastic-leukemia","hairy-cell-leukemia"].includes(id) ? "بله، یک یا چند توده بدون درد در گردن، زیر بغل یا کشاله ران پیدا کرده‌ام." : NO;
    case "heme-h032": return lymphoma.has(id) || leukemia.has(id) ? "بیشترشان بدون درد هستند." : NO;
    case "heme-h033": return lymphoma.has(id) || leukemia.has(id) ? "بله، اندازه‌شان به‌تدریج بیشتر شده است." : NO;
    case "heme-h034": return leukemia.has(id) || lymphoma.has(id) || plasma.has(id) || ["polycythemia-vera","primary-myelofibrosis"].includes(id) ? "بله، گاهی احساس پری یا سنگینی در قسمت بالای چپ شکمم دارم." : NO;
    case "heme-h035": return ["multiple-myeloma","primary-myelofibrosis","sickle-cell-disease","thalassemia","lymphoma"].includes(id) || plasma.has(id) ? "بله، درد مداوم استخوانی، مخصوصاً در کمر یا دنده‌ها، دارم." : solid.has(id) && ["prostate-cancer","renal-cell-carcinoma"].includes(id) ? "بله، درد استخوانی مداوم پیدا کرده‌ام." : NO;
    case "heme-h036": return ["multiple-myeloma","osteoporosis"].includes(id) ? "بله، با ضربه خیلی کم دچار شکستگی شده‌ام." : NO;
    case "heme-h037": return ["multiple-myeloma","lung-cancer","breast-cancer","prostate-cancer","renal-cell-carcinoma"].includes(id) ? "بله، درد استخوانم شب‌ها بیشتر می‌شود." : NO;
    case "heme-h038": return id === "waldenstrom-macroglobulinemia" ? "بله، حمله‌هایی از سردرد، تاری دید و گیجی دارم." : id === "multiple-myeloma" ? "گاهی به‌خاطر خستگی و درد شدید تمرکزم کمتر می‌شود." : NO;
    case "heme-h039": return ["vitamin-b12-deficiency","multiple-myeloma","waldenstrom-macroglobulinemia"].includes(id) ? "بله، گاهی گزگز و بی‌حسی دست و پا دارم." : NO;
    case "heme-h040": return id === "waldenstrom-macroglobulinemia" ? "بله، بعضی وقت‌ها تاری دید یا سرگیجه گذرا دارم." : NO;
    case "heme-h041": return solid.has(id) ? "بله، متوجه یک توده یا علامت موضعی ماندگار شده‌ام." : NO;
    case "heme-h042": return id === "lung-cancer" ? "بله، چند ماه است سرفه و گاهی تنگی نفس دارم." : id === "esophageal-cancer" ? "گرفتگی صدا نداشته‌ام، ولی مشکل بلع دارم." : NO;
    case "heme-h043": return ["colorectal-cancer","gastric-cancer","hepatocellular-carcinoma"].includes(id) ? "بله، تغییر واضح و ماندگاری در دفع یا خونریزی گوارشی داشته‌ام." : NO;
    case "heme-h044": return id === "esophageal-cancer" ? "بله، احساس می‌کنم غذا در پشت جناغ گیر می‌کند و مشکل بلع رو به بدتر شدن است." : NO;
    case "heme-h045": return id === "renal-cell-carcinoma" ? "بله، اخیراً خون در ادرار دیده‌ام." : id === "prostate-cancer" ? "بله، جریان ادرارم ضعیف‌تر شده و شروع ادرار سخت‌تر شده است." : NO;
    case "heme-h046": return leukemia.has(id) || lymphoma.has(id) || plasma.has(id) ? "بله، احساس پری شکم با ضعف شدید و گاهی تعریق شبانه دارم." : NO;
    case "heme-h047": return leukemia.has(id) || lymphoma.has(id) || id === "aplastic-anemia" ? "بله، هم عفونت‌های مکرر داشته‌ام و هم کبودی یا خونریزی بیشتر شده است." : NO;
    case "heme-h048": return ["multiple-myeloma"].includes(id) ? "بله، مدتی است خیلی تشنه می‌شوم، یبوست دارم و بیشتر ادرار می‌کنم." : NO;
    case "heme-h049": return ["iron-deficiency-anemia","vitamin-b12-deficiency","sickle-cell-disease","thalassemia","hemolytic-uremic-syndrome","myelodysplastic-syndrome","immune-thrombocytopenia"].includes(id) ? `بله، قبلاً ${id === "sickle-cell-disease" ? "بحران‌های دردناک و کم‌خونی" : "کم‌خونی یا بیماری خونی"} تشخیص داده شده بود.` : solid.has(id) ? "نه، سرطان قبلی نداشته‌ام و این اولین بار است که برای این مشکل بررسی می‌شوم." : NO;
    case "heme-h050": return ["thalassemia","sickle-cell-disease","hemophilia-a","von-willebrand-disease","factor-v-leiden-thrombophilia"].includes(id) ? "بله، چند نفر از بستگان نزدیکم سابقه بیماری خونی یا لخته داشته‌اند." : solid.has(id) || lymphoma.has(id) || leukemia.has(id) ? "بله، در خانواده‌ام سابقه سرطان یا بیماری خونی وجود داشته است." : NO;
    default: return NO;
  }
}
