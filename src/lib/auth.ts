import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDB } from "@/db/mongo";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the provided email ");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid Password");
        }

        const validRoles = ["Student", "Admin"];
        if (!validRoles.includes(user.role)) {
          throw new Error("unauthorized role");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          usename: user.username || null,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email ?? null,
        username: (token.username as string) ?? null, // This should match the variable name
        role: token.role as string,
      };
      return session;
    },
  },
};
