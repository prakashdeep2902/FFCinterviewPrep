### `useContext` Hook Example

`useContext` is used to access data from a Context without passing props manually through every component.

#### 1. Create Context

```jsx
import { createContext } from "react";

export const UserContext = createContext();
```

---

#### 2. Provide Context Value

```jsx
import React from "react";
import { UserContext } from "./UserContext";
import Profile from "./Profile";

function App() {
  const user = {
    name: "Prakash",
    role: "Frontend Developer",
  };

  return (
    <UserContext.Provider value={user}>
      <Profile />
    </UserContext.Provider>
  );
}

export default App;
```

---

#### 3. Consume Context with `useContext`

```jsx
import React, { useContext } from "react";
import { UserContext } from "./UserContext";

function Profile() {
  const user = useContext(UserContext);

  return (
    <div>
      <h2>Name: {user.name}</h2>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Profile;
```

### Interview Answer

> `useContext` is a React Hook that allows a component to access data from a Context directly without prop drilling. For example, if user information is stored in `UserContext`, we can retrieve it using `const user = useContext(UserContext)` and use it anywhere inside the component.

A common use case for `useContext` is a **Light/Dark Theme Toggle**.

### 1. Create Theme Context

```jsx
import { createContext } from "react";

export const ThemeContext = createContext();
```

---

### 2. Provide Theme State

```jsx
import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Home from "./Home";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}

export default App;
```

---

### 3. Use Context in Child Component

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>{theme.toUpperCase()} MODE</h1>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

export default Home;
```

### Interview Explanation

> `useContext` is useful for sharing global data like themes, user authentication, or language settings. In a dark/light mode example, the theme state is stored in a `ThemeContext.Provider`, and any component can access or update the theme using `useContext(ThemeContext)` without passing props through multiple levels of components.

### Important `useRef` Example: Focus an Input Field

This is one of the most common interview examples.

```jsx
import React, { useRef } from "react";

function Login() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter username" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default Login;
```

### How it works

- `useRef()` creates a reference object.
- `ref={inputRef}` attaches the ref to the input element.
- `inputRef.current` points to the actual DOM element.
- Calling `inputRef.current.focus()` focuses the input.

### Interview Answer

> `useRef` is used to persist values between renders and to directly access DOM elements without causing re-renders. A common example is focusing an input field programmatically using `inputRef.current.focus()`. This is useful in forms, search bars, and login pages.

Yes, you **can** apply styles using `useRef`, because `ref.current` gives you direct access to the DOM element.

### Example: Change Input Border Color

```jsx id="39rk4j"
import React, { useRef } from "react";

function App() {
  const inputRef = useRef();

  const changeStyle = () => {
    inputRef.current.style.border = "2px solid red";
    inputRef.current.style.backgroundColor = "lightyellow";
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Enter text" />
      <button onClick={changeStyle}>Change Style</button>
    </div>
  );
}

export default App;
```

### Interview Point

> Although `useRef` can be used to directly manipulate styles through the DOM (`inputRef.current.style`), in React it's generally recommended to control styles through state and props. Direct DOM manipulation with refs is mainly used for tasks like focusing elements, scrolling, playing videos, measuring element sizes, or integrating with third-party libraries.

**Preferred React way:**

```jsx id="f1l2kx"
const [isActive, setIsActive] = useState(false);

<input
  style={{
    border: isActive ? "2px solid red" : "1px solid gray",
  }}
/>;
```

This keeps the UI declarative and easier to maintain.

### Real-World `useMemo` Example: Shopping Cart Total

Suppose an e-commerce application has many products in a cart. Calculating the total price can be expensive if there are hundreds of items. We can use `useMemo` to recalculate the total only when the cart items change.

```jsx
import React, { useMemo, useState } from "react";

