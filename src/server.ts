import { config } from "dotenv";
import { IncomingMessage, ServerResponse } from "node:http";
config();
import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { User } from "./User.js";
const port = process.env.PORT || 3000;

interface RequestWithBody extends IncomingMessage {
  body?: any;
}

const database = new Database();

const server = http.createServer(
  async (request: RequestWithBody, response: ServerResponse) => {
    response.setHeader("Access-Control-Allow-Origin", "*");

    const { method, url } = request;

    await json(request, response);
    if (method === "GET" && url === "/users") {
      return response.end(JSON.stringify(database.select("users")));
    }

    if (method === "POST" && url === "/users") {
      const { name, age } = request.body;

      database.insert<User>("users", {
        age,
        name,
      });

      return response.writeHead(201).end();
    }

    return;
  }
);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
