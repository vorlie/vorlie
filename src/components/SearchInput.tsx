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
        className="flex-grow p-3 rounded-xl bg-gray-900/90 text-white placeholder-gray-400 border border-gray-700/50 hover:border-white/10 focus:outline-none focus:border-white/20 transition-all duration-300"
      />
  );
};

export default SearchInput;
