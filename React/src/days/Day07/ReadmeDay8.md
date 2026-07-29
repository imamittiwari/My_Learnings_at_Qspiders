# Day 08 — Class-Based Components in React (Interview Friendly Notes)

---

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

---

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

---

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

```jsx
// 👇 This is what React.Component's constructor does internally (simplified):
class Component {
  constructor(props) {
    this.props = props;       // ✅ Sets this.props
    this.state = {};          // ✅ Initializes state object
    this.updater = ...;       // ✅ Sets up the batching/update system
    // ... other internal setup
  }
}
```

| Concept | Explanation |
|---|---|
| **`super(props)`** | Calls the parent `React.Component` constructor, passing `props` to it. This sets `this.props`, initializes internal React state (`this.updater`), and prepares the component instance. |
| **Why it's required** | In JavaScript ES6 classes, you **must** call `super()` in a derived class constructor **before** accessing `this`. Without it, `this` is uninitialized — `ReferenceError`. |
| **What happens without `super()`?** | `ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor` |
| **What if you call `super()` without `props`?** | `this.props` will be `undefined`. This won't crash immediately, but any access to `this.props.something` will throw a TypeError. |

---

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

**Why does this matter?**

Even though `props` is available as a parameter in the constructor, React internally uses `this.props` everywhere else — in lifecycle methods, in `render()`, in your event handlers. If you call `super()` without `props`:

