import { Question } from '../../types/oab';
import { exam43_questions_1_20 } from './questions_1_20';
import { exam43_questions_21_40 } from './questions_21_40';
import { exam43_questions_41_60 } from './questions_41_60';
import { exam43_questions_61_80 } from './questions_61_80';

export const EXAM_43_FULL_QUESTIONS: Question[] = [
  ...exam43_questions_1_20,
  ...exam43_questions_21_40,
  ...exam43_questions_41_60,
  ...exam43_questions_61_80,
];
