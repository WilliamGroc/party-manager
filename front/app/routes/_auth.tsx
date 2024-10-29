import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { authenticator } from "~/services/auth.server";


export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  return authenticator.isAuthenticated(request, {
    successRedirect: "/events",
  });
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