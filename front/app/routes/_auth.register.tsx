import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { css } from "styled-system/css";
import { commitSession, getSession } from "~/session";
import { http } from "~/utils/http";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const password = body.get('password');
  const confirmPassword = body.get('confirmPassword');

  if (password !== confirmPassword) {
    return new Response(null, {
      status: 400,
      statusText: 'Passwords do not match'
    });
  }

  const response = await http.post('/user/register', {
    username: body.get('username'),
    email: body.get('email'),
    password: body.get('password')
  });


  const session = await getSession(
    request.headers.get("Cookie")
  );

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

export default function AuthRegister() {
  return (
    <Form className={css({
      display: 'flex',
      flexDir: 'column',
      w: '33%'
    })}
      method="post"
    >
      <input type="text" name="username" placeholder="Username" />
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="password" name="confirmPassword" placeholder="Confirm password" />
      <button type="submit">Login</button>
    </Form>
  );
}