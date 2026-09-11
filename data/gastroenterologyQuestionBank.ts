import type { Case } from "../types/case";

export type GastroenterologyQuestion = { id: string; category: string; level: "primary"; text: string };

export const gastroenterologyQuestionCategories = [
  { id: "onset" , label: "شروع و سیر" },
  { id: "pain" , label: "درد شکم" },
  { id: "reflux" , label: "مری و رفلاکس" },
  { id: "vomiting" , label: "تهوع و استفراغ" },
  { id: "stool" , label: "مدفوع و دفع" },
  { id: "bleeding" , label: "خونریزی گوارشی" },
  { id: "systemic" , label: "علائم عمومی" },
  { id: "ibd" , label: "IBD و تظاهرات همراه" },
  { id: "infection" , label: "عفونت، غذا و سفر" },
  { id: "hepatobiliary" , label: "کبد، صفرا و پانکراس" },
  { id: "meds" , label: "دارو و عوامل خطر" }
] as const;

export const gastroenterologyQuestionBank: GastroenterologyQuestion[] = [
  { id: "gastro-h001", category: "onset", level: "primary", text: "علائم اصلی گوارشی شما از چه زمانی شروع شده و شروع آن‌ها ناگهانی بوده یا تدریجی؟" },
  { id: "gastro-h002", category: "onset", level: "primary", text: "علائم شما مداوم هستند یا به‌صورت دوره‌ای می‌آیند و می‌روند؟" },
  { id: "gastro-h003", category: "onset", level: "primary", text: "آیا علائم شما با گذشت زمان شدیدتر یا بیشتر شده‌اند؟" },
  { id: "gastro-h004", category: "onset", level: "primary", text: "آیا شروع علائم با یک بیماری، عفونت، تغییر رژیم غذایی، مصرف دارو یا مسافرت جدیدی همزمان بوده است؟" },
  { id: "gastro-h005", category: "pain", level: "primary", text: "آیا درد شکم دارید؟ محل دقیق درد کجاست؟" },
  { id: "gastro-h006", category: "pain", level: "primary", text: "درد به پشت، شانه، قفسه سینه یا ناحیه دیگری انتشار پیدا می‌کند؟" },
  { id: "gastro-h007", category: "pain", level: "primary", text: "درد شما چگونه است؛ سوزشی، پیچشی، کولیکی، مداوم یا بسیار شدید و ناگهانی؟" },
  { id: "gastro-h008", category: "pain", level: "primary", text: "آیا درد با غذا خوردن بهتر یا بدتر می‌شود؟" },
  { id: "gastro-h009", category: "pain", level: "primary", text: "آیا درد با دفع مدفوع یا خارج شدن گاز بهتر می‌شود؟" },
  { id: "gastro-h010", category: "pain", level: "primary", text: "آیا درد باعث می‌شود از خواب بیدار شوید؟" },
  { id: "gastro-h011", category: "pain", level: "primary", text: "آیا تا به حال درد شکمی بسیار شدید و ناگهانی داشته‌اید که ظرف مدت کوتاهی شروع شده باشد؟" },
  { id: "gastro-h012", category: "pain", level: "primary", text: "آیا همراه درد شکم تهوع، استفراغ، تب یا لرز داشته‌اید؟" },
  { id: "gastro-h013", category: "reflux", level: "primary", text: "آیا احساس سوزش پشت استخوان جناغ یا برگشت اسید و غذای ترش به دهان دارید؟" },
  { id: "gastro-h014", category: "reflux", level: "primary", text: "آیا این علائم بعد از غذا یا هنگام دراز کشیدن و شب‌ها بدتر می‌شوند؟" },
  { id: "gastro-h015", category: "reflux", level: "primary", text: "آیا هنگام بلع غذا یا نوشیدنی احساس می‌کنید چیزی در گلو یا پشت قفسه سینه گیر می‌کند؟" },
  { id: "gastro-h016", category: "reflux", level: "primary", text: "اگر مشکل بلع دارید، ابتدا با غذاهای جامد شروع شده یا از ابتدا مایعات هم برایتان مشکل بوده‌اند؟" },
  { id: "gastro-h017", category: "reflux", level: "primary", text: "آیا هنگام بلع درد دارید؟" },
  { id: "gastro-h018", category: "reflux", level: "primary", text: "آیا به‌دلیل مشکل بلع، از غذا خوردن اجتناب می‌کنید یا وزن کم کرده‌اید؟" },
  { id: "gastro-h019", category: "vomiting", level: "primary", text: "آیا تهوع یا استفراغ دارید؟ معمولاً چند بار در روز اتفاق می‌افتد؟" },
  { id: "gastro-h020", category: "vomiting", level: "primary", text: "استفراغ شما حاوی غذا، صفرا یا خون بوده است؟" },
  { id: "gastro-h021", category: "vomiting", level: "primary", text: "آیا قبل از استفراغ درد شکم ایجاد می‌شود یا بعد از آن درد شروع می‌شود؟" },
  { id: "gastro-h022", category: "vomiting", level: "primary", text: "آیا همراه استفراغ احساس نفخ شدید یا ناتوانی در دفع گاز و مدفوع دارید؟" },
  { id: "gastro-h023", category: "stool", level: "primary", text: "الگوی دفع مدفوع شما اخیراً تغییر کرده است؟" },
  { id: "gastro-h024", category: "stool", level: "primary", text: "دچار اسهال، یبوست یا جابه‌جایی بین این دو شده‌اید؟" },
  { id: "gastro-h025", category: "stool", level: "primary", text: "اگر اسهال دارید، از چه زمانی شروع شده و تقریباً چند بار در روز دفع دارید؟" },
  { id: "gastro-h026", category: "stool", level: "primary", text: "آیا در مدفوع خود خون، موکوس یا چرک مشاهده کرده‌اید؟" },
  { id: "gastro-h027", category: "stool", level: "primary", text: "آیا مدفوع شما سیاه، قیری و بدبو شده است؟" },
  { id: "gastro-h028", category: "stool", level: "primary", text: "آیا برای دفع مدفوع فوریت شدید دارید یا احساس می‌کنید هنوز بعد از دفع، مدفوع در روده باقی مانده است؟" },
  { id: "gastro-h029", category: "stool", level: "primary", text: "آیا اسهال شما در شب هم اتفاق می‌افتد و باعث بیدار شدنتان می‌شود؟" },
  { id: "gastro-h030", category: "stool", level: "primary", text: "آیا تا به حال مدفوع حجیم، چرب، بدبو یا چسبنده داشته‌اید که به‌سختی از روی توالت شسته شود؟" },
  { id: "gastro-h031", category: "bleeding", level: "primary", text: "آیا تا به حال خون استفراغ کرده‌اید یا استفراغتان شبیه تفاله قهوه بوده است؟" },
  { id: "gastro-h032", category: "bleeding", level: "primary", text: "آیا تا به حال خون روشن یا تیره در مدفوع دیده‌اید؟" },
  { id: "gastro-h033", category: "bleeding", level: "primary", text: "آیا همراه خونریزی دچار سرگیجه، ضعف، تپش قلب یا غش شده‌اید؟" },
  { id: "gastro-h034", category: "systemic", level: "primary", text: "آیا اخیراً بدون اینکه قصد داشته باشید وزن کم کرده‌اید؟ تقریباً چقدر؟" },
  { id: "gastro-h035", category: "systemic", level: "primary", text: "آیا کاهش اشتها یا احساس سیری زودرس داشته‌اید؟" },
  { id: "gastro-h036", category: "systemic", level: "primary", text: "آیا اخیراً تب، تعریق شبانه یا خستگی غیرعادی داشته‌اید؟" },
  { id: "gastro-h037", category: "systemic", level: "primary", text: "آیا زرد شدن پوست یا سفیدی چشم‌ها را متوجه شده‌اید؟" },
  { id: "gastro-h038", category: "systemic", level: "primary", text: "آیا خارش منتشر پوست بدون علت مشخص داشته‌اید؟" },
  { id: "gastro-h039", category: "ibd", level: "primary", text: "آیا دوره‌های مکرر اسهال همراه با خون یا موکوس داشته‌اید؟" },
  { id: "gastro-h040", category: "ibd", level: "primary", text: "آیا همراه با علائم گوارشی درد یا تورم مفاصل، زخم دهان، ضایعات پوستی یا درد و قرمزی چشم داشته‌اید؟" },
  { id: "gastro-h041", category: "ibd", level: "primary", text: "آیا سابقه بیماری التهابی روده مانند Crohn disease یا Ulcerative colitis دارید؟" },
  { id: "gastro-h042", category: "infection", level: "primary", text: "آیا پیش از شروع علائم، غذای مشکوک، آب غیربهداشتی یا غذای نیم‌پز مصرف کرده‌اید؟" },
  { id: "gastro-h043", category: "infection", level: "primary", text: "آیا اخیراً سفر داشته‌اید یا در محیطی با شیوع بیماری‌های گوارشی قرار گرفته‌اید؟" },
  { id: "gastro-h044", category: "infection", level: "primary", text: "آیا فرد دیگری که با او غذا خورده‌اید علائم مشابه پیدا کرده است؟" },
  { id: "gastro-h045", category: "infection", level: "primary", text: "آیا اخیراً آنتی‌بیوتیک مصرف کرده‌اید یا در بیمارستان بستری بوده‌اید؟" },
  { id: "gastro-h046", category: "hepatobiliary", level: "primary", text: "آیا درد شما بیشتر در قسمت راست بالای شکم است و آیا بعد از غذاهای چرب بدتر می‌شود؟" },
  { id: "gastro-h047", category: "hepatobiliary", level: "primary", text: "آیا همراه درد سمت راست بالای شکم تب، لرز یا زردی داشته‌اید؟" },
  { id: "gastro-h048", category: "hepatobiliary", level: "primary", text: "آیا سابقه هپاتیت، بیماری مزمن کبد، مصرف زیاد الکل، یا تماس با فرد مبتلا به هپاتیت داشته‌اید؟" },
  { id: "gastro-h049", category: "hepatobiliary", level: "primary", text: "آیا درد شدید قسمت بالای شکم دارید که به پشت انتشار پیدا کند؟" },
  { id: "gastro-h050", category: "meds", level: "primary", text: "چه داروها، مسکن‌ها، مکمل‌ها یا داروهای گیاهی را به‌طور منظم یا اخیراً مصرف کرده‌اید، به‌ویژه NSAIDها، aspirin، corticosteroids و PPIها؟" }
];

