import { Question } from '../../types/oab';
import { exam29_questions_1_10 } from './questions_1_10';
import { exam29_questions_11_20 } from './questions_11_20';
import { exam29_questions_21_30 } from './questions_21_30';
import { exam29_questions_31_40 } from './questions_31_40';
import { exam29_questions_41_50 } from './questions_41_50';
import { exam29_questions_51_60 } from './questions_51_60';
import { exam29_questions_61_70 } from './questions_61_70';
import { exam29_questions_71_80 } from './questions_71_80';

export const EXAM_29_FULL_QUESTIONS: Question[] = [
  ...exam29_questions_1_10,
  ...exam29_questions_11_20,
  ...exam29_questions_21_30,
  ...exam29_questions_31_40,
  ...exam29_questions_41_50,
  ...exam29_questions_51_60,
  ...exam29_questions_61_70,
  ...exam29_questions_71_80,
];
