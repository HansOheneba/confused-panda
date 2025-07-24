import { useState } from "react";

interface VariantSelectorProps {
  variants: { orientation: string; stock: number }[];
  selected: number;
  onSelect: (index: number) => void;
}

export function VariantSelector({
  variants,
  selected,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Select Orientation</h3>
      <div className="flex gap-4">
        {variants.map((variant, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            className={`border rounded px-4 py-2 text-sm ${
              selected === idx
                ? "border-airbanBlue bg-airbanBlue/10 text-airbanBlue"
                : "border-gray-300 text-gray-700 hover:border-blue-400"
            }`}
          >
            {variant.orientation.charAt(0).toUpperCase() +
              variant.orientation.slice(1)}{" "}
            <span className="text-xs text-gray-500">
              ({variant.stock} left)
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
