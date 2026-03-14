import React from 'react';
import CheckOutFrom from '../../components/Home/CheckOutFrom';
import { getCart } from '@/Action/Server/cart';

const CheckOutPage = async () => {
      const cartItems = await getCart();
      const formattedItems =  cartItems.map((item)=>({
        ...item,
        _id: item._id.toString()
      }));
    return (
        <div>
          {/* Header */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-4xl font-bold text-gray-800 border-l-4 border-primary pl-4">
       Checkout Page
</h2>

       
  </div>
           <CheckOutFrom cartItems={formattedItems}></CheckOutFrom>
        </div>
    );
};

export default CheckOutPage;