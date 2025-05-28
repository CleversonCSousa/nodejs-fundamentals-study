import { IncomingMessage, ServerResponse } from "http";
import { Database } from "./database.js";
import { User } from "./User.js";
import { randomUUID } from "crypto";

const database = new Database();
interface RequestWithBody<T = any> extends IncomingMessage {
  body?: T;
}

interface Route<T = any> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  handler: (
    request: IncomingMessage | RequestWithBody<T>,
    response: ServerResponse
  ) => void;
}

export const routes: Route[] = [
  {
    method: "GET",
    path: "/users",
    handler: (request, response) => {
      const users = database.select<User>("users");
      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (
      request: RequestWithBody<{ name: string; age: number }>,
      response
    ) => {
      const { name, age } = request.body!;
      database.insert<User>("users", {
        id: randomUUID(),
        name,
        age,
      });
      return response.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: "/users/1",
    handler: (request: RequestWithBody<{ id: string }>, response) => {
      return response.end();
    },
  },
];
