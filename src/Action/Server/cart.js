"use server"

const { dbConnect, Collection } = require("@/app/lib/dbConnect")


const cartCollection = dbConnect(Collection.CART);

export const handleCart = async({product, inc = true}) =>{
    
}