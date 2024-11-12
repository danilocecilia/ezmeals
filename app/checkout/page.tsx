'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@components/ui/accordion';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@root/components/ui/select';
import { Separator } from '@root/components/ui/separator';
import {
  MapPinHouseIcon,
  User,
  CreditCardIcon,
  Banknote,
  ShoppingCart
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const CheckoutPage = () => {
  const [deliveryType, setDeliveryType] = React.useState('delivery');

  const DeliveryDetailsPanel = () => {
    return (
      <Tabs defaultValue="delivery" className="self-center">
        <Card className="w-[716px]">
          <CardHeader className="flex">
            <CardTitle className="flex justify-between items-center">
              <div>Delivery Details</div>

              <TabsList className="grid w-full grid-cols-2 max-w-48">
                <TabsTrigger
                  onChange={() => setDeliveryType('delivery')}
                  value="delivery"
                >
                  Delivery
                </TabsTrigger>
                <TabsTrigger
                  onChange={() => setDeliveryType('pickup')}
                  value="pickup"
                >
                  Pickup
                </TabsTrigger>
              </TabsList>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TabsContent value="delivery">
              <Card className="border-0 shadow-none">
                <CardContent className="space-y-2">
                  <div className="flex space-y-1 items-center py-4 justify-between">
                    <div className="flex gap-4 items-center">
                      <MapPinHouseIcon className="w-6 h-6" />
                      <div>
                        <div>3221 Viola Cres</div>
                        <div>Mississauga, ON L5A 3A1</div>
                      </div>
                    </div>
                    <div>
                      <Button>Edit</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex space-y-1 items-center py-4 justify-between">
                    <div className="flex gap-4 items-center">
                      <User className="w-6 h-6" />
                      <div>
                        <div>Meet at my door</div>
                        <div>Mississauga, ON L5A 3A1</div>
                      </div>
                    </div>
                    <div>
                      <Button className="">Edit</Button>
                    </div>
                  </div>
                  <Separator />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pickup">
              <Card>
                <CardHeader>
                  <CardTitle>pickup</CardTitle>
                  <CardDescription>
                    Change your pickup here. After saving, you'll be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {/* <Label htmlFor="current">Current pickup</Label>
                    <Input id="current" type="pickup" /> */}
                  </div>
                  <div className="space-y-1">
                    {/* <Label htmlFor="new">New pickup</Label>
                    <Input id="new" type="pickup" /> */}
                  </div>
                </CardContent>
                <CardFooter>{/* <Button>Save pickup</Button> */}</CardFooter>
              </Card>
            </TabsContent>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start">
            <div className="text-2xl font-semibold">Delivery Date/Time</div>

            <CardContent className="space-y-2 pt-10">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  The estimate delivery date and time is 15th July 2021, 12:00pm
                  - 1:00pm
                </div>
              </div>
            </CardContent>
          </CardFooter>
        </Card>
      </Tabs>
    );
  };

  const PaymentDetailsPanel = () => {
    return (
      <Card className="w-[716px]">
        <CardHeader>
          <CardTitle>
            <div>Payment</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between p-6 space-y-2 items-center">
          <div className="flex gap-2 p-6 pt-0">
            <Banknote />
            <div>By Cash at delivery</div>
          </div>

          <div className="p-6 pt-0">
            <Button className="">Edit</Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const OrderSummaryPanel = () => {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <Card className="w-[420px] flex mt-10 flex-col gap-6">
            <AccordionTrigger className="pr-5 hover:no-underline">
              <CardHeader>
                <CardTitle>
                  <div className="flex gap-4 items-center">
                    <ShoppingCart className="w-6 h-6" />
                    <div className="text-[16px]">Cart Summary (10 items)</div>
                  </div>
                </CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                <div className="flex space-y-2 items-center gap-2">
                  <Image
                    src="/logo.jpg"
                    alt="Image"
                    layout="intrinsic"
                    width={48}
                    height={48}
                  />

                  <div className="flex justify-between min-w-[300px]">
                    <div>Bobo de Camarao</div>
                    <div>$10.00</div>
                  </div>
                </div>
                <Separator />
                <div className="flex space-y-2 items-center gap-2">
                  <Image
                    src="/logo.jpg"
                    alt="Image"
                    layout="intrinsic"
                    width={48}
                    height={48}
                  />

                  <div className="flex justify-between min-w-[300px]">
                    <div>Bobo de Camarao</div>
                    <div>$10.00</div>
                  </div>
                </div>
                <Separator />
                <div className="flex space-y-2 items-center gap-2">
                  <Image
                    src="/logo.jpg"
                    alt="Image"
                    layout="intrinsic"
                    width={48}
                    height={48}
                  />

                  <div className="flex justify-between min-w-[300px]">
                    <div>Bobo de Camarao</div>
                    <div>$10.00</div>
                  </div>
                </div>
                <Separator />
                <div className="flex space-y-2 items-center gap-2">
                  <Image
                    src="/logo.jpg"
                    alt="Image"
                    layout="intrinsic"
                    width={48}
                    height={48}
                  />

                  <div className="flex justify-between min-w-[300px]">
                    <div>Bobo de Camarao</div>
                    <div>$10.00</div>
                  </div>
                </div>
                <Separator />
                <div className="flex space-y-2 items-center gap-2">
                  <Image
                    src="/logo.jpg"
                    alt="Image"
                    layout="intrinsic"
                    width={48}
                    height={48}
                  />

                  <div className="flex justify-between min-w-[300px]">
                    <div>Bobo de Camarao</div>
                    <div>$10.00</div>
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    );
  };

  const OrderTotalPanel = () => {
    return (
      <Card className="w-[420px] flex flex-col gap-6">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-4 items-center">
              <div>Order Total</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <div>Subtotal</div>
            <div>$50.00</div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div>Delivery fee</div>
            <div>$5.00</div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div>Discount</div>
            <div>$0.00</div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="font-bold">Total</div>
            <div className="font-bold">$55.00</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Place Order</Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="flex gap-4 justify-center">
      <div className="flex py-10 flex-col gap-4">
        <DeliveryDetailsPanel />
        <PaymentDetailsPanel />
      </div>
      <div className="flex flex-col gap-4">
        <OrderSummaryPanel />
        <OrderTotalPanel />
      </div>
    </div>
  );
};

export default CheckoutPage;
