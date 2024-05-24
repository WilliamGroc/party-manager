import { json } from "@remix-run/node";
import axios, { AxiosError } from "axios";
import { z } from "zod";

export const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthorizationToken(token: string) {
  http.interceptors.request.clear();

  http.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
}

export async function handleAction<T>(fn: () => Promise<T>) {
  try {
    return fn();
  } catch (error) {
    if (error instanceof z.ZodError)
      return json({ error: error.errors }, { status: 400 });
    else if (error instanceof AxiosError)
      return json({ error: error.response?.data }, { status: error.response?.status });
    else
      return json({ error: 'Internal server error' }, { status: 500 });
  }
}