import { FaList } from "react-icons/fa";
import { StatusButtons } from "../../../../features/books/StatusButtons";
import { useEffect, useState } from "react";
import { useUserLists } from "../../../../hooks/useUserLists";
import { useNavigate } from "react-router";
import type { User } from "@supabase/supabase-js";
import type { BookDataType } from "../../../../@types/BookData";

interface SectionProps {
    user:  User | null,
    workId: string | undefined,
    bookData: BookDataType
}

export default function StatusButtonsSection({user, workId, bookData}: SectionProps) {

    const navigate = useNavigate()
    const { getBookStatus, toogleBookStatus, loading: isUpdating } = useUserLists();

    // Book Status (Read | To Read) logic
    const [bookStatus, setBookStatus] = useState<'Read' | 'To Read' | null>(null);
    const [activeAction, setActiveAction] = useState<'Read' | 'To Read' | null>(null);

    useEffect(() => {

        if (!user || !workId) return;

        const loadStatus = async () => {
            const status = await getBookStatus(workId)
            setBookStatus(status)
        }

        loadStatus()

    }, [workId, user]);


    // Toggle read and to read status
    const handleUpdateList = async (targetListName: 'Read' | 'To Read') => {

        if (!user) {
            navigate('/login')
            return alert("You need to be logged in to save it!");
        }

        setActiveAction(targetListName);

        const newStatus = await toogleBookStatus({
            targetListName,
            workId: workId!,
            bookData,
            currentStatus: bookStatus
        });

        setBookStatus(newStatus ?? null);
    };
    return (
        <div className="w-4/5 min-h-20 flex flex-col gap-3 max-w-sm xl:max-w-lg">

            <StatusButtons
                bookStatus={bookStatus}
                isUpdating={isUpdating}
                activeAction={activeAction}
                onUpdate={handleUpdateList}
            />

            <button className="w-full py-2 font-bold rounded-md border shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed" disabled>
                <FaList /> Add to List (soon)
            </button>

        </div>
    )
}
