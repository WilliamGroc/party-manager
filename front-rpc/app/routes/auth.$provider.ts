import { ActionFunctionArgs } from "react-router"
import { authenticator } from "~/services/auth/auth.server";

export let action = ({ request, params }: ActionFunctionArgs) => {
  return authenticator.authenticate(params.provider!, request);
};