import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import panda from "./panda.css?url"
import styles from "./styles.css?url"

import { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import rootStyle from './root.module.css';
import { getSession } from "./session";
import { setAuthorizationToken } from "./utils/http";
import { Navbar } from "./components/navbar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: panda },
  { rel: "stylesheet", href: styles },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
  }
];

export async function loader({ request }: LoaderFunctionArgs) {
  try {

    const session = await getSession(request.headers.get("Cookie"));

    const token = session.get('token');
    console.log({ token })

    if (token)
      setAuthorizationToken(token);

    return { isAuthenticated: !!token };
  } catch (e) {
    console.error(e);
    return { isAuthenticated: false };
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "Party planner" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<ReturnType<typeof loader>>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar isAuthenticated={data.isAuthenticated} />
        <div className={rootStyle['body-container']}>
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
