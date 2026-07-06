Perfect for interview revision. Below is a **GitHub-friendly Markdown (`.md`) format** with:

- **Definition:** 2-3 simple lines
- **Real-Life Example:** Easy to remember
- **Working Example:** Short code snippet

---

# Node.js Interview Questions & Answers

## 1. What is Node.js and how does it work?

**Answer:**
Node.js is a JavaScript runtime that allows JavaScript to run outside the browser. It uses a single-threaded, event-driven architecture with a non-blocking I/O model.

**Real-Life Example:**
A waiter takes multiple orders without waiting for one customer's food to be prepared.

**Working Example:**

```js
console.log("Start");

setTimeout(() => {
  console.log("Task Completed");
}, 2000);

console.log("End");
```

---

## 2. What are the advantages of using Node.js?

**Answer:**
Node.js is fast, scalable, lightweight, and handles many concurrent requests efficiently. It uses JavaScript on both frontend and backend.

**Real-Life Example:**
One person managing multiple customer requests instead of hiring multiple employees.

**Working Example:**

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello Node.js");
  })
  .listen(3000);
```

---

## 3. What is the difference between Node.js and JavaScript?

**Answer:**
JavaScript is a programming language. Node.js is a runtime environment that executes JavaScript outside the browser.

**Real-Life Example:**
JavaScript is like fuel, and Node.js is the engine that uses that fuel.

**Working Example:**

```js
// Browser
alert("Hello");

// Node.js
console.log("Hello");
```

---

## 4. How does Node.js handle multiple requests simultaneously?

**Answer:**
Node.js uses the Event Loop and non-blocking I/O to handle many requests without creating a new thread for each request.

**Real-Life Example:**
A receptionist receives calls and forwards them without staying on each call.

**Working Example:**

```js
setTimeout(() => console.log("Request 1"), 2000);
setTimeout(() => console.log("Request 2"), 1000);

console.log("Server Running");
```

---

## 5. What is the Event Loop in Node.js?

**Answer:**
The Event Loop continuously checks the call stack and callback queue and executes pending tasks.

**Real-Life Example:**
A manager checking a task queue and assigning work whenever free.

**Working Example:**

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Timer
```

---

## 6. What are the different phases of the Event Loop?

**Answer:**
The phases are Timers, Pending Callbacks, Idle/Prepare, Poll, Check, and Close Callbacks.

**Real-Life Example:**
An airport has different checkpoints before boarding.

**Working Example:**

```js
setTimeout(() => console.log("Timer"), 0);

setImmediate(() => {
  console.log("Immediate");
});
```

---

## 7. What is non-blocking I/O in Node.js?

**Answer:**
Non-blocking I/O allows Node.js to continue executing other tasks while waiting for I/O operations to finish.

**Real-Life Example:**
Ordering food and talking to friends while waiting for it.

**Working Example:**

```js
const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  console.log(data);
});

console.log("Reading file...");
```

---

## 8. What is the difference between synchronous and asynchronous methods?

**Answer:**
Synchronous methods block execution until completed. Asynchronous methods run in the background and don't block execution.

**Real-Life Example:**
Waiting in line vs taking a token and coming back later.

**Working Example:**

```js
// Sync
fs.readFileSync("test.txt");

// Async
fs.readFile("test.txt", () => {});
```

---

## 9. What is the difference between process.nextTick(), setImmediate(), and setTimeout()?

**Answer:**
`process.nextTick()` executes first, `setImmediate()` executes in the check phase, and `setTimeout()` executes after the specified delay.

**Real-Life Example:**
Urgent task → scheduled task → delayed task.

**Working Example:**

```js
setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => console.log("Immediate"));

process.nextTick(() => console.log("NextTick"));
```

---

## 10. What is a callback function in Node.js?

**Answer:**
A callback is a function passed as an argument and executed after another function completes.

**Real-Life Example:**
Leaving your phone number and getting called back later.

**Working Example:**

```js
function greet(callback) {
  console.log("Hello");
  callback();
}

greet(() => console.log("Callback Executed"));
```

---

## 11. What are Promises and async/await in Node.js?

**Answer:**
Promises handle asynchronous operations more cleanly. `async/await` makes Promise-based code look synchronous.

**Real-Life Example:**
Tracking an online order until it gets delivered.

**Working Example:**

