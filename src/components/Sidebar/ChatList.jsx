import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useChat } from "../../context/ContactContext";
import { BsSunFill, BsMoonStarsFill, BsList } from "react-icons/bs";
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

    function extractFirstUrl(text) {
        if (!text) return null;
        const match = text.match(/https?:\/\/[^\s]+/i);
        return match ? match[0] : null;
    }

    function buildPreviewText(lastMessage, fallbackText) {
        const plainText = lastMessage?.text?.trim();
        if (plainText) {
            const firstUrl = extractFirstUrl(plainText);
            if (firstUrl) {
                try {
                    const hostname = new URL(firstUrl).hostname.replace(/^www\./i, "");
                    return `🔗 ${hostname}`;
                } catch {
                    return "🔗 Enlace";
                }
            }
            return plainText;
        }

        if (lastMessage?.image) return "📷 Foto";
        return fallbackText;
    }

export default function ChatList({ onMenuClick }) {
    const { chats, usersById, selectedChatId, messagesByChatId, theme, toggleTheme, currentUser } = useChat();
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

            const previewText = buildPreviewText(lastMessage, chat.lastMessage);

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

    const sortedChats = useMemo(() => {
        return [...withPreview].sort((a, b) => b.lastAt - a.lastAt);
    }, [withPreview]);

    const loweredQuery = query.trim().toLowerCase();

    return (
        <div className="chatList">
            <div className="chatListTop">
                <div className="topRow">
                    <div className="topHead">
                        <button
                            type="button"
                            className="chatMenuBtn"
                            aria-label="Abrir menú"
                            onClick={onMenuClick}
                        >
                            <BsList size={20} />
                        </button>
                        <div className="upChats">Chats de {currentUser?.name || "usuario"}</div>
                    </div>
                    <div className="themeControl">
                        <span className="themeLabel">Tema {theme === "dark" ? "Oscuro" : "Claro"}</span>
                        <button
                            type="button"
                            className={`themeSwitch ${theme === "dark" ? "on" : "off"}`}
                            onClick={toggleTheme}
                            role="switch"
                            aria-checked={theme === "dark"}
                            aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
                            title={`Modo actual: ${theme === "dark" ? "oscuro" : "claro"}`}
                        >
                            <span className="switchIcon switchIconSun" aria-hidden="true">
                                <BsSunFill size={12} />
                            </span>
                            <span className="switchIcon switchIconMoon" aria-hidden="true">
                                <BsMoonStarsFill size={11} />
                            </span>
                            <span className="switchThumb" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <SearchBox value={query} onChange={setQuery} />
            </div>

            <div className="chatItems">
                {sortedChats.map((c) => {
                    const userName = (usersById[c.userId]?.name || "").toLowerCase();
                    const collapsed = Boolean(loweredQuery) && !userName.includes(loweredQuery);
                    return (
                        <ChatListItem key={c.id} chat={c} active={c.id === selectedChatId} collapsed={collapsed} />
                    );
                })}
            </div>
        </div>
    );
}

ChatList.propTypes = {
    onMenuClick: PropTypes.func.isRequired,
};