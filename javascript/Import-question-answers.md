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

## Prototype

**Definition:**
A **Prototype** is an object that allows other objects to **inherit properties and methods**.

Every JavaScript object has a hidden link to its prototype.

---

### Example

```javascript
const person = {
  greet() {
    console.log("Hello");
  },
};

const user = Object.create(person);

user.greet(); // Hello
```

Here:

- `user` doesn't have `greet()`.
- JavaScript looks in `user`'s **prototype** (`person`) and finds it.

---

### Constructor Function Example

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const p1 = new Person("Prakash");

p1.sayHello(); // Hi, I'm Prakash
```

Instead of creating `sayHello()` for every object, it is stored once on `Person.prototype` and shared by all instances.

---

## Easy to Remember

> **Prototype = A shared object from which other objects inherit properties and methods.**

## Prototype Chain

**Definition:**
The **Prototype Chain** is the chain JavaScript follows to **find a property or method** if it doesn't exist on the object itself.

---

### Example

```javascript
const person = {
  greet() {
    console.log("Hello");
  },
};

const user = Object.create(person);

user.name = "Prakash";

console.log(user.name); // Prakash
user.greet(); // Hello
```

### How JavaScript Searches

When you call:

```javascript
user.greet();
```

JavaScript looks in this order:

```text
user
  ↓
person (prototype)
  ↓
Object.prototype
  ↓
null
```

It finds `greet()` in `person`, so it executes it.

---

### Another Example

```javascript
const arr = [1, 2, 3];

arr.push(4);
```

`arr` doesn't have `push()` directly.

JavaScript searches:

```text
arr
  ↓
Array.prototype   ← push() found here
  ↓
Object.prototype
  ↓
null
```

---

## Easy to Remember

> **Prototype Chain = The path JavaScript follows to look up a property or method until it finds it or reaches `null`.**

## OOP (Object-Oriented Programming) in JavaScript

**Definition:**
OOP is a programming paradigm where code is organized into **objects** that contain **properties (data)** and **methods (functions)**.

---

### Example

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const p1 = new Person("Prakash");
p1.greet(); // Hi, I'm Prakash
```

---

## Four Pillars of OOP

### 1. Encapsulation

**Definition:**
Wrapping data and methods into a single object/class.

**Example:**

```javascript
class BankAccount {
  balance = 1000;

  deposit(amount) {
    this.balance += amount;
  }
}
```

---

### 2. Inheritance

**Definition:**
One class can inherit properties and methods from another class.

**Example:**

```javascript
class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {}

const dog = new Dog();
dog.speak(); // Animal speaks
```

---

### 3. Polymorphism

**Definition:**
The same method behaves differently in different classes.

**Example:**

```javascript
class Animal {
  sound() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  sound() {
    console.log("Bark");
  }
}

new Dog().sound(); // Bark
```

---

### 4. Abstraction

**Definition:**
Hiding implementation details and exposing only what's necessary.

**Example:**

```javascript
class Car {
  start() {
    this.#engine();
    console.log("Car Started");
  }

  #engine() {
    console.log("Engine On");
  }
}

const car = new Car();
car.start();
```

---

## Easy to Remember

- **Encapsulation** → Bundle data + methods.
- **Inheritance** → Reuse code from another class.
- **Polymorphism** → Same method, different behavior.
- **Abstraction** → Hide implementation details.

Here's a simple **Bank System** example that uses **all 4 OOP concepts**.

```javascript
// Parent Class
class BankAccount {
  #balance = 0; // Encapsulation + Abstraction

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    this.#balance += amount;
    console.log(`${this.owner} deposited $${amount}`);
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Insufficient Balance");
      return;
    }

    this.#balance -= amount;
    console.log(`${this.owner} withdrew $${amount}`);
  }

  getBalance() {
    return this.#balance;
  }

  // Polymorphism
  accountType() {
    console.log("This is a Bank Account");
  }
}

// Child Class (Inheritance)
class SavingsAccount extends BankAccount {
  constructor(owner, interestRate) {
    super(owner);
    this.interestRate = interestRate;
  }

  // Polymorphism (Method Overriding)
  accountType() {
    console.log("This is a Savings Account");
  }

  addInterest() {
    console.log(`Interest Rate: ${this.interestRate}%`);
  }
}

// Create Object
const account = new SavingsAccount("Prakash", 5);

account.deposit(1000);
account.withdraw(300);
account.addInterest();
account.accountType();

console.log("Balance:", account.getBalance());
```

### Output

```text
Prakash deposited $1000
Prakash withdrew $300
Interest Rate: 5%
This is a Savings Account
Balance: 700
```

---

## Which OOP Concept is Used?

