'use client';
import CheckoutForm from '@components/CheckoutForm';
import { DeliveryAddressModal } from '@components/DeliveryAddressModal';
import { DropOffOptionsModal } from '@components/DropoffOptionsModal';
import StripeProvider from '@components/StripeProvider';
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
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import { Separator } from '@root/components/ui/separator';
import { useCart } from '@root/context/CartContext';
import {
  MapPinHouseIcon,
  User,
  Banknote,
  ShoppingCart,
  StoreIcon
} from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { FC } from 'react';

const CheckoutPage: FC = () => {
  const { data: session } = useSession();
  const [deliveryType, setDeliveryType] = React.useState('delivery');
  const [locationAdressModal, setLocationAdressModal] = React.useState(false);
  const [dropOffOptionsModal, setDropOffOptionsModal] = React.useState(false);
  const [checkoutFormModal, setCheckoutFormModal] = React.useState(false);
  const { state } = useCart();

  const DeliveryDetailsPanel = () => {
    return (
      <Tabs
        activationMode="manual"
        onValueChange={(e) => {
          setDeliveryType(e);
        }}
        value={deliveryType}
        className="self-center"
      >
        <Card className="w-[716px]">
          <CardHeader className="flex">
            <CardTitle className="flex justify-between items-center">
              <div>
                {deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} Details
              </div>

              <TabsList className="grid w-full grid-cols-2 max-w-48">
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="pickup">Pickup</TabsTrigger>
              </TabsList>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TabsContent value="delivery">
              <Card className="border-0 shadow-none">
                <div
                  onClick={() => setLocationAdressModal(true)}
                  className="flex space-y-1 items-center py-4 justify-between  cursor-pointer"
                >
                  <div className="flex gap-4 items-center">
                    <MapPinHouseIcon className="w-6 h-6" />
                    <div>
                      <div>
                        {session?.user?.address || 'No address provided'}
                      </div>
                      <div>
                        {session?.user.city && `${session.user.city}, `}
                        {session?.user?.province && `${session.user.province} `}
                        {session?.user?.postal_code?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button>Edit</Button>
                  </div>
                </div>
                <Separator />
                <div
                  onClick={() => setDropOffOptionsModal(true)}
                  className="flex space-y-1 items-center py-4 cursor-pointer justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <User className="w-6 h-6" />
                    <div>
                      <div>
                        {session?.user?.dropoffLocation === 'hand_to_customer'
                          ? 'Hand it to customer'
                          : 'Leave it at my door'}
                      </div>
                      <div className="text-sm text-violet-300">
                        Add delivery instructions
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button className="">Edit</Button>
                  </div>
                </div>
                <Separator />
              </Card>
            </TabsContent>
            <TabsContent value="pickup">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="p-0">10318 Shenandoah Cresent</div>
                  </CardTitle>
                  <div
                    className="mt-12"
                    style={{ height: '150px', width: '100%' }}
                  >
                    <GoogleMapsEmbed
                      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                      height={154}
                      width="100%"
                      mode="place"
                      q={'10318 Shenandoah Cresent'}
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 px-6 py-2">
                  <div className="flex gap-4 items-center">
                    <StoreIcon className="w-6 h-6" />
                    <div>
                      <div>{'10318 Shenandoah Cresent'}</div>
                      <div>{'Windsor, ON N8R1B5'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </CardContent>
          {deliveryType === 'delivery' && (
            <CardFooter className="flex flex-col justify-start items-start">
              <div className="text-2xl font-semibold">Delivery Date/Time</div>

              <CardContent className="space-y-2 p-0 pt-10">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    The estimate delivery date and time is 15th July 2021,
                    12:00pm - 1:00pm
                  </div>
                </div>
              </CardContent>
            </CardFooter>
          )}
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
        <CardContent className="flex justify-between p-0 space-y-2 items-center">
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
                    <div className="text-[16px]">
                      Cart Summary ({state.totalItemsQuantity}{' '}
                      {state.totalItemsQuantity > 1 ? 'items' : 'item'})
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-4">
                {state.items.map((item, key) => (
                  <React.Fragment key={key}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.image}
                        alt="Image"
                        layout="intrinsic"
                        width={48}
                        height={48}
                      />

                      <div className="flex flex-col justify-between w-full">
                        <div>{item.name}</div>
                        <div>${item.price}</div>
                      </div>
                      <div className="bg-violet-50 mt-0 w-11 h-11 rounded-lg text-center flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>

                    {state.items.length > 1 ? <Separator /> : null}
                  </React.Fragment>
                ))}
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
            <div>${state.totalAmount.toFixed(2)}</div>
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
            <div>${state.totalAmount.toFixed(2)}</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setCheckoutFormModal(true)} className="w-full">
            Place your order
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <DropOffOptionsModal
        isOpen={dropOffOptionsModal}
        onClose={() => setDropOffOptionsModal(false)}
      />
      <DeliveryAddressModal
        isOpen={locationAdressModal}
        setDropOffOptionsModal={setDropOffOptionsModal}
        onClose={() => setLocationAdressModal(false)}
      />
      <div className="flex gap-4 justify-center">
        <div className="flex py-10 flex-col gap-4">
          <DeliveryDetailsPanel />
        </div>
        <div className="flex flex-col gap-4">
          <OrderSummaryPanel />
          <StripeProvider amount={state.totalAmount.toFixed(2)}>
            <OrderTotalPanel />
            <CheckoutForm
              isOpen={checkoutFormModal}
              onClose={() => setCheckoutFormModal(false)}
              totalAmount={state.totalAmount.toFixed(2)}
            />
          </StripeProvider>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
