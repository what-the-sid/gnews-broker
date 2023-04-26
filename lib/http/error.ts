// Copyright (c) Yalochat, Inc. All rights reserved.

class HttpError<T> extends Error {
  private _response: T;

  private _statusCode: number;

  public constructor(message?: string, response?: T) {
    super(message);
    this._response = response;
  }

  public get response(): T {
    return this._response;
  }

  public set response(res: T) {
    this._response = res;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public set statusCode(status: number) {
    this._statusCode = status;
  }
}

export default HttpError;
