import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { css } from "styled-system/css";
import { commitSession, getSession } from "~/session";
import { http } from "~/utils/http";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const session = await getSession(
    request.headers.get("Cookie")
  );

  const response = await http.post('/user/login', {
    email: body.get('email'),
    password: body.get('password')
  });

  if (response.status !== 200) {
    session.flash("error", "Invalid username/password");

    return new Response(null, {
      status: 400,
      statusText: 'Invalid username or password'
    });
  }

  session.set("token", response.data.token);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function AuthLogin() {
  return (
    <Form
      method="post"
      className={css({
        display: 'flex',
        flexDir: 'column',
        w: '33%'
      })}>
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </Form>
  );
}