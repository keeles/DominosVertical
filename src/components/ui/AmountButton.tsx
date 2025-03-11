interface AmountButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const AmountButton: React.FC<AmountButtonProps> = ({label, isSelected, onClick}) => {
  return (
    <button
      className={`py-3 rounded-lg ${isSelected ? "bg-domBlue text-white" : "bg-gray-100 text-gray-700"} font-medium`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AmountButton;
