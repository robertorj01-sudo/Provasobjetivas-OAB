import { Question } from '../types/oab';
import { FULL_MOCK_EXAM_80 } from './mockExam80';
import { EXAM_47_FULL_QUESTIONS } from './exam47/exam47_full';
import { EXAM_46_FULL_QUESTIONS } from './exam46/exam46_full';
import { EXAM_45_FULL_QUESTIONS } from './exam45/exam45_full';
import { EXAM_44_FULL_QUESTIONS } from './exam44/exam44_full';
import { EXAM_43_FULL_QUESTIONS } from './exam43/exam43_full';
import { EXAM_42_FULL_QUESTIONS } from './exam42/exam42_full';
import { EXAM_40_FULL_QUESTIONS } from './exam40/exam40_full';
import { EXAM_39_FULL_QUESTIONS } from './exam39/exam39_full';
import { EXAM_38_FULL_QUESTIONS } from './exam38/exam38_full';
import { EXAM_37_FULL_QUESTIONS } from './exam37/exam37_full';
import { EXAM_36_FULL_QUESTIONS } from './exam36/exam36_full';
import { EXAM_35_FULL_QUESTIONS } from './exam35/exam35_full';
import { EXAM_34_FULL_QUESTIONS } from './exam34/exam34_full';
import { EXAM_33_FULL_QUESTIONS } from './exam33/exam33_full';
import { EXAM_32_FULL_QUESTIONS } from './exam32/exam32_full';
import { EXAM_31_FULL_QUESTIONS } from './exam31/exam31_full';
import { EXAM_30_FULL_QUESTIONS } from './exam30/exam30_full';
import { EXAM_29_FULL_QUESTIONS } from './exam29/exam29_full';
import { EXAM_28_FULL_QUESTIONS } from './exam28/exam28_full';
import { EXAM_27_FULL_QUESTIONS } from './exam27/exam27_full';
import { EXAM_26_FULL_QUESTIONS } from './exam26/exam26_full';
import { EXAM_5_FULL_QUESTIONS } from './exam5/exam5_full';
import { EXAM_2011_1_FULL_QUESTIONS } from './exam2011_1/exam2011_1_full';
import { EXAM_2010_3_FULL_QUESTIONS } from './exam2010_3/exam2010_3_full';
import { EXAM_2010_2_FULL_QUESTIONS } from './exam2010_2/exam2010_2_full';
import { EXAM_2010_1_FULL_QUESTIONS } from './exam2010_1/exam2010_1_full';

export interface AvailableExamInfo {
  id: string;
  name: string;
  edition: number;
  year: number;
  totalQuestions: number;
  description: string;
  isNew?: boolean;
}

