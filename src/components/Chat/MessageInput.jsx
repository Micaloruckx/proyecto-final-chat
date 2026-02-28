import React, { useState } from "react";
import { useChat } from "../../Context/ContactContext";
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
            <input
                className="msgInput"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribir mensaje..."
            />
            <button className="sendBtn" type="submit">Enviar</button>
        </form>
    );
}