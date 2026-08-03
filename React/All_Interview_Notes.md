# React Interview Notes — Complete Collection

> **Collected from all daily README files (Day 01 to Day 08)**
> Organized in chronological order for easy reference and PDF conversion.

---

# 📘 Day 01 — Episode 1: Inception

## How to write "Hello, World!" using HTML, JavaScript, React?

### Using HTML:
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

### Using JavaScript (DOM Manipulation):
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

### Using React (with CDN):
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

## How to connect React with HTML document and in our project?

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

## What is CDN?

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

## What is cross origin?

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

## What is React?

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

## It is a JavaScript library for building user interfaces.

- React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when the state of the application changes.
- React uses a virtual DOM to optimize rendering performance. When the state of a component changes, React creates a new virtual DOM representation of the UI and compares it to the previous version. It then calculates the minimum number of changes needed to update the actual DOM, which improves performance and reduces unnecessary re-rendering.
- React is declarative, meaning that developers describe what the UI should look like based on the current state of the application, and React takes care of updating the DOM to match that description. This makes it easier to reason about the UI and reduces the likelihood of bugs caused by manual DOM manipulation.

---

# 📘 Day 02 — Episode 2: Igniting Our App

## What is npm?

npm is the **largest package manager** in the world. It does **not** stand for Node Package Manager. It serves as a standard repository where we can install, manage, and share reusable code (packages/libraries) for our projects.

## How to initialise npm?

```
npm init
```

This creates a `package.json` file. Use `npm init -y` to skip prompts and accept defaults.

## What is package.json file?

It is the **configuration file** for our project and npm. It stores metadata (name, version, scripts, dependencies, etc.) and tells npm what packages our project needs.

## Why do we need package.json file?

- **Dependency Management:** Tracks all project dependencies and versions. Anyone can install them with `npm install`.
- **Scripts:** Lets us define custom commands like `npm start`, `npm run build`, etc.
- **Metadata:** Stores project info (name, version, author, license, repository).
- **Reproducibility:** Ensures the same dependency versions across environments (with `package-lock.json`).

## Package

A **package** is a reusable piece of code published on the npm registry (e.g., React, Lodash). Each package has its own `package.json`.

## Dependencies

External packages our project needs. Two types:

- **dependencies** – Required for the app to run in production (e.g., React, ReactDOM).
  - Install: `npm install <package-name>`
- **devDependencies** – Required only during development/testing (e.g., Parcel, Jest, Babel).
  - Install: `npm install -D <package-name>` or `npm install --save-dev <package-name>`

Key difference:
| Aspect | dependencies | devDependencies |
|--------|-------------|-----------------|
| Available in production | ✅ Yes | ❌ No |
| Available in development | ✅ Yes | ✅ Yes |
| Installed with `npm install --production` | ✅ Yes | ❌ No |
| Example | React, Lodash, Axios | Parcel, Webpack, Jest, Babel |

## What is a Bundler?

A **bundler** is a build tool that takes our code and its dependencies and bundles them into optimized, production-ready files. It handles:

- **Minification** – Removes whitespace/comments to reduce file size.
- **Tree Shaking** – Removes unused code.
- **Code Splitting** – Breaks code into smaller chunks for faster loading.
- **Transpilation** – Converts modern JS (ES6+) for browser compatibility.
- **Dev Server** – Provides live reloading during development.

**Examples:** Parcel, Webpack, Vite, Rollup.

## What is Babel?

Babel is a **JavaScript transpiler/compiler** that converts modern JavaScript (ES6+/ESNext) into backward-compatible versions that older browsers can understand. It handles:

- **Transpilation** – Converts ES6+ features (arrow functions, template literals, destructuring, etc.) to ES5.
- **Polyfilling** – Adds missing features to older environments (e.g., Promise, Array.includes).
- **JSX Transformation** – Converts JSX (React syntax) into regular JavaScript.

## What is Webpack?

Webpack is a **module bundler** that takes modules with dependencies (JS, CSS, images, fonts) and generates static assets (bundles). It features:

- **Entry/Output** – Defines where bundling starts and where bundles are saved.
- **Loaders** – Process files (e.g., Babel-loader for JS, CSS-loader for CSS) before bundling.
- **Plugins** – Extend functionality (e.g., minification, HTML generation, environment variables).
- **Code Splitting** – Splits code into lazy-loaded chunks for better performance.
- **Hot Module Replacement (HMR)** – Updates modules in the browser without full reload.

## package.json vs package-lock.json

| Feature | package.json | package-lock.json |
|---------|-------------|-------------------|
| **Purpose** | Project config & metadata | Locks exact versions of every installed dependency |
| **Version range** | Uses `^`, `~`, or exact versions (e.g., `^2.16.4`) | Records the **exact installed version** (e.g., `2.16.4`) |
| **Auto-updated** | Manually updated when you install/remove packages | Automatically updated on every `npm install` |
| **Committed to git** | ✅ Yes (always) | ✅ Yes (should be committed) |
| **Reproducibility** | May install different minor/patch versions across environments | Ensures **identical** dependency tree across all environments |
| **Contains** | Project metadata, scripts, dependency ranges | Exact version, resolved URL, integrity hash, full dependency tree of every package |
| **Regeneration** | Created via `npm init` | Auto-generated on `npm install` |

Key Point: `package.json` defines the **range** of allowed versions, while `package-lock.json` **locks** the exact versions so every developer gets the same dependencies.

## What is node_modules?

`node_modules` is a folder created by npm that contains all the **installed packages** (dependencies) our project needs. Key points:

- **Auto-generated** – Created when you run `npm install`.
- **Heavy** – Can be very large (hundreds of MBs) due to nested dependencies.
- **Not committed to git** – Added to `.gitignore` because it can be regenerated via `npm install`.
- **Contains transitive dependencies** – Your dependencies' own dependencies are also stored here.
- **Structure** – Each package gets its own folder inside `node_modules`.

## What are Transitive Dependencies?

**Transitive dependencies** are the dependencies of our direct dependencies. In other words, if our project uses Package A, and Package A internally uses Package B, then Package B is a transitive dependency of our project.

Example:
```
Our Project
  └── React (direct dependency)
        └── loose-envify (transitive dependency of React)
              └── js-tokens (transitive dependency of loose-envify)
```

- npm automatically installs all transitive dependencies inside `node_modules`.
- They are **not listed** in our `package.json` but are present in `package-lock.json`.
- They are essential for our direct dependencies to work correctly.

## ^ (Caret) and ~ (Tilde) in Dependency Versions

These symbols prefix version numbers in `package.json` to control automatic updates:

- **`^` (Caret)** – Allows updates to **minor and patch** versions.  
  `"parcel": "^2.16.4"` → Accepts any `2.x.x` where x >= 16.4 (e.g., 2.17.0, 2.16.5) but NOT 3.0.0.  
  *Most commonly used.*

- **`~` (Tilde)** – Allows updates to **patch versions only**.  
  `"parcel": "~2.16.4"` → Accepts only `2.16.x` where x >= 4 (e.g., 2.16.5, 2.16.6) but NOT 2.17.0.

- **No symbol (exact)** – Locks to the exact version.  
  `"parcel": "2.16.4"` → Always installs exactly 2.16.4, no updates.

## What is Parcel?

Parcel is a **zero-configuration bundler** used in this episode to bundle our React app.

### Benefits of Parcel:
- **Zero Config** – Works out of the box with no config file (no webpack.config.js needed).
- **Fast Builds** – Uses multi-core processing and file system caching for blazing-fast build times.
- **HMR (Hot Module Replacement)** – Updates modules in real-time without full page reload.
- **File Watching Algorithm** – Uses native OS events to detect file changes instantly and trigger incremental re-builds only for affected modules.
- **Caching** – Uses `.parcel-cache` folder with content-based hashing for incremental builds – second build is much faster.
- **Bundling** – Takes all your code (JS, CSS, HTML, images) and dependencies and bundles them into optimized, production-ready files.
- **Minification** – Minifies JS, CSS, HTML for production builds by removing whitespace, comments, and shortening variable names.
- **Compression** – Automatically compresses output with Gzip/Brotli for smaller file sizes and faster network transfer.
- **Image Optimisation** – Optimises images (JPEG, PNG, WebP, SVG) by compressing them without quality loss, and supports modern formats like WebP and AVIF.
- **Consistent Hashing** – Adds content-based hashes to output filenames (e.g., `App.a1b2c3d4.js`). If file content changes, the hash changes → browser loads new file. If content is same, hash stays same → browser uses cached version. Enables long-term caching.
- **Tree Shaking** – Removes unused/dead code to reduce bundle size.
- **Code Splitting** – Automatically splits code into smaller chunks that are loaded **lazily** (only when needed). This reduces initial load time — users only download the code required for the current page/view.
- **Differential Bundling** – Generates **different bundles** for modern and legacy browsers. Parcel produces one bundle using modern syntax (ES6+) for newer browsers and another with transpiled code (ES5) + polyfills for older browsers (e.g., Internet Explorer).
- **Automatic Transpilation** – Automatically handles Babel, PostCSS, SCSS, TypeScript – no manual setup.
- **Dev Server** – Built-in development server with live reloading and error overlays.
- **Supports JS, CSS, HTML, Images** – Handles all file types natively without loaders.
- **HTTPS support** – Can serve over HTTPS for development with `--https` flag.
- **Scope Hoisting** – Wraps modules into a single scope for faster runtime execution and better minification in production builds.
- **Bundle Inlining** – Allows inlining the compiled contents of one bundle (e.g., a small CSS or JS file) directly into another bundle to reduce HTTP requests.
- **Node Emulation** – Provides polyfills and emulation for Node.js built-in modules (e.g., `fs`, `path`, `process`, `Buffer`) when running code in the browser.

### Parcel's File Watching Algorithm
Parcel uses a **file watching algorithm** to detect changes in files and trigger re-builds automatically. Key details:

- **File Watcher** – Parcel uses the native file system events of the OS (via `@parcel/watcher`) to detect file changes instantly, instead of polling (checking periodically).
- **Granular Watching** – Watches only the files that are part of your project's dependency graph, not the entire directory.
- **Incremental Re-builds** – When a file changes, Parcel only re-builds the affected modules, not the entire project.
- **Debouncing** – If multiple files change simultaneously (e.g., git pull), Parcel batches them into a single rebuild to avoid unnecessary work.
- **HMR Integration** – The file watcher works hand-in-hand with HMR: detects change → triggers rebuild → sends updated module to browser.

### Parcel's Caching Mechanism
Parcel uses an aggressive caching system to make subsequent builds significantly faster.

- **`.parcel-cache` folder** – Stores cached build artifacts (transpiled code, optimized assets, dependency graphs) on disk.
- **Content-based hashing** – Each file is cached based on its content hash. If the file content hasn't changed, the cached version is reused.
- **First build** – Slower (e.g., 10-15 seconds) because cache is empty.
- **Second build onwards** – Much faster (e.g., 1-2 seconds) because most files are reused from cache.
- **Automatic invalidation** – Cache is automatically invalidated when:
  - File content changes
  - Dependencies are updated
  - Parcel version changes
  - Configuration changes (e.g., `.browserslistrc`)
- **Clear cache manually** – Delete `.parcel-cache` folder or run Parcel with `npx parcel --no-cache` to force a fresh build.

### What is HMR (Hot Module Replacement)?

HMR (Hot Module Replacement) is a feature that updates modules in the browser **instantly** whenever you save changes, **without reloading the entire page**.

**How it works:**
1. You edit and save a file (e.g., `App.js`).
2. Parcel detects the change and sends only the updated module to the browser.
3. The browser replaces that specific module **without refreshing the page**.
4. The application **state is preserved** (e.g., input values, scroll position, React component state).

**Benefits of HMR:**
- ✅ **Faster development** – No full page reloads, changes appear instantly.
- ✅ **State preserved** – No loss of form inputs, scroll position, or component state.
- ✅ **Instant feedback** – See changes in real-time as you code.
- ✅ **Better developer experience** – Continuous workflow without interruptions.

## Parcel Entry Point: `npx parcel index.html` vs `"main": "App.js"`

| Aspect | `npx parcel index.html` (CLI) | `"main": "App.js"` (package.json) |
|--------|-------------------------------|-----------------------------------|
| **Purpose** | Tells Parcel where to **start bundling** | Tells npm/Node.js what file to load when someone **imports this package** |
| **Used by** | Parcel bundler | npm / Node.js (require/import) |
| **For** | Applications (web apps, websites) | Libraries (packages meant to be imported by other projects) |
| **Example** | `npx parcel index.html` → Parcel reads `index.html`, finds `<script src="./App.js">`, follows dependencies | `"main": "App.js"` → When another project does `require("my-package")`, Node loads `App.js` |
| **In our project** | ✅ Correct — we pass `index.html` as entry for Parcel to bundle | ❌ Wrong — our project is an app, not a library. This caused the earlier error. |

**Key Rule:** Remove `"main"` from `package.json` when building an application. Keep it only when publishing a library.

## Parcel Commands:
- `npx parcel index.html` – Start dev server with HMR
- `npx parcel build index.html` – Build for production (optimized & minified)
- `npx parcel watch index.html` – Watch for changes without dev server

## Why CDN links for React is not a standard approach?

Using CDN links (like `<script src="https://unpkg.com/react@18/...">`) is not recommended for production because:

- **No version control** – CDN version is hardcoded; updating requires manual changes in every HTML file.
- **No bundling** – Each CDN script is a separate network request, increasing load time.
- **No tree shaking** – You download the entire React library even if you use only a small part.
- **No dependency management** – npm handles transitive dependencies automatically; CDN requires manual tracking.
- **No offline support** – Requires internet access every time the app loads.
- **Harder to maintain** – Multiple CDN links scattered across files are difficult to manage.

## What is the standard approach to use React in a project?

The standard approach is to install React as an **npm package** and use a **bundler** (like Parcel, Webpack, Vite):

1. **Initialize npm** – `npm init -y` (creates `package.json`)
2. **Install React packages** – `npm install react react-dom`
3. **Install a bundler** – `npm install -D parcel` (or webpack/vite)
4. **Write React code** using JSX and ES6 modules
5. **Use the bundler** to build/serve the app – `npx parcel index.html`

**Benefits of this approach:**
- ✅ Version control via `package.json`
- ✅ Bundling & minification for faster load times
- ✅ Tree shaking (removes unused code)
- ✅ Automatic dependency management
- ✅ Works offline after initial install
- ✅ Easy to update versions with `npm update`
- ✅ Better performance in production

---

# 📘 Day 03 — Episode 3: Laying the Foundation

## Scripts to start development server or production server?

- development server : `npm run start`
- production server : `npm run build`

- note we need to update scripts in package.json first

## What is JSX?

JSX stands for **JavaScript XML**. It is a syntax extension for JavaScript, often used with React to describe what the UI should look like.

- JSX looks like HTML but is written inside JavaScript.
- **JSX is NOT valid JavaScript.** Browsers and Node.js cannot understand JSX directly.
- JSX must be **transpiled** (converted) by a tool like **Babel** into regular `React.createElement()` calls before it can run.
- JSX makes React code more readable and expressive compared to using `React.createElement()` directly.

### ❌ What happens if you try to run JSX directly?

If you write this in a `.js` file and try to run it in a browser or Node.js:

```jsx
const heading = <h1>Hello</h1>;
```

You will get a **syntax error** like:
```
SyntaxError: Unexpected token '<'
```

### ✅ How does JSX actually work?

Behind the scenes, tools like **Babel** (configured with the React preset) transform JSX into `React.createElement()` calls **at build time**, so the browser only ever sees valid JavaScript.

| Before (JSX — your code) | After (Transpiled — what runs) |
|--------------------------|-------------------------------|
| `<h1 id="heading">Hello</h1>` | `React.createElement("h1", { id: "heading" }, "Hello")` |
| `<MyComponent name="John" />` | `React.createElement(MyComponent, { name: "John" })` |

### Key Points

- JSX prevents injection attacks (XSS) by escaping values before rendering.
- You can embed any JavaScript expression inside JSX using curly braces `{}`.
- JSX produces React "elements" which are plain JavaScript objects.
- JSX attributes use **camelCase** naming (e.g., `className` instead of `class`, `htmlFor` instead of `for`).

---

## 🔐 XSS (Cross-Site Scripting) — Threat & Prevention in JSX

