

import { getProducts } from "@/Action/Server/Product";

export async function GET() {
  try {
    const products = await getProducts();
    return Response.json(products);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}