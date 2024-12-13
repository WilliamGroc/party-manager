import { ActionFunctionArgs, Form, redirect, useLoaderData, useSubmit } from "react-router";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { PartyService } from "~/services/party/index.server";
import { getUserId } from "~/services/userSession.server";
import { dateToServerFormat } from "~/utils/date";
import { handle } from "~/utils/handle";

const validator = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  location: z.string().min(1),
  userId: z.number()
});

export async function action({ request }: ActionFunctionArgs) {
  return handle(async () => {
    const formData = await request.formData();

    const userId = await getUserId(request);

    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      date: formData.get('date'),
      location: formData.get('location'),
      userId
    };

    const body = validator.parse(data);

    const partyService = new PartyService();
    const event = await partyService.CreateParty(body);

    return redirect(`/events/${event.id}`);
  })
}

export default function NewEvent() {
  const { t } = useTranslation();
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
      <input type="text" name="name" />
    </label>
    <label>
      {t('Description')}
      <input type="text" name="description" />
    </label>
    <label>
      {t('Date')}
      <input type="datetime-local" name="date" />
    </label>
    <label>
      {t('Location')}
      <input type="text" name="location" />
    </label>
    <FormError error={actionData?.error} />
    <button type="submit">{t('Create')}</button>
  </Form>
}