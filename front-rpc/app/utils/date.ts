import { Locale, format, parse } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { enUS } from 'date-fns/locale/en-US'

export function dateServerParse(date: string) {
  const cleanDate = date.split(' ');
  cleanDate.pop();
  return parse(cleanDate.join(' '), "yyyy-MM-dd HH:mm:ss XXXX", new Date());
}

export function dateFormParse(date: string) {
  return parse(date, "yyyy-MM-dd'T'HH:mm", new Date());
}

export function dateToServerFormat(date: string) {
  return format(dateFormParse(date), "yyyy-MM-dd HH:mm:ss XXXX")
}

export const dateLocales: {
  en: Locale;
  fr: Locale;
} = {
  fr: fr,
  en: enUS,
};