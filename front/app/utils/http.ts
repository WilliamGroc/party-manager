import axios, { AxiosRequestConfig } from "axios";
import { authenticator } from "~/services/auth/auth.server";

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