import { createCookieSessionStorage } from "react-router";
import jwt from "jsonwebtoken";

export type SessionUser = {
  email: string;
  id: number;
};

type SessionFlashData = {
  error: string;
};

export const userSessionStorage = createCookieSessionStorage<{ user: SessionUser }, SessionFlashData>(
  {
    cookie: {
      name: "__usersession",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  }
);

type AccessToken = {
  exp: number,
  iat: number,
  auth_time: number,
  jti: string,
  iss: string,
  aud: string,
  sub: string,
  typ: string,
  azp: string,
  sid: string,
  acr: string,
  'allowed-origins': string[],
  realm_access: {
    roles: string[]
  },
  resource_access: { account: { roles: string[] } },
  scope: string,
  email_verified: boolean,
  name: string,
  preferred_username: string,
  given_name: string,
  family_name: string,
  email: string
}

export function decodeToken(token: string): AccessToken {
  return jwt.decode(token) as AccessToken;;
}

export async function getUserId(request: Request): Promise<number | undefined> {
  const session = await userSessionStorage.getSession(request.headers.get("Cookie"));
  return session?.get("user")?.id;
}

export async function isAuthenticated(request: Request): Promise<boolean> {
  const session = await userSessionStorage.getSession(request.headers.get("Cookie"));
  return !!session?.get("user");
}

export async function getUser(request: Request): Promise<SessionUser | undefined> {
  const session = await userSessionStorage.getSession(request.headers.get("Cookie"));
  return session?.get("user");
}