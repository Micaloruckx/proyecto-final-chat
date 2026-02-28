import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ContactContext";
import MessageBubble from "./MessageBubble.jsx";
import "./MessageList.css";

export default function MessageList() {
    const { selectedChatId, messagesByChatId } = useChat();
    const msgs = messagesByChatId[selectedChatId] || [];
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedChatId, msgs.length]);

    return (
        <div className="messageList" role="log" aria-live="polite" aria-label="Mensajes del chat">
            {msgs.map((m) => (
                <MessageBubble key={m.id} message={m} />
            ))}
            <div ref={endRef} />
        </div>
    );
}