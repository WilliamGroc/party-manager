import { LoaderFunctionArgs, redirect } from "react-router";
import { PartyService } from "~/services/party/index.server";
import { getToken } from "~/services/session.server";
import { handle } from "~/utils/handle";

export async function loader({ params, request }: LoaderFunctionArgs) {
  return handle<Response>(async () => {
    const token = await getToken(request);

    const partyService = new PartyService(token);
    const party = await partyService.GetSharedParty({ link: params.link });
    return redirect(`/events/${party.id}/guests`)
  });
}