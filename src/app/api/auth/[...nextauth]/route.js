import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect, Collection } from "@/app/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions = {   
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const collection = await dbConnect(Collection.USERS);

        const email = credentials.email.toLowerCase();

        const user = await collection.findOne({ email });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const collection = await dbConnect(Collection.USERS);

          const existingUser = await collection.findOne({
            email: user.email.toLowerCase(),
          });

          if (!existingUser) {
            await collection.insertOne({
              provider: "google",
              name: user.name,
              email: user.email.toLowerCase(),
              image: user.image,
              role: "user",
              createdAt: new Date(),
            });
          }
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };