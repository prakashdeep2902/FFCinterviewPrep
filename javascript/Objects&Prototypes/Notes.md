# 5. Objects & Prototypes

Objects are one of the most important concepts in JavaScript because almost everything is built around them.

---

## 1. Object Creation

### Simple Definition

An object is a collection of key-value pairs used to store related data and functionality.

### Interview Answer

> An object is a non-primitive data type that stores data in the form of key-value pairs. Objects can contain properties and methods.

### Example

```javascript
const person = {
  name: "John",
  age: 25,

  greet() {
    console.log("Hello");
  },
};

console.log(person.name);
person.greet();
```

Output:

```javascript
John;
Hello;
```

---

### Different Ways to Create Objects

#### Object Literal (Most Common)

```javascript
const user = {
  name: "John",
};
```

#### Using `new Object()`

```javascript
const user = new Object();

user.name = "John";
```

#### Using Constructor Function

```javascript
function User(name) {
  this.name = name;
}

const user1 = new User("John");
```

#### Using ES6 Class

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
```

---

## 2. Prototype Chain

### Simple Definition

Every JavaScript object has access to another object called its prototype.

If a property is not found on the object itself, JavaScript looks up the prototype chain until it finds it or reaches `null`.

### Interview Answer

> The prototype chain is JavaScript's mechanism for inheritance. When a property or method is not found on an object, JavaScript searches for it in the object's prototype and continues up the chain until it is found or reaches `null`.

### Example

```javascript
const person = {
  greet() {
    console.log("Hello");
  },
};

const user = Object.create(person);

user.name = "John";

user.greet();
```

Output:

```javascript
Hello;
```

Although `greet()` isn't inside `user`, JavaScript finds it in `person`.

---

### Prototype Chain Flow

```text
user
  ↓
person
  ↓
Object.prototype
  ↓
null
```

---

## 3. Inheritance

### Simple Definition

Inheritance allows one object to access properties and methods of another object.

### Interview Answer

> Inheritance is a mechanism that allows an object or class to acquire properties and methods from another object or class, promoting code reuse.

### Example Using Prototypes

```javascript
const animal = {
  eat() {
    console.log("Eating");
  },
};

const dog = Object.create(animal);

dog.bark = function () {
  console.log("Barking");
};

dog.eat();
dog.bark();
```

Output:

```javascript
Eating;
Barking;
```

The `dog` object inherits `eat()` from `animal`.

---

## 4. Constructor Functions

### Simple Definition

Before ES6 classes, constructor functions were used to create multiple objects with the same structure.

### Interview Answer

> A constructor function is a regular function used with the `new` keyword to create and initialize objects.

### Example

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Person("John", 25);
const p2 = new Person("Mike", 30);

console.log(p1.name);
console.log(p2.name);
```

Output:

```javascript
John;
Mike;
```

---

### What Happens When `new` is Used?

```javascript
const p1 = new Person("John", 25);
```

JavaScript:

1. Creates an empty object.
2. Sets its prototype.
3. Binds `this` to the new object.
4. Executes the function.
5. Returns the object.

---

### Adding Methods Using Prototype

Instead of creating methods for every object:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello ${this.name}`);
};

const p1 = new Person("John");

p1.greet();
```

Output:

```javascript
Hello John
```

All instances share the same method.

---

## 5. ES6 Classes

### Simple Definition

Classes provide a cleaner syntax for creating objects and implementing inheritance.

### Interview Answer

> ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance, providing a more familiar class-based syntax.

### Example

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }
}

const user = new Person("John", 25);

user.greet();
```

Output:

```javascript
Hello John
```

---

## ES6 Class Inheritance

```javascript
class Animal {
  eat() {
    console.log("Eating");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Barking");
  }
}

const dog = new Dog();

dog.eat();
dog.bark();
```

Output:

```javascript
Eating;
Barking;
```

---

## Constructor Function vs ES6 Class

| Feature           | Constructor Function | ES6 Class         |
| ----------------- | -------------------- | ----------------- |
| Syntax            | Older                | Modern            |
| Uses Prototype    | Yes                  | Yes               |
| Readability       | Less                 | Better            |
| Inheritance       | Manual               | `extends` keyword |
| Recommended Today | Rarely               | Yes               |

---

# Most Asked Interview Questions

### What is a Prototype?

> A prototype is an object from which other objects inherit properties and methods.

---

### What is the Prototype Chain?

> The prototype chain is the process JavaScript uses to look up properties and methods through linked prototype objects.

---

### Are Classes Different from Prototypes?

> No. ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance system.

---

# 30-Second Revision

| Topic                | One-Line Definition                               |
| -------------------- | ------------------------------------------------- |
| Object               | Collection of key-value pairs.                    |
| Prototype            | Object used for inheritance.                      |
| Prototype Chain      | Lookup mechanism for properties and methods.      |
| Inheritance          | Acquiring properties/methods from another object. |
| Constructor Function | Function used with `new` to create objects.       |
| ES6 Class            | Modern syntax for prototype-based inheritance.    |

### Easy Memory Trick

```text
Object → Stores Data
Prototype → Shares Methods
Prototype Chain → Lookup Path
Inheritance → Reuse Code
Constructor Function → Old Way
ES6 Class → Modern Way
```

If an interviewer asks **"How does inheritance work in JavaScript?"**, the best short answer is:

> JavaScript uses prototype-based inheritance. Objects inherit properties and methods through the prototype chain. ES6 classes provide a cleaner syntax but internally still use prototypes.
