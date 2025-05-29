import { config } from "dotenv";
import { IncomingMessage, ServerResponse } from "node:http";
import { json } from "./middlewares/json.js";
config();
import http from "node:http";
import { routes } from "./routes.js";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
} from "./Request.js";
import { extractQueryParams } from "./utils/extract-query-params.js";
const port = process.env.PORT || 3000;

const server = http.createServer(
  async (
    request: RequestWithBody & RequestWithParams & RequestWithQuery,
    response: ServerResponse
  ) => {
    const { method, url } = request;

    await json(request, response);

    const route = routes.find((route) => {
      return route.method === method && route.path.test(url ?? "");
    });

    if (route) {
      const routeParams = url?.match(route.path);
      if (routeParams?.groups) {
        const { query, ...params } = routeParams.groups;
        request.params = params;
        request.query = query ? extractQueryParams(query) : {};
      }

      return route?.handler(request, response);
    }

    return response.writeHead(401).end();
  }
);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
