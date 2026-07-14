# Episode - 3 Laying the foundation
------------------------------------

# scripts to start development server or production server ?

- development server : npm run start
- production server : npm run build

- note we need to update scripts in package.json first

# What is JSX?

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

This is because `<h1>` is not valid JavaScript syntax — the engine doesn't know what to do with it.

### ✅ How does JSX actually work?

Behind the scenes, tools like **Babel** (configured with the React preset) transform JSX into `React.createElement()` calls **at build time**, so the browser only ever sees valid JavaScript.

| Before (JSX — your code) | After (Transpiled — what runs) |
|--------------------------|-------------------------------|
| `<h1 id="heading">Hello</h1>` | `React.createElement("h1", { id: "heading" }, "Hello")` |
| `<MyComponent name="John" />` | `React.createElement(MyComponent, { name: "John" })` |

### Example

```jsx
// Using JSX (cleaner, readable)
const heading = <h1 id="heading">Episode 3: Laying the Foundation</h1>;

// Without JSX (using React.createElement)
const heading = React.createElement(
    "h1",
    { id: "heading" },
    "Episode 3: Laying the Foundation"
);
```

### Key Points

- JSX prevents injection attacks (XSS) by escaping values before rendering.
- You can embed any JavaScript expression inside JSX using curly braces `{}`.
- JSX produces React "elements" which are plain JavaScript objects.
- JSX attributes use **camelCase** naming (e.g., `className` instead of `class`, `htmlFor` instead of `for`).

---

### 🔐 XSS (Cross-Site Scripting) — Threat & Prevention in JSX

**XSS** is a security vulnerability where an attacker injects malicious scripts into a web page, which then executes in the victim's browser. This can steal cookies, session tokens, or redirect users to malicious sites.

#### ❌ The Problem — Without React/JSX (using `innerHTML`)

```jsx
// ❌ DANGEROUS — Never do this in plain HTML/JS
const userInput = "<img src='x' onerror='alert(\"XSS Attack!\")' />";
document.getElementById("root").innerHTML = userInput;
// The script executes! 💥
```

This is vulnerable because `innerHTML` parses the string as **HTML**, so the `onerror` event handler runs.

#### ✅ The Solution — React escapes by default

```jsx
function Comment(props) {
  // Even if userInput contains malicious HTML/script tags,
  // React will escape them before rendering
  return <div>{props.userInput}</div>;
}

// Usage — User submits this as a comment:
const maliciousInput = "<script>alert('XSS')</script>";
// React renders it as safe text — the script does NOT execute! ✅
```

React uses `React.createElement()` under the hood, which calls `React.createElement("div", null, userInput)`. The third argument (children) is treated as a **text node**, not raw HTML. React **escapes** (sanitizes) special characters into their HTML entity equivalents.

| Character | Escaped to (HTML Entity) |
|-----------|--------------------------|
| `<` | `<` |
| `>` | `>` |
| `"` | `"` |
| `'` | `&#x27;` |
| `&` | `&` |

#### 🧪 Live Example — Safe vs Unsafe

```jsx
const userProvided = "<strong>Bold text</strong><script>alert('xss')</script>";

// ✅ SAFE — JSX escapes everything
const safeElement = <div>{userProvided}</div>;
// Renders as TEXT: <strong>Bold text</strong>...
// (no bold, no script execution)

// ❌ UNSAFE — dangerouslySetInnerHTML bypasses React's protection
const unsafeElement = (
  <div dangerouslySetInnerHTML={{ __html: userProvided }} />
);
// Renders as HTML: Bold text (bold works, and script would execute!)
```

#### ⚠️ `dangerouslySetInnerHTML` — The Escape Hatch

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

#### 📊 Comparison — React JSX vs Vanilla JS

| Scenario | Vanilla JS (`innerHTML`) | React JSX (default) |
|----------|-------------------------|---------------------|
| `"<h1>Hi</h1>"` | Renders as **HTML** heading | Renders as **text**: safe |
| `"<script>alert('xss')</script>"` | **Script executes** 💥 | **Escaped**, no execution ✅ |
| `"<img src=x onerror=alert(1)>"` | **Script executes** 💥 | **Escaped**, no execution ✅ |
| `"<a href='javascript:...'>click</a>"` | **Script executes** on click 💥 | **Escaped**, shows as text ✅ |

#### 🔑 Interview Takeaways

| Concept | Explanation |
|---------|-------------|
| **React's default behavior** | JSX escapes all content inside `{}` — prevents XSS automatically |
| **When escaping happens** | At render time, React converts special chars to HTML entities |
| **`dangerouslySetInnerHTML`** | Explicit opt-in to skip escaping — use only with sanitized data |
| **Golden rule** | Never trust user input. React handles 99% of cases, but if you must bypass escaping, sanitize first |

