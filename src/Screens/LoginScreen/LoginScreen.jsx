import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../Context/ContactContext";
import "./LoginScreen.css";


export default function Login() {
    const { users, currentUser, login } = useChat();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) navigate("/");
    }, [currentUser, navigate]);

    return (
        <div className="login">
            <div className="loginCard">
                <h1>WhatStark</h1>
                <p>Elegí tu usuario</p>

                <div className="userGrid">
                    {users.map((u) => (
                        <button
                            key={u.id}
                            className="userBtn"
                            onClick={() => {
                                login(u.id);
                                navigate("/");
                            }}
                        >
                            <img className="avatar" src={u.avatar} alt={u.name} />
                            <div className="userName">{u.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
