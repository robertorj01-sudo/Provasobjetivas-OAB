import { useState } from 'react';
import { BookmarkCheck, Bookmark, Trash2, BookOpen, AlertTriangle } from 'lucide-react';
import { Question, OptionLetter } from '../types/oab';
import { QuestionCard } from './QuestionCard';

interface ErrorNotebookViewProps {
  questions: Question[];
  bookmarkedQuestions: Record<number, boolean>;
  onToggleBookmark: (id: number) => void;
  userAnswers: Record<number, OptionLetter>;
  onAnswerQuestion: (questionId: number, option: OptionLetter) => void;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

export function ErrorNotebookView({
  questions,
  bookmarkedQuestions,
  onToggleBookmark,
  userAnswers,
  onAnswerQuestion,
  fontSize,
}: ErrorNotebookViewProps) {
  const [filter, setFilter] = useState<'all' | 'bookmarked' | 'wrong'>('all');

  // Bookmarked and wrong questions
  const bookmarkedList = questions.filter(q => Boolean(bookmarkedQuestions[q.id]));
  const wrongList = questions.filter(q => {
    const ans = userAnswers[q.id];
    return ans && ans !== q.correctOption;
  });

  const displayedList = filter === 'bookmarked'
    ? bookmarkedList
    : filter === 'wrong'
    ? wrongList
    : Array.from(new Set([...bookmarkedList, ...wrongList]));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center gap-2.5 text-amber-700 mb-2">
          <BookmarkCheck className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Revisão Ativa & Repetição Espaçada</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Caderno de Erros & Questões Salvas
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
          O método mais consagrado para a aprovação na 1ª Fase da OAB é o estudo reverso por meio do caderno de erros.
          Aqui você revisa as questões que errou em seus simulados e as que salvou para fixação legislativa.
        </p>

        {/* Filter buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todas as Questões ({displayedList.length})
          </button>
          <button
            onClick={() => setFilter('wrong')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'wrong'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-900 hover:bg-red-100 border border-red-200'
            }`}
          >
            Erros nos Simulados ({wrongList.length})
          </button>
          <button
            onClick={() => setFilter('bookmarked')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'bookmarked'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            Marcadas como Favoritas ({bookmarkedList.length})
          </button>
        </div>
      </div>

      {/* List of questions */}
      {displayedList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="font-bold text-slate-800 text-base">Seu caderno está vazio no momento</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Conforme você resolve o simulado e comete erros ou clica no ícone de marcador, as questões aparecerão aqui automaticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedList.map((q) => (
            <div key={q.id}>
              <QuestionCard
                question={q}
                selectedOption={userAnswers[q.id]}
                onSelectOption={(opt) => onAnswerQuestion(q.id, opt)}
                isFlagged={false}
                onToggleFlag={() => {}}
                isBookmarked={Boolean(bookmarkedQuestions[q.id])}
                onToggleBookmark={() => onToggleBookmark(q.id)}
                mode="study"
                isExamFinished={false}
                fontSize={fontSize}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
