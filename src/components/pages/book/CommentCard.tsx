import type { BookComment, CommentReactions } from "@/@types/Comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChevronDown, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import CommentReactionButton from "@/features/books/CommentReactionButton";
import { useState, useEffect } from "react";
import useComments from "@/hooks/useComments";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCommentModal from "@/features/books/EditCommentModal";
import DeleteCommentModal from "@/features/books/DeleteCommentModal";

interface CommentCardProps {
    comment: BookComment;
    onCommentChange: (updatedComment: BookComment) => void;
    onCommentDeleted: (commentId: string) => void;
}

export default function CommentCard({ comment: initialComment, onCommentChange, onCommentDeleted }: CommentCardProps) {
    const [comment, setComment] = useState<BookComment>(initialComment);

    useEffect(() => {
        setComment(initialComment);
    }, [initialComment]);

    const handleReactionUpdate = (newReaction: CommentReactions | null) => {
        setComment((prev) => {
            const oldReaction = prev.currentUserReaction;
            let likesChange = 0;
            let dislikesChange = 0;

            if (oldReaction === "LIKE") likesChange--;
            if (oldReaction === "DISLIKE") dislikesChange--;

            if (newReaction === "LIKE") likesChange++;
            if (newReaction === "DISLIKE") dislikesChange++;

            const updatedObj = {
                ...prev,
                currentUserReaction: newReaction,
                likes: Math.max(0, prev.likes + likesChange),
                dislikes: Math.max(0, prev.dislikes + dislikesChange),
            };

            onCommentChange(updatedObj);

            return updatedObj;
        });
    };

    const { loadingCommentId } = useComments();
    const isThisCommentReactionLoading = loadingCommentId === comment.id;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <Card
            className="rounded-2xl border bg-amber-50 p-4 shadow-sm flex flex-row gap-3 text-xs"
        >
            <Avatar className="h-10 w-10 hover:cursor-pointer hover:scale-105">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>
                    {comment.username.slice(0, 2)}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">@{comment.username}</p>
                        <span className="text-neutral-400">{comment.time}</span>
                    </div>

                    {comment.isAuthor && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:cursor-pointer shrink-0 h-8 w-8 p-0"
                                >
                                    <EllipsisVertical className="h-4 w-4 text-neutral-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-xs">
                                <DropdownMenuItem
                                    className="gap-2 cursor-pointer"
                                    onClick={() => setIsEditModalOpen(true)}
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {/* Content */}
                <p className="leading-5 text-neutral-700 xl:text-[13px] mt-1">
                    {comment.comment}
                </p>

                {/* Footer */}
                <div className="flex flex-col justify-center gap-3 pt-1 text-neutral-500 mt-2">
                    <div className="flex justify-between items-center max-w-40">
                        <div className="flex gap-5 max-w-xs">
                            <CommentReactionButton
                                isThisCommentReactionLoading={isThisCommentReactionLoading}
                                comment={comment}
                                reactionType="LIKE"
                                onReactionSuccess={handleReactionUpdate}
                            />

                            <CommentReactionButton
                                isThisCommentReactionLoading={isThisCommentReactionLoading}
                                comment={comment}
                                reactionType="DISLIKE"
                                onReactionSuccess={handleReactionUpdate}
                            />
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

            <EditCommentModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                comment={comment}
                onCommentUpdated={(updatedComment) => {
                    setComment(updatedComment);
                    onCommentChange(updatedComment);
                }}
            />

            <DeleteCommentModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                comment={comment}
                onCommentDeleted={onCommentDeleted}
            />
        </Card>
    );
}