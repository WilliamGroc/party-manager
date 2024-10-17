import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { http } from "~/utils/http";

export async function loader({ params }: LoaderFunctionArgs) {
  const { data } = await http.get(`/party/guest/link/${params.link}`);
  return redirect(`/events/${data}/guests`)
}