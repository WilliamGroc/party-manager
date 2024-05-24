import { format, parse } from "date-fns";

export function dateServerParse(date: string) {
  return parse(date, "yyyy-MM-dd HH:mm:ss XXXX 'CEST'", new Date());
}

export function dateFormParse(date: string) {
  return parse(date, "yyyy-MM-dd'T'HH:mm", new Date());
}

export function dateToServerFormat(date: string){
  return format(dateFormParse(date), "yyyy-MM-dd HH:mm:ss XXXX")
}