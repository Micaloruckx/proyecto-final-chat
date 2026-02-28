import React from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import "./ChatHeader.css";

export default function ChatHeader() {
    const { selectedChatId, chats, usersById } = useChat();
    const navigate = useNavigate();
    const chat = chats.find((c) => c.id === selectedChatId);
    const u = chat ? usersById[chat.userId] : null;

    if (!u) return null;

    return (
        <div className="chatHeader">
            <button
                type="button"
                className="headerAvatarBtn"
                onClick={() => navigate(`/profile/${u.id}`)}
                aria-label={`Abrir perfil de ${u.name}`}
            >
                <img
                    className="headerAvatar"
                    src={u.avatar}
                    alt={u.name}
                />
            </button>
            <div className="headerMeta">
                <div className="headerName">{u.name}</div>
                <div className="headerStatus">{u.status}</div>
            </div>
        </div>
    );
}