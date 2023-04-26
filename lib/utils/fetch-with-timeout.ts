import fetch, { Response, RequestInit } from 'node-fetch';
import { AbortController } from "node-abort-controller";

export default async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout?: number) {

  const timeOut = timeout ?? Number(process.env.FETCH_TIMEOUT);
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeOut);
  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (err) {
    const error = err as Error;

    if (error.name === 'AbortError') {
      // Recreate response with default timeout error data
      const { headers = {} } = options;
      const ResponseInit = {
        status: 408,
        statusText: 'Request Timeout',
        headers,
      };
      response = new Response(
        JSON.stringify({
          message: 'The user aborted a request',
        }),
        ResponseInit
      );
    } else {
      clearTimeout(id);
      throw error;
    }
  }

  clearTimeout(id);
  return response;
}
