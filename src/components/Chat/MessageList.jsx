import { useEffect, useRef } from "react";
import { useChat } from "../../Context/ContactContext";
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
        <div className="messageList">
            {msgs.map((m) => (
                <MessageBubble key={m.id} message={m} />
            ))}
            <div ref={endRef} />
        </div>
    );
}