import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { supabase } from "../../lib/supabaseClient";

interface Props {
    bookTitle: string;
    bookAuthor: string;
}

export const BookAIWhisper = ({ bookTitle, bookAuthor }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim() || isTyping) return;

        const userMessage = message;
        setMessage("");
        setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsTyping(true);

        try {
            const { data, error } = await supabase.functions.invoke('ai-whisper', {
                body: {
                    title: bookTitle,
                    author: bookAuthor,
                    message: userMessage
                },
            });

            if (error) throw error;

            setChatHistory(prev => [...prev, { role: 'ai', text: data.text }]);
        } catch (error) {
            console.error("Erro na Edge Function:", error);
            setChatHistory(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to the library archives. Try again later!" }]);
        } finally {
            setIsTyping(false);
        }
    };
 
    return (
        <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end font-sans">

            {/* Janela do Chat */}
            {isOpen && (
                <div className="mb-4 w-72 sm:w-80 h-96 bg-white rounded-2xl shadow-2xl border border-amber-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

                    {/* Header */}
                    <div className="bg-amber-600 p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                            <FaRobot className="text-xl" />
                            <div className="leading-tight">
                                <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Library AI</p>
                                <p className="text-xs font-semibold truncate w-40">{bookTitle}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Área de Mensagens */}
                    <div className="flex-1 p-4 overflow-y-auto bg-amber-50/30 space-y-4">
                        {chatHistory.length === 0 ? (
                            <div className="text-center mt-10">
                                <FaRobot className="mx-auto text-3xl text-amber-200 mb-2" />
                                <p className="text-[10px] text-gray-500 px-4">
                                   Hello! I'm your literary guide. Ask me something about <b>{bookTitle}</b>!
                                </p>
                            </div>
                        ) : (
                            chatHistory.map((chat, i) => (
                                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${chat.role === 'user'
                                        ? 'bg-amber-600 text-white rounded-tr-none'
                                        : 'bg-white border border-amber-100 text-gray-700 rounded-tl-none'
                                        }`}>
                                        {chat.text}
                                    </div>
                                </div>
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
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-amber-100 bg-white flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
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
                </div>
            )}

            {/* Botão FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'bg-gray-800' : 'bg-amber-600'
                    } text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative`}
            >
                {isOpen ? <FaTimes size={20} /> : <FaRobot size={24} />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                )}
            </button>
        </div>
    );
};