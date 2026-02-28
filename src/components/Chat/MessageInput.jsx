import React, { useState } from "react";
import { useChat } from "../../context/ContactContext";
import "./MessageInput.css";

export default function MessageInput() {
    const { selectedChatId, sendMessage } = useChat();
    const [text, setText] = useState("");

    function onSubmit(e) {
        e.preventDefault();
        sendMessage(selectedChatId, text);
        setText("");
    }

    return (
        <form className="msgForm" onSubmit={onSubmit}>
            <label className="srOnly" htmlFor="chat-message-input">Escribir mensaje</label>
            <input
                id="chat-message-input"
                className="msgInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribir mensaje..."
                aria-label="Escribir mensaje"
            />
            <button className="sendBtn" type="submit" aria-label="Enviar mensaje">Enviar</button>
        </form>
    );
}