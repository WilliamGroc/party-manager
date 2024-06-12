
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { handleAction, http } from "~/utils/http";
import { css } from "styled-system/css";
import { z } from "zod";
import { GuestRow } from "~/components/guestRow";
import { loader as eventIdLoader } from "~/routes/events.$id";
import { Present } from "~/models/guest";
import { useEffect, useRef } from "react";

const actionPostValidator = z.object({
  username: z.string(),
  email: z.string().optional()
});

const actionPutValidator = z.object({
  present: z.string(),
});

export async function action({ request, params }: ActionFunctionArgs) {
  return handleAction(async () => {
    switch (request.method) {
      case 'POST': {
        const formData = await request.formData();

        const body = actionPostValidator.parse({
          username: formData.get('username') as string,
          email: formData.get('email') as string
        });

        if (body.email)
          z.string().email().parse(body.email);

        await http.post(`/guest/party/${params.id}`, body);

        return true;
      }
      case 'DELETE': {

        const deleteData = await request.formData();

        await http.delete(`/guest/${deleteData.get('id')}/party/${params.id}`);

        return true;
      }
      case 'PUT': {
        const putData = await request.formData();
        const putBody = actionPutValidator.parse({
          present: putData.get('present') as Present
        });

        await http.put(`/guest/${putData.get('id')}/party/${params.id}`, putBody);

        return true;
      }
    }

  });
}

export default function EventById() {
  const loaderData = useRouteLoaderData<typeof eventIdLoader>("routes/events.$id");
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleSetPresence = (id: number, present: Present) => {
    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('present', present);

    submit(formData, {
      method: 'put',
    });
  }

  return <div>
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
      {loaderData?.event.guests.map(guest => <GuestRow
        key={guest.id}
        guest={guest}
        onDelete={handleDelete}
        onSetPresence={handleSetPresence}
      />)}
    </div>
  </div>
}