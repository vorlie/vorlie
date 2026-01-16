// src/components/SearchInput.tsx
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search clips...",
}) => {
  return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-grow p-3 rounded-[16px] bg-m3-surface-container text-m3-on-surface placeholder-m3-on-surface-variant/50 border border-m3-outline/20 hover:border-m3-outline/40 focus:outline-none focus:ring-2 focus:ring-m3-primary/30 transition-all duration-200 font-medium"
      />
  );
};

export default SearchInput;
