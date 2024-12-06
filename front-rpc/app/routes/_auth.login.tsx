import { ActionFunctionArgs, Form, useActionData, useSubmit } from "react-router";
import { AxiosError } from "axios";
import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { css } from "styled-system/css";
import { FormError } from "~/components/formError";
import { DataResponse } from "~/models/data";
import { authenticateLocal } from "~/services/auth/auth.server";
import { SocialsProvider } from "~/services/auth/providers";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return authenticateLocal(request);
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status,
        error: error.response?.data
      }
    }

    return {
      status: 500,
      error: 'An error occurred'
    }
  }
}

type SocialButtonProps = {
  provider: SocialsProvider,
  label: string,
  icon?: string
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label, icon }) => {
  const submit = useSubmit();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('invitation')) {
      localStorage.setItem('invitation', searchParams.get('invitation')!);
    }

    submit(new FormData(), {
      method: 'post',
      action: `/auth/${provider}`
    });
  }

  return (
    <Form>
      <button onClick={handleSubmit}
        className={css({ w: "40px!", h: "40px!", minW: "40px!", p: '0!', borderRadius: '40px!' })}>
        <i className={icon} title={label}></i>
      </button>
    </Form>
  );
}

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
        <input type="text" name="email" placeholder={t('Email')} />
        <input type="password" name="password" placeholder={t('Password')} />
        <FormError error={actionData?.error} />
        <button type="submit">{t('Login')}</button>
      </Form>
      <div className={css({ display: 'flex' })}>
        {/* <SocialButton provider={SocialsProvider.GOOGLE} label="Login with Google" icon="ri-google-fill" /> */}
      </div>
    </div>
  );
}