'use client';

import { Button } from '@components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerOverlay
} from '@components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from '@components/ui/select';
import { Separator } from '@components/ui/separator';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

export function DrawerMealCheckout({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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

        {/* <DrawerHeader>
          <DrawerTitle>asdfasd</DrawerTitle>
          <DrawerDescription>adsfasd</DrawerDescription>
        </DrawerHeader> */}
        <div className="p-4 mt-20 space-y-4">
          <div className="flex justify-between">
            <div>4 items</div>
            <div className="flex gap-2">
              <div className="text-[#4b4b4b]">Subtotal:</div>
              <div>$36.00</div>
            </div>
          </div>
          <Separator className="bg-[#F3F3F3]" />
          {/* <div className=""> */}
          <div className="flex justify-between items-center">
            <div>Smoked Turkey Sandwich</div>
            <div>
              <Image
                src="/logo.jpg"
                alt="Image"
                layout="intrinsic"
                // className="opacity-80"
                width={48}
                height={48}
              />
            </div>
          </div>

          <div className="flex justify-between space-y-10">
            <div className="self-end">
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="-1">Remove</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="+1">Add</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-[#4b4b4b] self-center">$72.00</div>
          </div>

          <div className="flex justify-between pt-4">
            <div>Subtotal</div>
            <div>$72.00</div>
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
