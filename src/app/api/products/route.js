// app/api/products/route.js
import { dbConnect, Collections } from "@/app/lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect(Collections.PRODUCTS);
    const products = await collection.find({}).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}