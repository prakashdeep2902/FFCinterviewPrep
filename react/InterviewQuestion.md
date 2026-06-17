This is a very large set (50 React questions). To keep it GitHub-friendly and easy to revise, it's better to split it into **2 parts**.

# React Interview Questions & Answers (Part 1/2)

---

## 1. What is React and why is it used?

**Answer:**
React is a JavaScript library for building user interfaces. It helps create reusable UI components and update the UI efficiently.

**Real-Life Example:**
Building a house using reusable Lego blocks.

**Working Example:**

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

---

## 2. What are the key features of React?

**Answer:**

- Component-Based Architecture
- Virtual DOM
- One-Way Data Flow
- JSX
- Hooks

**Real-Life Example:**
Building a car using reusable parts like wheels, doors, and engines.

**Working Example:**

```jsx
function Button() {
  return <button>Click Me</button>;
}
```

---

## 3. What is the Virtual DOM?

**Answer:**
Virtual DOM is a lightweight copy of the Real DOM. React updates the Virtual DOM first and then updates only changed parts in the Real DOM.

**Real-Life Example:**
Editing a draft before publishing the final document.

**Working Example:**

```jsx
setCount(count + 1);
```

React updates Virtual DOM before updating Real DOM.

---

## 4. How does React's reconciliation algorithm work?

**Answer:**
Reconciliation compares the old Virtual DOM with the new Virtual DOM and updates only changed elements.

**Real-Life Example:**
Finding differences between two versions of a document.

**Working Example:**

```jsx
<h1>{count}</h1>
```

Only the changed text is updated.

---

## 5. What is the difference between Virtual DOM and Real DOM?

| Virtual DOM      | Real DOM           |
| ---------------- | ------------------ |
| Lightweight copy | Actual DOM         |
| Faster updates   | Slower updates     |
| Managed by React | Managed by Browser |

**Real-Life Example:**
Blueprint vs actual building.

---

## 6. What are functional components and class components?

**Answer:**
Functional components are JavaScript functions. Class components use ES6 classes and lifecycle methods.

**Real-Life Example:**
Modern smartphone vs old keypad phone.

**Working Example:**

```jsx
function User() {
  return <h1>User</h1>;
}
```

```jsx
class User extends React.Component {
  render() {
    return <h1>User</h1>;
  }
}
```

---

## 7. What are props in React?

**Answer:**
Props are read-only data passed from parent to child components.

**Real-Life Example:**
Parents giving instructions to children.

**Working Example:**

```jsx
function User(props) {
  return <h1>{props.name}</h1>;
}

<User name="Prakash" />;
```

---

## 8. What is state in React?

**Answer:**
State stores component-specific data that can change over time.

**Real-Life Example:**
A score board that updates during a match.

**Working Example:**

```jsx
const [count, setCount] = useState(0);
```

---

## 9. What is the difference between props and state?

| Props              | State                    |
| ------------------ | ------------------------ |
| Passed from parent | Managed inside component |
| Read-only          | Mutable                  |
| External Data      | Internal Data            |

**Real-Life Example:**
Props = Instructions from manager.
State = Employee's current task.

---

## 10. What are controlled and uncontrolled components?

**Answer:**
Controlled components use React state. Uncontrolled components use DOM refs.

**Real-Life Example:**
Controlled = Teacher monitors attendance.
Uncontrolled = Students mark attendance themselves.

**Working Example:**

```jsx
const [name, setName] = useState("");
```

Uncontrolled:

```jsx
const inputRef = useRef();
```

---

## 11. What are React Hooks?

**Answer:**
Hooks allow functional components to use state and lifecycle features.

**Real-Life Example:**
Adding new tools to an existing toolbox.

**Working Example:**

```jsx
const [count, setCount] = useState(0);
```

---

## 12. What is the purpose of useState?

**Answer:**
useState creates and manages state inside functional components.

**Real-Life Example:**
A digital counter.

