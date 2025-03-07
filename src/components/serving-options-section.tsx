import React from "react";
import SectionHeader from "./section-header";
import SelectionRow from "./selection-row";
import QuantitySelector from "./quantity-selector";

interface ServingOptionsSectionProps {
  isOpen: boolean;
  toggleOpen: () => void;
  selectedCrust: string;
  selectedSize: string;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const ServingOptionsSection: React.FC<ServingOptionsSectionProps> = ({
  isOpen,
  toggleOpen,
  selectedCrust,
  selectedSize,
  quantity,
  incrementQuantity,
  decrementQuantity,
}) => {
  return (
    <div className="border-b transform origin-top transition-all duration-300 ease-in-out">
      <SectionHeader title="1. SERVING OPTIONS" isOpen={isOpen} toggleOpen={toggleOpen} />
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <SelectionRow label="Select Crust" value={selectedCrust} onClick={() => {}} />

        <SelectionRow label="Select Size" value={selectedSize} onClick={() => {}} />

        <div className="flex justify-between items-center p-4">
          <span className="text-lg text-gray-600">Select Quantity</span>
          <QuantitySelector quantity={quantity} onIncrement={incrementQuantity} onDecrement={decrementQuantity} />
        </div>
      </div>
    </div>
  );
};

export default ServingOptionsSection;
