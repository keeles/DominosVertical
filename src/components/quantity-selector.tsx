import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({quantity, onIncrement, onDecrement}) => {
  return (
    <div className="flex h-12">
      <button
        className="w-12 bg-gray-200 flex items-center justify-center border border-gray-300"
        onClick={onDecrement}
      >
        <span className="text-2xl text-gray-500">−</span>
      </button>
      <div className="w-16 flex items-center justify-center border-t border-b border-gray-300">
        <span className="text-xl">{quantity}</span>
      </div>
      <button
        className="w-12 bg-gray-200 flex items-center justify-center border border-gray-300"
        onClick={onIncrement}
      >
        <span className="text-2xl text-gray-500">+</span>
      </button>
    </div>
  );
};

export default QuantitySelector;
