import React from 'react'
import { useParams } from 'react-router'
import { contact } from '../HomeScreen/HomeScreen'

export default function ContactScreen() {
  const { id } = useParams();
  const contact = contacts.find(contact => contact.id === parseInt(id));

  if (!contact) {
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
