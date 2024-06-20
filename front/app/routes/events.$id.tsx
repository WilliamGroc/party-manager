import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { Party } from "~/models/party";
import { getSession } from "~/session";
import { http } from "~/utils/http";


export async function loader({ request, params }: LoaderFunctionArgs) {
  const { data } = await http.get<Party>(`/party/${params.id}`);

  const session = await getSession(request.headers.get("Cookie"));
  const userEmail = session.get('email');

  const isGuest = data.guests.some(guest => guest.email === userEmail);

  return { event: data, isGuest };
}

export default function EventById() {
  const { t } = useTranslation();
  const loaderData = useLoaderData<typeof loader>();
  const location = useLocation();
  let currentTab = location.pathname.split("/").pop() || '';

  const TABS = [{
    name: t('Description'),
    path: '',
  }, {
    name: `${t('Guests')} (${loaderData.event.guests.length})`,
    path: 'guests',
  }];

  if (!TABS.map(tab => tab.path).includes(currentTab)) {
    currentTab = '';
  }

  return (
    <div>
      <Tabs tabs={TABS} current={currentTab} />
      <div className={css({
        w: '100%'
      })}>
        Is guest: {String(loaderData.isGuest)}
        <Outlet />
      </div>
    </div>
  );
}