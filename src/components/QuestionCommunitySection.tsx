import React, { useState, useRef } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Award,
  Reply,
  Share2,
  Bold,
  Scale,
  BookMarked,
  Send,
  UserPlus,
  UserCheck,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
} from 'lucide-react';
import { Question } from '../types/oab';
import { useCommunity } from '../context/CommunityContext';
import { UserAvatar, CategoryBadge } from './UserIdentity';
import { formatRelativeDate, renderFormattedLegalText } from '../utils/legalTextFormatter';
import { BLUEPRINT_LIMITS } from '../utils/firestorePayload';

interface QuestionCommunitySectionProps {
  question: Question;
  onNavigateToFeed?: () => void;
}

export function QuestionCommunitySection({
  question,
  onNavigateToFeed,
}: QuestionCommunitySectionProps) {
  const {
    currentUser,
    commentsByQuestion,
    getProfileById,
    openProfile,
    toggleFollow,
    isFollowing,
    addQuestionComment,
    toggleCommentUpvote,
    addCommentReply,
    createFeedPost,
  } = useCommunity();

  const [isForumOpen, setIsForumOpen] = useState<boolean>(true);
  const [commentText, setCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareNote, setShareNote] = useState('');
  const [shareSuccessToast, setShareSuccessToast] = useState(false);

  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const rawComments = commentsByQuestion[question.id] || [];
  // Automatic sorting: highest upvotes first, then most recent
  const sortedComments = [...rawComments].sort((a, b) => {
    const diff = b.upvotedBy.length - a.upvotedBy.length;
    if (diff !== 0) return diff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const bestCommentId =
    sortedComments.length > 0 && sortedComments[0].upvotedBy.length > 0
      ? sortedComments[0].id
      : null;

  const insertFormatting = (snippet: string, cursorOffset = 0) => {
    const el = commentInputRef.current;
    if (!el) {
      setCommentText((prev) => `${prev}${prev ? ' ' : ''}${snippet}`);
      return;
    }
    const start = el.selectionStart ?? commentText.length;
    const end = el.selectionEnd ?? commentText.length;
    const selected = commentText.slice(start, end);
    let inserted = snippet;
    if (snippet === '**texto**' && selected) {
      inserted = `**${selected}**`;
    }
    const next = commentText.slice(0, start) + inserted + commentText.slice(end);
    setCommentText(next);
    setTimeout(() => {
      el.focus();
      const pos = start + inserted.length - cursorOffset;
      el.setSelectionRange(pos, pos);
    }, 0);
  };

  const handlePublishComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addQuestionComment(question.id, commentText);
    setCommentText('');
  };

  const handlePublishReply = (commentId: string) => {
    if (!replyText.trim()) return;
    addCommentReply(question.id, commentId, replyText);
    setReplyText('');
    setReplyingToId(null);
  };

  const handleShareToFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareNote.trim()) return;
    createFeedPost({
      type: 'questao_compartilhada',
      title: `Dúvida / Análise — Questão ${question.number} (${question.discipline})`,
      content: shareNote,
      tags: [question.discipline],
      sharedQuestion: {
        questionId: question.id,
        number: question.number,
        discipline: question.discipline,
        topic: question.topic,
        examOrigin: question.examOrigin,
        statementSnippet:
          question.statement.length > 170
            ? `${question.statement.slice(0, 170)}...`
            : question.statement,
      },
    });
    setShareNote('');
    setIsShareOpen(false);
    setShareSuccessToast(true);
    setTimeout(() => setShareSuccessToast(false), 6000);
  };

  return (
    <section
      aria-label="Interação Social e Comentários da Comunidade"
      className="mt-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Top Forum Bar */}
      <div className="px-5 sm:px-6 py-4 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsForumOpen(!isForumOpen)}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                Comentários da Comunidade
              </h3>
              <span className="text-xs font-semibold text-slate-500 tabular-nums">
                ({sortedComments.length} {sortedComments.length === 1 ? 'explicação' : 'explicações'})
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Gabarito comentado pelos inscritos · Ordenado por utilidade jurídica
            </p>
          </div>
          <span className="ml-1 text-slate-400 group-hover:text-slate-700">
            {isForumOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>

        {/* Quick Share Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsShareOpen(!isShareOpen)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isShareOpen
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:text-amber-900 hover:bg-amber-50/60'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartilhar no Feed</span>
          </button>
        </div>
      </div>

      {/* Shared confirmation banner */}
      {shareSuccessToast && (
        <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-semibold">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Questão publicada no Feed da Comunidade com sua anotação!</span>
          </div>
          {onNavigateToFeed && (
            <button
              type="button"
              onClick={onNavigateToFeed}
              className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer whitespace-nowrap"
            >
              <span>Abrir Comunidade & Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Quick Share Inline Composer */}
      {isShareOpen && (
        <form
          onSubmit={handleShareToFeed}
          className="p-5 sm:p-6 bg-amber-50/50 border-b border-amber-200/80 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Compartilhar Questão {question.number} ({question.discipline}) na Comunidade
            </span>
            <button
              type="button"
              onClick={() => setIsShareOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
            <strong className="text-slate-900">{question.topic}:</strong>{' '}
            {question.statement.slice(0, 140)}...
          </p>
          <textarea
            value={shareNote}
            maxLength={BLUEPRINT_LIMITS.postContentMax}
            onChange={(e) => setShareNote(e.target.value)}
            rows={3}
            placeholder="Escreva sua dúvida doutrinária, macete de prova ou pedido de ajuda sobre esta questão..."
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsShareOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!shareNote.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Publicar no Feed</span>
            </button>
          </div>
        </form>
      )}

      {/* Comments Body */}
      {isForumOpen && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* New Comment Composer */}
          <form onSubmit={handlePublishComment} className="space-y-3">
            <div className="flex items-start gap-3">
              <UserAvatar
                profile={currentUser}
                size="sm"
                onClick={() => openProfile(currentUser.id)}
              />
              <div className="flex-1 space-y-2">
                {/* Basic Legal Formatting Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => insertFormatting('**texto**', 2)}
                      title="Negrito (**texto**)"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Bold className="w-3.5 h-3.5" />
                      <span>Negrito</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('Art. 17 da Lei nº 8.906/94')}
                      title="Inserir citação de artigo de lei"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Scale className="w-3.5 h-3.5 text-amber-700" />
                      <span>Citar Artigo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('Súmula nº 000 do STJ')}
                      title="Inserir citação de súmula"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <BookMarked className="w-3.5 h-3.5 text-amber-700" />
                      <span>Citar Súmula</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Use **negrito** ou cite artigos (ex: Art. 17 EAOAB) para destaque automático
                  </span>
                </div>

                <textarea
                  ref={commentInputRef}
                  value={commentText}
                  maxLength={BLUEPRINT_LIMITS.questionCommentMax}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  placeholder="Escreva seu comentário fundamentado explicando o gabarito, artigos de lei ou súmulas aplicáveis..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-600 transition-colors"
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500">
                    +10 pts de reputação por explicação fundamentada
                  </span>
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publicar Comentário</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Comments List */}
          {sortedComments.length === 0 ? (
            <div className="py-6 text-center text-slate-500 text-sm">
              Ainda não há comentários dos inscritos nesta questão. Seja o primeiro a fundamentar o gabarito!
            </div>
          ) : (
            <div className="space-y-5">
              {sortedComments.map((comment) => {
                const author = getProfileById(comment.authorId) || currentUser;
                const isBest = comment.id === bestCommentId;
                const hasUpvoted = comment.upvotedBy.includes(currentUser.id);
                const followingAuthor = isFollowing(author.id);
                const isOwnComment = author.id === currentUser.id;

                return (
                  <article
                    key={comment.id}
                    className={`rounded-xl p-4 sm:p-5 border transition-colors ${
                      isBest
                        ? 'bg-emerald-50/35 border-emerald-300/90'
                        : 'bg-slate-50/50 border-slate-200'
                    }`}
                  >
                    {/* Melhor Explicação Seal */}
                    {isBest && (
                      <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-linear-to-r from-amber-100 to-emerald-100 border border-amber-300/80 text-emerald-950 text-[11px] font-extrabold tracking-wide">
                        <Award className="w-3.5 h-3.5 text-amber-700" />
                        <span>Melhor Explicação da Comunidade</span>
                      </div>
                    )}

                    {/* Author Mini-Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <UserAvatar
                          profile={author}
                          size="sm"
                          onClick={() => openProfile(author.id)}
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openProfile(author.id)}
                              className="text-sm font-bold text-slate-900 hover:text-amber-800 hover:underline cursor-pointer truncate"
                            >
                              {author.name}
                            </button>
                            <CategoryBadge profile={author} compact />
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <button
                              type="button"
                              onClick={() => openProfile(author.id)}
                              className="hover:text-slate-800 cursor-pointer"
                            >
                              @{author.handle}
                            </button>
                            <span aria-hidden="true">·</span>
                            <span>{formatRelativeDate(comment.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {!isOwnComment && (
                        <button
                          type="button"
                          onClick={() => toggleFollow(author.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            followingAuthor
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-500 hover:text-amber-800'
                          }`}
                        >
                          {followingAuthor ? (
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

                    {/* Comment Body */}
                    <div className="text-sm text-slate-800 leading-relaxed pl-0 sm:pl-11">
                      {renderFormattedLegalText(comment.content)}
                    </div>

                    {/* Action Bar: Upvote & Reply */}
                    <div className="mt-4 pl-0 sm:pl-11 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleCommentUpvote(question.id, comment.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer tabular-nums ${
                          hasUpvoted
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:text-emerald-800'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current' : ''}`} />
                        <span>Útil / Fundamentado</span>
                        <span className="px-1.5 py-0.2 rounded bg-black/10 text-[11px]">
                          {comment.upvotedBy.length}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setReplyingToId(replyingToId === comment.id ? null : comment.id)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer tabular-nums"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>
                          Responder {comment.replies.length > 0 ? `(${comment.replies.length})` : ''}
                        </span>
                      </button>
                    </div>

                    {/* Inline Reply Form */}
                    {replyingToId === comment.id && (
                      <div className="mt-3 pl-0 sm:pl-11">
                        <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                          <textarea
                            value={replyText}
                            maxLength={BLUEPRINT_LIMITS.questionReplyMax}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={2}
                            placeholder={`Responder a ${author.name}...`}
                            className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setReplyingToId(null);
                                setReplyText('');
                              }}
                              className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              disabled={!replyText.trim()}
                              onClick={() => handlePublishReply(comment.id)}
                              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
                            >
                              Enviar Resposta
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Nested Thread Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 sm:pl-11 space-y-3 border-l border-slate-200 ml-2 sm:ml-4">
                        {comment.replies.map((reply) => {
                          const replyAuthor = getProfileById(reply.authorId) || currentUser;
                          return (
                            <div
                              key={reply.id}
                              className="bg-white rounded-xl p-3.5 border border-slate-200/80"
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <UserAvatar
                                  profile={replyAuthor}
                                  size="xs"
                                  onClick={() => openProfile(replyAuthor.id)}
                                />
                                <button
                                  type="button"
                                  onClick={() => openProfile(replyAuthor.id)}
                                  className="text-xs font-bold text-slate-900 hover:text-amber-800 hover:underline cursor-pointer"
                                >
                                  {replyAuthor.name}
                                </button>
                                <CategoryBadge profile={replyAuthor} compact />
                                <span className="text-[11px] text-slate-400">
                                  · {formatRelativeDate(reply.createdAt)}
                                </span>
                              </div>
                              <div className="text-xs sm:text-sm text-slate-700 pl-9">
                                {renderFormattedLegalText(reply.content)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