```js
async function getData() {
  return "Data Received";
}

getData().then(console.log);
```

---

## 12. How does error handling work in asynchronous code?

**Answer:**
Use `.catch()` with Promises and `try...catch` with async/await.

**Real-Life Example:**
Having a backup plan if something goes wrong.

**Working Example:**

```js
async function test() {
  try {
    throw new Error("Something went wrong");
  } catch (err) {
    console.log(err.message);
  }
}

test();
```

---

## 13. What are streams in Node.js?

**Answer:**
Streams process data in chunks instead of loading everything into memory at once.

**Real-Life Example:**
Drinking water through a straw instead of a bucket.

**Working Example:**

```js
const fs = require("fs");

const stream = fs.createReadStream("file.txt");

stream.on("data", (chunk) => {
  console.log(chunk.toString());
});
```

```js
import express from "express";
import fs from "node:fs";
import zlib from "node:zlib";
import statusMonitor from "express-status-monitor";

const app = express();
const PORT = 5000;

app.use(statusMonitor());

// Compress file
fs.createReadStream("./bigData.json")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("./bigData.json.gz"));

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```

```js
import express from "express";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";
import statusMonitor from "express-status-monitor";

await pipeline(
  fs.createReadStream("./bigData.json"),
  zlib.createGzip(),
  fs.createWriteStream("./bigData.json.gz"),
);
```

---

## 14. What are the different types of streams?

**Answer:**
Readable, Writable, Duplex, and Transform streams.

**Real-Life Example:**
Reading, writing, reading/writing together, and converting data.

**Working Example:**

```js
process.stdin.pipe(process.stdout);
```

---

## 15. What is piping in Node.js?

**Answer:**
Piping connects one stream's output directly to another stream's input.

**Real-Life Example:**
Connecting two water pipes.

**Working Example:**

```js
const fs = require("fs");

fs.createReadStream("input.txt").pipe(fs.createWriteStream("output.txt"));
```

---

## 16. What are buffers in Node.js?

**Answer:**
Buffers store binary data temporarily in memory.

**Real-Life Example:**
A waiting area where data stays before processing.

**Working Example:**

```js
const buffer = Buffer.from("Hello");

console.log(buffer);
```

---

## 17. What is the purpose of the fs module?

**Answer:**
The `fs` module is used to read, write, update, and delete files.

**Real-Life Example:**
A file manager on your computer.

**Working Example:**

```js
const fs = require("fs");

fs.writeFileSync("test.txt", "Hello");
```

---

## 18. What is the purpose of the path module?

**Answer:**
The `path` module helps work with file and directory paths.

**Real-Life Example:**
Google Maps showing the correct route.

**Working Example:**

```js
const path = require("path");

console.log(path.join("users", "admin"));
```

---

## 19. What is the purpose of the os module?

**Answer:**
The `os` module provides information about the operating system.

**Real-Life Example:**
Checking your laptop's specifications.

**Working Example:**

```js
const os = require("os");

console.log(os.platform());
```

---

## 20. What are child processes in Node.js?

**Answer:**
Child processes allow Node.js to execute external commands or scripts.

**Real-Life Example:**
A manager delegating work to another employee.

**Working Example:**

```js
const { exec } = require("child_process");

exec("dir", (err, stdout) => {
  console.log(stdout);
});
```

---

## 21. What is the cluster module and why is it used?

**Answer:**
The cluster module creates multiple Node.js processes to utilize all CPU cores.

**Real-Life Example:**
Opening multiple billing counters in a supermarket.

**Working Example:**

```js
const cluster = require("cluster");

if (cluster.isPrimary) {
  cluster.fork();
}
```

---

## 22. What is middleware in Node.js applications?

**Answer:**
Middleware functions execute between receiving a request and sending a response.

**Real-Life Example:**
A security guard checking visitors before entry.

**Working Example:**

```js
app.use((req, res, next) => {
  console.log("Middleware");
  next();
});
```

---

## 23. What is the difference between CommonJS and ES Modules?

**Answer:**
CommonJS uses `require()` and `module.exports`. ES Modules use `import` and `export`.

**Real-Life Example:**
Two different ways to import products into a store.

**Working Example:**

```js
// CommonJS
const math = require("./math");

// ES Module
import math from "./math.js";
```

---

## 24. What is package.json and why is it important?

