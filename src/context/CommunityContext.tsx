import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import {
  UserProfile,
  QuestionComment,
  FeedPost,
  FeedPostType,
  CommunityNotification,
  SharedQuestionSummary,
} from '../types/community';
import { DisciplineType, SimuladoResult } from '../types/oab';
import {
  CURRENT_USER_ID,
  INITIAL_PROFILES,
  INITIAL_QUESTION_COMMENTS,
  INITIAL_FEED_POSTS,
  INITIAL_NOTIFICATIONS,
} from '../data/communitySeed';
import {
  addFeedPostCommentInFirestore,
  addQuestionCommentInFirestore,
  addQuestionCommentReplyInFirestore,
  createFeedPostInFirestore,
  ensureUserAccountAndProfile,
  mapProfileDoc,
  markAllNotificationsReadInFirestore,
  markNotificationReadInFirestore,
  recordSimuladoAttemptInFirestore,
  subscribeAuthenticatedCommunity,
  toggleFeedPostReactionInFirestore,
  toggleFollowRelation,
  toggleQuestionCommentUpvoteInFirestore,
  updatePublicProfile,
} from '../services/firestoreService';

const STORAGE_KEYS = {
  profiles: 'jt_community_profiles_v1',
  comments: 'jt_community_question_comments_v1',
  posts: 'jt_community_feed_posts_v1',
  notifications: 'jt_community_notifications_v1',
};

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function buildReactionList(
  count: number,
  userHasReacted: boolean,
  uid: string,
  prefix: string
): string[] {
  const safeCount = Math.max(0, count);
  const result: string[] = [];
  if (userHasReacted) {
    result.push(uid);
  }
  let idx = 0;
  while (result.length < safeCount) {
    result.push(`${prefix}_${idx++}`);
  }
  return result;
}

interface CommunityContextValue {
  authUser: FirebaseUser | null;
  isAuthReady: boolean;
  isAuthenticated: boolean;
  authBusy: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  clearAuthError: () => void;
  profiles: UserProfile[];
  currentUser: UserProfile;
  commentsByQuestion: Record<number, QuestionComment[]>;
  feedPosts: FeedPost[];
  notifications: CommunityNotification[];
  unreadNotificationsCount: number;
  viewedProfileId: string | null;
  isEditProfileOpen: boolean;
  feedFilterDiscipline: DisciplineType | 'all';
  setFeedFilterDiscipline: (disc: DisciplineType | 'all') => void;
  getProfileById: (id: string) => UserProfile | undefined;
  openProfile: (userId: string) => void;
  closeProfile: () => void;
  openEditProfile: () => void;
  closeEditProfile: () => void;
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => void;
  toggleFollow: (targetUserId: string) => void;
  isFollowing: (targetUserId: string) => boolean;
  addQuestionComment: (questionId: number, content: string) => void;
  toggleCommentUpvote: (questionId: number, commentId: string) => void;
  addCommentReply: (questionId: number, commentId: string, content: string) => void;
  createFeedPost: (payload: {
    type: FeedPostType;
    title?: string;
    content: string;
    tags: DisciplineType[];
    sharedQuestion?: SharedQuestionSummary;
  }) => FeedPost;
  togglePostLike: (postId: string) => void;
  togglePostSave: (postId: string) => void;
  addPostComment: (postId: string, content: string) => void;
  recordCompletedSimulado: (result: SimuladoResult, examTitle: string) => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
}

