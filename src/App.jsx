import { NavLink, Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import ChatScreen from "./Screens/ChatScreen/ChatScreen";

function App() {
  return (
    <div>
      <nav>
        <h1>clon.wpp</h1>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/">Chat</NavLink>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<ChatScreen />} />
      </Routes>
    </div>
  );
}

export default App;