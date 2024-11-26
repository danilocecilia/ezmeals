'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@components/ui/dialog';
import { Form } from '@components/ui/form';
import { Separator } from '@components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { reloadSession } from '@lib/funcs';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import { useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface DropOffOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = z.object({
  apartmentNumber: z.string().optional(),
  dropoffOption: z.enum(['leave_at_door', 'hand_to_customer']),
  additionalNotes: z.string().optional()
});

export function DropOffOptionsModal({
  isOpen,
  onClose
}: DropOffOptionsModalProps) {
  const { data: session, update } = useSession();
  const handleUserDeliveryOptions = useCallback(
    async (values: {
      apartmentNumber?: string;
      dropoffOption: 'leave_at_door' | 'hand_to_customer';
      additionalNotes?: string;
    }) => {
      const { apartmentNumber, dropoffOption, additionalNotes } = values;

      if (!session?.user) {
        return;
      }
      const response = await fetch(`/api/updateDeliveryDetails`, {
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
        description: 'Delivery Structions updated successfully'
      });

      await update({
        ...session,
        user: {
          ...session.user,
          dropoffLocation: dropoffOption,
          deliveryNotes: additionalNotes,
          apt_suite: apartmentNumber
        }
      });

      reloadSession();
    },
    [session, update]
  );

  const form = useForm<{
    apartmentNumber?: string;
    dropoffOption: 'leave_at_door' | 'hand_to_customer';
    additionalNotes?: string;
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      apartmentNumber: session?.user?.apt_suite,
      dropoffOption:
        (session?.user?.dropoffLocation as
          | 'leave_at_door'
          | 'hand_to_customer') || 'leave_at_door',
      additionalNotes: session?.user?.deliveryNotes
    }
  });

  const onSubmit = (data: {
    apartmentNumber?: string;
    dropoffOption: 'leave_at_door' | 'hand_to_customer';
    additionalNotes?: string;
  }) => {
    handleUserDeliveryOptions(data);
    console.log('Form Data:', data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto overflow-x-none sm:max-w-[700px] sm:h-auto flex flex-col z-50">
        <DialogClose className="flex w-10 h-10 justify-center items-center" />
        <div className="mt-12" style={{ height: '150px', width: '100%' }}>
          <GoogleMapsEmbed
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
            height={154}
            width="100%"
            mode="place"
            q={`${session?.user?.coordinates?.lat},${session?.user?.coordinates?.lng}`}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <div className="w-full">
                <p className="text-lg font-semibold">{session?.user.address}</p>
                <div className="text-sm text-gray-500">
                  {session?.user.city && `${session.user.city}, `}
                  {session?.user?.province && `${session.user.province} `}
                  {session?.user?.postal_code?.toUpperCase()}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h2 className="font-semibold">Apartment Number or Suite</h2>
                <Controller
                  name="apartmentNumber"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="border px-2 py-1 bg-gray-100 border-gray-300 rounded-md w-full"
                      {...field}
                    />
                  )}
                />
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h2 className="font-semibold">Drop-off Options</h2>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="dropoffOption"
                      control={form.control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          value="leave_at_door"
                          checked={field.value === 'leave_at_door'}
                          onChange={() => field.onChange('leave_at_door')}
                        />
                      )}
                    />
                    <p>Leave at the door</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="dropoffOption"
                      control={form.control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          value="hand_to_customer"
                          checked={field.value === 'hand_to_customer'}
                          onChange={() => field.onChange('hand_to_customer')}
                        />
                      )}
                    />
                    <p>Hand to customer</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="font-semibold">Additional Notes</h2>
                  <Controller
                    name="additionalNotes"
                    control={form.control}
                    render={({ field }) => (
                      <textarea
                        className="border px-2 py-1 bg-gray-100 border-gray-300 rounded-md w-full"
                        rows={2}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <Button className="w-full" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
