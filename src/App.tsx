import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
