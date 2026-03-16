import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import OrderCard from "../../../components/Card/OrderCard";
import { dbConnect, Collection } from "../../lib/dbConnect";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const collection = await dbConnect(Collection.ORDER);

  const orders = await collection
    .find({ email: session.user.email })
    .toArray();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}