**XSS** is a security vulnerability where an attacker injects malicious scripts into a web page, which then executes in the victim's browser. This can steal cookies, session tokens, or redirect users to malicious sites.

### ❌ The Problem — Without React/JSX (using `innerHTML`)

```jsx
// ❌ DANGEROUS — Never do this in plain HTML/JS
const userInput = "<img src='x' onerror='alert(\"XSS Attack!\")' />";
document.getElementById("root").innerHTML = userInput;
// The script executes! 💥
```

### ✅ The Solution — React escapes by default

```jsx
function Comment(props) {
  // Even if userInput contains malicious HTML/script tags,
  // React will escape them before rendering
  return <div>{props.userInput}</div>;
}
```

React uses `React.createElement()` under the hood, which calls `React.createElement("div", null, userInput)`. The third argument (children) is treated as a **text node**, not raw HTML. React **escapes** (sanitizes) special characters into their HTML entity equivalents.

| Character | Escaped to (HTML Entity) |
|-----------|--------------------------|
| `<` | `<` |
| `>` | `>` |
| `"` | `"` |
| `'` | `&#x27;` |
| `&` | `&` |

### ⚠️ `dangerouslySetInnerHTML` — The Escape Hatch

React provides `dangerouslySetInnerHTML` as an explicit opt-in to skip escaping. The name is intentionally scary to discourage its use.

```jsx
// Only use this when you are 100% sure the content is safe
// (e.g., sanitized server-side HTML from a trusted CMS)
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

**Rules for safe usage:**
1. Never use it with **user-generated content** (comments, usernames, search inputs)
2. Always **sanitize** the HTML server-side first (libraries: DOMPurify, sanitize-html)
3. Prefer React's built-in escaping whenever possible
4. Consider using a rich text editor library instead

### 🔑 Interview Takeaways

| Concept | Explanation |
|---------|-------------|
| **React's default behavior** | JSX escapes all content inside `{}` — prevents XSS automatically |
| **When escaping happens** | At render time, React converts special chars to HTML entities |
| **`dangerouslySetInnerHTML`** | Explicit opt-in to skip escaping — use only with sanitized data |
| **Golden rule** | Never trust user input. React handles 99% of cases, but if you must bypass escaping, sanitize first |

### 📌 One-liner for interviews

> React JSX **automatically escapes** all values embedded in `{}` by converting `<`, `>`, `"`, `'`, `&` to HTML entities, making XSS attacks virtually impossible by default. The only way to bypass this is `dangerouslySetInnerHTML`, which is intentionally named to discourage its use.

---

## What is Babel?

Babel is a **JavaScript compiler/transpiler** that converts modern JavaScript (ES6+, JSX, TypeScript) into backward-compatible JavaScript that older browsers can understand.

### How does Babel work?

Babel works in **3 phases**:

```
Input Code (JSX / ES6+) 
    ↓
1️⃣ **Parsing** → Babel reads your code and builds an **AST (Abstract Syntax Tree)** 
    ↓
2️⃣ **Transformation** → Babel applies **plugins/presets** to transform the AST (e.g., JSX → React.createElement calls, arrow functions → regular functions)
    ↓
3️⃣ **Code Generation** → Babel generates plain, backward-compatible JavaScript from the transformed AST
```

### Babel Presets

A **preset** is a collection of plugins bundled together for a specific purpose:

| Preset | Purpose |
|--------|---------|
| `@babel/preset-env` | Converts modern JS (ES6+, like `const`, arrow functions, etc.) to ES5 for older browsers |
| `@babel/preset-react` | Converts **JSX** into `React.createElement()` calls |

### 🔁 JSX + Babel — Full Flow

```
You write (JSX):
    const heading = <h1 id="heading">Hello</h1>

        ↓  Babel parses JSX using @babel/preset-react

Babel transforms to:
    const heading = React.createElement("h1", { id: "heading" }, "Hello")

        ↓  Babel transforms modern syntax using @babel/preset-env (optional)

Final output (valid JS that browsers can run):
    var heading = React.createElement("h1", { id: "heading" }, "Hello");
```

### Babel in a React Project (with Parcel)

In this course, we use **Parcel** as the bundler. Parcel has Babel built-in, so:

- You do **NOT** need to manually install or configure Babel.
- When you run `npx parcel index.html`, Parcel automatically detects JSX and transpiles it using its internal Babel setup.
- The browser receives clean, valid JavaScript.

---

## Homework: Explore various attributes of various tags in JSX

In JSX, many HTML attributes are renamed or modified compared to regular HTML. The key difference is that JSX uses **camelCase** for attribute names.

### Common HTML vs JSX attribute differences

| HTML Attribute | JSX Attribute | Notes |
|----------------|---------------|-------|
| `class` | `className` | `class` is a reserved keyword in JavaScript |
| `for` (on `<label>`) | `htmlFor` | `for` is a reserved keyword in JavaScript |
| `tabindex` | `tabIndex` | camelCase |
| `onclick` | `onClick` | camelCase for event handlers |
| `onchange` | `onChange` | camelCase for event handlers |
| `onmouseover` | `onMouseOver` | camelCase for event handlers |
| `autofocus` | `autoFocus` | camelCase |
| `maxlength` | `maxLength` | camelCase |
| `readonly` | `readOnly` | camelCase |
| `contenteditable` | `contentEditable` | camelCase |
| `colspan` | `colSpan` | camelCase |
| `rowspan` | `rowSpan` | camelCase |
| `srcset` | `srcSet` | camelCase |
| `style="color: red"` (string) | `style={{ color: "red" }}` (object) | In JSX, `style` takes a JavaScript object with camelCase CSS properties |
| `checked` | `defaultChecked` / `checked` | For controlled vs uncontrolled components |
| `value` | `defaultValue` / `value` | For controlled vs uncontrolled components |

> **Note:** All JSX attributes are camelCase except `aria-*` and `data-*` attributes, which use the same hyphenated format as HTML (e.g., `aria-label`, `data-custom-attribute`).

### Inline styles in JSX vs HTML

```jsx
// HTML: <div style="background-color: blue; font-size: 20px;">Hello</div>

// JSX: style takes a JavaScript object with camelCase property names
<div style={{ backgroundColor: "blue", fontSize: "20px" }}>Hello</div>
```

The double curly braces `{{ }}` are: outer braces for JSX expression, inner braces for the JavaScript object.

---

## Using `<img>` and `<a>` (anchor) tags in JSX

### `<img>` tag in JSX

```jsx
// Basic img tag - NOTE: self-closing and must have a closing slash!
const imgElement = <img src="https://example.com/photo.jpg" alt="Description" />;

// With additional attributes
const imgElement = (
  <img 
    src="https://example.com/photo.jpg" 
    alt="A beautiful landscape" 
    width={500} 
    height={300} 
    className="my-image"
    loading="lazy"
  />
);
```

**Important differences from HTML:**
1. Self-closing tags **must** have a closing slash: `<img />` ✅ vs `<img>` ❌
2. All attributes use camelCase where applicable
3. Values can be strings (quoted) or JavaScript expressions (in `{}`)

### `<a>` (anchor) tag in JSX

```jsx
// Basic anchor tag
const anchorElement = <a href="https://google.com">Go to Google</a>;

// With target and rel for security
const anchorElement = (
  <a 
    href="https://google.com" 
    target="_blank"
    rel="noopener noreferrer"
    className="link"
  >
    Go to Google
  </a>
);
```

### Key takeaways for `<img>` and `<a>` in JSX

| Feature | `<img>` | `<a>` |
|---------|---------|-------|
| Self-closing | ✅ Required: `<img />` | ❌ Needs closing tag: `<a></a>` |
| Required attributes | `src` and `alt` | `href` |
| Common attributes | `src`, `alt`, `width`, `height`, `loading`, `className` | `href`, `target`, `rel`, `className` |
| Special notes | Always include `alt` for accessibility | Always add `rel="noopener noreferrer"` when using `target="_blank"` |

---

## Components in React — Interview Notes

### ❓ What is a Component?
A **reusable, independent, and isolated piece of UI**. Components are the building blocks of any React application. Each component encapsulates its own structure (JSX), logic (JavaScript), and styling.

> **Analogy:** Think of components like Lego bricks — each brick is independent, reusable, and you combine them to build complex structures.

### 📋 Types of Components

React has **two types** of components:

| Feature | Class Component | Functional Component |
|---------|----------------|---------------------|
| **Syntax** | ES6 class extending `React.Component` | Plain JavaScript function |
| **State** | Uses `this.state` and `this.setState()` | Uses `useState` Hook |
| **Lifecycle** | Uses lifecycle methods (`componentDidMount`, etc.) | Uses `useEffect` Hook |
| **`this` keyword** | Required — can be confusing | Not needed — simpler |
| **Performance** | Slightly heavier | Lighter, faster |
| **Boilerplate** | More code | Less code |
| **Industry standard** | ❌ Legacy / older codebases | ✅ **Modern standard (2020+)** |

#### 1️⃣ Class Component (Legacy — not recommended for new code)

```jsx
import React, { Component } from "react";

class Header extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

- Must extend `React.Component`
- Must have a `render()` method that returns JSX
- State is managed via `this.state` and `this.setState()`
- Lifecycle methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`

#### 2️⃣ Functional Component (Modern — Industry Standard ✅)

```jsx
function Header(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// OR with arrow function
const Header = (props) => <h1>Hello, {props.name}!</h1>;
```

- Just a plain JavaScript function that returns JSX
- No `this`, no `render()`, no boilerplate
- State and lifecycle are handled via **Hooks** (`useState`, `useEffect`)
- **This is what the industry uses today**

### 🏆 Why Functional Components are Industry Standard

| Reason | Explanation |
|--------|-------------|
| **Hooks (React 16.8+)** | Hooks let you use state & lifecycle in functional components — no need for classes |
| **Less code** | No constructor, no `this`, no `render()` — cleaner and more readable |
| **Easier to test** | Pure functions are simpler to unit test |
| **Better performance** | Functional components are lighter; future React optimizations focus on them |
| **React docs recommend them** | Official React documentation now teaches functional components with Hooks as the default |
| **Community & ecosystem** | All modern libraries, tutorials, and job postings expect functional components |

> **Bottom line:** If you're learning React today, learn **functional components with Hooks**. Class components are only relevant for maintaining legacy codebases.

### 🚨 3 Golden Rules of Components

| # | Rule | Why? |
|---|------|------|
| 1 | **PascalCase** name (capital first letter) | React differentiates: lowercase → HTML element (`<div>`), uppercase → custom component (`<Header>`) |
| 2 | **Single root element** | Must return ONE wrapper. Use Fragment `<>...</>` to avoid extra `<div>` in DOM |
| 3 | **Props are read-only (immutable)** | Never modify `props` directly — React relies on immutability for change detection |

### 📦 Props (Properties)

Data passed from a **parent** component to a **child** component — like HTML attributes.

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

<Greeting name="Amit" />     // → renders "Hello, Amit!"
<Greeting name="John" />     // → renders "Hello, John!"
```

**Key characteristics of props:**
- **Read-only** — child cannot modify props
- **One-way data flow** — parent → child only (never child → parent)
- **Any data type** — string, number, boolean, array, object, function, even JSX
- **Default props** can be set via default parameters: `function Card({ name = "Guest" })`

### 🧮 Writing JavaScript Expressions in Components (Curly Braces `{}`)

In JSX, you can embed **any valid JavaScript expression** inside curly braces `{}`. This is how you make JSX dynamic.

#### ✅ What CAN go inside `{}`
| Expression Type | Example |
|----------------|---------|
| **Variables** | `{name}`, `{count}`, `{user.firstName}` |
| **Math operations** | `{5 + 3}`, `{price * quantity}` |
| **Function calls** | `{formatDate(date)}`, `{toUpperCase(text)}` |
| **Ternary/conditionals** | `{isLoggedIn ? "Logout" : "Login"}` |
| **Template literals** | `` {`Hello, ${name}!`} `` |
| **Arrays & objects** | `{items}`, `{{ key: "value" }}` |
| **JSX itself** | `{<span>Hi</span>}` (embed JSX inside JSX) |
| **Logical &&** | `{isAdmin && <AdminPanel />}` |
| **Map/loop** | `{items.map(item => <li>{item}</li>)}` |
| **Inline styles** | `<div style={{ color: "red" }}>` |

#### ❌ What CANNOT go inside `{}`
| Statement Type | Why? |
|----------------|------|
| **`if` / `else`** | Statements, not expressions. Use ternary `? :` instead |
| **`for` / `while` loops** | Statements. Use `.map()` or `.filter()` instead |
| **`switch`** | Statement. Use ternary or lookup object instead |
| **Variable declarations** | `let x = 5` is a statement. Declare outside JSX first |
| **Function declarations** | `function() {}` is a statement. Use arrow function expression `() => {}` |

#### 🔑 Key Rule

> `{}` can only contain **expressions** (things that produce a value), **not statements** (things that perform actions).

| Correct ✅ (Expression) | Wrong ❌ (Statement) |
|------------------------|---------------------|
| `{isLoggedIn ? "Yes" : "No"}` | `{if (isLoggedIn) return "Yes"}` |
| `{items.map(i => <p>{i}</p>)}` | `{for (let i of items) { ... }}` |
| `{5 + 3}` | `{let sum = 5 + 3}` |
| `{getGreeting()}` | `{function getGreeting() {}}` |

#### 📌 One-liner for interviews

> JSX uses `{}` to evaluate **any JavaScript expression** (variables, functions, ternaries, `.map()`, logical operators), but cannot execute **statements** (`if`, `for`, `switch`, variable declarations).

### 🧩 Component Composition

**Composition** means combining smaller, simpler components together to build more complex UIs. Instead of one giant component, you break UI into smaller pieces and compose them.

> React uses **composition** (not inheritance) to reuse code between components.

#### The `children` Prop (Containment)

Sometimes a component doesn't know its children ahead of time. Use the special `children` prop to pass JSX content **between** opening and closing tags.

```jsx
function Card(props) {
  return (
    <div className="card" style={{ border: "1px solid #ccc", padding: "16px" }}>
      {props.children}   {/* Whatever is between <Card> and </Card> */}
    </div>
  );
}

// Usage — Card wraps any content
<Card>
  <h2>Title</h2>
  <p>This is some content inside the card.</p>
</Card>
```

> **Analogy:** `Card` is like a gift box — the box is the wrapper, and whatever you put inside is `props.children`.

#### Composition vs Inheritance

| Approach | React's Recommendation |
|----------|------------------------|
| **Composition** ✅ | **Use this.** Combine components via props and `children` |
| **Inheritance** ❌ | **Avoid.** React components don't benefit from class inheritance patterns |

#### 📌 Composition — Interview Quick Recap

| Concept | Explanation |
|---------|-------------|
| **Composition** | Combining small components to build complex UIs |
| **`children` prop** | Pass content between opening/closing tags — like a slot |
| **Named props for JSX** | Pass JSX as any regular prop (for multiple "slots") |
| **Specialization** | One component is a "special case" of another |
| **React default** | Use composition, **never inheritance** |

### ⚡ Why Capital Letter Matters (Interview Favorite)

Babel transpiles JSX to `React.createElement()`:

```jsx
// Lowercase → React.createElement("div", ...)  → HTML element
<div>Hello</div>

// Uppercase → React.createElement(Header, ...) → Custom component
<Header />
```

- **String** as first argument → React renders an HTML element
- **Function/Class** as first argument → React treats it as a custom component

### 🔑 One-Liner Summary

> Components are **reusable JS functions** that return JSX, named in **PascalCase**, accept **props** (read-only data), and compose together to build UI. **Functional components with Hooks** are the modern industry standard.

---

# 📘 Day 04 — React Interview-Friendly Notes

## 📌 Overview of Day 04
Day 04 focuses on **building a real-world UI layout using React functional components**. We move beyond theory and start constructing a **Food Delivery App UI** (like Swiggy/Zomato) using component composition, JSX, and CSS.

## ✅ Topics Covered

### 1️⃣ Functional Components in React

**What are Functional Components?**
- JavaScript functions that return JSX (UI markup).
- They are the **modern way** to write components in React (Post React 16.8+).
- Can be written as **regular functions** or **arrow functions**.

**Syntax:**
```jsx
// Arrow function component
const Header = () => {
  return (
    <div>Content</div>
  );
};