function Cart() {
  const [count, setCount] = useState(0);

  const items = [
    { id: 1, price: 100, quantity: 2 },
    { id: 2, price: 200, quantity: 1 },
    { id: 3, price: 300, quantity: 3 },
  ];

  const totalPrice = useMemo(() => {
    console.log("Calculating total...");

    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  return (
    <div>
      <h2>Total Price: ₹{totalPrice}</h2>

      <button onClick={() => setCount(count + 1)}>Counter: {count}</button>
    </div>
  );
}

export default Cart;
```

### What Happens?

- When **Counter** is clicked, the component re-renders.
- Without `useMemo`, the total price calculation runs on every render.
- With `useMemo`, the calculation runs only when `items` changes.
- Clicking the counter does **not** recalculate the total.

### Interview Answer

> `useMemo` is used to memoize expensive calculations and avoid recomputing them on every render. For example, in an e-commerce cart, calculating the total price from hundreds of products can be costly. By wrapping the calculation in `useMemo`, React recalculates the total only when the cart items change, improving performance.

### Real-World `useCallback` Example: Prevent Unnecessary Child Re-renders

Imagine a dashboard with a parent component and a child component. The child is wrapped with `React.memo()`.

Without `useCallback`, the function is recreated on every render, causing the child to re-render unnecessarily.

---

### Child Component

```jsx
import React from "react";

const UserList = React.memo(({ onDelete }) => {
  console.log("UserList Rendered");

  return (
    <div>
      <button onClick={() => onDelete(1)}>Delete User</button>
    </div>
  );
});

export default UserList;
```

---

### Parent Component

```jsx
import React, { useState, useCallback } from "react";
import UserList from "./UserList";

function App() {
  const [count, setCount] = useState(0);

  const handleDelete = useCallback((id) => {
    console.log("Deleting user:", id);
  }, []);

  return (
    <div>
      <h2>Counter: {count}</h2>

      <button onClick={() => setCount(count + 1)}>Increment</button>

      <UserList onDelete={handleDelete} />
    </div>
  );
}

export default App;
```

---

### What Happens?

#### Without `useCallback`

```jsx
const handleDelete = (id) => {
  console.log("Deleting user:", id);
};
```

Every time `count` changes:

- Parent re-renders.
- `handleDelete` is recreated.
- Child receives a new function reference.
- Child re-renders unnecessarily.

---

#### With `useCallback`

```jsx
const handleDelete = useCallback((id) => {
  console.log("Deleting user:", id);
}, []);
```

Now:

- Parent re-renders when `count` changes.
- `handleDelete` keeps the same reference.
- Child does not re-render unnecessarily.

---

### Most Common Real-World Uses

1. **Data tables** with hundreds of rows.
2. **User lists** with edit/delete buttons.
3. **E-commerce product lists**.
4. **Dashboard widgets**.
5. Passing handlers to components wrapped with `React.memo()`.

---

### Interview Answer

> `useCallback` memoizes a function and returns the same function reference between renders unless its dependencies change. It is mainly used when passing callback functions to child components wrapped with `React.memo()` to prevent unnecessary re-renders and improve performance.

### What is `React.memo()`?

`React.memo()` is a Higher-Order Component (HOC) that **prevents a component from re-rendering if its props have not changed**.

Think of it as **"remember the last rendered result"**.

---

### Without `React.memo()`

```jsx
function Child() {
  console.log("Child Rendered");

  return <h2>Child Component</h2>;
}
```

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>

      <Child />
    </>
  );
}
```

**Output:**

Every time the button is clicked:

```
Child Rendered
Child Rendered
Child Rendered
```

Even though the child has no relation to `count`, it still re-renders.

---

### With `React.memo()`

```jsx
const Child = React.memo(() => {
  console.log("Child Rendered");

  return <h2>Child Component</h2>;
});
```

Now when `count` changes:

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>

      <Child />
    </>
  );
}
```

**Output:**

```
Child Rendered
```

Only once on the first render.

---

### Real-World Example

Suppose you have:

```jsx
<ProductList products={products} />
```

and

```jsx
<SearchBar />
```

When the user types in the search box, the parent component re-renders.

Without `React.memo()`, `ProductList` may also re-render unnecessarily.

```jsx
const ProductList = React.memo(({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
});
```

Now `ProductList` re-renders only when `products` changes.

---

### Why is `useCallback` used with `React.memo()`?

```jsx
const handleDelete = useCallback((id) => {
  console.log(id);
}, []);

<UserList onDelete={handleDelete} />;
```

Because `React.memo()` compares props by reference.

If you pass a normal function:

```jsx
<UserList onDelete={() => console.log("Delete")} />
```

a new function is created on every render, so `React.memo()` can't prevent re-renders.

That's why `useCallback` and `React.memo()` are often used together.

---

### Interview Answer (Short)

> `React.memo()` is a Higher-Order Component that memoizes a functional component and prevents unnecessary re-renders. The component re-renders only when its props change. It is commonly used to optimize performance in large applications, especially together with `useCallback` and `useMemo`.

### What is `useReducer`?

`useReducer` is a React Hook used for **complex state management**. It is an alternative to `useState` when state logic becomes complicated.

### Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- **state** → current state
- **dispatch** → function to update state
- **reducer** → function containing update logic
- **initialState** → initial value

---

## Real-World Example: Shopping Cart

### Reducer Function

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        count: state.count + 1,
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};
```

---

### Component

```jsx
import React, { useReducer } from "react";

const initialState = {
  count: 0,
};

function Cart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Cart Items: {state.count}</h2>

      <button onClick={() => dispatch({ type: "ADD_ITEM" })}>Add Item</button>

      <button onClick={() => dispatch({ type: "REMOVE_ITEM" })}>
        Remove Item
      </button>
    </div>
  );
}

export default Cart;
```

---

### Flow

When user clicks:

```jsx
dispatch({ type: "ADD_ITEM" });
```

React calls:

```jsx
reducer(state, { type: "ADD_ITEM" });
```

Returns:

```jsx
{
  count: state.count + 1;
}
```

and updates the UI.

---

## Why use `useReducer` instead of `useState`?

### With `useState`

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

Too many state updates become hard to manage.

### With `useReducer`

```jsx
const initialState = {
  name: "",
  email: "",
  loading: false,
  error: "",
};
```

All related state is managed in one place through the reducer.

---

## Interview Answer

> `useReducer` is a React Hook used for managing complex state logic. It works similarly to Redux by using a reducer function and dispatching actions to update state. It is preferred over `useState` when multiple state values are related or when state transitions become complex, such as in forms, shopping carts, authentication flows, and dashboards.

### Quick Comparison

| useState              | useReducer                   |
| --------------------- | ---------------------------- |
| Simple state          | Complex state                |
| Direct updates        | Action-based updates         |
| Easy to learn         | Better for large logic       |
| `setState()`          | `dispatch()`                 |
| Counter, Input fields | Cart, Forms, Auth, Dashboard |

**Rule of thumb:**

- Use `useState` for simple state.
- Use `useReducer` when state has multiple fields and complex update logic.

### Difference Between `useEffect` and `useLayoutEffect`

Both hooks are used for side effects, but the **timing** is different.

| useEffect                                    | useLayoutEffect                                |
| -------------------------------------------- | ---------------------------------------------- |
| Runs **after** the browser paints the screen | Runs **before** the browser paints the screen  |
| Non-blocking                                 | Blocking                                       |
| Better for API calls, subscriptions, timers  | Better for DOM measurements and layout updates |
| Doesn't affect visual rendering              | Can prevent UI flickering                      |

---

### `useEffect` Example

```jsx
useEffect(() => {
  console.log("Fetching data...");
}, []);
```

Flow:

```text
Render Component
↓
Browser Paints UI
↓
useEffect Runs
```

Use Cases:

- API calls
- Event listeners
- Timers
- Local Storage

---

### `useLayoutEffect` Example

```jsx
useLayoutEffect(() => {
  const width = divRef.current.offsetWidth;
  console.log(width);
}, []);
```

Flow:

```text
Render Component
↓
useLayoutEffect Runs
↓
Browser Paints UI
```

Use Cases:

- Measuring element size
- Calculating positions
- Updating styles before paint
- Preventing flickering

---

### Real-World Example

Suppose you're building a tooltip:

```jsx
useLayoutEffect(() => {
  const height = tooltipRef.current.offsetHeight;

  tooltipRef.current.style.top = `${-height}px`;
}, []);
```

If you use `useEffect`, the tooltip may briefly appear in the wrong position and then jump.

With `useLayoutEffect`, the position is calculated before the user sees it.

---

### Interview Answer

> `useEffect` runs asynchronously after the component is rendered and painted to the screen, making it suitable for API calls, subscriptions, and timers. `useLayoutEffect` runs synchronously after the DOM is updated but before the browser paints, making it useful for DOM measurements and layout changes where visual flickering must be avoided. In most cases, `useEffect` is preferred because it does not block rendering.

### Real-Life Use Cases of `useLayoutEffect`

You will rarely use `useLayoutEffect`. Most applications use `useEffect`. Use `useLayoutEffect` only when you need to **read or update the DOM before the user sees it**.

---

## 1. Tooltip Positioning (Most Common)

Imagine a tooltip that appears above a button.

```jsx
useLayoutEffect(() => {
  const tooltipHeight = tooltipRef.current.offsetHeight;

  tooltipRef.current.style.top = `-${tooltipHeight}px`;
}, []);
```

### Why?

Without `useLayoutEffect`:

```text
Tooltip appears
↓
User sees wrong position
↓
Position updates
```

This causes a flicker.

With `useLayoutEffect`:

```text
Calculate position
↓
Update DOM
↓
Paint screen
```

User never sees the wrong position.

---

## 2. Auto-Resizing Textarea

Like WhatsApp or ChatGPT input boxes.

```jsx
useLayoutEffect(() => {
  textareaRef.current.style.height = "0px";

  const scrollHeight = textareaRef.current.scrollHeight;

  textareaRef.current.style.height = `${scrollHeight}px`;
}, [text]);
```

When the user types, the textarea grows smoothly before painting.

---

## 3. Scroll to Bottom in Chat Applications

```jsx
useLayoutEffect(() => {
  messagesEndRef.current?.scrollIntoView();
}, [messages]);
```

Used in:

- WhatsApp
- Telegram
- Messenger
- Slack

Ensures the latest message is visible immediately.

---

## 4. Measuring Element Size

```jsx
useLayoutEffect(() => {
  const width = cardRef.current.offsetWidth;

  setCardWidth(width);
}, []);
```

Used in:

- Responsive dashboards
- Charts
- Data grids
- Drag-and-drop libraries

---

## 5. Animations

Libraries like:

- [GSAP](https://gsap.com?utm_source=chatgpt.com)
- [Framer Motion](https://www.framer.com/motion/?utm_source=chatgpt.com)

often need DOM measurements before animations start.

```jsx
useLayoutEffect(() => {
  const position = boxRef.current.getBoundingClientRect();

  startAnimation(position);
}, []);
```

---

## Interview Answer

> A real-world use of `useLayoutEffect` is positioning tooltips, modals, dropdowns, or chat auto-scroll functionality. It runs after the DOM is updated but before the browser paints the screen, allowing us to measure DOM elements and make layout adjustments without causing visual flickering. Most applications use `useEffect`, while `useLayoutEffect` is reserved for DOM measurement and layout-related tasks.

### How does Context API differ from Redux?

Both are used for **state management**, but they solve different problems.

| Context API                        | Redux                                   |
| ---------------------------------- | --------------------------------------- |
| Built into React                   | External library                        |
| Good for small/medium global state | Good for large and complex state        |
| Easy to set up                     | More setup required                     |
| No middleware support              | Supports middleware (Thunk, Saga, etc.) |
| Can cause unnecessary re-renders   | Better optimized for large apps         |
| Mainly for sharing data            | Complete state management solution      |

---

## Context API Example

Used for:

- Theme (Light/Dark)
- Language
- Logged-in User
- Authentication

```jsx
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  <App />
</ThemeContext.Provider>
```

Access anywhere:

```jsx
const { theme } = useContext(ThemeContext);
```

---

## Redux Example

Used for:

- Shopping Cart
- Products
- Orders
- User Profile
- Notifications
- Dashboard Data

```jsx
dispatch(addToCart(product));
```

Access state:

```jsx
const cartItems = useSelector((state) => state.cart.items);
```

---

## Real-World Example

### E-commerce Application

#### Context API

```text
Theme
Language
Logged-in User
```

These values change infrequently and are needed globally.

#### Redux

```text
Cart
Products
Wishlist
Orders
Payment Status
```

Many components update these states frequently.

Redux handles this more efficiently.

---

## Why Redux for Large Apps?

Suppose:

```text
App
 ├── Header
 ├── Sidebar
 ├── ProductList
 ├── Cart
 └── Checkout
```

When cart data changes:

### Context API

All consumers of that context may re-render.

### Redux

Only components subscribed to the changed slice re-render.

This improves performance in large applications.

---

## Interview Answer (Short)

> Context API is a built-in React feature used for sharing global data such as themes, authentication, and language settings. Redux is a dedicated state management library that provides a centralized store, predictable state updates, middleware support, and better scalability for large applications. Context API is suitable for simple global state, whereas Redux is preferred for complex and frequently changing application state.
