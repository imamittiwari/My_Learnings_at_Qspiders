# 📘 Day 05 — React Interview-Friendly Notes: File Structuring & Hooks

## 📌 Overview of Day 05
Day 05 introduces **React Hooks** (starting with `useState`) and covers **industry-standard file structuring** in React applications. We also work with **real-world data** (Swiggy-like restaurant API data) to build dynamic UIs.

---

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

**Architectural Pattern — Feature-Based Organization:**
```
src/
├── features/
│   ├── restaurant/
│   │   ├── components/
│   │   │   ├── RestaurantCard.js
│   │   │   └── RestaurantList.js
│   │   ├── utils/
│   │   │   └── restaurantHelper.js
│   │   └── data/
│   │       └── restaurantData.js
│   ├── cart/
│   │   ├── components/
│   │   │   ├── Cart.js
│   │   │   └── CartItem.js
│   │   └── utils/
│   │       └── cartHelper.js
│   └── header/
│       ├── components/
│       │   ├── Header.js
│       │   └── Nav.js
│       └── utils/
│           └── navData.js
```

**Interview Question:**
> *Q: What is the difference between feature-based and type-based folder structure in React?*
>
> **A:** Type-based groups files by their type (all components together, all styles together), while feature-based groups files by business feature (all files for "restaurant" together). Feature-based is preferred for large applications because it keeps related code co-located, making it easier to maintain, scale, and eventually split into micro-frontends.

**Interview Question:**
> *Q: Should you put every component in its own file?*
>
> **A:** Yes, as an industry best practice. Even small components should be in their own file because it improves maintainability, makes testing easier, enables lazy loading on a per-component basis, and improves code review workflows. However, tiny helper components used only within one parent *can* be co-located if they are not reused elsewhere.

---

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
import HeaderComponent from './Header';  // ✅ Also works
```

**Rules of Default Export:**
- **Only one** `export default` per file.
- The imported name **does not need to match** the exported name.
- No curly braces `{}` needed during import.
- Can export **inline** or at the **end of the file**.

```jsx
// Inline default export
export default function Header() {
  return <h1>Header</h1>;
}

// Or export an anonymous function
export default () => {
  return <h1>Header</h1>;
};
```

#### B) Named Export (`export`)

```jsx
// ✅ NAMED EXPORTS — Multiple per file

// File: constants.js
export const LOGO_URL = "https://example.com/logo.png";
export const CDN_URL = "https://media-assets.swiggy.com/...";
export const API_BASE_URL = "https://www.swiggy.com/dapi";

export const getYear = () => new Date().getFullYear();

export const formatRating = (rating) => `${rating} ⭐`;

// Importing named exports:
import { LOGO_URL, CDN_URL } from './constants';           // ✅ Destructure with exact names
import { LOGO_URL as Logo } from './constants';            // ✅ Rename with 'as'
import * as CONSTANTS from './constants';                  // ✅ Import ALL as namespace object
// Usage: CONSTANTS.LOGO_URL, CONSTANTS.CDN_URL
```

**Rules of Named Export:**
- **Multiple** named exports per file allowed.
- The imported name **must match** the exported name (unless using `as`).
- Must use **curly braces** `{}` during import.
- Each export must have a **name** (no anonymous exports).

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

#### D) Re-exporting (Barrel Exports)

```jsx
// ✅ RE-EXPORTING — Combining exports from multiple files

// File: components/index.js (Barrel file)

// Re-export default as named
export { default as Header } from './Header/Header';
export { default as Body } from './Body/Body';
export { default as RestaurantCard } from './RestaurantCard/RestaurantCard';

// Re-export named exports
export { LOGO_URL, CDN_URL } from '../utils/constants';

// Re-export everything
export * from '../utils/helper';

// Then import from the barrel:
import { Header, Body, RestaurantCard, LOGO_URL } from './components';
```

#### E) Exporting Functions, Objects, Arrays, Classes

```jsx
// Exporting functions
export const fetchRestaurants = async () => { ... };
export function filterByRating(restaurants, minRating) { ... }

// Exporting objects
export const config = {
  appName: "Foodie App",
  version: "1.0.0",
};

// Exporting arrays
export const cuisineTypes = ["Indian", "Chinese", "Italian"];

// Exporting classes (rare in modern React)
export class Utility {
  static formatDate(date) { ... }
}
```

#### F) Dynamic Imports (Lazy Loading)

```jsx
// ✅ DYNAMIC IMPORT — Load code on demand (code splitting)

// Instead of static import at the top:
// import RestaurantCard from './RestaurantCard';

// Dynamic import (returns a Promise):
const RestaurantCard = React.lazy(() => import('./RestaurantCard'));

// Usage with Suspense:
import { Suspense } from 'react';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RestaurantCard />
    </Suspense>
  );
};
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

**Interview Question:**
> *Q: Can you have both default and named exports in the same file?*
>
> **A:** Yes, you can mix both. For example, a component file can have a default export for the main component and named exports for related constants or helper functions. When importing, the default import comes first, followed by named imports in curly braces: `import Component, { helperFn, CONSTANT } from './file'`.

**Interview Question:**
> *Q: What is the purpose of `export { default as Name }` syntax?*
>
> **A:** This is a **re-export** pattern used in barrel files (`index.js`). It takes the default export from another module and re-exports it as a named export. This allows a barrel file to collect multiple components from different files and export them all as named exports, enabling cleaner imports like `import { Header, Body } from './components'`.

