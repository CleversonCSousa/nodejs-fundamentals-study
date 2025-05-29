import { IncomingMessage } from "http";

export interface RequestWithBody<T = any> extends IncomingMessage {
  body?: T;
}

export interface RequestWithParams<T = any> extends IncomingMessage {
  params?: T;
}

export interface RequestWithQuery<T = any> extends IncomingMessage {
  query?: T;
}

export type RequestFull<T = any, U = any, V = any> = RequestWithBody<T> &
  RequestWithParams<U> &
  RequestWithQuery<V>;
