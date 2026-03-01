import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import "./ProfileScreen.css";

export default function ProfileScreen() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { usersById } = useChat();
    const user = usersById[userId];

    if (!user) {
        return (
            <main className="profilePage">
                <div className="profileCard">
                    <p>Perfil no encontrado.</p>
                    <button type="button" className="profileBackBtn" onClick={() => navigate("/")}>Volver</button>
                </div>
            </main>
        );
    }

    return (
        <main className="profilePage">
            <div className="profileCard">
                <button type="button" className="profileBackBtn" onClick={() => navigate(-1)}>← Volver</button>
                <img className="profileAvatar" src={user.avatar} alt={user.name} />
                <h1 className="profileName">{user.name}</h1>
                <p className="profileStatus">{user.status}</p>
                <p className="profilePhone">Celular: {user.phone || "No disponible"}</p>
                <p className="profileSeen">Última conversación: {user.lastSeen}</p>
            </div>
        </main>
    );
}