**Answer:**
`package.json` stores project information, dependencies, and scripts.

**Real-Life Example:**
A project's identity card.

**Working Example:**

```json
{
  "name": "my-app",
  "version": "1.0.0"
}
```

---

## 25. What is the purpose of npm?

**Answer:**
npm is the package manager used to install and manage Node.js packages.

**Real-Life Example:**
An app store for developers.

**Working Example:**

```bash
npm install express
```

---

## 26. What is the difference between dependencies and devDependencies?

**Answer:**
Dependencies are required in production. devDependencies are only needed during development.

**Real-Life Example:**
Car engine vs repair tools.

**Working Example:**

```bash
npm install express
npm install nodemon --save-dev
```

---

## 27. What are environment variables in Node.js?

**Answer:**
Environment variables store configuration values outside the source code.

**Real-Life Example:**
Keeping passwords in a locker instead of writing them on a wall.

**Working Example:**

```js
console.log(process.env.PORT);
```

---

## 28. How do you secure a Node.js application?

**Answer:**
Use input validation, HTTPS, authentication, authorization, and environment variables for sensitive data.

**Real-Life Example:**
Locking doors and verifying visitors before entry.

**Working Example:**

```js
const helmet = require("helmet");

app.use(helmet());
```

---

## 29. How do you handle uncaught exceptions and unhandled promise rejections?

**Answer:**
Use global handlers to log errors and shut down the application safely.

**Real-Life Example:**
An emergency alarm system in a building.

**Working Example:**

```js
process.on("uncaughtException", (err) => {
  console.log(err.message);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});
```

---

## 30. How can you improve the performance of a Node.js application?

**Answer:**
Use caching, clustering, streams, database indexing, and avoid blocking code.

**Real-Life Example:**
Using multiple checkout counters and faster payment systems.

**Working Example:**

```js
const cluster = require("cluster");

if (cluster.isPrimary) {
  cluster.fork();
}
```

---

### Quick Revision Formula

```text
Node.js = JavaScript Runtime

Concurrency = Event Loop + Non-Blocking I/O

Async Tools:
Callback → Promise → Async/Await

Core Modules:
fs → Files
path → Paths
os → OS Info

Streams:
Readable
Writable
Duplex
Transform

Modules:
CommonJS → require
ESM → import

Packages:
npm
package.json

Scaling:
Cluster
Child Process

Security:
Helmet
Validation
HTTPS
JWT

Performance:
Caching
Streams
Clustering
Indexing
```

This is the level of answer that usually works well for **2–4 years Node.js interview rounds** and is easy to revise before an interview.

# Express.js Interview Questions & Answers

## 1. What is Express.js and why is it used?

**Answer:**
Express.js is a lightweight web framework for Node.js that helps build APIs and web applications easily. It provides routing, middleware, and request handling.

**Real-Life Example:**
Express is like a restaurant manager who directs customers to the correct table quickly.

**Working Example:**

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(3000);
```

---

## 2. How do you create routes in Express.js?

**Answer:**
Routes define how the server responds to different URLs and HTTP methods like GET, POST, PUT, and DELETE.

**Real-Life Example:**
Different counters in a bank handle different services.

**Working Example:**

```js
app.get("/users", (req, res) => {
  res.send("Get Users");
});

app.post("/users", (req, res) => {
  res.send("Create User");
});
```

---

## 3. What is middleware in Express.js?

**Answer:**
Middleware is a function that runs between the request and response cycle. It can modify requests, responses, or execute additional logic.

**Real-Life Example:**
A security guard checks visitors before they enter a building.

**Working Example:**

```js
app.use((req, res, next) => {
  console.log("Request Received");
  next();
});
```

---

## 4. What is the difference between application-level and router-level middleware?

**Answer:**
Application-level middleware applies to the entire app, while router-level middleware applies only to specific routes.

**Real-Life Example:**
Building security checks everyone; department security checks only visitors of that department.

**Working Example:**

```js
// Application-level
app.use((req, res, next) => {
  console.log("Global Middleware");
  next();
});

