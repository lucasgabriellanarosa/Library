// features/books/BookAIWhisper.tsx
import { FaPaperPlane, FaRobot } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

interface Props {
    bookTitle: string;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    chatHistory: { role: "user" | "ai"; text: string }[];
    isTyping: boolean;
    handleSendMessage: () => void;
    setIsChatAIOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookAIWhisper = ({
    bookTitle,
    message,
    setMessage,
    chatHistory,
    isTyping,
    handleSendMessage,
    setIsChatAIOpen,
}: Props) => {
    return (
        <>
            <div className="bg-amber-600 p-4 text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <FaRobot className="text-xl" />

                    <div className="leading-tight">
                        <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">
                            Library AI
                        </p>

                        <p className="text-xs font-semibold truncate w-40">
                            {bookTitle}
                        </p>
                    </div>
                </div>

                {setIsChatAIOpen && (
                    <button
                        onClick={() => setIsChatAIOpen(false)}
                        className="hover:bg-white/20 p-1 rounded transition-colors"
                    >
                        <FaTimes />
                    </button>
                )}
            </div>

            <ul className="flex-1 p-4 overflow-y-auto bg-amber-50/30 space-y-4">
                {chatHistory.length === 0 ? (
                    <li className="text-center mt-10">
                        <FaRobot className="mx-auto text-3xl text-amber-200 mb-2" />

                        <p className="text-[10px] text-gray-500 px-4">
                            Hello! I'm your literary guide. Ask me something about{" "}
                            <b>{bookTitle}</b>!
                        </p>
                    </li>
                ) : (
                    chatHistory.map((chat, i) => (
                        <li
                            key={i}
                            className={`flex ${chat.role === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${chat.role === "user"
                                    ? "bg-amber-600 text-white rounded-tr-none"
                                    : "bg-white border border-amber-100 text-gray-700 rounded-tl-none"
                                    }`}
                            >
                                {chat.text}
                            </div>
                        </li>
                    ))
                )}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-amber-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
            </ul>

            <div className="p-3 border-t border-amber-100 bg-white flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="Ask about the book..."
                    disabled={isTyping}
                    className="flex-1 bg-gray-50 border-none focus:ring-1 focus:ring-amber-500 rounded-full px-4 py-2 text-[11px] disabled:opacity-50"
                />

                <button
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="bg-amber-600 text-white p-2.5 rounded-full hover:bg-amber-700 transition-all active:scale-90 disabled:bg-gray-300"
                >
                    <FaPaperPlane size={12} />
                </button>
            </div>
        </>
    );
};

export default BookAIWhisper