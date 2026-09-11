export type HematologyOncologyInvestigationItem={id:string;section:string;title:string;description:string};

export const hematologyOncologyInvestigationSections=[
  {id:"cbc-smear",label:"CBC & Peripheral Blood Smear"},
  {id:"iron-nutrition",label:"Iron, Vitamin & Nutritional Studies"},
  {id:"hemolysis-coagulation",label:"Hemolysis & Coagulation Studies"},
  {id:"hemoglobinopathy",label:"Hemoglobinopathy & Specialized RBC Testing"},
  {id:"bone-marrow",label:"Bone Marrow Examination"},
  {id:"flow-molecular",label:"Flow Cytometry & Cytogenetic/Molecular Studies"},
  {id:"thrombophilia",label:"Coagulation & Thrombophilia Evaluation"},
  {id:"plasma-cell",label:"Plasma Cell / Monoclonal Protein Studies"},
  {id:"cancer-imaging",label:"Cancer Imaging & Staging"},
  {id:"biopsy-pathology",label:"Tissue Biopsy & Histopathology"},
] as const;

export const hematologyOncologyInvestigationBank: HematologyOncologyInvestigationItem[]=[
  {id:"heme-inv-001",section:"cbc-smear",title:"CBC & Peripheral Blood Smear",description:"Hb/Hct، RBC indices، WBC/differential، platelet و morphology شامل blasts، schistocytes، spherocytes، target cells."},
  {id:"heme-inv-002",section:"iron-nutrition",title:"Iron, Vitamin & Nutritional Studies",description:"Ferritin، serum iron، TIBC/transferrin، transferrin saturation، vitamin B12، folate و reticulocyte count."},
  {id:"heme-inv-003",section:"hemolysis-coagulation",title:"Hemolysis & Coagulation Studies",description:"LDH، haptoglobin، indirect bilirubin، reticulocyte count، PT، aPTT، fibrinogen، D-dimer و DAT."},
  {id:"heme-inv-004",section:"hemoglobinopathy",title:"Hemoglobinopathy & Specialized RBC Testing",description:"Hemoglobin electrophoresis، HbA/HbA2/HbF/HbS، G6PD و membrane studies در موارد لازم."},
  {id:"heme-inv-005",section:"bone-marrow",title:"Bone Marrow Examination",description:"Aspirate/biopsy، cellularity، blast percentage، morphology، dysplasia، megakaryocytes و marrow infiltration."},
  {id:"heme-inv-006",section:"flow-molecular",title:"Flow Cytometry & Cytogenetic/Molecular Studies",description:"Flow cytometry، immunophenotyping، karyotype/FISH و molecular studies مانند BCR-ABL1 و JAK2/CALR/MPL."},
  {id:"heme-inv-007",section:"thrombophilia",title:"Coagulation & Thrombophilia Evaluation",description:"Protein C/S، antithrombin، Factor V Leiden، prothrombin mutation، lupus anticoagulant و antiphospholipid antibodies."},
  {id:"heme-inv-008",section:"plasma-cell",title:"Plasma Cell / Monoclonal Protein Studies",description:"SPEP، UPEP، immunofixation، serum free light chains، quantitative immunoglobulins و beta-2 microglobulin."},
  {id:"heme-inv-009",section:"cancer-imaging",title:"Cancer Imaging & Staging",description:"CT/MRI، PET-CT، ultrasound و سایر تصویربرداری‌های staging/localization متناسب با بیماری."},
  {id:"heme-inv-010",section:"biopsy-pathology",title:"Tissue Biopsy & Histopathology",description:"Lymph node/tumor biopsy، histopathology، immunohistochemistry، receptor studies و molecular pathology."},
];
