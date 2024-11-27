import { ActionFunctionArgs } from "@remix-run/node"
import { authenticator } from "~/services/auth/auth.server";

export let action = ({ request, params }: ActionFunctionArgs) => {
  return authenticator.authenticate(params.provider!, request);
};