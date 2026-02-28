import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../Context/ContactContext";
import "./LoginScreen.css";

// Pantalla de login con animación de carga simulada y redirección al chat principal
export default function LoginScreen() {
    const navigate = useNavigate();
    const { currentUser, login } = useChat();

    const defaultUserId = useMemo(() => "tony", []);

    const [mode, setMode] = useState("form");
    const [progress, setProgress] = useState(0);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Si ya hay sesión, ir directo al chat
    useEffect(() => {
        if (currentUser) navigate("/", { replace: true });
    }, [currentUser, navigate]);

    function handleSubmit(e) {
        e.preventDefault();

        // Simula proceso de login con animación de carga
        setMode("loading");
        setProgress(0);

        const totalMs = 1400;
        const stepMs = 35;
        const steps = Math.ceil(totalMs / stepMs);
        let i = 0;

        const t = setInterval(() => {
            i += 1;
            const pct = Math.min(100, Math.round((i / steps) * 100));
            setProgress(pct);

            if (pct >= 100) {
                clearInterval(t);

                // Simula login exitoso con usuario por defecto (ignora email/password)
                login(defaultUserId);

                // Redirige al chat principal
                navigate("/", { replace: true });
            }
        }, stepMs);
    }
    // Muestra pantalla de carga mientras "inicia sesión"
    if (mode === "loading") {
        return (
            <div className="loginScreen">
                <div className="loginCard loadingCard">
                    <img
                        className="loginLogo bigPulse"
                        src="/Logos/Logo-WhatStark-png.png"
                        alt="WhatStark"
                    />
                    <div className="loadingText">Iniciando sesión…</div>
                    <div className="loadingPct">{progress}%</div>
                    <div className="loadingBar">
                        <div className="loadingFill" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="loginScreen">
            <div className="loginCard">
                <img
                    className="loginLogo"
                    src="/Logos/Logo-WhatStark-png.png"
                    alt="WhatStark"
                />

                <h1 className="loginTitle">WhatStark / Iniciar sesión</h1>

                <form className="loginForm" onSubmit={handleSubmit}>
                    <label className="field">
                        <span className="fieldLabel">Correo electrónico</span>
                        <input
                            className="fieldInput"
                            type="email"
                            placeholder="Introduce tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className="field">
                        <span className="fieldLabel">Contraseña</span>
                        <input
                            className="fieldInput"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <div className="loginRow">
                        <label className="remember">
                            <input type="checkbox" defaultChecked />
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
        </div>
    );
}