import { config } from "dotenv";
config();
import http from "node:http";
import { mockUsers as users } from "./mockUsers.js";
const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");

  const { method, url } = request;
  if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    return response.end("Criação de usuário");
  }

  return response.end("Hello World!");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
