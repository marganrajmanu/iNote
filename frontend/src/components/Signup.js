import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
   const [signupData, setSignupData] = useState({
      name: "",
      email: "",
      password: "",
   });

   const handleSubmit = async (event) => {
      event.preventDefault();

      const response = await fetch("http://localhost:5000/api/auth/signup", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(signupData),
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      if (json.success) {
         // Save the auth token to local storage and redirect
         localStorage.setItem("token", json.token);
         // history.push("/");
         window.location.href = "/";
         props.showAlert("Sign up successful", "success");
      } else {
         props.showAlert("Invalid credentials", "warning");
      }
   };

   const onChange = (event) => {
      setSignupData({ ...signupData, [event.target.name]: event.target.value });
   };

   return (
      <div className="container">
         <form className="px-4 py-3" onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="Email1" className="form-label">
                  Name
               </label>
               <input type="text" className="form-control" id="name" name="name" placeholder="Name" onChange={onChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="Email1" className="form-label">
                  Email address
               </label>
               <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" onChange={onChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="Password1" className="form-label">
                  Password
               </label>
               <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} />
            </div>
            <div className="mb-3">
               <label htmlFor="Password2" className="form-label">
                  Confirm Password
               </label>
               <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" onChange={onChange} />
            </div>

            <button type="submit" className="btn btn-primary">
               Sign up
            </button>
         </form>
         <div className="dropdown-divider"></div>
         <Link className="dropdown-item" to="/login">
            Already have an account? Login
         </Link>
      </div>
   );
};

export default Login;
