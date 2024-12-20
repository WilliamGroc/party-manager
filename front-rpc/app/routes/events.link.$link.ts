import { LoaderFunctionArgs, redirect } from "react-router";
import { PartyService } from "~/services/party/index.server";
import { handle } from "~/utils/handle";

export async function loader({ params, request }: LoaderFunctionArgs) {
  return handle<Response>(async () => {
    const partyService = new PartyService();
    const party = await partyService.GetSharedParty({ link: params.link });
    return redirect(`/events/${party.id}/guests`)
  });
}