import { Question } from '../../types/oab';
import { exam34_questions_1_20 } from './questions_1_20';
import { exam34_questions_21_40 } from './questions_21_40';
import { exam34_questions_41_60 } from './questions_41_60';
import { exam34_questions_61_80 } from './questions_61_80';

export const EXAM_34_FULL_QUESTIONS: Question[] = [
  ...exam34_questions_1_20,
  ...exam34_questions_21_40,
  ...exam34_questions_41_60,
  ...exam34_questions_61_80,
];
