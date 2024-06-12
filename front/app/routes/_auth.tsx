import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { getSession } from "~/session";

const TABS = [
  { name: 'login', path: 'login' },
  { name: 'register', path: 'register' }
];

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  console.log(session.get('token'))

  if (session.has("token"))
    return redirect("/events");

  return null;
}

export default function Auth() {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop() || 'login';

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