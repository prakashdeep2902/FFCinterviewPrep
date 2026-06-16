This topic is **one of the most important JavaScript interview topics** because it explains **how JavaScript runs code behind the scenes**.

Think of it like this:

> **Execution Context = Environment where code executes**
>
> **Call Stack = Manages which function runs first and next**

---

# 1. What is Execution Context?

## Simple Definition

Execution Context is the environment in which JavaScript code is executed.

Whenever JavaScript runs code, it creates an execution context.

---

## Interview Answer

> An execution context is the environment where JavaScript code is evaluated and executed. It contains variables, functions, and the value of `this`.

---

There are mainly **two types**:

1. Global Execution Context (GEC)
2. Function Execution Context (FEC)

---

# 2. Global Execution Context (GEC)

## Simple Definition

The Global Execution Context is created when the JavaScript file starts running.

Only one GEC exists.

---

## Example

```javascript
var name = "John";

function greet() {
  console.log("Hello");
}

console.log(name);
```

Before executing any code:

JavaScript creates the Global Execution Context.

Memory is allocated for:

```javascript
name → undefined

greet → entire function
```

---

## Interview Answer

> The Global Execution Context is the default execution context created when a JavaScript program starts. It creates the global object, sets up memory for variables and functions, and executes global code.

---

# 3. Function Execution Context (FEC)

## Simple Definition

Whenever a function is called, JavaScript creates a new execution context for that function.

---

## Example

```javascript
function greet() {
  let message = "Hello";
  console.log(message);
}

greet();
```

When `greet()` is called:

JavaScript creates a new Function Execution Context.

Memory:

```javascript
message → undefined
```

Then execution begins.

```javascript
message = "Hello";
```

Output:

```javascript
Hello;
```

Function context is destroyed after execution finishes.

---

## Interview Answer

> A Function Execution Context is created whenever a function is invoked. It contains the function's local variables, arguments, and execution details.

---

# 4. Memory Creation Phase

Every execution context has **two phases**.

---

## Phase 1: Memory Creation Phase

JavaScript scans the code first and allocates memory.

### Rules

### Variables declared with var

```javascript
var a = 10;
```

Memory:

```javascript
a → undefined
```

---

### Function Declarations

```javascript
function greet() {}
```

Memory:

```javascript
greet → complete function
```

---

### let and const

Memory is reserved but not initialized.

This creates the TDZ (Temporal Dead Zone).

---

## Example

```javascript
var a = 10;

function greet() {
  console.log("Hello");
}
```

Memory Phase:

```javascript
a → undefined

greet → function greet(){...}
```

No code runs yet.

---

## Interview Answer

> During the memory creation phase, JavaScript allocates memory for variables and functions before executing the code. Variables declared with `var` are initialized with `undefined`, while function declarations are stored entirely in memory.

---

# 5. Execution Phase

After memory allocation, JavaScript executes code line by line.

---

## Example

```javascript
var a = 10;

console.log(a);
```

Memory Phase:

```javascript
a → undefined
```

Execution Phase:

```javascript
a = 10;

console.log(a);
```

Output:

```javascript
10;
```

---

## Interview Answer

> In the execution phase, JavaScript executes the code line by line and assigns actual values to variables.

---

# 6. Call Stack

## Simple Definition

The Call Stack is a stack data structure used to track function execution.

JavaScript is single-threaded, so only one function executes at a time.

---

## Interview Answer

> The Call Stack is a mechanism used by JavaScript to manage function execution. When a function is called, it is pushed onto the stack, and when it completes, it is removed from the stack.

---

# Example of Call Stack

```javascript
function one() {
  two();
}

function two() {
  three();
}

function three() {
  console.log("Done");
}

one();
```

---

## Step-by-Step Stack

### Start

```text
Call Stack
-----------
Global()
```

---

### one() called

```text
Call Stack
-----------
one()
Global()
```

---

### two() called

```text
Call Stack
-----------
two()
one()
Global()
```

---

### three() called

```text
Call Stack
-----------
three()
two()
one()
Global()
```

---

### three() finishes

```text
Call Stack
-----------
two()
one()
Global()
```

---

### two() finishes

```text
Call Stack
-----------
one()
Global()
```

---

### one() finishes

```text
Call Stack
-----------
Global()
```

---

Output:

```javascript
Done;
```

---

# Complete Flow Example

```javascript
var x = 10;

function greet() {
  var y = 20;

  console.log(x);
  console.log(y);
}

greet();
```

---

## Memory Creation Phase (Global)

```text
x → undefined

greet → function
```

---

## Execution Phase (Global)

```text
x = 10
greet() called
```

---

## Function Execution Context Created

Memory Phase:

```text
y → undefined
```

Execution Phase:

```text
y = 20

console.log(x) → 10
console.log(y) → 20
```

Output:

```text
10
20
```

Function Context Removed

Back to Global Context.

---

# Interview Question:

## "What happens when JavaScript executes a program?"

### Perfect Interview Answer

> When a JavaScript program starts, the Global Execution Context is created. Each execution context goes through two phases: the Memory Creation Phase and the Execution Phase. During the memory phase, memory is allocated for variables and functions. During the execution phase, code runs line by line. When a function is called, a new Function Execution Context is created and pushed onto the Call Stack. Once the function finishes execution, its context is removed from the stack.

---

# 30-Second Revision

| Topic                      | One-Line Definition                       |
| -------------------------- | ----------------------------------------- |
| Execution Context          | Environment where code executes.          |
| Global Execution Context   | Created when program starts.              |
| Function Execution Context | Created whenever a function is called.    |
| Memory Creation Phase      | Memory allocated for variables/functions. |
| Execution Phase            | Code executes line by line.               |
| Call Stack                 | Tracks function execution order.          |

### Easy Memory Trick

```text
1. Global Context Created
2. Memory Phase
3. Execution Phase
4. Function Called
5. Function Context Created
6. Push to Call Stack
7. Execute Function
8. Pop from Call Stack
```

If you can explain this flow with one code example, you'll answer 90% of execution-context interview questions correctly.
