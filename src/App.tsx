import { Routes, Route } from "react-router-dom";
import { CategoriesScreen, HomeScreen, LoginScreen } from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/categories" element={<CategoriesScreen />} />
    </Routes>
  );
}

export default App;
