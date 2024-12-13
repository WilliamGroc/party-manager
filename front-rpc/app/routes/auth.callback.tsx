import { LoaderFunctionArgs, redirect } from "react-router";
import { authenticator } from "~/services/auth/auth.server";
import { eventSessionStorage } from "~/services/eventSession.server";
import { userSessionStorage } from "~/services/userSession.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.authenticate("keycloak", request);
  let redirectUrl = '/';

  const eventSession = await eventSessionStorage.getSession(request.headers.get("cookie"));
  const invitation = eventSession.get("invitation");
  if (invitation)
    redirectUrl = `/events/${invitation}?invitation`;

  const userSession = await userSessionStorage.getSession(request.headers.get("cookie"));
  userSession.set("user", user);

  throw redirect(redirectUrl, {
    headers: { "Set-Cookie": await userSessionStorage.commitSession(userSession) },
  });
};