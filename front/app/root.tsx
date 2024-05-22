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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: panda },
  { rel: "stylesheet", href: styles },
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
        <nav className={rootStyle['navbar-container']}>
          <div>
            <Link to="/events" className={rootStyle['navbar-title']}>
              Party planner
            </Link>
          </div>

          <ul className={rootStyle.navbar}>
            {!data?.isAuthenticated ? (
              <li>
                <Link to="/login">
                  Authentication
                </Link>
              </li>) : (
              <>
                <li>
                  <Link to="/events">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/logout">
                    Logout
                  </Link>
                </li>
              </>
            )
            }
          </ul>
        </nav>
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
