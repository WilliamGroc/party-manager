import { LoaderFunctionArgs, TypedResponse, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { css } from "styled-system/css";
import { Party } from "~/models/party";
import { http } from "~/utils/http";
import { compareAsc, formatDistanceToNow } from 'date-fns'
import { dateLocales, dateServerParse } from "~/utils/date";
import { useTranslation } from "react-i18next";
import i18next from "~/i18n/i18next.server";
import { enUS } from "date-fns/locale/en-US";
import { authenticator } from "~/services/auth.server";

type LoaderData = {
  isAuthenticated: boolean;
  events: Party[];
  locale: 'en' | 'fr';
};

export async function loader({ request }: LoaderFunctionArgs): Promise<any> {
  const { searchParams } = new URL(request.url);
  const locale = await (i18next.getLocale(request) || 'en') as 'en' | 'fr';

  try {
    const user = await authenticator.isAuthenticated(request);
    if (user) {
      const { data } = await http.get(request, '/party');

      return {
        isAuthenticated: true,
        events: data,
        locale
      };
    }
    else if (searchParams.has('invitation')) {
      return {
        isAuthenticated: false,
        events: [],
        locale
      };
    }
    return redirect('/login');
  } catch (e) {
    console.error(e);
    return redirect('/login');
  }
}

export default function Events() {
  const { t } = useTranslation();
  const { events, locale, isAuthenticated } = useLoaderData<LoaderData>();
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
        {
          isAuthenticated && (<div className={css({ w: "160px" })}>
            <Link to="/events/new"><button>{t('Create Event')}</button></Link>
          </div>)
        }
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
                  <div>{formatDistanceToNow(dateServerParse(event.date), { addSuffix: true, locale: dateLocales[locale] || enUS })}</div>
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