export function answerGastroHistory(caseData: Case, questionId: string): string {
  const id = caseData.diagnosis.id;
  const age = caseData.patient.age;
  const no = "نه، چنین چیزی نداشته‌ام.";
  switch (questionId) {
    case "gastro-h001": return ["acute-pancreatitis","acute-appendicitis","acute-cholecystitis","acute-cholangitis","acute-infectious-gastroenteritis","hepatitis-a","hepatitis-e","hepatitis-d"].includes(id) ? "شروعش ناگهانی بود و طی چند ساعت تا چند روز شدت گرفت." : `علائمم در ${age} سالگی بیشتر تدریجی شروع شد و طی چند هفته تا چند ماه متوجه‌شان شدم.`;
    case "gastro-h002": return ["irritable-bowel-syndrome","cholelithiasis","diverticular-disease"].includes(id) ? "دوره‌ای است؛ بعضی وقت‌ها کاملاً بهتر می‌شوم و دوباره برمی‌گردد." : "بیشتر مداوم یا عودکننده است و با گذشت زمان دوباره خودش را نشان می‌دهد.";
    case "gastro-h003": return ["achalasia","esophageal-cancer","esophageal-stricture","gastric-cancer","colorectal-cancer","pancreatic-cancer","cholangiocarcinoma"].includes(id) ? "بله، نسبت به قبل واضحاً بیشتر شده و خوردن یا فعالیت روزمره‌ام را تحت تأثیر گذاشته است." : "شدت علائمم یا ثابت مانده یا به‌تدریج کمی بیشتر شده است.";
    case "gastro-h004": return ["acute-infectious-gastroenteritis","hepatitis-a","hepatitis-e"].includes(id) ? "بله، قبل از شروع علائم غذای مشکوک یا آب مطمئنی مصرف نکرده بودم." : id === "drug-induced-liver-injury" ? "بله، چند هفته قبل یک داروی جدید شروع کرده بودم." : "ارتباط مشخصی با بیماری حاد، غذای خاص یا مسافرت پیدا نکرده‌ام.";
    case "gastro-h005": return pain(id);
    case "gastro-h006": return ["acute-pancreatitis","chronic-pancreatitis","autoimmune-pancreatitis","pancreatic-cancer"].includes(id) ? "بله، درد به سمت پشت هم انتشار پیدا می‌کند." : no;
    case "gastro-h007": return painQuality(id);
    case "gastro-h008": return mealRelation(id);
    case "gastro-h009": return id === "irritable-bowel-syndrome" ? "بله، معمولاً بعد از دفع درد شکمم بهتر می‌شود." : no;
    case "gastro-h010": return ["gerd","peptic-ulcer-disease","zollinger-ellison","pancreatic-cancer","acute-pancreatitis"].includes(id) ? "بله، بعضی شب‌ها به‌خاطر علائم از خواب بیدار می‌شوم." : no;
    case "gastro-h011": return ["acute-pancreatitis","mesenteric-ischemia","acute-appendicitis","acute-cholecystitis","acute-cholangitis"].includes(id) ? "بله، یک حمله شدید و نسبتاً ناگهانی داشته‌ام." : no;
    case "gastro-h012": return ["acute-pancreatitis","acute-cholecystitis","acute-cholangitis","acute-appendicitis","acute-infectious-gastroenteritis"].includes(id) ? "بله، تهوع دارم و همراهش تب یا لرز هم داشته‌ام." : "تهوع یا استفراغ همراه درد، اگر هم باشد خفیف است و تب و لرز ندارم.";
    case "gastro-h013": return ["gerd","barrett-esophagus","esophageal-stricture"].includes(id) ? "بله، سوزش پشت جناغ و برگشت ترش‌مزه به دهان دارم." : id === "achalasia" ? "بیشتر برگشت غذا و مایع هضم‌نشده دارم تا سوزش اسیدی." : no;
    case "gastro-h014": return ["gerd","barrett-esophagus","esophageal-stricture","achalasia"].includes(id) ? "بله، وقتی دراز می‌کشم یا شب‌ها علائمم بیشتر می‌شود." : no;
    case "gastro-h015": return ["achalasia","eosinophilic-esophagitis","esophageal-cancer","esophageal-stricture"].includes(id) ? "بله، موقع بلع احساس گیر کردن غذا پشت جناغ دارم." : no;
    case "gastro-h016": return id === "achalasia" ? "اول با غذاهای جامد بود ولی بعد مایعات هم برایم سخت شد." : ["eosinophilic-esophagitis","esophageal-cancer","esophageal-stricture"].includes(id) ? "بیشتر از جامدات شروع شد و بعد به‌تدریج بدتر شد." : "نه، مشکل واضحی با جامدات یا مایعات ندارم.";
    case "gastro-h017": return id === "eosinophilic-esophagitis" ? "گاهی هنگام عبور غذا درد پشت جناغ دارم." : no;
    case "gastro-h018": return ["achalasia","esophageal-cancer","esophageal-stricture"].includes(id) ? "بله، به‌خاطر مشکل بلع کمتر غذا می‌خورم و وزنم هم پایین آمده است." : no;
    case "gastro-h019": return ["acute-pancreatitis","acute-cholecystitis","acute-cholangitis","acute-appendicitis","acute-infectious-gastroenteritis","peptic-ulcer-disease","gastric-cancer"].includes(id) ? "بله، حالت تهوع دارم و چند بار هم استفراغ کرده‌ام." : no;
    case "gastro-h020": return ["acute-pancreatitis","acute-cholecystitis","acute-cholangitis"].includes(id) ? "بیشتر غذا یا مایع بوده و خون واضح ندیده‌ام." : no;
    case "gastro-h021": return ["acute-appendicitis","acute-pancreatitis","acute-cholecystitis"].includes(id) ? "معمولاً اول درد شروع می‌شود و بعد تهوع و استفراغ می‌آید." : "الگوی ثابتی بین درد و استفراغ متوجه نشده‌ام.";
    case "gastro-h022": return "نه، نفخ شدید همراه با ناتوانی کامل در دفع گاز و مدفوع ندارم.";
    case "gastro-h023": return ["irritable-bowel-syndrome","crohn-disease","ulcerative-colitis","microscopic-colitis","colorectal-cancer","diverticular-disease","diverticulitis","acute-infectious-gastroenteritis","celiac-disease","small-intestinal-bacterial-overgrowth","whipple-disease","tropical-sprue","short-bowel-syndrome"].includes(id) ? "بله، الگوی دفعم نسبت به قبل تغییر کرده است." : "نه، تغییر قابل‌توجهی در دفع نداشته‌ام.";
    case "gastro-h024": return id === "irritable-bowel-syndrome" ? "بین دوره‌های اسهال و یبوست جابه‌جا می‌شوم." : ["crohn-disease","ulcerative-colitis","microscopic-colitis","celiac-disease","small-intestinal-bacterial-overgrowth","whipple-disease","tropical-sprue","short-bowel-syndrome","acute-infectious-gastroenteritis"].includes(id) ? "بیشتر اسهال دارم و یبوست مشکل اصلی‌ام نیست." : ["diverticular-disease","diverticulitis","colorectal-cancer"].includes(id) ? "بیشتر یبوست و تغییر در نظم دفع دارم." : no;
    case "gastro-h025": return ["acute-infectious-gastroenteritis","ulcerative-colitis","crohn-disease","celiac-disease","small-intestinal-bacterial-overgrowth","microscopic-colitis","whipple-disease","tropical-sprue","short-bowel-syndrome"].includes(id) ? "بسته به بیماری‌ام روزانه حدود سه تا هشت بار دفع شل یا آبکی دارم." : "اسهال مداوم ندارم.";
    case "gastro-h026": return ["ulcerative-colitis","crohn-disease","colorectal-cancer","diverticulitis","hemorrhoidal-disease","anal-fissure"].includes(id) ? "بله، خون روشن یا موکوس دیده‌ام." : no;
    case "gastro-h027": return ["peptic-ulcer-disease","gastric-cancer","cirrhosis"].includes(id) ? "گاهی مدفوعم خیلی تیره شده، ولی همیشه این‌طور نیست." : no;
    case "gastro-h028": return ["ulcerative-colitis","crohn-disease"].includes(id) ? "بله، فوریت شدید برای دفع دارم و گاهی احساس تخلیه ناقص می‌کنم." : no;
    case "gastro-h029": return ["microscopic-colitis","crohn-disease","ulcerative-colitis","celiac-disease","whipple-disease","tropical-sprue","short-bowel-syndrome"].includes(id) ? "بله، بعضی شب‌ها برای دفع بیدار می‌شوم." : no;
    case "gastro-h030": return ["celiac-disease","chronic-pancreatitis","small-intestinal-bacterial-overgrowth","whipple-disease","tropical-sprue","short-bowel-syndrome"].includes(id) ? "بله، مدفوعم حجیم، بدبو و گاهی چرب و چسبنده است." : no;
    case "gastro-h031": return no;
    case "gastro-h032": return ["ulcerative-colitis","crohn-disease","colorectal-cancer","diverticulitis","hemorrhoidal-disease","anal-fissure"].includes(id) ? "بله، خون روشن یا قرمز در مدفوع یا روی دستمال دیده‌ام." : no;
    case "gastro-h033": return ["colorectal-cancer","ulcerative-colitis","peptic-ulcer-disease","cirrhosis","hemorrhoidal-disease","anal-fissure"].includes(id) ? "گاهی هنگام خونریزی احساس ضعف یا سبکی سر داشته‌ام، ولی غش نکرده‌ام." : no;
    case "gastro-h034": return weightLoss(id, age);
    case "gastro-h035": return ["gastric-cancer","pancreatic-cancer","cholangiocarcinoma","cirrhosis","hepatitis-a","hepatitis-e"].includes(id) ? "بله، اشتهایم کم شده و زود سیر می‌شوم." : no;
    case "gastro-h036": return ["acute-cholangitis","acute-cholecystitis","acute-appendicitis","acute-infectious-gastroenteritis","hepatitis-a","hepatitis-e","hepatitis-d"].includes(id) ? "بله، تب یا احساس ناخوشی واضح دارم." : ["crohn-disease","ulcerative-colitis","whipple-disease","tropical-sprue","pancreatic-cancer","gastric-cancer","colorectal-cancer","cirrhosis"].includes(id) ? "بیشتر از قبل خسته می‌شوم و احساس بی‌حالی دارم." : "تب مداوم یا تعریق شبانه قابل‌توجه ندارم.";
    case "gastro-h037": return ["hepatitis-a","hepatitis-b","hepatitis-c","hepatitis-d","hepatitis-e","cirrhosis","acute-cholangitis","choledocholithiasis","primary-biliary-cholangitis","primary-sclerosing-cholangitis","autoimmune-hepatitis","drug-induced-liver-injury","pancreatic-cancer","cholangiocarcinoma","autoimmune-pancreatitis","alcohol-associated-liver-disease"].includes(id) ? "بله، متوجه زرد شدن چشم‌ها یا پوست شده‌ام." : no;
    case "gastro-h038": return ["primary-biliary-cholangitis","primary-sclerosing-cholangitis","choledocholithiasis","acute-cholangitis","pancreatic-cancer","cholangiocarcinoma","cirrhosis"].includes(id) ? "بله، خارش منتشر، به‌خصوص شب‌ها، دارم." : no;
    case "gastro-h039": return ["ulcerative-colitis","crohn-disease"].includes(id) ? "بله، دوره‌های مکرر اسهال خونی و موکوسی داشته‌ام." : no;
    case "gastro-h040": return ["crohn-disease","ulcerative-colitis","celiac-disease","whipple-disease","primary-sclerosing-cholangitis"].includes(id) ? "بله، گاهی درد مفصل، زخم دهان یا تغییرات پوستی داشته‌ام." : id === "wilson-disease" ? "بله، لرزش دست و تغییرات رفتاری هم داشته‌ام." : no;
    case "gastro-h041": return ["crohn-disease","ulcerative-colitis","primary-sclerosing-cholangitis"].includes(id) ? "بله، سابقه یا تشخیص بیماری التهابی روده دارم." : no;
    case "gastro-h042": return ["acute-infectious-gastroenteritis","hepatitis-a","hepatitis-e"].includes(id) ? "بله، قبل از شروع علائم غذای مشکوک یا آب غیربهداشتی مصرف کرده‌ام." : no;
    case "gastro-h043": return ["hepatitis-a","hepatitis-e","tropical-sprue","acute-infectious-gastroenteritis"].includes(id) ? "بله، پیش از شروع بیماری سفر داشته‌ام." : no;
    case "gastro-h044": return id === "acute-infectious-gastroenteritis" ? "بله، فرد دیگری که با من غذا خورده بود هم علائم مشابه پیدا کرد." : no;
    case "gastro-h045": return id === "acute-infectious-gastroenteritis" ? "بله، اخیراً آنتی‌بیوتیک مصرف کرده‌ام یا یک مراجعه پزشکی داشته‌ام." : no;
    case "gastro-h046": return ["cholelithiasis","acute-cholecystitis","choledocholithiasis"].includes(id) ? "بله، درد RUQ و بعد از غذای چرب بیشتر می‌شود." : no;
    case "gastro-h047": return id === "acute-cholangitis" ? "بله، درد RUQ همراه تب، لرز و بعد زردی داشتم." : id === "acute-cholecystitis" ? "درد RUQ و تب دارم، ولی زردی واضح نداشته‌ام." : ["choledocholithiasis","cholangiocarcinoma"].includes(id) ? "بله، همراه ناراحتی RUQ زردی هم پیدا کرده‌ام." : no;
    case "gastro-h048": return ["hepatitis-a","hepatitis-b","hepatitis-c","hepatitis-d","hepatitis-e","cirrhosis","autoimmune-hepatitis","primary-biliary-cholangitis","primary-sclerosing-cholangitis","alcohol-associated-liver-disease","wilson-disease","hereditary-hemochromatosis","alpha-1-antitrypsin-deficiency","drug-induced-liver-injury","masld-mash"].includes(id) ? "بله، سابقه بیماری کبدی یا یک عامل خطر مشخص داشته‌ام." : no;
    case "gastro-h049": return ["acute-pancreatitis","chronic-pancreatitis","autoimmune-pancreatitis","pancreatic-cancer"].includes(id) ? "بله، درد شدید بالای شکم دارم که به پشت هم می‌زند." : no;
    case "gastro-h050": return id === "peptic-ulcer-disease" ? "گاهی NSAID یا مسکن مصرف کرده‌ام و برای معده هم PPI گرفته‌ام." : id === "drug-induced-liver-injury" ? "چند هفته قبل داروی جدیدی شروع کردم و بعد از آن علائمم ظاهر شد." : ["gerd","barrett-esophagus","esophageal-stricture"].includes(id) ? "برای رفلاکس بعضی وقت‌ها PPI مصرف می‌کنم." : "داروی خاصی که بتوانم شروع علائمم را دقیقاً به آن نسبت بدهم مصرف نکرده‌ام.";
  }
  return no;
}

