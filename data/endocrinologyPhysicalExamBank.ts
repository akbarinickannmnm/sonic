export type EndocrinologyPhysicalExamItem={id:string;section:string;title:string;description:string};

export const endocrinologyPhysicalExamSections=[
  {id:"general",label:"ارزیابی عمومی"},
  {id:"vitals",label:"علائم حیاتی"},
  {id:"skin-hair",label:"پوست و مو"},
  {id:"face-eyes",label:"صورت و چشم"},
  {id:"neck-thyroid",label:"گردن و تیروئید"},
  {id:"cardiovascular",label:"قلب و عروق"},
  {id:"musculoskeletal",label:"عضلات و اسکلت"},
  {id:"neurologic",label:"معاینه عصبی"},
  {id:"abdomen",label:"شکم"},
  {id:"sexual",label:"جنسی و صفات ثانویه"},
  {id:"hands-peripheral",label:"دست و اندام‌های محیطی"},
  {id:"bone-mineral",label:"یافته‌های استخوانی و کلسیمی"},
] as const;

export const endocrinologyPhysicalExamBank: EndocrinologyPhysicalExamItem[]=[
  {id:"endo-pe-001",section:"general",title:"ارزیابی عمومی",description:"ظاهر کلی، سطح هوشیاری، وضعیت تغذیه‌ای، BMI ظاهری و muscle wasting."},
  {id:"endo-pe-002",section:"vitals",title:"علائم حیاتی",description:"فشار خون، ضربان قلب، تعداد تنفس، دما و orthostatic vitals."},
  {id:"endo-pe-003",section:"skin-hair",title:"پوست و مو",description:"خشکی/تعریق، نازکی پوست، hyperpigmentation، striae، bruising و تغییرات مو."},
  {id:"endo-pe-004",section:"face-eyes",title:"صورت و چشم",description:"coarse facial features، moon facies، macroglossia، proptosis و lid retraction."},
  {id:"endo-pe-005",section:"neck-thyroid",title:"گردن و تیروئید",description:"goiter، nodule، tenderness، cervical nodes، bruit و tracheal deviation."},
  {id:"endo-pe-006",section:"cardiovascular",title:"قلب و عروق",description:"heart rate/rhythm، murmur، edema و شواهد hypertension."},
  {id:"endo-pe-007",section:"musculoskeletal",title:"عضلات و اسکلت",description:"proximal weakness، muscle mass، bone tenderness، deformity و kyphosis."},
  {id:"endo-pe-008",section:"neurologic",title:"معاینه عصبی",description:"tremor، reflexes، neuropathy و mental status."},
  {id:"endo-pe-009",section:"abdomen",title:"شکم",description:"distension، hepatomegaly/splenomegaly، mass، tenderness و striae."},
  {id:"endo-pe-010",section:"sexual",title:"جنسی و صفات ثانویه",description:"secondary sexual characteristics، hair distribution، testicular size و clinical hyperandrogenism."},
  {id:"endo-pe-011",section:"hands-peripheral",title:"دست و اندام‌های محیطی",description:"tremor، sweating، distal temperature و peripheral pulses."},
  {id:"endo-pe-012",section:"bone-mineral",title:"یافته‌های استخوانی و کلسیمی",description:"tenderness، deformity و شواهد بالینی fracture."},
];
