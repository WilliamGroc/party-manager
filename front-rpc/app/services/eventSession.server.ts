import { createCookieSessionStorage } from "react-router";

export type SessionEvent = {
  invitation: string;
};

type SessionFlashData = {
  error: string;
};

export const eventSessionStorage = createCookieSessionStorage<SessionEvent, SessionFlashData>(
  {
    cookie: {
      name: "__eventsession",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  }
);