import { GoogleStrategy } from "remix-auth-google";
import { SocialsProvider } from "./providers";
import { UserService } from "../user/index.server";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.VITE_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:5173/auth/google/callback',
  },
  async ({ profile }) => {
    const userService = new UserService();
    return userService.Login({
      email: profile.emails![0].value,
      username: profile.displayName,
      isSSO: true,
      idSSO: profile.id,
      typeSSO: SocialsProvider.GOOGLE
    });
  }
)