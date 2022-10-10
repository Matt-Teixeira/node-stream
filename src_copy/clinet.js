const { get } = require("node:http");
const fs = require("fs");
const { Transform, Writable } = require("node:stream");

const url = "http://localhost:3000";

const getHTTPStream = () =>
  new Promise((resolve) => get(url, (response) => resolve(response)));

const run = async () => {
  const stream = await getHTTPStream();

  let writeStream = fs.createWriteStream('./output');

  stream.pipe(
    Transform({
        transform(chunk, enc, cb) {
            //console.log('Chunk ', JSON.parse(chunk))
            let item = chunk.toString()
            /* const myNumRe = /\d+/
            let myNum = item.match(myNumRe)
            if (myNum === null) {
              console.log("Complete")
              return
            }
            const isEven = myNum[0] % 2 === 0
            item = item.concat(isEven ? ' and id is even \n' : ' but id is odd \n') */

            cb(null, JSON.stringify(item))
            //cb(null, chunk)
        }
    })
  )
  .pipe(writeStream);
};

run();
