import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect, Collections } from "@/app/lib/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [

      GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const collection = await dbConnect(Collections.USER);

        const user = await collection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // ✅ Save Google user to MongoDB if not exists
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const collection = await dbConnect(Collections.USER);

        const existingUser = await collection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await collection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            createdAt: new Date(),
          });
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});  

export { handler as GET, handler as POST };