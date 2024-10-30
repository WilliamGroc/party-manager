import { redirect, TypedResponse } from "@remix-run/node";
import { AxiosError } from "axios";
import { z } from "zod";

export function handleErrorLog(error: Error | AxiosError) {
  if ('response' in error && error.response) {
    const response = error.response;
    console.error(`[${response.status}] ${response.config.method}: ${response.config.url} \n ${response.data}`);
  }
  else
    console.error(error);
}

export function handleError(error: Error | AxiosError) {
  handleErrorLog(error);

  if (error instanceof z.ZodError)
    return redirect(`/error/${ErrorType.InvalidForm}`);
  else if (error instanceof AxiosError)
    return redirect(`/error/${getErrorType(error)}`);
  else
    return redirect(`/error/${ErrorType.InternalServerError}`);
}

export enum ErrorType {
  NotFound = 'nf',
  Unauthorized = 'ua',	
  Forbidden = 'fb',
  BadRequest = 'br',
  InternalServerError = 'is',
  InvalidToken = 'it',
  InvalidLink = 'il',
  InvalidCredentials = 'ic',
  InvalidForm = 'if',
  GuestNotFound = 'gn'
}

export function getErrorType(error: Error | AxiosError): ErrorType {
  if ('response' in error && error.response) {
    const status = error.response.status;

    console.log({
      status,
      data: error.response.data
    })
    
    if (status === 401 && error.response.data === 'Invalid token')
      return ErrorType.InvalidToken;
    if (status === 404 && error.response.data === 'Invalid link')
      return ErrorType.InvalidLink;
    if (status === 404 && error.response.data === 'Guest not found')
      return ErrorType.InvalidLink;
    if (status === 401 && error.response.data === 'Invalid credentials')
      return ErrorType.InvalidCredentials;
    if (status === 400 && error.response.data === 'Invalid form')
      return ErrorType.InvalidForm;
    
    switch (status) {
      case 401:
        return ErrorType.Unauthorized;
      case 403:
        return ErrorType.Forbidden;
      case 404:
        return ErrorType.NotFound;
      case 400:
        return ErrorType.BadRequest;
      case 500:
        return ErrorType.InternalServerError;
    }

  }
  return ErrorType.InternalServerError;
}

export async function handle<T>(fn: () => Promise<T>): Promise<T | TypedResponse<never>> {
  try {
    return await fn();
  } catch (error: any) {
    return handleError(error)
  }
}
