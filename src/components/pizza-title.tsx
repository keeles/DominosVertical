import React from "react";

interface PizzaTitleProps {
  title: string;
  description: string;
}

const PizzaTitle: React.FC<PizzaTitleProps> = ({title, description}) => {
  return (
    <div className="p-4 border-b">
      <h1 className="text-3xl text-gray-700 font-semibold">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default PizzaTitle;
