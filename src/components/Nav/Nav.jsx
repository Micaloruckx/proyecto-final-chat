import React from "react";
import { useNavigate } from "react-router-dom";
import { BsChatLeftText, BsTelephone, BsGear } from "react-icons/bs";
import { useChat } from "../../context/ContactContext";
import "./Nav.css";

export default function Nav() {
	const { currentUser } = useChat();
	const navigate = useNavigate();

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
				<button type="button" className="navIconBtn" aria-label="Ajustes" title="Ajustes">
					<BsGear size={24} />
				</button>
				<button
					type="button"
					className="navAvatarBtn"
					onClick={() => currentUser?.id && navigate(`/profile/${currentUser.id}`)}
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
