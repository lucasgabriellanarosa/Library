import type { BookComment, CommentReactions, handleToggleCommentReactionType } from "@/@types/Comments";
import useComments from "@/hooks/useComments";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface BtnProps {
    isThisCommentReactionLoading: boolean;
    comment: BookComment;
    reactionType: "LIKE" | "DISLIKE";
    onReactionSuccess: (newReaction: CommentReactions | null) => void;
}

export default function CommentReactionButton({ 
    isThisCommentReactionLoading, 
    comment, 
    reactionType, 
    onReactionSuccess 
}: BtnProps) {

    const { toggleCommentReaction } = useComments();

    const handleToggleCommentReaction = async ({ commentId, targetReaction, currentStatus }: handleToggleCommentReactionType) => {
        try {
            const newReaction = await toggleCommentReaction({
                commentId,
                targetReaction,
                currentStatus
            });

            if (newReaction === 'LIKE' || newReaction === 'DISLIKE' || newReaction === null) {
                onReactionSuccess(newReaction);
            }

        } catch (error) {
            console.log('Failed to add comment reaction: ', error);
        }
    };

    const isCurrentReaction = comment.currentUserReaction === reactionType;

    let reactionStyles = "";

    if (isThisCommentReactionLoading) {
        reactionStyles = "text-yellow-600 cursor-not-allowed opacity-60 animate-pulse";
    } else if (isCurrentReaction) {
        reactionStyles = reactionType === "LIKE" 
            ? "text-blue-600 font-bold hover:text-blue-400 cursor-pointer" 
            : "text-red-600 font-bold hover:text-red-400 cursor-pointer";
    } else {
        reactionStyles = "text-gray-500 hover:text-black cursor-pointer";
    }

    return (
        <button
            className={`flex items-center gap-1 transition ${reactionStyles}`}
            disabled={isThisCommentReactionLoading}
            onClick={() => handleToggleCommentReaction({
                commentId: comment.id,
                targetReaction: reactionType,
                currentStatus: comment.currentUserReaction
            })}
        >
            {reactionType === 'LIKE' ? (
                <>
                    <ThumbsUp
                        className="h-3.5 w-3.5"
                        fill={isCurrentReaction ? "currentColor" : "none"}
                    />
                    <span>{comment.likes}</span>
                </>
            ) : (
                <>
                    <ThumbsDown
                        className="h-3.5 w-3.5"
                        fill={isCurrentReaction ? "currentColor" : "none"}
                    />
                    <span>{comment.dislikes}</span>
                </>
            )}
        </button>
    );
}