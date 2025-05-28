import { config } from "dotenv";
import { IncomingMessage } from "node:http";
config();
import http from "node:http";
import { mockUsers as users } from "./users.js";
const port = process.env.PORT || 3000;

interface RequestWithBody extends IncomingMessage {
  body?: any;
}

const server = http.createServer(async (request: RequestWithBody, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");

  const { method, url } = request;
  const buffers = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (err) {
    request.body = null;
  }

  if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, age } = request.body;

    users.push({
      name,
      age,
    });

    return response.writeHead(201).end();
  }

  return;
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
