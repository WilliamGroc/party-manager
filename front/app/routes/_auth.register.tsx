import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { commitSession, getSession } from "~/services/session.server";
import { http } from "~/utils/http";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const password = body.get('password');
  const confirmPassword = body.get('confirmPassword');

  if (password !== confirmPassword) {
    return new Response(null, {
      status: 400,
      statusText: 'Passwords do not match'
    });
  }

  const response = await http.post('/user/register', {
    username: body.get('username'),
    email: body.get('email'),
    password: body.get('password')
  });

  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (response.status !== 200) {
    return json({ error: 'Invalid username or email' }, {
      status: 400,
      statusText: 'Invalid username or email'
    });
  }

  session.set("email", response.data.email);
  session.set("token", response.data.token);

  return redirect("/events", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function AuthRegister() {
  const { t } = useTranslation();
  const actionData = useLoaderData<DataResponse<null>>();

  return (
    <Form className={css({
      display: 'flex',
      flexDir: 'column',
      w: '33%'
    })}
      method="post"
    >
      <input type="text" name="username" placeholder={t('Username')} />
      <input type="text" name="email" placeholder={t('Email')} />
      <input type="password" name="password" placeholder={t('Password')} />
      <input type="password" name="confirmPassword" placeholder={t('Confirm Password')} />
      <FormError error={actionData?.error} />
      <button type="submit">{t('Register')}</button>
    </Form>
  );
}