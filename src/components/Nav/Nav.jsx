import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsChatLeftText, BsTelephone, BsGear, BsPencilSquare, BsBoxArrowRight } from "react-icons/bs";
import { useChat } from "../../context/ContactContext";
import "./Nav.css";

export default function Nav() {
	const { currentUser, logout } = useChat();
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		function handleOutsideClick(event) {
			if (!menuRef.current) return;
			if (!menuRef.current.contains(event.target)) {
				setMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, []);

	function handleEditProfile() {
		if (!currentUser?.id) return;
		setMenuOpen(false);
		navigate(`/profile/${currentUser.id}`);
	}

	function handleLogout() {
		setMenuOpen(false);
		logout();
		navigate("/login", { replace: true });
	}

	return (
		<aside className="navRail" aria-label="Navegación principal">
			<div className="navTop">
				<button type="button" className="navIconBtn" aria-label="Chats" title="Chats">
					<BsChatLeftText size={24} />
				</button>
				<button type="button" className="navIconBtn" aria-label="Llamadas" title="Llamadas">
					<BsTelephone size={22} />
				</button>
			</div>

			<div className="navBottom">
				<div className="navMenuWrap" ref={menuRef}>
					<button
						type="button"
						className="navIconBtn"
						aria-label="Opciones"
						title="Opciones"
						onClick={() => setMenuOpen((prev) => !prev)}
						aria-expanded={menuOpen}
						aria-haspopup="menu"
					>
						<BsGear size={22} />
					</button>

					{menuOpen ? (
						<div className="navMenu" role="menu" aria-label="Opciones de perfil">
							<button type="button" className="navMenuItem" role="menuitem" onClick={handleEditProfile}>
								<BsPencilSquare size={15} />
								<span>Modificar datos</span>
							</button>
							<button type="button" className="navMenuItem" role="menuitem" onClick={handleLogout}>
								<BsBoxArrowRight size={15} />
								<span>Cerrar sesión</span>
							</button>
						</div>
					) : null}
				</div>
				<button
					type="button"
					className="navAvatarBtn"
					onClick={handleEditProfile}
					aria-label="Abrir mi perfil"
					title={currentUser?.name || "Usuario"}
				>
					<img
						className="navUserAvatar"
						src={currentUser?.avatar || "/Avatars/Tony.PNG"}
						alt={currentUser?.name || "Usuario"}
					/>
				</button>
			</div>
		</aside>
	);
}
