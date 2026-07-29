# Day 07 - useEffect Hook & React Routing (Interview Friendly Notes)

---

## Part 1: useEffect Hook

---

## 📌 What is useEffect?

`useEffect` is a React Hook that lets you synchronize a component with an external system (side effects). It runs after the component renders to the DOM.

**Common side effects:**
- Fetching data from an API
- Updating the DOM directly
- Setting up subscriptions / event listeners
- Timers (`setTimeout`, `setInterval`)
- Logging

---

## 🧠 Dependency Array Behavior (3 Cases)

### 1️⃣ No dependency array → Runs on every render

```jsx
useEffect(() => {
  console.log("Runs after EVERY render");
});
```

- Runs after **every** re-render (initial + updates).
- **Use case:** When you need to sync something on every render (rarely used).
- **Interview tip:** This can cause **infinite loops** if you call a state setter inside.

### 2️⃣ Empty dependency array `[]` → Runs only once (on mount)

```jsx
useEffect(() => {
  console.log("Runs only ONCE after initial render");
}, []);
```

- Runs **only after the first render** (component mounts).
- Equivalent to `componentDidMount` in class components.
- **Use case:** API calls on page load, initial data fetching.

### 3️⃣ Dependency array with values → Runs when values change

```jsx
useEffect(() => {
  console.log("Runs every time `count` changes");
}, [count]);
```

- Runs when **any value in the array changes**.
- React uses `Object.is()` comparison to detect changes.
- **Use case:** Reacting to prop/state changes (e.g., filtering data when search input changes).

---

## 🧹 Cleanup Function

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
    console.log("Cleanup on unmount or re-render");
  };
}, []);
```

- The function returned from `useEffect` is the **cleanup**.
- Runs on:
  - **Unmount** (component removed from DOM)
  - **Before re-running** the effect (when deps change)
- **Use case:** Clearing timers, unsubscribing from WebSockets, removing event listeners.
- **Interview tip:** Always clean up subscriptions/timers to prevent **memory leaks**.

---

## 🚀 GraphQL — A Better Way to Fetch Data

### 📌 What is GraphQL?

GraphQL is a **query language for APIs** developed by Meta (Facebook) in 2012. It lets clients request **exactly** the data they need — no more, no less.

**REST (traditional):** Multiple endpoints, each returns a fixed structure.
**GraphQL:** Single endpoint, client specifies the shape of the response.

---

### 🔧 REST vs GraphQL — The Problem

**Scenario:** Build a profile page showing user name + last 3 posts.

**REST approach:**
```
GET /api/users/1    → { id, name, email, address, phone, ... }   // Too much data
GET /api/users/1/posts → [ { id, title, body, createdAt, ... }, ... ]  // Too much data
```
- You fetch **more data than needed** (over-fetching)
- You might need **multiple requests** (under-fetching)
- Frontend changes may break the API contract

**GraphQL approach:**
```
POST /graphql
Query:
  user(id: 1) {
    name
    posts(limit: 3) {
      title
      createdAt
    }
  }

Response (exactly what you asked for):
{
  "user": {
    "name": "Amit",
    "posts": [
      { "title": "React Hooks", "createdAt": "2024-01-15" },
      { "title": "GraphQL Basics", "createdAt": "2024-01-10" },
      { "title": "JS Closures", "createdAt": "2024-01-05" }
    ]
  }
}
```
- One request, one response
- **Exactly** the data you need
- Client controls the shape

---

### 📦 Core Concepts

#### 1️⃣ Schema — The Contract

```graphql
# Schema defines what data is available
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  createdAt: String!
}

type Query {
  user(id: ID!): User
  posts: [Post!]!
  search(query: String!): [Post!]!
}
```

- **Type system** — every field has a type (`String`, `Int`, `ID`, custom types)
- `!` means **non-nullable** (field is required)
- `[Post!]!` — array of non-null Posts, array itself is non-null
- Acts as a **single source of truth** between frontend and backend

#### 2️⃣ Queries — Read Data

```graphql
# Get specific fields from a user
query {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}
```

#### 3️⃣ Mutations — Write/Modify Data

```graphql
# Create a new post
mutation {
  createPost(input: {
    title: "GraphQL is awesome"
    body: "Learning GraphQL..."
    userId: "1"
  }) {
    id
    title
    createdAt
  }
}
```

- `query` = GET (read)
- `mutation` = POST/PUT/DELETE (write)

#### 4️⃣ Subscriptions — Real-time Data (WebSockets)

```graphql
subscription {
  newPost {
    id
    title
    createdAt
  }
}
```

- Server **pushes** updates to client when data changes
- Used for: chat apps, live feeds, notifications

---

### 🧩 GraphQL in React with Apollo Client

Apollo Client is the most popular GraphQL client for React.

#### Installation

```bash
npm install @apollo/client graphql
```

#### Setup Apollo Provider

```jsx
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.example.com/graphql",  // Single endpoint
  cache: new InMemoryCache(),               // Automatic caching
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RestaurantMenu />
    </ApolloProvider>
  );
}
```

#### Fetching Data with `useQuery`

```jsx
import { gql, useQuery } from "@apollo/client";

