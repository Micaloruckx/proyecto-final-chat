import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ContactContext";
import "./LoginScreen.css";

// Pantalla de login con animación de carga simulada y redirección al chat principal
export default function LoginScreen() {
    // ===== [AUDIO LOGIN - INICIO] =====
    const MAX_LOGIN_VOLUME = 0.5;
    const LOGIN_AUDIO_TRACK_OFFSET_SECONDS = 4;
    const LOGIN_AUDIO_FADE_OUT_MS = 2500;
    const navigate = useNavigate();
    const { currentUser, login } = useChat();
    const audioRef = useRef(null);
    const fadeTimerRef = useRef(null);
    const hasAppliedTrackOffsetRef = useRef(false);
    const hasStartedLoadingFadeRef = useRef(false);

    const avatarOptions = useMemo(() => [
        "/avatars/frodo.png",
        "/avatars/tyrion.png",
        "/avatars/hermione.png",
        "/avatars/daenerys.png",
        "/avatars/daemon.png",
    ], []);

    const [mode, setMode] = useState("form");
    const [progress, setProgress] = useState(0);

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    // ===== [AUDIO LOGIN - FIN] =====

    // Redirección de sesión activa (sin interferir con la transición del loading)
    // Configuración de audio: volumen máximo, offset de pista y autoplay con fallback por interacción
    // ===== [AUDIO LOGIN: CONTROL/REPRODUCCIÓN - INICIO] =====
    useEffect(() => {
        if (currentUser && mode !== "loading") navigate("/", { replace: true });
    }, [currentUser, mode, navigate]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const unlockEvents = ["pointerdown", "touchstart", "click", "keydown"];

        const enforceMaxVolume = () => {
            if (audio.volume > MAX_LOGIN_VOLUME) {
                audio.volume = MAX_LOGIN_VOLUME;
            }
        };

        const applyTrackOffset = () => {
            if (hasAppliedTrackOffsetRef.current) return;
            if (Number.isFinite(audio.duration) && audio.duration > LOGIN_AUDIO_TRACK_OFFSET_SECONDS) {
                audio.currentTime = LOGIN_AUDIO_TRACK_OFFSET_SECONDS;
                hasAppliedTrackOffsetRef.current = true;
            }
        };

        audio.volume = MAX_LOGIN_VOLUME;
        enforceMaxVolume();
        applyTrackOffset();

        const tryPlay = () => {
            return audio.play()
                .then(() => {
                    return true;
                })
                .catch(() => false);
        };

        const removeUnlockListeners = () => {
            unlockEvents.forEach((eventName) => {
                window.removeEventListener(eventName, unlockAudio);
            });
        };

        const unlockAudio = () => {
            tryPlay().then((played) => {
                if (played) {
                    removeUnlockListeners();
                }
            });
        };

        audio.addEventListener("volumechange", enforceMaxVolume);
        audio.addEventListener("loadedmetadata", enforceMaxVolume);
        audio.addEventListener("loadedmetadata", applyTrackOffset);
        audio.addEventListener("canplay", unlockAudio);
        unlockEvents.forEach((eventName) => {
            window.addEventListener(eventName, unlockAudio, { passive: true });
        });
        tryPlay().then((played) => {
            if (played) {
                removeUnlockListeners();
            }
        });

        return () => {
            if (fadeTimerRef.current) {
                window.clearInterval(fadeTimerRef.current);
                fadeTimerRef.current = null;
            }
            audio.removeEventListener("volumechange", enforceMaxVolume);
            audio.removeEventListener("loadedmetadata", enforceMaxVolume);
            audio.removeEventListener("loadedmetadata", applyTrackOffset);
            audio.removeEventListener("canplay", unlockAudio);
            removeUnlockListeners();
            audio.pause();
            audio.currentTime = 0;
            hasAppliedTrackOffsetRef.current = false;
        };
    }, [LOGIN_AUDIO_TRACK_OFFSET_SECONDS, MAX_LOGIN_VOLUME]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = isAudioMuted;
    }, [isAudioMuted]);
    // ===== [AUDIO LOGIN: CONTROL/REPRODUCCIÓN - FIN] =====

    // ===== [AUDIO LOGIN: BOTÓN MUTE - INICIO] =====
    const toggleAudioMute = () => {
        setIsAudioMuted((prev) => !prev);
    };
    // ===== [AUDIO LOGIN: BOTÓN MUTE - FIN] =====

    // Transición de salida: desvanecer audio y luego navegar al chat
    // ===== [AUDIO LOGIN: FADE OUT AL NAVEGAR - INICIO] =====
    const fadeOutAudioAndNavigate = ({ navigateOnComplete = true } = {}) => {
        const audio = audioRef.current;

        if (!audio) {
            if (navigateOnComplete) {
                navigate("/", { replace: true });
            }
            return;
        }

        if (fadeTimerRef.current) {
            window.clearInterval(fadeTimerRef.current);
            fadeTimerRef.current = null;
        }

        const initialVolume = Math.min(audio.volume, MAX_LOGIN_VOLUME);
        if (audio.paused || initialVolume <= 0.01) {
            audio.pause();
            audio.currentTime = 0;
            if (navigateOnComplete) {
                navigate("/", { replace: true });
            }
            return;
        }

        const tickMs = 40;
        const steps = Math.max(1, Math.ceil(LOGIN_AUDIO_FADE_OUT_MS / tickMs));
        let step = 0;

        fadeTimerRef.current = window.setInterval(() => {
            step += 1;
            const progress = Math.min(1, step / steps);
            const easedVolume = initialVolume * Math.pow(1 - progress, 2);
            const nextVolume = Math.max(0, easedVolume);
            audio.volume = nextVolume;

            if (step >= steps || nextVolume <= 0.01) {
                window.clearInterval(fadeTimerRef.current);
                fadeTimerRef.current = null;
                audio.volume = 0;
                audio.pause();
                audio.currentTime = 0;
                if (navigateOnComplete) {
                    navigate("/", { replace: true });
                }
            }
        }, tickMs);
    };
    // ===== [AUDIO LOGIN: FADE OUT AL NAVEGAR - FIN] =====

    // Flujo de acceso: simular loading, autenticar y entrar al chat con fade-out de audio
    function handleSubmit(e) {
        e.preventDefault();
        const trimmedNickname = nickname.trim();
        if (!trimmedNickname) return;

        const audio = audioRef.current;
        if (audio && audio.paused && !isAudioMuted) {
            audio.play().catch(() => { });
        }

        // INicia simulación de proceso de login con animación de carga
        setMode("loading");
        setProgress(0);
        hasStartedLoadingFadeRef.current = false;

        const totalMs = 3000;
        const stepMs = 60;
        const steps = Math.ceil(totalMs / stepMs);
        let i = 0;

        const t = setInterval(() => {
            i += 1;
            const pct = Math.min(100, Math.round((i / steps) * 100));
            setProgress(pct);

            if (pct >= 50 && !hasStartedLoadingFadeRef.current) {
                hasStartedLoadingFadeRef.current = true;
                fadeOutAudioAndNavigate({ navigateOnComplete: false });
            }

            if (pct >= 100) {
                clearInterval(t);

                login({
                    name: trimmedNickname,
                    avatar: selectedAvatar,
                });

                navigate("/", { replace: true });
            }
        }, stepMs);
    }
    return (
        <main className="loginScreen">
            {/* ===== [AUDIO LOGIN: ELEMENTO HTML AUDIO - INICIO] ===== */}
            <audio ref={audioRef} className="srOnly" src="/audio/got-intro.mp3" autoPlay loop preload="auto" />
            {/* ===== [AUDIO LOGIN: ELEMENTO HTML AUDIO - FIN] ===== */}
            {mode === "loading" ? (
                <div className="loginCard loadingCard" aria-live="polite" aria-busy="true">
                    <div className="loadingLogoShell">
                        <img
                            className="loginLogo bigPulse"
                            src="/logos/logo-solo-whatstark.png"
                            alt="WhatStark"
                        />
                    </div>
                    <div className="loadingText">Cargando tus chats…</div>
                    <div className="loadingBar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Progreso de inicio de sesión">
                        <div className="loadingFill" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            ) : (
                <div className="loginCard">
                    <img
                        className="loginLogo"
                        src="/logos/logo-whatstark.png"
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
                                placeholder="Elige tu apodo"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                autoComplete="nickname"
                                minLength={2}
                                maxLength={24}
                                required
                            />
                        </label>

                        <div className="field">
                            <span className="fieldLabel">Avatar</span>
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
                                placeholder="Ingresa tu contraseña"
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
                                Regístrate
                            </button>
                        </div>
                    </form>
                    <button
                        type="button"
                        className="loginAudioToggle"
                        onClick={toggleAudioMute}
                        aria-label={isAudioMuted ? "Activar música" : "Mutear música"}
                        title={isAudioMuted ? "Activar música" : "Mutear música"}
                    >
                        <span aria-hidden="true">{isAudioMuted ? "🔇" : "🔊"}</span>
                    </button>
                </div>
            )}
        </main>
    );
}