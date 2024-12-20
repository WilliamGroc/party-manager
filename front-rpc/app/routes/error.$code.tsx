import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

export const loader = ({ params }: LoaderFunctionArgs) => {
  return { code: params.code };
}

export default function () {
  const dataLoader = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  return (
    <div>
      <p>{t(`Error.${dataLoader?.code || 'is'}`)}</p>
    </div>
  );
}