// Or regular function
function Header() {
  return <div>Content</div>;
}
```

**Interview Question:**
> *Q: What is the difference between a functional component and a class component?*
>
> **A:** Functional components are simpler JavaScript functions that accept props and return JSX. Class components require a `render()` method and extend `React.Component`. With Hooks (React 16.8+), functional components can now handle state and lifecycle, making them the preferred approach.

### 2️⃣ Component Composition (Nesting Components)

**What is Component Composition?**
- Combining multiple smaller components to build a larger UI.
- One component can render another component inside it.

**Example from Day04:**
```
AppLayout
 ├── Header
 │    ├── Logo (img)
 │    └── Nav Items (ul > li)
 └── Body
      ├── Search
      └── Restaurant Cards Container
           └── RestaurantCard (× many)
```

**Interview Question:**
> *Q: Why is component composition important?*
>
> **A:** It promotes code reusability, better maintainability, separation of concerns, and makes the code easier to test and debug. It follows the **"divide and conquer"** principle.

### 3️⃣ JSX (JavaScript XML) — Deep Dive

**What is JSX?**
- Syntax extension for JavaScript that looks like HTML.
- Gets transpiled to `React.createElement()` calls by Babel.
- Allows writing HTML-like code directly inside JavaScript.

**Rules of JSX:**
1. **Single Parent Element** — Must return one wrapper element (use `<div>` or React Fragment `<> </>`).
2. **Self-Closing Tags** — For tags like `<img />`, `<input />`.
3. **Close Every Tag** — No unclosed tags allowed.
4. **className instead of class** — Because `class` is a reserved keyword in JavaScript.
5. **Curly Braces `{}` for JavaScript expressions** — Embed variables, functions, etc.
6. **Comments** — Use `{/* comment */}` syntax.
7. **Attributes in camelCase** — e.g., `backgroundColor`, `onClick`, `tabIndex`.

**Interview Question:**
> *Q: Can browsers read JSX directly?*
>
> **A:** No. Browsers do not understand JSX. It needs to be transpiled by a tool like **Babel** into regular `React.createElement()` calls, which the browser can understand.

### 4️⃣ Inline Styles in JSX

**How to apply inline styles in React?**
- Styles are passed as a **JavaScript object** (not a string like in HTML).
- Properties use **camelCase** instead of kebab-case.

**Example:**
```jsx
<div style={{ backgroundColor: "gray", color: "white", padding: "10px" }}>
```

**Structure Breakdown:**
- Outer `{}` → Tells JSX "this is JavaScript".
- Inner `{}` → The style object literal.

### 5️⃣ CSS in React — External Stylesheets

**How it works:**
- Write regular CSS in a `.css` file.
- Import it into your component file.
- Use `className` attribute to apply styles.

**Flexbox Layout Used:**
1. **Header** → `display: flex; justify-content: space-between` (Logo left, Nav right)
2. **Restaurant Container** → `display: flex; flex-wrap: wrap` (Cards flow to next row)
3. **Nav Items** → `display: flex` (Horizontal list items)

**Card Hover Effect:**
```css
.res-card:hover {
  border: 1px solid black;
}
```

### 6️⃣ Building Layout Structure — Food Delivery App UI

**Component Tree for a typical Food App:**
```
Header:
  ├── Logo (image)
  └── Nav Items (Home, About Us, Contact Us, Cart)

Body:
  ├── Search Bar
  └── Restaurant Card Container
       └── RestaurantCard (repeated N times)
            ├── Image
            ├── Restaurant Name
            ├── Cuisines
            ├── Ratings
            └── Delivery Time
```

### 7️⃣ Props in Functional Components

**What are Props?**
- **Props** (short for **properties**) are read-only data passed from a **parent component** to a **child component**.
- They allow you to make components **dynamic and reusable** by passing different data to the same component.
- Props are passed like HTML **attributes** and received as a **single object parameter** in the child component.

**How to Pass Props:**
```jsx
// Parent component passing props to RestaurantCard
<RestaurantCard 
  resName="Meghna Foods" 
  cuisine="Biryani, North Indian" 
  rating="4.4"
  deliveryTime="38 min"
/>
```

**How to Receive Props in Child Component:**
```jsx
// Method 1: Destructuring props directly in parameter (DESTRUCTURING ON THE FLY) ✅ BEST PRACTICE
const RestaurantCard = ({ resName, cuisine, rating, deliveryTime }) => {
  return (
    <div className='res-card' style={{ backgroundColor: "gray" }}>
      <h3>{resName}</h3>
      <h4>{cuisine}</h4>
      <h4>*{rating}</h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};

// Method 2: Using props object (NO destructuring)
const RestaurantCard = (props) => {
  return (
    <div className='res-card' style={{ backgroundColor: "gray" }}>
      <h3>{props.resName}</h3>
      <h4>{props.cuisine}</h4>
      <h4>*{props.rating}</h4>
      <h4>{props.deliveryTime}</h4>
    </div>
  );
};
```

### 🎯 Destructuring on the Fly — Deep Dive

**What is "Destructuring on the Fly"?**
- It means **destructuring the props object directly inside the function parameter** itself, rather than in the function body.
- Instead of writing `const { resName } = props;` inside the function, you do it right in the parameter: `({ resName }) =>`.

**Comparison — 3 Ways to Handle Props:**

```jsx
// ❌ WAY 1: No destructuring at all (verbose)
const RestaurantCard = (props) => {
  return <h3>{props.resName}</h3>;  // Must write "props." every time
};

// ❌ WAY 2: Destructuring in function body (extra line)
const RestaurantCard = (props) => {
  const { resName, cuisine } = props;  // Extra line of code
  return <h3>{resName}</h3>;
};

// ✅ WAY 3: Destructuring on the fly (cleanest) ⭐
const RestaurantCard = ({ resName, cuisine }) => {
  return <h3>{resName}</h3>;  // Directly use the variable
};
```

**Why Destructuring on the Fly is the Best Practice:**

| Reason | Explanation |
|--------|------------|
| **Cleaner Code** | No repetitive `props.` prefix everywhere |
| **Self-Documenting** | You can see exactly what props a component expects just by looking at its parameter |
| **Less Boilerplate** | No extra lines for variable extraction inside the function body |
| **Easier Refactoring** | Adding/removing a prop is just changing the parameter list |
| **Performance** | No runtime overhead — it's just syntactic sugar |

**Key Rules of Props:**
1. **Props are Read-Only** — A child component **must never modify** the props it receives. Props are immutable.
2. **Props Flow One-Way (Unidirectional)** — Data flows from parent → child, never the other way.
3. **Props Can Be Any Data Type** — Strings, numbers, booleans, objects, arrays, functions, even JSX.
4. **Default Props** — You can set default values in case no prop is passed.

**Interview Question:**
> *Q: What is the difference between props and state?*
>
> **A:** Props are read-only data passed from parent to child. State is mutable data managed within the component itself. Props cannot be modified by the receiving component, while state can be updated using `setState()` (class) or `useState` hook (functional).

### 8️⃣ Config-Driven UI

**What is Config-Driven UI?**
- **Config-Driven UI** is a design pattern where the UI is rendered based on **configuration data** (usually JSON/objects) rather than being hardcoded.
- The same component can render **completely different layouts** just by changing the configuration data — no code changes needed.
- This is the **industry-standard approach** used by companies like Swiggy, Zomato, Uber, and Flipkart.

**How it Works:**
```jsx
// Configuration data (usually comes from an API)
const restaurantData = [
  {
    id: 1,
    resName: "Meghna Foods",
    cuisine: "Biryani, North Indian",
    rating: "4.4",
    deliveryTime: "38 min",
    isOpen: true
  },
  {
    id: 2,
    resName: "KFC",
    cuisine: "Fried Chicken, Burgers",
    rating: "4.1",
    deliveryTime: "30 min",
    isOpen: false
  }
];

// UI is driven by config data — loop through config & render
const Body = () => {
  return (
    <div className='body'>
      <div className='search'>Search</div>
      <div className='res-container'>
        {restaurantData.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.id}
            resName={restaurant.resName}
            cuisine={restaurant.cuisine}
            rating={restaurant.rating}
            deliveryTime={restaurant.deliveryTime}
            isOpen={restaurant.isOpen}
          />
        ))}
      </div>
    </div>
  );
};
```

**Why Config-Driven UI is Powerful:**

| Before (Hardcoded) | After (Config-Driven) |
|-------------------|----------------------|
| Manually type `<RestaurantCard />` 20 times | Loop over config array with `.map()` |
| To add/remove cards, edit the component code | Just update the config data |
| Cannot change order or content dynamically | Backend API controls what renders |
| Static and rigid | Dynamic and flexible |

**Interview Question:**
> *Q: What is Config-Driven UI and why is it important?*
>
> **A:** Config-Driven UI means the UI is rendered based on configuration data (typically from a backend API) rather than hardcoded values. It allows the same codebase to display different UIs for different users, locations, or conditions without deploying new code. For example, Swiggy shows different restaurants in different cities using the same React components — only the config/API response changes.

### 9️⃣ Using `.map()` to Render Variable Data in Components

**What is `.map()` in React?**
- `.map()` is a JavaScript array method that **creates a new array** by iterating over each item and applying a transformation.
- In React, we use `.map()` to **convert an array of data into an array of JSX elements** (components).
- This is the **standard way** to render dynamic lists in React (instead of manually writing repeating `<Component />` tags).

**The Solution — Data + `.map()`:**
```jsx
// Step 1: Data array
const restaurantList = [
  { id: 1, resName: "Meghna Foods", cuisine: "Biryani", rating: "4.4", deliveryTime: "38 min" },
  { id: 2, resName: "KFC", cuisine: "Fried Chicken", rating: "4.1", deliveryTime: "30 min" },
  { id: 3, resName: "Domino's", cuisine: "Pizza", rating: "4.3", deliveryTime: "25 min" },
];

// Step 2: Map over data → return JSX for each item
const Body = () => {
  return (
    <div className='res-container'>
      {restaurantList.map((restaurant) => (
        <RestaurantCard 
          key={restaurant.id}
          resName={restaurant.resName}
          cuisine={restaurant.cuisine}
          rating={restaurant.rating}
          deliveryTime={restaurant.deliveryTime}
        />
      ))}
    </div>
  );
};
```

**Important: The `key` Prop with `.map()`:**
```jsx
// ✅ ALWAYS add a unique "key" prop when using .map()
{restaurantList.map((restaurant) => (
  <RestaurantCard key={restaurant.id} ... />  // Unique identifier
))}

// ❌ Bad — no key (React shows warning)
{restaurantList.map((restaurant) => (
  <RestaurantCard ... />
))}

// ❌ Bad — using index as key (unstable if list changes)
{restaurantList.map((restaurant, index) => (
  <RestaurantCard key={index} ... />
))}
```

**Why `key` matters:** React uses `key` to efficiently track which items changed, were added, or removed. A stable unique `key` prevents unnecessary re-renders and bugs.

**Passing the Entire Object as Props (Spread Operator shortcut):**
```jsx
// Instead of passing each property individually:
<RestaurantCard 
  resName={restaurant.resName}
  cuisine={restaurant.cuisine}
  rating={restaurant.rating}
/>

// You can use the spread operator to pass all at once:
<RestaurantCard key={restaurant.id} {...restaurant} />
// This spreads all properties of the restaurant object as individual props
```

**Interview Question:**
> *Q: Why do we use `.map()` instead of a for loop in React?*
>
> **A:** `.map()` returns a new array, making it perfect for JSX — it directly returns an array of JSX elements that React can render. A `for` loop doesn't return anything by itself and requires manually pushing into an array. `.map()` is more declarative, readable, and is the idiomatic React pattern.

**Interview Question:**
> *Q: What happens if you forget the `key` prop when using `.map()`?*
>
> **A:** React will show a warning in the console. More importantly, it can cause bugs with re-rendering — React uses `key` to identify which list items changed. Without a stable key, React may unnecessarily re-render all items or mismanage component state during list reordering.

---

## 🔑 Key Takeaways for Interviews (Day 04)

| Concept | Explanation |
|---------|------------|
| **Functional Component** | A function returning JSX |
| **Component Composition** | Nesting components within each other |
| **JSX** | HTML-like syntax in JS, transpiled by Babel |
| **className** | Replaces HTML's `class` in React |
| **Inline Styles** | Passed as JS objects with camelCase props |
| **Flexbox Layout** | Used for header & card grid |
| **Props** | Read-only data passed parent→child; makes components dynamic |
| **Config-Driven UI** | UI rendered from config data (JSON/API); no hardcoding |
| **UI Building** | Breaking UI into reusable components |

---

# 📘 Day 05 — React Interview-Friendly Notes: File Structuring & Hooks

## 📌 Overview of Day 05
Day 05 introduces **React Hooks** (starting with `useState`) and covers **industry-standard file structuring** in React applications. We also work with **real-world data** (Swiggy-like restaurant API data) to build dynamic UIs.

## ✅ Topics Covered

### 1️⃣ Industry-Standard React File Structure

**What is the standard React project structure?**

```
my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   └── Header.test.js
│   │   ├── Body/
│   │   │   ├── Body.js
│   │   │   ├── Body.css
│   │   │   └── Body.test.js
│   │   └── RestaurantCard/
│   │       ├── RestaurantCard.js
│   │       ├── RestaurantCard.css
│   │       └── RestaurantCard.test.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── mockData.js
│   │   └── helper.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

**Key directories explained:**

| Directory/File | Purpose |
|---------------|---------|
| `public/` | Static files served directly by the web server. `index.html` is the entry point. |
| `src/components/` | All React components, organized by component (each in its own folder) |
| `src/utils/` | Utility functions, constants, helper functions, mock data |
| `src/App.js` | Root component — composes all other components |
| `src/index.js` | Entry point — renders the React app into the DOM |
| `src/index.css` | Global styles (reset, CSS variables, etc.) |

**Interview Question:**
> *Q: What is the difference between feature-based and type-based folder structure in React?*
>
> **A:** Type-based groups files by their type (all components together, all styles together), while feature-based groups files by business feature (all files for "restaurant" together). Feature-based is preferred for large applications because it keeps related code co-located, making it easier to maintain, scale, and eventually split into micro-frontends.

### 2️⃣ Types of Import and Export in React/JavaScript

**What are the different types of exports in React?**

There are **two main types** of exports in JavaScript modules:

#### A) Default Export (`export default`)

```jsx
// ✅ DEFAULT EXPORT — One per file

// File: Header.js
const Header = () => {
  return <h1>Header Component</h1>;
};
export default Header;

// Importing it:
import Header from './Header';           // ✅ Can name it anything
import MyHeader from './Header';         // ✅ Also works (renamed)
```

**Rules of Default Export:**
- **Only one** `export default` per file.
- The imported name **does not need to match** the exported name.
- No curly braces `{}` needed during import.

#### B) Named Export (`export`)

```jsx
// ✅ NAMED EXPORTS — Multiple per file

// File: constants.js
export const LOGO_URL = "https://example.com/logo.png";
export const CDN_URL = "https://media-assets.swiggy.com/...";
export const API_BASE_URL = "https://www.swiggy.com/dapi";

// Importing named exports:
import { LOGO_URL, CDN_URL } from './constants';           // ✅ Destructure with exact names
import { LOGO_URL as Logo } from './constants';            // ✅ Rename with 'as'
import * as CONSTANTS from './constants';                  // ✅ Import ALL as namespace object
```

**Rules of Named Export:**
- **Multiple** named exports per file allowed.
- The imported name **must match** the exported name (unless using `as`).
- Must use **curly braces** `{}` during import.

#### C) Mixed Export (Default + Named)

```jsx
// ✅ MIXED — Default + Named in the same file

// File: RestaurantCard.js
export const CDN_URL = "https://media-assets.swiggy.com/...";  // Named export

const RestaurantCard = ({ name, cuisines }) => {               // Default export
  return (
    <div>
      <h3>{name}</h3>
      <p>{cuisines?.join(", ")}</p>
    </div>
  );
};
export default RestaurantCard;

// Importing both:
import RestaurantCard, { CDN_URL } from './RestaurantCard';
//    ↥ default export          ↥ named export
```

**Comparison Table — Default vs Named Export:**

