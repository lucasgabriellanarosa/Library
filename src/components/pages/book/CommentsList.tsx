import type { BookComment, handleToggleCommentReactionType } from "@/@types/Comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card";
import useComments from "@/hooks/useComments";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";

interface CommentListProps {
    bookComments: BookComment[],
    setCurrentUserReaction: (reaction: "LIKE" | "DISLIKE" | null) => void;
}

export default function CommentsList({ bookComments, setCurrentUserReaction }: CommentListProps) {

    const { toggleCommentReaction, loadingCommentId } = useComments();


    const handleToggleCommentReaction = async ({ commentId, targetReaction, currentStatus }: handleToggleCommentReactionType) => {

        try {
            const newReaction = await toggleCommentReaction({
                commentId: commentId,
                targetReaction: targetReaction,
                currentStatus: currentStatus
            })

            if (newReaction == 'LIKE' || newReaction == 'DISLIKE') {
                setCurrentUserReaction(newReaction)
            }

        } catch (error) {
            console.log('Failed to add comment reaction: ', error)
            return
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {
                bookComments.length > 0 ? (
                    bookComments.map((comment) => {
                        const isThisCommentReactionLoading = loadingCommentId === comment.id;

                        return (
                            <Card
                                key={comment.id}
                                className="rounded-2xl border bg-amber-50 p-4 shadow-sm flex flex-row gap-3 text-xs"
                            >
                                <Avatar className="h-10 w-10 hover:cursor-pointer hover:scale-105">
                                    <AvatarImage src={comment.avatar} />
                                    <AvatarFallback>
                                        {comment.username.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-1 flex-col gap-2">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-semibold">
                                                @{comment.username}
                                            </p>
                                            <span className="text-neutral-400">
                                                {comment.time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <p className="leading-5 text-neutral-700 xl:text-[13px]">
                                        {comment.comment}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex flex-col justify-center gap-3 pt-1 text-neutral-500">
                                        <div className="flex justify-between items-center max-w-40">
                                            <div className="flex gap-5 max-w-xs">
                                                <button
                                                    className={`flex items-center gap-1 transition hover:cursor-pointer
                                                ${isThisCommentReactionLoading ? 'cursor-not-allowed opacity-50' : ''}
                                                ${comment.currentUserReaction === "LIKE"
                                                            ? "text-blue-600 font-bold hover:text-blue-300"
                                                            : "text-gray-500 hover:text-black"
                                                        }
                                            `}
                                                    disabled={isThisCommentReactionLoading}
                                                    onClick={() => handleToggleCommentReaction({
                                                        commentId: comment.id,
                                                        targetReaction: "LIKE",
                                                        currentStatus: comment.currentUserReaction
                                                    })}
                                                >
                                                    <ThumbsUp
                                                        className="h-3.5 w-3.5"
                                                        fill={comment.currentUserReaction === "LIKE" ? "currentColor" : "none"}
                                                    />
                                                    {comment.likes}
                                                </button>

                                                <button
                                                    className={`flex items-center gap-1 transition hover:cursor-pointer
                                                ${isThisCommentReactionLoading ? 'cursor-not-allowed opacity-50' : ''}
                                                ${comment.currentUserReaction === "DISLIKE"
                                                            ? "text-red-600 font-bold hover:text-red-300"
                                                            : "text-gray-500 hover:text-black"
                                                        }
                                            `}
                                                    disabled={isThisCommentReactionLoading}
                                                    onClick={() => handleToggleCommentReaction({
                                                        commentId: comment.id,
                                                        targetReaction: "DISLIKE",
                                                        currentStatus: comment.currentUserReaction
                                                    })}
                                                >
                                                    <ThumbsDown
                                                        className="h-3.5 w-3.5"
                                                        fill={comment.currentUserReaction === "DISLIKE" ? "currentColor" : "none"}
                                                    />
                                                    {comment.dislikes}
                                                </button>
                                            </div>

                                            <button className="transition hover:text-black hover:cursor-pointer">
                                                Reply
                                            </button>
                                        </div>

                                        {comment.replies > 0 && (
                                            <button className="flex w-fit items-center gap-1 transition hover:text-black hover:cursor-pointer">
                                                {comment.replies} Replies
                                                <ChevronDown className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                ) : (
                    <p>No comments in this book until now.</p>
                )}
        </div>
    );
}