#### 📌 One-liner for interviews

> React JSX **automatically escapes** all values embedded in `{}` by converting `<`, `>`, `"`, `'`, `&` to HTML entities, making XSS attacks virtually impossible by default. The only way to bypass this is `dangerouslySetInnerHTML`, which is intentionally named to discourage its use.

---

# What is Babel?

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

When you write JSX in a React project, here's exactly what happens:

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

### 🧪 Try it yourself

Babel provides an online playground where you can see the transformation live:
🔗 **https://babeljs.io/repl**

1. Select **"React"** preset
2. Paste JSX code on the left
3. Watch it convert to `React.createElement()` on the right in real-time

### Babel in a React Project (with Parcel)

In this course, we use **Parcel** as the bundler. Parcel has Babel built-in, so:

- You do **NOT** need to manually install or configure Babel.
- When you run `npx parcel index.html`, Parcel automatically detects JSX and transpiles it using its internal Babel setup.
- The browser receives clean, valid JavaScript.

---

# Homework

## 1. Explore various attributes of various tags in JSX

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

## 2. Using `<img>` and `<a>` (anchor) tags in JSX

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

### Complete example — Using both in a React component

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const element = (
  <div>
    <h1>My Homepage</h1>
    
    {/* Image tag */}
    <img 
      src="https://via.placeholder.com/300" 
      alt="Placeholder image" 
      width={300} 
      height={200}
    />
    
    {/* Anchor tag */}
    <p>
      Visit{" "}
      <a 
        href="https://react.dev" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        React's official website
      </a>{" "}
      for more info.
    </p>
  </div>
);

root.render(element);
```

### Key takeaways for `<img>` and `<a>` in JSX

| Feature | `<img>` | `<a>` |
|---------|---------|-------|
| Self-closing | ✅ Required: `<img />` | ❌ Needs closing tag: `<a></a>` |
| Required attributes | `src` and `alt` | `href` |
| Common attributes | `src`, `alt`, `width`, `height`, `loading`, `className` | `href`, `target`, `rel`, `className` |
| Special notes | Always include `alt` for accessibility | Always add `rel="noopener noreferrer"` when using `target="_blank"` |

---

# Components in React — Interview Notes

### ❓ What is a Component?
A **reusable, independent, and isolated piece of UI**. Components are the building blocks of any React application. Each component encapsulates its own structure (JSX), logic (JavaScript), and styling.

> **Analogy:** Think of components like Lego bricks — each brick is independent, reusable, and you combine them to build complex structures.

---

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

---

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

---

### 📝 Defining a Functional Component

```jsx
// Way 1: Function declaration
function Greeting() {
  return <h1>Hello World</h1>;
}

// Way 2: Arrow function (most common in industry)
const Greeting = () => <h1>Hello World</h1>;

// Way 3: With props
const Greeting = (props) => <h1>Hello, {props.name}!</h1>;
```

---

### 🚨 3 Golden Rules of Components

| # | Rule | Why? |
|---|------|------|
| 1 | **PascalCase** name (capital first letter) | React differentiates: lowercase → HTML element (`<div>`), uppercase → custom component (`<Header>`) |
| 2 | **Single root element** | Must return ONE wrapper. Use Fragment `<>...</>` to avoid extra `<div>` in DOM |
| 3 | **Props are read-only (immutable)** | Never modify `props` directly — React relies on immutability for change detection |

---

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

---

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

#### Examples

```jsx
function UserProfile(props) {
  const user = props.user;
  const isAdmin = user.role === "admin";

  // Ternary — conditional rendering
  const statusBadge = isAdmin ? <span className="badge">Admin</span> : null;

  // Logical && — short-circuit evaluation
  const welcomeMessage = isAdmin && <p>Welcome, admin!</p>;

  // .map() — rendering lists (instead of for loop)
  const skillList = user.skills.map((skill, index) => (
    <li key={index}>{skill}</li>
  ));

  // Template literal — combining strings and variables
  const fullName = `${user.firstName} ${user.lastName}`;

  // Function call — formatting data
  function formatDate(date) {
    return date.toLocaleDateString("en-US");
  }

  return (
    <div className="profile">
      <h1>{fullName}</h1>                          {/* variable */}
      <p>Joined: {formatDate(user.joinDate)}</p>    {/* function call */}
      <p>Age: {user.age + 1}</p>                    {/* math expression */}
      {statusBadge}                                 {/* ternary result */}
      {welcomeMessage}                              {/* logical && */}
      
      <h3>Skills ({user.skills.length}):</h3>       {/* expression in text */}
      {user.skills.length > 0 ? (                    {/* ternary for conditional block */}
        <ul>{skillList}</ul>                         {/* mapped list */}
      ) : (
        <p>No skills listed</p>
      )}
      
      <div style={{ marginTop: "10px" }}>           {/* inline style object */}
        <button onClick={() => alert("Clicked!")}>  {/* arrow function event handler */}
          Click me
        </button>
      </div>
    </div>
  );
}
```

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

---

### 🧩 Component Composition

**Composition** means combining smaller, simpler components together to build more complex UIs. Instead of one giant component, you break UI into smaller pieces and compose them.

> React uses **composition** (not inheritance) to reuse code between components.

#### 1️⃣ Basic Composition (Components inside Components)

```jsx
function Avatar(props) {
  return <img src={props.src} alt={props.name} className="avatar" />;
}

