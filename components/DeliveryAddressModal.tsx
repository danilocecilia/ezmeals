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
import { MapPinCheckInside, PencilIcon } from 'lucide-react';
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
        <DialogFooter>
          <div className="w-full">
            <div className="py-4">
              <h2 className="text-lg font-semibold">Saved Address</h2>
            </div>
            <div className="border-[1px] rounded-md p-1">
              <Button
                className="w-full bg-violet-50 justify-between hover:bg-secondary-dark text-color-primary h-15"
                onClick={() => {
                  console.log(
                    '🚀 ~ DeliveryAddressModal ~ selectedValue:',
                    selectedValue
                  );
                  onClose();
                }}
              >
                <div className="flex justify-start items-center">
                  <MapPinCheckInside size={25} />
                  <div className="justify-items-start px-3">
                    <p className="ml-2">908 Queyside Dr</p>
                    <p className="ml-2">New Westminster, BC N8N 0A3</p>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-violet-200 bg-violet-100">
                  <PencilIcon size={20} />
                </div>
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
