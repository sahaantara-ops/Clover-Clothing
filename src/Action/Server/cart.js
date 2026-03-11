"use server"

import { authOption } from "@/app/lib/authOption";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache, cacheSignal } from "react";

const { dbConnect, Collection } = require("@/app/lib/dbConnect")




export const handleCart = async({product, inc = true}) =>{

    const {user} = await getServerSession(authOption)|| {} ;
    if(!user) return {success:false};
    const cartCollection =await dbConnect(Collection.CART);

    const query = {email :user?.email, productId:product?._id}

//     const price = (product?.price) || 0;
//  const discount = Number(product?.discount) || 0;
//  const finalPrice = price - (price * discount) / 100;

    const isAdded = await cartCollection.findOne(query);
    if (isAdded){
      
      const updatedData = {
        $inc:{
            quantity: inc ?  1 : -1
        }
      }
     
     const result= await cartCollection.updateOne(query,updatedData)
     return{success:Boolean(result.modifiedCount)}
    }else{
    const newData = {
  productId: product?._id.toString(),
  email: user?.email,
  title: product.name,
  quantity: 1,
  image: product.image,
  price:  product.price, 
  username: user?.name,
};

     const result = await cartCollection.insertOne(newData);
     console.log(result);
     return{success:result.acknowledged};
     
    }
    

};
export const getCart = cache(async () =>{
    const {user} = (await getServerSession(authOption))|| {} ;
    if(!user) return [];
     
    const cartCollection = await dbConnect(Collection.CART);
    const query = {email:user?.email};
    const result= await cartCollection.find(query).toArray();
     const cart = result.map(item => ({
    ...item,
    _id: item._id.toString(),
      productId: item.productId?.toString() || null,
    price: Number(item.price || 0),
    quantity: Number(item.quantity || 1),
    title: item?.title || "Unknown Product",
    image: item?.image || "/placeholder.png",
  }));

  return cart;
})
export const deleteItemsFromCart = async(id)=>{
    
  const cartCollection = await dbConnect(Collection.CART);
    const {user} = (await getServerSession(authOption))|| {} ;
    if(!user) return {success:false};

    if(id?.length !=24){
        return {success:false};
    }

    const query = {_id: new ObjectId(id)}

    const result = await  cartCollection.deleteOne(query);

    // if(Boolean(result.deletedCount)){
    //   revalidatePath("/cart")
    // }
    return {success: Boolean(result.deletedCount)}
};

export const increaseItemDb = async(id,quantity)=>{
  const {user} = (await getServerSession(authOption))|| {} ;
    if(!user) return {success:false};

    if(quantity>10){
     return {
        success:false, message: "You cannot bye 10 products at a time"
      }
    }
     const cartCollection = await dbConnect(Collection.CART);
    const query = {_id: new ObjectId(id)};
    const updatedData = {
        $inc:{
            quantity: 1
        }
      }
    const result = await  cartCollection.updateOne(query,updatedData);

    return{success:Boolean(result.modifiedCount) }

}

export const decreaseItemDb = async(id,quantity)=>{
  const {user} = (await getServerSession(authOption))|| {} ;
    if(!user) return {success:false};

    if(quantity <= 1){
     return {
        success:false, message: "quantity cannot be empty"
      }
    }
     const cartCollection = await dbConnect(Collection.CART);
    const query = {_id: new ObjectId(id)};
    const updatedData = {
        $inc:{
            quantity: 1
        }
      }
    const result = await  cartCollection.updateOne(query,updatedData);

    return{success:Boolean(result.modifiedCount) }

}