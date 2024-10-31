import { FormStrategy } from "remix-auth-form";
import { login } from "./auth.server";

export const LocalStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  if (!email || !password) {
    return null;
  }

  return login({ email, password });
})