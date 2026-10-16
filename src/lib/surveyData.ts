export interface SurveyQuestion {
  id: number;
  label: string;
}

export const SATISFACTION_QUESTIONS: SurveyQuestion[] = [
  { id: 1, label: "Pertinence des objectifs de la formation" },
  { id: 2, label: "Qualité du contenu de la formation" },
  { id: 3, label: "Maîtrise du sujet par le formateur" },
  { id: 4, label: "Méthodes pédagogiques et qualité des explications" },
  { id: 5, label: "Qualité des supports et documents pédagogiques" },
  { id: 6, label: "Durée et organisation de la formation" },
  { id: 7, label: "Conditions matérielles et cadre de la formation" },
  { id: 8, label: "Utilité des connaissances acquises pour la gestion d'une officine moderne" },
  { id: 9, label: "Adéquation des exercices pratiques aux réalités du terrain" },
  { id: 10, label: "Satisfaction globale à l'issue de la formation" },
];

export const SATISFACTION_LEVELS = [
  { value: "very_satisfied", label: "Très satisfait", score: 4, color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" },
  { value: "satisfied", label: "Satisfait", score: 3, color: "text-blue-400 bg-blue-500/15 border-blue-500/30" },
  { value: "little_satisfied", label: "Peu satisfait", score: 2, color: "text-orange bg-orange/15 border-orange/30" },
  { value: "not_satisfied", label: "Pas du tout satisfait", score: 1, color: "text-red-400 bg-red-500/15 border-red-500/30" },
] as const;

export type SatisfactionLevelValue = typeof SATISFACTION_LEVELS[number]["value"];

export interface SurveySubmission {
  id?: string;
  training_slug: string;
  participant_name: string;
  participant_email: string;
  participant_role?: string;
  answers: Record<string, SatisfactionLevelValue>; // { "q1": "very_satisfied", ... }
  suggestions?: string;
  created_at?: string;
}
