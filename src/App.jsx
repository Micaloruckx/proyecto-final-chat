import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from '../Screens/LoginScreen/LoginScreen'
import ContactScreen from '../Screens/ContactScreen/ContactScreen'
import ChatScreen from '../Screens/ChatScreen/ChatScreen'


function App() {


  return (
    <div>
      <nav>      <h1>clon.wpp</h1>
      </nav>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/chats" element={<ChatScreen/>} />
      </Routes>
      <Route path="/login" element={<ContactScreen/>} /> <Route path="/contact" element={<h2>contact</h2>} />
    </div>
  )
}

export default App