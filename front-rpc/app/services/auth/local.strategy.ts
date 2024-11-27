import { FormStrategy } from "remix-auth-form";
import { UserService } from "../user/index.server";

export const LocalStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  if (!email || !password) {
    return null;
  }

  const userService = new UserService();
  return userService.Login({
    email,
    password,
  });
})