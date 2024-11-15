'use client';
import AutoComplete from '@components/ui/autocomplete';
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
import { reloadSession } from '@lib/funcs';
import { MapPinCheckInside, PencilIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface MealItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeliveryAddressModal({ isOpen, onClose }: MealItemModalProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const { data: session, update } = useSession();
  const { data, isLoading } = useGetDeliveryLocation(searchValue || '');

  const sanitizeSelectedValue = (value: string) => {
    const values = value.split(',');
    const street = values[0].trim();
    const city = values[1].trim();
    const province = values[2].trim();
    const postalCode = values[3].trim();
    return {
      street,
      city,
      province,
      postalCode
    };
  };

  const handleUpdateUserProfile = useCallback(
    async (value: string) => {
      const { street, city, province, postalCode } =
        sanitizeSelectedValue(value);

      if (!session?.user) {
        return;
      }

      const values = {
        ...session.user,
        address: street,
        city,
        province,
        postal_code: postalCode
      };

      const response = await fetch(`/api/updateProfile`, {
        method: 'POST',
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        toast.error('Error', {
          description: 'Failed to update profile, please try again'
        });
        return;
      }

      const responseData = await response.json();

      if (responseData?.error) {
        toast.error('Error', {
          description: 'Failed to update profile, please try again'
        });
        return;
      }

      toast.success('Success', {
        description: 'Address updated successfully.'
      });

      await update({
        ...session,
        user: {
          ...values
        }
      });

      reloadSession();
      setSearchValue('');
    },
    [session, update]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] sm:h-[300px]">
        <DialogClose className="flex w-10 h-10 justify-center items-center" />
        <DialogHeader>
          <DialogTitle>Change Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <AutoComplete
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            data={data}
            isLoading={isLoading}
            updateProfile={handleUpdateUserProfile}
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
                onClick={() => onClose()}
              >
                <div className="flex justify-start items-center">
                  <MapPinCheckInside size={25} />
                  <div className="justify-items-start px-3">
                    <p className="ml-2">{session?.user.address}</p>
                    <p className="ml-2">{`${session?.user.city},${session?.user.province} ${session?.user.postal_code}`}</p>
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
