import { Link, LoaderFunctionArgs, Outlet, redirect, useLoaderData, useParams } from "react-router";
import { css } from "styled-system/css";
import { compareAsc, formatDistanceToNow } from 'date-fns'
import { dateLocales, dateServerParse } from "~/utils/date";
import { useTranslation } from "react-i18next";
import i18next from "~/i18n/i18next.server";
import { enUS } from "date-fns/locale/en-US";
import { handle } from "~/utils/handle";
import { PartyService } from "~/services/party/index.server";
import { PartyResponse } from "proto/party/PartyResponse";
import { getUserId, isAuthenticated } from "~/services/userSession.server";

type LoaderData = {
  isAuthenticated: boolean;
  events: PartyResponse[];
  locale: 'en' | 'fr';
};

export async function loader({ request }: LoaderFunctionArgs) {
  return handle<LoaderData | Response>(async () => {
    const { searchParams } = new URL(request.url);
    const locale = await (i18next.getLocale(request) || 'en') as 'en' | 'fr';

    if (await isAuthenticated(request)) {
      const userId = await getUserId(request);
      const partyService = new PartyService();
      const { parties } = await partyService.GetAllParty({ userId });

      return {
        isAuthenticated: true,
        events: parties || [],
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

    return redirect('/auth');
  });
}

export default function () {
  const { t } = useTranslation();
  const { events, locale, isAuthenticated } = useLoaderData<LoaderData>();
  const params = useParams<{ id: string }>();

  return (
    <div className={css({ display: "flex" })} >
      <div className={css({
        display: "flex",
        flexDir: "column",
        w: "1/5",
        h: "calc(100vh - 80px)",
        overflow: "auto"
      })}>
        {
          isAuthenticated && (<div className={css({ w: "184px" })}>
            <Link to="/events/new"><button>{t('Create Event')}</button></Link>
          </div>)
        }
        <div className={css({
          display: "flex",
          flexDir: "column"
        })}>
          {events.sort((a, b) => compareAsc(dateServerParse(a.date!), dateServerParse(b.date!)))
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
                  <div>
                    {formatDistanceToNow(dateServerParse(event.date!), { addSuffix: true, locale: dateLocales[locale] || enUS })}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className={css({
        w: "4/5",
        padding: "12",
        paddingTop: 0,
        h: "calc(100vh - 80px)"
      })}>
        <Outlet />
      </div>
    </div>
  );
}