'use client'
import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface FilterOption {
  label: string;
  checked?: boolean;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  onChange: (label: string) => void;
  selectedValue?: string;
}

const FilterGroup = ({ title, options, onChange, selectedValue }: FilterGroupProps) => (
  <div className="space-y-5">
    <h3 className="text-base font-normal text-[#2A254B] font-clash">{title}</h3>
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.label}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onChange(option.label)}
        >
          <div
            className={`w-4 h-4 border flex items-center justify-center
              ${
                option.label === selectedValue
                  ? "border-[#4E4D93] bg-[#4E4D93]"
                  : "border-[#DBDBDB]"
              }
            `}
          >
            {option.label === selectedValue && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm sm:text-base text-[#2A254B]">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

interface FilterSectionProps {
  selectedCategory: string;
  selectedPriceRange: string;
  onCategoryChange: (category: string) => void;
  onPriceChange: (range: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { label: "Furniture" },
    { label: "Home Decor" },
    { label: "Styles or Themes" },
    { label: "Functionality" },
    { label: "Material" },
  ];

  const priceRanges = [
    { label: "51-100" },
    { label: "101-200" },
    { label: "201-500" },
    { label: "501-1000" },
  ];

  return (
    <div className="p-6">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-2 text-[#2A254B]"
        >
          <span className="text-lg font-clash">Filters</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className={`space-y-8 ${isOpen ? "block" : "hidden lg:block"}`}>
        <FilterGroup
          title="Category"
          options={categories}
          onChange={onCategoryChange}
          selectedValue={selectedCategory}
        />
        <FilterGroup
          title="Price Range"
          options={priceRanges}
          onChange={onPriceChange}
          selectedValue={selectedPriceRange}
        />
      </div>
    </div>
  );
};

export default FilterSection;
