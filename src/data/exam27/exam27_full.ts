import { Question } from '../../types/oab';
import { exam27_questions_1_10 } from './questions_1_10';
import { exam27_questions_11_20 } from './questions_11_20';
import { exam27_questions_21_30 } from './questions_21_30';
import { exam27_questions_31_40 } from './questions_31_40';
import { exam27_questions_41_50 } from './questions_41_50';
import { exam27_questions_51_60 } from './questions_51_60';
import { exam27_questions_61_70 } from './questions_61_70';
import { exam27_questions_71_80 } from './questions_71_80';

export const EXAM_27_FULL_QUESTIONS: Question[] = [
  ...exam27_questions_1_10,
  ...exam27_questions_11_20,
  ...exam27_questions_21_30,
  ...exam27_questions_31_40,
  ...exam27_questions_41_50,
  ...exam27_questions_51_60,
  ...exam27_questions_61_70,
  ...exam27_questions_71_80,
];
