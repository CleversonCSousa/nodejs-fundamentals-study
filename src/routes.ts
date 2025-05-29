import { IncomingMessage, ServerResponse } from "http";
import { Database } from "./database.js";
import { User } from "./User.js";
import { randomUUID } from "crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { RequestFull, RequestWithBody } from "./Request.js";
import { RequestWithParams } from "./Request.js";
const database = new Database();

interface Route<T = any, U = any, V = any> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: RegExp;
  handler: (request: RequestFull<T, U, V>, response: ServerResponse) => void;
}

export const routes: Route[] = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { search } = request.query;

      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null
      );
      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (
      request: RequestWithBody<{ name: string; email: string }>,
      response
    ) => {
      if (!request.body) {
        return response.writeHead(400).end("Missing body");
      }
      const { name, email } = request.body;
      database.insert<User>("users", {
        id: randomUUID(),
        name,
        email,
      });
      return response.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request: RequestWithParams<{ id: string }>, response) => {
      if (!request.params) {
        {
          return response.writeHead(400).end("Missing params");
        }
      }
      const { id } = request.params;
      database.delete("users", id);
      return response.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (
      request: RequestWithBody<{ name: string; email: string }> &
        RequestWithParams<{ id: string }>,
      response
    ) => {
      if (!request.params) {
        return response.writeHead(400).end("Missing params");
      }
      if (!request.body) {
        return response.writeHead(400).end("Missing body");
      }
      const { id } = request.params;
      const { name, email } = request.body;
      database.update("users", id, { name, email });
      return response.writeHead(204).end();
    },
  },
];
