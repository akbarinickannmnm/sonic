export type EndocrinologyInvestigationItem={id:string;section:string;title:string;description:string};

export const endocrinologyInvestigationSections=[
  {id:"basic-blood",label:"آزمایش‌های پایه خون"},
  {id:"thyroid-function",label:"آزمایش‌های عملکرد تیروئید"},
  {id:"thyroid-antibodies",label:"آنتی‌بادی‌های تیروئید"},
  {id:"pituitary-panel",label:"پنل هیپوفیز و پرولاکتین"},
  {id:"adrenal-workup",label:"بررسی هورمونی آدرنال"},
  {id:"diabetes-glucose",label:"ارزیابی دیابت و گلوکز"},
  {id:"hypoglycemia",label:"بررسی اختصاصی هیپوگلیسمی"},
  {id:"calcium-parathyroid",label:"پروفایل کلسیم، PTH و استخوان"},
  {id:"lipid-metabolic",label:"پروفایل چربی و متابولیک"},
  {id:"imaging-pathology",label:"تصویربرداری و پاتولوژی غدد"},
] as const;

export const endocrinologyInvestigationBank: EndocrinologyInvestigationItem[]=[
  {id:"endo-inv-001",section:"basic-blood",title:"آزمایش‌های پایه خون",description:"CBC، ESR/CRP، سدیم، پتاسیم، بیکربنات، کراتینین، کلسیم، فسفر، منیزیم و گلوکز."},
  {id:"endo-inv-002",section:"thyroid-function",title:"آزمایش‌های عملکرد تیروئید",description:"TSH، Free T4، Free T3 و در موارد لازم Total T4/T3."},
  {id:"endo-inv-003",section:"thyroid-antibodies",title:"آنتی‌بادی‌های تیروئید",description:"Anti-TPO، Anti-thyroglobulin و TSH receptor antibody/TSI."},
  {id:"endo-inv-004",section:"pituitary-panel",title:"پنل هیپوفیز و پرولاکتین",description:"Prolactin، IGF-1، LH، FSH، ACTH، TSH و Free T4."},
  {id:"endo-inv-005",section:"adrenal-workup",title:"بررسی هورمونی آدرنال",description:"Morning cortisol، ACTH، UFC، late-night cortisol، dexamethasone suppression، renin، aldosterone و plasma metanephrines."},
  {id:"endo-inv-006",section:"diabetes-glucose",title:"ارزیابی دیابت و گلوکز",description:"Fasting/random glucose، HbA1c، OGTT، ketones، β-hydroxybutyrate و serum osmolality."},
  {id:"endo-inv-007",section:"hypoglycemia",title:"بررسی اختصاصی هیپوگلیسمی",description:"Glucose، insulin، C-peptide، proinsulin، β-hydroxybutyrate و sulfonylurea screen."},
  {id:"endo-inv-008",section:"calcium-parathyroid",title:"پروفایل کلسیم، PTH و استخوان",description:"Total/ionized calcium، PTH، phosphate، vitamin D، ALP، creatinine و urinary calcium."},
  {id:"endo-inv-009",section:"lipid-metabolic",title:"پروفایل چربی و متابولیک",description:"Total cholesterol، LDL-C، HDL-C، triglyceride، non-HDL، ApoB و Lp(a)."},
  {id:"endo-inv-010",section:"imaging-pathology",title:"تصویربرداری و پاتولوژی غدد",description:"MRI sella، thyroid ultrasound/FNA، adrenal CT/MRI، DEXA و pathology در موارد لازم."},
];
