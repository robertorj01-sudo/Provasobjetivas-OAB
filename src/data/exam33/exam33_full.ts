import { Question } from '../../types/oab';
import { exam33_questions_1_20 } from './questions_1_20';
import { exam33_questions_21_40 } from './questions_21_40';
import { exam33_questions_41_60 } from './questions_41_60';
import { exam33_questions_61_80 } from './questions_61_80';

export const EXAM_33_FULL_QUESTIONS: Question[] = [
  ...exam33_questions_1_20,
  ...exam33_questions_21_40,
  ...exam33_questions_41_60,
  ...exam33_questions_61_80,
];
