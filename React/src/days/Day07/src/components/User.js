import React from "react";
import { useState } from "react";

const User  = ({name, location}) => {

    const [count, setCount ] = useState(0);
    const [count2, setCount2 ] = useState(1);
    return (
        <div className="user-card">
            <h1>Function Based Components</h1>
            <h1>Count: {count}</h1>
            <h1>Count2: {count2}</h1>
            <h1>Name:{name} </h1>
            <h3>Location:{location} </h3>
        </div>

    );
};

export default User;