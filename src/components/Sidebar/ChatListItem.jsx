import React from "react";
import { useChat } from "../../context/ContactContext";
import PropTypes from "prop-types";
import "./ChatListItem.css";

export default function ChatListItem({ chat, active }) {
    const { usersById, selectChat } = useChat();
    const u = usersById[chat.userId];

    return (
        <button className={`chatItem ${active ? "active" : ""}`} onClick={() => selectChat(chat.id)}>
            <img className="chatAvatar" src={u.avatar} alt={u.name} />
            <div className="chatMeta">
                <div className="row">
                    <div className="name">{u.name}</div>
                    <div className="time">{chat.lastTime}</div>
                </div>
                <div className="row">
                    <div className="last">{chat.lastMessage}</div>
                    {chat.unread > 0 && <div className="unread">{chat.unread}</div>}
                </div>
            </div>
        </button>
    );
}

ChatListItem.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        lastTime: PropTypes.string.isRequired,
        lastMessage: PropTypes.string.isRequired,
        unread: PropTypes.number.isRequired,
    }).isRequired,
    active: PropTypes.bool,
};