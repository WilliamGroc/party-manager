import { json, TypedResponse } from "@remix-run/node";
import { AxiosError } from "axios";
import { z } from "zod";

export function handleErrorLog(error: Error | AxiosError) {
  if ('response' in error && error.response) {
    const response = error.response;
    console.log(`[${response.status}] ${response.config.method}: ${response.config.url} \n ${response.data}`);
  }
  else
    console.log(error);
}

export async function handleAction<T>(fn: () => Promise<T>): Promise<T | TypedResponse<{ error: any; }>> {
  try {
    return fn();
  } catch (error: any) {
    handleErrorLog(error);

    if (error instanceof z.ZodError)
      return json({ error: error.errors }, { status: 400 });
    else if (error instanceof AxiosError)
      return json({ error: error.response?.data }, { status: error.response?.status });
    else
      return json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function handleLoader<T>(fn: () => Promise<T>): Promise<T | TypedResponse<{ error: any; }>> {
  try {
    return fn();
  } catch (error: any) {
    handleErrorLog(error);

    if (error instanceof AxiosError)
      return json({ error: error.response?.data }, { status: error.response?.status });
    else
      return json({ error: 'Internal server error' }, { status: 500 });
  }
}