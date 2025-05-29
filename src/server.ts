import { config } from "dotenv";
import { IncomingMessage, ServerResponse } from "node:http";
import { json } from "./middlewares/json.js";
config();
import http from "node:http";
import { routes } from "./routes.js";
import { RequestWithBody, RequestWithParams } from "./Request.js";
const port = process.env.PORT || 3000;

const server = http.createServer(
  async (
    request: RequestWithBody & RequestWithParams,
    response: ServerResponse
  ) => {
    const { method, url } = request;

    await json(request, response);

    const route = routes.find((route) => {
      return route.method === method && route.path.test(url ?? "");
    });

    if (route) {
      const routeParams = url?.match(route.path);

      request.params = { ...routeParams?.groups };

      return route?.handler(request, response);
    }

    return response.writeHead(401).end();
  }
);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