**Interview Question:**
> *Q: What is tree-shaking and how do exports affect it?*
>
> **A:** Tree-shaking is a build-time optimization where unused exports are removed from the final bundle. Named exports are generally better for tree-shaking because bundlers (like Webpack) can precisely track which named exports are used. Default exports can be harder to tree-shake because the bundler doesn't know which properties of the imported object are actually used.

**Interview Question:**
> *Q: What is the difference between `import * as X` and `import X`?*
>
> **A:** `import * as X from './file'` imports **all named exports** as properties of a namespace object `X`. For example, if the file exports `const a = 1` and `const b = 2`, you access them as `X.a` and `X.b`. `import X from './file'` imports only the **default export** and assigns it to the name `X`.

**Interview Question:**
> *Q: When would you use dynamic imports in React?*
>
> **A:** Dynamic imports are used for **code splitting** — loading parts of the application only when needed. For example, a heavy component like a chart library or a rarely-used settings page can be lazy-loaded. This reduces the initial bundle size and improves performance. React's `React.lazy()` and `<Suspense>` are built on top of dynamic imports.

---

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

**Interview Question:**
> *Q: What is the purpose of an `index.js` (barrel) file in React?*
>
> **A:** It acts as a re-export point for a module. Instead of importing from the exact file path, you import from the directory. This simplifies imports and hides the internal file structure. For example, `import { Header } from './components'` instead of `import Header from './components/Header/Header'`.

---

### 5️⃣ Separation of Concerns — Constants and Config Files

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
export const RESTAURANT_IMG_BASE = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// Header.js
import { LOGO_URL } from '../utils/constants';
const Header = () => {
  return <img src={LOGO_URL} />;
};
```

**Industry Standard File: `src/utils/constants.js`:**
```js
// All environment-specific values and configuration constants
export const LOGO_URL = "https://example.com/logo.png";
export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/...";
export const API_BASE_URL = "https://www.swiggy.com/dapi";
export const RESTAURANTS_API = `${API_BASE_URL}/restaurants/list/v5`;
export const DEFAULT_IMAGE = "https://via.placeholder.com/150";
export const APP_NAME = "Foodie App";
export const COST_FOR_TWO_LABEL = "Cost for two";
```

**Interview Question:**
> *Q: Why should constants be in a separate file in React projects?*
>
> **A:** It follows the **separation of concerns** principle. Constants like API URLs, image CDN paths, and config values should not be scattered across components. Keeping them in a single file makes the application easier to reconfigure (just change one file for different environments), prevents duplication, and keeps components focused on logic rather than configuration.

---

### 6️⃣ Mock Data Files (Config-Driven UI)

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

**Interview Question:**
> *Q: What is Config-Driven UI and how do mock data files support it?*
>
> **A:** Config-Driven UI means the UI is rendered from configuration data (JSON/API responses) rather than being hardcoded. Mock data files allow developers to build and test the UI before the real API is available. The same components work with both mock data and real API data — just swap the data source. This enables frontend development to proceed in parallel with backend development.


---

### 7️⃣ Introduction to React Hooks — `useState`

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

**How `useState` Works (Behind the Scenes):**
```
useState(initialValue)
    │
    ▼
Returns [currentState, setterFunction]
    │                         │
    ▼                         ▼
  Used in JSX              Called on events
  (read value)             (update value)
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
> *Q: Why were Hooks introduced in React?*
>
> **A:** Hooks were introduced to solve several problems: 1) Reusing stateful logic between components was difficult (required patterns like HOC or render props). 2) Complex components became hard to understand (lifecycle methods mixed unrelated logic). 3) Classes confused both developers and machines (minification issues, `this` binding confusion). Hooks let you use state and other React features without classes.

**Interview Question:**
> *Q: What is the difference between state and props?*
>
> **A:** Props are **read-only** data passed from a parent component to a child component. They cannot be modified by the child. State is **mutable** data managed within a component itself using `useState`. Changes to state trigger a re-render. Props flow **down** (parent→child), while state is **local** to the component. A parent passes its state as props to children.

**Interview Question:**
> *Q: How does `useState` work in React?*
>
> **A:** `useState` is a Hook that returns an array with two elements: the current state value and a function to update it. When the update function is called, React schedules a re-render of that component with the new state value. React preserves the state between re-renders using its internal "fiber" reconciliation system.

**Interview Question:**
> *Q: What happens when you call `setState` (the setter from `useState`)?*
>
> **A:** React schedules a re-render of the component (not immediate). During the next render, React provides the updated state value. If you call `setState` with the same value as the current state, React may **bail out** of the re-render (performance optimization using `Object.is` comparison).

**Interview Question:**
> *Q: Can you use multiple `useState` hooks in a single component?*
>
> **A:** Yes, you can use multiple `useState` hooks to manage different pieces of state independently:
> ```jsx
> const [name, setName] = useState("");
> const [age, setAge] = useState(0);
> const [email, setEmail] = useState("");
> ```

---

### 8️⃣ State vs Local Variables in React

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

---

### 9️⃣ Handling Events in React

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
- React pools synthetic events for performance (in older React versions).

