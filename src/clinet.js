const { get } = require("node:http");
const fs = require("fs");
const { Transform, Writable } = require("node:stream");
const { createWriteStream } = require("node:fs");

const url = "http://localhost:3000";

const getHTTPStream = () =>
  new Promise((resolve) => get(url, (response) => resolve(response)));

const run = async () => {
  const stream = await getHTTPStream();

  stream.pipe(
    Transform({
      // Force stream to use strings instead of buffers
      objectMode: true,
        transform(chunk, enc, cb) {
          
            //console.log('Chunk ', JSON.parse(chunk))
            const item = JSON.parse(chunk)
            
            const myNum = /\d+/.exec(item.name)[0]
            const isEven = myNum % 2 === 0
            item.name = item.name.concat(isEven ? ' is even' : ' is odd')
            
            cb(null, JSON.stringify(item))
        }
    })
    .pipe(
      // flag 'a' append data
      createWriteStream('data.txt', {flags: 'a'})
    )
  )
};

run();
