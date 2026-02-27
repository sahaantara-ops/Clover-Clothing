import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect, Collections } from "@/app/lib/dbConnect";
import bcrypt from "bcryptjs";

// GET handler needed for /api/auth/error
export const GET = (req) => NextAuth(req);

export const POST = (req) =>
  NextAuth(req, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: { email: {}, password: {} },
        async authorize(credentials) {
          const collection = await dbConnect(Collections.USER);
          const user = await collection.findOne({ email: credentials.email });
          if (!user) return null;
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;
          return { id: user._id.toString(), email: user.email, name: user.name };
        },
      }),
    ],
    pages: {
      error: "/auth/login", // redirect failed logins to login page
    },
    session: { strategy: "jwt" },
    debug: process.env.NODE_ENV === "development",
  });