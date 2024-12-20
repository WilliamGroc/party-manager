
import { ActionFunctionArgs, Link, useActionData, useNavigate, useRouteLoaderData, useSubmit } from "react-router";
import { dateServerParse } from "~/utils/date";
import { format } from 'date-fns'
import { css } from "styled-system/css";
import { fr } from "date-fns/locale";
import { loader as eventIdLoader, LoaderType } from "~/routes/events.$id";
import { DeleteButton } from "~/components/deleteButton";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { handle } from "../utils/handle";
import { PartyService } from "~/services/party/index.server";
import { getUserId } from "~/services/userSession.server";

export async function action({ params, request }: ActionFunctionArgs) {
  return handle(async () => {
    const userId = await getUserId(request);
    const partyService = new PartyService();
    await partyService.DeleteParty({ id: Number(params.id), userId });
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

export default function () {
  const { t } = useTranslation();
  const loaderData = useRouteLoaderData<LoaderType>("routes/events.$id");
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

    {loaderData?.isOwner && (
      <div className={css({ display: 'flex' })}>
        <Link to={`/events/${loaderData?.event.id}/edit`}><button>{t('Edit')}</button></Link>
        <div className={css({ ml: '2' })}>
          <DeleteButton onDelete={handleDelete} />
        </div>
      </div>
    )}
  </div>
}