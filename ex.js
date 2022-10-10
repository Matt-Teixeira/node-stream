/* 1
const std_in = process.stdin
.on("data", msg => console.log("OUTPUT: ", msg));

const std_out = process.stdout
.on('data', msg => process.stdout.write(msg.toString().toUpperCase()));

std_in.pipe(std_out); 
*/

// 2 node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.txt
const http = require("http");
const { readFileSync, createReadStream } = require("fs");
http
  .createServer((request, response) => {
    /* const file = readFileSync("big.txt");
    response.write(file)
    response.end() */
    createReadStream('big.txt')
    .pipe(response)
  })
  .listen(5001)
  .on("listening", () => console.log("Server listening on 3000"));
