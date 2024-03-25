import React from "react";
import { Link } from "react-router-dom";

const About = () => {
   return (
      <div className="container">
         <h2>About</h2>
         <p>This is a simple note taking app.</p>
         <p>Sign up to start using iNote</p>
         <h5>
            <Link className="link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/login">
               Login
            </Link>
         </h5>
      </div>
   );
};

export default About;
