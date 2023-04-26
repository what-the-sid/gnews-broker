import { Response } from 'node-fetch';

class HttpResponse<T, U> {
  private _response: T | U;

  public constructor(response?: T | U) {
    this._response = response;
  }

  public async processResponse(response: Response): Promise<T | U> {
    if (response.ok) {
      this._response = (await response.json()) as T;
    } else {
      const errorResponse = (await response.json()) as Record<string, unknown>;
      this._response = {
        statusCode: response.status,
        error: response.statusText || (errorResponse.error as string) || '',
        message: errorResponse.message as string,
        ...errorResponse,
      } as unknown as U;
    }

    return this._response;
  }
}

export default HttpResponse;