**Working Example:**

```jsx
const [count, setCount] = useState(0);
```

---

## 13. How does useEffect work?

**Answer:**
useEffect runs side effects after rendering.

**Real-Life Example:**
Sending an email after registration completes.

**Working Example:**

```jsx
useEffect(() => {
  console.log("Mounted");
}, []);
```

---

## 14. What is the dependency array in useEffect?

**Answer:**
The dependency array controls when useEffect runs.

**Real-Life Example:**
An alarm that triggers only when a specific condition changes.

**Working Example:**

```jsx
useEffect(() => {
  console.log(count);
}, [count]);
```

---

## 15. What are common mistakes when using useEffect?

**Answer:**

- Missing dependencies
- Infinite loops
- Forgetting cleanup
- Updating state unnecessarily

**Real-Life Example:**
Setting multiple alarms for the same event.

**Working Example:**

```jsx
useEffect(() => {
  return () => {
    console.log("Cleanup");
  };
}, []);
```

---

## 16. What is the difference between useEffect and useLayoutEffect?

**Answer:**

- useEffect runs after painting.
- useLayoutEffect runs before painting.

**Real-Life Example:**

- useEffect = Fix after customer sees it.
- useLayoutEffect = Fix before customer sees it.

**Working Example:**

```jsx
useLayoutEffect(() => {
  console.log("Before Paint");
});
```

---

## 17. What is the purpose of useRef?

**Answer:**
useRef stores mutable values without causing re-renders.

**Real-Life Example:**
A notebook that doesn't trigger notifications when updated.

**Working Example:**

```jsx
const inputRef = useRef();
```

---

## 18. What is the difference between useRef and useState?

| useRef        | useState         |
| ------------- | ---------------- |
| No re-render  | Causes re-render |
| Mutable value | State value      |
| DOM Access    | UI Updates       |

**Real-Life Example:**
Notebook vs digital display board.

---

## 19. What is the purpose of useMemo?

**Answer:**
useMemo caches expensive calculations to improve performance.

**Real-Life Example:**
Saving frequently used calculations in a calculator.

**Working Example:**

```jsx
const total = useMemo(() => {
  return calculateTotal(items);
}, [items]);
```

---

## 20. What is the purpose of useCallback?

**Answer:**
useCallback caches functions to prevent unnecessary recreation.

**Real-Life Example:**
Reusing the same key instead of making a new one every time.

**Working Example:**

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

---

## 21. What is React Context API?

**Answer:**
Context API shares data across components without passing props manually.

**Real-Life Example:**
A company notice board accessible by everyone.

**Working Example:**

```jsx
const UserContext = createContext();
```

---

## 22. How does Context API differ from Redux?

| Context API          | Redux                    |
| -------------------- | ------------------------ |
| Simple state sharing | Complex state management |
| Built into React     | External library         |
| Small-Medium Apps    | Large Apps               |

**Real-Life Example:**
Local office notice board vs company-wide management system.

---

## 23. What are custom hooks?

**Answer:**
Custom hooks allow reusable stateful logic.

**Real-Life Example:**
Creating your own utility tool.

**Working Example:**

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  return { count, setCount };
}
```

---

## 24. What is prop drilling?

**Answer:**
Prop drilling occurs when props are passed through many components unnecessarily.

**Real-Life Example:**
Passing a message through multiple people to reach one person.

**Solution:**
Use Context API or Redux.

---

## 25. What are Higher-Order Components (HOCs)?

**Answer:**
A HOC is a function that takes a component and returns an enhanced component.

**Real-Life Example:**
Adding extra features to a car.

**Working Example:**

```jsx
const Enhanced = withAuth(Component);
```

---

# Quick Revision Formula

```text
React = UI Library

Core Concepts:
Components
Props
State
Hooks

Performance:
Virtual DOM
Reconciliation
useMemo
useCallback

