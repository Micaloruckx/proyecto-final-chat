import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import contactData from "../data/contactData";

const ContactContext = createContext(null);
const ARG_TIME_ZONE = "America/Argentina/Buenos_Aires";
const AI_ENABLED_STORAGE_KEY = "ws_ai_enabled";
const AI_FALLBACK_BY_CHAT = {
    "chat-jon": "Entendido. Mantengamos la calma y revisamos el perímetro al amanecer.",
    "chat-arya": "Si vamos, vamos rápido. Sin ruido.",
    "chat-sansa": "Tomo nota. Lo resolvemos con estrategia y no con apuro.",
    "chat-bran": "Lo vi antes de que ocurriera. Debemos prepararnos.",
    "chat-robb": "Bien. Coordino turnos y lo dejamos cubierto.",
    "chat-catelyn": "Gracias por avisar. Cuidate y manteneme al tanto.",
    "chat-eddard": "Actuemos con prudencia. El norte siempre observa.",
    "chat-rickon": "Jajaja, banco. Después te mando otra 😄",
    "chat-tony": "Anotado. Te lo optimizo y te lo devuelvo en versión Mark I.",
    "chat-targaryen": "[Tyrion] Recibido. Mantenemos el plan y esperamos tu señal.",
};

const LOCAL_AI_SUFFIX_BY_CHAT = {
    "chat-jon": "Nos vemos en la muralla.",
    "chat-arya": "Voy sin hacer ruido.",
    "chat-sansa": "Lo ordeno y te confirmo.",
    "chat-bran": "Ya lo había visto venir.",
    "chat-robb": "Dejo turnos cubiertos.",
    "chat-catelyn": "Avisame cuando llegues.",
    "chat-eddard": "Actuemos con prudencia.",
    "chat-rickon": "Después te mando otra 😄",
    "chat-tony": "Te lo optimizo en una pasada.",
    "chat-targaryen": "[Varys] La información ya está en movimiento.",
};

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

    function safeLoadAiEnabled() {
        const raw = localStorage.getItem(AI_ENABLED_STORAGE_KEY);
        if (raw === null) return true;
        return raw === "true";
    }

    function formatArgentinaTime(date) {
        return new Intl.DateTimeFormat("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: ARG_TIME_ZONE,
        }).format(date);
    }

    function persistMessages(nextMessagesByChatId) {
        localStorage.setItem("ws_messages", JSON.stringify(nextMessagesByChatId));
    }

    function appendMessage(setter, chatId, message) {
        setter((prev) => {
            const next = {
                ...prev,
                [chatId]: [...(prev[chatId] || []), message],
            };
            persistMessages(next);
            return next;
        });
    }

    function buildFallbackReply(chatId) {
        return AI_FALLBACK_BY_CHAT[chatId] || "Recibido. Te respondo en breve.";
    }

    function buildLocalAiReply(chatId, userText) {
        const clean = userText.trim();
        const firstChunk = clean.split(/[.!?]/)[0]?.trim() || "Entendido";
        const suffix = LOCAL_AI_SUFFIX_BY_CHAT[chatId] || "Sigo atento.";
        return `${firstChunk}. ${suffix}`;
    }

    async function requestAiReply(chatId, history, userText) {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatId,
                userText,
                history,
            }),
        });

        if (!response.ok) {
            throw new Error("AI request failed");
        }

        const data = await response.json();
        return data?.reply?.trim() || buildFallbackReply(chatId);
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
        const [aiEnabled, setAiEnabled] = useState(() => safeLoadAiEnabled());

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

        function toggleAiEnabled() {
            setAiEnabled((prev) => {
                const next = !prev;
                localStorage.setItem(AI_ENABLED_STORAGE_KEY, String(next));
                return next;
            });
        }

        function sendMessage(chatId, text) {
            const trimmed = text.trim();
            if (!trimmed || !chatId) return;

            const now = new Date();

            const newMsg = {
                id: `m-${Date.now()}`,
                fromMe: true,
                text: trimmed,
                time: formatArgentinaTime(now),
                createdAt: now.toISOString(),
            };

            const history = [...(messagesByChatId[chatId] || []), newMsg]
                .slice(-20)
                .map((msg) => ({
                    fromMe: Boolean(msg.fromMe),
                    text: msg.text || (msg.image ? "[imagen]" : ""),
                }));

            appendMessage(setMessagesByChatId, chatId, newMsg);

            if (!aiEnabled) return;

            (async () => {
                const replyText = await requestAiReply(chatId, history, trimmed).catch(() =>
                    buildLocalAiReply(chatId, trimmed) || buildFallbackReply(chatId)
                );

                const replyNow = new Date();
                appendMessage(setMessagesByChatId, chatId, {
                    id: `m-ai-${Date.now()}`,
                    fromMe: false,
                    text: replyText,
                    time: formatArgentinaTime(replyNow),
                    createdAt: replyNow.toISOString(),
                });
            })();
        }

        const value = {
            users: contactData.users,
            chats: contactData.chats,
            usersById,
            currentUser,
            selectedChatId,
            messagesByChatId,
            aiEnabled,
            login,
            logout,
            selectChat,
            toggleAiEnabled,
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