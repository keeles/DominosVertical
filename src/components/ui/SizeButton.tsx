interface SizeButtonProps {
  size: string;
  isSelected: boolean;
  onClick: () => void;
}

const SizeButton: React.FC<SizeButtonProps> = ({size, isSelected, onClick}) => {
  return (
    <button
      className={`py-3 rounded-lg ${isSelected ? "bg-domBlue text-white" : "bg-gray-100 text-gray-700"} font-medium`}
      onClick={onClick}
    >
      {size}
    </button>
  );
};

export default SizeButton;
