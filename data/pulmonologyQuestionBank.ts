export type PulmonologyQuestionCategory =
  | "onset_and_course" | "dyspnea" | "cough" | "wheeze" | "hemoptysis" | "chest_pain" | "systemic"
  | "past_respiratory" | "comorbidities" | "medications" | "smoking_and_vaping" | "occupational"
  | "home_and_environment" | "infectious_exposure" | "aspiration" | "family_history";
export type QuestionLevel = "primary";
export type PulmonologyQuestion = { id:string; category:PulmonologyQuestionCategory; level:QuestionLevel; text:string };
export const pulmonologyQuestionCategories = [
 {id:"onset_and_course",label:"شروع و روند علائم"},{id:"dyspnea",label:"تنگی نفس"},{id:"cough",label:"سرفه و خلط"},{id:"wheeze",label:"خس‌خس"},
 {id:"hemoptysis",label:"خون در خلط"},{id:"chest_pain",label:"درد و فشار قفسه سینه"},{id:"systemic",label:"علائم عمومی"},{id:"past_respiratory",label:"سابقه بیماری‌های تنفسی"},
 {id:"comorbidities",label:"بیماری‌های همراه و عوامل خطر"},{id:"medications",label:"داروها و آلرژی"},{id:"smoking_and_vaping",label:"سیگار و ویپ"},{id:"occupational",label:"مواجهه شغلی"},
 {id:"home_and_environment",label:"محیط خانه و محیط اطراف"},{id:"infectious_exposure",label:"مواجهه عفونی"},{id:"aspiration",label:"اختلال بلع و آسپیراسیون"},{id:"family_history",label:"سابقه خانوادگی"},
] as const;
export const pulmonologyQuestionBank: PulmonologyQuestion[] = [
{id:"resp-q001",text:"این مشکل از چه زمانی شروع شد؟",category:"onset_and_course",level:"primary"},
{id:"resp-q002",text:"شروعش ناگهانی بود یا کم‌کم؟",category:"onset_and_course",level:"primary"},
{id:"resp-q003",text:"از وقتی شروع شده بهتر شده یا بدتر؟",category:"onset_and_course",level:"primary"},
{id:"resp-q004",text:"همیشه این حالت را دارید یا می‌آید و می‌رود؟",category:"onset_and_course",level:"primary"},
{id:"resp-q005",text:"قبلاً هم مشکل مشابهی داشته‌اید؟",category:"onset_and_course",level:"primary"},
{id:"resp-q006",text:"چه چیزی علائم‌تان را بهتر یا بدتر می‌کند؟",category:"onset_and_course",level:"primary"},
{id:"resp-q007",text:"احساس تنگی نفس دارید؟",category:"dyspnea",level:"primary"},
{id:"resp-q008",text:"تنگی نفس در استراحت هم هست یا با فعالیت ایجاد می‌شود؟",category:"dyspnea",level:"primary"},
{id:"resp-q009",text:"وقتی دراز می‌کشید تنگی نفس‌تان بدتر می‌شود؟",category:"dyspnea",level:"primary"},
{id:"resp-q010",text:"شب‌ها با حس خفگی از خواب بیدار می‌شوید؟",category:"dyspnea",level:"primary"},
{id:"resp-q011",text:"سرفه دارید؟",category:"cough",level:"primary"},
{id:"resp-q012",text:"سرفه خشک است یا خلط هم دارید؟",category:"cough",level:"primary"},
{id:"resp-q013",text:"خلط چه رنگی است و تقریباً چقدر دارید؟",category:"cough",level:"primary"},
{id:"resp-q014",text:"تا حالا در خلط‌تان خون دیده‌اید؟",category:"hemoptysis",level:"primary"},
{id:"resp-q015",text:"خس‌خس سینه دارید؟",category:"wheeze",level:"primary"},
{id:"resp-q016",text:"احساس فشار یا سنگینی روی سینه دارید؟",category:"chest_pain",level:"primary"},
{id:"resp-q017",text:"درد قفسه سینه دارید؟",category:"chest_pain",level:"primary"},
{id:"resp-q018",text:"درد با نفس عمیق یا سرفه بدتر می‌شود؟",category:"chest_pain",level:"primary"},
{id:"resp-q019",text:"تب یا لرز داشته‌اید؟",category:"systemic",level:"primary"},
{id:"resp-q020",text:"کاهش وزن یا تعریق شبانه داشته‌اید؟",category:"systemic",level:"primary"},
{id:"resp-q021",text:"اخیراً سرماخوردگی یا عفونت تنفسی داشته‌اید؟",category:"systemic",level:"primary"},
{id:"resp-q022",text:"علائم‌تان در ساعت خاصی از روز یا شب بدتر می‌شود؟",category:"onset_and_course",level:"primary"},
{id:"resp-q023",text:"ورزش، هوای سرد، دود یا گردوغبار علائم‌تان را تحریک می‌کند؟",category:"home_and_environment",level:"primary"},
{id:"resp-q024",text:"تماس با حیوانات یا مواد حساسیت‌زا علائم‌تان را تحریک می‌کند؟",category:"home_and_environment",level:"primary"},
{id:"resp-q025",text:"قبلاً آسم، COPD، پنومونی، سل یا بیماری ریوی دیگری داشته‌اید؟",category:"past_respiratory",level:"primary"},
{id:"resp-q026",text:"تا حالا به خاطر مشکل تنفسی بستری شده‌اید یا به اورژانس رفته‌اید؟",category:"past_respiratory",level:"primary"},
{id:"resp-q027",text:"بیماری قلبی یا بیماری مهم دیگری دارید؟",category:"comorbidities",level:"primary"},
{id:"resp-q028",text:"چه داروها یا اسپری‌هایی مصرف می‌کنید؟",category:"medications",level:"primary"},
{id:"resp-q029",text:"آیا دارویی هست که علائم‌تان را بهتر کند؟",category:"medications",level:"primary"},
{id:"resp-q030",text:"سابقه آلرژی، رینیت آلرژیک یا اگزما دارید؟",category:"medications",level:"primary"},
{id:"resp-q031",text:"الان سیگار یا ویپ مصرف می‌کنید یا قبلاً مصرف می‌کردید؟",category:"smoking_and_vaping",level:"primary"},
{id:"resp-q032",text:"در محل کار با گردوغبار، دود یا مواد شیمیایی تماس زیادی دارید؟",category:"occupational",level:"primary"},
{id:"resp-q033",text:"در خانه با دود، سوخت، کپک یا حیوانات تماس قابل‌توجه دارید؟",category:"home_and_environment",level:"primary"},
{id:"resp-q034",text:"اخیراً سفر طولانی یا مدت طولانی بی‌حرکتی داشته‌اید؟",category:"comorbidities",level:"primary"},
{id:"resp-q035",text:"اخیراً جراحی شده‌اید یا در بیمارستان بستری بوده‌اید؟",category:"comorbidities",level:"primary"},
{id:"resp-q036",text:"تا حالا DVT یا آمبولی ریه داشته‌اید؟",category:"comorbidities",level:"primary"},
{id:"resp-q037",text:"اخیراً درد یا ورم یک پا داشته‌اید؟",category:"comorbidities",level:"primary"},
{id:"resp-q038",text:"اخیراً با فردی که سل یا یک عفونت تنفسی مهم داشته تماس داشته‌اید؟",category:"infectious_exposure",level:"primary"},
{id:"resp-q039",text:"مشکل بلع، خفگی هنگام غذا خوردن یا برگشت غذا و اسید به دهان دارید؟",category:"aspiration",level:"primary"},
{id:"resp-q040",text:"در خانواده سابقه آسم، بیماری ریوی، لخته خون یا بیماری ارثی مهم وجود دارد؟",category:"family_history",level:"primary"},
];
