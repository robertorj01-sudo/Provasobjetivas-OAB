import { ChevronLeft, ChevronRight, LayoutGrid, CheckCircle, AlertTriangle } from 'lucide-react';

interface SimuladoControlsProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onOpenMatrix: () => void;
  onFinishSimulado: () => void;
  answeredCount: number;
  flaggedCount: number;
  isFinished: boolean;
}

export function SimuladoControls({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onOpenMatrix,
  onFinishSimulado,
  answeredCount,
  flaggedCount,
  isFinished,
}: SimuladoControlsProps) {
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mt-6">
      {/* Progress track */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
          <span>
            Progresso da Prova: <strong className="text-slate-900">{answeredCount}</strong> de {totalQuestions} respondidas
          </span>
          <span className="font-mono text-amber-700">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Button controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Previous Question */}
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {/* Center: Open Answer Sheet Matrix Drawer */}
        <button
          onClick={onOpenMatrix}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all"
        >
          <LayoutGrid className="w-4 h-4 text-amber-600" />
          <span>Cartão de Respostas (1 - {totalQuestions})</span>
          {flaggedCount > 0 && (
            <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded text-[10px] font-bold">
              {flaggedCount} rev.
            </span>
          )}
        </button>

        {/* Right side: Next or Finish */}
        <div className="flex items-center gap-2">
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <span>Próxima</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : !isFinished ? (
            <button
              onClick={onFinishSimulado}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shadow-emerald-600/20"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Entregar Prova</span>
            </button>
          ) : null}

          {!isFinished && currentIndex < totalQuestions - 1 && (
            <button
              onClick={onFinishSimulado}
              className="text-xs font-semibold text-slate-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            >
              Encerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