| Feature | Default Export | Named Export |
|---------|---------------|--------------|
| **Syntax** | `export default` | `export const` / `export function` |
| **Count per file** | Only 1 | Multiple |
| **Import syntax** | `import X from './file'` | `import { X } from './file'` |
| **Curly braces** | ❌ Not needed | ✅ Required |
| **Rename on import** | ✅ Always possible | ✅ Using `as` keyword |
| **Import all** | Not applicable | ✅ `import * as X from './file'` |
| **Use case** | Main component of a file | Utilities, constants, helpers |
| **Tree-shaking** | Works | Works (better for utilities) |

**Interview Question:**
> *Q: What is the difference between default and named exports in React?*
>
> **A:** Default export (`export default`) allows one export per file and is imported without curly braces — the name can be anything. Named exports (`export const`) allow multiple exports per file and must be imported with curly braces using the exact exported name. In React, components are typically default exports, while utilities and constants use named exports.

### 3️⃣ The `index.js` Pattern (Barrel Exports)

**What is the index.js barrel export pattern?**

```jsx
// components/RestaurantCard/index.js
export { default } from './RestaurantCard';

// Then import like this:
import RestaurantCard from './components/RestaurantCard';
// Instead of:
import RestaurantCard from './components/RestaurantCard/RestaurantCard';
```

**Benefits:**
- Cleaner import paths
- Encapsulates internal file structure
- You can rename files without changing imports
- Enables cleaner testing by allowing mock re-exports

### 4️⃣ Separation of Concerns — Constants and Config Files

**Why separate data from components?**

```jsx
// ❌ BAD: Data mixed with component logic
const Header = () => {
  const LOGO_URL = "https://example.com/logo.png";  // Hardcoded inside component
  return <img src={LOGO_URL} />;
};

// ✅ GOOD: Constants in a separate file
// utils/constants.js
export const LOGO_URL = "https://example.com/logo.png";
export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// Header.js
import { LOGO_URL } from '../utils/constants';
const Header = () => {
  return <img src={LOGO_URL} />;
};
```

**Interview Question:**
> *Q: Why should constants be in a separate file in React projects?*
>
> **A:** It follows the **separation of concerns** principle. Constants like API URLs, image CDN paths, and config values should not be scattered across components. Keeping them in a single file makes the application easier to reconfigure (just change one file for different environments), prevents duplication, and keeps components focused on logic rather than configuration.

### 5️⃣ Mock Data Files (Config-Driven UI)

**Structuring mock data separately:**

```jsx
// utils/mockData.js
export const restaurantList = [
  {
    id: 1,
    name: "Theobroma",
    cuisines: ["Bakery", "Desserts"],
    avgRating: 4.4,
    deliveryTime: 42,
    cloudinaryImageId: "RX_THUMBNAIL/.../520280.JPG",
    costForTwo: "₹400 for two",
    areaName: "Sector 21C",
    isOpen: true,
  },
  // ... more restaurants
];

// Component imports and uses it:
import { restaurantList } from '../utils/mockData';

const Body = () => {
  return (
    <div className="res-container">
      {restaurantList.map((restaurant) => (
        <RestaurantCard key={restaurant.id} {...restaurant} />
      ))}
    </div>
  );
};
```

### 6️⃣ Introduction to React Hooks — `useState`

**What are React Hooks?**
- Hooks are **functions** that let you "hook into" React state and lifecycle features from **functional components**.
- Introduced in **React 16.8** (2019).
- They replace the need for class components for state management and side effects.

**The `useState` Hook:**

```jsx
import { useState } from 'react';

const Body = () => {
  // useState returns an array: [currentValue, functionToUpdateIt]
  const [listOfRestaurants, setListOfRestaurants] = useState(restaurantList);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="body">
      <div className="search">
        <input 
          type="text" 
          placeholder="Search restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => {
          const filteredList = restaurantList.filter(
            (res) => res.name.toLowerCase().includes(searchText.toLowerCase())
          );
          setListOfRestaurants(filteredList);
        }}>
          Search
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  );
};
```

**Syntax Breakdown:**
```jsx
// Array destructuring
const [stateVariable, setterFunction] = useState(initialValue);

// Example:
const [count, setCount] = useState(0);
// count = 0 initially
// setCount(1) → updates count to 1
// React re-renders the component when count changes
```

**Rules of Hooks:**
1. **Only call Hooks at the top level** — Don't call Hooks inside loops, conditions, or nested functions.
2. **Only call Hooks from React functions** — Call them from functional components or custom Hooks.
3. **Hook names must start with `use`** — e.g., `useState`, `useEffect`, `useContext`.

```jsx
// ❌ WRONG — Hook inside a condition
if (someCondition) {
  const [value, setValue] = useState(0); // DON'T DO THIS
}

// ✅ CORRECT — Hook at the top level
const [value, setValue] = useState(0);
if (someCondition) {
  // Use the value here
}
```

**Interview Question:**
> *Q: What are React Hooks?*
>
> **A:** React Hooks are functions that allow functional components to use state and lifecycle features. Introduced in React 16.8, they let you "hook into" React features without writing class components. Common built-in hooks include `useState`, `useEffect`, `useContext`, `useReducer`, and `useRef`.

**Interview Question:**
> *Q: What is the difference between state and props?*
>
> **A:** Props are **read-only** data passed from a parent component to a child component. They cannot be modified by the child. State is **mutable** data managed within a component itself using `useState`. Changes to state trigger a re-render. Props flow **down** (parent→child), while state is **local** to the component. A parent passes its state as props to children.

### 7️⃣ State vs Local Variables in React

**Why can't we just use a regular variable?**
```jsx
// ❌ WRONG — Regular variable won't trigger re-render
const Body = () => {
  let searchText = "";  // Regular variable

  return (
    <input 
      value={searchText}
      onChange={(e) => {
        searchText = e.target.value;  // Updates variable but...
        // Component WILL NOT re-render!
      }}
    />
  );
};

// ✅ CORRECT — useState triggers re-render
const Body = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <input 
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}  // Triggers re-render
    />
  );
};
```

**Why state causes re-render but local variables don't:**
- Regular variables are just memory — changing them doesn't notify React.
- State is tracked by React's **reconciliation engine** — calling the setter tells React "this component needs to update."
- When the setter is called, React re-executes the component function with the new state value.
- React compares the previous and new virtual DOM trees and patches only the changed parts in the real DOM.

**Interview Question:**
> *Q: Why does changing a local variable not update the UI in React?*
>
> **A:** React doesn't know about regular JavaScript variables. React's rendering system is driven by **state** and **props**. When state changes via `useState`'s setter, React is notified and schedules a re-render. Regular variables are not tracked by React's reconciliation process, so changing them has no effect on the UI.

### 8️⃣ Handling Events in React

**Event handling syntax:**
```jsx
// onClick with a function reference (✅ CORRECT)
<button onClick={handleClick}>Click</button>

// onClick with inline arrow function (✅ CORRECT)
<button onClick={() => handleClick()}>Click</button>

// onClick with function call (❌ WRONG — executes immediately)
<button onClick={handleClick()}>Click</button>
// This calls handleClick on every render, not on click!
```

**Common event handlers:**
```jsx
// onChange — for input fields
<input onChange={(e) => setSearchText(e.target.value)} />

// onClick — for buttons
<button onClick={() => setCount(count + 1)}>Increment</button>

// onSubmit — for forms (prevents page reload)
<form onSubmit={(e) => {
  e.preventDefault();
  handleSearch();
}}>
```

**The `e` (event) parameter:**
- React uses **SyntheticEvent** — a cross-browser wrapper around the browser's native event.
- Has the same interface as native events (`e.target.value`, `e.preventDefault()`, etc.).

### 9️⃣ Keys in React Lists — Deep Dive

**Why is the `key` prop important?**
```jsx
// ✅ CORRECT — stable unique ID as key
{restaurantList.map((restaurant) => (
  <RestaurantCard key={restaurant.id} {...restaurant} />
))}

// ❌ WRONG — index as key (causes bugs with reordering)
{restaurantList.map((restaurant, index) => (
  <RestaurantCard key={index} {...restaurant} />
))}

// ❌ WRONG — no key at all (React shows warning + performance issues)
{restaurantList.map((restaurant) => (
  <RestaurantCard {...restaurant} />
))}
```

**Why index-as-key is problematic:**
- If the list is reordered (filtered, sorted), React associates the wrong component with the wrong data.
- React's reconciliation uses `key` to determine which items changed position vs. which items were removed/added.

**Interview Question:**
> *Q: Why shouldn't you use array index as the key prop in React?*
>
> **A:** Index-based keys can cause UI bugs when the list is modified. If items are added, removed, or reordered, the indices change, and React may incorrectly match old components to new data. This can lead to incorrect rendering, lost state (e.g., input values inside list items), and performance issues. Always prefer a **stable, unique identifier** (like a database ID) as the key.

### 🔟 Spread Operator with Props

**Passing all object properties as props:**
```jsx
// ❌ VERBOSE — Passing each prop individually
<RestaurantCard
  key={restaurant.id}
  name={restaurant.name}
  cuisines={restaurant.cuisines}
  avgRating={restaurant.avgRating}
  deliveryTime={restaurant.deliveryTime}
  imageId={restaurant.cloudinaryImageId}
/>

// ✅ CLEAN — Using spread operator
<RestaurantCard key={restaurant.id} {...restaurant} />
```

### 1️⃣1️⃣ Optional Chaining (`?.`) in React

**What is optional chaining?**
```jsx
// Without optional chaining — crashes if property is missing/null
{restaurant.cuisines.join(", ")}  // ❌ Error if cuisines is undefined

// With optional chaining — safely handles null/undefined
{restaurant.cuisines?.join(", ")}  // ✅ Returns undefined instead of crashing

// Nested optional chaining
{restaurant.badges?.imageBadges?.[0]?.imageId}
```

**Interview Question:**
> *Q: What is optional chaining and why is it useful in React?*
>
> **A:** Optional chaining (`?.`) allows safe access to nested object properties without throwing an error if an intermediate property is `null` or `undefined`. It's particularly useful in React when rendering data from an API where some fields might be missing.

### 1️⃣2️⃣ `useState` Hook — Deep Dive with Interview Questions

**What is `useState`?**
- A React Hook that lets you add **state** to functional components.
- Returns an array with exactly two elements: the **current state value** and a **setter function** to update it.
- The component **re-renders** whenever the setter is called with a new value.

**Updating State — Different Patterns:**
```jsx
// 1. Direct value
setCount(5);

// 2. Functional update (uses previous state)
setCount((prevCount) => prevCount + 1);

// 3. With objects — must spread to preserve other properties
setUser((prevUser) => ({ ...prevUser, name: "John" }));

// 4. With arrays
setItems((prevItems) => [...prevItems, newItem]);
```

**Why Functional Update Matters:**
```jsx
// ❌ BUGGY — Multiple updates in same function
const handleClick = () => {
  setCount(count + 1);  // count is still the old value
  setCount(count + 1);  // count is STILL the old value
  setCount(count + 1);  // count is STILL the old value
};
// Result: count increases by only 1, not 3!

// ✅ CORRECT — Functional update
const handleClick = () => {
  setCount((prev) => prev + 1);  // prev is the latest value
  setCount((prev) => prev + 1);  // prev is now previous + 1
  setCount((prev) => prev + 1);  // prev is now previous + 1
};
// Result: count increases by 3!
```

**State Batching:**
```jsx
// React 18+ batches ALL state updates by default
const handleClick = () => {
  setCount((prev) => prev + 1);
  setFlag(true);
  setText("Updated");
};
// React batches these into a SINGLE re-render, not three!
```

**Lazy Initialization:**
```jsx
// ❌ BAD — Called on EVERY render
const [count, setCount] = useState(expensiveFunction());

// ✅ GOOD — Called only ONCE (first render)
const [count, setCount] = useState(() => expensiveFunction());
```

**Interview Question:**
> *Q: What is state batching in React?*
>
> **A:** State batching is when React groups multiple `setState` calls into a single re-render for performance. In React 18+, all state updates are automatically batched, even inside `setTimeout`, Promises, and async functions. In React 17, only event handlers were batched. This prevents unnecessary re-renders and improves performance.

### 1️⃣3️⃣ `useEffect` Hook — Complete Guide

**What is `useEffect`?**
- A React Hook that lets you perform **side effects** in functional components.
- Side effects include: data fetching, subscriptions, timers, DOM manipulation, logging, etc.
- Runs **after** the component renders to the screen.
- Replaces lifecycle methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.

**Basic Syntax:**
```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Side effect code here
  // Runs after every render (by default)

  return () => {
    // Cleanup function (optional)
    // Runs before component unmounts or before re-running the effect
  };
}, [dependencies]); // Dependency array (optional)
```

**Three Ways to Use `useEffect`:**

```jsx
// 1️⃣ RUNS ON EVERY RENDER (no dependency array)
useEffect(() => {
  console.log("Runs after every render");
});
// ⚠️ Rarely used — can cause infinite loops if you update state here

// 2️⃣ RUNS ONLY ONCE (empty dependency array) — componentDidMount equivalent
useEffect(() => {
  console.log("Runs only on first render (mount)");
  fetchData();
}, []);
// ✅ Most common for initial data fetching

// 3️⃣ RUNS WHEN DEPENDENCIES CHANGE — componentDidUpdate equivalent
useEffect(() => {
  console.log("Runs when count or name changes");
  document.title = `Count: ${count}`;
}, [count, name]);
// ✅ Used for reacting to specific state/prop changes
```

**Real-World Example: Data Fetching on Mount**
```jsx
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5"
        );
        const data = await response.json();
        setRestaurants(data?.data?.cards);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // Empty array = runs once on mount

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
      ))}
    </div>
  );
};
```

**Cleanup Function — Why It's Important:**
```jsx
// ❌ WITHOUT CLEANUP — Memory leak!
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Tick");
  }, 1000);
  // If component unmounts, interval keeps running FOREVER!
}, []);

// ✅ WITH CLEANUP — Proper cleanup
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(interval); // Interval is cleared when component unmounts
  };
}, []);
```

**Common Cleanup Scenarios:**
| Scenario | Setup | Cleanup |
|----------|-------|---------|
| Timers | `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` |
| Event Listeners | `addEventListener` | `removeEventListener` |
| Subscriptions | `subscribe()` | `unsubscribe()` |
| API Requests | `fetch()` / `axios.get()` | `AbortController.abort()` |
| WebSockets | `new WebSocket()` | `ws.close()` |

**Dependency Array Rules:**
```jsx
// ✅ Include ALL state/props used inside the effect
const [count, setCount] = useState(0);
const [name, setName] = useState("");

useEffect(() => {
  document.title = `${name} clicked ${count} times`;
}, [count, name]); // Both count and name are dependencies

// ❌ Missing dependency — stale closure bug!
useEffect(() => {
  document.title = `Count: ${count}`;
}, []); // count is used but NOT in dependency array!
// This will always show the initial count value (0)
```

**Interview Question:**
> *Q: What is the difference between `useEffect` and lifecycle methods in class components?*
>
> **A:** `useEffect` combines `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` into a single API. With an empty dependency array `[]`, it runs once like `componentDidMount`. With dependencies `[dep]`, it runs on mount and when `dep` changes, like `componentDidUpdate`. The return function acts as `componentWillUnmount`. Unlike lifecycle methods, `useEffect` runs **after** the browser paints, not before.

**Interview Question:**
> *Q: What happens if you don't provide a dependency array to `useEffect`?*
>
> **A:** The effect runs after **every** render (mount and every update). This can cause infinite loops if the effect updates state, because updating state triggers a re-render, which triggers the effect again, which updates state again, and so on. Always provide a dependency array unless you specifically need the effect to run on every render.

**Interview Question:**
> *Q: Why is the cleanup function important in `useEffect`?*
>
> **A:** The cleanup function prevents **memory leaks** and **unnecessary behavior** when a component unmounts or before the effect re-runs. For example, if you set up a `setInterval` without cleanup, it continues running even after the component is removed from the DOM. Cleanup ensures timers are cleared, event listeners are removed, and API requests are aborted.

**Interview Question:**
> *Q: What is the "stale closure" problem in `useEffect`?*
>
> **A:** A stale closure occurs when the effect captures an old value of a variable because it wasn't included in the dependency array. For example, if `count` is used inside `useEffect` but not listed in dependencies, the effect will always see the initial `count` value (0), not the current one. The fix is to include all used variables in the dependency array or use functional updates.

