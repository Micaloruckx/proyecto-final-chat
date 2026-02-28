import { useChat } from "../../context/ContactContext";
import "./ChatHeader.css";

export default function ChatHeader() {
    const { selectedChatId, chats, usersById } = useChat();
    const chat = chats.find((c) => c.id === selectedChatId);
    const u = chat ? usersById[chat.userId] : null;

    if (!u) return null;

    return (
        <div className="chatHeader">
            <img className="headerAvatar" src={u.avatar} alt={u.name} />
            <div className="headerMeta">
                <div className="headerName">{u.name}</div>
                <div className="headerStatus">{u.status}</div>
            </div>
        </div>
    );
}