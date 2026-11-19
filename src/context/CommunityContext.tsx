import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

interface CommunityContextValue {
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
  const [profiles, setProfiles] = useState<UserProfile[]>(() =>
    loadJson(STORAGE_KEYS.profiles, INITIAL_PROFILES)
  );
  const [commentsByQuestion, setCommentsByQuestion] = useState<Record<number, QuestionComment[]>>(() =>
    loadJson(STORAGE_KEYS.comments, INITIAL_QUESTION_COMMENTS)
  );
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(() =>
    loadJson(STORAGE_KEYS.posts, INITIAL_FEED_POSTS)
  );
  const [notifications, setNotifications] = useState<CommunityNotification[]>(() =>
    loadJson(STORAGE_KEYS.notifications, INITIAL_NOTIFICATIONS)
  );

  const [viewedProfileId, setViewedProfileId] = useState<string | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [feedFilterDiscipline, setFeedFilterDiscipline] = useState<DisciplineType | 'all'>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles));
    } catch {}
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(commentsByQuestion));
    } catch {}
  }, [commentsByQuestion]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(feedPosts));
    } catch {}
  }, [feedPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const currentUser =
    profiles.find((p) => p.id === CURRENT_USER_ID) || profiles[0] || INITIAL_PROFILES[0];

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

  const updateCurrentUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfiles((prev) =>
      prev.map((profile) => {
        if (profile.id !== CURRENT_USER_ID) return profile;
        const merged = { ...profile, ...updates };
        // Keep verification visual flag synchronized when OAB is filled for Advogado(a)
        if (merged.category === 'advogado' && merged.oabNumber && merged.oabUf) {
          merged.isVerified = updates.isVerified ?? true;
        }
        return merged;
      })
    );
  }, []);

  const isFollowing = useCallback(
    (targetUserId: string) => currentUser.followingIds.includes(targetUserId),
    [currentUser.followingIds]
  );

  const toggleFollow = useCallback((targetUserId: string) => {
    if (targetUserId === CURRENT_USER_ID) return;

    setProfiles((prev) => {
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
  }, []);

  const addQuestionComment = useCallback((questionId: number, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const newComment: QuestionComment = {
      id: `qcomm-${questionId}-${Date.now()}`,
      questionId,
      authorId: CURRENT_USER_ID,
      content: trimmed,
      upvotedBy: [],
      replies: [],
      createdAt: new Date().toISOString(),
    };

    setCommentsByQuestion((prev) => ({
      ...prev,
      [questionId]: [newComment, ...(prev[questionId] || [])],
    }));

    setProfiles((prev) =>
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
  }, []);

  const toggleCommentUpvote = useCallback((questionId: number, commentId: string) => {
    let affectedAuthorId: string | null = null;
    let addedUpvote = false;

    setCommentsByQuestion((prev) => {
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
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === affectedAuthorId
            ? { ...p, reputationPoints: Math.max(0, p.reputationPoints + (addedUpvote ? 5 : -5)) }
            : p
        )
      );
    }
  }, []);

  const addCommentReply = useCallback((questionId: number, commentId: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const replyId = `qreply-${Date.now()}`;
    setCommentsByQuestion((prev) => {
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

    setProfiles((prev) =>
      prev.map((p) =>
        p.id === CURRENT_USER_ID ? { ...p, reputationPoints: p.reputationPoints + 5 } : p
      )
    );
  }, []);

  const createFeedPost = useCallback(
    (payload: {
      type: FeedPostType;
      title?: string;
      content: string;
      tags: DisciplineType[];
      sharedQuestion?: SharedQuestionSummary;
    }): FeedPost => {
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

      setFeedPosts((prev) => [newPost, ...prev]);

      const pts = payload.type === 'artigo' ? 20 : 10;
      setProfiles((prev) =>
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
    []
  );

  const togglePostLike = useCallback((postId: string) => {
    let targetAuthorId: string | null = null;
    let liked = false;

    setFeedPosts((prev) =>
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
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === targetAuthorId
            ? { ...p, reputationPoints: Math.max(0, p.reputationPoints + (liked ? 3 : -3)) }
            : p
        )
      );
    }
  }, []);

  const togglePostSave = useCallback((postId: string) => {
    setFeedPosts((prev) =>
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
  }, []);

  const addPostComment = useCallback((postId: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    setFeedPosts((prev) =>
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

    setProfiles((prev) =>
      prev.map((p) =>
        p.id === CURRENT_USER_ID ? { ...p, reputationPoints: p.reputationPoints + 4 } : p
      )
    );
  }, []);

  const recordCompletedSimulado = useCallback((result: SimuladoResult, examTitle: string) => {
    setProfiles((prev) =>
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
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <CommunityContext.Provider
      value={{
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
