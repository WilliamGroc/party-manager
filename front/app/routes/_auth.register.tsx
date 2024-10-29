import { ActionFunction, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { authenticator, SessionUser } from "~/services/auth.server";
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

  const response = await http.post<SessionUser>(request, '/user/register', {
    username: body.get('username'),
    email: body.get('email'),
    password: body.get('password')
  });


  if (response.status !== 200) {
    return json({ error: 'Invalid username or email' }, {
      status: 400,
      statusText: 'Invalid username or email'
    });
  }

  return authenticator.authenticate('user-pass', request, {
    successRedirect: '/events'
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