**Interview Question:**
> *Q: What is event pooling in React?*
>
> **A:** In React 16 and earlier, synthetic events are pooled for performance. The event object is reused across handlers, so accessing event properties asynchronously (e.g., inside `setTimeout`) requires calling `e.persist()`. In React 17+, event pooling was removed, so you can access event properties asynchronously without calling `persist()`.

---

### 🔟 Keys in React Lists — Deep Dive

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
- Example: Filtering a list of restaurants to show only highly-rated ones. The index `0` might have pointed to "Theobroma" before but points to "Natural Ice Cream" after filtering.
- React's reconciliation uses `key` to determine which items changed position vs. which items were removed/added.

**When is index-as-key acceptable?**
- When the list is **static** (never reordered, filtered, or sorted).
- When the list has **no unique ID** and will never change.
- But even then, it's usually better to generate a stable ID.

**Interview Question:**
> *Q: Why shouldn't you use array index as the key prop in React?*
>
> **A:** Index-based keys can cause UI bugs when the list is modified. If items are added, removed, or reordered, the indices change, and React may incorrectly match old components to new data. This can lead to incorrect rendering, lost state (e.g., input values inside list items), and performance issues. Always prefer a **stable, unique identifier** (like a database ID) as the key.

**Interview Question:**
> *Q: What happens if you don't provide a key in a `.map()` loop?*
>
> **A:** React will show a warning: "Each child in a list should have a unique 'key' prop." React uses the index as an implicit key, which is unstable. This can cause incorrect rendering when the list changes dynamically. In some cases, state may be associated with the wrong component, leading to subtle bugs.

---

### 1️⃣1️⃣ Component File Organization — Best Practices

**Single Component per File:**
```jsx
// ✅ RECOMMENDED — One component per file
// RestaurantCard/RestaurantCard.jsx
const RestaurantCard = ({ name, cuisines, avgRating, deliveryTime, cloudinaryImageId }) => {
  return (
    <div className="res-card">
      <img src={`${CDN_URL}${cloudinaryImageId}`} alt={name} />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{deliveryTime} mins</h4>
    </div>
  );
};
export default RestaurantCard;
```

**Naming Conventions:**
```
Component files: PascalCase (Header.js, RestaurantCard.js)
Utility files:   camelCase (mockData.js, constants.js)
CSS files:       ComponentName.module.css or ComponentName.css
Test files:      ComponentName.test.js or ComponentName.spec.js
```

**Naming Conventions Table:**

| Element | Convention | Example |
|---------|-----------|---------|
| Component file | PascalCase | `Header.js`, `RestaurantCard.js` |
| Utility file | camelCase | `mockData.js`, `constants.js` |
| CSS file | ComponentName + .module.css | `Header.module.css` |
| Function inside component | camelCase + action verb | `handleClick`, `fetchData` |
| State variables | camelCase (noun) | `searchText`, `userData` |
| Setter function | set + StateName | `setSearchText`, `setUserData` |
| Event handlers | handle + Event | `handleSubmit`, `handleInputChange` |

**Interview Question:**
> *Q: What naming conventions should you follow for React components?*
>
> **A:** Component files should use **PascalCase** (e.g., `RestaurantCard.js`). Utility files use **camelCase** (e.g., `mockData.js`). Component function names should also be PascalCase. State variables use camelCase, and their setter functions follow the pattern `set` + PascalCase variable name (e.g., `count` → `setCount`). Event handlers use `handle` prefix (e.g., `handleSubmit`, `handleChange`).

---

### 1️⃣2️⃣ Spread Operator with Props

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

// The spread does the same thing, automatically!
```

**Destructuring in the child:**
```jsx
// Child component receives all properties as individual props
const RestaurantCard = ({ name, cuisines, avgRating, deliveryTime, cloudinaryImageId, ...rest }) => {
  // `rest` contains any extra props not destructured
  return (
    <div className="res-card">
      <h3>{name}</h3>
      <p>{cuisines?.join(", ")}</p>
      <span>{avgRating}</span>
      <span>{deliveryTime} mins</span>
    </div>
  );
};
```

**The `...rest` pattern:**
```jsx
// You can separate known props from unknown/extra props
const RestaurantCard = ({ name, cuisines, avgRating, ...otherProps }) => {
  // `otherProps` contains everything except name, cuisines, avgRating
  return (
    <div className="res-card" {...otherProps}>  {/* Pass extra props to wrapper */}
      <h3>{name}</h3>
      <p>{cuisines?.join(", ")}</p>
    </div>
  );
};
```

---

### 1️⃣3️⃣  Optional Chaining (`?.`) in React

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
> **A:** Optional chaining (`?.`) allows safe access to nested object properties without throwing an error if an intermediate property is `null` or `undefined`. It's particularly useful in React when rendering data from an API where some fields might be missing. Without it, you'd need verbose `&&` checks or ternary operators for each level of nesting.

---

### 1️⃣4️⃣  Using Swiggy API Data in Day05

**Data structure used in Day05 (Swiggy-style API):**

```
resObj.restaurants[]
    └── info[]
        ├── id (unique identifier)
        ├── name (restaurant name)
        ├── cloudinaryImageId (image path)
        ├── cuisines (array of cuisine names)
        ├── avgRating (rating number)
        ├── sla.deliveryTime (delivery minutes)
        ├── costForTwo (price string)
        ├── areaName (location)
        └── isOpen (boolean)
