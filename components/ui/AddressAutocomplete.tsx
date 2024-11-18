'use client';

import { MapPinIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface AddressAutocompleteProps {
  isLoaded: boolean;
  loadError: Error | undefined;
  handlePlaceChanged: (place: google.maps.places.Autocomplete) => void;
}



const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  isLoaded,
  loadError,
  handlePlaceChanged
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState({ address: '' });

  useEffect(() => {
    setTimeout(() => (document.body.style.pointerEvents = ''), 0);
  }, []);

  useEffect(() => {
    if (!isLoaded || loadError || !inputRef.current) return;

    const options = {
      componentRestrictions: { country: 'ca' },
      fields: ['address_components', 'geometry', 'name'],
      types: ['address']
    };
    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autocomplete.addListener('place_changed', () => {
      handlePlaceChanged(autocomplete);
    });

    // Cleanup listener on component unmount
    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded, loadError, handlePlaceChanged]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="relative">
      <MapPinIcon className="absolute top-[6px] left-[4px]" size={20} />
      <input
        type="text"
        ref={inputRef}
        name="address"
        value={input.address}
        onChange={handleChange}
        placeholder="Enter your address"
        className="pl-8 px-2 py-1 bg-gray-100 w-full"
      />
    </div>
  );
};

export default AddressAutocomplete;
