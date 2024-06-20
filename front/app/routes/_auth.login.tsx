import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { commitSession, getSession } from "~/session";
import { http } from "~/utils/http";

export async function action({ request }: ActionFunctionArgs) {
  try {

    const body = await request.formData();

    const session = await getSession(
      request.headers.get("Cookie")
    );

    const { data } = await http.post('/user/login', {
      email: body.get('email'),
      password: body.get('password')
    });

    session.set("email", data.email);
    session.set("token", data.token);

    return redirect("/events", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return json({ error: 'Bad credentials' }, {
        status: error.response?.status,
      });
    }

    return json({ error: 'An error occurred' }, {
      status: 500,
    });
  }
}

export default function AuthLogin() {
  const { t } = useTranslation();
  const actionData = useActionData<DataResponse<null>>();

  return (
    <Form
      method="post"
      className={css({
        display: 'flex',
        flexDir: 'column',
        w: '33%'
      })}>
      <input type="text" name="email" placeholder={t('Email')} />
      <input type="password" name="password" placeholder={t('Password')} />
      <FormError error={actionData?.error} />
      <button type="submit">{t('Login')}</button>
    </Form>
  );
}