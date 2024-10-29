import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { Party } from "~/models/party";
import { dateServerParse, dateToServerFormat } from "~/utils/date";
import { handleAction, http } from "~/utils/http";
import { format } from 'date-fns'
import { z } from "zod";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { useTranslation } from "react-i18next";

export async function loader({ params, request }: LoaderFunctionArgs): Promise<{ event: Party }> {
  const { data } = await http.get<Party>(request, `/party/${params.id}`);
  return { event: data };
}

const bodyValidator = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  return handleAction(async () => {
    const formData = await request.formData();
    const id = params.id;

    const body = bodyValidator.parse({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
    });

    await http.put(request, `/party/${id}`, body);

    return redirect(`/events/${id}`);
  });
}

export default function UpdateEvent() {
  const { t } = useTranslation();
  const { event } = useLoaderData<{ event: Party }>();
  const actionData = useLoaderData<DataResponse<null>>();
  const submit = useSubmit();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData();
    formData.set('name', ((form.name as unknown) as HTMLInputElement).value);
    formData.set('description', form.description.value);
    formData.set('location', form.location.value);
    formData.set('date', dateToServerFormat(form.date.value));
    submit(formData, { method: 'post' });
  }

  return <Form onSubmit={handleSubmit}>
    <label>
      {t('Name')}
      <input type="text" key={`name_${event.id}`} name="name" defaultValue={event.name} />
    </label>
    <label>
      {t('Description')}
      <input type="text" key={`description_${event.id}`} name="description" defaultValue={event.description} />
    </label>
    <label>
      {t('Date')}
      <input type="datetime-local" key={`date_${event.id}`} name="date" defaultValue={format(dateServerParse(event.date), 'yyyy-MM-dd HH:mm')} />
    </label>
    <label>
      {t('Location')}
      <input type="text" key={`location_${event.id}`} name="location" defaultValue={event.location} />
    </label>
    <FormError error={actionData?.error} />
    <button type="submit">{t('Update')}</button>
  </Form>
}