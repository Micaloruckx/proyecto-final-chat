import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useChat } from "../../context/ContactContext";
import MessageBubble from "./MessageBubble.jsx";
import "./MessageList.css";

export default function MessageList() {
    const { selectedChatId, messagesByChatId } = useChat();
    const msgs = messagesByChatId[selectedChatId] || [];
    const listRef = useRef(null);
    const endRef = useRef(null);
    const [showScrollDown, setShowScrollDown] = useState(false);

    function updateScrollButtonVisibility() {
        const listElement = listRef.current;
        if (!listElement) return;

        const distanceFromBottom = listElement.scrollHeight - listElement.scrollTop - listElement.clientHeight;
        setShowScrollDown(distanceFromBottom > 120);
    }

    function scrollToBottom() {
        endRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
        setShowScrollDown(false);
    }

    useEffect(() => {
        scrollToBottom();
    }, [selectedChatId, msgs.length]);

    useEffect(() => {
        const listElement = listRef.current;
        if (!listElement) return undefined;

        const onScroll = () => updateScrollButtonVisibility();
        listElement.addEventListener("scroll", onScroll);
        updateScrollButtonVisibility();

        return () => listElement.removeEventListener("scroll", onScroll);
    }, [selectedChatId]);

    return (
        <div className="messageListWrap">
            <div ref={listRef} className="messageList" role="log" aria-live="polite" aria-label="Mensajes del chat">
                {msgs.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                ))}
                <div ref={endRef} />
            </div>
            <button
                type="button"
                className={`scrollToBottomBtn ${showScrollDown ? "visible" : ""}`}
                onClick={scrollToBottom}
                aria-label="Bajar al último mensaje"
                title="Bajar al último mensaje"
            >
                <BsChevronDown size={18} />
            </button>
        </div>
    );
}