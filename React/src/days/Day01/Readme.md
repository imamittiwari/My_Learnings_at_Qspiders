# React - Akshay Saini

## Episode - 1 : Inception

### How to write "hello, World!" using HTML, JavaScript, React ?

**Using HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

**Using JavaScript (DOM Manipulation):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <div id="root"></div>
    <script>
        const root = document.getElementById('root');
        const heading = document.createElement('h1');
        heading.textContent = 'Hello, World!';
        root.appendChild(heading);
    </script>
</body>
</html>
```

**Using React (with CDN):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script>
        const heading = React.createElement('h1', null, 'Hello, World!');
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(heading);
    </script>
</body>
</html>
```

---

### How to connect React with HTML document and in our project?

There are two main ways to connect React with an HTML document:

1. **Using CDN (Content Delivery Network):** Add React and ReactDOM script tags in the HTML file. React is the core library, and ReactDOM is used to render React elements into the actual DOM.

   ```html
   <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
   <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
   ```

2. **Using a Build Tool (Create React App / Vite):** This is the modern approach. You set up a project using tools like `create-react-app` or `Vite`, which handle bundling, transpilation (JSX to JS), and development server automatically. The build tool generates an HTML file that includes the bundled JavaScript.

   ```bash
   npx create-react-app my-app
   # or
   npm create vite@latest my-app -- --template react
   ```

   The generated `index.html` has a `<div id="root"></div>` where React mounts, and the JavaScript entry point (e.g., `src/index.js`) uses `ReactDOM.createRoot()` to render the app.

---

### What is CDN?

**CDN** stands for **Content Delivery Network**. It is a geographically distributed network of servers that work together to deliver internet content (like HTML pages, JavaScript files, stylesheets, images, and videos) to users quickly and efficiently.

**Key benefits:**
- **Faster Load Times:** Content is served from the server closest to the user's location, reducing latency.
- **Reduced Server Load:** CDNs handle traffic spikes and distribute the load across multiple servers.
- **High Availability & Reliability:** If one server goes down, another server takes over.
- **Caching:** Static assets are cached at edge locations, so subsequent requests are faster.

**Example in React:** Instead of hosting React library files on your own server, you can link to them via a CDN like `unpkg.com` or `cdnjs.com`:
```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
```

---

### What is cross origin?

**Cross-Origin** refers to a situation where a web page requests a resource (like a script, image, or API data) from a different **origin** (domain, protocol, or port) than the one that served the web page.

**Origin** is defined by three things:
- **Protocol** (e.g., `https://` vs `http://`)
- **Domain** (e.g., `example.com` vs `api.example.com`)
- **Port** (e.g., `:3000` vs `:5000`)

If any of these differ, the request is considered **cross-origin**.

**Why is this important?**
- Browsers enforce the **Same-Origin Policy** for security reasons, which prevents a malicious website from reading sensitive data from another site.
- For cross-origin requests to be allowed, the server must include specific HTTP headers (like `Access-Control-Allow-Origin`) — this is called **CORS (Cross-Origin Resource Sharing)**.

**In the React CDN context:**
```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
```
The `crossorigin` attribute is added to the `<script>` tag to handle CORS errors properly when loading React from a CDN. It tells the browser to make the request with CORS enabled, which helps with error reporting and debugging.

---

### What is React?

**React** is a JavaScript library for building user interfaces, developed and maintained by Meta (Facebook).

**Key Characteristics:**

- **Component-Based:** UI is built using reusable, self-contained components that manage their own state and logic.
- **Declarative:** You describe what the UI should look like based on the current state, and React efficiently updates the DOM to match that description.
- **Virtual DOM:** React uses a virtual representation of the DOM in memory. When state changes, React creates a new virtual DOM tree, compares it with the previous one (diffing), and calculates the minimal set of changes needed to update the real DOM (reconciliation). This makes updates fast and efficient.
- **Unidirectional Data Flow:** Data flows from parent to child components via props, making the application predictable and easier to debug.
- **JSX (JavaScript XML):** A syntax extension that allows you to write HTML-like code within JavaScript, making component code more readable and expressive.

**Example:**
```jsx
function App() {
  return <h1>Hello, World!</h1>;
}
```

React is not a full-fledged framework (like Angular) — it is a library focused solely on the view layer. For routing, state management, and other features, you typically use additional libraries like React Router, Redux, or Context API.

---

### It is a Javascript library for building user interfaces.

// React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when the state of the application changes.
// React uses a virtual DOM to optimize rendering performance. When the state of a component changes, React creates a new virtual DOM representation of the UI and compares it to the previous version. It then calculates the minimum number of changes needed to update the actual DOM, which improves performance and reduces unnecessary re-rendering.
// React is declarative, meaning that developers describe what the UI should look like based on the current state of the application, and React takes care of updating the DOM to match that description. This makes it easier to reason about the UI and reduces the likelihood of bugs caused by manual DOM manipulation.
// hello world in react