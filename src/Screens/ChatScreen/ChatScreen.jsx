import React from 'react'
import { useParams } from 'react-router'
import { contact } from '../../data/contacts'

export default function ChatScreen() {
  const { id } = useParams();
  const selectedContact = contact.find(contact => contact.id === parseInt(id));

  if (!selectedContact) {
    return <h2>Contacto no encontrado</h2>;
  }
  return (
    <div>
      <h1>Detalle del contacto</h1>
      <h2>{contact.name}</h2>
      <p>Último mensaje: {contact.lastMessage}</p>
      <p>Hora: {contact.timestamp}</p>
    </div>
  );
}