### 1️⃣4️⃣ React Fiber & Reconciliation Algorithm

**What is Reconciliation?**
- Reconciliation is the **algorithm** React uses to **diff** one tree of React elements (Virtual DOM) with another to determine which parts of the real DOM need to be updated.
- It's the process that makes React efficient — instead of re-creating the entire DOM on every update, React calculates the **minimum number of changes** needed.

**What is React Fiber?**
- **React Fiber** is the **reimplementation of React's core reconciliation algorithm** introduced in React 16.
- The name "Fiber" comes from the concept of a "fiber" in computer science — a lightweight thread of execution.
- Before Fiber (React 15 and earlier), reconciliation was **synchronous and non-interruptible** — once it started, it blocked the main thread until the entire tree was processed.

**Key Features of React Fiber:**

| Feature | Stack Reconciler (React 15) | Fiber Reconciler (React 16+) |
|---------|---------------------------|------------------------------|
| **Interruptibility** | ❌ Cannot be interrupted | ✅ Can be paused/resumed |
| **Priority** | ❌ No priority system | ✅ Tasks have priority levels |
| **Rendering** | Synchronous only | Synchronous + Concurrent modes |
| **Animation** | Janky (blocks main thread) | Smooth (yields to browser) |
| **Error Handling** | No built-in boundaries | ✅ Error Boundaries supported |
| **Return Type** | Single element | Can return arrays, strings, portals |

**How Fiber Works — Step by Step:**

```
1. RENDER PHASE (Interruptible)
   ├── React calls your component functions
   ├── Creates/updates the Fiber tree
   ├── Can be paused, aborted, or restarted
   └── Produces a list of "effects" (what changed)

2. COMMIT PHASE (Synchronous, not interruptible)
   ├── Takes the list of effects from Render Phase
   ├── Applies changes to the real DOM
   ├── Runs lifecycle methods (componentDidMount, etc.)
   └── Runs useEffect cleanup & effects
```

**Three Key Decisions in the Diffing Algorithm:**

```jsx
// 1. DIFFERENT TYPES → Replace entire subtree
// Old: <a href="/">Home</a>
// New: <Link to="/">Home</Link>
// React removes <a> and all its children, creates <Link> from scratch

// 2. SAME TYPE → Update props, recurse into children
// Old: <div className="old">
// New: <div className="new">
// React updates className, then recurses into children

// 3. LISTS WITH KEYS → Match by key, not by index
// Old: [<li key="a">A</li>, <li key="b">B</li>]
// New: [<li key="b">B</li>, <li key="a">A</li>]
// React matches "a" with "a" and "b" with "b" — just reorders, doesn't recreate
```

**Interview Question:**
> *Q: What is React Fiber?*
>
> **A:** React Fiber is the reimplementation of React's core reconciliation algorithm, introduced in React 16. It enables incremental rendering — the ability to split rendering work into chunks and spread it out over multiple frames. Fiber allows React to pause, resume, and prioritize work, making animations and user interactions smoother. It also enables new features like Error Boundaries, returning multiple elements from a component, and Concurrent Mode.

**Interview Question:**
> *Q: How does the reconciliation algorithm work in React?*
>
> **A:** React's reconciliation algorithm compares the new Virtual DOM tree with the previous one using these rules: 1) If two elements have **different types**, React tears down the old tree and builds a new one. 2) If two elements have the **same type**, React updates the props and recurses into children. 3) For **lists**, React uses `key` props to match children across renders. This diffing process is efficient because it makes assumptions (types don't change, keys are stable) that reduce the O(n³) problem to O(n).

### 1️⃣5️⃣ Virtual DOM & Diffing Algorithm in React

**What is the Virtual DOM?**
- The Virtual DOM (VDOM) is a **lightweight JavaScript representation** of the real DOM.
- It's a **plain JavaScript object** (tree structure) that mirrors the structure of the actual DOM.
- When state changes, React creates a **new Virtual DOM tree** and compares it with the previous one (diffing).
- Only the **differences** are applied to the real DOM — not the entire tree.

**Virtual DOM vs Real DOM:**

| Feature | Real DOM | Virtual DOM |
|---------|----------|-------------|
| **Type** | Browser API (heavy) | JavaScript object (lightweight) |
| **Updates** | Slow (reflows/repaints) | Fast (just object comparison) |
| **Direct manipulation** | Yes (imperative) | No (declarative via React) |
| **Cost** | Expensive — each change can trigger layout recalc | Cheap — just creates JS objects |
| **Batching** | No automatic batching | React batches updates automatically |

**How the Virtual DOM Works — Step by Step:**

```
Step 1: Initial Render
┌─────────────────────────────────────────────────┐
│  React.createElement() → Virtual DOM Tree       │
│  ReactDOM.render() → Real DOM updated           │
└─────────────────────────────────────────────────┘

Step 2: State Change (e.g., setState)
┌─────────────────────────────────────────────────┐
│  New Virtual DOM Tree created                   │
│  (React calls component functions again)        │
└─────────────────────────────────────────────────┘

Step 3: Diffing (Reconciliation)
┌─────────────────────────────────────────────────┐
│  Compare old VDOM tree with new VDOM tree       │
│  Find minimum number of changes needed          │
│  (Uses Diffing Algorithm)                       │
└─────────────────────────────────────────────────┘

Step 4: Batch Updates
┌─────────────────────────────────────────────────┐
│  Collect all differences into a list            │
│  Batch them together                            │
└─────────────────────────────────────────────────┘

Step 5: Commit to Real DOM
┌─────────────────────────────────────────────────┐
│  Apply batched changes to real DOM              │
│  Only update the specific nodes that changed    │
│  Browser repaints only the affected areas       │
└─────────────────────────────────────────────────┘
```

**The Diffing Algorithm — How React Compares Trees:**

React's diffing algorithm is based on **two key assumptions** (heuristics) that reduce the time complexity from O(n³) to O(n):

1. **Different types → Different trees** — If two elements have different types, React won't try to diff them; it replaces the entire subtree.
2. **Stable keys** — React uses `key` props to identify elements across renders, avoiding index-based matching.

**The `key` Prop — How It Optimizes Diffing:**

```jsx
// ❌ WITHOUT KEYS — React uses index, causes unnecessary DOM operations
// Old: [<li>A</li>, <li>B</li>, <li>C</li>]
// New: [<li>C</li>, <li>A</li>, <li>B</li>]
// React sees: All children changed! Recreates all 3 <li> elements!

// ✅ WITH KEYS — React matches by key, minimal DOM operations
// Old: [<li key="a">A</li>, <li key="b">B</li>, <li key="c">C</li>]
// New: [<li key="c">C</li>, <li key="a">A</li>, <li key="b">B</li>]
// React sees: Same 3 keys, just reordered. Moves DOM nodes, doesn't recreate!
```

**Virtual DOM vs Shadow DOM:**

| Feature | Virtual DOM (React) | Shadow DOM (Web Components) |
|---------|--------------------|---------------------------|
| **Purpose** | Performance optimization | Encapsulation (style/scope isolation) |
| **How it works** | JS object tree diffing | Browser-native DOM subtree |
| **Scope** | Entire component tree | Individual component |
| **CSS isolation** | No (needs CSS Modules) | Yes (built-in) |
| **Standard** | React-specific | W3C standard |

**Interview Question:**
> *Q: What is the Virtual DOM and how does it work?*
>
> **A:** The Virtual DOM is a lightweight JavaScript object representation of the real DOM. When state changes, React creates a new Virtual DOM tree, diffs it against the previous one using the reconciliation algorithm, calculates the minimum number of changes needed, and applies only those changes to the real DOM in a batched update. This avoids expensive full-page re-renders and makes React efficient.

**Interview Question:**
> *Q: Why is the Virtual DOM faster than direct DOM manipulation?*
>
> **A:** Direct DOM manipulation is slow because every change triggers layout recalculations (reflow) and repaints. The Virtual DOM is faster because: 1) Creating and comparing JavaScript objects is much cheaper than touching the real DOM. 2) React batches multiple changes into a single DOM update. 3) The diffing algorithm calculates the minimum number of DOM operations needed. However, the Virtual DOM is an optimization, not a guarantee — poorly written code can still be slow.

---

## 🔑 Key Takeaways for Interviews (Day 05)

| Concept | Explanation |
|---------|------------|
| **File Structure** | Organize by feature or type; use barrel exports (`index.js`) |
| **Separation of Concerns** | Split data (mockData, constants) from components |
| **State vs Variables** | Only `useState` triggers re-renders; local variables don't |
| **`useState` Hook** | Returns `[value, setter]`; calling setter schedules re-render |
| **Hooks Rules** | Only call at top level, only from React functions, prefix with `use` |
| **Keys in Lists** | Always use stable unique IDs, never index alone |
| **Spread Operator** | `{...restaurant}` passes all object properties as individual props |
| **Optional Chaining** | `?.` safely accesses nested properties without errors |
| **CSS Modules** | Scoped styles per component; prevents naming conflicts |
| **Config-Driven UI** | UI rendered from config/data, not hardcoded |

---

# 📘 Day 06 — Monolithic vs Microservices Architecture

## 1. Monolithic Architecture

### What is it?
A **monolithic architecture** is a traditional software design where all components of an application (UI, business logic, database access, authentication, etc.) are bundled together into a **single, unified codebase** and deployed as **one unit**.

### Key Characteristics
- Single codebase for the entire application
- Single deployment unit (one JAR/WAR/EXE file)
- Shared database across all modules
- Tightly coupled components
- One tech stack for the whole app

### Advantages ✅
| Advantage | Explanation |
|-----------|-------------|
| **Simple to develop** | Easy to start, one project, one build pipeline |
| **Simple to test** | End-to-end testing is straightforward |
| **Simple to deploy** | Deploy one file/artifact |
| **Simple to scale** | Just run multiple copies behind a load balancer |
| **Less network overhead** | All calls are in-process, no network latency between services |

### Disadvantages ❌
| Disadvantage | Explanation |
|--------------|-------------|
| **Hard to maintain at scale** | As codebase grows, it becomes complex and hard to understand |
| **Slow development** | Large teams stepping on each other's code |
| **Scaling is inefficient** | You must scale the entire app, even if only one module needs more resources |
| **Technology lock-in** | Hard to adopt new tech; you're stuck with the original stack |
| **Deployment risk** | A small bug in one module can bring down the entire application |
| **Long CI/CD pipelines** | Even a tiny change requires building and testing the whole app |

### Real-World Example
- Early versions of **Netflix, Amazon, eBay** were monolithic
- Many startups begin with monoliths because of the simplicity

---

## 2. Separation of Concerns (SoC)

### What is it?
**Separation of Concerns** is a design principle where a system is divided into distinct sections, each addressing a **separate concern** (a specific functionality or responsibility). Each section has minimal overlap with others.

### How it applies to Monolithic vs Microservices

| Aspect | Monolithic | Microservices |
|--------|-----------|---------------|
| **SoC level** | Logical (packages/modules within same codebase) | Physical (separate deployable services) |
| **Concern separation** | At folder/package level | At service/process level |
| **Boundary enforcement** | Weak (developers can bypass package boundaries) | Strong (services must use API calls) |

### Real-world analogy
- **Monolith:** A single building with many rooms separated by doors (easy to move between, but fire spreads fast)
- **Microservices:** Separate buildings connected by roads (more effort to travel, but fire stays contained)

---

## 3. Single Responsibility Principle (SRP)

### What is it?
**SRP** is the **S** in **SOLID** principles. It states:
> **"A class/module/service should have one, and only one, reason to change."**

### How SRP relates to Microservices
- Each microservice should own exactly **one business capability**
- A payment service should only handle payments, not also send emails
- If a service has multiple responsibilities, it should be broken down further

### Example
```
❌ Bad (Monolith violating SRP):
OrderService handles: orders + inventory + payments + notifications

✅ Good (Microservices following SRP):
order-service     → only order management
inventory-service → only stock management
payment-service   → only payment processing
notification-service → only sending emails/SMS
```

### Interview Tip
> "Microservices are the **architectural expression of SRP**. Just as a class should have one reason to change, a service should own one business capability."

---

## 4. Microservices Architecture

### What is it?
**Microservices architecture** is an architectural style where an application is composed of **small, independent services** that communicate over a network (usually HTTP/REST or messaging queues). Each service is responsible for a **single business capability** and can be developed, deployed, and scaled independently.

### Key Characteristics
- Multiple small, focused services
- Each service has its own codebase and database
- Loosely coupled, highly cohesive
- Services communicate via APIs (REST, gRPC, message brokers)
- Each service can use its own tech stack
- Decentralized data management (each service owns its DB)

### Advantages ✅
| Advantage | Explanation |
|-----------|-------------|
| **Independent deployment** | Deploy one service without affecting others |
| **Scalability** | Scale only the services that need it (e.g., scale payment service during sales) |
| **Technology diversity** | Use the best tool for each job (Python for ML, Node.js for I/O, Go for performance) |
| **Fault isolation** | One service failing doesn't bring down the whole system |
| **Team autonomy** | Small teams own individual services end-to-end |
| **Faster development** | Smaller codebases are easier to understand and modify |

### Disadvantages ❌
| Disadvantage | Explanation |
|--------------|-------------|
| **Complexity** | Distributed systems are inherently complex |
| **Network latency** | Inter-service calls add network overhead |
| **Data consistency** | Maintaining consistency across services is hard (eventual consistency) |
| **Testing is harder** | Need integration tests across services |
| **Debugging is difficult** | A request may span multiple services; tracing issues is challenging |
| **Operational overhead** | Need containerization (Docker), orchestration (Kubernetes), service discovery, monitoring, etc. |
| **Duplication** | Common functionality (auth, logging) may be duplicated across services |

### Real-World Examples
- **Netflix** — migrated from monolith to microservices in 2009
- **Amazon** — each team owns a service (e.g., cart service, recommendation service)
- **Uber, Spotify, Twitter** — all use microservices at scale

---

## 5. Monolithic vs Microservices — Comparison Table

| Feature | Monolithic | Microservices |
|---------|-----------|---------------|
| **Codebase** | Single | Multiple (one per service) |
| **Deployment** | One unit | Independent per service |
| **Scaling** | Scale entire app | Scale individual services |
| **Database** | Shared | Database per service |
| **Communication** | In-process function calls | Network calls (REST/gRPC/messaging) |
| **Team structure** | Feature teams | Service ownership teams |
| **Fault tolerance** | Low (one bug = whole app down) | High (isolated failures) |
| **Development speed** | Fast initially, slows down | Slower initially, faster at scale |
| **Operational cost** | Low | High (infrastructure, monitoring) |
| **Best for** | Small apps, startups, MVPs | Large apps, growing teams, complex domains |

---

## 6. Interview Tips & Common Questions

### Q1: When should you choose Monolithic vs Microservices?
**Answer:**
- Start with **monolith** for MVPs, small teams, or simple applications.
- Move to **microservices** when the monolith becomes too large to manage, teams grow, or different parts of the app need to scale independently.
- **"Monolith first, microservices later"** is a common industry pattern.

### Q2: What is a "distributed monolith"?
**Answer:** A system that is deployed as microservices but is **tightly coupled** in practice (e.g., services share databases, synchronous calls everywhere). It has the **worst of both worlds** — complexity of microservices with the rigidity of a monolith.

### Q3: How do microservices communicate? (Detailed)
**Answer:**

Microservices communicate using two main patterns — **Synchronous** and **Asynchronous**.

#### A) Synchronous Communication
The client sends a request and **waits** for the response. The service must be available at the time of the call.

| Protocol | Description | Use Case |
|----------|-------------|----------|
| **REST (HTTP/HTTPS)** | Most common. Uses JSON/XML over HTTP. Stateless. | CRUD operations, public APIs |
| **gRPC** | High-performance, uses Protocol Buffers (binary). Supports streaming. | Internal service-to-service, low-latency systems |
| **GraphQL** | Client queries exactly what it needs. Single endpoint. | Complex data fetching, aggregating multiple services |

**Pros:** Simple, easy to debug, request-response model  
**Cons:** Tight coupling (caller waits), cascading failures, higher latency

#### B) Asynchronous Communication
The client sends a message and **does not wait** for an immediate response. The message is processed later.