// 1. Define the query
const GET_RESTAURANT = gql`
  query GetRestaurant($id: ID!) {
    restaurant(id: $id) {
      name
      cuisine
      rating
      menuItems {
        id
        name
        price
      }
    }
  }
`;

function RestaurantMenu({ restaurantId }) {
  // 2. Execute the query (auto-fetches when component mounts)
  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id: restaurantId },
  });

  // 3. Handle states
  if (loading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;

  const restaurant = data.restaurant;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.cuisine} — ⭐ {restaurant.rating}</p>
      <ul>
        {restaurant.menuItems.map((item) => (
          <li key={item.id}>{item.name} — ₹{item.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

| Apollo Hook | Purpose | Equivalent in REST |
|---|---|---|
| `useQuery` | Fetch data (auto-executes on mount) | `useEffect` + `fetch` |
| `useMutation` | Modify data (create, update, delete) | `fetch` with POST/PUT/DELETE |
| `useSubscription` | Real-time updates via WebSocket | WebSocket + event listener |

---

### 🧠 Key Benefits of GraphQL

| Benefit | Explanation |
|---|---|
| **No over-fetching** | Request only the fields you need |
| **No under-fetching** | Get all related data in one request |
| **Single endpoint** | `POST /graphql` for everything (no `/api/users`, `/api/posts`, etc.) |
| **Strongly typed** | Schema acts as documentation + validation |
| **Frontend-driven** | UI determines the query shape, not the backend |
| **Auto-caching** | Apollo Client caches query results automatically |
| **Developer tools** | GraphiQL/Playground — interactive API explorer |

---

### ❌ Disadvantages

| Disadvantage | Explanation |
|---|---|
| **Complexity** | Requires schema setup, resolvers, type definitions |
| **Caching is harder** | More complex than REST's simple URL-based caching |
| **Query cost** | A malicious query could request deeply nested data (N+1 problem) |
| **Learning curve** | Team needs to learn GraphQL syntax and tooling |
| **Overkill for simple APIs** | If you have 2-3 endpoints, REST is simpler |

---

### 🔄 REST vs GraphQL — Quick Comparison

| Feature | REST | GraphQL |
|---|---|---|
| **Endpoint** | Multiple (`/users`, `/posts`) | Single (`/graphql`) |
| **Data fetching** | Fixed structure per endpoint | Client specifies fields |
| **Over-fetching** | Common (gets entire resource) | None (gets only requested fields) |
| **Under-fetching** | Common (multiple requests needed) | None (nested queries in one request) |
| **Versioning** | `/v1/users`, `/v2/users` | No versioning — evolve schema |
| **Caching** | Easy (URL-based) | Complex (needs Apollo Cache) |
| **File upload** | Easy (multipart) | Requires special setup |
| **Tooling** | Postman, cURL | GraphiQL, Apollo DevTools |

---

### 💡 Real-world Example: Fetching Restaurant Data

**REST:**
```jsx
// 3 separate requests!
const [restaurant, setRestaurant] = useState({});
const [menu, setMenu] = useState([]);
const [reviews, setReviews] = useState([]);

useEffect(() => {
  fetch("/api/restaurants/123").then(r => r.json()).then(setRestaurant);
  fetch("/api/restaurants/123/menu").then(r => r.json()).then(setMenu);
  fetch("/api/restaurants/123/reviews").then(r => r.json()).then(setReviews);
}, []);
```

**GraphQL:**
```jsx
// 1 request, exactly the data you need!
const GET_RESTAURANT_DATA = gql`
  query {
    restaurant(id: 123) {
      name
      cuisine
      rating
      menuItems { name price }
      reviews { user { name } rating comment }
    }
  }
`;

const { data } = useQuery(GET_RESTAURANT_DATA);
// data.restaurant has everything in one object
```

---

### 🎯 Interview Q&A

**Q: When would you choose GraphQL over REST?**
> Choose GraphQL when: you have complex data relationships (dashboards, social feeds), multiple clients (web + mobile) that need different data shapes, or when you want frontend teams to move independently without backend changes.

**Q: How does GraphQL handle errors?**
> GraphQL always returns HTTP 200. Errors are included in the response body under the `errors` array alongside partial data. This allows the client to render what's available even if some fields fail.

```json
{
  "data": { "user": null },
  "errors": [{ "message": "User not found", "path": ["user"] }]
}
```

**Q: What is the N+1 problem in GraphQL?**
> When a query fetches a list of items and each item triggers a separate database query. Example: fetching 10 posts → each post fetches its author → 11 database queries total. Solved with **DataLoader** (batching + caching).

**Q: Can you use GraphQL with React without Apollo?**
> Yes. You can use plain `fetch` or `axios` to send POST requests to a GraphQL endpoint. But Apollo provides caching, state management, loading/error states, and dev tools out of the box.

**Q: How is authentication handled in GraphQL?**
> Usually via HTTP headers (Authorization token), same as REST. The token is sent with every request. Apollo Client allows setting headers in the `ApolloClient` config.

---

### 🎯 One-Liner for Interview

> *"GraphQL is a query language for APIs that lets clients request exactly the data they need from a single endpoint. In React, Apollo Client provides `useQuery` and `useMutation` hooks to fetch and modify data with automatic caching, no over-fetching, and a strongly typed schema."*

---

### Q1: What happens if you call setState inside useEffect without deps?
> Infinite re-render loop. The component renders → effect runs → state updates → re-render → effect runs again → infinite loop.

### Q2: useEffect vs useLayoutEffect?
- `useEffect` → runs **after** paint (async). Does not block visual updates.
- `useLayoutEffect` → runs **before** paint (sync). Blocks visual updates.
- Use `useLayoutEffect` when you need to read layout/size and mutate DOM synchronously.

### Q3: How does React compare dependency values?
> Uses `Object.is()` comparison (similar to `===` but treats `+0` and `-0` differently, and `NaN === NaN` as `true`).

### Q4: What if you omit a required dependency?
> React's ESLint plugin (`react-hooks/exhaustive-deps`) will warn you. Missing dependencies can lead to **stale closures** (reading old values).

### Q5: Can useEffect be async?
> The effect function itself cannot be `async` (because it expects either `undefined` or a cleanup function). But you can define an async function **inside**:

```jsx
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };
  fetchData();
}, []);
```

---

## 📝 Summary Table (useEffect)

| Dependency Array | When it runs | Equivalent in class component |
|---|---|---|
| Not provided | Every render | `componentDidUpdate` (every time) |
| `[]` (empty) | Only on mount | `componentDidMount` |
| `[a, b]` | When `a` or `b` changes | `componentDidUpdate` (only when deps change) |
| Cleanup return | On unmount / before re-run | `componentWillUnmount` |

---

## 🎯 One-Liner for Interview (useEffect)

> *"useEffect lets you perform side effects in function components. It runs after render, and you control when it re-runs using the dependency array — no array means every render, empty array means once on mount, and populated array means only when those values change. Always clean up subscriptions to avoid memory leaks."*

---

## Part 2: React Routing

---

## 📌 What is React Router?

React Router is a standard library for **routing and navigation** in React applications. It enables **client-side routing** — navigating between different views/pages without making a full page reload from the server.

**Why not just use anchor tags `<a href>`?**
- `<a>` tags cause a **full page refresh**, losing all React state.
- React Router intercepts navigation and updates the UI **without reloading** the page.
- Results in a faster, app-like experience (SPA — Single Page Application).

---

## 📖 What is a Single Page Application (SPA)?

A **Single Page Application (SPA)** is a web application that loads **a single HTML page** and dynamically updates the content as the user interacts with it — **without reloading the entire page**.

### 🔧 How a SPA works

```
Traditional MPA (Multi-Page Application):
  Click Link → Server sends new HTML → Page reloads → All state lost

SPA (Single Page Application):
  Click Link → JavaScript updates DOM → No reload → State preserved
```

**Traditional MPA flow:**
1. Browser requests `index.html` from server
2. User clicks "About" link
3. Browser sends a **new** request to server for `about.html`
4. Server responds with the full `about.html` page
5. **Entire page reloads** — white flash, all React state lost

**React SPA flow:**
1. Browser requests `index.html` from server (only **once**)
2. React loads, JavaScript bundle executes
3. User clicks `<Link to="/about">`
4. React Router **intercepts** the click (prevents default)
5. Updates the URL using **History API** (`pushState`)
6. React re-renders only the **necessary components**
7. **No page reload** — instant, smooth transition

### 🏠 Real-world analogy

> **MPA (Traditional):** You go into a different room for every task — kitchen to cook, bedroom to sleep, bathroom to shower. Each time you enter a new room, you forget what you were doing before.
>
> **SPA (React):** You're in one big room (the SPA). Different sections of the room handle different tasks — but you never leave the room. You just look at a different corner. You remember everything.

### ✅ Advantages of SPA

| Advantage | Why it matters |
|---|---|
| **Fast navigation** | No full page reload — instant transitions |
| **Rich user experience** | Smooth animations, no white flashes |
| **State persistence** | React state, Redux store, form inputs — all preserved across "pages" |
| **Reduced server load** | Server sends data (JSON) not HTML — less bandwidth |
| **Offline capability** | Once loaded, the app can work offline with service workers |

### ❌ Disadvantages of SPA

| Disadvantage | Explanation |
|---|---|
| **Slow initial load** | Must download the entire JS bundle before anything is visible |
| **SEO challenges** | Search engines struggle to index JavaScript-rendered content (mitigated by SSR like Next.js) |
| **JavaScript required** | If JS is disabled, the app is blank |
| **Memory leaks** | Since the page never reloads, unmanaged event listeners/timers can accumulate |
| **Browser history** | Must manually manage the back/forward buttons (React Router handles this) |

### 🧠 Why is React a good fit for SPAs?

React's **component-based architecture** is perfect for SPAs because:

1. **Virtual DOM** — Efficiently updates only what changed (no full page re-render)
2. **Components** — Each "page" is just a component that mounts/unmounts
3. **State management** — State persists as long as the SPA is running
4. **React Router** — Built specifically to add SPA-style routing to React apps

### 🎯 Interview Q&A

**Q: Is React itself a SPA?**
> No. React is a **library** for building user interfaces. You can build a SPA **with** React, but React is not a SPA by itself. React Router is what makes it a SPA.

**Q: What is the difference between SPA and MPA?**
> **SPA:** One HTML page, JS handles navigation, no reloads, state preserved. **MPA:** Multiple HTML pages, each navigation triggers a full server request and page reload.

**Q: How does a SPA handle the browser's back/forward buttons?**
> Using the **History API** (`popstate` event). React Router listens for these events and renders the appropriate component. Without React Router, you'd have to manually manage this.

**Q: What are the SEO solutions for SPAs?**
> **SSR (Server-Side Rendering)** — frameworks like Next.js render React on the server so search engines get HTML. **Prerendering** — generate static HTML at build time. **Dynamic rendering** — serve pre-rendered pages to bots and the SPA to users.

**Q: Can you have a SPA without React Router?**
> Yes, but you'd have to manually manage: URL changes via `history.pushState()`, route matching logic, component rendering based on URL, and back/button navigation via `popstate`. React Router does all of this for you.

### 📊 SPA vs MPA Comparison

| Feature | SPA (React + Router) | MPA (Traditional) |
|---|---|---|
| Page loads | Once (initial) | Every navigation |
| Navigation speed | Instant | Slow (network request) |
| User experience | Smooth, app-like | Janky, page flashes |
| State persistence | Yes | Lost on reload |
| SEO | Poor (without SSR) | Excellent |
| Initial load time | Slower (big bundle) | Faster (smaller pages) |
| Server load | Lighter (serves JSON) | Heavier (serves HTML) |
| Complexity | Higher (routing, state) | Lower (simpler architecture) |

---

## 🔀 Client-Side Routing vs Server-Side Routing

Routing is the mechanism that determines **what content to show** based on the current URL. There are two fundamentally different approaches.

---

### 🖥️ Server-Side Routing (Traditional / MPA)

**How it works:** Every URL change sends a request to the **server**. The server generates a new HTML page and sends it back. The browser **reloads entirely**.

```
Browser                          Server
  │                                │
  ├── GET /about ──────────────►   │
  │                                ├── Looks up route "/about"
  │                                ├── Queries database
  │                                ├── Renders complete HTML page
  │◄────── (full HTML page) ──────┤
  │                                │
  ├── Browser **reloads**         │
  ├── All JS re-initializes       │
  ├── All React state lost        │
  │                                │
  ├── GET /contact ────────────►   │
  │◄────── (full HTML page) ──────┤
  │ (same reload cycle repeats)   │
```

**Examples:** Traditional websites (PHP, Django, Ruby on Rails, ASP.NET), WordPress.

**Key characteristics:**
- Each URL = a separate HTML file on the server
- Navigation = full HTTP request → full page response
- Server decides what HTML to send based on the URL
- Browser just displays whatever the server sends
- Back/forward buttons work naturally (browser history)

**✅ Pros:**
- SEO-friendly (search engines easily crawl HTML pages)
- Fast initial load (server sends pre-rendered HTML)
- Works without JavaScript
- Simple to implement

**❌ Cons:**
- Slower navigation (full page reload each time)
- Poor user experience (white flash between pages)
- All state lost on navigation
- Higher server load (renders HTML on every request)
- More bandwidth (sends entire HTML each time)

---

### 📱 Client-Side Routing (SPA / React Router)

**How it works:** The app loads **once** from the server. All subsequent navigation is handled **entirely in the browser** using JavaScript. No new HTML requests are made.

```
Browser                          Server
  │                                │
  ├── GET / (index.html) ──────►  │
  │◄────── (empty HTML + JS) ──── │  ← Only **one** full page load
  │                                │
  ├── React boots up              │
  ├── React Router reads URL "/"  │
  ├── Renders Home component      │
  │                                │
  ├── User clicks <Link to="/about">
  ├── React Router intercepts     │
  ├── Updates URL (pushState)     │  ← **No server request!**
  ├── Renders About component     │
  ├── No page reload              │
  │                                │
  ├── User clicks <Link to="/contact">
  ├── React Router intercepts     │
  ├── Updates URL (pushState)     │  ← **No server request!**
  ├── Renders Contact component   │
  ├── No page reload              │
```

**Examples:** React + React Router, Vue + Vue Router, Angular Router.

**Key characteristics:**
- One HTML file loaded initially (e.g., `index.html`)
- JavaScript (React Router) reads the URL and renders the matching component
- Navigation happens in the browser — **no server contact** for page changes
- Uses the **History API** (`pushState`, `replaceState`, `popstate`) to manage URL
- Only fetches data (JSON) from server when needed (e.g., API calls)

**✅ Pros:**
- Instant navigation (no page reload)
- Smooth user experience (no white flash)
- State preserved across "pages"
- Reduced server load (server only sends JSON data)
- Enables rich, app-like interactions

**❌ Cons:**
- Slower initial load (must download JS bundle first)
- SEO challenges (search engines may not execute JS — mitigated by SSR)
- Requires JavaScript (blank page if JS disabled)
- More complex to implement
- Must manually handle back/forward buttons (React Router does this)

---

### 🧠 Deep Dive: What happens on URL change?

| Step | Server-Side Routing | Client-Side Routing |
|---|---|---|
| User clicks link | `GET /about` request sent to server | `Link` click **intercepted** by React Router |
| Server processing | Server matches route, queries DB, renders HTML | **No server involved** |
| Response | Full HTML page sent back | **Nothing sent** (no request) |
| DOM update | Entire DOM replaced (full reload) | React's Virtual DOM efficiently updates only changed parts |
| JavaScript | Entire JS re-downloaded & re-executed | Already loaded — just runs the new component |
| State | Lost (React re-initializes from scratch) | Preserved (React app never unmounted) |
| Flash | White flash between pages | Smooth transition (no flash) |

---

### 📊 At a Glance Comparison

| Aspect | Server-Side Routing | Client-Side Routing |
|---|---|---|
| **Where routing happens** | Server | Browser (JavaScript) |
| **Page reload** | Full reload every navigation | No reload after initial load |
| **Network request** | New HTTP request per URL | No request (unless fetching data) |
| **HTML source** | Server generates fresh HTML | Browser manipulates existing DOM |
| **SEO** | ✅ Excellent | ❌ Poor (fixable with SSR) |
| **Performance (navigation)** | ❌ Slow | ✅ Instant |
| **Performance (initial)** | ✅ Fast | ❌ Slower (big JS bundle) |
| **State persistence** | ❌ Lost on navigation | ✅ Preserved |
| **JavaScript requirement** | ❌ Not required | ✅ Required |
| **Back/forward buttons** | Works naturally | Must be implemented (React Router does it) |

---

### 🏗️ How React Router implements Client-Side Routing

React Router uses three key browser APIs to make client-side routing work:

| API | Role |
|---|---|
| **`history.pushState()`** | Changes the URL in the address bar **without** reloading the page |
| **`history.replaceState()`** | Changes the URL **without** reloading and **without** adding to browser history |
| **`popstate` event** | Fires when user clicks back/forward — React Router listens for this and re-renders |

```jsx
// Simplified — this is essentially what React Router does internally
// 1. User clicks Link → calls history.pushState("/about", ...)
// 2. URL bar shows "/about" — no reload
// 3. React Router catches the change, matches "/about" to <Route path="/about">
// 4. Renders the matched component

<Routes>
  <Route path="/about" element={<About />} />  {/* React renders this */}
</Routes>
```

---

### 🎯 Interview Q&A

**Q: What is the fundamental difference between client-side and server-side routing?**
> **Server-side routing** sends a new HTTP request for every URL change — the server returns a new HTML page and the browser reloads entirely. **Client-side routing** intercepts URL changes in the browser using JavaScript, updates the URL via the History API, and renders the corresponding component — **no new request, no page reload**.

**Q: Can you combine both?**
> Yes! Many modern apps use **both**. For example, Next.js uses server-side routing for **initial page load** (SSR for SEO) and client-side routing for **subsequent navigation** (for speed).

**Q: When would you choose server-side routing over client-side routing?**
> Choose server-side routing when: SEO is critical (public blog, e-commerce), users may have JavaScript disabled, or for simple content-driven sites where instant navigation isn't necessary.

**Q: When would you choose client-side routing?**
> Choose client-side routing when building dashboards, web apps, social media platforms — anything that requires instant navigation, state persistence, and an app-like experience.

**Q: Does client-side routing mean no server requests at all?**
> No. The routing itself doesn't make server requests, but your components might. For example, navigating to `/dashboard` won't reload the page, but the `Dashboard` component might call `fetch("/api/user")` to get data. Client-side routing = no HTML requests; data requests (JSON/API) still happen as needed.

---

## 🏗️ Installation

```bash
npm install react-router-dom
```

- `react-router-dom` is the web-specific version of React Router (v6+ is current).


## 🧱 Core Components

### 1️⃣ `BrowserRouter` — The Router Wrapper

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- Wraps the entire app.
- Uses the **HTML5 History API** (`pushState`, `popstate`) to keep UI in sync with the URL.
- **Interview tip:** There's also `HashRouter` (uses `#` in URL) — useful for static file servers that don't support fallback routing.

### 2️⃣ `Routes` & `Route` — Defining Paths

```jsx
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

- `Routes` looks through its children `Route` components and renders the **first match**.
- `path="*"` is a **catch-all** for 404 pages.
- In v6, routes are **exact by default** — no need for `exact` prop (unlike v5).

### 3️⃣ `Link` — Navigation (No Page Reload)

**What is the `Link` component?**
`Link` is a React Router component used for **client-side navigation** between routes. It renders an `<a>` tag in the DOM but **intercepts the click** to prevent a full page reload.

#### 🔧 How it works

```jsx
import { Link } from "react-router-dom";

<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
</nav>
```

#### 🧠 Key Points

| Concept | Explanation |
|---|---|
| **Renders as** | An `<a href="/about">` tag in the DOM |
| **Prevents reload** | Intercepts the click event, calls `event.preventDefault()` internally |
| **Updates URL** | Uses the History API (`pushState`) to change the URL without a server request |
| **Renders component** | React Router matches the new URL and renders the corresponding component |
| **Preserves state** | All React state, context, and Redux store are preserved (no page refresh) |

#### ❓ Why not use `<a href>` instead?

| `<a href="/about">` | `<Link to="/about">` |
|---|---|
| Full page reload | Client-side navigation (no reload) |
| All React state lost | State preserved |
| New HTTP request to server | No server request |
| Slower, flashes white screen | Instant, smooth transition |
| Entire app re-initializes | Only the matched component re-renders |

#### 🧪 What actually happens when you click a `Link`?

1. User clicks `<Link to="/about">`
2. React Router **prevents** the browser's default navigation
3. URL changes from `/` to `/about` via `history.pushState()`
4. `Routes` component detects the URL change
5. It matches `/about` against its route definitions
6. The matched `<About />` component renders
7. The page updates **instantly** — no network request, no page refresh

#### 🎯 Props

| Prop | Type | Description |
|---|---|---|
| `to` | string \| object | The target path (e.g., `"/about"` or `{ pathname: "/about", search: "?tab=1" }`) |
| `replace` | boolean | If `true`, replaces the current history entry instead of pushing a new one |
| `state` | object | Pass state to the target route (accessible via `useLocation()`) |
| `reloadDocument` | boolean | If `true`, forces a full page reload (skips client-side navigation) |

#### 📦 Passing state via Link

```jsx
<Link 
  to="/profile" 
  state={{ from: "homepage", userId: 123 }}
>
  View Profile
</Link>

// In Profile component:
import { useLocation } from "react-router-dom";
const location = useLocation();
console.log(location.state); // { from: "homepage", userId: 123 }
```

#### 🎯 Interview Q&A

**Q: Does `Link` render an `<a>` tag or a `<button>`?**
> It renders an `<a>` tag with an `href` attribute. This is important for **accessibility** (screen readers recognize it as a link) and **SEO** (search engines crawl `href` values).

**Q: Can you use `Link` with external URLs?**
> No. `Link` is for **internal** navigation only. For external links, use a regular `<a href="https://...">` tag.

**Q: What is the difference between `Link` and `NavLink`?**
> `NavLink` is a special version of `Link` that adds styling (like an `active` class) when the current URL matches its `to` prop. `Link` has no such styling.

**Q: What happens if you right-click and "Open in new tab" on a `Link`?**
> The browser's default behavior takes over — it opens the `href` URL in a new tab, causing a full page load. Client-side navigation only works on **left-click**.

### 4️⃣ `NavLink` — Link with Active State

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active-link" : "")}
>
  About
</NavLink>
```

- Like `Link` but adds styling when the link matches the current URL.
- Provides `isActive` and `isPending` props to the render function / className callback.
- **Use case:** Highlighting the current page in a navigation bar.

---

## 🧩 Advanced Routing Patterns

### 📂 Nested Routes (Children Routes)

**What are children routes?**
Children routes are routes **nested inside** a parent route. They share the parent's layout/UI and render inside an `<Outlet />` component placed in the parent.

**Why use children routes?**
- **Shared layout** — Header, sidebar, footer remain constant; only the content area changes.
- **URL hierarchy** — The URL reflects the nesting (e.g., `/dashboard/settings`).
- **Code organization** — Each child is its own component, keeping things modular.

#### 🔧 How it works — Step by Step

**Step 1: Define parent + children in route config**

```jsx
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    {/* index route = renders at /dashboard (no extra path) */}
    <Route index element={<DashboardHome />} />
    
    {/* child routes = render at /dashboard/settings, /dashboard/profile */}
    <Route path="settings" element={<Settings />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>
```

**Step 2: Parent component uses `<Outlet />` as a placeholder**

```jsx
// DashboardLayout.jsx
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside>{/* Sidebar — always visible */}</aside>
      <main>
        <Outlet /> {/* Child component renders HERE */}
      </main>
    </div>
  );
}
```

**Step 3: Navigation links**

```jsx
import { NavLink } from "react-router-dom";

function DashboardSidebar() {
  return (
    <nav>
      <NavLink to="/dashboard" end>Home</NavLink>
      <NavLink to="/dashboard/settings">Settings</NavLink>
      <NavLink to="/dashboard/profile">Profile</NavLink>
    </nav>
  );
}
```

#### 🧠 Key Concepts

| Concept | Explanation |
|---|---|
| **Parent Route** | Has `element` + wraps children. Provides the layout. |
| **Child Route** | Has `path` relative to parent. Renders inside parent's `<Outlet />`. |
| **`<Outlet />`** | A placeholder component where the matched child route renders. |
| **`index` Route** | A child with no `path` — renders at the parent's exact URL. |
| **Relative paths** | Child paths like `"settings"` become `/dashboard/settings` automatically. |

#### 📂 Real-world example

```
URL: /dashboard          → renders DashboardLayout + DashboardHome
URL: /dashboard/settings → renders DashboardLayout + Settings
URL: /dashboard/profile  → renders DashboardLayout + Profile
```

The `<DashboardLayout>` component renders **once** and only the `<Outlet />` content swaps.

#### 🎯 Interview Q&A

**Q: What is the difference between a parent route and a layout route?**
> They're the same thing. A parent route that wraps children with `<Outlet />` is called a **layout route** because it provides a shared layout for all its children.

**Q: Can you nest routes multiple levels deep?**
> Yes! You can nest as deep as you want. Each level needs its own `<Outlet />`.

```jsx
<Route path="dashboard" element={<DashboardLayout />}>
  <Route path="settings" element={<SettingsLayout />}>
    <Route index element={<GeneralSettings />} />
    <Route path="security" element={<SecuritySettings />} />
  </Route>
</Route>
```

**Q: What happens if no child route matches?**
> If none of the children match, the parent's `<Outlet />` renders nothing (blank). You can add a catch-all child `<Route path="*" element={<NotFound />} />` inside the parent to handle this.

**Q: How is this different from React Router v5?**
> In v5, you had to manually render `{this.props.children}` or use `props.match.path`. In v6, `<Outlet />` is the standard, cleaner way.

### 🔄 Dynamic Routes (URL Params) — `useParams`

**What is `useParams`?**
`useParams` is a React Router hook that returns an object of **key/value pairs** from the current URL's dynamic segments (parameters). It lets you extract values from the URL path.

#### 🔧 How it works

**Step 1: Define a route with a dynamic segment (`:paramName`)**

```jsx
<Route path="/users/:userId" element={<UserProfile />} />
<Route path="/products/:productId" element={<ProductDetail />} />
<Route path="/restaurants/:resId/menu" element={<RestaurantMenu />} />
```

- The colon `:` marks a **dynamic segment** — it matches any value
- `:userId`, `:productId`, `:resId` are **parameter names**
- The actual value in the URL is captured and made available via `useParams()`

**Step 2: Read the parameter in your component**

```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();
  // If URL is /users/42, then userId = "42"
  
  return <h1>User ID: {userId}</h1>;
}
```

#### 🧠 URL Matching Examples

| Route Pattern | URL | `useParams()` returns |
|---|---|---|
| `/users/:userId` | `/users/42` | `{ userId: "42" }` |
| `/users/:userId` | `/users/abc-123` | `{ userId: "abc-123" }` |
| `/products/:productId` | `/products/5` | `{ productId: "5" }` |
| `/restaurants/:resId/menu` | `/restaurants/99/menu` | `{ resId: "99" }` |
| `/posts/:postId/comments/:commentId` | `/posts/1/comments/3` | `{ postId: "1", commentId: "3" }` |

#### 🧪 Real-world example: Restaurant Menu Page

```jsx
// App.js — Route definition
<Route path="/restaurant/:resId" element={<RestaurantMenu />} />

// RestaurantMenu.js — Component
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RestaurantMenu() {
  const { resId } = useParams();  // Extract restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Use the URL parameter to fetch specific restaurant data
    fetchMenu(resId);
  }, [resId]);  // Re-fetch if resId changes

  const fetchMenu = async (id) => {
    const data = await fetch(`/api/restaurants/${id}`);
    const json = await data.json();
    setRestaurant(json);
  };

  if (!restaurant) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.cuisine} — ⭐ {restaurant.rating}</p>
      <ul>
        {restaurant.menuItems.map(item => (
          <li key={item.id}>{item.name} — ₹{item.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 🔗 How users navigate to dynamic routes

```jsx
// Using Link with a dynamic value
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <h3>{restaurant.name}</h3>
    </Link>
  );
}

// Using useNavigate with a dynamic value
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
      <h3>{restaurant.name}</h3>
    </div>
  );
}
```

#### 🧠 Key Points

| Concept | Explanation |
|---|---|
| **`:` prefix** | Marks a dynamic segment in the route path |
| **Parameter name** | The word after `:` becomes the key in the params object |
| **`useParams()`** | Returns `{ paramName: "value" }` — always a **string** |
| **Multiple params** | You can have multiple dynamic segments in one path |
| **Optional params** | Not supported directly — use multiple routes or query params instead |
| **Type** | Values are always **strings** — convert with `Number()` if needed |

#### 🎯 Interview Q&A

**Q: What is the difference between `useParams` and `useSearchParams`?**
> `useParams` extracts values from the **URL path** (e.g., `/users/42` → `{ userId: "42" }`). `useSearchParams` extracts values from the **query string** (e.g., `/users?page=2` → `{ page: "2" }`).

**Q: What happens if the URL doesn't match the route pattern?**
> The route won't match at all. React Router will look for the next `<Route>` in the `<Routes>` component. If no route matches, nothing renders (or your catch-all `path="*"` route renders).

**Q: Can you have optional URL parameters?**
> React Router v6 does not support optional params directly. Workarounds: use two routes (`/users/:id` and `/users`), or use query parameters instead.

**Q: Are `useParams` values strings or numbers?**
> Always **strings**. If you need a number, convert it: `const id = Number(useParams().userId)`.

**Q: What happens if the component re-renders with a different param?**
> The component re-receives the new param value. If you're fetching data inside `useEffect`, include the param in the dependency array so it re-fetches when the param changes.

```jsx
useEffect(() => {
  fetchData(id);
}, [id]);  // ✅ Re-fetches when id changes
```

### 🔀 Programmatic Navigation

```jsx
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... login logic
    navigate("/dashboard", { replace: true });
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

