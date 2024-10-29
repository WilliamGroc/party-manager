import { LoaderFunctionArgs, redirect, TypedResponse } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { Party } from "~/models/party";
import { authenticator } from "~/services/auth.server";
import { decodeToken } from "~/services/session.server";
import { http } from "~/utils/http";


export async function loader({ params, request }: LoaderFunctionArgs): Promise<{ event: Party, isOwner: boolean, userId: number } | TypedResponse<never>> {
  const { searchParams } = new URL(request.url);

  const user = await authenticator.isAuthenticated(request);

  if (searchParams.has('invitation')) {
    if (user) {
      await http.put(request, `/guest/link/${params.id}`)
    }

    const { data } = await http.get<Party>(request, `/party/${params.id}/shared`);

    if (user)
      return redirect(`/events/${params.id}`);

    return {
      event: data,
      isOwner: false,
      userId: 0
    };
  }

  const { id: userId } = await decodeToken(user!.token);

  const { data } = await http.get<Party>(request, `/party/${params.id}`);
  return {
    event: data,
    isOwner: data.hostId === userId,
    userId
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