import { Spinner } from '@components/ui/spinner';
import { MapPinIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface AutocompleteProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  data: string[];
  isLoading: boolean;
  updateProfile: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  searchValue,
  setSearchValue,
  data,
  isLoading,
  updateProfile
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (data?.length > 0) {
      const filteredSuggestions = data?.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchValue, data]);

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchValue(suggestion);
    setSuggestions([]);
    updateProfile(suggestion);
  };

  return (
    <div>
      <div className="relative">
        {isLoading ? (
          <Spinner className="w-5 h-5 absolute top-[6px] left-[4px]" />
        ) : (
          <MapPinIcon className="absolute top-[6px] left-[4px]" size={20} />
        )}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={isLoading ? 'Loading...' : 'Search for your location'}
          className="pl-8 px-2 py-1 bg-gray-100 w-full"
        />
      </div>
      <ul className="absolute w-[90%] h-[57%] max-h-60 overflow-y-auto rounded-md">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(suggestion)}
            className="text-sm bg-violet-50 cursor-pointer px-4 py-2 hover:bg-gray-200"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
