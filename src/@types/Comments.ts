export interface AddCommentParams {
  bookId: string;
  content: string;
  parentCommentId?: string | null;
}

export type CommentReactions = 'LIKE' | 'DISLIKE'

export interface BookComment {
  id: string;
  username: string;
  avatar: string;
  time: string;
  comment: string;
  likes: number;
  dislikes: number;
  replies: number;
  isAuthor: boolean
  currentUserReaction: CommentReactions | null
}

export interface handleToggleCommentReactionType {
  commentId: string,
  targetReaction: CommentReactions,
  currentStatus: CommentReactions | null
}