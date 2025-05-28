import { IncomingMessage, ServerResponse } from "http";
import { Database } from "./database.js";
import { User } from "./User.js";
import { randomUUID } from "crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();
interface RequestWithBody<T = any> extends IncomingMessage {
  body?: T;
}

interface Route<T = any> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: RegExp;
  handler: (
    request: IncomingMessage | RequestWithBody<T>,
    response: ServerResponse
  ) => void;
}

export const routes: Route[] = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const users = database.select<User>("users");
      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
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
    path: buildRoutePath("/users/:id"),
    handler: (request: RequestWithBody<{ id: string }>, response) => {
      return response.end();
    },
  },
];
