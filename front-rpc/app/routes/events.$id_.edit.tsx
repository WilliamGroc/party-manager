import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { dateServerParse, dateToServerFormat } from "~/utils/date";
import { format } from 'date-fns'
import { z } from "zod";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { useTranslation } from "react-i18next";
import { handle } from "~/utils/handle";
import { PartyService } from "~/services/party/index.server";
import { PartyResponse } from "proto/party/PartyResponse";
import { getToken } from "~/services/session.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  return handle<{ event: PartyResponse }>(async () => {
    const token = await getToken(request);
    const partyService = new PartyService(token);
    const party = await partyService.GetParty({ id: Number(params.id) });
    return { event: party };
  });
}

const bodyValidator = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  return handle(async () => {
    const formData = await request.formData();
    const id = params.id;

    const body = bodyValidator.parse({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
    });

    const token = await getToken(request);
    const partyService = new PartyService(token);
    await partyService.UpdateParty({ id: Number(id), ...body });

    return redirect(`/events/${id}`);
  });
}

export default function UpdateEvent() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof loader>();
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
      <input type="text" key={`name_${data.event.id}`} name="name" defaultValue={data.event.name} />
    </label>
    <label>
      {t('Description')}
      <input type="text" key={`description_${data.event.id}`} name="description" defaultValue={data.event.description} />
    </label>
    <label>
      {t('Date')}
      <input type="datetime-local" key={`date_${data.event.id}`} name="date" defaultValue={format(dateServerParse(data.event.date || ''), 'yyyy-MM-dd HH:mm')} />
    </label>
    <label>
      {t('Location')}
      <input type="text" key={`location_${data.event.id}`} name="location" defaultValue={data.event.location} />
    </label>
    <FormError error={actionData?.error} />
    <button type="submit">{t('Update')}</button>
  </Form>
}