// Router-level
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router Middleware");
  next();
});
```

---

## 5. How do you handle errors in Express.js?

**Answer:**
Use error-handling middleware with four parameters: `err, req, res, next`.

**Real-Life Example:**
A customer support desk handles complaints when something goes wrong.

**Working Example:**

```js
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});
```

---

## 6. What is the purpose of next() in Express.js?

**Answer:**
`next()` passes control to the next middleware or route handler in the request cycle.

**Real-Life Example:**
A receptionist forwards a visitor to the next department.

**Working Example:**

```js
app.use((req, res, next) => {
  console.log("Step 1");
  next();
});

app.get("/", (req, res) => {
  res.send("Step 2");
});
```

---

## 7. How do you serve static files in Express.js?

**Answer:**
Use `express.static()` to serve files like images, CSS, and JavaScript.

**Real-Life Example:**
A library allows visitors to directly access books from shelves.

**Working Example:**

```js
app.use(express.static("public"));
```

Folder Structure:

```text
project/
 ├─ public/
 │   └─ logo.png
 └─ app.js
```

Access:

```text
http://localhost:3000/logo.png
```

---

## 8. What is CORS and how do you enable it?

**Answer:**
CORS (Cross-Origin Resource Sharing) allows requests between different domains or origins.

**Real-Life Example:**
A company allowing employees from another branch to access its resources.

**Working Example:**

```js
const cors = require("cors");

app.use(cors());
```

Specific Origin:

```js
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
```

---

## 9. How do you implement authentication and authorization in Express.js?

**Answer:**
Authentication verifies who the user is, while authorization checks what the user is allowed to access.

**Real-Life Example:**
Showing an ID card (authentication) and checking access permissions (authorization).

**Working Example:**

```js
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  next();
}

app.get("/profile", auth, (req, res) => {
  res.send("Welcome User");
});
```

---

## 10. What is the difference between cookies, sessions, and JWT?

**Answer:**

| Feature     | Cookies          | Sessions       | JWT    |
| ----------- | ---------------- | -------------- | ------ |
| Storage     | Browser          | Server         | Client |
| Stateful    | No               | Yes            | No     |
| Scalability | Medium           | Low            | High   |
| Common Use  | User preferences | Login sessions | APIs   |

**Real-Life Example:**

- **Cookie:** Visitor pass stored with the visitor.
- **Session:** Hotel keeps guest details in its database.
- **JWT:** Digital ID card containing user information.

**Working Example (Cookie):**

```js
res.cookie("user", "prakash");
```

**Working Example (Session):**

```js
req.session.user = "prakash";
```

**Working Example (JWT):**

```js
const jwt = require("jsonwebtoken");

const token = jwt.sign({ id: 1 }, "secretKey");

console.log(token);
```

---

## Quick Revision Formula

```text
Express.js = Node.js Framework

Routing:
GET
POST
PUT
DELETE

Middleware:
Request → Middleware → Response

next() = Move to next middleware

Types of Middleware:
Application-Level
Router-Level
Error-Handling

Static Files:
express.static()

CORS:
Allows cross-origin requests

Security:
Authentication = Who are you?
Authorization = What can you access?

User State:
Cookie = Browser Storage
Session = Server Storage
JWT = Token-Based Authentication
```

**Most Asked Interview One-Liner:**

```text
Authentication = Verify Identity
Authorization = Verify Permissions

Cookie = Stored in Browser
Session = Stored on Server
JWT = Stored on Client and Verified by Server
```

# Advanced Node.js Interview Questions & Answers

## 1. How does the Node.js Event Loop work internally?

**Answer:**
The Event Loop continuously checks the Call Stack and Callback Queues. When the stack is empty, it executes pending callbacks from different phases like Timers, Poll, and Check.

**Real-Life Example:**
A manager checks a task queue and picks the next task whenever he becomes free.

**Working Example:**

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

Output:

```text
Start
End
Promise
Timer
```

---

## 2. What happens internally when an HTTP request reaches a Node.js server?

**Answer:**
The request is received by the Event Loop, routed to the correct handler, asynchronous tasks are delegated to the OS/libuv thread pool, and the response is sent back when processing completes.

**Real-Life Example:**
A receptionist receives a customer request, forwards it to the right department, and delivers the result back.

**Working Example:**

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.end("Request Processed");
  })
  .listen(3000);
```

Flow:

```text
Client
  ↓
HTTP Server
  ↓
Event Loop
  ↓
Route Handler
  ↓
Response
```

---

## 3. What is the difference between worker threads and child processes?

