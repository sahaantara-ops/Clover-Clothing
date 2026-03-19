import { NextResponse } from "next/server";
import { dbConnect, Collection } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const { answer } = await req.json();

  console.log("ID:", id);
  console.log("Answer:", answer);
    const user = await getUserFromRequest(req);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }


  const collection = await dbConnect(Collection.HELP);

  const result = await collection.updateOne(
  { _id: new ObjectId(id) },
  {
    $set: {
      answer,
      status: "answered",
    },
  }
);

console.log("Update Result:", result);
  console.log("Update Result:", result);
  return NextResponse.json({ message: "Answered successfully" });
}