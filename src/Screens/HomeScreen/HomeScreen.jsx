import React from 'react'
import { Link } from 'react-router';

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