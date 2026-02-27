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
                <img
                    className="loginLogo"
                    src="/Logos/Logo-WhatStark-png.png"
                    alt="WhatStark"
                />
                <h1>WhatStark</h1>
                <p>Elegí tu usuario</p>

                <div className="loginUsers">
                    {users.map((u) => (
                        <button
                            key={u.id}
                            className="loginUserBtn"
                            onClick={() => {
                                login(u.id);
                                navigate("/");
                            }}
                        >
                            <img className="loginAvatar" src={u.avatar} alt={u.name} />
                            <div className="loginUserMeta">
                                <div className="loginUserName">{u.name}</div>
                                <div className="loginUserStatus">{u.status}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
