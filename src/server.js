const http = require("http");
const { Readable } = require("node:stream");
const { randomUUID } = require("node:crypto");

function* run() {
  for (let index = 0; index <= 1500; index++) {
    const data = {
      id: randomUUID(),
      name: `Matt-${index}`,
      at: Date.now(),
    };
    yield data;
  }
}

function handler(request, response) {
  const readableStream = Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat("\n"));
      }
      this.push(null);
    },
  });

  readableStream.pipe(response);
}

http
  .createServer(handler)
  .listen(3000)
  .on("listening", () => console.log("Server listening on 3000"));
