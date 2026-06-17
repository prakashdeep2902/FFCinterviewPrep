# JavaScript Interview Questions & Answers

## 1. What is the difference between var, let, and const?

**Answer:**
`var` is function-scoped and can be redeclared. `let` and `const` are block-scoped; `const` cannot be reassigned.

**Real-Life Example:**
`var` = Whiteboard anyone can modify.
`let` = Personal notebook.
`const` = Printed document.

**Working Example:**

```js
var a = 10;
var a = 20; // Allowed

let b = 10;
// let b = 20; // Error

const c = 10;
// c = 20; // Error
```

---

## 2. What is hoisting in JavaScript?

**Answer:**
Hoisting moves variable and function declarations to the top of their scope before execution.

**Real-Life Example:**
Adding employee names to the attendance sheet before they arrive.

**Working Example:**

```js
console.log(a);

var a = 10;
```

Output:

```text
undefined
```

---

## 3. What is the Temporal Dead Zone (TDZ)?

**Answer:**
TDZ is the period between entering a scope and declaring a `let` or `const` variable where it cannot be accessed.

**Real-Life Example:**
A reserved hotel room exists but can't be used before check-in.

**Working Example:**

```js
console.log(a);

let a = 10;
```

Output:

```text
ReferenceError
```

---

## 4. What are closures and how do they work?

**Answer:**
A closure allows a function to access variables from its outer scope even after the outer function has finished executing.

**Real-Life Example:**
A child remembers information taught by a parent even after the parent leaves.

**Working Example:**

```js
function outer() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const increment = outer();

increment();
increment();
```

---

## 5. What is the difference between == and ===?

**Answer:**
`==` compares values after type conversion. `===` compares both value and type.

**Real-Life Example:**
Comparing only names vs comparing name and ID card.

**Working Example:**

```js
console.log(5 == "5"); // true
console.log(5 === "5"); // false
```

---

## 6. What are primitive and non-primitive data types?

**Answer:**
Primitive types store single values. Non-primitive types store collections of data.

**Real-Life Example:**
Primitive = Single book.
Non-primitive = Library.

**Working Example:**

```js
let name = "John"; // Primitive

let user = {
  name: "John",
}; // Non-Primitive
```

---

## 7. What is the difference between null and undefined?

**Answer:**
`undefined` means a value has not been assigned. `null` means intentionally empty.

**Real-Life Example:**
Undefined = Seat not assigned.
Null = Seat intentionally left empty.

**Working Example:**

```js
let a;
console.log(a);

let b = null;
console.log(b);
```

---

## 8. What is the event loop in JavaScript?

**Answer:**
The Event Loop checks the Call Stack and executes queued asynchronous tasks when the stack becomes empty.

**Real-Life Example:**
A manager processes pending tasks whenever free.

**Working Example:**

```js
console.log("Start");

setTimeout(() => {
  console.log("Async");
}, 0);

console.log("End");
```

---

## 9. What are microtasks and macrotasks?

**Answer:**
Microtasks (Promises) execute before Macrotasks (`setTimeout`, `setInterval`).

**Real-Life Example:**
Urgent emails are handled before scheduled meetings.

**Working Example:**

```js
setTimeout(() => console.log("Timeout"));

Promise.resolve().then(() => {
  console.log("Promise");
});
```

Output:

```text
Promise
Timeout
```

---

## 10. How does the call stack work?

**Answer:**
The Call Stack keeps track of function execution order using a Last-In-First-Out (LIFO) mechanism.

**Real-Life Example:**
A stack of plates where the last plate placed is removed first.

**Working Example:**

```js
function one() {
  two();
}

function two() {
  console.log("Two");
}

one();
```

---

## 11. What is the difference between synchronous and asynchronous code?

**Answer:**
Synchronous code runs line by line. Asynchronous code allows other tasks to continue while waiting.

**Real-Life Example:**
Waiting in line vs taking a token and returning later.

**Working Example:**

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 1000);

