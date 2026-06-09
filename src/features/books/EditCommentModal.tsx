import { useState, useEffect } from "react";
import type { BookComment } from "@/@types/Comments";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useComments from "@/hooks/useComments"; 

interface EditCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    comment: BookComment;
    onCommentUpdated: (updatedComment: BookComment) => void;
}

export default function EditCommentModal({
    isOpen,
    onClose,
    comment,
    onCommentUpdated,
}: EditCommentModalProps) {
    const [newContent, setNewContent] = useState(comment.comment);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { updateComment } = useComments(); 

    useEffect(() => {
        if (isOpen) {
            setNewContent(comment.comment);
        }
    }, [isOpen, comment]);

    const handleSave = async () => {
        if (!newContent.trim() || newContent === comment.comment) {
            onClose();
            return;
        }

        try {
            setIsSubmitting(true);
            
            await updateComment({
                commentId: comment.id,
                content: newContent.trim(),
            });

            onCommentUpdated({
                ...comment,
                comment: newContent.trim(),
            });

            onClose();
        } catch (error) {
            console.error("Failed to edit comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25 bg-amber-50">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold text-neutral-900">
                        Edit comment
                    </DialogTitle>
                    <DialogDescription className="text-xs text-neutral-500">
                        Make the necessary changes to your comment below.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                    <Textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Edit your comment..."
                        className="bg-white border-neutral-200 text-xs focus-visible:ring-amber-500 min-h-25 resize-none"
                        disabled={isSubmitting}
                        maxLength={500}
                    />
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="text-xs hover:cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSubmitting || !newContent.trim()}
                        className="text-xs bg-amber-800 hover:bg-amber-900 text-white font-medium hover:cursor-pointer"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}