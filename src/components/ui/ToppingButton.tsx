interface ToppingButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const ToppingButton: React.FC<ToppingButtonProps> = ({label, isSelected, onClick}) => {
  return (
    <button
      className={`py-3 rounded-lg ${isSelected ? "bg-domBlue text-white" : "bg-gray-100 text-gray-700"} font-medium`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ToppingButton;
