import { useMemo, useState } from "react";
import { useChat } from "../../Context/ContactContext";
import SearchBox from "./SearchBox";
import ChatListItem from "./ChatListItem";
import "./ChatList.css";

export default function ChatList() {
    const { chats, usersById, selectedChatId } = useChat();
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return chats;
        return chats.filter((c) => (usersById[c.userId]?.name || "").toLowerCase().includes(q));
    }, [query, chats, usersById]);

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