import { Errors } from '@lib/log/interfaces';

export interface IDataInput {
  in?: string;
  q: string;
  apikey: string
}

export interface IDataResolved {
  data: IPayloadBody;
  error?: boolean;
}

export interface IPayloadBody {
  totalArticles?: number;
  articles?: Array<IReferenceDataBody>;
}

export interface ISource {
  name: string;
  url: string;
}

export interface IReferenceDataBody {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: ISource
}

export interface IErrorResponse {
  errorCode: number;
  details: string;
  error?: boolean;
  category?:Errors;
}

export interface IHandler {
  fetch(data: IDataInput,fetchCache): Promise<IDataResolved | IErrorResponse>;
}
