import { DisciplineType } from './oab';

export type UserCategory = 'estudante' | 'examinando' | 'advogado';

export type CoverTheme = 'navy' | 'slate' | 'amber' | 'emerald';

export interface DisciplinePerformanceStat {
  discipline: string;
  accuracy: number;
  answered: number;
}

export interface SharedRevisionList {
  id: string;
  title: string;
  discipline: DisciplineType;
  description: string;
  questionIds: number[];
  savedCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  coverTheme: CoverTheme;
  roleTitle: string;
  bio: string;
  category: UserCategory;
  institution?: string;
  semester?: string;
  targetExam?: string;
  oabNumber?: string;
  oabUf?: string;
  isVerified?: boolean;
  specialties: DisciplineType[];
  followersIds: string[];
  followingIds: string[];
  reputationPoints: number;
  completedSimulados: number;
  achievements: string[];
  showPerformanceShowcase: boolean;
  performanceByDiscipline: DisciplinePerformanceStat[];
  sharedLists: SharedRevisionList[];
  joinedAt: string;
}

export interface CommentReply {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface QuestionComment {
  id: string;
  questionId: number;
  authorId: string;
  content: string;
  upvotedBy: string[];
  replies: CommentReply[];
  createdAt: string;
}

export type FeedPostType = 'post' | 'artigo' | 'questao_compartilhada';

export interface FeedComment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface SharedQuestionSummary {
  questionId: number;
  number: number;
  discipline: DisciplineType;
  topic: string;
  examOrigin?: string;
  statementSnippet: string;
}

export interface FeedPost {
  id: string;
  type: FeedPostType;
  authorId: string;
  title?: string;
  content: string;
  tags: DisciplineType[];
  sharedQuestion?: SharedQuestionSummary;
  likedBy: string[];
  savedBy: string[];
  comments: FeedComment[];
  createdAt: string;
}

export interface CommunityNotification {
  id: string;
  type: 'upvote' | 'reply' | 'follow' | 'like' | 'comment';
  actorId: string;
  text: string;
  targetQuestionId?: number;
  targetPostId?: string;
  createdAt: string;
  read: boolean;
}
