import React, {useState} from "react";
import Header from "./header";
import PizzaTitle from "./pizza-title";
import ServingOptionsSection from "./serving-options-section";
import SauceOptionsSection from "./sauce-options-selection";
import {SauceOption} from "../types/SauceOption";
import CheeseOptionsSection from "./cheese-options-selection";

const PizzaCustomizer: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCrust, setSelectedCrust] = useState<string>("Original Hand Tossed");
  const [selectedSize, setSelectedSize] = useState<string>('Large (14")');

  const [servingOptionsOpen, setServingOptionsOpen] = useState<boolean>(true);
  const [sauceOptionsOpen, setSauceOptionsOpen] = useState<boolean>(true);
  const [cheeseOptionsOpen, setCheeseOptionsOpen] = useState<boolean>(true);

  const [pizzaSauceAmount, setPizzaSauceAmount] = useState<string>("Normal");

  const [additionalSauces, setAdditionalSauces] = useState<SauceOption[]>([
    {name: "BBQ Sauce", selected: false},
    {name: "Alfredo Sauce", selected: false},
    {name: "Hearty Marinara Sauce", selected: false},
    {name: "Ranch Dressing", selected: false},
    {name: "Garlic Parmesan Sauce", selected: false},
    {name: "Butter Chicken Sauce", selected: false, isNew: true},
  ]);

  const toggleSection = (section: "serving" | "sauce" | "cheese") => {
    if (section === "serving") {
      setServingOptionsOpen(!servingOptionsOpen);
    }
    if (section === "sauce") {
      setSauceOptionsOpen(!sauceOptionsOpen);
    }
    if (section === "cheese") {
      setCheeseOptionsOpen(!cheeseOptionsOpen);
    }
  };

  const toggleSauce = (index: number) => {
    const newSauces = [...additionalSauces];
    newSauces[index].selected = !newSauces[index].selected;
    setAdditionalSauces(newSauces);
  };

  return (
    <div className="max-w-lg  bg-gray-100 font-sans text-gray-800">
      <Header />
      <PizzaTitle title='14" Hand Tossed' description="Pizza Sauce, Cheese" />

      <ServingOptionsSection
        isOpen={servingOptionsOpen}
        toggleOpen={() => toggleSection("serving")}
        selectedCrust={selectedCrust}
        selectedSize={selectedSize}
        quantity={quantity}
        incrementQuantity={() => setQuantity(quantity + 1)}
        decrementQuantity={() => quantity > 1 && setQuantity(quantity - 1)}
      />

      <SauceOptionsSection
        isOpen={sauceOptionsOpen}
        toggleOpen={() => toggleSection("sauce")}
        pizzaSauceAmount={pizzaSauceAmount}
        setPizzaSauceAmount={setPizzaSauceAmount}
        additionalSauces={additionalSauces}
        toggleSauce={toggleSauce}
      />

      <CheeseOptionsSection
        isOpen={cheeseOptionsOpen}
        toggleOpen={() => toggleSection("cheese")}
        pizzaSauceAmount={pizzaSauceAmount}
        setPizzaSauceAmount={setPizzaSauceAmount}
      />
    </div>
  );
};

export default PizzaCustomizer;
