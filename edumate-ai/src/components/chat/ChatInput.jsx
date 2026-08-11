import { useState } from "react";
import {
  FiPaperclip,
  FiSend,
  FiMic,
} from "react-icons/fi";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
    >
      <div className="flex items-center gap-2">
        
        {/* Attachment */}
        <button
          type="button"
          className="hidden rounded-xl p-3 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 sm:block dark:hover:bg-slate-800"
          title="Attach file"
        >
          <FiPaperclip size={19} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask EduMate anything..."
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
        />

        {/* Voice */}
        <button
          type="button"
          className="rounded-xl p-3 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800"
          title="Voice input"
        >
          <FiMic size={19} />
        </button>

        {/* Send */}
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiSend size={18} />
        </button>
      </div>

      <p className="hidden px-3 pb-1 text-[10px] text-slate-400 sm:block">
        EduMate AI can help with study, coding, career guidance and more.
      </p>
    </form>
  );
}

export default ChatInput;