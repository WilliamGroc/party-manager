import { LoaderFunctionArgs } from "@remix-run/node";
import { handle } from "~/utils/handle";
import { http } from "~/utils/http";

export function loader({ params, request }: LoaderFunctionArgs) {
  return handle(async () => {
    const eventId = params.eventId,
      guestId = params.guestId;

    const { data } = await http.get(request, `/guest/party/${eventId}/${guestId}`);

    return data;
  });
}