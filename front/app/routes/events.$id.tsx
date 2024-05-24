
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Party } from "~/models/party";
import { dateServerParse } from "~/utils/date";
import { http } from "~/utils/http";
import { format } from 'date-fns'
import { css } from "styled-system/css";
import { fr } from "date-fns/locale";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ event: Party }> {
  const { data } = await http.get(`/party/${params.id}`);

  return { event: data };
}

const labelStyle = css({
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem"
})

const titleStyle = css({
  fontSize: "1rem",
  borderBottom: "1px solid #ccc",
  marginBottom: "1rem"
})

export default function EventById() {
  const { event } = useLoaderData<{ event: Party }>();

  return <div className={css({ display: "flex", justifyContent: "space-between" })}>
    <div className={css({ flex: 1, maxWidth: "4/5" })}>
      <label className={labelStyle}>
        <div className={titleStyle}>Name</div>
        <div>{event.name}</div>
      </label>
      <label className={labelStyle}>
        <div className={titleStyle}>Description</div>
        <div>{event.description}</div>
      </label>
      <label className={labelStyle}>
        <div className={titleStyle}>Date</div>
        <div>{format(dateServerParse(event.date), "iii dd MMM yyyy HH:mm", { locale: fr })}</div>
      </label>
      <label className={labelStyle}>
        <div className={titleStyle}>Location</div>
        <div>
          {event.location}
        </div>
      </label>
    </div>
    <Link to={`/events/${event.id}/edit`}><button>Edit</button></Link>
  </div>
}