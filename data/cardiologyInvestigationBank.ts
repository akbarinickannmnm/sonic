export type CardiologyInvestigationCategory =
  | "laboratory" | "ecg" | "echocardiography" | "imaging"
  | "coronary" | "rhythm" | "cardiac-mri" | "specialized";

export type CardiologyInvestigation = {
  id: string;
  category: CardiologyInvestigationCategory;
  title: string;
  description: string;
  answer: string;
};

export const cardiologyInvestigationCategories = [
  { id:"laboratory", label:"Laboratory" },
  { id:"ecg", label:"ECG" },
  { id:"echocardiography", label:"Echocardiography" },
  { id:"imaging", label:"Imaging" },
  { id:"coronary", label:"Coronary & Vascular" },
  { id:"rhythm", label:"Rhythm Monitoring" },
  { id:"cardiac-mri", label:"Cardiac MRI" },
  { id:"specialized", label:"Specialized Tests" },
] as const;

export const cardiologyInvestigationBank: CardiologyInvestigation[] = [
  {id:"CINV001",category:"laboratory",title:"High-Sensitivity Troponin",description:"Biomarker of myocardial injury.",answer:"A rise/fall pattern above the assay's reference threshold supports acute myocardial injury; interpret with symptoms and ECG to diagnose MI."},
  {id:"CINV002",category:"laboratory",title:"BNP / NT-proBNP",description:"Natriuretic peptide testing for suspected heart failure.",answer:"An elevated value supports cardiac congestion/heart failure but is not disease-specific; obesity and other factors can affect levels."},
  {id:"CINV003",category:"laboratory",title:"CBC",description:"Evaluate hemoglobin, leukocytes and platelets.",answer:"Anemia can worsen myocardial oxygen supply-demand mismatch; leukocytosis may support infection or inflammation."},
  {id:"CINV004",category:"laboratory",title:"Electrolytes",description:"Assess sodium, potassium, magnesium and related abnormalities.",answer:"Electrolyte abnormalities can precipitate or worsen arrhythmias and influence antiarrhythmic/diuretic therapy."},
  {id:"CINV005",category:"laboratory",title:"Renal Function",description:"Measure creatinine/eGFR and assess kidney function.",answer:"Renal dysfunction influences volume status, cardiovascular risk and dosing of several cardiac medications."},
  {id:"CINV006",category:"laboratory",title:"Thyroid Function",description:"Check TSH and free thyroid hormones when clinically indicated.",answer:"Thyrotoxicosis can precipitate atrial fibrillation and tachycardia; hypothyroidism can contribute to bradycardia and dyslipidemia."},
  {id:"CINV007",category:"laboratory",title:"Lipid Profile",description:"Assess LDL-C and other lipid parameters for cardiovascular risk.",answer:"Marked LDL elevation supports atherogenic risk and may suggest familial hypercholesterolemia in the appropriate context."},
  {id:"CINV008",category:"laboratory",title:"CRP / ESR",description:"Assess systemic inflammation when inflammatory cardiac disease is suspected.",answer:"Elevated inflammatory markers can support an inflammatory process but are nonspecific."},
  {id:"CINV009",category:"laboratory",title:"Blood Cultures",description:"Obtain appropriately before antibiotics when infective endocarditis is suspected.",answer:"Repeated positive cultures with a compatible organism support bloodstream infection and can establish a major criterion for infective endocarditis."},
  {id:"CINV010",category:"laboratory",title:"Coagulation Studies",description:"Assess coagulation status when bleeding risk, anticoagulation or procedures are relevant.",answer:"Results guide procedural safety and interpretation of anticoagulation in the appropriate setting."},

  {id:"CINV011",category:"ecg",title:"12-Lead ECG",description:"Initial electrical assessment of rhythm, conduction and ischemic changes.",answer:"Assess rate, rhythm, axis, intervals, QRS morphology and ST-T changes; findings may identify ischemia, infarction, arrhythmia or conduction disease."},
  {id:"CINV012",category:"ecg",title:"ST-Segment Elevation",description:"Evaluate for regional ST elevation in a compatible presentation.",answer:"Regional ST elevation with compatible symptoms can support acute STEMI; pericarditis and other causes must be considered from the pattern and context."},
  {id:"CINV013",category:"ecg",title:"ST-Segment Depression / T-Wave Changes",description:"Assess for ischemic repolarization abnormalities.",answer:"Dynamic ST depression or T-wave abnormalities can support myocardial ischemia but are not independently diagnostic of ACS."},
  {id:"CINV014",category:"ecg",title:"Atrial Fibrillation Pattern",description:"Assess for absent organized P waves and an irregularly irregular ventricular response.",answer:"An irregularly irregular rhythm without consistent P waves supports atrial fibrillation."},
  {id:"CINV015",category:"ecg",title:"Atrial Flutter Pattern",description:"Look for organized atrial activity with characteristic flutter waves.",answer:"Sawtooth flutter waves, often with a regular ventricular response, support atrial flutter."},
  {id:"CINV016",category:"ecg",title:"AVNRT / SVT Pattern",description:"Assess a regular narrow-complex tachycardia.",answer:"A regular narrow-complex tachycardia with absent or retrograde P waves can support AVNRT, with other SVTs in the differential."},
  {id:"CINV017",category:"ecg",title:"WPW / Pre-excitation",description:"Assess PR interval and QRS morphology for pre-excitation.",answer:"A short PR interval with a delta wave and widened QRS supports ventricular pre-excitation such as WPW."},
  {id:"CINV018",category:"ecg",title:"Ventricular Tachycardia",description:"Assess a wide-complex tachycardia and its morphology.",answer:"A sustained wide-complex tachycardia should be presumed VT until proven otherwise in the appropriate clinical context."},
  {id:"CINV019",category:"ecg",title:"AV Block",description:"Assess PR intervals, dropped beats and AV dissociation.",answer:"Progressive PR prolongation with dropped beats supports Mobitz I; constant PR with dropped QRS supports Mobitz II; AV dissociation supports complete heart block."},
  {id:"CINV020",category:"ecg",title:"LV Hypertrophy",description:"Assess voltage and repolarization criteria for ventricular hypertrophy.",answer:"ECG criteria can support LV hypertrophy, often reflecting chronic pressure load, but echocardiography is used for structural confirmation."},

  {id:"CINV021",category:"echocardiography",title:"Transthoracic Echocardiography",description:"Assess cardiac structure, function and valves.",answer:"Provides chamber size, ventricular function, valve morphology, Doppler hemodynamics, pericardium and estimated pulmonary pressures."},
  {id:"CINV022",category:"echocardiography",title:"Left Ventricular Ejection Fraction",description:"Quantify LV systolic function.",answer:"Reduced LVEF supports systolic dysfunction/HFrEF; preserved LVEF does not exclude HFpEF."},
  {id:"CINV023",category:"echocardiography",title:"Regional Wall Motion",description:"Assess for regional LV wall-motion abnormalities.",answer:"A regional wall-motion abnormality can support ischemia/infarction or prior myocardial injury."},
  {id:"CINV024",category:"echocardiography",title:"LV Wall Thickness",description:"Measure interventricular septum and posterior wall thickness.",answer:"Marked asymmetric septal hypertrophy with appropriate clinical context supports HCM; concentric thickening has a broader differential."},
  {id:"CINV025",category:"echocardiography",title:"Aortic Valve Assessment",description:"Assess valve morphology, gradients, velocity and regurgitation.",answer:"High transvalvular velocity/gradient with reduced valve area supports significant aortic stenosis; diastolic regurgitant flow supports aortic regurgitation."},
  {id:"CINV026",category:"echocardiography",title:"Mitral Valve Assessment",description:"Assess mitral valve morphology, area, gradients and regurgitation.",answer:"A reduced valve area with elevated diastolic gradient supports mitral stenosis; significant systolic regurgitant flow supports mitral regurgitation."},
  {id:"CINV027",category:"echocardiography",title:"Tricuspid Valve Assessment",description:"Assess tricuspid morphology and regurgitation severity.",answer:"Significant tricuspid regurgitation can produce right-sided volume overload and systemic venous congestion."},
  {id:"CINV028",category:"echocardiography",title:"Pulmonary Artery Pressure Estimate",description:"Use Doppler findings to estimate pulmonary pressure.",answer:"An elevated estimated pulmonary artery systolic pressure supports pulmonary hypertension and should be interpreted with the complete echocardiographic assessment."},
  {id:"CINV029",category:"echocardiography",title:"Pericardial Effusion",description:"Assess for fluid around the heart and hemodynamic effects.",answer:"An effusion with right-sided chamber collapse or significant respiratory variation can support tamponade physiology."},
  {id:"CINV030",category:"echocardiography",title:"Vegetation Assessment",description:"Assess valves for mobile masses when endocarditis is suspected.",answer:"A mobile valvular vegetation in the right clinical setting supports infective endocarditis; TEE may improve detection."},

  {id:"CINV031",category:"imaging",title:"Chest X-Ray",description:"Assess cardiac silhouette and pulmonary vasculature.",answer:"Cardiomegaly, pulmonary vascular congestion, interstitial edema and pleural effusions can support decompensated heart failure."},
  {id:"CINV032",category:"imaging",title:"CT Angiography of the Aorta",description:"Evaluate suspected acute aortic syndrome or aneurysm.",answer:"An intimal flap or true/false lumen supports aortic dissection; CT also characterizes aneurysm anatomy."},
  {id:"CINV033",category:"imaging",title:"Coronary CT Angiography",description:"Noninvasive assessment of coronary anatomy.",answer:"Coronary plaque or stenosis can be visualized directly; suitability depends on clinical setting and heart rate/rhythm."},
  {id:"CINV034",category:"imaging",title:"CT Cardiac Anatomy",description:"Assess structural cardiac anatomy when indicated.",answer:"Can characterize congenital anatomy, masses, calcification and selected structural abnormalities."},
  {id:"CINV035",category:"imaging",title:"Lower-Limb Venous Ultrasound",description:"Evaluate for DVT when thromboembolism is suspected.",answer:"Noncompressibility of a venous segment supports DVT."},

  {id:"CINV036",category:"coronary",title:"Invasive Coronary Angiography",description:"Directly visualize coronary arteries.",answer:"Defines coronary anatomy and identifies obstructive lesions; can be combined with PCI when appropriate."},
  {id:"CINV037",category:"coronary",title:"Exercise Stress ECG",description:"Assess symptoms and ECG response during exercise in selected patients.",answer:"Inducible symptoms and ischemic ECG changes can increase suspicion for myocardial ischemia in appropriate patients."},
  {id:"CINV038",category:"coronary",title:"Stress Echocardiography",description:"Assess inducible wall-motion abnormalities under stress.",answer:"New regional wall-motion abnormalities with stress support inducible myocardial ischemia."},
  {id:"CINV039",category:"coronary",title:"Myocardial Perfusion Imaging",description:"Assess regional myocardial perfusion at rest and stress.",answer:"A reversible perfusion defect supports inducible ischemia; a fixed defect may represent scar/prior infarction."},
  {id:"CINV040",category:"coronary",title:"Fractional Flow Reserve",description:"Physiologic assessment of selected coronary stenoses during angiography.",answer:"A significantly abnormal pressure-derived index supports a hemodynamically important coronary lesion."},

  {id:"CINV041",category:"rhythm",title:"Telemetry",description:"Continuous inpatient rhythm monitoring.",answer:"Can capture intermittent arrhythmias, pauses, ventricular arrhythmias and conduction abnormalities during hospitalization."},
  {id:"CINV042",category:"rhythm",title:"24–48 Hour Holter Monitor",description:"Continuous ambulatory ECG recording.",answer:"Useful when symptoms occur frequently enough to correlate with rhythm abnormalities."},
  {id:"CINV043",category:"rhythm",title:"Extended Event Monitor",description:"Longer ambulatory monitoring for intermittent symptoms.",answer:"Improves the chance of capturing infrequent palpitations or unexplained syncope associated with arrhythmia."},
  {id:"CINV044",category:"rhythm",title:"Implantable Loop Recorder",description:"Long-term monitoring for rare unexplained events.",answer:"Can document an arrhythmia during infrequent syncope or presyncope when shorter monitoring is unrevealing."},

  {id:"CINV045",category:"cardiac-mri",title:"Cardiac MRI",description:"Detailed assessment of myocardial structure, function and tissue characteristics.",answer:"Provides ventricular function and tissue characterization, including edema, fibrosis and scar patterns."},
  {id:"CINV046",category:"cardiac-mri",title:"Late Gadolinium Enhancement",description:"Assess myocardial fibrosis or scar pattern on CMR.",answer:"The distribution of enhancement helps distinguish ischemic scar from nonischemic patterns and can support myocarditis or cardiomyopathy diagnosis."},
  {id:"CINV047",category:"cardiac-mri",title:"CMR for Myocarditis",description:"Assess edema and tissue injury in suspected myocarditis.",answer:"Myocardial edema and characteristic nonischemic injury patterns support myocarditis in the appropriate clinical context."},
  {id:"CINV048",category:"cardiac-mri",title:"CMR for Infiltrative Disease",description:"Characterize myocardial tissue in suspected amyloidosis or other infiltrative disease.",answer:"Abnormal wall thickness and characteristic tissue-characterization patterns can support infiltrative cardiomyopathy."},

  {id:"CINV049",category:"specialized",title:"Right Heart Catheterization",description:"Directly measure right-sided pressures and cardiac output.",answer:"Direct hemodynamic measurements confirm and characterize pulmonary hypertension and assess filling pressures."},
  {id:"CINV050",category:"specialized",title:"Left Heart Catheterization",description:"Measure intracardiac/aortic pressures and evaluate coronary anatomy when indicated.",answer:"Provides invasive hemodynamic and coronary information in selected clinical situations."},
  {id:"CINV051",category:"specialized",title:"Electrophysiology Study",description:"Intracardiac electrical testing for selected arrhythmias.",answer:"Can induce and characterize tachyarrhythmias and define conduction pathways to guide ablation."},
  {id:"CINV052",category:"specialized",title:"Genetic Testing",description:"Assess for pathogenic variants in suspected inherited cardiomyopathy or arrhythmia syndromes.",answer:"A pathogenic variant can support an inherited diagnosis and has implications for family screening, but a negative test does not exclude disease."},
  {id:"CINV053",category:"specialized",title:"Endomyocardial Biopsy",description:"Obtain myocardial tissue in selected unexplained or suspected specific myocardial diseases.",answer:"Histology can establish selected diagnoses such as certain inflammatory or infiltrative myocardial diseases; routine use is not indicated."},
  {id:"CINV054",category:"specialized",title:"Exercise Cardiopulmonary Testing",description:"Measure integrated cardiovascular and respiratory response to exercise.",answer:"Peak oxygen consumption and other parameters help quantify exercise limitation and can aid assessment of advanced heart failure."},
  {id:"CINV055",category:"specialized",title:"Tilt-Table Testing",description:"Evaluate selected patients with unexplained syncope or suspected reflex/orthostatic mechanisms.",answer:"Reproduction of symptoms with characteristic blood-pressure/heart-rate changes can support a reflex or orthostatic mechanism."},
  {id:"CINV056",category:"specialized",title:"Ankle-Brachial Index",description:"Compare ankle and brachial systolic pressures.",answer:"A reduced ABI supports peripheral arterial disease."},
  {id:"CINV057",category:"specialized",title:"Genetic Lipid Evaluation",description:"Evaluate for inherited lipid disorders when clinical suspicion is high.",answer:"Very high LDL-C with supportive personal/family history can support familial hypercholesterolemia; genetic testing may confirm a pathogenic variant."},
  {id:"CINV058",category:"specialized",title:"Transesophageal Echocardiography",description:"Higher-resolution echocardiographic assessment of valves, atria and thoracic structures.",answer:"TEE improves detection of valvular vegetations, left atrial appendage thrombus and selected aortic pathology."},
  {id:"CINV059",category:"specialized",title:"Bubble Study",description:"Contrast-enhanced echocardiographic assessment for intracardiac shunt.",answer:"Early appearance of bubbles in the left atrium can support an intracardiac right-to-left shunt such as PFO/ASD depending on timing and technique."},
  {id:"CINV060",category:"specialized",title:"Ambulatory Blood Pressure Monitoring",description:"Measure blood pressure repeatedly over 24 hours.",answer:"Confirms out-of-office blood pressure patterns and can identify sustained or masked hypertension."},
];
