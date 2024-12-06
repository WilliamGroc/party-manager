
import panda from "./panda.css?url"
import styles from "./styles.css?url"
import toasterStyle from 'react-toastify/dist/ReactToastify.css?url';

import { ActionFunctionArgs, Links, LinksFunction, LoaderFunctionArgs, Meta, MetaFunction, Outlet, redirect, Scripts, ScrollRestoration, useLoaderData, useSubmit } from "react-router";
import { ToastContainer } from 'react-toastify';
import rootStyle from './root.module.css';
import { Navbar } from "./components/navbar";
import i18next, { localeCookie } from "./i18n/i18next.server";
import { useChangeLanguage } from "remix-i18next/react";
import { CloseButtonProps } from "node_modules/react-toastify/dist/components";
import { getUser } from "./services/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: panda },
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: toasterStyle },
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
    const user = await getUser(request);
    return { isAuthenticated: !!user, locale };
  } catch (e) {
    console.error('root', e);
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

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <i className="ri-close-line" onClick={closeToast}></i>
);

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
          <ToastContainer
            position="top-right"
            closeButton={CloseButton}
          />
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
