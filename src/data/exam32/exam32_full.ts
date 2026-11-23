import { Question } from '../../types/oab';
import { exam32_questions_1_20 } from './questions_1_20';
import { exam32_questions_21_40 } from './questions_21_40';
import { exam32_questions_41_60 } from './questions_41_60';
import { exam32_questions_61_80 } from './questions_61_80';

export const EXAM_32_FULL_QUESTIONS: Question[] = [
  ...exam32_questions_1_20,
  ...exam32_questions_21_40,
  ...exam32_questions_41_60,
  ...exam32_questions_61_80,
];