console.log("3");
```

---

## 12. What are callbacks and callback hell?

**Answer:**
A callback is a function passed to another function. Callback hell occurs when many callbacks are nested.

**Real-Life Example:**
Calling one person who tells another person who tells another.

**Working Example:**

```js
getUser(() => {
  getOrders(() => {
    getPayment(() => {
      console.log("Done");
    });
  });
});
```

---

## 13. What are Promises and why are they used?

**Answer:**
Promises represent future completion or failure of an asynchronous operation.

**Real-Life Example:**
Tracking an online order until delivery.

**Working Example:**

```js
const promise = Promise.resolve("Success");

promise.then(console.log);
```

---

## 14. What is the difference between Promise chaining and async/await?

**Answer:**
Promise chaining uses `.then()`. `async/await` provides cleaner and more readable syntax.

**Real-Life Example:**
Reading step-by-step instructions vs having a personal assistant guide you.

**Working Example:**

```js
async function getData() {
  const result = await Promise.resolve("Done");
  console.log(result);
}
```

---

## 15. Explain Promise.all(), Promise.allSettled(), Promise.race(), and Promise.any().

**Answer:**

- `Promise.all()` → Waits for all promises.
- `Promise.allSettled()` → Returns all results regardless of success/failure.
- `Promise.race()` → Returns first completed promise.
- `Promise.any()` → Returns first successful promise.

**Real-Life Example:**
Multiple delivery drivers competing to deliver first.

**Working Example:**

```js
Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(console.log);
```

---

## 16. What is the this keyword and how does it behave?

**Answer:**
`this` refers to the object that calls the function.

**Real-Life Example:**
"Me" changes depending on who is speaking.

**Working Example:**

```js
const user = {
  name: "John",
  show() {
    console.log(this.name);
  },
};

user.show();
```

---

## 17. What is the difference between regular functions and arrow functions?

**Answer:**
Regular functions have their own `this`. Arrow functions inherit `this` from the surrounding scope.

**Real-Life Example:**
Regular function = Independent employee.
Arrow function = Assistant following the manager.

**Working Example:**

```js
const obj = {
  name: "John",

  regular() {
    console.log(this.name);
  },

  arrow: () => {
    console.log(this);
  },
};
```

---

## 18. What are higher-order functions?

**Answer:**
Functions that take other functions as arguments or return functions.

**Real-Life Example:**
A manager assigning work to employees.

**Working Example:**

```js
function greet(fn) {
  fn();
}

greet(() => console.log("Hello"));
```

---

## 19. What are pure functions?

**Answer:**
Pure functions always return the same output for the same input and have no side effects.

**Real-Life Example:**
A calculator always gives the same result for the same numbers.

**Working Example:**

```js
function add(a, b) {
  return a + b;
}
```

---

## 20. What is function currying?

**Answer:**
Currying converts a function with multiple arguments into nested functions with one argument each.

**Real-Life Example:**
Ordering pizza step by step: size → toppings → payment.

**Working Example:**

```js
function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(2)(3));
```

---

## 21. What is the prototype chain?

**Answer:**
Objects inherit properties from other objects through the prototype chain.

**Real-Life Example:**
Children inherit traits from parents and grandparents.

**Working Example:**

```js
const user = {
  role: "Admin",
};

const admin = Object.create(user);

console.log(admin.role);
```

---

## 22. What is the difference between prototypal inheritance and classical inheritance?

**Answer:**
JavaScript uses prototypal inheritance where objects inherit from objects. Classical inheritance uses classes.

**Real-Life Example:**
Copying directly from a mentor vs following a formal hierarchy.

**Working Example:**

```js
const parent = {
  greet() {
    console.log("Hello");
  },
};

const child = Object.create(parent);
```

---

## 23. How do ES6 classes work under the hood?

**Answer:**
ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance.

**Real-Life Example:**
A modern-looking car built on an existing engine.

**Working Example:**

```js
class User {
  greet() {
    console.log("Hello");
  }
}
```

---

## 24. What is the difference between shallow copy and deep copy?

**Answer:**
Shallow copy copies references of nested objects. Deep copy creates completely independent copies.

**Real-Life Example:**
Photocopying a document vs recreating it from scratch.

**Working Example:**

```js
const user = {
  name: "John",
};

const copy = { ...user };
```

---

## 25. Explain object destructuring and array destructuring.

**Answer:**
Destructuring extracts values from objects or arrays into variables.

**Real-Life Example:**
Taking specific items from a toolbox.

**Working Example:**

```js
const user = {
  name: "John",
};

