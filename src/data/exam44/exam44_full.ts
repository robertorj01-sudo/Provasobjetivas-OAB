import { Question } from '../../types/oab';
import { exam44_questions_1_20 } from './questions_1_20';
import { exam44_questions_21_40 } from './questions_21_40';
import { exam44_questions_41_60 } from './questions_41_60';
import { exam44_questions_61_80 } from './questions_61_80';

export const EXAM_44_FULL_QUESTIONS: Question[] = [
  ...exam44_questions_1_20,
  ...exam44_questions_21_40,
  ...exam44_questions_41_60,
  ...exam44_questions_61_80,
];

export const getExam44QuestionsByDiscipline = (discipline: string): Question[] => {
  return EXAM_44_FULL_QUESTIONS.filter((q) => q.discipline === discipline);
};

export const getExam44QuestionById = (id: number): Question | undefined => {
  return EXAM_44_FULL_QUESTIONS.find((q) => q.id === id);
};
