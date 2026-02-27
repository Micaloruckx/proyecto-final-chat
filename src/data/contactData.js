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
    ],

    chats: [
        { id: "chat-jon", userId: "jon", lastMessage: "¿Todo en Invernalia?", lastTime: "08:15", unread: 0 },
        { id: "chat-arya", userId: "arya", lastMessage: "He terminado mi lista.", lastTime: "07:45", unread: 0 },
        { id: "chat-sansa", userId: "sansa", lastMessage: "Necesitamos aliados.", lastTime: "Ayer", unread: 1 },
        { id: "chat-bran", userId: "bran", lastMessage: "Vi algo...", lastTime: "21:02", unread: 0 },
        { id: "chat-tony", userId: "tony", lastMessage: "¿Quién es el de la capa negra?", lastTime: "Ahora", unread: 2 },
    ],

    messages: {
        "chat-jon": [
            { id: "m1", fromMe: false, text: "The Long Night is over. ¿Todo en Invernalia?", time: "08:15" },
            { id: "m2", fromMe: true, text: "Voy camino, llego en un rato.", time: "08:17" },
        ],
        "chat-arya": [
            { id: "m1", fromMe: false, text: "He terminado mi lista.", time: "07:45" },
            { id: "m2", fromMe: true, text: "¿Otra misión?", time: "07:50" },
        ],
        "chat-sansa": [
            { id: "m1", fromMe: false, text: "Necesitamos aliados.", time: "18:40" },
            { id: "m2", fromMe: true, text: "Decime a quién.", time: "18:41" },
        ],
        "chat-bran": [
            { id: "m1", fromMe: false, text: "Vi algo...", time: "21:02" },
            { id: "m2", fromMe: true, text: "¿Qué viste?", time: "21:03" },
        ],

        "chat-tony": [
            { id: "m1", fromMe: false, text: "Ok, me perdí. ¿Esto es un grupo de lobos?", time: "Ahora" },
            { id: "m2", fromMe: true, text: "Bienvenido a WhatStark.", time: "Ahora" },
            { id: "m3", fromMe: false, text: "¿Quién es el de la capa negra? Tiene vibes de “yo hago mis propias reglas”.", time: "Ahora" },
            { id: "m4", fromMe: true, text: "Jon. Y sí.", time: "Ahora" },
        ],
    },
};

export default contactData;