### 1. Encapsulation ✅

`#balance` is private and can only be accessed through methods.

```javascript
#balance = 0;

deposit() {}
withdraw() {}
getBalance() {}
```

---

### 2. Inheritance ✅

`SavingsAccount` inherits everything from `BankAccount`.

```javascript
class SavingsAccount extends BankAccount {}
```

---

### 3. Polymorphism ✅

The child class overrides the parent's method.

```javascript
// Parent
accountType() {
  console.log("This is a Bank Account");
}

// Child
accountType() {
  console.log("This is a Savings Account");
}
```

Calling:

```javascript
account.accountType();
```

prints:

```text
This is a Savings Account
```

---

### 4. Abstraction ✅

The user doesn't know how the balance is stored or updated.

They simply use:

```javascript
account.deposit(1000);
account.withdraw(300);
account.getBalance();
```

The internal implementation (`#balance`) is hidden.

---

## Interview Tip

This single example demonstrates all four pillars:

- **Encapsulation** → `#balance` is private.
- **Inheritance** → `SavingsAccount extends BankAccount`.
- **Polymorphism** → `accountType()` is overridden.
- **Abstraction** → Users interact with `deposit()`, `withdraw()`, and `getBalance()` without knowing the internal implementation.

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

**Definition:**
Debouncing delays the function execution until the user **stops triggering the event** for a specified time.

**Example:** Search box

- User types continuously → function **doesn't run**
- User stops typing for 500ms → function **runs once**

```javascript
search("p");
search("pr");
search("pra");
search("prakash");

// Runs only once after user stops typing.
```

---

## Throttling

**Definition:**
Throttling limits a function to run **at most once** in a specified time interval.

**Example:** Scroll event

- User scrolls continuously
- Function runs every **500ms**

```javascript
// User scrolls continuously

0ms    ✅ Run
100ms  ❌ Skip
200ms  ❌ Skip
500ms  ✅ Run
1000ms ✅ Run
```

---

## Difference

| Debouncing                          | Throttling                          |
| ----------------------------------- | ----------------------------------- |
| Waits until events stop             | Runs at fixed intervals             |
| Final event is executed             | Executes repeatedly during events   |
| Best for search input, autocomplete | Best for scroll, resize, mouse move |

---

### Easy to Remember

- **Debounce** → **"Wait until the user stops."**
- **Throttle** → **"Run once every X milliseconds."**

---

## 1. Debouncing (Search Input)

**Debounce Function**

```javascript
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

**Usage**

```javascript
function search(query) {
  console.log("Searching:", query);
}

const debouncedSearch = debounce(search, 500);

input.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

> **Runs only after the user stops typing for 500ms.**

---

## 2. Throttling (Scroll Event)

**Throttle Function**

```javascript
function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
```

**Usage**

```javascript
function handleScroll() {
  console.log("Scrolling...");
}

const throttledScroll = throttle(handleScroll, 500);

window.addEventListener("scroll", throttledScroll);
```

> **Runs at most once every 500ms while scrolling.**

---

## Interview Summary

### Debounce

```javascript
const debouncedSearch = debounce(search, 500);
input.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

### Throttle

```javascript
const throttledScroll = throttle(handleScroll, 500);
window.addEventListener("scroll", throttledScroll);
```

### Remember

- **Search bar / Autocomplete** → ✅ Debounce
- **Scroll / Resize / Mouse Move** → ✅ Throttle

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

## `call()`

**Definition:**
Calls a function **immediately** and lets you set the value of `this`. Arguments are passed **one by one**.

**Example:**

```javascript
const person = {
  name: "Prakash",
};

function greet(city) {
  console.log(`Hi, I'm ${this.name} from ${city}`);
}

greet.call(person, "Hyderabad");
// Hi, I'm Prakash from Hyderabad
```

---

## `apply()`

**Definition:**
Calls a function **immediately** and lets you set the value of `this`. Arguments are passed as an **array**.

**Example:**

```javascript
const person = {
  name: "Prakash",
};

function greet(city, country) {
  console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
}

greet.apply(person, ["Hyderabad", "India"]);
// Hi, I'm Prakash from Hyderabad, India
```

---

## `bind()`

**Definition:**
Does **not** call the function immediately. It returns a **new function** with `this` permanently set.

**Example:**

```javascript
const person = {
  name: "Prakash",
};

function greet() {
  console.log(`Hi, I'm ${this.name}`);
}

const sayHi = greet.bind(person);

sayHi();
// Hi, I'm Prakash
```

---

## Difference

| Method    | Executes Immediately?          | Arguments  |
| --------- | ------------------------------ | ---------- |
| `call()`  | ✅ Yes                         | One by one |
| `apply()` | ✅ Yes                         | Array      |
| `bind()`  | ❌ No (returns a new function) | One by one |

### Easy to Remember

- **`call()`** → **Call now**, arguments separately.
- **`apply()`** → **Apply now**, arguments in an array.
- **`bind()`** → **Bind now, call later**.

---

## Currying

**Definition:**
Currying converts a function with **multiple arguments** into a sequence of **functions that each take one argument**.

**Example:**

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = add(5);

console.log(add5(3)); // 8
```

---

## Partial Application

**Definition:**
Partial application creates a **new function by fixing some arguments** of an existing function.

**Example:**

```javascript
function add(a, b) {
  return a + b;
}

const add5 = add.bind(null, 5);

console.log(add5(3)); // 8
```

---

## Difference

| Currying                                                | Partial Application                                            |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| Converts a function into nested one-argument functions. | Fixes some arguments and returns a new function.               |
| Each function takes **one** argument.                   | The new function can take **one or more** remaining arguments. |
| `f(a)(b)(c)`                                            | `f(a, b, c)` → fix `a` → `newFn(b, c)`                         |

### Example

**Currying**

```javascript
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

multiply(2)(5); // 10
```

**Partial Application**

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

double(5); // 10
```

### Easy to Remember

- **Currying** → **Break** one function into many one-argument functions.
- **Partial Application** → **Pre-fill** some arguments and create a new function.

---

### How does setTimeout() work internally?

`setTimeout()` registers a timer with Browser APIs/Web APIs. After the delay, the callback enters the Callback Queue and waits for the Event Loop.

```js
setTimeout(() => {
  console.log("Done");
}, 1000);
```

---

## Execution Context Phases

**Definition:**
When JavaScript runs a function or the global code, it creates an **Execution Context**. Every execution context goes through **2 phases**.

---

### 1. Memory Creation Phase (Creation Phase)

**Definition:**
JavaScript allocates memory for variables and functions **before executing the code**.

- Variables (`var`) → `undefined`
- Function declarations → Entire function stored in memory
- `let` and `const` → Memory allocated but cannot be accessed yet (Temporal Dead Zone)

**Example:**

```javascript
console.log(a); // undefined
greet(); // Hello

var a = 10;

function greet() {
  console.log("Hello");
}
```

**Memory after Creation Phase:**

```text
a      → undefined
greet  → function() { ... }
```

---

### 2. Code Execution Phase

**Definition:**
JavaScript executes the code **line by line** and assigns actual values to variables.

**Example:**

```javascript
var a = 10;
console.log(a);
```

**Execution:**

```text
a = 10
console.log(a) // 10
```

---

## Summary

| Phase                     | What Happens?                                    |
| ------------------------- | ------------------------------------------------ |
| **Memory Creation Phase** | Memory is allocated for variables and functions. |
| **Code Execution Phase**  | Code runs line by line and values are assigned.  |

---

### **Map**

**Definition:**
A `Map` is a collection of **key-value pairs** where **keys can be any data type**.

**Example:**

```javascript
const map = new Map();

map.set("name", "Prakash");
map.set(1, "One");

console.log(map.get("name")); // Prakash
console.log(map.get(1)); // One
```

---

### **WeakMap**

**Definition:**
A `WeakMap` stores **key-value pairs**, but **keys must be objects**. If the object is deleted, its entry is removed automatically.

**Example:**

```javascript
const wm = new WeakMap();

let user = { name: "Prakash" };

wm.set(user, "Admin");

console.log(wm.get(user)); // Admin
```

---

### **Set**

**Definition:**
A `Set` stores **unique values** (no duplicates).

**Example:**

```javascript
const set = new Set();

set.add(10);
set.add(20);
set.add(10);

console.log(set); // Set(2) { 10, 20 }
```

---

### **WeakSet**

**Definition:**
A `WeakSet` stores **only objects**. If an object is deleted, it is automatically removed from the `WeakSet`.

**Example:**

```javascript
const ws = new WeakSet();

let obj = { id: 1 };

ws.add(obj);

console.log(ws.has(obj)); // true
```

---

## Quick Comparison

| Feature          | Map             | WeakMap          | Set            | WeakSet          |
| ---------------- | --------------- | ---------------- | -------------- | ---------------- |
| Stores           | Key-Value pairs | Key-Value pairs  | Unique values  | Unique objects   |
| Keys/Values      | Any type        | **Objects only** | Any type       | **Objects only** |
| Duplicate values | Keys are unique | Keys are unique  | ❌ Not allowed | ❌ Not allowed   |
| Iterable         | ✅ Yes          | ❌ No            | ✅ Yes         | ❌ No            |

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
