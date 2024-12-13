import { Authenticator } from "remix-auth";
import { SessionUser } from "../userSession.server";
import { keycloakStrategy } from "./keycloak.strategy";

export const authenticator = new Authenticator<SessionUser>();

authenticator.use(
  keycloakStrategy,
  "keycloak"
)