```

**Mapping API data to components:**
```jsx
// Accessing data from the nested structure
const restaurant = resObj.restaurants[0];  // First restaurant
const name = restaurant.info.name;        // "Theobroma"
const cuisines = restaurant.info.cuisines; // ["Bakery", "Desserts"]

// Rendering with mapped data
{resObj.restaurants.map((restaurant) => (
  <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
))}
```

---

### 1️⃣5️⃣  CSS Module Structure (Industry Standard)

**What are CSS Modules?**
```jsx
// RestaurantCard.module.css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
}
.name {
  font-size: 18px;
  font-weight: bold;
}

// RestaurantCard.js
import styles from './RestaurantCard.module.css';

const RestaurantCard = ({ name, cuisines, avgRating }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <p>{cuisines?.join(", ")}</p>
      <span>{avgRating} ⭐</span>
    </div>
  );
};
```

**Benefits of CSS Modules:**
- **Scoped styles** — Class names are locally scoped, preventing conflicts.
- **No naming collisions** — `.card` in one component won't affect `.card` in another.
- **Explicit dependencies** — It's clear which CSS belongs to which component.
- **No global namespace pollution.**

**Interview Question:**
> *Q: What are the advantages of CSS Modules over global CSS in React?*
>
> **A:** CSS Modules scope styles locally to the component, preventing class name collisions and making the CSS maintainable at scale. They generate unique class names at compile time, so you don't have to worry about naming conventions like BEM. This is the industry standard for medium-to-large React applications.

---

## 🔑 Key Takeaways for Interviews

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

## 💡 Likely Interview Questions

**Q1: How would you structure a React application for a food delivery app like Swiggy?**
> **A:** I would organize by feature folders: `components/` for reusable UI, `utils/` for constants and helpers, and `features/` if the app is large enough. Each component gets its own folder with the component file, CSS module, and test file. Configuration data (API URLs, image CDN) goes in `constants.js`, and mock/API data is separated from presentation logic.

**Q2: What is the difference between `useState` and a regular variable?**
> **A:** `useState` is tracked by React's reconciliation engine — when the setter is called, React re-renders the component with the new state. A regular variable is not tracked — changing it has no effect on the UI. State persists across re-renders, while local variables are re-initialized on every render.

**Q3: Why do we need the `key` prop when using `.map()`?**
> **A:** React uses keys to identify which items in a list have changed, been added, or been removed. Without stable keys, React may re-render all items unnecessarily or mismanage component state when the list changes. Keys should be stable, unique IDs (like database IDs), not array indices.

**Q4: Explain the concept of Config-Driven UI with an example.**
> **A:** Config-Driven UI means rendering UI based on configuration data instead of hardcoding. For example, a restaurant app fetches data from an API and renders cards using `.map()`. The same components display different restaurants for different users — only the data changes. This decouples UI from content and allows backend changes to affect the frontend without code deployment.

**Q5: What are the rules of Hooks?**
> **A:** 1) Only call Hooks at the top level of a component (not inside loops, conditions, or nested functions). 2) Only call Hooks from React functional components or custom Hooks. 3) Hook names must start with `use` (e.g., `useState`, `useEffect`). These rules ensure consistent behavior across renders.

**Q6: How does the spread operator work with React props?**
> **A:** The spread operator (`...`) takes all properties of an object and passes them as individual props to the component. For example, `{...restaurant}` turns `{name: "KFC", rating: 4.1}` into `<Card name="KFC" rating={4.1} />`. This eliminates repetitive prop-passing and makes the code cleaner.

**Q7: What is the difference between feature-based and type-based folder structure?**
> **A:** Type-based groups files by type (all components together, all utilities together). Feature-based groups by business domain (all files for "restaurant" — component, CSS, tests, utils — in one folder). Feature-based is preferred for large apps as it makes code more self-contained, easier to navigate, and enables lazy-loading by feature.

**Q8: How would you handle missing or undefined data in API responses?**
> **A:** Use optional chaining (`?.`) to safely access nested properties, provide default values during destructuring (`{name = "Unknown"} = props`), use conditional rendering with `&&` or ternary operators, and validate data before rendering. For lists, filter out invalid items before mapping.

**Q9: What is the difference between `onClick={handleClick}` and `onClick={handleClick()}`?**
> **A:** `onClick={handleClick}` passes a **reference** to the function — it's called only when clicked. `onClick={handleClick()}` **calls the function immediately** during render and passes the return value (usually `undefined`) as the event handler. Always pass a function reference, not a function call, as an event handler.

**Q10: What are the different ways to organize CSS in React?**
> **A:** 1) **Global CSS** (import a single `.css` file — simple but no scoping). 2) **CSS Modules** (`.module.css` — scoped per component, industry standard). 3) **Styled Components** (CSS-in-JS — dynamic styles, no class name issues). 4) **Tailwind CSS** (utility-first framework — fast prototyping). 5) **Sass/SCSS** (preprocessor with nesting, variables, mixins).

---


---

### 1️⃣6️⃣ `useState` Hook — Deep Dive with Interview Questions

**What is `useState`?**
- A React Hook that lets you add **state** to functional components.
- Returns an array with exactly two elements: the **current state value** and a **setter function** to update it.
- The component **re-renders** whenever the setter is called with a new value.

**Syntax Variations:**
```jsx
// Basic syntax
const [count, setCount] = useState(0);

