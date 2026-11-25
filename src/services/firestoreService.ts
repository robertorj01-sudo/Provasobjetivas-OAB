import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
  Unsubscribe,
} from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { db } from '../firebase';
import {
  CommentReply,
  CommunityNotification,
  DisciplinePerformanceStat,
  FeedComment,
  FeedPost,
  FeedPostType,
  QuestionComment,
  SharedQuestionSummary,
  SharedRevisionList,
  UserProfile,
} from '../types/community';
import { DisciplineType, OptionLetter, SimuladoResult } from '../types/oab';
import { OperationType, handleFirestoreError } from '../utils/firestoreError';
import {
  BLUEPRINT_LIMITS,
  normalizeCategory,
  normalizeCoverTheme,
  optionalFieldValue,
  sanitizeHandle,
  sanitizeId,
  sanitizeSharedQuestion,
  truncateText,
} from '../utils/firestorePayload';

function timestampToIso(val: unknown): string {
  if (val instanceof Timestamp) {
    return val.toDate().toISOString();
  }
  if (typeof val === 'string') return val;
  return new Date().toISOString();
}

export interface FirestoreUserData {
  profile: UserProfile;
}

export async function ensureUserAccountAndProfile(fbUser: FirebaseUser): Promise<UserProfile> {
  const uid = fbUser.uid;
  const userPath = `users/${uid}`;
  const profilePath = `publicProfiles/${uid}`;
  const displayName = truncateText(fbUser.displayName || 'Jurista OAB', BLUEPRINT_LIMITS.nameMax);
  const email = truncateText(fbUser.email || 'usuario@juristantum.app', 320);

  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid,
        email,
        displayName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      const existing = userSnap.data();
      if (existing.email !== email || existing.displayName !== displayName) {
        await updateDoc(userRef, {
          email,
          displayName,
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }

  try {
    const profileRef = doc(db, 'publicProfiles', uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      const handleBase = email.includes('@') ? email.split('@')[0] : displayName;
      const handle = sanitizeHandle(handleBase, uid);
      const initialPayload: Record<string, unknown> = {
        uid,
        isPublic: true,
        name: displayName,
        handle,
        coverTheme: 'navy',
        roleTitle: 'Bacharel / Examinando OAB · Comunidade Juris Tantum',
        bio: 'Estudante focado na aprovação no Exame de Ordem Unificado (Banca FGV).',
        category: 'examinando',
        targetExam: '47º Exame da OAB',
        isVerified: false,
        specialties: ['Ética Profissional', 'Direito Constitucional'],
        followersCount: 0,
        followingCount: 0,
        reputationPoints: 0,
        completedSimulados: 0,
        achievements: ['Membro Juris Tantum'],
        showPerformanceShowcase: true,
        performanceByDiscipline: [],
        sharedLists: [],
        joinedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (fbUser.photoURL && fbUser.photoURL.length <= BLUEPRINT_LIMITS.avatarUrlMax) {
        initialPayload.avatarUrl = fbUser.photoURL;
      }
      await setDoc(profileRef, initialPayload);
      return mapProfileDoc(uid, initialPayload, [], []);
    }

    return mapProfileDoc(uid, profileSnap.data(), [], []);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, profilePath);
  }
}

export function mapProfileDoc(
  uid: string,
  data: Record<string, unknown>,
  followersIds: string[],
  followingIds: string[]
): UserProfile {
  return {
    id: uid,
    name: typeof data.name === 'string' ? data.name : 'Jurista OAB',
    handle: typeof data.handle === 'string' ? data.handle : 'usuario.oab',
    avatarUrl: typeof data.avatarUrl === 'string' ? data.avatarUrl : undefined,
    coverTheme: normalizeCoverTheme(typeof data.coverTheme === 'string' ? data.coverTheme : undefined),
    roleTitle: typeof data.roleTitle === 'string' ? data.roleTitle : '',
    bio: typeof data.bio === 'string' ? data.bio : '',
    category: normalizeCategory(typeof data.category === 'string' ? data.category : undefined),
    institution: typeof data.institution === 'string' ? data.institution : undefined,
    semester: typeof data.semester === 'string' ? data.semester : undefined,
    targetExam: typeof data.targetExam === 'string' ? data.targetExam : undefined,
    oabNumber: typeof data.oabNumber === 'string' ? data.oabNumber : undefined,
    oabUf: typeof data.oabUf === 'string' ? data.oabUf : undefined,
    isVerified: Boolean(data.isVerified),
    specialties: Array.isArray(data.specialties) ? (data.specialties as DisciplineType[]) : [],
    followersIds,
    followingIds,
    reputationPoints: typeof data.reputationPoints === 'number' ? data.reputationPoints : 0,
    completedSimulados: typeof data.completedSimulados === 'number' ? data.completedSimulados : 0,
    achievements: Array.isArray(data.achievements) ? (data.achievements as string[]) : [],
    showPerformanceShowcase:
      typeof data.showPerformanceShowcase === 'boolean' ? data.showPerformanceShowcase : true,
    performanceByDiscipline: Array.isArray(data.performanceByDiscipline)
      ? (data.performanceByDiscipline as DisciplinePerformanceStat[])
      : [],
    sharedLists: Array.isArray(data.sharedLists) ? (data.sharedLists as SharedRevisionList[]) : [],
    joinedAt: timestampToIso(data.joinedAt),
  };
}

export async function updatePublicProfile(
  uid: string,
  updates: Partial<UserProfile>,
  currentProfile: UserProfile
): Promise<void> {
  const path = `publicProfiles/${uid}`;
  const category = normalizeCategory(updates.category ?? currentProfile.category);
  const oabNumber = category === 'advogado' ? updates.oabNumber ?? currentProfile.oabNumber : undefined;
  const oabUf = category === 'advogado' ? updates.oabUf ?? currentProfile.oabUf : undefined;
  const isVerified =
    category === 'advogado' && Boolean(oabNumber?.trim() && oabUf?.trim())
      ? updates.isVerified ?? true
      : false;

  const payload: Record<string, unknown> = {
    name: truncateText(updates.name ?? currentProfile.name, BLUEPRINT_LIMITS.nameMax) || 'Jurista OAB',
    handle: sanitizeHandle(updates.handle ?? currentProfile.handle, uid),
    avatarUrl: optionalFieldValue(
      updates.avatarUrl !== undefined ? updates.avatarUrl : currentProfile.avatarUrl,
      BLUEPRINT_LIMITS.avatarUrlMax
    ),
    coverTheme: normalizeCoverTheme(updates.coverTheme ?? currentProfile.coverTheme),
    roleTitle: truncateText(updates.roleTitle ?? currentProfile.roleTitle, BLUEPRINT_LIMITS.roleTitleMax),
    bio: truncateText(updates.bio ?? currentProfile.bio, BLUEPRINT_LIMITS.bioMax),
    category,
    institution: optionalFieldValue(
      updates.institution !== undefined ? updates.institution : currentProfile.institution,
      BLUEPRINT_LIMITS.institutionMax
    ),
    semester:
      category === 'estudante'
        ? optionalFieldValue(
            updates.semester !== undefined ? updates.semester : currentProfile.semester,
            BLUEPRINT_LIMITS.semesterMax
          )
        : deleteField(),
    targetExam:
      category !== 'advogado'
        ? optionalFieldValue(
            updates.targetExam !== undefined ? updates.targetExam : currentProfile.targetExam,
            BLUEPRINT_LIMITS.targetExamMax
          )
        : deleteField(),
    oabNumber: optionalFieldValue(oabNumber, BLUEPRINT_LIMITS.oabNumberMax),
    oabUf: optionalFieldValue(oabUf, BLUEPRINT_LIMITS.oabUfMax),
    isVerified,
    specialties: (updates.specialties ?? currentProfile.specialties).slice(
      0,
      BLUEPRINT_LIMITS.specialtiesMax
    ),
    showPerformanceShowcase:
      updates.showPerformanceShowcase ?? currentProfile.showPerformanceShowcase,
    updatedAt: serverTimestamp(),
  };

  try {
    await updateDoc(doc(db, 'publicProfiles', uid), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function toggleFollowRelation(
  followerUid: string,
  targetUid: string,
  currentlyFollowing: boolean
): Promise<void> {
  const followId = sanitizeId(`${followerUid}_${targetUid}`);
  const path = `follows/${followId}`;
  const batch = writeBatch(db);
  const followRef = doc(db, 'follows', followId);
  const targetProfileRef = doc(db, 'publicProfiles', targetUid);
  const selfProfileRef = doc(db, 'publicProfiles', followerUid);

  if (currentlyFollowing) {
    batch.delete(followRef);
    batch.update(targetProfileRef, {
      followersCount: increment(-1),
      updatedAt: serverTimestamp(),
    });
    batch.update(selfProfileRef, {
      followingCount: increment(-1),
      updatedAt: serverTimestamp(),
    });
  } else {
    batch.set(followRef, {
      followerId: followerUid,
      followingId: targetUid,
      isPublic: true,
      createdAt: serverTimestamp(),
    });
    batch.update(targetProfileRef, {
      followersCount: increment(1),
      updatedAt: serverTimestamp(),
    });
    batch.update(selfProfileRef, {
      followingCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    const notifId = sanitizeId(`notif_follow_${followerUid}_${Date.now()}`);
    batch.set(doc(db, 'users', targetUid, 'notifications', notifId), {
      id: notifId,
      recipientId: targetUid,
      actorId: followerUid,
      type: 'follow',
      text: 'começou a seguir seu perfil jurídico.',
      read: false,
      createdAt: serverTimestamp(),
    });
  }

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function createFeedPostInFirestore(
  uid: string,
  payload: {
    type: FeedPostType;
    title?: string;
    content: string;
    tags: DisciplineType[];
    sharedQuestion?: SharedQuestionSummary;
  },
  currentAchievements: string[]
): Promise<FeedPost> {
  const postId = sanitizeId(`fspost_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);
  const path = `feedPosts/${postId}`;
  const trimmedContent = truncateText(payload.content, BLUEPRINT_LIMITS.postContentMax);
  const trimmedTitle = truncateText(payload.title, BLUEPRINT_LIMITS.postTitleMax);
  const sanitizedTags = payload.tags.slice(0, BLUEPRINT_LIMITS.postTagsMax);
  const sanitizedShared = sanitizeSharedQuestion(payload.sharedQuestion);

  const docData: Record<string, unknown> = {
    id: postId,
    visibility: 'public',
    type: payload.type,
    authorId: uid,
    content: trimmedContent,
    tags: sanitizedTags,
    likesCount: 0,
    savesCount: 0,
    commentsCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (trimmedTitle) {
    docData.title = trimmedTitle;
  }
  if (sanitizedShared) {
    docData.sharedQuestion = sanitizedShared;
  }

  const pts = payload.type === 'artigo' ? 20 : 10;
  const nextAchievements = [...currentAchievements];
  if (payload.type === 'artigo' && !nextAchievements.includes('Articulista Jurídico')) {
    nextAchievements.push('Articulista Jurídico');
  }

  const batch = writeBatch(db);
  batch.set(doc(db, 'feedPosts', postId), docData);
  batch.update(doc(db, 'publicProfiles', uid), {
    reputationPoints: increment(pts),
    achievements: nextAchievements.slice(0, BLUEPRINT_LIMITS.achievementsMax),
    updatedAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }

  return {
    id: postId,
    type: payload.type,
    authorId: uid,
    title: trimmedTitle || undefined,
    content: trimmedContent,
    tags: sanitizedTags,
    sharedQuestion: sanitizedShared,
    likedBy: [],
    savedBy: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };
}

export async function toggleFeedPostReactionInFirestore(
  uid: string,
  postId: string,
  kind: 'post_like' | 'post_save',
  isCurrentlyActive: boolean,
  authorId?: string
): Promise<void> {
  const subcol = kind === 'post_like' ? 'likes' : 'saves';
  const countField = kind === 'post_like' ? 'likesCount' : 'savesCount';
  const reactionId = sanitizeId(`${kind}_${postId}`);
  const path = `feedPosts/${postId}/${subcol}/${uid}`;

  const batch = writeBatch(db);
  const markerRef = doc(db, 'feedPosts', postId, subcol, uid);
  const postRef = doc(db, 'feedPosts', postId);
  const userReactionRef = doc(db, 'users', uid, 'reactions', reactionId);

  if (isCurrentlyActive) {
    batch.delete(markerRef);
    batch.update(postRef, {
      [countField]: increment(-1),
      updatedAt: serverTimestamp(),
    });
    batch.delete(userReactionRef);
  } else {
    batch.set(markerRef, {
      userId: uid,
      postId,
      createdAt: serverTimestamp(),
    });
    batch.update(postRef, {
      [countField]: increment(1),
      updatedAt: serverTimestamp(),
    });
    batch.set(userReactionRef, {
      userId: uid,
      kind,
      targetId: postId,
      createdAt: serverTimestamp(),
    });

    if (kind === 'post_like' && authorId && authorId !== uid) {
      const notifId = sanitizeId(`notif_like_${postId}_${uid}_${Date.now()}`);
      batch.set(doc(db, 'users', authorId, 'notifications', notifId), {
        id: notifId,
        recipientId: authorId,
        actorId: uid,
        type: 'like',
        text: 'recomendou sua publicação na Comunidade Juris Tantum.',
        targetPostId: postId,
        read: false,
        createdAt: serverTimestamp(),
      });
    }
  }

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function addFeedPostCommentInFirestore(
  uid: string,
  postId: string,
  content: string,
  postAuthorId?: string
): Promise<FeedComment> {
  const commentId = sanitizeId(`fsc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
  const path = `feedPosts/${postId}/comments/${commentId}`;
  const trimmed = truncateText(content, BLUEPRINT_LIMITS.postCommentMax);

  const batch = writeBatch(db);
  batch.set(doc(db, 'feedPosts', postId, 'comments', commentId), {
    id: commentId,
    postId,
    authorId: uid,
    visibility: 'public',
    content: trimmed,
    createdAt: serverTimestamp(),
  });
  batch.update(doc(db, 'feedPosts', postId), {
    commentsCount: increment(1),
    updatedAt: serverTimestamp(),
  });
  batch.update(doc(db, 'publicProfiles', uid), {
    reputationPoints: increment(4),
    updatedAt: serverTimestamp(),
  });

  if (postAuthorId && postAuthorId !== uid) {
    const notifId = sanitizeId(`notif_fcomm_${commentId}`);
    batch.set(doc(db, 'users', postAuthorId, 'notifications', notifId), {
      id: notifId,
      recipientId: postAuthorId,
      actorId: uid,
      type: 'comment',
      text: 'comentou na sua publicação da Comunidade.',
      targetPostId: postId,
      read: false,
      createdAt: serverTimestamp(),
    });
  }

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }

  return {
    id: commentId,
    authorId: uid,
    content: trimmed,
    createdAt: new Date().toISOString(),
  };
}

export async function addQuestionCommentInFirestore(
  uid: string,
  questionId: number,
  content: string,
  currentAchievements: string[]
): Promise<QuestionComment> {
  const commentId = sanitizeId(
    `fsqc_${questionId}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  );
  const path = `questionComments/${commentId}`;
  const trimmed = truncateText(content, BLUEPRINT_LIMITS.questionCommentMax);
  const nextAchievements = currentAchievements.includes('Comentador Ativo')
    ? currentAchievements
    : [...currentAchievements, 'Comentador Ativo'];

  const batch = writeBatch(db);
  batch.set(doc(db, 'questionComments', commentId), {
    id: commentId,
    questionId: Math.trunc(questionId),
    authorId: uid,
    visibility: 'public',
    content: trimmed,
    upvotesCount: 0,
    repliesCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  batch.update(doc(db, 'publicProfiles', uid), {
    reputationPoints: increment(10),
    achievements: nextAchievements.slice(0, BLUEPRINT_LIMITS.achievementsMax),
    updatedAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }

  return {
    id: commentId,
    questionId,
    authorId: uid,
    content: trimmed,
    upvotedBy: [],
    replies: [],
    createdAt: new Date().toISOString(),
  };
}

export async function toggleQuestionCommentUpvoteInFirestore(
  uid: string,
  commentId: string,
  questionId: number,
  isCurrentlyUpvoted: boolean,
  commentAuthorId?: string
): Promise<void> {
  const reactionId = sanitizeId(`comment_upvote_${commentId}`);
  const path = `questionComments/${commentId}/upvotes/${uid}`;

  const batch = writeBatch(db);
  const upvoteRef = doc(db, 'questionComments', commentId, 'upvotes', uid);
  const commentRef = doc(db, 'questionComments', commentId);
  const userReactionRef = doc(db, 'users', uid, 'reactions', reactionId);

  if (isCurrentlyUpvoted) {
    batch.delete(upvoteRef);
    batch.update(commentRef, {
      upvotesCount: increment(-1),
      updatedAt: serverTimestamp(),
    });
    batch.delete(userReactionRef);
  } else {
    batch.set(upvoteRef, {
      userId: uid,
      commentId,
      createdAt: serverTimestamp(),
    });
    batch.update(commentRef, {
      upvotesCount: increment(1),
      updatedAt: serverTimestamp(),
    });
    batch.set(userReactionRef, {
      userId: uid,
      kind: 'comment_upvote',
      targetId: commentId,
      createdAt: serverTimestamp(),
    });

    if (commentAuthorId && commentAuthorId !== uid) {
      const notifId = sanitizeId(`notif_up_${commentId}_${uid}_${Date.now()}`);
      batch.set(doc(db, 'users', commentAuthorId, 'notifications', notifId), {
        id: notifId,
        recipientId: commentAuthorId,
        actorId: uid,
        type: 'upvote',
        text: 'marcou como útil sua explicação jurídica na questão.',
        targetQuestionId: Math.trunc(questionId),
        read: false,
        createdAt: serverTimestamp(),
      });
    }
  }

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function addQuestionCommentReplyInFirestore(
  uid: string,
  commentId: string,
  questionId: number,
  content: string,
  parentAuthorId?: string
): Promise<CommentReply> {
  const replyId = sanitizeId(`fsqr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
  const path = `questionComments/${commentId}/replies/${replyId}`;
  const trimmed = truncateText(content, BLUEPRINT_LIMITS.questionReplyMax);

  const batch = writeBatch(db);
  batch.set(doc(db, 'questionComments', commentId, 'replies', replyId), {
    id: replyId,
    commentId,
    authorId: uid,
    visibility: 'public',
    content: trimmed,
    createdAt: serverTimestamp(),
  });
  batch.update(doc(db, 'questionComments', commentId), {
    repliesCount: increment(1),
    updatedAt: serverTimestamp(),
  });
  batch.update(doc(db, 'publicProfiles', uid), {
    reputationPoints: increment(5),
    updatedAt: serverTimestamp(),
  });

  if (parentAuthorId && parentAuthorId !== uid) {
    const notifId = sanitizeId(`notif_rep_${replyId}`);
    batch.set(doc(db, 'users', parentAuthorId, 'notifications', notifId), {
      id: notifId,
      recipientId: parentAuthorId,
      actorId: uid,
      type: 'reply',
      text: 'respondeu ao seu comentário fundamentado na questão.',
      targetQuestionId: Math.trunc(questionId),
      read: false,
      createdAt: serverTimestamp(),
    });
  }

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }

  return {
    id: replyId,
    authorId: uid,
    content: trimmed,
    createdAt: new Date().toISOString(),
  };
}

export async function recordSimuladoAttemptInFirestore(
  uid: string,
  examId: string,
  examTitle: string,
  result: SimuladoResult,
  currentProfile: UserProfile
): Promise<void> {
  const attemptId = sanitizeId(`sim_${examId}_${Date.now()}`);
  const path = `users/${uid}/simuladoHistory/${attemptId}`;

  const nextAchievements = [...currentProfile.achievements];
  const matchEdition = examTitle.match(/(\d+º)\s+Exame/i);
  if (result.isApproved) {
    const badge = matchEdition
      ? `Aprovado no Simulado ${matchEdition[1]} Exame`
      : 'Aprovado em Simulado Oficial (50%+ Acertos)';
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

  const pts = result.isApproved ? 50 : 25;

  const batch = writeBatch(db);
  batch.set(doc(db, 'users', uid, 'simuladoHistory', attemptId), {
    id: attemptId,
    userId: uid,
    examId: truncateText(examId, 64),
    examTitle: truncateText(examTitle, 160),
    totalQuestions: Math.trunc(result.totalQuestions),
    correctCount: Math.trunc(result.correctCount),
    wrongCount: Math.trunc(result.wrongCount),
    unansweredCount: Math.trunc(result.unansweredCount),
    percentage: Number(result.scorePercentage.toFixed(2)),
    isApproved: Boolean(result.isApproved),
    timeSpentSeconds: Math.max(0, Math.trunc(result.timeSpentSeconds)),
    disciplineScores: result.disciplineScores.slice(0, 25),
    createdAt: serverTimestamp(),
  });

  batch.update(doc(db, 'publicProfiles', uid), {
    completedSimulados: increment(1),
    reputationPoints: increment(pts),
    achievements: nextAchievements.slice(0, BLUEPRINT_LIMITS.achievementsMax),
    performanceByDiscipline:
      topDiscs.length > 0
        ? topDiscs.slice(0, BLUEPRINT_LIMITS.performanceMax)
        : currentProfile.performanceByDiscipline.slice(0, BLUEPRINT_LIMITS.performanceMax),
    updatedAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function markNotificationReadInFirestore(
  uid: string,
  notificationId: string
): Promise<void> {
  const path = `users/${uid}/notifications/${notificationId}`;
  try {
    await updateDoc(doc(db, 'users', uid, 'notifications', notificationId), {
      read: true,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function markAllNotificationsReadInFirestore(
  uid: string,
  unreadIds: string[]
): Promise<void> {
  if (unreadIds.length === 0) return;
  const path = `users/${uid}/notifications`;
  const batch = writeBatch(db);
  unreadIds.forEach((id) => {
    batch.update(doc(db, 'users', uid, 'notifications', id), { read: true });
  });
  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function toggleBookmarkInFirestore(
  uid: string,
  questionId: number,
  shouldBookmark: boolean
): Promise<void> {
  const qIdStr = String(Math.trunc(questionId));
  const path = `users/${uid}/bookmarks/${qIdStr}`;
  const ref = doc(db, 'users', uid, 'bookmarks', qIdStr);
  try {
    if (shouldBookmark) {
      await setDoc(ref, {
        userId: uid,
        questionId: Math.trunc(questionId),
        createdAt: serverTimestamp(),
      });
    } else {
      await deleteDoc(ref);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function loadUserBookmarksFromFirestore(
  uid: string
): Promise<Record<number, boolean>> {
  const path = `users/${uid}/bookmarks`;
  try {
    const q = query(collection(db, 'users', uid, 'bookmarks'), where('userId', '==', uid));
    const snap = await getDocs(q);
    const out: Record<number, boolean> = {};
    snap.forEach((d) => {
      const qId = d.data().questionId;
      if (typeof qId === 'number') {
        out[qId] = true;
      }
    });
    return out;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function saveExamStateToFirestore(
  uid: string,
  examId: string,
  answers: Record<number, OptionLetter>,
  flaggedQuestions: Record<number, boolean>,
  timeRemainingSeconds: number
): Promise<void> {
  const safeExamId = sanitizeId(examId);
  const path = `users/${uid}/examStates/${safeExamId}`;
  const boundedAnswers: Record<string, OptionLetter> = {};
  Object.entries(answers)
    .slice(0, BLUEPRINT_LIMITS.examAnswersMax)
    .forEach(([k, v]) => {
      boundedAnswers[String(k)] = v;
    });
  const flaggedIds = Object.entries(flaggedQuestions)
    .filter(([, v]) => Boolean(v))
    .map(([k]) => Number(k))
    .filter((n) => Number.isInteger(n))
    .slice(0, BLUEPRINT_LIMITS.examAnswersMax);

  const clampedTime = Math.max(0, Math.min(18000, Math.trunc(timeRemainingSeconds)));

  try {
    await setDoc(doc(db, 'users', uid, 'examStates', safeExamId), {
      userId: uid,
      examId: safeExamId,
      answers: boundedAnswers,
      flaggedIds,
      timeRemainingSeconds: clampedTime,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function loadExamStateFromFirestore(
  uid: string,
  examId: string
): Promise<{
  answers: Record<number, OptionLetter>;
  flaggedQuestions: Record<number, boolean>;
  timeRemainingSeconds: number;
} | null> {
  const safeExamId = sanitizeId(examId);
  const path = `users/${uid}/examStates/${safeExamId}`;
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'examStates', safeExamId));
    if (!snap.exists()) return null;
    const data = snap.data();
    const answers: Record<number, OptionLetter> = {};
    if (data.answers && typeof data.answers === 'object') {
      Object.entries(data.answers as Record<string, OptionLetter>).forEach(([k, v]) => {
        const num = Number(k);
        if (!Number.isNaN(num) && (v === 'A' || v === 'B' || v === 'C' || v === 'D')) {
          answers[num] = v;
        }
      });
    }
    const flaggedQuestions: Record<number, boolean> = {};
    if (Array.isArray(data.flaggedIds)) {
      data.flaggedIds.forEach((id) => {
        if (typeof id === 'number') flaggedQuestions[id] = true;
      });
    }
    const timeRemainingSeconds =
      typeof data.timeRemainingSeconds === 'number' ? data.timeRemainingSeconds : 18000;
    return { answers, flaggedQuestions, timeRemainingSeconds };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function fetchPostCommentsFromFirestore(postId: string): Promise<FeedComment[]> {
  const path = `feedPosts/${postId}/comments`;
  try {
    const q = query(
      collection(db, 'feedPosts', postId, 'comments'),
      where('visibility', '==', 'public'),
      limit(100)
    );
    const snap = await getDocs(q);
    const list: FeedComment[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        authorId: String(data.authorId || ''),
        content: String(data.content || ''),
        createdAt: timestampToIso(data.createdAt),
      });
    });
    return list.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function fetchCommentRepliesFromFirestore(
  commentId: string
): Promise<CommentReply[]> {
  const path = `questionComments/${commentId}/replies`;
  try {
    const q = query(
      collection(db, 'questionComments', commentId, 'replies'),
      where('visibility', '==', 'public'),
      limit(100)
    );
    const snap = await getDocs(q);
    const list: CommentReply[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        authorId: String(data.authorId || ''),
        content: String(data.content || ''),
        createdAt: timestampToIso(data.createdAt),
      });
    });
    return list.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export interface CommunitySyncCallbacks {
  onProfilesAndFollows: (
    profiles: { uid: string; data: Record<string, unknown> }[],
    follows: { followerId: string; followingId: string }[]
  ) => void;
  onFeedPosts: (posts: FeedPost[]) => void;
  onQuestionComments: (comments: QuestionComment[]) => void;
  onUserReactions: (reactions: { kind: string; targetId: string }[]) => void;
  onNotifications: (notifs: CommunityNotification[]) => void;
}

export function subscribeAuthenticatedCommunity(
  uid: string,
  callbacks: CommunitySyncCallbacks
): Unsubscribe {
  let latestProfiles: { uid: string; data: Record<string, unknown> }[] = [];
  let latestFollows: { followerId: string; followingId: string }[] = [];

  const emitProfiles = () => {
    callbacks.onProfilesAndFollows(latestProfiles, latestFollows);
  };

  const unsubProfiles = onSnapshot(
    query(collection(db, 'publicProfiles'), where('isPublic', '==', true), limit(50)),
    (snap) => {
      latestProfiles = snap.docs.map((d) => ({
        uid: d.id,
        data: d.data() as Record<string, unknown>,
      }));
      emitProfiles();
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'publicProfiles')
  );

  const unsubFollows = onSnapshot(
    query(collection(db, 'follows'), where('isPublic', '==', true), limit(300)),
    (snap) => {
      latestFollows = snap.docs.map((d) => {
        const data = d.data();
        return {
          followerId: String(data.followerId || ''),
          followingId: String(data.followingId || ''),
        };
      });
      emitProfiles();
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'follows')
  );

  const unsubFeed = onSnapshot(
    query(collection(db, 'feedPosts'), where('visibility', '==', 'public'), limit(60)),
    async (snap) => {
      const posts: FeedPost[] = await Promise.all(
        snap.docs.map(async (d) => {
          const data = d.data();
          const commentsCount = typeof data.commentsCount === 'number' ? data.commentsCount : 0;
          const comments =
            commentsCount > 0 ? await fetchPostCommentsFromFirestore(d.id) : [];
          return {
            id: d.id,
            type: (data.type as FeedPostType) || 'post',
            authorId: String(data.authorId || ''),
            title: typeof data.title === 'string' ? data.title : undefined,
            content: String(data.content || ''),
            tags: Array.isArray(data.tags) ? (data.tags as DisciplineType[]) : [],
            sharedQuestion: data.sharedQuestion as SharedQuestionSummary | undefined,
            likedBy: [],
            savedBy: [],
            comments,
            createdAt: timestampToIso(data.createdAt),
            // Store counts temporarily via synthetic arrays or dedicated helper in context
            _likesCount: typeof data.likesCount === 'number' ? data.likesCount : 0,
            _savesCount: typeof data.savesCount === 'number' ? data.savesCount : 0,
          } as FeedPost & { _likesCount: number; _savesCount: number };
        })
      );
      posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callbacks.onFeedPosts(posts);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'feedPosts')
  );

  const unsubQComments = onSnapshot(
    query(collection(db, 'questionComments'), where('visibility', '==', 'public'), limit(120)),
    async (snap) => {
      const list: QuestionComment[] = await Promise.all(
        snap.docs.map(async (d) => {
          const data = d.data();
          const repliesCount = typeof data.repliesCount === 'number' ? data.repliesCount : 0;
          const replies =
            repliesCount > 0 ? await fetchCommentRepliesFromFirestore(d.id) : [];
          return {
            id: d.id,
            questionId: typeof data.questionId === 'number' ? data.questionId : 0,
            authorId: String(data.authorId || ''),
            content: String(data.content || ''),
            upvotedBy: [],
            replies,
            createdAt: timestampToIso(data.createdAt),
            _upvotesCount: typeof data.upvotesCount === 'number' ? data.upvotesCount : 0,
          } as QuestionComment & { _upvotesCount: number };
        })
      );
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callbacks.onQuestionComments(list);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'questionComments')
  );

  const unsubReactions = onSnapshot(
    query(collection(db, 'users', uid, 'reactions'), where('userId', '==', uid), limit(300)),
    (snap) => {
      const reactions = snap.docs.map((d) => {
        const data = d.data();
        return {
          kind: String(data.kind || ''),
          targetId: String(data.targetId || ''),
        };
      });
      callbacks.onUserReactions(reactions);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, `users/${uid}/reactions`)
  );

  const unsubNotifs = onSnapshot(
    query(
      collection(db, 'users', uid, 'notifications'),
      where('recipientId', '==', uid),
      limit(50)
    ),
    (snap) => {
      const notifs: CommunityNotification[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          type: (data.type as CommunityNotification['type']) || 'comment',
          actorId: String(data.actorId || ''),
          text: String(data.text || ''),
          targetQuestionId:
            typeof data.targetQuestionId === 'number' ? data.targetQuestionId : undefined,
          targetPostId:
            typeof data.targetPostId === 'string' ? data.targetPostId : undefined,
          createdAt: timestampToIso(data.createdAt),
          read: Boolean(data.read),
        };
      });
      notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callbacks.onNotifications(notifs);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, `users/${uid}/notifications`)
  );

  return () => {
    unsubProfiles();
    unsubFollows();
    unsubFeed();
    unsubQComments();
    unsubReactions();
    unsubNotifs();
  };
}
