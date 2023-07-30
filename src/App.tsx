import { Routes, Route } from "react-router-dom";
import {
  AdminsScreen,
  CategoriesScreen,
  HomeScreen,
  LoginScreen,
} from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/categories" element={<CategoriesScreen />} />
      <Route path="/admins" element={<AdminsScreen />} />
    </Routes>
  );
}

export default App;