export const AVAILABLE_EXAMS: AvailableExamInfo[] = [
  {
    id: 'oab-47',
    name: '47º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 47,
    year: 2026,
    totalQuestions: 80,
    description: 'Caderno oficial da banca FGV com 80 questões completas, fundamentação e gabarito comentado.',
    isNew: true,
  },
  {
    id: 'oab-46',
    name: '46º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 46,
    year: 2026,
    totalQuestions: 80,
    description: 'Caderno oficial do 46º Exame da banca FGV com 80 questões completas, base legal, análise do gabarito e pegadinhas da FGV.',
    isNew: true,
  },
  {
    id: 'oab-45',
    name: '45º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 45,
    year: 2025,
    totalQuestions: 80,
    description: 'Caderno oficial do 45º Exame da FGV com as 80 questões comentadas item a item, análise da pegadinha da banca e fundamentação jurídica.',
    isNew: true,
  },
  {
    id: 'oab-44',
    name: '44º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 44,
    year: 2025,
    totalQuestions: 80,
    description: 'Caderno oficial do 44º Exame da FGV (17/08/2025) com as 80 questões completas, gabarito definitivo, comentários didáticos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-43',
    name: '43º Exame de Ordem Unificado (Tipo 3 - Amarela)',
    edition: 43,
    year: 2025,
    totalQuestions: 80,
    description: 'Caderno oficial do 43º Exame da FGV (27/04/2025) Tipo 3 Amarela com as 80 questões completas, gabarito definitivo oficial, análise do gabarito, fundamentação jurídica e pegadinhas da FGV.',
    isNew: true,
  },
  {
    id: 'oab-42',
    name: '42º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 42,
    year: 2024,
    totalQuestions: 80,
    description: 'Caderno oficial do 42º Exame da FGV (01/12/2024) Tipo 1 Branca com as 80 questões completas, gabarito definitivo, análise do gabarito, fundamentação jurídica e pegadinhas da FGV.',
    isNew: true,
  },
  {
    id: 'oab-41',
    name: '41º Exame de Ordem Unificado (2024.2)',
    edition: 41,
    year: 2024,
    totalQuestions: 80,
    description: 'Prova oficial aplicada pela FGV com foco nas recentes atualizações legislativas.',
  },
  {
    id: 'oab-40',
    name: '40º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 40,
    year: 2024,
    totalQuestions: 80,
    description: 'Caderno oficial do 40º Exame da FGV (24/03/2024) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial, comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-39',
    name: '39º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 39,
    year: 2023,
    totalQuestions: 80,
    description: 'Caderno oficial do 39º Exame da FGV (19/11/2023) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 18, 49 e 63), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-38',
    name: '38º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 38,
    year: 2023,
    totalQuestions: 80,
    description: 'Caderno oficial do 38º Exame da FGV (09/07/2023) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 45, 60 e 62), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-37',
    name: '37º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 37,
    year: 2023,
    totalQuestions: 80,
    description: 'Caderno oficial do 37º Exame da FGV (26/02/2023) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 7 e 69), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-36',
    name: '36º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 36,
    year: 2022,
    totalQuestions: 80,
    description: 'Caderno oficial do 36º Exame da FGV (23/10/2022) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 50 e 51), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-35',
    name: '35º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 35,
    year: 2022,
    totalQuestions: 80,
    description: 'Caderno oficial do 35º Exame da FGV (03/07/2022) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 50 e 59), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-34',
    name: '34º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 34,
    year: 2022,
    totalQuestions: 80,
    description: 'Caderno oficial do 34º Exame da FGV (20/02/2022) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questão anulada 63), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-33',
    name: '33º Exame de Ordem Unificado (Tipo 2 - Verde)',
    edition: 33,
    year: 2021,
    totalQuestions: 80,
    description: 'Caderno oficial do 33º Exame da FGV (17/10/2021) Tipo 2 Verde com as 80 questões completas, gabarito definitivo oficial (incluindo questão anulada 61), comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-32',
    name: '32º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 32,
    year: 2021,
    totalQuestions: 80,
    description: 'Caderno oficial do 32º Exame da FGV (Tipo 1 Branca) com as 80 questões completas, gabarito definitivo oficial, base legal, comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-31',
    name: '31º Exame de Ordem Unificado (Tipo 2 - Verde)',
    edition: 31,
    year: 2020,
    totalQuestions: 80,
    description: 'Caderno oficial do 31º Exame da FGV (09/02/2020) Tipo 2 Verde com as 80 questões completas, gabarito definitivo oficial, base legal, comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-30',
    name: '30º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 30,
    year: 2019,
    totalQuestions: 80,
    description: 'Caderno oficial do 30º Exame da FGV (20/10/2019) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial, base legal, comentários pedagógicos e pegadinhas da banca.',
    isNew: true,
  },
  {
    id: 'oab-29',
    name: '29º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 29,
    year: 2019,
    totalQuestions: 80,
    description: 'Caderno oficial do 29º Exame da FGV (30/06/2019) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questões anuladas 20 e 34), base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-28',
    name: '28º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 28,
    year: 2019,
    totalQuestions: 80,
    description: 'Caderno oficial do 28º Exame da FGV (17/03/2019) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo questão anulada 37 e retificação da 47), base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-27',
    name: '27º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 27,
    year: 2018,
    totalQuestions: 80,
    description: 'Caderno oficial do 27º Exame da FGV (18/11/2018) Tipo 1 Branca com as 80 questões completas, gabarito definitivo oficial (incluindo retificação da questão 1 de B para A e anulação da questão 41), base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-26',
    name: '26º Exame de Ordem Unificado (Tipo 1 - Branca)',
    edition: 26,
    year: 2018,
    totalQuestions: 80,
    description: 'Caderno oficial do 26º Exame da FGV (05/08/2018) Tipo 1 Branca com todas as 80 questões completas, gabarito definitivo oficial (sem anulações), base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-05',
    name: 'V Exame de Ordem Unificado (2011.2 - Tipo 1 Branca)',
    edition: 5,
    year: 2011,
    totalQuestions: 80,
    description: 'Quinto Exame de Ordem Unificado aplicado pela FGV em 30/10/2011 (Caderno Tipo 1 Branca), com as 80 questões completas, gabarito definitivo oficial (incluindo questão anulada 27), base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-04',
    name: 'IV Exame de Ordem Unificado (2011.1 - Tipo 1 Branca)',
    edition: 4,
    year: 2011,
    totalQuestions: 80,
    description: 'Quarto Exame de Ordem Unificado aplicado pela FGV em 17/07/2011 (primeiro no formato atual de 80 questões), gabarito definitivo oficial (incluindo questões anuladas 34, 64 e 79), base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-03',
    name: 'III Exame de Ordem Unificado (2010.3 - Tipo 1 Branca)',
    edition: 3,
    year: 2011,
    totalQuestions: 100,
    description: 'Terceiro Exame de Ordem Unificado aplicado pela FGV em 14/02/2011, no formato histórico com 100 questões completas (incluindo questão anulada 94), gabarito oficial, base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-02',
    name: 'II Exame de Ordem Unificado (2010.2 - Tipo 1 Branca)',
    edition: 2,
    year: 2010,
    totalQuestions: 100,
    description: 'Primeiro Exame de Ordem Unificado aplicado pela FGV (26/09/2010), no formato histórico com 100 questões completas (incluindo questão anulada 13), gabarito oficial, base legal e comentários pedagógicos.',
    isNew: true,
  },
  {
    id: 'oab-01',
    name: 'I Exame de Ordem Unificado (2010.1 - Cespe/UnB Afonso Arinos)',
    edition: 1,
    year: 2010,
    totalQuestions: 100,
    description: 'Exame de Ordem Unificado 2010.1 aplicado pelo Cespe/UnB em 13/06/2010 (Caderno Afonso Arinos), no formato histórico com 100 questões completas (incluindo questões anuladas 2, 11, 24, 31 e 33), gabarito definitivo oficial, base legal e comentários pedagógicos.',
    isNew: true,
  },
];

