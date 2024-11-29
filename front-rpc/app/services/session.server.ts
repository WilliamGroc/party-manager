import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import jwt from "jsonwebtoken";

type Token = {
  userId: number;
  email: number;
}

type SessionData = {
  email: string;
  token: string;
};

type SessionFlashData = {
  error: string;
};

export const sessionStorage = createCookieSessionStorage<{ user: SessionData }, SessionFlashData>(
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

export function decodeToken(token: string): Token {
  return jwt.decode(token) as Token;;
}

export async function getToken(request: Request): Promise<string | undefined> {
  const session = await getSession(request.headers.get("Cookie"));
  return session?.get("user")?.token;
}