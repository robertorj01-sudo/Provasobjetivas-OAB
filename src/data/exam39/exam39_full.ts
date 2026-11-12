import { Question } from '../../types/oab';
import { exam39_questions_1_20 } from './questions_1_20';
import { exam39_questions_21_40 } from './questions_21_40';
import { exam39_questions_41_60 } from './questions_41_60';
import { exam39_questions_61_80 } from './questions_61_80';

export const EXAM_39_FULL_QUESTIONS: Question[] = [
  ...exam39_questions_1_20,
  ...exam39_questions_21_40,
  ...exam39_questions_41_60,
  ...exam39_questions_61_80,
];
