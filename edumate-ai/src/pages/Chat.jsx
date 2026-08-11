import { useState } from "react";
import {
  FiBookOpen,
  FiCode,
  FiHelpCircle,
  FiFileText,
  FiStar,
} from "react-icons/fi";

import ChatBox from "../components/chat/ChatBox";
import ChatInput from "../components/chat/ChatInput";

const suggestions = [
  {
    title: "Explain a topic",
    text: "Explain Object Oriented Programming in simple words",
    icon: FiBookOpen,
  },
  {
    title: "Generate MCQs",
    text: "Create 5 MCQs about JavaScript",
    icon: FiHelpCircle,
  },
  {
    title: "Help with coding",
    text: "Explain how React useState works",
    icon: FiCode,
  },
  {
    title: "Make notes",
    text: "Create short notes about Database Management Systems",
    icon: FiFileText,
  },
];

function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    const newMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((previous) => [
      ...previous,
      newMessage,
    ]);

    // Temporary AI response.
    // Gemini API hum next phase me connect karenge.
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content:
          "Great question! I'm ready to help you with that. Gemini AI will be connected in the next step.",
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);
    }, 700);
  };

  const handleSuggestion = (text) => {
    handleSend(text);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[600px] flex-col">
      
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20">
            <FiStar size={21} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              AI Chat
            </h1>

            <p className="text-xs text-slate-500 sm:text-sm">
              Your personal AI study assistant
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/50 sm:p-5">
        
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            
            {/* Welcome */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-xl shadow-blue-500/20">
                <FiStar size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Hello, Student! 👋
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                I'm EduMate AI. Ask me anything about your studies,
                coding, career or exam preparation.
              </p>
            </div>

            {/* Suggestions */}
            <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
              {suggestions.map((suggestion) => {
                const Icon = suggestion.icon;

                return (
                  <button
                    key={suggestion.title}
                    onClick={() =>
                      handleSuggestion(suggestion.text)
                    }
                    className="group rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Icon size={18} />
                    </div>

                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {suggestion.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {suggestion.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <ChatBox messages={messages} />
        )}

        {/* Input */}
        <div className="mt-4">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default Chat;