import { LoaderFunctionArgs } from "react-router";
import { authenticator } from "~/services/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}