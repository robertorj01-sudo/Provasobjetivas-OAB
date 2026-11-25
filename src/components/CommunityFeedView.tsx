import React, { useState, useMemo, useRef } from 'react';
import {
  Bookmark,
  Bold,
  BookMarked,
  BookOpen,
  FileText,
  Flame,
  Heart,
  MessageCircle,
  PenLine,
  Scale,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  X,
  LogIn,
} from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';
import { DisciplineType } from '../types/oab';
import { FeedPostType } from '../types/community';
import { UserAvatar, CategoryBadge } from './UserIdentity';
import { formatRelativeDate, renderFormattedLegalText } from '../utils/legalTextFormatter';
import { BLUEPRINT_LIMITS } from '../utils/firestorePayload';

interface CommunityFeedViewProps {
  onOpenQuestion: (questionId: number) => void;
  onSyncBookmarkQuestion: (questionId: number) => void;
}

const POPULAR_DISCIPLINES: DisciplineType[] = [
  'Ética Profissional',
  'Direito Constitucional',
  'Direito Tributário',
  'Direito Civil',
  'Direito Processual Civil',
  'Direito Penal',
  'Direito Processual Penal',
  'Direito Administrativo',
  'Direito do Trabalho',
  'Direito Empresarial',
];

export function CommunityFeedView({
  onOpenQuestion,
  onSyncBookmarkQuestion,
}: CommunityFeedViewProps) {
  const {
    isAuthenticated,
    authBusy,
    signInWithGoogle,
    profiles,
    currentUser,
    feedPosts,
    feedFilterDiscipline,
    setFeedFilterDiscipline,
    getProfileById,
    openProfile,
    openEditProfile,
    toggleFollow,
    isFollowing,
    createFeedPost,
    togglePostLike,
    togglePostSave,
    addPostComment,
  } = useCommunity();

  const [feedFilter, setFeedFilter] = useState<
    'all' | 'artigo' | 'post' | 'questao_compartilhada' | 'seguindo' | 'salvos'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Composer state
  const [composerMode, setComposerMode] = useState<'post' | 'artigo'>('post');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<DisciplineType[]>(['Ética Profissional']);

  // Post inline comments state
  const [openCommentsPostIds, setOpenCommentsPostIds] = useState<Record<string, boolean>>({});
  const [postCommentDrafts, setPostCommentDrafts] = useState<Record<string, string>>({});

  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleComposerTag = (disc: DisciplineType) => {
    setSelectedTags((prev) =>
      prev.includes(disc)
        ? prev.length > 1
          ? prev.filter((t) => t !== disc)
          : prev
        : prev.length < 3
        ? [...prev, disc]
        : prev
    );
  };

  const insertFormatting = (snippet: string) => {
    const el = composerRef.current;
    if (!el) {
      setPostContent((prev) => `${prev}${prev ? ' ' : ''}${snippet}`);
      return;
    }
    const start = el.selectionStart ?? postContent.length;
    const end = el.selectionEnd ?? postContent.length;
    const selected = postContent.slice(start, end);
    const inserted = snippet === '**texto**' && selected ? `**${selected}**` : snippet;
    const next = postContent.slice(0, start) + inserted + postContent.slice(end);
    setPostContent(next);
    setTimeout(() => {
      el.focus();
      const pos = start + inserted.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    if (composerMode === 'artigo' && !postTitle.trim()) return;

    createFeedPost({
      type: composerMode as FeedPostType,
      title: composerMode === 'artigo' ? postTitle : undefined,
      content: postContent,
      tags: selectedTags,
    });
    setPostTitle('');
    setPostContent('');
  };

  // Trending topics computed from feed posts + FGV weight
  const trendingTopics = useMemo(() => {
    const counts: Record<string, number> = {};
    POPULAR_DISCIPLINES.forEach((d) => {
      counts[d] = 0;
    });
    feedPosts.forEach((post) => {
      post.tags.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([discipline, count]) => ({
        discipline: discipline as DisciplineType,
        count,
      }));
  }, [feedPosts]);

  // Highlighted profiles sorted by reputation
  const featuredProfiles = useMemo(() => {
    return [...profiles]
      .filter((p) => p.id !== currentUser.id)
      .sort((a, b) => b.reputationPoints - a.reputationPoints)
      .slice(0, 4);
  }, [profiles, currentUser.id]);

  // Filtered feed posts
  const visiblePosts = useMemo(() => {
    return feedPosts.filter((post) => {
      if (feedFilter === 'artigo' && post.type !== 'artigo') return false;
      if (feedFilter === 'post' && post.type !== 'post') return false;
      if (
        feedFilter === 'questao_compartilhada' &&
        post.type !== 'questao_compartilhada'
      ) {
        return false;
      }
      if (
        feedFilter === 'seguindo' &&
        post.authorId !== currentUser.id &&
        !currentUser.followingIds.includes(post.authorId)
      ) {
        return false;
      }
      if (feedFilter === 'salvos' && !post.savedBy.includes(currentUser.id)) {
        return false;
      }
      if (
        feedFilterDiscipline !== 'all' &&
        !post.tags.includes(feedFilterDiscipline)
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const author = getProfileById(post.authorId);
        const matchText =
          post.content.toLowerCase().includes(q) ||
          (post.title?.toLowerCase().includes(q) ?? false) ||
          (author?.name.toLowerCase().includes(q) ?? false) ||
          post.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchText) return false;
      }
      return true;
    });
  }, [
    feedPosts,
    feedFilter,
    feedFilterDiscipline,
    searchQuery,
    currentUser.id,
    currentUser.followingIds,
    getProfileById,
  ]);

  const handleSavePost = (postId: string, sharedQuestionId?: number) => {
    const post = feedPosts.find((p) => p.id === postId);
    const willSave = post ? !post.savedBy.includes(currentUser.id) : true;
    togglePostSave(postId);
    if (willSave && sharedQuestionId) {
      onSyncBookmarkQuestion(sharedQuestionId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header Strip */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Rede Jurídica Colaborativa · Juris Tantum
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Comunidade & Feed Jurídico
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Artigos doutrinários, macetes da banca FGV, debates sobre questões comentadas e conexões entre examinados e advogados.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artigos, autores ou temas..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>
      </div>

      {/* 3-Column JusBrasil-inspired Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: User Quick Card + Feed Filters */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-36">
          {/* Current User Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="h-14 bg-slate-900 relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 25% 50%, #D97706 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
            </div>
            <div className="px-4 pb-4 -mt-6 relative">
              <UserAvatar
                profile={currentUser}
                size="lg"
                onClick={() => openProfile(currentUser.id)}
                className="ring-4 ring-white"
              />
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => openProfile(currentUser.id)}
                  className="text-sm font-extrabold text-slate-900 hover:text-amber-800 hover:underline text-left cursor-pointer"
                >
                  {currentUser.name}
                </button>
                <p className="text-xs text-slate-500">@{currentUser.handle}</p>
                <div className="mt-2">
                  <CategoryBadge profile={currentUser} compact />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-extrabold text-slate-900 tabular-nums">
                    {currentUser.followersIds.length}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Seguidores</div>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 tabular-nums">
                    {currentUser.followingIds.length}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Seguindo</div>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-amber-700 tabular-nums">
                    {currentUser.reputationPoints}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Pts</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => openProfile(currentUser.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  Meu Perfil
                </button>
                <button
                  type="button"
                  onClick={openEditProfile}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Editar
                </button>
              </div>
              {!isAuthenticated && (
                <button
                  type="button"
                  disabled={authBusy}
                  onClick={() => void signInWithGoogle()}
                  className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{authBusy ? 'Conectando...' : 'Entrar com Google (Nuvem)'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation / Feed Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 space-y-1">
            <div className="px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Explorar Feed
            </div>
            {(
              [
                { id: 'all', label: 'Tudo na Comunidade', icon: Sparkles },
                { id: 'artigo', label: 'Artigos Jurídicos', icon: FileText },
                { id: 'post', label: 'Dicas & Macetes FGV', icon: PenLine },
                { id: 'questao_compartilhada', label: 'Questões em Debate', icon: Scale },
                { id: 'seguindo', label: 'Seguindo', icon: Users },
                { id: 'salvos', label: 'Salvos para Revisão', icon: Bookmark },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const active = feedFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFeedFilter(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    active
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* CENTER COLUMN: Publisher + Main Feed */}
        <section className="lg:col-span-6 space-y-5">
          {/* Active Discipline Filter Banner */}
          {feedFilterDiscipline !== 'all' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-amber-950">
                Filtrando publicações por disciplina: <strong>{feedFilterDiscipline}</strong>
              </span>
              <button
                type="button"
                onClick={() => setFeedFilterDiscipline('all')}
                className="inline-flex items-center gap-1 font-bold text-amber-900 hover:underline cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpar filtro</span>
              </button>
            </div>
          )}

          {/* Content Publisher */}
          <form
            onSubmit={handlePublish}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-3.5"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setComposerMode('post')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    composerMode === 'post'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PenLine className="w-3.5 h-3.5 text-amber-600" />
                  <span>Post Rápido / Macete</span>
                </button>
                <button
                  type="button"
                  onClick={() => setComposerMode('artigo')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    composerMode === 'artigo'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Artigo Jurídico</span>
                </button>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                {composerMode === 'artigo' ? '+20 pts reputação' : '+10 pts reputação'}
              </span>
            </div>

            {composerMode === 'artigo' && (
              <input
                type="text"
                required
                maxLength={BLUEPRINT_LIMITS.postTitleMax}
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Título do Artigo Jurídico (ex.: Análise das Excludentes de Ilicitude na FGV)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            )}

            <div className="flex items-start gap-3">
              <UserAvatar
                profile={currentUser}
                size="sm"
                onClick={() => openProfile(currentUser.id)}
              />
              <textarea
                ref={composerRef}
                maxLength={BLUEPRINT_LIMITS.postContentMax}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={composerMode === 'artigo' ? 5 : 3}
                placeholder={
                  composerMode === 'artigo'
                    ? 'Redija seu artigo jurídico estruturado com fundamentação legal, jurisprudência e dicas práticas...'
                    : 'Compartilhe uma dúvida, macete de memorização ou anotação de estudo com a comunidade...'
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            {/* Formatting & Discipline Tags Selector */}
            <div className="space-y-2.5 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => insertFormatting('**texto**')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  <Bold className="w-3 h-3" />
                  <span>Negrito</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('Art. 5º da CF/88')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-semibold cursor-pointer"
                >
                  <Scale className="w-3 h-3 text-amber-700" />
                  <span>Citar Artigo</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('Súmula nº 000 do STF')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-semibold cursor-pointer"
                >
                  <BookMarked className="w-3 h-3 text-amber-700" />
                  <span>Citar Súmula</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 mr-0.5">
                    Disciplinas:
                  </span>
                  {POPULAR_DISCIPLINES.slice(0, 6).map((disc) => {
                    const active = selectedTags.includes(disc);
                    return (
                      <button
                        key={disc}
                        type="button"
                        onClick={() => toggleComposerTag(disc)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                          active
                            ? 'bg-slate-900 text-amber-300 border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        {disc.replace('Direito ', '')}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={
                    !postContent.trim() || (composerMode === 'artigo' && !postTitle.trim())
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{composerMode === 'artigo' ? 'Publicar Artigo' : 'Publicar Post'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Feed Stream */}
          {visiblePosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-2">
              <p className="text-sm font-bold text-slate-800">
                Nenhuma publicação encontrada para os filtros selecionados.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFeedFilter('all');
                  setFeedFilterDiscipline('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
              >
                Exibir todas as publicações
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {visiblePosts.map((post) => {
                const author = getProfileById(post.authorId) || currentUser;
                const isOwn = author.id === currentUser.id;
                const following = isFollowing(author.id);
                const liked = post.likedBy.includes(currentUser.id);
                const saved = post.savedBy.includes(currentUser.id);
                const commentsOpen = Boolean(openCommentsPostIds[post.id]);
                const draftComment = postCommentDrafts[post.id] || '';

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Card Author Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <UserAvatar
                            profile={author}
                            size="md"
                            onClick={() => openProfile(author.id)}
                          />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => openProfile(author.id)}
                                className="text-sm font-extrabold text-slate-900 hover:text-amber-800 hover:underline cursor-pointer truncate"
                              >
                                {author.name}
                              </button>
                              <CategoryBadge profile={author} compact />
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <button
                                type="button"
                                onClick={() => openProfile(author.id)}
                                className="hover:text-slate-800 cursor-pointer"
                              >
                                @{author.handle}
                              </button>
                              <span aria-hidden="true">·</span>
                              <span>{formatRelativeDate(post.createdAt)}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-semibold text-amber-800">
                                {post.type === 'artigo'
                                  ? 'Artigo Jurídico'
                                  : post.type === 'questao_compartilhada'
                                  ? 'Questão Compartilhada'
                                  : 'Publicação'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {!isOwn && (
                          <button
                            type="button"
                            onClick={() => toggleFollow(author.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              following
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-500 hover:text-amber-900'
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

                      {/* Title for Article / Shared */}
                      {post.title && (
                        <h2
                          className={`font-extrabold text-slate-900 tracking-tight ${
                            post.type === 'artigo' ? 'text-lg sm:text-xl' : 'text-base'
                          }`}
                          style={
                            post.type === 'artigo'
                              ? { fontFamily: "'Merriweather', Georgia, serif" }
                              : undefined
                          }
                        >
                          {post.title}
                        </h2>
                      )}

                      {/* Post Body */}
                      <div className="text-sm text-slate-800 leading-relaxed">
                        {renderFormattedLegalText(post.content)}
                      </div>

                      {/* Shared Question Preview Box */}
                      {post.sharedQuestion && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold">
                                Questão {post.sharedQuestion.number}
                              </span>
                              <span className="font-bold text-amber-900">
                                {post.sharedQuestion.discipline}
                              </span>
                            </div>
                            {post.sharedQuestion.examOrigin && (
                              <span className="text-[11px] text-slate-500">
                                {post.sharedQuestion.examOrigin}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-800">
                            {post.sharedQuestion.topic}
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {post.sharedQuestion.statementSnippet}
                          </p>
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => onOpenQuestion(post.sharedQuestion!.questionId)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Resolver & Debater esta Questão</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Clickable Discipline Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {post.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() =>
                                setFeedFilterDiscipline(
                                  feedFilterDiscipline === tag ? 'all' : tag
                                )
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                                feedFilterDiscipline === tag
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Action Footer */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => togglePostLike(post.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer tabular-nums ${
                              liked
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                            <span>Recomendar</span>
                            <span>({post.likedBy.length})</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setOpenCommentsPostIds((prev) => ({
                                ...prev,
                                [post.id]: !prev[post.id],
                              }))
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer tabular-nums"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Comentar ({post.comments.length})</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleSavePost(post.id, post.sharedQuestion?.questionId)
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                            saved
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                          <span>
                            {saved ? 'Salvo no Caderno' : 'Salvar no Caderno de Revisão'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Post Comments */}
                    {commentsOpen && (
                      <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 space-y-3">
                        {post.comments.map((c) => {
                          const cAuthor = getProfileById(c.authorId) || currentUser;
                          return (
                            <div
                              key={c.id}
                              className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-1"
                            >
                              <div className="flex flex-wrap items-center gap-2">
                                <UserAvatar
                                  profile={cAuthor}
                                  size="xs"
                                  onClick={() => openProfile(cAuthor.id)}
                                />
                                <button
                                  type="button"
                                  onClick={() => openProfile(cAuthor.id)}
                                  className="text-xs font-bold text-slate-900 hover:text-amber-800 hover:underline cursor-pointer"
                                >
                                  {cAuthor.name}
                                </button>
                                <CategoryBadge profile={cAuthor} compact />
                                <span className="text-[11px] text-slate-400">
                                  · {formatRelativeDate(c.createdAt)}
                                </span>
                              </div>
                              <div className="text-xs sm:text-sm text-slate-700 pl-9">
                                {renderFormattedLegalText(c.content)}
                              </div>
                            </div>
                          );
                        })}

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <UserAvatar profile={currentUser} size="xs" />
                          <input
                            type="text"
                            value={draftComment}
                            onChange={(e) =>
                              setPostCommentDrafts((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && draftComment.trim()) {
                                e.preventDefault();
                                addPostComment(post.id, draftComment);
                                setPostCommentDrafts((prev) => ({ ...prev, [post.id]: '' }));
                              }
                            }}
                            placeholder="Escreva um comentário jurídico..."
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-amber-600"
                          />
                          <button
                            type="button"
                            disabled={!draftComment.trim()}
                            onClick={() => {
                              addPostComment(post.id, draftComment);
                              setPostCommentDrafts((prev) => ({ ...prev, [post.id]: '' }));
                            }}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
                          >
                            Enviar
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: Discovery (Featured Profiles + Trending FGV Topics) */}
        <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-36">
          {/* Perfis em Destaque */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Perfis em Destaque</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Semana</span>
            </div>

            <div className="space-y-3.5">
              {featuredProfiles.map((prof) => {
                const following = isFollowing(prof.id);
                return (
                  <div
                    key={prof.id}
                    className="flex items-start justify-between gap-2.5 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <UserAvatar
                        profile={prof}
                        size="sm"
                        onClick={() => openProfile(prof.id)}
                      />
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => openProfile(prof.id)}
                          className="text-xs font-extrabold text-slate-900 hover:text-amber-800 hover:underline text-left block truncate cursor-pointer"
                        >
                          {prof.name}
                        </button>
                        <div className="text-[11px] text-slate-500 truncate">
                          {prof.category === 'advogado' && prof.oabUf
                            ? `OAB/${prof.oabUf} · ${prof.reputationPoints} pts`
                            : `${prof.reputationPoints} pts de contribuição`}
                        </div>
                        <div className="mt-1">
                          <CategoryBadge profile={prof} compact />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFollow(prof.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer shrink-0 ${
                        following
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {following ? 'Seguindo' : 'Seguir'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tópicos em Alta na FGV */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-extrabold text-slate-900">Tópicos em Alta na FGV</h3>
            </div>
            <p className="text-xs text-slate-500">
              Filtre debates e materiais pelas disciplinas mais discutidas pelos candidatos.
            </p>

            <div className="space-y-1.5">
              {trendingTopics.map(({ discipline, count }) => {
                const active = feedFilterDiscipline === discipline;
                return (
                  <button
                    key={discipline}
                    type="button"
                    onClick={() =>
                      setFeedFilterDiscipline(active ? 'all' : discipline)
                    }
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      active
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0 opacity-75" />
                      <span className="truncate">{discipline}</span>
                    </span>
                    <span
                      className={`text-[11px] font-bold tabular-nums shrink-0 ${
                        active ? 'text-amber-100' : 'text-slate-400'
                      }`}
                    >
                      {count} {count === 1 ? 'post' : 'posts'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
