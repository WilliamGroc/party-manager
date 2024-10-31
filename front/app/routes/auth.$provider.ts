import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { authenticator } from "~/services/auth/auth.server";

export let loader = () => redirect('/login');

export let action = ({ request, params }: ActionFunctionArgs) => {
  return authenticator.authenticate(params.provider!, request);
};