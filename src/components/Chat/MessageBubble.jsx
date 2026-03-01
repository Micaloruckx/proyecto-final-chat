import React from "react";
import "./MessageBubble.css";
import PropTypes from "prop-types";

export default function MessageBubble({ message }) {
    const text = message.text?.trim() || "";
    const hasImage = Boolean(message.image);
    const isSingleLine = Boolean(text) && !hasImage && !text.includes("\n") && text.length <= 52;

    return (
        <div className={`bubbleRow ${message.fromMe ? "me" : "them"}`} role="listitem">
            <div className="bubble">
                {text ? (
                    <div className={`textAndTime ${isSingleLine ? "singleLine" : ""}`}>
                        <div className="text">{text}</div>
                        {isSingleLine ? (
                            <time className="time inlineTime" aria-label={`Enviado a las ${message.time}`}>{message.time}</time>
                        ) : null}
                    </div>
                ) : null}
                {message.image ? <img className="messageImage" src={message.image} alt="Imagen del chat" /> : null}
                {!isSingleLine ? <time className="time" aria-label={`Enviado a las ${message.time}`}>{message.time}</time> : null}
            </div>
        </div>
    );
}

MessageBubble.propTypes = {
    message: PropTypes.shape({
        fromMe: PropTypes.bool.isRequired,
        text: PropTypes.string,
        image: PropTypes.string,
        time: PropTypes.string.isRequired,
    }).isRequired,
};