import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = (props) => {
    // let history = useHistory();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (event) => {

        event.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if (json.success) {
            // Save the auth token to local storage and redirect
            localStorage.setItem("token", json.token)
            // history.push("/");
            window.location.href = "/";
            props.showAlert("Sign up successful", "success");
        } else {
            props.showAlert("Invalid credentials", "warning");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className="container">
            <form className="px-4 py-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                        <label className="form-check-label" htmlFor="dropdownCheck">
                            Remember me
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/signup">New around here? Sign up</Link>
        </div>
    )
}

export default Login