| Method | Description | Use Case |
|--------|-------------|----------|
| **Message Queues** | Producer sends message to queue, consumer picks it up later (RabbitMQ, Amazon SQS) | Order processing, task distribution |
| **Event Streaming** | Events published to a stream, multiple consumers can read (Kafka, AWS Kinesis) | Real-time analytics, audit logs, event sourcing |
| **Pub/Sub** | Publisher sends event, subscribers receive it (Redis Pub/Sub, Google Pub/Sub) | Notifications, broadcasting |

**Pros:** Loose coupling, fault tolerance, better scalability  
**Cons:** Harder to debug, eventual consistency, message ordering challenges

#### C) Communication Patterns Comparison

| Aspect | Synchronous | Asynchronous |
|--------|-------------|--------------|
| **Coupling** | Tight (caller depends on callee) | Loose (producer doesn't know consumers) |
| **Latency** | Higher (waiting for response) | Lower from caller's perspective |
| **Fault tolerance** | Low (if service down, request fails) | High (messages queued for later) |
| **Complexity** | Low | High (need message broker, retry logic) |
| **Data consistency** | Strong consistency possible | Eventual consistency |
| **Best for** | Queries, real-time operations | Commands, background processing, events |

### Q4: How do you handle data consistency in microservices?
**Answer:**
- Use **eventual consistency** with **Saga pattern** (choreography or orchestration)
- Avoid distributed transactions (2PC) — they don't scale well
- Each service owns its database

### Q5: What are the key technologies for microservices?
**Answer:**
- **Containerization:** Docker
- **Orchestration:** Kubernetes, Docker Swarm
- **API Gateway:** Kong, Nginx, AWS API Gateway
- **Service Discovery:** Consul, Eureka, Kubernetes DNS
- **Monitoring:** Prometheus, Grafana, ELK Stack
- **Tracing:** Jaeger, Zipkin
- **Message Broker:** Kafka, RabbitMQ

### Q6: What is an API Gateway?
**Answer:** A single entry point for all clients. It handles routing, authentication, rate limiting, and aggregation. It shields clients from knowing about individual microservices.

### Q7: What are the 2 ways in which an API call fetches data? (Polling vs Webhooks/Streaming)
**Answer:**

There are **two fundamental ways** a client can fetch data from an API:

#### 1. Polling (Client pulls data)
The client **repeatedly requests** data from the server at regular intervals.

| Type | Description | Example |
|------|-------------|---------|
| **Short Polling** | Client sends requests every few seconds | Checking order status every 5s |
| **Long Polling** | Server holds the request open until new data is available, then responds | Chat apps, notifications |

**Pros:** Simple to implement, works with any HTTP client  
**Cons:** Wastes bandwidth, higher latency, unnecessary server load

#### 2. Webhooks / Server-Sent Events / WebSockets (Server pushes data)
The server **sends data to the client automatically** when new data is available, without the client asking.

| Method | Description | Use Case |
|--------|-------------|----------|
| **Webhooks** | Server sends HTTP POST to a pre-registered URL when an event occurs | Payment success notification, CI/CD build complete |
| **Server-Sent Events (SSE)** | Server pushes events over a single long-lived HTTP connection | Live stock prices, news feeds |
| **WebSockets** | Full-duplex bidirectional communication channel | Real-time chat, live collaboration, gaming |

**Pros:** Real-time, efficient (no wasted requests), lower latency  
**Cons:** More complex to implement, requires persistent connections

#### Comparison Table

| Aspect | Polling (Pull) | Webhooks/Streaming (Push) |
|--------|---------------|--------------------------|
| **Who initiates?** | Client | Server |
| **Real-time?** | No (bounded by poll interval) | Yes (instant) |
| **Server load** | High (many empty responses) | Low (only sends when data changes) |
| **Complexity** | Low | Medium-High |
| **Bandwidth usage** | High (constant requests) | Low (only actual data) |
| **Best for** | Simple apps, low-frequency updates | Real-time apps, high-frequency updates |

#### Real-world examples
- **Polling:** Gmail checking for new emails every 30 seconds
- **Webhook:** GitHub sends a POST to your CI server when code is pushed
- **WebSocket:** Trading apps showing live stock prices
- **SSE:** Twitter feed updating in real-time

### Q8: What is CORS? (Cross-Origin Resource Sharing)
**Answer:**

#### What is it?
**CORS** is a browser security mechanism that controls which **origins** (domain, protocol, port) are allowed to access resources from a different origin.

#### Why does CORS exist?
Browsers enforce the **Same-Origin Policy (SOP)** — a script from `https://myapp.com` cannot read data from `https://api.other.com` unless explicitly allowed. CORS is the way to **relax** this policy in a controlled manner.

#### How it works (simplified)
```
Browser (myapp.com)  →  sends request to api.other.com
                        ↓
Server (api.other.com)  →  checks if myapp.com is allowed
                        ↓
Response includes header:  Access-Control-Allow-Origin: https://myapp.com
                        ↓
Browser checks header  →  if allowed, gives data to JS
                        →  if NOT allowed, blocks the response (CORS error)
```

#### Common CORS Headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Access-Control-Allow-Origin` | Which origins are allowed | `*` (any) or `https://myapp.com` |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | Which custom headers are allowed | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | Whether cookies/auth headers are allowed | `true` |
| `Access-Control-Max-Age` | How long to cache the preflight result | `86400` (24 hours) |

#### Simple vs Preflight Requests

| Type | Condition | Behavior |
|------|-----------|----------|
| **Simple Request** | GET/POST/HEAD with standard headers only | Browser sends request directly, checks `Allow-Origin` in response |
| **Preflight Request** | PUT/DELETE/PATCH or custom headers | Browser first sends `OPTIONS` request to check permissions, then sends actual request |

#### How to fix CORS errors

**On the server (backend):**
```javascript
// Node.js / Express example
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

**On the client (frontend):**
- You **cannot** fix CORS from the frontend code alone
- Options:
  1. Use a **proxy** (e.g., in development: `"proxy": "http://localhost:5000"` in package.json)
  2. Use a **CORS proxy service** (e.g., `https://cors-anywhere.herokuapp.com/`) — only for development
  3. Ask the backend team to add proper CORS headers

#### Common Interview Questions

**Q: What is the difference between CORS and SOP?**
- **SOP (Same-Origin Policy):** Browser rule that blocks cross-origin reads by default
- **CORS:** A mechanism to selectively bypass SOP using HTTP headers

**Q: Can you fix CORS from the frontend?**
- No. CORS is enforced by the browser, and the server must send the correct headers. The frontend can only use a proxy (dev only) or request the backend team to add CORS support.

**Q: Why does CORS exist only in browsers?**
- CORS is a **browser-only** security feature. Server-to-server calls (e.g., backend to backend) are not restricted by CORS — they can communicate freely.

### Q9: What is Optional Chaining? (`?.`)
**Answer:**

#### What is it?
**Optional Chaining** (`?.`) is a JavaScript operator that allows you to safely access **nested object properties** without having to check if each intermediate property exists. If any property in the chain is `null` or `undefined`, the expression **short-circuits** and returns `undefined` instead of throwing an error.

#### Why is it needed?
Without optional chaining, accessing deeply nested properties requires verbose null checks:

```javascript
// ❌ Without optional chaining — throws error if any level is null/undefined
const city = user.address.city;  // TypeError: Cannot read properties of undefined

// ❌ Verbose workaround — lots of repetitive checks
const city = user && user.address && user.address.city;

// ✅ With optional chaining — clean and safe
const city = user?.address?.city;  // Returns undefined if anything is missing
```

#### Syntax & Usage

| Expression | What it does | Returns if null/undefined |
|------------|-------------|---------------------------|
| `obj?.prop` | Access property `prop` on `obj` | `undefined` |
| `obj?.[expr]` | Access dynamic property | `undefined` |
| `obj?.method()` | Call method `method` on `obj` | `undefined` (doesn't throw) |
| `arr?.[index]` | Access array element at `index` | `undefined` |

#### Common Interview Questions

**Q: What's the difference between `?.` and `??`?**
- `?.` (Optional Chaining): Safely access nested properties
- `??` (Nullish Coalescing): Provide a default value when left side is `null` or `undefined`
- They are often used together: `user?.address?.city ?? "Unknown"`

**Q: Does optional chaining work with arrays?**
- Yes: `arr?.[0]` safely accesses the first element, returns `undefined` if `arr` is null/undefined

**Q: Can optional chaining be used on the left side of an assignment?**
- No: `obj?.prop = value` throws a SyntaxError. You cannot use optional chaining for assignment.

### Q10: What is Shimmer UI? (Loading Skeleton / Placeholder UI)
**Answer:**

#### What is it?
**Shimmer UI** (also called **Skeleton Screen** or **Placeholder UI**) is a visual placeholder that is shown while the actual content is loading. It mimics the **layout structure** of the final content using animated gray/shimmering boxes, giving users the perception that content is loading and improving the perceived performance.

#### Why use Shimmer UI?

| Problem | Solution |
|---------|----------|
| **Blank white screen** while loading | Users see a structured placeholder instead of nothing |
| **Spinner/loader** doesn't show what's coming | Shimmer shows the actual layout (image shape, text lines, buttons) |
| **Perceived slowness** | Users feel the app is faster because they see something happening |
| **Bad UX on slow networks** | Prevents layout shift when content finally loads |

#### How to implement Shimmer UI in React

**1. Create a Shimmer component:**
```jsx
const Shimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img" />
      <div className="shimmer-line shimmer-line--short" />
      <div className="shimmer-line shimmer-line--medium" />
      <div className="shimmer-line shimmer-line--long" />
    </div>
  );
};
```

**2. CSS for the shimmer animation:**
```css
.shimmer-card {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
}

.shimmer-img {
  width: 100%;
  height: 200px;
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f8f8f8 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**3. Use it conditionally while data loads:**
```jsx
const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Show shimmer while loading
  if (loading) {
    return (
      <div className="restaurant-list">
        {Array(8).fill("").map((_, i) => <Shimmer key={i} />)}
      </div>
    );
  }

  // Show actual content when loaded
  return (
    <div className="restaurant-list">
      {restaurants.map(r => <RestaurantCard key={r.id} data={r} />)}
    </div>
  );
};
```

#### Shimmer UI vs Traditional Loading

| Aspect | Spinner/Loader | Shimmer UI |
|--------|---------------|------------|
| **What user sees** | A spinning icon | Placeholder matching content layout |
| **Perceived speed** | Feels slower | Feels faster |
| **Layout shift** | Content jumps when loaded | No shift — placeholders match final layout |
| **UX quality** | Poor — tells user nothing | Good — shows what's coming |
| **Implementation** | Simple | Slightly more complex |

#### Real-world examples
- **Facebook** — shimmer cards while feed loads
- **YouTube** — gray video thumbnails with animated lines
- **LinkedIn** — skeleton profile cards
- **Swiggy/Zomato** — shimmer restaurant cards while fetching data

### Q11: What is Conditional Rendering in React?
**Answer:**

#### What is it?
**Conditional Rendering** is a technique in React where you render different UI components or elements **based on a condition** (e.g., whether data is loading, whether a user is logged in, whether an error occurred). It works just like JavaScript conditions — using `if`, `&&`, ternary (`? :`), or switch statements.

#### Why is it needed?
In real-world apps, you don't always show the same UI. For example:
- Show a **loading shimmer** while fetching data, then show the **actual content**
- Show a **login button** if user is not authenticated, else show **user profile**
- Show an **error message** if API fails, else show **data list**
- Show **different layouts** based on screen size or user role

#### 5 Ways to Conditionally Render in React

| Method | Syntax | Best for |
|--------|--------|----------|
| **1. `if/else`** | `if (cond) return <A />; return <B />;` | Top-level conditions, early returns |
| **2. Ternary (`? :`)** | `{cond ? <A /> : <B />}` | Inline if/else inside JSX |
| **3. Logical `&&`** | `{cond && <Component />}` | Render or render nothing |
| **4. `||` (OR)** | `{data || <Fallback />}` | Fallback when value is falsy |
| **5. Switch / Object Map** | `{ {key1: <A />, key2: <B />}[key] }` | Multiple conditions (enums) |

#### Examples

**1. `if/else` (Early Return) — Best for loading states**
```jsx
const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Shimmer />;  // Show shimmer while loading
  }

  return (
    <div className="restaurant-list">
      {restaurants.map(r => <RestaurantCard key={r.id} data={r} />)}
    </div>
  );
};
```

**2. Ternary (`? :`) — Best for inline toggling**
```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <UserProfile />   // If logged in
      ) : (
        <LoginButton />   // If not logged in
      )}
    </div>
  );
}
```

**3. Logical `&&` — Best for "show if true, nothing if false"**
```jsx
function Notification({ message }) {
  return (
    <div>
      {message && <div className="alert">{message}</div>}
      {/* Only renders if message is truthy */}
    </div>
  );
}
```

#### Common Interview Questions

**Q: Why use `&&` instead of ternary for show/hide patterns?**
- `{cond && <Component />}` is cleaner than `{cond ? <Component /> : null}`. Both work, but `&&` is more concise when there's no "else" branch.

**Q: Can you use `if/else` inside JSX?**
- No. JSX is syntactic sugar for `React.createElement()` calls. `if/else` are statements, not expressions. Use ternary (`? :`) or `&&` inside JSX.

**Q: What happens if you render `false`, `null`, or `undefined` in JSX?**
- React ignores them and renders nothing. This is why `{loading && <Spinner />}` works — if `loading` is `false`, nothing is rendered.

---

## 7. Key Takeaway for Interviews

> **"Monolithic architecture is simple but doesn't scale well. Microservices scale well but introduce complexity. The right choice depends on your team size, application complexity, and business needs. Start with a monolith, and extract microservices when needed."**

### Buzzwords to Use in Interviews
- **Tight coupling vs Loose coupling**
- **Single responsibility principle** (each service does one thing)
- **Bounded context** (from Domain-Driven Design)
- **Independent deployability**
- **Fault isolation / Bulkhead pattern**
- **Polyglot persistence** (different DBs for different services)
- **Eventual consistency**
- **Saga pattern**
- **CQRS** (Command Query Responsibility Segregation)

---

# 📘 Day 07 — useEffect Hook & React Routing (Interview Friendly Notes)

## Part 1: useEffect Hook

## 📌 What is useEffect?

`useEffect` is a React Hook that lets you synchronize a component with an external system (side effects). It runs after the component renders to the DOM.

**Common side effects:**
- Fetching data from an API
- Updating the DOM directly
- Setting up subscriptions / event listeners
- Timers (`setTimeout`, `setInterval`)
- Logging

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

## 📝 Summary Table (useEffect)

| Dependency Array | When it runs | Equivalent in class component |
|---|---|---|
| Not provided | Every render | `componentDidUpdate` (every time) |
| `[]` (empty) | Only on mount | `componentDidMount` |
| `[a, b]` | When `a` or `b` changes | `componentDidUpdate` (only when deps change) |
| Cleanup return | On unmount / before re-run | `componentWillUnmount` |

## 🎯 One-Liner for Interview (useEffect)

> *"useEffect lets you perform side effects in function components. It runs after render, and you control when it re-runs using the dependency array — no array means every render, empty array means once on mount, and populated array means only when those values change. Always clean up subscriptions to avoid memory leaks."*

---

## 🚀 GraphQL — A Better Way to Fetch Data

### 📌 What is GraphQL?

GraphQL is a **query language for APIs** developed by Meta (Facebook) in 2012. It lets clients request **exactly** the data they need — no more, no less.

**REST (traditional):** Multiple endpoints, each returns a fixed structure.
**GraphQL:** Single endpoint, client specifies the shape of the response.

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

### ❌ Disadvantages

| Disadvantage | Explanation |
|---|---|
| **Complexity** | Requires schema setup, resolvers, type definitions |
| **Caching is harder** | More complex than REST's simple URL-based caching |
| **Query cost** | A malicious query could request deeply nested data (N+1 problem) |
| **Learning curve** | Team needs to learn GraphQL syntax and tooling |
| **Overkill for simple APIs** | If you have 2-3 endpoints, REST is simpler |

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

### 🎯 One-Liner for Interview

> *"GraphQL is a query language for APIs that lets clients request exactly the data they need from a single endpoint. In React, Apollo Client provides `useQuery` and `useMutation` hooks to fetch and modify data with automatic caching, no over-fetching, and a strongly typed schema."*

---

## Part 2: React Routing

## 📌 What is React Router?

React Router is a standard library for **routing and navigation** in React applications. It enables **client-side routing** — navigating between different views/pages without making a full page reload from the server.

**Why not just use anchor tags `<a href>`?**
- `<a>` tags cause a **full page refresh**, losing all React state.
- React Router intercepts navigation and updates the UI **without reloading** the page.
- Results in a faster, app-like experience (SPA — Single Page Application).

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

### 🎯 Interview Q&A

**Q: Is React itself a SPA?**
> No. React is a **library** for building user interfaces. You can build a SPA **with** React, but React is not a SPA by itself. React Router is what makes it a SPA.

**Q: What is the difference between SPA and MPA?**
> **SPA:** One HTML page, JS handles navigation, no reloads, state preserved. **MPA:** Multiple HTML pages, each navigation triggers a full server request and page reload.

**Q: How does a SPA handle the browser's back/forward buttons?**
> Using the **History API** (`popstate` event). React Router listens for these events and renders the appropriate component.

**Q: What are the SEO solutions for SPAs?**
> **SSR (Server-Side Rendering)** — frameworks like Next.js render React on the server so search engines get HTML. **Prerendering** — generate static HTML at build time. **Dynamic rendering** — serve pre-rendered pages to bots and the SPA to users.

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

### 🖥️ Server-Side Routing (Traditional / MPA)

**How it works:** Every URL change sends a request to the **server**. The server generates a new HTML page and sends it back. The browser **reloads entirely**.

**Examples:** Traditional websites (PHP, Django, Ruby on Rails, ASP.NET), WordPress.

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

### 📱 Client-Side Routing (SPA / React Router)

**How it works:** The app loads **once** from the server. All subsequent navigation is handled **entirely in the browser** using JavaScript. No new HTML requests are made.

**Examples:** React + React Router, Vue + Vue Router, Angular Router.

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

### 🏗️ How React Router implements Client-Side Routing

React Router uses three key browser APIs to make client-side routing work:

| API | Role |
|---|---|
| **`history.pushState()`** | Changes the URL in the address bar **without** reloading the page |
| **`history.replaceState()`** | Changes the URL **without** reloading and **without** adding to browser history |
| **`popstate` event** | Fires when user clicks back/forward — React Router listens for this and re-renders |

### 🎯 Interview Q&A

**Q: What is the fundamental difference between client-side and server-side routing?**
> **Server-side routing** sends a new HTTP request for every URL change — the server returns a new HTML page and the browser reloads entirely. **Client-side routing** intercepts URL changes in the browser using JavaScript, updates the URL via the History API, and renders the corresponding component — **no new request, no page reload**.

**Q: Can you combine both?**
> Yes! Many modern apps use **both**. For example, Next.js uses server-side routing for **initial page load** (SSR for SEO) and client-side routing for **subsequent navigation** (for speed).

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

#### 🎯 Interview Q&A

**Q: Does `Link` render an `<a>` tag or a `<button>`?**
> It renders an `<a>` tag with an `href` attribute. This is important for **accessibility** (screen readers recognize it as a link) and **SEO** (search engines crawl `href` values).

**Q: Can you use `Link` with external URLs?**
> No. `Link` is for **internal** navigation only. For external links, use a regular `<a href="https://...">` tag.

**Q: What is the difference between `Link` and `NavLink`?**
> `NavLink` is a special version of `Link` that adds styling (like an `active` class) when the current URL matches its `to` prop. `Link` has no such styling.

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

#### 🧠 Key Concepts

| Concept | Explanation |
|---|---|
| **Parent Route** | Has `element` + wraps children. Provides the layout. |
| **Child Route** | Has `path` relative to parent. Renders inside parent's `<Outlet />`. |
| **`<Outlet />`** | A placeholder component where the matched child route renders. |
| **`index` Route** | A child with no `path` — renders at the parent's exact URL. |
| **Relative paths** | Child paths like `"settings"` become `/dashboard/settings` automatically. |

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

#### 🧠 Key Points

| Concept | Explanation |
|---|---|
| **`:` prefix** | Marks a dynamic segment in the route path |
| **Parameter name** | The word after `:` becomes the key in the params object |
| **`useParams()`** | Returns `{ paramName: "value" }` — always a **string** |
| **Multiple params** | You can have multiple dynamic segments in one path |
| **Optional params** | Not supported directly — use multiple routes or query params instead |
| **Type** | Values are always **strings** — convert with `Number()` if needed |

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

### 🧹 Lazy Loading / Code Splitting

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

### 🛡️ Protected Routes (Authentication)

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

## 🎯 One-Liner for Interview (Routing)

> *"React Router enables client-side routing in SPAs using the History API. Key components are `BrowserRouter`, `Routes`/`Route`, `Link`/`NavLink`, and `Outlet` for nested layouts. Hooks like `useParams`, `useNavigate`, and `useSearchParams` handle dynamic routing, programmatic navigation, and query strings. In v6, routes are exact by default and the `element` prop replaces the old `component` prop."*

---

# 📘 Day 08 — Class-Based Components in React (Interview Friendly Notes)

## 📌 What are Class-Based Components?

Class-based components are React components defined as **ES6 classes**. They were the **primary way** to write components before React Hooks (v16.8) introduced state and lifecycle features to functional components.

```jsx
import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

