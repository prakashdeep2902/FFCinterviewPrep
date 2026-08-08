// import cluster from "node:cluster";
// import http from "node:http";
// import { availableParallelism } from "node:os";

// // 1. Identify the number of logical CPU cores available
// const numCPUs = availableParallelism();

// if (cluster.isPrimary) {
//   console.log(`Primary system process ${process.pid} is online.`);

//   // 2. Fork worker processes equivalent to the total CPU core count
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   // 3. Monitor worker lifecycle and respawn them if they crash
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker process ${worker.process.pid} died. Respawning...`);
//     cluster.fork();
//   });
// } else {
//   // 4. Workers execute individual server instances sharing port 3000
//   http
//     .createServer((req, res) => {
//       res.writeHead(200);
//       res.end(`Handled by worker process ID: ${process.pid}\n`);
//     })
//     .listen(3000);

//   console.log(`Worker process ${process.pid} started and listening.`);
// }

Array.prototype.myMap = function (callback) {
  const result = [];
  console.log(this);
  console.log(callback());

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};

const arr = [1, 2, 3];

const output = arr.myMap((num) => num * 2);

console.log(output);
