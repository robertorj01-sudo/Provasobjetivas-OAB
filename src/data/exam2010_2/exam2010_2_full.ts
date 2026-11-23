import { Question } from '../../types/oab';
import { exam2010_2_questions_1_20 } from './questions_1_20';
import { exam2010_2_questions_21_40 } from './questions_21_40';
import { exam2010_2_questions_41_60 } from './questions_41_60';
import { exam2010_2_questions_61_80 } from './questions_61_80';
import { exam2010_2_questions_81_100 } from './questions_81_100';

export const EXAM_2010_2_FULL_QUESTIONS: Question[] = [
  ...exam2010_2_questions_1_20,
  ...exam2010_2_questions_21_40,
  ...exam2010_2_questions_41_60,
  ...exam2010_2_questions_61_80,
  ...exam2010_2_questions_81_100,
];