const { name } = user;

const arr = [1, 2];
const [a, b] = arr;
```

---

## 26. What is the spread operator (...) and rest parameter?

**Answer:**
Spread expands values. Rest collects multiple values into an array.

**Real-Life Example:**
Spread = Unpacking a suitcase.
Rest = Packing items into a suitcase.

**Working Example:**

```js
const arr = [1, 2];

const newArr = [...arr];

function sum(...nums) {
  return nums;
}
```

---

## 27. What are modules in JavaScript?

**Answer:**
Modules help split code into reusable files using `export` and `import`.

**Real-Life Example:**
Different departments working independently in a company.

**Working Example:**

```js
export const name = "John";

import { name } from "./user.js";
```

---

## 28. What is event delegation and why is it useful?

**Answer:**
Event delegation attaches a single event listener to a parent element instead of multiple child elements.

**Real-Life Example:**
One manager handling all employee requests.

**Working Example:**

```js
document.getElementById("list").addEventListener("click", (e) => {
  console.log(e.target);
});
```

---

## 29. How does debouncing differ from throttling?

**Answer:**
Debouncing delays execution until events stop. Throttling limits execution to fixed intervals.

**Real-Life Example:**
Debounce = Send one message after typing stops.
Throttle = Send one message every 5 seconds.

**Working Example:**

```js
const debounce = (fn, delay) => {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
};
```

---

## 30. What are memory leaks and how can they be prevented?

**Answer:**
Memory leaks occur when unused objects remain referenced and cannot be garbage collected.

**Real-Life Example:**
Keeping unnecessary files forever.

**Working Example:**

```js
let data = {};

data = null;
```

---

# Senior-Level Quick Answers

### What is Lexical Scope?

Variables are accessible based on where they are defined, not where they are called.

```js
function outer() {
  let x = 10;

  function inner() {
    console.log(x);
  }

  inner();
}
```

---

### How does JavaScript handle garbage collection?

Objects with no references are automatically removed from memory by the JavaScript engine.

```js
let user = {};
user = null;
```

---

### call() vs apply() vs bind()

| Method  | Execution | Arguments |
| ------- | --------- | --------- |
| call()  | Immediate | Separate  |
| apply() | Immediate | Array     |
| bind()  | Later     | Separate  |

```js
fn.call(obj, 1, 2);
fn.apply(obj, [1, 2]);
const newFn = fn.bind(obj);
```

---

### Currying vs Partial Application

**Currying:** Converts functions into nested single-argument functions.

**Partial Application:** Pre-fills some arguments and returns a new function.

```js
const add = (a) => (b) => a + b;
```

---

### How does setTimeout() work internally?

`setTimeout()` registers a timer with Browser APIs/Web APIs. After the delay, the callback enters the Callback Queue and waits for the Event Loop.

```js
setTimeout(() => {
  console.log("Done");
}, 1000);
```

---

### Execution Context Phases

1. Creation Phase
   - Memory Allocation
   - Hoisting

2. Execution Phase
   - Code Execution

```js
console.log(a);

var a = 10;
```

---

### Map vs WeakMap vs Set vs WeakSet

| Type    | Keys          | Garbage Collection |
| ------- | ------------- | ------------------ |
| Map     | Any           | No                 |
| WeakMap | Objects       | Yes                |
| Set     | Unique Values | No                 |
| WeakSet | Objects       | Yes                |

```js
const map = new Map();
const set = new Set();
```

---

### What are Generators and Iterators?

Generators pause and resume execution using `yield`.

```js
function* gen() {
  yield 1;
  yield 2;
}
```

---

### What are Symbols?

Symbols create unique identifiers for object properties.

```js
const id = Symbol("id");
```

---

### JavaScript Engine Lifecycle

```text
Code
 ↓
Parsing
 ↓
AST
 ↓
Compilation
 ↓
Execution Context
 ↓
Call Stack
 ↓
Event Loop
 ↓
Output
```

---

# 5 Most Asked Senior JavaScript Topics

```text
1. Event Loop
2. Closures
3. Hoisting & TDZ
4. Prototypes & Inheritance
5. Async/Await & Promises
```

If these 5 are strong, you can answer about 70% of JavaScript interview questions confidently.
