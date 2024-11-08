import { GoogleProfile, GoogleStrategy } from "remix-auth-google";
import { login } from "./auth.server"
import { SocialsProvider } from "./providers";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.VITE_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:5173/auth/google/callback',
  },
  async ({ profile }) => {
    return await login({
      email: profile.emails![0].value,
      username: profile.displayName,
      isSSO: true,
      idSSO: profile.id,
      typeSSO: SocialsProvider.GOOGLE
    });
  }
)