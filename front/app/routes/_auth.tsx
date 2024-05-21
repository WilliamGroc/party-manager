import { Outlet, useNavigate, useLocation } from "@remix-run/react";
import { css } from "styled-system/css";
import { Tabs } from "~/components/tabs";

const TABS = ['login', 'register'];

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