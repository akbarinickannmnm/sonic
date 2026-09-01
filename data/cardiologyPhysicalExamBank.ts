export type CardiologyPhysicalExamCategory =
  | "general" | "vitals" | "peripheral" | "neck" | "precordial"
  | "auscultation" | "respiratory" | "abdominal" | "special";

export type CardiologyPhysicalExamAction = {
  id: string;
  category: CardiologyPhysicalExamCategory;
  title: string;
  description: string;
  answer: string;
};

export const cardiologyPhysicalExamCategories = [
  { id: "general", label: "General Examination" },
  { id: "vitals", label: "Vital Signs" },
  { id: "peripheral", label: "Peripheral Examination" },
  { id: "neck", label: "Neck & JVP" },
  { id: "precordial", label: "Precordial Examination" },
  { id: "auscultation", label: "Heart Auscultation" },
  { id: "respiratory", label: "Respiratory Examination" },
  { id: "abdominal", label: "Abdominal Examination" },
  { id: "special", label: "Special Findings" },
] as const;

export const cardiologyPhysicalExamBank: CardiologyPhysicalExamAction[] = [
  { id:"CPE001", category:"general", title:"General Appearance", description:"Assess distress, consciousness, body habitus, cachexia and overall illness severity.", answer:"Document whether the patient is comfortable or distressed, well or chronically ill appearing, and any obvious cyanosis or cachexia." },
  { id:"CPE002", category:"general", title:"Pallor", description:"Inspect conjunctivae and mucosa for pallor.", answer:"Pallor may support anemia as a contributor to dyspnea, angina or tachycardia." },
  { id:"CPE003", category:"general", title:"Central Cyanosis", description:"Inspect lips and tongue for central cyanosis.", answer:"Central cyanosis indicates significant arterial desaturation and may occur with cyanotic congenital heart disease or advanced cardiopulmonary disease." },
  { id:"CPE004", category:"general", title:"Peripheral Edema", description:"Inspect and palpate the ankles and lower legs for pitting edema.", answer:"Dependent pitting edema supports systemic venous congestion, especially right-sided or biventricular heart failure." },
  { id:"CPE005", category:"general", title:"Temperature", description:"Assess for fever or hypothermia in a potentially infectious presentation.", answer:"Fever raises suspicion for infective endocarditis, myocarditis or another systemic infection." },
  { id:"CPE006", category:"general", title:"Body Habitus", description:"Assess obesity, cachexia and features suggesting an inherited disorder.", answer:"Obesity is a cardiovascular risk factor; marked cachexia may accompany advanced heart failure; a marfanoid habitus raises concern for aortopathy." },
  { id:"CPE007", category:"general", title:"Peripheral Perfusion", description:"Assess skin temperature, color and capillary refill.", answer:"Cool extremities and delayed capillary refill suggest reduced peripheral perfusion, particularly in shock or severe low-output states." },

  { id:"CPE008", category:"vitals", title:"Blood Pressure", description:"Measure blood pressure accurately in the appropriate arm and repeat when necessary.", answer:"Assess for hypertension, hypotension and significant inter-arm differences; severe hypotension may indicate shock." },
  { id:"CPE009", category:"vitals", title:"Heart Rate", description:"Measure pulse rate at rest.", answer:"Tachycardia may accompany arrhythmia, heart failure, infection or shock; marked bradycardia suggests conduction disease or medication effect." },
  { id:"CPE010", category:"vitals", title:"Pulse Rhythm", description:"Assess whether the pulse is regular, regularly irregular or irregularly irregular.", answer:"An irregularly irregular pulse strongly suggests atrial fibrillation; regular tachycardia suggests an organized tachyarrhythmia." },
  { id:"CPE011", category:"vitals", title:"Respiratory Rate", description:"Measure respiratory rate and assess respiratory effort.", answer:"Tachypnea may accompany pulmonary edema, heart failure, metabolic stress or shock." },
  { id:"CPE012", category:"vitals", title:"Oxygen Saturation", description:"Measure resting SpO₂ and note oxygen requirement.", answer:"Low SpO₂ supports hypoxemia and may occur with pulmonary edema, pulmonary hypertension or cyanotic congenital disease." },
  { id:"CPE013", category:"vitals", title:"Pulse Pressure", description:"Compare systolic and diastolic pressure to estimate pulse pressure.", answer:"A wide pulse pressure can occur in significant aortic regurgitation; a narrow pulse pressure can occur in low-output states." },
  { id:"CPE014", category:"vitals", title:"Orthostatic Blood Pressure", description:"Assess blood pressure and heart rate with positional change when syncope or presyncope is suspected.", answer:"A significant postural fall supports orthostatic hypotension rather than a primary structural cardiac cause." },

  { id:"CPE015", category:"peripheral", title:"Radial Pulse Character", description:"Assess amplitude, contour and upstroke of the radial pulse.", answer:"A slow-rising low-amplitude pulse supports severe aortic stenosis; bounding pulses can occur with aortic regurgitation." },
  { id:"CPE016", category:"peripheral", title:"Carotid Pulse", description:"Assess carotid upstroke and volume carefully.", answer:"Delayed carotid upstroke suggests significant aortic stenosis; avoid simultaneous bilateral carotid palpation." },
  { id:"CPE017", category:"peripheral", title:"Radio-Radial Delay", description:"Compare radial pulses for timing and amplitude.", answer:"A significant delay or asymmetry can suggest proximal arterial disease or aortic pathology." },
  { id:"CPE018", category:"peripheral", title:"Radio-Femoral Delay", description:"Compare radial and femoral pulse timing.", answer:"Radio-femoral delay is a classic clue to coarctation of the aorta." },
  { id:"CPE019", category:"peripheral", title:"Peripheral Pulses", description:"Palpate upper- and lower-extremity pulses and compare sides.", answer:"Reduced or absent pulses suggest peripheral arterial disease or an obstructive vascular process." },
  { id:"CPE020", category:"peripheral", title:"Clubbing", description:"Inspect fingernails and nail beds for digital clubbing.", answer:"Clubbing may occur with cyanotic congenital heart disease and infective endocarditis among other systemic conditions." },
  { id:"CPE021", category:"peripheral", title:"Splinter Hemorrhages", description:"Inspect nail beds for linear hemorrhages.", answer:"Splinter hemorrhages are a peripheral clue that may support infective endocarditis in the appropriate clinical context." },
  { id:"CPE022", category:"peripheral", title:"Peripheral Stigmata of Endocarditis", description:"Look for Janeway lesions, Osler nodes and other peripheral signs.", answer:"Janeway lesions and Osler nodes support infective endocarditis when combined with compatible systemic findings." },
  { id:"CPE023", category:"peripheral", title:"Peripheral Temperature", description:"Compare limb temperature and assess for cool extremities.", answer:"Cool peripheries suggest vasoconstriction or low cardiac output." },

  { id:"CPE024", category:"neck", title:"Jugular Venous Pressure", description:"Estimate JVP with the patient positioned appropriately.", answer:"Elevated JVP indicates increased right atrial pressure and supports systemic venous congestion." },
  { id:"CPE025", category:"neck", title:"JVP Waveform", description:"Assess venous pulsation pattern when clinically useful.", answer:"Abnormal waveforms can provide clues to tricuspid disease, right-sided dysfunction or AV dissociation." },
  { id:"CPE026", category:"neck", title:"Hepatojugular Reflux", description:"Assess the JVP response to sustained abdominal pressure.", answer:"A sustained rise in JVP supports impaired right-sided cardiac reserve and congestion." },
  { id:"CPE027", category:"neck", title:"Carotid Bruit", description:"Auscultate over the carotid arteries when vascular disease is suspected.", answer:"A carotid bruit suggests turbulent flow and possible carotid atherosclerotic disease." },
  { id:"CPE028", category:"neck", title:"Thyroid Examination", description:"Inspect and palpate the thyroid when arrhythmia or unexplained tachycardia is present.", answer:"Thyroid enlargement or signs of thyroid disease can provide a secondary cause for atrial fibrillation or tachycardia." },

  { id:"CPE029", category:"precordial", title:"Precordial Inspection", description:"Inspect the chest for visible pulsations or abnormal precordial activity.", answer:"Visible abnormal pulsations may suggest chamber enlargement or increased cardiac impulse." },
  { id:"CPE030", category:"precordial", title:"Apex Beat Location", description:"Locate the point of maximal impulse.", answer:"A laterally displaced apex can support left ventricular enlargement." },
  { id:"CPE031", category:"precordial", title:"Apex Beat Character", description:"Assess the amplitude and duration of the apex impulse.", answer:"A sustained/heaving apex suggests pressure overload such as aortic stenosis or hypertension; a hyperdynamic apex suggests volume overload." },
  { id:"CPE032", category:"precordial", title:"Parasternal Heave", description:"Palpate the left sternal border for a parasternal impulse.", answer:"A prominent right ventricular heave supports right ventricular pressure or volume overload, including pulmonary hypertension." },
  { id:"CPE033", category:"precordial", title:"Precordial Thrill", description:"Palpate valve areas for a palpable thrill.", answer:"A thrill indicates a loud turbulent murmur and raises suspicion for significant structural valve disease or a septal defect." },
  { id:"CPE034", category:"precordial", title:"Cardiac Enlargement", description:"Assess the precordium and apex for evidence of chamber enlargement.", answer:"An enlarged cardiac impulse supports structural remodeling or cardiomyopathy but requires imaging for confirmation." },

  { id:"CPE035", category:"auscultation", title:"Heart Rate and Rhythm", description:"Auscultate the heart and compare with the peripheral pulse.", answer:"Identify rate, regularity and pulse deficit; an irregularly irregular rhythm supports atrial fibrillation." },
  { id:"CPE036", category:"auscultation", title:"S1", description:"Assess intensity and splitting of the first heart sound.", answer:"S1 intensity varies with AV valve position and conduction; abnormalities can accompany mitral valve disease." },
  { id:"CPE037", category:"auscultation", title:"S2", description:"Assess A2/P2 intensity and splitting.", answer:"Loud P2 can suggest pulmonary hypertension; abnormal splitting may indicate conduction or structural disease." },
  { id:"CPE038", category:"auscultation", title:"S3", description:"Listen at the apex with the patient in the appropriate position.", answer:"An S3 in an adult can indicate volume overload and is classically associated with systolic heart failure." },
  { id:"CPE039", category:"auscultation", title:"S4", description:"Listen for a low-frequency sound just before S1.", answer:"An S4 indicates reduced ventricular compliance and may occur with hypertrophy or ischemic ventricular dysfunction." },
  { id:"CPE040", category:"auscultation", title:"Aortic Ejection Murmur", description:"Listen over the right upper sternal border and assess radiation to the carotids.", answer:"A harsh crescendo-decrescendo systolic murmur radiating to the carotids supports aortic stenosis." },
  { id:"CPE041", category:"auscultation", title:"Aortic Regurgitation Murmur", description:"Listen along the left sternal border, especially with the patient leaning forward.", answer:"A high-pitched early diastolic decrescendo murmur supports aortic regurgitation." },
  { id:"CPE042", category:"auscultation", title:"Mitral Stenosis Murmur", description:"Listen at the apex with the patient in the left lateral position.", answer:"A low-pitched diastolic rumble with an opening snap supports mitral stenosis." },
  { id:"CPE043", category:"auscultation", title:"Mitral Regurgitation Murmur", description:"Listen at the apex and assess radiation toward the axilla.", answer:"A holosystolic murmur radiating to the axilla supports mitral regurgitation." },
  { id:"CPE044", category:"auscultation", title:"Tricuspid Regurgitation Murmur", description:"Listen at the lower left sternal border and assess respiratory variation.", answer:"A holosystolic murmur that increases with inspiration supports tricuspid regurgitation." },
  { id:"CPE045", category:"auscultation", title:"Hypertrophic Obstructive Murmur", description:"Assess a systolic ejection murmur and its response to preload changes.", answer:"A dynamic systolic murmur that becomes louder with reduced preload supports dynamic LV outflow obstruction such as HCM." },
  { id:"CPE046", category:"auscultation", title:"Pericardial Friction Rub", description:"Listen carefully over the precordium for a scratchy superficial sound.", answer:"A friction rub supports acute pericarditis in the appropriate clinical setting." },
  { id:"CPE047", category:"auscultation", title:"Murmur Radiation", description:"Determine where a murmur radiates.", answer:"Radiation helps localize valve lesions; for example, aortic stenosis commonly radiates to the carotids and mitral regurgitation toward the axilla." },
  { id:"CPE048", category:"auscultation", title:"Murmur Response to Maneuvers", description:"Assess changes with standing, squatting, Valsalva and inspiration when appropriate.", answer:"Dynamic changes can distinguish HCM, aortic stenosis and right-sided murmurs." },

  { id:"CPE049", category:"respiratory", title:"Bibasal Crackles", description:"Auscultate the lung bases for fine inspiratory crackles.", answer:"Bibasal crackles support pulmonary interstitial edema in a compatible heart-failure presentation." },
  { id:"CPE050", category:"respiratory", title:"Pleural Effusion Signs", description:"Assess for reduced breath sounds and dullness to percussion.", answer:"Pleural effusion can occur with decompensated heart failure and is usually confirmed by imaging." },
  { id:"CPE051", category:"respiratory", title:"Pulmonary Edema", description:"Assess respiratory distress, crackles and oxygenation.", answer:"Diffuse crackles, hypoxemia and respiratory distress support acute pulmonary edema." },
  { id:"CPE052", category:"respiratory", title:"Wheeze / Cardiac Asthma", description:"Listen for wheeze in a dyspneic patient.", answer:"Wheeze can occur with pulmonary edema and does not by itself establish obstructive lung disease." },

  { id:"CPE053", category:"abdominal", title:"Hepatomegaly", description:"Palpate the liver in a patient with suspected systemic venous congestion.", answer:"Tender or enlarged liver can support hepatic venous congestion from right-sided heart failure." },
  { id:"CPE054", category:"abdominal", title:"Ascites", description:"Assess for abdominal distension and shifting dullness when appropriate.", answer:"Ascites can result from chronic systemic venous congestion and advanced right-sided heart failure." },
  { id:"CPE055", category:"abdominal", title:"Pulsatile Liver", description:"Assess for transmitted or pulsatile hepatic expansion.", answer:"A pulsatile liver can occur with significant tricuspid regurgitation." },

  { id:"CPE056", category:"special", title:"Marfanoid Habitus", description:"Look for tall stature, long limbs, arachnodactyly and chest-wall features.", answer:"A marfanoid phenotype raises suspicion for heritable connective-tissue disease and aortic root disease." },
  { id:"CPE057", category:"special", title:"Bicuspid Aortic Valve Clues", description:"Look for associated findings and carefully assess the aortic area.", answer:"A bicuspid valve itself is confirmed by imaging; examination may reveal an aortic stenosis or regurgitation murmur." },
  { id:"CPE058", category:"special", title:"DVT Signs", description:"Inspect and palpate the legs for unilateral swelling, tenderness and asymmetry when thromboembolism is a concern.", answer:"Unilateral swelling and tenderness increase suspicion for DVT but are not diagnostic without appropriate testing." },
  { id:"CPE059", category:"special", title:"Connective-Tissue Disease Signs", description:"Inspect skin, joints and body habitus for systemic features.", answer:"Systemic connective-tissue findings can raise suspicion for associated aortic or cardiac disease." },
  { id:"CPE060", category:"special", title:"Signs of Cardiogenic Shock", description:"Assess mental status, skin temperature, blood pressure, urine output history and peripheral perfusion.", answer:"Hypotension, altered mentation, cool clammy skin and poor perfusion support cardiogenic shock in the appropriate context." },
];
