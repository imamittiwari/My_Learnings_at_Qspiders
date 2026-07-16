# 📘 Day 04 — React Interview-Friendly Notes

## 📌 Overview of Day 04
Day 04 focuses on **building a real-world UI layout using React functional components**. We move beyond theory and start constructing a **Food Delivery App UI** (like Swiggy/Zomato) using component composition, JSX, and CSS.

---

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

---

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

**Code Example:**
```jsx
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};
```

**Interview Question:**
> *Q: Why is component composition important?*
>
> **A:** It promotes code reusability, better maintainability, separation of concerns, and makes the code easier to test and debug. It follows the **"divide and conquer"** principle.

---

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

**Example:**
```jsx
const RestaurantCard = () => {
  return (
    <div className='res-card' style={{ backgroundColor: "gray" }}>
      <img src="..." className='res-logo' />
      <h3>Meghna Foods</h3>
      <h4>Biryani, North Indian, Asian</h4>
      <h4>*4.4</h4>
      <h4>38 min</h4>
    </div>
  );
};
```

**Interview Question:**
> *Q: Can browsers read JSX directly?*
>
> **A:** No. Browsers do not understand JSX. It needs to be transpiled by a tool like **Babel** into regular `React.createElement()` calls, which the browser can understand.

---

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

**vs CSS Classes:**
- Use `className` for external CSS.
- Use `style={{}}` for dynamic/inline styling.

---

### 5️⃣ CSS in React — External Stylesheets

**How it works:**
- Write regular CSS in a `.css` file.
- Import it into your component file.
- Use `className` attribute to apply styles.

**Project Setup:**
```js
// index.css — global styles
.header {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
}
```

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

---

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

**Code Pattern to Note:**
```jsx
// Reusing a component multiple times
<RestaurantCard />
<RestaurantCard />
<RestaurantCard />
```

---

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

**Why is it called "on the fly"?**
Because the destructuring happens **at the moment the function receives the argument** — it's extracted immediately, not as a separate step.

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

**How JavaScript Destructuring Works (Behind the Scenes):**

```jsx
// When you write this in React:
const RestaurantCard = ({ resName, cuisine }) => { ... }

// It's equivalent to this JavaScript:
const RestaurantCard = (props) => {
  const resName = props.resName;
  const cuisine = props.cuisine;
  // ... rest of the function
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

**Interview Question:**
> *Q: What does "destructuring on the fly" mean in React?*
>
> **A:** It means destructuring the props object directly in the function parameter of a component, like `const Card = ({ name, price }) => { ... }`. Instead of receiving the full `props` object and then extracting values inside the function body, the extraction happens at the parameter level itself. This is the standard best practice in modern React because it makes the code cleaner and the component's expected props immediately visible.

**Interview Question:**
> *Q: Can you destructure nested objects on the fly?*
>
> **A:** Yes. For example, if props contains a nested object like `restaurant: { name: "KFC", rating: 4.1 }`, you can destructure it as: `const Card = ({ restaurant: { name, rating } }) => { ... }`. This extracts `name` and `rating` directly from the nested object.

**Interview Question:**
> *Q: What happens if you try to destructure a prop that wasn't passed?*
>
> **A:** It will be `undefined`. You can avoid errors by providing default values during destructuring: `const Card = ({ name = "Default Name", price = 0 }) => { ... }`. This way, if the parent doesn't pass those props, the defaults are used instead of `undefined`.

**Key Rules of Props:**
1. **Props are Read-Only** — A child component **must never modify** the props it receives. Props are immutable.
2. **Props Flow One-Way (Unidirectional)** — Data flows from parent → child, never the other way.
3. **Props Can Be Any Data Type** — Strings, numbers, booleans, objects, arrays, functions, even JSX.
4. **Default Props** — You can set default values in case no prop is passed.

**Applying Props to Day04 Code:**

Currently in Day04, `RestaurantCard` has **hardcoded** data like "Meghna Foods", "Biryani, North Indian", etc. With props, the same component can display **different restaurants**:

```jsx
// Before (hardcoded — NOT reusable)
<RestaurantCard />
<RestaurantCard />
<RestaurantCard />

