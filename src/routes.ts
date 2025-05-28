import { IncomingMessage, ServerResponse } from "http";
import { Database } from "./database.js";
import { User } from "./User.js";
import { randomUUID } from "crypto";

const database = new Database();
interface RequestWithBody extends IncomingMessage {
  body?: any;
}

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (request: IncomingMessage, response: ServerResponse) => {
      const users = database.select<User>("users");

      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (request: RequestWithBody, response: ServerResponse) => {
      const { name, age } = request.body;

      database.insert<User>("users", {
        id: randomUUID(),
        age,
        name,
      });

      return response.writeHead(201).end();
    },
  },
];
