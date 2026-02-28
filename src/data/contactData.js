const contactData = {
    users: [
        { id: "jon", name: "Jon Snow", avatar: "/Avatars/Jon.PNG", status: "I know nothing.", lastSeen: "Hace 5 minutos" },
        { id: "arya", name: "Arya Stark", avatar: "/Avatars/Arya.PNG", status: "A girl has no name.", lastSeen: "Hace 2 días" },
        { id: "sansa", name: "Sansa Stark", avatar: "/Avatars/Sansa.PNG", status: "The North remembers.", lastSeen: "Ayer" },
        { id: "bran", name: "Bran Stark", avatar: "/Avatars/Bran.PNG", status: "I remember everything.", lastSeen: "Hace 4 horas" },
        { id: "robb", name: "Robb Stark", avatar: "/Avatars/Robb.PNG", status: "King in the North.", lastSeen: "Hoy" },
        { id: "eddard", name: "Eddard Stark", avatar: "/Avatars/Eddard.PNG", status: "Winter is coming.", lastSeen: "Hoy" },
        { id: "catelyn", name: "Catelyn Stark", avatar: "/Avatars/Catelyn.PNG", status: "Family first.", lastSeen: "Online" },
        { id: "rickon", name: "Rickon Stark", avatar: "/Avatars/Rickon.PNG", status: "⚡", lastSeen: "Unknown" },
        { id: "tony", name: "Tony Stark", avatar: "/Avatars/Tony.png", status: "Genius, billionaire, playboy, philanthropist.", lastSeen: "Online" },
        { id: "targaryen-group", name: "Consejo Targaryen 🔥", avatar: "/Logos/Logo-WhatStark-png.png", status: "Grupo · 7 participantes", lastSeen: "Online" },
    ],

    chats: [
        { id: "chat-targaryen", userId: "targaryen-group", lastMessage: "[Vos] Entendido. Sigo en las sombras.", lastTime: "Ahora", unread: 3 },
        { id: "chat-tony", userId: "tony", lastMessage: "Aprobada, 10/10 actitud.", lastTime: "Ahora", unread: 2 },
        { id: "chat-eddard", userId: "eddard", lastMessage: "El Norte recuerda, pero también aprende.", lastTime: "22:07", unread: 0 },
        { id: "chat-bran", userId: "bran", lastMessage: "Hablamos cuando llegue Jon.", lastTime: "21:09", unread: 0 },
        { id: "chat-catelyn", userId: "catelyn", lastMessage: "Qué linda foto. Abrigate bien.", lastTime: "20:20", unread: 0 },
        { id: "chat-robb", userId: "robb", lastMessage: "Perfecto. Esa actitud me gusta.", lastTime: "19:16", unread: 0 },
        { id: "chat-sansa", userId: "sansa", lastMessage: "Perfecto. Los cito al amanecer.", lastTime: "18:47", unread: 1 },
        { id: "chat-rickon", userId: "rickon", lastMessage: "jajaja quedó épica", lastTime: "17:29", unread: 0 },
        { id: "chat-jon", userId: "jon", lastMessage: "Traé leña para el salón.", lastTime: "08:23", unread: 0 },
        { id: "chat-arya", userId: "arya", lastMessage: "Entonces voy con vos.", lastTime: "07:56", unread: 0 },
    ],

    messages: {
        "chat-targaryen": [
            { id: "m1", fromMe: false, text: "[Daenerys] El Consejo se reúne al anochecer. Nadie debe saberlo.", time: "Ahora" },
            { id: "m2", fromMe: false, text: "[Tyrion] Revisen rutas de ingreso y salida. Sin testigos.", time: "Ahora" },
            { id: "m3", fromMe: true, text: "[Vos] Confirmo acceso por patio interno. Sin movimientos sospechosos.", time: "Ahora" },
            { id: "m4", fromMe: false, text: "[Varys] Mantengan perfil bajo. Hay ojos en todas partes.", time: "Ahora" },
            { id: "m5", fromMe: true, text: "[Vos] Entendido. Sigo en las sombras.", time: "Ahora" },
        ],

        "chat-jon": [
            { id: "m1", fromMe: false, text: "La guardia vio movimiento al sur. ¿Seguís en camino?", time: "08:15" },
            { id: "m2", fromMe: true, text: "Sí, entro por la puerta este en 10 minutos.", time: "08:17" },
            { id: "m3", fromMe: false, text: "Perfecto. Sam está revisando provisiones.", time: "08:19" },
            { id: "m4", fromMe: true, text: "Decile que reserve mantas para los nuevos.", time: "08:21" },
            { id: "m5", fromMe: false, text: "Hecho. Traé leña para el salón.", time: "08:23" },
        ],
        "chat-arya": [
            { id: "m1", fromMe: false, text: "Terminé de entrenar antes del amanecer.", time: "07:45" },
            { id: "m2", fromMe: true, text: "¿Y ahora?", time: "07:50" },
            { id: "m3", fromMe: false, text: "Quiero practicar con arco en el patio norte.", time: "07:53" },
            { id: "m4", fromMe: true, text: "Voy cuando termine con Jon.", time: "07:55" },
            { id: "m5", fromMe: false, text: "Entonces voy con vos.", time: "07:56" },
        ],
        "chat-sansa": [
            { id: "m1", fromMe: false, text: "Necesitamos aliados para reforzar el norte.", time: "18:40" },
            { id: "m2", fromMe: true, text: "¿Tenés nombres concretos?", time: "18:41" },
            { id: "m3", fromMe: false, text: "Manderly y Glover. Si llegan juntos, nos conviene.", time: "18:43" },
            { id: "m4", fromMe: true, text: "Les mando cuervos hoy mismo.", time: "18:45" },
            { id: "m5", fromMe: false, text: "Perfecto. Los cito al amanecer.", time: "18:47" },
        ],
        "chat-bran": [
            { id: "m1", fromMe: false, text: "Vi algo en el bosque de los arcianos.", time: "21:02" },
            { id: "m2", fromMe: true, text: "¿Qué viste?", time: "21:03" },
            { id: "m3", fromMe: false, text: "Huellas recientes. No eran de nuestros exploradores.", time: "21:05" },
            { id: "m4", fromMe: true, text: "Aviso a los guardias de la muralla interior.", time: "21:07" },
            { id: "m5", fromMe: false, text: "Bien. Hablamos cuando llegue Jon.", time: "21:09" },
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
            { id: "m9", fromMe: false, text: "", image: "/Avatars/Tony.png", time: "Ahora" },
            { id: "m10", fromMe: true, text: "Aprobada, 10/10 actitud.", time: "Ahora" },
        ],

        "chat-catelyn": [
            { id: "m1", fromMe: false, text: "¿Comieron algo antes de salir al patio?", time: "20:08" },
            { id: "m2", fromMe: true, text: "Sí, sopa caliente y pan. Todo bien.", time: "20:10" },
            { id: "m3", fromMe: false, text: "Bien. El frío está fuerte esta noche.", time: "20:12" },
            { id: "m4", fromMe: true, text: "Nos quedamos dentro después de la ronda.", time: "20:14" },
            { id: "m5", fromMe: false, text: "Perfecto, me quedo más tranquila.", time: "20:16" },
            { id: "m6", fromMe: true, text: "Te mando una selfie rápida antes de entrar.", time: "20:18" },
            { id: "m7", fromMe: true, text: "", image: "/Avatars/Sansa.PNG", time: "20:19" },
            { id: "m8", fromMe: false, text: "Qué linda foto. Abrigate bien.", time: "20:20" },
        ],

        "chat-robb": [
            { id: "m1", fromMe: false, text: "Revisé a los hombres del ala oeste.", time: "19:04" },
            { id: "m2", fromMe: true, text: "¿Cómo los viste?", time: "19:05" },
            { id: "m3", fromMe: false, text: "Cansados, pero firmes. Necesitan rotar guardia.", time: "19:08" },
            { id: "m4", fromMe: true, text: "Armo dos turnos extra para mañana.", time: "19:10" },
            { id: "m5", fromMe: false, text: "Entonces entrenamos al amanecer.", time: "19:12" },
            { id: "m6", fromMe: false, text: "Mirá, los chicos ya están listos.", time: "19:14" },
            { id: "m7", fromMe: false, text: "", image: "/Avatars/Robb.PNG", time: "19:15" },
            { id: "m8", fromMe: true, text: "Perfecto. Esa actitud me gusta.", time: "19:16" },
        ],

        "chat-eddard": [
            { id: "m1", fromMe: false, text: "La calma engaña; igual hay que prepararse.", time: "22:01" },
            { id: "m2", fromMe: true, text: "Estamos reforzando puertas y torres.", time: "22:03" },
            { id: "m3", fromMe: false, text: "Bien. No descuiden a la gente del pueblo.", time: "22:05" },
            { id: "m4", fromMe: true, text: "Ya se distribuyeron mantas y comida.", time: "22:06" },
            { id: "m5", fromMe: false, text: "El Norte recuerda, pero también aprende.", time: "22:07" },
        ],

        "chat-rickon": [
            { id: "m1", fromMe: false, text: "Mirá esta selfie con Shaggydog 😎", time: "17:25" },
            { id: "m2", fromMe: false, text: "", image: "/Avatars/Rickon.PNG", time: "17:26" },
            { id: "m3", fromMe: true, text: "JAJA, te salió tremenda. Él posa mejor que yo.", time: "17:27" },
            { id: "m4", fromMe: false, text: "jajaja quedó épica", time: "17:29" },
        ],
    },
};

export default contactData;