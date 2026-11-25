import { Question } from '../../types/oab';
import { exam2010_3_questions_1_25 } from './questions_1_25';
import { exam2010_3_questions_26_50 } from './questions_26_50';
import { exam2010_3_questions_51_75 } from './questions_51_75';
import { exam2010_3_questions_76_100 } from './questions_76_100';

export const EXAM_2010_3_FULL_QUESTIONS: Question[] = [
  ...exam2010_3_questions_1_25,
  ...exam2010_3_questions_26_50,
  ...exam2010_3_questions_51_75,
  ...exam2010_3_questions_76_100,
];
