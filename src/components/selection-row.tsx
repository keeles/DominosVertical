import React from "react";

interface SelectionRowProps {
  label: string;
  value: string;
  onClick: () => void;
}

const SelectionRow: React.FC<SelectionRowProps> = ({label, value, onClick}) => {
  return (
    <div className="flex justify-between items-center p-4" onClick={onClick}>
      <span className="text-lg text-gray-600">{label}</span>
      <div className="flex items-center text-domBlue">
        <span>{value}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default SelectionRow;
