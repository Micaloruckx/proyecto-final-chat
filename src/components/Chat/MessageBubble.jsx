import "./MessageBubble.css";
import { useChat } from "../../Context/ContactContext";

export default function MessageBubble({ message }) {
    return (
        <div className={`bubbleRow ${message.fromMe ? "me" : "them"}`}>
            <div className="bubble">
                <div className="text">{message.text}</div>
                <div className="time">{message.time}</div>
            </div>
        </div>
    );
}