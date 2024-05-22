import { parse } from "date-fns";

export function dateServerParse(date: string) {
  return parse(date, "yyyy-MM-dd HH:mm:ss XXXX 'CEST'", new Date());
}