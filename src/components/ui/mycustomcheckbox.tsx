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
          checked ? "bg-primary border-ring" : "bg-transparent border-border"
        }`}
        onClick={() => onCheckedChange(!checked)}
      >
        {checked && <CheckIcon className="text-card h-3 w-3" />}{" "}
        {/* Show check icon when checked */}
      </div>

      {/* Checkbox label */}
      <label
        className="text-sm font-medium text-muted-foreground cursor-pointer"
        onClick={() => onCheckedChange(!checked)}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
