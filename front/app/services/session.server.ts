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
      httpOnly: true,
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