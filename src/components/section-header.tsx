import React from "react";

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({title, isOpen, toggleOpen}) => {
  return (
    <button className="bg-domBlue text-white p-4 w-full flex justify-between items-center" onClick={toggleOpen}>
      <h2 className="text-xl font-bold">{title}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default SectionHeader;
