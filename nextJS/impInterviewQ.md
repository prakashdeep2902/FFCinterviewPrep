If you're interviewing for a **3–6 years Frontend Engineer** role, these are among the most commonly asked **Next.js interview questions**. Learn the definition, understand the concept, and be ready to explain with examples.

---

# 1. What is Next.js?

### Definition

Next.js is a React framework that provides features like:

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- API Routes
- File-based Routing
- Image Optimization
- SEO improvements

It helps build fast and scalable web applications.

### Example

```jsx
export default function Home() {
  return <h1>Hello Next.js</h1>;
}
```

---

# 2. What is the difference between React and Next.js?

| React                 | Next.js                |
| --------------------- | ---------------------- |
| UI Library            | React Framework        |
| Client-side rendering | Supports SSR, SSG, ISR |
| Manual Routing        | File-based Routing     |
| SEO is difficult      | Better SEO             |
| No Backend            | API Routes included    |

Example:

React

```jsx
<BrowserRouter>
```

Next.js

```
app/
 page.js
 about/page.js
```

Routing is automatic.

---

# 3. What is File-Based Routing?

### Definition

Every folder inside **app** or **pages** automatically becomes a route.

Example

```
app/
   page.js
   about/
      page.js
   contact/
      page.js
```

Routes become

```
/
about
/contact
```

---

# 4. What are Server Components?

### Definition

Server Components run on the server.

Benefits

- Smaller JavaScript bundle
- Faster loading
- Can fetch data directly
- More secure

Example

```jsx
export default async function Products() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();

  return (
    <>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </>
  );
}
```

---

# 5. What are Client Components?

### Definition

Client Components run in the browser.

Needed for

- useState
- useEffect
- Event handlers
- Browser APIs

Example

```jsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```

---

# 6. What is "use client"?

### Definition

It tells Next.js to render this component on the client.

Example

```jsx
"use client";

import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("Browser");
  }, []);

  return <h1>Hello</h1>;
}
```

Without `"use client"` you'll get an error if you use React hooks.

---

# 7. Difference between Server and Client Components

| Server Component | Client Component      |
| ---------------- | --------------------- |
| Runs on server   | Runs in browser       |
| Faster           | Interactive           |
| No useState      | Supports useState     |
| No useEffect     | Supports useEffect    |
| Better SEO       | Used for interactions |

---

# 8. What is SSR?

### Server Side Rendering

HTML is generated on every request.

Example

```jsx
export default async function Page() {
  const data = await fetch("https://api.com/posts");

  return <div>Posts</div>;
}
```

Best for

- Dashboards
- News
- Dynamic content

---

# 9. What is Static Site Generation (SSG)?

### Definition

Page is generated at build time.

Example

```jsx
export default async function Blog() {
  const posts = await fetch("https://api.com/posts", {
    cache: "force-cache",
  });

  return <div>Blog</div>;
}
```

Good for

- Blogs
- Landing pages
- Documentation

---

# 10. What is Incremental Static Regeneration (ISR)?

### Definition

Updates static pages after a certain interval.

Example

```jsx
export const revalidate = 60;

export default async function Products() {
  const res = await fetch("https://api.com/products");
}
```

Updates every 60 seconds.

---

# 11. What is Dynamic Routing?

Example

```
app/

products/

[id]/

page.js
```

URL

```
/products/5
```

Example

```jsx
export default function Product({ params }) {
  return <h1>{params.id}</h1>;
}
```

---

# 12. What is Nested Routing?

Example

```
app/

dashboard/

users/

page.js
```

URL

```
/dashboard/users
```

---

# 13. How do you fetch data in Next.js?

Server Component

```jsx
const data = await fetch("https://api.com/users");
```

Client Component

```jsx
"use client";

useEffect(() => {
  fetch("/api/users");
}, []);
```

---

# 14. What is next/image?

### Definition

Optimized Image component.

Benefits

- Lazy loading
- Responsive images
- Automatic optimization

Example

```jsx
import Image from "next/image";

<Image src="/profile.png" width={300} height={300} alt="Profile" />;
```

---

# 15. What is next/link?

### Definition

Used for client-side navigation.

Example

```jsx
import Link from "next/link";

<Link href="/about">About</Link>;
```

No page refresh.

---

# 16. What are API Routes?

### Definition

Backend endpoints inside Next.js.

Example

```
app/

api/

users/

route.js
```

```jsx
export async function GET() {
  return Response.json({
    name: "John",
  });
}
```

---

# 17. How do you protect routes?

Using middleware or authentication.

Example

```jsx
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
```

---

# 18. What is Middleware?

### Definition

Runs before a request reaches a page.

Uses

- Authentication
- Redirects
- Logging
- Localization

Example

```jsx
export function middleware(req) {
  console.log(req.nextUrl.pathname);
}
```

---

# 19. What is Layout in Next.js?

### Definition

A layout wraps multiple pages so shared UI (header, footer, sidebar) doesn't need to be repeated.

Example

```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Navbar</header>

        {children}

        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

---

# 20. What are loading.js and error.js?

### `loading.js`

Shows a loading UI while a route or data is being fetched.

Example

```jsx
export default function Loading() {
  return <p>Loading...</p>;
}
```

### `error.js`

Handles rendering when an error occurs in a route segment.

```jsx
"use client";

export default function Error({ error, reset }) {
  return (
    <>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </>
  );
}
```

---

# Bonus Interview Question

### Q. Why would you choose Next.js over React?

**Answer:**

- Better SEO with Server-Side Rendering (SSR) and Static Site Generation (SSG).
- File-based routing simplifies navigation.
- Supports Server Components for improved performance.
- Built-in API routes eliminate the need for a separate backend for simple APIs.
- Automatic code splitting, image optimization, and font optimization.
- Middleware and layouts are built in.
- Overall, it provides a more complete framework for production-ready React applications.

---
