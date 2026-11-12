import { Question } from '../../types/oab';
import { exam40_questions_1_20 } from './questions_1_20';
import { exam40_questions_21_40 } from './questions_21_40';
import { exam40_questions_41_60 } from './questions_41_60';
import { exam40_questions_61_80 } from './questions_61_80';

export const EXAM_40_FULL_QUESTIONS: Question[] = [
  ...exam40_questions_1_20,
  ...exam40_questions_21_40,
  ...exam40_questions_41_60,
  ...exam40_questions_61_80,
];
