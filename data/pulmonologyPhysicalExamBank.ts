export type PhysicalExamCategory = "general"|"vitals"|"inspection"|"palpation"|"percussion"|"auscultation"|"cardiovascular"|"peripheral"|"neck"|"upper_airway"|"skin"|"functional";
export interface PhysicalExamAction { id:string; category:PhysicalExamCategory; title:string; description:string; }
export const physicalExamCategories=[
{id:"general",label:"ارزیابی عمومی"},{id:"vitals",label:"علائم حیاتی"},{id:"inspection",label:"بازرسی تنفسی"},{id:"palpation",label:"لمس قفسه سینه"},
{id:"percussion",label:"پرکاشن قفسه سینه"},{id:"auscultation",label:"سمع قفسه سینه"},{id:"cardiovascular",label:"معاینه قلب و عروق"},{id:"peripheral",label:"معاینه اندام‌های محیطی"},
{id:"neck",label:"گردن و غدد لنفاوی"},{id:"upper_airway",label:"راه هوایی فوقانی"},{id:"skin",label:"معاینه پوست"},{id:"functional",label:"ارزیابی عملکردی"},] as const;
export const pulmonologyPhysicalExamBank:PhysicalExamAction[]=[
{id:"PE001",category:"general",title:"ارزیابی عمومی",description:"ظاهر بیمار، شدت بیماری، سطح هوشیاری، دیسترس تنفسی، توانایی صحبت و سیانوز."},
{id:"PE002",category:"vitals",title:"علائم حیاتی",description:"دما، ضربان قلب، فشار خون، تعداد تنفس، اشباع اکسیژن و نیاز به اکسیژن."},
{id:"PE003",category:"inspection",title:"بازرسی تنفسی",description:"الگوی تنفس، تلاش تنفسی، استفاده از عضلات فرعی، تقارن قفسه سینه و حرکات قابل مشاهده."},
{id:"PE004",category:"palpation",title:"لمس قفسه سینه",description:"حرکت قفسه سینه، tactile fremitus، موقعیت تراشه و حساسیت دیواره قفسه سینه."},
{id:"PE005",category:"percussion",title:"پرکاشن قفسه سینه",description:"صدای پرکاشن، dullness، hyperresonance و حرکت دیافراگم."},
{id:"PE006",category:"auscultation",title:"سمع قفسه سینه",description:"Breath sounds، crackles، wheezing، rhonchi، stridor، pleural rub و انتقال صدا."},
{id:"PE007",category:"cardiovascular",title:"معاینه قلب و عروق",description:"صداهای قلب، ریتم، سوفل، JVP و ادم محیطی."},
{id:"PE008",category:"peripheral",title:"معاینه اندام‌های محیطی",description:"کلابینگ، سیانوز، ادم، نبض‌های محیطی و یافته‌های DVT."},
{id:"PE009",category:"neck",title:"گردن و غدد لنفاوی",description:"غدد لنفاوی گردنی و سوپراکلاویکولار، تراشه و JVP."},
{id:"PE010",category:"upper_airway",title:"راه هوایی فوقانی",description:"مخاط بینی، ترشحات بینی، اوروفارنکس، لوزه‌ها و یافته‌های راه هوایی فوقانی."},
{id:"PE011",category:"skin",title:"معاینه پوست",description:"رنگ پوست، سیانوز، راش و پرفیوژن محیطی."},
{id:"PE012",category:"functional",title:"ارزیابی عملکردی",description:"تحمل فعالیت، تنگی نفس حین فعالیت و تغییرات اشباع اکسیژن."},
];
