import { LoaderFunctionArgs } from "react-router";
import { GuestService } from "~/services/guest/index.server";
import { getUserId } from "~/services/userSession.server";
import { handle } from "~/utils/handle";

export function loader({ params, request }: LoaderFunctionArgs) {
  return handle(async () => {
    const eventId = params.eventId,
      guestId = params.guestId;

    const guestService = new GuestService();
    const userId = await getUserId(request);
    const data = await guestService.GetShareLink({ guestId: Number(guestId), partyId: Number(eventId), userId });

    return data;
  });
}