import { HttpResponse } from '@/application/helpers/http';

export interface Controller<T = unknown> {
  handle: (httpRequest: Controller.Request) => Controller.Response<T>;
}

export namespace Controller {
  export type Request<Params = any, Body = any, Query = any, Headers = any> = {
    params: Params;
    body: Body;
    query: Query;
    headers: Headers;
  };

  export type Response<T> =
    | Promise<HttpResponse<T | Error>>
    | HttpResponse<T | Error>;
}
