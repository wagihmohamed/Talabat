import { Routes, Route } from "react-router-dom";
import {
  AdminsScreen,
  CategoriesScreen,
  CreateProductScreen,
  DeliveriesScreen,
  DeliveryAreasScreen,
  EditProductScreen,
  HomeScreen,
  LoginScreen,
  NotificationsScreen,
  OrderItemDetailsScreen,
  OrdersScreen,
  ProductsScreen,
  RecievedNotifications,
  RestaurantCommonGroups,
  SliderScreen,
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
      <Route path="/products/create" element={<CreateProductScreen />} />
      <Route path="/delivery-areas" element={<DeliveryAreasScreen />} />
      <Route path="/slider" element={<SliderScreen />} />
      <Route path="/orders" element={<OrdersScreen />} />
      <Route path="/orders/:orderId" element={<OrderItemDetailsScreen />} />
      <Route path="/restaurants/:restaurantId" element={<RestaurantCommonGroups />} />
      <Route path="/send-notifications" element={<NotificationsScreen />} />
      <Route path="/notifications" element={<RecievedNotifications />} />
      Rec
    </Routes>
  );
}

export default App;
