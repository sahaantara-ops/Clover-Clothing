
import CredentialsProvider from "next-auth/providers/credentials"; 
import { dbConnect, Collection } from "./dbConnect";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
// Export auth options
export const authOptions = {
  // Authentication providers
  providers: [
    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials login (email + password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const collection = await dbConnect(Collection.USERS);

        const user = await collection.findOne({
          email: credentials.email.toLowerCase(),
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email.toLowerCase(),
          role: user.role || "user",
        };
      },
    }),
  ],

  // Use JWT for sessions
  session: {
    strategy: "jwt",
  },

  // Pages (optional)
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // Callbacks
  callbacks: {
    // Add role & email to JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.email = user.email;
      }
      return token;
    },

    // Pass role & email to session
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },

    // Optional: create Google user in DB on first login
    async signIn({ user, account }) {
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
    },
  },

  // Secret for JWT
  secret: process.env.NEXTAUTH_SECRET,
};