import { Question } from '../types/oab';
import { FULL_MOCK_EXAM_80 } from './mockExam80';
import { EXAM_47_FULL_QUESTIONS } from './exam47/exam47_full';
import { EXAM_46_FULL_QUESTIONS } from './exam46/exam46_full';
import { EXAM_45_FULL_QUESTIONS } from './exam45/exam45_full';
import { EXAM_44_FULL_QUESTIONS } from './exam44/exam44_full';
import { EXAM_43_FULL_QUESTIONS } from './exam43/exam43_full';
import { EXAM_42_FULL_QUESTIONS } from './exam42/exam42_full';
import { EXAM_40_FULL_QUESTIONS } from './exam40/exam40_full';
import { EXAM_39_FULL_QUESTIONS } from './exam39/exam39_full';
import { EXAM_38_FULL_QUESTIONS } from './exam38/exam38_full';

export interface AvailableExamInfo {
  id: string;
  name: string;
  edition: number;
  year: number;
  totalQuestions: number;
  description: string;
  isNew?: boolean;
}

export const AVAILABLE_EXAMS: AvailableExamInfo[] = [
  {
    id: 'oab-47',
    name: '47º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 47,
    year: 2026,
    totalQuestions: 80,
    description: 'Caderno oficial da banca FGV com 80 questões completas, fundamentação e gabarito comentado.',
    isNew: true,
  },
  {
    id: 'oab-46',
    name: '46º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 46,
    year: 2026,
    totalQuestions: 80,
    description: 'Caderno oficial do 46º Exame da banca FGV com 80 questões completas, base legal, análise do gabarito e pegadinhas da FGV.',
    isNew: true,
  },
  {
    id: 'oab-45',
    name: '45º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 45,
    year: 2025,
    totalQuestions: 80,
    description: 'Caderno oficial do 45º Exame da FGV com as 80 questões comentadas item a item, análise da pegadinha da banca e fundamentação jurídica.',
    isNew: true,
  },
  {
    id: 'oab-44',
    name: '44º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 44,
    year: 2025,
    totalQuestions: 80,
    description: 'Caderno oficial do 44º Exame da FGV (17/08/2025) com as 80 questões completas, gabarito definitivo, comentários didáticos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-43',
    name: '43º Exame de Ordem Unificado (Tipo 3 - Amarela)',
    edition: 43,
    year: 2025,
    totalQuestions: 80,
    description: 'Caderno oficial do 43º Exame da FGV (27/04/2025) Tipo 3 Amarela com as 80 questões completas, gabarito definitivo oficial, análise do gabarito, fundamentação jurídica e pegadinhas da FGV.',
    isNew: true,
  },
  {
    id: 'oab-42',
    name: '42º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 42,
    year: 2024,
    totalQuestions: 80,
    description: 'Caderno oficial do 42º Exame da FGV (01/12/2024) Tipo 1 Branca com as 80 questões completas, gabarito definitivo, análise do gabarito, fundamentação jurídica e pegadinhas da FGV.',
    isNew: true,
  },
  {
    id: 'oab-41',
    name: '41º Exame de Ordem Unificado (2024.2)',
    edition: 41,
    year: 2024,
    totalQuestions: 80,
    description: 'Prova oficial aplicada pela FGV com foco nas recentes atualizações legislativas.',
  },
  {
    id: 'oab-40',
    name: '40º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 40,
    year: 2024,
    totalQuestions: 80,
    description: 'Caderno oficial do 40º Exame da FGV (24/03/2024) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial, comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-39',
    name: '39º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 39,
    year: 2023,
    totalQuestions: 80,
    description: 'Caderno oficial do 39º Exame da FGV (19/11/2023) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 18, 49 e 63), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-38',
    name: '38º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 38,
    year: 2023,
    totalQuestions: 80,
    description: 'Caderno oficial do 38º Exame da FGV (09/07/2023) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 45, 60 e 62), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
];

export const getExamQuestions = (examId: string): Question[] => {
  if (examId === 'oab-47' || examId.includes('47')) {
    return EXAM_47_FULL_QUESTIONS;
  }
  if (examId === 'oab-46' || examId.includes('46')) {
    return EXAM_46_FULL_QUESTIONS;
  }
  if (examId === 'oab-45' || examId.includes('45')) {
    return EXAM_45_FULL_QUESTIONS;
  }
  if (examId === 'oab-44' || examId.includes('44')) {
    return EXAM_44_FULL_QUESTIONS;
  }
  if (examId === 'oab-43' || examId.includes('43')) {
    return EXAM_43_FULL_QUESTIONS;
  }
  if (examId === 'oab-42' || examId.includes('42')) {
    return EXAM_42_FULL_QUESTIONS;
  }
  if (examId === 'oab-40' || examId.includes('40')) {
    return EXAM_40_FULL_QUESTIONS;
  }
  if (examId === 'oab-39' || examId.includes('39')) {
    return EXAM_39_FULL_QUESTIONS;
  }
  if (examId === 'oab-38' || examId.includes('38')) {
    return EXAM_38_FULL_QUESTIONS;
  }
  return FULL_MOCK_EXAM_80;
};

export const getAllQuestions = (): Question[] => {
  return [
    ...EXAM_47_FULL_QUESTIONS,
    ...EXAM_46_FULL_QUESTIONS,
    ...EXAM_45_FULL_QUESTIONS,
    ...EXAM_44_FULL_QUESTIONS,
    ...EXAM_43_FULL_QUESTIONS,
    ...EXAM_42_FULL_QUESTIONS,
    ...EXAM_40_FULL_QUESTIONS,
    ...EXAM_39_FULL_QUESTIONS,
    ...EXAM_38_FULL_QUESTIONS,
    ...FULL_MOCK_EXAM_80,
  ];
};

export const getQuestionsByDisciplineUnified = (discipline: string, examId?: string): Question[] => {
  if (examId) {
    const list = getExamQuestions(examId);
    return list.filter((q) => q.discipline === discipline);
  }
  // Return from 47, 46, 45, 44, 43, 42, 40, then 41
  return getAllQuestions().filter((q) => q.discipline === discipline);
};

export const findQuestionByIdAnyExam = (id: number): Question | undefined => {
  return (
    EXAM_47_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_46_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_45_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_44_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_43_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_42_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_40_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_39_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_38_FULL_QUESTIONS.find((q) => q.id === id) ||
    FULL_MOCK_EXAM_80.find((q) => q.id === id)
  );
};



