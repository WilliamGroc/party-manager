import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { getSession } from "~/session";


export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token"))
    return redirect("/events");

  return null;
}

export default function Auth() {
  const { t } = useTranslation();
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop() || 'login';
  const TABS = [
    { name: t('Login'), path: 'login' },
    { name: t('Register'), path: 'register' }
  ];

  return (
    <div>
      <Tabs tabs={TABS} current={currentTab} />
      <div className={css({
        display: 'flex',
        justifyContent: 'center',
      })}>
        <Outlet />
      </div>
    </div>
  );
}