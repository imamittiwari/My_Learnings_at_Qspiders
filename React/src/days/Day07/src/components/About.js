import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <h2>This is About Componenets</h2>

            <User name={"Amit Tiwari"} location={"Noida"} />

            <UserClass name={"Amit Tiwari"} location={"Noida"}/>
        </div>
    )
}

export default About;