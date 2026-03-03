import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import contactData from "../data/contactData";

const ContactContext = createContext(null);
const ARG_TIME_ZONE = "America/Argentina/Buenos_Aires";
const THEME_STORAGE_KEY = "ws_theme";
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

const CHARACTER_REPLY_PREFIX_BY_CHAT = {
    "chat-jon": "Entendido. Tomo esto:",
    "chat-arya": "Recibido. Lo hago así:",
    "chat-sansa": "Perfecto. Queda anotado:",
    "chat-bran": "Lo veo claro. Es esto:",
    "chat-robb": "Bien. Vamos con esto:",
    "chat-catelyn": "De acuerdo. Tomo nota de:",
    "chat-eddard": "Con prudencia, procedemos con:",
    "chat-rickon": "Jajaja sí, va esto:",
    "chat-tony": "Copy that. Compilo esto:",
    "chat-targaryen": "[Tyrion] Entendido. El Consejo registra:",
};

const CHATBOT_ACK_BY_INTENT = {
    greeting: "Qué bueno leerte",
    question: "Buena pregunta",
    request: "Perfecto, me encargo",
    urgent: "Recibido, lo tomo con prioridad",
    confirm: "Dale, queda confirmado",
    default: "Entendido",
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

    // ===== [MIGRACIÓN AUDIO EDDARD - INICIO] =====
    function safeLoadMessages() {
        const openedAt = new Date().toISOString();
        return ensureEddardVoiceNoteMessage(hydrateMessages(contactData.messages, openedAt));
    }

    function ensureEddardVoiceNoteMessage(messagesByChatId) {
        if (!messagesByChatId || typeof messagesByChatId !== "object") return {};

        const chatId = "chat-eddard";
        const voicePath = "/audio/chat-audio-eddard.mp3";
        const voiceLabel = "Nota de voz";
        const eddardMessages = Array.isArray(messagesByChatId[chatId]) ? messagesByChatId[chatId] : [];

        if (eddardMessages.some((message) => message?.audio === voicePath)) {
            return messagesByChatId;
        }

        let didReplace = false;
        const nextEddardMessages = eddardMessages.map((message) => {
            if (message?.id !== "m6") return message;
            didReplace = true;
            return {
                ...message,
                text: "",
                audio: voicePath,
                audioLabel: voiceLabel,
            };
        });

        const normalizedEddardMessages = didReplace
            ? nextEddardMessages
            : [
                ...nextEddardMessages,
                {
                    id: "m6",
                    fromMe: false,
                    text: "",
                    audio: voicePath,
                    audioLabel: voiceLabel,
                    time: "22:08",
                },
            ];

        return {
            ...messagesByChatId,
            [chatId]: normalizedEddardMessages,
        };
    }
    // ===== [MIGRACIÓN AUDIO EDDARD - FIN] =====

    function safeLoadTheme() {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") return stored;

        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    }

    function formatArgentinaTime(date) {
        return new Intl.DateTimeFormat("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: ARG_TIME_ZONE,
        }).format(date);
    }

    function appendMessage(setter, chatId, message) {
        setter((prev) => {
            return {
                ...prev,
                [chatId]: [...(prev[chatId] || []), message],
            };
        });
    }

    function buildFallbackReply(chatId) {
        return AI_FALLBACK_BY_CHAT[chatId] || "Recibido. Te respondo en breve.";
    }

    function normalizeUserText(text) {
        return (text || "").replace(/\s+/g, " ").trim();
    }

    function detectMessageIntent(text) {
        const lower = text.toLowerCase();

        if (/\b(hola|buenas|hey|qué tal|que tal|buen día|buen dia)\b/i.test(lower)) {
            return "greeting";
        }

        if (text.includes("?")) {
            return "question";
        }

        if (/\b(urgente|ya|ahora|rápido|rapido|asap)\b/i.test(lower)) {
            return "urgent";
        }

        if (/\b(por favor|podés|podes|podrías|podrias|hacé|hace|enviá|envia|revisá|revisa)\b/i.test(lower)) {
            return "request";
        }

        if (/\b(ok|dale|listo|perfecto|confirmado|genial|hecho)\b/i.test(lower)) {
            return "confirm";
        }

        return "default";
    }

    function extractTopic(text) {
        const firstSentence = text.split(/[.!?]/)[0]?.trim() || text;
        return firstSentence.slice(0, 110);
    }

    function buildIntentAwareBody(intent, topic) {
        const ack = CHATBOT_ACK_BY_INTENT[intent] || CHATBOT_ACK_BY_INTENT.default;
        return `${ack} sobre "${topic}".`;
    }

    function buildLocalAiReply(chatId, userText) {
        const clean = normalizeUserText(userText);
        if (!clean) return buildFallbackReply(chatId);

        const intent = detectMessageIntent(clean);
        const topic = extractTopic(clean);
        const chatbotBody = buildIntentAwareBody(intent, topic);
        const prefix = CHARACTER_REPLY_PREFIX_BY_CHAT[chatId] || "Recibido. Respondo a:";
        const suffix = LOCAL_AI_SUFFIX_BY_CHAT[chatId] || "Sigo atento.";
        return `${prefix} ${chatbotBody} ${suffix}`;
    }

    function slugifyName(value) {
        return (value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .slice(0, 24);
    }

    function buildCustomCurrentUser(payload) {
        const rawName = (payload?.name || "").trim();
        if (!rawName) return null;

        const avatar = payload?.avatar || "/avatars/jon.png";
        const slug = slugifyName(rawName) || `user-${Date.now()}`;

        return {
            id: `me-${slug}`,
            name: rawName,
            avatar,
            status: "Disponible",
            lastSeen: "En línea",
            phone: "No disponible",
        };
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

    function warnInvalidChats(chats, usersById) {
        if (!Array.isArray(chats) || !usersById) return;

        chats.forEach((chat) => {
            const hasUser = Boolean(usersById[chat?.userId]);
            if (!hasUser) {
                console.warn(
                    `[WhatStark] Chat inválido detectado: id="${chat?.id || "desconocido"}" userId="${chat?.userId || "vacío"}" no existe en users.`
                );
            }
        });
    }

    export function ContactProvider({ children }) {
        // No persistimos la sesión: siempre iniciar en login.
        const [currentUser, setCurrentUser] = useState(null);
        const [selectedChatId, setSelectedChatId] = useState(null);
        const [messagesByChatId, setMessagesByChatId] = useState(() => safeLoadMessages());
        const [typingByChatId, setTypingByChatId] = useState({});
        const [theme, setTheme] = useState(() => safeLoadTheme());

        useEffect(() => {
            // Hard reset de auth al iniciar la app: siempre volver a login al recargar.
            clearAuthStorage();
            ["ws_messages", "ws_app_opened_at", "ws_data_seed_version", "ws_data_seed_snapshot"].forEach((key) => {
                localStorage.removeItem(key);
            });
        }, []);

        useEffect(() => {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        }, [theme]);

        const usersById = useMemo(() => {
            const map = {};
            for (const u of contactData.users) map[u.id] = u;
            return map;
        }, []);

        const validChats = useMemo(
            () => contactData.chats.filter((chat) => Boolean(usersById[chat?.userId])),
            [usersById]
        );

        const validChatIds = useMemo(
            () => new Set(validChats.map((chat) => chat.id)),
            [validChats]
        );

        useEffect(() => {
            warnInvalidChats(contactData.chats, usersById);
        }, [usersById]);

        useEffect(() => {
            if (selectedChatId && !validChatIds.has(selectedChatId)) {
                setSelectedChatId(null);
            }
        }, [selectedChatId, validChatIds]);
        function login(userInput) {
            const u = typeof userInput === "string"
                ? (usersById[userInput] || null)
                : buildCustomCurrentUser(userInput);
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
            if (chatId !== null && !validChatIds.has(chatId)) return;
            setSelectedChatId(chatId);
        }

        function toggleTheme() {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        }

        function sendMessage(chatId, text) {
            const trimmed = text.trim();
            if (!trimmed || !chatId || !validChatIds.has(chatId)) return;

            const now = new Date();

            const newMsg = {
                id: `m-${Date.now()}`,
                fromMe: true,
                text: trimmed,
                time: formatArgentinaTime(now),
                createdAt: now.toISOString(),
            };

            appendMessage(setMessagesByChatId, chatId, newMsg);
            setTypingByChatId((prev) => ({ ...prev, [chatId]: true }));

            window.setTimeout(() => {
                const replyNow = new Date();

                try {
                    const replyText = buildLocalAiReply(chatId, trimmed) || buildFallbackReply(chatId);

                    appendMessage(setMessagesByChatId, chatId, {
                        id: `m-ai-${Date.now()}`,
                        fromMe: false,
                        text: replyText,
                        time: formatArgentinaTime(replyNow),
                        createdAt: replyNow.toISOString(),
                    });
                } catch {
                    appendMessage(setMessagesByChatId, chatId, {
                        id: `m-ai-${Date.now()}`,
                        fromMe: false,
                        text: buildFallbackReply(chatId),
                        time: formatArgentinaTime(replyNow),
                        createdAt: replyNow.toISOString(),
                    });
                } finally {
                    setTypingByChatId((prev) => ({ ...prev, [chatId]: false }));
                }
            }, 450);
        }

        const value = {
            users: contactData.users,
            chats: validChats,
            usersById,
            currentUser,
            selectedChatId,
            messagesByChatId,
            typingByChatId,
            theme,
            login,
            logout,
            selectChat,
            toggleTheme,
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