function pain(id: string) {
  if (["acute-pancreatitis","chronic-pancreatitis","autoimmune-pancreatitis","pancreatic-cancer"].includes(id)) return "بله، درد بیشتر در قسمت بالای شکم و اپی‌گاستر است.";
  if (["cholelithiasis","acute-cholecystitis","choledocholithiasis","acute-cholangitis","cholangiocarcinoma"].includes(id)) return "بله، درد بیشتر در قسمت راست بالای شکمم است.";
  if (id === "acute-appendicitis") return "بله، درد الان بیشتر در ربع تحتانی راست شکمم است.";
  if (["diverticulitis","diverticular-disease"].includes(id)) return "بله، درد بیشتر در قسمت پایین چپ شکمم است.";
  if (["mesenteric-ischemia","mesenteric-venous-thrombosis"].includes(id)) return "بله، درد منتشر و نسبتاً شدیدی در شکمم دارم.";
  if (id === "irritable-bowel-syndrome") return "بله، درد شکمی عودکننده دارم که محلش ثابت نیست.";
  if (["peptic-ulcer-disease","h-pylori-gastritis","zollinger-ellison","gastric-cancer"].includes(id)) return "بله، درد بیشتر در بالای شکم و ناحیه اپی‌گاستر حس می‌کنم.";
  if (["anal-fissure","hemorrhoidal-disease"].includes(id)) return "درد شکمی ندارم؛ مشکل اصلی من در ناحیه مقعد است.";
  return "درد شکمی قابل‌توجهی ندارم.";
}
function painQuality(id: string) {
  if (["acute-pancreatitis","mesenteric-ischemia"].includes(id)) return "دردم شدید و مداوم است و این حمله نسبتاً ناگهانی شروع شد.";
  if (id === "cholelithiasis") return "بیشتر کولیکی و موج‌دار است و بعد از غذاهای چرب شروع می‌شود.";
  if (["acute-cholecystitis","choledocholithiasis","acute-cholangitis"].includes(id)) return "بیشتر مداوم و نسبتاً شدید است.";
  if (["peptic-ulcer-disease","h-pylori-gastritis","zollinger-ellison"].includes(id)) return "بیشتر سوزشی و مبهم در بالای شکم است.";
  if (id === "irritable-bowel-syndrome") return "بیشتر پیچشی و دل‌پیچه‌ای است.";
  if (id === "acute-appendicitis") return "دردم الان نسبتاً ثابت و شدیدتر از قبل شده است.";
  return "نه، درد من الگوی خاص و شدیدی از این نظر ندارد.";
}
function mealRelation(id: string) {
  if (["gerd","peptic-ulcer-disease","h-pylori-gastritis","barrett-esophagus","zollinger-ellison"].includes(id)) return "بله، غذا، به‌خصوص وعده‌های حجیم، علائمم را بیشتر می‌کند.";
  if (["cholelithiasis","acute-cholecystitis","choledocholithiasis"].includes(id)) return "بله، بعد از غذای چرب مخصوصاً بدتر می‌شود.";
  if (["acute-pancreatitis","chronic-pancreatitis"].includes(id)) return "بعد از غذا، به‌خصوص غذای چرب، درد و ناراحتی‌ام بیشتر می‌شود.";
  return "رابطه مشخصی بین غذا خوردن و علائمم پیدا نکرده‌ام.";
}
function weightLoss(id:string, age:number) {
  if (id === "irritable-bowel-syndrome") return "نه، وزنم تقریباً ثابت مانده است.";
  if (["pancreatic-cancer","gastric-cancer","esophageal-cancer","colorectal-cancer","celiac-disease","crohn-disease","whipple-disease","tropical-sprue","short-bowel-syndrome","chronic-pancreatitis","cirrhosis","cholangiocarcinoma","mesenteric-ischemia","mesenteric-venous-thrombosis"].includes(id)) return `بله، در ${age} سالگی طی چند ماه اخیر چند کیلو بدون قصد کم کرده‌ام.`;
  return "کاهش وزن واضح و ناخواسته نداشته‌ام.";
}
