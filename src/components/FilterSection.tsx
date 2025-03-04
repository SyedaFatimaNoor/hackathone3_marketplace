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
  isMobile?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceChange,
  isMobile = false,
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
    <div className={`p-4 ${isMobile ? 'w-full' : 'w-full lg:w-[385px]'}`}>
      {/* Mobile Filter Toggle */}
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-clash text-[#2A254B]">Filters</span>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#2A254B]"
          >
            {isOpen ? 'Close' : 'Open'} Filters
          </button>
        </div>
      )}

      {/* Filter Content - Responsive */}
      <div className={`
        ${isMobile 
          ? `transition-all duration-300 ease-in-out 
             ${isOpen ? 'block' : 'hidden'}` 
          : 'block'}
      `}>
        <div className="space-y-6">
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
    </div>
  );
};

export default FilterSection;