// With initial value from a function (lazy initialization)
const [count, setCount] = useState(() => {
  // This function runs ONLY on the first render
  const initialValue = expensiveComputation();
  return initialValue;
});

// With object state
const [user, setUser] = useState({ name: "", age: 0 });

// With array state
const [items, setItems] = useState([]);
```

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

// In React 17 and earlier, only event handlers were batched.
// setTimeout, Promises, and async code were NOT batched.
// React 18+ batches everything automatically.
```

**Lazy Initialization:**
```jsx
// ❌ BAD — Called on EVERY render
const [count, setCount] = useState(expensiveFunction());

// ✅ GOOD — Called only ONCE (first render)
const [count, setCount] = useState(() => expensiveFunction());
```

**Interview Question:**
> *Q: What is the difference between `useState` and a class component's `this.setState`?*
>
> **A:** `useState` is a Hook for functional components, while `this.setState` is for class components. `useState` returns separate state variables and setters, while `this.setState` merges object state automatically. `useState` does NOT automatically merge object state — you must spread manually. `useState` supports functional updates and lazy initialization natively.

**Interview Question:**
> *Q: What is state batching in React?*
>
> **A:** State batching is when React groups multiple `setState` calls into a single re-render for performance. In React 18+, all state updates are automatically batched, even inside `setTimeout`, Promises, and async functions. In React 17, only event handlers were batched. This prevents unnecessary re-renders and improves performance.

**Interview Question:**
> *Q: Why does `useState` use an array instead of an object?*
>
> **A:** Array destructuring allows you to name the state variable and setter function anything you want (`const [count, setCount] = useState(0)`). If it returned an object, you'd be forced to use specific property names or rename them manually. Array destructuring is more flexible and concise.

---

### 1️⃣7️⃣ `useEffect` Hook — Complete Guide

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

**Real-World Examples:**

```jsx
// Example 1: Data Fetching on Mount
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

// Example 2: Timer with Cleanup
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function — runs when component unmounts
    return () => {
      clearInterval(interval);
      console.log("Timer cleaned up!");
    };
  }, []); // Empty array = setup once, cleanup on unmount

  return <h1>{seconds} seconds</h1>;
};

// Example 3: Reacting to Prop/State Changes
const SearchResults = ({ searchQuery }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchResults = async () => {
      const response = await fetch(`/api/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    };

    fetchResults();
  }, [searchQuery]); // Re-runs when searchQuery changes

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

