import { useEffect, useRef } from "react";
import Message from "./Message";

function ChatBox({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 space-y-5 overflow-y-auto px-1 py-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatBox;