import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return authenticator.authenticate("user-pass", request, {
      successRedirect: "/events",
      failureRedirect: "/login",
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