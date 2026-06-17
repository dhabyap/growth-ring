import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY!,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET!,
      version: "2.0",
      userinfo: {
        url: "https://api.twitter.com/2/users/me",
        params: { "user.fields": "profile_image_url" },
      },
      profile({ data }: { data: { id: string; name: string; username: string; profile_image_url?: string } }) {
        return {
          id: data.id,
          name: data.name,
          email: null,
          image: data.profile_image_url,
          username: data.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.xId = profile.id;
        token.xUsername = (profile as any).username?.toLowerCase();
        token.xDisplayName = profile.name;
        token.xAvatar = (profile.image || "").replace("_normal", "");
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.xId = token.xId;
        session.user.xUsername = token.xUsername;
        session.user.xDisplayName = token.xDisplayName;
        session.user.xAvatar = token.xAvatar;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After OAuth callback redirect to welcome page
      if (url.startsWith(baseUrl + "/api/auth/callback/twitter")) {
        return baseUrl + "/auth/callback";
      }
      // Allow relative URLs
      if (url.startsWith("/")) return baseUrl + url;
      // External URLs: allow if same origin
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
