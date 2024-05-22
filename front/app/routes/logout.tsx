import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession, commitSession } from "~/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  session.unset("token");

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}