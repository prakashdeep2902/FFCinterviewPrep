## Difference Between TypeScript and JavaScript

> JavaScript is a dynamically typed language that runs directly in the browser. TypeScript is a superset of JavaScript that adds static typing and other features to catch errors during development. TypeScript code is compiled into JavaScript before execution, making it more suitable for large and scalable applications.

# Type vs Interface (TypeScript)

### Definition

**Interface:**
An interface is used to define the structure of an object. It describes what properties and methods an object should have.

**Type:**
A type is used to create custom data types. It can define objects, unions, primitives, tuples, and more.

---

### Real-Life Example

Think of a **Job Application Form**.

- **Interface** = The required format of the form (Name, Email, Phone).
- **Type** = Any kind of data description (form, status, ID, combinations, etc.).

---

### Explanation

An interface mainly describes the shape of an object.

A type is more flexible because it can describe objects, strings, numbers, unions, intersections, tuples, and many other types.

---

### Example

```ts
// Interface
interface User {
  name: string;
  age: number;
}

// Type
type User = {
  name: string;
  age: number;
};
```

Both work similarly for objects.

---

### Key Differences

| Interface                       | Type                                   |
| ------------------------------- | -------------------------------------- |
| Used mainly for objects         | Used for any type                      |
| Can be extended using `extends` | Can use `&` (intersection)             |
| Supports declaration merging    | Does not support declaration merging   |
| Preferred for object structures | Preferred for unions and complex types |

---

### Declaration Merging

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "Prakash",
  age: 25,
};
```

✅ Works with Interface

```ts
type User = {
  name: string;
};

type User = {
  age: number;
};
```

❌ Error with Type

---

### When to Use

- Use **Interface** when defining object shapes, classes, or API responses.
- Use **Type** when working with unions, intersections, tuples, or advanced type combinations.

---

### Interview Answer (30 Seconds)

> Interface and Type are both used to define data structures in TypeScript. Interface is mainly used for object shapes and supports declaration merging, while Type is more flexible and can represent unions, tuples, primitives, and complex type combinations. For object contracts, Interface is generally preferred, and for advanced type manipulation, Type is preferred.

## What is `React.FC`?

```tsx
type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return <div>{children}</div>;
};
```

---

### Interview Answer (2-3 Lines)

> `React.FC` is a TypeScript type used to define a React functional component. It provides type checking for component props. However, in modern React applications, many developers prefer directly typing the props instead of using `React.FC` because it is simpler and more explicit.

## How do you type `useState`?

### Definition

In TypeScript, we type `useState` by specifying the type of data the state will store.

This helps TypeScript catch errors and provide better autocomplete.

---

## 1. String State

```tsx
const [name, setName] = useState<string>("");
```

**Example:** User name

```tsx
setName("Prakash"); // ✅
setName(123); // ❌ Error
```

---

## 2. Number State

```tsx
const [count, setCount] = useState<number>(0);
```

**Example:** Counter value

---

## 3. Boolean State

```tsx
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
```

**Example:** Login status

---

## 4. Array State

```tsx
const [users, setUsers] = useState<string[]>([]);
```

**Example:** List of usernames

```tsx
setUsers(["Prakash", "John"]);
```

---

## 5. Object State

```tsx
type User = {
  name: string;
  age: number;
};

const [user, setUser] = useState<User>({
  name: "",
  age: 0,
});
```

---

## 6. State Can Be Null

```tsx
type User = {
  name: string;
  age: number;
};

