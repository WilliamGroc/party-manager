import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLocation, useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { authenticator } from "~/services/auth/auth.server";
import { buildUrl } from "~/utils/url";


export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  return authenticator.isAuthenticated(request, {
    successRedirect: "/events",
  });
}

export default function Auth() {
  const { t } = useTranslation();
  const location = useLocation();
  const params = useParams();

  const setInvitationLink = (path: string): string => {
    const searchParams = new URLSearchParams(location.search);
    const url = buildUrl(path);

    if (searchParams.has('invitation'))
      url.searchParams.set('invitation', searchParams.get('invitation') as string);
    return url.toString();
  }

  const currentTab = location.pathname.split("/").pop()?.split('?').shift() || 'login';
  const TABS = [
    { name: t('Login'), path: setInvitationLink("login"), index: 'login' },
    { name: t('Register'), path: setInvitationLink("register"), index: 'register' },
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