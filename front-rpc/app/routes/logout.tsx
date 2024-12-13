import { LoaderFunctionArgs, redirect } from "react-router";
import { logoutKeycloakEndpoint } from "~/services/auth/keycloak.strategy";
import { userSessionStorage } from "~/services/userSession.server";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await userSessionStorage.getSession(request.headers.get("cookie"));
    return redirect(logoutKeycloakEndpoint(), {
      headers: { "Set-Cookie": await userSessionStorage.destroySession(session) },
    });
  } catch (e) {
    console.error(e)
  }
}