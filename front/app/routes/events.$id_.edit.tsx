import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Party } from "~/models/party";
import { dateServerParse } from "~/utils/date";
import { http } from "~/utils/http";
import { format } from 'date-fns'
import { z } from "zod";
import { AxiosError } from "axios";

export async function loader({ params }: LoaderFunctionArgs): Promise<{ event: Party }> {
  const { data } = await http.get(`/party/${params.id}`);

  return { event: data };
}

const bodyValidator = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const id = params.id;

    const body = bodyValidator.parse({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
    })

    await http.put(`/party/${id}`, body);

    return redirect(`/events/${id}`);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify({ errors: e.errors }), { status: 400 });
    }
    else if (e instanceof AxiosError) {
      return new Response(e.response?.data, { status: e.response?.status });
    }
    return new Response("Something went wrong", { status: 500 });
  }
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