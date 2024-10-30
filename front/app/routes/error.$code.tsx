import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const loader = ({ params }: LoaderFunctionArgs) => {
  return { code: params.code };
}

export default function ErrorPage() {
  const dataLoader = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  return (
    <div>
      <p>{t(`Error.${dataLoader?.code || 'is'}`)}</p>
    </div>
  );
}