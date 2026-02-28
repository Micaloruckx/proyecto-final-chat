import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import Nav from "../../components/Nav/Nav";
import ChatList from "../../components/Sidebar/ChatList";
import ChatHeader from "../../components/Chat/ChatHeader.jsx";
import MessageList from "../../components/Chat/MessageList";
import MessageInput from "../../components/Chat/MessageInput";
import { BsFileEarmarkText, BsPersonPlus } from "react-icons/bs";
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
                <div className="leftShell">
                    <Nav />
                    <ChatList />
                </div>
            </aside>

            <main className="right">
                {!selectedChatId ? (
                    <section className="sup" aria-label="Estado inicial del chat">
                        <div className="supTitle">
                            <h2>WhatStark</h2>
                            <img src="/public/Logos/LogoSolo-WhatStark-png.PNG" alt="Logo WhatStark" height={300} />
                            <p>Seleccioná un chat para empezar o</p>
                        </div>
                        <div className="supActions" aria-label="Acciones rápidas">
                            <button type="button" className="supActionBtn" aria-label="Enviar documento">
                                <BsFileEarmarkText size={30} />
                            </button>
                            <button type="button" className="supActionBtn" aria-label="Añadir contacto">
                                <BsPersonPlus size={32} />
                            </button>
                        </div>
                        <div className="supActionLabels" aria-hidden="true">
                            <span>Enviar documento</span>
                            <span>Añadir contacto</span>
                        </div>
                    </section>
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