1. Inside the constructor — `this.props` is `undefined` (you'd have to manually set it: `this.props = props`)
2. Outside the constructor — `this.props` will **still work** because React sets it **after** the constructor runs

```jsx
// 🧪 Experiment to understand:
class TestComponent extends Component {
  constructor(props) {
    super();  // No props!
    
    console.log("Inside constructor:");
    console.log("  this.props:", this.props);       // ❌ undefined
    console.log("  props parameter:", props);        // ✅ Has value
    
    // You'd have to do this manually:
    // this.props = props;  // React does this anyway after constructor
  }

  componentDidMount() {
    console.log("After mount, this.props:", this.props); // ✅ Has value!
    // React sets this.props AFTER constructor returns
  }

  render() {
    console.log("In render, this.props:", this.props); // ✅ Has value
    return <h1>{this.props.name}</h1>;
  }
}
```

> **So what's the verdict?** Always use `super(props)` — it's the proper, predictable way. `super()` without props is an anti-pattern that only works because React patches `this.props` after the constructor. Don't rely on React's internal behavior — be explicit.

---

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

**Why does this work without `super(props)`?** Babel transpiles class fields into constructor code automatically. The transpiled output looks like:

```jsx
// What Babel generates (simplified):
class Counter extends Component {
  constructor(props) {
    super(props);                   // ✅ Babel adds this automatically!
    this.state = { count: 0 };      // Class field moved here
    this.handleClick = () => { ... }; // Arrow class field moved here
  }

  render() { ... }
}
```

---

### 📊 Constructor vs Class Field Syntax

| Aspect | Constructor | Class Field (modern) |
|---|---|---|
| **Boilerplate** | More (must call `super(props)`) | Less (no constructor needed) |
| **State init** | `this.state = {}` inside constructor | `state = {}` outside |
| **Method binding** | Manual: `this.method = this.method.bind(this)` | Arrow fields auto-bind: `method = () => {}` |
| **Readability** | Lower (scattered init + binding) | Higher (all in one place) |
| **Transpilation** | Kept as-is | Babel moves to constructor anyway |
| **Recommendation** | Legacy / older codebases | ✅ Modern React class components |

> **Interview tip:** If you're asked to write a class component in an interview, **use the class field syntax** — it shows you know modern React best practices. You can say: *"Modern class components use class fields for state and arrow methods, which eliminates the need for a constructor and manual binding."*

---

### 🎯 Quick Summary of `super(props)`

| Question | Answer |
|---|---|
| **Do I need `super(props)`?** | Yes — if you're writing a constructor |
| **Can I skip the constructor entirely?** | Yes — use class field syntax instead |
| **What does `super(props)` do?** | Calls `React.Component`'s constructor, sets `this.props` |
| **What if I call `super()` without props?** | `this.props` is undefined in constructor (React fixes it after, but don't rely on that) |
| **What if I forget `super()` entirely?** | JavaScript error: `Must call super constructor in derived class` |

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

---

### 🗺️ Complete Lifecycle Diagram

```
                              ┌─────────────────────────┐
                              │     constructor(props)   │
                              │  (init state, bind this) │
                              └───────────┬─────────────┘
                                          │
                              ┌───────────▼─────────────┐
                              │ getDerivedStateFromProps │
                              │  (sync state with props) │
                              └───────────┬─────────────┘
                                          │
                              ┌───────────▼─────────────┐
                              │        render()          │
                              │   (returns JSX / VDOM)   │
                              └───────────┬─────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
              ┌───────────┐       ┌───────────────┐      ┌──────────────┐
              │  React    │       │  React        │      │  React       │
              │ updates   │       │  compares     │      │  updates     │
              │ children  │       │  VDOM → DOM   │      │  refs        │
              └───────────┘       └───────┬───────┘      └──────────────┘
                                          │
                              ┌───────────▼─────────────┐
                              │   componentDidMount()    │  ← ✅ API calls here
                              │  (runs AFTER DOM ready)  │
                              └─────────────────────────┘

              ─ ─ ─ ─ ─ ─ ─ ─ ─ UPDATING PHASE ─ ─ ─ ─ ─ ─ ─ ─ ─

                    New Props / setState() / forceUpdate()
                                    │
                                    ▼
                              ┌───────────┐
                              │getDerived │
                              │StateFrom  │
                              │Props      │
                              └─────┬─────┘
                                    │
                              ┌─────▼─────┐
                              │ shouldComp│
                              │ onentUpd. │ ← return false to SKIP render
                              └─────┬─────┘
                                    │ (true)
                              ┌─────▼─────┐
                              │  render()  │
                              └─────┬─────┘
                                    │
                              ┌─────▼──────────┐
                              │getSnapshotBefore│
                              │Update           │ ← capture scroll pos, etc.
                              └─────┬──────────┘
                                    │
                              ┌─────▼──────────┐
                              │componentDidUpd. │ ← ✅ re-fetch data here
                              │(prevProps,      │    (with comparison check)
                              │ prevState,      │
                              │ snapshot)       │
                              └────────────────┘

              ─ ─ ─ ─ ─ ─ ─ ─ ─ UNMOUNTING PHASE ─ ─ ─ ─ ─ ─ ─ ─ ─

                              ┌─────────────────────────┐
                              │ componentWillUnmount()   │  ← 🧹 Cleanup!
                              │ (clear timers,           │
                              │  unsubscribe,            │
                              │  remove listeners)       │
                              └─────────────────────────┘
```

---

### 1️⃣ Mounting Phase (Component is created and inserted into DOM)

| Method | Called When | Purpose |
|---|---|---|
| `constructor(props)` | Before mounting | Initialize state, bind methods |
| `static getDerivedStateFromProps(props, state)` | Before render | Sync state with props (rarely used) |
| `render()` | Every re-render | Return JSX |
| `componentDidMount()` | **After** component is inserted into DOM | API calls, subscriptions, DOM manipulation |

---

## 🎯 Deep Dive: `componentDidMount()` — The Most Important Lifecycle Method

### What is `componentDidMount`?

`componentDidMount()` is a lifecycle method that is called **once**, immediately after a component is **inserted into the DOM tree** (i.e., after the first render is committed to the browser).

```jsx
class MyComponent extends Component {
  componentDidMount() {
    // This runs AFTER the component's HTML is in the real DOM
    console.log("✅ Component is now in the DOM");
    console.log("DOM element:", document.getElementById("my-div")); // ✅ Accessible!
  }

  render() {
    return <div id="my-div">Hello</div>;
  }
}
```

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

---

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

---

### ⏱️ Timers & Intervals in `componentDidMount`

```jsx
class LiveClock extends Component {
  state = {
    time: new Date(),
    is24Hour: true,
  };

  componentDidMount() {
    // ✅ Set up interval — runs every second
    this.timerID = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);

    // ✅ Set up a one-time delay
    this.timeoutID = setTimeout(() => {
      console.log("5 seconds have passed since mount!");
    }, 5000);
  }

  componentWillUnmount() {
    // 🧹 CRITICAL: Clean up both timers!
    clearInterval(this.timerID);
    clearTimeout(this.timeoutID);
  }

  render() {
    return (
      <div>
        <h2>{this.state.time.toLocaleTimeString()}</h2>
        <button onClick={() => this.setState(prev => ({ is24Hour: !prev.is24Hour }))}>
          Toggle Format
        </button>
      </div>
    );
  }
}
```

> **⚠️ Memory leak warning:** If you set up a timer in `componentDidMount` and forget to clear it in `componentWillUnmount`, the timer keeps running even after the component is removed. This is a **classic memory leak** in React apps.

---

### 📐 DOM Measurements in `componentDidMount`

Since the real DOM exists when `componentDidMount` runs, you can measure elements:

```jsx
class MeasureBox extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    // ✅ DOM is ready — we can measure!
    const rect = this.boxRef.getBoundingClientRect();
    this.setState({
      width: rect.width,
      height: rect.height,
    });
    console.log(`Box dimensions: ${rect.width} x ${rect.height}`);
  }

  render() {
    return (
      <div
        ref={(el) => (this.boxRef = el)}  // Callback ref
        style={{ width: "50%", padding: "20px", border: "1px solid black" }}
      >
        <h2>Box Width: {this.state.width}px</h2>
        <h2>Box Height: {this.state.height}px</h2>
      </div>
    );
  }
}
```

---

### 🧩 Third-Party Library Integration

`componentDidMount` is the ideal place to initialize non-React libraries:

```jsx
class ChartComponent extends Component {
  componentDidMount() {
    // ✅ Initialize a chart library (e.g., Chart.js, D3, Google Maps)
    this.chart = new Chart(this.chartCanvas, {
      type: "bar",
      data: {
        labels: this.props.labels,
        datasets: [{
          label: "Sales",
          data: this.props.data,
        }],
      },
    });
  }

  componentWillUnmount() {
    // 🧹 Cleanup: destroy chart instance
    if (this.chart) {
      this.chart.destroy();
    }
  }

  render() {
    return <canvas ref={(el) => (this.chartCanvas = el)} />;
  }
}
```

---

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

---

### 🧪 `componentDidMount` with `setState` — The Double Render

```jsx
class DoubleRender extends Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    // ⚠️ This triggers a SECOND render
    this.setState({ count: 10 });
  }

  render() {
    console.log("Render called");  // Runs TWICE!
    return <h1>Count: {this.state.count}</h1>;
  }
}
```

**What happens:**
1. **First render** — `count: 0` is shown (from initial state)
2. **`componentDidMount` fires** — `setState({ count: 10 })` is called
3. **Second render** — `count: 10` is shown

**Is this a problem?** Usually **no**. React batches the state update and the user only sees the final value (`10`). But it's slightly inefficient. If you know the value at mount time, initialize it in the constructor or as a class field instead.

> **Interview tip:** If you call `setState` synchronously in `componentDidMount`, React actually **batches** the re-render in most cases — the user won't see the intermediate state. But it's still better practice to initialize known values in the constructor.

---

### 🎯 `componentDidMount` Interview Q&A

**Q1: Why is `componentDidMount` the best place for API calls?**

> Because it runs **after** the component is in the DOM. This means:
> 1. The loading UI (spinner, shimmer) is already visible to the user
> 2. The DOM is ready for measurements if needed
> 3. It runs only **once** per component lifecycle (no infinite loops)
> 4. It's guaranteed to run in the browser (not in SSR — `componentDidMount` doesn't run on the server)

**Q2: Does `componentDidMount` run on the server (SSR)?**

> **No.** `componentDidMount` only runs in the browser. In server-side rendering (Next.js, etc.), only `constructor` and `render` run on the server. This is why you put browser-specific code (API calls, timers, DOM access) in `componentDidMount`.

**Q3: What happens if you call `setState` inside `componentDidMount`?**

> It triggers a **second re-render**. The component renders with initial state first, then `componentDidMount` fires, `setState` updates the state, and the component re-renders with the new state. React batches this in most cases so the user doesn't see the intermediate state, but it's still an extra render cycle.

**Q4: Can `componentDidMount` be async?**

> **No, not directly.** The method itself cannot be `async` because React expects it to return `undefined` (or nothing). But you can define an **async function inside** it:
>
> ```jsx
> componentDidMount() {
>   // ✅ This is fine — the async function is defined and called inside
>   const fetchData = async () => {
>     const res = await fetch("/api/data");
>     const data = await res.json();
>     this.setState({ data });
>   };
>   fetchData();
> }
> ```

**Q5: What is the difference between `componentDidMount` and `useEffect` with `[]`?**

> They are **functionally equivalent** — both run after the first render. But `useEffect` has additional features: it can run on every render (no deps), run when specific values change (populated deps), and has a built-in cleanup mechanism (return function). `componentDidMount` is simpler — it just runs once after mount.

**Q6: Can you access `this.state` and `this.props` in `componentDidMount`?**

> **Yes, absolutely.** Both `this.state` and `this.props` are fully available in `componentDidMount`. The constructor has already initialized state, and props have been set by the parent.

**Q7: What if you need to fetch data based on props?**

> Fetch in `componentDidMount` using `this.props`:
>
> ```jsx
> componentDidMount() {
>   fetch(`/api/users/${this.props.userId}`)
>     .then(res => res.json())
>     .then(user => this.setState({ user }));
> }
> ```
>
> And also handle prop changes in `componentDidUpdate`:
>
> ```jsx
> componentDidUpdate(prevProps) {
>   if (this.props.userId !== prevProps.userId) {
>     this.fetchUser(this.props.userId);  // Re-fetch when userId changes
>   }
> }
> ```

**Q8: What is the one-liner for `componentDidMount`?**

> *"`componentDidMount` runs once after the component is inserted into the DOM. It's the standard place for API calls, timers, event listeners, and DOM measurements — anything that requires the real DOM or needs to happen once on mount."*

---

### 🔬 Mounting Execution Order — Parent + Child

This is a **critical interview concept**: When a parent component has child components, the mounting happens in a specific order.

```jsx
// ─── PARENT COMPONENT ───
class Parent extends Component {
  constructor(props) {
    super(props);
    console.log("Parent - constructor");
    this.state = { show: true };
  }

  componentDidMount() {
    console.log("Parent - componentDidMount");
  }

  render() {
    console.log("Parent - render");
    return (
      <div>
        <Child name="First" />
        <Child name="Second" />
      </div>
    );
  }
}

// ─── CHILD COMPONENT ───
class Child extends Component {
  constructor(props) {
    super(props);
    console.log(`${this.props.name} Child - constructor`);
  }

  componentDidMount() {
    console.log(`${this.props.name} Child - componentDidMount`);
  }

  render() {
    console.log(`${this.props.name} Child - render`);
    return <h1>{this.props.name}</h1>;
  }
}
```

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

#### 📝 Real Example: UserClass with Lifecycle Logging

Here's your actual `UserClass` component with lifecycle methods added:

```jsx
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log("UserClass - constructor");  // 1st: constructor runs
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log("UserClass - componentDidMount");  // 3rd: after DOM ready
    // ✅ API calls go here
    // ✅ Timer setup
    // ✅ DOM measurements
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("UserClass - componentDidUpdate");
    // ✅ Runs after every re-render (state/props change)
    if (this.state.count !== prevState.count) {
      console.log(`Count changed from ${prevState.count} to ${this.state.count}`);
    }
  }

  componentWillUnmount() {
    console.log("UserClass - componentWillUnmount");
    // 🧹 Cleanup: clearInterval, unsubscribe, etc.
  }

  render() {
    console.log("UserClass - render");  // 2nd: render runs
    const { name, location } = this.props;
    const { count } = this.state;

    return (
      <div className="user-card">
        <h1>Count: {count}</h1>
        <button onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}>Count Increment</button>
        <h1>Name: {name}</h1>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;
```

**Console Output on mount:**
```
UserClass - constructor
UserClass - render
UserClass - componentDidMount
```

**Console Output on button click (state change):**
```
UserClass - componentDidUpdate
```

**Console Output on unmount (navigating away):**
```
UserClass - componentWillUnmount
```

---

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

#### 🔬 Updating Execution Order — Parent + Child

When a parent re-renders, ALL children re-render too (unless `shouldComponentUpdate` returns false):

```
Parent - getDerivedStateFromProps
Parent - shouldComponentUpdate  → true
Parent - render
First Child - getDerivedStateFromProps
First Child - shouldComponentUpdate  → true
First Child - render
Second Child - getDerivedStateFromProps
Second Child - shouldComponentUpdate  → true
Second Child - render
First Child - getSnapshotBeforeUpdate
Second Child - getSnapshotBeforeUpdate
React updates the actual DOM
First Child - componentDidUpdate
Second Child - componentDidUpdate
Parent - componentDidUpdate
```

> **Key insight:** `render()` goes **top-down** (parent first, then children), but `componentDidUpdate` goes **bottom-up** (children first, then parent). Same pattern as mounting.

---

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

#### 🔬 Unmounting Execution Order — Parent + Child

When a parent is removed, children unmount FIRST (bottom-up):

```
Parent - componentWillUnmount  ← NO! Children first
First Child - componentWillUnmount  ← ✅ Children unmount first
Second Child - componentWillUnmount ← ✅ Children unmount first
Parent - componentWillUnmount       ← Then parent
```

---

### 🧪 Complete Lifecycle Demo — All Phases in One Component

```jsx
import React from "react";

class LifecycleDemo extends React.Component {
  // ─── MOUNTING ───
  constructor(props) {
    super(props);
    console.log("1. constructor");
    this.state = { count: 0 };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("2. getDerivedStateFromProps");
    return null; // Return new state or null
  }

  // ─── UPDATING (only) ───
  shouldComponentUpdate(nextProps, nextState) {
    console.log("3. shouldComponentUpdate");
    return true; // false = skip re-render
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("4. getSnapshotBeforeUpdate");
    return "snapshot value"; // Passed to componentDidUpdate as 3rd arg
  }

  // ─── MOUNTING + UPDATING ───
  render() {
    console.log("5. render");
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Update
        </button>
      </div>
    );
  }

  // ─── MOUNTING ───
  componentDidMount() {
    console.log("6. componentDidMount (after DOM ready)");
  }

  // ─── UPDATING ───
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("7. componentDidUpdate");
    console.log("  Snapshot received:", snapshot); // "snapshot value"
  }

  // ─── UNMOUNTING ───
  componentWillUnmount() {
    console.log("8. componentWillUnmount (cleanup!)");
  }
}
```

**Mounting output:**
```
1. constructor
2. getDerivedStateFromProps
5. render
6. componentDidMount
```

**Updating output (button click):**
```
2. getDerivedStateFromProps
3. shouldComponentUpdate
5. render
4. getSnapshotBeforeUpdate
7. componentDidUpdate
```

**Unmounting output:**
```
8. componentWillUnmount
```

---

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

## 📤 Props in Class Components

```jsx
// Parent
<UserProfile name="Amit" age={25} />

// Class component
class UserProfile extends Component {
  render() {
    // Access via this.props
    const { name, age } = this.props;
    return <h1>{name} is {age} years old</h1>;
  }
}
```

| Concept | Class Component | Functional Component |
|---|---|---|
| Access props | `this.props` | `props` (parameter) |
| Default props | `static defaultProps = {}` | `Component.defaultProps` or destructured defaults |
| Prop types | `static propTypes = {}` | Same (both use `prop-types` package) |

### Default Props

```jsx
class Greeting extends Component {
  static defaultProps = {
    name: "Guest",
    age: 0,
  };

  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

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

```jsx
// ❌ Won't re-render — obj reference is the same
this.setState({ user: { ...this.state.user, name: "New" } }); // Actually creates new object ✅
// ❌ This won't work:
const user = this.state.user;
user.name = "New";
this.setState({ user }); // Same reference — PureComponent skips re-render
```

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

## 💡 Common Patterns in Class Components

### Pattern 1: Fetching data on mount + re-fetch on prop change

```jsx
class UserDashboard extends Component {
  state = { user: null, loading: true };

  componentDidMount() {
    this.fetchUser(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchUser(this.props.userId);
    }
  }

  fetchUser = async (id) => {
    this.setState({ loading: true });
    const res = await fetch(`/api/users/${id}`);
    const user = await res.json();
    this.setState({ user, loading: false });
  };

  render() {
    if (this.state.loading) return <Spinner />;
    return <Profile user={this.state.user} />;
  }
}
```

### Pattern 2: Toggle component

```jsx
class Toggle extends Component {
  state = { isVisible: false };

  toggle = () => {
    this.setState(prev => ({ isVisible: !prev.isVisible }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggle}>
          {this.state.isVisible ? "Hide" : "Show"}
        </button>
        {this.state.isVisible && <div>{this.props.children}</div>}
      </div>
    );
  }
}
```

### Pattern 3: Timer with cleanup

```jsx
class Clock extends Component {
  state = { time: new Date() };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID); // 🧹 Cleanup!
  }

  tick = () => {
    this.setState({ time: new Date() });
  };

  render() {
    return <h2>{this.state.time.toLocaleTimeString()}</h2>;
  }
}
```

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

---

## 🎯 One-Liner for Interview

> *"Class components are ES6 classes extending `React.Component` with a `render()` method, state via `this.state` and `this.setState()`, and lifecycle methods like `componentDidMount`. They were the standard before React 16.8 introduced hooks. While still supported, functional components with hooks are now preferred — they're simpler, have no `this` binding issues, and enable better code reuse through custom hooks. The only thing class components can still do that functions can't is error boundaries via `componentDidCatch`."*

---

## 🧪 Code Examples Side-by-Side

### Example: Counter with mount/unmount logging

```jsx
// ─── CLASS ───
class Counter extends Component {
  state = { count: 0 };

  componentDidMount() {
    console.log("Counter mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log("Count changed:", this.state.count);
    }
  }

  componentWillUnmount() {
    console.log("Counter unmounted");
  }

  increment = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

// ─── FUNCTIONAL (equivalent) ───
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Counter mounted");
    return () => console.log("Counter unmounted");
  }, []);

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
    </div>
  );
}
```

---

> **Next up:** Higher-Order Components (HOCs), Render Props, and advanced patterns in React.