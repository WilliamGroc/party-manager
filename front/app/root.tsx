import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import panda from "./panda.css?url"
import styles from "./styles.css?url"

import { LinksFunction } from "@remix-run/node";

import rootStyle from './root.module.css';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: panda },
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
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
            <Link to="/" className={rootStyle['navbar-title']}>
              Party planner
            </Link>
          </div>
          <ul className={rootStyle.navbar}>
            <li>
              <Link to="/login">
                Authentication
              </Link>
            </li>
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
