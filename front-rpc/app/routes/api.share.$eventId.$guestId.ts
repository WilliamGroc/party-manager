import { LoaderFunctionArgs } from "@remix-run/node";
import { GuestService } from "~/services/guest/index.server";
import { getToken } from "~/services/session.server";
import { handle } from "~/utils/handle";

export function loader({ params, request }: LoaderFunctionArgs) {
  return handle(async () => {
    const eventId = params.eventId,
      guestId = params.guestId;

    const token = await getToken(request);
    const guestService = new GuestService(token);
    const data = await guestService.GetShareLink({ guestId: Number(guestId), partyId: Number(eventId) });

    return data;
  });
}