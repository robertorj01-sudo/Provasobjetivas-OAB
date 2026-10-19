import { Question } from '../../types/oab';
import { exam46_questions_1_20 } from './questions_1_20';
import { exam46_questions_21_40 } from './questions_21_40';
import { exam46_questions_41_60 } from './questions_41_60';
import { exam46_questions_61_80 } from './questions_61_80';

export const EXAM_46_FULL_QUESTIONS: Question[] = [
  ...exam46_questions_1_20,
  ...exam46_questions_21_40,
  ...exam46_questions_41_60,
  ...exam46_questions_61_80,
];

export const getExam46QuestionsByDiscipline = (discipline: string): Question[] => {
  return EXAM_46_FULL_QUESTIONS.filter((q) => q.discipline === discipline);
};

export const getExam46QuestionById = (id: number): Question | undefined => {
  return EXAM_46_FULL_QUESTIONS.find((q) => q.id === id);
};
