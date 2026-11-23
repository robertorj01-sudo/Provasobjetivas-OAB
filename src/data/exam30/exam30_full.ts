import { Question } from '../../types/oab';
import { exam30_questions_1_20 } from './questions_1_20';
import { exam30_questions_21_40 } from './questions_21_40';
import { exam30_questions_41_60 } from './questions_41_60';
import { exam30_questions_61_80 } from './questions_61_80';

export const EXAM_30_FULL_QUESTIONS: Question[] = [
  ...exam30_questions_1_20,
  ...exam30_questions_21_40,
  ...exam30_questions_41_60,
  ...exam30_questions_61_80,
];
