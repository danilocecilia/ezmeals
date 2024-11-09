import React from 'react';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartProps {
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: ${totalAmount.toFixed(2)}</h3> */}
    </div>
  );
};

export default Cart;
