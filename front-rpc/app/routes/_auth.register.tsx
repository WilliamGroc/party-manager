import { ActionFunction, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { authenticateLocal, SessionUser } from "~/services/auth/auth.server";
import { getToken } from "~/services/session.server";
import { UserService } from "~/services/user/index.server";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.clone().formData();

  const password = body.get('password');
  const confirmPassword = body.get('confirmPassword');

  if (password !== confirmPassword) {
    return new Response(null, {
      status: 400,
      statusText: 'Passwords do not match'
    });
  }

  try {
    const token = await getToken(request);
    const userService = new UserService(token);
    await userService.Register({
      username: body.get('username') as string,
      email: body.get('email') as string,
      password: body.get('password') as string
    });

    return await authenticateLocal(request);
  } catch (err) {
    return json({ error: 'Invalid username or email' }, {
      status: 400,
      statusText: 'Invalid username or email'
    });
  }
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