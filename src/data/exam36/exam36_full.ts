import { Question } from '../../types/oab';
import { exam36_questions_1_20 } from './questions_1_20';
import { exam36_questions_21_40 } from './questions_21_40';
import { exam36_questions_41_60 } from './questions_41_60';
import { exam36_questions_61_80 } from './questions_61_80';

export const EXAM_36_FULL_QUESTIONS: Question[] = [
  ...exam36_questions_1_20,
  ...exam36_questions_21_40,
  ...exam36_questions_41_60,
  ...exam36_questions_61_80,
];
