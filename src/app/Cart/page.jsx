import { getCart } from '@/Action/Server/cart';
import CartItem from '@/components/Card/CartItem';
import React from 'react';

const CartPage = async() => {
  const cartItems = await getCart();
  console.log(cartItems[0]);
  return (
    <div>
    {/* title */}
      <div className=''>
        <h2 className='text-4xl py-4'>
        My Cart
        </h2>
        <p className='py-3'>
          <span className='text-primary'>
            {cartItems.length}
          </span>{""}
          Items found in the cart
        </p>

      </div>
      <div className='flex'>
        <div className='flex-3'>
          {
            cartItems.map(item => <CartItem key={item._id.toString()}item={item}></CartItem>)
          }
        </div>
        <div className='flex-1'></div>

      </div>
    </div>
  );
};

export default CartPage;