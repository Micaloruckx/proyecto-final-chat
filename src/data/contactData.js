const contactData = {
    users: [
        { id: "jon", name: "Jon Snow", avatar: "/avatars/jon.png", status: "No sé nada", lastSeen: "Hace 5 minutos", phone: "+54 9 11 4023-1945" },
        { id: "arya", name: "Arya Stark", avatar: "/avatars/arya.png", status: "Una chica no tiene nombre", lastSeen: "Hace 2 días", phone: "+54 9 11 5931-2280" },
        { id: "sansa", name: "Sansa Stark", avatar: "/avatars/sansa.png", status: "El Norte recuerda", lastSeen: "Ayer", phone: "+54 9 11 7142-6603" },
        { id: "bran", name: "Bran Stark", avatar: "/avatars/bran.png", status: "Recuerdo todo", lastSeen: "Hace 4 horas", phone: "+54 9 11 3487-9152" },
        { id: "robb", name: "Robb Stark", avatar: "/avatars/robb.png", status: "Rey en el Norte", lastSeen: "Hoy", phone: "+54 9 11 8750-3041" },
        { id: "eddard", name: "Eddard Stark", avatar: "/avatars/eddard.png", status: "Se acerca el invierno", lastSeen: "Hoy", phone: "+54 9 11 4609-5538" },
        { id: "catelyn", name: "Catelyn Stark", avatar: "/avatars/catelyn.png", status: "La familia primero", lastSeen: "En línea", phone: "+54 9 11 6294-7815" },
        { id: "rickon", name: "Rickon Stark", avatar: "/avatars/rickon.png", status: "⚡", lastSeen: "Desconocido", phone: "+54 9 11 2076-4489" },
        { id: "tony", name: "Tony Stark", avatar: "/avatars/tony.png", status: "Genio, multimillonario y filántropo", lastSeen: "En línea", phone: "+54 9 11 9999-3000" },
        { id: "targaryen-group", name: "Consejo Targaryen 🔥", avatar: "/trono.jpg", status: "Grupo · 7 participantes", lastSeen: "En línea", phone: "+54 9 11 7000-0001" },
    ],

    chats: [
        { id: "chat-targaryen", userId: "targaryen-group", lastMessage: "[Vos] Cuervos enviados. Nadie sale sin señal.", lastTime: "Ahora", unread: 3 },
        { id: "chat-tony", userId: "tony", lastMessage: "Aprobada, 10/10 actitud.", lastTime: "Ahora", unread: 2 },
        { id: "chat-eddard", userId: "eddard", lastMessage: "Al alba se cierran las puertas del norte.", lastTime: "22:12", unread: 0 },
        { id: "chat-bran", userId: "bran", lastMessage: "No era una amenaza, era una advertencia.", lastTime: "21:14", unread: 0 },
        { id: "chat-catelyn", userId: "catelyn", lastMessage: "Volvé al salón cuando suene la campana.", lastTime: "20:24", unread: 0 },
        { id: "chat-robb", userId: "robb", lastMessage: "Entonces mañana entrenamos con acero real.", lastTime: "19:21", unread: 0 },
        { id: "chat-sansa", userId: "sansa", lastMessage: "Si prometen lealtad, abro las puertas.", lastTime: "18:52", unread: 1 },
        { id: "chat-rickon", userId: "rickon", lastMessage: "Shaggydog casi se come mi guante otra vez.", lastTime: "17:33", unread: 0 },
        { id: "chat-jon", userId: "jon", lastMessage: "La guardia del portón cambia al tercer toque.", lastTime: "08:27", unread: 0 },
        { id: "chat-arya", userId: "arya", lastMessage: "Voy por los pasillos viejos. Nadie me ve.", lastTime: "07:59", unread: 0 },
    ],

    messages: {
        "chat-targaryen": [
            { id: "m1", fromMe: false, text: "[Daenerys] El Consejo se reúne al anochecer. Nadie debe saberlo.", time: "Ahora" },
            { id: "m2", fromMe: false, text: "[Tyrion] Revisen rutas de ingreso y salida. Sin testigos.", time: "Ahora" },
            { id: "m3", fromMe: true, text: "[Vos] Confirmo acceso por patio interno. Sin movimientos sospechosos.", time: "Ahora" },
            { id: "m4", fromMe: false, text: "[Varys] Mantengan perfil bajo. Hay ojos en todas partes.", time: "Ahora" },
            { id: "m5", fromMe: true, text: "[Vos] Entendido. Sigo en las sombras.", time: "Ahora" },
            { id: "m6", fromMe: false, text: "[Daenerys] Si alguien pregunta, el Consejo nunca existió.", time: "Ahora" },
            { id: "m7", fromMe: true, text: "[Vos] Cuervos enviados. Nadie sale sin señal.", time: "Ahora" },
        ],

        "chat-jon": [
            { id: "m1", fromMe: false, text: "La guardia vio movimiento al sur. ¿Seguís en camino?", time: "08:15" },
            { id: "m2", fromMe: true, text: "Sí, entro por la puerta este en 10 minutos.", time: "08:17" },
            { id: "m3", fromMe: false, text: "Perfecto. Sam está revisando provisiones.", time: "08:19" },
            { id: "m4", fromMe: true, text: "Decile que reserve mantas para los nuevos.", time: "08:21" },
            { id: "m5", fromMe: false, text: "Hecho. Traé leña para el salón.", time: "08:23" },
            { id: "m6", fromMe: true, text: "También llevo aceite para las antorchas de la muralla interior.", time: "08:25" },
            { id: "m7", fromMe: false, text: "Bien. La guardia del portón cambia al tercer toque.", time: "08:27" },
        ],
        "chat-arya": [
            { id: "m1", fromMe: false, text: "Terminé de entrenar antes del amanecer.", time: "07:45" },
            { id: "m2", fromMe: true, text: "¿Y ahora?", time: "07:50" },
            { id: "m3", fromMe: false, text: "Quiero practicar con arco en el patio norte.", time: "07:53" },
            { id: "m4", fromMe: true, text: "Voy cuando termine con Jon.", time: "07:55" },
            { id: "m5", fromMe: false, text: "Entonces voy con vos.", time: "07:56" },
            { id: "m6", fromMe: true, text: "Llevá la capa oscura. El viento corta como cuchillo hoy.", time: "07:58" },
            { id: "m7", fromMe: false, text: "Voy por los pasillos viejos. Nadie me ve.", time: "07:59" },
        ],
        "chat-sansa": [
            { id: "m1", fromMe: false, text: "Necesitamos aliados para reforzar el norte.", time: "18:40" },
            { id: "m2", fromMe: true, text: "¿Tenés nombres concretos?", time: "18:41" },
            { id: "m3", fromMe: false, text: "Manderly y Glover. Si llegan juntos, nos conviene.", time: "18:43" },
            { id: "m4", fromMe: true, text: "Les mando cuervos hoy mismo.", time: "18:45" },
            { id: "m5", fromMe: false, text: "Perfecto. Los cito al amanecer.", time: "18:47" },
            { id: "m6", fromMe: true, text: "¿Conviene preparar el salón grande o la sala de guerra?", time: "18:49" },
            { id: "m7", fromMe: false, text: "Sala de guerra. Si prometen lealtad, abro las puertas.", time: "18:52" },
        ],
        "chat-bran": [
            { id: "m1", fromMe: false, text: "Vi algo en el bosque de los arcianos.", time: "21:02" },
            { id: "m2", fromMe: true, text: "¿Qué viste?", time: "21:03" },
            { id: "m3", fromMe: false, text: "Huellas recientes. No eran de nuestros exploradores.", time: "21:05" },
            { id: "m4", fromMe: true, text: "Aviso a los guardias de la muralla interior.", time: "21:07" },
            { id: "m5", fromMe: false, text: "Bien. Hablamos cuando llegue Jon.", time: "21:09" },
            { id: "m6", fromMe: true, text: "¿Querés que mande dos rastreadores con antorchas?", time: "21:11" },
            { id: "m7", fromMe: false, text: "No era una amenaza, era una advertencia.", time: "21:14" },
        ],

        "chat-tony": [
            { id: "m1", fromMe: false, text: "Ok, me perdí. ¿Esto es un chat familiar o un consejo de guerra?", time: "Ahora" },
            { id: "m2", fromMe: true, text: "Un poco de ambos. Bienvenido a WhatStark.", time: "Ahora" },
            { id: "m3", fromMe: false, text: "Vi un lobo gigante en la entrada. No estaba en el briefing.", time: "Ahora" },
            { id: "m4", fromMe: true, text: "Es Ghost. Si te ignora, te fue bien.", time: "Ahora" },
            { id: "m5", fromMe: false, text: "¿Y el de capa negra que mira al horizonte como héroe trágico?", time: "Ahora" },
            { id: "m6", fromMe: true, text: "Jon. Hace eso antes del desayuno.", time: "Ahora" },
            { id: "m7", fromMe: false, text: "Genial, no me pongan en la primera fila.", time: "Ahora" },
            { id: "m8", fromMe: false, text: "Bueno, para caer bien: selfie de presentación 😎", time: "Ahora" },
            { id: "m9", fromMe: false, text: "", image: "/avatars/tony.png", time: "Ahora" },
            { id: "m10", fromMe: true, text: "Aprobada, 10/10 actitud.", time: "Ahora" },
        ],

        "chat-catelyn": [
            { id: "m1", fromMe: false, text: "¿Comieron algo antes de salir al patio?", time: "20:08" },
            { id: "m2", fromMe: true, text: "Sí, sopa caliente y pan. Todo bien.", time: "20:10" },
            { id: "m3", fromMe: false, text: "Bien. El frío está fuerte esta noche.", time: "20:12" },
            { id: "m4", fromMe: true, text: "Nos quedamos dentro después de la ronda.", time: "20:14" },
            { id: "m5", fromMe: false, text: "Perfecto, me quedo más tranquila.", time: "20:16" },
            { id: "m6", fromMe: true, text: "Ya están cerradas las ventanas del ala oeste.", time: "20:18" },
            { id: "m7", fromMe: false, text: "Gracias. Que nadie duerma sin manta esta noche.", time: "20:20" },
            { id: "m8", fromMe: true, text: "Entendido. Voy a revisar hogar por hogar con Maester Luwin.", time: "20:22" },
            { id: "m9", fromMe: false, text: "Volvé al salón cuando suene la campana.", time: "20:24" },
        ],

        "chat-robb": [
            { id: "m1", fromMe: false, text: "Revisé a los hombres del ala oeste.", time: "19:04" },
            { id: "m2", fromMe: true, text: "¿Cómo los viste?", time: "19:05" },
            { id: "m3", fromMe: false, text: "Cansados, pero firmes. Necesitan rotar guardia.", time: "19:08" },
            { id: "m4", fromMe: true, text: "Armo dos turnos extra para mañana.", time: "19:10" },
            { id: "m5", fromMe: false, text: "Entonces entrenamos al amanecer.", time: "19:12" },
            { id: "m6", fromMe: false, text: "Los del patio norte piden entrenar con escudos pesados.", time: "19:14" },
            { id: "m7", fromMe: true, text: "Dales media hora más y cambiamos a lanzas cortas.", time: "19:16" },
            { id: "m8", fromMe: false, text: "Buena orden. Ya están alineados y listos.", time: "19:19" },
            { id: "m9", fromMe: true, text: "Entonces mañana entrenamos con acero real.", time: "19:21" },
        ],

        "chat-eddard": [
            { id: "m1", fromMe: false, text: "La calma engaña; igual hay que prepararse.", time: "22:01" },
            { id: "m2", fromMe: true, text: "Estamos reforzando puertas y torres.", time: "22:03" },
            { id: "m3", fromMe: false, text: "Bien. No descuiden a la gente del pueblo.", time: "22:05" },
            { id: "m4", fromMe: true, text: "Ya se distribuyeron mantas y comida.", time: "22:06" },
            { id: "m5", fromMe: false, text: "El Norte recuerda, pero también aprende.", time: "22:07" },
            // ===== [VOICE NOTE EDDARD EN DATA - INICIO] =====
            { id: "m6", fromMe: false, text: "", audio: "/audio/chat-sfx.mp3", audioLabel: "Nota de voz:", time: "22:08" },
            // ===== [VOICE NOTE EDDARD EN DATA - FIN] =====
            { id: "m7", fromMe: true, text: "Recibida. Doy la orden de cerrar los accesos del puente.", time: "22:10" },
            { id: "m8", fromMe: false, text: "Al alba se cierran las puertas del norte.", time: "22:12" },
        ],

        "chat-rickon": [
            { id: "m1", fromMe: false, text: "Mirá esta selfie con Shaggydog 😎", time: "17:25" },
            { id: "m2", fromMe: false, text: "No para quieto, pero hoy se quedó al lado mío como un lord.", time: "17:26" },
            { id: "m3", fromMe: true, text: "JAJA, te salió tremenda. Él posa mejor que yo.", time: "17:27" },
            { id: "m4", fromMe: false, text: "jajaja quedó épica", time: "17:29" },
            { id: "m5", fromMe: true, text: "No lo sueltes cerca de la cocina o vamos a perder media cena.", time: "17:31" },
            { id: "m6", fromMe: false, text: "Shaggydog casi se come mi guante otra vez.", time: "17:33" },
        ],
    },
};

export default contactData;