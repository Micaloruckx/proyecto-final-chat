import React, { useEffect, useState } from "react";
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
    const { currentUser, selectedChatId, selectChat } = useChat();
    const navigate = useNavigate();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [isMobileLayout, setIsMobileLayout] = useState(() => window.matchMedia("(max-width: 750px)").matches);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 750px)");
        const handleChange = (event) => {
            setIsMobileLayout(event.matches);
            if (!event.matches) setMobileNavOpen(false);
        };
        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (selectedChatId) setMobileNavOpen(false);
    }, [selectedChatId]);

    const showLeftPane = !isMobileLayout || !selectedChatId;
    const showRightPane = !isMobileLayout || Boolean(selectedChatId);

    return (
        <>
            <div className="layout">
                {showLeftPane ? (
                    <aside className="left">
                        <div className="leftShell">
                            <Nav />
                            <ChatList onMenuClick={() => setMobileNavOpen(true)} />
                        </div>
                    </aside>
                ) : null}

                {showRightPane ? (
                    <main className="right">
                        {!selectedChatId ? (
                            <section className="sup" aria-label="Estado inicial del chat">
                                <div className="supTitle">
                                    <h2>WhatStark</h2>
                                    <img className="supLogo" src="/public/Logos/LogoSolo-WhatStark-png.PNG" alt="Logo WhatStark" />
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
                                <button
                                    type="button"
                                    className="mobileBackToChats"
                                    onClick={() => selectChat(null)}
                                    aria-label="Volver a chats"
                                >
                                    ← Volver a chats
                                </button>
                                <ChatHeader />
                                <MessageList />
                                <MessageInput />
                            </>
                        )}
                    </main>
                ) : null}
            </div>

            <div
                className={`mobileNavBackdrop ${mobileNavOpen ? "open" : ""}`}
                onClick={() => setMobileNavOpen(false)}
                aria-hidden="true"
            />
            <div className={`mobileNavDrawer ${mobileNavOpen ? "open" : ""}`}>
                <button
                    type="button"
                    className="mobileNavClose"
                    onClick={() => setMobileNavOpen(false)}
                    aria-label="Cerrar menú"
                >
                    ×
                </button>
                <div className="mobileNavInner">
                    <Nav />
                </div>
            </div>
        </>
    );
}