// Example 4: Event Listeners with Cleanup
const WindowSizeTracker = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup — removes event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array = setup once

  return (
    <div>
      Window: {windowSize.width} x {windowSize.height}
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

**useEffect Execution Order:**
```
Component renders (JSX returned)
        │
        ▼
React updates the DOM
        │
        ▼
Browser paints the screen
        │
        ▼
useEffect runs (AFTER paint)
        │
        ▼
(Optional) Cleanup from previous effect runs
        │
        ▼
Effect function executes
```

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

// ✅ Fix: Include count in dependency array
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
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
> *Q: What is the difference between `useEffect` and `useLayoutEffect`?*
>
> **A:** `useEffect` runs **asynchronously** after the browser paints the screen. `useLayoutEffect` runs **synchronously** after DOM mutations but before the browser paints. `useLayoutEffect` is used for reading layout and synchronously re-rendering (e.g., measuring DOM elements). `useEffect` is preferred for most side effects because it doesn't block the browser paint.

**Interview Question:**
> *Q: How do you handle async operations in `useEffect`?*
>
> **A:** You cannot make the effect function itself `async` because it must return either nothing or a cleanup function (not a Promise). Instead, define an `async` function **inside** the effect and call it:
> ```jsx
> useEffect(() => {
>   const fetchData = async () => {
>     const result = await api.getData();
>     setData(result);
>   };
>   fetchData();
> }, []);
> ```

**Interview Question:**
> *Q: What is the "stale closure" problem in `useEffect`?*
>
> **A:** A stale closure occurs when the effect captures an old value of a variable because it wasn't included in the dependency array. For example, if `count` is used inside `useEffect` but not listed in dependencies, the effect will always see the initial `count` value (0), not the current one. The fix is to include all used variables in the dependency array or use functional updates.

---

### 1️⃣8️⃣ React Fiber & Reconciliation Algorithm

**What is Reconciliation?**
- Reconciliation is the **algorithm** React uses to **diff** one tree of React elements (Virtual DOM) with another to determine which parts of the real DOM need to be updated.
- It's the process that makes React efficient — instead of re-creating the entire DOM on every update, React calculates the **minimum number of changes** needed.

**What is React Fiber?**
- **React Fiber** is the **reimplementation of React's core reconciliation algorithm** introduced in React 16.
- The name "Fiber" comes from the concept of a "fiber" in computer science — a lightweight thread of execution.
- Before Fiber (React 15 and earlier), reconciliation was **synchronous and non-interruptible** — once it started, it blocked the main thread until the entire tree was processed.

**The Problem with the Old Stack Reconciler:**
```
React 15 (Stack Reconciler):
─────────────────────────────────────────────
| Render | Reconciliation (BLOCKS UI) | Paint |
─────────────────────────────────────────────
         ↑                            ↑
    User clicks here          Response delayed!
    No response until
    reconciliation finishes
```

**How Fiber Solves This:**
```
React 16+ (Fiber Reconciler):
─────────────────────────────────────────────
| Render | Reconcil. | Reconcil. | Reconcil. | Paint |
|        | (chunk 1) | (chunk 2) | (chunk 3) |       |
─────────────────────────────────────────────
         ↑              ↑              ↑
    User clicks    Processes      Finishes
    → Immediate    click event    reconciliation
      response     between chunks
```

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

**Fiber Node Structure:**
```js
// Simplified representation of a Fiber node
const fiberNode = {
  tag: 1,                    // Type of fiber (FunctionComponent, ClassComponent, HostComponent, etc.)
  key: null,                 // Unique key from React elements
  type: null,                // The component type (function, class, DOM element)
  
  // Tree structure
  child: null,               // First child fiber
  sibling: null,             // Next sibling fiber
  return: null,              // Parent fiber (called "return" because it's where you return to)
  
  // State and props
  pendingProps: {},          // New props to be applied
  memoizedProps: {},         // Props from last render
  memoizedState: null,       // State from last render (useState values stored here)
  
  // Effects
  effectTag: 0,              // What to do (Placement, Update, Deletion, etc.)
  nextEffect: null,          // Next fiber with an effect
  firstEffect: null,         // First child fiber with an effect
  lastEffect: null,          // Last child fiber with an effect
  
  // Priority
  lanes: 0,                  // Priority level of this update
  childLanes: 0,             // Priority of child updates
  
  // Time
  actualDuration: 0,         // Time spent rendering this fiber
  actualStartTime: 0,        // When rendering started
  selfBaseDuration: 0,       // Base time for this fiber alone
};
```

**The Diffing Algorithm (How React Compares Trees):**

```
Old Virtual DOM          New Virtual DOM
      │                        │
      ▼                        ▼
  <div>                     <div>
  ├── <Header />            ├── <Header />
  ├── <Body>                ├── <Body>
  │   ├── <Card key="1"/>   │   ├── <Card key="1"/>
  │   ├── <Card key="2"/>   │   ├── <Card key="3"/>  ← NEW
  │   └── <Card key="3"/>   │   └── <Card key="2"/>
  └── <Footer />            └── <Footer />

React's Diffing Logic:
1. Root <div> → Same type, just update props
2. <Header /> → Same type, same key → Update props
3. <Body> → Same type → Recurse into children
4. Children of <Body>:
   - Card key="1" → Same key → Update props
   - Card key="2" → Same key → Update props (moved position)
   - Card key="3" → Same key → Update props (moved position)
   - No deletion needed
5. <Footer /> → Same type → Update props
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

**Priority Levels (Lanes) in React Fiber:**

| Priority | Lane | Example |
|----------|------|---------|
| 🔴 **Immediate** | SyncLane | User clicks, typing in input |
| 🟠 **High** | InputDiscreteLane | Animations, transitions |
| 🟡 **Normal** | DefaultLane | Data fetching, state updates |
| 🟢 **Low** | IdleLane | Prefetching, analytics logging |

**How React Uses Priority:**
```
User types in search box (HIGH PRIORITY)
        │
        ▼
React starts reconciliation for the input update
        │
        ▼
A data fetch completes (NORMAL PRIORITY)
        │
        ▼
React PAUSES the normal priority work
        │
        ▼
React processes the HIGH priority input update first
        │
        ▼
React paints the input update to the screen
        │
        ▼
React RESUMES the normal priority data update
```

**Concurrent Mode (React 18+):**
```jsx
// Concurrent features built on Fiber:
import { startTransition } from 'react';

// startTransition marks updates as low priority
startTransition(() => {
  setSearchResults(filterData(searchText));
});

// useTransition hook
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  // High priority — updates input immediately
  setSearchText(e.target.value);

  // Low priority — can be interrupted
  startTransition(() => {
    setFilteredResults(filterData(e.target.value));
  });
};
```

**Fiber Tree vs Virtual DOM:**
```
Virtual DOM (React Elements)        Fiber Tree
───────────────────────────     ───────────────────────
{                                {
  type: App,                       tag: FunctionComponent,
  props: {},                       memoizedState: {...},
  children: [                      child: {
    {                                tag: FunctionComponent,
      type: Header,                  memoizedState: {...},
      props: {...},                  child: {
    },                                  tag: HostComponent,
    {                                   type: 'header',
      type: Body,                       ...
      props: {...},                  },
    }                                sibling: {
  }                                    tag: FunctionComponent,
                                       type: Body,
                                       ...
                                     }
                                   }
                                 }

React Elements: Immutable, created every render (lightweight)
Fiber Tree: Mutable, persists across renders (holds state, effects, etc.)
```

**Interview Question:**
> *Q: What is React Fiber?*
>
> **A:** React Fiber is the reimplementation of React's core reconciliation algorithm, introduced in React 16. It enables incremental rendering — the ability to split rendering work into chunks and spread it out over multiple frames. Fiber allows React to pause, resume, and prioritize work, making animations and user interactions smoother. It also enables new features like Error Boundaries, returning multiple elements from a component, and Concurrent Mode.

**Interview Question:**
> *Q: How does the reconciliation algorithm work in React?*
>
> **A:** React's reconciliation algorithm compares the new Virtual DOM tree with the previous one using these rules: 1) If two elements have **different types**, React tears down the old tree and builds a new one. 2) If two elements have the **same type**, React updates the props and recurses into children. 3) For **lists**, React uses `key` props to match children across renders. This diffing process is efficient because it makes assumptions (types don't change, keys are stable) that reduce the O(n³) problem to O(n).

**Interview Question:**
> *Q: What is the difference between the Render phase and Commit phase in React Fiber?*
>
> **A:** The **Render phase** is interruptible and can be paused, aborted, or restarted. It calls component functions, creates the Fiber tree, and computes changes. The **Commit phase** is synchronous and cannot be interrupted — it applies the changes to the real DOM, runs lifecycle methods (`componentDidMount`, `componentDidUpdate`), and runs `useEffect` cleanup and effects. The Render phase can be split into chunks, but the Commit phase must complete in one go.

**Interview Question:**
> *Q: Why is the `key` prop important for reconciliation?*
>
> **A:** React uses `key` to match children in a list across renders. Without keys, React uses index-based matching, which can cause incorrect rendering when the list changes. With stable keys, React can identify which items were added, removed, or reordered, and only update the necessary DOM nodes instead of recreating all of them. This is critical for performance and correctness in dynamic lists.

**Interview Question:**
> *Q: What is Concurrent Mode in React?*
>
> **A:** Concurrent Mode is a set of features (React 18+) built on top of React Fiber that allows React to interrupt long-running renders to handle higher-priority updates. It uses the Fiber architecture's ability to pause and resume work. Features like `startTransition`, `useTransition`, and `useDeferredValue` let developers mark certain updates as low priority, ensuring that urgent updates (like user input) are processed first.

**Interview Question:**
> *Q: How does React decide which updates to prioritize?*
>
> **A:** React uses a system called **Lanes** to assign priority levels to updates. User interactions (clicks, typing) get the highest priority. Animations and transitions get high priority. Data fetching and normal state updates get normal priority. Prefetching and logging get low priority. React processes higher-priority lanes first and can interrupt lower-priority work to handle urgent updates.

**Interview Question:**
> *Q: What happens when React encounters two elements of different types during reconciliation?*
>
> **A:** React **tears down** the old component tree completely and **builds a new one** from scratch. The old component's `componentWillUnmount` (or `useEffect` cleanup) runs, and the new component's `componentDidMount` (or `useEffect`) runs. All state in the old subtree is lost. This is why wrapping/unwrapping a component in a `<div>` can cause it to lose its state.


### 1️⃣9️⃣ Virtual DOM & Diffing Algorithm in React

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

**Visual Example — What the Virtual DOM Looks Like:**

```jsx
// JSX you write:
const element = (
  <div className="container">
    <h1>Hello, {name}!</h1>
    <p>Welcome to React</p>
  </div>
);

// Gets compiled to React.createElement() calls:
React.createElement(
  "div",
  { className: "container" },
  React.createElement("h1", null, "Hello, ", name, "!"),
  React.createElement("p", null, "Welcome to React")
);

// Which produces this Virtual DOM object:
const virtualDOM = {
  type: "div",
  props: {
    className: "container",
    children: [
      {
        type: "h1",
        props: {
          children: ["Hello, ", "John", "!"]
        }
      },
      {
        type: "p",
        props: {
          children: "Welcome to React"
        }
      }
    ]
  }
};
```

**The Diffing Algorithm — How React Compares Trees:**

React's diffing algorithm is based on **two key assumptions** (heuristics) that reduce the time complexity from O(n³) to O(n):

1. **Different types → Different trees** — If two elements have different types, React won't try to diff them; it replaces the entire subtree.
2. **Stable keys** — React uses `key` props to identify elements across renders, avoiding index-based matching.

**The Three Cases of the Diffing Algorithm:**

```jsx
// CASE 1: Different Root Types → Replace Entire Tree
// Before: <div>...</div>
// After:  <span>...</span>
// React removes the <div> and all its children, creates <span> from scratch
// All state in the subtree is LOST

// CASE 2: Same Type → Update Props & Recurse
// Before: <div className="old" style={{ color: 'red' }}>
// After:  <div className="new" style={{ color: 'blue' }}>
// React updates className and style, then recurses into children
// State is PRESERVED

// CASE 3: Same Type with Keys → Match by Key
// Before: [<li key="a">A</li>, <li key="b">B</li>, <li key="c">C</li>]
// After:  [<li key="a">A</li>, <li key="c">C</li>, <li key="d">D</li>]
// React matches "a"→"a", "c"→"c", removes "b", adds "d"
// Only 2 operations instead of 3 recreations!
```

**Detailed Diffing Walkthrough — Before vs After:**

```
BEFORE (Old VDOM):                    AFTER (New VDOM):
                                   
<div className="app">                <div className="app">
  <Header title="Home" />              <Header title="About" />   ← Same type, update props
  <Body>                               <Body>                     ← Same type, recurse
    <Card key={1} name="A" />            <Card key={1} name="A" /> ← Same key, update
    <Card key={2} name="B" />            <Card key={3} name="C" /> ← New key=3, insert
    <Card key={3} name="C" />            <Card key={2} name="B" /> ← Same key=2, move
  </Body>                              </Body>
  <Footer />                           <Footer />                 ← Same type, update
</div>                               </div>

React's Diffing Steps:
1. Root <div> → Same type → Update className (no change), recurse
2. <Header> → Same type → Update title prop from "Home" to "About"
3. <Body> → Same type → Recurse into children
4. Children of <Body> (list with keys):
   - key=1: Exists in both → Update props (name="A" same)
   - key=2: Exists in both → Update props (name="B" same), but position changed → MOVE
   - key=3: Exists in both → Update props (name="C" same), but position changed → MOVE
   - No deletions needed
5. <Footer> → Same type → Update props (no change)
```

**Why the Diffing Algorithm is O(n) instead of O(n³):**

```
Without heuristics (naive approach):
- Compare every element with every other element → O(n²)
- Then handle reordering → O(n³)
- For 1000 elements: 1,000,000,000 comparisons!

With React's heuristics:
- Compare root types first → O(1)
- Same type → recurse linearly → O(n)
- Lists with keys → hash map lookup → O(1) per element
- For 1000 elements: ~1000 comparisons!
```

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

**How React Batches DOM Updates:**

```jsx
// Without batching — 3 separate DOM updates (slow)
setCount(5);     // → DOM update #1
setName("John"); // → DOM update #2
setFlag(true);   // → DOM update #3

// With React batching — 1 combined DOM update (fast)
setCount(5);     // \
setName("John"); //  → Batched into a SINGLE DOM update
setFlag(true);   // /
// React waits until the event handler finishes, then applies all changes at once
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
> *Q: How does React's diffing algorithm work?*
>
> **A:** React's diffing algorithm compares two Virtual DOM trees using three key heuristics: 1) **Different root types** — if elements have different types (e.g., `<div>` vs `<span>`), React tears down the old tree and builds a new one. 2) **Same type** — React updates the props and recurses into children. 3) **Keys in lists** — React uses `key` props to match children across renders, enabling efficient reordering instead of recreating elements. These heuristics reduce the time complexity from O(n³) to O(n).

**Interview Question:**
> *Q: Why is the Virtual DOM faster than direct DOM manipulation?*
>
> **A:** Direct DOM manipulation is slow because every change triggers layout recalculations (reflow) and repaints. The Virtual DOM is faster because: 1) Creating and comparing JavaScript objects is much cheaper than touching the real DOM. 2) React batches multiple changes into a single DOM update. 3) The diffing algorithm calculates the minimum number of DOM operations needed. However, the Virtual DOM is an optimization, not a guarantee — poorly written code can still be slow.

