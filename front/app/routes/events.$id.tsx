
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Party } from "~/models/party";
import { dateServerParse } from "~/utils/date";
import { handleAction, http } from "~/utils/http";
import { format } from 'date-fns'
import { css } from "styled-system/css";
import { fr } from "date-fns/locale";
import { z } from "zod";
import { GuestRow } from "~/components/guestRow";
import { Present } from "~/models/guest";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ event: Party }> {
  const { data } = await http.get<Party>(`/party/${params.id}`);

  return { event: data };
}

const actionValidator = z.object({
  username: z.string(),
  email: z.string().email().optional()
});

export async function action({ request, params }: ActionFunctionArgs) {
  return handleAction(async () => {
    const formData = await request.formData();

    const body = actionValidator.parse({
      username: formData.get('username') as string,
      email: formData.get('email') as string
    });

    await http.post(`/guest/party/${params.id}`, body);

    return true;
  });
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

  return <div>
    <div className={css({ display: "flex", justifyContent: "space-between" })}>
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
    <div>
      <h2>Guests (Present: {event.guests.filter(guest => guest.present === Present.OK).length}, No answered: {event.guests.filter(guest => guest.present === Present.NO_ANSWER || !guest.present).length})</h2>
      <Form method="post" className={css({
        display: 'flex',
        "& > label": {
          marginRight: "1rem"
        }
      })}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Email
          <input type="text" name="email" />
        </label>
        <div className={css({ width: '140px', display: 'flex', alignItems: 'flex-end' })}>
          <button type="submit">Add</button>
        </div>
      </Form>
      <div>
        {event.guests.map(guest => <GuestRow
          key={guest.id}
          guest={guest}
          onDelete={() => { }}
          onSetPresence={() => { }}
        />)}
      </div>
    </div>
  </div>
}