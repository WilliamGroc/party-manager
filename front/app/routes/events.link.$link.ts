import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { http } from "~/utils/http";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { data } = await http.get(request, `/party/guest/link/${params.link}`);
  return redirect(`/events/${data}/guests`)
}