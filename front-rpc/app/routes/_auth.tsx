import { LoaderFunction, Outlet, redirect, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { buildUrl } from "~/utils/url";
import { isAuthenticated } from "~/services/session.server";


export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  if (await isAuthenticated(request)) {
    throw redirect('/events');
  }
}

export default function Auth() {
  const { t } = useTranslation();
  const location = useLocation();

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