import { LoaderFunctionArgs } from "@remix-run/node";
import { handleAction } from "~/utils/handle";
import { http } from "~/utils/http";

export function loader({ params, request }: LoaderFunctionArgs) {
  return handleAction(async () => {
    const eventId = params.eventId,
      guestId = params.guestId;

    const { data } = await http.get(request, `/guest/party/${eventId}/${guestId}`);

    return data;
  });
}