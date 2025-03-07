import React from "react";
import SectionHeader from "./section-header";
import {SauceOption} from "../types/SauceOption";

interface SauceOptionsSectionProps {
  isOpen: boolean;
  toggleOpen: () => void;
  pizzaSauceAmount: string;
  setPizzaSauceAmount: (amount: string) => void;
  additionalSauces: SauceOption[];
  toggleSauce: (index: number) => void;
}

const SauceOptionsSection: React.FC<SauceOptionsSectionProps> = ({
  isOpen,
  toggleOpen,
  pizzaSauceAmount,
  setPizzaSauceAmount,
  additionalSauces,
  toggleSauce,
}) => {
  return (
    <div className="border-b">
      <SectionHeader title="2. SAUCE" isOpen={isOpen} toggleOpen={toggleOpen} />

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-lvh opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-lg text-gray-600">Pizza Sauce</span>
          <span className="text-domBlue">Tap To Remove</span>
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-3">
            <button
              className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center"
              onClick={() => setPizzaSauceAmount("Light")}
            >
              <span className="text-xl text-gray-500">−</span>
            </button>
            <span className="text-lg text-gray-700">{pizzaSauceAmount}</span>
            <button
              className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center"
              onClick={() => setPizzaSauceAmount("Extra")}
            >
              <span className="text-xl text-gray-500">+</span>
            </button>
          </div>
        </div>

        {additionalSauces.map((sauce, index) => (
          <div key={sauce.name} className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <span className="text-lg text-gray-600">{sauce.name}*</span>
              {sauce.isNew && <span className="ml-2 text-red-600 font-bold">NEW</span>}
            </div>
            <button className="text-domBlue" onClick={() => toggleSauce(index)}>
              {sauce.selected ? "Added" : "Tap To Add"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SauceOptionsSection;
