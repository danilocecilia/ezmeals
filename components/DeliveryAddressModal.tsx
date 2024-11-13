'use client';
import { AutoComplete } from '@components/ui/autocomplete';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@components/ui/dialog';
import useGetDeliveryLocation from '@hooks/useGetDeliveryLocation';
import React, { useState, useCallback } from 'react';

interface MealItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AutoCompleteAddress = React.memo(
  ({
    selectedValue,
    setSelectedValue,
    searchValue,
    setSearchValue,
    data,
    isLoading
  }) => {
    return (
      <AutoComplete
        selectedValue={selectedValue}
        onSelectedValueChange={setSelectedValue}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        items={data || []} // Make sure this is the correct path
        isLoading={isLoading}
        emptyMessage="No items found."
        placeholder="Search items..."
      />
    );
  }
);

export function DeliveryAddressModal({ isOpen, onClose }: MealItemModalProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  console.log('🚀 ~ DeliveryAddressModal ~ selectedValue:', selectedValue);

  const { data, isLoading } = useGetDeliveryLocation(searchValue || '');
  console.log('🚀 ~ DeliveryAddressModal ~ data:', data);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] sm:h-[300px]">
        <DialogClose className="flex w-10 h-10 justify-center items-center" />
        <DialogHeader>
          <DialogTitle>Change Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <AutoCompleteAddress
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            data={data}
            isLoading={isLoading}
          />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
