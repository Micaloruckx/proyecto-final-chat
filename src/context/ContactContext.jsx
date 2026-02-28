import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import contactData from "../data/contactData";

const ContactContext = createContext(null);

    const AUTH_STORAGE_KEYS = [
        "ws_currentUser",
        "ws_selectedChatId",
        "ws_current_user",
        "ws_selected_chat_id",
        "currentUser",
        "selectedChatId",
    ];

    function clearAuthStorage() {
        AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    }

    function safeLoadMessages() {
        try {
            const raw = localStorage.getItem("ws_messages");
            if (!raw) return contactData.messages;
            return JSON.parse(raw);
        } catch {
            return contactData.messages;
        }
    }

    export function ContactProvider({ children }) {
        // No persistimos la sesión: siempre iniciar en login.
        const [currentUser, setCurrentUser] = useState(null);
        const [selectedChatId, setSelectedChatId] = useState(null);
        const [messagesByChatId, setMessagesByChatId] = useState(() => safeLoadMessages());

        useEffect(() => {
            // Hard reset de auth al iniciar la app: siempre volver a login al recargar.
            clearAuthStorage();
        }, []);

        const usersById = useMemo(() => {
            const map = {};
            for (const u of contactData.users) map[u.id] = u;
            return map;
        }, []);
        function login(userId) {
            const u = usersById[userId] || null;
            setCurrentUser(u);
            setSelectedChatId(null);
            clearAuthStorage();
        }

        function logout() {
            setCurrentUser(null);
            setSelectedChatId(null);
            clearAuthStorage();
        }

        function selectChat(chatId) {
            setSelectedChatId(chatId);
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

    ContactProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    export function useChat() {
        const ctx = useContext(ContactContext);
        if (!ctx) throw new Error("useChat debe usarse dentro de ContactProvider");
        return ctx;
    }