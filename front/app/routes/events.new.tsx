import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { AxiosError } from "axios";
import { z } from "zod";
import { http } from "~/utils/http";

const validator = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/),
  location: z.string().min(1),
});


export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      date: formData.get('date'),
      location: formData.get('location'),
    };

    const body = validator.parse(data);

    console.log({ body })

    await http.post('/party', body);

    return redirect('/events');
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response(JSON.stringify({ errors: error.errors }), { status: 400 });
    else if (error instanceof AxiosError)
      return new Response(JSON.stringify({ errors: error.response?.data }), { status: error.response?.status });
    else
      return new Response('Internal server error', { status: 500 });
  }
}

export default function NewEvent() {
  return <Form method="post">
    <label>
      Name
      <input type="text" name="name" />
    </label>
    <label>
      Description
      <input type="text" name="description" />
    </label>
    <label>
      Date
      <input type="datetime-local" name="date" />
    </label>
    <label>
      Location
      <input type="text" name="location" />
    </label>
    <button type="submit">Create</button>
  </Form>
}