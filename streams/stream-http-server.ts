import http from "http";
import { Transform, TransformCallback } from "stream";

class InverseNumberStream extends Transform {
  _transform(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(transformed.toString()));
  }
}

const server = http.createServer(async (request, response) => {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return response.end(fullStreamContent);

  // return request.pipe(new InverseNumberStream()).pipe(response);
});

server.listen(3335);
