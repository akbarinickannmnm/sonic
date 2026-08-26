export type PulmonologyQuestionCategory =
  | "onset_and_course"
  | "dyspnea"
  | "cough"
  | "wheeze"
  | "hemoptysis"
  | "chest_pain"
  | "systemic"
  | "past_respiratory"
  | "comorbidities"
  | "medications"
  | "smoking_and_vaping"
  | "occupational"
  | "home_and_environment"
  | "infectious_exposure"
  | "aspiration"
  | "family_history";

export type QuestionLevel = "primary";

export type PulmonologyQuestion = {
  id: string;
  category: PulmonologyQuestionCategory;
  level: QuestionLevel;
  text: string;
};

export const pulmonologyQuestionCategories: {
  id: PulmonologyQuestionCategory;
  label: string;
}[] = [
  { id: "onset_and_course", label: "Onset & Course" },
  { id: "dyspnea", label: "Dyspnea" },
  { id: "cough", label: "Cough & Sputum" },
  { id: "wheeze", label: "Wheeze" },
  { id: "hemoptysis", label: "Hemoptysis" },
  { id: "chest_pain", label: "Chest Pain" },
  { id: "systemic", label: "Systemic Symptoms" },
  { id: "past_respiratory", label: "Past Respiratory History" },
  { id: "comorbidities", label: "Comorbidities & Risk Factors" },
  { id: "medications", label: "Medications & Allergy" },
  { id: "smoking_and_vaping", label: "Smoking & Vaping" },
  { id: "occupational", label: "Occupational Exposure" },
  { id: "home_and_environment", label: "Home & Environment" },
  { id: "infectious_exposure", label: "Infectious Exposure" },
  { id: "aspiration", label: "Aspiration" },
  { id: "family_history", label: "Family History" },
];

export const pulmonologyQuestionBank: PulmonologyQuestion[] = [
  { id: "resp-q001", text: "When did this problem start?", category: "onset_and_course", level: "primary" },
  { id: "resp-q002", text: "Did it start suddenly or gradually?", category: "onset_and_course", level: "primary" },
  { id: "resp-q003", text: "Has it improved or worsened since it started?", category: "onset_and_course", level: "primary" },
  { id: "resp-q004", text: "Is it always present or does it come and go?", category: "onset_and_course", level: "primary" },
  { id: "resp-q005", text: "Have you had a similar problem before?", category: "onset_and_course", level: "primary" },
  { id: "resp-q006", text: "Is there anything that makes your symptoms better or worse?", category: "onset_and_course", level: "primary" },
  { id: "resp-q007", text: "Do you feel short of breath?", category: "dyspnea", level: "primary" },
  { id: "resp-q008", text: "Does the shortness of breath occur at rest or with activity?", category: "dyspnea", level: "primary" },
  { id: "resp-q009", text: "Does it get worse when you lie down?", category: "dyspnea", level: "primary" },
  { id: "resp-q010", text: "Do you wake up at night feeling like you are choking?", category: "dyspnea", level: "primary" },
  { id: "resp-q011", text: "Do you have a cough?", category: "cough", level: "primary" },
  { id: "resp-q012", text: "Is the cough dry or do you produce sputum?", category: "cough", level: "primary" },
  { id: "resp-q013", text: "What color is the sputum and approximately how much do you produce?", category: "cough", level: "primary" },
  { id: "resp-q014", text: "Have you seen blood in your sputum?", category: "hemoptysis", level: "primary" },
  { id: "resp-q015", text: "Do you have wheezing?", category: "wheeze", level: "primary" },
  { id: "resp-q016", text: "Do you feel chest pressure or tightness?", category: "chest_pain", level: "primary" },
  { id: "resp-q017", text: "Do you have chest pain?", category: "chest_pain", level: "primary" },
  { id: "resp-q018", text: "Does the pain get worse with deep breathing or coughing?", category: "chest_pain", level: "primary" },
  { id: "resp-q019", text: "Have you had fever or chills?", category: "systemic", level: "primary" },
  { id: "resp-q020", text: "Have you had weight loss or night sweats?", category: "systemic", level: "primary" },
  { id: "resp-q021", text: "Have you recently had a cold or respiratory infection?", category: "systemic", level: "primary" },
  { id: "resp-q022", text: "Are your symptoms worse at a particular time of day or night?", category: "onset_and_course", level: "primary" },
  { id: "resp-q023", text: "Do exercise, cold air, smoke, or dust trigger your symptoms?", category: "home_and_environment", level: "primary" },
  { id: "resp-q024", text: "Does contact with animals or allergens trigger your symptoms?", category: "home_and_environment", level: "primary" },
  { id: "resp-q025", text: "Have you had asthma, COPD, pneumonia, tuberculosis, or another lung disease before?", category: "past_respiratory", level: "primary" },
  { id: "resp-q026", text: "Have you ever been hospitalized or visited the emergency department because of a breathing problem?", category: "past_respiratory", level: "primary" },
  { id: "resp-q027", text: "Do you have heart disease or another significant medical condition?", category: "comorbidities", level: "primary" },
  { id: "resp-q028", text: "What medications or inhalers do you use?", category: "medications", level: "primary" },
  { id: "resp-q029", text: "Does any medication improve your symptoms?", category: "medications", level: "primary" },
  { id: "resp-q030", text: "Do you have a history of allergies, allergic rhinitis, or eczema?", category: "medications", level: "primary" },
  { id: "resp-q031", text: "Do you currently smoke or vape, or have you smoked or vaped in the past?", category: "smoking_and_vaping", level: "primary" },
  { id: "resp-q032", text: "Are you exposed to dust, smoke, or chemicals at work?", category: "occupational", level: "primary" },
  { id: "resp-q033", text: "Are you significantly exposed to smoke, fuel, mold, or animals at home?", category: "home_and_environment", level: "primary" },
  { id: "resp-q034", text: "Have you recently had prolonged travel or immobilization?", category: "comorbidities", level: "primary" },
  { id: "resp-q035", text: "Have you recently had surgery or been hospitalized?", category: "comorbidities", level: "primary" },
  { id: "resp-q036", text: "Have you ever had DVT or pulmonary embolism?", category: "comorbidities", level: "primary" },
  { id: "resp-q037", text: "Have you had pain or swelling in one leg?", category: "comorbidities", level: "primary" },
  { id: "resp-q038", text: "Have you recently been in contact with someone with tuberculosis or a significant respiratory infection?", category: "infectious_exposure", level: "primary" },
  { id: "resp-q039", text: "Do you have difficulty swallowing, choking while eating, or reflux/regurgitation?", category: "aspiration", level: "primary" },
  { id: "resp-q040", text: "Is there a family history of asthma, lung disease, blood clots, or an important inherited disease?", category: "family_history", level: "primary" },
];
