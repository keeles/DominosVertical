import React from "react";
import SectionHeader from "./section-header";

interface CheeseOptionsSectionProps {
  isOpen: boolean;
  toggleOpen: () => void;
  pizzaSauceAmount: string;
  setPizzaSauceAmount: (amount: string) => void;
}

const CheeseOptionsSection: React.FC<CheeseOptionsSectionProps> = ({
  isOpen,
  toggleOpen,
  pizzaSauceAmount,
  setPizzaSauceAmount,
}) => {
  return (
    <div className="border-b">
      <SectionHeader title="3. CHEESE" isOpen={isOpen} toggleOpen={toggleOpen} />
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-lg text-gray-600">Cheese</span>
          <span className="text-domBlue">
            {" "}
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
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheeseOptionsSection;
