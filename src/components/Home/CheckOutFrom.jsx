"use client";



import { createOrder } from "@/Action/Server/Order";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ cartItems = [] }) => {
  const session =  useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form =  e.target

    const order = {
      Name :form.name.value,
      Email:form.email.value,
      PhoneNumber: form.phone.value,
      Address:form.address.value,
      City:form.city.value,
      PostalCode:form.postalCode.value,
      paymentMethod:form.paymentMethod.value,

    };
    
    console.log("Order Placed:", order);
    const result = await createOrder(order);
    if(result.success){
      Swal.fire("success","order added");
      router.push("/")

    }else{
      Swal.fire("sorry","something went wrong");
      router.push("/cart")
    }
  };
  if(!session ){
    return <h2>loading..</h2>
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
      
      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="md:col-span-2 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        {/* Customer Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={session?.data?.user?.name || ""}
            //onChange={handleChange}
            required
            className="border p-3 rounded w-full"
            readOnly
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
             value={session?.data?.user?.email || ""}
            onChange={handleChange}
            required
            className="border p-3 rounded w-full"
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="phone"
          onChange={handleChange}
          required
          className="border p-3 rounded w-full mt-4"
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Shipping Address"
          onChange={handleChange}
          required
          className="border p-3 rounded w-full mt-4"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>

        {/* Payment */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Payment Method</h3>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              onChange={handleChange}
            />
            Online Payment
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        {cartItems.length === 0 && (
          <p className="text-gray-500">No items in cart</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between border-b py-2 text-sm"
          >
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between font-semibold mt-4">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;