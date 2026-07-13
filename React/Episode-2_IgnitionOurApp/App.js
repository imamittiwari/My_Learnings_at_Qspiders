// React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when the state of the application changes.
// React uses a virtual DOM to optimize rendering performance. When the state of a component changes, React creates a new virtual DOM representation of the UI and compares it to the previous version. It then calculates the minimum number of changes needed to update the actual DOM, which improves performance and reduces unnecessary re-rendering.
// React is declarative, meaning that developers describe what the UI should look like based on the current state of the application, and React takes care of updating the DOM to match that description. This makes it easier to reason about the UI and reduces the likelihood of bugs caused by manual DOM manipulation.
// hello world in react

import React from "react"; // Import the React library to use its features for building user interfaces.
import ReactDOM from "react-dom/client"; // Import the ReactDOM library to render React components to the actual DOM.
const heading = React.createElement("h1", { id: "heading" }, "Igniting Our First React App rocket-imoji");  // React Job is to create a virtual DOM and then render it to the actual DOM.


const root = ReactDOM.createRoot(document.getElementById("root")); // ReactDOM is responsible for rendering the virtual DOM to the actual DOM.  


root.render(heading); // Render the virtual DOM to the actual DOM.
