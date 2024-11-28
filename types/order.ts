export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: string;
  createdAt: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface OrderProps extends Order {
  customerName: string;
  deliveryAddress: string;
}
