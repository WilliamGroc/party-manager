import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Party } from "~/models/party";
import { dateServerParse } from "~/utils/date";
import { http } from "~/utils/http";
import { format } from 'date-fns'

export async function loader({ params }: LoaderFunctionArgs): Promise<{ event: Party }> {
  const { data } = await http.get(`/party/${params.id}`);

  return { event: data };
}

export default function UpdateEvent() {
  const { event } = useLoaderData<{ event: Party }>();

  return <Form method="post">
    <label>
      Name
      <input type="text" key={`name_${event.id}`} name="name" defaultValue={event.name} />
    </label>
    <label>
      Description
      <input type="text" key={`description_${event.id}`} name="description" defaultValue={event.description} />
    </label>
    <label>
      Date
      <input type="datetime-local" key={`date_${event.id}`} name="date" defaultValue={format(dateServerParse(event.date), 'yyyy-MM-dd HH:mm')} />
    </label>
    <label>
      Location
      <input type="text" key={`location_${event.id}`} name="location" defaultValue={event.location} />
    </label>
    <button type="submit">Update</button>
  </Form>
}