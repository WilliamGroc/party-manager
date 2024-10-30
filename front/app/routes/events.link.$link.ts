import { LoaderFunctionArgs, redirect, TypedResponse } from "@remix-run/node";
import { handle } from "~/utils/handle";
import { http } from "~/utils/http";

export async function loader({ params, request }: LoaderFunctionArgs) {
  return handle<TypedResponse<never>>(async () => {
    const { data } = await http.get(request, `/party/guest/link/${params.link}`);
    return redirect(`/events/${data}/guests`)
  });
}