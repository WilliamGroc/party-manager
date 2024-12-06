import { ActionFunctionArgs, useSubmit } from "react-router"
import { useEffect } from "react"
import { authenticator } from "~/services/auth/auth.server"

export async function action({ request, params }: ActionFunctionArgs) {
  const data = await request.clone().formData();
  const invitation = data.get('invitation');

  let successRedirect = '/events';

  if (invitation)
    successRedirect = `/events/${invitation}?invitation`;

  return authenticator.authenticate(params.provider!, request, {
    successRedirect,
    failureRedirect: '/login'
  })
}

export default function () {
  const submit = useSubmit();
  useEffect(() => {
    const invitation = localStorage.getItem('invitation');
    const data = new FormData();
    data.append('invitation', invitation || '');
    submit(data, {
      method: 'post'
    });
    localStorage.removeItem('invitation');
  }, []);

  return <div>Redirecting...</div>;
}