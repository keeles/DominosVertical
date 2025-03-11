import React, {Dispatch, SetStateAction, useState} from "react";
import {ArrowLeft, Minus, Plus, Trash2, CreditCard, Home, Clock} from "lucide-react";
import {useNavigate} from "react-router-dom";

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

interface Promo {
  id: string;
  title: string;
  description: string;
  discount: number;
  isApplied: boolean;
}

interface CartPageProps {
  initialCartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

const CartPage: React.FC<CartPageProps> = ({initialCartItems}) => {
  const navigate = useNavigate();

  const [cartItems, setLocalCartItems] = useState<CartItem[]>(
    initialCartItems
      ? initialCartItems
      : [
          {
            id: "p1",
            name: "Custom Pizza",
            size: 'Large (14")',
            crust: "Original Hand Tossed",
            toppings: [],
            sauceAmount: "Normal",
            additionalSauces: ["BBQ Sauce", "Ranch Dressing"],
            cheeseAmount: "Extra",
            quantity: 1,
            price: 16.97,
          },
        ]
  );

  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);

  const [promos, setPromos] = useState<Promo[]>([
    {
      id: "promo1",
      title: "WEEKDAY50",
      description: "50% off on orders above $30",
      discount: 0,
      isApplied: false,
    },
    {
      id: "promo2",
      title: "FREEBREAD",
      description: "Free breadsticks with any large pizza",
      discount: 0,
      isApplied: false,
    },
  ]);

  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "carryout">("delivery");
  const [promoCode, setPromoCode] = useState<string>("");

  const incrementQuantity = (id: string) => {
    setLocalCartItems(cartItems.map((item) => (item.id === id ? {...item, quantity: item.quantity + 1} : item)));
  };

  const decrementQuantity = (id: string) => {
    setLocalCartItems(
      cartItems.map((item) => (item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item))
    );
  };

  const removeItem = (id: string) => {
    setLocalCartItems(cartItems.filter((item) => item.id !== id));
  };

  const togglePromo = (id: string) => {
    setPromos(promos.map((promo) => (promo.id === id ? {...promo, isApplied: !promo.isApplied} : promo)));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // Assuming 5% tax for BC
  const deliveryFee = deliveryOption === "delivery" ? 3.99 : 0;

  const appliedPromos = promos.filter((promo) => promo.isApplied);
  let discountAmount = 0;

  if (appliedPromos.some((promo) => promo.title === "WEEKDAY50") && subtotal >= 30) {
    discountAmount = subtotal * 0.5;
  }

  const total = subtotal + tax + deliveryFee - discountAmount;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // In a real app, this would process the order and navigate to checkout
    navigate("/checkout");
  };

  React.useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems, setLocalCartItems]);

  if (showCustomizer) {
    navigate("/PizzaCustomizer");
  }

  return (
    <div className="max-w-3xl mx-auto bg-white">
      <div className="bg-domBlue text-white p-4 flex items-center justify-between">
        <div className="flex">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Your Cart ({totalItems})</h1>
        </div>
        <img src="/dpc-logo-ca.svg" alt="dominos Canada Logo" className="h-8 w-auto pr-0" />
      </div>

      <div className="p-4 bg-gray-50 border-b">
        <div className="flex gap-4">
          <button
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center ${
              deliveryOption === "delivery" ? "bg-domBlue text-white" : "bg-white border border-gray-300 text-gray-700"
            }`}
            onClick={() => setDeliveryOption("delivery")}
          >
            <Home size={18} className="mr-2" />
            Delivery
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center ${
              deliveryOption === "carryout" ? "bg-domBlue text-white" : "bg-white border border-gray-300 text-gray-700"
            }`}
            onClick={() => setDeliveryOption("carryout")}
          >
            <Clock size={18} className="mr-2" />
            Carryout
          </button>
        </div>

        {deliveryOption === "delivery" && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">555 Seymour St, Unit 890</p>
                <p className="text-sm text-gray-600">Vancouver, BC V6B 3H6</p>
              </div>
              <button className="text-domBlue font-medium text-sm">Change</button>
            </div>
          </div>
        )}

        {deliveryOption === "carryout" && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">1138 Granville Street</p>
                <p className="text-sm text-gray-600">1.0 km away • 10-15 min</p>
              </div>
              <button className="text-domBlue font-medium text-sm">Change</button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Your Order</h2>
          <button
            className="px-4 py-2 bg-domBlue text-white rounded-lg text-sm font-medium"
            onClick={() => setShowCustomizer(true)}
          >
            Add Pizza
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
            <button
              className="mt-4 px-6 py-2 bg-domBlue text-white rounded-lg font-medium"
              onClick={() => setShowCustomizer(true)}
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex border rounded-lg p-3 relative">
                <div className="w-24 h-24 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                  <img src="pizza-in-cart.jpg" alt="Your custom pizza" className="h-full" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">
                    {item.size}, {item.crust}
                  </p>

                  <p className="text-sm text-gray-600">Cheese: {item.cheeseAmount}</p>

                  {item.additionalSauces.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Sauce: {item.sauceAmount}, {item.additionalSauces.join(", ")}
                    </p>
                  )}

                  {item.toppings.length > 0 && (
                    <p className="text-sm text-gray-600">Toppings: {item.toppings.join(", ")}</p>
                  )}

                  <div className="flex items-center mt-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                    </button>
                    <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>

                    <button className="ml-auto text-gray-400 hover:text-domRed" onClick={() => removeItem(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">Promo Code</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 p-3 border border-gray-300 rounded-lg"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="px-4 py-2 bg-domBlue text-white rounded-lg font-medium">Apply</button>
          </div>

          <div className="mt-4 space-y-2">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className={`p-3 rounded-lg border ${
                  promo.isApplied ? "border-domBlue bg-blue-50" : "border-gray-300"
                } flex justify-between items-center`}
                onClick={() => togglePromo(promo.id)}
              >
                <div>
                  <p className="font-medium">{promo.title}</p>
                  <p className="text-sm text-gray-600">{promo.description}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border ${
                    promo.isApplied ? "border-domBlue bg-domBlue" : "border-gray-400"
                  } flex items-center justify-center`}
                >
                  {promo.isApplied && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <h3 className="font-medium text-gray-800 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {deliveryOption === "delivery" && (
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className={`w-full py-4 rounded-lg flex items-center justify-center font-bold text-white ${
            cartItems.length === 0 ? "bg-gray-400" : "bg-domRed"
          }`}
        >
          <CreditCard size={20} className="mr-2" />
          Proceed to Checkout
        </button>
        {deliveryOption === "delivery" && (
          <p className="text-sm text-gray-500 text-center mt-2">Estimated delivery time: 30-45 minutes</p>
        )}
        {deliveryOption === "carryout" && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Your order will be ready in approximately 15-20 minutes
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