const CommunityContext = createContext<CommunityContextValue | undefined>(undefined);

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  // Auth state
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Local / seed fallback state
  const [localProfiles, setLocalProfiles] = useState<UserProfile[]>(() =>
    loadJson(STORAGE_KEYS.profiles, INITIAL_PROFILES)
  );
  const [localCommentsByQuestion, setLocalCommentsByQuestion] = useState<
    Record<number, QuestionComment[]>
  >(() => loadJson(STORAGE_KEYS.comments, INITIAL_QUESTION_COMMENTS));
  const [localFeedPosts, setLocalFeedPosts] = useState<FeedPost[]>(() =>
    loadJson(STORAGE_KEYS.posts, INITIAL_FEED_POSTS)
  );
  const [localNotifications, setLocalNotifications] = useState<CommunityNotification[]>(() =>
    loadJson(STORAGE_KEYS.notifications, INITIAL_NOTIFICATIONS)
  );

  // Live Firestore state (populated only when authenticated)
  const [fsProfiles, setFsProfiles] = useState<UserProfile[]>([]);
  const [fsFeedPostsRaw, setFsFeedPostsRaw] = useState<
    (FeedPost & { _likesCount?: number; _savesCount?: number })[]
  >([]);
  const [fsQuestionCommentsRaw, setFsQuestionCommentsRaw] = useState<
    (QuestionComment & { _upvotesCount?: number })[]
  >([]);
  const [fsReactions, setFsReactions] = useState<{ kind: string; targetId: string }[]>([]);
  const [fsNotifications, setFsNotifications] = useState<CommunityNotification[]>([]);
  const [bootstrappedProfile, setBootstrappedProfile] = useState<UserProfile | null>(null);

  const [viewedProfileId, setViewedProfileId] = useState<string | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [feedFilterDiscipline, setFeedFilterDiscipline] = useState<DisciplineType | 'all'>('all');

  const unsubRef = useRef<(() => void) | null>(null);

  // Persist local seed interactions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(localProfiles));
    } catch {}
  }, [localProfiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(localCommentsByQuestion));
    } catch {}
  }, [localCommentsByQuestion]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(localFeedPosts));
    } catch {}
  }, [localFeedPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(localNotifications));
    } catch {}
  }, [localNotifications]);

  // Firebase Auth listener + authenticated Firestore subscriptions
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (unsubRef.current) {
        unsubRef.current();
        unsubRef.current = null;
      }

      if (!fbUser) {
        setAuthUser(null);
        setBootstrappedProfile(null);
        setFsProfiles([]);
        setFsFeedPostsRaw([]);
        setFsQuestionCommentsRaw([]);
        setFsReactions([]);
        setFsNotifications([]);
        setIsAuthReady(true);
        return;
      }

      setAuthUser(fbUser);
      try {
        const profile = await ensureUserAccountAndProfile(fbUser);
        setBootstrappedProfile(profile);

        unsubRef.current = subscribeAuthenticatedCommunity(fbUser.uid, {
          onProfilesAndFollows: (rawProfiles, follows) => {
            const followersMap = new Map<string, string[]>();
            const followingMap = new Map<string, string[]>();

            follows.forEach((f) => {
              if (!followersMap.has(f.followingId)) followersMap.set(f.followingId, []);
              followersMap.get(f.followingId)!.push(f.followerId);

              if (!followingMap.has(f.followerId)) followingMap.set(f.followerId, []);
              followingMap.get(f.followerId)!.push(f.followingId);
            });

            const mapped = rawProfiles.map(({ uid, data }) =>
              mapProfileDoc(uid, data, followersMap.get(uid) || [], followingMap.get(uid) || [])
            );
            setFsProfiles(mapped);
          },
          onFeedPosts: (posts) => {
            setFsFeedPostsRaw(
              posts as (FeedPost & { _likesCount?: number; _savesCount?: number })[]
            );
          },
          onQuestionComments: (comments) => {
            setFsQuestionCommentsRaw(
              comments as (QuestionComment & { _upvotesCount?: number })[]
            );
          },
          onUserReactions: (reactions) => {
            setFsReactions(reactions);
          },
          onNotifications: (notifs) => {
            setFsNotifications(notifs);
          },
        });
      } catch (err) {
        console.error('Erro ao inicializar sessão Firestore:', err);
      } finally {
        setIsAuthReady(true);
      }
    });

    return () => {
      unsubAuth();
      if (unsubRef.current) {
        unsubRef.current();
        unsubRef.current = null;
      }
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha ao autenticar com o Google.';
      if (!msg.includes('popup-closed-by-user')) {
        setAuthError('Não foi possível concluir o login com Google. Tente novamente.');
      }
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      await signOut(auth);
      setViewedProfileId(null);
    } catch {
      setAuthError('Não foi possível encerrar a sessão.');
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const isAuthenticated = Boolean(authUser);
  const activeUserId = authUser?.uid || CURRENT_USER_ID;

  const firestoreProfileIds = useMemo(() => new Set(fsProfiles.map((p) => p.id)), [fsProfiles]);
  const firestorePostIds = useMemo(() => new Set(fsFeedPostsRaw.map((p) => p.id)), [fsFeedPostsRaw]);
  const firestoreCommentIds = useMemo(
    () => new Set(fsQuestionCommentsRaw.map((c) => c.id)),
    [fsQuestionCommentsRaw]
  );

  // Merge Firestore profiles + curated seed mentor profiles (excluding local demo 'user-roberto' when signed in)
  const profiles = useMemo(() => {
    if (!isAuthenticated) return localProfiles;

    const merged = [...fsProfiles];
    if (bootstrappedProfile && !merged.some((p) => p.id === bootstrappedProfile.id)) {
      merged.unshift(bootstrappedProfile);
    }
    localProfiles.forEach((lp) => {
      if (lp.id === CURRENT_USER_ID) return;
      if (!merged.some((p) => p.id === lp.id)) {
        merged.push(lp);
      }
    });
    return merged;
  }, [isAuthenticated, fsProfiles, bootstrappedProfile, localProfiles]);

  const currentUser = useMemo(() => {
    return (
      profiles.find((p) => p.id === activeUserId) ||
      bootstrappedProfile ||
      profiles[0] ||
      INITIAL_PROFILES[0]
    );
  }, [profiles, activeUserId, bootstrappedProfile]);

  const reactionSet = useMemo(() => {
    const likes = new Set<string>();
    const saves = new Set<string>();
    const upvotes = new Set<string>();
    fsReactions.forEach((r) => {
      if (r.kind === 'post_like') likes.add(r.targetId);
      if (r.kind === 'post_save') saves.add(r.targetId);
      if (r.kind === 'comment_upvote') upvotes.add(r.targetId);
    });
    return { likes, saves, upvotes };
  }, [fsReactions]);

  const feedPosts = useMemo(() => {
    if (!isAuthenticated) return localFeedPosts;

    const hydratedFs: FeedPost[] = fsFeedPostsRaw.map((p) => ({
      id: p.id,
      type: p.type,
      authorId: p.authorId,
      title: p.title,
      content: p.content,
      tags: p.tags,
      sharedQuestion: p.sharedQuestion,
      likedBy: buildReactionList(
        p._likesCount ?? 0,
        reactionSet.likes.has(p.id),
        activeUserId,
        `like_${p.id}`
      ),
      savedBy: buildReactionList(
        p._savesCount ?? 0,
        reactionSet.saves.has(p.id),
        activeUserId,
        `save_${p.id}`
      ),
      comments: p.comments,
      createdAt: p.createdAt,
    }));

    return [...hydratedFs, ...localFeedPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [isAuthenticated, fsFeedPostsRaw, localFeedPosts, reactionSet, activeUserId]);

  const commentsByQuestion = useMemo(() => {
    if (!isAuthenticated) return localCommentsByQuestion;

    const merged: Record<number, QuestionComment[]> = {};
    (Object.entries(localCommentsByQuestion) as [string, QuestionComment[]][]).forEach(
      ([qId, list]) => {
        merged[Number(qId)] = [...list];
      }
    );

    fsQuestionCommentsRaw.forEach((c) => {
      const hydrated: QuestionComment = {
        id: c.id,
        questionId: c.questionId,
        authorId: c.authorId,
        content: c.content,
        upvotedBy: buildReactionList(
          c._upvotesCount ?? 0,
          reactionSet.upvotes.has(c.id),
          activeUserId,
          `up_${c.id}`
        ),
        replies: c.replies,
        createdAt: c.createdAt,
      };
      if (!merged[c.questionId]) merged[c.questionId] = [];
      merged[c.questionId] = [hydrated, ...merged[c.questionId]];
    });

    return merged;
  }, [isAuthenticated, fsQuestionCommentsRaw, localCommentsByQuestion, reactionSet, activeUserId]);

  const notifications = useMemo(() => {
    if (!isAuthenticated) return localNotifications;
    return fsNotifications;
  }, [isAuthenticated, fsNotifications, localNotifications]);

  const getProfileById = useCallback(
    (id: string) => profiles.find((p) => p.id === id),
    [profiles]
  );

  const openProfile = useCallback((userId: string) => {
    setViewedProfileId(userId);
  }, []);

  const closeProfile = useCallback(() => {
    setViewedProfileId(null);
  }, []);

  const openEditProfile = useCallback(() => {
    setIsEditProfileOpen(true);
  }, []);

  const closeEditProfile = useCallback(() => {
    setIsEditProfileOpen(false);
  }, []);

  const updateCurrentUserProfile = useCallback(
    (updates: Partial<UserProfile>) => {
      if (authUser) {
        void updatePublicProfile(authUser.uid, updates, currentUser);
        return;
      }

      setLocalProfiles((prev) =>
        prev.map((profile) => {
          if (profile.id !== CURRENT_USER_ID) return profile;
          const merged = { ...profile, ...updates };
          if (merged.category === 'advogado' && merged.oabNumber && merged.oabUf) {
            merged.isVerified = updates.isVerified ?? true;
          }
          return merged;
        })
      );
    },
    [authUser, currentUser]
  );

  const isFollowing = useCallback(
    (targetUserId: string) => currentUser.followingIds.includes(targetUserId),
    [currentUser.followingIds]
  );

  const toggleFollow = useCallback(
    (targetUserId: string) => {
      if (targetUserId === activeUserId) return;

      if (authUser && firestoreProfileIds.has(targetUserId)) {
        const currentlyFollowing = currentUser.followingIds.includes(targetUserId);
        void toggleFollowRelation(authUser.uid, targetUserId, currentlyFollowing);
        return;
      }

      setLocalProfiles((prev) => {
        const me = prev.find((p) => p.id === CURRENT_USER_ID);
        if (!me) return prev;
        const alreadyFollowing = me.followingIds.includes(targetUserId);

        return prev.map((profile) => {
          if (profile.id === CURRENT_USER_ID) {
            const followingIds = alreadyFollowing
              ? profile.followingIds.filter((id) => id !== targetUserId)
              : [...profile.followingIds, targetUserId];
            return { ...profile, followingIds };
          }
          if (profile.id === targetUserId) {
            const followersIds = alreadyFollowing
              ? profile.followersIds.filter((id) => id !== CURRENT_USER_ID)
              : [...profile.followersIds.filter((id) => id !== CURRENT_USER_ID), CURRENT_USER_ID];
            return { ...profile, followersIds };
          }
          return profile;
        });
      });
    },
    [activeUserId, authUser, firestoreProfileIds, currentUser.followingIds]
  );

  const addQuestionComment = useCallback(
    (questionId: number, content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      if (authUser) {
        void addQuestionCommentInFirestore(
          authUser.uid,
          questionId,
          trimmed,
          currentUser.achievements
        );
        return;
      }

      const newComment: QuestionComment = {
        id: `qcomm-${questionId}-${Date.now()}`,
        questionId,
        authorId: CURRENT_USER_ID,
        content: trimmed,
        upvotedBy: [],
        replies: [],
        createdAt: new Date().toISOString(),
      };

      setLocalCommentsByQuestion((prev) => ({
        ...prev,
        [questionId]: [newComment, ...(prev[questionId] || [])],
      }));

      setLocalProfiles((prev) =>
        prev.map((p) =>
          p.id === CURRENT_USER_ID
            ? {
                ...p,
                reputationPoints: p.reputationPoints + 10,
                achievements: p.achievements.includes('Comentador Ativo')
                  ? p.achievements
                  : [...p.achievements, 'Comentador Ativo'],
              }
            : p
        )
      );
    },
    [authUser, currentUser.achievements]
  );

  const toggleCommentUpvote = useCallback(
    (questionId: number, commentId: string) => {
      if (authUser && firestoreCommentIds.has(commentId)) {
        const target = fsQuestionCommentsRaw.find((c) => c.id === commentId);
        const alreadyUpvoted = reactionSet.upvotes.has(commentId);
        void toggleQuestionCommentUpvoteInFirestore(
          authUser.uid,
          commentId,
          questionId,
          alreadyUpvoted,
          target?.authorId
        );
        return;
      }

      let affectedAuthorId: string | null = null;
      let addedUpvote = false;

      setLocalCommentsByQuestion((prev) => {
        const list = prev[questionId] || [];
        const updated = list.map((comment) => {
          if (comment.id !== commentId) return comment;
          affectedAuthorId = comment.authorId;
          const alreadyUpvoted = comment.upvotedBy.includes(CURRENT_USER_ID);
          addedUpvote = !alreadyUpvoted;
          const upvotedBy = alreadyUpvoted
            ? comment.upvotedBy.filter((id) => id !== CURRENT_USER_ID)
            : [...comment.upvotedBy, CURRENT_USER_ID];
          return { ...comment, upvotedBy };
        });
        return { ...prev, [questionId]: updated };
      });

      if (affectedAuthorId && affectedAuthorId !== CURRENT_USER_ID) {
        setLocalProfiles((prev) =>
          prev.map((p) =>
            p.id === affectedAuthorId
              ? { ...p, reputationPoints: Math.max(0, p.reputationPoints + (addedUpvote ? 5 : -5)) }
              : p
          )
        );
      }
    },
    [authUser, firestoreCommentIds, fsQuestionCommentsRaw, reactionSet.upvotes]
  );

  const addCommentReply = useCallback(
    (questionId: number, commentId: string, content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      if (authUser && firestoreCommentIds.has(commentId)) {
        const target = fsQuestionCommentsRaw.find((c) => c.id === commentId);
        void addQuestionCommentReplyInFirestore(
          authUser.uid,
          commentId,
          questionId,
          trimmed,
          target?.authorId
        );
        return;
      }

      const replyId = `qreply-${Date.now()}`;
      setLocalCommentsByQuestion((prev) => {
        const list = prev[questionId] || [];
        const updated = list.map((comment) => {
          if (comment.id !== commentId) return comment;
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: replyId,
                authorId: CURRENT_USER_ID,
                content: trimmed,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        });
        return { ...prev, [questionId]: updated };
      });

      setLocalProfiles((prev) =>
        prev.map((p) =>
          p.id === CURRENT_USER_ID ? { ...p, reputationPoints: p.reputationPoints + 5 } : p
        )
      );
    },
    [authUser, firestoreCommentIds, fsQuestionCommentsRaw]
  );

  const createFeedPost = useCallback(
    (payload: {
      type: FeedPostType;
      title?: string;
      content: string;
      tags: DisciplineType[];
      sharedQuestion?: SharedQuestionSummary;
    }): FeedPost => {
      if (authUser) {
        const tempPost: FeedPost = {
          id: `fspost_pending_${Date.now()}`,
          type: payload.type,
          authorId: authUser.uid,
          title: payload.title?.trim() || undefined,
          content: payload.content.trim(),
          tags: payload.tags,
          sharedQuestion: payload.sharedQuestion,
          likedBy: [],
          savedBy: [],
          comments: [],
          createdAt: new Date().toISOString(),
        };
        void createFeedPostInFirestore(authUser.uid, payload, currentUser.achievements);
        return tempPost;
      }

      const newPost: FeedPost = {
        id: `post-${Date.now()}`,
        type: payload.type,
        authorId: CURRENT_USER_ID,
        title: payload.title?.trim() || undefined,
        content: payload.content.trim(),
        tags: payload.tags,
        sharedQuestion: payload.sharedQuestion,
        likedBy: [],
        savedBy: [],
        comments: [],
        createdAt: new Date().toISOString(),
      };

      setLocalFeedPosts((prev) => [newPost, ...prev]);

      const pts = payload.type === 'artigo' ? 20 : 10;
      setLocalProfiles((prev) =>
        prev.map((p) => {
          if (p.id !== CURRENT_USER_ID) return p;
          const nextAchievements = [...p.achievements];
          if (payload.type === 'artigo' && !nextAchievements.includes('Articulista Jurídico')) {
            nextAchievements.push('Articulista Jurídico');
          }
          return {
            ...p,
            reputationPoints: p.reputationPoints + pts,
            achievements: nextAchievements,
          };
        })
      );

      return newPost;
    },
    [authUser, currentUser.achievements]
  );

  const togglePostLike = useCallback(
    (postId: string) => {
      if (authUser && firestorePostIds.has(postId)) {
        const target = fsFeedPostsRaw.find((p) => p.id === postId);
        const alreadyLiked = reactionSet.likes.has(postId);
        void toggleFeedPostReactionInFirestore(
          authUser.uid,
          postId,
          'post_like',
          alreadyLiked,
          target?.authorId
        );
        return;
      }

      let targetAuthorId: string | null = null;
      let liked = false;

      setLocalFeedPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          targetAuthorId = post.authorId;
          const alreadyLiked = post.likedBy.includes(CURRENT_USER_ID);
          liked = !alreadyLiked;
          return {
            ...post,
            likedBy: alreadyLiked
              ? post.likedBy.filter((id) => id !== CURRENT_USER_ID)
              : [...post.likedBy, CURRENT_USER_ID],
          };
        })
      );

      if (targetAuthorId && targetAuthorId !== CURRENT_USER_ID) {
        setLocalProfiles((prev) =>
          prev.map((p) =>
            p.id === targetAuthorId
              ? { ...p, reputationPoints: Math.max(0, p.reputationPoints + (liked ? 3 : -3)) }
              : p
          )
        );
      }
    },
    [authUser, firestorePostIds, fsFeedPostsRaw, reactionSet.likes]
  );

  const togglePostSave = useCallback(
    (postId: string) => {
      if (authUser && firestorePostIds.has(postId)) {
        const alreadySaved = reactionSet.saves.has(postId);
        void toggleFeedPostReactionInFirestore(authUser.uid, postId, 'post_save', alreadySaved);
        return;
      }

      setLocalFeedPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          const alreadySaved = post.savedBy.includes(CURRENT_USER_ID);
          return {
            ...post,
            savedBy: alreadySaved
              ? post.savedBy.filter((id) => id !== CURRENT_USER_ID)
              : [...post.savedBy, CURRENT_USER_ID],
          };
        })
      );
    },
    [authUser, firestorePostIds, reactionSet.saves]
  );

  const addPostComment = useCallback(
    (postId: string, content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      if (authUser && firestorePostIds.has(postId)) {
        const target = fsFeedPostsRaw.find((p) => p.id === postId);
        void addFeedPostCommentInFirestore(authUser.uid, postId, trimmed, target?.authorId);
        return;
      }

      setLocalFeedPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `fcomm-${Date.now()}`,
                authorId: CURRENT_USER_ID,
                content: trimmed,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        })
      );

      setLocalProfiles((prev) =>
        prev.map((p) =>
          p.id === CURRENT_USER_ID ? { ...p, reputationPoints: p.reputationPoints + 4 } : p
        )
      );
    },
    [authUser, firestorePostIds, fsFeedPostsRaw]
  );

  const recordCompletedSimulado = useCallback(
    (result: SimuladoResult, examTitle: string) => {
      if (authUser) {
        const examSlug = examTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'simulado';
        void recordSimuladoAttemptInFirestore(authUser.uid, examSlug, examTitle, result, currentUser);
        return;
      }

      setLocalProfiles((prev) =>
        prev.map((p) => {
          if (p.id !== CURRENT_USER_ID) return p;
          const nextAchievements = [...p.achievements];
          const matchEdition = examTitle.match(/(\d+º)\s+Exame/i);
          if (result.isApproved) {
            const badge = matchEdition
              ? `Aprovado no Simulado ${matchEdition[1]} Exame`
              : 'Aprovado em Simulado Oficial (40+ Acertos)';
            if (!nextAchievements.includes(badge)) {
              nextAchievements.push(badge);
            }
          }
          const topDiscs = result.disciplineScores
            .filter((d) => d.total > 0)
            .slice(0, 6)
            .map((d) => ({
              discipline: d.discipline,
              accuracy: Math.round(d.percentage),
              answered: d.total,
            }));

          return {
            ...p,
            completedSimulados: p.completedSimulados + 1,
            reputationPoints: p.reputationPoints + (result.isApproved ? 50 : 25),
            achievements: nextAchievements,
            performanceByDiscipline: topDiscs.length > 0 ? topDiscs : p.performanceByDiscipline,
          };
        })
      );
    },
    [authUser, currentUser]
  );

  const markAllNotificationsRead = useCallback(() => {
    if (authUser) {
      const unreadIds = fsNotifications.filter((n) => !n.read).map((n) => n.id);
      void markAllNotificationsReadInFirestore(authUser.uid, unreadIds);
      return;
    }
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [authUser, fsNotifications]);

  const markNotificationRead = useCallback(
    (id: string) => {
      if (authUser) {
        void markNotificationReadInFirestore(authUser.uid, id);
        return;
      }
      setLocalNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    },
    [authUser]
  );

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <CommunityContext.Provider
      value={{
        authUser,
        isAuthReady,
        isAuthenticated,
        authBusy,
        authError,
        signInWithGoogle,
        signOutUser,
        clearAuthError,
        profiles,
        currentUser,
        commentsByQuestion,
        feedPosts,
        notifications,
        unreadNotificationsCount,
        viewedProfileId,
        isEditProfileOpen,
        feedFilterDiscipline,
        setFeedFilterDiscipline,
        getProfileById,
        openProfile,
        closeProfile,
        openEditProfile,
        closeEditProfile,
        updateCurrentUserProfile,
        toggleFollow,
        isFollowing,
        addQuestionComment,
        toggleCommentUpvote,
        addCommentReply,
        createFeedPost,
        togglePostLike,
        togglePostSave,
        addPostComment,
        recordCompletedSimulado,
        markAllNotificationsRead,
        markNotificationRead,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return ctx;
}