**Key characteristics:**
- Must extend `React.Component` (or `React.PureComponent`)
- Must have a `render()` method that returns JSX
- Can hold **state** via `this.state` (no hooks needed)
- Have access to **lifecycle methods** for side effects
- `this` refers to the component instance

## 🏗️ Anatomy of a Class Component

```jsx
import React, { Component } from "react";

class Counter extends Component {
  // 1. Constructor — initialize state and bind methods
  constructor(props) {
    super(props);  // MUST call super(props) first!
    this.state = {
      count: 0,
      name: "React",
    };

    // Binding event handlers (needed when using regular methods)
    this.handleClick = this.handleClick.bind(this);
  }

  // 2. Class method (event handler)
  handleClick() {
    // Access state via this.state
    // Update state via this.setState()
    this.setState({ count: this.state.count + 1 });
  }

  // 3. Lifecycle method — runs after component mounts
  componentDidMount() {
    console.log("Component mounted!");
  }

  // 4. Lifecycle method — runs when component updates
  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated!");
  }

  // 5. Lifecycle method — runs before component unmounts
  componentWillUnmount() {
    console.log("Component will unmount!");
  }

  // 6. render() — REQUIRED, returns JSX
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

## 🔧 Constructor & `super(props)` — Deep Dive

### What does `super(props)` actually do?

```jsx
constructor(props) {
  super(props);   // ✅ Required — calls React.Component's constructor
  this.state = {
    count: 0,
  };
}
```

When you write `class MyComponent extends Component`, your class inherits from `React.Component`. But `this` is not automatically set up — you need to call the **parent class constructor** to initialize the component instance properly.

| Concept | Explanation |
|---|---|
| **`super(props)`** | Calls the parent `React.Component` constructor, passing `props` to it. This sets `this.props`, initializes internal React state (`this.updater`), and prepares the component instance. |
| **Why it's required** | In JavaScript ES6 classes, you **must** call `super()` in a derived class constructor **before** accessing `this`. Without it, `this` is uninitialized — `ReferenceError`. |
| **What happens without `super()`?** | `ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor` |
| **What if you call `super()` without `props`?** | `this.props` will be `undefined`. This won't crash immediately, but any access to `this.props.something` will throw a TypeError. |

### 🔬 `super(props)` vs `super()` — What's the difference?

```jsx
// ✅ CORRECT — React.Component receives props and sets this.props
constructor(props) {
  super(props);
  console.log(this.props); // ✅ { name: "Amit", age: 25 }
}

// ⚠️ WORKS but BUGGY — this.props is undefined!
constructor(props) {
  super();               // No props passed to parent
  console.log(this.props); // ❌ undefined!
  console.log(props);      // ✅ The parameter 'props' still exists, but this.props is empty
}
```

> **So what's the verdict?** Always use `super(props)` — it's the proper, predictable way. `super()` without props is an anti-pattern that only works because React patches `this.props` after the constructor. Don't rely on React's internal behavior — be explicit.

### 🧠 What if you don't have a constructor at all?

With the **class field syntax**, you don't need a constructor:

```jsx
class Counter extends Component {
  // ✅ No constructor needed!
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
```

**Why does this work without `super(props)`?** Babel transpiles class fields into constructor code automatically.

### 📊 Constructor vs Class Field Syntax

| Aspect | Constructor | Class Field (modern) |
|---|---|---|
| **Boilerplate** | More (must call `super(props)`) | Less (no constructor needed) |
| **State init** | `this.state = {}` inside constructor | `state = {}` outside |
| **Method binding** | Manual: `this.method = this.method.bind(this)` | Arrow fields auto-bind: `method = () => {}` |
| **Readability** | Lower (scattered init + binding) | Higher (all in one place) |
| **Transpilation** | Kept as-is | Babel moves to constructor anyway |
| **Recommendation** | Legacy / older codebases | ✅ Modern React class components |

> **Interview tip:** If you're asked to write a class component in an interview, **use the class field syntax** — it shows you know modern React best practices.

---

## 📦 State Management: `this.state` & `this.setState()`

### `this.state` — The state object

```jsx
class Counter extends Component {
  state = {
    count: 0,
    username: "Amit",
    items: [],
  };
}
```

- State is always an **object** (unlike functional components where state can be any type)
- Read it with `this.state.count`
- **Never mutate state directly** — use `this.setState()`

### `this.setState()` — The ONLY way to update state

```jsx
// ❌ WRONG — will not re-render
this.state.count = 5;

// ✅ CORRECT
this.setState({ count: 5 });
```

### Three ways to use `setState()`

#### 1️⃣ Object syntax (direct update)

```jsx
this.setState({ count: 5 });
```

#### 2️⃣ Function syntax (when new state depends on old state)

```jsx
this.setState((prevState, prevProps) => {
  return { count: prevState.count + 1 };
});
```

**Why?** `setState()` is **asynchronous**. If you read `this.state.count` immediately after setting it, you might get the old value. The function form guarantees you get the **latest** state.

```jsx
// ❌ BUGGY — may not work correctly in concurrent updates
this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });
// Result: count incremented by 1 (not 2) — both reads saw the same old value!

// ✅ CORRECT — uses functional form
this.setState((prevState) => ({ count: prevState.count + 1 }));
this.setState((prevState) => ({ count: prevState.count + 1 }));
// Result: count incremented by 2
```

#### 3️⃣ Callback (run code after state update)

```jsx
this.setState(
  { count: 10 },
  () => {
    console.log("State updated! New count:", this.state.count);
  }
);
```

- The second argument is a **callback** that runs **after** the state update and re-render complete.
- Equivalent to `useEffect` with the updated state as dependency.

### Merging behavior

```jsx
state = {
  name: "Amit",
  age: 25,
  city: "Delhi",
};

// Only updates 'age', leaves 'name' and 'city' untouched
this.setState({ age: 26 });
// Result: { name: "Amit", age: 26, city: "Delhi" }
```

> 🔄 **Contrast with functional components:** `useState`'s setter **replaces** the state value entirely. `this.setState()` **merges** the object shallowly.

---

## 🔄 Lifecycle Methods — The Complete Guide

Lifecycle methods are special methods that **automatically get called** at different stages of a component's life. They are the **biggest advantage** class components had over functional components before hooks.

### 🎭 The Three Phases

```
Mounting       → Updating       → Unmounting
(Birth)         (Life)           (Death)
```

### 1️⃣ Mounting Phase (Component is created and inserted into DOM)

| Method | Called When | Purpose |
|---|---|---|
| `constructor(props)` | Before mounting | Initialize state, bind methods |
| `static getDerivedStateFromProps(props, state)` | Before render | Sync state with props (rarely used) |
| `render()` | Every re-render | Return JSX |
| `componentDidMount()` | **After** component is inserted into DOM | API calls, subscriptions, DOM manipulation |

## 🎯 Deep Dive: `componentDidMount()` — The Most Important Lifecycle Method

### What is `componentDidMount`?

`componentDidMount()` is a lifecycle method that is called **once**, immediately after a component is **inserted into the DOM tree** (i.e., after the first render is committed to the browser).

### 🔬 When exactly does it run?

```
Time:  constructor → render → React updates DOM → componentDidMount 🔥
                                                      ↑
                                              THIS is when it runs
```

1. `constructor()` — Component instance created, state initialized
2. `render()` — JSX returned, Virtual DOM tree built
3. **React reconciles** — Compares VDOM with real DOM, applies minimal updates
4. **Browser paints** — The actual DOM elements are visible on screen
5. **`componentDidMount()` fires** — You can now interact with the real DOM

### ✅ What should you do in `componentDidMount`?

| ✅ DO | ❌ DON'T |
|---|---|
| **API calls / Data fetching** | Call `setState` synchronously (triggers extra re-render) |
| **Set up timers** (`setInterval`, `setTimeout`) | Do expensive synchronous computations (blocks paint) |
| **Add event listeners** (`addEventListener`) | Access props/state that haven't been initialized |
| **DOM measurements** (getBoundingClientRect, offsetHeight) | Call `setState` in a way that causes infinite loop |
| **Initialize third-party libraries** (charts, maps, D3) | |
| **Set up WebSocket connections** | |
| **Integrate with non-React code** (jQuery plugins) | |

### 📡 API Calls in `componentDidMount` — The Classic Pattern

This is the **most common use case** for `componentDidMount`:

```jsx
class UserProfile extends Component {
  state = {
    user: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    // ✅ Fetch data AFTER component is in the DOM
    fetch(`https://api.github.com/users/${this.props.username}`)
      .then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then(user => this.setState({ user, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { user, loading, error } = this.state;

    if (loading) return <div className="shimmer">Loading...</div>;
    if (error) return <div className="error">❌ {error}</div>;
    if (!user) return null;

    return (
      <div className="profile">
        <img src={user.avatar_url} alt={user.login} />
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
        <p>📍 {user.location}</p>
        <p>📦 Public repos: {user.public_repos}</p>
      </div>
    );
  }
}
```

**Why fetch in `componentDidMount` and not in `constructor`?**

| Location | Why NOT |
|---|---|
| **`constructor()`** | Component isn't in DOM yet. No loading UI can be shown. State updates after fetch won't trigger re-render properly in some edge cases. |
| **`render()`** | `setState` inside `render()` causes **infinite loop** — render → setState → re-render → setState → ... |
| **`componentDidMount()`** | ✅ **Perfect spot** — DOM is ready, loading UI is visible, state update will trigger a clean re-render |

### 🔄 `componentDidMount` vs Functional Equivalent

```jsx
// ─── CLASS COMPONENT ───
class DataFetcher extends Component {
  state = { data: null, loading: true };

  componentDidMount() {
    fetchData().then(data => this.setState({ data, loading: false }));
  }

  render() {
    if (this.state.loading) return <Spinner />;
    return <DataView data={this.state.data} />;
  }
}

// ─── FUNCTIONAL COMPONENT (equivalent) ───
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);  // ← Empty dependency array = componentDidMount

  if (loading) return <Spinner />;
  return <DataView data={data} />;
}
```

| Class | Functional |
|---|---|
| `componentDidMount()` | `useEffect(() => { ... }, [])` |
| Runs after first render | Runs after first render |
| Runs **once** | Runs **once** (empty deps) |
| Can call `setState` | Can call state setter |
| DOM is ready | DOM is ready |

### 🔬 Mounting Execution Order — Parent + Child

This is a **critical interview concept**: When a parent component has child components, the mounting happens in a specific order.

**Console Output (Mounting Order):**

```
Parent - constructor
Parent - render
First Child - constructor
First Child - render
Second Child - constructor
Second Child - render
First Child - componentDidMount      ← Children mount FIRST
Second Child - componentDidMount     ← Children mount FIRST
Parent - componentDidMount           ← Parent mounts LAST
```

**Why this order?** React uses a **depth-first traversal**:
1. Parent constructor → Parent render (creates VDOM with children)
2. React walks the VDOM tree depth-first: First Child constructor → render, Second Child constructor → render
3. After ALL children are mounted in the DOM, their `componentDidMount` fires (bottom-up)
4. Finally, Parent's `componentDidMount` fires

> **Interview tip:** This is why you **cannot** rely on parent `componentDidMount` to access child DOM refs — children mount first! If you need to wait for children, use a callback prop from child to parent.

### 2️⃣ Updating Phase (Props or state change)

| Method | Called When | Purpose |
|---|---|---|
| `static getDerivedStateFromProps(props, state)` | Every render | Sync state with props (rarely used) |
| `shouldComponentUpdate(nextProps, nextState)` | Before re-render | **Performance optimization** — prevent unnecessary re-renders |
| `render()` | Every re-render | Return updated JSX |
| `getSnapshotBeforeUpdate(prevProps, prevState)` | **Before** DOM updates | Capture DOM info (scroll position, etc.) |
| `componentDidUpdate(prevProps, prevState, snapshot)` | **After** re-render | React to prop/state changes, re-fetch data |

```jsx
class UserProfile extends Component {
  componentDidUpdate(prevProps) {
    // ❌ Without this check → infinite loop!
    if (this.props.userId !== prevProps.userId) {
      // ✅ Re-fetch data only when userId actually changed
      fetchUser(this.props.userId);
    }
  }

