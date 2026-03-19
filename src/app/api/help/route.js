import { NextResponse } from "next/server";
import { dbConnect, Collection } from "../../lib/dbConnect";

export async function POST(req) {
  const { email, question } = await req.json();

  const collection = await dbConnect(Collection.HELP);

  const newQuestion = {
    email,
    question,
    answer: "",
    status: "pending",
    createdAt: new Date(),
  };

  await collection.insertOne(newQuestion);

  return NextResponse.json({ message: "Question submitted" });
}

// Admin: get all questions
export async function GET(req) {
  const user = await getUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // continue fetching admin data...
}