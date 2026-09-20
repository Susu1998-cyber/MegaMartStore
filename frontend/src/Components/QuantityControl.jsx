import { Minus, Plus } from "lucide-react";

const QuantityControl = ({
  quantity,
  onDecrease,
  onIncrease,
  disabled = false,
}) => {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border">
      <button
        disabled={disabled || quantity <= 1}
        onClick={onDecrease}
        className="p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={16} />
      </button>

      <span className="min-w-10 text-center text-sm font-semibold">
        {quantity}
      </span>

      <button
        disabled={disabled}
        onClick={onIncrease}
        className="p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantityControl;