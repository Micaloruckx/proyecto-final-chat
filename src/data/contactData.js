const contacts = [
    {
        id: 1,
        name: 'Jon Snow',
        last_time_connection: 'Hace 5 minutos',
        profile_picture: 'https://static.wikia.nocookie.net/gameofthrones/images/0/0c/Jon_Snow_Season_8.png',
        messages: [
            {
                id: 1,
                text: 'The Long Night is over. ¿Todo en Invernalia?',
                send_by_me: false,
                created_at: '2024-10-01T08:15:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'Voy camino, llego en un rato.',
                send_by_me: true,
                created_at: '2024-10-01T08:17:00Z',
                is_read: true
            }
        ]
    },
    {
        id: 2,
        name: 'Daenerys Targaryen',
        last_time_connection: 'Hace 1 hora',
        profile_picture: 'https://static.wikia.nocookie.net/gameofthrones/images/7/73/Daenerys_Targaryen_-_Season_7.png',
        messages: [
            {
                id: 1,
                text: 'Los dragones están inquietos.',
                send_by_me: false,
                created_at: '2024-09-30T21:00:00Z',
                is_read: false
            },
            {
                id: 2,
                text: 'Mantendré la calma. ¿Necesitas refuerzos?',
                send_by_me: true,
                created_at: '2024-09-30T21:05:00Z',
                is_read: false
            }
        ]
    },
    {
        id: 3,
        name: 'Tyrion Lannister',
        last_time_connection: 'Hace 4 horas',
        profile_picture: 'https://static.wikia.nocookie.net/gameofthrones/images/1/1b/Tyrion_Lannister_-_Season_7.png',
        messages: [
            {
                id: 1,
                text: 'Siempre he preferido una buena copa y una conversación larga.',
                send_by_me: false,
                created_at: '2024-09-29T18:30:00Z',
                is_read: true
            },
            {
                id: 2,
                text: 'Te preparo algo de vino para cuando vuelvas.',
                send_by_me: true,
                created_at: '2024-09-29T18:35:00Z',
                is_read: true
            }
        ]
    },
    {
        id: 4,
        name: 'Arya Stark',
        last_time_connection: 'Hace 2 días',
        profile_picture: 'https://static.wikia.nocookie.net/gameofthrones/images/9/9b/Arya_Stark_Season_8.png',
        messages: [
            {
                id: 1,
                text: 'He terminado mi lista.',
                send_by_me: false,
                created_at: '2024-09-27T07:45:00Z',
                is_read: true
            },
            {
                id: 2,
                text: '¿Otra misión?',
                send_by_me: true,
                created_at: '2024-09-27T07:50:00Z',
                is_read: true
            }
        ]
    }
]

export default contacts