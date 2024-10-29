import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { http } from "~/utils/http";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<SessionUser | null>(sessionStorage);

export type SessionUser = {
  email: string;
  token: string;
}

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email || !password) {
      return null;
    }

    const user = await login(email, password);
    console.log(user)
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

export async function login(email: string, password: string) {
  const { data } = await http.post<SessionUser>(null, '/user/login', {
    email,
    password
  });

  return data;
}