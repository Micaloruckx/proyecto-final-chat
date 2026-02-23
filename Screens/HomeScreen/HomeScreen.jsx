import React from 'react'
import { Link } from 'react-router';

export const contact = [
    {
      id: 1,
      name: 'Chat 1',
      lastMessage: 'Hello, how are you?',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      name: 'Chat 2',
      lastMessage: 'Are you coming to the party?',
      timestamp: '9:15 AM',
    },
    {
      id: 3,
      name: 'Chat 3',
      lastMessage: 'What is your favorite movie?',
      timestamp: '8:45 AM',
    },
  ];

export default function HomeScreen() {
  return (
    <div>
      <h1>ChatScreen</h1>{
        contact.map(contact => (
          <div key={contact.id}>
            <h2>Hola, {contact.name}</h2>
            <p>{contact.lastMessage}</p>
            <p>{contact.timestamp}</p>
            <Link to={`/contact/${contact.id}`}>Picture</Link>

          </div>
        ))
      }
    </div>
  )
} 