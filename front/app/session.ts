// app/sessions.ts
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

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
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

async function decodeToken(request: Request): Promise<Token> {
  const session = await getSession(request.headers.get("Cookie"));

  if(session.has("token")) {
    return jwt.decode(session.get("token")!) as Token;
  }

  throw new Error("No token found");
}

async function validToken(request: Request): Promise<boolean> {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if(session.has("token")) {
      return !!jwt.verify(session.get("token")!, import.meta.env.VITE_JWT_SECRET);
    }

    return false;
  } catch {
    return false;
  }
}

export { getSession, commitSession, destroySession, decodeToken, validToken };
