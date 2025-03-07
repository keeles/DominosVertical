import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-domBlue text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-2xl">Menu</span>
      </div>
      <button className="bg-domRed text-white px-4 py-2 rounded-md font-bold">ADD TO ORDER</button>
    </div>
  );
};

export default Header;
