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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu';
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
import { updateItemQuantity, clearCart } from '@utils/cartUtils';
import useGetMealById from 'hooks/useGetMealById';
import { X, ShoppingCart, Ellipsis, PlusIcon, TrashIcon } from 'lucide-react';
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
      onClose();
    }
  }, [meal, isLoading, isError, openModal, onClose]);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity === -1 && state.items.length === 1) {
      clearCart(dispatch);
    } else {
      updateItemQuantity(dispatch, itemId, quantity);
    }
  };

  const EmptyCart = () => (
    <div className="flex flex-col h-full items-center justify-center space-y-4">
      <svg
        width="68"
        height="68"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" /> {/* Violet */}
            <stop offset="50%" stopColor="#ec4899" /> {/* Pink */}
            <stop offset="100%" stopColor="#ef4444" /> {/* Red */}
          </linearGradient>
        </defs>
        <ShoppingCart fill="url(#gradient)" />
      </svg>
      <div className="text-2xl">Your cart is empty</div>
      <div>Once you add items, your cart will appear here.</div>
      <Button onClick={() => onClose()}>Start your order now</Button>
    </div>
  );

  const MoreOptions = () => (
    <div className="flex justify-end my-4 px-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex bg-violet-100 rounded-full w-10 h-10 items-center justify-center hover:bg-violet-200">
            <Ellipsis size={28} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuItem onClick={() => onClose()}>
            <PlusIcon size={20} strokeWidth={3} />
            <span className="pl-2 text-md">Add Items</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => clearCart(dispatch)}>
            <TrashIcon size={20} color="red" />
            <span className="pl-2 text-md">Clear Cart</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

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
        <MoreOptions />

        {state.totalItemsQuantity === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="p-4 mt-20 space-y-4">
              <div className="flex justify-between">
                <div>{state.totalItemsQuantity} items</div>
                <div className="flex gap-2">
                  <div className="text-[#4b4b4b]">Subtotal:</div>
                  <div>${state.totalAmount.toFixed(2)}</div>
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
                            handleQuantityChange(item.id, parseInt(value))
                          }
                        >
                          <SelectTrigger className="gap-2">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="-1">Remove</SelectItem>
                              {[...Array(item.maxQuantity).keys()].map((i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="text-sm text-[#4b4b4b] self-center">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <Separator className="bg-[#F3F3F3]" />
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <div>Subtotal</div>
                <div>${state.totalAmount.toFixed(2)}</div>
              </div>
            </div>

            <DrawerFooter className="p-4">
              <Button className="w-full h-12">Checkout</Button>
              <Button
                className="w-full h-12"
                variant="secondary"
                onClick={() => onClose()}
              >
                Add more items
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
