import { createContext, useContext, useMemo, useState } from "react";
import contactData from "../data/contactData";

const ContactContext = createContext(null);

function safeLoad(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function ContactProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => safeLoad("ws_currentUser", null));
    const [selectedChatId, setSelectedChatId] = useState(() => safeLoad("ws_selectedChatId", null));
    const [messagesByChatId, setMessagesByChatId] = useState(() =>
        safeLoad("ws_messages", contactData.messages)
    );

    const usersById = useMemo(() => {
        const map = {};
        for (const u of contactData.users) map[u.id] = u;
        return map;
    }, []);

    function persistAll(nextUser, nextChatId, nextMessages) {
        localStorage.setItem("ws_currentUser", JSON.stringify(nextUser));
        localStorage.setItem("ws_selectedChatId", JSON.stringify(nextChatId));
        localStorage.setItem("ws_messages", JSON.stringify(nextMessages));
    }

    function login(userId) {
        const u = usersById[userId] || null;
        setCurrentUser(u);
        persistAll(u, selectedChatId, messagesByChatId);
    }

    function logout() {
        setCurrentUser(null);
        setSelectedChatId(null);
        setMessagesByChatId(contactData.messages);
        persistAll(null, null, contactData.messages);
    }

    function selectChat(chatId) {
        setSelectedChatId(chatId);
        localStorage.setItem("ws_selectedChatId", JSON.stringify(chatId));
    }

    function sendMessage(chatId, text) {
        const trimmed = text.trim();
        if (!trimmed) return;

        const newMsg = {
            id: `m-${Date.now()}`,
            fromMe: true,
            text: trimmed,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessagesByChatId((prev) => {
            const next = {
                ...prev,
                [chatId]: [...(prev[chatId] || []), newMsg],
            };
            localStorage.setItem("ws_messages", JSON.stringify(next));
            return next;
        });
    }

    const value = {
        users: contactData.users,
        chats: contactData.chats,
        usersById,
        currentUser,
        selectedChatId,
        messagesByChatId,
        login,
        logout,
        selectChat,
        sendMessage,
    };

    return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useChat() {
    const ctx = useContext(ContactContext);
    if (!ctx) throw new Error("useChat debe usarse dentro de ContactProvider");
    return ctx;
}