export const getExamQuestions = (examId: string): Question[] => {
  if (examId === 'oab-47' || examId.includes('47')) {
    return EXAM_47_FULL_QUESTIONS;
  }
  if (examId === 'oab-46' || examId.includes('46')) {
    return EXAM_46_FULL_QUESTIONS;
  }
  if (examId === 'oab-45' || examId.includes('45')) {
    return EXAM_45_FULL_QUESTIONS;
  }
  if (examId === 'oab-44' || examId.includes('44')) {
    return EXAM_44_FULL_QUESTIONS;
  }
  if (examId === 'oab-43' || examId.includes('43')) {
    return EXAM_43_FULL_QUESTIONS;
  }
  if (examId === 'oab-42' || examId.includes('42')) {
    return EXAM_42_FULL_QUESTIONS;
  }
  if (examId === 'oab-40' || examId.includes('40')) {
    return EXAM_40_FULL_QUESTIONS;
  }
  if (examId === 'oab-39' || examId.includes('39')) {
    return EXAM_39_FULL_QUESTIONS;
  }
  if (examId === 'oab-38' || examId.includes('38')) {
    return EXAM_38_FULL_QUESTIONS;
  }
  if (examId === 'oab-37' || examId.includes('37')) {
    return EXAM_37_FULL_QUESTIONS;
  }
  if (examId === 'oab-36' || examId.includes('36')) {
    return EXAM_36_FULL_QUESTIONS;
  }
  if (examId === 'oab-35' || examId.includes('35')) {
    return EXAM_35_FULL_QUESTIONS;
  }
  if (examId === 'oab-34' || examId.includes('34')) {
    return EXAM_34_FULL_QUESTIONS;
  }
  if (examId === 'oab-33' || examId.includes('33')) {
    return EXAM_33_FULL_QUESTIONS;
  }
  if (examId === 'oab-32' || examId.includes('32')) {
    return EXAM_32_FULL_QUESTIONS;
  }
  if (examId === 'oab-31' || examId.includes('31')) {
    return EXAM_31_FULL_QUESTIONS;
  }
  if (examId === 'oab-30' || examId.includes('30')) {
    return EXAM_30_FULL_QUESTIONS;
  }
  if (examId === 'oab-29' || examId.includes('29')) {
    return EXAM_29_FULL_QUESTIONS;
  }
  if (examId === 'oab-28' || examId.includes('28')) {
    return EXAM_28_FULL_QUESTIONS;
  }
  if (examId === 'oab-27' || examId.includes('27')) {
    return EXAM_27_FULL_QUESTIONS;
  }
  if (examId === 'oab-26' || examId.includes('26')) {
    return EXAM_26_FULL_QUESTIONS;
  }
  if (examId === 'oab-05' || examId.includes('2011.2') || examId.includes('2011_2')) {
    return EXAM_5_FULL_QUESTIONS;
  }
  if (examId === 'oab-04' || examId.includes('2011.1') || examId.includes('2011_1') || examId === '2011') {
    return EXAM_2011_1_FULL_QUESTIONS;
  }
  if (examId === 'oab-03' || examId.includes('2010.3') || examId.includes('2010_3')) {
    return EXAM_2010_3_FULL_QUESTIONS;
  }
  if (examId === 'oab-01' || examId.includes('2010.1') || examId.includes('2010_1')) {
    return EXAM_2010_1_FULL_QUESTIONS;
  }
  if (examId === 'oab-02' || examId.includes('2010.2') || examId.includes('2010_2') || examId.includes('2010')) {
    return EXAM_2010_2_FULL_QUESTIONS;
  }
  return FULL_MOCK_EXAM_80;
};

