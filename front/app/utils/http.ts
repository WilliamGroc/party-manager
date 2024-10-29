import { json } from "@remix-run/node";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { post } from "node_modules/axios/index.cjs";
import { z } from "zod";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";

// replace with https://remix.run/resources/remix-auth

export const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function useParams(request: Request | null, params?: AxiosRequestConfig<any> | undefined) {
  if (!request) return params;

  const user = await authenticator.isAuthenticated(request);
  return {
    ...params,
    headers: {
      ...params?.headers,
      Authorization: `Bearer ${user?.token}`
    }
  }
}

export const http = {
  post: async <T>(request: Request | null, url: string, body: any, params?: AxiosRequestConfig<any> | undefined) => {
    return client.post<T>(url, body, await useParams(request, params));
  },
  get: async <T>(request: Request, url: string, params?: AxiosRequestConfig<any> | undefined) => {
    return client.get<T>(url, await useParams(request, params));
  },
  put: async <T>(request: Request, url: string, body?: any, params?: AxiosRequestConfig<any> | undefined) => {
    return client.put<T>(url, body, await useParams(request, params));
  },
  delete: async <T>(request: Request, url: string, params?: AxiosRequestConfig<any> | undefined) => {
    return client.delete<T>(url, await useParams(request, params));
  }
}
export async function handleAction<T>(fn: () => Promise<T>) {
  try {
    return fn();
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError)
      return json({ error: error.errors }, { status: 400 });
    else if (error instanceof AxiosError)
      return json({ error: error.response?.data }, { status: error.response?.status });
    else
      return json({ error: 'Internal server error' }, { status: 500 });
  }
}