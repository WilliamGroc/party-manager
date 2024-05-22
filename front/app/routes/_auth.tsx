import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useNavigate, useLocation } from "@remix-run/react";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";
import { getSession } from "~/session";

const TABS = ['login', 'register'];

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  console.log(session.get('token'))

  if (session.has("token"))
    return redirect("/events");

  return null;
}

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop() || 'login';

  const handleTabChange = (tab: string) => {
    navigate(tab.toLowerCase());
  }

  return (
    <div>
      <Tabs tabs={TABS} current={currentTab} onChange={handleTabChange} />
      <div className={css({
        display: 'flex',
        justifyContent: 'center',
      })}>
        <Outlet />
      </div>
    </div>
  );
}