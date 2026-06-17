import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      xId?: string;
      xUsername?: string;
      xDisplayName?: string;
      xAvatar?: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    id_str: string;
    screen_name: string;
    name: string;
    description?: string;
    profile_image_url_https?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    xId?: string;
    xUsername?: string;
    xDisplayName?: string;
    xAvatar?: string;
  }
}
