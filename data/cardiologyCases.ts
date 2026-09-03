import type { Case } from "../types/case";
import { diseases } from "./diseases";

export const cardiologyCases: Case[] = [
  {
    id: "cardio-001-acs", title: "Acute Coronary Syndrome (ACS)", course: "cardiology", tags: ["acute-coronary-syndrome"], difficulty: "easy",
    patient: { age: 58, sex: "male" },
    presentation: "I am here because of I have 45 minutes of central pressure-like chest pain radiating to the left arm.",
    stages: [
      { id: "cardio-001-acs-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-013-answer", sourceId: "cardio-hist-013", label: "cardio-hist-013", content: "My pain began with exertion and has persisted at rest.." },
          { id: "cardio-hist-015-answer", sourceId: "cardio-hist-015", label: "cardio-hist-015", content: "Pressure-like substernal discomfort radiating to the left arm." },
          { id: "cardio-hist-017-answer", sourceId: "cardio-hist-017", label: "cardio-hist-017", content: "Associated diaphoresis and nausea." },
      ] },
      { id: "cardio-001-acs-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-001-acs-pe", sourceId: "cardio-pe-cardio-001-acs", label: "Physical Examination", content: "Pain began with exertion and has persisted at rest. Pressure-like substernal discomfort radiating to the left arm. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-001-acs-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-001-acs-inv-1",
            name: "ECG",
            category: "Cardiac Investigation",
            findings: [{ label: "ECG", value: "ST-segment depression in the lateral leads." }],
            relevance: "high",
          },
          {
            id: "cardio-001-acs-inv-2",
            name: "High-sensitivity troponin",
            category: "Laboratory",
            findings: [{ label: "High-sensitivity troponin", value: "Troponin is elevated above the assay reference range." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "acute-coronary-syndrome")!,
    candidateDiagnosisIds: ["acute-coronary-syndrome", "stable-angina", "acute-pericarditis", "aortic-dissection", "pulmonary-embolism"],
    reviewQuestions: [],
  },
  {
    id: "cardio-002-stable-angina", title: "Stable Angina", course: "cardiology", tags: ["stable-angina"], difficulty: "easy",
    patient: { age: 62, sex: "male" },
    presentation: "I am here because of I have recurrent central chest pressure when walking uphill that resolves with rest.",
    stages: [
      { id: "cardio-002-stable-angina-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-013-answer", sourceId: "cardio-hist-013", label: "cardio-hist-013", content: "Predictable exertional pressure that resolves within several minutes of rest." },
          { id: "cardio-hist-022-answer", sourceId: "cardio-hist-022", label: "cardio-hist-022", content: "Rest consistently relieves the discomfort.." },
          { id: "cardio-hist-018-answer", sourceId: "cardio-hist-018", label: "cardio-hist-018", content: "My episodes have a similar pattern over several months.." },
      ] },
      { id: "cardio-002-stable-angina-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-002-stable-angina-pe", sourceId: "cardio-pe-cardio-002-stable-angina", label: "Physical Examination", content: "Predictable exertional pressure that resolves within several minutes of rest. Rest consistently relieves the discomfort. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-002-stable-angina-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-002-stable-angina-inv-1",
            name: "ECG",
            category: "Cardiac Investigation",
            findings: [{ label: "ECG", value: "Sinus rhythm without acute ST-segment changes." }],
            relevance: "low",
          },
          {
            id: "cardio-002-stable-angina-inv-2",
            name: "CT Coronary Angiography",
            category: "Coronary Imaging",
            findings: [{ label: "CT Coronary Angiography", value: "Atherosclerotic coronary plaque with significant coronary narrowing." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "stable-angina")!,
    candidateDiagnosisIds: ["stable-angina", "acute-coronary-syndrome", "acute-pericarditis", "aortic-stenosis", "coronary-vasospasm"],
    reviewQuestions: [],
  },
  {
    id: "cardio-003-hfref", title: "Heart Failure with Reduced Ejection Fraction (HFrEF)", course: "cardiology", tags: ["heart-failure-with-reduced-ejection-fraction"], difficulty: "medium",
    patient: { age: 70, sex: "female" },
    presentation: "I am here because of I have progressive exertional dyspnea, orthopnea, and ankle swelling.",
    stages: [
      { id: "cardio-003-hfref-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My shortness of breath has progressively worsened with exertion.." },
          { id: "cardio-hist-027-answer", sourceId: "cardio-hist-027", label: "cardio-hist-027", content: "I sleeps with three pillows because lying flat worsens my breathing." },
          { id: "cardio-hist-029-answer", sourceId: "cardio-hist-029", label: "cardio-hist-029", content: "I have episodes of waking at night gasping for air.." },
      ] },
      { id: "cardio-003-hfref-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-003-hfref-pe", sourceId: "cardio-pe-cardio-003-hfref", label: "Physical Examination", content: "Dyspnea has progressively worsened with exertion. She sleeps with three pillows because lying flat worsens her breathing. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-003-hfref-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-003-hfref-inv-1",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "LVEF 30% with global left ventricular systolic dysfunction." }],
            relevance: "high",
          },
          {
            id: "cardio-003-hfref-inv-2",
            name: "NT-proBNP",
            category: "Laboratory",
            findings: [{ label: "NT-proBNP", value: "NT-proBNP is markedly elevated." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "heart-failure-with-reduced-ejection-fraction")!,
    candidateDiagnosisIds: ["heart-failure-with-reduced-ejection-fraction", "acute-coronary-syndrome", "mitral-regurgitation", "pulmonary-hypertension-cardiac", "dilated-cardiomyopathy"],
    reviewQuestions: [],
  },
  {
    id: "cardio-004-af", title: "Atrial Fibrillation", course: "cardiology", tags: ["atrial-fibrillation"], difficulty: "easy",
    patient: { age: 76, sex: "female" },
    presentation: "I am here because of I have intermittent palpitations and reduced exercise tolerance.",
    stages: [
      { id: "cardio-004-af-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-004-answer", sourceId: "cardio-hist-004", label: "cardio-hist-004", content: "I describe an irregular fluttering sensation in the chest.." },
          { id: "cardio-hist-033-answer", sourceId: "cardio-hist-033", label: "cardio-hist-033", content: "My heartbeat feels irregular during episodes.." },
          { id: "cardio-hist-034-answer", sourceId: "cardio-hist-034", label: "cardio-hist-034", content: "My episodes last several hours and have become more frequent.." },
      ] },
      { id: "cardio-004-af-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-004-af-pe", sourceId: "cardio-pe-cardio-004-af", label: "Physical Examination", content: "She describes an irregular fluttering sensation in the chest. The heartbeat feels irregular during episodes. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-004-af-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-004-af-inv-1",
            name: "ECG",
            category: "Cardiac Investigation",
            findings: [{ label: "ECG", value: "Irregularly irregular rhythm with absent consistent P waves." }],
            relevance: "high",
          },
          {
            id: "cardio-004-af-inv-2",
            name: "Holter Monitor",
            category: "Rhythm Monitoring",
            findings: [{ label: "Holter Monitor", value: "Paroxysmal atrial fibrillation is recorded." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "atrial-fibrillation")!,
    candidateDiagnosisIds: ["atrial-fibrillation", "supraventricular-tachycardia", "ventricular-tachycardia", "stable-angina", "heart-failure-with-reduced-ejection-fraction"],
    reviewQuestions: [],
  },
  {
    id: "cardio-005-svt", title: "Supraventricular Tachycardia (SVT)", course: "cardiology", tags: ["supraventricular-tachycardia"], difficulty: "medium",
    patient: { age: 29, sex: "female" },
    presentation: "I am here because of I developed sudden episodes of rapid regular palpitations.",
    stages: [
      { id: "cardio-005-svt-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-032-answer", sourceId: "cardio-hist-032", label: "cardio-hist-032", content: "The episodes begin and stop abruptly." },
          { id: "cardio-hist-033-answer", sourceId: "cardio-hist-033", label: "cardio-hist-033", content: "My heartbeat feels very rapid and regular.." },
          { id: "cardio-hist-035-answer", sourceId: "cardio-hist-035", label: "cardio-hist-035", content: "My episodes are sometimes triggered by caffeine and stress.." },
      ] },
      { id: "cardio-005-svt-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-005-svt-pe", sourceId: "cardio-pe-cardio-005-svt", label: "Physical Examination", content: "The episodes begin and stop abruptly. The heartbeat feels very rapid and regular. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-005-svt-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-005-svt-inv-1",
            name: "ECG during episode",
            category: "Cardiac Investigation",
            findings: [{ label: "ECG during episode", value: "Regular narrow-complex tachycardia at approximately 190/min." }],
            relevance: "high",
          },
          {
            id: "cardio-005-svt-inv-2",
            name: "Electrophysiology Study",
            category: "Electrophysiology",
            findings: [{ label: "Electrophysiology Study", value: "A re-entrant supraventricular tachycardia mechanism is demonstrated." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "supraventricular-tachycardia")!,
    candidateDiagnosisIds: ["supraventricular-tachycardia", "atrial-fibrillation", "ventricular-tachycardia", "acute-coronary-syndrome", "hypertrophic-cardiomyopathy"],
    reviewQuestions: [],
  },
  {
    id: "cardio-006-vt", title: "Ventricular Tachycardia", course: "cardiology", tags: ["ventricular-tachycardia"], difficulty: "hard",
    patient: { age: 64, sex: "male" },
    presentation: "I am here because of I am here because of A 64-year-old man with previous myocardial infarction presents with sudden palpitations and presyncope.",
    stages: [
      { id: "cardio-006-vt-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-004-answer", sourceId: "cardio-hist-004", label: "cardio-hist-004", content: "Palpitations are followed by marked dizziness and near-syncope." },
          { id: "cardio-hist-005-answer", sourceId: "cardio-hist-005", label: "cardio-hist-005", content: "I have a history of myocardial infarction.." },
          { id: "cardio-hist-037-answer", sourceId: "cardio-hist-037", label: "cardio-hist-037", content: "My episode begins suddenly." },
      ] },
      { id: "cardio-006-vt-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-006-vt-pe", sourceId: "cardio-pe-cardio-006-vt", label: "Physical Examination", content: "Palpitations are followed by marked dizziness and near-syncope. He has a history of myocardial infarction. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-006-vt-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-006-vt-inv-1",
            name: "ECG during episode",
            category: "Cardiac Investigation",
            findings: [{ label: "ECG during episode", value: "Wide-complex regular tachycardia at 170/min." }],
            relevance: "high",
          },
          {
            id: "cardio-006-vt-inv-2",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "Reduced LVEF with regional wall-motion abnormality and ventricular scar." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "ventricular-tachycardia")!,
    candidateDiagnosisIds: ["ventricular-tachycardia", "supraventricular-tachycardia", "atrial-fibrillation", "acute-coronary-syndrome", "hypertrophic-cardiomyopathy"],
    reviewQuestions: [],
  },
  {
    id: "cardio-007-as", title: "Aortic Stenosis", course: "cardiology", tags: ["aortic-stenosis"], difficulty: "medium",
    patient: { age: 78, sex: "male" },
    presentation: "I am here because of I have exertional dyspnea, chest discomfort, and two episodes of exertional presyncope.",
    stages: [
      { id: "cardio-007-as-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-038-answer", sourceId: "cardio-hist-038", label: "cardio-hist-038", content: "Near-syncope occurs during exertion." },
          { id: "cardio-hist-013-answer", sourceId: "cardio-hist-013", label: "cardio-hist-013", content: "My chest discomfort and dyspnea occur with exertion.." },
          { id: "cardio-hist-007-answer", sourceId: "cardio-hist-007", label: "cardio-hist-007", content: "I have previously been told I has a heart murmur.." },
      ] },
      { id: "cardio-007-as-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-007-as-pe", sourceId: "cardio-pe-cardio-007-as", label: "Physical Examination", content: "Near-syncope occurs during exertion. Chest discomfort and dyspnea occur with exertion. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-007-as-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-007-as-inv-1",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "Severe calcific aortic stenosis with reduced aortic valve area and high transvalvular gradient." }],
            relevance: "high",
          },
          {
            id: "cardio-007-as-inv-2",
            name: "Auscultation",
            category: "Physical Examination",
            findings: [{ label: "Auscultation", value: "Harsh crescendo-decrescendo systolic murmur radiating to the carotids." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "aortic-stenosis")!,
    candidateDiagnosisIds: ["aortic-stenosis", "stable-angina", "hypertrophic-cardiomyopathy", "mitral-regurgitation", "acute-coronary-syndrome"],
    reviewQuestions: [],
  },
  {
    id: "cardio-008-mr", title: "Mitral Regurgitation", course: "cardiology", tags: ["mitral-regurgitation"], difficulty: "medium",
    patient: { age: 66, sex: "female" },
    presentation: "I am here because of I have progressive exertional dyspnea and fatigue.",
    stages: [
      { id: "cardio-008-mr-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "Progressive exertional dyspnea is accompanied by reduced exercise tolerance." },
          { id: "cardio-hist-043-answer", sourceId: "cardio-hist-043", label: "cardio-hist-043", content: "I have noticed ankle swelling recently.." },
          { id: "cardio-hist-045-answer", sourceId: "cardio-hist-045", label: "cardio-hist-045", content: "I was previously told I has a murmur." },
      ] },
      { id: "cardio-008-mr-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-008-mr-pe", sourceId: "cardio-pe-cardio-008-mr", label: "Physical Examination", content: "Progressive exertional dyspnea is accompanied by reduced exercise tolerance. She has noticed ankle swelling recently. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-008-mr-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-008-mr-inv-1",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "Severe mitral regurgitation with left atrial and left ventricular enlargement." }],
            relevance: "high",
          },
          {
            id: "cardio-008-mr-inv-2",
            name: "Auscultation",
            category: "Physical Examination",
            findings: [{ label: "Auscultation", value: "Holosystolic murmur best heard at the apex and radiating to the axilla." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "mitral-regurgitation")!,
    candidateDiagnosisIds: ["mitral-regurgitation", "aortic-stenosis", "heart-failure-with-reduced-ejection-fraction", "acute-pericarditis", "infective-endocarditis"],
    reviewQuestions: [],
  },
  {
    id: "cardio-009-ie", title: "Infective Endocarditis", course: "cardiology", tags: ["infective-endocarditis"], difficulty: "hard",
    patient: { age: 45, sex: "male" },
    presentation: "I am here because of I have fever, malaise, and a new cardiac murmur.",
    stages: [
      { id: "cardio-009-ie-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-009-answer", sourceId: "cardio-hist-009", label: "cardio-hist-009", content: "I have persistent fever and constitutional symptoms.." },
          { id: "cardio-hist-079-answer", sourceId: "cardio-hist-079", label: "cardio-hist-079", content: "I recently underwent a dental procedure.." },
          { id: "cardio-hist-080-answer", sourceId: "cardio-hist-080", label: "cardio-hist-080", content: "I have a history of infective endocarditis.." },
      ] },
      { id: "cardio-009-ie-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-009-ie-pe", sourceId: "cardio-pe-cardio-009-ie", label: "Physical Examination", content: "He has persistent fever and constitutional symptoms. He recently underwent a dental procedure. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-009-ie-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-009-ie-inv-1",
            name: "Blood cultures",
            category: "Microbiology",
            findings: [{ label: "Blood cultures", value: "Multiple blood culture sets grow the same organism." }],
            relevance: "high",
          },
          {
            id: "cardio-009-ie-inv-2",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "A mobile vegetation is visualized on a cardiac valve." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "infective-endocarditis")!,
    candidateDiagnosisIds: ["infective-endocarditis", "acute-myocarditis", "acute-pericarditis", "mitral-regurgitation", "acute-coronary-syndrome"],
    reviewQuestions: [],
  },
  {
    id: "cardio-010-pericarditis", title: "Acute Pericarditis", course: "cardiology", tags: ["acute-pericarditis"], difficulty: "easy",
    patient: { age: 31, sex: "male" },
    presentation: "I am here because of I developed sharp pleuritic chest pain several days after a viral illness.",
    stages: [
      { id: "cardio-010-pericarditis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-021-answer", sourceId: "cardio-hist-021", label: "cardio-hist-021", content: "My pain is worse when lying flat and improves when leaning forward.." },
          { id: "cardio-hist-078-answer", sourceId: "cardio-hist-078", label: "cardio-hist-078", content: "I had a viral-like illness one week earlier.." },
          { id: "cardio-hist-010-answer", sourceId: "cardio-hist-010", label: "cardio-hist-010", content: "My pain is sharp rather than pressure-like.." },
      ] },
      { id: "cardio-010-pericarditis-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-010-pericarditis-pe", sourceId: "cardio-pe-cardio-010-pericarditis", label: "Physical Examination", content: "Pain is worse when lying flat and improves when leaning forward. He had a viral-like illness one week earlier. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-010-pericarditis-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-010-pericarditis-inv-1",
            name: "ECG",
            category: "Cardiac Investigation",
            findings: [{ label: "ECG", value: "Diffuse ST-segment elevation with PR-segment depression." }],
            relevance: "high",
          },
          {
            id: "cardio-010-pericarditis-inv-2",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "Small circumferential pericardial effusion without tamponade physiology." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "acute-pericarditis")!,
    candidateDiagnosisIds: ["acute-pericarditis", "acute-coronary-syndrome", "acute-myocarditis", "pulmonary-embolism", "aortic-dissection"],
    reviewQuestions: [],
  },
  {
    id: "cardio-011-hcm", title: "Hypertrophic Cardiomyopathy", course: "cardiology", tags: ["hypertrophic-cardiomyopathy"], difficulty: "hard",
    patient: { age: 22, sex: "male" },
    presentation: "I am here because of I have exertional presyncope and a family history of sudden cardiac death.",
    stages: [
      { id: "cardio-011-hcm-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-038-answer", sourceId: "cardio-hist-038", label: "cardio-hist-038", content: "Presyncope occurs during exertion." },
          { id: "cardio-hist-072-answer", sourceId: "cardio-hist-072", label: "cardio-hist-072", content: "A close relative of mine died suddenly at a young age." },
          { id: "cardio-hist-073-answer", sourceId: "cardio-hist-073", label: "cardio-hist-073", content: "My family has a history of cardiomyopathy.." },
      ] },
      { id: "cardio-011-hcm-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-011-hcm-pe", sourceId: "cardio-pe-cardio-011-hcm", label: "Physical Examination", content: "Presyncope occurs during exertion. A close relative died suddenly at a young age. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-011-hcm-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-011-hcm-inv-1",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "Asymmetric septal hypertrophy with dynamic LV outflow tract obstruction." }],
            relevance: "high",
          },
          {
            id: "cardio-011-hcm-inv-2",
            name: "Cardiac MRI",
            category: "Cardiac MRI",
            findings: [{ label: "Cardiac MRI", value: "Marked myocardial hypertrophy with patchy late gadolinium enhancement." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "hypertrophic-cardiomyopathy")!,
    candidateDiagnosisIds: ["hypertrophic-cardiomyopathy", "aortic-stenosis", "supraventricular-tachycardia", "ventricular-tachycardia", "dilated-cardiomyopathy"],
    reviewQuestions: [],
  },
  {
    id: "cardio-012-dcm", title: "Dilated Cardiomyopathy", course: "cardiology", tags: ["dilated-cardiomyopathy"], difficulty: "medium",
    patient: { age: 48, sex: "male" },
    presentation: "I am here because of I have progressive exertional dyspnea and symptoms of congestion.",
    stages: [
      { id: "cardio-012-dcm-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My symptoms have progressed over several months.." },
          { id: "cardio-hist-027-answer", sourceId: "cardio-hist-027", label: "cardio-hist-027", content: "I am now short of breath when lying flat.." },
          { id: "cardio-hist-043-answer", sourceId: "cardio-hist-043", label: "cardio-hist-043", content: "I have reduced exercise tolerance.." },
      ] },
      { id: "cardio-012-dcm-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-012-dcm-pe", sourceId: "cardio-pe-cardio-012-dcm", label: "Physical Examination", content: "Symptoms have progressed over several months. He is now short of breath when lying flat. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-012-dcm-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-012-dcm-inv-1",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "Dilated left ventricle with globally reduced systolic function; LVEF 25%." }],
            relevance: "high",
          },
          {
            id: "cardio-012-dcm-inv-2",
            name: "Cardiac MRI",
            category: "Cardiac MRI",
            findings: [{ label: "Cardiac MRI", value: "Global ventricular dilation and systolic dysfunction without a focal ischemic scar pattern." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "dilated-cardiomyopathy")!,
    candidateDiagnosisIds: ["dilated-cardiomyopathy", "heart-failure-with-reduced-ejection-fraction", "acute-myocarditis", "mitral-regurgitation", "acute-coronary-syndrome"],
    reviewQuestions: [],
  },
  {
    id: "cardio-013-myocarditis", title: "Acute Myocarditis", course: "cardiology", tags: ["acute-myocarditis"], difficulty: "hard",
    patient: { age: 34, sex: "female" },
    presentation: "I am here because of I developed chest pain, fatigue, and dyspnea after a recent viral illness.",
    stages: [
      { id: "cardio-013-myocarditis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-078-answer", sourceId: "cardio-hist-078", label: "cardio-hist-078", content: "My chest discomfort began after a recent viral illness.." },
          { id: "cardio-hist-024-answer", sourceId: "cardio-hist-024", label: "cardio-hist-024", content: "I have associated fatigue and exertional dyspnea.." },
          { id: "cardio-hist-012-answer", sourceId: "cardio-hist-012", label: "cardio-hist-012", content: "My symptoms developed over several days.." },
      ] },
      { id: "cardio-013-myocarditis-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-013-myocarditis-pe", sourceId: "cardio-pe-cardio-013-myocarditis", label: "Physical Examination", content: "Chest discomfort began after a recent viral illness. She has associated fatigue and exertional dyspnea. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-013-myocarditis-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-013-myocarditis-inv-1",
            name: "Troponin",
            category: "Laboratory",
            findings: [{ label: "Troponin", value: "Troponin is elevated." }],
            relevance: "high",
          },
          {
            id: "cardio-013-myocarditis-inv-2",
            name: "Cardiac MRI",
            category: "Cardiac MRI",
            findings: [{ label: "Cardiac MRI", value: "Myocardial edema with a non-ischemic late gadolinium enhancement pattern." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "acute-myocarditis")!,
    candidateDiagnosisIds: ["acute-myocarditis", "acute-pericarditis", "acute-coronary-syndrome", "dilated-cardiomyopathy", "pulmonary-embolism"],
    reviewQuestions: [],
  },
  {
    id: "cardio-014-dissection", title: "Aortic Dissection", course: "cardiology", tags: ["aortic-dissection"], difficulty: "hard",
    patient: { age: 61, sex: "male" },
    presentation: "I am here because of I am here because of A 61-year-old man with hypertension develops abrupt severe tearing chest pain radiating to the back.",
    stages: [
      { id: "cardio-014-dissection-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-011-answer", sourceId: "cardio-hist-011", label: "cardio-hist-011", content: "My pain began abruptly and reached maximal intensity immediately.." },
          { id: "cardio-hist-015-answer", sourceId: "cardio-hist-015", label: "cardio-hist-015", content: "My pain is described as tearing.." },
          { id: "cardio-hist-017-answer", sourceId: "cardio-hist-017", label: "cardio-hist-017", content: "My pain radiates to the back.." },
      ] },
      { id: "cardio-014-dissection-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-014-dissection-pe", sourceId: "cardio-pe-cardio-014-dissection", label: "Physical Examination", content: "Pain began abruptly and reached maximal intensity immediately. The pain is described as tearing. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-014-dissection-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-014-dissection-inv-1",
            name: "CT Angiography",
            category: "Aortic Imaging",
            findings: [{ label: "CT Angiography", value: "An intimal flap is seen in the ascending aorta." }],
            relevance: "high",
          },
          {
            id: "cardio-014-dissection-inv-2",
            name: "Blood Pressure",
            category: "Vital Signs",
            findings: [{ label: "Blood Pressure", value: "A marked blood-pressure difference is present between the upper extremities." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "aortic-dissection")!,
    candidateDiagnosisIds: ["aortic-dissection", "acute-coronary-syndrome", "pulmonary-embolism", "acute-pericarditis", "aortic-stenosis"],
    reviewQuestions: [],
  },
  {
    id: "cardio-015-ph", title: "Pulmonary Hypertension", course: "cardiology", tags: ["pulmonary-hypertension-cardiac"], difficulty: "medium",
    patient: { age: 52, sex: "female" },
    presentation: "I am here because of I have progressive exertional dyspnea and occasional exertional presyncope.",
    stages: [
      { id: "cardio-015-ph-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My shortness of breath is progressive and predominantly exertional.." },
          { id: "cardio-hist-038-answer", sourceId: "cardio-hist-038", label: "cardio-hist-038", content: "I have occasional exertional presyncope.." },
          { id: "cardio-hist-026-answer", sourceId: "cardio-hist-026", label: "cardio-hist-026", content: "My exercise tolerance has progressively declined." },
      ] },
      { id: "cardio-015-ph-physical", type: "physical-exam", title: "Physical Examination", hints: [
        { id: "cardio-015-ph-pe", sourceId: "cardio-pe-cardio-015-ph", label: "Physical Examination", content: "Dyspnea is progressive and predominantly exertional. She has occasional exertional presyncope. On examination, the findings are consistent with the leading diagnosis." },
      ] },
      { id: "cardio-015-ph-investigation", type: "investigation", title: "Investigations", investigations: [
          {
            id: "cardio-015-ph-inv-1",
            name: "Echocardiogram",
            category: "Echocardiography",
            findings: [{ label: "Echocardiogram", value: "Elevated estimated pulmonary artery systolic pressure with right ventricular enlargement." }],
            relevance: "high",
          },
          {
            id: "cardio-015-ph-inv-2",
            name: "Right Heart Catheterization",
            category: "Hemodynamics",
            findings: [{ label: "Right Heart Catheterization", value: "Mean pulmonary artery pressure is elevated with increased pulmonary vascular resistance." }],
            relevance: "high",
          },
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "pulmonary-hypertension-cardiac")!,
    candidateDiagnosisIds: ["pulmonary-hypertension-cardiac", "heart-failure-with-reduced-ejection-fraction", "aortic-stenosis", "mitral-regurgitation", "pulmonary-embolism"],
    reviewQuestions: [],
  },
  {
    id: "cardio-016-unstable-angina",
    title: "Unstable Angina",
    course: "cardiology",
    tags: ["unstable-angina"],
    difficulty: "easy",
    patient: { age: 71, sex: "male" },
    presentation: "I am here because of I am here because of 48-year-old man with new, worsening central chest pressure occurring at rest.",
    stages: [
      { id: "cardio-016-unstable-angina-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-013-answer", sourceId: "cardio-hist-013", label: "cardio-hist-013", content: "My pain now occurs with less exertion and sometimes at rest.." },
          { id: "cardio-hist-018-answer", sourceId: "cardio-hist-018", label: "cardio-hist-018", content: "My episodes have become more frequent and last longer.." },
          { id: "cardio-hist-022-answer", sourceId: "cardio-hist-022", label: "cardio-hist-022", content: "Rest no longer reliably relieves every episode.." }
      ] },
      { id: "cardio-016-unstable-angina-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-016-unstable-angina-pe", sourceId: "cardio-pe-cardio-016-unstable-angina", label: "Physical Examination", content: "Anxious but hemodynamically stable; no overt heart failure." }
      ] },
      { id: "cardio-016-unstable-angina-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-016-unstable-angina-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Dynamic ST-segment depression without persistent ST elevation" }],
  relevance: "high",
},
{
  id: "cardio-016-unstable-angina-inv-2",
  name: "High-sensitivity troponin",
  category: "Biomarkers",
  findings: [{ label: "High-sensitivity troponin", value: "Serial troponin remains below the assay's MI threshold" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "unstable-angina")!,
    candidateDiagnosisIds: ["unstable-angina", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-017-nstemi",
    title: "NSTEMI",
    course: "cardiology",
    tags: ["nstemi"],
    difficulty: "easy",
    patient: { age: 67, sex: "male" },
    presentation: "I am here because of I am here because of 67-year-old woman with prolonged pressure-like chest pain and diaphoresis.",
    stages: [
      { id: "cardio-017-nstemi-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-013-answer", sourceId: "cardio-hist-013", label: "cardio-hist-013", content: "My pain began with exertion and persisted after stopping.." },
          { id: "cardio-hist-023-answer", sourceId: "cardio-hist-023", label: "cardio-hist-023", content: "The episode was accompanied by sweating and nausea." },
          { id: "cardio-hist-024-answer", sourceId: "cardio-hist-024", label: "cardio-hist-024", content: "I became short of breath during the episode." }
      ] },
      { id: "cardio-017-nstemi-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-017-nstemi-pe", sourceId: "cardio-pe-cardio-017-nstemi", label: "Physical Examination", content: "Mild diaphoresis with no focal chest finding; clinically consistent with myocardial ischemia." }
      ] },
      { id: "cardio-017-nstemi-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-017-nstemi-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "ST-segment depression and T-wave inversion" }],
  relevance: "high",
},
{
  id: "cardio-017-nstemi-inv-2",
  name: "High-sensitivity troponin",
  category: "Biomarkers",
  findings: [{ label: "High-sensitivity troponin", value: "Troponin is elevated with a rise/fall pattern" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "nstemi")!,
    candidateDiagnosisIds: ["nstemi", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-018-stemi",
    title: "STEMI",
    course: "cardiology",
    tags: ["stemi"],
    difficulty: "easy",
    patient: { age: 63, sex: "male" },
    presentation: "I am here because of I am here because of 59-year-old man with sudden severe substernal pressure radiating to the left arm.",
    stages: [
      { id: "cardio-018-stemi-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-010-answer", sourceId: "cardio-hist-010", label: "cardio-hist-010", content: "My pain started suddenly.." },
          { id: "cardio-hist-015-answer", sourceId: "cardio-hist-015", label: "cardio-hist-015", content: "It feels like heavy pressure and squeezing." },
          { id: "cardio-hist-017-answer", sourceId: "cardio-hist-017", label: "cardio-hist-017", content: "My pain radiates to the left arm.." }
      ] },
      { id: "cardio-018-stemi-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-018-stemi-pe", sourceId: "cardio-pe-cardio-018-stemi", label: "Physical Examination", content: "Cool, clammy skin with signs of acute distress." }
      ] },
      { id: "cardio-018-stemi-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-018-stemi-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Persistent ST-segment elevation in an anatomically contiguous territory" }],
  relevance: "high",
},
{
  id: "cardio-018-stemi-inv-2",
  name: "Troponin",
  category: "Biomarkers",
  findings: [{ label: "Troponin", value: "Markedly elevated cardiac troponin" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "stemi")!,
    candidateDiagnosisIds: ["stemi", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-019-coronary-vasospasm",
    title: "Coronary Vasospasm",
    course: "cardiology",
    tags: ["coronary-vasospasm"],
    difficulty: "medium",
    patient: { age: 70, sex: "female" },
    presentation: "I am here because of I am here because of 42-year-old man with recurrent nocturnal chest pain at rest.",
    stages: [
      { id: "cardio-019-coronary-vasospasm-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-014-answer", sourceId: "cardio-hist-014", label: "cardio-hist-014", content: "My episodes occur predominantly at rest, often during the night.." },
          { id: "cardio-hist-018-answer", sourceId: "cardio-hist-018", label: "cardio-hist-018", content: "Each episode lasts several minutes and resolves spontaneously." },
          { id: "cardio-hist-065-answer", sourceId: "cardio-hist-065", label: "cardio-hist-065", content: "I reports frequent alcohol use around some episodes." }
      ] },
      { id: "cardio-019-coronary-vasospasm-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-019-coronary-vasospasm-pe", sourceId: "cardio-pe-cardio-019-coronary-vasospasm", label: "Physical Examination", content: "Examination is normal between episodes." }
      ] },
      { id: "cardio-019-coronary-vasospasm-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-019-coronary-vasospasm-inv-1",
  name: "ECG during pain",
  category: "ECG",
  findings: [{ label: "ECG during pain", value: "Transient ST-segment elevation that resolves when pain stops" }],
  relevance: "high",
},
{
  id: "cardio-019-coronary-vasospasm-inv-2",
  name: "Coronary angiography",
  category: "Coronary Imaging",
  findings: [{ label: "Coronary angiography", value: "No fixed obstructive lesion; transient spasm is provoked during testing" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "coronary-vasospasm")!,
    candidateDiagnosisIds: ["coronary-vasospasm", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-020-spontaneous-coronary-artery-dissection",
    title: "Spontaneous Coronary Artery Dissection (SCAD)",
    course: "cardiology",
    tags: ["spontaneous-coronary-artery-dissection"],
    difficulty: "medium",
    patient: { age: 58, sex: "female" },
    presentation: "I am here because of I am here because of 38-year-old woman with acute chest pain several days after major physiologic stress.",
    stages: [
      { id: "cardio-020-spontaneous-coronary-artery-dissection-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-010-answer", sourceId: "cardio-hist-010", label: "cardio-hist-010", content: "My pain began abruptly.." },
          { id: "cardio-hist-015-answer", sourceId: "cardio-hist-015", label: "cardio-hist-015", content: "The discomfort is pressure-like." },
          { id: "cardio-hist-083-answer", sourceId: "cardio-hist-083", label: "cardio-hist-083", content: "No known atherosclerotic risk factors; I has no autoimmune history." }
      ] },
      { id: "cardio-020-spontaneous-coronary-artery-dissection-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-020-spontaneous-coronary-artery-dissection-pe", sourceId: "cardio-pe-cardio-020-spontaneous-coronary-artery-dissection", label: "Physical Examination", content: "Stable examination without signs of chronic cardiovascular disease." }
      ] },
      { id: "cardio-020-spontaneous-coronary-artery-dissection-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-020-spontaneous-coronary-artery-dissection-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Acute ischemic ST-T changes" }],
  relevance: "high",
},
{
  id: "cardio-020-spontaneous-coronary-artery-dissection-inv-2",
  name: "Coronary angiography",
  category: "Coronary Imaging",
  findings: [{ label: "Coronary angiography", value: "Long smooth coronary narrowing consistent with coronary dissection" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "spontaneous-coronary-artery-dissection")!,
    candidateDiagnosisIds: ["spontaneous-coronary-artery-dissection", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-021-coronary-microvascular-dysfunction",
    title: "Coronary Microvascular Dysfunction",
    course: "cardiology",
    tags: ["coronary-microvascular-dysfunction"],
    difficulty: "hard",
    patient: { age: 61, sex: "male" },
    presentation: "I am here because of I am here because of 52-year-old woman with recurrent exertional chest discomfort despite non-obstructive coronary arteries.",
    stages: [
      { id: "cardio-021-coronary-microvascular-dysfunction-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-013-answer", sourceId: "cardio-hist-013", label: "cardio-hist-013", content: "My symptoms are provoked by exertion.." },
          { id: "cardio-hist-018-answer", sourceId: "cardio-hist-018", label: "cardio-hist-018", content: "My episodes recur over months.." },
          { id: "cardio-hist-071-answer", sourceId: "cardio-hist-071", label: "cardio-hist-071", content: "My family has a history of premature coronary disease.." }
      ] },
      { id: "cardio-021-coronary-microvascular-dysfunction-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-021-coronary-microvascular-dysfunction-pe", sourceId: "cardio-pe-cardio-021-coronary-microvascular-dysfunction", label: "Physical Examination", content: "No specific murmur or heart-failure signs." }
      ] },
      { id: "cardio-021-coronary-microvascular-dysfunction-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-021-coronary-microvascular-dysfunction-inv-1",
  name: "Coronary CT angiography",
  category: "Coronary Imaging",
  findings: [{ label: "Coronary CT angiography", value: "No obstructive epicardial coronary disease" }],
  relevance: "high",
},
{
  id: "cardio-021-coronary-microvascular-dysfunction-inv-2",
  name: "Stress perfusion testing",
  category: "Functional Testing",
  findings: [{ label: "Stress perfusion testing", value: "Reversible myocardial perfusion abnormality despite non-obstructive coronaries" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "coronary-microvascular-dysfunction")!,
    candidateDiagnosisIds: ["coronary-microvascular-dysfunction", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-022-hfpef",
    title: "Heart Failure with Preserved Ejection Fraction (HFpEF)",
    course: "cardiology",
    tags: ["hfpef"],
    difficulty: "easy",
    patient: { age: 50, sex: "female" },
    presentation: "I am here because of I am here because of 71-year-old woman with progressive exertional dyspnea and long-standing hypertension.",
    stages: [
      { id: "cardio-022-hfpef-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My shortness of breath is mainly exertional.." },
          { id: "cardio-hist-027-answer", sourceId: "cardio-hist-027", label: "cardio-hist-027", content: "I am more short of breath when lying flat.." },
          { id: "cardio-hist-046-answer", sourceId: "cardio-hist-046", label: "cardio-hist-046", content: "I have long-standing hypertension.." }
      ] },
      { id: "cardio-022-hfpef-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-022-hfpef-pe", sourceId: "cardio-pe-cardio-022-hfpef", label: "Physical Examination", content: "Elevated blood pressure with bibasal crackles and mild edema." }
      ] },
      { id: "cardio-022-hfpef-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-022-hfpef-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Preserved LVEF with left ventricular hypertrophy and impaired diastolic filling" }],
  relevance: "high",
},
{
  id: "cardio-022-hfpef-inv-2",
  name: "BNP/NT-proBNP",
  category: "Blood Tests",
  findings: [{ label: "BNP/NT-proBNP", value: "Elevated natriuretic peptide level" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "hfpef")!,
    candidateDiagnosisIds: ["hfpef", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-023-acute-decompensated-heart-failure",
    title: "Acute Decompensated Heart Failure",
    course: "cardiology",
    tags: ["acute-decompensated-heart-failure"],
    difficulty: "medium",
    patient: { age: 44, sex: "female" },
    presentation: "I am here because of I am here because of 76-year-old man with rapidly worsening dyspnea and orthopnea.",
    stages: [
      { id: "cardio-023-acute-decompensated-heart-failure-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My shortness of breath worsened rapidly over the last two days.." },
          { id: "cardio-hist-028-answer", sourceId: "cardio-hist-028", label: "cardio-hist-028", content: "I now needs several pillows to sleep." },
          { id: "cardio-hist-030-answer", sourceId: "cardio-hist-030", label: "cardio-hist-030", content: "I have gained weight rapidly with increasing leg swelling.." }
      ] },
      { id: "cardio-023-acute-decompensated-heart-failure-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-023-acute-decompensated-heart-failure-pe", sourceId: "cardio-pe-cardio-023-acute-decompensated-heart-failure", label: "Physical Examination", content: "Tachypneic with pulmonary crackles and bilateral pitting edema." }
      ] },
      { id: "cardio-023-acute-decompensated-heart-failure-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-023-acute-decompensated-heart-failure-inv-1",
  name: "Chest X-ray",
  category: "Chest Imaging",
  findings: [{ label: "Chest X-ray", value: "Pulmonary vascular congestion with interstitial edema" }],
  relevance: "high",
},
{
  id: "cardio-023-acute-decompensated-heart-failure-inv-2",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Reduced LVEF with elevated filling pressures" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "acute-decompensated-heart-failure")!,
    candidateDiagnosisIds: ["acute-decompensated-heart-failure", "acute-coronary-syndrome", "stable-angina", "atrial-fibrillation", "ventricular-tachycardia"],
    reviewQuestions: [],
  },
  {
    id: "cardio-024-right-sided-heart-failure",
    title: "Right-Sided Heart Failure",
    course: "cardiology",
    tags: ["right-sided-heart-failure"],
    difficulty: "medium",
    patient: { age: 45, sex: "male" },
    presentation: "I am here because of I am here because of 64-year-old man with progressive peripheral edema, abdominal distension, and fatigue.",
    stages: [
      { id: "cardio-024-right-sided-heart-failure-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-034-answer", sourceId: "cardio-hist-034", label: "cardio-hist-034", content: "Palpitations are not the main symptom." },
          { id: "cardio-hist-036-answer", sourceId: "cardio-hist-036", label: "cardio-hist-036", content: "I have mild exertional breathlessness.." },
          { id: "cardio-hist-030-answer", sourceId: "cardio-hist-030", label: "cardio-hist-030", content: "I reports increasing abdominal fullness and leg swelling." }
      ] },
      { id: "cardio-024-right-sided-heart-failure-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-024-right-sided-heart-failure-pe", sourceId: "cardio-pe-cardio-024-right-sided-heart-failure", label: "Physical Examination", content: "Raised JVP, peripheral edema, hepatomegaly, and a right-sided congestion pattern." }
      ] },
      { id: "cardio-024-right-sided-heart-failure-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-024-right-sided-heart-failure-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Right ventricular dilation with reduced right-sided function" }],
  relevance: "high",
},
{
  id: "cardio-024-right-sided-heart-failure-inv-2",
  name: "Liver function tests",
  category: "Blood Tests",
  findings: [{ label: "Liver function tests", value: "Mild congestive hepatopathy pattern" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "right-sided-heart-failure")!,
    candidateDiagnosisIds: ["right-sided-heart-failure", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-025-cardiogenic-shock",
    title: "Cardiogenic Shock",
    course: "cardiology",
    tags: ["cardiogenic-shock"],
    difficulty: "hard",
    patient: { age: 47, sex: "male" },
    presentation: "I am here because of I am here because of 68-year-old patient with severe chest pain followed by hypotension and altered mentation.",
    stages: [
      { id: "cardio-025-cardiogenic-shock-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-013-answer", sourceId: "cardio-hist-013", label: "cardio-hist-013", content: "Severe chest pain began abruptly." },
          { id: "cardio-hist-023-answer", sourceId: "cardio-hist-023", label: "cardio-hist-023", content: "The episode was associated with diaphoresis and nausea." },
          { id: "cardio-hist-024-answer", sourceId: "cardio-hist-024", label: "cardio-hist-024", content: "Severe dyspnea developed with the pain." }
      ] },
      { id: "cardio-025-cardiogenic-shock-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-025-cardiogenic-shock-pe", sourceId: "cardio-pe-cardio-025-cardiogenic-shock", label: "Physical Examination", content: "Cold extremities, weak pulses, hypotension, and pulmonary congestion." }
      ] },
      { id: "cardio-025-cardiogenic-shock-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-025-cardiogenic-shock-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Acute extensive ischemic changes" }],
  relevance: "high",
},
{
  id: "cardio-025-cardiogenic-shock-inv-2",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Severely reduced LV systolic function with regional wall-motion abnormality" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "cardiogenic-shock")!,
    candidateDiagnosisIds: ["cardiogenic-shock", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-026-atrial-flutter",
    title: "Atrial Flutter",
    course: "cardiology",
    tags: ["atrial-flutter"],
    difficulty: "easy",
    patient: { age: 61, sex: "male" },
    presentation: "I am here because of I am here because of 63-year-old man with episodic rapid heartbeat and exertional fatigue.",
    stages: [
      { id: "cardio-026-atrial-flutter-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-004-answer", sourceId: "cardio-hist-004", label: "cardio-hist-004", content: "I feels a rapid fluttering heartbeat." },
          { id: "cardio-hist-033-answer", sourceId: "cardio-hist-033", label: "cardio-hist-033", content: "The rhythm feels regular." },
          { id: "cardio-hist-032-answer", sourceId: "cardio-hist-032", label: "cardio-hist-032", content: "My episodes can begin suddenly.." }
      ] },
      { id: "cardio-026-atrial-flutter-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-026-atrial-flutter-pe", sourceId: "cardio-pe-cardio-026-atrial-flutter", label: "Physical Examination", content: "Regular tachycardia with otherwise stable cardiovascular examination." }
      ] },
      { id: "cardio-026-atrial-flutter-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-026-atrial-flutter-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Atrial flutter pattern with saw-tooth flutter waves and fixed AV conduction" }],
  relevance: "high",
},
{
  id: "cardio-026-atrial-flutter-inv-2",
  name: "Electrolytes",
  category: "Blood Tests",
  findings: [{ label: "Electrolytes", value: "No major electrolyte trigger identified" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "atrial-flutter")!,
    candidateDiagnosisIds: ["atrial-flutter", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-027-avnrt",
    title: "AVNRT",
    course: "cardiology",
    tags: ["avnrt"],
    difficulty: "medium",
    patient: { age: 64, sex: "female" },
    presentation: "I am here because of I am here because of 29-year-old woman with recurrent abrupt-onset, abrupt-offset palpitations.",
    stages: [
      { id: "cardio-027-avnrt-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-032-answer", sourceId: "cardio-hist-032", label: "cardio-hist-032", content: "My episodes start and stop suddenly.." },
          { id: "cardio-hist-033-answer", sourceId: "cardio-hist-033", label: "cardio-hist-033", content: "My heartbeat feels very rapid and regular.." },
          { id: "cardio-hist-035-answer", sourceId: "cardio-hist-035", label: "cardio-hist-035", content: "Caffeine sometimes triggers the episodes." }
      ] },
      { id: "cardio-027-avnrt-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-027-avnrt-pe", sourceId: "cardio-pe-cardio-027-avnrt", label: "Physical Examination", content: "Regular narrow-complex tachycardia during the episode; normal examination between events." }
      ] },
      { id: "cardio-027-avnrt-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-027-avnrt-inv-1",
  name: "ECG during episode",
  category: "ECG",
  findings: [{ label: "ECG during episode", value: "Regular narrow-complex tachycardia" }],
  relevance: "high",
},
{
  id: "cardio-027-avnrt-inv-2",
  name: "Event monitor",
  category: "Rhythm Monitoring",
  findings: [{ label: "Event monitor", value: "Paroxysmal regular narrow-complex tachycardia" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "avnrt")!,
    candidateDiagnosisIds: ["avnrt", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-028-avrt-wpw",
    title: "AVRT / WPW Syndrome",
    course: "cardiology",
    tags: ["avrt-wpw"],
    difficulty: "medium",
    patient: { age: 59, sex: "male" },
    presentation: "I am here because of I am here because of 22-year-old man with sudden rapid palpitations and presyncope.",
    stages: [
      { id: "cardio-028-avrt-wpw-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-032-answer", sourceId: "cardio-hist-032", label: "cardio-hist-032", content: "The rapid heartbeat starts and stops abruptly." },
          { id: "cardio-hist-037-answer", sourceId: "cardio-hist-037", label: "cardio-hist-037", content: "I becomes lightheaded during episodes." },
          { id: "cardio-hist-072-answer", sourceId: "cardio-hist-072", label: "cardio-hist-072", content: "A relative had an unexplained sudden death at a young age." }
      ] },
      { id: "cardio-028-avrt-wpw-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-028-avrt-wpw-pe", sourceId: "cardio-pe-cardio-028-avrt-wpw", label: "Physical Examination", content: "Stable between episodes; no persistent signs of heart failure." }
      ] },
      { id: "cardio-028-avrt-wpw-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-028-avrt-wpw-inv-1",
  name: "12-lead ECG",
  category: "ECG",
  findings: [{ label: "12-lead ECG", value: "Short PR interval with delta wave consistent with pre-excitation" }],
  relevance: "high",
},
{
  id: "cardio-028-avrt-wpw-inv-2",
  name: "Electrophysiology study",
  category: "Electrophysiology",
  findings: [{ label: "Electrophysiology study", value: "Accessory pathway conduction demonstrated" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "avrt-wpw")!,
    candidateDiagnosisIds: ["avrt-wpw", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-029-multifocal-atrial-tachycardia",
    title: "Multifocal Atrial Tachycardia",
    course: "cardiology",
    tags: ["multifocal-atrial-tachycardia"],
    difficulty: "hard",
    patient: { age: 59, sex: "male" },
    presentation: "I am here because of I am here because of 72-year-old man with severe chronic lung disease and irregular tachycardia.",
    stages: [
      { id: "cardio-029-multifocal-atrial-tachycardia-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-003-answer", sourceId: "cardio-hist-003", label: "cardio-hist-003", content: "I am chronically short of breath.." },
          { id: "cardio-hist-033-answer", sourceId: "cardio-hist-033", label: "cardio-hist-033", content: "My heartbeat feels irregular.." },
          { id: "cardio-hist-065-answer", sourceId: "cardio-hist-065", label: "cardio-hist-065", content: "I have a long history of smoking.." }
      ] },
      { id: "cardio-029-multifocal-atrial-tachycardia-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-029-multifocal-atrial-tachycardia-pe", sourceId: "cardio-pe-cardio-029-multifocal-atrial-tachycardia", label: "Physical Examination", content: "Irregular tachycardia with an underlying chronic respiratory disease phenotype." }
      ] },
      { id: "cardio-029-multifocal-atrial-tachycardia-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-029-multifocal-atrial-tachycardia-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Irregular atrial tachycardia with at least three P-wave morphologies" }],
  relevance: "high",
},
{
  id: "cardio-029-multifocal-atrial-tachycardia-inv-2",
  name: "ABG",
  category: "Blood Tests",
  findings: [{ label: "ABG", value: "Hypoxemia with hypercapnia during the acute episode" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "multifocal-atrial-tachycardia")!,
    candidateDiagnosisIds: ["multifocal-atrial-tachycardia", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-030-ventricular-fibrillation",
    title: "Ventricular Fibrillation",
    course: "cardiology",
    tags: ["ventricular-fibrillation"],
    difficulty: "hard",
    patient: { age: 59, sex: "male" },
    presentation: "I am here because of I am here because of 60-year-old patient collapses suddenly and is found pulseless.",
    stages: [
      { id: "cardio-030-ventricular-fibrillation-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-004-answer", sourceId: "cardio-hist-004", label: "cardio-hist-004", content: "I had no reliable warning before I collapsed." },
          { id: "cardio-hist-041-answer", sourceId: "cardio-hist-041", label: "cardio-hist-041", content: "I have a previous myocardial infarction.." },
          { id: "cardio-hist-166-answer", sourceId: "cardio-hist-166", label: "cardio-hist-166", content: "Family history is not available before the arrest." }
      ] },
      { id: "cardio-030-ventricular-fibrillation-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-030-ventricular-fibrillation-pe", sourceId: "cardio-pe-cardio-030-ventricular-fibrillation", label: "Physical Examination", content: "Unresponsive, apneic, pulseless; immediate resuscitation is required." }
      ] },
      { id: "cardio-030-ventricular-fibrillation-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-030-ventricular-fibrillation-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Chaotic ventricular electrical activity without organized QRS complexes" }],
  relevance: "high",
},
{
  id: "cardio-030-ventricular-fibrillation-inv-2",
  name: "Electrolytes",
  category: "Blood Tests",
  findings: [{ label: "Electrolytes", value: "Potassium and magnesium are checked for reversible triggers" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "ventricular-fibrillation")!,
    candidateDiagnosisIds: ["ventricular-fibrillation", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-031-sinus-node-dysfunction",
    title: "Sinus Node Dysfunction",
    course: "cardiology",
    tags: ["sinus-node-dysfunction"],
    difficulty: "medium",
    patient: { age: 59, sex: "male" },
    presentation: "I am here because of I am here because of 70-year-old woman with intermittent dizziness and near-syncope.",
    stages: [
      { id: "cardio-031-sinus-node-dysfunction-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-005-answer", sourceId: "cardio-hist-005", label: "cardio-hist-005", content: "I have recurrent presyncope.." },
          { id: "cardio-hist-012-answer", sourceId: "cardio-hist-012", label: "cardio-hist-012", content: "My episodes have become more frequent.." },
          { id: "cardio-hist-061-answer", sourceId: "cardio-hist-061", label: "cardio-hist-061", content: "I have not recently changed my medications.." }
      ] },
      { id: "cardio-031-sinus-node-dysfunction-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-031-sinus-node-dysfunction-pe", sourceId: "cardio-pe-cardio-031-sinus-node-dysfunction", label: "Physical Examination", content: "Bradycardia with intermittent pauses on examination/monitoring." }
      ] },
      { id: "cardio-031-sinus-node-dysfunction-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-031-sinus-node-dysfunction-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Sinus bradycardia with intermittent sinus pauses" }],
  relevance: "high",
},
{
  id: "cardio-031-sinus-node-dysfunction-inv-2",
  name: "Holter monitor",
  category: "Rhythm Monitoring",
  findings: [{ label: "Holter monitor", value: "Sinus pauses correlating with symptoms" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "sinus-node-dysfunction")!,
    candidateDiagnosisIds: ["sinus-node-dysfunction", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-032-first-degree-av-block",
    title: "First-Degree AV Block",
    course: "cardiology",
    tags: ["first-degree-av-block"],
    difficulty: "medium",
    patient: { age: 52, sex: "female" },
    presentation: "I am here because of I am here because of 58-year-old man with incidental bradycardia but no syncope.",
    stages: [
      { id: "cardio-032-first-degree-av-block-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-005-answer", sourceId: "cardio-hist-005", label: "cardio-hist-005", content: "I have never fainted.." },
          { id: "cardio-hist-043-answer", sourceId: "cardio-hist-043", label: "cardio-hist-043", content: "No known heart failure." },
          { id: "cardio-hist-057-answer", sourceId: "cardio-hist-057", label: "cardio-hist-057", content: "I takes a rate-limiting medication." }
      ] },
      { id: "cardio-032-first-degree-av-block-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-032-first-degree-av-block-pe", sourceId: "cardio-pe-cardio-032-first-degree-av-block", label: "Physical Examination", content: "Mild asymptomatic bradycardia with no congestion." }
      ] },
      { id: "cardio-032-first-degree-av-block-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-032-first-degree-av-block-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Prolonged PR interval with every P wave conducted" }],
  relevance: "high",
},
{
  id: "cardio-032-first-degree-av-block-inv-2",
  name: "Electrolytes",
  category: "Blood Tests",
  findings: [{ label: "Electrolytes", value: "No major metabolic trigger identified" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "first-degree-av-block")!,
    candidateDiagnosisIds: ["first-degree-av-block", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-033-mobitz-i-av-block",
    title: "Mobitz I AV Block",
    course: "cardiology",
    tags: ["mobitz-i-av-block"],
    difficulty: "medium",
    patient: { age: 59, sex: "male" },
    presentation: "I am here because of I am here because of 66-year-old man with episodic dizziness during a period of acute illness.",
    stages: [
      { id: "cardio-033-mobitz-i-av-block-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-005-answer", sourceId: "cardio-hist-005", label: "cardio-hist-005", content: "I have brief episodes of lightheadedness.." },
          { id: "cardio-hist-078-answer", sourceId: "cardio-hist-078", label: "cardio-hist-078", content: "I recently had a viral illness.." },
          { id: "cardio-hist-061-answer", sourceId: "cardio-hist-061", label: "cardio-hist-061", content: "My medications were reviewed for rate-slowing agents." }
      ] },
      { id: "cardio-033-mobitz-i-av-block-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-033-mobitz-i-av-block-pe", sourceId: "cardio-pe-cardio-033-mobitz-i-av-block", label: "Physical Examination", content: "Intermittent bradycardia without persistent hemodynamic instability." }
      ] },
      { id: "cardio-033-mobitz-i-av-block-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-033-mobitz-i-av-block-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Progressive PR prolongation followed by a dropped QRS complex" }],
  relevance: "high",
},
{
  id: "cardio-033-mobitz-i-av-block-inv-2",
  name: "Telemetry",
  category: "Rhythm Monitoring",
  findings: [{ label: "Telemetry", value: "Intermittent Wenckebach pattern" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "mobitz-i-av-block")!,
    candidateDiagnosisIds: ["mobitz-i-av-block", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-034-mobitz-ii-av-block",
    title: "Mobitz II AV Block",
    course: "cardiology",
    tags: ["mobitz-ii-av-block"],
    difficulty: "hard",
    patient: { age: 63, sex: "male" },
    presentation: "I am here because of I am here because of 74-year-old patient with recurrent presyncope and marked bradycardia.",
    stages: [
      { id: "cardio-034-mobitz-ii-av-block-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-005-answer", sourceId: "cardio-hist-005", label: "cardio-hist-005", content: "I have recurrent presyncope.." },
          { id: "cardio-hist-038-answer", sourceId: "cardio-hist-038", label: "cardio-hist-038", content: "One episode occurred with exertion." },
          { id: "cardio-hist-043-answer", sourceId: "cardio-hist-043", label: "cardio-hist-043", content: "I have structural heart disease.." }
      ] },
      { id: "cardio-034-mobitz-ii-av-block-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-034-mobitz-ii-av-block-pe", sourceId: "cardio-pe-cardio-034-mobitz-ii-av-block", label: "Physical Examination", content: "Marked bradycardia with intermittent cannon-like pulse changes." }
      ] },
      { id: "cardio-034-mobitz-ii-av-block-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-034-mobitz-ii-av-block-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Constant PR intervals with intermittent dropped QRS complexes" }],
  relevance: "high",
},
{
  id: "cardio-034-mobitz-ii-av-block-inv-2",
  name: "Telemetry",
  category: "Rhythm Monitoring",
  findings: [{ label: "Telemetry", value: "High-grade second-degree AV block" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "mobitz-ii-av-block")!,
    candidateDiagnosisIds: ["mobitz-ii-av-block", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-035-complete-heart-block",
    title: "Complete Heart Block",
    course: "cardiology",
    tags: ["complete-heart-block"],
    difficulty: "hard",
    patient: { age: 52, sex: "female" },
    presentation: "I am here because of I am here because of 79-year-old man with syncope and profound bradycardia.",
    stages: [
      { id: "cardio-035-complete-heart-block-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-005-answer", sourceId: "cardio-hist-005", label: "cardio-hist-005", content: "I had an episode of abrupt syncope.." },
          { id: "cardio-hist-038-answer", sourceId: "cardio-hist-038", label: "cardio-hist-038", content: "The event occurred while walking." },
          { id: "cardio-hist-041-answer", sourceId: "cardio-hist-041", label: "cardio-hist-041", content: "I have prior ischemic heart disease.." }
      ] },
      { id: "cardio-035-complete-heart-block-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-035-complete-heart-block-pe", sourceId: "cardio-pe-cardio-035-complete-heart-block", label: "Physical Examination", content: "Severe bradycardia with atrioventricular dissociation and signs of low cardiac output." }
      ] },
      { id: "cardio-035-complete-heart-block-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-035-complete-heart-block-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Complete AV dissociation with independent atrial and ventricular rates" }],
  relevance: "high",
},
{
  id: "cardio-035-complete-heart-block-inv-2",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Underlying structural heart disease without a reversible mechanical cause" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "complete-heart-block")!,
    candidateDiagnosisIds: ["complete-heart-block", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-036-aortic-regurgitation",
    title: "Aortic Regurgitation",
    course: "cardiology",
    tags: ["aortic-regurgitation"],
    difficulty: "medium",
    patient: { age: 66, sex: "female" },
    presentation: "I am here because of I am here because of 54-year-old man with exertional dyspnea and awareness of forceful heartbeats.",
    stages: [
      { id: "cardio-036-aortic-regurgitation-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My shortness of breath occurs with exertion.." },
          { id: "cardio-hist-004-answer", sourceId: "cardio-hist-004", label: "cardio-hist-004", content: "I notices strong pounding heartbeats." },
          { id: "cardio-hist-131-answer", sourceId: "cardio-hist-131", label: "cardio-hist-131", content: "I have no abrupt chest pain.." }
      ] },
      { id: "cardio-036-aortic-regurgitation-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-036-aortic-regurgitation-pe", sourceId: "cardio-pe-cardio-036-aortic-regurgitation", label: "Physical Examination", content: "Wide pulse pressure and a high-pitched early diastolic murmur along the left sternal border." }
      ] },
      { id: "cardio-036-aortic-regurgitation-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-036-aortic-regurgitation-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Severe aortic regurgitation with LV dilation" }],
  relevance: "high",
},
{
  id: "cardio-036-aortic-regurgitation-inv-2",
  name: "Chest X-ray",
  category: "Chest Imaging",
  findings: [{ label: "Chest X-ray", value: "Cardiomegaly consistent with chronic volume overload" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "aortic-regurgitation")!,
    candidateDiagnosisIds: ["aortic-regurgitation", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-037-mitral-stenosis",
    title: "Mitral Stenosis",
    course: "cardiology",
    tags: ["mitral-stenosis"],
    difficulty: "medium",
    patient: { age: 64, sex: "female" },
    presentation: "I am here because of I am here because of 46-year-old woman with progressive exertional dyspnea and palpitations.",
    stages: [
      { id: "cardio-037-mitral-stenosis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "Exertional dyspnea has progressed gradually." },
          { id: "cardio-hist-034-answer", sourceId: "cardio-hist-034", label: "cardio-hist-034", content: "Palpitations occur intermittently." },
          { id: "cardio-hist-082-answer", sourceId: "cardio-hist-082", label: "cardio-hist-082", content: "I reports previous rheumatic fever." }
      ] },
      { id: "cardio-037-mitral-stenosis-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-037-mitral-stenosis-pe", sourceId: "cardio-pe-cardio-037-mitral-stenosis", label: "Physical Examination", content: "Low-pitched diastolic rumble at the apex with an opening snap." }
      ] },
      { id: "cardio-037-mitral-stenosis-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-037-mitral-stenosis-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Mitral valve stenosis with left atrial enlargement" }],
  relevance: "high",
},
{
  id: "cardio-037-mitral-stenosis-inv-2",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Left atrial enlargement with possible atrial fibrillation" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "mitral-stenosis")!,
    candidateDiagnosisIds: ["mitral-stenosis", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-038-mitral-valve-prolapse",
    title: "Mitral Valve Prolapse",
    course: "cardiology",
    tags: ["mitral-valve-prolapse"],
    difficulty: "medium",
    patient: { age: 53, sex: "male" },
    presentation: "I am here because of I am here because of 31-year-old woman with intermittent palpitations and atypical chest discomfort.",
    stages: [
      { id: "cardio-038-mitral-valve-prolapse-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-004-answer", sourceId: "cardio-hist-004", label: "cardio-hist-004", content: "I feels intermittent palpitations." },
          { id: "cardio-hist-015-answer", sourceId: "cardio-hist-015", label: "cardio-hist-015", content: "The chest discomfort is not pressure-like." },
          { id: "cardio-hist-035-answer", sourceId: "cardio-hist-035", label: "cardio-hist-035", content: "Stress can trigger the palpitations." }
      ] },
      { id: "cardio-038-mitral-valve-prolapse-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-038-mitral-valve-prolapse-pe", sourceId: "cardio-pe-cardio-038-mitral-valve-prolapse", label: "Physical Examination", content: "Mid-systolic click with a late systolic murmur at the apex." }
      ] },
      { id: "cardio-038-mitral-valve-prolapse-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-038-mitral-valve-prolapse-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Mitral leaflet prolapse with variable late systolic regurgitation" }],
  relevance: "high",
},
{
  id: "cardio-038-mitral-valve-prolapse-inv-2",
  name: "Holter monitor",
  category: "Rhythm Monitoring",
  findings: [{ label: "Holter monitor", value: "Occasional supraventricular ectopy" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "mitral-valve-prolapse")!,
    candidateDiagnosisIds: ["mitral-valve-prolapse", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-039-tricuspid-regurgitation",
    title: "Tricuspid Regurgitation",
    course: "cardiology",
    tags: ["tricuspid-regurgitation"],
    difficulty: "medium",
    patient: { age: 60, sex: "female" },
    presentation: "I am here because of I am here because of 61-year-old woman with edema and abdominal fullness.",
    stages: [
      { id: "cardio-039-tricuspid-regurgitation-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-034-answer", sourceId: "cardio-hist-034", label: "cardio-hist-034", content: "I have increasing peripheral edema.." },
          { id: "cardio-hist-036-answer", sourceId: "cardio-hist-036", label: "cardio-hist-036", content: "I reports abdominal distension." },
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My shortness of breath is mild compared with the systemic congestion.." }
      ] },
      { id: "cardio-039-tricuspid-regurgitation-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-039-tricuspid-regurgitation-pe", sourceId: "cardio-pe-cardio-039-tricuspid-regurgitation", label: "Physical Examination", content: "Raised JVP with a holosystolic murmur that increases with inspiration and peripheral edema." }
      ] },
      { id: "cardio-039-tricuspid-regurgitation-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-039-tricuspid-regurgitation-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Severe tricuspid regurgitation with right atrial and ventricular enlargement" }],
  relevance: "high",
},
{
  id: "cardio-039-tricuspid-regurgitation-inv-2",
  name: "Liver function tests",
  category: "Blood Tests",
  findings: [{ label: "Liver function tests", value: "Congestive hepatopathy pattern" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "tricuspid-regurgitation")!,
    candidateDiagnosisIds: ["tricuspid-regurgitation", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-040-tricuspid-stenosis",
    title: "Tricuspid Stenosis",
    course: "cardiology",
    tags: ["tricuspid-stenosis"],
    difficulty: "hard",
    patient: { age: 46, sex: "female" },
    presentation: "I am here because of I am here because of 39-year-old woman with fatigue and systemic venous congestion.",
    stages: [
      { id: "cardio-040-tricuspid-stenosis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-036-answer", sourceId: "cardio-hist-036", label: "cardio-hist-036", content: "I have progressive abdominal fullness and leg swelling.." },
          { id: "cardio-hist-082-answer", sourceId: "cardio-hist-082", label: "cardio-hist-082", content: "I had rheumatic fever in adolescence.." },
          { id: "cardio-hist-012-answer", sourceId: "cardio-hist-012", label: "cardio-hist-012", content: "My symptoms have slowly worsened.." }
      ] },
      { id: "cardio-040-tricuspid-stenosis-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-040-tricuspid-stenosis-pe", sourceId: "cardio-pe-cardio-040-tricuspid-stenosis", label: "Physical Examination", content: "Prominent JVP with a diastolic murmur at the lower left sternal border." }
      ] },
      { id: "cardio-040-tricuspid-stenosis-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-040-tricuspid-stenosis-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Restricted tricuspid valve opening with a transmitral/tricuspid inflow gradient" }],
  relevance: "high",
},
{
  id: "cardio-040-tricuspid-stenosis-inv-2",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Right atrial enlargement" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "tricuspid-stenosis")!,
    candidateDiagnosisIds: ["tricuspid-stenosis", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-041-pulmonary-valve-stenosis",
    title: "Pulmonary Valve Stenosis",
    course: "cardiology",
    tags: ["pulmonary-valve-stenosis"],
    difficulty: "hard",
    patient: { age: 68, sex: "female" },
    presentation: "I am here because of I am here because of 18-year-old with exertional dyspnea and an established congenital murmur.",
    stages: [
      { id: "cardio-041-pulmonary-valve-stenosis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-103-answer", sourceId: "cardio-hist-103", label: "cardio-hist-103", content: "I was told I had a heart murmur in childhood.." },
          { id: "cardio-hist-105-answer", sourceId: "cardio-hist-105", label: "cardio-hist-105", content: "I had mild exercise limitation growing up.." },
          { id: "cardio-hist-086-answer", sourceId: "cardio-hist-086", label: "cardio-hist-086", content: "A congenital heart lesion was mentioned in childhood." }
      ] },
      { id: "cardio-041-pulmonary-valve-stenosis-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-041-pulmonary-valve-stenosis-pe", sourceId: "cardio-pe-cardio-041-pulmonary-valve-stenosis", label: "Physical Examination", content: "Harsh systolic ejection murmur at the upper left sternal border with an ejection click." }
      ] },
      { id: "cardio-041-pulmonary-valve-stenosis-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-041-pulmonary-valve-stenosis-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Doming pulmonary valve with elevated right ventricular outflow gradient" }],
  relevance: "high",
},
{
  id: "cardio-041-pulmonary-valve-stenosis-inv-2",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Right ventricular hypertrophy" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "pulmonary-valve-stenosis")!,
    candidateDiagnosisIds: ["pulmonary-valve-stenosis", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-042-restrictive-cardiomyopathy",
    title: "Restrictive Cardiomyopathy",
    course: "cardiology",
    tags: ["restrictive-cardiomyopathy"],
    difficulty: "hard",
    patient: { age: 48, sex: "female" },
    presentation: "I am here because of I am here because of 68-year-old man with progressive right-sided congestion and exercise intolerance.",
    stages: [
      { id: "cardio-042-restrictive-cardiomyopathy-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "Exertional dyspnea is progressive." },
          { id: "cardio-hist-036-answer", sourceId: "cardio-hist-036", label: "cardio-hist-036", content: "I have edema and abdominal distension.." },
          { id: "cardio-hist-083-answer", sourceId: "cardio-hist-083", label: "cardio-hist-083", content: "I have a history of systemic inflammatory disease.." }
      ] },
      { id: "cardio-042-restrictive-cardiomyopathy-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-042-restrictive-cardiomyopathy-pe", sourceId: "cardio-pe-cardio-042-restrictive-cardiomyopathy", label: "Physical Examination", content: "Elevated JVP, edema, and signs of impaired filling without a dominant murmur." }
      ] },
      { id: "cardio-042-restrictive-cardiomyopathy-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-042-restrictive-cardiomyopathy-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Biatrial enlargement with relatively preserved ventricular size and impaired filling" }],
  relevance: "high",
},
{
  id: "cardio-042-restrictive-cardiomyopathy-inv-2",
  name: "Cardiac MRI",
  category: "Cardiac MRI",
  findings: [{ label: "Cardiac MRI", value: "Diffuse myocardial tissue abnormality compatible with infiltrative/restrictive disease" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "restrictive-cardiomyopathy")!,
    candidateDiagnosisIds: ["restrictive-cardiomyopathy", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy",
    title: "Arrhythmogenic Right Ventricular Cardiomyopathy",
    course: "cardiology",
    tags: ["arrhythmogenic-right-ventricular-cardiomyopathy"],
    difficulty: "hard",
    patient: { age: 49, sex: "male" },
    presentation: "I am here because of I am here because of 27-year-old athlete with exertional palpitations and syncope.",
    stages: [
      { id: "cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-038-answer", sourceId: "cardio-hist-038", label: "cardio-hist-038", content: "I have presyncope during exercise.." },
          { id: "cardio-hist-072-answer", sourceId: "cardio-hist-072", label: "cardio-hist-072", content: "A first-degree relative died suddenly at a young age." },
          { id: "cardio-hist-074-answer", sourceId: "cardio-hist-074", label: "cardio-hist-074", content: "My family has a history of an inherited rhythm disorder.." }
      ] },
      { id: "cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy-pe", sourceId: "cardio-pe-cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy", label: "Physical Examination", content: "Intermittent ventricular ectopy without left-sided congestion." }
      ] },
      { id: "cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "T-wave inversion in right precordial leads with ventricular ectopy" }],
  relevance: "high",
},
{
  id: "cardio-043-arrhythmogenic-right-ventricular-cardiomyopathy-inv-2",
  name: "Cardiac MRI",
  category: "Cardiac MRI",
  findings: [{ label: "Cardiac MRI", value: "Regional RV dilation with fibrofatty-pattern abnormalities" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "arrhythmogenic-right-ventricular-cardiomyopathy")!,
    candidateDiagnosisIds: ["arrhythmogenic-right-ventricular-cardiomyopathy", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-044-takotsubo-cardiomyopathy",
    title: "Takotsubo Cardiomyopathy",
    course: "cardiology",
    tags: ["takotsubo-cardiomyopathy"],
    difficulty: "hard",
    patient: { age: 66, sex: "female" },
    presentation: "I am here because of I am here because of 59-year-old woman with acute chest pain shortly after major emotional stress.",
    stages: [
      { id: "cardio-044-takotsubo-cardiomyopathy-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-010-answer", sourceId: "cardio-hist-010", label: "cardio-hist-010", content: "My symptoms started suddenly.." },
          { id: "cardio-hist-015-answer", sourceId: "cardio-hist-015", label: "cardio-hist-015", content: "My pain is pressure-like.." },
          { id: "cardio-hist-012-answer", sourceId: "cardio-hist-012", label: "cardio-hist-012", content: "My symptoms began immediately after severe emotional stress.." }
      ] },
      { id: "cardio-044-takotsubo-cardiomyopathy-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-044-takotsubo-cardiomyopathy-pe", sourceId: "cardio-pe-cardio-044-takotsubo-cardiomyopathy", label: "Physical Examination", content: "Acute distress without a specific chronic murmur." }
      ] },
      { id: "cardio-044-takotsubo-cardiomyopathy-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-044-takotsubo-cardiomyopathy-inv-1",
  name: "Coronary angiography",
  category: "Coronary Imaging",
  findings: [{ label: "Coronary angiography", value: "No obstructive culprit coronary lesion" }],
  relevance: "high",
},
{
  id: "cardio-044-takotsubo-cardiomyopathy-inv-2",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Transient apical ballooning with reduced LV systolic function" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "takotsubo-cardiomyopathy")!,
    candidateDiagnosisIds: ["takotsubo-cardiomyopathy", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-045-pericardial-effusion",
    title: "Pericardial Effusion",
    course: "cardiology",
    tags: ["pericardial-effusion"],
    difficulty: "medium",
    patient: { age: 65, sex: "male" },
    presentation: "I am here because of I have symptoms and findings concerning for Pericardial Effusion.",
    stages: [
      { id: "cardio-045-pericardial-effusion-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-010-answer", sourceId: "cardio-hist-010", label: "cardio-hist-010", content: "My symptoms developed over the recent period.." },
          { id: "cardio-hist-012-answer", sourceId: "cardio-hist-012", label: "cardio-hist-012", content: "My symptoms have progressed over time.." },
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "I have associated exertional limitation." }
      ] },
      { id: "cardio-045-pericardial-effusion-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-045-pericardial-effusion-pe", sourceId: "cardio-pe-cardio-045-pericardial-effusion", label: "Physical Examination", content: "Focused cardiovascular examination reveals findings compatible with the suspected diagnosis." }
      ] },
      { id: "cardio-045-pericardial-effusion-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-045-pericardial-effusion-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Targeted ECG assessment performed for the suspected cardiac disorder" }],
  relevance: "high",
},
{
  id: "cardio-045-pericardial-effusion-inv-2",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Structural and functional findings support the suspected diagnosis" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "pericardial-effusion")!,
    candidateDiagnosisIds: ["pericardial-effusion", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-046-cardiac-tamponade",
    title: "Cardiac Tamponade",
    course: "cardiology",
    tags: ["cardiac-tamponade"],
    difficulty: "hard",
    patient: { age: 47, sex: "male" },
    presentation: "I am here because of I have symptoms and findings concerning for Cardiac Tamponade.",
    stages: [
      { id: "cardio-046-cardiac-tamponade-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-010-answer", sourceId: "cardio-hist-010", label: "cardio-hist-010", content: "My symptoms developed over the recent period.." },
          { id: "cardio-hist-012-answer", sourceId: "cardio-hist-012", label: "cardio-hist-012", content: "My symptoms have progressed over time.." },
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "I have associated exertional limitation." }
      ] },
      { id: "cardio-046-cardiac-tamponade-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-046-cardiac-tamponade-pe", sourceId: "cardio-pe-cardio-046-cardiac-tamponade", label: "Physical Examination", content: "Focused cardiovascular examination reveals findings compatible with the suspected diagnosis." }
      ] },
      { id: "cardio-046-cardiac-tamponade-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-046-cardiac-tamponade-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Targeted ECG assessment performed for the suspected cardiac disorder" }],
  relevance: "high",
},
{
  id: "cardio-046-cardiac-tamponade-inv-2",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Structural and functional findings support the suspected diagnosis" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "cardiac-tamponade")!,
    candidateDiagnosisIds: ["cardiac-tamponade", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-047-constrictive-pericarditis",
    title: "Constrictive Pericarditis",
    course: "cardiology",
    tags: ["constrictive-pericarditis"],
    difficulty: "hard",
    patient: { age: 55, sex: "male" },
    presentation: "I am here because of I am here because of 63-year-old man with progressive edema, ascites, and exertional fatigue.",
    stages: [
      { id: "cardio-047-constrictive-pericarditis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-036-answer", sourceId: "cardio-hist-036", label: "cardio-hist-036", content: "Leg swelling and abdominal distension have progressed." },
          { id: "cardio-hist-080-answer", sourceId: "cardio-hist-080", label: "cardio-hist-080", content: "I had previous thoracic surgery/invasive treatment.." },
          { id: "cardio-hist-012-answer", sourceId: "cardio-hist-012", label: "cardio-hist-012", content: "My symptoms have progressed over months.." }
      ] },
      { id: "cardio-047-constrictive-pericarditis-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-047-constrictive-pericarditis-pe", sourceId: "cardio-pe-cardio-047-constrictive-pericarditis", label: "Physical Examination", content: "Raised JVP with peripheral edema and a pericardial knock." }
      ] },
      { id: "cardio-047-constrictive-pericarditis-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-047-constrictive-pericarditis-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Septal bounce and features of ventricular interdependence" }],
  relevance: "high",
},
{
  id: "cardio-047-constrictive-pericarditis-inv-2",
  name: "Cardiac MRI/CT",
  category: "Cardiac Imaging",
  findings: [{ label: "Cardiac MRI/CT", value: "Pericardial thickening with constrictive physiology" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "constrictive-pericarditis")!,
    candidateDiagnosisIds: ["constrictive-pericarditis", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-048-rheumatic-heart-disease",
    title: "Rheumatic Heart Disease",
    course: "cardiology",
    tags: ["rheumatic-heart-disease"],
    difficulty: "medium",
    patient: { age: 69, sex: "male" },
    presentation: "I am here because of I am here because of 55-year-old woman with progressive dyspnea and a known remote rheumatic fever history.",
    stages: [
      { id: "cardio-048-rheumatic-heart-disease-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-082-answer", sourceId: "cardio-hist-082", label: "cardio-hist-082", content: "I had rheumatic fever as a child.." },
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "My shortness of breath has progressed gradually.." },
          { id: "cardio-hist-045-answer", sourceId: "cardio-hist-045", label: "cardio-hist-045", content: "I was previously told I had a valve murmur." }
      ] },
      { id: "cardio-048-rheumatic-heart-disease-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-048-rheumatic-heart-disease-pe", sourceId: "cardio-pe-cardio-048-rheumatic-heart-disease", label: "Physical Examination", content: "Apical diastolic murmur with features of chronic valvular disease." }
      ] },
      { id: "cardio-048-rheumatic-heart-disease-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-048-rheumatic-heart-disease-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Chronic rheumatic mitral valve thickening with stenosis" }],
  relevance: "high",
},
{
  id: "cardio-048-rheumatic-heart-disease-inv-2",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Left atrial enlargement" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "rheumatic-heart-disease")!,
    candidateDiagnosisIds: ["rheumatic-heart-disease", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-049-atrial-septal-defect",
    title: "Atrial Septal Defect",
    course: "cardiology",
    tags: ["atrial-septal-defect"],
    difficulty: "medium",
    patient: { age: 51, sex: "male" },
    presentation: "I am here because of I am here because of 34-year-old woman with lifelong exercise intolerance and mild dyspnea.",
    stages: [
      { id: "cardio-049-atrial-septal-defect-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-103-answer", sourceId: "cardio-hist-103", label: "cardio-hist-103", content: "I was told I had a murmur in childhood.." },
          { id: "cardio-hist-105-answer", sourceId: "cardio-hist-105", label: "cardio-hist-105", content: "I have never had major exercise capacity.." },
          { id: "cardio-hist-112-answer", sourceId: "cardio-hist-112", label: "cardio-hist-112", content: "A family member of mine has congenital heart disease." }
      ] },
      { id: "cardio-049-atrial-septal-defect-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-049-atrial-septal-defect-pe", sourceId: "cardio-pe-cardio-049-atrial-septal-defect", label: "Physical Examination", content: "Fixed split S2 with a systolic flow murmur at the upper left sternal border." }
      ] },
      { id: "cardio-049-atrial-septal-defect-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-049-atrial-septal-defect-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Interatrial shunt with right-sided chamber enlargement" }],
  relevance: "high",
},
{
  id: "cardio-049-atrial-septal-defect-inv-2",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Right axis deviation with incomplete RBBB pattern" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "atrial-septal-defect")!,
    candidateDiagnosisIds: ["atrial-septal-defect", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-050-ventricular-septal-defect",
    title: "Ventricular Septal Defect",
    course: "cardiology",
    tags: ["ventricular-septal-defect"],
    difficulty: "medium",
    patient: { age: 48, sex: "female" },
    presentation: "I am here because of I am here because of 28-year-old with a lifelong murmur and reduced exercise tolerance.",
    stages: [
      { id: "cardio-050-ventricular-septal-defect-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-103-answer", sourceId: "cardio-hist-103", label: "cardio-hist-103", content: "I was told I had a heart murmur in childhood." },
          { id: "cardio-hist-105-answer", sourceId: "cardio-hist-105", label: "cardio-hist-105", content: "My exercise tolerance has been lower than peers since childhood.." },
          { id: "cardio-hist-104-answer", sourceId: "cardio-hist-104", label: "cardio-hist-104", content: "I have never had a repair." }
      ] },
      { id: "cardio-050-ventricular-septal-defect-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-050-ventricular-septal-defect-pe", sourceId: "cardio-pe-cardio-050-ventricular-septal-defect", label: "Physical Examination", content: "Harsh holosystolic murmur at the lower left sternal border." }
      ] },
      { id: "cardio-050-ventricular-septal-defect-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-050-ventricular-septal-defect-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Interventricular shunt with elevated left-to-right flow" }],
  relevance: "high",
},
{
  id: "cardio-050-ventricular-septal-defect-inv-2",
  name: "Chest X-ray",
  category: "Chest Imaging",
  findings: [{ label: "Chest X-ray", value: "Possible cardiomegaly with increased pulmonary vascularity" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "ventricular-septal-defect")!,
    candidateDiagnosisIds: ["ventricular-septal-defect", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-051-patent-ductus-arteriosus",
    title: "Patent Ductus Arteriosus",
    course: "cardiology",
    tags: ["patent-ductus-arteriosus"],
    difficulty: "hard",
    patient: { age: 50, sex: "female" },
    presentation: "I am here because of I am here because of 21-year-old with a continuous murmur and exercise intolerance.",
    stages: [
      { id: "cardio-051-patent-ductus-arteriosus-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-103-answer", sourceId: "cardio-hist-103", label: "cardio-hist-103", content: "I recall being told about a murmur during childhood.." },
          { id: "cardio-hist-105-answer", sourceId: "cardio-hist-105", label: "cardio-hist-105", content: "I have mild lifelong exercise limitation.." },
          { id: "cardio-hist-104-answer", sourceId: "cardio-hist-104", label: "cardio-hist-104", content: "I have never had a congenital repair." }
      ] },
      { id: "cardio-051-patent-ductus-arteriosus-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-051-patent-ductus-arteriosus-pe", sourceId: "cardio-pe-cardio-051-patent-ductus-arteriosus", label: "Physical Examination", content: "Continuous machinery-like murmur below the left clavicle with bounding peripheral pulses." }
      ] },
      { id: "cardio-051-patent-ductus-arteriosus-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-051-patent-ductus-arteriosus-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Persistent ductal flow from aorta to pulmonary artery" }],
  relevance: "high",
},
{
  id: "cardio-051-patent-ductus-arteriosus-inv-2",
  name: "CT angiography",
  category: "Vascular Imaging",
  findings: [{ label: "CT angiography", value: "Patent ductal connection identified" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "patent-ductus-arteriosus")!,
    candidateDiagnosisIds: ["patent-ductus-arteriosus", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-052-coarctation-of-aorta",
    title: "Coarctation of the Aorta",
    course: "cardiology",
    tags: ["coarctation-of-aorta"],
    difficulty: "hard",
    patient: { age: 55, sex: "male" },
    presentation: "I am here because of I am here because of 25-year-old man with severe upper-limb hypertension and headache.",
    stages: [
      { id: "cardio-052-coarctation-of-aorta-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-046-answer", sourceId: "cardio-hist-046", label: "cardio-hist-046", content: "I have long-standing hypertension diagnosed unusually young.." },
          { id: "cardio-hist-071-answer", sourceId: "cardio-hist-071", label: "cardio-hist-071", content: "My family has a history of congenital heart disease." },
          { id: "cardio-hist-105-answer", sourceId: "cardio-hist-105", label: "cardio-hist-105", content: "I had exercise limitation as a teenager.." }
      ] },
      { id: "cardio-052-coarctation-of-aorta-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-052-coarctation-of-aorta-pe", sourceId: "cardio-pe-cardio-052-coarctation-of-aorta", label: "Physical Examination", content: "Radio-femoral delay with weaker lower-extremity pulses and a systolic murmur over the back." }
      ] },
      { id: "cardio-052-coarctation-of-aorta-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-052-coarctation-of-aorta-inv-1",
  name: "CT angiography",
  category: "Vascular Imaging",
  findings: [{ label: "CT angiography", value: "Focal narrowing of the descending thoracic aorta" }],
  relevance: "high",
},
{
  id: "cardio-052-coarctation-of-aorta-inv-2",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Associated bicuspid aortic valve may be present" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "coarctation-of-aorta")!,
    candidateDiagnosisIds: ["coarctation-of-aorta", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-053-tetralogy-of-fallot",
    title: "Tetralogy of Fallot",
    course: "cardiology",
    tags: ["tetralogy-of-fallot"],
    difficulty: "medium",
    patient: { age: 46, sex: "female" },
    presentation: "I am here because of I am here because of 19-year-old with repaired congenital cyanotic heart disease and exertional intolerance.",
    stages: [
      { id: "cardio-053-tetralogy-of-fallot-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-106-answer", sourceId: "cardio-hist-106", label: "cardio-hist-106", content: "I had cyanotic episodes during childhood.." },
          { id: "cardio-hist-104-answer", sourceId: "cardio-hist-104", label: "cardio-hist-104", content: "I underwent congenital cardiac surgery in childhood.." },
          { id: "cardio-hist-105-answer", sourceId: "cardio-hist-105", label: "cardio-hist-105", content: "My exercise tolerance remains reduced.." }
      ] },
      { id: "cardio-053-tetralogy-of-fallot-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-053-tetralogy-of-fallot-pe", sourceId: "cardio-pe-cardio-053-tetralogy-of-fallot", label: "Physical Examination", content: "Prominent right ventricular impulse with residual outflow murmur." }
      ] },
      { id: "cardio-053-tetralogy-of-fallot-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-053-tetralogy-of-fallot-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Residual RV outflow obstruction with repaired VSD anatomy" }],
  relevance: "high",
},
{
  id: "cardio-053-tetralogy-of-fallot-inv-2",
  name: "Cardiac MRI",
  category: "Cardiac MRI",
  findings: [{ label: "Cardiac MRI", value: "RV size/function and residual scar assessed" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "tetralogy-of-fallot")!,
    candidateDiagnosisIds: ["tetralogy-of-fallot", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-054-transposition-of-great-arteries",
    title: "Transposition of the Great Arteries",
    course: "cardiology",
    tags: ["transposition-of-great-arteries"],
    difficulty: "hard",
    patient: { age: 53, sex: "male" },
    presentation: "I am here because of I am here because of 3-month-old infant with severe cyanosis since birth despite oxygen.",
    stages: [
      { id: "cardio-054-transposition-of-great-arteries-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-106-answer", sourceId: "cardio-hist-106", label: "cardio-hist-106", content: "My cyanosis began shortly after birth.." },
          { id: "cardio-hist-108-answer", sourceId: "cardio-hist-108", label: "cardio-hist-108", content: "My baby required early cardiac intervention.." },
          { id: "cardio-hist-112-answer", sourceId: "cardio-hist-112", label: "cardio-hist-112", content: "No similar congenital lesion is known in the family." }
      ] },
      { id: "cardio-054-transposition-of-great-arteries-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-054-transposition-of-great-arteries-pe", sourceId: "cardio-pe-cardio-054-transposition-of-great-arteries", label: "Physical Examination", content: "Central cyanosis with tachypnea and poor peripheral perfusion." }
      ] },
      { id: "cardio-054-transposition-of-great-arteries-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-054-transposition-of-great-arteries-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Ventriculoarterial discordance consistent with transposition" }],
  relevance: "high",
},
{
  id: "cardio-054-transposition-of-great-arteries-inv-2",
  name: "Chest X-ray",
  category: "Chest Imaging",
  findings: [{ label: "Chest X-ray", value: "Cardiomediastinal silhouette without a diagnostic obstructive lung pattern" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "transposition-of-great-arteries")!,
    candidateDiagnosisIds: ["transposition-of-great-arteries", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-055-ebstein-anomaly",
    title: "Ebstein Anomaly",
    course: "cardiology",
    tags: ["ebstein-anomaly"],
    difficulty: "hard",
    patient: { age: 71, sex: "male" },
    presentation: "I am here because of I am here because of 26-year-old with exertional dyspnea, palpitations, and a congenital murmur.",
    stages: [
      { id: "cardio-055-ebstein-anomaly-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-103-answer", sourceId: "cardio-hist-103", label: "cardio-hist-103", content: "I was told I had a murmur during childhood." },
          { id: "cardio-hist-004-answer", sourceId: "cardio-hist-004", label: "cardio-hist-004", content: "I have recurrent palpitations.." },
          { id: "cardio-hist-086-answer", sourceId: "cardio-hist-086", label: "cardio-hist-086", content: "I was previously diagnosed with congenital heart disease." }
      ] },
      { id: "cardio-055-ebstein-anomaly-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-055-ebstein-anomaly-pe", sourceId: "cardio-pe-cardio-055-ebstein-anomaly", label: "Physical Examination", content: "Holosystolic murmur increasing with inspiration and marked right-sided enlargement." }
      ] },
      { id: "cardio-055-ebstein-anomaly-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-055-ebstein-anomaly-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Apical displacement and abnormal tricuspid valve anatomy" }],
  relevance: "high",
},
{
  id: "cardio-055-ebstein-anomaly-inv-2",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Right atrial enlargement with possible pre-excitation" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "ebstein-anomaly")!,
    candidateDiagnosisIds: ["ebstein-anomaly", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-056-thoracic-aortic-aneurysm",
    title: "Thoracic Aortic Aneurysm",
    course: "cardiology",
    tags: ["thoracic-aortic-aneurysm"],
    difficulty: "medium",
    patient: { age: 49, sex: "male" },
    presentation: "I am here because of I am here because of 67-year-old man with hypertension and intermittent deep chest discomfort.",
    stages: [
      { id: "cardio-056-thoracic-aortic-aneurysm-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-046-answer", sourceId: "cardio-hist-046", label: "cardio-hist-046", content: "I have long-standing hypertension.." },
          { id: "cardio-hist-017-answer", sourceId: "cardio-hist-017", label: "cardio-hist-017", content: "My discomfort sometimes radiates toward the back.." },
          { id: "cardio-hist-130-answer", sourceId: "cardio-hist-130", label: "cardio-hist-130", content: "My pain is not consistently exertional.." }
      ] },
      { id: "cardio-056-thoracic-aortic-aneurysm-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-056-thoracic-aortic-aneurysm-pe", sourceId: "cardio-pe-cardio-056-thoracic-aortic-aneurysm", label: "Physical Examination", content: "Stable cardiovascular examination without acute shock." }
      ] },
      { id: "cardio-056-thoracic-aortic-aneurysm-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-056-thoracic-aortic-aneurysm-inv-1",
  name: "CT angiography",
  category: "Vascular Imaging",
  findings: [{ label: "CT angiography", value: "Focal enlargement of the thoracic aorta" }],
  relevance: "high",
},
{
  id: "cardio-056-thoracic-aortic-aneurysm-inv-2",
  name: "Chest X-ray",
  category: "Chest Imaging",
  findings: [{ label: "Chest X-ray", value: "Widened mediastinal contour" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "thoracic-aortic-aneurysm")!,
    candidateDiagnosisIds: ["thoracic-aortic-aneurysm", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-057-cor-pulmonale",
    title: "Cor Pulmonale",
    course: "cardiology",
    tags: ["cor-pulmonale"],
    difficulty: "medium",
    patient: { age: 67, sex: "male" },
    presentation: "I am here because of I am here because of 70-year-old man with chronic hypoxic lung disease, edema, and worsening exertional dyspnea.",
    stages: [
      { id: "cardio-057-cor-pulmonale-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-067-answer", sourceId: "cardio-hist-067", label: "cardio-hist-067", content: "I have very limited exercise tolerance.." },
          { id: "cardio-hist-062-answer", sourceId: "cardio-hist-062", label: "cardio-hist-062", content: "I have a long smoking history.." },
          { id: "cardio-hist-034-answer", sourceId: "cardio-hist-034", label: "cardio-hist-034", content: "My leg swelling has progressively worsened.." }
      ] },
      { id: "cardio-057-cor-pulmonale-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-057-cor-pulmonale-pe", sourceId: "cardio-pe-cardio-057-cor-pulmonale", label: "Physical Examination", content: "Elevated JVP, peripheral edema, and right ventricular heave." }
      ] },
      { id: "cardio-057-cor-pulmonale-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-057-cor-pulmonale-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "RV enlargement and elevated pulmonary artery pressure" }],
  relevance: "high",
},
{
  id: "cardio-057-cor-pulmonale-inv-2",
  name: "ABG",
  category: "Blood Tests",
  findings: [{ label: "ABG", value: "Chronic hypoxemia with hypercapnia" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "cor-pulmonale")!,
    candidateDiagnosisIds: ["cor-pulmonale", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-058-cardiac-amyloidosis",
    title: "Cardiac Amyloidosis",
    course: "cardiology",
    tags: ["cardiac-amyloidosis"],
    difficulty: "hard",
    patient: { age: 59, sex: "male" },
    presentation: "I am here because of I am here because of 74-year-old man with heart failure symptoms, neuropathy, and low-voltage ECG.",
    stages: [
      { id: "cardio-058-cardiac-amyloidosis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-025-answer", sourceId: "cardio-hist-025", label: "cardio-hist-025", content: "Exertional dyspnea has progressively worsened." },
          { id: "cardio-hist-083-answer", sourceId: "cardio-hist-083", label: "cardio-hist-083", content: "I have systemic features suggestive of infiltrative disease.." },
          { id: "cardio-hist-050-answer", sourceId: "cardio-hist-050", label: "cardio-hist-050", content: "Thyroid disease is not the main explanation." }
      ] },
      { id: "cardio-058-cardiac-amyloidosis-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-058-cardiac-amyloidosis-pe", sourceId: "cardio-pe-cardio-058-cardiac-amyloidosis", label: "Physical Examination", content: "JVP elevation, edema, and relatively quiet heart sounds." }
      ] },
      { id: "cardio-058-cardiac-amyloidosis-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-058-cardiac-amyloidosis-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Increased ventricular wall thickness with restrictive filling" }],
  relevance: "high",
},
{
  id: "cardio-058-cardiac-amyloidosis-inv-2",
  name: "Cardiac MRI",
  category: "Cardiac MRI",
  findings: [{ label: "Cardiac MRI", value: "Diffuse late gadolinium enhancement with abnormal extracellular volume" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "cardiac-amyloidosis")!,
    candidateDiagnosisIds: ["cardiac-amyloidosis", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-059-cardiac-sarcoidosis",
    title: "Cardiac Sarcoidosis",
    course: "cardiology",
    tags: ["cardiac-sarcoidosis"],
    difficulty: "hard",
    patient: { age: 46, sex: "female" },
    presentation: "I am here because of I am here because of 46-year-old woman with AV block, palpitations, and a history of systemic sarcoidosis.",
    stages: [
      { id: "cardio-059-cardiac-sarcoidosis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-044-answer", sourceId: "cardio-hist-044", label: "cardio-hist-044", content: "I have a known conduction disorder.." },
          { id: "cardio-hist-083-answer", sourceId: "cardio-hist-083", label: "cardio-hist-083", content: "I have systemic inflammatory disease.." },
          { id: "cardio-hist-072-answer", sourceId: "cardio-hist-072", label: "cardio-hist-072", content: "I have no known family history of sudden death.." }
      ] },
      { id: "cardio-059-cardiac-sarcoidosis-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-059-cardiac-sarcoidosis-pe", sourceId: "cardio-pe-cardio-059-cardiac-sarcoidosis", label: "Physical Examination", content: "Bradycardia with intermittent ventricular ectopy." }
      ] },
      { id: "cardio-059-cardiac-sarcoidosis-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-059-cardiac-sarcoidosis-inv-1",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "High-grade conduction disease with ventricular ectopy" }],
  relevance: "high",
},
{
  id: "cardio-059-cardiac-sarcoidosis-inv-2",
  name: "Cardiac MRI",
  category: "Cardiac MRI",
  findings: [{ label: "Cardiac MRI", value: "Patchy myocardial late gadolinium enhancement compatible with cardiac sarcoidosis" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "cardiac-sarcoidosis")!,
    candidateDiagnosisIds: ["cardiac-sarcoidosis", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-060-left-atrial-myxoma",
    title: "Left Atrial Myxoma",
    course: "cardiology",
    tags: ["left-atrial-myxoma"],
    difficulty: "hard",
    patient: { age: 54, sex: "female" },
    presentation: "I am here because of I am here because of 51-year-old woman with positional dyspnea, constitutional symptoms, and embolic event.",
    stages: [
      { id: "cardio-060-left-atrial-myxoma-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-009-answer", sourceId: "cardio-hist-009", label: "cardio-hist-009", content: "I have fatigue and intermittent low-grade fever.." },
          { id: "cardio-hist-010-answer", sourceId: "cardio-hist-010", label: "cardio-hist-010", content: "My symptoms vary with body position.." },
          { id: "cardio-hist-005-answer", sourceId: "cardio-hist-005", label: "cardio-hist-005", content: "I have had a transient neurologic episode.." }
      ] },
      { id: "cardio-060-left-atrial-myxoma-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-060-left-atrial-myxoma-pe", sourceId: "cardio-pe-cardio-060-left-atrial-myxoma", label: "Physical Examination", content: "Variable mid-diastolic murmur that changes with position." }
      ] },
      { id: "cardio-060-left-atrial-myxoma-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-060-left-atrial-myxoma-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Mobile left atrial mass attached near the interatrial septum" }],
  relevance: "high",
},
{
  id: "cardio-060-left-atrial-myxoma-inv-2",
  name: "CBC",
  category: "Blood Tests",
  findings: [{ label: "CBC", value: "Mild anemia/inflammatory pattern" }],
  relevance: "low",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "left-atrial-myxoma")!,
    candidateDiagnosisIds: ["left-atrial-myxoma", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-061-acute-rheumatic-fever-with-carditis",
    title: "Acute Rheumatic Fever with Carditis",
    course: "cardiology",
    tags: ["acute-rheumatic-fever-with-carditis"],
    difficulty: "hard",
    patient: { age: 45, sex: "male" },
    presentation: "I am here because of I am here because of 17-year-old with fever, migratory joint pain, and new murmur after untreated pharyngitis.",
    stages: [
      { id: "cardio-061-acute-rheumatic-fever-with-carditis-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-078-answer", sourceId: "cardio-hist-078", label: "cardio-hist-078", content: "I had a recent infectious illness before my cardiac symptoms." },
          { id: "cardio-hist-009-answer", sourceId: "cardio-hist-009", label: "cardio-hist-009", content: "I have fever and malaise.." },
          { id: "cardio-hist-082-answer", sourceId: "cardio-hist-082", label: "cardio-hist-082", content: "I have a history suggestive of prior rheumatic disease.." }
      ] },
      { id: "cardio-061-acute-rheumatic-fever-with-carditis-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-061-acute-rheumatic-fever-with-carditis-pe", sourceId: "cardio-pe-cardio-061-acute-rheumatic-fever-with-carditis", label: "Physical Examination", content: "New apical systolic murmur with tachycardia and systemic inflammation." }
      ] },
      { id: "cardio-061-acute-rheumatic-fever-with-carditis-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-061-acute-rheumatic-fever-with-carditis-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Evidence of valvulitis with mitral regurgitation" }],
  relevance: "high",
},
{
  id: "cardio-061-acute-rheumatic-fever-with-carditis-inv-2",
  name: "Inflammatory markers",
  category: "Blood Tests",
  findings: [{ label: "Inflammatory markers", value: "Markedly elevated ESR/CRP" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "acute-rheumatic-fever-with-carditis")!,
    candidateDiagnosisIds: ["acute-rheumatic-fever-with-carditis", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
  {
    id: "cardio-062-hypertensive-heart-disease",
    title: "Hypertensive Heart Disease",
    course: "cardiology",
    tags: ["hypertensive-heart-disease"],
    difficulty: "medium",
    patient: { age: 65, sex: "male" },
    presentation: "I am here because of I am here because of 69-year-old woman with long-standing poorly controlled hypertension and exertional dyspnea.",
    stages: [
      { id: "cardio-062-hypertensive-heart-disease-history", type: "history", title: "Patient History", hints: [
          { id: "cardio-hist-046-answer", sourceId: "cardio-hist-046", label: "cardio-hist-046", content: "I have had hypertension for decades.." },
          { id: "cardio-hist-026-answer", sourceId: "cardio-hist-026", label: "cardio-hist-026", content: "My exercise tolerance has gradually declined.." },
          { id: "cardio-hist-061-answer", sourceId: "cardio-hist-061", label: "cardio-hist-061", content: "I have frequently missed antihypertensive doses.." }
      ] },
      { id: "cardio-062-hypertensive-heart-disease-physical", type: "physical-exam", title: "Physical Examination", hints: [
          { id: "cardio-062-hypertensive-heart-disease-pe", sourceId: "cardio-pe-cardio-062-hypertensive-heart-disease", label: "Physical Examination", content: "Elevated blood pressure with a sustained apical impulse." }
      ] },
      { id: "cardio-062-hypertensive-heart-disease-investigation", type: "investigation", title: "Investigations", investigations: [
{
  id: "cardio-062-hypertensive-heart-disease-inv-1",
  name: "Echocardiogram",
  category: "Echocardiography",
  findings: [{ label: "Echocardiogram", value: "Concentric LV hypertrophy with preserved or mildly reduced EF" }],
  relevance: "high",
},
{
  id: "cardio-062-hypertensive-heart-disease-inv-2",
  name: "ECG",
  category: "ECG",
  findings: [{ label: "ECG", value: "Voltage criteria for LV hypertrophy with strain pattern" }],
  relevance: "high",
}
      ] },
    ],
    diagnosis: diseases.find((item) => item.id === "hypertensive-heart-disease")!,
    candidateDiagnosisIds: ["hypertensive-heart-disease", "acute-coronary-syndrome", "stable-angina", "acute-decompensated-heart-failure", "atrial-fibrillation"],
    reviewQuestions: [],
  },
];
