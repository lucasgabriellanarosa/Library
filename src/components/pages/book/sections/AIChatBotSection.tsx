import { lazy, Suspense, useState } from "react";
import { FaRobot } from "react-icons/fa";

import type { BookDataType } from "../../../../@types/BookData";
import { useBookAIChat } from "../../../../hooks/useBookAiChat";

const BookAIWhisper = lazy(() => import('../../../../features/books/BookAIWhisper'));
import BookAIWhisperSkeleton from "../../../skeleton/BookPage/BookAIWhisperSkeleton";

export default function AIChatBotSection({ bookData }: { bookData: BookDataType }) {

    const {
        message,
        setMessage,
        chatHistory,
        isTyping,
        handleSendMessage,
    } = useBookAIChat({
        bookTitle: bookData?.title || "",
        bookAuthor: bookData?.author || "",
    });

    const [isChatAIOpen, setIsChatAIOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end font-sans">
            {
                isChatAIOpen ? (
                    <div className="mb-4 w-72 sm:w-80 h-96 bg-white rounded-2xl shadow-2xl border border-amber-100 flex flex-col overflow-hidden">

                        <Suspense fallback={
                            <BookAIWhisperSkeleton />
                        }>
                            <BookAIWhisper
                                bookTitle={bookData.title || ""}
                                message={message}
                                setMessage={setMessage}
                                chatHistory={chatHistory}
                                isTyping={isTyping}
                                handleSendMessage={handleSendMessage}
                                setIsChatAIOpen={setIsChatAIOpen}
                            />
                        </Suspense>
                    </div>

                ) : (
                    <button
                        onClick={() => setIsChatAIOpen(!isChatAIOpen)}
                        className='bg-amber-600 text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative hover:cursor-pointer hover:bg-amber-500 active:bg-amber-600 group'
                    >
                        <FaRobot size={24} className="group-active:animate-spin" />

                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                    </button>
                )
            }
        </div>

    )
}
