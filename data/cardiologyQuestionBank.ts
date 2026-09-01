export type CardiologyQuestionCategory =
  | "presenting_complaint"
  | "history_of_present_illness"
  | "past_medical_history"
  | "cardiovascular_procedures"
  | "medications"
  | "smoking_and_substance_use"
  | "lifestyle"
  | "family_history"
  | "infectious_and_systemic_history"
  | "congenital_and_childhood_history";

export type CardiologyQuestion = {
  id: string;
  category: CardiologyQuestionCategory;
  level: "primary";
  text: string;
};

export const cardiologyQuestionCategories: {
  id: CardiologyQuestionCategory;
  label: string;
}[] = [
  { id: "presenting_complaint", label: "Presenting Complaint" },
  { id: "history_of_present_illness", label: "History of Present Illness" },
  { id: "past_medical_history", label: "Past Medical History" },
  { id: "cardiovascular_procedures", label: "Cardiovascular Procedures" },
  { id: "medications", label: "Medications" },
  { id: "smoking_and_substance_use", label: "Smoking & Substance Use" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "family_history", label: "Family History" },
  { id: "infectious_and_systemic_history", label: "Infectious & Systemic History" },
  { id: "congenital_and_childhood_history", label: "Congenital & Childhood History" },
];

export const cardiologyQuestionBank: CardiologyQuestion[] = [
  // Presenting Complaint
  { id: "cardio-hist-001", category: "presenting_complaint", level: "primary", text: "What brought you to the hospital or clinic today?" },
  { id: "cardio-hist-002", category: "presenting_complaint", level: "primary", text: "Are you experiencing chest pain or discomfort?" },
  { id: "cardio-hist-003", category: "presenting_complaint", level: "primary", text: "Are you short of breath?" },
  { id: "cardio-hist-004", category: "presenting_complaint", level: "primary", text: "Have you noticed your heart racing, pounding, or skipping beats?" },
  { id: "cardio-hist-005", category: "presenting_complaint", level: "primary", text: "Have you ever fainted or nearly fainted?" },
  { id: "cardio-hist-006", category: "presenting_complaint", level: "primary", text: "Have you noticed swelling in your legs or ankles?" },
  { id: "cardio-hist-007", category: "presenting_complaint", level: "primary", text: "Have you noticed reduced exercise tolerance or unusual fatigue?" },
  { id: "cardio-hist-008", category: "presenting_complaint", level: "primary", text: "Have you noticed blue discoloration of your lips or fingers?" },
  { id: "cardio-hist-009", category: "presenting_complaint", level: "primary", text: "Have you had fever, chills, or other systemic symptoms?" },

  // History of Present Illness
  { id: "cardio-hist-010", category: "history_of_present_illness", level: "primary", text: "When did your symptoms first begin?" },
  { id: "cardio-hist-011", category: "history_of_present_illness", level: "primary", text: "Did the symptoms begin suddenly or gradually?" },
  { id: "cardio-hist-012", category: "history_of_present_illness", level: "primary", text: "Have the symptoms been getting worse, improving, or staying the same?" },
  { id: "cardio-hist-013", category: "history_of_present_illness", level: "primary", text: "Does the chest discomfort occur with physical exertion?" },
  { id: "cardio-hist-014", category: "history_of_present_illness", level: "primary", text: "Does the chest discomfort occur at rest?" },
  { id: "cardio-hist-015", category: "history_of_present_illness", level: "primary", text: "What does the chest discomfort feel like — pressure, squeezing, burning, stabbing, or tearing?" },
  { id: "cardio-hist-016", category: "history_of_present_illness", level: "primary", text: "Where exactly is the chest discomfort located?" },
  { id: "cardio-hist-017", category: "history_of_present_illness", level: "primary", text: "Does the discomfort radiate to your arm, jaw, neck, shoulder, or back?" },
  { id: "cardio-hist-018", category: "history_of_present_illness", level: "primary", text: "How long does each episode of chest discomfort last?" },
  { id: "cardio-hist-019", category: "history_of_present_illness", level: "primary", text: "Does anything make the chest discomfort better or worse?" },
  { id: "cardio-hist-020", category: "history_of_present_illness", level: "primary", text: "Is the chest pain worse when you breathe deeply or cough?" },
  { id: "cardio-hist-021", category: "history_of_present_illness", level: "primary", text: "Is the chest pain affected by your position, such as lying down or leaning forward?" },
  { id: "cardio-hist-022", category: "history_of_present_illness", level: "primary", text: "Does rest relieve the chest discomfort?" },
  { id: "cardio-hist-023", category: "history_of_present_illness", level: "primary", text: "Have you had nausea, vomiting, or sweating with the chest discomfort?" },
  { id: "cardio-hist-024", category: "history_of_present_illness", level: "primary", text: "Have you had shortness of breath together with the chest discomfort?" },
  { id: "cardio-hist-025", category: "history_of_present_illness", level: "primary", text: "Does your shortness of breath occur during exertion?" },
  { id: "cardio-hist-026", category: "history_of_present_illness", level: "primary", text: "Has your exercise tolerance decreased recently?" },
  { id: "cardio-hist-027", category: "history_of_present_illness", level: "primary", text: "Do you become short of breath when lying flat?" },
  { id: "cardio-hist-028", category: "history_of_present_illness", level: "primary", text: "How many pillows do you need to sleep comfortably?" },
  { id: "cardio-hist-029", category: "history_of_present_illness", level: "primary", text: "Have you ever woken suddenly at night gasping for air?" },
  { id: "cardio-hist-030", category: "history_of_present_illness", level: "primary", text: "Have you noticed rapid weight gain or increasing leg swelling?" },
  { id: "cardio-hist-031", category: "history_of_present_illness", level: "primary", text: "What do you feel during an episode of palpitations — racing, pounding, fluttering, or skipped beats?" },
  { id: "cardio-hist-032", category: "history_of_present_illness", level: "primary", text: "Do the palpitations start and stop suddenly?" },
  { id: "cardio-hist-033", category: "history_of_present_illness", level: "primary", text: "Does the heartbeat feel regular or irregular during the episodes?" },
  { id: "cardio-hist-034", category: "history_of_present_illness", level: "primary", text: "How long do the episodes of palpitations usually last?" },
  { id: "cardio-hist-035", category: "history_of_present_illness", level: "primary", text: "Are the palpitations triggered by exercise, caffeine, alcohol, or stress?" },
  { id: "cardio-hist-036", category: "history_of_present_illness", level: "primary", text: "Do you become dizzy, short of breath, or develop chest pain during palpitations?" },
  { id: "cardio-hist-037", category: "history_of_present_illness", level: "primary", text: "Did you have palpitations immediately before fainting or nearly fainting?" },
  { id: "cardio-hist-038", category: "history_of_present_illness", level: "primary", text: "Did the fainting occur during physical exertion?" },
  { id: "cardio-hist-039", category: "history_of_present_illness", level: "primary", text: "Did you have warning symptoms such as nausea, sweating, or visual changes before fainting?" },
  { id: "cardio-hist-040", category: "history_of_present_illness", level: "primary", text: "How quickly did you recover after the episode?" },

  // Past Medical History
  { id: "cardio-hist-041", category: "past_medical_history", level: "primary", text: "Have you ever had a heart attack or acute coronary syndrome?" },
  { id: "cardio-hist-042", category: "past_medical_history", level: "primary", text: "Have you ever been diagnosed with coronary artery disease?" },
  { id: "cardio-hist-043", category: "past_medical_history", level: "primary", text: "Have you ever been diagnosed with heart failure?" },
  { id: "cardio-hist-044", category: "past_medical_history", level: "primary", text: "Have you ever been diagnosed with an arrhythmia?" },
  { id: "cardio-hist-045", category: "past_medical_history", level: "primary", text: "Have you ever been told that you have a heart murmur or valve disease?" },
  { id: "cardio-hist-046", category: "past_medical_history", level: "primary", text: "Do you have a history of hypertension?" },
  { id: "cardio-hist-047", category: "past_medical_history", level: "primary", text: "Do you have diabetes mellitus?" },
  { id: "cardio-hist-048", category: "past_medical_history", level: "primary", text: "Do you have high cholesterol or a lipid disorder?" },
  { id: "cardio-hist-049", category: "past_medical_history", level: "primary", text: "Do you have kidney disease?" },
  { id: "cardio-hist-050", category: "past_medical_history", level: "primary", text: "Do you have thyroid disease?" },

  // Cardiovascular Procedures
  { id: "cardio-hist-051", category: "cardiovascular_procedures", level: "primary", text: "Have you ever had a coronary angiogram or cardiac catheterization?" },
  { id: "cardio-hist-052", category: "cardiovascular_procedures", level: "primary", text: "Have you ever had a coronary stent or angioplasty?" },
  { id: "cardio-hist-053", category: "cardiovascular_procedures", level: "primary", text: "Have you ever had coronary artery bypass surgery?" },
  { id: "cardio-hist-054", category: "cardiovascular_procedures", level: "primary", text: "Have you ever had an ablation for an arrhythmia?" },
  { id: "cardio-hist-055", category: "cardiovascular_procedures", level: "primary", text: "Do you have a pacemaker or implantable cardioverter-defibrillator?" },

  // Medications
  { id: "cardio-hist-056", category: "medications", level: "primary", text: "What medications are you currently taking?" },
  { id: "cardio-hist-057", category: "medications", level: "primary", text: "Are you taking aspirin, another antiplatelet drug, or an anticoagulant?" },
  { id: "cardio-hist-058", category: "medications", level: "primary", text: "Are you taking a beta-blocker or another medication to control your heart rate or blood pressure?" },
  { id: "cardio-hist-059", category: "medications", level: "primary", text: "Are you taking a diuretic or medication for heart failure?" },
  { id: "cardio-hist-060", category: "medications", level: "primary", text: "Have there been any recent changes to your cardiac medications?" },
  { id: "cardio-hist-061", category: "medications", level: "primary", text: "Have you missed any doses of your regular medications recently?" },

  // Smoking & Substance Use
  { id: "cardio-hist-062", category: "smoking_and_substance_use", level: "primary", text: "Do you currently smoke or have you smoked in the past?" },
  { id: "cardio-hist-063", category: "smoking_and_substance_use", level: "primary", text: "How much do you smoke, and for how many years?" },
  { id: "cardio-hist-064", category: "smoking_and_substance_use", level: "primary", text: "Do you drink alcohol?" },
  { id: "cardio-hist-065", category: "smoking_and_substance_use", level: "primary", text: "How much alcohol do you typically consume?" },
  { id: "cardio-hist-066", category: "smoking_and_substance_use", level: "primary", text: "Do you use cocaine, amphetamines, or other stimulant drugs?" },

  // Lifestyle
  { id: "cardio-hist-067", category: "lifestyle", level: "primary", text: "How physically active are you on a typical week?" },
  { id: "cardio-hist-068", category: "lifestyle", level: "primary", text: "Have you recently been unable to perform activities that you could previously do comfortably?" },
  { id: "cardio-hist-069", category: "lifestyle", level: "primary", text: "Do you snore loudly or have you ever been diagnosed with sleep apnea?" },
  { id: "cardio-hist-070", category: "lifestyle", level: "primary", text: "Have there been any major recent changes in your diet or weight?" },

  // Family History
  { id: "cardio-hist-071", category: "family_history", level: "primary", text: "Has anyone in your family had a heart attack or coronary disease at a young age?" },
  { id: "cardio-hist-072", category: "family_history", level: "primary", text: "Has anyone in your family died suddenly or unexpectedly at a young age?" },
  { id: "cardio-hist-073", category: "family_history", level: "primary", text: "Does anyone in your family have cardiomyopathy?" },
  { id: "cardio-hist-074", category: "family_history", level: "primary", text: "Does anyone in your family have an inherited arrhythmia or rhythm disorder?" },
  { id: "cardio-hist-075", category: "family_history", level: "primary", text: "Does anyone in your family have congenital heart disease?" },
  { id: "cardio-hist-076", category: "family_history", level: "primary", text: "Does anyone in your family have an aortic aneurysm or aortic dissection?" },
  { id: "cardio-hist-077", category: "family_history", level: "primary", text: "Does anyone in your family have very high cholesterol or a known inherited lipid disorder?" },

  // Infectious & Systemic History
  { id: "cardio-hist-078", category: "infectious_and_systemic_history", level: "primary", text: "Have you had a recent viral or flu-like illness?" },
  { id: "cardio-hist-079", category: "infectious_and_systemic_history", level: "primary", text: "Have you recently had a dental procedure or dental infection?" },
  { id: "cardio-hist-080", category: "infectious_and_systemic_history", level: "primary", text: "Have you recently had surgery or another invasive medical procedure?" },
  { id: "cardio-hist-081", category: "infectious_and_systemic_history", level: "primary", text: "Do you have a history of infective endocarditis?" },
  { id: "cardio-hist-082", category: "infectious_and_systemic_history", level: "primary", text: "Have you ever had rheumatic fever?" },
  { id: "cardio-hist-083", category: "infectious_and_systemic_history", level: "primary", text: "Do you have an autoimmune or connective-tissue disease?" },
  { id: "cardio-hist-084", category: "infectious_and_systemic_history", level: "primary", text: "Have you ever been diagnosed with an infiltrative or inflammatory systemic disease?" },

  // Congenital & Childhood History
  { id: "cardio-hist-085", category: "congenital_and_childhood_history", level: "primary", text: "Were you ever told that you had a heart problem or heart murmur as a child?" },
  { id: "cardio-hist-086", category: "congenital_and_childhood_history", level: "primary", text: "Were you ever diagnosed with congenital heart disease?" },
  { id: "cardio-hist-087", category: "congenital_and_childhood_history", level: "primary", text: "Did you have episodes of cyanosis during childhood?" },
  { id: "cardio-hist-088", category: "congenital_and_childhood_history", level: "primary", text: "Did you have cardiac surgery or catheter-based treatment during childhood?" },
  { id: "cardio-hist-089", category: "congenital_and_childhood_history", level: "primary", text: "Did you have difficulty keeping up with other children during physical activity?" },
];
