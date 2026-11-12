import { Question } from '../../types/oab';
import { exam42_questions_1_20 } from './questions_1_20';
import { exam42_questions_21_40 } from './questions_21_40';
import { exam42_questions_41_60 } from './questions_41_60';
import { exam42_questions_61_80 } from './questions_61_80';

export const EXAM_42_FULL_QUESTIONS: Question[] = [
  ...exam42_questions_1_20,
  ...exam42_questions_21_40,
  ...exam42_questions_41_60,
  ...exam42_questions_61_80,
];
