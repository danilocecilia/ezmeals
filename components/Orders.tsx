'use client';
import { Badge } from '@components/ui/badge';
// import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { format } from 'date-fns';
import useCustomerOrders from 'hooks/useCustomerOrders';
import {
  CalendarIcon,
  PackageIcon,
  CreditCardIcon,
  ChevronRightIcon,
  MapPinIcon,
  TruckIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import LoadingComponent from './loading';

interface OrderItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: number;
  items: OrderItem[];
  fulfillment: {
    type: 'pickup' | 'shipping';
    address: string;
    name?: string;
  };
}

const statusColors = {
  processing: 'bg-yellow-500',
  shipped: 'bg-blue-500',
  delivered: 'bg-green-500'
};

const handleNoOrders = () => {
  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>You have no recent orders.</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default function OrderCard({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useCustomerOrders({ userId });
  // @ts-expect-error - data is not defined
  const { ordersList } = data || {};

  if (isError) {
    return (
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            An error occurred while fetching your orders.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription className="flex p-10 justify-center">
            <LoadingComponent />
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!ordersList || ordersList.length === 0) {
    return handleNoOrders();
  }

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          You have {ordersList?.length} recent orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {ordersList?.map((order: Order) => (
            <div key={order.id} className="mb-6 last:mb-0">
              <div className="flex items-center justify-between space-x-4 mb-4">
                <div className="flex items-center space-x-4">
                  <PackageIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {format(new Date(order.date), 'MMMM dd, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                  <div className="flex items-center text-sm font-medium">
                    <CreditCardIcon className="mr-1 h-4 w-4 text-gray-400" />$
                    {order.total.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-violet-50 p-2 rounded-md"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          x{item.quantity}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-xs text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                        <p className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-violet-50 p-4 rounded-md mb-2">
                <div className="flex items-start space-x-2">
                  {order.fulfillment.type === 'pickup' ? (
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <TruckIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {order.fulfillment.type === 'pickup'
                        ? 'Picked up at'
                        : 'Ship to'}
                    </p>
                    {/* {order.fulfillment.type === 'shipping' && ( */}
                    <p className="text-sm">{order.fulfillment.name}</p>
                    {/* )} */}
                    <p className="text-sm text-gray-500">
                      {order.fulfillment.address}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`/order/${order.id}`}
                className="flex items-center justify-end text-sm text-violet-600 hover:text-violet-800 transition-colors"
              >
                View Order Details
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">View All Orders</Button>
      </CardFooter> */}
    </Card>
  );
}
