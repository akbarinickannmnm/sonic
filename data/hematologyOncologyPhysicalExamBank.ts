export type HematologyOncologyPhysicalExamItem={id:string;section:string;title:string;description:string};

export const hematologyOncologyPhysicalExamSections=[
  {id:"general",label:"ارزیابی عمومی"},
  {id:"vitals",label:"علائم حیاتی"},
  {id:"skin-mucosa",label:"پوست و مخاط"},
  {id:"lymph-nodes",label:"لنف‌گره‌ها"},
  {id:"head-neck",label:"سر و گردن"},
  {id:"cardiovascular",label:"قلب و عروق"},
  {id:"respiratory",label:"ریه"},
  {id:"abdomen",label:"شکم"},
  {id:"musculoskeletal",label:"عضلات و اسکلت"},
  {id:"neurologic",label:"معاینه عصبی"},
  {id:"vascular",label:"عروق محیطی"},
  {id:"breast-pelvic",label:"پستان و دستگاه تناسلی"},
  {id:"rectal",label:"معاینه رکتال"},
  {id:"fundoscopy",label:"فوندوس"},
  {id:"systemic-malignancy",label:"یافته‌های سیستمیک بدخیمی"},
] as const;

export const hematologyOncologyPhysicalExamBank: HematologyOncologyPhysicalExamItem[]=[
  {id:"heme-pe-001",section:"general",title:"ارزیابی عمومی",description:"ظاهر کلی، سطح هوشیاری، وضعیت تغذیه‌ای و وجود pallor/ill-looking/cachexia."},
  {id:"heme-pe-002",section:"vitals",title:"علائم حیاتی",description:"فشار خون، ضربان قلب، تعداد تنفس، دما و وضعیت همودینامیک."},
  {id:"heme-pe-003",section:"skin-mucosa",title:"پوست و مخاط",description:"pallor، petechiae، purpura، ecchymosis، jaundice و ضایعات پوستی."},
  {id:"heme-pe-004",section:"lymph-nodes",title:"لنف‌گره‌ها",description:"بررسی cervical، axillary و inguinal lymph nodes از نظر اندازه، قوام و حساسیت."},
  {id:"heme-pe-005",section:"head-neck",title:"سر و گردن",description:"دهان، لثه، حلق، tonsils، oral lesions و سایر یافته‌های سر و گردن."},
  {id:"heme-pe-006",section:"cardiovascular",title:"قلب و عروق",description:"heart rate/rhythm، murmur، edema و علائم گردش خون."},
  {id:"heme-pe-007",section:"respiratory",title:"ریه",description:"breath sounds، crackles، wheeze و شواهد درگیری قفسه سینه."},
  {id:"heme-pe-008",section:"abdomen",title:"شکم",description:"hepatomegaly، splenomegaly، mass، tenderness، ascites و distension."},
  {id:"heme-pe-009",section:"musculoskeletal",title:"عضلات و اسکلت",description:"bone tenderness، درد مهره/دنده، deformity، weakness و pathological fracture."},
  {id:"heme-pe-010",section:"neurologic",title:"معاینه عصبی",description:"mental status، focal deficit، sensory/motor abnormalities و hyperviscosity-related findings."},
  {id:"heme-pe-011",section:"vascular",title:"عروق محیطی",description:"تورم اندام، tenderness، peripheral pulses و شواهد thrombosis/perfusion abnormality."},
  {id:"heme-pe-012",section:"breast-pelvic",title:"پستان و دستگاه تناسلی",description:"توده پستان، pelvic mass، testicular mass و سایر یافته‌های موضعی."},
  {id:"heme-pe-013",section:"rectal",title:"معاینه رکتال",description:"خون، توده، tenderness و سایر یافته‌های رکتال."},
  {id:"heme-pe-014",section:"fundoscopy",title:"فوندوس",description:"retinal hemorrhage، vascular changes و hyperviscosity-related retinal findings."},
  {id:"heme-pe-015",section:"systemic-malignancy",title:"یافته‌های سیستمیک بدخیمی",description:"الگوی کلی lymphadenopathy، hepatosplenomegaly، cachexia و سایر یافته‌های بدخیمی سیستمیک."},
];
