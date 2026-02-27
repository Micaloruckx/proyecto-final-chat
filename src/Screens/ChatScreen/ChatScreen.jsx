import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../Context/ContactContext";
import ChatList from "../../components/Sidebar/ChatList";
import ChatHeader from "../../components/Chat/ChatHeader.jsx";
import MessageList from "../../components/Chat/MessageList";
import MessageInput from "../../components/Chat/MessageInput";
import "./ChatScreen.css";

export default function ChatScreen() {
    const { currentUser, selectedChatId } = useChat();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    return (
        <div className="layout">
            <aside className="left">
                <ChatList />
            </aside>

            <main className="right">
                {!selectedChatId ? (
                    <div className="empty">
                        <h2>WhatStark</h2>
                        <p>Seleccioná un chat para empezar.</p>
                    </div>
                ) : (
                    <>
                        <ChatHeader />
                        <MessageList />
                        <MessageInput />
                    </>
                )}
            </main>
        </div>
    );
}
