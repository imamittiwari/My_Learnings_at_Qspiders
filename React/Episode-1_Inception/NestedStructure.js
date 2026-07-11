/*
*        Creating hierrachy/nested structure  of elements in React using React.createElement() method.
*        <div id="parent">
*          <div id="child">
*              <h1> I'm a h1 tag</h1>
*          </div>
*          <div id="child2">
*              <h1> I'm a h2 tag</h1>
*          </div>
*       </div>
*     

*   ReactElement(object) => HTML(Browser understands) => Render to the actual DOM.

*   ReactElement(type, props, ...children) is a method provided by React that allows you to create virtual DOM elements. It takes three arguments: the type of element (e.g., "div", "h1"), an object containing the element's properties (props), and any child elements that should be nested inside the element.
*/

const parent = React.createElement(
    "div",
     {id : "parent"},
    React.createElement(
        "div",
        {id : "child1"},
        [React.createElement("h1", {}, "I'm a h1 tag"),React.createElement("h2", {}, "I'm a h2 tag"),React.createElement("h3", {}, "I'm a h3 tag")]
        )
    );

const parentRoot = ReactDOM.createRoot(document.getElementById("parent")); // ReactDOM is responsible for rendering the virtual DOM to the actual DOM.

parentRoot.render(parent); // Render the virtual DOM to the actual DOM.
