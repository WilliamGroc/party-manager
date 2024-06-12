import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { Party } from "~/models/party";
import { http } from "~/utils/http";


export async function loader({ params }: LoaderFunctionArgs): Promise<{ event: Party }> {
  const { data } = await http.get<Party>(`/party/${params.id}`);

  return { event: data };
}

export default function EventById() {
  const loaderData = useLoaderData<typeof loader>();
  const location = useLocation();
  let currentTab = location.pathname.split("/").pop() || '';

  const TABS = [{
    name: 'Description',
    path: '',
  }, {
    name: `Guests (${loaderData.event.guests.length})`,
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
        <Outlet />
      </div>
    </div>
  );
}