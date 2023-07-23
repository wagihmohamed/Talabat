import { Routes, Route } from "react-router-dom";
import { HomeScreen, LoginScreen } from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
