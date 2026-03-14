export const generateInvoiceHTML = (order) => {
  const itemsRows = order.items.map(item => `
    <tr>
      <td style="padding:5px;border:1px solid #ddd;">${item.title}</td>
      <td style="padding:5px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:5px;border:1px solid #ddd;text-align:right;">$${item.price}</td>
      <td style="padding:5px;border:1px solid #ddd;text-align:right;">$${item.price * item.quantity}</td>
    </tr>
  `).join("");

  const subtotal = order.items.reduce((sum, i) => sum + i.price*i.quantity, 0);
  const shipping = order.shipping ?? 0;
  const tax = order.tax ?? 0;
  const total = subtotal + shipping + tax;

  return `
    <h2>Thank you for your order</h2>
    <p>Order for ${order.user.name}</p>
    <p>Payment Method: ${order.paymentMethod}</p>

    <h3>Shipping Address</h3>
    <p>${order.user.address}, ${order.user.city}, ${order.user.postalCode}</p>

    <h3>Items</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="border:1px solid #ddd;padding:5px;text-align:left;">Product</th>
          <th style="border:1px solid #ddd;padding:5px;text-align:center;">Qty</th>
          <th style="border:1px solid #ddd;padding:5px;text-align:right;">Price</th>
          <th style="border:1px solid #ddd;padding:5px;text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <h3>Summary</h3>
    <p>Subtotal: $${subtotal}</p>
    
    <p><strong>Total: $${total}</strong></p>
  `;
};