'use client';

import { Button } from '@components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay
} from '@components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components/ui/select';
import { Separator } from '@components/ui/separator';
import { useCart } from '@root/context/CartContext';
import { useModal } from '@root/context/ModalContext';
import { updateItemQuantity } from '@utils/cartUtils';
import useGetMealById from 'hooks/useGetMealById';
import { X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

export function DrawerMealCheckout({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state, dispatch } = useCart();
  const { openModal } = useModal();
  const [selectedMealId, setSelectedMealId] = React.useState<string | null>(
    null
  );
  const {
    data: meal,
    isLoading,
    isError
  } = useGetMealById(selectedMealId ?? '');
  const handleMealClick = async (mealId: string) => {
    setSelectedMealId(mealId);
  };

  React.useEffect(() => {
    if (meal && !isLoading && !isError) {
      openModal(meal);
      setSelectedMealId(null);
    }
  }, [meal, isLoading, isError, openModal]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction="right"
    >
      <DrawerOverlay className="z-[50]" />

      <DrawerContent className="right-2 top-0 bottom-0 fixed z-[50] outline-none w-[400px] bg-white flex mt-0">
        <DrawerClose className="flex absolute top-0 left-0 m-4 bg-violet-100 rounded-full w-10 h-10 items-center justify-center hover:bg-violet-200">
          <X />
        </DrawerClose>

        <div className="p-4 mt-20 space-y-4">
          <div className="flex justify-between">
            <div>{state.totalItemsQuantity} items</div>
            <div className="flex gap-2">
              <div className="text-[#4b4b4b]">Subtotal:</div>
              <div>${state.totalAmount}</div>
            </div>
          </div>
          <Separator className="bg-[#F3F3F3]" />
          <div>
            {state.items.map((item) => (
              <div key={item.id} className="py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleMealClick(item.id)}
                >
                  <div>{item.name}</div>
                  <div>
                    <Image
                      src={item.image}
                      alt="Image"
                      layout="intrinsic"
                      width={48}
                      height={48}
                    />
                  </div>
                </div>

                <div className="flex justify-between space-y-10 pb-4">
                  <div className="self-end">
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) =>
                        updateItemQuantity(dispatch, item.id, parseInt(value))
                      }
                    >
                      <SelectTrigger className="gap-2">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="-1">Remove</SelectItem>
                          {[...Array(10).keys()].map((i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                          <SelectItem value="+1">Add</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-sm text-[#4b4b4b] self-center">
                    ${item.price}
                  </div>
                </div>
                <Separator className="bg-[#F3F3F3]" />
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <div>Subtotal</div>
            <div>{state.totalAmount}</div>
          </div>
        </div>

        <DrawerFooter className="p-4">
          <Button className="w-full h-12">Checkout</Button>
          <Button className="w-full h-12" variant="secondary">
            Add more items
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
