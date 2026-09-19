---
title: "CSS Container Queries: Responsive Design Without the Viewport"
date: "2026-09-08"
excerpt: "Media queries respond to the viewport. Container queries respond to the component's own space — here's why that matters."
---

For most of CSS's history, "responsive" has meant one thing: media queries that check the size of the browser viewport. That works fine when a component only ever lives in one place on the page, but it falls apart the moment you reuse a component in a sidebar, a main column, and a modal — three contexts with wildly different available widths, all under the same viewport size.

Container queries fix this by letting an element respond to the size of its containing element instead of the viewport.

## Setting up a containment context

Before you can query a container's size, you have to opt an element into being one:


`container-type: inline-size` tells the browser to track the element's width (the inline dimension in a horizontal writing mode). You can also use `size` to track both dimensions, though that comes with more layout restrictions.

## Querying the container

Once a containment context exists, any descendant can use `@container` to change styles based on that container's size, not the viewport's:

Now the same `.card` component stacks vertically when it's squeezed into a narrow sidebar and switches to a two-column layout when it has 400px or more to work with — regardless of how wide the browser window is.

## Container query units

Alongside `@container`, CSS added a set of length units scoped to the nearest queried container: `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, and `cqmax`. These behave like `vw`/`vh`, but relative to the container instead of the viewport.


This lets a heading scale smoothly with the card's own width, so a card dropped into a narrow column doesn't end up with oversized text relative to the space it has.

## Practical notes

A few things worth knowing before you reach for this everywhere:

- You can't query the size of an element from within that same element — a container has to query its *ancestor's* containment context, not its own.
- `container-type: size` or `inline-size` can affect layout (it changes how the element's size is calculated relative to its children), so test carefully when applying it to elements with intrinsic sizing needs.
- Browser support is solid across evergreen browsers at this point, but if you need to support older engines, pair container queries with a media-query fallback for critical layouts.

Container queries don't replace media queries — you still want media queries for page-level layout decisions like switching navigation patterns. But for reusable components that show up in different contexts, they solve a problem media queries were never actually built to handle.
