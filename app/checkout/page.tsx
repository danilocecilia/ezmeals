'use client';
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
import React from 'react';

const CheckoutPage = () => {
  const [deliveryType, setDeliveryType] = React.useState('delivery');

  const DeliveryDetailsPanel = () => {
    return (
      <Tabs defaultValue="delivery" className="w-[400px]">
        <Card className="w-[716px]">
          <CardHeader className="flex">
            <CardTitle className="flex justify-between">
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
              <Card>
                <CardHeader>
                  <CardTitle>delivery</CardTitle>
                  <CardDescription>
                    Make changes to your delivery here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {/* <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" /> */}
                  </div>
                  <div className="space-y-1">
                    {/* <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" /> */}
                  </div>
                </CardContent>
                <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
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
        </Card>
      </Tabs>
    );
  };

  const PaymentDetailsPanel = () => {
    return (
      <Card className="w-[716px]">
        <CardHeader>
          <CardTitle>
            <div>Create project</div>
          </CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2>Payment Details</h2>
          <input type="text" placeholder="Card Number" />
          <input type="text" placeholder="Expiry Date" />
          <input type="text" placeholder="CVV" />
          <button>Save</button>
        </CardContent>
      </Card>
    );
  };

  const OrderSummaryPanel = () => {
    return (
      <div>
        <h2>Order Summary</h2>
        <div>
          <div>Subtotal:</div>
          <div>$0.00</div>
        </div>
        <Separator />
        <div>
          <div>Meal 1</div>
          <div>
            <Image src="/meal1.jpg" alt="Meal 1" width={48} height={48} />
          </div>
          <div>
            <Select value="1">
              <SelectTrigger>
                <SelectValue>1</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>$0.00</div>
        </div>
        <Separator />
        <div>
          <div>Meal 2</div>
          <div>
            <Image src="/meal2.jpg" alt="Meal 2" width={48} height={48} />
          </div>
          <div>
            <Select value="1">
              <SelectTrigger>
                <SelectValue>1</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>$0.00</div>
        </div>
        <Separator />
        <div>
          <div>Meal 3</div>
          <div>
            <Image src="/meal3.jpg" alt="Meal 3" width={48} height={48} />
          </div>
          <div>
            <Select value="1">
              <SelectTrigger>
                <SelectValue>1</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>$0.00</div>
        </div>
        <Separator />
        <div>
          <div>Total:</div>
          <div>$0.00</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center py-10">
      <DeliveryDetailsPanel />
    </div>
  );
};

export default CheckoutPage;
