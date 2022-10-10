const http = require("http");
const { Readable } = require("node:stream");
const { randomUUID } = require("node:crypto");

function* run() {
  for (let index = 0; index <= 5000; index++) {
    let data = `You are a developer: Matt-${index}: ${randomUUID()}`
    yield data;
  }
}

function handler(request, response) {
  const readableStream = Readable({
    read() {
      for (const data of run()) {
        this.push(data);
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