**Answer:**
Worker Threads share memory with the main process and are used for CPU-intensive tasks. Child Processes run in separate memory spaces and can execute separate programs.

**Real-Life Example:**
Worker Thread = Team member in the same office.
Child Process = Outsourced team in another office.

**Working Example:**

```js
const { Worker } = require("worker_threads");

new Worker("./worker.js");
```

```js
const { fork } = require("child_process");

fork("./child.js");
```

---

## 4. How does Node.js achieve scalability despite being single-threaded?

**Answer:**
Node.js uses the Event Loop, non-blocking I/O, worker threads, clustering, and load balancing to handle many requests efficiently.

**Real-Life Example:**
One cashier takes orders while multiple kitchen staff prepare food.

**Working Example:**

```js
const cluster = require("cluster");

if (cluster.isPrimary) {
  cluster.fork();
}
```

---

## 5. What are memory leaks in Node.js and how can they be prevented?

**Answer:**
Memory leaks occur when unused objects remain in memory and are never released. Prevent them by removing references, clearing timers, and avoiding global variables.

**Real-Life Example:**
Keeping old files on your desk forever, causing clutter.

**Working Example:**

```js
let users = [];

function addUser(user) {
  users.push(user);
}

// Remove unused data
users = [];
```

---

## 6. What is backpressure in streams?

**Answer:**
Backpressure happens when data is produced faster than it can be consumed. Streams automatically manage this flow to prevent memory issues.

**Real-Life Example:**
Water entering a pipe faster than it can leave.

**Working Example:**

```js
const fs = require("fs");

const readStream = fs.createReadStream("bigfile.txt");
const writeStream = fs.createWriteStream("copy.txt");

readStream.pipe(writeStream);
```

---

## 7. How does garbage collection work in Node.js?

**Answer:**
Node.js uses the V8 Garbage Collector to automatically remove objects that are no longer reachable in memory.

**Real-Life Example:**
A cleaning staff removes unused items from an office.

**Working Example:**

```js
let data = { name: "John" };

data = null; // Eligible for garbage collection
```

---

## 8. What are design patterns commonly used in Node.js applications?

**Answer:**

Common patterns:

- Singleton
- Factory
- Observer
- Middleware
- Repository

**Real-Life Example:**
Using standard building blueprints instead of designing every building from scratch.

**Working Example (Singleton):**

```js
class Database {
  static instance;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
```

---

## 9. How would you structure a large-scale Node.js project?

**Answer:**
Separate code into modules like routes, controllers, services, models, middleware, and utilities for better maintainability.

**Real-Life Example:**
A company has separate HR, Finance, and Engineering departments.

**Working Example:**

```text
src/
├── routes/
├── controllers/
├── services/
├── models/
├── middleware/
├── utils/
└── app.js
```

Example Flow:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Database
```

---

## 10. How would you design and optimize a high-traffic Node.js API?

**Answer:**
Use caching, database indexing, load balancing, clustering, pagination, compression, and rate limiting.

**Real-Life Example:**
Opening multiple counters and using a token system in a busy bank.

**Working Example:**

```js
const compression = require("compression");

app.use(compression());
```

Rate Limiting:

```js
const rateLimit = require("express-rate-limit");

app.use(
  rateLimit({
    windowMs: 60000,
    max: 100,
  }),
);
```

Caching Example:

```js
const redis = require("redis");

// Store frequently used data in Redis
```

---

# Quick Revision Formula

```text
Event Loop:
Call Stack → Queue → Execute

HTTP Request:
Client → Server → Event Loop → Handler → Response

Worker Thread:
Shared Memory
CPU Tasks

Child Process:
Separate Memory
Separate Process

Scalability:
Event Loop
Cluster
Load Balancer
Worker Threads

Memory Leak:
Unused Objects Stay in Memory

Backpressure:
Producer > Consumer Speed

Garbage Collection:
Removes Unreachable Objects

Design Patterns:
Singleton
Factory
Observer
Repository
Middleware

Project Structure:
Routes
Controllers
Services
Models
Middleware

High-Traffic API:
Caching
Compression
Pagination
Indexing
Rate Limiting
Load Balancing
Clustering
```

### Most Asked Senior-Level One-Liner

```text
Node.js is single-threaded for JavaScript execution,
but achieves high scalability using the Event Loop,
non-blocking I/O, libuv thread pool, clustering,
and worker threads.
```
