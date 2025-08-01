import { useState } from "react";

interface VariantSelectorProps {
  options: string[];
  selected?: number;
  onSelect: (index: number) => void;
}
export function VariantSelector({
  options,
  selected,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Select Orientation</h3>
      <div className="flex gap-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`border rounded px-4 py-2 text-sm ${
              (selected ?? -1) === idx
                ? "border-airbanBlue bg-airbanBlue/10 text-airbanBlue"
                : "border-gray-300 text-gray-700 hover:border-blue-400"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
