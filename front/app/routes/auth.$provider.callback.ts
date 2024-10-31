import { LoaderFunctionArgs } from "@remix-run/node"
import { authenticator } from "~/services/auth/auth.server"

export async function loader({ request, params }: LoaderFunctionArgs) {
  return authenticator.authenticate(params.provider!, request, {
    successRedirect: '/events',
    failureRedirect: '/login'
  })
}