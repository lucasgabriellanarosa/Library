// hooks/useBookAIChat.ts
import { useState } from "react";

interface Props {
  bookTitle: string;
  bookAuthor: string;
}

export const useBookAIChat = ({ bookTitle, bookAuthor }: Props) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim() || isTyping) return;

    const userMessage = message;

    setMessage("");
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setIsTyping(true);

    try {
      const { supabase } = await import("../lib/supabaseClient");

      const { data, error } = await supabase.functions.invoke(
        "ai-whisper",
        {
          body: {
            title: bookTitle,
            author: bookAuthor,
            message: userMessage,
          },
        }
      );

      if (error) throw error;

      setChatHistory((prev) => [
        ...prev,
        { role: "ai", text: data.text },
      ]);
    } catch (error) {
      console.error(error);

      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text: "I'm having trouble connecting to the library archives. Try again later!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    message,
    setMessage,
    chatHistory,
    isTyping,
    handleSendMessage,
  };
};