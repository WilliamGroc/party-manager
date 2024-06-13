import { LoaderFunctionArgs, TypedResponse, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { css } from "styled-system/css";
import { Party } from "~/models/party";
import { getSession } from "~/session";
import { http } from "~/utils/http";
import { compareAsc, formatDistanceToNow, parse } from 'date-fns'
import { fr } from 'date-fns/locale'
import { dateServerParse } from "~/utils/date";
import { useTranslation } from "react-i18next";

type LoaderData = {
  isAuthenticated: boolean;
  events: Party[];
};

export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData | TypedResponse<never>> {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has('token')) {
    const { data } = await http.get('/party');
    return { isAuthenticated: session.has('token'), events: data };
  }

  return redirect('/login');
}

export default function Events() {
  const { t } = useTranslation();
  const { events } = useLoaderData<LoaderData>();
  const params = useParams<{ id: string }>();

  return (
    <div className={css({ display: "flex" })} >
      <div className={css({
        display: "flex",
        flexDir: "column",
        w: "1/5",
        h: "calc(100vh - 56px)",
        overflow: "auto"
      })}>
        <div className={css({ w: "160px" })}>
          <Link to="/events/new"><button>{t('Create Event')}</button></Link>
        </div>
        <div className={css({
          display: "flex",
          flexDir: "column"
        })}>
          {events.sort((a, b) => compareAsc(dateServerParse(a.date), dateServerParse(b.date)))
            .map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <div className={css({
                  padding: "4",
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid #ccc",
                  cursor: "pointer",
                  backgroundColor: event.id === Number(params.id) ? "lgreen" : "transparent",
                  "&:hover": {
                    backgroundColor: "secondary"
                  }
                })}>
                  <div>
                    {event.name}
                  </div>
                  <div>{formatDistanceToNow(dateServerParse(event.date), { addSuffix: true, locale: fr })}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className={css({
        w: "4/5",
        padding: "12",
        paddingTop: 0,
        overflow: "auto",
        h: "calc(100vh - 56px)"
      })}>
        <Outlet />
      </div>
    </div>
  );
}