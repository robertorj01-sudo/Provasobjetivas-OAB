import { Question } from '../../types/oab';
import { exam45_questions_1_20 } from './questions_1_20';
import { exam45_questions_21_40 } from './questions_21_40';
import { exam45_questions_41_60 } from './questions_41_60';
import { exam45_questions_61_80 } from './questions_61_80';

export const EXAM_45_FULL_QUESTIONS: Question[] = [
  ...exam45_questions_1_20,
  ...exam45_questions_21_40,
  ...exam45_questions_41_60,
  ...exam45_questions_61_80,
];

export const getExam45QuestionsByDiscipline = (discipline: string): Question[] => {
  return EXAM_45_FULL_QUESTIONS.filter((q) => q.discipline === discipline);
};

export const getExam45QuestionById = (id: number): Question | undefined => {
  return EXAM_45_FULL_QUESTIONS.find((q) => q.id === id);
};
