import React, { useMemo, useState } from "react";
import { useChat } from "../../context/ContactContext";
import SearchBox from "./SearchBox";
import ChatListItem from "./ChatListItem.jsx";
import "./ChatList.css";

function getSortEpoch(timeLabel, createdAt, index, referenceNow) {
    const createdAtEpoch = Date.parse(createdAt || "");
    if (!Number.isNaN(createdAtEpoch)) return createdAtEpoch;

    if (!timeLabel) return -1_000_000 - index;

    const normalized = timeLabel.trim().toLowerCase();
    const now = referenceNow;

    if (normalized === "ahora") return now.getTime();
    if (normalized === "ayer") return now.getTime() - 24 * 60 * 60 * 1000;

    const match = normalized.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return -1_000_000 - index;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    const dateAtTime = new Date(now);
    dateAtTime.setHours(hours, minutes, 0, 0);

    if (dateAtTime.getTime() > now.getTime()) {
        dateAtTime.setDate(dateAtTime.getDate() - 1);
    }

    return dateAtTime.getTime();
}

export default function ChatList() {
    const { chats, usersById, selectedChatId, messagesByChatId } = useChat();
    const [query, setQuery] = useState("");
    const referenceNow = useMemo(() => {
        const openedAt = localStorage.getItem("ws_app_opened_at");
        const parsed = Date.parse(openedAt || "");
        return Number.isNaN(parsed) ? new Date() : new Date(parsed);
    }, []);

    const withPreview = useMemo(() => {
        return chats.map((chat, index) => {
            const chatMessages = messagesByChatId[chat.id] || [];
            const lastMessage = chatMessages[chatMessages.length - 1];

            const previewText =
                lastMessage?.text?.trim() ||
                (lastMessage?.image ? "📷 Foto" : chat.lastMessage);

            const previewTime = lastMessage?.time || chat.lastTime;
            const lastAt = getSortEpoch(previewTime, lastMessage?.createdAt, index, referenceNow);

            return {
                ...chat,
                lastMessage: previewText,
                lastTime: previewTime,
                lastAt,
            };
        });
    }, [chats, messagesByChatId, referenceNow]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = !q
            ? withPreview
            : withPreview.filter((c) =>
                  (usersById[c.userId]?.name || "").toLowerCase().includes(q)
              );

        return [...list].sort((a, b) => b.lastAt - a.lastAt);
    }, [query, withPreview, usersById]);

    return (
        <div className="chatList">
            <div className="chatListTop">
                <div className="brand">WhatStark</div>
                <SearchBox value={query} onChange={setQuery} />
            </div>

            <div className="chatItems">
                {filtered.map((c) => (
                    <ChatListItem key={c.id} chat={c} active={c.id === selectedChatId} />
                ))}
            </div>
        </div>
    );
}