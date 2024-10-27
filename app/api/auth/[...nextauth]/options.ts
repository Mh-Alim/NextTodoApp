import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../prismaClient";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }: any) => {
      return token;
    },

    session: async ({ session, token, user }: any) => {
      console.log("session callback", session);
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    signIn: async ({ user }) => {
      try {
        console.log("user", user);
        const { id, name, email, image } = user;
        const users = await prisma.user.findMany({
          where: {
            id: user.id,
          },
        });
        if (users.length > 0) return true;
        await prisma.user.create({
          data: {
            id,
            name: name ?? "na",
            email: email ?? "na",
            profileImg:
              image ??
              "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        });
        return true;
      } catch (err) {
        console.log("Error while signing in: ", err);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
