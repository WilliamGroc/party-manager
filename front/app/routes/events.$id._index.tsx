
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useActionData, useNavigate, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { Party } from "~/models/party";
import { dateServerParse } from "~/utils/date";
import { handleAction, http } from "~/utils/http";
import { format } from 'date-fns'
import { css } from "styled-system/css";
import { fr } from "date-fns/locale";
import { loader as eventIdLoader } from "~/routes/events.$id";
import { DeleteButton } from "~/components/deleteButton";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


export async function loader({ params }: LoaderFunctionArgs): Promise<{ event: Party }> {
  const { data } = await http.get<Party>(`/party/${params.id}`);

  return { event: data };
}

export async function action({ params }: ActionFunctionArgs) {
  return handleAction(async () => {
    await http.delete(`/party/${params.id}`);
    return { success: true }
  });
}

const labelStyle = css({
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem"
})

const titleStyle = css({
  fontSize: "1rem",
  borderBottom: "1px solid #ccc",
  marginBottom: "1rem"
})

export default function EventByIdDescription() {
  const { t } = useTranslation();
  const loaderData = useRouteLoaderData<typeof eventIdLoader>("routes/events.$id");
  const actionData = useActionData<typeof action>();

  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && 'success' in actionData && actionData.success) {
      navigate("/events");
    }
  }, [actionData, navigate])

  const handleDelete = async () => {
    submit(new FormData(), {
      method: "DELETE",
    })
  }

  return <div className={css({ display: "flex", justifyContent: "space-between" })}>
    <div className={css({ flex: 1, maxWidth: "4/5" })}>
      <label className={labelStyle}>
        <div className={titleStyle}>{t('Name')}</div>
        <div>{loaderData?.event.name}</div>
      </label>
      <label className={labelStyle}>
        <div className={titleStyle}>{t('Description')}</div>
        <div>{loaderData?.event.description}</div>
      </label>
      <label className={labelStyle}>
        <div className={titleStyle}>{t('Date')}</div>
        <div>{format(dateServerParse(loaderData?.event.date || ''), "iii dd MMM yyyy HH:mm", { locale: fr })}</div>
      </label>
      <label className={labelStyle}>
        <div className={titleStyle}>{t('Location')}</div>
        <div>
          {loaderData?.event.location}
        </div>
      </label>
    </div>

    <div className={css({ display: 'flex' })}>
      <Link to={`/events/${loaderData?.event.id}/edit`}><button>{t('Edit')}</button></Link>
      <div className={css({ ml: '2' })}>
        <DeleteButton onDelete={handleDelete} />
      </div>
    </div>
  </div>
}