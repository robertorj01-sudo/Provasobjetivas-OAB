import { Question } from '../types/oab';
import { questions_1_20 } from './questions_1_20';
import { questions_21_40 } from './questions_21_40';
import { questions_41_60 } from './questions_41_60';
import { questions_61_80 } from './questions_61_80';

export const FULL_MOCK_EXAM_80: Question[] = [
  ...questions_1_20,
  ...questions_21_40,
  ...questions_41_60,
  ...questions_61_80,
];

export const getQuestionsByDiscipline = (discipline: string): Question[] => {
  return FULL_MOCK_EXAM_80.filter(q => q.discipline === discipline);
};

export const getQuestionById = (id: number): Question | undefined => {
  return FULL_MOCK_EXAM_80.find(q => q.id === id);
};
