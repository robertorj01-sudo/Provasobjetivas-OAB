import { Question } from '../types/oab';
import { FULL_MOCK_EXAM_80 } from './mockExam80';
import { EXAM_47_FULL_QUESTIONS } from './exam47/exam47_full';
import { EXAM_46_FULL_QUESTIONS } from './exam46/exam46_full';
import { EXAM_45_FULL_QUESTIONS } from './exam45/exam45_full';

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
    id: 'oab-41',
    name: '41º Exame de Ordem Unificado (2024.2)',
    edition: 41,
    year: 2024,
    totalQuestions: 80,
    description: 'Prova oficial aplicada pela FGV com foco nas recentes atualizações legislativas.',
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
  return FULL_MOCK_EXAM_80;
};

export const getAllQuestions = (): Question[] => {
  return [
    ...EXAM_47_FULL_QUESTIONS,
    ...EXAM_46_FULL_QUESTIONS,
    ...EXAM_45_FULL_QUESTIONS,
    ...FULL_MOCK_EXAM_80,
  ];
};

export const getQuestionsByDisciplineUnified = (discipline: string, examId?: string): Question[] => {
  if (examId) {
    const list = getExamQuestions(examId);
    return list.filter((q) => q.discipline === discipline);
  }
  // Return from 47, 46, 45, then 41
  return getAllQuestions().filter((q) => q.discipline === discipline);
};

export const findQuestionByIdAnyExam = (id: number): Question | undefined => {
  return (
    EXAM_47_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_46_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_45_FULL_QUESTIONS.find((q) => q.id === id) ||
    FULL_MOCK_EXAM_80.find((q) => q.id === id)
  );
};
