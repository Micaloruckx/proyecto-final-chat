import { Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ChatScreen from "./screens/ChatScreen/ChatScreen";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<ChatScreen />} />
      </Routes>
  );
}

export default App;