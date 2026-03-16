import { dbConnect, Collection } from "@/app/lib/dbConnect";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) return new Response("Email required", { status: 400 });

    const collection = await dbConnect(Collection.ORDER);
    const orders = await collection.find({ userEmail: email }).toArray();

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}