**Interview Question:**
> *Q: What happens when you update state in React? (Full cycle)*
>
> **A:** 1) The setter function is called (e.g., `setCount(5)`). 2) React schedules a re-render (batches with other updates). 3) React calls the component function again, producing a new Virtual DOM tree. 4) React diffs the new VDOM against the previous one using the reconciliation algorithm. 5) React calculates the minimum DOM operations needed. 6) React applies these changes to the real DOM in a single batch. 7) The browser repaints the updated elements.

**Interview Question:**
> *Q: What is the difference between Virtual DOM and Shadow DOM?*
>
> **A:** The Virtual DOM is a JavaScript object tree used by React for performance optimization — it diffs changes and applies minimal updates to the real DOM. The Shadow DOM is a browser-native feature for encapsulation — it creates isolated DOM subtrees with scoped CSS. Virtual DOM is about speed, Shadow DOM is about encapsulation. They solve different problems and can be used together.

**Interview Question:**
> *Q: Can you directly manipulate the real DOM in React?*
>
> **A:** Yes, using `useRef` and `ref` attributes, or `document.getElementById()` in `useEffect`. However, this is discouraged because direct DOM manipulation bypasses React's declarative rendering model and can cause inconsistencies between the Virtual DOM and the real DOM. If you must manipulate the DOM directly (e.g., for focusing an input, measuring elements, or integrating with third-party libraries), do it inside a `useEffect` or `useLayoutEffect`.

