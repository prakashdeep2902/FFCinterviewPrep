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
