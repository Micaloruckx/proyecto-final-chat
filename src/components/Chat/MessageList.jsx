import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/ContactContext";
import { BsChevronDown } from "react-icons/bs";
import MessageBubble from "./MessageBubble.jsx";
import "./MessageList.css";

export default function MessageList() {
    const { selectedChatId, messagesByChatId } = useChat();
    const msgs = messagesByChatId[selectedChatId] || [];
    const endRef = useRef(null);
    const listRef = useRef(null);
    const [showScrollDown, setShowScrollDown] = useState(false);

    function isNearBottom(element) {
        if (!element) return true;
        return element.scrollHeight - element.scrollTop - element.clientHeight < 56;
    }

    function handleScroll() {
        const element = listRef.current;
        setShowScrollDown(!isNearBottom(element));
    }

    function scrollToBottom(behavior = "smooth") {
        endRef.current?.scrollIntoView({ behavior, block: "end" });
    }

    useEffect(() => {
        scrollToBottom("auto");
        setShowScrollDown(false);
    }, [selectedChatId, msgs.length]);

    return (
        <div className="messageListWrap">
            <div
                className="messageList"
                ref={listRef}
                onScroll={handleScroll}
                role="log"
                aria-live="polite"
                aria-label="Mensajes del chat"
            >
                {msgs.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                ))}
                <div ref={endRef} />
            </div>

            {showScrollDown ? (
                <button
                    type="button"
                    className="scrollToBottomBtn"
                    onClick={() => scrollToBottom("smooth")}
                    aria-label="Bajar al último mensaje"
                >
                    <BsChevronDown size={16} />
                </button>
            ) : null}
        </div>
    );
}