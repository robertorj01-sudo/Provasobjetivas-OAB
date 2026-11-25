import { Question } from '../../types/oab';
import { exam2011_1_questions_1_20 } from './questions_1_20';
import { exam2011_1_questions_21_40 } from './questions_21_40';
import { exam2011_1_questions_41_60 } from './questions_41_60';
import { exam2011_1_questions_61_80 } from './questions_61_80';

export const EXAM_2011_1_FULL_QUESTIONS: Question[] = [
  ...exam2011_1_questions_1_20,
  ...exam2011_1_questions_21_40,
  ...exam2011_1_questions_41_60,
  ...exam2011_1_questions_61_80,
];
