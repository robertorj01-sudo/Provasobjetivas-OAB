import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { FULL_MOCK_EXAM_80 } from './src/data/mockExam80.ts';
import { EXAM_47_FULL_QUESTIONS } from './src/data/exam47/exam47_full.ts';
import { getExamQuestions, getAllQuestions, AVAILABLE_EXAMS } from './src/data/examsRegistry.ts';
import { FGV_EXAMS_CATALOG } from './src/data/fgvExamsCatalog.ts';
import { OAB_OFFICIAL_DISTRIBUTION } from './src/data/oabOfficialDistributions.ts';
import { SimuladoResult, DisciplineScore, DisciplineType, OptionLetter } from './src/types/oab.ts';
import { questionToRawJson } from './src/utils/questionSchemaConverter.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Simulado OAB FGV API',
      timestamp: new Date().toISOString(),
      examsAvailable: AVAILABLE_EXAMS,
      totalQuestionsAvailable: getAllQuestions().length,
    });
  });

  // Available full exams in database
  app.get('/api/exams', (req: Request, res: Response) => {
    res.json({
      success: true,
      exams: AVAILABLE_EXAMS,
    });
  });

  // Catalog of FGV exams
  app.get('/api/catalog', (req: Request, res: Response) => {
    res.json({
      success: true,
      totalExams: FGV_EXAMS_CATALOG.length,
      banca: 'FGV - Fundação Getulio Vargas',
      exams: FGV_EXAMS_CATALOG,
    });
  });

  // Official distribution of the 80 questions
  app.get('/api/distributions', (req: Request, res: Response) => {
    res.json({
      success: true,
      totalQuestions: 80,
      distribution: OAB_OFFICIAL_DISTRIBUTION,
    });
  });

  // Get questions with optional filters (discipline, exam, search)
  app.get('/api/questions', (req: Request, res: Response) => {
    const discipline = req.query.discipline as string | undefined;
    const search = req.query.search as string | undefined;
    const exam = req.query.exam as string | undefined;

    let source = getAllQuestions();
    if (exam && exam !== 'all') {
      if (exam === 'oab-47' || exam.includes('47')) {
        source = EXAM_47_FULL_QUESTIONS;
      } else if (exam === 'oab-41' || exam.includes('41')) {
        source = FULL_MOCK_EXAM_80;
      } else {
        source = source.filter(q => q.examOrigin.toLowerCase().includes(exam.toLowerCase()));
      }
    }

    let filtered = [...source];

    if (discipline && discipline !== 'all') {
      filtered = filtered.filter(q => q.discipline.toLowerCase() === discipline.toLowerCase());
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        q =>
          q.statement.toLowerCase().includes(s) ||
          q.topic.toLowerCase().includes(s) ||
          q.legalBasis.toLowerCase().includes(s) ||
          q.commentary.toLowerCase().includes(s)
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      questions: filtered,
    });
  });

  // Get single question in the official FGV JSON schema format
  app.get('/api/questions/:id/raw-json', (req: Request, res: Response) => {
    const idParam = req.params.id;
    const numericId = Number(idParam);
    const question = getAllQuestions().find(
      q => q.id === numericId || q.id_questao === idParam
    );

    if (!question) {
      return res.status(404).json({ success: false, error: 'Questão não encontrada no banco.' });
    }

    res.json({
      success: true,
      data: questionToRawJson(question),
    });
  });

  // Evaluate answers and return diagnostic report
  app.post('/api/simulado/submit', (req: Request, res: Response) => {
    const { userAnswers, timeSpentSeconds, examId } = req.body as {
      userAnswers: Record<number, OptionLetter>;
      timeSpentSeconds: number;
      examId?: string;
    };

    const targetQuestions = examId ? getExamQuestions(examId) : (
      Object.keys(userAnswers || {}).some(k => Number(k) >= 4700) ? EXAM_47_FULL_QUESTIONS : FULL_MOCK_EXAM_80
    );

    const answers = userAnswers || {};
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    // Grouping by discipline
    const disciplineMap = new Map<DisciplineType, { total: number; correct: number; wrong: number; unanswered: number }>();

    for (const dist of OAB_OFFICIAL_DISTRIBUTION) {
      disciplineMap.set(dist.discipline, { total: 0, correct: 0, wrong: 0, unanswered: 0 });
    }

    for (const q of targetQuestions) {
      const stats = disciplineMap.get(q.discipline) || { total: 0, correct: 0, wrong: 0, unanswered: 0 };
      stats.total += 1;

      const userChoice = answers[q.id];
      if (!userChoice) {
        unansweredCount += 1;
        stats.unanswered += 1;
      } else if (userChoice === q.correctOption) {
        correctCount += 1;
        stats.correct += 1;
      } else {
        wrongCount += 1;
        stats.wrong += 1;
      }
      disciplineMap.set(q.discipline, stats);
    }

    const disciplineScores: DisciplineScore[] = [];
    disciplineMap.forEach((val, key) => {
      disciplineScores.push({
        discipline: key,
        total: val.total,
        correct: val.correct,
        wrong: val.wrong,
        unanswered: val.unanswered,
        percentage: val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0,
      });
    });

    const isApproved = correctCount >= 40; // OAB official 50% cutoff
    const scorePercentage = Math.round((correctCount / 80) * 100);

    const sortedByPerc = [...disciplineScores].sort((a, b) => b.percentage - a.percentage);
    const strongestDisciplines = sortedByPerc.slice(0, 3).map(d => d.discipline);
    const weakestDisciplines = sortedByPerc.slice(-3).reverse().map(d => d.discipline);

    const result: SimuladoResult = {
      totalQuestions: targetQuestions.length,
      answeredCount: targetQuestions.length - unansweredCount,
      correctCount,
      wrongCount,
      unansweredCount,
      scorePercentage,
      isApproved,
      timeSpentSeconds: timeSpentSeconds || 0,
      disciplineScores,
      strongestDisciplines,
      weakestDisciplines,
    };

    res.json({
      success: true,
      result,
    });
  });

  // Architectural documentation and PostgreSQL schemas (Required deliverable)
  app.get('/api/docs/architecture', (req: Request, res: Response) => {
    res.json({
      title: 'Arquitetura do Sistema de Simulados OAB FGV',
      backendStack: 'Node.js, Express, TypeScript, PostgreSQL (ou NoSQL), RESTful JSON API',
      frontendStack: 'React 19, TypeScript, Tailwind CSS, Motion, Lucide Icons',
      databaseSchema: {
        tables: ['disciplinas', 'provas_fgv', 'questoes', 'alternativas', 'simulados_usuarios', 'respostas_usuario'],
      },
    });
  });

  // Vite middleware for development vs. static dist for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Simulado OAB FGV Server running on http://localhost:${PORT}`);
  });
}

startServer();
