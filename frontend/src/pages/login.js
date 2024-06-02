//  frontend/src/pages/login.js

import React, { useState } from 'react';
import { loginUser, signupUser } from "./authentication";

export function Login({ handleSubmit, buttonLabel }) {
    const [creds, setCreds] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setCreds({ ...creds, [name]: value });
    }

    function submitForm() {
        handleSubmit(creds)
            .then(() => {
                setMessage("Success!");
                setCreds({ username: "", password: "" });
            })
            .catch((error) => {
                setMessage(`Failed: ${error.message}`);
            });
    }

    return (
        <form>
            <label htmlFor="username">UserName</label>
            <input
                type="text"
                name="username"
                id="username"
                value={creds.username}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={creds.password}
                onChange={handleChange}
            />
            <input
                type="button"
                value={buttonLabel || "Submit"}
                onClick={submitForm}
            />
            {message && <p>{message}</p>}
        </form>
    );
}

export default Login;