function UserCard(props) {
  return (
    <div className="card">
      <Avatar src={props.user.avatar} name={props.user.name} />
      <h3>{props.user.name}</h3>
      <p>{props.user.bio}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard user={{ name: "Amit", avatar: "pic.jpg", bio: "Dev" }} />
      <UserCard user={{ name: "John", avatar: "john.jpg", bio: "Designer" }} />
    </div>
  );
}
```

**Benefits of Composition:**
| Benefit | Why it matters |
|---------|----------------|
| **Reusability** | `Avatar` can be used in `UserCard`, `Comment`, `PostPreview` — anywhere |
| **Separation of concerns** | Each component handles its own logic and rendering |
| **Testability** | Small components are easy to test in isolation |
| **Maintainability** | Change one piece without affecting others |

#### 2️⃣ The `children` Prop (Containment)

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

<Card>
  <img src="photo.jpg" alt="Photo" />
</Card>
```

**Think of `children` like a slot** — the parent component defines the structure/wrapper, and the child fills in the content.

> **Analogy:** `Card` is like a gift box — the box is the wrapper, and whatever you put inside is `props.children`.

#### 3️⃣ Multiple Slots / Named Children

For more flexibility, pass JSX as named props (not just `children`).

```jsx
function Layout(props) {
  return (
    <div className="layout">
      <header className="header">{props.header}</header>
      <main className="main">{props.content}</main>
      <footer className="footer">{props.footer}</footer>
    </div>
  );
}

// Usage — pass JSX as props
<Layout
  header={<h1>My App</h1>}
  content={<p>Main content here</p>}
  footer={<small>&copy; 2026</small>}
/>
```

#### 4️⃣ Specialization (Component that is a "special case" of another)

```jsx
function Dialog(props) {
  return (
    <div className="dialog">
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      {props.children}
    </div>
  );
}

// Specialized version — WelcomeDialog is a specific type of Dialog
function WelcomeDialog() {
  return (
    <Dialog title="Welcome" message="Thank you for visiting!">
      <button onClick={() => alert("OK")}>OK</button>
    </Dialog>
  );
}
```

#### 5️⃣ Composition vs Inheritance

| Approach | React's Recommendation |
|----------|------------------------|
| **Composition** ✅ | **Use this.** Combine components via props and `children` |
| **Inheritance** ❌ | **Avoid.** React components don't benefit from class inheritance patterns |

> React is built for composition. If you find yourself wanting to create a "base component" and extend it, prefer composition instead — pass the varying parts as props or `children`.

#### 6️⃣ Real-World Composition Example

```jsx
function Button(props) {
  return <button className={`btn ${props.variant}`}>{props.children}</button>;
}

function Card(props) {
  return (
    <div className="card">
      {props.image && <img src={props.image} alt="" />}
      <div className="card-body">{props.children}</div>
    </div>
  );
}

function ProductCard(props) {
  return (
    <Card image={props.product.image}>
      <h3>{props.product.name}</h3>
      <p>${props.product.price}</p>
      <Button variant="primary">Add to Cart</Button>
    </Card>
  );
}
```

Notice how `ProductCard` composes `Card`, `Button`, and basic HTML elements — building complexity from simple pieces.

#### 📌 Composition — Interview Quick Recap

| Concept | Explanation |
|---------|-------------|
| **Composition** | Combining small components to build complex UIs |
| **`children` prop** | Pass content between opening/closing tags — like a slot |
| **Named props for JSX** | Pass JSX as any regular prop (for multiple "slots") |
| **Specialization** | One component is a "special case" of another |
| **React default** | Use composition, **never inheritance** |

---

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

---

### 🔑 One-Liner Summary

> Components are **reusable JS functions** that return JSX, named in **PascalCase**, accept **props** (read-only data), and compose together to build UI. **Functional components with Hooks** are the modern industry standard.