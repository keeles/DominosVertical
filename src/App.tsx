import {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import PizzaCustomizer from "./components/PizzaCustomizer";
import CartPage from "./components/CartPage";

interface CartItem {
  id: string;
  name: string;
  size: string;
  crust: string;
  toppings: string[];
  sauceAmount: string;
  additionalSauces: string[];
  cheeseAmount: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (pizza: CartItem) => {
    setCartItems([...cartItems, pizza]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-md bg-gray-100 mx-auto">
              <PizzaCustomizer onAddToCart={handleAddToCart} />
            </div>
          }
        />
        <Route path="/cart" element={<CartPage initialCartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
