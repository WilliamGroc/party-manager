import { Authenticator } from "remix-auth";
import { sessionStorage } from "../session.server";
import { LocalStrategy } from "./local.strategy";
import { redirect } from "react-router";
import { SessionUser } from "../session.server";
import { SocialsProvider } from "./providers";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<SessionUser | null>();


// Tell the Authenticator to use the form strategy
authenticator.use(
  LocalStrategy,
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

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

export async function authenticateLocal(request: Request) {
  const searchParams = new URLSearchParams(request.url.split('?')[1]);

  let successRedirect = "/events", failureRedirect = "/login";

  if (searchParams.has('invitation')) {
    const invitation = searchParams.get('invitation');
    successRedirect = `/events/${invitation}?invitation`;
    failureRedirect = `/login?invitation=${invitation}`;
  }

  const user = await authenticator.authenticate("user-pass", request);

  if (user) {
    const session = await sessionStorage.getSession(request.headers.get("cookie"));
    session.set("user", user);
    throw redirect(successRedirect, {
      headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
  }

  throw redirect(failureRedirect);
}