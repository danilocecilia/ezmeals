'use client';

import { Separator } from '@components/ui/separator';
import LoadingComponent from '@root/components/loading';
import { Receipt } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

interface Order {
  orderId: string;
  paymentIntentId: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  totalAmount: number;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ params }) => {
  const fetcher = (url: string): Promise<{ order: Order }> =>
    fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR<{ order: Order }>(
    `/api/admin/orders/get/${params.id}`,
    fetcher
  );
  const { order } = data || {};
  if (isLoading) return <LoadingComponent />;
  if (error) return <p>Error loading order details.</p>;

  const handleDateFormater = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full container hidden h-full flex-1 flex-col space-y-10 p-8 md:flex ">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-[28px] font-bold tracking-tight">
            Order Details
          </h2>
        </div>
      </div>
      {order ? (
        <div className="flex gap-x-56">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2 text-gray-600">
                <Receipt className="h-5 w-5" /> Total Amount
              </div>
              <div>
                <h2 className="text-2xl font-semibold">${order.totalAmount}</h2>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2  font-semibold">Order ID</div>
              <div>
                <h2 className="text-md">{order.orderId}</h2>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2  font-semibold">Payment Id</div>
              <div>
                <h2 className="text-md">{order.paymentIntentId}</h2>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2 font-semibold">Customer Name</div>
              <div>
                <h2 className="text-md">{order.customerName}</h2>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2 font-semibold">Customer Email</div>
              <div>
                <h2 className="text-md">{order.customerEmail}</h2>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2 font-semibold">Order Date</div>
              <div>
                <h2 className="text-md">
                  {handleDateFormater(order.createdAt)}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[200px] space-y-2">
            <div className="flex gap-2 text-2xl font-semibold mb-2">Items</div>
            <Separator />
            {order.items.map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="flex justify-between gap-2">
                  <div className="">{item.name}</div>
                  <Image
                    src={item.image}
                    width={50}
                    height={50}
                    alt="Eazy Meal Logo"
                    style={{ objectFit: 'cover', maxWidth: 'unset' }}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-semibold">Price: </div>
                    <div>${item.price}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">Quantity:</span>
                    <div>{item.quantity}</div>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
};

export default OrderDetailsPage;
