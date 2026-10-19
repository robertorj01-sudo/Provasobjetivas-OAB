import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { QuestionCard } from './components/QuestionCard';
import { SimuladoControls } from './components/SimuladoControls';
import { AnswerMatrixDrawer } from './components/AnswerMatrixDrawer';
import { ResultDashboard } from './components/ResultDashboard';
import { ExamCatalogView } from './components/ExamCatalogView';
import { DisciplinePickerView } from './components/DisciplinePickerView';
import { ErrorNotebookView } from './components/ErrorNotebookView';
import { ArchitectureDocsView } from './components/ArchitectureDocsView';
import { FULL_MOCK_EXAM_80 } from './data/mockExam80';
import { EXAM_47_FULL_QUESTIONS } from './data/exam47/exam47_full';
import { getExamQuestions, getAllQuestions, AVAILABLE_EXAMS } from './data/examsRegistry';
import { Question, OptionLetter, SimuladoMode, SimuladoResult, DisciplineType } from './types/oab';
import { apiService } from './services/api';
import { AlertTriangle, CheckCircle, HelpCircle, Layers, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulado' | 'treino' | 'historico' | 'erros' | 'arquitetura'>('simulado');
  const [mode, setMode] = useState<SimuladoMode>('real');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');

  // Active Exam and Questions State (Default to Exam 47)
  const [activeExamId, setActiveExamId] = useState<string>('oab-47');
  const [examTitle, setExamTitle] = useState('47º Exame de Ordem Unificado (Tipo 1 - Branca)');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(EXAM_47_FULL_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User answers and flags (with localStorage persistence)
  const [userAnswers, setUserAnswers] = useState<Record<number, OptionLetter>>(() => {
    try {
      const saved = localStorage.getItem('oab_user_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('oab_flagged_questions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('oab_bookmarked_questions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5 Hours Countdown Timer (5 * 3600 = 18000s)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(18000);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<SimuladoResult | null>(null);

  // UI Drawers & Modals
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [isFinishConfirmOpen, setIsFinishConfirmOpen] = useState(false);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('oab_user_answers', JSON.stringify(userAnswers));
    } catch {}
  }, [userAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('oab_flagged_questions', JSON.stringify(flaggedQuestions));
    } catch {}
  }, [flaggedQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem('oab_bookmarked_questions', JSON.stringify(bookmarkedQuestions));
    } catch {}
  }, [bookmarkedQuestions]);

  // Timer countdown in 'real' mode
  useEffect(() => {
    if (mode !== 'real' || isFinished || isPaused) return;

    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, isFinished, isPaused]);

  // Answer handler
  const handleSelectOption = (option: OptionLetter) => {
    const questionId = activeQuestions[currentIndex]?.id;
    if (!questionId) return;

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Toggle flag for review
  const handleToggleFlag = () => {
    const questionId = activeQuestions[currentIndex]?.id;
    if (!questionId) return;

    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Toggle bookmark
  const handleToggleBookmark = (id?: number) => {
    const targetId = id || activeQuestions[currentIndex]?.id;
    if (!targetId) return;

    setBookmarkedQuestions((prev) => ({
      ...prev,
      [targetId]: !prev[targetId],
    }));
  };

  // Finish exam and compute score
  const handleFinishExam = async () => {
    setIsFinishConfirmOpen(false);
    setIsFinished(true);

    const timeSpent = 18000 - timeRemainingSeconds;
    const computedResult = await apiService.submitSimulado(userAnswers, timeSpent, activeExamId, activeQuestions);
    setResult(computedResult);
  };

  // Switch active full exam directly
  const handleSwitchExam = (examId: string) => {
    setActiveExamId(examId);
    if (examId === 'oab-47') {
      setExamTitle('47º Exame de Ordem Unificado (Tipo 1 - Branca)');
    } else if (examId === 'oab-46') {
      setExamTitle('46º Exame de Ordem Unificado (Tipo 1 - Branca)');
    } else if (examId === 'oab-45') {
      setExamTitle('45º Exame de Ordem Unificado (Tipo 1 - Branca)');
    } else {
      setExamTitle('41º Exame de Ordem Unificado (Banca FGV)');
    }
    setActiveQuestions(getExamQuestions(examId));
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeRemainingSeconds(18000);
    setIsPaused(false);
    setIsFinished(false);
    setResult(null);
  };

  // Reset exam
  const handleResetExam = () => {
    if (window.confirm('Tem certeza de que deseja reiniciar o simulado? Suas respostas atuais serão limpas.')) {
      setUserAnswers({});
      setFlaggedQuestions({});
      setTimeRemainingSeconds(18000);
      setIsPaused(false);
      setIsFinished(false);
      setResult(null);
      setCurrentIndex(0);
    }
  };

  // Start specific exam from catalog
  const handleStartExamFromCatalog = (examName: string, examId?: string) => {
    const resolvedId =
      examId ||
      (examName.includes('47')
        ? 'oab-47'
        : examName.includes('46')
        ? 'oab-46'
        : examName.includes('45')
        ? 'oab-45'
        : 'oab-41');
    setActiveExamId(resolvedId);
    setExamTitle(examName);
    setActiveQuestions(getExamQuestions(resolvedId));
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeRemainingSeconds(18000);
    setIsPaused(false);
    setIsFinished(false);
    setResult(null);
    setActiveTab('simulado');
  };

  // Practice isolated discipline across the unified bank
  const handleSelectDiscipline = (discipline: DisciplineType) => {
    const filtered = getAllQuestions().filter((q) => q.discipline === discipline);
    if (filtered.length > 0) {
      setExamTitle(`Treino Direcionado: ${discipline} (Banco Unificado)`);
      setActiveQuestions(filtered);
      setCurrentIndex(0);
      setMode('study'); // Study mode for isolated discipline training
      setActiveTab('simulado');
    }
  };

  // Update question dynamically (e.g. from JSON import)
  const handleUpdateQuestion = (updated: Question) => {
    setActiveQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' && currentIndex < activeQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (['a', 'A', '1'].includes(e.key)) {
        handleSelectOption('A');
      } else if (['b', 'B', '2'].includes(e.key)) {
        handleSelectOption('B');
      } else if (['c', 'C', '3'].includes(e.key)) {
        handleSelectOption('C');
      } else if (['d', 'D', '4'].includes(e.key)) {
        handleSelectOption('D');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activeQuestions.length, isFinished]);

  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const bookmarkedCount = Object.values(bookmarkedQuestions).filter(Boolean).length;
  const currentQuestion = activeQuestions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mode={mode}
        setMode={setMode}
        timeRemainingSeconds={timeRemainingSeconds}
        isPaused={isPaused}
        togglePause={() => setIsPaused(!isPaused)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        answeredCount={answeredCount}
        totalQuestions={activeQuestions.length}
        onResetSimulado={handleResetExam}
        isFinished={isFinished}
        bookmarkedCount={bookmarkedCount}
      />

      {/* Main Content by Tab */}
      <main className="flex-1 pb-16">
        {/* Tab 1: Simulado Principal (80 Questoes) */}
        {activeTab === 'simulado' && (
          <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
            {/* Exam sub-header */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-extrabold uppercase tracking-wider">
                      {activeQuestions.length === 80 ? 'Caderno Oficial 80 Questões' : 'Treino Filtrado'}
                    </span>
                    {(activeExamId === 'oab-47' || activeExamId === 'oab-46' || activeExamId === 'oab-45') && activeQuestions.length === 80 && (
                      <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                        {activeExamId === 'oab-47' ? 'EXAME 47 OFICIAL' : activeExamId === 'oab-46' ? 'EXAME 46 OFICIAL' : 'EXAME 45 OFICIAL'}
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {examTitle}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Banca FGV • 80 Questões com 4 Alternativas (A, B, C, D) • Corte: 40 Acertos (50%)
                  </p>
                </div>

                {activeQuestions.length !== 80 ? (
                  <button
                    onClick={() => handleSwitchExam('oab-47')}
                    className="self-start sm:self-auto text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    Voltar para Simulado Completo (80Q)
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => handleSwitchExam('oab-47')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeExamId === 'oab-47'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      47º Exame
                    </button>
                    <button
                      onClick={() => handleSwitchExam('oab-46')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeExamId === 'oab-46'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      46º Exame
                    </button>
                    <button
                      onClick={() => handleSwitchExam('oab-45')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeExamId === 'oab-45'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      45º Exame
                    </button>
                    <button
                      onClick={() => handleSwitchExam('oab-41')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeExamId === 'oab-41'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      41º Exame
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* If finished, show ResultDashboard */}
            {isFinished && result ? (
              <ResultDashboard
                result={result}
                questions={activeQuestions}
                userAnswers={userAnswers}
                flaggedQuestions={flaggedQuestions}
                onRetake={() => {
                  setIsFinished(false);
                  setResult(null);
                  setUserAnswers({});
                  setFlaggedQuestions({});
                  setTimeRemainingSeconds(18000);
                  setCurrentIndex(0);
                }}
                onBookmarkQuestion={handleToggleBookmark}
                bookmarkedQuestions={bookmarkedQuestions}
              />
            ) : currentQuestion ? (
              <>
                {/* Active Question Card */}
                <QuestionCard
                  question={currentQuestion}
                  selectedOption={userAnswers[currentQuestion.id]}
                  onSelectOption={handleSelectOption}
                  isFlagged={Boolean(flaggedQuestions[currentQuestion.id])}
                  onToggleFlag={handleToggleFlag}
                  isBookmarked={Boolean(bookmarkedQuestions[currentQuestion.id])}
                  onToggleBookmark={() => handleToggleBookmark()}
                  mode={mode}
                  isExamFinished={isFinished}
                  fontSize={fontSize}
                  questionNumberOverride={currentQuestion.number}
                  onUpdateQuestion={handleUpdateQuestion}
                />

                {/* Controls Bar */}
                <SimuladoControls
                  currentIndex={currentIndex}
                  totalQuestions={activeQuestions.length}
                  onPrevious={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  onNext={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                  onOpenMatrix={() => setIsMatrixOpen(true)}
                  onFinishSimulado={() => setIsFinishConfirmOpen(true)}
                  answeredCount={answeredCount}
                  flaggedCount={flaggedCount}
                  isFinished={isFinished}
                />
              </>
            ) : null}
          </div>
        )}

        {/* Tab 2: Treino por Disciplina */}
        {activeTab === 'treino' && (
          <DisciplinePickerView onSelectDiscipline={handleSelectDiscipline} />
        )}

        {/* Tab 3: Histórico FGV (2010 a 2024) */}
        {activeTab === 'historico' && (
          <ExamCatalogView onStartExam={handleStartExamFromCatalog} />
        )}

        {/* Tab 4: Caderno de Erros */}
        {activeTab === 'erros' && (
          <ErrorNotebookView
            questions={getAllQuestions()}
            bookmarkedQuestions={bookmarkedQuestions}
            onToggleBookmark={handleToggleBookmark}
            userAnswers={userAnswers}
            onAnswerQuestion={(qId, opt) => {
              setUserAnswers((prev) => ({ ...prev, [qId]: opt }));
            }}
            fontSize={fontSize}
          />
        )}

        {/* Tab 5: Arquitetura e Instalação */}
        {activeTab === 'arquitetura' && <ArchitectureDocsView />}
      </main>

      {/* Answer Matrix Drawer (1 to 80) */}
      <AnswerMatrixDrawer
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        questions={activeQuestions}
        currentIndex={currentIndex}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
        isFinished={isFinished}
        onFinishSimulado={() => setIsFinishConfirmOpen(true)}
      />

      {/* Finish Confirmation Modal */}
      {isFinishConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">Entregar Simulado da OAB?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Você respondeu <strong className="text-slate-900">{answeredCount}</strong> de {activeQuestions.length} questões.
              {activeQuestions.length - answeredCount > 0 && (
                <span className="text-rose-600 block mt-1 font-semibold">
                  Atenção: Existem {activeQuestions.length - answeredCount} questão(ões) em branco!
                </span>
              )}
              {flaggedCount > 0 && (
                <span className="text-amber-700 block mt-0.5">
                  Existem {flaggedCount} questão(ões) marcadas para revisão pendente.
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsFinishConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Voltar à Prova
              </button>
              <button
                onClick={handleFinishExam}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm shadow-emerald-600/20"
              >
                Sim, Entregar e Corrigir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
