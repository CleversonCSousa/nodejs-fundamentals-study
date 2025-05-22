import { config } from "dotenv";
config();
import http from "node:http";
import { mockUsers as users } from "./users.js";
const port = process.env.PORT || 3000;

interface User {
  name: string;
  age: number;
}

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");

  const { method, url } = request;
  if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        const user: User = JSON.parse(body);
        users.push(user);
        return response
          .writeHead(201)
          .end(JSON.stringify({ message: "Usuário criado", user }));
      } catch {
        return response
          .writeHead(400)
          .end(JSON.stringify({ error: "JSON inválido" }));
      }
    });
  }

  return;
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
