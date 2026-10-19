import { Question, RawJsonQuestion, DisciplineType, OptionLetter } from '../types/oab';

/**
 * Converts a question in the user's FGV JSON format to the application's internal Question interface
 */
export function rawJsonToQuestion(
  raw: RawJsonQuestion,
  fallbackIndex = 1,
  defaultExam = '41º Exame de Ordem Unificado (Banca FGV)'
): Question {
  const numericId = raw.id_questao ? extractNumericId(raw.id_questao) || (4100 + fallbackIndex) : fallbackIndex;

  const options: Question['options'] = (['A', 'B', 'C', 'D'] as OptionLetter[]).map((letter) => ({
    id: letter,
    text: raw.alternativas ? (raw.alternativas[letter] || '') : '',
  }));

  const commentary = raw.comentario_educativo?.analise_gabarito || '';
  const legalBasis = raw.comentario_educativo?.base_legal || '';

  return {
    id: numericId,
    id_questao: raw.id_questao || `oab_fgv_${numericId}`,
    number: fallbackIndex,
    discipline: (raw.disciplina as DisciplineType) || 'Ética Profissional',
    topic: raw.disciplina ? `Tema Prático de ${raw.disciplina}` : 'Exame de Ordem',
    statement: raw.enunciado || '',
    options,
    correctOption: raw.gabarito_correto || 'A',
    legalBasis,
    commentary,
    comentario_educativo: raw.comentario_educativo,
    difficulty: 'Média',
    examOrigin: raw.exame || defaultExam,
  };
}

/**
 * Converts an internal Question to the exact JSON structure requested by the user
 */
export function questionToRawJson(question: Question): RawJsonQuestion {
  const alternativas: Record<string, string> = {};
  for (const opt of question.options) {
    alternativas[opt.id] = opt.text;
  }

  // Derive pegadinha if not explicitly defined
  const pegadinha =
    question.comentario_educativo?.pegadinha_da_fgv ||
    derivePegadinhaFromCommentary(question);

  return {
    id_questao: question.id_questao || `oab_fgv_${question.id}`,
    exame: question.examOrigin,
    disciplina: question.discipline,
    enunciado: question.statement,
    alternativas: {
      A: alternativas['A'] || '',
      B: alternativas['B'] || '',
      C: alternativas['C'] || '',
      D: alternativas['D'] || '',
    },
    gabarito_correto: question.correctOption,
    comentario_educativo: {
      analise_gabarito: question.comentario_educativo?.analise_gabarito || question.commentary,
      base_legal: question.comentario_educativo?.base_legal || question.legalBasis,
      pegadinha_da_fgv: pegadinha,
    },
  };
}

function extractNumericId(idString: string): number | null {
  const matches = idString.match(/\d+/g);
  if (!matches) return null;
  const num = parseInt(matches.join(''), 10);
  return isNaN(num) ? null : num;
}

function derivePegadinhaFromCommentary(question: Question): string {
  // Context-aware pegadinha highlights for FGV exams
  switch (question.discipline) {
    case 'Ética Profissional':
      return 'Atenção aos distratores com vedações relativas tratadas como absolutas, confusão entre incompatibilidade e impedimento, ou limites de publicidade da advocacia.';
    case 'Direito Constitucional':
      return 'Cuidado com quóruns qualificados (3/5 vs maioria absoluta) e a pegadinha clássica de competência privativa vs concorrente da União.';
    case 'Direito Administrativo':
      return 'A banca frequentemente tenta induzir o candidato ao erro misturando os atos nulos com revogáveis ou os prazos de prescrição na Lei de Improbidade.';
    case 'Direito Civil':
      return 'Fique atento à diferença entre prescrição e decadência, e à distinção entre responsabilidade civil objetiva e subjetiva.';
    case 'Direito Penal':
      return 'Distrator comum da FGV: tentar confundir escusa absolutória com exclusão da ilicitude ou aplicar arrependimento posterior a crimes com violência.';
    case 'Direito Processual Civil':
      return 'A banca costuma explorar as hipóteses taxativas de Agravo de Instrumento (Art. 1.015 do CPC) contra decisões interlocutórias não agraváveis de imediato.';
    case 'Direito Processual Penal':
      return 'Atenção especial às regras de quebra de fiança (perda de metade do valor, e não do total) e cabimento de ANPP antes do recebimento da denúncia.';
    case 'Direito do Trabalho':
      return 'A FGV explora os limites de banco de horas (individual até 6 meses vs coletivo até 1 ano) e equiparação salarial com as novas regras da CLT.';
    default:
      return 'A FGV cria distratores plausíveis com prazos e requisitos legais invertidos para testar a memorização precisa dos artigos de lei seca e súmulas vinculantes.';
  }
}
