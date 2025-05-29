import { IncomingMessage } from "http";

export interface RequestWithBody<T = any> extends IncomingMessage {
  body?: T;
}

export interface RequestWithParams<T = any> extends IncomingMessage {
  params?: T;
}
