import React from "react";


class UserClass extends React.Component {
    constructor(props){
        super(props);
       // console.log(props)
        this.state = {
            count: 0,
            
        }
    };

    async componentDidMount(){
          
    }

    render() {
        const { name , location } = this.props
        const { count, count2 } = this.state;

        return (
            <div className="user-card">
                <h1>Count: { count }</h1>
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1,
                    })
                }}>Count Increament</button>
                <h1>Name:{ name }</h1>
                <h3>Location:{ location }</h3>

            </div>
        );
    }
}

export default UserClass;