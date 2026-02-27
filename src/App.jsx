import { NavLink, Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import ChatScreen from "./Screens/ChatScreen/ChatScreen";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<ChatScreen />} />
      </Routes>
  );
}

export default App;