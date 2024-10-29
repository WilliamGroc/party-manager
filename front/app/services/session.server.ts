import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import jwt from "jsonwebtoken";

type Token = {
  id: number;
}

type SessionData = {
  email: string;
  token: string;
};

type SessionFlashData = {
  error: string;
};

export const sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>(
  {
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      // all of these are optional
      // domain: "remix.run",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      // maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  }
);

export const { getSession, commitSession, destroySession } = sessionStorage;

export async function decodeToken(token: string): Promise<Token> {
  return jwt.decode(token!) as Token;
}