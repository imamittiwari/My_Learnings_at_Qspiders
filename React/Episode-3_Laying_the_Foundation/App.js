import React from "react"; 

import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")); // createRoot is a method that takes a DOM element as an argument and returns a root object that can be used to render React elements into the DOM.

// What is JSX? =>  html/xml-like syntax
// jsx is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It is used in React to describe the structure of the UI. JSX is not valid JavaScript, so it needs to be transpiled into regular JavaScript before it can be executed by the browser. This is typically done using a tool like Babel.
const jsxHeading = <h1 className="jsx_heading" tabIndex="5">Episode 3: Laying the Foundation</h1>


// react element
// const heading = (
//   <h2 className="head" tabIndex="5">
//     Creating a React Element
//   </h2>
// )
//root.render(heading);

// React functional componenets - js function to return jsx (react element)

// const HeadingComponent = () => {
//   return <h1>Namaste React Functional Component</h1>
// };



// component composition - using one component inside another component

const number = 1000;

const elem = <span>React Element</span>

const HeadingComponent = () => (
  <div id="container">
    <p>Number: {number+100}</p>
    {elem}
    <TitleComponent></TitleComponent>  
    <TitleComponent/>                  
    {TitleComponent()}                 
    <h1>Namaste React Functional Component</h1>
  </div>
);

const TitleComponent = () => (
  <div id="title-container">
    <h1 >Namaste React Title Component</h1>
  </div>
);




// --- Homework: Using img and anchor tags in JSX ---

//const homeworkElement = (
//  <div>
//    <h1>My Homepage</h1>
//
//    {/* Image tag */}
//    <img
//      src="https://via.placeholder.com/300"
//      alt="Placeholder image"
//      width={300}
//      height={200}
//    />
//
//    {/* Anchor tag */}
//    <p>
//      Visit{" "}
//      <a
//        href="https://react.dev"
//        target="_blank"
//        rel="noopener noreferrer"
//      >
//        React's official website
//      </a>{" "}
//      for more info.
//    </p>
//  </div>
//);
//
root.render(<HeadingComponent />);