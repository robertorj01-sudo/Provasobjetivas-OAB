import { useState } from 'react';
import { X, CheckCircle, Flag, HelpCircle, Layers } from 'lucide-react';
import { Question, OptionLetter } from '../types/oab';
import { OAB_OFFICIAL_DISTRIBUTION } from '../data/oabOfficialDistributions';

interface AnswerMatrixDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<number, OptionLetter>;
  flaggedQuestions: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
  isFinished: boolean;
  onFinishSimulado: () => void;
}

export function AnswerMatrixDrawer({
  isOpen,
  onClose,
  questions,
  currentIndex,
  userAnswers,
  flaggedQuestions,
  onSelectQuestion,
  isFinished,
  onFinishSimulado,
}: AnswerMatrixDrawerProps) {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');

  if (!isOpen) return null;

  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Cartão de Respostas</h2>
            <p className="text-xs text-slate-500">Navegue pelas 80 questões da 1ª Fase OAB</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status bar & Filters */}
        <div className="p-4 bg-white border-b border-slate-200">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-center">
            <button
              onClick={() => setFilter('all')}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="text-base font-extrabold">{answeredCount}/80</div>
              <div className="text-[10px] uppercase font-semibold">Respondidas</div>
            </button>

            <button
              onClick={() => setFilter('flagged')}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                filter === 'flagged'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <div className="text-base font-extrabold">{flaggedCount}</div>
              <div className="text-[10px] uppercase font-semibold">Para Revisar</div>
            </button>

            <button
              onClick={() => setFilter('unanswered')}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                filter === 'unanswered'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <div className="text-base font-extrabold">{unansweredCount}</div>
              <div className="text-[10px] uppercase font-semibold">Restantes</div>
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-600 text-white" />
              <span>Respondida</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-400 ring-2 ring-amber-400/30" />
              <span>Marcada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
              <span>Em branco</span>
            </div>
          </div>
        </div>

        {/* Grid of questions */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {OAB_OFFICIAL_DISTRIBUTION.map((dist) => {
            const distQuestions = questions.filter(
              q => q.number >= dist.questionRange[0] && q.number <= dist.questionRange[1]
            );

            // Filter logic
            const visibleQuestions = distQuestions.filter(q => {
              const hasAnswer = Boolean(userAnswers[q.id]);
              const isFlag = Boolean(flaggedQuestions[q.id]);
              if (filter === 'unanswered') return !hasAnswer;
              if (filter === 'flagged') return isFlag;
              return true;
            });

            if (visibleQuestions.length === 0) return null;

            return (
              <div key={dist.discipline} className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-700" />
                    {dist.discipline}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Q{dist.questionRange[0]} a Q{dist.questionRange[1]}
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {distQuestions.map((q) => {
                    const qIndex = questions.findIndex(item => item.id === q.id);
                    const isCurrent = qIndex === currentIndex;
                    const ans = userAnswers[q.id];
                    const isFlag = flaggedQuestions[q.id];
                    const isCorrect = ans === q.correctOption;

                    let btnClass = 'bg-white border-slate-200 text-slate-700 hover:border-amber-400';
                    let letterBadge = ans || null;

                    if (isFinished) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                      } else if (ans) {
                        btnClass = 'bg-red-500 text-white border-red-500 font-bold';
                      } else {
                        btnClass = 'bg-slate-200 text-slate-500 border-slate-300';
                      }
                    } else if (ans) {
                      btnClass = 'bg-amber-600 text-white border-amber-600 font-bold shadow-2xs';
                    }

                    if (isCurrent) {
                      btnClass += ' ring-2 ring-slate-900 ring-offset-2';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          onSelectQuestion(qIndex);
                          onClose();
                        }}
                        className={`relative h-10 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center transition-all ${btnClass}`}
                      >
                        <span className="text-[11px] leading-none">{q.number}</span>
                        {letterBadge && (
                          <span className="text-[9px] font-mono leading-none opacity-90 mt-0.5">({letterBadge})</span>
                        )}
                        {isFlag && (
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Fechar
          </button>
          {!isFinished && (
            <button
              onClick={() => {
                onClose();
                onFinishSimulado();
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Entregar Simulado</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
