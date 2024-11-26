'use client';
import AddressAutocomplete from '@components/ui/AddressAutocomplete';
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
import { reloadSession } from '@lib/funcs';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';
import { MapPinCheckInside, PencilIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { toast } from 'sonner';
import { fillInAddress } from 'utils/mapsHelper';

interface MealItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  setDropOffOptionsModal: (value: boolean) => void;
}

const libraries: Libraries = ['places'];

export function DeliveryAddressModal({
  isOpen,
  onClose,
  setDropOffOptionsModal
}: MealItemModalProps) {
  const { data: session, update } = useSession();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

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
    async (value: string, coordinates: { lat: number; lng: number }) => {
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
        postal_code: postalCode,
        coordinates
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
      setDropOffOptionsModal(true);
      reloadSession();
      onClose();
    },
    [onClose, session, setDropOffOptionsModal, update]
  );

  const handlePlaceChanged = async (
    address: google.maps.places.Autocomplete
  ) => {
    if (!isLoaded) return;
    const place = address.getPlace();

    const { address: full_address, coordinates } = fillInAddress(place);

    if (!place || !place.geometry) {
      return;
    }
    handleUpdateUserProfile(full_address, coordinates);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto overflow-x-none sm:max-w-[500px] sm:h-[300px]">
        <DialogClose className="flex w-10 h-10 justify-center items-center" />
        <DialogHeader>
          <DialogTitle>Change Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <AddressAutocomplete
            isLoaded={isLoaded}
            loadError={loadError}
            handlePlaceChanged={handlePlaceChanged}
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
                <div
                  onClick={() => setDropOffOptionsModal(true)}
                  className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-violet-200 bg-violet-100"
                >
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
