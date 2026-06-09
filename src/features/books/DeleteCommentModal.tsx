import { useState } from "react";
import type { BookComment } from "@/@types/Comments";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useComments from "@/hooks/useComments"; 

interface DeleteCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    comment: BookComment;
    onCommentDeleted: (commentId: string) => void;
}

export default function DeleteCommentModal({
    isOpen,
    onClose,
    comment,
    onCommentDeleted,
}: DeleteCommentModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { deleteComment } = useComments(); 

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            await deleteComment(comment.id);

            onCommentDeleted(comment.id);
            
            onClose();
        } catch (error) {
            console.error("Failed to delete comment:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="sm:max-w-100 bg-amber-50">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-semibold text-neutral-900">
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-neutral-500 leading-relaxed">
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-2 sm:gap-0 mt-2">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="text-xs hover:cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white font-medium hover:cursor-pointer"
                    >
                        {isDeleting ? "Deleting..." : "Yes, delete comment"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}