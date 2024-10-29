import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";

import panda from "./panda.css?url"
import styles from "./styles.css?url"

import { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs, MetaFunction, json, redirect } from "@remix-run/node";

import rootStyle from './root.module.css';
import { getSession } from "./services/session.server";
import { Navbar } from "./components/navbar";
import i18next, { localeCookie } from "./i18n/i18next.server";
import { useChangeLanguage } from "remix-i18next/react";
import { authenticator } from "./services/auth.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: panda },
  { rel: "stylesheet", href: styles },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
  }
];

export const meta: MetaFunction = () => {
  return [
    { title: "Party planner" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request) || 'en';

  try {
    const user = await authenticator.isAuthenticated(request);

    return json({ isAuthenticated: !!user, locale }, { headers: { "Set-Cookie": await localeCookie.serialize(locale) } });
  } catch (e) {
    console.error(e);
    return { isAuthenticated: false, locale };
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const locale = formData.get('locale') as 'fr' | 'en';

  return redirect("/", {
    headers: {
      "Set-Cookie": await localeCookie.serialize(locale),
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  const sumbit = useSubmit();

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    const formData = new FormData();
    formData.append('locale', lang);
    sumbit(formData, { method: 'POST' });
  }

  return (
    <html lang={data?.locale || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar isAuthenticated={data?.isAuthenticated} setLanguage={handleLanguageChange} />
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
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);

  return <Outlet />;
}
