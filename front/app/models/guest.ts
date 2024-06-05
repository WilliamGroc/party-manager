export interface Guest {
  id: number;
  username: string;
  email: string;
  present: Present;
}

export enum Present {
  OK = "OK",
  KO = "KO",
  MAYBE = "MAYBE",
  NO_ANSWER = "NO_ANSWER"
}