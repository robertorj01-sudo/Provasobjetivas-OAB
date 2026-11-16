import { Question } from '../../types/oab';
import { exam35_questions_1_20 } from './questions_1_20';
import { exam35_questions_21_40 } from './questions_21_40';
import { exam35_questions_41_60 } from './questions_41_60';
import { exam35_questions_61_80 } from './questions_61_80';

export const EXAM_35_FULL_QUESTIONS: Question[] = [
  ...exam35_questions_1_20,
  ...exam35_questions_21_40,
  ...exam35_questions_41_60,
  ...exam35_questions_61_80,
];
