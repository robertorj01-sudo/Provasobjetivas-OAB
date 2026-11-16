import { Question } from '../../types/oab';
import { exam37_questions_1_20 } from './questions_1_20';
import { exam37_questions_21_40 } from './questions_21_40';
import { exam37_questions_41_60 } from './questions_41_60';
import { exam37_questions_61_80 } from './questions_61_80';

export const EXAM_37_FULL_QUESTIONS: Question[] = [
  ...exam37_questions_1_20,
  ...exam37_questions_21_40,
  ...exam37_questions_41_60,
  ...exam37_questions_61_80,
];