State Sharing:
Props
Context API
Redux

Hooks:
useState
useEffect
useRef
useMemo
useCallback

Optimization:
React.memo
Lazy Loading
Code Splitting
```

### Most Asked React Topics

```text
1. Virtual DOM
2. Reconciliation
3. Props vs State
4. useEffect
5. useMemo vs useCallback
6. Context API
7. React.memo
8. React Lifecycle
9. Re-rendering
10. Performance Optimization
```

**Part 2** will cover questions **26–50**, including:

- Render Props
- Fragments
- Keys
- Conditional Rendering
- React.memo
- Batching
- SSR vs CSR
- Hydration
- Suspense
- Error Boundaries
- Fiber Architecture
- Hooks Internals
- Stale Closures
- Race Conditions
- Portals
- Scalable React Architecture
- React Senior-Level Questions (most asked in 5+ YOE interviews)

# React Interview Questions & Answers (Part 2/2)

---

## 26. What are render props?

**Answer:**
A Render Prop is a technique where a component shares logic by passing a function as a prop.

**Real-Life Example:**
A chef gives ingredients, and customers decide how to prepare the dish.

**Working Example:**

```jsx id="p6v3n8"
function DataProvider({ render }) {
  return render("React");
}

<DataProvider render={(data) => <h1>{data}</h1>} />;
```

---

## 27. What is React.Fragment and why is it used?

**Answer:**
React.Fragment lets you group multiple elements without adding extra DOM nodes.

**Real-Life Example:**
Using a folder to organize papers without adding another page.

**Working Example:**

```jsx id="2uh6g4"
<>
  <h1>Hello</h1>
  <p>World</p>
</>
```

---

## 28. What are keys in React lists and why are they important?

**Answer:**
Keys help React identify which list items changed, were added, or removed.

**Real-Life Example:**
Employee ID numbers used to identify employees.

**Working Example:**

```jsx id="w2x8v9"
users.map((user) => <li key={user.id}>{user.name}</li>);
```

---

## 29. What is conditional rendering in React?

**Answer:**
Conditional rendering displays UI based on conditions.

**Real-Life Example:**
Showing the admin panel only to admins.

**Working Example:**

```jsx id="j5m1q3"
{
  isLoggedIn ? <Dashboard /> : <Login />;
}
```

---

## 30. What is lifting state up in React?

**Answer:**
Lifting state up means moving state to the closest common parent so multiple components can share it.

**Real-Life Example:**
Parents keeping information and sharing it with children.

**Working Example:**

```jsx id="v7n4c2"
function Parent() {
  const [name, setName] = useState("");

  return (
    <>
      <Child1 name={name} />
      <Child2 setName={setName} />
    </>
  );
}
```

---

# Frequently Asked in Mid/Senior React Interviews

---

## 31. What causes a React component to re-render?

**Answer:**

A component re-renders when:

- State changes
- Props change
- Context changes
- Parent re-renders

**Real-Life Example:**
A scoreboard updates whenever the score changes.

**Working Example:**

```jsx id="f8z2k5"
setCount(count + 1);
```

---

## 32. How can you optimize React application performance?

**Answer:**

Common techniques:

- React.memo
- useMemo
- useCallback
- Code Splitting
- Lazy Loading
- Virtualization

**Real-Life Example:**
Caching frequently used data instead of recalculating.

**Working Example:**

```jsx id="m3x7r1"
const total = useMemo(() => {
  return calculateTotal(items);
}, [items]);
```

---

## 33. What is React.memo and when should you use it?

**Answer:**
React.memo prevents unnecessary re-renders if props haven't changed.

**Real-Life Example:**
Reusing an existing report instead of generating it again.

**Working Example:**

```jsx id="q9v5n8"
const User = React.memo(function User({ name }) {
  return <h1>{name}</h1>;
});
```

---

## 34. How does React's batching mechanism work?

**Answer:**
React groups multiple state updates into a single re-render to improve performance.

**Real-Life Example:**
Completing multiple bank transactions together instead of individually.

**Working Example:**

```jsx id="t4c8m6"
setCount((c) => c + 1);
setName("John");
```

React performs one render.

---

## 35. What is the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)?

| CSR                   | SSR                |
| --------------------- | ------------------ |
| Rendered in Browser   | Rendered on Server |
| Slower first load     | Faster first load  |
| Better SPA experience | Better SEO         |

**Real-Life Example:**

CSR = Cooking food at home.
SSR = Food delivered ready to eat.

---

## 36. What is hydration in React?

**Answer:**
Hydration attaches React functionality to HTML generated on the server.

**Real-Life Example:**
Installing electronics into a fully built car.

**Working Example:**

```jsx id="h2w7p4"
hydrateRoot(document.getElementById("root"), <App />);
```

---

## 37. What is Concurrent Rendering in React?

**Answer:**
Concurrent Rendering allows React to pause, resume, and prioritize rendering work.

**Real-Life Example:**
A manager handling urgent tasks before less important ones.

**Working Example:**

```jsx id="r6y9k2"
const [isPending, startTransition] = useTransition();
```

---

## 38. What are React Suspense and lazy loading?

**Answer:**
Lazy loading loads components only when needed. Suspense shows fallback UI while loading.

**Real-Life Example:**
Downloading a movie only when you click Play.

**Working Example:**

```jsx id="x5m8c1"
const Dashboard = React.lazy(() => import("./Dashboard"));
```

```jsx id="n7p2v5"
<Suspense fallback={<p>Loading...</p>}>
  <Dashboard />
