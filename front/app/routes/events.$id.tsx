import { LoaderFunctionArgs, redirect, TypedResponse } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { Party } from "~/models/party";
import { decodeToken, validToken } from "~/session";
import { http } from "~/utils/http";


export async function loader({ params, request }: LoaderFunctionArgs): Promise<{ event: Party, isOwner: boolean } | TypedResponse<never>> {
  const { searchParams } = new URL(request.url);

  if (searchParams.has('invitation')) {
    const isAuthenticated = await validToken(request);
    
    if (isAuthenticated) {
      await http.put(`/guest/link/${params.id}`)
    }

    const { data } = await http.get<Party>(`/party/${params.id}/shared`);
    
    if(isAuthenticated) 
      return redirect(`/events/${params.id}`);

    return {
      event: data,
      isOwner: false
    };
  }

  const { id: userId } = await decodeToken(request);

  const { data } = await http.get<Party>(`/party/${params.id}`);
  return {
    event: data,
    isOwner: data.hostId === userId
  };
}

export default function EventById() {
  const { t } = useTranslation();
  const loaderData = useLoaderData<typeof loader>();
  const location = useLocation();

  let currentTab = `${location.pathname.split("/").pop() || '.'}${location.search}`;

  const TABS = [{
    name: t('Description'),
    path: `.${location.search}`,
  }, {
    name: `${t('Guests')} (${loaderData.event.guests.length})`,
    path: `guests${location.search}`,
  }];

  if (!TABS.map(tab => tab.path).includes(currentTab)) {
    currentTab = `.${location.search}`;
  }

  return (
    <div>
      <Tabs tabs={TABS} current={currentTab} />
      <div className={css({
        w: '100%'
      })}>
        Is owner: {String(loaderData.isOwner)}
        <Outlet />
      </div>
    </div>
  );
}