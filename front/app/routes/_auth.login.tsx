import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { authenticateLocal, authenticator } from "~/services/auth/auth.server";
import { SocialsProvider } from "~/services/auth/providers";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const form = await request.clone().formData();
    const strategy = form.get('strategy');

    switch (strategy) {
      case 'local':
        return authenticateLocal(request);
      case SocialsProvider.GOOGLE:
        return authenticator.authenticate('google', request);
    }
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

type SocialButtonProps = {
  provider: SocialsProvider,
  label: string,
  icon?: string
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label, icon }) => (
  <Form action={`/auth/${provider}`} method="post" >
    <button className={css({ w: "40px!", h: "40px!", minW: "40px!", p: '0!', borderRadius: '40px!' })}><i className={icon} title={label}></i></button>
  </Form>
);

export default function AuthLogin() {
  const { t } = useTranslation();
  const actionData = useActionData<DataResponse<null>>();

  return (
    <div className={css({ w: '100%', display: 'flex', alignItems: 'center', flexDir: 'column' })}>
      <Form
        method="post"
        className={css({
          display: 'flex',
          flexDir: 'column',
          w: '33%'
        })}>
        <input type="hidden" name="strategy" value="local" />
        <input type="text" name="email" placeholder={t('Email')} />
        <input type="password" name="password" placeholder={t('Password')} />
        <FormError error={actionData?.error} />
        <button type="submit">{t('Login')}</button>
      </Form>
      <div className={css({ display: 'flex' })}>
        <SocialButton provider={SocialsProvider.GOOGLE} label="Login with Google" icon="ri-google-fill" />
      </div>
    </div>
  );
}