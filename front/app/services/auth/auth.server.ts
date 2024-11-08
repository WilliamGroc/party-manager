import { Authenticator } from "remix-auth";
import { sessionStorage } from "../session.server";
import { http } from "~/utils/http";
import { LocalStrategy } from "./local.strategy";
import { googleStrategy } from "./google.strategy";
import { SocialsProvider } from "./providers";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<SessionUser | null>(sessionStorage);

export type SessionUser = {
  email: string;
  token: string;
}

// Tell the Authenticator to use the form strategy
authenticator.use(
  LocalStrategy,
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

authenticator.use(googleStrategy)

export type LoginPayload = {
  email: string,
} & {
  password: string,
} | {
  isSSO: boolean,
  idSSO: string,
  typeSSO: SocialsProvider,
  username: string,
}

export async function login(payload: LoginPayload) {
  const { data } = await http.post<SessionUser>(null, '/user/login', payload);
  return data;
}

export async function authenticateLocal(request: Request) {
  const searchParams = new URLSearchParams(request.url.split('?')[1]);

  let successRedirect = "/events", failureRedirect = "/login";

  if (searchParams.has('invitation')) {
    const invitation = searchParams.get('invitation');
    successRedirect = `/events/${invitation}?invitation`;
    failureRedirect = `/login?invitation=${invitation}`;
  }

  return authenticator.authenticate("user-pass", request, {
    successRedirect,
    failureRedirect,
  });
}