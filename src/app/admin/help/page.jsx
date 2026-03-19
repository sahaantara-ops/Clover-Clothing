import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/auth"; // server-side auth

import ClientAdminHelp from "./ClientAdminHelp"; // your current client component

export default async function AdminHelpPage() {
  const user = await getUser(); // async is fine in server component

  if (!user || user.role !== "admin") {
    redirect("/"); // non-admin redirected
  }

  return <ClientAdminHelp />; // render your UI
}