</Suspense>
```

---

## 39. What are Error Boundaries and when should they be used?

**Answer:**
Error Boundaries catch JavaScript errors in child components and display fallback UI.

**Real-Life Example:**
A circuit breaker preventing the whole building from losing power.

**Working Example:**

```jsx id="z4k6n9"
class ErrorBoundary extends React.Component {
  componentDidCatch(error) {
    console.log(error);
  }
}
```

---

## 40. Explain the React component lifecycle and equivalent Hooks.

**Answer:**

### Mounting

```jsx id="d3x7m8"
useEffect(() => {
  console.log("Mounted");
}, []);
```

### Updating

```jsx id="j8v2c6"
useEffect(() => {
  console.log("Updated");
}, [count]);
```

### Unmounting

```jsx id="s5m9k3"
useEffect(() => {
  return () => {
    console.log("Unmounted");
  };
}, []);
```

**Real-Life Example:**

- Mount = Employee joins company
- Update = Employee changes role
- Unmount = Employee leaves company

---

# Quick Revision Formula

```text id="u2k8p4"
Render Props:
Function as Prop

Fragment:
Avoid Extra DOM Nodes

Keys:
Unique Identifier for Lists

Conditional Rendering:
if ? true : false

Lifting State Up:
Move State to Parent

Re-render Causes:
State Change
Props Change
Context Change

Optimization:
React.memo
useMemo
useCallback

Rendering:
CSR = Browser
SSR = Server

Hydration:
Attach React to SSR HTML

Concurrent Rendering:
Pause & Prioritize Rendering

Suspense:
Loading UI

Lazy:
Load Components on Demand

Error Boundary:
Catch UI Errors

Lifecycle:
Mount → useEffect([])
Update → useEffect([dep])
Unmount → Cleanup Function
```

---

# Top 10 React Questions Asked in Interviews

```text id="w6p3n7"
1. Virtual DOM
2. Reconciliation
3. Props vs State
4. useEffect
5. useMemo vs useCallback
6. Context API vs Redux
7. React.memo
8. SSR vs CSR
9. Suspense & Lazy Loading
10. Component Lifecycle
```

These 10 topics alone cover roughly **70–80% of React interview discussions** for Frontend, React Developer, and Full-Stack roles.
