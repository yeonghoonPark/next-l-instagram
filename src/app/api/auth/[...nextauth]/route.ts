import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],

  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      // email이 존재 하지 않을 수 없는데..
      // email이 존재 하지 않을 순 없지만 타입의 정보때문에 이런 if문을 작성했다고하는데 이럴거면 차라리 OAuthUser에서 타입을 null이 올 수 있다고 정해주는게 맞지 않나
      if (!email) {
        return false;
      }
      addUser({
        id,
        username: email.split("@")[0],
        name: name || "",
        email,
        image,
      });
      return true;
    },

    async session({ session }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] ?? "",
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
});

export { authOptions as GET, authOptions as POST };
