import React from "react";
import { CheckIcon } from "@radix-ui/react-icons"; // or any icon you prefer

interface CustomCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onCheckedChange,
  label,
}) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      {/* Checkbox visual */}
      <div
        className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
          checked ? "bg-primary border-primary" : "bg-white border-gray-300"
        }`}
        onClick={() => onCheckedChange(!checked)}
      >
        {checked && <CheckIcon className="text-white h-3 w-3" />}{" "}
        {/* Show check icon when checked */}
      </div>

      {/* Checkbox label */}
      <label
        className="text-sm font-medium text-gray-700"
        onClick={() => onCheckedChange(!checked)}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
