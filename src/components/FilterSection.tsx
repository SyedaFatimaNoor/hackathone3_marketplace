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
}

const FilterGroup = ({ title, options, onChange }: FilterGroupProps) => (
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
                option.checked
                  ? "border-[#4E4D93] bg-[#4E4D93]"
                  : "border-[#DBDBDB]"
              }
            `}
          >
            {option.checked && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm sm:text-base text-[#2A254B]">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const CompactFilter = ({
  title,
  options,
  onChange,
}: {
  title: string;
  options: FilterOption[];
  onChange: (label: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-full max-w-xs">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm text-[#2A254B] font-normal border border-gray-300 rounded-lg hover:bg-gray-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4 space-y-3">
            {options.map((option) => (
              <label
                key={option.label}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => onChange(option.label)}
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center
                  ${
                    option.checked
                      ? "border-[#4E4D93] bg-[#4E4D93]"
                      : "border-[#DBDBDB]"
                  }`}
                >
                  {option.checked && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-[#2A254B]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FilterSection = () => {
  const [productTypes, setProductTypes] = useState([
    { label: "Furniture", checked: false },
    { label: "Homeware", checked: true },
    { label: "Sofas", checked: false },
    { label: "Light fittings", checked: false },
    { label: "Accessories", checked: false },
  ]);

  const [priceRanges, setPriceRanges] = useState([
    { label: "0 - 100", checked: false },
    { label: "101 - 250", checked: false },
    { label: "250 +", checked: false },
  ]);

  const [designers, setDesigners] = useState([
    { label: "Robert Smith", checked: false },
    { label: "Liam Gallagher", checked: false },
    { label: "Biggie Smalls", checked: false },
    { label: "Thom Yorke", checked: false },
  ]);

  const handleFilterChange = (
    label: string,
    setState: React.Dispatch<
      React.SetStateAction<{ label: string; checked: boolean }[]>
    >
  ) => {
    setState((prev) =>
      prev.map((option) =>
        option.label === label
          ? { ...option, checked: !option.checked }
          : option
      )
    );
  };

  return (
    <div>
      {/* Large screen filter */}
      <aside className="hidden lg:block w-full max-w-[385px] space-y-12 p-6 md:p-8">
        <FilterGroup
          title="Product type"
          options={productTypes}
          onChange={(label) => handleFilterChange(label, setProductTypes)}
        />
        <FilterGroup
          title="Price"
          options={priceRanges}
          onChange={(label) => handleFilterChange(label, setPriceRanges)}
        />
        <FilterGroup
          title="Designer"
          options={designers}
          onChange={(label) => handleFilterChange(label, setDesigners)}
        />
      </aside>

      {/* Small screen compact filter */}
      <div className="lg:hidden space-y-4 p-4">
        <CompactFilter
          title="Product type"
          options={productTypes}
          onChange={(label) => handleFilterChange(label, setProductTypes)}
        />
        <CompactFilter
          title="Price"
          options={priceRanges}
          onChange={(label) => handleFilterChange(label, setPriceRanges)}
        />
        <CompactFilter
          title="Designer"
          options={designers}
          onChange={(label) => handleFilterChange(label, setDesigners)}
        />
      </div>
    </div>
  );
};

export default FilterSection;
