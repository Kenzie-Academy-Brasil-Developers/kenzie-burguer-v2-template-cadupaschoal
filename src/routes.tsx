import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import { CartProvider } from "./contexts/CartContext";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/shop"
        element={
          <CartProvider>
            <ShopPage />
          </CartProvider>
        }
      />
    </Routes>
  );
};

export default Router;
