import React from 'react'
import { Route, Routes } from 'react-router'

function App() {


  return (
    <div>
      <nav>      <h1>clon.wpp</h1>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/chats" element={<h2>Chats</h2>} />
      </Routes>
      <Route path="/login" element={<h2>Login</h2>} />
    </div>
  )
}

export default App