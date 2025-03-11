import React, {useState} from "react";
import {Minus, Plus, ShoppingCart} from "lucide-react";
import {SauceOption} from "../types/SauceOption";
import {useNavigate} from "react-router-dom";
import StepButton from "./ui/StepButton";
import AmountButton from "./ui/AmountButton";
import SizeButton from "./ui/SizeButton";
import {ToppingOption} from "../types/ToppingOption";
import ToppingButton from "./ui/ToppingButton";

interface PizzaCustomizerProps {
  onAddToCart: (pizza: {
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
  }) => void;
}

const PizzaCustomizer: React.FC<PizzaCustomizerProps> = ({onAddToCart}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCrust, setSelectedCrust] = useState<string>("Original Hand Tossed");
  const [selectedSize, setSelectedSize] = useState<string>('Large (14")');
  const [pizzaSauceAmount, setPizzaSauceAmount] = useState<string>("Normal");
  const [cheeseAmount, setCheeseAmount] = useState<string>("Normal");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentToppingStep, setCurrentToppingStep] = useState<number>(1);
  const [pizzaPrice, setPizzaPrice] = useState<number>(14.99);
  const [additionalSauces, setAdditionalSauces] = useState<SauceOption[]>([
    {name: "BBQ Sauce", selected: false},
    {name: "Alfredo Sauce", selected: false},
    {name: "Hearty Marinara Sauce", selected: false},
    {name: "Ranch Dressing", selected: false},
    {name: "Garlic Parmesan Sauce", selected: false},
    {name: "Butter Chicken Sauce", selected: false, isNew: true},
  ]);
  const [meatToppings, setMeatToppings] = useState<ToppingOption[]>([
    {name: "Pepperoni", selected: false},
    {name: "Sausage", selected: false},
    {name: "Chicken", selected: false},
    {name: "Ground Beef", selected: false},
    {name: "Ham", selected: false},
    {name: "Bacon", selected: false, isNew: true},
  ]);
  const [veggieToppings, setVeggieToppings] = useState<ToppingOption[]>([
    {name: "Mushroom", selected: false},
    {name: "Pineapple", selected: false},
    {name: "Onion", selected: false},
    {name: "Tomatoes", selected: false},
    {name: "Jalapeno Peppers", selected: false},
    {name: "Roasted Red Peppers", selected: false},
    {name: "Green Pepper", selected: false},
    {name: "Black Olives", selected: false},
    {name: "Green Olives", selected: false},
  ]);

  const navigate = useNavigate();

  const toggleSauce = (index: number) => {
    const newSauces = [...additionalSauces];
    newSauces[index].selected = !newSauces[index].selected;
    setAdditionalSauces(newSauces);
  };

  const toggleMeatTopping = (index: number) => {
    const newMeatToppings = [...meatToppings];
    newMeatToppings[index].selected = !newMeatToppings[index].selected;
    setMeatToppings(newMeatToppings);
  };

  const toggleVeggieTopping = (index: number) => {
    const newVeggieToppings = [...veggieToppings];
    newVeggieToppings[index].selected = !newVeggieToppings[index].selected;
    setVeggieToppings(newVeggieToppings);
  };

  const calculateTotal = () => {
    const additionalSaucePrice = additionalSauces.filter((sauce) => sauce.selected).length * 0.99;
    return (pizzaPrice + additionalSaucePrice) * quantity;
  };

  const displayToppings = () => {
    const selectedMeats = meatToppings.filter((meat) => meat.selected).map((meat) => meat.name);
    const selectedVeggies = veggieToppings.filter((veggie) => veggie.selected).map((veggie) => veggie.name);
    const currentlySelectedToppings = [...selectedMeats, ...selectedVeggies];
    return currentlySelectedToppings.join(", ");
  };

  const handleAddToCart = () => {
    const selectedSauces = additionalSauces.filter((sauce) => sauce.selected).map((sauce) => sauce.name);
    const selectedMeats = meatToppings.filter((meat) => meat.selected).map((meat) => meat.name);
    const selectedVeggies = veggieToppings.filter((veggie) => veggie.selected).map((veggie) => veggie.name);
    const currentlySelectedToppings = [...selectedMeats, ...selectedVeggies];

    onAddToCart({
      id: Date.now().toString(),
      name: "Custom Pizza",
      size: selectedSize,
      crust: selectedCrust,
      toppings: currentlySelectedToppings,
      sauceAmount: pizzaSauceAmount,
      additionalSauces: selectedSauces,
      cheeseAmount: cheeseAmount,
      quantity: quantity,
      price: calculateTotal(),
    });

    navigate("/cart");
  };

  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden">
      <div className="relative h-64 bg-domBlue overflow-hidden">
        <div className="absolute inset-0 flex items-top justify-center pt-2">
          <div className="bg-white w-36 h-36 rounded-full flex items-center justify-center shadow-lg">
            <div className="relative w-28 h-28">
              <img src="/dpc-logo-ca.svg" alt="dominos Canada Logo" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-4">
          <h1 className="text-xl font-bold">
            {selectedSize} {selectedCrust}
          </h1>
          <p className="text-sm opacity-90">{`Pizza Sauce (${pizzaSauceAmount}), Cheese (${cheeseAmount})`}</p>
          <p className="text-sm opacity-90">
            {additionalSauces.filter((sauce) => sauce.selected).length > 0
              ? `${additionalSauces
                  .filter((sauce) => sauce.selected)
                  .map((sauce) => sauce.name)
                  .join(", ")}`
              : ``}
          </p>
          <p className="text-sm opacity-90">
            {meatToppings.filter((meat) => meat.selected).length > 0 ||
            veggieToppings.filter((veggie) => veggie.selected).length > 0
              ? `${displayToppings()}`
              : ``}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-evenly mb-6">
          <StepButton number={1} title="Basics" isActive={currentStep === 1} onClick={() => setCurrentStep(1)} />
          <StepButton number={2} title="Sauces" isActive={currentStep === 2} onClick={() => setCurrentStep(2)} />
          <StepButton number={3} title="Cheese" isActive={currentStep === 3} onClick={() => setCurrentStep(3)} />
          <StepButton number={4} title="Toppings" isActive={currentStep === 4} onClick={() => setCurrentStep(4)} />
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-domBlue">Serving Options</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Crust Type</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-domBlue focus:border-transparent"
                value={selectedCrust}
                onChange={(e) => setSelectedCrust(e.target.value)}
              >
                <option>Original Hand Tossed</option>
                <option>Thin & Crispy</option>
                <option>Thick Crust</option>
                <option>Gluten Free</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Size</label>
              <div className="grid grid-cols-3 gap-2">
                <SizeButton
                  size='Small (10")'
                  isSelected={selectedSize === 'Small (10")'}
                  onClick={() => {
                    setSelectedSize('Small (10")');
                    setPizzaPrice(10.99);
                  }}
                />
                <SizeButton
                  size='Medium (12")'
                  isSelected={selectedSize === 'Medium (12")'}
                  onClick={() => {
                    setSelectedSize('Medium (12")');
                    setPizzaPrice(12.99);
                  }}
                />
                <SizeButton
                  size='Large (14")'
                  isSelected={selectedSize === 'Large (14")'}
                  onClick={() => {
                    setSelectedSize('Large (14")');
                    setPizzaPrice(14.99);
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-domBlue"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={20} className={quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                </button>
                <span className="mx-6 text-xl font-semibold">{quantity}</span>
                <button
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-domBlue"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="py-2">
              <button
                className="w-full py-3 bg-domBlue text-white rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center"
                onClick={() => setCurrentStep(2)}
              >
                Sauces
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-domBlue">Sauce Options</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Pizza Sauce Amount</label>
              <div className="grid grid-cols-3 gap-2">
                <AmountButton
                  label="Light"
                  isSelected={pizzaSauceAmount === "Light"}
                  onClick={() => setPizzaSauceAmount("Light")}
                />
                <AmountButton
                  label="Normal"
                  isSelected={pizzaSauceAmount === "Normal"}
                  onClick={() => setPizzaSauceAmount("Normal")}
                />
                <AmountButton
                  label="Extra"
                  isSelected={pizzaSauceAmount === "Extra"}
                  onClick={() => setPizzaSauceAmount("Extra")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Additional Sauces</label>
              <div className="space-y-2">
                {additionalSauces.map((sauce, index) => (
                  <div
                    key={sauce.name}
                    className={`p-3 rounded-lg border ${
                      sauce.selected ? "border-domBlue bg-blue-50" : "border-gray-300"
                    } flex justify-between items-center`}
                    onClick={() => toggleSauce(index)}
                  >
                    <div className="flex items-center">
                      <span className={`text-sm ${sauce.selected ? "font-medium text-domBlue" : "text-gray-700"}`}>
                        {sauce.name}
                      </span>
                      {sauce.isNew && (
                        <span className="ml-2 px-2 py-0.5 bg-domRed text-white text-xs rounded-full">NEW</span>
                      )}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        sauce.selected ? "border-domBlue bg-domBlue" : "border-gray-400"
                      } flex items-center justify-center`}
                    >
                      {sauce.selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 py-2">
              <button
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
              <button
                className="flex-1 py-3 bg-domBlue text-white rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center"
                onClick={() => setCurrentStep(3)}
              >
                Cheese
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-domBlue">Cheese Options</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Cheese Amount</label>
              <div className="grid grid-cols-3 gap-2">
                <AmountButton
                  label="Light"
                  isSelected={cheeseAmount === "Light"}
                  onClick={() => setCheeseAmount("Light")}
                />
                <AmountButton
                  label="Normal"
                  isSelected={cheeseAmount === "Normal"}
                  onClick={() => setCheeseAmount("Normal")}
                />
                <AmountButton
                  label="Extra"
                  isSelected={cheeseAmount === "Extra"}
                  onClick={() => setCheeseAmount("Extra")}
                />
              </div>
            </div>

            <div className="flex space-x-2 py-2">
              <button
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </button>
              <button
                className="flex-1 py-3 bg-domBlue text-white rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center"
                onClick={() => setCurrentStep(4)}
              >
                Toppings
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-domBlue">Select Toppings</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                <ToppingButton
                  label="Meat"
                  isSelected={currentToppingStep === 1}
                  onClick={() => setCurrentToppingStep(1)}
                />
                <ToppingButton
                  label="Veggies"
                  isSelected={currentToppingStep === 2}
                  onClick={() => setCurrentToppingStep(2)}
                />
              </div>
            </div>

            {currentToppingStep === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Toppings</label>
                <div className="space-y-2">
                  {meatToppings.map((topping, index) => (
                    <div
                      key={topping.name}
                      className={`p-3 rounded-lg border ${
                        topping.selected ? "border-domBlue bg-blue-50" : "border-gray-300"
                      } flex justify-between items-center`}
                      onClick={() => toggleMeatTopping(index)}
                    >
                      <div className="flex items-center">
                        <span className={`text-sm ${topping.selected ? "font-medium text-domBlue" : "text-gray-700"}`}>
                          {topping.name}
                        </span>
                        {topping.isNew && (
                          <span className="ml-2 px-2 py-0.5 bg-domRed text-white text-xs rounded-full">NEW</span>
                        )}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border ${
                          topping.selected ? "border-domBlue bg-domBlue" : "border-gray-400"
                        } flex items-center justify-center`}
                      >
                        {topping.selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentToppingStep === 2 && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Toppings</label>
                <div className="space-y-2">
                  {veggieToppings.map((topping, index) => (
                    <div
                      key={topping.name}
                      className={`p-3 rounded-lg border ${
                        topping.selected ? "border-domBlue bg-blue-50" : "border-gray-300"
                      } flex justify-between items-center`}
                      onClick={() => toggleVeggieTopping(index)}
                    >
                      <div className="flex items-center">
                        <span className={`text-sm ${topping.selected ? "font-medium text-domBlue" : "text-gray-700"}`}>
                          {topping.name}
                        </span>
                        {topping.isNew && (
                          <span className="ml-2 px-2 py-0.5 bg-domRed text-white text-xs rounded-full">NEW</span>
                        )}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border ${
                          topping.selected ? "border-domBlue bg-domBlue" : "border-gray-400"
                        } flex items-center justify-center`}
                      >
                        {topping.selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-2 py-2">
              <button
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
                onClick={() => setCurrentStep(3)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white shadow-md border-t p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-xl font-bold">${calculateTotal().toFixed(2)}</p>
        </div>
        <button
          className="bg-domRed text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2" size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PizzaCustomizer;
