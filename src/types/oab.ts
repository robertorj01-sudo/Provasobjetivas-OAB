export type DisciplineType =
  | 'Ética Profissional'
  | 'Filosofia do Direito'
  | 'Direito Constitucional'
  | 'Direitos Humanos'
  | 'Direito Eleitoral'
  | 'Direito Internacional'
  | 'Direito Tributário'
  | 'Direito Financeiro'
  | 'Direito Administrativo'
  | 'Direito Ambiental'
  | 'Direito Civil'
  | 'Estatuto da Criança e do Adolescente (ECA)'
  | 'Estatuto da Criança e do Adolescente'
  | 'Direito do Consumidor'
  | 'Direito Empresarial'
  | 'Direito Processual Civil'
  | 'Direito Penal'
  | 'Direito Processual Penal'
  | 'Direito Previdenciário'
  | 'Direito do Trabalho'
  | 'Direito Processual do Trabalho';

export type OptionLetter = 'A' | 'B' | 'C' | 'D';

export interface QuestionOption {
  id: OptionLetter;
  text: string;
}

export interface EducationalCommentary {
  analise_gabarito?: string;
  base_legal?: string;
  pegadinha_da_fgv?: string;
}

export interface RawJsonQuestion {
  id_questao?: string;
  exame?: string;
  disciplina?: DisciplineType | string;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    [key: string]: string;
  };
  gabarito_correto: OptionLetter;
  comentario_educativo?: EducationalCommentary;
}

export interface Question {
  id: number;
  id_questao?: string;
  number: number;
  discipline: DisciplineType;
  topic: string;
  statement: string;
  options: QuestionOption[];
  correctOption: OptionLetter;
  legalBasis: string;
  commentary: string;
  comentario_educativo?: EducationalCommentary;
  difficulty?: 'Fácil' | 'Média' | 'Difícil';
  examOrigin?: string;
}

export interface ExamMetadata {
  id: string;
  edition: number;
  name: string;
  year: number;
  phase: 1;
  banca: 'FGV';
  totalQuestions: number;
  passingScore: number;
  officialDate: string;
  status: 'Disponível' | 'Gabarito Oficial';
  passRatePercentage?: number;
  description: string;
}

export interface DisciplineDistribution {
  discipline: DisciplineType;
  questionCount: number;
  questionRange: [number, number];
  color: string;
}

export type SimuladoMode = 'real' | 'study'; // 'real' = 5h timed, feedback at end; 'study' = instant feedback

export interface SimuladoState {
  examId: string;
  examName: string;
  mode: SimuladoMode;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, OptionLetter>;
  flaggedQuestions: Record<number, boolean>;
  timeRemainingSeconds: number; // 5 hours = 18000s
  isPaused: boolean;
  isFinished: boolean;
  startedAt: string;
  finishedAt?: string;
}

export interface DisciplineScore {
  discipline: DisciplineType;
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  percentage: number;
}

export interface SimuladoResult {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  scorePercentage: number;
  isApproved: boolean; // >= 40 acertos (50%)
  timeSpentSeconds: number;
  disciplineScores: DisciplineScore[];
  strongestDisciplines: string[];
  weakestDisciplines: string[];
}