// After (with props — truly reusable!)
<RestaurantCard resName="Meghna Foods" cuisine="Biryani" rating="4.4" />
<RestaurantCard resName="KFC" cuisine="Fried Chicken" rating="4.1" />
<RestaurantCard resName="Domino's" cuisine="Pizza" rating="4.3" />
```

**Interview Question:**
> *Q: Explain props in React with an example.*
>
> **A:** Props are arguments passed to React components. They allow parent components to pass data down to child components. Props are read-only and follow unidirectional data flow. For example, `<RestaurantCard name="KFC" />` passes the prop `name` with value `"KFC"` to the `RestaurantCard` component, where it's accessed as `props.name` or via destructuring `{ name }`.

**Interview Question:**
> *Q: What is the difference between props and state?*
>
> **A:** Props are read-only data passed from parent to child. State is mutable data managed within the component itself. Props cannot be modified by the receiving component, while state can be updated using `setState()` (class) or `useState` hook (functional).

**Interview Question:**
> *Q: Can you pass functions as props?*
>
> **A:** Yes, functions can be passed as props. This is commonly used for event handling — the parent passes a function that the child can call, effectively allowing parent-child communication (e.g., `<Button handleClick={handleClick} />`).

---

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
  },
  {
    id: 3,
    resName: "Domino's Pizza",
    cuisine: "Pizza, Pasta",
    rating: "4.3",
    deliveryTime: "25 min",
    isOpen: true
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

**Real-World Example — Swiggy/Zomato:**
```
API Response (config) → Drives the UI
├── What restaurants to show
├── What order to show them in
├── Whether to show "Promoted" badge
├── Whether the restaurant is open/closed
├── Whether to show offers section
└── What carousels/collections to display
```

The **same component code** renders differently for every user because the **configuration (API data) is different** — location, time of day, user preferences all affect the config.

**Interview Question:**
> *Q: What is Config-Driven UI and why is it important?*
>
> **A:** Config-Driven UI means the UI is rendered based on configuration data (typically from a backend API) rather than hardcoded values. It allows the same codebase to display different UIs for different users, locations, or conditions without deploying new code. For example, Swiggy shows different restaurants in different cities using the same React components — only the config/API response changes.

**Interview Question:**
> *Q: How does Config-Driven UI connect to props in React?*
>
> **A:** Props are the mechanism that enables Config-Driven UI. The parent component receives configuration data (from an API or state), then passes it as props to child components. Each child renders based on the props it receives. So the flow is: **Config Data → Props → UI Rendering**.

**Interview Question:**
> *Q: How would you implement Config-Driven UI for a restaurant app?*
>
> **A:** 
> 1. Fetch restaurant data from an API (returns JSON array).
> 2. Store the response in state or a variable.
> 3. Use `.map()` to iterate over the array and render a `RestaurantCard` for each item.
> 4. Pass each item's data as props to `RestaurantCard`.
> 5. The card component destructures props and renders dynamically.
> 6. If the backend changes the data, the UI updates automatically.


### 9️⃣ Using `.map()` to Render Variable Data in Components

**What is `.map()` in React?**
- `.map()` is a JavaScript array method that **creates a new array** by iterating over each item and applying a transformation.
- In React, we use `.map()` to **convert an array of data into an array of JSX elements** (components).
- This is the **standard way** to render dynamic lists in React (instead of manually writing repeating `<Component />` tags).

**The Problem — Hardcoded Repetition (Day04's current code):**
```jsx
const Body = () => {
  return (
    <div className='res-container'>
      <RestaurantCard />   {/* Same data every time */}
      <RestaurantCard />   {/* Manual copy-paste */}
      <RestaurantCard />   {/* Not scalable */}
      {/* ... 17 more times! */}
    </div>
  );
};
```
**Problems:** Not scalable, same data for every card, must edit component code to add/remove cards.

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

**How `.map()` works step-by-step:**
```jsx
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
// Result: [2, 4, 6]