const [user, setUser] = useState<User | null>(null);
```

**Example:** User data not loaded yet

```tsx
setUser({
  name: "Prakash",
  age: 25,
});
```

---

## 7. State with Multiple Possible Types (Union)

```tsx
const [id, setId] = useState<string | number>("");
```

**Example:** ID can be string or number

---

## Interview Answer (2-3 Lines)

> We type `useState` using generics, like `useState<string>()` or `useState<User | null>()`. This tells TypeScript what type of value the state should hold and helps catch type errors during development.

# How do you type `useRef`?

## Common DOM Types

```tsx
HTMLInputElement;
HTMLButtonElement;
HTMLDivElement;
HTMLFormElement;
HTMLTextAreaElement;
HTMLImageElement;
```

---

## Interview Answer (2-3 Lines)

> We type `useRef` by passing the element type as a generic, such as `useRef<HTMLInputElement>(null)`. This tells TypeScript what kind of DOM element the ref will point to and provides proper type safety and autocomplete.

### Quick Interview Example

```tsx
const inputRef = useRef<HTMLInputElement>(null);

inputRef.current?.focus();
```

Perfect for a GitHub README. Save this as **`typescript-interview-notes.md`**.

# TypeScript Interview Notes

## 1. Difference Between TypeScript and JavaScript

| JavaScript               | TypeScript                      |
| ------------------------ | ------------------------------- |
| Dynamically typed        | Statically typed                |
| Errors found at runtime  | Errors found during development |
| No interfaces            | Supports interfaces             |
| No type checking         | Strong type checking            |
| Runs directly in browser | Compiles to JavaScript          |

### Example

```ts
// JavaScript
let age = "25";
age = 30; // Allowed

// TypeScript
let age: number = 25;
age = 30; // ✅
age = "30"; // ❌ Error
```

---

# 2. type vs interface

### type

```ts
type User = {
  name: string;
  age: number;
};
```

### interface

```ts
interface User {
  name: string;
  age: number;
}
```

### Difference

| type                      | interface              |
| ------------------------- | ---------------------- |
| Can represent unions      | Cannot                 |
| Can represent primitives  | Cannot                 |
| More flexible             | Better for OOP         |
| Cannot merge declarations | Can merge declarations |

### Example

```ts
type Status = "success" | "error";
```

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

// Merged automatically
```

---

# 3. any vs unknown

### any

Turns off TypeScript checking.

```ts
let value: any = 10;

value.toUpperCase(); // No error
```

### unknown

Safer version of any.

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

### Interview Answer

> Use `unknown` instead of `any` whenever possible because it forces type checking before usage.

---

# 4. Union Types

Allows multiple possible types.

```ts
let value: string | number;

value = "Hello";
value = 100;
```

### Real Example

```ts
function printId(id: string | number) {
  console.log(id);
}
```

---

# 5. Intersection Types

Combines multiple types.

```ts
type Person = {
  name: string;
};

type Employee = {
  salary: number;
};

type Worker = Person & Employee;
```

```ts
const emp: Worker = {
  name: "John",
  salary: 50000,
};
```

---

# 6. Generics

Reusable types.

### Without Generic

```ts
function getValue(value: string): string {
  return value;
}
```

### With Generic

```ts
function getValue<T>(value: T): T {
  return value;
}

getValue<string>("Hello");
getValue<number>(100);
```

### Real Example

```ts
const numbers: Array<number> = [1, 2, 3];
```

---

# 7. keyof

Returns keys of an object type.

```ts
type User = {
  name: string;
  age: number;
};

type UserKeys = keyof User;
```

Result:

```ts
"name" | "age";
```

### Example

```ts
function getValue(obj: User, key: keyof User) {
  return obj[key];
}
```

---

# 8. typeof

Gets the type of a variable.

```ts
const user = {
  name: "Prakash",
  age: 25,
};

type UserType = typeof user;
```

---

# 9. Utility Types

## Partial

Makes all properties optional.

```ts
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;
```

Result:

```ts
{
  name?: string;
  age?: number;
}
```

---

## Pick

Select specific properties.

```ts
type UserName = Pick<User, "name">;
```

Result:

```ts
{
  name: string;
}
```

---

## Omit

Remove properties.

```ts
type UserWithoutAge = Omit<User, "age">;
```

---

## Readonly

Makes properties immutable.

```ts
type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  name: "John",
  age: 25,
};

user.age = 30; // Error
```

---

# 10. Classes and Access Modifiers