export const getAllQuestions = (): Question[] => {
  return [
    ...EXAM_47_FULL_QUESTIONS,
    ...EXAM_46_FULL_QUESTIONS,
    ...EXAM_45_FULL_QUESTIONS,
    ...EXAM_44_FULL_QUESTIONS,
    ...EXAM_43_FULL_QUESTIONS,
    ...EXAM_42_FULL_QUESTIONS,
    ...EXAM_40_FULL_QUESTIONS,
    ...EXAM_39_FULL_QUESTIONS,
    ...EXAM_38_FULL_QUESTIONS,
    ...EXAM_37_FULL_QUESTIONS,
    ...EXAM_36_FULL_QUESTIONS,
    ...EXAM_35_FULL_QUESTIONS,
    ...EXAM_34_FULL_QUESTIONS,
    ...EXAM_33_FULL_QUESTIONS,
    ...EXAM_32_FULL_QUESTIONS,
    ...EXAM_31_FULL_QUESTIONS,
    ...EXAM_30_FULL_QUESTIONS,
    ...EXAM_29_FULL_QUESTIONS,
    ...EXAM_28_FULL_QUESTIONS,
    ...EXAM_27_FULL_QUESTIONS,
    ...EXAM_26_FULL_QUESTIONS,
    ...EXAM_5_FULL_QUESTIONS,
    ...EXAM_2011_1_FULL_QUESTIONS,
    ...EXAM_2010_3_FULL_QUESTIONS,
    ...EXAM_2010_2_FULL_QUESTIONS,
    ...EXAM_2010_1_FULL_QUESTIONS,
    ...FULL_MOCK_EXAM_80,
  ];
};

export const getQuestionsByDisciplineUnified = (discipline: string, examId?: string): Question[] => {
  if (examId) {
    const list = getExamQuestions(examId);
    return list.filter((q) => q.discipline === discipline);
  }
  // Return from 47, 46, 45, 44, 43, 42, 40, then 41
  return getAllQuestions().filter((q) => q.discipline === discipline);
};

export const findQuestionByIdAnyExam = (id: number): Question | undefined => {
  return (
    EXAM_47_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_46_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_45_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_44_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_43_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_42_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_40_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_39_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_38_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_37_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_36_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_35_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_34_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_33_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_32_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_31_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_30_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_29_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_28_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_27_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_26_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_5_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_2011_1_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_2010_3_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_2010_2_FULL_QUESTIONS.find((q) => q.id === id) ||
    EXAM_2010_1_FULL_QUESTIONS.find((q) => q.id === id) ||
    FULL_MOCK_EXAM_80.find((q) => q.id === id)
  );
};