- `useNavigate()` returns a navigate function.
- `navigate("/path")` — push a new entry to history.
- `navigate("/path", { replace: true })` — replace current entry (no back button to previous page).
- `navigate(-1)` — go back one step (like browser back button).

### ❓ Query Parameters (Search Params)

```jsx
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <div>
      <input value={query} onChange={(e) => updateSearch(e.target.value)} />
      <p>Searching for: {query}</p>
    </div>
  );
}
```

- `useSearchParams()` works like `useState` but syncs with URL query string.
- `searchParams.get("key")` — read a param.
- `setSearchParams({ key: value })` — update query string.
- **Use case:** Search pages, filters, pagination.

---

## 🧹 Lazy Loading / Code Splitting

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

- `React.lazy()` enables **code splitting** — components are loaded only when needed.
- `Suspense` shows a fallback UI while the component loads.
- **Interview tip:** This improves **initial load time** by reducing bundle size.

---

## 🛡️ Protected Routes (Authentication)

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

- Wraps routes that require authentication.
- If not authenticated, redirect to login using `<Navigate>`.
- **Interview tip:** This is a common pattern — you can also store redirect path and send user back after login.

---

## ❗ Common Pitfalls & Interview Questions

### Q1: React Router v5 vs v6 — key differences?
| Feature | v5 | v6 |
|---|---|---|
| Route syntax | `<Route path="/" component={Home} />` | `<Route path="/" element={<Home />} />` |
| Exact matching | `exact` prop needed | Exact by default |
| Switch | `<Switch>` | `<Routes>` |
| Nested routes | Manual composition | `<Outlet />` |
| useHistory | `useHistory()` | `useNavigate()` |
| Redirect | `<Redirect>` | `<Navigate>` |