  // Performance optimization
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if name actually changed
    if (this.props.name !== nextProps.name) return true;
    if (this.state.count !== nextState.count) return true;
    return false; // Skip re-render
  }

  render() {
    return <h1>{this.props.name} — Count: {this.state.count}</h1>;
  }
}
```

> **Interview tip:** `componentDidUpdate(prevProps)` is the equivalent of `useEffect(() => {}, [someProp])`. Always add a comparison check to avoid infinite loops.

### 3️⃣ Unmounting Phase (Component is removed from DOM)

| Method | Called When | Purpose |
|---|---|---|
| `componentWillUnmount()` | **Just before** component is removed from DOM | Cleanup: clear timers, unsubscribe, remove event listeners |

```jsx
class Timer extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }

  componentWillUnmount() {
    // ✅ CRITICAL — prevent memory leak
    clearInterval(this.interval);
    // Also: unsubscribe from WebSocket, remove event listeners, etc.
  }

  render() {
    return <h2>{this.state.time}</h2>;
  }
}
```

> **Interview tip:** `componentWillUnmount` is the equivalent of the cleanup function in `useEffect`.

### 📊 Lifecycle Summary Table

| Phase | Method | When it runs | Functional Equivalent |
|---|---|---|---|
| Mount | `constructor()` | Before mount | `useState` + initialization |
| Mount | `static getDerivedStateFromProps()` | Before every render | Rarely needed |
| Mount | `render()` | Every render | The function body itself |
| Mount | `componentDidMount()` | After DOM ready | `useEffect(() => {}, [])` |
| Update | `static getDerivedStateFromProps()` | Before every render | Rarely needed |
| Update | `shouldComponentUpdate()` | Before re-render | `React.memo` |
| Update | `render()` | Every render | The function body |
| Update | `getSnapshotBeforeUpdate()` | Before DOM update | Rarely needed |
| Update | `componentDidUpdate(prevProps)` | After re-render | `useEffect(() => {}, [dep])` |
| Unmount | `componentWillUnmount()` | Before unmount | `useEffect(() => { return cleanup }, [])` |
| Error | `static getDerivedStateFromError()` | On render error | Not available (class only) |
| Error | `componentDidCatch()` | On render error | Not available (class only) |

---

## 🧰 Event Handling in Class Components

### The `this` binding problem

```jsx
class Button extends Component {
  handleClick() {
    // 'this' is undefined here!
    console.log(this); // ❌ undefined (in strict mode)
    this.setState({ clicked: true });
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

**Why?** In JavaScript class methods, `this` is **not bound** by default. When you pass `this.handleClick` as a callback, it's called without a context — so `this` becomes `undefined` (in strict mode).

### 3 Solutions to bind `this`

#### Solution 1: Bind in constructor (traditional)

```jsx
class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); // ✅ Bind once
  }

  handleClick() {
    this.setState({ clicked: true });
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

#### Solution 2: Arrow function in callback (creates new function each render)

```jsx
render() {
  return <button onClick={() => this.handleClick()}>Click</button>;
  // ⚠️ Creates a new function on EVERY render — can cause performance issues
}
```

#### Solution 3: Class field arrow function (modern, recommended)

```jsx
class Button extends Component {
  // Class field — arrow function captures 'this' from surrounding scope
  handleClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

> **Interview tip:** Solution 3 (class field arrow functions) is the **modern standard**. No constructor needed, no binding, no extra re-render issues.

---

## ⚖️ Class Components vs Functional Components

| Feature | Class Component | Functional Component |
|---|---|---|
| **Definition** | ES6 class extending `Component` | JavaScript function |
| **State** | `this.state` + `this.setState()` | `useState()` hook |
| **Lifecycle** | `componentDidMount`, etc. | `useEffect()` hook |
| **`this`** | Requires binding for methods | No `this` issues |
| **Code length** | Longer (boilerplate) | Shorter, more concise |
| **Performance** | Slightly heavier (instances) | Lighter (plain functions) |
| **Testing** | More complex (need to mock instance) | Easier (pure function) |
| **Reusability** | Higher-order Components (HOCs), Render Props | Custom Hooks |
| **Learning curve** | Steeper (lifecycle, binding, `this`) | Gentler |
| **React version** | Available since React 0.x | Added in React 16.8 |
| **Current status** | Still supported but **NOT recommended** for new code | **Recommended** for all new code |

---

## 🧪 PureComponent — Performance Optimization

```jsx
import React, { PureComponent } from "react";

class ExpensiveList extends PureComponent {
  // No need for shouldComponentUpdate!
  // PureComponent does shallow comparison automatically
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
}
```

- `React.PureComponent` implements `shouldComponentUpdate` with a **shallow comparison** of props and state.
- Only re-renders if props/state **actually changed** (shallowly).
- **Use case:** Optimizing performance when re-renders are expensive.
- **Warning:** Shallow comparison means mutating nested objects won't trigger re-render.

---

## 📉 When do you still see Class Components?

| Scenario | Why |
|---|---|
| **Legacy codebases** | Projects started before React 16.8 (2019) |
| **Older tutorials** | Many online resources still show class components |
| **Component libraries** | Some libraries like `react-native` (pre-hooks era) |
| **Error Boundaries** | `componentDidCatch()` — still required class syntax (until React 18+ suspense) |
| **`getDerivedStateFromError`** | Error boundary static method — class only |

### Error Boundaries — The one thing still requiring class components

```jsx
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log error to error reporting service
    console.error("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong: {this.state.error.message}</h1>;
    }
    return this.props.children;
  }
}
```

> Functional components still **cannot** implement `componentDidCatch` — you need a class component for error boundaries.

---

## 🔄 Converting Between Class and Functional Components

### Class → Functional (with Hooks)

```jsx
// ─── CLASS COMPONENT ───
class Timer extends Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <h1>{this.state.seconds}s</h1>;
  }
}

// ─── FUNCTIONAL COMPONENT (equivalent) ───
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup = componentWillUnmount
  }, []); // Empty deps = componentDidMount

  return <h1>{seconds}s</h1>;
}
```

### Conversion Map

| Class | Functional |
|---|---|
| `this.state` | `useState()` / `useReducer()` |
| `this.setState({ key: value })` (merge) | `setState(prev => ({...prev, key: value}))` (manual merge) |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate(prevProps)` | `useEffect(() => {}, [dep])` |
| `componentWillUnmount` | `useEffect(() => { return cleanup }, [])` |
| `shouldComponentUpdate` | `React.memo()` |
| `this.method = this.method.bind(this)` | No binding needed |
| `this.props` | `props` parameter |
| `PureComponent` | `React.memo()` |
| `componentDidCatch` | Not available (class only for now) |

---

## 🎯 Key Rules of Class Components

| Rule | Why |
|---|---|
| **Always call `super(props)` in constructor** | Makes `this.props` available |
| **Never mutate `this.state` directly** | Only use `this.setState()` to trigger re-render |
| **`setState()` is async** | Don't read state immediately after setting it |
| **Use functional `setState` when new state depends on old** | Avoids stale state bugs |
| **Clean up subscriptions in `componentWillUnmount`** | Prevents memory leaks |
| **Add condition checks in `componentDidUpdate`** | Prevents infinite loops |
| **Use class field arrow functions for methods** | Avoids `this` binding issues |
| **Don't call `setState()` inside `render()`** | Causes infinite re-render loop |

---

## 🎯 Interview Q&A

**Q1: What is the difference between a class component and a functional component?**

> A class component is an ES6 class extending `React.Component` with a `render()` method, state via `this.state`, and lifecycle methods like `componentDidMount`. A functional component is a plain JavaScript function that returns JSX. Before React 16.8, functional components couldn't manage state or side effects. With hooks, functional components can do everything class components can — with less boilerplate and no `this` binding issues.

**Q2: Why did React move away from class components to hooks?**

> 1. **Complexity** — Classes have a steep learning curve (`this` binding, lifecycle methods, constructor boilerplate).
> 2. **Code reuse** — Class components needed HOCs or Render Props for logic reuse, leading to "wrapper hell". Hooks use custom hooks for clean logic extraction.
> 3. **Lifecycle splitting** — Logic (like fetching data + setting up timer) had to be split across different lifecycle methods. Hooks let you group related logic in one `useEffect`.
> 4. **Minification** — Class components are harder for minifiers to optimize. Functions minify better.
> 5. **`this` keyword** — The `this` binding problem caused confusion and bugs.

**Q3: What is the difference between `this.setState` with an object vs a function?**

> **Object syntax** (`this.setState({ count: 5 })`) is for when the new state doesn't depend on the previous state. **Function syntax** (`this.setState(prev => ({ count: prev.count + 1 }))`) is for when the new state depends on the previous state. The function form guarantees you get the latest state, which is important when multiple `setState` calls are batched or when concurrent mode is enabled.

**Q4: Explain the lifecycle of a class component in order.**

> 1. **Mounting:** `constructor` → `static getDerivedStateFromProps` → `render` → `componentDidMount`
> 2. **Updating (re-render):** `static getDerivedStateFromProps` → `shouldComponentUpdate` → `render` → `getSnapshotBeforeUpdate` → `componentDidUpdate`
> 3. **Unmounting:** `componentWillUnmount`
> 4. **Error:** `static getDerivedStateFromError` → `componentDidCatch`

**Q5: What is `shouldComponentUpdate` and when would you use it?**

> `shouldComponentUpdate(nextProps, nextState)` is a lifecycle method that returns a boolean. If it returns `false`, React skips re-rendering the component and its children. It's used for **performance optimization** — preventing unnecessary re-renders when props/state haven't actually changed. Modern React achieves the same with `React.memo()` and `PureComponent`.

**Q6: Can you explain `this` binding in class components?**

> In JavaScript, class methods are not bound by default. When you pass `this.handleClick` as a callback (e.g., to `onClick`), the method loses its `this` context. Without binding, `this` becomes `undefined` in strict mode. Three solutions: (1) bind in constructor, (2) arrow function in callback (creates new function each render), (3) class field arrow functions (modern, recommended).

**Q7: What is a PureComponent?**

> `React.PureComponent` is a base class that implements `shouldComponentUpdate` with a **shallow comparison** of props and state. If props and state haven't changed (shallowly), the component skips re-rendering. It's a performance optimization — but be careful with deeply nested objects, as shallow comparison won't detect deep mutations.

**Q8: What CAN'T functional components do that class components can?**

> As of React 18, the only thing class components can do that functional components **cannot** is implement **error boundaries** using `componentDidCatch` and `getDerivedStateFromError`. React is working on a hooks-based error boundary solution, but for now, if you need to catch errors, you need a class component.

**Q9: Why is `setState` asynchronous?**

> React batches multiple `setState` calls into a single update for **performance** — it avoids re-rendering on every single state change. This means `this.state` might not reflect the updated value immediately after calling `setState`. If you need to read the updated state, use the callback parameter or `componentDidUpdate`.

**Q10: What happens if you call `setState` inside `render()`?**

> Infinite loop. `setState` triggers a re-render → `render()` runs again → `setState` called again → re-render → infinite loop. This will crash the browser with a stack overflow.

---

## 📝 Summary Table

| Concept | Class Component Syntax |
|---|---|
| Definition | `class MyComp extends Component` |
| State init | `state = { key: value }` or in `constructor` |
| Update state | `this.setState({ key: newValue })` |
| Read state | `this.state.key` |
| Read props | `this.props.key` |
| Method binding | Arrow class field: `handle = () => {}` |
| After mount | `componentDidMount()` |
| After update | `componentDidUpdate(prevProps, prevState)` |
| Before unmount | `componentWillUnmount()` |
| Prevent re-render | `shouldComponentUpdate()` |
| Error catch | `componentDidCatch(error, info)` |
| Optimized version | `extends PureComponent` (shallow compare) |

## 🎯 One-Liner for Interview

> *"Class components are ES6 classes extending `React.Component` with a `render()` method, state via `this.state` and `this.setState()`, and lifecycle methods like `componentDidMount`. They were the standard before React 16.8 introduced hooks. While still supported, functional components with hooks are now preferred — they're simpler, have no `this` binding issues, and enable better code reuse through custom hooks. The only thing class components can still do that functions can't is error boundaries via `componentDidCatch`."*

---

# 🎓 Complete Interview Summary — All Days at a Glance

## Day 01 — Inception
- How to write "Hello World" in HTML, JS, and React
- CDN (Content Delivery Network) and cross-origin
- What is React — a JavaScript library for building user interfaces
- Component-based, declarative, Virtual DOM, unidirectional data flow, JSX

## Day 02 — Igniting Our App
- npm, package.json, package-lock.json, node_modules
- Dependencies vs devDependencies
- Bundlers (Parcel, Webpack, Vite), Babel
- Transitive dependencies, ^ and ~ versioning
- Parcel features: HMR, caching, tree shaking, code splitting, differential bundling
- Why CDN is not standard; npm + bundler is the standard approach

## Day 03 — Laying the Foundation
- JSX — JavaScript XML, transpiled by Babel
- XSS prevention in JSX (auto-escaping)
- Babel — 3 phases: Parsing → Transformation → Code Generation
- Components: Class vs Functional (functional is industry standard)
- Props — read-only, one-way data flow
- Component composition, children prop
- JSX expressions `{}` vs statements
- 3 Golden Rules: PascalCase, single root, props immutable

## Day 04 — Building UI
- Functional components, component composition
- JSX rules, inline styles, CSS in React
- Props and "destructuring on the fly"
- Config-Driven UI
- `.map()` for rendering lists, key prop importance
- Spread operator for passing props

## Day 05 — File Structuring & Hooks
- Industry-standard file structure
- Default vs named exports, barrel exports
- Separation of concerns (constants, mock data)
- `useState` hook — state management
- State vs local variables
- Event handling in React
- Keys in lists — never use index
- `useEffect` hook — side effects, cleanup, dependency array
- React Fiber & reconciliation algorithm
- Virtual DOM & diffing algorithm

## Day 06 — Architecture & Advanced Concepts
- Monolithic vs Microservices architecture
- Separation of Concerns (SoC), Single Responsibility Principle (SRP)
- Synchronous vs Asynchronous communication
- Polling vs Webhooks/Streaming
- CORS (Cross-Origin Resource Sharing)
- Optional Chaining (`?.`)
- Shimmer UI (Skeleton screens)
- Conditional Rendering (5 ways)

## Day 07 — useEffect & Routing
- useEffect dependency array (3 cases)
- Cleanup function
- GraphQL — query language for APIs
- SPA (Single Page Application)
- Client-side vs Server-side routing
- React Router: BrowserRouter, Routes, Route, Link, NavLink
- Nested routes with Outlet
- Dynamic routes with useParams
- useNavigate, useSearchParams, useLocation
- Lazy loading, Protected routes

## Day 08 — Class-Based Components
- Class components: constructor, super(props), render()
- `this.state` and `this.setState()` — 3 ways to use
- Lifecycle methods: Mounting, Updating, Unmounting
- `componentDidMount` — API calls, timers, DOM measurements
- Mounting order: children mount first, parent last
- `this` binding problem and 3 solutions
- PureComponent for performance
- Error Boundaries — the only thing still requiring class components
- Class vs Functional conversion map

---

> **End of Complete Interview Notes Collection**
> *Compiled from all daily README files (Day 01 to Day 08)*