```ts
class User {
  public name: string;
  private password: string;
  protected age: number;

  constructor(name: string, password: string, age: number) {
    this.name = name;
    this.password = password;
    this.age = age;
  }
}
```

### Modifiers

| Modifier  | Access              |
| --------- | ------------------- |
| public    | Everywhere          |
| private   | Inside class only   |
| protected | Class + child class |

---

# 11. Function Overloading

Multiple function signatures.

```ts
function greet(name: string): string;
function greet(age: number): string;

function greet(value: string | number): string {
  return `Hello ${value}`;
}
```

```ts
greet("Prakash");
greet(25);
```

---

# 12. Enums

Group related constants.

```ts
enum Role {
  Admin,
  User,
  Guest,
}

console.log(Role.Admin);
```

### String Enum

```ts
enum Status {
  SUCCESS = "success",
  ERROR = "error",
}
```

---

# 13. Type Assertions

Tell TypeScript what type a value is.

```ts
const input = document.getElementById("name") as HTMLInputElement;

console.log(input.value);
```

Alternative:

```ts
const input = <HTMLInputElement>document.getElementById("name");
```

---

# 14. Type Inference

TypeScript automatically detects types.

```ts
let name = "Prakash";
```

TS infers:

```ts
string;
```

```ts
let age = 25;
```

TS infers:

```ts
number;
```

---

# 15. Abstract Classes

Cannot create objects directly.

```ts
abstract class Animal {
  abstract makeSound(): void;

  sleep() {
    console.log("Sleeping");
  }
}
```

```ts
class Dog extends Animal {
  makeSound() {
    console.log("Bark");
  }
}
```

```ts
const dog = new Dog();
```

```ts
const animal = new Animal(); // Error
```

---

# 16. Modules

Export and import code.

### user.ts

```ts
export const name = "Prakash";

export function greet() {
  console.log("Hello");
}
```

### app.ts

```ts
import { name, greet } from "./user";

greet();
```

---

# 17. React Props Typing

```tsx
type ButtonProps = {
  title: string;
  disabled?: boolean;
};

function Button({ title, disabled }: ButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}
```

Usage:

```tsx
<Button title="Save" />
```

---

# 18. React useState Typing

### String State

```tsx
const [name, setName] = useState<string>("");
```

### Number State

```tsx
const [count, setCount] = useState<number>(0);
```

### Object State

```tsx
type User = {
  name: string;
  age: number;
};

const [user, setUser] = useState<User | null>(null);
```

---

# 19. React Event Typing

### Input Change Event

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
```

### Button Click Event

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Clicked");
};
```

---

# 20. API Response Typing

### Define Response Type

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

### Fetch Data

```ts
async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");

  const data: User[] = await response.json();

  return data;
}
```

### Axios Example

```ts
const response = await axios.get<User[]>("/users");

console.log(response.data);
```

---

# Quick Interview Revision (1 Minute)

### TypeScript vs JavaScript

- TypeScript = JavaScript + Types

### type vs interface

- Interface → Objects & OOP
- Type → Unions, Intersections, Advanced Types

### any vs unknown

- any = No type checking
- unknown = Type-safe any

### Union

```ts
string | number;
```

### Intersection

```ts
A & B;
```

### Generic

```ts
function test<T>(value: T): T;
```

### keyof

```ts
keyof User
```

### typeof

```ts
typeof user;
```

### Utility Types

```ts
Partial;
Pick;
Omit;
Readonly;
```

### Access Modifiers

```ts
public;
private;
protected;
```

### Function Overloading

Multiple signatures, one implementation.

### Enum

Group constants.

### Type Assertion

```ts
value as Type;
```

### Type Inference

TS automatically guesses types.

### Abstract Class

Cannot instantiate directly.

### Modules

```ts
export
import
```

### React

```tsx
Props
useState<T>()
Events
API Typing
```

These 20 topics cover roughly **80–90% of TypeScript interview questions** asked for React/Frontend Developer roles.
