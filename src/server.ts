import { config } from "dotenv";
config();
import http from "node:http";

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  return response.end("Hello World!");
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
