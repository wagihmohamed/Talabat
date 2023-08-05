import { Routes, Route } from "react-router-dom";
import {
  AdminsScreen,
  CategoriesScreen,
  DeliveriesScreen,
  EditProductScreen,
  HomeScreen,
  LoginScreen,
  ProductsScreen,
} from "./screens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/categories" element={<CategoriesScreen />} />
      <Route path="/admins" element={<AdminsScreen />} />
      <Route path="/deliveries" element={<DeliveriesScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/products/:productId/edit" element={<EditProductScreen />} />
    </Routes>
  );
}

export default App;
