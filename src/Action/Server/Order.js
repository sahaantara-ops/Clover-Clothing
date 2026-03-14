"use server"

import { clearCart, getCart } from "./cart";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/authOption";
import { sendEmail } from "../../app/lib/sendEmail";


import { generateInvoiceHTML } from "../../app/lib/orderInvoice";

const { dbConnect, Collection } = require("@/app/lib/dbConnect");

export const createOrder = async (payload) => {

  const { user } = (await getServerSession(authOption)) || {};
  if (!user) return { success: false };

  const cart = await getCart();
  if (cart.length === 0) {
    return { success: false };
  }

  // get the real MongoDB collection
  const orderCollection = await dbConnect(Collection.ORDER);

  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart,
    user,
    ...payload
  };

  // insert order
  const result = await orderCollection.insertOne(newOrder);

  if (Boolean(result.insertedId)) {
   const result= await clearCart();
  }
 

 const insertedOrder = { ...newOrder, _id: result.insertedId };

await sendEmail({
  to: insertedOrder.user.email,
  subject: "Your Order Invoice",
  html: generateInvoiceHTML(insertedOrder)
});

  return {
    success: Boolean(result.insertedId)
  };
};