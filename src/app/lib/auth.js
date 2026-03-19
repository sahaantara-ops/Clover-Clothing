import { cookies } from "next/headers";
import { ADMIN_EMAILS } from "./admin";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    // Example: decode token to get user email
    // Here just a fake decode, replace with real JWT decode if you have one
    const userEmail = token; // in real case: decode(token).email

    const isAdmin = ADMIN_EMAILS.includes(userEmail);

    return {
      email: userEmail,
      role: isAdmin ? "admin" : "user",
    };
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return null;
  }
}