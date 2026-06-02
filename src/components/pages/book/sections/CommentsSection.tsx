import type { BookComment, CommentReactions } from "@/@types/Comments"
import CommentsListSkeleton from "@/components/skeleton/BookPage/CommentsListSkeleton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import useComments from "@/hooks/useComments"
import {
    ArrowUpDown,
} from "lucide-react"
import { useEffect, useState } from "react"
import CommentsList from "../CommentsList"

export default function CommentsSection({ bookId }: { bookId: string | undefined }) {

    if (!bookId) return

    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addComment, getBookComments, isCommentsLoading } = useComments();

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

    useEffect(() => {
        loadBookComments()
    }, [bookId, currentUserReaction])

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
            {
                isCommentsLoading ? (
                    <CommentsListSkeleton />
                ) : (
                    <CommentsList
                        bookComments={bookComments}
                        setCurrentUserReaction={setCurrentUserReaction}
                    />
                )
            }



        </section>
    )
}