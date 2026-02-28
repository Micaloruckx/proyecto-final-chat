import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import contactData from "../data/contactData";

const ContactContext = createContext(null);
const ARG_TIME_ZONE = "America/Argentina/Buenos_Aires";

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
        const openedAt = ensureAppOpenedAt();
        const baseMessages = hydrateMessages(contactData.messages, openedAt);

        try {
            const raw = localStorage.getItem("ws_messages");
            if (!raw) return baseMessages;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== "object") return baseMessages;
            return {
                ...baseMessages,
                ...hydrateMessages(parsed, openedAt),
            };
        } catch {
            return baseMessages;
        }
    }

    function ensureAppOpenedAt() {
        const key = "ws_app_opened_at";
        const existing = localStorage.getItem(key);
        if (existing) return existing;

        const now = new Date().toISOString();
        localStorage.setItem(key, now);
        return now;
    }

    function formatArgentinaTime(date) {
        return new Intl.DateTimeFormat("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: ARG_TIME_ZONE,
        }).format(date);
    }

    function hydrateMessages(messagesMap, openedAtIso) {
        if (!messagesMap || typeof messagesMap !== "object") return {};

        const openedAtMs = Date.parse(openedAtIso) || Date.now();
        const result = {};

        Object.entries(messagesMap).forEach(([chatId, messages]) => {
            if (!Array.isArray(messages)) {
                result[chatId] = [];
                return;
            }

            result[chatId] = messages.map((message, index) => {
                if (!message || typeof message !== "object") return message;

                const hasCreatedAt = Boolean(message.createdAt);
                const createdAt = hasCreatedAt
                    ? message.createdAt
                    : new Date(openedAtMs + index * 60000).toISOString();

                if (message.time === "Ahora") {
                    return {
                        ...message,
                        time: formatArgentinaTime(new Date(createdAt)),
                        createdAt,
                    };
                }

                if (hasCreatedAt) {
                    return {
                        ...message,
                        createdAt,
                    };
                }

                return { ...message };
            });
        });

        return result;
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

            const now = new Date();

            const newMsg = {
                id: `m-${Date.now()}`,
                fromMe: true,
                text: trimmed,
                time: formatArgentinaTime(now),
                createdAt: now.toISOString(),
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