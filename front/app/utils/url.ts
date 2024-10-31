import { isBrowser } from "./ssr";

export function buildUrl(path: string): URL {
  return new URL(path, isBrowser() ? window.location.origin : process.env.VITE_APP_ORIGIN);
}
