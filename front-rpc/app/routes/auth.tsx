import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useSubmit } from "react-router";
import { isAuthenticated } from "~/services/userSession.server";
import { authenticator } from "~/services/auth/auth.server";
import { eventSessionStorage } from "~/services/eventSession.server";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const invitation = new URL(request.url).searchParams.get("invitation");

  if (invitation) {
    const eventSession = await eventSessionStorage.getSession(request.headers.get("Cookie"));

    if (eventSession.get("invitation") !== invitation) {
      eventSession.set("invitation", invitation);
      throw redirect(".", { headers: { "Set-Cookie": await eventSessionStorage.commitSession(eventSession) } });
    }
  }

  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  if (await isAuthenticated(request)) {
    throw redirect('/events');
  }
  else {
    await authenticator.authenticate("keycloak", request)
  }
}

export default function Auth() {
  const submit = useSubmit();

  useEffect(() => {
    const data = new FormData();
    submit(data, {
      method: 'post'
    });
  }, []);

  return <div>Redirecting...</div>;
}

