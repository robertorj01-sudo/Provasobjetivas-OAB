import { Question } from '../../types/oab';
import { exam31_questions_1_20 } from './questions_1_20';
import { exam31_questions_21_40 } from './questions_21_40';
import { exam31_questions_41_60 } from './questions_41_60';
import { exam31_questions_61_80 } from './questions_61_80';

export const EXAM_31_FULL_QUESTIONS: Question[] = [
  ...exam31_questions_1_20,
  ...exam31_questions_21_40,
  ...exam31_questions_41_60,
  ...exam31_questions_61_80,
];
