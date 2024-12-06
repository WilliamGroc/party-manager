import { LoaderFunctionArgs, Outlet, redirect, useLoaderData, useLocation } from "react-router";
import { PartyResponse } from "proto/party/PartyResponse";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { GuestService } from "~/services/guest/index.server";
import { PartyService } from "~/services/party/index.server";
import { decodeToken, getToken, isAuthenticated } from "~/services/session.server";
import { handle } from "~/utils/handle";

export type LoaderType = { event: PartyResponse, isOwner: boolean, userId: number };

export async function loader({ params, request }: LoaderFunctionArgs) {
  return handle<Response | { event: PartyResponse, isOwner: boolean, userId: number }>(async () => {
    const { searchParams } = new URL(request.url);

    const token = await getToken(request);

    const partyService = new PartyService(token);
    const guestService = new GuestService(token);

    if (searchParams.has('invitation')) {
      const event = await partyService.GetSharedParty({ link: params.id });

      if (await isAuthenticated(request)) {
        await guestService.AddGuestWithLink({ link: params.id });
        return redirect(`/events/${event.id}`);
      }

      return {
        event,
        isOwner: false,
        userId: 0
      };
    }

    const { userId } = decodeToken(token!);

    const event = await partyService.GetParty({ id: Number(params.id) });

    return {
      event,
      isOwner: event.hostId === userId,
      userId
    };
  });
}

export default function EventById() {
  const { t } = useTranslation();
  const loaderData = useLoaderData<LoaderType>();
  const location = useLocation();

  let currentTab = `${location.pathname.split("/").pop() || '.'}${location.search}`;

  const TABS = [{
    name: t('Description'),
    path: `.${location.search}`,
    index: '.'
  }, {
    name: `${t('Guests')} (${loaderData.event.guests?.length})`,
    path: `guests${location.search}`,
    index: 'guests'
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
        <Outlet />
      </div>
    </div>
  );
}