import React from 'react'
import { NavLink, Route, Routes } from 'react-router'
import LoginScreen from '../Screens/LoginScreen/LoginScreen'
import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import ContactScreen from '../Screens/ChatScreen/ChatScreen'
import './global.css'

function App() {


  return (
    <div>
      <nav>
        <h1>Clon.wpp</h1>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/home'>Inicio</NavLink>
      </nav>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>

    </div>
  )
}

export default App