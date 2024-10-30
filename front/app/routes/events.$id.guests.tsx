
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useFetcher, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { http } from "~/utils/http";
import { css } from "styled-system/css";
import { z } from "zod";
import { GuestRow } from "~/components/guestRow";
import { loader as eventIdLoader } from "~/routes/events.$id";
import { Guest, Present } from "~/models/guest";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { handle } from "~/utils/handle";
import { toast } from 'react-toastify';

const actionPostValidator = z.object({
  username: z.string(),
  email: z.string().optional()
});

const actionPutValidator = z.object({
  present: z.string(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  return handle(async () => {
    switch (request.method) {
      case 'POST': {
        const formData = await request.formData();

        const body = actionPostValidator.parse({
          username: formData.get('username') as string,
        });

        await http.post(request, `/guest/party/${params.id}`, body);

        return true;
      }
      case 'DELETE': {

        const deleteData = await request.formData();

        await http.delete(request, `/guest/${deleteData.get('id')}/party/${params.id}`);

        return true;
      }
      case 'PUT': {
        const putData = await request.formData();
        const putBody = actionPutValidator.parse({
          present: putData.get('present') as Present,
        });

        await http.put(request, `/guest/${putData.get('guestId')}/party/${putData.get('eventId')}`, putBody);

        return true;
      }
    }

  });
}

export default function EventById() {
  const { t } = useTranslation();
  const loaderData = useRouteLoaderData<typeof eventIdLoader>("routes/events.$id");
  const submit = useSubmit();
  const shareFetcher = useFetcher<{ link: string }>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (shareFetcher.state === 'idle' && shareFetcher.data?.link) {
      const url = `http://localhost:5173/events/${shareFetcher.data?.link}?invitation`;
      navigator.clipboard.writeText(url).then(() => {
        toast(<div>
          <span>{t('CopiedToClipboard')}</span>
        </div>, {
        })
      });
    }
  }, [shareFetcher.state])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    submit(formData, {
      method: 'post'
    });
    formRef.current?.reset();
  }

  const handleDelete = (id: number) => {
    const formData = new FormData();
    formData.append('id', String(id));

    submit(formData, {
      method: 'delete',
    });
  }

  const handleSetPresence = (guestId: number, present: Present) => {
    if (!loaderData?.event.id) return;
    const formData = new FormData();
    formData.append('eventId', String(loaderData.event.id));
    formData.append('guestId', String(guestId));
    formData.append('present', present);

    submit(formData, {
      method: 'put',
    });
  }

  const handleShare = (id: number) => {
    shareFetcher.submit(null, {
      action: `/api/share/${loaderData?.event.id}/${id}`
    });
  }

  return <div>
    {loaderData?.isOwner && (
      <Form className={css({
        display: 'flex',
        "& > label": {
          marginRight: "1rem"
        }
      })}
        ref={formRef}
        onSubmit={handleAdd}
      >
        <label>
          {t('Username')}
          <input type="text" name="username" />
        </label>
        <div className={css({ width: '164px', display: 'flex', alignItems: 'flex-end' })}>
          <button type="submit">{t('AddGuest')}</button>
        </div>
      </Form>
    )}
    <div>
      {loaderData?.event.guests.map((guest: Guest) => <GuestRow
        key={guest.id}
        guest={guest}
        himself={loaderData.userId === guest.userId}
        onDelete={handleDelete}
        onSetPresence={handleSetPresence}
        onShare={handleShare}
        isOwner={loaderData.isOwner}
      />)}
    </div>
  </div>
}