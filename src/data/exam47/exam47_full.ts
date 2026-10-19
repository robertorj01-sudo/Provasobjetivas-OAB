import { Question } from '../../types/oab';
import { exam47_questions_1_20 } from './questions_1_20';
import { exam47_questions_21_40 } from './questions_21_40';
import { exam47_questions_41_60 } from './questions_41_60';
import { exam47_questions_61_80 } from './questions_61_80';

export const EXAM_47_FULL_QUESTIONS: Question[] = [
  ...exam47_questions_1_20,
  ...exam47_questions_21_40,
  ...exam47_questions_41_60,
  ...exam47_questions_61_80,
];

export const getExam47QuestionsByDiscipline = (discipline: string): Question[] => {
  return EXAM_47_FULL_QUESTIONS.filter(q => q.discipline === discipline);
};

export const getExam47QuestionById = (id: number): Question | undefined => {
  return EXAM_47_FULL_QUESTIONS.find(q => q.id === id);
};