// In React — same concept, but returns JSX instead of numbers:
restaurantList.map((restaurant) => {
  return <RestaurantCard resName={restaurant.resName} />;
  // Returns: [<Card />, <Card />, <Card />]  ← Array of JSX elements
});
```

**The `.map()` + Props Pipeline:**
```
Data Array (.map())  →  Props  →  Component  →  UI
     │                    │           │            │
 restaurantList     resName={..}  RestaurantCard   Rendered
     │                    │           │            Cards
 ┌─────────────────────────────────────────────────┐
 │  restaurantList.map((item) => <Card {...item} />) │
 └─────────────────────────────────────────────────┘
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

**Day04 Code Transformation — Before vs After:**

| Before (Hardcoded — Current Day04) | After (Dynamic — With `.map()`) |
|-----------------------------------|--------------------------------|
| `<RestaurantCard />` repeated 20× | `restaurantList.map(...)` |
| Same hardcoded data for every card | Each card gets different data from array |
| To add a card: edit component file | To add a card: just add to data array |
| Not reusable, not real-world | Scalable, matches real API data |

**Interview Question:**
> *Q: Why do we use `.map()` instead of a for loop in React?*
>
> **A:** `.map()` returns a new array, making it perfect for JSX — it directly returns an array of JSX elements that React can render. A `for` loop doesn't return anything by itself and requires manually pushing into an array. `.map()` is more declarative, readable, and is the idiomatic React pattern.

**Interview Question:**
> *Q: What happens if you forget the `key` prop when using `.map()`?*
>
> **A:** React will show a warning in the console. More importantly, it can cause bugs with re-rendering — React uses `key` to identify which list items changed. Without a stable key, React may unnecessarily re-render all items or mismanage component state during list reordering.

**Interview Question:**
> *Q: Can you use `.map()` with conditional rendering?*
>
> **A:** Yes. You can chain `.filter()` before `.map()` to conditionally render items:
> ```jsx
> {restaurantList
>   .filter((res) => res.rating > 4.0)  // Only show highly rated
>   .map((res) => <RestaurantCard key={res.id} {...res} />)
> }
> ```

---

### 🔟 Important React Concepts (Component File Structure)

**Export Default:**
```jsx
export default AppLayout;
```
- Makes the component available for import in other files.
- `export default` exports a single value from a module.

**Import in main file:**
```jsx
import App from './days/Day04/App.js';
```



## 🔑 Key Takeaways for Interviews

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

## 💡 Likely Interview Questions

**Q1: How do you create a component in React?**
```jsx
const MyComponent = () => {
  return <h1>Hello World</h1>;
};
```

**Q2: Can you have multiple components in a single file?**
Yes, but conventionally each component has its own file for better organization.

**Q3: What is the difference between `class` and `className` in React?**
`class` is a reserved keyword in JavaScript, so React uses `className` for CSS classes in JSX.

**Q4: How does JSX prevent injection attacks?**
React DOM escapes any values embedded in JSX before rendering them, preventing XSS (Cross-Site Scripting) attacks.

**Q5: What is the role of Babel in React?**
Babel transpiles JSX into `React.createElement()` calls so browsers can understand the code.

**Q6: Explain the flexbox layout used in Day04.**
- Header uses `justify-content: space-between` to push logo left and nav right.
- `.res-container` uses `flex-wrap: wrap` so cards automatically move to the next row when the screen width is exceeded.

**Q7: What happened when you hover over a restaurant card?**
A black border appears, implemented via the CSS `:hover` pseudo-class.

---

## 🛠️ Skills Practiced
- Writing multiple functional components
- Importing and applying CSS
- Using Flexbox for responsive layouts
- Building a scalable UI structure
- Reusing components

---

## 🚀 Summary
Day 04 teaches the **foundation of building real-world UIs** in React. The key skills are:
- Breaking UI into **smaller, reusable components**
- Using **JSX** effectively
- Applying **CSS** for styling
- **Composing** components together to form a complete page

This structure (Header + Body + Cards) is the **blueprint** for almost every web app you'll build in React.