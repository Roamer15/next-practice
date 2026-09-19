---
title: "Understanding React Server Components"
date: "2026-09-01"
excerpt: "A practical look at what Server Components change about the way we build React apps, and when to reach for them."
---

React Server Components (RSCs) shift part of your component tree so it renders on the server and never ships its code to the browser. That sounds subtle, but it changes how you think about data fetching, bundle size, and where state should live.

## What actually changes

In a traditional client-rendered React app, every component you write ends up in the JavaScript bundle, even if all it does is fetch some data and render a list. With Server Components, that same component can run entirely on the server: it fetches data directly (no API route needed), renders to a serialized tree, and streams the result to the client. The component's code, and its dependencies, never reach the browser.

This has a few concrete effects:

- **Smaller client bundles** — data-fetching and formatting logic that used to ship to the browser now stays on the server.
- **Direct backend access** — a Server Component can query a database or read a file system directly, without an API layer in between.
- **No client-side waterfall** — the server can fetch data and render markup in one pass, rather than the client fetching JSON and then rendering.

## Server vs. Client Components

Not everything can be a Server Component. Anything that needs interactivity — event handlers, `useState`, `useEffect`, browser-only APIs — has to be a Client Component, marked with a `"use client"` directive at the top of the file.

A useful mental model: default to Server Components, and only opt into Client Components at the leaves of the tree where interactivity is actually needed. A page might be a Server Component that fetches and renders a list of products, while a single "Add to cart" button inside that list is a Client Component.

```jsx
// ProductList.tsx — Server Component (no directive needed)
async function ProductList() {
  const products = await db.query("SELECT * FROM products");

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name}
          <AddToCartButton productId={p.id} />
        </li>
      ))}
    </ul>
  );
}
```

```jsx
// AddToCartButton.tsx — Client Component
"use client";

import { useState } from "react";

export function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => setAdded(true)}>
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
```

## Where this bites people

Props passed from a Server Component to a Client Component have to be serializable — you can't pass a function or a class instance across that boundary, only plain data. And once you're inside a Client Component, everything it imports is also treated as client code, even if that imported module doesn't touch the DOM.

The other common mistake is over-using `"use client"` at the top of a file just to silence an error, which quietly drags an entire subtree back into the client bundle. It's worth pushing the directive as far down the tree as it will go.

## When to reach for them

Server Components shine for content-heavy pages: blogs, dashboards, product listings, anything where the bulk of the page is "fetch data, render it." They're less useful for highly interactive UI like drag-and-drop editors or real-time collaborative tools, where most of the tree needs to be a Client Component anyway. Most real apps end up as a mix of both, and that's the point — RSCs aren't a replacement for client-side React, they're a way to avoid paying its cost for the parts of your UI that don't need it.
