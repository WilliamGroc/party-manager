import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { http } from "~/utils/http";

export async function loader({ params }: LoaderFunctionArgs) {
  // return redirect(`/events/${params.eventId}/guests/${params.guestId}`);

  const {data} = await http.get(`/party/guest/link/${params.link}`);

  console.log(data)

  return redirect(`/events/${data}/guests`)
}