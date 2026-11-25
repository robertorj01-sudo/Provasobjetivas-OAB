import { deleteField, FieldValue } from 'firebase/firestore';
import { CoverTheme, SharedQuestionSummary, UserCategory } from '../types/community';

/**
 * Limits synchronized verbatim with firebase-blueprint.json & firestore.rules
 */
export const BLUEPRINT_LIMITS = {
  idMax: 128,
  idPattern: /^[a-zA-Z0-9_\-]+$/,
  handleMin: 2,
  handleMax: 50,
  handlePattern: /^[a-zA-Z0-9._\-]+$/,
  nameMax: 100,
  avatarUrlMax: 65536,
  roleTitleMax: 160,
  bioMax: 1200,
  institutionMax: 120,
  semesterMax: 60,
  targetExamMax: 80,
  oabNumberMax: 30,
  oabUfMax: 4,
  specialtiesMax: 20,
  achievementsMax: 40,
  performanceMax: 20,
  sharedListsMax: 20,
  postTitleMax: 240,
  postContentMax: 8000,
  postTagsMax: 5,
  postCommentMax: 2500,
  questionCommentMax: 4000,
  questionReplyMax: 2000,
  notificationTextMax: 300,
  examAnswersMax: 120,
} as const;

export function truncateText(value: string | undefined | null, maxLen: number): string {
  if (!value) return '';
  const trimmed = value.trim();
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

export function sanitizeHandle(raw: string, fallbackUid?: string): string {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/^@+/, '')
    .replace(/\s+/g, '.')
    .replace(/[^a-zA-Z0-9._\-]/g, '');
  if (cleaned.length >= BLUEPRINT_LIMITS.handleMin) {
    return cleaned.slice(0, BLUEPRINT_LIMITS.handleMax);
  }
  const suffix = fallbackUid ? fallbackUid.slice(0, 8) : 'oab';
  return `jurista.${suffix}`.slice(0, BLUEPRINT_LIMITS.handleMax);
}

export function sanitizeId(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, BLUEPRINT_LIMITS.idMax);
  return cleaned || `id_${Date.now()}`;
}

export function normalizeCoverTheme(theme?: string): CoverTheme {
  if (theme === 'navy' || theme === 'slate' || theme === 'amber' || theme === 'emerald') {
    return theme;
  }
  return 'navy';
}

export function normalizeCategory(cat?: string): UserCategory {
  if (cat === 'estudante' || cat === 'examinando' || cat === 'advogado') {
    return cat;
  }
  return 'examinando';
}

export function sanitizeSharedQuestion(
  sq?: SharedQuestionSummary
): SharedQuestionSummary | undefined {
  if (!sq) return undefined;
  const out: SharedQuestionSummary = {
    questionId: Math.trunc(sq.questionId),
    number: Math.trunc(sq.number),
    discipline: truncateText(sq.discipline, 80) as SharedQuestionSummary['discipline'],
    topic: truncateText(sq.topic, 160),
    statementSnippet: truncateText(sq.statementSnippet, 500),
  };
  const origin = truncateText(sq.examOrigin, 160);
  if (origin) {
    out.examOrigin = origin;
  }
  return out;
}

export function optionalFieldValue(value: string | undefined, maxLen: number): string | FieldValue {
  const trimmed = truncateText(value, maxLen);
  return trimmed.length > 0 ? trimmed : deleteField();
}

/**
 * Compresses an uploaded image file to a lightweight <= 64KB JPEG data URI
 * suitable for storing safely in PublicProfile.avatarUrl.
 */
export function compressAvatarImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo de imagem.'));
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Formato de imagem inválido.'));
        return;
      }
      const img = new Image();
      img.onerror = () => reject(new Error('Não foi possível processar a imagem.'));
      img.onload = () => {
        const size = 160;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        let dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        if (dataUrl.length > BLUEPRINT_LIMITS.avatarUrlMax) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.55);
        }
        resolve(dataUrl.slice(0, BLUEPRINT_LIMITS.avatarUrlMax));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
