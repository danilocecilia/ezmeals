'use client';

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
import { Separator } from '@components/ui/separator';
import useGetDeliveryLocation from '@hooks/useGetDeliveryLocation';
import { MapPinCheckInside, PencilIcon } from 'lucide-react';
import React, { useState } from 'react';

import MapWithPin from './MapWithPin';

interface MealItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DropOffOptionsModal({ isOpen, onClose }: MealItemModalProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  console.log('🚀 ~ DropOffOptionsModal ~ selectedValue:', selectedValue);

  const { data, isLoading } = useGetDeliveryLocation(searchValue || '');
  console.log('🚀 ~ DeliveryAddressModal ~ data:', data);
  const position: [number, number] = [51.505, -0.09];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] sm:h-auto">
        <DialogClose className="flex w-10 h-10 justify-center items-center" />
        <div className="mt-12" style={{ height: '150px', width: '100%' }}>
          <MapWithPin position={position} />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <p className="text-lg font-semibold">908 Quayside Dr</p>
            <p className="text-sm text-gray-500">New Westminster, BC N8N 0A3</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <h2 className="font-semibold">Apartment Number or Suite</h2>
            <input
              type="text"
              className="border px-2 py-1 bg-gray-100 border-gray-300 rounded-md w-full"
            />
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            <h2 className="font-semibold">Drop-off Options</h2>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <input type="radio" name="dropoff" />
                <p>Leave at the door</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="dropoff" />
                <p>Hand to customer</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-semibold">Additional Notes</h2>
              <textarea
                className="border px-2 py-1 bg-gray-100 border-gray-300 rounded-md w-full"
                rows={2}
              />
            </div>
          </div>
          <Button className="w-full" onClick={onClose}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
