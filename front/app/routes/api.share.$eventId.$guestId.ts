import { LoaderFunctionArgs } from "@remix-run/node";
import { handleAction, http } from "~/utils/http";

export function loader({ params }: LoaderFunctionArgs) {
  return handleAction(async () => {
    const eventId = params.eventId,
      guestId = params.guestId;

    const { data } = await http.get(`/guest/party/${eventId}/${guestId}`);

    return {
      data
    }
  });
}