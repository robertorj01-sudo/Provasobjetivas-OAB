import { Question } from '../../types/oab';
import { exam38_questions_1_20 } from './questions_1_20';
import { exam38_questions_21_40 } from './questions_21_40';
import { exam38_questions_41_60 } from './questions_41_60';
import { exam38_questions_61_80 } from './questions_61_80';

export const EXAM_38_FULL_QUESTIONS: Question[] = [
  ...exam38_questions_1_20,
  ...exam38_questions_21_40,
  ...exam38_questions_41_60,
  ...exam38_questions_61_80,
];
