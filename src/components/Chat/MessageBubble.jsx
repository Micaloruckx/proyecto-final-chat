import React from "react";
import "./MessageBubble.css";
import PropTypes from "prop-types";

export default function MessageBubble({ message }) {
    return (
        <div className={`bubbleRow ${message.fromMe ? "me" : "them"}`}>
            <div className="bubble">
                {message.text ? <div className="text">{message.text}</div> : null}
                {message.image ? <img className="messageImage" src={message.image} alt="Imagen del chat" /> : null}
                <div className="time">{message.time}</div>
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