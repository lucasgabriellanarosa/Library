import type { BookComment, CommentReactions, handleToggleCommentReactionType } from "@/@types/Comments"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import useComments from "@/hooks/useComments"
import {
    ArrowUpDown,
    ThumbsUp,
    ThumbsDown,
    ChevronDown
} from "lucide-react"
import { useEffect, useState } from "react"


export default function CommentsSection({ bookId }: { bookId: string | undefined }) {

    if (!bookId) return

    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addComment, getBookComments, toggleCommentReaction, isLoading: isCommentLoading } = useComments();

    const handleSubmit = async (e: React.FormEvent) => {


        e.preventDefault();

        if (!text.trim() || isLoading) return;

        setIsLoading(true);

        const { data } = await addComment({
            bookId: bookId,
            content: text,
        });

        if (data) {
            setIsLoading(false);
            setText("");
            setBookComments([])
            loadBookComments()
        }
    };

    const [bookComments, setBookComments] = useState<BookComment[]>([]);

    const loadBookComments = async () => {
        const bookData = await getBookComments(bookId)
        setBookComments(bookData)
    }

    const [currentUserReaction, setCurrentUserReaction] = useState<CommentReactions | null>(null);

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


    useEffect(() => {
        loadBookComments()
    }, [bookId, currentUserReaction])

    console.log(bookComments)

    return (
        <section className="flex w-4/5 flex-col gap-4">
            {/* Comment Input */}
            <Card className="rounded-2xl gap-3 border-none p-4 shadow-sm bg-amber-50/60">

                <Textarea
                    placeholder="Add comment..."
                    className="min-h-20 resize-none text-xs border-none bg-white text-neutral-800 shadow-none focus-visible:ring-0"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isLoading}
                />

                <Button
                    className="rounded-full bg-amber-800/50 text-white px-4 self-end text-xs hover:bg-amber-900/80 hover:scale-105 hover:cursor-pointer"
                    disabled={isLoading || !text.trim()}
                    onClick={handleSubmit}
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </Button>

            </Card>

            <Separator className="bg-neutral-400" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold">Comments</h2>

                    <span className="rounded-full bg-amber-800/50 px-2 py-0.5 font-medium text-white">
                        {bookComments.length}
                    </span>
                </div>

                <Button
                    variant="ghost"
                    className="text-neutral-600 hover:text-black text-xs hover:cursor-pointer hover:bg-amber-800/50"
                >
                    <ArrowUpDown />
                    Most recent
                </Button>
            </div>

            {/* Comments */}
            <div className="flex flex-col gap-4">
                {bookComments.map((comment) => (
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
                                            ${isCommentLoading ? 'cursor-not-allowed opacity-50' : ''}
                                            ${comment.currentUserReaction === "LIKE"
                                                    ? "text-blue-600 font-bold hover:text-blue-300"
                                                    : "text-gray-500 hover:text-black"}
                                            `}
                                            disabled={isCommentLoading}
                                            onClick={() => handleToggleCommentReaction({
                                                commentId: comment.id,
                                                targetReaction: "LIKE",
                                                currentStatus: comment.currentUserReaction
                                            })}>

                                            <ThumbsUp
                                                className="h-3.5 w-3.5"
                                                fill={comment.currentUserReaction === "LIKE" ? "currentColor" : "none"}
                                            />
                                            {comment.likes}

                                        </button>

                                        <button
                                            className={`flex items-center gap-1 transition hover:cursor-pointer
                                            ${isCommentLoading ? 'cursor-not-allowed opacity-50' : ''}
                                            ${comment.currentUserReaction === "DISLIKE"
                                                    ? "text-red-600 font-bold hover:text-red-300"
                                                    : "text-gray-500 hover:text-black"
                                                }
                                            `}
                                            disabled={isCommentLoading}
                                            onClick={() => handleToggleCommentReaction({
                                                commentId: comment.id,
                                                targetReaction: "DISLIKE",
                                                currentStatus: comment.currentUserReaction
                                            })}>

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
                ))}
            </div>
        </section>
    )
}