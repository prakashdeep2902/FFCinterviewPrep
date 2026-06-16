This is one of the **most asked JavaScript interview topics** because many developers get confused about `this`.

---

# What is `this`?

## Simple Definition

`this` refers to the object that is currently executing the function.

The value of `this` depends on **how the function is called**, not where it is written.

---

## Interview Answer

> `this` is a special keyword in JavaScript that refers to the object that is invoking the current function. Its value is determined at runtime based on how the function is called.

---

# 1. `this` in Global Context

## Simple Definition

In the global scope, `this` refers to the global object.

### Browser

```javascript
console.log(this);
```

Output:

```javascript
window;
```

Because `window` is the global object in browsers.

---

## Example

```javascript
var name = "John";

console.log(this.name);
```

Output:

```javascript
John;
```

---

## Interview Answer

> In the browser's global execution context, `this` refers to the `window` object.

---

# 2. `this` Inside Object Methods

## Simple Definition

When a function is called as an object's method, `this` refers to that object.

---

## Example

```javascript
const person = {
  name: "John",

  greet() {
    console.log(this.name);
  },
};

person.greet();
```

Output:

```javascript
John;
```

Here:

```javascript
this === person;
```

---

## Another Example

```javascript
const car = {
  brand: "BMW",

  showBrand() {
    console.log(this.brand);
  },
};

car.showBrand();
```

Output:

```javascript
BMW;
```

---

## Interview Answer

> Inside an object method, `this` refers to the object that called the method.

---

# 3. `this` in Arrow Functions

## Simple Definition

Arrow functions do **not have their own `this`**.

They inherit `this` from the surrounding scope.

---

## Example

```javascript
const person = {
  name: "John",

  greet: () => {
    console.log(this.name);
  },
};

person.greet();
```

Output:

```javascript
undefined;
```

Why?

Because the arrow function takes `this` from the outer scope (global scope).

---

## Example Showing Lexical `this`

```javascript
const person = {
  name: "John",

  greet() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  },
};

person.greet();
```

Output:

```javascript
John;
```

The arrow function inherits `this` from `greet()`.

---

## Interview Answer

> Arrow functions do not create their own `this`. They inherit `this` from the surrounding lexical scope.

---

# 4. Explicit Binding

JavaScript provides methods to manually set `this`.

These are:

```javascript
call();
apply();
bind();
```

---

# call()

## Simple Definition

Calls a function immediately and sets `this`.

---

## Example

```javascript
function greet() {
  console.log(this.name);
}

const person = {
  name: "John",
};

greet.call(person);
```

Output:

```javascript
John;
```

---

# apply()

## Simple Definition

Same as `call()`, but arguments are passed as an array.

---

## Example

```javascript
function greet(city, country) {
  console.log(this.name, city, country);
}

const person = {
  name: "John",
};

greet.apply(person, ["Delhi", "India"]);
```

Output:

```javascript
John Delhi India
```

---

# bind()

## Simple Definition

Creates a new function with `this` permanently set.

It does **not execute immediately**.

---

## Example

```javascript
function greet() {
  console.log(this.name);
}

const person = {
  name: "John",
};

const newFunction = greet.bind(person);

newFunction();
```

Output:

```javascript
John;
```

---

## Difference Between call, apply, bind

| Method  | Executes Immediately? | Arguments            |
| ------- | --------------------- | -------------------- |
| call()  | Yes                   | Separately           |
| apply() | Yes                   | Array                |
| bind()  | No                    | Returns new function |

---

## Example

```javascript
function introduce(age) {
  console.log(this.name, age);
}

const person = {
  name: "John",
};

introduce.call(person, 25);
introduce.apply(person, [25]);

const fn = introduce.bind(person);
fn(25);
```

Output:

```javascript
John 25
John 25
John 25
```

---

# Most Asked Interview Question

## Difference Between Regular Function and Arrow Function Regarding `this`

### Regular Function

```javascript
const obj = {
  name: "John",

  greet: function () {
    console.log(this.name);
  },
};

obj.greet();
```

Output:

```javascript
John;
```

Own `this` is created.

---

### Arrow Function

```javascript
const obj = {
  name: "John",

  greet: () => {
    console.log(this.name);
  },
};

obj.greet();
```

Output:

```javascript
undefined;
```

Uses surrounding scope's `this`.

---

## Interview Answer

> Regular functions have their own `this` value based on how they are called, whereas arrow functions inherit `this` from their surrounding lexical scope and cannot have their own `this`.

---

# Real-World Use of `bind()`

Suppose a button click loses object context:

```javascript
const user = {
  name: "John",

  showName() {
    console.log(this.name);
  },
};

setTimeout(user.showName, 1000);
```

Output:

```javascript
undefined;
```

Because `this` is lost.

### Fix

```javascript
setTimeout(user.showName.bind(user), 1000);
```

Output:

```javascript
John;
```

---

# 30-Second Interview Revision

| Topic          | One-Line Definition                                        |
| -------------- | ---------------------------------------------------------- |
| Global Context | `this` refers to the global object (`window` in browsers). |
| Object Method  | `this` refers to the object calling the method.            |
| Arrow Function | No own `this`; inherits from outer scope.                  |
| call()         | Invokes function immediately with custom `this`.           |
| apply()        | Same as call, arguments passed as array.                   |
| bind()         | Returns a new function with fixed `this`.                  |

### Memory Trick

```text
Regular Function  -> Own this
Arrow Function    -> Borrow this

call()  -> Call now
apply() -> Apply now
bind()  -> Use later
```

That's exactly the level of explanation interviewers expect for `this` in JavaScript.