### Q2: What is the difference between `Link` and `Navigate`?
- `Link` is a **component** for declarative navigation (user clicks).
- `Navigate` is a **component** for imperative/redirect navigation (renders and immediately navigates).
- `useNavigate()` is a **hook** for programmatic navigation (after an async operation).

### Q3: How does React Router prevent full page reload?
> It uses the **History API** (`pushState`, `replaceState`) to change the URL without triggering a server request, then matches the new URL against its route tree and renders the corresponding component.

### Q4: What is `Outlet` and when would you use it?
> `Outlet` is a component that renders the **child route** of a parent route. Used for **layout routes** where you want a shared UI (header, sidebar, footer) with changing content in the middle.

### Q5: How do you handle 404 pages?
```jsx
<Route path="*" element={<NotFound />} />
```
> The `*` wildcard matches any path that wasn't matched above.

### Q6: What is `useLocation` used for?
```jsx
import { useLocation } from "react-router-dom";

function usePageTracking() {
  const location = useLocation();
  useEffect(() => {
    // Send page view to analytics
    analytics.track(location.pathname);
  }, [location]);
}
```
> `useLocation()` returns the current location object. Useful for analytics, scroll-to-top on route change, or passing state between pages.

---

## 📝 Summary Table (Routing)

| Component/Hook | Purpose |
|---|---|
| `BrowserRouter` | Wraps app, syncs UI with URL |
| `Routes` | Container for route matching |
| `Route` | Defines a path + component mapping |
| `Link` | Declarative navigation (no reload) |
| `NavLink` | Link with active state styling |
| `Navigate` | Redirect component |
| `Outlet` | Renders nested child routes |
| `useParams()` | Read URL parameters |
| `useNavigate()` | Programmatic navigation |
| `useSearchParams()` | Read/write query string |
| `useLocation()` | Access current URL object |

---

## 🎯 One-Liner for Interview (Routing)

> *"React Router enables client-side routing in SPAs using the History API. Key components are `BrowserRouter`, `Routes`/`Route`, `Link`/`NavLink`, and `Outlet` for nested layouts. Hooks like `useParams`, `useNavigate`, and `useSearchParams` handle dynamic routing, programmatic navigation, and query strings. In v6, routes are exact by default and the `element` prop replaces the old `component` prop."*