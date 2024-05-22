import { LoaderFunctionArgs, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/session";

export const meta: MetaFunction = () => {
  return [
    { title: "Party planner" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return { isAuthenticated: session.has('token') };
}

export default function Index() {
  const { isAuthenticated } = useLoaderData<ReturnType<typeof loader>>();

  return (
    <div>
      {isAuthenticated && <div>Logged in</div>}
    </div>
  );
}
