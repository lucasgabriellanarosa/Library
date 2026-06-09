import type { BookComment } from "@/@types/Comments"
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";

interface CommentListProps {
    bookComments: BookComment[],
    listFilterBy: string
}

export default function CommentsList({ bookComments, listFilterBy }: CommentListProps) {
    const [commentsState, setCommentsState] = useState<BookComment[]>(bookComments);
    const [sortedComments, setSortedComments] = useState<BookComment[]>([]);

    useEffect(() => {
        setCommentsState(bookComments);
    }, [bookComments]);

    const handleCommentUpdate = (updatedComment: BookComment) => {
        setCommentsState((prev) =>
            prev.map((c) => (c.id === updatedComment.id ? updatedComment : c))
        );
    };

    const handleCommentDelete = (commentId: string) => {
        setCommentsState((prev) => prev.filter((c) => c.id !== commentId));
    };

    const getSortedComments = () => {
        return [...commentsState].sort((a, b) => {
            if (listFilterBy === "popular") {
                const scoreA = (a.likes || 0) - (a.dislikes || 0);
                const scoreB = (b.likes || 0) - (b.dislikes || 0);

                if (scoreB !== scoreA) {
                    return scoreB - scoreA;
                }

                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }

            if (listFilterBy === "recent") {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }

            return 0;
        });
    };

    useEffect(() => {
        const data = getSortedComments();
        setSortedComments(data);
    }, [commentsState, listFilterBy]);

    return (
        <ul className="flex flex-col gap-4">
            {sortedComments.length > 0 ? (
                sortedComments.map((comment) => (
                    <CommentCard
                        key={comment.id} 
                        comment={comment}
                        onCommentChange={handleCommentUpdate}
                        onCommentDeleted={handleCommentDelete}
                    />
                ))
            ) : (
                <p>No comments in this book until now.</p>
            )}
        </ul>
    );
}