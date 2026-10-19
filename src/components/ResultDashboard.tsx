import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, AlertCircle, CheckCircle2, XCircle, Clock, RotateCcw, Filter, ChevronRight, BarChart2 } from 'lucide-react';
import { SimuladoResult, Question, OptionLetter } from '../types/oab';
import { QuestionCard } from './QuestionCard';

interface ResultDashboardProps {
  result: SimuladoResult;
  questions: Question[];
  userAnswers: Record<number, OptionLetter>;
  flaggedQuestions: Record<number, boolean>;
  onRetake: () => void;
  onBookmarkQuestion: (id: number) => void;
  bookmarkedQuestions: Record<number, boolean>;
}

export function ResultDashboard({
  result,
  questions,
  userAnswers,
  flaggedQuestions,
  onRetake,
  onBookmarkQuestion,
  bookmarkedQuestions,
}: ResultDashboardProps) {
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'flagged'>('wrong');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

  // Trigger celebratory confetti on pass (>= 40 acertos)
  useEffect(() => {
    if (result.isApproved) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback if canvas is restricted
      }
    }
  }, [result.isApproved]);

  const formatSeconds = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  // Filter questions for the review list
  const filteredQuestions = questions.filter((q) => {
    const ans = userAnswers[q.id];
    const isCorrect = ans === q.correctOption;
    const isFlag = Boolean(flaggedQuestions[q.id]);

    if (reviewFilter === 'wrong') return !ans || !isCorrect;
    if (reviewFilter === 'correct') return isCorrect;
    if (reviewFilter === 'flagged') return isFlag;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 1. Approval / Result Hero Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-10 border shadow-sm mb-8 text-center transition-all ${
          result.isApproved
            ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-50/30 border-emerald-300'
            : 'bg-gradient-to-b from-amber-50 via-white to-amber-50/30 border-amber-300'
        }`}
      >
        <div className="inline-flex p-4 rounded-2xl mb-4 shadow-sm bg-white border border-slate-100">
          {result.isApproved ? (
            <Award className="w-12 h-12 text-emerald-600 animate-bounce" />
          ) : (
            <AlertCircle className="w-12 h-12 text-amber-600" />
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {result.isApproved ? 'APROVADO NA 1ª FASE DA OAB!' : 'QUASE LÁ! CONTINUE TREINANDO'}
        </h1>

        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {result.isApproved
            ? `Excelente resultado! Você atingiu ${result.correctCount} acertos, superando a nota de corte oficial da banca FGV (40 acertos de 80 questões). Você estaria apto para a 2ª Fase!`
            : `Você atingiu ${result.correctCount} de 80 pontos (${result.scorePercentage}%). Para a aprovação oficial da OAB/FGV são necessários 40 acertos (50%). Faltaram ${
                40 - result.correctCount
              } acerto(s). Analise as matérias abaixo e fortaleça os pontos fracos.`}
        </p>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {result.correctCount} <span className="text-sm font-medium text-slate-400">/ 80</span>
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-1">Acertos ({result.scorePercentage}%)</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{result.wrongCount}</div>
            <div className="text-xs font-semibold text-red-600 mt-1">Erros</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{result.unansweredCount}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Em branco</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <Clock className="w-5 h-5 text-amber-600" />
              <span className="text-lg sm:text-xl font-mono">{formatSeconds(result.timeSpentSeconds)}</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Tempo Gasto</div>
          </div>
        </div>

        {/* Retake Simulado Button */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={onRetake}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer este Simulado</span>
          </button>
        </div>
      </div>

      {/* 2. Performance por Disciplina (Diagnóstico Oficial) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <BarChart2 className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Desempenho por Disciplina no Exame
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">19 Disciplinas Oficiais</span>
        </div>

        {/* Highlights: Best & Worst */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-1">
              Seus Melhores Desempenhos:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {result.strongestDisciplines.map((d) => (
                <span key={d} className="px-2.5 py-1 bg-white text-emerald-800 font-bold text-xs rounded-lg shadow-2xs border border-emerald-100">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-1">
              Disciplinas para Reforço Crítico:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {result.weakestDisciplines.map((d) => (
                <span key={d} className="px-2.5 py-1 bg-white text-rose-800 font-bold text-xs rounded-lg shadow-2xs border border-rose-100">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Discipline Breakdown Bars */}
        <div className="space-y-3">
          {result.disciplineScores.map((score) => {
            const isHigh = score.percentage >= 60;
            const isMid = score.percentage >= 40 && score.percentage < 60;
            return (
              <div key={score.discipline} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="sm:w-1/3">
                  <span className="font-bold text-slate-900 text-sm">{score.discipline}</span>
                  <div className="text-xs text-slate-500">
                    {score.correct} acerto(s) de {score.total} questões
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-3">
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh ? 'bg-emerald-600' : isMid ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${score.percentage}%` }}
                    />
                  </div>
                  <span
                    className={`font-mono text-xs font-bold w-12 text-right ${
                      isHigh ? 'text-emerald-700' : isMid ? 'text-amber-700' : 'text-rose-700'
                    }`}
                  >
                    {score.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Caderno de Questões / Revisão do Gabarito */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Revisão de Questões & Gabarito Comentado
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clique em qualquer questão para abrir o gabarito completo fundamentado com base legal.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                reviewFilter === 'wrong' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Erros ({result.wrongCount + result.unansweredCount})
            </button>
            <button
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                reviewFilter === 'correct' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acertos ({result.correctCount})
            </button>
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                reviewFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas (80)
            </button>
          </div>
        </div>

        {/* Selected single question inspection card if chosen */}
        {selectedQuestionIndex !== null && (
          <div className="mb-8 p-1 bg-amber-50 rounded-2xl border border-amber-300">
            <div className="p-3 flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                Inspecionando Questão {questions[selectedQuestionIndex].number}
              </span>
              <button
                onClick={() => setSelectedQuestionIndex(null)}
                className="text-xs font-bold text-amber-800 hover:underline"
              >
                Voltar para Lista
              </button>
            </div>
            <QuestionCard
              question={questions[selectedQuestionIndex]}
              selectedOption={userAnswers[questions[selectedQuestionIndex].id]}
              onSelectOption={() => {}}
              isFlagged={Boolean(flaggedQuestions[questions[selectedQuestionIndex].id])}
              onToggleFlag={() => {}}
              isBookmarked={Boolean(bookmarkedQuestions[questions[selectedQuestionIndex].id])}
              onToggleBookmark={() => onBookmarkQuestion(questions[selectedQuestionIndex].id)}
              mode="real"
              isExamFinished={true}
              fontSize="base"
            />
          </div>
        )}

        {/* List of questions to review */}
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
          {filteredQuestions.map((q) => {
            const originalIndex = questions.findIndex(item => item.id === q.id);
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctOption;

            return (
              <div
                key={q.id}
                onClick={() => setSelectedQuestionIndex(originalIndex)}
                className="py-3.5 px-2 sm:px-4 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : userChoice
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {q.number}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{q.discipline}</span>
                      <span className="text-[11px] text-slate-500 truncate hidden sm:inline">{q.topic}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{q.statement}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right text-xs">
                    <span className="font-semibold text-slate-400">Sua: </span>
                    <strong className={isCorrect ? 'text-emerald-700' : 'text-red-600'}>
                      {userChoice || 'Em branco'}
                    </strong>
                    <span className="text-slate-400 mx-1">|</span>
                    <span className="font-semibold text-slate-400">Gabarito: </span>
                    <strong className="text-slate-900">{q.correctOption}</strong>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
