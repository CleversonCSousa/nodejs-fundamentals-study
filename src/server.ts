import { config } from "dotenv";
import { IncomingMessage, ServerResponse } from "node:http";
import { json } from "./middlewares/json.js";
config();
import http from "node:http";
import { routes } from "./routes.js";
const port = process.env.PORT || 3000;

interface RequestWithBody<T = any> extends IncomingMessage {
  body?: T;
}

const server = http.createServer(
  async (request: RequestWithBody, response: ServerResponse) => {
    const { method, url } = request;

    await json(request, response);

    const route = routes.find((route) => {
      const routeParams = url?.match(route.path);
      console.log(routeParams);

      return route.method === method && route.path.test(url ?? "");
    });

    if (route) {
      return route?.handler(request, response);
    }

    return response.writeHead(401).end();
  }
);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
