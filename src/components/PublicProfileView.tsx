import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Calendar,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Heart,
  ListChecks,
  Lock,
  MessageSquare,
  Scale,
  ThumbsUp,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { CoverTheme, QuestionComment, SharedRevisionList } from '../types/community';
import { DisciplineType } from '../types/oab';
import { findQuestionByIdAnyExam } from '../data/examsRegistry';
import { formatRelativeDate, renderFormattedLegalText } from '../utils/legalTextFormatter';
import { CategoryBadge, UserAvatar } from './UserIdentity';

interface PublicProfileViewProps {
  onOpenQuestion: (questionId: number) => void;
  onSelectDisciplineInFeed: (discipline: DisciplineType) => void;
  onPracticeSharedList: (list: SharedRevisionList) => void;
}

const COVER_STYLES: Record<CoverTheme, string> = {
  navy: 'bg-slate-900 border-slate-800',
  slate: 'bg-slate-800 border-slate-700',
  amber: 'bg-amber-950 border-amber-900',
  emerald: 'bg-emerald-950 border-emerald-900',
};

export function PublicProfileView({
  onOpenQuestion,
  onSelectDisciplineInFeed,
  onPracticeSharedList,
}: PublicProfileViewProps) {
  const {
    viewedProfileId,
    closeProfile,
    getProfileById,
    currentUser,
    openEditProfile,
    toggleFollow,
    isFollowing,
    feedPosts,
    commentsByQuestion,
    updateCurrentUserProfile,
    togglePostLike,
    togglePostSave,
    openProfile,
  } = useCommunity();

  const [activeSubTab, setActiveSubTab] = useState<
    'publicacoes' | 'comentarios' | 'listas' | 'sobre'
  >('publicacoes');

  const profile = viewedProfileId ? getProfileById(viewedProfileId) : undefined;

  const userPosts = useMemo(() => {
    if (!profile) return [];
    return feedPosts.filter((post) => post.authorId === profile.id);
  }, [feedPosts, profile]);

  const userComments = useMemo(() => {
    if (!profile) return [];
    const results: {
      commentId: string;
      questionId: number;
      content: string;
      upvotes: number;
      createdAt: string;
    }[] = [];
    Object.entries(commentsByQuestion).forEach(([qIdStr, list]) => {
      if (!Array.isArray(list)) return;
      const qId = Number(qIdStr);
      (list as QuestionComment[]).forEach((c) => {
        if (c.authorId === profile.id) {
          results.push({
            commentId: c.id,
            questionId: qId,
            content: c.content,
            upvotes: c.upvotedBy.length,
            createdAt: c.createdAt,
          });
        }
      });
    });
    return results.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [commentsByQuestion, profile]);

  if (!profile) return null;

  const isOwnProfile = profile.id === currentUser.id;
  const following = isFollowing(profile.id);

  return (
    <div
      className="fixed inset-0 z-40 bg-slate-100/95 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil público de ${profile.name}`}
    >
      {/* Top Sticky Return Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={closeProfile}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a plataforma</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Perfil Jurídico · @{profile.handle}
            </span>
            {isOwnProfile ? (
              <button
                type="button"
                onClick={openEditProfile}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Editar Perfil</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleFollow(profile.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  following
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600'
                }`}
              >
                {following ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Seguindo</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Seguir</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Profile Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Profile Header Card */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Discrete Architectural Cover */}
          <div
            className={`h-28 sm:h-36 relative border-b ${COVER_STYLES[profile.coverTheme]}`}
          >
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, #D97706 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute bottom-3 right-5 text-[11px] font-semibold text-amber-300/80 tracking-wider uppercase">
              Juris Tantum · Comunidade Jurídica
            </div>
          </div>

          <div className="px-6 pb-6">
            {/* Avatar & Primary CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 sm:-mt-12 mb-4 relative z-10">
              <div className="flex items-end gap-4">
                <UserAvatar
                  profile={profile}
                  size="xl"
                  className="ring-4 ring-white shadow-md"
                />
                <div className="pb-1 hidden sm:block">
                  <CategoryBadge profile={profile} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {isOwnProfile ? (
                  <button
                    type="button"
                    onClick={openEditProfile}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Editar Perfil / Cadastro</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleFollow(profile.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      following
                        ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                        : 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700 shadow-xs'
                    }`}
                  >
                    {following ? (
                      <>
                        <UserCheck className="w-4 h-4 text-amber-400" />
                        <span>Seguindo</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Seguir Perfil</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Name, Handle, Role, Bio */}
            <div className="space-y-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {profile.name}
                  </h1>
                  {profile.category === 'advogado' && profile.isVerified && (
                    <span
                      title="Inscrição OAB Verificada"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md"
                    >
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verificado</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mt-1">
                  <span className="font-medium text-slate-700">@{profile.handle}</span>
                  <span aria-hidden="true">·</span>
                  <span>{profile.roleTitle}</span>
                  {profile.institution && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {profile.institution}
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-2 sm:hidden">
                  <CategoryBadge profile={profile} />
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">{profile.bio}</p>

              {/* Clickable Specialties */}
              {profile.specialties.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs font-semibold text-slate-500 mr-1">
                    Áreas de interesse:
                  </span>
                  {profile.specialties.map((disc) => (
                    <button
                      key={disc}
                      type="button"
                      onClick={() => {
                        closeProfile();
                        onSelectDisciplineInFeed(disc);
                      }}
                      title={`Explorar discussões de ${disc} no Feed`}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-semibold border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer"
                    >
                      {disc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authority Metrics & Gamification Strip */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Users className="w-3.5 h-3.5 text-slate-600" />
                  <span>Seguidores</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 mt-1 tabular-nums">
                  {profile.followersIds.length}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                  <span>Seguindo</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 mt-1 tabular-nums">
                  {profile.followingIds.length}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold">
                  <Trophy className="w-3.5 h-3.5 text-amber-700" />
                  <span>Reputação Jurídica</span>
                </div>
                <div className="text-xl font-extrabold text-amber-900 mt-1 tabular-nums">
                  {profile.reputationPoints} pts
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  <span>Simulados Concluídos</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 mt-1 tabular-nums">
                  {profile.completedSimulados}
                </div>
              </div>
            </div>

            {/* Achievements Badges */}
            {profile.achievements.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {profile.achievements.map((ach) => (
                  <span
                    key={ach}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-amber-200 text-[11px] font-bold"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{ach}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Performance Showcase (Configurable Privacy) */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Vitrine de Desempenho por Disciplina
              </h2>
              <p className="text-xs text-slate-500">
                Taxa média de acertos nos simulados e baterias de treino FGV
              </p>
            </div>
            {isOwnProfile && (
              <button
                type="button"
                onClick={() =>
                  updateCurrentUserProfile({
                    showPerformanceShowcase: !profile.showPerformanceShowcase,
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                {profile.showPerformanceShowcase ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Visível no Perfil Público</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                    <span>Oculta para Visitantes</span>
                  </>
                )}
              </button>
            )}
          </div>

          {!profile.showPerformanceShowcase && !isOwnProfile ? (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                Este usuário optou por manter suas estatísticas de desempenho privadas.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profile.performanceByDiscipline.map((stat) => (
                <div
                  key={stat.discipline}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-800 truncate">{stat.discipline}</span>
                    <span className="font-extrabold text-slate-900 tabular-nums shrink-0">
                      {stat.accuracy}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        stat.accuracy >= 70
                          ? 'bg-emerald-600'
                          : stat.accuracy >= 50
                          ? 'bg-amber-600'
                          : 'bg-rose-600'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(0, stat.accuracy))}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 tabular-nums">
                    {stat.answered} questões avaliadas
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Internal Profile Tabs */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 border-b border-slate-200 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
            {(
              [
                {
                  id: 'publicacoes',
                  label: `Publicações & Artigos (${userPosts.length})`,
                  icon: FileText,
                },
                {
                  id: 'comentarios',
                  label: `Comentários em Questões (${userComments.length})`,
                  icon: MessageSquare,
                },
                {
                  id: 'listas',
                  label: `Listas de Revisão Compartilhadas (${profile.sharedLists.length})`,
                  icon: ListChecks,
                },
                { id: 'sobre', label: 'Sobre', icon: GraduationCap },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'border-amber-600 text-amber-800'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-5 sm:p-6">
            {/* Tab 1: Publicações & Artigos */}
            {activeSubTab === 'publicacoes' && (
              <div className="space-y-4">
                {userPosts.length === 0 ? (
                  <p className="text-sm text-slate-500 py-6 text-center">
                    Nenhuma publicação ou artigo publicado ainda.
                  </p>
                ) : (
                  userPosts.map((post) => {
                    const liked = post.likedBy.includes(currentUser.id);
                    const saved = post.savedBy.includes(currentUser.id);
                    return (
                      <div
                        key={post.id}
                        className="p-4 sm:p-5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                          <span className="font-bold text-amber-800 uppercase tracking-wider">
                            {post.type === 'artigo'
                              ? 'Artigo Jurídico'
                              : post.type === 'questao_compartilhada'
                              ? 'Questão Compartilhada'
                              : 'Post Rápido'}
                          </span>
                          <span>{formatRelativeDate(post.createdAt)}</span>
                        </div>
                        {post.title && (
                          <h3 className="text-base font-extrabold text-slate-900">{post.title}</h3>
                        )}
                        <div className="text-sm text-slate-700">
                          {renderFormattedLegalText(post.content)}
                        </div>
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => togglePostLike(post.id)}
                              className={`inline-flex items-center gap-1 text-xs font-bold cursor-pointer ${
                                liked ? 'text-rose-600' : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                              <span>{post.likedBy.length}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => togglePostSave(post.id)}
                              className={`text-xs font-bold cursor-pointer ${
                                saved ? 'text-amber-700' : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              {saved ? 'Salvo no Caderno' : 'Salvar'}
                            </button>
                          </div>
                          {post.sharedQuestion && (
                            <button
                              type="button"
                              onClick={() => {
                                closeProfile();
                                onOpenQuestion(post.sharedQuestion!.questionId);
                              }}
                              className="text-xs font-bold text-amber-800 hover:underline cursor-pointer"
                            >
                              Abrir Questão {post.sharedQuestion.number} →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Tab 2: Comentários em Questões */}
            {activeSubTab === 'comentarios' && (
              <div className="space-y-4">
                {userComments.length === 0 ? (
                  <p className="text-sm text-slate-500 py-6 text-center">
                    Nenhum comentário em questões publicado ainda.
                  </p>
                ) : (
                  userComments.map((item) => {
                    const q = findQuestionByIdAnyExam(item.questionId);
                    return (
                      <div
                        key={item.commentId}
                        className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold">
                              {q ? `Questão ${q.number}` : `Questão #${item.questionId}`}
                            </span>
                            {q && (
                              <span className="font-semibold text-amber-900">
                                {q.discipline} · {q.topic}
                              </span>
                            )}
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 tabular-nums">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{item.upvotes} úteis</span>
                          </span>
                        </div>
                        <div className="text-sm text-slate-700">
                          {renderFormattedLegalText(item.content)}
                        </div>
                        <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                          <span>{formatRelativeDate(item.createdAt)}</span>
                          <button
                            type="button"
                            onClick={() => {
                              closeProfile();
                              onOpenQuestion(item.questionId);
                            }}
                            className="font-bold text-amber-800 hover:underline cursor-pointer"
                          >
                            Ir para a Questão →
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Tab 3: Listas de Revisão Compartilhadas */}
            {activeSubTab === 'listas' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.sharedLists.length === 0 ? (
                  <p className="text-sm text-slate-500 py-6 text-center col-span-full">
                    Nenhuma lista de revisão compartilhada ainda.
                  </p>
                ) : (
                  profile.sharedLists.map((list) => (
                    <div
                      key={list.id}
                      className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold text-amber-800">{list.discipline}</span>
                          <span className="tabular-nums">{list.questionIds.length} questões</span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">{list.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {list.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <span className="text-xs text-slate-500 tabular-nums">
                          {list.savedCount} alunos salvaram
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            closeProfile();
                            onPracticeSharedList(list);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                        >
                          Praticar Lista
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 4: Sobre */}
            {activeSubTab === 'sobre' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Credenciais & Formação
                  </h3>
                  <div className="space-y-2.5 text-slate-700">
                    <div className="flex items-center gap-2.5">
                      <Scale className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        <strong>Categoria:</strong>{' '}
                        {profile.category === 'advogado'
                          ? `Advogado(a)${profile.oabNumber ? ` — OAB/${profile.oabUf} ${profile.oabNumber}` : ''}`
                          : profile.category === 'examinando'
                          ? `Bacharel / Examinando OAB (${profile.targetExam || '1ª Fase'})`
                          : `Estudante de Direito (${profile.semester || 'Graduação'})`}
                      </span>
                    </div>
                    {profile.institution && (
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>
                          <strong>Instituição:</strong> {profile.institution}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        <strong>Na comunidade desde:</strong>{' '}
                        {new Date(profile.joinedAt).toLocaleDateString('pt-BR', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Conexões na Comunidade
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.followersIds.length === 0 ? (
                      <span className="text-xs text-slate-500">Nenhum seguidor registrado ainda.</span>
                    ) : (
                      profile.followersIds.map((fId) => {
                        const f = getProfileById(fId);
                        if (!f) return null;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => openProfile(f.id)}
                            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer"
                          >
                            <UserAvatar profile={f} size="xs" />
                            <span>{f.name}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
