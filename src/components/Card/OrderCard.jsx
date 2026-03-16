"use client";

export default function OrderCard({ order }) {
  return (
    <div className="bg-white shadow rounded p-6 mb-4">
      <h2 className="font-semibold text-lg mb-2">Order ID: {order._id}</h2>
      <p className="text-gray-500 mb-2">
        Placed on: {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <div className="divide-y">
        {order.products.map((p, index) => (
          <div key={index} className="py-2 flex justify-between">
            <span>{p.name} x {p.quantity}</span>
            <span>${p.price * p.quantity}</span>
          </div>
        ))}
      </div>

      <p className="text-right font-semibold mt-2">
        Total: ${order.products.reduce((a,b) => a + b.price*b.quantity, 0)}
      </p>
    </div>
  );
}