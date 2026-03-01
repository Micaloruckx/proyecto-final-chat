import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import "./LoginScreen.css";

// Pantalla de login con animación de carga simulada y redirección al chat principal
export default function LoginScreen() {
    const navigate = useNavigate();
    const { currentUser, login } = useChat();

    const avatarOptions = useMemo(() => [
        "/Avatars/Jon.PNG",
        "/Avatars/Arya.PNG",
        "/Avatars/Sansa.PNG",
        "/Avatars/Bran.PNG",
        "/Avatars/Tony.PNG",
    ], []);

    const [mode, setMode] = useState("form");
    const [progress, setProgress] = useState(0);

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);

    useEffect(() => {
        if (currentUser) navigate("/", { replace: true });
    }, [currentUser, navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedNickname = nickname.trim();
        if (!trimmedNickname) return;

        // INicia simulación de proceso de login con animación de carga
        setMode("loading");
        setProgress(0);

        const totalMs = 2500;
        const stepMs = 60;
        const steps = Math.ceil(totalMs / stepMs);
        let i = 0;

        const t = setInterval(() => {
            i += 1;
            const pct = Math.min(100, Math.round((i / steps) * 100));
            setProgress(pct);

            if (pct >= 100) {
                clearInterval(t);

                login({
                    name: trimmedNickname,
                    avatar: selectedAvatar,
                });

                // Redirige al chat principal
                navigate("/", { replace: true });
            }
        }, stepMs);
    }
    // Muestra pantalla de carga mientras "inicia sesión"
    if (mode === "loading") {
        return (
            <main className="loginScreen" aria-live="polite" aria-busy="true">
                <div className="loginCard loadingCard">
                    <img
                        className="loginLogo bigPulse"
                        src="/Logos/Logo-WhatStark-png.png"
                        alt="WhatStark"
                    />
                    <div className="loadingText">Cargando tus chats…</div>
                    <div className="loadingBar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Progreso de inicio de sesión">
                        <div className="loadingFill" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="loginScreen">
            <div className="loginCard">
                <img
                    className="loginLogo"
                    src="/Logos/Logo-WhatStark-png.png"
                    alt="WhatStark"
                />

                <h1 className="loginTitle">Iniciar sesión</h1>

                <form className="loginForm" onSubmit={handleSubmit}>
                    <label className="field">
                        <span className="fieldLabel">Nickname</span>
                        <input
                            id="login-nickname"
                            className="fieldInput"
                            type="text"
                            placeholder="Elegí tu nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            autoComplete="nickname"
                            minLength={2}
                            maxLength={24}
                            required
                        />
                    </label>

                    <div className="field">
                        <span className="fieldLabel">Elegí tu avatar</span>
                        <div className="avatarGrid" role="radiogroup" aria-label="Selector de avatar">
                            {avatarOptions.map((avatar, index) => {
                                const isSelected = selectedAvatar === avatar;
                                return (
                                    <button
                                        key={avatar}
                                        type="button"
                                        className={`avatarChoice ${isSelected ? "isSelected" : ""}`}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        role="radio"
                                        aria-checked={isSelected}
                                        aria-label={`Avatar ${index + 1}`}
                                    >
                                        <img src={avatar} alt="Avatar" className="avatarThumb" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <label className="field">
                        <span className="fieldLabel">Contraseña</span>
                        <input
                            id="login-password"
                            className="fieldInput"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    <div className="loginRow">
                        <label className="remember">
                            <input type="checkbox" className="checkbox" defaultChecked aria-label="Recordar sesión" />
                            Recordarme
                        </label>
                        <button type="button" className="linkBtn" onClick={() => alert("Aún no funciono, soon 🙂")}>
                            ¿Has olvidado tu contraseña?
                        </button>
                    </div>

                    <button className="loginBtn" type="submit">
                        Acceso
                    </button>

                    <div className="footerText">
                        ¿No tienes una cuenta?{" "}
                        <button type="button" className="linkBtn" onClick={() => alert("Aún no funciono, soon 🙂")}>
                            Registrate
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}