import { Question, ExamMetadata, DisciplineDistribution, SimuladoResult, OptionLetter } from '../types/oab';
import { FULL_MOCK_EXAM_80 } from '../data/mockExam80';
import { EXAM_47_FULL_QUESTIONS } from '../data/exam47/exam47_full';
import { getExamQuestions, getAllQuestions, AVAILABLE_EXAMS, AvailableExamInfo } from '../data/examsRegistry';
import { FGV_EXAMS_CATALOG } from '../data/fgvExamsCatalog';
import { OAB_OFFICIAL_DISTRIBUTION } from '../data/oabOfficialDistributions';

export const apiService = {
  getAvailableExams(): AvailableExamInfo[] {
    return AVAILABLE_EXAMS;
  },

  async getCatalog(): Promise<ExamMetadata[]> {
    try {
      const res = await fetch('/api/catalog');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.exams;
    } catch {
      return FGV_EXAMS_CATALOG;
    }
  },

  async getDistributions(): Promise<DisciplineDistribution[]> {
    try {
      const res = await fetch('/api/distributions');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.distribution;
    } catch {
      return OAB_OFFICIAL_DISTRIBUTION;
    }
  },

  async getQuestions(filter?: { discipline?: string; search?: string; exam?: string }): Promise<Question[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.discipline && filter.discipline !== 'all') params.append('discipline', filter.discipline);
      if (filter?.search) params.append('search', filter.search);
      if (filter?.exam && filter.exam !== 'all') params.append('exam', filter.exam);

      const res = await fetch(`/api/questions?${params.toString()}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.questions;
    } catch {
      let questions = getAllQuestions();
      if (filter?.exam && filter.exam !== 'all') {
        if (filter.exam === 'oab-47' || filter.exam.includes('47')) {
          questions = [...EXAM_47_FULL_QUESTIONS];
        } else if (filter.exam === 'oab-41' || filter.exam.includes('41')) {
          questions = [...FULL_MOCK_EXAM_80];
        }
      }
      if (filter?.discipline && filter.discipline !== 'all') {
        questions = questions.filter(q => q.discipline.toLowerCase() === filter.discipline?.toLowerCase());
      }
      if (filter?.search) {
        const s = filter.search.toLowerCase();
        questions = questions.filter(
          q =>
            q.statement.toLowerCase().includes(s) ||
            q.topic.toLowerCase().includes(s) ||
            q.legalBasis.toLowerCase().includes(s) ||
            q.commentary.toLowerCase().includes(s)
        );
      }
      return questions;
    }
  },

  async submitSimulado(
    userAnswers: Record<number, OptionLetter>,
    timeSpentSeconds: number,
    examId?: string,
    activeQuestions?: Question[]
  ): Promise<SimuladoResult> {
    try {
      const res = await fetch('/api/simulado/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswers, timeSpentSeconds, examId }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.result;
    } catch {
      // Local client evaluation fallback
      const targetQuestions = activeQuestions || (
        examId ? getExamQuestions(examId) : (
          Object.keys(userAnswers || {}).some(k => Number(k) >= 4700) ? EXAM_47_FULL_QUESTIONS : FULL_MOCK_EXAM_80
        )
      );

      const disciplineMap = new Map<
        Question['discipline'],
        { total: number; correct: number; wrong: number; unanswered: number }
      >();

      for (const dist of OAB_OFFICIAL_DISTRIBUTION) {
        disciplineMap.set(dist.discipline, { total: 0, correct: 0, wrong: 0, unanswered: 0 });
      }

      let correct = 0;
      let wrong = 0;
      let unanswered = 0;

      for (const q of targetQuestions) {
        const stats = disciplineMap.get(q.discipline) || { total: 0, correct: 0, wrong: 0, unanswered: 0 };
        stats.total += 1;

        const ans = userAnswers[q.id];
        if (!ans) {
          stats.unanswered += 1;
          unanswered++;
        } else if (ans === q.correctOption) {
          stats.correct += 1;
          correct++;
        } else {
          stats.wrong += 1;
          wrong++;
        }
        disciplineMap.set(q.discipline, stats);
      }

      const disciplineScores = Array.from(disciplineMap.entries())
        .filter(([, val]) => val.total > 0)
        .map(([discipline, val]) => ({
          discipline,
          total: val.total,
          correct: val.correct,
          wrong: val.wrong,
          unanswered: val.unanswered,
          percentage: Math.round((val.correct / val.total) * 100),
        }));

      const sortedDesc = [...disciplineScores].sort((a, b) =>
        b.percentage !== a.percentage ? b.percentage - a.percentage : b.correct - a.correct
      );
      const sortedAsc = [...disciplineScores].sort((a, b) =>
        a.percentage !== b.percentage ? a.percentage - b.percentage : (b.wrong + b.unanswered) - (a.wrong + a.unanswered)
      );

      const denominator = targetQuestions.length || 80;

      return {
        totalQuestions: targetQuestions.length,
        answeredCount: targetQuestions.length - unanswered,
        correctCount: correct,
        wrongCount: wrong,
        unansweredCount: unanswered,
        scorePercentage: Math.round((correct / denominator) * 100),
        isApproved: correct >= 40,
        timeSpentSeconds,
        disciplineScores,
        strongestDisciplines: sortedDesc.slice(0, 3).map(s => s.discipline),
        weakestDisciplines: sortedAsc.slice(0, 3).map(s => s.discipline),
      };
    }
  },
};
