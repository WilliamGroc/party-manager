import { KeycloakStrategy } from "~/utils/auth/keycloak";
import { decodeToken, SessionUser } from "../userSession.server";
import { UserService } from "../user/index.server";

export const keycloakStrategy = new KeycloakStrategy<SessionUser>(
  {
    useSSL: process.env.VITE_AUTH_PROTOCOL === 'https',
    domain: process.env.VITE_AUTH_DOMAIN || '',
    realm: process.env.VITE_AUTH_REALM || '',
    clientId: process.env.VITE_AUTH_CLIENTID || '',
    clientSecret: process.env.VITE_AUTH_CLIENTSECRET || '',
    callbackURL: process.env.VITE_AUTH_CALLBACKURL || '',
  },
  async ({ tokens }) => {
    const values = decodeToken(tokens.data.access_token);

    const userService = new UserService();
    const user = await userService.Login({
      email: values.email,
      username: values.name,
    })

    return user as SessionUser;
  }
);

export function logoutKeycloakEndpoint() {
  return `${process.env.VITE_AUTH_PROTOCOL}://${process.env.VITE_AUTH_DOMAIN}/realms/${process.env.VITE_AUTH_REALM}/protocol/openid-connect/logout?client_id=${process.env.VITE_AUTH_CLIENTID}&post_logout_redirect_uri=${process.env.VITE_APP_ORIGIN}`;
}