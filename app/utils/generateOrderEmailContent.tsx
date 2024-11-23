interface Order {
  customerName: string;
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: string;
}

export const generateOrderEmailContent = (order: Order) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Thank you for your order!</h2>
    <p>Hi ${order.customerName},</p>
    <p>We’re excited to let you know that we’ve received your order.</p>
    <p><strong>Order ID:</strong> ${order.orderId}</p>
    <h3>Order Details:</h3>
    <ul>
      ${order.items
        .map(
          (item) =>
            `<li>${item.name} - Quantity: ${item.quantity.toFixed(2)} - Price: $${item.price}</li>`
        )
        .join('')}
    </ul>
    <p><strong>Total:</strong> $${order.totalAmount}</p>
    <p>Payment Status: ${order.status}</p>
    <p>Thank you for choosing EZMeal!</p>
  </div>
`;
