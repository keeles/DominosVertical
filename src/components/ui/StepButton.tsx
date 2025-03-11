interface StepButtonProps {
  number: number;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const StepButton: React.FC<StepButtonProps> = ({number, title, isActive, onClick}) => {
  return (
    <button className="flex flex-col items-center space-y-1 focus:outline-none" onClick={onClick}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isActive ? "bg-domBlue text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        {number}
      </div>
      <span className={`text-xs font-medium ${isActive ? "text-domBlue" : "text-gray-500"}`}>{title}</span>
    </button>
  );
};

export default StepButton;
