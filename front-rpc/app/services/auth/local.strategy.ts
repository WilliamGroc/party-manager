import { FormStrategy } from "remix-auth-form";
import { UserService } from "../user/index.server";
import { SessionUser } from "../session.server";

export const LocalStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  if (!email || !password) {
    return null;
  }

  const userService = new UserService();
  const user = await userService.Login({
    email,
    password,
  })

  return user as SessionUser;
})