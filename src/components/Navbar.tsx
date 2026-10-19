import React from 'react';
import { Scale, Clock, Pause, Play, BookOpen, History, BookmarkCheck, FileCode, RotateCcw, ZoomIn, ZoomOut, CheckCircle } from 'lucide-react';
import { SimuladoMode } from '../types/oab';

interface NavbarProps {
  activeTab: 'simulado' | 'treino' | 'historico' | 'erros' | 'arquitetura';
  setActiveTab: (tab: 'simulado' | 'treino' | 'historico' | 'erros' | 'arquitetura') => void;
  mode: SimuladoMode;
  setMode: (mode: SimuladoMode) => void;
  timeRemainingSeconds: number;
  isPaused: boolean;
  togglePause: () => void;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  setFontSize: React.Dispatch<React.SetStateAction<'sm' | 'base' | 'lg' | 'xl'>>;
  answeredCount: number;
  totalQuestions: number;
  onResetSimulado: () => void;
  isFinished: boolean;
  bookmarkedCount: number;
}

export function Navbar({
  activeTab,
  setActiveTab,
  mode,
  setMode,
  timeRemainingSeconds,
  isPaused,
  togglePause,
  fontSize,
  setFontSize,
  answeredCount,
  totalQuestions,
  onResetSimulado,
  isFinished,
  bookmarkedCount,
}: NavbarProps) {
  // Format seconds to HH:MM:SS
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const cycleFontSize = (direction: 'up' | 'down') => {
    const sizes: Array<'sm' | 'base' | 'lg' | 'xl'> = ['sm', 'base', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(fontSize);
    if (direction === 'up' && currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    } else if (direction === 'down' && currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const isLowTime = timeRemainingSeconds < 1800; // less than 30 mins

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('simulado')}>
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm shadow-amber-600/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">Simulado OAB</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  FGV Oficial
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">1ª Fase • 80 Questões • Corte: 40 Acertos</p>
            </div>
          </div>

          {/* Center: Timer & Mode indicator when in Simulado */}
          <div className="flex items-center gap-3">
            {activeTab === 'simulado' && !isFinished && (
              <>
                {/* Mode Selector Toggle */}
                <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                  <button
                    onClick={() => setMode('real')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      mode === 'real' ? 'bg-white text-amber-900 shadow-sm font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    Simulado Oficial (5h)
                  </button>
                  <button
                    onClick={() => setMode('study')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      mode === 'study' ? 'bg-white text-indigo-900 shadow-sm font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    Modo Estudo (Comentários)
                  </button>
                </div>

                {/* Official 5h Timer */}
                {mode === 'real' && (
                  <div
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-colors ${
                      isLowTime
                        ? 'bg-red-50 border-red-200 text-red-700 animate-pulse'
                        : isPaused
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-900 text-white border-slate-800'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-sm font-bold tracking-wider">{formatTime(timeRemainingSeconds)}</span>
                    <button
                      onClick={togglePause}
                      title={isPaused ? 'Continuar prova' : 'Pausar prova'}
                      className="p-1 rounded-lg hover:bg-white/20 transition-colors ml-1"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                    </button>
                  </div>
                )}

                {/* Progress Pill */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {answeredCount} / {totalQuestions}
                  </span>
                </div>
              </>
            )}

            {/* Font Scaler Controls */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => cycleFontSize('down')}
                disabled={fontSize === 'sm'}
                title="Diminuir fonte"
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 transition-all"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold font-mono px-1.5 text-slate-500 uppercase">{fontSize}</span>
              <button
                onClick={() => cycleFontSize('up')}
                disabled={fontSize === 'xl'}
                title="Aumentar fonte"
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 transition-all"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Restart Button */}
            {activeTab === 'simulado' && (
              <button
                onClick={onResetSimulado}
                title="Reiniciar simulado"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar border-t border-slate-100 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('simulado')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'simulado'
                ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Simulado Oficial (80Q)</span>
          </button>

          <button
            onClick={() => setActiveTab('treino')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'treino'
                ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Treino por Disciplina</span>
          </button>

          <button
            onClick={() => setActiveTab('historico')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'historico'
                ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Histórico FGV & Exames</span>
          </button>

          <button
            onClick={() => setActiveTab('erros')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'erros'
                ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Caderno de Revisão</span>
            {bookmarkedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                {bookmarkedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('arquitetura')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'arquitetura'
                ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Arquitetura & Instalação</span>
          </button>
        </div>
      </div>
    </header>
  );
}
