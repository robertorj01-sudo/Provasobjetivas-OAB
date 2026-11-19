import React, { useState, useRef, useEffect } from 'react';
import {
  Scale,
  Clock,
  Pause,
  Play,
  BookOpen,
  History,
  BookmarkCheck,
  FileCode,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  CheckCircle,
  Users,
  Bell,
  User,
  Edit3,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import { SimuladoMode } from '../types/oab';
import { JurisTantumLogo } from './JurisTantumLogo';
import { useCommunity } from '../context/CommunityContext';
import { UserAvatar, CategoryBadge } from './UserIdentity';
import { formatRelativeDate } from '../utils/legalTextFormatter';

export type MainTabId =
  | 'simulado'
  | 'treino'
  | 'historico'
  | 'erros'
  | 'comunidade'
  | 'arquitetura';

interface NavbarProps {
  activeTab: MainTabId;
  setActiveTab: (tab: MainTabId) => void;
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
  onOpenQuestion?: (questionId: number) => void;
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
  onOpenQuestion,
}: NavbarProps) {
  const {
    currentUser,
    notifications,
    unreadNotificationsCount,
    getProfileById,
    openProfile,
    openEditProfile,
    markAllNotificationsRead,
    markNotificationRead,
    feedPosts,
  } = useCommunity();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo / Brand */}
          <button
            type="button"
            onClick={() => setActiveTab('simulado')}
            aria-label="Juris Tantum — Ir para o simulado principal"
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-xl shrink-0 cursor-pointer"
          >
            <JurisTantumLogo variant="horizontal" size="md" showTagline={true} />
          </button>

          {/* Right: Simulado Controls + User Profile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0" ref={menuContainerRef}>
            {activeTab === 'simulado' && !isFinished && (
              <>
                {/* Mode Selector Toggle */}
                <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                  <button
                    onClick={() => setMode('real')}
                    className={`px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      mode === 'real' ? 'bg-white text-amber-900 shadow-sm font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    Simulado Oficial (5h)
                  </button>
                  <button
                    onClick={() => setMode('study')}
                    className={`px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      mode === 'study' ? 'bg-white text-indigo-900 shadow-sm font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    Modo Estudo (Comentários)
                  </button>
                </div>

                {/* Official 5h Timer */}
                {mode === 'real' && (
                  <div
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border transition-colors ${
                      isLowTime
                        ? 'bg-red-50 border-red-200 text-red-700 animate-pulse'
                        : isPaused
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-900 text-white border-slate-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-wider tabular-nums">
                      {formatTime(timeRemainingSeconds)}
                    </span>
                    <button
                      onClick={togglePause}
                      title={isPaused ? 'Continuar prova' : 'Pausar prova'}
                      className="p-0.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                    </button>
                  </div>
                )}

                {/* Progress Pill */}
                <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-slate-100 text-slate-700 rounded-xl tabular-nums">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {answeredCount} / {totalQuestions}
                  </span>
                </div>
              </>
            )}

            {/* Font Scaler Controls */}
            <div className="hidden sm:flex items-center gap-0.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => cycleFontSize('down')}
                disabled={fontSize === 'sm'}
                title="Diminuir fonte"
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 transition-all cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-bold font-mono px-1 text-slate-500 uppercase">{fontSize}</span>
              <button
                onClick={() => cycleFontSize('up')}
                disabled={fontSize === 'xl'}
                title="Aumentar fonte"
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 transition-all cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Restart Button */}
            {activeTab === 'simulado' && (
              <button
                onClick={onResetSimulado}
                title="Reiniciar simulado"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileMenuOpen(false);
                }}
                aria-label="Notificações da comunidade"
                className="relative p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-amber-600 text-white text-[10px] font-extrabold flex items-center justify-center tabular-nums">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">Notificações</span>
                    {unreadNotificationsCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-bold text-amber-800 hover:underline cursor-pointer"
                      >
                        Marcar como lidas
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => {
                      const actor = getProfileById(n.actorId) || currentUser;
                      return (
                        <button
                          key={n.id}
                          type="button"
                          onClick={() => {
                            markNotificationRead(n.id);
                            setIsNotifOpen(false);
                            if (n.targetQuestionId && onOpenQuestion) {
                              onOpenQuestion(n.targetQuestionId);
                            } else if (n.targetPostId) {
                              setActiveTab('comunidade');
                            } else {
                              openProfile(actor.id);
                            }
                          }}
                          className={`w-full text-left px-4 py-3 flex items-start gap-2.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                            !n.read ? 'bg-amber-50/40' : ''
                          }`}
                        >
                          <UserAvatar profile={actor} size="xs" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-700 leading-snug">
                              <strong className="text-slate-900">{actor.name}</strong> {n.text}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {formatRelativeDate(n.createdAt)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Menu (Avatar, Name, Status Badge, Meu Perfil) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsNotifOpen(false);
                }}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <UserAvatar profile={currentUser} size="xs" />
                <div className="hidden md:block text-left leading-tight">
                  <div className="text-xs font-extrabold text-slate-900 max-w-28 truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-semibold text-amber-800 whitespace-nowrap">
                    {currentUser.category === 'advogado'
                      ? currentUser.oabUf
                        ? `OAB/${currentUser.oabUf}`
                        : 'Advogado(a)'
                      : currentUser.category === 'examinando'
                      ? currentUser.targetExam || 'Examinando OAB'
                      : currentUser.semester || 'Estudante'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar profile={currentUser} size="sm" />
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-slate-900 truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">@{currentUser.handle}</div>
                      </div>
                    </div>
                    <CategoryBadge profile={currentUser} />
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 pt-1 tabular-nums">
                      <span>{currentUser.reputationPoints} pts reputação</span>
                      <span>·</span>
                      <span>{currentUser.followersIds.length} seguidores</span>
                    </div>
                  </div>

                  <div className="p-2 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        openProfile(currentUser.id);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-900 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-amber-700" />
                      <span>Meu Perfil</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        openEditProfile();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4 text-slate-600" />
                      <span>Editar Perfil / Cadastro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setActiveTab('comunidade');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-600" />
                      <span>Ir para Comunidade & Feed</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto py-2 no-scrollbar border-t border-slate-100 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('simulado')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeTab === 'erros'
                  ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Caderno de Revisão</span>
              {bookmarkedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold tabular-nums">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('comunidade')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeTab === 'comunidade'
                  ? 'bg-slate-900 text-amber-300 font-semibold shadow-sm'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Comunidade & Feed</span>
              <span
                className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold tabular-nums ${
                  activeTab === 'comunidade'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {feedPosts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('arquitetura')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeTab === 'arquitetura'
                  ? 'bg-amber-600 text-white font-semibold shadow-sm shadow-amber-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Arquitetura & Instalação</span>
            </button>
          </div>

          {/* Mobile/Tablet Mode Toggle fallback when < xl */}
          {activeTab === 'simulado' && !isFinished && (
            <div className="flex xl:hidden items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold text-slate-600 shrink-0">
              <button
                onClick={() => setMode('real')}
                className={`px-2 py-1 rounded-md whitespace-nowrap cursor-pointer ${
                  mode === 'real' ? 'bg-white text-amber-900 shadow-2xs font-bold' : ''
                }`}
              >
                5h
              </button>
              <button
                onClick={() => setMode('study')}
                className={`px-2 py-1 rounded-md whitespace-nowrap cursor-pointer ${
                  mode === 'study' ? 'bg-white text-indigo-900 shadow-2xs font-bold' : ''
                }`}
              >
                Estudo
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