**Interview Question:**
> *Q: How does React's batching mechanism work with the Virtual DOM?*
>
> **A:** React batches multiple state updates that occur within the same event handler or lifecycle method into a single re-render. Instead of creating a new Virtual DOM tree for each `setState` call, React waits until all updates are collected, then creates one new VDOM tree, diffs it once, and applies one batch of DOM updates. In React 18+, batching happens automatically for all updates (including `setTimeout`, Promises, and async functions).

---

## 🛠️ Skills Practiced
- Structuring React projects following industry standards
- Creating separate files for constants, mock data, and configurations
- Using `useState` hook to manage component state
- Implementing search functionality with state
- Working with real-world nested API data (Swiggy-style)
- Using `.map()` with proper `key` props
- Spreading objects as props
- Handling events (onChange, onClick)
- Using optional chaining for safe data access
- Separating data from presentation logic

---

## 🚀 Summary
Day 05 bridges the gap between static UI and **dynamic, data-driven** applications. The key skills are:
- Organizing files according to **industry best practices**
- Using **`useState`** to manage state and trigger re-renders
- Working with **real API data structures**
- Building a **search filter** using React state
- Understanding **why state is necessary** (local variables don't trigger re-renders)
- Writing **maintainable, production-ready code** by separating data from components

This structure is the foundation for every scalable React application you'll build.